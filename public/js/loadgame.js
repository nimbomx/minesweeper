/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
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
/******/ 	return __webpack_require__(__webpack_require__.s = 40);
/******/ })
/************************************************************************/
/******/ ({

/***/ 10:
/***/ (function(module, exports) {

var app = new Vue({
	el: '#app',
	data: {
		grid: [],
		game: loadGame,
		mines: null
	},
	mounted: function mounted() {
		this.loadGame();
	},

	methods: {
		loadGame: function loadGame() {
			var _this = this;

			axios.get(apiRoute + '/api/game/' + this.game).then(function (response) {
				_this.grid = response.data.grid;
				_this.mines = response.data.mines;
			});
		},
		reveal: function reveal(cell) {
			var _this2 = this;

			if (cell.revealed != 0) return false;
			if (cell.flags > 0) return false;
			axios.get(apiRoute + '/api/square-reveal/' + this.game + '/' + cell.id).then(function (response) {
				cell.revealed = response.data.revealed;
				cell.mine = response.data.mine;
				cell.adjacents = response.data.adjacents;
				window.closedS = 0;
				_this2.grid.forEach(function (row) {
					row.forEach(function (square) {
						if (square.revealed == 0) {
							window.closedS++;
						}
					});
				});
				if (window.closedS == _this2.mines) {
					_this2.winner();
				}
				if (response.data.mine) {
					_this2.looser();
				}
				if (response.data.adjacents == 0) {
					_this2.loadGame();
				}
			});
		},
		flag: function flag(cell, e) {
			if (cell.flags == 0) cell.flags = 1;else if (cell.flags == 1) cell.flags = 2;else if (cell.flags == 2) cell.flags = 0;
			e.preventDefault();
			axios.get(apiRoute + '/api/square-flag/' + this.game + '/' + cell.id + '/' + cell.flags).then(function (response) {
				console.log('flagged');
			});
		},
		winner: function winner() {
			console.log('win');
			//[ MAKE AN WIN SCREEN ]
		},
		looser: function looser() {
			console.log('loose');
			//[ MAKE AN GAME OVER SCREEN ]
		}
	}
});

/***/ }),

/***/ 40:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(10);


/***/ })

/******/ });