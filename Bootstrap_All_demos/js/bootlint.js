/**
 * Created by Administrator on 2017/1/6.
 */
/*Bootlint
 Bootlint �� Bootstrap �ٷ���֧�ֵ� HTML ��⹤�ߡ���ʹ���� Bootstrap ��ҳ���ϣ�û�ж� Bootstrap ���޸ĺ���չ������£���
 �����Զ����ĳЩ������ HTML ���󡣴���� Bootstrap �����Ҫ�̶��� DOM �ṹ��Bootlint ���ܼ�����ҳ���ϵ���Щ�����⡱��
 Bootstrap ����Ƿ���� Bootstrap �� HTML �ṹ���򡣽��齫 Bootlint ���뵽��Ŀ��������У�
 �������ܰ�������Ŀ�����б���һЩ�򵥵Ĵ���Ӱ����Ŀ������ȡ�*/
(function () {
    var s = document.createElement("script");
    s.onload = function () {
        bootlint.showLintReportForCurrentDocument([]);
    };
    s.src = "js/bootlint.js";
    document.body.appendChild(s)
})()