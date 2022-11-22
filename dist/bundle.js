/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_1__.default, options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_1__.default.locals || {});

/***/ }),
/* 2 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



var isOldIE = function isOldIE() {
  var memo;
  return function memorize() {
    if (typeof memo === 'undefined') {
      // Test for IE <= 9 as proposed by Browserhacks
      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
      // Tests for existence of standard globals is to allow style-loader
      // to operate correctly into non-standard environments
      // @see https://github.com/webpack-contrib/style-loader/issues/177
      memo = Boolean(window && document && document.all && !window.atob);
    }

    return memo;
  };
}();

var getTarget = function getTarget() {
  var memo = {};
  return function memorize(target) {
    if (typeof memo[target] === 'undefined') {
      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
        try {
          // This will throw an exception if access to iframe is blocked
          // due to cross-origin restrictions
          styleTarget = styleTarget.contentDocument.head;
        } catch (e) {
          // istanbul ignore next
          styleTarget = null;
        }
      }

      memo[target] = styleTarget;
    }

    return memo[target];
  };
}();

var stylesInDom = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDom.length; i++) {
    if (stylesInDom[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var index = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3]
    };

    if (index !== -1) {
      stylesInDom[index].references++;
      stylesInDom[index].updater(obj);
    } else {
      stylesInDom.push({
        identifier: identifier,
        updater: addStyle(obj, options),
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function insertStyleElement(options) {
  var style = document.createElement('style');
  var attributes = options.attributes || {};

  if (typeof attributes.nonce === 'undefined') {
    var nonce =  true ? __webpack_require__.nc : 0;

    if (nonce) {
      attributes.nonce = nonce;
    }
  }

  Object.keys(attributes).forEach(function (key) {
    style.setAttribute(key, attributes[key]);
  });

  if (typeof options.insert === 'function') {
    options.insert(style);
  } else {
    var target = getTarget(options.insert || 'head');

    if (!target) {
      throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
    }

    target.appendChild(style);
  }

  return style;
}

function removeStyleElement(style) {
  // istanbul ignore if
  if (style.parentNode === null) {
    return false;
  }

  style.parentNode.removeChild(style);
}
/* istanbul ignore next  */


var replaceText = function replaceText() {
  var textStore = [];
  return function replace(index, replacement) {
    textStore[index] = replacement;
    return textStore.filter(Boolean).join('\n');
  };
}();

function applyToSingletonTag(style, index, remove, obj) {
  var css = remove ? '' : obj.media ? "@media ".concat(obj.media, " {").concat(obj.css, "}") : obj.css; // For old IE

  /* istanbul ignore if  */

  if (style.styleSheet) {
    style.styleSheet.cssText = replaceText(index, css);
  } else {
    var cssNode = document.createTextNode(css);
    var childNodes = style.childNodes;

    if (childNodes[index]) {
      style.removeChild(childNodes[index]);
    }

    if (childNodes.length) {
      style.insertBefore(cssNode, childNodes[index]);
    } else {
      style.appendChild(cssNode);
    }
  }
}

function applyToTag(style, options, obj) {
  var css = obj.css;
  var media = obj.media;
  var sourceMap = obj.sourceMap;

  if (media) {
    style.setAttribute('media', media);
  } else {
    style.removeAttribute('media');
  }

  if (sourceMap && typeof btoa !== 'undefined') {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    while (style.firstChild) {
      style.removeChild(style.firstChild);
    }

    style.appendChild(document.createTextNode(css));
  }
}

var singleton = null;
var singletonCounter = 0;

function addStyle(obj, options) {
  var style;
  var update;
  var remove;

  if (options.singleton) {
    var styleIndex = singletonCounter++;
    style = singleton || (singleton = insertStyleElement(options));
    update = applyToSingletonTag.bind(null, style, styleIndex, false);
    remove = applyToSingletonTag.bind(null, style, styleIndex, true);
  } else {
    style = insertStyleElement(options);
    update = applyToTag.bind(null, style, options);

    remove = function remove() {
      removeStyleElement(style);
    };
  }

  update(obj);
  return function updateStyle(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
        return;
      }

      update(obj = newObj);
    } else {
      remove();
    }
  };
}

