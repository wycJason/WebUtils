HTML5 DAY06:
 * Web Workers(了解)
   * 概念内容
     * 单线程与多线程
     * Worker的特点
       * 提供前端技术的"多线程"
       * 充分的利用多核CPU
     * Worker的使用场景
       * 主逻辑 - HTML页面的逻辑
         * 就是一个HTML页面
       * 线程逻辑 - Worker的逻辑
         * 就是一个Worker(JavaScript文件)
   * 如何使用Worker
     * 创建Worker对象
       var worker = new Worker(url);
       * url - 表示对应worker文件的路径
     * Worker对象
       * 事件
         * onmessage事件 - 用于监听Worker文件
	   * 当Worker调用postMessage()方法传递消息时,该事件被触发
         * onerror事件 - 用于监听错误
	   * 当Worker出现错误时,该事件被触发
       * 方法
         * postMessage(msg)方法 - 传递消息
	 * terminate()方法 - 终止通信(HTML与Worker之间)
   * Worker文件的限制
     * 无法使用DOM内容
     * 无法使用BOM内容(window对象)
     * 以下内容允许使用
       * setTimeout()和cleatTimtout()
       * setInterval()和clearInterval()
   * Worker实现的效果
     * 单向通信 - worker文件->HTML页面 传递消息
     * 双向通信 - worker文件<->HTML页面 传递消息
   * Worker的应用场景
     * 应用于网络网页游戏
     * 配合Ajax实现更高级的异步请求
     * 实现类似于Ajax的"异步"
       * Ajax - 一定与服务器端有关
       * Worker - 可以不需要服务器端
 * Web存储
   * 基础内容
     * Cookie - 存储在用户电脑中
       * 存储的内容仅限于英文+数字(不能是中文)
       * 单个文件的大小限制为 4KB
       * 浏览器每个网站(Web应用)最多可存储200多Cookie文件
       * 存储信息是以明文方式(未加密)
     * HTML5的替代技术
       * sessionStorage(会话存储)
         * 表示一次会话完毕,存储的信息自动清除
	   * 一次会话 - 请求->响应
	   * 简单理解为页面从打开到关闭
         * 存储数据的范围
	   * 仅局限于当前HTML页面(无法跨页面存在)
       * localStorage(本地存储)
         * 如果不是人为删除,存储的信息一直保留
	   * 存储的数据内容可以跨页面的
     * 如何得到HTML5的web存储
       * Web存储提供sessionStorage和localStorage对象
       * sessionStorage和localStorage对象被集成在window对象中
         * window.sessionStorage
	 * window.localStorage
   * storage对象
     * 方法
       * setItem(key,value)方法 - 存储数据
         * key - 表示存储数据对应的标识(唯一)
	 * value - 表示存储的数据内容
       * getItem(key)方法 - 获取指定数据
         * key - 表示获取指定数据的标识
       * removeItem(key)方法 - 删除指定数据
         * key - 表示删除指定数据的标识
       * key(index)方法 - 根据index获取对应标识
         * index - 表示存储数据的索引(角标)
       * clear()方法 - 清空所有数据内容
     * 属性
       * length属性 - 获取所有数据的数量
     * 问题
       * 默认情况下,无法存储复杂数据
         * Object
	 * Array
   * sessionStorage
   * localStorage
     * 上述的方法及属性的基础上
     * storage事件
       * 浏览器的兼容性 - 浏览器不支持
       * 提供的功能会缺失
 * Web Sockets(了解)
   * 基本概念
     * 通信协议
       * HTTP协议 - B/S架构(浏览器/服务器)
         * 短链接
	   建立链接 请求->响应(一次) 关闭链接
       * SOCKET协议 - C/S架构(客户端/服务器)
         * 长链接
	   建立链接 请求->响应(多次) 关闭链接
     * Web Sockets
       * 在HTML页面中实现Socket协议效果
   * Web Sockets API
     * 创建 WebSocket 对象
       var websocket = new WebSocket(url);
       * url - 表示当前链接的服务器端地址
         * 该地址必须以以下内容开头:
	   * ws:// - websocket
	   * wss:// - webscoket的加密版本(openSSL)
     * WebSocket 对象
       * 方法
         * send(data)方法
	   * 作用 - 向服务器端发送请求数据
	 * close()方法
	   * 作用 - 关闭客户端与服务器端之间的链接
       * 属性
         * readyState属性
	   * 作用 - 获取服务器端的状态
       * 事件
         * onopen事件
	   * 作用 - 监听客户端与服务器端是否建立链接
	 * onmessage事件
	   * 作用 - 监听服务器端向客户度响应数据
	 * onclose事件
	   * 作用 - 监听客户端与服务器端之间是否关闭链接
 * (Ajax)同源策略
   * 同源策略 - 同一个来源
     * HTML页面 -> Worker文件
       var worker = new Worker(url)
   * 跨域请求
 * JSON格式的转换
   * JSON对象
     * 在JavaScript - Object或Array
     * 在PHP - Object或Array
   * JSON字符串
     * 格式符合JSON要求的字符串内容
   * JSON对象转换成JSON字符串
     JSON.stringify()
   * JSON字符串转换成JSON对象
     JSON.parse()
  * 练习 - 删除
    16:55 - 17:05 休息
    17:05 - 17:20 练习