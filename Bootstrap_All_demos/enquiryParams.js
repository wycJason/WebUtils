/**
 * Created by Administrator on 2017/9/22.
 */
//��ȡѯ���б����
var ic ={
    getSearchItemParameter: function (meRelats,paramObj) {
        var orderStatus = [];
        var offerStatus = [];
        $('input[name="orderStatus"]').each(function (i, p) {
            if ($(this).prop("checked")) {
                orderStatus.push(parseInt($(this).val()));
            }
        })
        $('input[name="offerStatus"]').each(function (i, p) {
            if ($(this).prop("checked")) {
                offerStatus.push(parseInt($(this).val()));
            }
        });

        var para = {//Ĭ��-���յ���
            "IsWeb": 1,             // �ɿգ������Σ��Ƿ�Web ������
            "IsGetNew": $("#reciveEnquiry-hidden").val() > 0 ? 0 : 1,          // ��������ͣ��Ƿ������������ݣ�1-�����������ݣ�0-��DataPoint Ϊ�ֽ���ȡ֮ǰ������
            "DataPoint": $("#reciveEnquiry-hidden").val(),  // ��ҳʱ��㣬��������ͣ������һ�β�ѯ�ɴ�0�����������÷��ص�ֵ���л��棬!!!!ע�����ﲻ��DatePoint

            "BeginDate": $tool._formatToeEast8Date($("#startDate").val(), 1),  // ָ��ʱ�䷶Χ��ѯ����ʼʱ�䣬ȡ���ڵ� 00:00:00��ʼ
            "EndDate": $tool._formatToeEast8Date($("#endDate").val(), 1),    // ָ��ʱ�䷶Χ��ѯ������ʱ�䣬ȡ���ڵ� 23:59:59��ֹ

            "UnionRelats": [         // FormID��TemplateID ����б�
                {
                    "FormID": 90002,       // ��ID��ѯ�۵�������90002
                    "TemplateID": 0,   // ģ��ID��ѯ�۵�������0
                }
            ],
            "SearchText": $("#reciveEnquiry-search-text").val(),    // �ַ��ͣ���ѯ�ؼ��֣�ѯ�۵���ѯ��ģ�͡�Ʒ�ơ���װ����ݣ�ѯ��˵����

            "MeRelats": [9],        // ������ز�ѯ��ѯ�۵���ʱ���壺3-�ҷ����ģ�9-���յ���

            "BaseStatusOrs": orderStatus,    // ����״̬�б�����ѡ�е���״̬���� 6δ�ɽ���5���ֳɽ���2�ѳɽ���4�ѹر�, 3��ȡ����ԭ�С�0�����ۡ�1�ѱ��۷��������ɸѡ״̬�ǡ�ȫѡ���򲻴��ò�����ע�ⲻ�Ǵ�0��
            "SearchField1": $("#searchfield1").val(),    //��ѯ�ͺŹؼ���
            "SearchField2": $("#searchfield2").val(),    //��ѯ��ע�ؼ���

            "TargetCompanyID": 0,    // Ŀ�깫˾�������ѯ��ת�б���
            //"StatusRelats": [1],       // �б���ϣ������ѯ�����б�ʱ 1-ѯ������2-��������3-�ɽ�����4-δ���ۣ����ݼ�ʹ�ر��ˣ��Է���˾Ҳû�б��۵������

            "StatusRelats2": offerStatus      // ���յ���-����״̬�б�0δ���ۡ�1�ѱ��ۡ�2�ѽ��ܣ������򲻽���ɸѡ
        };
        if ((meRelats || 9) === 3) {   //�ҷ�����
            para.IsGetNew = $("#sendEnquiry-hidden").val() > 0 ? 0 : 1;
            para.DataPoint = $("#sendEnquiry-hidden").val();
            para.MeRelats = [3];
            para.SearchText = $("#sendEnquiry-search-text").val();
        }
        if (orderStatus.length == 0) {
            delete para.BaseStatusOrs;
        }
        if (offerStatus.length == 0) {
            delete para.StatusRelats2;
        }

        para=$.extend(para,paramObj||{});
        return para;
    }
}