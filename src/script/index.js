import {
    w
} from './wtools';

let songdata = [{
    "songid": 1,
    "songname": "Fine乐团 - 感性",
    "like": "",
    "songpath": "http://7xurqc.com1.z0.glb.clouddn.com/Fine%E4%B9%90%E5%9B%A2%20-%20%E6%84%9F%E6%80%A7.mp3"
}]

let currentPlay = 1,
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
        w.removaAllChildNodes(w.$('#songListUl'))
        for (let op in songdata) {
            let l = document.createElement('li');
            l.innerHTML = songdata[op].songname;
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
        for (let op in songdata) {
            if (songdata[op].songid == el) {
                currentPlay = songdata[op].songid
                w.$('#audioControl').src = songdata[op].songpath
                w.$('#progressLine').style.width = 0
                w.$('#songCover').src = "http://7xurqc.com1.z0.glb.clouddn.com/%E9%BB%98%E8%AE%A4%E5%B0%81%E9%9D%A2.jpg"
                w.$('#songName').innerHTML = songdata[op].songname
                document.title = songdata[op].songname
                if (songdata[op].like != "") {
                    if (songdata[op].like == "y") {
                        w.$('#songLove').style.color = "#F00"
                        w.$('#songDisLove').style.color = "#000"
                    } else if (songdata[op].like == "n") {
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
    }
    apause() {
        if (w.$('#audioControl').paused) {
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
        progressFlag = setInterval(getProgress, 1000)
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
        let sw = parseInt(loopstyle)
        switch (sw) {
            case 0:
                loopstyle = 1
                w.replaceClass(w.$('#songCycle'), "icon-xunhuan", "icon-danquxunhuan")
                break
            case 1:
                loopstyle = 2
                w.replaceClass(w.$('#songCycle'), "icon-danquxunhuan", "icon-suiji")
                break
            case 2:
                loopstyle = 0
                w.replaceClass(w.$('#songCycle'), "icon-suiji", "icon-xunhuan")
                break
            default:
                loopstyle = 0
                w.removeClass(w.$('#songCycle'), "icon-suiji")
                w.removeClass(w.$('#songCycle'), "icon-danquxunhuan")
                w.addClass(w.$('#songCycle'), "icon-xunhuan")
                break
        }
    }
    setVolume() {
        let mouseX = event.clientX,
            voluemeLWidth = w.$('#voluemeL').offsetWidth,
            voluemeLLeft =w.$('#voluemeL').getBoundingClientRect().left
        w.$('#audioControl').volume = (mouseX - voluemeLLeft) / 50
        w.$('#voluemeLength').style.width = (mouseX - voluemeLLeft) / 50 * 100 + "%"
        w.$('#songVolume').style.color = "#555"
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
        let mouseX = event.clientX,
            playWidth = w.$('#playProgress').offsetWidth,
            playmeLLeft = w.$('#playProgress').getBoundingClientRect().left
        w.$('#audioControl').currentTime = (mouseX - playmeLLeft) / 450 * w.$('#audioControl').duration
        w.$('#progressLine').style.width = (mouseX - playmeLLeft) / 450 * 100 + "%"
    }
    gettime() {
        w.$('#songTime').innerHTML = "-" + w.formatSeconds(w.$('#audioControl').duration - w.$('#audioControl')
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
const getLike = function (ele) {
    let islikes = 0;
    for (let op in songdata) {
        if (songdata[op].songid == ele)
            if (songdata[op].like == "n") {
                islikes = 1
            } else {
                islikes = 2
            }
    }
    return islikes
}

const setLike = function (ele) {
    let islikes = 0;
    for (let op in songdata) {
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

const setdisLike = function (ele) {
    let islikes = 0;
    for (let op in songdata) {
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

const setNameColor = function (el) {
    let uls = document.getElementById('songListUl')
    let items = uls.getElementsByTagName("li")
    for (let i = 0; i < items.length; i++) {
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
const getPriNo = function () {
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
const getNextNo = function () {
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
const getrandom = function () {
    let ne = parseInt(Math.random() * (parseInt(songDataLength) + 1) + 1)
    if (ne == parseInt(currentPlay) || getLike(ne) == 1 || ne == "NaN") {
        getrandom()
    } else {
        currentPlay = ne
    }
}

// video的播放条
const getProgress = function () {
    let percent = w.$('#audioControl').currentTime / w.$('#audioControl').duration
    w.$('#progressLine').style.width = (percent * 100).toFixed(1) + "%"
    myplay.gettime()
}

//下一首播啥
const howNextPlay = function () {
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

//添加歌曲
const songpush = function (adName, adPath) {
    let sd = {
        "songid": songdata.length + 1,
        "songname": adName,
        "like": "",
        "songpath": adPath
    }
    songdata.push(JSON.parse(JSON.stringify(sd)))
    myplay.listFill()
}


//添加歌曲
const addMusics = function () {
    // console.log("refresh")
}

const myplay = new audioPlay()

window.onload = function () {
    console.log("https://github.com/kelrvins/MusicPlay")
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
    w.addEvent(w.$('#songVolume'), "click", function () {

        let vo = 0.5;
        if (w.$('#audioControl').volume == 0) {
            w.$('#audioControl').volume = vo
            w.$('#songVolume').style.color = "#555"
        } else {
            vo = w.$('#audioControl').volume
            w.$('#audioControl').volume = 0
            w.$('#songVolume').style.color = "#f00"
        }
    })
    w.addEvent(w.$('#songListShow'), "click", function () {
        myplay.closeSongL()
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
        let lis = document.getElementsByTagName("Li")
        let target = event.target || event.srcElement
        if (!!target && target.nodeName.toUpperCase() === 'LI') {
            console.log(target.value)
            myplay.ainit(target.value)
            myplay.apause()
        }
    })
    w.addEvent(w.$('#addSongList'), "click", function () {
        addMusics()
    })
    w.addEvent(w.$('#inputAddSong'), "change", function () {
        // console.log("change")
        const files = w.$('#inputAddSong').files
        for (let i = 0; i < files.length; i++) {
            if ((files[i].type).indexOf("audio") != -1 && files[i].size > 8094) {
                // console.log(files[i].name, URL.createObjectURL(files[i]))
                songpush(files[i].name.substring(0, files[i].name.lastIndexOf(".")), URL.createObjectURL(files[i]))
                myplay.listFill()
            }
        }
    })
}