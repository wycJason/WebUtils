module.exports =
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
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(285);


/***/ },

/***/ 285:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _tabs = __webpack_require__(286);

	var _tabs2 = _interopRequireDefault(_tabs);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/* istanbul ignore next */
	_tabs2.default.install = function (Vue) {
	  Vue.component(_tabs2.default.name, _tabs2.default);
	};

	exports.default = _tabs2.default;

/***/ },

/***/ 286:
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}

	/* script */
	__vue_exports__ = __webpack_require__(287)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__.default === "object" ||
	  typeof __vue_exports__.default === "function"
	) {
	__vue_options__ = __vue_exports__ = __vue_exports__.default
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}


	module.exports = __vue_exports__


/***/ },

/***/ 287:
/***/ function(module, exports) {

	'use strict';

	module.exports = {
	  name: 'el-tabs',

	  props: {
	    type: String,
	    activeName: String,
	    closable: {
	      type: Boolean,
	      default: false
	    },
	    value: {}
	  },

	  data: function data() {
	    return {
	      children: null,
	      currentName: this.value || this.activeName
	    };
	  },


	  watch: {
	    activeName: function activeName(value) {
	      this.setCurrentName(value);
	    },
	    value: function value(_value) {
	      this.setCurrentName(_value);
	    }
	  },

	  computed: {
	    currentTab: function currentTab() {
	      var _this = this;

	      if (!this.$children) return;
	      var result = void 0;
	      this.$children.forEach(function (tab) {
	        if (_this.currentName === (tab.name || tab.index)) {
	          result = tab;
	        }
	      });
	      return result;
	    }
	  },

	  methods: {
	    handleTabRemove: function handleTabRemove(tab, event) {
	      var _this2 = this;

	      event.stopPropagation();
	      var tabs = this.$children;
	      var currentTab = this.currentTab;

	      var index = tabs.indexOf(tab);
	      tab.$destroy();

	      this.$emit('tab-remove', tab);
	      this.$forceUpdate();

	      this.$nextTick(function (_) {
	        if (tab.active) {
	          var nextChild = tabs[index];
	          var prevChild = tabs[index - 1];
	          var nextActiveTab = nextChild || prevChild || null;

	          if (nextActiveTab) {
	            _this2.setCurrentName(nextActiveTab.name || nextActiveTab.index);
	          }
	          return;
	        } else {
	          _this2.setCurrentName(currentTab.name || currentTab.index);
	        }
	      });
	    },
	    handleTabClick: function handleTabClick(tab, tabName, event) {
	      if (tab.disabled) return;
	      this.setCurrentName(tabName);
	      this.$emit('tab-click', tab, event);
	    },
	    setCurrentName: function setCurrentName(value) {
	      this.currentName = value;
	      this.$emit('input', value);
	    }
	  },
	  mounted: function mounted() {
	    this.$forceUpdate();
	  },
	  render: function render(h) {
	    var _this3 = this;

	    var type = this.type,
	        handleTabRemove = this.handleTabRemove,
	        handleTabClick = this.handleTabClick,
	        currentName = this.currentName;


	    var getBarStyle = function getBarStyle() {
	      if (_this3.type || !_this3.$refs.tabs) return {};
	      var style = {};
	      var offset = 0;
	      var tabWidth = 0;

	      _this3.$children.every(function (tab, index) {
	        var $el = _this3.$refs.tabs[index];
	        if (!$el) {
	          return false;
	        }

	        if (!tab.active) {
	          offset += $el.clientWidth;
	          return true;
	        } else {
	          tabWidth = $el.clientWidth;
	          return false;
	        }
	      });

	      style.width = tabWidth + 'px';
	      style.transform = 'translateX(' + offset + 'px)';

	      return style;
	    };

	    var tabs = this.$children.map(function (tab, index) {
	      var tabName = tab.name || tab.index || index;
	      if (currentName === undefined && index === 0) {
	        _this3.setCurrentName(tabName);
	      }

	      tab.index = index;

	      var activeBar = !type && index === 0 ? h(
	        'div',
	        { 'class': 'el-tabs__active-bar', style: getBarStyle() },
	        []
	      ) : null;

	      var btnClose = tab.isClosable ? h(
	        'span',
	        { 'class': 'el-icon-close', on: {
	            'click': function click(ev) {
	              handleTabRemove(tab, ev);
	            }
	          }
	        },
	        []
	      ) : null;

	      var tabLabelContent = tab.$slots.label || tab.label;

	      return h(
	        'div',
	        {
	          'class': {
	            'el-tabs__item': true,
	            'is-active': tab.active,
	            'is-disabled': tab.disabled,
	            'is-closable': tab.isClosable
	          },
	          ref: 'tabs',
	          refInFor: true,
	          on: {
	            'click': function click(ev) {
	              handleTabClick(tab, tabName, ev);
	            }
	          }
	        },
	        [tabLabelContent, btnClose, activeBar]
	      );
	    });
	    return h(
	      'div',
	      { 'class': {
	          'el-tabs': true,
	          'el-tabs--card': type === 'card',
	          'el-tabs--border-card': type === 'border-card'
	        } },
	      [h(
	        'div',
	        { 'class': 'el-tabs__header' },
	        [tabs]
	      ), h(
	        'div',
	        { 'class': 'el-tabs__content' },
	        [this.$slots.default]
	      )]
	    );
	  }
	};

/***/ }

/******/ });