function getArticles(url, spaceCount) {
    $.ajax({
        type: "GET",
        url: url,
        cache: true,
        async: false,
        beforeSend: function(request) {
            // request.setRequestHeader("Authorization", token);
        },
        success: function(data, status, xhr) {
            if (status == "success" && data != null && data instanceof Array) {
                // console.log("data = " + JSON.stringify(data));
                let space = "";
                for (let i = 0; i < spaceCount; i++) {
                    space += "&nbsp;&nbsp;&nbsp;";
                }
                console.log("space = " + space + "!");
                data.forEach(element => {
                    if (element.type == "file" && element.name.indexOf(".md") != -1 && element.name != "README.md") {
                        let article_name = element.name.replace(".md", "");
                        let a_str = "<a href='article.html?article_url=" + element.download_url + "' target='_blank'>" + space + "~ " + article_name + "</a>";
                        let a = $("<li>" + a_str + "</li>");
                        $("#list").append(a);
                    } else if (element.type == "dir" && element.name.indexOf(".") == -1) {
                        let a_str = "<a class='title' href='javascript:void(0)'>" + space + element.name + "</a>";
                        let a = $("<li>" + a_str + "</li>");
                        $("#list").append(a);
                        getArticles(element.url, spaceCount + 1);
                    }
                });
            }
        }
    });
}

function goToArticalPage(url) {
    window.location.href = "article.html?article_url=" + url;
}