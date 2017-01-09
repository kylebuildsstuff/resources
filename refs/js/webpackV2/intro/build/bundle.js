/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

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

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "build/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var _big = __webpack_require__(3);

var _big2 = _interopRequireDefault(_big);

var _small = __webpack_require__(4);

var _small2 = _interopRequireDefault(_small);

__webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var image = document.createElement('img');
image.src = _small2.default; // small is the actual base64 string, the actual data representation of the image, so you can put it in the <img>'s src attribute, and the image will render properly'

document.body.appendChild(image);

var bigImage = document.createElement('img');
bigImage.src = _big2.default;

document.body.appendChild(bigImage);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var sum = function sum(a, b) {
  return a + b;
};

exports.default = sum;

/***/ },
/* 2 */
/***/ function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "2315eba8911cbfce391796f87477a4e1.jpg";

/***/ },
/* 4 */
/***/ function(module, exports) {

module.exports = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD//gA7Q1JFQVRPUjogZ2QtanBlZyB2MS4wICh1c2luZyBJSkcgSlBFRyB2NjIpLCBxdWFsaXR5ID0gNzAK/9sAhAAIBgYHBgUIBwcHCQkICgwUDQwLCwwZEhMPFB0aHx4dGhwcICQuJyAiLCMcHCg3KSwwMTQ0NB8nOT04MjwuMzQyAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wgARCADIAMgDASIAAhEBAxEB/8QAHAAAAgMBAQEBAAAAAAAAAAAAAAQCAwUBBgcI/9oACAEBAAAAAPIzIQhX2/T2dRmmck0kEEVkV0PQW95zhbc9oPNHeLUUKqqKqoN2z6dlNlp1tmXO9jVClWnPzk7Zz7ZO69hhlicpE7+lVeTl+ZusnOd1919t919tsrW75zrysf5/bdKVt9zN1tt7NzF17TLLMc7H+O3W3WW23Xt3WsOMMtNMsu6ccjK+A2zuuuYvZbavYbZacZb0dPRjk4P5xLZ33XMttPvuONstNu6GkwKY/wCS+WXW2M3tPN6Lmpe/o6+k9PnOo/jGRddffc4y7o3uN6Onp6ur89+MZv6N9H+NLOX32sXXMu22v6L+poai3598bH7J9g/IU5WsDlr1rk9Obmu8zo5fwLCl989l+T7qm+xtab5J1xjR9Z23Ue+e/GK/Q/b/AM1Rumdunx+uTY+73df0/OfIoF1Ee9lZGVrDaDyzci/YY8VldDnYM194X07Cy/L5dtb2PBgHa3IXy2llutZ84zjr7eBkZp3h61VnL+p+00kbfHeLqxFXnFtOHmckDvrYUK+73L/k/wBYR9Ev8u83wlqZyiwBLhGzvA5EiAB0OdAOHQ7zpw4AAAAAAAAAAAAAAAAAAAAAAAAAAAAf/8QAGgEAAwEBAQEAAAAAAAAAAAAAAAIDBAEFBv/aAAgBAhAAAAD1+NTsW33ter/K9d34Xdntf593fvToivqxu78RUWOFvR0dduSnPLgymz2HtUVY5vN2mTXXRejrnlnk1/OfTZ9FrmbwYUjfRGr6r387xO9DTrlRjFmmd4tH4s14dGmdOAAAAAAB3//EABkBAAMBAQEAAAAAAAAAAAAAAAABAwIEBf/aAAgBAxAAAADsQ6azTWIc+OgRTaROUy6zk3mbWcKwKM4vrWBzqE+Pyfdq+k5aVxOPIuuh6MeHveFMMpd2eXqbNZUJT765m6M6OXGryFU6JhBBgMtJjABMAAAAAAAA/8QAIxAAAgIBBAMBAQEBAAAAAAAAAQIAAxEEBRASBhMgFRQwYP/aAAgBAQABAgEP2zkngBRXK2SzuXWw2Na7NHDB4wdWUN27ZzwCIkQhg3bsS3BjgoyMjqygg9s54EWLFKkNnPBmOhrNRpet6wQZmZggggIIbPIgXp6zU1Nlb1gg/CwQQQQEQQTGAAOvT1vW9NtXC8iCCLBwIsACgBFQIqBBU9L02UiA5Ex1AWLBAAFAUKFCBAgRKkospsrsrCgDgQQRYAqhBWqKioqKgRUrrSpUeu2m2vPYN2HAixQsQrFCoK1rWtakpStU4dLac57BsgqVIKBXDI+EsSxLa3SKPixTMArBAAVicIcrb7kKGs1tW6Hy/fdL5Nfvnjm9WMka9Y6TOFKclkKFHR0dHrfWb/5LvHHgMssZFZD7gzmu5DPfSWurlYqnrWI6Prtm3nQwzxG2yxCHLJHsBSd7HrdLF1FOpp1VWq9y6hLxareV7aVmzbhTrxyY0zlLO1NXZLAXs7NqaLhqf7l1fkG5M/FVuBO2ZmZUVXahlNFjNW72CyjV16pdRrtT8KeEA4HAM9jTM712darS+pT5WCIM+r07fs123PQunOjdBT6jV00e3fiNpNQ/y+yfwHZrNHo9rp8UO1PQ3i27+LbfVum1WIHogFO90eU7lu2tv+f123L9BL9us0j2eRJYfNH3izcNVu25xbPZ7Km1GpXX23/PbOYH9ns79+/bP+uc5+cYxj/mP//EAD0QAAIBAgMFBAUKBQUAAAAAAAECAAMRBBIhBSIxQVEQEyBhIzJScZEUMEBCcoGhscHhFTNTYJJEYmOC0f/aAAgBAQADPwH6DfwA8p8P7k08Nz9E0+lW7D9Ntxgg8Qg+ZHzhy5tPjD1hHYUTMefgHSLBy8GnbZA3ZeaXht23lmt22jPxJPjqbIwlOlhjavXvr7Im0KBua7uT7RvMbUxYxK13SoOYM/jOy+9ewroctQfrLCJpnbTpC+luMbNkHPdmR7eXKL3fHXpArMBr0jX3hoJc5V+6a2Ohlpa2t7wjS3zGztmbuJxAD+wNTKe2dq9/Rz90qBFzdtQVca+vd2Uff2Xfc6Tfz2svSZHueU8r6WiVLIdCBpO7fJcG3SZHFRmuRymfLrbX4QrkNtTrfrM5Dqg3eR4TNlpZrOTGGnvWBWam+hHwEVqbjUsN4EcLQZilTS07vJ5gGam3Lt2ftVs+Ipel/qIbGJs3alXDU6mdF4Hn20E2LkpuDVzlqo6dOyx1JF4FuM1x7pmN5lXOOIgdy3WXzXl8vmbTfZM27eMBe90G6us3b3seOsOYvex4w1ClhvWCiOQzkCoSLEtMi1MrlXbd+6MFsjZlO8RaHEHJdRcKwHKJZir8N02iuTyAlj7xPOU6uD+WoqJVpnfPtiWHYNnbSSu7OKdiHA5zD4tM9Cqrjy5S/Ycg6S2l+UGnXnL6mDQoeEsxza3h66QYlXs3pFF7dY1gvl8ZkbqJ3LDPqhgSrbUryM3rqdwfWm8jAkMv5xzmKPa3HWHvCQbEcvKB6gADZBKRzolTeH4x6eApdzXZHZ+AOtoXa7G57alFw9NyrDmDCvHQwc4ey8GW3OW7AeJt5zuKiuh1U/GJUe9HnqfKWO8LiKydzU9Xk3SX53tpHoow6y+W3SFNRKtNro5DdRPSqfjYxqNfuz6zahSOMOKxJfgo0A8PWaadm9Y+HlbXlLazMog7Lw2APKFXDQngQfK8am4IYiBKuYWyk6WjYSiMXdQSMqrm19/iUPvajspuLXyt58DKeZeNuc10a69YesOPzBcSiOPqkT5PVanVeoGX/j/eUgBlquTf2P3lNn36rIOZyfvKK+pi8w80IgzWzH324xebt/jKftv/AI/vBlBLP0G7+8pBTmqODyGTj+MfGG9BK9QA8k/W8Cu3f0sVR6bua8RXKXraH1ckqhnpkuELXynxLRF6uIRVtxmFvb5UB5lGhsGV0ZeqnjAhbRiAfqzY74GhUfvPSHL/ADOBmyqevdu/2nmzcChxFPBpmXha82btBl+UYND/ANuE2QbWw1rdHMyYZ3wQU5dbH1oX9Di8Iyp/XtYp/wCyrs+utlz0m0zASrSGXLuHg2XhGa+gPuEZ2KZGfNqLLKFZN4ZMvMcPhMTg8HVwmHyhHfMHHETa9IhC4reTpefxTJ8qwzUWQWzIL/nKdaondZ8qrbfA/TxY9R3dRKVb7S3/AClc/wCipA/YMxlS4DJSAHugsock2be6mZUxGFyMudC9DvDfetNq4bDbm0sPnB/lO+YWm1EpMlbBYeoCPWp1hDSxClqXqt6sxDD0eAQH/fXExu0n7qvtHC4Kl9YUze4982NRw1JKeJpu9Pn185sTF2NfEMWGmga0wq2bB43OAfVKEWijiePlEW3O0S5vfU3iCsGA0HEWmDIumCsxJveofwlemLUq1ZPdUMq1zepUZz5nxGHtZRoTG6xusbrG6xusMMP94//EACgQAQACAgICAgEEAwEBAAAAAAEAESExQWEQUXGBkSChscHR4fAwYP/aAAgBAQABPxCyHeMr1fgWMwKcRiu46ZXU0ZnyiRpUSgbmTDKF8QJMTipdgv1GY5R4TzmLlxcCCeqiusawR1K/Hpm+4E3BSXSUkEtmLzNfEz+VPBlLh5HXi7fA+C2s3AIOSNsJEvsmDE6p6iVLiJ68hcIICqSG/EeNHi7IYy8y/UFqrguLUyajjqWmphcTbZKrx5AYMGD4beAmESKLxIIe5xVDOF+IdJSsTdiYXEK4hxDguvmEP0oIEEESJcWN6mW5dx4beJ1z0IWcS9cReAs2kUBCEIHwPlb/AB2zrnVMevH1xWsSzidc9KXXiCq+YpxAnEIsxR+BPHiuIkq48x1eLFL4PJCHUM4hPEuFqVMwdwXufDOpLIKZBxTBnRkgHn+I2K/iOmlI2mox2RkZyeNSL6jPET1K0slWU8IoTisQbuiOUIMpknH9ADxCLQ6X+Ixyn5gBGUlS+2O5p8XUMXViJcSjY8iLVlkS42xA50llRSfKkRui6jVuWfRVygaczFfEVwKW6PcFZOvCZ1cPXcpAYaFwed7JSwoeoU11N0Yv2cXTEb1YslYFP/7CPZwx50zLG/n+ZrgBRevqVt8rTTLpugjysgkKbtck/wCuK+aYV84/3AaNowQDK1aXsi2DCUwyARdWOGBmpQYIpZFRG29FxfqUVcv8xnI5hu62eMAwNM4xd8xuAlS+7jHV3UqQqJcO8Z/uWl0dUuupmWnLDXeJkKlKyNHXcAIVmHfL8RMKPejEN0XY2Sgiy1W6RuR023p18UytXskNlX8QRfBU2Gq/ljxUpoxlzvMJOhLSqFpXvJCTi8otP8R2ldzVpL2N0w/JcNq7Bfir5l4RStB/h+xll+Cmgl0w1cpO+8hS1FnM1RDCcH/XEBo38vU9M0a4iAJad6d99Qe0GxqoLTrF4IEG8VH/AL5iAjML2HUaBZLoZ4/D+ZsmIqm/VQy6IjuPBgA4K5jziK2hjJzZLmAGHPL+oLwgjJQz3y/UEy8CKGMg/cICbnv9xqLEXcOyyqD8SsUDxhiu2QAFKMptGUat3x6+e4peNSiUQbojRXzTMTeLFn5GyJqLoxDcd12aI2otYv8AmKoBAbe4ZU1uJXg7e79y0jHm3n3MeU21eIZUVCcDqF8KBBf2gsIKJv8AeXPAXjn4lANj0WcMSG3pPfvviInSFxQD1+CU2VWCjXfuHRZyMiv6ilrS3khSOFHQDcKLltOgb1xaRoxW1ZfjSW6kxvAQwjM2SdzULYaGNlQohbxuGAsTvqF2mjnMJq3e2g5gWhsOh8dkaFrU9IIKC2l1ZLe1S/d/xGdBG69zLA3r2REml2q7pii1NY7udlqIH1EFj3iaSnZKDqpW7QzgDxfi4DhNVwXmIIRkw52zOqmOAfN1+09OYiEXKwZxLtPb6ruGVHIwsraTVYio4/aWcRVbviJrKaZmRjTdXAeQq6ZRwTyjX5jFbRSx8TWaeEWJhd1XUXzcuOpRbLtD51/URm0JcVW0VwXXXr7izlam+e6jWxWYpsixpUQzw2VT2QN7cUSvd8JekQAk/eK0g22qFnBmLS/pZRkjND6Nv1HmFvhfPfx+YlkQ4xhaSKoBuv8AYhnBQAvbMDMvCYfGgcwIE4zt/EmZtkQE+rv9pm/gTTV1jq38y5cuX4xCAtnC8amJ8VH9VEN+YT9uYiNIcq+cQNgnlTiS60MRF1Vh4WdWKuKl3uFC3o/EYS32EZN6M9KGwVpjLeGccrB6DqqvVMXBY2ZjGE4Ze1N5nl8ZlMHaTT2PvqWrTCpmjafEv2SaDJN5X+34j5ZZQ+NN40Tik9Zx6WsLZOCqIR+dS6jeb+Ev9ICV0Vt/KXjebSNXP+oKnovP4hxNYhwXnL/fuEzXyK5qQCnGIartAj095rnSRd0CuiyGlyC6bq4PKZs0umBZVziiqzXrfQXCozXBK4xTnh9lUxExuIjilMw9A9q5Qxat82XB1TKAcS4Q1oET1TuVoLkkL1Qcfdz6afH4gEV5ZZcuX5zWq/cu58LfcpAhyl4ZdvwHdnZnYnYyzmLyl+b845jXH6bS0tDeYzMplPkB7lPcxGvXh/8Aa2XLlv8A8J//xAApEQACAgICAQMCBwEAAAAAAAAAAQIRAxIhMQQQQVFxkQUTFCNAQmGh/9oACAECAQE/AGUJCQ4ksZjjRBCIsTE/SjUURIocBQIr02FlIZTc1FAURQKKKEWNm5jyEcvAosSEihosbGxsnlSMvkmHyPkjk4NixejQ0NDsy5JIyZmN2J0QzOhSExMR7mtjxolEyQszYnfB4mmOOrV/J5umWPVNEMPBHJxYslkJKiLEkzXk/LZlUkyn7k8ZBNSMkoyfJGKo1aqxTRFvsx5PklNvp0QzJxMWa1T7Fz2SxWZMcI8N0eRlTm9ehSsU2vcjltJSINLmxZIad8izK6J/uOo8nKhz38e5DJwhZ12+iGba6Z+K7rVtG3JdFkIxadog4vhojg7p9Hi+Csqbm6a64Zj8bPjltTRrlnPfRkpqMtZWvrwLyElra+4sc1Fz9vknlbVWJjZZv/pKWxj8jLjVQk0fqPJf9mPJn95P7jeV9v8A6P6jNhMssv1tlv8Aj//EACIRAAICAgEFAQEBAAAAAAAAAAABAhEDEiEEEBMxQVEgUP/aAAgBAwEBPwCyyyxPumWORJj/AIssTExyNx5BzHI27WWWWeQWQllFlNhsciyzyI3NhskzzUZcxhyWKQ5Ft+i2nTLIoQrLJSMrRn61qoVyYFUUNkYuX0jBRRKKkjlcGrTQlwMZLkydO58EOixwdpcisohalwKPBmekHIjtJX25rgUX7ZLEeP8ATSkao1VDOVyiEto2ZYbRoosTZfaLinyiUEm0Txr2vQ48jixwm7aVmFOMEn2pd1gyP0jwZPwWKa9olOVco0m/g4SXwWCUjppPpoSVcv8Ahyx/g9H6QstJUTzpKmjzRao2io67Dkk+Gbm9/Rysssvu0n7KRSOP8L//2Q=="

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var _sum = __webpack_require__(1);

var _sum2 = _interopRequireDefault(_sum);

__webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _sum2.default)(1, 3);
console.log((0, _sum2.default)(1, 3));

/***/ }
/******/ ]);