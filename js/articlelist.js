var id = 0;

function generateId() {
    return ++id;
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
        if (rootFile.articles instanceof Array) {
            rootFile.articles.forEach(e => {
                renderFile(e);
            });
        }
        if (rootFile.dirs instanceof Array) {
            rootFile.dirs.forEach(e => {
                changeSubFileShoeState(null, e.subclass);
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
            let a_str = "<a href='javascript:void(0)' onclick='openArticlePage(event,\"" + file.element.download_url + "\")'>" + file.space + "~ " + article_name + "</a>";
            let a = $("<li class='" + file.class + "'>" + a_str + "</li>");
            $("#list").append(a);
        } else if (file.type == "dir") {
            let a_str = "<a class='title' href='javascript:void(0)' onclick='changeSubFileShoeState(this, " + file.subclass + ")'>" + file.space + "+ " + file.element.name + "</a>";
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

function openArticlePage(e, url) {
    if (url != null) {
        let tUrl;
        if (url.endWith('.jpg') ||
            url.endWith('.png') ||
            url.endWith('.gif') ||
            url.endWith('.svg') ||
            url.endWith('.webp')
        ) {
            console.log("src = " + $('#imgcontent').attr("src"));
            console.log("url = " + url);
            if ($('#imgcontent').css("display") == "none" ||
                $('#imgcontent').attr("src") != url) {
                $('#img').attr("src", url);
                $('#imgcontent').css("display", "flex");
            } else {
                $('#imgcontent').css("display", "none");
            }
        } else {
            $('#imgcontent').css("display", "none");
            if (url.endWith('.mp4') ||
                url.endWith('.3gp') ||
                url.endWith('.avi') ||
                url.endWith('.wmv') ||
                url.endWith('.flv') ||
                url.endWith('.mov') ||

                url.endWith('.zip') ||
                url.endWith('.rar') ||
                url.endWith('.7z') ||
                url.endWith('.apk') ||
                url.endWith('.aar') ||
                url.endWith('.awb') ||
                url.endWith('.so') ||
                url.endWith('.a') ||
                url.endWith('.o') ||
                url.endWith('.frameworke') ||
                url.endWith('.dylib') ||
                url.endWith('.jar') ||
                url.endWith('.ipa') ||
                url.endWith('.exe') ||
                url.endWith('.sketch') ||
                url.endWith('.pdf') ||
                url.endWith('.dmg') ||
                url.endWith('.xmind') ||
                url.endWith('.class')
            ) {
                tUrl = url;
            } else {
                tUrl = "article.html?article_url=" + url + "&t=" + getQueryString('t');
            }
            window.open(tUrl, '_blank');
        }

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
        if (ele != null) {
            $(ele).text($(ele).text().replace("+", "-"));
        }
    } else {
        $("." + cla).css("display", "none");
        if (ele != null) {
            $(ele).text($(ele).text().replace("-", "+"));
        }
    }
    $('#imgcontent').css("display", "none");
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
                data.forEach(element => {
                    if (element.type == "file" && element.name != null && element.name.charAt(0) != ".") {
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