function addSnackbar() {
    $('head').append($('<link rel="stylesheet" type="text/css" href="css/snackbar.css">'));

    let html = '<section id="snackbar" class="snackbar">' +
        '<img id="arrow" class="arrow" src="res/img/uparrow.png" onclick="changeShowState()">' +
        '<div id="operationPanel" class="operationPanel">' +
        '<a class="op" href="https://github.com/chenBingX/JJK" title="支持你喜爱的 JJK 吧！😘" target="_blank"><img src="res/img/jjklogo.png"></a>' +
        '<a class="op" href="javascript:openBlogHome()" title="博客主页"><img id="userHome" src="res/img/userhome.png"></a>' +
        '<a class="op" href="javascript:share()" title="分享"><img src="res/img/share.png"></a>' +
        '</div>' +
        '</section>' +
        '<script>' +
        '  getUserAvatar();' +
        '  initHover();' +
        '</script>';

    $("body").append($(html));
}


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
 * 前往页面-窗口不变
 * @param {*} url 
 */
function gotoPage(url) {
    window.location.href = url;
}

/**
 * 前往页面-新窗口
 * @param {*} url 
 */
function gotoPageWithNewWindow(url) {
    window.open(url, '_blank');
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

function getT() {
    let t = getQueryString("t");
    if (t == null || t == "" || t == "null") {
        t = "chenBingX/CoorChiceArticale";
    }
    return t;
}


var os = function() {
    var ua = navigator.userAgent,
        isWindowsPhone = /(?:Windows Phone)/.test(ua),
        isSymbian = /(?:SymbianOS)/.test(ua) || isWindowsPhone,
        isAndroid = /(?:Android)/.test(ua),
        isFireFox = /(?:Firefox)/.test(ua),
        isChrome = /(?:Chrome|CriOS)/.test(ua),
        isTablet = /(?:iPad|PlayBook)/.test(ua) || (isAndroid && !/(?:Mobile)/.test(ua)) || (isFireFox && /(?:Tablet)/.test(ua)),
        isPhone = /(?:iPhone)/.test(ua) && !isTablet,
        isPc = !isPhone && !isAndroid && !isSymbian;
    return {
        isTablet: isTablet,
        isPhone: isPhone,
        isAndroid: isAndroid,
        isPc: isPc
    }
};

function isPc() {
    return !(/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent));
}