

function requestData(obj) {
    const Http = new XMLHttpRequest();
    const url = "https://raw.githubusercontent.com/chenBingX/img/master/其它文件/page1";
    Http.open("GET", url, true);
    Http.send(null);
    console.log("请求开始");
    Http.onreadystatechange = function () {
        console.log("readyState = " + Http.readyState);
        console.log("status = " + Http.status);
        console.log("responseType = " + Http.responseType);
        if (Http.readyState == 4 && Http.status == 200) {
            console.log("请求完成");
            console.log("responseText = " + Http.responseText);
            let resultView = document.getElementById("resultView");
            resultView.innerHTML = Http.responseText;
            resultView.scrollIntoView(true);

            let data = JSON.parse(Http.responseText);
            // resultView.innerHTML=data.toString();

            let showDataElement = document.getElementById("showData");
            showDataElement.innerHTML = "viewUrl：" + data.viewUrl;

            let img = document.createElement("img");
            img.src = data.viewUrl;
            img.width = 200;
            document.body.appendChild(img);

            let imgObj = new Image();
            imgObj.src = data.viewUrl;
            imgObj.onload = function(){
                console.log("width = " + imgObj.width);
            }
        }
    }
    Http.onprogress = updateProgress;
}

function updateProgress(event) {
    if (event.lengthComputable) {
        console.log("total = " + event.total);
        console.log("loaded = " + event.loaded);
        try {
            console.log("percent = " + (event.loaded / event.total));
        } catch (error) {

        }
    }
}