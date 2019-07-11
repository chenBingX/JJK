function getArticles() {
    let url = "https://api.github.com/repos/chenBingX/CoorChiceArticale/contents";
    $.get(url, function(data, status) {
        if (status == "success" && data != null) {
            getArticles2(data[6].url);
        }
    });
}

function getArticles2(url) {
    $.get(url, function(data, status) {
        if (status == "success" && data != null) {
            console.log("data = " + JSON.stringify(data));
            data.forEach(element => {
                if (element.type == "file") {
                    console.log("article = " + JSON.stringify(element));
                    let a_str = "<a href='article.html?article_url=" + element.download_url + "'>" + element.name + "</a>";
                    console.log(a_str);
                    let a = $(a_str);
                    $("section.content2").append(a).append($("<br>"));
                } else if (element.type == "dir") {
                    console.log("文件夹");
                }
            });
        }
    });
}

function goToArticalPage(url) {
    window.location.href = "article.html?article_url=" + url;
}