module.exports = function (list, options) {
  options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
  // tags it will allow on a page

  if (!options.singleton && typeof options.singleton !== 'boolean') {
    options.singleton = isOldIE();
  }

  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    if (Object.prototype.toString.call(newList) !== '[object Array]') {
      return;
    }

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDom[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDom[_index].references === 0) {
        stylesInDom[_index].updater();

        stylesInDom.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),
/* 3 */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6);
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _images_travel_background_unsplash_png__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7);
// Imports




var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default()));
var ___CSS_LOADER_URL_REPLACEMENT_0___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(_images_travel_background_unsplash_png__WEBPACK_IMPORTED_MODULE_3__.default);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "* {\n  font-family: 'Roboto', sans-serif;\n  font-size: 16px;\n  margin: 0px;\n  padding: 0px;\n}\n\nbody {\n  background: #EEEEEE;\n  overflow: scroll;\n}\n\nh1 {\n  font-size: 40px;\n  margin: 20px 0px 0px 10px;\n}\n\nh2 {\n  font-size: 26px;\n  text-align: right;\n  margin-right: 10px;\n}\n\nh3 {\n  text-align: right;\n  margin: 5px 40px 5px 0px;\n}\n\ninput::-webkit-calendar-picker-indicator,\ninput[type=number]::-webkit-inner-spin-button,\ninput[type=number]::-webkit-outer-spin-button {\n  cursor: pointer;\n}\n\n.login {\n  background: url(" + ___CSS_LOADER_URL_REPLACEMENT_0___ + ") no-repeat;\n  background-position: 50% 50%;\n  background-size: 1920px 1200px;\n}\n\n.login-container {\n  display: flex;\n  flex-direction: column;\n  align-content: stretch;\n  justify-content: space-evenly;\n  align-items: center;\n}\n\n.login-form {\n  margin: 50px;\n  padding: 25px;\n  width: 350px;\n  background-color: #E7E7E7;\n  border: 1px solid black;\n}\n\n.login-heading {\n  padding: 25px;\n}\n\n.login-button {\n  cursor: pointer;\n}\n\n.login-error-message {\n  margin: 15px;\n  color: red;\n  font-size: 12px;\n  margin-left: 15px;\n  text-align: center;\n}\n\n.logout-button-container {\n  display: flex;\n  flex-direction: row-reverse;\n}\n\n.logout-button {\n  margin: 15px;\n  padding: 5px;\n  cursor: pointer;\n}\n\n.bookings-wrapper {\n  background: url(" + ___CSS_LOADER_URL_REPLACEMENT_0___ + ") no-repeat;\n  background-position: 50% 50%;\n  background-size: 1920px 1200px;\n  margin: 0px;\n  display: flex;\n  justify-content: space-evenly;\n  align-items: center;\n}\n\n.add-new-trip {\n  background-color: #E7E7E7;\n  display: flex;\n  flex-direction: column;\n  margin: 25px 0px 25px 0px;\n  padding: 20px;\n  border: 1px solid black;\n}\n\n.button-container {\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  justify-content: center;\n}\n\n.button {\n  margin: 15px;\n  padding: 5px;\n  cursor: pointer;\n}\n\n.new-trip-cost-estimator {\n  background-color: #E7E7E7;\n  height: 75px;\n  width: 335px;\n  display: flex;\n  align-items: center;\n  padding: 20px;\n  border: 1px solid black;\n}\n\n.disable {\n  cursor: not-allowed;\n}\n\n/* Card Section */\n.pending-trip-cards-container,\n.approved-trip-cards-container {\n  margin: 25px 0px 25px 0px;\n  padding: 10px;\n  display: flex;\n  flex-wrap: nowrap;\n  align-items: center;\n  overflow-x: scroll;\n  overflow-y: hidden;\n  height: 50vh;\n  box-shadow: 0 0 12px 0 rgba(0, 0, 0, 0.25);\n}\n\n.card-wrapper {\n  margin-top: 25px;\n  padding: 5px;\n  margin: 5px;\n  height: 47vh;\n  width: 300px;\n  box-shadow: 2px 2px 2px grey;\n  background-color: #FFFFFF;\n}\n\n.card-wrapper:hover{\n  transform: scale(1.01);\n  box-shadow: 0 10px 40px 0 rgba(0, 0, 0, 0.4);\n}\n\n.card-image {\n  background-size: cover;\n  display: flex;\n  flex-direction: column;\n  align-content: center;\n}\n\nimg {\n  height: 20vh;\n}\n\nh4 {\n  font-size: 18px;\n  margin: 5px 0px 15px 5px;\n}\n\n.date,\n.num-travelers,\n.trip-cost,\n.duration {\n  font-size: 14px;\n  margin: 5px 0px 0px 5px;\n}\n\n.trip-status{\n  background-color: #EFEFEF;\n  margin-top: 10px;\n  padding: 0px;\n  height: 35px;\n  width: 300px;\n  text-align: center;\n  font-size: 25px;\n}\n\n.catch-error {\n  color: red;\n}\n\n.hidden {\n  display: none;\n}\n", "",{"version":3,"sources":["webpack://./src/css/styles.css"],"names":[],"mappings":"AAAA;EACE,iCAAiC;EACjC,eAAe;EACf,WAAW;EACX,YAAY;AACd;;AAEA;EACE,mBAAmB;EACnB,gBAAgB;AAClB;;AAEA;EACE,eAAe;EACf,yBAAyB;AAC3B;;AAEA;EACE,eAAe;EACf,iBAAiB;EACjB,kBAAkB;AACpB;;AAEA;EACE,iBAAiB;EACjB,wBAAwB;AAC1B;;AAEA;;;EAGE,eAAe;AACjB;;AAEA;EACE,6DAAqE;EACrE,4BAA4B;EAC5B,8BAA8B;AAChC;;AAEA;EACE,aAAa;EACb,sBAAsB;EACtB,sBAAsB;EACtB,6BAA6B;EAC7B,mBAAmB;AACrB;;AAEA;EACE,YAAY;EACZ,aAAa;EACb,YAAY;EACZ,yBAAyB;EACzB,uBAAuB;AACzB;;AAEA;EACE,aAAa;AACf;;AAEA;EACE,eAAe;AACjB;;AAEA;EACE,YAAY;EACZ,UAAU;EACV,eAAe;EACf,iBAAiB;EACjB,kBAAkB;AACpB;;AAEA;EACE,aAAa;EACb,2BAA2B;AAC7B;;AAEA;EACE,YAAY;EACZ,YAAY;EACZ,eAAe;AACjB;;AAEA;EACE,6DAAqE;EACrE,4BAA4B;EAC5B,8BAA8B;EAC9B,WAAW;EACX,aAAa;EACb,6BAA6B;EAC7B,mBAAmB;AACrB;;AAEA;EACE,yBAAyB;EACzB,aAAa;EACb,sBAAsB;EACtB,yBAAyB;EACzB,aAAa;EACb,uBAAuB;AACzB;;AAEA;EACE,aAAa;EACb,mBAAmB;EACnB,mBAAmB;EACnB,uBAAuB;AACzB;;AAEA;EACE,YAAY;EACZ,YAAY;EACZ,eAAe;AACjB;;AAEA;EACE,yBAAyB;EACzB,YAAY;EACZ,YAAY;EACZ,aAAa;EACb,mBAAmB;EACnB,aAAa;EACb,uBAAuB;AACzB;;AAEA;EACE,mBAAmB;AACrB;;AAEA,iBAAiB;AACjB;;EAEE,yBAAyB;EACzB,aAAa;EACb,aAAa;EACb,iBAAiB;EACjB,mBAAmB;EACnB,kBAAkB;EAClB,kBAAkB;EAClB,YAAY;EACZ,0CAA0C;AAC5C;;AAEA;EACE,gBAAgB;EAChB,YAAY;EACZ,WAAW;EACX,YAAY;EACZ,YAAY;EACZ,4BAA4B;EAC5B,yBAAyB;AAC3B;;AAEA;EACE,sBAAsB;EACtB,4CAA4C;AAC9C;;AAEA;EACE,sBAAsB;EACtB,aAAa;EACb,sBAAsB;EACtB,qBAAqB;AACvB;;AAEA;EACE,YAAY;AACd;;AAEA;EACE,eAAe;EACf,wBAAwB;AAC1B;;AAEA;;;;EAIE,eAAe;EACf,uBAAuB;AACzB;;AAEA;EACE,yBAAyB;EACzB,gBAAgB;EAChB,YAAY;EACZ,YAAY;EACZ,YAAY;EACZ,kBAAkB;EAClB,eAAe;AACjB;;AAEA;EACE,UAAU;AACZ;;AAEA;EACE,aAAa;AACf","sourcesContent":["* {\n  font-family: 'Roboto', sans-serif;\n  font-size: 16px;\n  margin: 0px;\n  padding: 0px;\n}\n\nbody {\n  background: #EEEEEE;\n  overflow: scroll;\n}\n\nh1 {\n  font-size: 40px;\n  margin: 20px 0px 0px 10px;\n}\n\nh2 {\n  font-size: 26px;\n  text-align: right;\n  margin-right: 10px;\n}\n\nh3 {\n  text-align: right;\n  margin: 5px 40px 5px 0px;\n}\n\ninput::-webkit-calendar-picker-indicator,\ninput[type=number]::-webkit-inner-spin-button,\ninput[type=number]::-webkit-outer-spin-button {\n  cursor: pointer;\n}\n\n.login {\n  background: url(\"../images/travel-background-unsplash.png\") no-repeat;\n  background-position: 50% 50%;\n  background-size: 1920px 1200px;\n}\n\n.login-container {\n  display: flex;\n  flex-direction: column;\n  align-content: stretch;\n  justify-content: space-evenly;\n  align-items: center;\n}\n\n.login-form {\n  margin: 50px;\n  padding: 25px;\n  width: 350px;\n  background-color: #E7E7E7;\n  border: 1px solid black;\n}\n\n.login-heading {\n  padding: 25px;\n}\n\n.login-button {\n  cursor: pointer;\n}\n\n.login-error-message {\n  margin: 15px;\n  color: red;\n  font-size: 12px;\n  margin-left: 15px;\n  text-align: center;\n}\n\n.logout-button-container {\n  display: flex;\n  flex-direction: row-reverse;\n}\n\n.logout-button {\n  margin: 15px;\n  padding: 5px;\n  cursor: pointer;\n}\n\n.bookings-wrapper {\n  background: url(\"../images/travel-background-unsplash.png\") no-repeat;\n  background-position: 50% 50%;\n  background-size: 1920px 1200px;\n  margin: 0px;\n  display: flex;\n  justify-content: space-evenly;\n  align-items: center;\n}\n\n.add-new-trip {\n  background-color: #E7E7E7;\n  display: flex;\n  flex-direction: column;\n  margin: 25px 0px 25px 0px;\n  padding: 20px;\n  border: 1px solid black;\n}\n\n.button-container {\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  justify-content: center;\n}\n\n.button {\n  margin: 15px;\n  padding: 5px;\n  cursor: pointer;\n}\n\n.new-trip-cost-estimator {\n  background-color: #E7E7E7;\n  height: 75px;\n  width: 335px;\n  display: flex;\n  align-items: center;\n  padding: 20px;\n  border: 1px solid black;\n}\n\n.disable {\n  cursor: not-allowed;\n}\n\n/* Card Section */\n.pending-trip-cards-container,\n.approved-trip-cards-container {\n  margin: 25px 0px 25px 0px;\n  padding: 10px;\n  display: flex;\n  flex-wrap: nowrap;\n  align-items: center;\n  overflow-x: scroll;\n  overflow-y: hidden;\n  height: 50vh;\n  box-shadow: 0 0 12px 0 rgba(0, 0, 0, 0.25);\n}\n\n.card-wrapper {\n  margin-top: 25px;\n  padding: 5px;\n  margin: 5px;\n  height: 47vh;\n  width: 300px;\n  box-shadow: 2px 2px 2px grey;\n  background-color: #FFFFFF;\n}\n\n.card-wrapper:hover{\n  transform: scale(1.01);\n  box-shadow: 0 10px 40px 0 rgba(0, 0, 0, 0.4);\n}\n\n.card-image {\n  background-size: cover;\n  display: flex;\n  flex-direction: column;\n  align-content: center;\n}\n\nimg {\n  height: 20vh;\n}\n\nh4 {\n  font-size: 18px;\n  margin: 5px 0px 15px 5px;\n}\n\n.date,\n.num-travelers,\n.trip-cost,\n.duration {\n  font-size: 14px;\n  margin: 5px 0px 0px 5px;\n}\n\n.trip-status{\n  background-color: #EFEFEF;\n  margin-top: 10px;\n  padding: 0px;\n  height: 35px;\n  width: 300px;\n  text-align: center;\n  font-size: 25px;\n}\n\n.catch-error {\n  color: red;\n}\n\n.hidden {\n  display: none;\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 4 */
/***/ ((module) => {



function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]); if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

module.exports = function cssWithMappingToString(item) {
  var _item = _slicedToArray(item, 4),
      content = _item[1],
      cssMapping = _item[3];

  if (typeof btoa === "function") {
    // eslint-disable-next-line no-undef
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || "").concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join("\n");
  }

  return [content].join("\n");
};

/***/ }),
/* 5 */
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join("");
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === "string") {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, ""]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var i = 0; i < this.length; i++) {
        // eslint-disable-next-line prefer-destructuring
        var id = this[i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = [].concat(modules[_i]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),
/* 6 */
/***/ ((module) => {



module.exports = function (url, options) {
  if (!options) {
    // eslint-disable-next-line no-param-reassign
    options = {};
  } // eslint-disable-next-line no-underscore-dangle, no-param-reassign


  url = url && url.__esModule ? url.default : url;

  if (typeof url !== "string") {
    return url;
  } // If url is already wrapped in quotes, remove them


  if (/^['"].*['"]$/.test(url)) {
    // eslint-disable-next-line no-param-reassign
    url = url.slice(1, -1);
  }

  if (options.hash) {
    // eslint-disable-next-line no-param-reassign
    url += options.hash;
  } // Should url be wrapped?
  // See https://drafts.csswg.org/css-values-3/#urls


  if (/["'() \t\n]/.test(url) || options.needQuotes) {
    return "\"".concat(url.replace(/"/g, '\\"').replace(/\n/g, "\\n"), "\"");
  }

  return url;
};

/***/ }),
/* 7 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/travel-background-unsplash.png");

/***/ }),
/* 8 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "fetchData": () => (/* binding */ fetchData),
/* harmony export */   "postNewTrip": () => (/* binding */ postNewTrip),
/* harmony export */   "promise": () => (/* binding */ promise)
/* harmony export */ });
function fetchData(type) {
  return fetch(`http://localhost:3001/api/v1/${type}`)
    .then(response => checkForErrors(response));
}

let promise = Promise.all([fetchData('travelers'), fetchData('trips'), fetchData('destinations')])

function checkForErrors(response) {
  if (response.ok) {
    return response.json();
  } else {
    console.log("error");
    window.alert('Error: Please refresh the page.');
  }
}

function postNewTrip(travelerInput) {
  return fetch('http://localhost:3001/api/v1/trips', {
    method: 'POST',
    body: JSON.stringify({
      id: travelerInput.id,
      userID: travelerInput.userID,
      destinationID: travelerInput.destinationID,
      travelers: travelerInput.travelers,
      date: travelerInput.date,
      duration: travelerInput.duration,
      status: "pending",
      suggestedActivities: travelerInput.suggestedActivities
    }),
    headers: {'Content-Type': 'application/json'}
  })
    .then(response => checkForErrors(response))
    .catch(error => console.log('Error'))
}




/***/ }),
/* 9 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _src_Trip__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(10);


class Traveler {
  constructor (traveler) {
    this.id = traveler.id;
    this.name = traveler.name;
    this.travelerType = traveler.travelerType;
    this.myTrips = [];
  }

  returnTravelerFirstName() {
    let firstName = this.name.split(' ');
    return firstName[0];
  }

  getMyTrips(allTripsData) {
    const myTrips = allTripsData.filter(trip => this.id === trip.userID)
    const sortedTrips = myTrips.sort((a, b) => {
      let dateA = new Date (a.date);
      let dateB = new Date (b.date);
      return dateB - dateA;
    });

    this.myTrips = sortedTrips;
    return this.myTrips;
  }

  calculateYearlySpend(allDestinationsData, year) {
    const approvedTrips = this.myTrips.filter(trip => trip.status === "approved");
    const tripsThisYear = approvedTrips.filter(trip => trip.date.includes(year));
    const totalSpentThisYear = tripsThisYear.reduce((acc, trip) => {
      trip = new _src_Trip__WEBPACK_IMPORTED_MODULE_0__.default(trip);
      acc += trip.calculateTripCost(allDestinationsData);
      return acc;
    }, 0);

    return totalSpentThisYear;
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Traveler);


/***/ }),
/* 10 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class Trip {
  constructor(trip) {
    this.id = trip.id;
    this.userID = trip.userID;
    this.destinationID = trip.destinationID;
    this.travelers = trip.travelers;
    this.date = trip.date;
    this.duration = trip.duration;
    this.status = trip.status;
    this.suggestedActivities = trip.suggestedActivities;
  }

  calculateTripCost(allDestinationsData) {
    const costPerDay = allDestinationsData.find(destination => destination.id === this.destinationID).estimatedLodgingCostPerDay;
    const costPerFlight = allDestinationsData.find(destination => destination.id === this.destinationID).estimatedFlightCostPerPerson;

    const costOfLodging = this.duration * costPerDay;
    const costOfFlights = this.travelers * costPerFlight;
    const total = Math.round((costOfLodging + costOfFlights) * 1.1);
    return total;
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Trip);


/***/ }),
/* 11 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class Destination {
  constructor(destination) {
    this.id = destination.id;
    this.destination = destination.destination;
    this.estimatedLodgingCostPerDay = destination.estimatedLodgingCostPerDay;
    this.estimatedFlightCostPerPerson = destination.estimatedFlightCostPerPerson;
    this.image = destination.image;
    this.alt = destination.alt;
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Destination);


/***/ })
/******/ 	]);
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
/******/ 			id: moduleId,
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
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
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
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _css_styles_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _apiCalls__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8);
/* harmony import */ var _Traveler__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9);
/* harmony import */ var _Trip__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(10);
/* harmony import */ var _Destination__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(11);






