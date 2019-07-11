var token = "token e2d4e6c541bb41efcd1a9e6e8e06dd59a46138f2"

function getArticles(url) {
    $.ajax({
        type: "GET",
        url: url,
        cache: true,
        async: true,
        beforeSend: function(request) {
            // request.setRequestHeader("Authorization", token);
        },
        success: function(data, status, xhr) {
            if (status == "success" && data != null && data instanceof Array) {
                // console.log("data = " + JSON.stringify(data));
                data.forEach(element => {
                    if (element.type == "file" && element.name.indexOf(".md") != -1 && element.name != "README.md") {
                        // console.log("article = " + JSON.stringify(element));
                        let article_name = element.name.replace(".md", "");
                        let a_str = "<a href='article.html?article_url=" + element.download_url + "' target='_blank'>" + article_name + "</a>";
                        let a = $(a_str);
                        $("section.content").append(a).append($("<br>"));
                    } else if (element.type == "dir" && element.name.indexOf(".") == -1) {
                        ("-------------------这是一个文件夹!-------------------");
                        getArticles(element.url);
                    }
                });
            }
        }
    });
}

function goToArticalPage(url) {
    window.location.href = "article.html?article_url=" + url;
}