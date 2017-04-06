var songdata = [{
    songid: "1",
    songname: "感性",
    songauthor: "Fine乐团",
    like: "n",
    songpath: "src/static/Fine乐团 - 感性.mp3",
    songpic: "src/static/感性.jpg"
}, {
    songid: "2",
    songname: "烟花易冷",
    songauthor: "周杰伦",
    like: "y",
    songpath: "src/static/周杰伦 - 烟花易冷.mp3",
    songpic: ""
}, {
    songid: "3",
    songname: "异乡人",
    songauthor: "李健",
    like: "",
    songpath: "src/static/李健 - 异乡人.mp3",
    songpic: "src/static/异乡人.jpg"
}, {
    songid: "4",
    songname: "当你",
    songauthor: "林俊杰",
    like: "",
    songpath: "src/static/林俊杰 - 当你.mp3",
    songpic: "src/static/当你.jpg"
}]

var currentPlay = 1,
    songDataLength = 0,
    loopstyle = 0,
    progressFlag = null;

$ = function (ele) {
    return document.getElementById(ele);
}

//设置兼容事件
let addEvent = function (ele, event, func) {
    if (ele.addEventListener) {
        ele.addEventListener(event, func, false);
    } else if (ele.attachEvent) {
        ele.attachEvent('on' + event, func);
    } else {
        ele['on' + event] = func;
    }
}


class audioPlay {
    constructor() {
        this.listFill()
        this.ainit(1)
        $('voluemeLength').style.width = ($('audioControl').volume) * 100 + "%"
    }
    listFill() {
        removaAllNodes($('songListUl'))
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
            $('songListUl').appendChild(l);
            songDataLength = op
            setNameColor(currentPlay)
        }
    }
    ainit(el, eve) {
        for (var op in songdata) {
            if (songdata[op].songid == el) {
                currentPlay = songdata[op].songid
                $('audioControl').src = songdata[op].songpath
                $('progressLine').style.width = 0
                if (songdata[op].songpic.trim() != "") {
                    $('songCover').src = songdata[op].songpic
                } else {
                    $('songCover').src = "src/static/默认封面.jpg"
                }
                $('songName').innerHTML = songdata[op].songname
                document.title = songdata[op].songname
                $('songAuthor').innerHTML = songdata[op].songauthor
                if (songdata[op].like != "") {
                    if (songdata[op].like == "y") {
                        $('songLove').style.color = "#F00"
                        $('songDisLove').style.color = "#000"
                    }
                    if (songdata[op].like == "n") {
                        $('songLove').style.color = "#000"
                        $('songDisLove').style.color = "#F00"
                    }
                } else {
                    $('songDisLove').style.color = "#000"
                    $('songLove').style.color = "#000"
                }
                setNameColor(currentPlay)
            }
        }
    }
    apause() {
        if ($('audioControl').paused) {
            // console.log("play");
            $('audioControl').play()
            $('songPause').className = $('songPause').className.replace('bofang', 'zanting')
            progressFlag = setInterval(getProgress, 60)
        } else {
            // console.log("pause");
            $('audioControl').pause()
            $('songPause').className = $('songPause').className.replace('zanting', 'bofang')
            clearInterval(progressFlag)
        }
    }
    aprevious() {
        // console.log("previous")
        this.setend()
        getPriNo()
        this.ainit(currentPlay, "pre")
        $('audioControl').play()
        $('songPause').className = $('songPause').className.replace('bofang', 'zanting')
        progressFlag = setInterval(getProgress, 100)
    }
    anext() {
        // console.log("next")
        this.setend()
        getNextNo()
        this.ainit(currentPlay, "next")
        $('audioControl').play()
        $('songPause').className = $('songPause').className.replace('bofang', 'zanting')
        progressFlag = setInterval(getProgress, 100)
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
                $('songCycle').style.color = "#f00"
                break
            case 1:
                loopstyle = 2
                $('songCycle').style.color = "rgb(10, 162, 0)"
                break
            case 2:
                loopstyle = 0
                $('songCycle').style.color = "#000"
                break
            default:
                loopstyle = 0
                $('songCycle').style.color = "#000"
                break
        }
    }
    setVolume() {
        // console.log("setVolume")
        var mouseX = event.clientX,
            voluemeLWidth = $('voluemeL').offsetWidth,
            voluemeLLeft = getOffsetLeft($('voluemeL'))
        // console.log(mouseX, voluemeLWidth, voluemeLLeft)
        $('audioControl').volume = (mouseX - voluemeLLeft) / 50
        $('voluemeLength').style.width = (mouseX - voluemeLLeft) / 50 * 100 + "%"
    }
    setRandom() {
        // console.log("setRandom")
        getrandom()
        // console.log("random:" + parseInt(currentPlay))
        this.ainit(parseInt(currentPlay), "next")
        this.apause()
    }
    setend() {
        // console.log("setend")
        $('songPause').className = $('songPause').className.replace('zanting', 'bofang')
        $('audioControl').currentTime = 0
        $('progressLine').style.width = 0 + "%"
    }
    setPlayProgress() {
        // console.log("setProgress")
        var mouseX = event.clientX,
            playWidth = $('playProgress').offsetWidth,
            playmeLLeft = getOffsetLeft($('playProgress'))
        // console.log(mouseX, playWidth, playmeLLeft)
        $('audioControl').currentTime = (mouseX - playmeLLeft) / 434 * $('audioControl').duration
        $('progressLine').style.width = (mouseX - playmeLLeft) / 434 * 100 + "%"
    }
    gettime() {
        $('songTime').innerHTML = "-" + formatSeconds($('audioControl').duration - $('audioControl')
            .currentTime)
    }
    closeSongL() {
        if ($('wrapList').style.visibility == "hidden") {
            $('wrapList').style.visibility = "visible"
        } else {
            $('wrapList').style.visibility = "hidden"
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
                $('songLove').style.color = "#000"
                $('songDisLove').style.color = "#000"
            } else {
                songdata[op].like = "y"
                $('songLove').style.color = "#f00"
                $('songDisLove').style.color = "#000"
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
                $('songLove').style.color = "#000"
                $('songDisLove').style.color = "#000"
            } else {
                songdata[op].like = "n"
                $('songDisLove').style.color = "#f00"
                $('songLove').style.color = "#000"
            }
    }
    myplay.listFill()
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
    var percent = $('audioControl').currentTime / $('audioControl').duration
    $('progressLine').style.width = (percent * 100).toFixed(1) + "%"
    myplay.gettime()
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

