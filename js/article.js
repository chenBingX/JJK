function getArticleContent() {
    var url = getQueryString('article_url');
    if (url != null) {
        $.get(url, function(data, status) {
            if (status == "success") {
                let html_content = marked(data);
                console.log(html_content);
                $(".article_pre").append(html_content);

                document.title = $("h1")[0].innerHTML;

                // hljs.configure({ useBR: true });
                $('pre code').each(function(i, block) {
                    hljs.highlightBlock(block);
                });
            }
        });
    }
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