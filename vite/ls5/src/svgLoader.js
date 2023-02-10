// import svgIcon from './static/svg/fullScreen.svg'

// const img = document.createElement('img')

// img.src = svgIcon

// document.body.appendChild(img)



// 第二种处理svg方法
// svg会以<svg></svg>格式插入到html中

// import svgIcon from './static/svg/fullScreen.svg?raw' // 读取源文件
import svgIcon from '@static/svg/fullScreen.svg?raw'

document.body.innerHTML = svgIcon

const svg = document.getElementsByTagName('svg')

console.log(svg) // htmlcollection

svg[0].onmouseenter = function(){
  this.style.fill = 'red'
}
