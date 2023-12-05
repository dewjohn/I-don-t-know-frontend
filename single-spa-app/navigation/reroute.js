import { getAppChanges, shouldBeActive } from '../application/app.helpers.js';
import { apps } from '../application/app.js';
import { toBootstrapPromise } from '../lifeCycles/bootstrap.js';
import { toloadPromise } from '../lifeCycles/load.js';
import { toMountPromise } from '../lifeCycles/mount.js';
import { toUnmountPromise } from '../lifeCycles/unmount.js';
import { started } from '../start.js';
import './navigation-event.js';
import { callCaptureEventListeners } from './navigation-event.js';

// 后续路径变化 也需要走到这里 重新计算哪些应用被加载或者卸载
export function reroute() {
	// 获取 app 对应的状态并分类
	const { appsToLoad, appsToMount, appsToUnmount } = getAppChanges();
	// console.log(appsToLoad, appsToMount, appsToUnmount);
	// 记载完毕后 需要去挂载的应用

	if (started) {
		// 用户调用了start方法，我们需要处理当前应用要挂载或者卸载
		return performAppChange();
	}

	// 先拿到应用去加载
	return loadApps();

	function loadApps() {
		// 应用的加载
		return Promise.all(appsToLoad.map((app) => toloadPromise(app))).then(
			callEventListener
		);
	}

	function performAppChange() {
		// 将不需要的应用卸载掉，返回一个卸载的promise
		// 1) 稍后测速销毁逻辑
		const unmountAllPromises = Promise.all(appsToUnmount.map(toUnmountPromise));
		// 加载需要的应用 -》 启动对应的应用 -》卸载之前的 -》 挂载对应应用

		// 2) 加载需要的应用(可能这个应用在注册的时候已经被加载了)

		// 默认情况注册的时候 路径是 /a ，但是当我们start的时候应用是/b
		const loadMountPromises = Promise.all(
			appsToLoad.map((app) =>
				toloadPromise(app).then((app) => {
					// 当应用加载完毕后，需要启动和挂载，但是要保证挂载前 先卸载掉原来的应用
					tryBootstrapAndMount(app, unmountAllPromises);
				})
			)
		);
		// 如果应用 没有加载  加载-》启动挂载
		// 如果应用已经加载过了 挂载
		const MountPromises = Promise.all(
			appsToMount.map((app) => tryBootstrapAndMount(app, unmountAllPromises))
		);
	}
	function tryBootstrapAndMount(app, unmountAllPromises) {
		if (shouldBeActive(app)) {
			// 保证卸载完毕再挂载
			return toBootstrapPromise(app).then((app) =>
				unmountAllPromises.then(() => toMountPromise(app))
			);
		}
		// 卸载完毕后
		return Promise.all([loadMountPromises, MountPromises]).then(() => {
			callEventListener();
		});
	}
}

function callEventListener() {
	callCaptureEventListeners(event);
}