/*~~~~~~~~QUERY SELECTORS~~~~~~~*/
var greeting = document.querySelector(".greeting");
var catchError = document.querySelector(".catch-error");
var pendingTripCardsContainer = document.querySelector(".pending-trip-cards-container");
var approvedTripsCardContainer = document.querySelector(".approved-trip-cards-container");
var annualTripSpend = document.querySelector(".annual-dollars-spent");
var dateInput = document.getElementById("startDate");
var numTravelers = document.getElementById("numTravelers");
var durationInput = document.getElementById("duration");
var destinationInput = document.getElementById("destinationInput");
var bookNowButton = document.getElementById("bookNowButton");
var cancelButton = document.getElementById("cancelButton");
var estimate = document.querySelector(".new-trip-cost-estimator");
var usernameInput = document.getElementById("username");
var passwordInput = document.getElementById("password");
var loginButton = document.getElementById("loginButton");
var loginPage = document.querySelector(".login");
var application = document.querySelector(".app");
var loginErrorMessage = document.querySelector(".login-error-message");
var loginHeading = document.querySelector(".login-heading");
var logoutButton = document.getElementById("logoutButton");

/*~~~~~~~~GLOBAL VARIABLES~~~~~~~*/
let year = "2022";
let allTravelersData;
let allTripsData;
let allDestinationsData;
let currentTraveler;
let travelerID;

