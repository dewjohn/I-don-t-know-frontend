console.log('hello world')

const app = document.createElement('div')

app.id = 'app'

const btn1 = document.createElement('button')
const btn2 = document.createElement('button')

btn1.textContent = '关于'
btn2.textContent = '分类'

document.body.appendChild(app)

app.appendChild(btn1)
app.appendChild(btn2)

btn1.onclick = function () {
	import(
		/* webpackChunkName: "about" */
		/* webpackPrefetch: true */
		'./route/about'
	)
}

btn2.onclick = function () {
	import(
		/* webpackChunkName: "category" */
		/* webpackPrefetch: true */
		'./route/category'
	)
}
