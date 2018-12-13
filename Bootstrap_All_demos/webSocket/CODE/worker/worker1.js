/**
 * TODO 当前JavaScript文件就是 Web Worker 文件
 * TODO * 自动具有一个当前文件内的全局对象(Worker对象)
 * TODO   * 该全局对象不需要人为创建的
 * TODO   * 该全局对象实际调用时可省略
 * TODO * 结论 - 在 Worker 文件中直接调用 Worker 对象的事件或方法
 */
postMessage('this is msg.');