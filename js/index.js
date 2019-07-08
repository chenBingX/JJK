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
                "<link rel=\"stylesheet\" type=\"text/css\" href=\"css/html.css\"" +
                // "<script type=\"text/javascript\" src=\"js/markdown.js\"></script>" +
                // "<script>hljs.initHighlightingOnLoad();</script>" +
                "</head>" +
                "<body>" +
                html_content +
                "</body>" +
                "</html>";
            document.write(html);
        }
    });
}