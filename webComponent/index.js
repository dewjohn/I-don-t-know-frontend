"use strict";
window.onload = () => {
    class wujwie extends HTMLElement {
        constructor() {
            super();
            // shadowdom 样式隔离
            let dom = this.attachShadow({ mode: 'open' });
            let template = document.querySelector('template');
            dom.appendChild(template.content.cloneNode(true));
            console.log(this.getAttr('age'), this.getAttr('url'));
        }
        getAttr(key) {
            return this.getAttribute(key);
        }
        // 生命周期自动触发有东西插入
        connectedCallback() {
            console.log('类似于vue的mount');
        }
        // 生命周期卸载
        disconnectedCallback() {
            console.log('类似于vue的destroy');
        }
        // 跟watch类似
        attributeChangedCallback(name, olVal, newVal) {
            console.log('有属性发生变化时自动触发');
        }
    }
    window.customElements.define('wu-jie', wujwie);
};
