/**
 * Peento-Blog Utils
 *
 * @author Zongmin Lei <leizongmin@gmail.com>
 */

var path = require('path');
var xss = require('xss');
var utils = module.exports;



utils.noopCallback = function (err) {
  if (err) console.error(err.stack);
};

utils.argumentsToArray = function (args) {
  return Array.prototype.slice.call(args, 0);
};

utils.objectEachKey = function (obj, fn) {
  Object.keys(obj).forEach(fn);
};

utils.isString = function (str) {
  return (typeof str === 'string');
};

utils.isInteger = function (str) {
  return (Math.round(str) === Number(str));
};

utils.isNumber = function (str) {
  return (!isNaN(str));
};

utils.cloneObject = function (obj) {
  return JSON.parse(JSON.stringify(obj));
};

utils.merge = function (a, b) {
  var c = {};
  a = utils.cloneObject(a);
  b = utils.cloneObject(b);
  utils.objectEachKey(a, function (k) {
    c[k] = a[k];
  });
  utils.objectEachKey(b, function (k) {
    c[k] = b[k];
  });
  return c;
};

utils.parseQueryBool = function (str, b) {
  str = String(str);
  if (str === '1' || str === 'true' || str === 'yes' || str === 'on') {
    return true;
  } else if (str === '0' || str === 'false' || str === 'no' || str === 'off') {
    return false;
  } else {
    return b;
  }
};

var whiteList = utils.cloneObject(xss.whiteList);
(function () {
  whiteList.strike = [];
})();
var defaultXss = new xss.FilterXSS({
  stripIgnoreTag:     true,
  stripIgnoreTagBody: ['script'],
  whiteList:          whiteList
});
utils.xss = function (html) {
  return defaultXss.process(html);
};

var xssStripHtml = new xss.FilterXSS({
  whiteList:          [],
  stripIgnoreTag:     true,
  stripIgnoreTagBody: ['script']
});
utils.stripHtml = function (html) {
  return xssStripHtml.process(html);
};
