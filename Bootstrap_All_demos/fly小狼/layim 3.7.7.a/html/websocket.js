layui.define(function(exports){
	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }


	  /**
	   * Event事件对象
	   * cxt上下文
	   * @constructor
	   */

	  function Event(cxt) {
		this._events = {};
		this.cxt = cxt;
	  }

	  //off,pause,resume通用方法
	  function eventsApi(self, name, cb, cxt) {
		var events = {};

		for (var key in self._events) {
		  events[key] = self._events[key];
		}

		if (name) {
		  events = {};
		  name.split(/\s/).forEach(function (ename) {
			if (ename && self._events[ename]) {
			  events[ename] = self._events[ename];
			}
		  });
		}

		var keys = Object.keys(events);
		if (keys.length === 0) return events;

		if (cb && typeof cb === 'function') {
		  keys.forEach(function (key) {
			events[key] = events[key].filter(function (event) {
			  return event.cb == cb;
			});
		  });
		}

		if (cxt) {
		  keys.forEach(function (key) {
			events[key] = events[key].filter(function (event) {
			  return event.cxt == cxt;
			});
		  });
		}

		return events;
	  }

	  //暂停,恢复通用方法
	  function eventsPauseApi(self, name, cb, cxt, val) {
		var events = eventsApi(self, name, cb, cxt);
		for (var key in events) {
		  events[key].forEach(function (item) {
			item.pause = val;
		  });
		}
	  }

	  //on,once通用方法
	  function eventsOnApi(self, name, cb, cxt, once) {
		if (!name || typeof cb != 'function' || typeof name !== 'string') return this;
		name.split(/\s/).forEach(function (ename) {
		  if (!ename) return;
		  var handlers = self._events[ename] || [];
		  handlers.push({
			cb: cb,
			cxt: cxt || self.cxt || self,
			pause: false,
			i: 0,
			once: once
		  });
		  self._events[ename] = handlers;
		});
	  }

	  /**
	   * 绑定一个事件
	   * @param name 只能是字符串
	   * @param cb
	   * @param cxt
	   * @returns {Event}
	   */
	  Event.prototype.on = function (name, cb, cxt) {
		eventsOnApi(this, name, cb, cxt, false);
		return this;
	  };

	  Event.prototype.once = function (name, cb, cxt) {
		eventsOnApi(this, name, cb, cxt, true);
		return this;
	  };

	  /**
	   * 卸载某个事件
	   * @param name
	   * @returns {Event}
	   */
	  Event.prototype.off = function (name, cb, cxt) {

		var events = eventsApi(this, name, cb, cxt);
		for (var key in events) {
		  var e = this._events[key];
		  events[key].slice(0).forEach(function (item) {
			e.splice(e.indexOf(item), 1);
		  });
		}

		return this;
	  };

	  /**
	   * 暂停某个事件,用法同off
	   * @param name
	   * @returns {Event}
	   */
	  Event.prototype.pause = function (name, cb, cxt) {
		eventsPauseApi(this, name, cb, cxt, true);
		return this;
	  };

	  /**
	   * 恢复某个事件,用法同off
	   * @param name
	   * @returns {Event}
	   */
	  Event.prototype.resume = function (name, cb, cxt) {
		eventsPauseApi(this, name, cb, cxt, false);
		return this;
	  };

	  /**
	   * 触发某个事件
	   * @param name
	   * @returns {Event}
	   */
	  Event.prototype.emit = Event.prototype.trigger = function (name) {

		var self = this;
		if (!name || typeof name !== 'string') return this;
		var len = arguments.length;
		var args = [],
			i = 1;
		while (i < len) {
		  args.push(arguments[i++]);
		}

		name.split(/\s/).forEach(function (ename) {
		  if (ename && self._events[ename]) {
			self._events[ename].forEach(function (handle) {
			  if (!handle.pause && !(handle.i === 1 && handle.once)) {
				handle.cb.apply(handle.cxt, args);
				handle.i++;
			  }
			});
		  }
		});

		return this;
	  };

	  var settings = {
		debug: false,
		// 实例化时直接创建连接，无须手动open
		automaticOpen: true,
		// 自动尝试连接
		automaticReconnect: true,
		// 每次尝试连接的事件间隔
		reconnectInterval: 1000,
		// 最大延迟连接的事件间隔
		maxReconnectInterval: 30000,
		// 重新尝试连接的比率
		reconnectDecay: 1.5,
		// 连接超时事件，毫秒值
		timeoutInterval: 2000,
		// 最大连接数 null 无限
		maxReconnectAttempts: null,
		// 二进制类型，默认blob，或者arraybuffer
		binaryType: 'blob'
	  };

	  var WebSocketIO = function (_Event) {
		_inherits(WebSocketIO, _Event);

		function WebSocketIO(url, protocols) {
		  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

		  _classCallCheck(this, WebSocketIO);

		  var _this = _possibleConstructorReturn(this, (WebSocketIO.__proto__ || Object.getPrototypeOf(WebSocketIO)).call(this));

		  if (isPlainObject(protocols)) {
			options = protocols;
			protocols = null;
		  }

		  _this.url = url;
		  // 可以是一个单个的协议名字字符串或者包含多个协议名字字符串的数组。这些字符串用来表示子协议，这样做可以让一个服务器实现多种WebSocket子协议
		  _this.protocols = protocols;
		  // 后端指定的子协议
		  _this.protocol = null;
		  // 代理设置选项
		  for (var key in settings) {
			if (typeof options[key] !== 'undefined') {
			  _this[key] = options[key];
			} else {
			  _this[key] = settings[key];
			}
		  }

		  // websocket的实例
		  _this.io = null;
		  // 手动关闭
		  _this.forcedClose = false;
		  // 是否被销毁
		  _this.active = true;
		  // 重新尝试连接的次数
		  _this.reconnectAttempts = 0;
		  _this.status = false;//当前状态
		  // 自动打开连接
		  if (_this.automaticOpen === true) {
			_this.open(false);
		  }
		  return _this;
		}

		_createClass(WebSocketIO, [{
		  key: 'open',
		  value: function open(reconnectAttempt) {
			var _this2 = this;

			// 已经销毁或已经存在io实例不做处理
			if (!this.active || this.io) return;
			try {
			  this.io = new WebSocket(this.url, this.protocols);
			} catch (e) {
			  this.emit('error', e);
			  throw e;
			}

			// 再次尝试连接
			if (reconnectAttempt) {
			  if (this.maxReconnectAttempts && this.reconnectAttempts > this.maxReconnectAttempts) return;
			} else {
			  this.reconnectAttempts = 0;
			}

			// 触发connecting事件，通知正在连接
			this.emit('connecting');
			log('attempt-connect', this);

			// 设置超时
			this.timeId = setTimeout(function () {
			  log('connection-timeout', _this2);
			  _this2.timeoutClosed = true;
			  _this2.io.close();
			  _this2.timeoutClosed = false;
			}, this.timeoutInterval);

			// 监听WebSocket的回调事件
			attachEvent(this, this.io, reconnectAttempt);
		  }

		  // 发送数据

		}, {
		  key: 'send',
		  value: function send(data) {
			return socketSend(this,data);
		  }
		}, {
		  key: 'close',
		  value: function close(reason) {
			var code = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1000;
			if (!this.active) return;
			this.forcedClose = true;
			if (this.io) {
				this.status = false;//设置状态
				this.io.close(code, reason);
				this.io.onclose();
			}
		  }
		}, {
		  key: 'destroy',
		  value: function destroy() {
			if (this.active) {
			  this.active = false;
			  this.close('destroy');
			}
		  }
		}, {
		  key: 'readyState',
		  get: function get() {
			if (this.io) {
			  return this.io.readyState;
			}
		  }
		}]);

		return WebSocketIO;
	  }(Event);

	  function attachEvent(ws, io, reconnectAttempt) {
		io.onopen = function (e) {
		  clearTimeout(ws.timeId);
		  log('open', ws);
		  this.reconnectAttempts = 0;
		  ws.protocol = io.protocol;
		  ws.status = true;//设置状态
		  ws.emit('open', e);
		};

		io.onclose = function (e) {
		  clearTimeout(ws.timeId);
		  ws.io = null;
		  if (ws.forcedClose) {
			  ws.emit('close', e);
			if (!ws.active) {
			  // 通过destroy销毁对象，在执行完事件通知完毕后，清空事件
			  ws._events = {};
			}
		  } else {
			// 尝试再次拦截
			if (!reconnectAttempt && !ws.timeoutClosed) {
				ws.emit('close', e);
			}

			if (!ws.automaticReconnect) return;

			var timeout = ws.reconnectInterval * Math.pow(ws.reconnectDecay, ws.reconnectAttempts);
			setTimeout(function () {
			  ws.reconnectAttempts++;
			  ws.open(true);
			}, timeout > ws.maxReconnectInterval ? ws.maxReconnectInterval : timeout);
		  }
		};

		io.onmessage = function (e) {
		  log('onmessage: ', e.data, ws);
		  try {
				var data = JSON.parse(e.data);
				if(undefined != data.datatype){
					ws.emit(data.datatype, data);
				}else{
					ws.emit('json', data);
				}
		  } catch (e) {/*this.stop('JSON转换异常');*/
				//console.log("JSON转换异常:" + msg);
				ws.emit('txt', e.data);
		  }
		};

		io.onerror = function (e) {
		  log('onerror: ', e, ws);
		  ws.emit('error', e);
		};
	  }
	  function socketSend(self,data){
		  if (self.io) {
			  log('send data: ', data, self);
			  self.io.send(data);
			  return true
		  } else {
			  console.error('WebSocket实例不存在，请尝试重新连接');
		  }
		  return false;
	  }
	  function log() {
		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
		  args[_key] = arguments[_key];
		}

		var ws = args[args.length - 1];
		if (ws.debug) {
		  var _console;

		  var e = args.slice(0, args.length - 1);
		  (_console = console).log.apply(_console, _toConsumableArray(e));
		}
	  }

	  function isObjectLike(obj) {
		return obj != null && (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object';
	  }

	  var objectProto = Object.prototype;
	  var toString = function toString(obj) {
		return objectProto.toString.call(obj);
	  };

	  function isPlainObject(obj) {
		if (!isObjectLike(obj) || toString(obj) !== '[object Object]') {
		  return false;
		}
		var proto = Object.getPrototypeOf(obj);
		if (proto === null) {
		  return true;
		}

		return proto.constructor === Object;
	  }
	  	//前端加载一次 即单例使用
	  	var websocket = new WebSocketIO('',[],{automaticOpen:false});
		//接口输出
		exports('websocket', websocket);
	});