#!/usr/bin/env node
const { program } = require('commander')
const helpOptions = require('./core/help')
const { createProjectAction, addVueTemplateAction } = require('./core/action')

// 配置所有的options
helpOptions()

// 增加一些具体功能
program
	.command('create <project> [...others]')
	.description('create vue project')
	.action(createProjectAction)

program
	.command('addVueTemplate <name> [...others]')
	.description('add vue3.0 template')
	.action(addVueTemplateAction)

// 让commander解析当前process.argv中的数据
program.parse(process.argv)

// 获取额外传递的参数
// console.log(program.opts().name)
