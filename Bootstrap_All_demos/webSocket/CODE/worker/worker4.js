//TODO 1.接收HTML页面传递的消息
/*addEventListener('message',function(event){
    var data = event.data;
    var msg = data.msg;
    switch (msg) {
        case 'i am zhangwuji':
            postMessage('i am xiaona');
            break;
        case 'how are you':
            postMessage('how are you too');
            break;
        case 'how old are you':
            postMessage('go away');
            break;
    }
});*/

onmessage = function(event){
    var data = event.data;
    var msg = data.msg;
    switch (msg) {
        case 'i am zhangwuji':
            postMessage('i am xiaona');
            break;
        case 'how are you':
            postMessage('how are you too');
            break;
        case 'how old are you':
            postMessage('go away');
            break;
    }
}