/*~~~~~~~~EVENT LISTENERS~~~~~~~*/
loginButton.addEventListener('click', validateLogin);
dateInput.addEventListener('keyup', checkBookingFields);
numTravelers.addEventListener('keyup', checkBookingFields);
durationInput.addEventListener('keyup', checkBookingFields);
destinationInput.addEventListener('input', checkBookingFields);
bookNowButton.addEventListener('click', saveNewTrip);
cancelButton.addEventListener('click', resetForm);
logoutButton.addEventListener('click', logout);

/*~~~~~~~~FUNCTIONS~~~~~~~*/
function validateLogin(event) {
  event.preventDefault();

  let username = usernameInput.value;
  let password = passwordInput.value;

  if (username.startsWith("traveler") && password === "travel") {
    travelerID = parseInt(username.slice(8));
    loginPage.classList.add("hidden");
    loginHeading.classList.add("hidden");
    application.classList.remove("hidden");
    getData();
  } else {
    loginErrorMessage.innerHTML = "The Username and Password don't match our records, please check them and try logging in again.";
    resetLogin();
  }
}

function getData() {
  _apiCalls__WEBPACK_IMPORTED_MODULE_1__.promise.then(data => {
    allTravelersData = data[0].travelers.map(traveler => new _Traveler__WEBPACK_IMPORTED_MODULE_2__.default(traveler));
    allTripsData = data[1].trips.map(trip => new _Trip__WEBPACK_IMPORTED_MODULE_3__.default(trip));
    allDestinationsData = data[2].destinations.map(destination => new _Destination__WEBPACK_IMPORTED_MODULE_4__.default(destination));
    renderTravelerDashboard(travelerID);
    updateDestinationsSelectionMenu();
  })
    .catch(error => {
      console.log(error)
      catchError.innerText = 'There was an error retrieving your data.';
    });
}

