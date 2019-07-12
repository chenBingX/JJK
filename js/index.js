function gotoArticleListPage() {
    let url = "article_list.html";
    let t = getQueryString("t");
    if (t != null && t != "") {
        url = url + "?t=" + t;
    }
    gotoPage(url);
}