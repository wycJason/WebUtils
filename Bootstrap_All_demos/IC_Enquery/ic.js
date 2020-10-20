function ICInjectJS() {
    if (!!document.getElementById("ICSaveEnquery")) {
        return false;
    }

    //style自定义样式
    var myStyleFile = `
    .info-width{
        width:90%;
    }
    .ic-enquiry{
        width:90%;
    }
    .ic-equire{
        text-align: right;
        width: 1190px;
        margin: 10px auto 0;
    }
    .result_price{
        height: 40px;
        line-height: 40px;
        padding-top: 0px;
        float: left;
        overflow: hidden;
        text-align: left;
        width: 60px;
        padding-top: 2px;
        padding-left: 10px;
    }
    .hqew-btn {
        height: 25px;
        border: 0;
        margin: 5px 0 0 5px;
        border-radius: 3px;
        display: block;
        background-color: #1057a7;
        color: #ffffff;
        float: left;
        padding: 0 10px;
    }
    .ic-btn {
        height: 24px;
        width: 100px;
        float: left;
        border-width: 0px;
        line-height: 24px;
        overflow: hidden;
        cursor: pointer;
        margin-top: 7px;
        background-color: #3C6EC7;
        color: #ffffff;
    }
    `;
    var style = document.createElement('style');
    style.innerHTML = myStyleFile;
    document.getElementsByTagName('HEAD').item(0).appendChild(style);


    //自定义DOM :判断网站类型：是【IC交易网】还是【华强电子网】
    var hostname = window.location.hostname;
    if (hostname == "www.ic.net.cn") { //ic交易网
        $("#searchForm .right_resultTitle").prepend('<button id="ICSaveEnquery" class="ic-btn" type="button">批量保存询价</button>');
        $("#searchForm .addFriendBtn,#searchForm .batchInquiry").remove();
        $("#result_topBanners,#left_ads,#searchForm .bottom_ads").remove();
        $("#searchForm .right_results").css({ "width": "1190px" }).removeClass("right_results");

        //表格头部设置
        $("#resultList_title .result_check").html('<input style="margin-top: 13px;" type="checkbox" title="全选"  name="ic_check_all">');
        $("#resultList_title #tableIndex").remove();
        $("#icgoo_info,#resultList li.result_son.icgooResult_son").remove();
        $("#resultList_title .result_date,#resultList .result_date").css({ "width": "134px" });
        $("#resultList_title .result_id,#resultList .result_id").css({ "width": "115px" });
        $("#resultList_title .result_id").after('<div class="result_price">进价</div><div class="result_price">报价</div>');


        //表格正文设置
        $("#resultList li:not('#resultList_title')").each(function(i, li) {
            $(li).find(".result_check").html('<input  style="margin-top: 13px;" type="checkbox" name="ic_check">');

            //进价与报价(自定义添加)
            $(li).find(".result_id").after('<div class="result_price"><input class="ic-enquiry" title="进价" type="number" name="price"></div><div class="result_price"><input class="ic-enquiry" title="报价" type="number" name="offer"></div>');

            //厂商
            var factory = $(li).find(".result_factory").attr("title") || "";
            $(li).find(".result_factory").html('<input class="ic-enquiry"  title="' + factory + '" type="text" name="factory" value="' + factory + '">');

            //批号
            var batchnumber = $(li).find(".result_batchNumber").attr("title") || "";
            $(li).find(".result_batchNumber").html('<input class="ic-enquiry"  title="' + batchnumber + '" type="text" name="batchnumber" value="' + batchnumber + '">');

            //数量
            var totalnumber = $(li).find(".result_totalNumber").attr("title") || "";
            $(li).find(".result_totalNumber").html('<input class="ic-enquiry"  title="' + totalnumber + '" type="number" name="totalnumber" value="' + totalnumber + '">');

            //封装
            var pakaging = $(li).find(".result_pakaging").attr("title") || "";
            $(li).find(".result_pakaging").html('<input class="ic-enquiry"  title="' + pakaging + '" type="text" name="pakaging" value="' + pakaging + '">');

            //说明/库位
            var explain = $(li).find(".result_explain").attr("title") || "";
            var kwplace = $(li).find(".result_kwplace").attr("title") || "";
            var declare = !!kwplace ? explain + "/" + kwplace : explain;
            $(li).find(".result_prompt").html('<input class="ic-enquiry"  title="' + declare + '" type="text" name="declare" value="' + declare + '">');

            //日期
            var attrDate = $(li).find(".result_date").attr("title") || "";
            var hiddenDate = $(li).find(".result_date input[type='hidden']").val() || "";
            var date = !!hiddenDate ? hiddenDate.split(" ")[0] : attrDate.split(" ")[0];
            $(li).find(".result_date").html('<input class="ic-enquiry"  title="' + date + '" type="date" name="date" value="' + date + '">');
        })

        //监听全选
        $('input[name="ic_check_all"]').change(function() {
            $('input[name="ic_check"]').prop("checked", this.checked);
        });
    } else { //华强电子网    
        $("#ic_filter_btn").after('<button id="ICSaveEnquery" class="hqew-btn" type="button">批量保存询价</button>');
        $("#ad_bot, .advertising-box.js-ad-tips").remove();

        //表格头部设置
        var $tr = $('#resultList table.list-table tr:first-child');
        $tr.find("th:first-child").html('<input type="checkbox" title="全选"  name="ic_check_all">');
        $tr.find("th:nth-child(6) a.j-i-sort").remove();
        $tr.find("th:last-child").remove();
        $tr.find("th.td-model").after('<th width="5.2%">进价</th><th width="5.2%">报价</th>');

        //表格正文
        $('#resultList table.list-table tr#fshop').remove();
        $('#resultList table.list-table tr:not("#fshop,:first-child")').each(function(i, tr) {
            var uid = $(tr).find(".company").attr("uid");
            var i = $(tr).find(".company").attr("i");
            var cid = uid + '_' + i;

            //复选框
            $(tr).find('td input[name="icchk"]').parent().html('<input type="checkbox" data-cid="' + cid + '" name="ic_check" >');

            //公司名称
            /*  var cname = $(tr).find('td.j-company-td a.company').attr("cname") || "";
             $(tr).find('td.j-company-td').html('<span title="' + cname + '">' + cname + '</span>'); */

            //型号
            /*  var model = $(tr).find('td.td-model a:first-child').attr("title") || "";
             $(tr).find('td.td-model').html('<span title="' + model + '">' + model + '</span>'); */

            //进价与报价(自定义添加)
            $(tr).find('td.td-model').after('<td><input title="进价" type="number" class="info-width" name="price"></td><td><input title="报价" type="number" class="info-width" name="offer"></td>')

            //数量
            var stocknum = $(tr).find('td.td-stockNum>p.over').attr("title") || "";
            $(tr).find('td.td-stockNum').html('<input  title="' + stocknum + '" type="number" class="info-width" name="stocknum" value="' + stocknum + '">');

            //品牌
            var brand = $(tr).find('td.td-brand>.list-pro').attr("title") || "";
            $(tr).find('td.td-brand').html('<input  title="' + brand + '" type="text" class="info-width" name="brand" value="' + brand + '">');

            //批号
            var batchnumber = $(tr).find("td:nth-child(10)").find("p.over").attr("title") || "";
            $(tr).find("td:nth-child(10)").html('<input  title="' + batchnumber + '" type="text" class="info-width" name="batchnumber" value="' + batchnumber + '">');

            //封装
            var package = $(tr).find("td:nth-child(11)").find("p.over").attr("title") || "";
            $(tr).find("td:nth-child(11)").html('<input  title="' + package + '" type="text" class="info-width" name="package" value="' + package + '">');

            //产品参数
            var param = $(tr).find('td.td-param>.list-pro').attr("title") || "";
            $(tr).find('td.td-param').html('<input  title="' + param + '" type="text" class="info-width" name="param" value="' + param + '">');

            //仓库
            var depot = $(tr).find("td:nth-child(14)").find("p.over").text() || "";
            $(tr).find("td:nth-child(14)").html('<input  title="' + depot + '" type="text" class="info-width" name="depot" value="' + depot + '">');

            //交易说明
            var explain = $(tr).find("td:nth-child(15)").find(".list-pro").attr("title") || "";
            $(tr).find("td:nth-child(15)").html('<input type="text" title="' + explain + '" class="info-width" name="explain" value="' + explain + '">');

            //购买
            $(tr).find('td.pr-10').remove();
        })

        //监听全选
        $('input[name="ic_check_all"]').change(function() {
            $('input[name="ic_check"]').prop("checked", this.checked);
        });


        //监听DOM折叠行数据变化
        var $targetNodeList = $('#resultList table.list-table tr td.td-merge span'); //content监听的元素id
        //options：监听的属性
        var options = {
            attributes: true,
            attributeOldValue: true
        };
        //回调事件: 当有下级折叠行展开时处理的逻辑
        function callback(mutationsList) {
            //console.log(mutationsList);
            //console.log($(mutationsList[0].target).hasClass("expand"));
            if ($(mutationsList[0].target).hasClass("expand")) {
                var cid = $(mutationsList[0].target).closest("tr").find('input[name="ic_check"]').attr("data-cid");
                var $tr_boxbg = $(mutationsList[0].target).closest("tr").nextAll('tr[class^="boxbg"]');

                $tr_boxbg.each(function(i, tr_boxbg) {
                    $(tr_boxbg).children("td").attr("colspan", "15")
                    var $tr = $(tr_boxbg).find('table.list-table tr.boxbg');

                    //判断是否是第一次折叠，如果是第一次就走渲染修改DOM表格，否则不再次渲染
                    if ($tr.children("td").length == 15) {
                        return false
                    }

                    //复选框
                    $tr.find('td input[name="icchk"]').parent().html('<input type="checkbox" data-cid="' + cid + '" name="ic_check" >');



                    //公司名称
                    /*  var cname = $tr.find('td.j-company-td a.company').attr("cname") || "";
                     $tr.find('td.j-company-td').html('<span title="' + cname + '">' + cname + '</span>'); */

                    //型号
                    /*  var model = $tr.find('td.td-model a:first-child').attr("title") || "";
                     $tr.find('td.td-model').html('<span title="' + model + '">' + model + '</span>'); */

                    //进价与报价(自定义添加)
                    $tr.find('td.td-model').after('<td><input title="进价" type="number" class="info-width" name="price"></td><td><input title="报价" type="number" class="info-width" name="offer"></td>')

                    //数量
                    var stocknum = $tr.find('td:nth-child(8)>p.over').attr("title") || "";
                    $tr.find('td:nth-child(8)').html('<input  title="' + stocknum + '" type="number" class="info-width" name="stocknum" value="' + stocknum + '">');

                    //品牌
                    var brand = $tr.find('td.td-brand>.list-pro').attr("title") || "";
                    $tr.find('td.td-brand').html('<input  title="' + brand + '" type="text" class="info-width" name="brand" value="' + brand + '">');

                    //批号
                    var batchnumber = $tr.find("td:nth-child(10)").find(".list-pro").attr("title") || "";
                    $tr.find("td:nth-child(10)").html('<input  title="' + batchnumber + '" type="text" class="info-width" name="batchnumber" value="' + batchnumber + '">');

                    //封装
                    var package = $tr.find("td:nth-child(11)").find(".list-pro").attr("title") || "";
                    $tr.find("td:nth-child(11)").html('<input  title="' + package + '" type="text" class="info-width" name="package" value="' + package + '">');

                    //产品参数
                    var param = $tr.find('td.td-param>.list-pro').attr("title") || "";
                    $tr.find('td.td-param').html('<input  title="' + param + '" type="text" class="info-width" name="param" value="' + param + '">');

                    //仓库
                    var depot = $tr.find("td:nth-child(14)").find("p.over").text() || "";
                    $tr.find("td:nth-child(14)").html('<input  title="' + depot + '" type="text" class="info-width" name="depot" value="' + depot + '">');

                    //交易说明
                    var explain = $tr.find("td:nth-child(15)").find(".list-pro").attr("title") || "";
                    $tr.find("td:nth-child(15)").html('<input type="text" title="' + explain + '" class="info-width" name="explain" value="' + explain + '">');

                    //购买
                    $tr.find('td.pr-10').remove();

                })
            }
        }
        var mutationObserver = new MutationObserver(callback);
        $targetNodeList.each(function(i, targetNode) {
            mutationObserver.observe(targetNode, options);
        })
    }


    //保存问价
    $("#ICSaveEnquery").click(function() {
        var formData = [];

        if (hostname == "www.ic.net.cn") { //ic交易网
            $('input[name="ic_check"]:checked').each(function(i, chk) {
                var $li = $(chk).closest("li");
                var companname = $li.find(".result_supply .detailLayer .layer_companyName").text(); //公司名称
                var model = $li.find(".result_id").attr("title") || ""; //型号
                var price = $li.find('input[name="price"]').val(); //进价
                var offer = $li.find('input[name="offer"]').val(); //报价
                var factory = $li.find('input[name="factory"]').val(); //厂商
                var batchnumber = $li.find('input[name="batchnumber"]').val(); //批号
                var totalnumber = $li.find('input[name="totalnumber"]').val(); //数量
                var pakaging = $li.find('input[name="pakaging"]').val(); //封装
                var declare = $li.find('input[name="declare"]').val(); //交易说明
                var date = $li.find('input[name="date"]').val(); //日期


                $ele = $li.find(".result_supply .detailLayer .layer_mainContent");
                var mphone = $ele.find(".layer_otherContentphone").text(); //手机
                var fax = $ele.find(".layer_otherTitle_fax").next().text(); //传真
                var contacts = "";
                $ele.find(".layer_contacts").each(function(i, d) {
                    var cont = $(d).children(".layer_contactName").text();
                    var tel = $(d).children(".layer_telNumber").text();
                    var contactInfo = cont + ":" + tel + "; "
                    contacts += contactInfo;
                })
                contacts += "传真:" + fax + ";";
                var address = $ele.find(".company_address2").text(); //地址

                //组装联系人列表
                var contacterList = contacts.split(";");
                contacterList.pop();
                contacterList.pop();
                var Contacts = [];
                $.each(contacterList, function(i, v) {
                    var contacterInfo = v.split(":");
                    Contacts.push({ CntctName: contacterInfo[0].replace("+", ""), Tel1: contacterInfo[1] })
                })

                formData.push({
                    Tel1: mphone,
                    Address: address,
                    Supplier: companname,
                    Modle: model,
                    Cost: price,
                    Price: offer,
                    Brand: factory,
                    Year: batchnumber,
                    Qty: totalnumber,
                    Package: pakaging,
                    Curr: "RMB", //报价货币
                    Delivery: date, //交期
                    Quality: "",
                    Remark: declare,
                    Contacts: Contacts
                })
            })
        } else { //华强电子网
            $('input[name="ic_check"]:checked').each(function(i, chk) {
                var cid = $(chk).attr("data-cid");
                var company = {};
                var Contacts = [];
                var cc = companyDataNew[cid]; //获取当前供应商信息，companyDataNew为华强电子网的全局变量	

                company.name = cc.name; //供应商名称
                company.mphone = cc.mphone; //联系电话
                company.phone = cc.phone; //供应商联系电话
                company.address = cc.address; //地址

                //组装联系人列表
                var cts = cc.phone.split(",");
                $.each(cts, function(i, v) {
                    var m = v.split(" ");
                    Contacts.push({ CntctName: m[1] || cc.name, Tel1: m[0] || cc.mphone })
                })


                var $tr = $(chk).closest("tr");
                var model = $tr.find('.td-model .max-name').text(); //型号
                var price = $tr.find('input[name="price"]').val(); //进价
                var offer = $tr.find('input[name="offer"]').val(); //报价
                var stocknum = $tr.find('input[name="stocknum"]').val(); //数量
                var brand = $tr.find('input[name="brand"]').val(); //品牌
                var batchnumber = $tr.find('input[name="batchnumber"]').val(); //批号
                var package = $tr.find('input[name="package"]').val(); //封装
                var param = $tr.find('input[name="param"]').val(); //产品参数
                var depot = $tr.find('input[name="depot"]').val(); //仓库
                var explain = $tr.find('input[name="explain"]').val(); //交易说明

                formData.push({
                    Tel1: company.mphone,
                    Address: company.address,
                    Supplier: company.name,
                    Modle: model,
                    Cost: price,
                    Price: offer,
                    Brand: brand,
                    Year: batchnumber,
                    Qty: stocknum,
                    Package: package,
                    Curr: "RMB", //报价货币
                    Delivery: "", //交期
                    Quality: "",
                    Remark: param + ";" + depot + ";" + explain,
                    Contacts: Contacts
                })
            })
        }

        if (formData.length > 0) {
            console.table(formData)
        } else {
            alert("请选择询价条目!")
        }

        /* try {
            var formData = parseStrObjByRegExpKV(decodeURIComponent($(".form-data").serialize().replace(/\+/g, ''), true));
            var formDataStr = JSON.stringify(formData);
            var code = window.external.ExQuote(formDataStr);
            if (code == 0) {
                console.log("保存成功！");
            } else {
                console.log("保存失败！");
            }
        } catch (err) {
            alert("保存异常:" + String(err));
        } */
    })


}

ICInjectJS(); //正式发布时删除此行，此代码仅做调试