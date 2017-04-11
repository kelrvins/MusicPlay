import songdata from './songdata.json';
import {
    w
} from './wtools';

var currentPlay = 1,
    songDataLength = 0,
    loopstyle = 0,
    progressFlag = null;

class audioPlay {
    constructor() {
        this.listFill()
        this.ainit(1)
        w.$('#voluemeLength').style.width = (w.$('#audioControl').volume) * 100 + "%"
    }
    listFill() {
        removaAllNodes(w.$('#songListUl'))
        for (var op in songdata) {
            let l = document.createElement('li');
            l.innerHTML = songdata[op].songname + " - " + songdata[op].songauthor;
            l.value = songdata[op].songid;
            if (songdata[op].like == "y") {
                l.className = "ilikesong"
            }
            if (songdata[op].like == "n") {
                l.className = "dislikesong"
            }
            w.$('#songListUl').appendChild(l);
            songDataLength = op
            setNameColor(currentPlay)
        }
    }
    ainit(el, eve) {
        for (var op in songdata) {
            if (songdata[op].songid == el) {
                currentPlay = songdata[op].songid
                w.$('#audioControl').src = songdata[op].songpath
                w.$('#progressLine').style.width = 0
                if (songdata[op].songpic.trim() != "") {
                    w.$('#songCover').src = songdata[op].songpic
                } else {
                    w.$('#songCover').src = "src/static/默认封面.jpg"
                }
                w.$('#songName').innerHTML = songdata[op].songname
                document.title = songdata[op].songname
                w.$('#songAuthor').innerHTML = songdata[op].songauthor
                if (songdata[op].like != "") {
                    if (songdata[op].like == "y") {
                        w.$('#songLove').style.color = "#F00"
                        w.$('#songDisLove').style.color = "#000"
                    }
                    if (songdata[op].like == "n") {
                        w.$('#songLove').style.color = "#000"
                        w.$('#songDisLove').style.color = "#F00"
                    }
                } else {
                    w.$('#songDisLove').style.color = "#000"
                    w.$('#songLove').style.color = "#000"
                }
                setNameColor(currentPlay)
            }
        }
        canPlayer()
    }
    apause() {
        if (w.$('#audioControl').paused) {
            // console.log("play");
            this.aplay()
        } else {
            // console.log("pause");
            w.$('#audioControl').pause()
            w.$('#songPause').className = w.$('#songPause').className.replace('zanting', 'bofang')
            clearInterval(progressFlag)
        }
    }
    aplay() {
        w.$('#audioControl').play()
        w.$('#songPause').className = w.$('#songPause').className.replace('bofang', 'zanting')
        progressFlag = setInterval(getProgress, 100)
    }
    aprevious() {
        // console.log("previous")
        this.setend()
        getPriNo()
        this.ainit(currentPlay, "pre")
        this.aplay()
    }
    anext() {
        // console.log("next")
        this.setend()
        getNextNo()
        this.ainit(currentPlay, "next")
        this.aplay()
    }
    alike() {
        // console.log("alike:" + currentPlay)
        setLike(parseInt(currentPlay))
    }
    adislike() {
        // console.log("alike:" + currentPlay)
        setdisLike(parseInt(currentPlay))
    }
    adownload() {
        console.log("download")
    }
    aloop() {
        //0：列表循环  1：单曲 2：随机
        // console.log("aloop")
        var sw = parseInt(loopstyle)
        switch (sw) {
            case 0:
                loopstyle = 1
                w.$('#songCycle').style.color = "#f00"
                break
            case 1:
                loopstyle = 2
                w.$('#songCycle').style.color = "rgb(10, 162, 0)"
                break
            case 2:
                loopstyle = 0
                w.$('#songCycle').style.color = "#000"
                break
            default:
                loopstyle = 0
                w.$('#songCycle').style.color = "#000"
                break
        }
    }
    setVolume() {
        var mouseX = event.clientX,
            voluemeLWidth = w.$('#voluemeL').offsetWidth,
            voluemeLLeft = (document.body.clientWidth - w.$('#playProgress').offsetParent.offsetWidth) / 2 + w.$('#voluemeL').offsetParent.offsetLeft + w.$('#voluemeL').offsetParent.offsetWidth + 15
        console.log(mouseX, voluemeLWidth, voluemeLLeft)
        w.$('#audioControl').volume = (mouseX - voluemeLLeft) / 50
        w.$('#voluemeLength').style.width = (mouseX - voluemeLLeft) / 50 * 100 + "%"
    }
    setRandom() {
        getrandom()
        this.ainit(parseInt(currentPlay), "next")
        this.apause()
    }
    setend() {
        w.$('#songPause').className = w.$('#songPause').className.replace('zanting', 'bofang')
        w.$('#audioControl').currentTime = 0
        w.$('#progressLine').style.width = 0 + "%"
    }
    setPlayProgress() {
        // console.log("setPlayProgress")
        var mouseX = event.clientX,
            playWidth = w.$('#playProgress').offsetWidth,
            playmeLLeft = (document.body.clientWidth - w.$('#playProgress').offsetParent.offsetWidth) / 2 + w.$('#playProgress').offsetLeft
        console.log(mouseX, playWidth, playmeLLeft)
        w.$('#audioControl').currentTime = (mouseX - playmeLLeft) / 450 * w.$('#audioControl').duration
        w.$('#progressLine').style.width = (mouseX - playmeLLeft) / 450 * 100 + "%"
    }
    gettime() {
        w.$('#songTime').innerHTML = "-" + formatSeconds(w.$('#audioControl').duration - w.$('#audioControl')
            .currentTime)
    }
    closeSongL() {
        if (w.$('#wrapList').style.visibility == "hidden") {
            w.$('#wrapList').style.visibility = "visible"
        } else {
            w.$('#wrapList').style.visibility = "hidden"
        }
    }
}

