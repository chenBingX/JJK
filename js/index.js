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
            console.log("articles = " + JSON.stringify(data));
            for (const article in data) {
                let a = $("<a></a>").attr("href", "article.html?article_url=" + article.download_url).text(article.name);
                console.log(a);
                $("section.content2").append(a);
            }
        }
    });
}


function goToArticalPage(url) {
    window.location.href = "article.html?article_url=" + url;
}

function test() {
    $.get("https://raw.githubusercontent.com/chenBingX/CoorChiceArticale/master/SuperTextView%E6%96%87%E6%A1%A3/Github%E7%89%88%E6%9C%AC-%E4%B8%AD%E6%96%87.md", function(data, status) {
        if (status == "success") {
            let md = data.responseText;
            // let html_content = markdown.toHTML(data);
            let html_content = marked(data);
            console.log(html_content);
            let html = "<!DOCTYPE html>" +
                "<html>" +
                "<head>" +
                // "<link rel=\"stylesheet\" type=\"text/css\" href=\"css/highlight_1.css\">" +
                // "<script type=\"text/javascript\" src=\"js/highlight.js\"></script>" +

                "<link rel=\"stylesheet\" type=\"text/css\" href=\"css/html_style_1.css\">" +

                "<link rel=\"stylesheet\" href=\"http://cdn.bootcss.com/highlight.js/8.0/styles/monokai_sublime.min.css\">" +
                "<script src=\"http://cdn.bootcss.com/highlight.js/8.0/highlight.min.js\"></script>" +
                "<script>hljs.initHighlightingOnLoad();</script>" +
                "</head>" +
                "<body>" +
                html_content +
                "</body>" +
                "</html>";
            document.write(html);

            $("pre").attr("class", "java");
        }
    });
}