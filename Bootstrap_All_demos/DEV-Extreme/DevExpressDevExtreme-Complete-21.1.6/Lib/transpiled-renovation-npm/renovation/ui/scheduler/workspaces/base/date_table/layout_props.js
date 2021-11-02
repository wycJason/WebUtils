"use strict";

exports.DateTableLayoutProps = void 0;

var _layout_props = require("../layout_props");

var _cell = require("./cell");

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var DateTableLayoutProps = _extends({}, _layout_props.LayoutProps, {
  cellTemplate: _cell.DateTableCellBase
});

exports.DateTableLayoutProps = DateTableLayoutProps;