//return 0:nothing 1:dis 2:like
var getLike = function (ele) {
    var islikes = 0;
    for (var op in songdata) {
        if (songdata[op].songid == ele)
            if (songdata[op].like == "n") {
                islikes = 1
            } else {
                islikes = 2
            }
    }
    return islikes
}

var setLike = function (ele) {
    var islikes = 0;
    for (var op in songdata) {
        if (songdata[op].songid == ele)
            if (songdata[op].like == "y") {
                songdata[op].like = ""
                w.$('#songLove').style.color = "#000"
                w.$('#songDisLove').style.color = "#000"
            } else {
                songdata[op].like = "y"
                w.$('#songLove').style.color = "#f00"
                w.$('#songDisLove').style.color = "#000"
            }
    }
    myplay.listFill()
}

var setdisLike = function (ele) {
    var islikes = 0;
    for (var op in songdata) {
        if (songdata[op].songid == ele)
            if (songdata[op].like == "n") {
                songdata[op].like = ""
                w.$('#songLove').style.color = "#000"
                w.$('#songDisLove').style.color = "#000"
            } else {
                songdata[op].like = "n"
                w.$('#songDisLove').style.color = "#f00"
                w.$('#songLove').style.color = "#000"
            }
    }
    myplay.listFill()
}

//判断读取的是否为可用音乐文件
var canPlayer = function () {
    var timelength;
    var timeC = setInterval(function () {
        timelength = w.$('#audioControl').duration
    }, 500);

    function cleart() {
        clearInterval(timeC);
        (function () {
            var at = parseInt(timelength) + "ss"
            if (at == "NaNss") {
                alert("文件错误")
                howNextPlay()
            }
        })()
    }
    setTimeout(cleart, 1500)
}

//删除所有节点
var removaAllNodes = function (ele) {
    while (ele.hasChildNodes()) {
        ele.removeChild(ele.lastChild)
    }
}

var setNameColor = function (el) {
    var uls = document.getElementById('songListUl')
    var items = uls.getElementsByTagName("li")
    for (var i = 0; i < items.length; i++) {
        // console.log(items[i].value)
        items[i].style.fontWeight = "normal"
        items[i].style.color = "#777"
        if (items[i].value == el) {
            items[i].style.fontWeight = "bold"
            items[i].style.color = "#000"
        }
    }
}
//向上获取序号
var getPriNo = function () {
    if (parseInt(currentPlay) == 1) {
        currentPlay = parseInt(songDataLength) + 1
    } else {
        currentPlay--
    }
    if (getLike(parseInt(currentPlay)) == 1) {
        getPriNo()
    }

}

//向下获取序号
var getNextNo = function () {
    if (parseInt(currentPlay) == parseInt(songDataLength) + 1) {
        currentPlay = 1
    } else {
        currentPlay++
    }
    if (getLike(parseInt(currentPlay)) == 1) {
        getNextNo()
    }

}

// 获取随机播放
var getrandom = function () {
    var ne = parseInt(Math.random() * (parseInt(songDataLength) + 1) + 1)
    if (ne == parseInt(currentPlay) || getLike(ne) == 1 || ne == "NaN") {
        getrandom()
    } else {
        currentPlay = ne
    }
}

// video的播放条
var getProgress = function () {
    var percent = w.$('#audioControl').currentTime / w.$('#audioControl').duration
    w.$('#progressLine').style.width = (percent * 100).toFixed(1) + "%"
    myplay.gettime()
}

