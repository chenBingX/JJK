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

function openBlogHome() {
    let url = 'https://github.com/' + getT();
    gotoPageWithNewWindow(url);
}

function share() {
    let msg = "https://chenbingx.github.io/JJK/?t=" + getT();
    let r = prompt('复制下面链接，分享你的个人专属博客链接吧 👏👏👏', msg);
    // if (age != null) {
    //   alert('你按了【确定】按钮！');
    // } else {
    //   alert('你点了【取消】按钮哦！');
    // }
}