function renderTravelerDashboard(travelerID) {
  if (!currentTraveler) {
    const traveler = allTravelersData.find(traveler => traveler.id === travelerID);
    currentTraveler = traveler;
    currentTraveler.getMyTrips(allTripsData)

    renderGreeting();
    createTripCards();
    renderAnnualSpend();
  }
}

function renderGreeting() {
  greeting.innerText = `Welcome back, ${currentTraveler.returnTravelerFirstName()}!`;
}

function renderAnnualSpend() {
  const totalSpentYTD = currentTraveler.calculateYearlySpend(allDestinationsData, year);
  return annualTripSpend.innerText = `You've spent $${totalSpentYTD} this year!`;
}

function createTripCards() {
  pendingTripCardsContainer.innerHTML = "";
  approvedTripsCardContainer.innerHTML = "";

  const sortedTrips = currentTraveler.myTrips;
  const getTripCards = sortedTrips.forEach(trip => {
    allDestinationsData.forEach(destination => {
      if (trip.destinationID === destination.id && trip.status === "pending") {
        return pendingTripCardsContainer.innerHTML += (
          `<div tabindex="0" class="card-wrapper">
            <div class="card-image">
              <img class="destination-img" src="${destination.image}" alt="${destination.alt}">
            </div>
            <div class="card-body">
              <div class="trip-info">
                <h4>${destination.destination}</h4>
                <div class="date">Date of Trip: ${trip.date}</div>
                <div class="num-travelers">Travelers: ${trip.travelers}</div>
                <div class="duration">Duration: ${trip.duration} days</div>
                <div class="trip-cost">Trip Cost: $${trip.calculateTripCost(allDestinationsData)}</div>
              </div>
              <h5 class="trip-status">${trip.status}</h5>
            </div>
          </div>`);
      } else if (trip.destinationID === destination.id && trip.status === "approved") {
        return approvedTripsCardContainer.innerHTML += (
          `<div tabindex="0" class="card-wrapper">
            <div class="card-image">
              <img class="destination-img" src="${destination.image}" alt="${destination.alt}">
            </div>
            <div class="card-body">
              <div class="trip-info">
                <h4>${destination.destination}</h4>
                <div class="date">Date of Trip: ${trip.date}</div>
                <div class="num-travelers">Travelers: ${trip.travelers}</div>
                <div class="duration">Duration: ${trip.duration} days</div>
                <div class="trip-cost">Trip Cost: $${trip.calculateTripCost(allDestinationsData)}</div>
                <h5 class="trip-status">${trip.status}</h5>
              </div>
            </div>
          </div>`);
      }
    })
  })
  return getTripCards;
}

