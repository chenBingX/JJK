/**
 * 获取参数值
 * @param {*} name 
 */
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return decodeURI(r[2]);
    return null;
}

/**
 * 前往页面
 * @param {*} url 
 */
function gotoPage(url) {
    window.location.href = url;
}

/**
 * 将 html 转义
 * @param {*} html 
 */
function HTMLEncode(html) {
    var temp = document.createElement("div");
    (temp.textContent != null) ? (temp.textContent = html) : (temp.innerText = html);
    var output = temp.innerHTML;
    temp = null;
    return output;
}

/**
 * 将 html 反转义
 * @param {*} text 
 */
function HTMLDecode(text) {
    var temp = document.createElement("div");
    temp.innerHTML = text;
    var output = temp.innerText || temp.textContent;
    temp = null;
    return output;
}

/**
 * 提供 String 是否以 特定字符串结尾 的函数
 */
String.prototype.endWith = function(endStr) {
    var d = this.length - endStr.length;
    return (d >= 0 && this.lastIndexOf(endStr) == d)
}