//TODO 1.����HTMLҳ�洫�ݵ���Ϣ
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