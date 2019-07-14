function gotoArticleListPage() {
    let url = "article_list.html";
    let t = getQueryString("t");
    if (t == null || t == "") {
        t = "chenBingX/CoorChiceArticale";
    }
    url = url + "?t=" + t;
    gotoPage(url);
}