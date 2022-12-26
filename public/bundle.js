/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/style.scss":
/*!************************!*\
  !*** ./src/style.scss ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/funcs.ts":
/*!**********************!*\
  !*** ./src/funcs.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RTCReceiver": () => (/* binding */ RTCReceiver),
/* harmony export */   "RTCSender": () => (/* binding */ RTCSender),
/* harmony export */   "RTCStatic": () => (/* binding */ RTCStatic)
/* harmony export */ });
class RTCStatic {
    rtcPeerConnection;
    channel;
    candidate = [];
    localStream;
    remoteStream;
    constructor() { }
    async createConnection() {
        await this.setLocalStream({ video: true, audio: false });
        this.rtcPeerConnection = new RTCPeerConnection({
            iceServers: [
                {
                    urls: 'stun:stun.l.google.com:19302',
                },
            ],
        });
        this.channel = this.rtcPeerConnection.createDataChannel('channel');
        this.channel.addEventListener('message', (e) => {
            console.log(e.data);
        });
        this.channel.addEventListener('open', (e) => {
            console.log('channel opened');
        });
        this.channel.addEventListener('close', (e) => {
            console.log('channel closed');
        });
        this.rtcPeerConnection.addEventListener('icecandidate', (e) => {
            if (e.candidate) {
                this.candidate.push(e.candidate);
            }
        });
        this.rtcPeerConnection.addEventListener('track', (e) => {
            const stream = e.streams[0];
            document.getElementById('local').srcObject = stream;
            this.remoteStream = stream;
            console.log('Set Track');
            stream.addEventListener('addtrack', (e) => {
                console.log('add', e.track.kind);
            });
            stream.addEventListener('removetrack', (e) => {
                console.log('removed', e.track.kind);
            });
        });
        this.localStream.getTracks().forEach((track) => {
            this.rtcPeerConnection.addTrack(track, this.localStream);
        });
        console.log('connection created');
    }
    async setLocalStream(config) {
        this.localStream = await navigator.mediaDevices.getUserMedia(config);
    }
    async receiveIceCandidate(candidate) {
        const candidates = JSON.parse(candidate);
        candidates.forEach((candidate) => {
            this.rtcPeerConnection.addIceCandidate(candidate);
        });
    }
}
class RTCSender extends RTCStatic {
    offer;
    constructor() {
        super();
    }
    async createOffer() {
        this.offer = await this.rtcPeerConnection.createOffer();
        this.rtcPeerConnection.setLocalDescription(this.offer);
        window.socket.emit('signaling', { type: 'offer', data: JSON.stringify(this.offer) });
    }
    async receiveAnswer(answer) {
        this.rtcPeerConnection.setRemoteDescription(JSON.parse(answer));
        window.socket.emit('signaling', { type: 'icecandidate', data: JSON.stringify(this.candidate) });
    }
}
class RTCReceiver extends RTCStatic {
    answer;
    constructor() {
        super();
    }
    async receiveOffer(offer) {
        await this.rtcPeerConnection.setRemoteDescription(JSON.parse(offer));
        this.answer = await this.rtcPeerConnection.createAnswer();
        this.rtcPeerConnection.setLocalDescription(this.answer);
        window.socket.emit('signaling', { type: 'answer', data: JSON.stringify(this.answer) });
    }
}



/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _funcs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./funcs */ "./src/funcs.ts");
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./style.scss */ "./src/style.scss");


window.RTCSender = new _funcs__WEBPACK_IMPORTED_MODULE_0__.RTCSender();
window.RTCReceiver = new _funcs__WEBPACK_IMPORTED_MODULE_0__.RTCReceiver();
window.socket = window.io();
window.socket.on('signaling', (data) => {
    console.log('singaling', data.type);
    if (data.type === 'offer') {
        window.RTCReceiver.receiveOffer(data.data);
    }
    if (data.type === 'answer') {
        window.RTCSender.receiveAnswer(data.data);
    }
    if (data.type === 'icecandidate') {
        window.RTCReceiver.receiveIceCandidate(data.data);
    }
});
document.getElementById('connection').onclick = () => {
    if (document.getElementById('select').value === 'offer') {
        window.RTCSender.createConnection();
    }
    else {
        window.RTCReceiver.createConnection();
    }
};
document.getElementById('offer').onclick = () => {
    window.RTCSender.createOffer();
};

})();

/******/ })()
;