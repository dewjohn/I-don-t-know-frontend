// list: 数组对象
// id: 每条数据的id
// pid: 每条数据的父节点对应字段
// pid:null 没有父节点的数据

const list = [
  { id: 04, pid: 03 },
  { id: 01, pid: null },
  { id: 02, pid: null },
  { id: 03, pid: 01 },
  { id: 05, pid: 01 },
  { id: 06, pid: 03 },
  { id: 07, pid: 02 },
  { id: 09, pid: 02 },
  { id: 10, pid: 07 },
];


function toTree2(data) {
  let resList = [];
  // 如果数据错误
  if(!Array.isArray(data)) return

  // 格式化数组
  data.forEach((item) => {
    delete item.children
  });
  let map = {}
  data.forEach((item) => {
    map[item.id] = item
  })
  data.forEach(item => {
    let parent = map[item.pid]
    if(parent){
      // 如果有父级
      (parent.children || (parent.children = [])).push(item)
    } else {
      resList.push(item)
    }
  })

  return resList;
}

console.log(JSON.stringify(toTree2(list)))
