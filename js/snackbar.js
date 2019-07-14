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
            $(this).addClass("snackbar_hover");
            $('#arrow').addClass("arrow_hover");
            $('#operationPanel').addClass("operationPanel_hover");
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
    if ($('#snackbar').hasClass('snackbar_hover')) {
        $('#snackbar').removeClass('snackbar_hover');
        $('#arrow').removeClass('arrow_hover');
        $('#operationPanel').removeClass("operationPanel_hover");
    } else {
        $('#snackbar').addClass("snackbar_hover");
        $('#arrow').addClass("arrow_hover");
        $('#operationPanel').addClass("operationPanel_hover");
    }
}