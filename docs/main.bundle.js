/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var insert = __webpack_require__(3);
var normalize = __webpack_require__(4);

insert(normalize);


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__wtools__ = __webpack_require__(6);


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
        __WEBPACK_IMPORTED_MODULE_0__wtools__["a" /* w */].$('#voluemeLength').style.width = (__WEBPACK_IMPORTED_MODULE_0__wtools__["a" /* w */].$('#audioControl').volume) * 100 + "%"
    }
    listFill() {
        __WEBPACK_IMPORTED_MODULE_0__wtools__["a" /* w */].removaAllChildNodes(__WEBPACK_IMPORTED_MODULE_0__wtools__["a" /* w */].$('#songListUl'))
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
            __WEBPACK_IMPORTED_MODULE_0__wtools__["a" /* w */].$('#songListUl').appendChild(l);
            songDataLength = op
            setNameColor(currentPlay)
        }
    }
    ainit(el, eve) {
        for (let op in songdata) {
            if (songdata[op].songid == el) {
                currentPlay = songdata[op].songid
                __WEBPACK_IMPORTED_MODULE_0__wtools__["a" /* w */].$('#audioControl').src = songdata[op].songpath
                __WEBPACK_IMPORTED_MODULE_0__wtools__["a" /* w */].$('#progressLine').style.width = 0
                __WEBPACK_IMPORTED_MODULE_0__wtools__["a" /* w */].$('#songCover').src = "http://7xurqc.com1.z0.glb.clouddn.com/%E9%BB%98%E8%AE%A4%E5%B0%81%E9%9D%A2.jpg"
                __WEBPACK_IMPORTED_MODULE_0__wtools__["a" /* w */].$('#songName').innerHTML = songdata[op].songname
                document.title = songdata[op].songname
                if (songdata[op].like != "") {
                    if (songdata[op].like == "y") {
                        __WEBPACK_IMPORTED_MODULE_0__wtools__["a" /* w */].$('#songLove').style.color = "#F00"
                        __WEBPACK_IMPORTED_MODULE_0__wtools__["a" /* w */].$('#songDisLove').style.color = "#000"
                    } else if (songdata[op].like == "n") {
                        __WEBPACK_IMPORTED_MODULE_0__wtools__["a" /* w */].$('#songLove').style.color = "#000"
                        __WEBPACK_IMPORTED_MODULE_0__wtools__["a" /* w */].$('#songDisLove').style.color = "#F00"
                    }
                } else {
                    __WEBPACK_IMPORTED_MODULE_0__wtools__["a" /* w */].$('#songDisLove').style.color = "#000"
                    __WEBPACK_IMPORTED_MODULE_0__wtools__["a" /* w */].$('#songLove').style.color = "#000"
                }
                setNameColor(currentPlay)
            }
        }
    }
    apause() {
        if (__WEBPACK_IMPORTED_MODULE_0__wtools__["a" /* w */].$('#audioControl').paused) {
            this.aplay()
        } else {
            // console.log("pause");
            __WEBPACK_IMPORTED_MODULE_0__wtools__["a" /* w */].$('#audioControl').pause()
            __WEBPACK_IMPORTED_MODULE_0__wtools__["a" /* w */].$('#songPause').className = __WEBPACK_IMPORTED_MODULE_0__wtools__["a" /* w */].$('#songPause').className.replace('zanting', 'bofang')
            clearInterval(progressFlag)
        }
    }
    aplay() {
        __WEBPACK_IMPORTED_MODULE_0__wtools__["a" /* w */].$('#audioControl').play()
        __WEBPACK_IMPORTED_MODULE_0__wtools__["a" /* w */].$('#songPause').className = __WEBPACK_IMPORTED_MODULE_0__wtools__["a" /* w */].$('#songPause').className.replace('bofang', 'zanting')
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
                __WEBPACK_IMPORTED_MODULE_0__wtools__["a" /* w */].replaceClass(__WEBPACK_IMPORTED_MODULE_0__wtools__["a" /* w */].$('#songCycle'), "icon-xunhuan", "icon-danquxunhuan")
                break
            case 1:
                loopstyle = 2
                __WEBPACK_IMPORTED_MODULE_0__wtools__["a" /* w */].replaceClass(__WEBPACK_IMPORTED_MODULE_0__wtools__["a" /* w */].$('#songCycle'), "icon-danquxunhuan", "icon-suiji")
                break
            case 2:
                loopstyle = 0
                __WEBPACK_IMPORTED_MODULE_0__wtools__["a" /* w */].replaceClass(__WEBPACK_IMPORTED_MODULE_0__wtools__["a" /* w */].$('#songCycle'), "icon-suiji", "icon-xunhuan")
                break
            default:
                loopstyle = 0
                __WEBPACK_IMPORTED_MODULE_0__wtools__["a" /* w */].removeClass(__WEBPACK_IMPORTED_MODULE_0__wtools__["a" /* w */].$('#songCycle'), "icon-suiji")
                __WEBPACK_IMPORTED_MODULE_0__wtools__["a" /* w */].removeClass(__WEBPACK_IMPORTED_MODULE_0__wtools__["a" /* w */].$('#songCycle'), "icon-danquxunhuan")
                __WEBPACK_IMPORTED_MODULE_0__wtools__["a" /* w */].addClass(__WEBPACK_IMPORTED_MODULE_0__wtools__["a" /* w */].$('#songCycle'), "icon-xunhuan")
                break
        }
    }
    setVolume() {
        let mouseX = event.clientX,
            voluemeLWidth = __WEBPACK_IMPORTED_MODULE_0__wtools__["a" /* w */].$('#voluemeL').offsetWidth,
            voluemeLLeft =__WEBPACK_IMPORTED_MODULE_0__wtools__["a" /* w */].$('#voluemeL').getBoundingClientRect().left
        __WEBPACK_IMPORTED_MODULE_0__wtools__["a" /* w */].$('#audioControl').volume = (mouseX - voluemeLLeft) / 50
        __WEBPACK_IMPORTED_MODULE_0__wtools__["a" /* w */].$('#voluemeLength').style.width = (mouseX - voluemeLLeft) / 50 * 100 + "%"
        __WEBPACK_IMPORTED_MODULE_0__wtools__["a" /* w */].$('#songVolume').style.color = "#555"
    }
    setRandom() {
        getrandom()
        this.ainit(parseInt(currentPlay), "next")
        this.apause()
    }
    setend() {
        __WEBPACK_IMPORTED_MODULE_0__wtools__["a" /* w */].$('#songPause').className = __WEBPACK_IMPORTED_MODULE_0__wtools__["a" /* w */].$('#songPause').className.replace('zanting', 'bofang')
        __WEBPACK_IMPORTED_MODULE_0__wtools__["a" /* w */].$('#audioControl').currentTime = 0
        __WEBPACK_IMPORTED_MODULE_0__wtools__["a" /* w */].$('#progressLine').style.width = 0 + "%"
    }
    setPlayProgress() {
        // console.log("setPlayProgress")
        let mouseX = event.clientX,
            playWidth = __WEBPACK_IMPORTED_MODULE_0__wtools__["a" /* w */].$('#playProgress').offsetWidth,
            playmeLLeft = __WEBPACK_IMPORTED_MODULE_0__wtools__["a" /* w */].$('#playProgress').getBoundingClientRect().left
        __WEBPACK_IMPORTED_MODULE_0__wtools__["a" /* w */].$('#audioControl').currentTime = (mouseX - playmeLLeft) / 450 * __WEBPACK_IMPORTED_MODULE_0__wtools__["a" /* w */].$('#audioControl').duration
        __WEBPACK_IMPORTED_MODULE_0__wtools__["a" /* w */].$('#progressLine').style.width = (mouseX - playmeLLeft) / 450 * 100 + "%"
    }
    gettime() {
        __WEBPACK_IMPORTED_MODULE_0__wtools__["a" /* w */].$('#songTime').innerHTML = "-" + __WEBPACK_IMPORTED_MODULE_0__wtools__["a" /* w */].formatSeconds(__WEBPACK_IMPORTED_MODULE_0__wtools__["a" /* w */].$('#audioControl').duration - __WEBPACK_IMPORTED_MODULE_0__wtools__["a" /* w */].$('#audioControl')
            .currentTime)
    }
    closeSongL() {
        if (__WEBPACK_IMPORTED_MODULE_0__wtools__["a" /* w */].$('#wrapList').style.visibility == "hidden") {
            __WEBPACK_IMPORTED_MODULE_0__wtools__["a" /* w */].$('#wrapList').style.visibility = "visible"
        } else {
            __WEBPACK_IMPORTED_MODULE_0__wtools__["a" /* w */].$('#wrapList').style.visibility = "hidden"
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
                __WEBPACK_IMPORTED_MODULE_0__wtools__["a" /* w */].$('#songLove').style.color = "#000"
                __WEBPACK_IMPORTED_MODULE_0__wtools__["a" /* w */].$('#songDisLove').style.color = "#000"
            } else {
                songdata[op].like = "y"
                __WEBPACK_IMPORTED_MODULE_0__wtools__["a" /* w */].$('#songLove').style.color = "#f00"
                __WEBPACK_IMPORTED_MODULE_0__wtools__["a" /* w */].$('#songDisLove').style.color = "#000"
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
                __WEBPACK_IMPORTED_MODULE_0__wtools__["a" /* w */].$('#songLove').style.color = "#000"
                __WEBPACK_IMPORTED_MODULE_0__wtools__["a" /* w */].$('#songDisLove').style.color = "#000"
            } else {
                songdata[op].like = "n"
                __WEBPACK_IMPORTED_MODULE_0__wtools__["a" /* w */].$('#songDisLove').style.color = "#f00"
                __WEBPACK_IMPORTED_MODULE_0__wtools__["a" /* w */].$('#songLove').style.color = "#000"
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
    let percent = __WEBPACK_IMPORTED_MODULE_0__wtools__["a" /* w */].$('#audioControl').currentTime / __WEBPACK_IMPORTED_MODULE_0__wtools__["a" /* w */].$('#audioControl').duration
    __WEBPACK_IMPORTED_MODULE_0__wtools__["a" /* w */].$('#progressLine').style.width = (percent * 100).toFixed(1) + "%"
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
    __WEBPACK_IMPORTED_MODULE_0__wtools__["a" /* w */].addEvent(__WEBPACK_IMPORTED_MODULE_0__wtools__["a" /* w */].$('#songPrevious'), "click", function () {
        myplay.aprevious()
    })
    __WEBPACK_IMPORTED_MODULE_0__wtools__["a" /* w */].addEvent(__WEBPACK_IMPORTED_MODULE_0__wtools__["a" /* w */].$('#songPause'), "click", function () {
        myplay.apause()
    })
    __WEBPACK_IMPORTED_MODULE_0__wtools__["a" /* w */].addEvent(__WEBPACK_IMPORTED_MODULE_0__wtools__["a" /* w */].$('#songNext'), "click", function () {
        myplay.anext()
    })
    __WEBPACK_IMPORTED_MODULE_0__wtools__["a" /* w */].addEvent(__WEBPACK_IMPORTED_MODULE_0__wtools__["a" /* w */].$('#songDownload'), "click", function () {
        myplay.adownload()
    })
    __WEBPACK_IMPORTED_MODULE_0__wtools__["a" /* w */].addEvent(__WEBPACK_IMPORTED_MODULE_0__wtools__["a" /* w */].$('#voluemeL'), "click", function () {
        myplay.setVolume()
    })
    __WEBPACK_IMPORTED_MODULE_0__wtools__["a" /* w */].addEvent(__WEBPACK_IMPORTED_MODULE_0__wtools__["a" /* w */].$('#playProgress'), "click", function () {
        myplay.setPlayProgress()
    })
    __WEBPACK_IMPORTED_MODULE_0__wtools__["a" /* w */].addEvent(__WEBPACK_IMPORTED_MODULE_0__wtools__["a" /* w */].$('#closeSongList'), "click", function () {
        myplay.closeSongL()
    })
    __WEBPACK_IMPORTED_MODULE_0__wtools__["a" /* w */].addEvent(__WEBPACK_IMPORTED_MODULE_0__wtools__["a" /* w */].$('#songVolume'), "click", function () {

        let vo = 0.5;
        if (__WEBPACK_IMPORTED_MODULE_0__wtools__["a" /* w */].$('#audioControl').volume == 0) {
            __WEBPACK_IMPORTED_MODULE_0__wtools__["a" /* w */].$('#audioControl').volume = vo
            __WEBPACK_IMPORTED_MODULE_0__wtools__["a" /* w */].$('#songVolume').style.color = "#555"
        } else {
            vo = __WEBPACK_IMPORTED_MODULE_0__wtools__["a" /* w */].$('#audioControl').volume
            __WEBPACK_IMPORTED_MODULE_0__wtools__["a" /* w */].$('#audioControl').volume = 0
            __WEBPACK_IMPORTED_MODULE_0__wtools__["a" /* w */].$('#songVolume').style.color = "#f00"
        }
    })
    __WEBPACK_IMPORTED_MODULE_0__wtools__["a" /* w */].addEvent(__WEBPACK_IMPORTED_MODULE_0__wtools__["a" /* w */].$('#songListShow'), "click", function () {
        myplay.closeSongL()
    })
    __WEBPACK_IMPORTED_MODULE_0__wtools__["a" /* w */].addEvent(__WEBPACK_IMPORTED_MODULE_0__wtools__["a" /* w */].$('#audioControl'), "ended", function () {
        myplay.setend()
        howNextPlay()
    })
    __WEBPACK_IMPORTED_MODULE_0__wtools__["a" /* w */].addEvent(__WEBPACK_IMPORTED_MODULE_0__wtools__["a" /* w */].$('#songLove'), "click", function () {
        myplay.alike()
    })
    __WEBPACK_IMPORTED_MODULE_0__wtools__["a" /* w */].addEvent(__WEBPACK_IMPORTED_MODULE_0__wtools__["a" /* w */].$('#songDisLove'), "click", function () {
        myplay.adislike()
    })
    __WEBPACK_IMPORTED_MODULE_0__wtools__["a" /* w */].addEvent(__WEBPACK_IMPORTED_MODULE_0__wtools__["a" /* w */].$('#songCycle'), "click", function () {
        myplay.aloop()
    })
    __WEBPACK_IMPORTED_MODULE_0__wtools__["a" /* w */].addEvent(__WEBPACK_IMPORTED_MODULE_0__wtools__["a" /* w */].$('#songListUl'), "click", function () {
        let lis = document.getElementsByTagName("Li")
        let target = event.target || event.srcElement
        if (!!target && target.nodeName.toUpperCase() === 'LI') {
            console.log(target.value)
            myplay.ainit(target.value)
            myplay.apause()
        }
    })
    __WEBPACK_IMPORTED_MODULE_0__wtools__["a" /* w */].addEvent(__WEBPACK_IMPORTED_MODULE_0__wtools__["a" /* w */].$('#addSongList'), "click", function () {
        addMusics()
    })
    __WEBPACK_IMPORTED_MODULE_0__wtools__["a" /* w */].addEvent(__WEBPACK_IMPORTED_MODULE_0__wtools__["a" /* w */].$('#inputAddSong'), "change", function () {
        // console.log("change")
        const files = __WEBPACK_IMPORTED_MODULE_0__wtools__["a" /* w */].$('#inputAddSong').files
        for (let i = 0; i < files.length; i++) {
            if ((files[i].type).indexOf("audio") != -1 && files[i].size > 8094) {
                // console.log(files[i].name, URL.createObjectURL(files[i]))
                songpush(files[i].name.substring(0, files[i].name.lastIndexOf(".")), URL.createObjectURL(files[i]))
                myplay.listFill()
            }
        }
    })
}

/***/ }),
/* 3 */
/***/ (function(module, exports) {

var inserted = [];

module.exports = function (css) {
    if (inserted.indexOf(css) >= 0) return;
    inserted.push(css);
    
    var elem = document.createElement('style');
    var text = document.createTextNode(css);
    elem.appendChild(text);
    
    if (document.head.childNodes.length) {
        document.head.insertBefore(elem, document.head.childNodes[0]);
    }
    else {
        document.head.appendChild(elem);
    }
};


/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = "/*! normalize.css v2.1.3 | MIT License | git.io/normalize */\n\n/* ==========================================================================\n   HTML5 display definitions\n   ========================================================================== */\n\n/**\n * Correct `block` display not defined in IE 8/9.\n */\n\narticle,\naside,\ndetails,\nfigcaption,\nfigure,\nfooter,\nheader,\nhgroup,\nmain,\nnav,\nsection,\nsummary {\n    display: block;\n}\n\n/**\n * Correct `inline-block` display not defined in IE 8/9.\n */\n\naudio,\ncanvas,\nvideo {\n    display: inline-block;\n}\n\n/**\n * Prevent modern browsers from displaying `audio` without controls.\n * Remove excess height in iOS 5 devices.\n */\n\naudio:not([controls]) {\n    display: none;\n    height: 0;\n}\n\n/**\n * Address `[hidden]` styling not present in IE 8/9.\n * Hide the `template` element in IE, Safari, and Firefox < 22.\n */\n\n[hidden],\ntemplate {\n    display: none;\n}\n\n/* ==========================================================================\n   Base\n   ========================================================================== */\n\n/**\n * 1. Set default font family to sans-serif.\n * 2. Prevent iOS text size adjust after orientation change, without disabling\n *    user zoom.\n */\n\nhtml {\n    font-family: sans-serif; /* 1 */\n    -ms-text-size-adjust: 100%; /* 2 */\n    -webkit-text-size-adjust: 100%; /* 2 */\n}\n\n/**\n * Remove default margin.\n */\n\nbody {\n    margin: 0;\n}\n\n/* ==========================================================================\n   Links\n   ========================================================================== */\n\n/**\n * Remove the gray background color from active links in IE 10.\n */\n\na {\n    background: transparent;\n}\n\n/**\n * Address `outline` inconsistency between Chrome and other browsers.\n */\n\na:focus {\n    outline: thin dotted;\n}\n\n/**\n * Improve readability when focused and also mouse hovered in all browsers.\n */\n\na:active,\na:hover {\n    outline: 0;\n}\n\n/* ==========================================================================\n   Typography\n   ========================================================================== */\n\n/**\n * Address variable `h1` font-size and margin within `section` and `article`\n * contexts in Firefox 4+, Safari 5, and Chrome.\n */\n\nh1 {\n    font-size: 2em;\n    margin: 0.67em 0;\n}\n\n/**\n * Address styling not present in IE 8/9, Safari 5, and Chrome.\n */\n\nabbr[title] {\n    border-bottom: 1px dotted;\n}\n\n/**\n * Address style set to `bolder` in Firefox 4+, Safari 5, and Chrome.\n */\n\nb,\nstrong {\n    font-weight: bold;\n}\n\n/**\n * Address styling not present in Safari 5 and Chrome.\n */\n\ndfn {\n    font-style: italic;\n}\n\n/**\n * Address differences between Firefox and other browsers.\n */\n\nhr {\n    -moz-box-sizing: content-box;\n    box-sizing: content-box;\n    height: 0;\n}\n\n/**\n * Address styling not present in IE 8/9.\n */\n\nmark {\n    background: #ff0;\n    color: #000;\n}\n\n/**\n * Correct font family set oddly in Safari 5 and Chrome.\n */\n\ncode,\nkbd,\npre,\nsamp {\n    font-family: monospace, serif;\n    font-size: 1em;\n}\n\n/**\n * Improve readability of pre-formatted text in all browsers.\n */\n\npre {\n    white-space: pre-wrap;\n}\n\n/**\n * Set consistent quote types.\n */\n\nq {\n    quotes: \"\\201C\" \"\\201D\" \"\\2018\" \"\\2019\";\n}\n\n/**\n * Address inconsistent and variable font size in all browsers.\n */\n\nsmall {\n    font-size: 80%;\n}\n\n/**\n * Prevent `sub` and `sup` affecting `line-height` in all browsers.\n */\n\nsub,\nsup {\n    font-size: 75%;\n    line-height: 0;\n    position: relative;\n    vertical-align: baseline;\n}\n\nsup {\n    top: -0.5em;\n}\n\nsub {\n    bottom: -0.25em;\n}\n\n/* ==========================================================================\n   Embedded content\n   ========================================================================== */\n\n/**\n * Remove border when inside `a` element in IE 8/9.\n */\n\nimg {\n    border: 0;\n}\n\n/**\n * Correct overflow displayed oddly in IE 9.\n */\n\nsvg:not(:root) {\n    overflow: hidden;\n}\n\n/* ==========================================================================\n   Figures\n   ========================================================================== */\n\n/**\n * Address margin not present in IE 8/9 and Safari 5.\n */\n\nfigure {\n    margin: 0;\n}\n\n/* ==========================================================================\n   Forms\n   ========================================================================== */\n\n/**\n * Define consistent border, margin, and padding.\n */\n\nfieldset {\n    border: 1px solid #c0c0c0;\n    margin: 0 2px;\n    padding: 0.35em 0.625em 0.75em;\n}\n\n/**\n * 1. Correct `color` not being inherited in IE 8/9.\n * 2. Remove padding so people aren't caught out if they zero out fieldsets.\n */\n\nlegend {\n    border: 0; /* 1 */\n    padding: 0; /* 2 */\n}\n\n/**\n * 1. Correct font family not being inherited in all browsers.\n * 2. Correct font size not being inherited in all browsers.\n * 3. Address margins set differently in Firefox 4+, Safari 5, and Chrome.\n */\n\nbutton,\ninput,\nselect,\ntextarea {\n    font-family: inherit; /* 1 */\n    font-size: 100%; /* 2 */\n    margin: 0; /* 3 */\n}\n\n/**\n * Address Firefox 4+ setting `line-height` on `input` using `!important` in\n * the UA stylesheet.\n */\n\nbutton,\ninput {\n    line-height: normal;\n}\n\n/**\n * Address inconsistent `text-transform` inheritance for `button` and `select`.\n * All other form control elements do not inherit `text-transform` values.\n * Correct `button` style inheritance in Chrome, Safari 5+, and IE 8+.\n * Correct `select` style inheritance in Firefox 4+ and Opera.\n */\n\nbutton,\nselect {\n    text-transform: none;\n}\n\n/**\n * 1. Avoid the WebKit bug in Android 4.0.* where (2) destroys native `audio`\n *    and `video` controls.\n * 2. Correct inability to style clickable `input` types in iOS.\n * 3. Improve usability and consistency of cursor style between image-type\n *    `input` and others.\n */\n\nbutton,\nhtml input[type=\"button\"], /* 1 */\ninput[type=\"reset\"],\ninput[type=\"submit\"] {\n    -webkit-appearance: button; /* 2 */\n    cursor: pointer; /* 3 */\n}\n\n/**\n * Re-set default cursor for disabled elements.\n */\n\nbutton[disabled],\nhtml input[disabled] {\n    cursor: default;\n}\n\n/**\n * 1. Address box sizing set to `content-box` in IE 8/9/10.\n * 2. Remove excess padding in IE 8/9/10.\n */\n\ninput[type=\"checkbox\"],\ninput[type=\"radio\"] {\n    box-sizing: border-box; /* 1 */\n    padding: 0; /* 2 */\n}\n\n/**\n * 1. Address `appearance` set to `searchfield` in Safari 5 and Chrome.\n * 2. Address `box-sizing` set to `border-box` in Safari 5 and Chrome\n *    (include `-moz` to future-proof).\n */\n\ninput[type=\"search\"] {\n    -webkit-appearance: textfield; /* 1 */\n    -moz-box-sizing: content-box;\n    -webkit-box-sizing: content-box; /* 2 */\n    box-sizing: content-box;\n}\n\n/**\n * Remove inner padding and search cancel button in Safari 5 and Chrome\n * on OS X.\n */\n\ninput[type=\"search\"]::-webkit-search-cancel-button,\ninput[type=\"search\"]::-webkit-search-decoration {\n    -webkit-appearance: none;\n}\n\n/**\n * Remove inner padding and border in Firefox 4+.\n */\n\nbutton::-moz-focus-inner,\ninput::-moz-focus-inner {\n    border: 0;\n    padding: 0;\n}\n\n/**\n * 1. Remove default vertical scrollbar in IE 8/9.\n * 2. Improve readability and alignment in all browsers.\n */\n\ntextarea {\n    overflow: auto; /* 1 */\n    vertical-align: top; /* 2 */\n}\n\n/* ==========================================================================\n   Tables\n   ========================================================================== */\n\n/**\n * Remove most spacing between table cells.\n */\n\ntable {\n    border-collapse: collapse;\n    border-spacing: 0;\n}\n"


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(1);
__webpack_require__(0);
__webpack_require__(2);

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * 自用框架
 * import { w } from './wtool';
 * w.$('node')  获取单个元素
 * w.$$('node')  获取多个的元素
 * w.hasClass(elementId, cName)  检查元素是否有指定class
 * w.addClass(elementId, cName)  添加class
 * w.replaceClass(elementId, cName,nName)  替换class
 * w.removeClass(elementId, cName)   删除class
 * w.removaAllChildNodes(elementId)   删除所有子节点
 * w.addEvent(elementId, event, func)  添加事件
 * w.formatSeconds(value)  把数值格式化为时间
 * w.attr(node, attr, newVal)  获取或设置元素属性 newVal为空是为查询
 */
const w = {
    /**
     * 获取单个的元素
     * 
     * @param {String} selector
     * @param {Element} [context=document]
     * @returns {Element} element
     */
    $: (selector, context = document) => {
        if (context instanceof NodeList) {
            return Array.from(context, node => {
                return node.querySelector(selector);
            })
        }
        return context.querySelector(selector);
    },

    /**
     * 获取多个的元素
     * 
     * @param {String} selector
     * @param {Element} [context=document]
     * @returns {Element} element
     */
    $$: (selector, context = document) => {
        if (context instanceof NodeList) {
            return Array.from(context, node => {
                return node.querySelectorAll(selector);
            })
        }
        return context.querySelectorAll(selector);
    },
    /**
     * 检查元素是否有指定class
     * 
     * @param {String} cName
     * @param {Element} elementId
     * @returns {boolean} boolean
     */
    hasClass(elementId, cName) {
        return !!elementId.className.match(new RegExp("(\\s|^)" + cName + "(\\s|$)"));
    },
    /**
     * 元素添加class
     * 
     * @param {String} cName
     * @param {Element} elementId
     */
    addClass(elementId, cName) {
        if (!w.hasClass(elementId, cName)) {
            elementId.className += " " + cName;
        }
    },
    /**
     * 元素替换class
     * 
     * @param {Element} elementId
     * @param {String} cName
     * @param {String} nName
     */
    replaceClass(elementId, cName, nName) {
        w.removeClass(elementId, cName)
        w.addClass(elementId, nName)
    },
    /**
     * 元素删除class
     * 
     * @param {String} cName
     * @param {Element} elementId
     */
    removeClass(elementId, cName) {
        if (w.hasClass(elementId, cName)) {
            elementId.className = elementId.className.replace(new RegExp('(^|\\b)' + cName.split(' ').join('|') + '(\\b|$)', 'gi'), '');
        }
    },
    /**
     * 删除所有子节点
     * 
     * @param {Element} elementId
     */
    removaAllChildNodes(elementId) {
        while (elementId.hasChildNodes()) {
            elementId.removeChild(elementId.lastChild)
        }
    },

    /**
     * 获取或设置元素属性
     * 
     * @param {Element} node
     * @param {String} attr
     * @param {String} [newVal=null]
     * @returns {String} element's attribute value or null
     */
    attr: (node, attr, newVal = null) => {
        if (newVal) {
            node.setAttribute(attr, newVal);
            return;
        }
        return node.getAttribute(attr);
    },
    /**
     * 添加事件
     * 
     * @param {Element} elementId
     * @param {String} event
     * @param {String} func
     */
    addEvent(elementId, event = click, func) {
        if (elementId != null) {
            if (elementId.addEventListener) {
                elementId.addEventListener(event, func, false);
            } else if (elementId.attachEvent) {
                elementId.attachEvent('on' + event, func);
            } else {
                elementId['on' + event] = func;
            }
        } else {
            console.log("elementId:null")
            return false
        }
    },
    /**
     * 将数值格式化为时间
     * 
     * @param {String} value
     * @returns {String} timr or NaN
     */
    formatSeconds(value) {
        var minute = parseInt(value / 60)
        var second = parseInt(value - minute * 60)
        var result
        second = (second >= 10) ? second : '0' + second
        result = minute + ":" + second
        if (result == "NaN:NaN") {
            return "--:--"
        } else {
            return result
        }
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = w;


/***/ })
/******/ ]);