//下一首播啥
var howNextPlay = function () {
    switch (parseInt(loopstyle)) {
        case 0:
            myplay.anext()
            break
        case 2:
            myplay.setRandom()
            break
        default:
            myplay.anext()
            break
    }
}
//格式化时间
var formatSeconds = function (value) {
    var theTime = parseInt(value) // 秒
    var theTime1 = 0 // 分
    var theTime2 = 0 // 小时
    if (theTime > 60) {
        theTime1 = parseInt(theTime / 60)
        theTime = parseInt(theTime % 60)
        if (theTime1 > 60) {
            theTime2 = parseInt(theTime1 / 60)
            theTime1 = parseInt(theTime1 % 60)
        }
    }
    var result = "" + parseInt(theTime)
    if (theTime1 > 0) {
        if (theTime < 10) {
            result = "" + ((theTime1 < 10) ? "0" + theTime1 : theTime1) + ":0" + result
        } else {
            result = "" + ((theTime1 < 10) ? "0" + theTime1 : theTime1) + ":" + result
        }
    }
    if (theTime2 > 0) {
        result = "" + parseInt(theTime2) + ":" + result
    }
    if (result == "NaN") {
        return "--:--"
    } else {
        return result
    }
}

//添加歌曲
var addMusics = function () {
    var adName = w.$('#usongname').value;
    var adAuthor = w.$('#usongauthor').value;
    var adPath = w.$('#usonpath').value;
    if (adName.trim() == "" || adAuthor.trim() == "" || adPath.trim() == "") {
        w.$('#upnotice').innerHTML = "请正确填写"
        console.log(adName + "," + adAuthor + "," + adPath)
    } else {
        w.$('#upnotice').innerHTML = ""
    }
}

//添加歌曲
var addMusicfloder = function () {
    var adPaths = w.$('#usonpaths').value;
    if (adPaths.trim() == "") {
        w.$('#upnotices').innerHTML = "请正确填写"
    } else {
        w.$('#upnotices').innerHTML = ""
    }
}

let myplay = new audioPlay()

window.onload = function () {
    w.addEvent(w.$('#songPrevious'), "click", function () {
        myplay.aprevious()
    })
    w.addEvent(w.$('#songPause'), "click", function () {
        myplay.apause()
    })
    w.addEvent(w.$('#songNext'), "click", function () {
        myplay.anext()
    })
    w.addEvent(w.$('#songDownload'), "click", function () {
        myplay.adownload()
    })
    w.addEvent(w.$('#voluemeL'), "click", function () {
        myplay.setVolume()
    })
    w.addEvent(w.$('#playProgress'), "click", function () {
        myplay.setPlayProgress()
    })
    w.addEvent(w.$('#closeSongList'), "click", function () {
        myplay.closeSongL()
    })
    w.addEvent(w.$('#songListShow'), "click", function () {
        myplay.closeSongL()
    })
    w.addEvent(w.$('#audioControl'), "canplay", function () {
        myplay.gettime()
    })
    w.addEvent(w.$('#audioControl'), "ended", function () {
        myplay.setend()
        howNextPlay()
    })
    w.addEvent(w.$('#songLove'), "click", function () {
        myplay.alike()
    })
    w.addEvent(w.$('#songDisLove'), "click", function () {
        myplay.adislike()
    })
    w.addEvent(w.$('#songCycle'), "click", function () {
        myplay.aloop()
    })
    w.addEvent(w.$('#songListUl'), "click", function () {
        var lis = document.getElementsByTagName("Li")
        var target = event.target || event.srcElement
        if (!!target && target.nodeName.toUpperCase() === 'LI') {
            console.log(target.value)
            myplay.ainit(target.value)
            myplay.apause()
        }
    })
    w.addEvent(w.$('#maskwrap'), "click", function () {
        w.$('#maskwrap').style.display = "none";
        w.$('#addMusic').style.display = "none";
        w.$('#addMusics').style.display = "none";
    })
    w.addEvent(w.$('#addSongList'), "click", function () {
        w.$('#maskwrap').style.display = "block";
        w.$('#addMusic').style.display = "block";
    })
    w.addEvent(w.$('#addSongLists'), "click", function () {
        w.$('#maskwrap').style.display = "block";
        w.$('#addMusics').style.display = "block";
    })
    w.addEvent(w.$('#songSubmit'), "click", function () {
        addMusics();
    })
    w.addEvent(w.$('#songSubmits'), "click", function () {
        addMusicfloder();
    })
    w.addEvent(w.$('#usonpath'), "change", function () {
        if (w.$('#usonpath').value == null) {
            w.$('#ulabelurl').innerHTML = "多个文件"
        } else {
            w.$('#ulabelurl').innerHTML = w.$('#usonpath').value 
        }
    })
    w.addEvent(w.$('#usonpaths'), "change", function () {
        if (w.$('#usonpaths').value == null) {
            w.$('#ulabelurls').innerHTML = "多个文件"
        } else {
            w.$('#ulabelurls').innerHTML = w.$('#usonpaths').value 
        }
    })
}