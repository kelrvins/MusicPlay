/**
 * 自用框架
 * import { w } from './wtool';
 * w.$('node')  获取单个元素
 * w.$$('node')  获取多个的元素
 * w.hasClass(elementId, cName)  检查元素是否有指定class
 * w.addClass(elementId, cName)  添加class
 * w.removeClass(elementId, cName)   删除class
 * w.removaAllChildNodes(elementId)   删除所有子节点
 * w.addEvent(elementId, event, func)  添加事件
 * w.formatSeconds(value)  把数值格式化为时间
 * w.attr(node, attr, newVal)  获取或设置元素属性 newVal为空是为查询
 */
export const w = {
    /**
     * 获取单个的元素
     * 
     * @param {String} selector
     * @param {Element} [context=document]
     * @returns {Element} element
     */
    $: (selector, context = document) => {
        if (context instanceof NodeList) {
            return Array.from(context, node => {
                return node.querySelector(selector);
            })
        }
        return context.querySelector(selector);
    },

    /**
     * 获取多个的元素
     * 
     * @param {String} selector
     * @param {Element} [context=document]
     * @returns {Element} element
     */
    $$: (selector, context = document) => {
        if (context instanceof NodeList) {
            return Array.from(context, node => {
                return node.querySelectorAll(selector);
            })
        }
        return context.querySelectorAll(selector);
    },
    /**
     * 检查元素是否有指定class
     * 
     * @param {String} cName
     * @param {Element} elementId
     * @returns {boolean} boolean
     */
    hasClass(elementId, cName) {
        return !!elementId.className.match(new RegExp("(\\s|^)" + cName + "(\\s|$)"));
    },
    /**
     * 元素添加class
     * 
     * @param {String} cName
     * @param {Element} elementId
     */
    addClass(elementId, cName) {
        if (!hasClass(elementId, cName)) {
            elementId.className += " " + cName;
        }
    },
    /**
     * 元素删除class
     * 
     * @param {String} cName
     * @param {Element} elementId
     */
    removeClass(elementId, cName) {
        if (!hasClass(elementId, cName)) {
            elementId.className = elementId.className.replace(new RegExp("(\\s|^)" + cName + "(\\s|$)"));
        }
    },
    /**
     * 删除所有子节点
     * 
     * @param {Element} elementId
     */
    removaAllChildNodes(elementId) {
        while (elementId.hasChildNodes()) {
            elementId.removeChild(elementId.lastChild)
        }
    },
    
    /**
     * 获取或设置元素属性
     * 
     * @param {Element} node
     * @param {String} attr
     * @param {String} [newVal=null]
     * @returns {String} element's attribute value or null
     */
    attr: (node, attr, newVal = null) => {
        if (newVal) {
            node.setAttribute(attr, newVal);
            return;
        }
        return node.getAttribute(attr);
    },
    /**
     * 添加事件
     * 
     * @param {Element} elementId
     * @param {String} event
     * @param {String} func
     */
    addEvent(elementId, event, func) {
        if (elementId.addEventListener) {
            elementId.addEventListener(event, func, false);
        } else if (elementId.attachEvent) {
            elementId.attachEvent('on' + event, func);
        } else {
            elementId['on' + event] = func;
        }
    },
    /**
     * 将数值格式化为时间
     * 
     * @param {String} value
     * @returns {String} timr or NaN
     */
    formatSeconds(value) {
        var theTime = parseInt(value) // 秒
        var theTime1 = 0 // 分
        var theTime2 = 0 // 小时
        if (theTime > 60) {
            theTime1 = parseInt(theTime / 60)
            theTime = parseInt(theTime % 60)
            if (theTime1 > 60) {
                theTime2 = parseInt(theTime1 / 60)
                theTime1 = parseInt(theTime1 % 60)
            }
        }
        var result = "" + parseInt(theTime)
        if (theTime1 > 0) {
            if (theTime < 10) {
                result = "" + ((theTime1 < 10) ? "0" + theTime1 : theTime1) + ":0" + result
            } else {
                result = "" + ((theTime1 < 10) ? "0" + theTime1 : theTime1) + ":" + result
            }
        }
        if (theTime2 > 0) {
            result = "" + parseInt(theTime2) + ":" + result
        }
        if (result == "NaN") {
            return "--:--"
        } else {
            return result
        }
    }
}