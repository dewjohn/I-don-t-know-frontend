#!/usr/bin/env node
const { program } = require('commander')
const helpOptions = require('./core/help')

// 配置所有的options
helpOptions()

// 让commander解析当前process.argv中的数据
program.parse(process.argv)

// 获取额外传递的参数
console.log(program.opts().name)