//获取距离页面左侧的距离
var getOffsetLeft = function (obj) {
    var tmp = obj.offsetLeft
    var val = obj.offsetParent
    while (val != null) {
        tmp += val.offsetLeft
        val = val.offsetParent
    }
    return tmp
}

let myplay = new audioPlay()

window.onload = function () {
    addEvent($('songPrevious'), "click", function () {
        myplay.aprevious()
    })
    addEvent($('songPause'), "click", function () {
        myplay.apause()
    })
    addEvent($('songNext'), "click", function () {
        myplay.anext()
    })
    addEvent($('songDownload'), "click", function () {
        myplay.adownload()
    })
    addEvent($('voluemeL'), "click", function () {
        myplay.setVolume()
    })
    addEvent($('playProgress'), "click", function () {
        myplay.setPlayProgress()
    })
    addEvent($('closeSongList'), "click", function () {
        myplay.closeSongL()
    })
    addEvent($('songListShow'), "click", function () {
        myplay.closeSongL()
    })
    addEvent($('audioControl'), "canplay", function () {
        myplay.gettime()
    })
    addEvent($('audioControl'), "ended", function () {
        myplay.setend()
        if (parseInt(loopstyle) == 0) {
            myplay.anext()
        } else if (parseInt(loopstyle) == 1) {
            myplay.apause()
        } else if (parseInt(loopstyle) == 2) {
            myplay.setRandom()
        }
    })
    addEvent($('songLove'), "click", function () {
        myplay.alike()
    })
    addEvent($('songDisLove'), "click", function () {
        myplay.adislike()
    })
    addEvent($('songCycle'), "click", function () {
        myplay.aloop()
    })
    addEvent($('songListUl'), "click", function () {
        var lis = document.getElementsByTagName("Li")
        var target = event.target || event.srcElement
        if (!!target && target.nodeName.toUpperCase() === 'LI') {
            console.log(target.value)
            myplay.ainit(target.value)
            myplay.apause()
        }
    })
}