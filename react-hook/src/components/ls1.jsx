import React from 'react';

const effectStack = [];

function cleanup(effect) {
  // 从该effect订阅的所有state对应subs中移除该effect
  for (const subs of effect.deps) {
    subs.delete(effect);
  }
  // 将该effect依赖的所有state对应的subs移除
  effect.deps.clear();
}

function subscribe(effect, subs){
  // 订阅关系建立
  subs.add(effect)
  // 依赖关系建立
  effect.deps.add(subs)
}

function useState(value) {
  // 保存订阅该state变化的effect
  const subs = new Set();

  const getter = () => {
    // 获取当前上下文的effect
    const effect = effectStack[effectStack.length - 1];
    if (effect) {
      // 建立订阅发布模式
      subscribe(effect, subs);
    }
    return value;
  };
  const setter = (newValue) => {
    value = newValue;
    // 通知所有订阅该state变化的effect执行
    for (const effect of [...subs]) {
      effect.execute();
    }
  };
  return [getter, setter];
}

function useEffect(callback) {
  const execute = () => {
    // 重置依赖
    cleanup(effect)
    // 将当前的effect推入栈顶
    effectStack.push(effect);
    try {
      // 执行回调
      callback();
    } catch (error) {
      // effect 出栈
      effectStack.pop();
    }
  };
  const effect = {
    execute,
    deps: new Set(),
  };
  // 立即执行一次，建立订阅发布关系
  execute();
}

export default function Ls1() {
  return <div>Ls1</div>;
}