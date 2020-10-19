function ICInjectJS() {
    if (!!document.getElementById("ICSaveEnquery")) {
        return false;
    }

    //style自定义样式
    var myStyleFile = `
    .info-width{
        width:90%;
    }
    `;
    var style = document.createElement('style');
    style.innerHTML = myStyleFile;
    document.getElementsByTagName('HEAD').item(0).appendChild(style);

    //表单数据格式化
    function parseStrObjByRegExpKV(strDes) { //字符串转化为对象（正则表达式方式）parseStrObjByRegExpKV("name=jack&age=20&love=lily");
        var obj = {};
        strDes.replace(/(\w+)(?:=([^&]*))?/g, function(str, key, value) {
            obj[key] = value;
        });
        return obj;
    }


    //自定义DOM :判断网站类型：是【IC交易网】还是【华强电子网】
    var hostname = window.location.hostname;
    if (hostname == "www.ic.net.cn") { //ic交易网

    } else { //华强电子网    
        $("#top_banner").css({
            "text-align": "right"
        }).html('<button id="ICSaveEnquery" style="padding: 5px;" type="button">批量保存询价</button>');

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
                var $tr_boxbg = $(mutationsList[0].target).closest("tr").nextAll('tr[class^="boxbg"]');

                $tr_boxbg.each(function(i, tr_boxbg) {
                    $(tr_boxbg).children("td").attr("colspan", "15")
                    var $tr = $(tr_boxbg).find('table.list-table tr.boxbg');

                    //判断是否是第一次折叠，如果是第一次就走渲染修改DOM表格，否则不再次渲染
                    if ($tr.children("td").length == 15) {
                        return false
                    }

                    //复选框
                    $tr.find('td input[name="icchk"]').parent().html('<input type="checkbox" name="ic_check" >');



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
        $('input[name="ic_check"]:checked').each(function(i, chk) {
            var cid = $(chk).attr("data-cid"); //companyDataNew[cid]
            var $tr = $(chk).closest("tr");
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
                price,
                offer,
                stocknum,
                brand,
                batchnumber,
                package,
                param,
                depot,
                explain,
            })
        })

        console.table(formData)
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