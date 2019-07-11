function getArticles(url) {
    $.ajax({
        type: "GET",
        url: url,
        cache: true,
        beforeSend: function(request) {
            request.setRequestHeader("Authorization", "token 3592734248df224971b6690fe6431add200e181b");
        },
        success: function(data, status, xhr) {
            if (status == "success" && data != null) {
                data.forEach(element => {
                    getSubarticles(element.url);
                });
            }
        }
    });
}

function getSubarticles(url) {
    $.ajax({
        type: "GET",
        url: url,
        cache: true,
        beforeSend: function(request) {
            request.setRequestHeader("Authorization", "token 3592734248df224971b6690fe6431add200e181b");
        },
        success: function(data, status, xhr) {
            if (status == "success" && data != null) {
                console.log("data = " + JSON.stringify(data));
                data.forEach(element => {
                    if (element.type == "file") {
                        console.log("article = " + JSON.stringify(element));
                        let a_str = "<a href='article.html?article_url=" + element.download_url + "' target='_blank'>" + element.name + "</a>";
                        console.log(a_str);
                        let a = $(a_str);
                        $("section.content").append(a).append($("<br>"));
                    } else if (element.type == "dir") {
                        console.log("文件夹");
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