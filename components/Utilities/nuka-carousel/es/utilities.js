function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React from 'react';
export var addEvent = function addEvent(elem, type, eventHandle) {
  if (elem === null || typeof elem === 'undefined') {
    return;
  }

  if (elem.addEventListener) {
    elem.addEventListener(type, eventHandle, false);
  } else if (elem.attachEvent) {
    elem.attachEvent("on".concat(type), eventHandle);
  } else {
    elem["on".concat(type)] = eventHandle;
  }
};
export var removeEvent = function removeEvent(elem, type, eventHandle) {
  if (elem === null || typeof elem === 'undefined') {
    return;
  }

  if (elem.removeEventListener) {
    elem.removeEventListener(type, eventHandle, false);
  } else if (elem.detachEvent) {
    elem.detachEvent("on".concat(type), eventHandle);
  } else {
    elem["on".concat(type)] = null;
  }
};
export var addAccessibility = function addAccessibility(children, slidesToShow, currentSlide) {
  var needsTabIndex;

  if (slidesToShow > 1) {
    return React.Children.map(children, function (child, index) {
      var firstVisibleSlide = index >= currentSlide;
      var lastVisibleSlide = index < slidesToShow + currentSlide;
      needsTabIndex = firstVisibleSlide && lastVisibleSlide;
      var ariaProps = needsTabIndex ? {
        'aria-hidden': 'false',
        tabIndex: 0
      } : {
        'aria-hidden': 'true'
      };
      return React.cloneElement(child, _objectSpread({}, child.props, ariaProps));
    });
  } else {
    return React.Children.map(children, function (child, index) {
      needsTabIndex = index !== currentSlide;
      var ariaProps = needsTabIndex ? {
        'aria-hidden': 'true'
      } : {
        'aria-hidden': 'false',
        tabIndex: 0
      };
      return React.cloneElement(child, _objectSpread({}, child.props, ariaProps));
    });
  }
};