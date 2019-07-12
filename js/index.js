function gotoArticleListPage() {
    let url = "article_list.html";
    let t = getQueryString("t");
    if (t != null && t != "") {
        url = url + "?t=" + t;
    }
    gotoPage(url);
}

// function test() {
//     $.get("https://raw.githubusercontent.com/chenBingX/CoorChiceArticale/master/SuperTextView%E6%96%87%E6%A1%A3/Github%E7%89%88%E6%9C%AC-%E4%B8%AD%E6%96%87.md", function(data, status) {
//         if (status == "success") {
//             let md = data.responseText;
//             // let html_content = markdown.toHTML(data);
//             let html_content = marked(data);
//             console.log(html_content);
//             let html = "<!DOCTYPE html>" +
//                 "<html>" +
//                 "<head>" +
//                 // "<link rel=\"stylesheet\" type=\"text/css\" href=\"css/highlight_1.css\">" +
//                 // "<script type=\"text/javascript\" src=\"js/highlight.js\"></script>" +

//                 "<link rel=\"stylesheet\" type=\"text/css\" href=\"css/html_style_1.css\">" +

//                 "<link rel=\"stylesheet\" href=\"http://cdn.bootcss.com/highlight.js/8.0/styles/monokai_sublime.min.css\">" +
//                 "<script src=\"http://cdn.bootcss.com/highlight.js/8.0/highlight.min.js\"></script>" +
//                 "<script>hljs.initHighlightingOnLoad();</script>" +
//                 "</head>" +
//                 "<body>" +
//                 html_content +
//                 "</body>" +
//                 "</html>";
//             document.write(html);

//             $("pre").attr("class", "java");
//         }
//     });
// }