"use strict";

exports.ExportLoadPanel = void 0;

var _renderer = _interopRequireDefault(require("../../core/renderer"));

var _extend = require("../../core/utils/extend");

var _window = require("../../core/utils/window");

var _message = _interopRequireDefault(require("../../localization/message"));

var _type = require("../../core/utils/type");

var _load_panel = _interopRequireDefault(require("../../ui/load_panel"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var EXPORT_LOAD_PANEL_CLASS = 'dx-export-loadpanel';

var ExportLoadPanel = /*#__PURE__*/function () {
  function ExportLoadPanel(component, $targetElement, $container, options) {
    this._$targetElement = $targetElement;
    this._$container = $container;
    this._loadPanel = component._createComponent((0, _renderer.default)('<div>').addClass(EXPORT_LOAD_PANEL_CLASS).appendTo(this._$container), _load_panel.default, this.getOptions(options));
  }

  var _proto = ExportLoadPanel.prototype;

  _proto.getDefaultOptions = function getDefaultOptions() {
    var _this = this;

    return {
      animation: null,
      shading: false,
      height: 90,
      width: 200,
      position: function position() {
        var $window = (0, _renderer.default)((0, _window.getWindow)());

        if (_this._$targetElement.height() > $window.height()) {
          return {
            of: $window,
            boundary: _this._$targetElement,
            collision: 'fit'
          };
        }

        return {
          of: _this._$targetElement
        };
      },
      container: this._$container
    };
  };

  _proto.getOptions = function getOptions(options) {
    if ((0, _type.isDefined)(options.text)) {
      options.message = options.text;
    } else {
      options.message = _message.default.format('dxDataGrid-exporting');
    }

    return (0, _extend.extend)(this.getDefaultOptions(), options);
  };

  _proto.show = function show() {
    this._loadPanel.show();
  };

  _proto.dispose = function dispose() {
    (0, _renderer.default)(this._loadPanel.element()).remove();
    delete this._loadPanel;
  };

  return ExportLoadPanel;
}();

exports.ExportLoadPanel = ExportLoadPanel;