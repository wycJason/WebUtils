/**
 * Created by Administrator on 2017/9/22.
 */
//获取询价列表参数
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

        var para = {//默认-我收到的
            "IsWeb": 1,             // 可空，短整形，是否Web 端请求
            "IsGetNew": $("#reciveEnquiry-hidden").val() > 0 ? 0 : 1,          // 必填，短整型，是否请求最新数据，1-请求最新数据，0-以DataPoint 为分界点获取之前的数据
            "DataPoint": $("#reciveEnquiry-hidden").val(),  // 分页时间点，可填，长整型，如果第一次查询可传0，后续可利用返回的值进行缓存，!!!!注意这里不是DatePoint

            "BeginDate": $tool._formatToeEast8Date($("#startDate").val(), 1),  // 指定时间范围查询：开始时间，取日期的 00:00:00开始
            "EndDate": $tool._formatToeEast8Date($("#endDate").val(), 1),    // 指定时间范围查询：结束时间，取日期的 23:59:59截止

            "UnionRelats": [         // FormID、TemplateID 组合列表，
                {
                    "FormID": 90002,       // 表单ID，询价单这里置90002
                    "TemplateID": 0,   // 模版ID，询价单这里置0
                }
            ],
            "SearchText": $("#reciveEnquiry-search-text").val(),    // 字符型，查询关键字，询价单查询【模型、品牌、封装、年份，询价说明】

            "MeRelats": [9],        // 与我相关查询，询价单暂时定义：3-我发出的，9-我收到的

            "BaseStatusOrs": orderStatus,    // 单据状态列表，传入选中单据状态即可 6未成交、5部分成交、2已成交、4已关闭, 3已取消，原有【0待报价、1已报价废弃】如果筛选状态是“全选”则不传该参数（注意不是传0）
            "SearchField1": $("#searchfield1").val(),    //查询型号关键字
            "SearchField2": $("#searchfield2").val(),    //查询备注关键字

            "TargetCompanyID": 0,    // 目标公司，报表查询跳转列表用
            //"StatusRelats": [1],       // 列表组合，报表查询调整列表时 1-询价数，2-报价数，3-成交数，4-未报价（单据即使关闭了，对方公司也没有报价的情况）

            "StatusRelats2": offerStatus      // 我收到的-报价状态列表，0未报价、1已报价、2已接受，不传则不进行筛选
        };
        if ((meRelats || 9) === 3) {   //我发出的
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