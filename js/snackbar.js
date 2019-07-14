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
    console.log("os.ua = " + ua);
    return {
        isTablet: isTablet,
        isPhone: isPhone,
        isAndroid: isAndroid,
        isPc: isPc
    }
};


function getUserAvatar() {
    let = userName = getT().split("/")[0];
    let url = "https://api.github.com/users/" + userName;
    $.get(url, function(data, status) {
        if (status == "success" && data != null) {
            $("#userHome").attr("src", data.avatar_url);
            $("#userHome").parent().attr("title", userName + "的主页");
        }
    });
}

function initHover() {
    $('#snackbar').hover(
        function() {
            if (isPc()) {
                $(this).addClass("snackbar_hover");
                $('#arrow').addClass("arrow_hover");
                $('#operationPanel').addClass("operationPanel_hover");
            }
        },
        function() {
            $(this).removeClass("snackbar_hover");
            $('#arrow').removeClass("arrow_hover");
            $('#operationPanel').removeClass("operationPanel_hover");
        }
    );

}

function openBlogHome() {
    let url = 'https://github.com/' + getT();
    gotoPageWithNewWindow(url);
}

function share() {
    let msg = "https://chenbingx.github.io/JJK/?t=" + getT();
    let r = prompt('复制下面链接，分享你的个人专属博客链接吧 👏👏👏', msg);
}

function changeShowState() {
    if (!isPc()) {
        if ($('#snackbar').attr('class').indexOf('snackbar_hover') != -1) {
            $('#snackbar').removeClass('snackbar_hover');
            $('#arrow').removeClass('arrow_hover');
            $('#operationPanel').removeClass("operationPanel_hover");
        } else {
            $('#snackbar').addClass("snackbar_hover");
            $('#arrow').addClass("arrow_hover");
            $('#operationPanel').addClass("operationPanel_hover");
        }
    }
}