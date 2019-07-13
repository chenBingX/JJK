var id = 0;

function generateId() {
    return ++id;
}


String.prototype.endWith = function(endStr) {
    var d = this.length - endStr.length;
    return (d >= 0 && this.lastIndexOf(endStr) == d)
}

function startRequestArticles(url) {
    var rootFile = new Object();
    var ajaxBack = $.ajax;
    var ajaxCount = 0;
    var allAjaxDone = function() {
        // console.log("rootFile = " + JSON.stringify(rootFile));
        if (rootFile.dirs instanceof Array) {
            rootFile.dirs.forEach(e => {
                renderFile(e);
            });
        }
        $("p#bottom").text("|");
        $("p#bottom").css("animation", "blinkAnim 0.9s infinite");
    }
    $.ajax = function(setting) {
        ajaxCount++;
        var cb = setting.complete;
        setting.complete = function() {
            if ($.isFunction(cb)) {
                cb.apply(setting.context, arguments);
            }
            ajaxCount--;
            if (ajaxCount == 0 && $.isFunction(allAjaxDone)) {
                allAjaxDone();
            }
        }
        ajaxBack(setting);

    }
    getArticles(url, 0, rootFile, generateId());
}



function renderFile(file) {
    if (file != null) {
        if (file.type == "file") {
            let article_name = file.element.name.replace(".md", "");
            // let a_str = "<a href='article.html?article_url=" + file.element.download_url + "' target='_blank'>" + file.space + "~ " + article_name + "</a>";
            let a_str = "<a href='javascript:openArticlePage(" + file.element.download_url + ")'>" + file.space + "~ " + article_name + "</a>";
            let a = $("<li class='" + file.class + "'>" + a_str + "</li>");
            $("#list").append(a);
        } else if (file.type == "dir") {
            let a_str = "<a class='title' href='javascript:void(0)' onclick='changeSubFileShoeState(this, " + file.subclass + ")'>" + file.space + "- " + file.element.name + "</a>";
            let a = $("<li class='" + file.class + "'>" + a_str + "</li>");
            $("#list").append(a);
            if (file.dirs instanceof Array) {
                file.dirs.forEach(e => {
                    renderFile(e);
                });
            }
            if (file.articles instanceof Array) {
                file.articles.forEach(e => {
                    renderFile(e);
                });
            }
        }
    }
}

function openArticlePage(url) {
    if (url != null) {
        let tUrl;
        if (url.endWith('.jpg') ||
            url.endWith('.png') ||
            url.endWith('.gif') ||
            url.endWith('.svg') ||
            url.endWith('.webp') ||
            url.endWith('.mp4')
        ) {
            tUrl = url;
        } else {
            tUrl = "article.html?article_url=" + url;
        }
        window.open(tUrl, '_blank');
    }

}

function changeSubFileShoeState(ele, cla) {
    let cur = $("." + cla).css("display");
    if (cur == "none") {
        $("." + cla).css("display", "inline");
        $('.' + cla + ' [class = "title"]').each(function() {
            if ($(this).text().indexOf("+") != -1) {
                $(this).text($(this).text().replace("+", "-"));
            }
        });
        $(ele).text($(ele).text().replace("+", "-"));
    } else {
        $("." + cla).css("display", "none");
        $(ele).text($(ele).text().replace("-", "+"));
    }
}


function getArticles(url, spaceCount, file, id) {
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
                let space = "";
                for (let i = 0; i < spaceCount; i++) {
                    space += "&nbsp;&nbsp;&nbsp;";
                }
                // console.log("space = " + space + "!");
                data.forEach(element => {
                    // if (element.type == "file" && element.name.indexOf(".md") != -1 && element.name != "README.md") {
                    if (element.type == "file" && element.name != "README.md") {
                        if (file.articles == null) {
                            file.articles = new Array();
                        }
                        file.articles.push({ element: element, class: (file.class == null ? ("" + id) : (file.class + " " + id)), type: "file", space: space });
                    } else if (element.type == "dir" && element.name.indexOf(".") == -1) {
                        if (file.dirs == null) {
                            file.dirs = new Array();
                        }
                        let subFile = { element: element, class: (file.class == null ? ("" + id) : (file.class + " " + id)), subclass: "" + generateId(), type: "dir", space: space };
                        file.dirs.push(subFile);
                        getArticles(element.url, spaceCount + 1, subFile, subFile.subclass);
                    }
                });
            }
        }
    });
}

function goToArticalPage(url) {
    window.location.href = "article.html?article_url=" + url;
}