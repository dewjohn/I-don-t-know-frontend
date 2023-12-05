// 对用户的路径切换 进行劫持 劫持后， 重写调用reroute方法 进行计算应用的加载
import { reroute } from './reroute.js';

function urlRoute() {
	reroute(arguments);
}

window.addEventListener('hashchange', urlRoute);

window.addEventListener('popstate', urlRoute);

// 需要劫持原生的路由系统，保证当我们加载完后再切换路由
const capturedEventListeners = {
	hashchange: [],
	popstate: [],
};

const listeningKey = ['hashchange', 'popstate'];
const originalAddEventListener = window.addEventListener;
const originalRemoveEventListener = window.removeEventListener;

window.addEventListener = function (eventName, callback) {
	// 有要监听的事件，函数不能重复
	if (
		listeningKey.includes(eventName) &&
		!capturedEventListeners[eventName].some((listener) => listener === callback)
	) {
		return capturedEventListeners[eventName].push(callback);
	}
	return originalAddEventListener.apply(this, arguments);
};

window.removeEventListener = function (eventName, callback) {
	// 有要监听的事件，函数不能重复
	if (listeningKey.includes(eventName)) {
		capturedEventListeners[eventName] = capturedEventListeners[
			eventName
		].filter((fn) => fn !== callback);
		return;
	}
	return originalRemoveEventListener.apply(this, arguments);
};

export function callCaptureEventListeners(e) {
	if (e) {
		const eventType = e[0].eventType;
		if (listeningKey.includes(eventType)) {
			capturedEventListeners(eventType).forEach((listener) => {
				listener.apply(this, e);
			});
		}
	}
}

function patchFn(updateState, methodName) {
	return function () {
		const urlBefore = window.location.href;
		updateState.apply(this, arguments);
	};
}

window.history.pushState = patchFn(window.history.pushState, 'pushState');

window.history.replaceState = patchFn(
	window.history.replaceState,
	'replaceState'
);