function updateDestinationsSelectionMenu() {
  destinationInput.innerHTML = `<option value="" disabled selected>Please choose a destination?</option>`;
  allDestinationsData.sort((a, b) => a.destination.localeCompare(b.destination));
  allDestinationsData.forEach(destination => {
    destinationInput.innerHTML +=
      `<option value="${destination.id}" class="destination-name">${destination.destination}</option>`;
  })
}

function createNewTrip() {
  let id = allTripsData.length + 1;
  let newDate = dateInput.value.split('-').join('/');
  let destination = parseInt(destinationInput.value);
  let travelers = parseInt(numTravelers.value);
  let duration = parseInt(durationInput.value);
  let status = "pending";

  let newTrip = new _Trip__WEBPACK_IMPORTED_MODULE_3__.default({
    id,
    userID: currentTraveler.id,
    destinationID: destination,
    travelers,
    date: newDate,
    duration,
    status,
    suggestedActivities: []
  });
  estimate.innerHTML = `This trip will cost $${newTrip.calculateTripCost(allDestinationsData)}`;
  return newTrip;
}

function saveNewTrip() {
  event.preventDefault();
  let newTrip = createNewTrip();
  currentTraveler.myTrips.unshift(newTrip);
  createTripCards();
  resetForm();
  (0,_apiCalls__WEBPACK_IMPORTED_MODULE_1__.postNewTrip)(newTrip);
}

function resetForm() {
  estimate.innerHTML = "Please fill out the form to see your trip estimate!";
  dateInput.value = "";
  numTravelers.value = "";
  durationInput.value = ""
  destinationInput.value = "";
}

function resetLogin() {
  usernameInput.value = "";
  passwordInput.value = "";
}

function checkBookingFields() {
  if (dateInput.value !== "" && numTravelers.value !== "" &&
    durationInput.value !== "" && destinationInput.value !== "") {
    bookNowButton.classList.remove('disable');
    bookNowButton.disabled = false;
    createNewTrip();
  } else {
    bookNowButton.disabled = true;
    bookNowButton.classList.add('disable');
  }
}

function logout(event) {
  loginPage.classList.remove("hidden");
  loginHeading.classList.remove("hidden");
  application.classList.add("hidden");
  loginErrorMessage.innerHTML = "";
  resetLogin();
}

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map