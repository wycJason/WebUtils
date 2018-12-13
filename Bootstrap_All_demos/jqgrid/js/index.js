$(function(){
	//页面加载完成之后执行
	//pageInit();//ajax获取数据
	//myPageInit();//本地数据
	pageInitCustom();//自定义数据解析
});

//formatter:对列进行格式化时设置的函数名
function editFormaterLiner(cellValue, options, rowObject) {
	console.log(options);
	if (cellValue) {
		return "<a href='javascript:void(0);' data-val='" + JSON.stringify(rowObject) + "' onclick=\"jqGridEditRow(this,'" + options.rowId + "');\">" + cellValue + "</a>";
	} else {
		return "空字符串";
	}
}
function jqGridEditRow(e, obj) {//e==>this，当前<a>标签对象；obj==>options.rowId
	var rowData = JSON.parse($(e).attr("data-val"));
	alert(rowData+"\n"+obj);
}

function action(cellValue, options, rowObject) {
		return "<a href='javascript:void(0)'>编辑</a>";
}
/*________________________________________________ajax获取数据___________________________________________________________________**/
function pageInit(){
	//创建jqGrid组件
	$("#dataTable").jqGrid({
				url : 'data/JSONData.json',//组件创建完成之后请求数据的url
				mtype : "get",//向后台请求数据的ajax的类型。可选post,get
				datatype : "json",//请求数据返回的类型。可选json,xml,txt
				loadComplete: function (data) { console.log("Grid Load Data Complete",data);},//当从服务器返回响应时执行，xhr：XMLHttpRequest 对象
				colNames : [ '序号', '日期', '客户', '金额', '税金','合计', '备注' ],//jqGrid的列显示名字
				colModel : [ //jqGrid每一列的配置信息。包括名字，索引，宽度,对齐方式.....
				             {name : '序号',index : 'id',width : 55,sorttype:'integer'},//sorttype用在当datatype为local时，定义搜索列的类型，可选值：int/integer - 对integer排序float/number/currency - 排序数字；date - 排序日期；text - 排序文本
				             {name : '日期',index : 'date',width : 90},
				             {name : '客户',index : 'client',width : 100,formatter:editFormaterLiner},//formatter:对列进行格式化时设置的函数名  一定要有返回值
				             {name : '金额',index : 'amount',width : 80},
				             {name : '税金',index : 'tax',width : 80},
				             {name : '合计',index : 'total',width : 80},
				             {name : '备注',index : 'note',width : 150}
				           ],
				jsonReader : {//Json数据:需要定义jsonReader来跟服务器端返回的数据做对应，其默认值：
					root: "rows",//包含实际数据的数组
					page: "page",//当前页
					total: "total",//总页数
					records: "records",//查询出的记录数
					repeatitems: true,//repeatitems :指明每行的数据是可以重复的，如果设为false，则会从返回的数据中按名字来搜索元素，这个名字就是colModel中的名字
					cell: "cell",//当前行的所有单元格
					id: "id",//当前行id
					userdata: "userdata",//用户数据（user data） 在某些情况下，我们需要从服务器端返回一些参数但并不想直接把他们显示到表格中，而是想在别的地方显示，那么我们就需要用到userdata标签
					subgrid: {
						root:"rows",
						repeatitems: true,
						cell:"cell"
					},
				},
				height:"auto",//表格高度，可以是数字，像素值或者百分比
				//width:800,  "auto"//如果设置则按此设置为主，如果没有设置则按colModel中定义的宽度计算
				rowNum : 13,//一页显示多少条  在grid上显示记录条数，这个参数是要被传递到后台
				hidegrid:false,//启用或者禁用控制表格显示、隐藏的按钮，只有当caption 属性不为空时起效
				rowList : [ 5, 10, 20],//可供用户选择一页显示多少条
				pager : '#pager',//表格页脚的占位符(一般是div)的id
				sortname : '序号',//初始化的时候排序的字段  默认的排序列。可以是列名称或者是一个数字，这个参数会被提交到后台
				sortorder : "asc",//排序方式,可选desc降序,asc升序
				viewrecords : true,//定义是否要显示总记录数
				caption : "我的第一个jqGrid表格",//表格的标题名字
				viewsortcols:[false,'vertical',true],//定义排序列的外观跟行为。数据格式：[false,'vertical',true].第一个参数是说，是否都要显示排序列的图标，false就是只显示 当前排序列的图标；第二个参数是指图标如何显示，vertical：排序图标垂直放置，horizontal：排序图标水平放置；第三个参数指单击功能，true：单击列可排序，false：单击图标排序。说明：如果第三个参数为false则第一个参数必须为true否则不能排序
				onSortCol: function (index, iCol, sortorder)//onSortCol	index,iCol,sortorder	当点击排序列但是数据还未进行变化时触发此事件。index：列索引index；iCol：当前单元格位置索引，从0开始；sortorder：排序状态：desc或者asc
				{
					//列排序事件
					//console.log('index=>'+index +", iCol=>"+iCol +",  sortorder=>"+sortorder);
					/*
					 index=>id, iCol=>0,  sortorder=>desc
					 index=>date, iCol=>1,  sortorder=>asc
					 index=>client, iCol=>2,  sortorder=>asc
					 index=>amount, iCol=>3,  sortorder=>asc
					 index=>tax, iCol=>4,  sortorder=>asc
					 index=>total, iCol=>5,  sortorder=>asc
					*/

				},
			});
	/*创建jqGrid的操作按钮容器*/
	/*可以控制界面上增删改查的按钮是否显示*/
	$("#dataTable").jqGrid('navGrid', '#pager', {edit : true,add :true,del : true});
	//$("#dataTable").jqGrid('getGridParam', 'userData')//返回请求的参数信息
}
/*________________________________________________本地数据获取___________________________________________________________________**/
function myPageInit(){
	//这个例子告诉我们如何加载数组数据。在这里我们需要用到addRowData方法。
	var myData=[
		{"序号":"1","日期":"2007-10-06","客户":"Client 13","金额":"1000.00","税金":"0.00","合计":"1000.00","备注":""},
		{"序号":"2","日期":"2007-10-06","客户":"Client 13","金额":"1000.00","税金":"0.00","合计":"1000.00","备注":""},
		{"序号":"3","日期":"2007-10-06","客户":"Client 13","金额":"1000.00","税金":"0.00","合计":"1000.00","备注":""},
		{"序号":"4","日期":"2007-10-06","客户":"Client 13","金额":"1000.00","税金":"0.00","合计":"1000.00","备注":""},
		{"序号":"5","日期":"2007-10-06","客户":"Client 13","金额":"1000.00","税金":"0.00","合计":"1000.00","备注":""},
		{"序号":"6","日期":"2007-10-06","客户":"Client 13","金额":"1000.00","税金":"0.00","合计":"1000.00","备注":""},
		{"序号":"7","日期":"2007-10-06","客户":"Client 13","金额":"1000.00","税金":"0.00","合计":"1000.00","备注":""},
		{"序号":"8","日期":"2007-10-06","客户":"Client 13","金额":"1000.00","税金":"0.00","合计":"1000.00","备注":""},
		{"序号":"9","日期":"2007-10-06","客户":"Client 13","金额":"1000.00","税金":"0.00","合计":"1000.00","备注":""},
		{"序号":"10","日期":"2007-10-06","客户":"Client 13","金额":"1000.00","税金":"0.00","合计":"1000.00","备注":""},
		{"序号":"11","日期":"2007-10-06","客户":"Client 13","金额":"1000.00","税金":"0.00","合计":"1000.00","备注":""},
		{"序号":"12","日期":"2007-10-06","客户":"Client 13","金额":"1000.00","税金":"0.00","合计":"1000.00","备注":""},
		{"序号":"13","日期":"2007-10-06","客户":"Client 13","金额":"1000.00","税金":"0.00","合计":"1000.00","备注":""},
		{"序号":"14","日期":"2007-10-06","客户":"Client 13","金额":"1000.00","税金":"0.00","合计":"1000.00","备注":""},
		{"序号":"15","日期":"2007-10-06","客户":"Client 13","金额":"1000.00","税金":"0.00","合计":"1000.00","备注":""},
		{"序号":"16","日期":"2007-10-06","客户":"Client 13","金额":"1000.00","税金":"0.00","合计":"1000.00","备注":""},
		{"序号":"17","日期":"2007-10-06","客户":"Client 13","金额":"1000.00","税金":"0.00","合计":"1000.00","备注":""},
		{"序号":"18","日期":"2007-10-06","客户":"Client 13","金额":"1000.00","税金":"0.00","合计":"1000.00","备注":""},
		{"序号":"19","日期":"2007-10-06","客户":"Client 13","金额":"1000.00","税金":"0.00","合计":"1000.00","备注":""},
		{"序号":"13","日期":"2007-10-06","客户":"Client 13","金额":"1000.00","税金":"0.00","合计":"1000.00","备注":""},
		{"序号":"13","日期":"2007-10-06","客户":"Client 13","金额":"1000.00","税金":"0.00","合计":"1000.00","备注":""},
		{"序号":"13","日期":"2007-10-06","客户":"Client 13","金额":"1000.00","税金":"0.00","合计":"1000.00","备注":""},
		{"序号":"13","日期":"2007-10-06","客户":"Client 13","金额":"1000.00","税金":"0.00","合计":"1000.00","备注":""},
		{"序号":"13","日期":"2007-10-06","客户":"Client 13","金额":"1000.00","税金":"0.00","合计":"1000.00","备注":""},
		{"序号":"13","日期":"2007-10-06","客户":"Client 13","金额":"1000.00","税金":"0.00","合计":"1000.00","备注":""},
		{"序号":"13","日期":"2007-10-06","客户":"Client 13","金额":"1000.00","税金":"0.00","合计":"1000.00","备注":""},
		{"序号":"13","日期":"2007-10-06","客户":"Client 13","金额":"1000.00","税金":"0.00","合计":"1000.00","备注":""},
		{"序号":"13","日期":"2007-10-06","客户":"Client 13","金额":"1000.00","税金":"0.00","合计":"1000.00","备注":""},
		{"序号":"13","日期":"2007-10-06","客户":"Client 13","金额":"1000.00","税金":"0.00","合计":"1000.00","备注":""},
	];
	//创建jqGrid组件
	$("#dataTable").jqGrid({
		data:myData,
		datatype : "local",//请求数据返回的类型。可选本地；
		colNames : [ '序号', '日期', '客户', '金额', '税金','合计', '备注','操作' ],//jqGrid的列显示名字
		colModel : [ //jqGrid每一列的配置信息。包括名字，索引，宽度,对齐方式.....
			{name : '序号',index : 'id',width : 55,sorttype:'integer'},//sorttype用在当datatype为local时，定义搜索列的类型，可选值：int/integer - 对integer排序   float/number/currency - 排序数字；date - 排序日期；text - 排序文本
			{name : '日期',index : 'date',width : 90,sortable:false},
			{name : '客户',index : 'client',width : 100,sortable:false},
			{name : '金额',index : 'amount',width : 80,sortable:false},
			{name : '税金',index : 'tax',width : 80,sortable:false},
			{name : '合计',index : 'total',width : 80,sortable:false},
			{name : '备注',index : 'note',width : 150,sortable:false},
			{name : '操作',index : 'action',width : 150,sortable:false,formatter:action}
		],
		//userData:"userdata",
		height:"auto",//表格高度，可以是数字，像素值或者百分比
		//width:800,//如果设置则按此设置为主，如果没有设置则按colModel中定义的宽度计算

		rowNum : 2,//一页显示多少条
		rowList : [ 10, 20, 30],//可供用户选择一页显示多少条
		pager : '#pager',//表格页脚的占位符(一般是div)的id
		sortname : '序号',//初始化的时候排序的字段
		sortorder : "asc",//排序方式,可选desc降序,asc升序
		viewrecords : true,//定义是否要显示总记录数
		caption : "我的第一个jqGrid表格",//表格的标题名字
	});
	/*创建jqGrid的操作按钮容器,可以控制界面上增删改查的按钮是否显示*/
	$("#dataTable").jqGrid('navGrid', '#pager', {edit : true,add :true,del : true});
	//$("#dataTable").jqGrid('getGridParam', 'userData')//返回请求的参数信息

	//或者data:myData,
	/*for ( var i = 0; i <= myData.length; i++){
		$("#dataTable").jqGrid('addRowData', i + 1, myData[i]);
	}*/

	/*
	 这样就能生成一个jqgrid表格。 有时候我们需要动态的重新加载数据，其实这很简单，在此基础上只需要增加以下代码即可：
	 $("#jqGrid_ds").jqGrid('clearGridData');  //清空表格
	 $("#jqGrid_ds").jqGrid('setGridParam',{  // 重新加载数据
		 datatype:'local',
		 data : newdata,   //  newdata 是符合格式要求的需要重新加载的数据
		 page:1
	 }).trigger("reloadGrid");
	 */
}
/*________________________________________________自定义数据解析_________________________________________________________________**/
function pageInitCustom(){
	//创建jqGrid组件
	$("#dataTable").jqGrid({
		url : 'data/jsonCustomDataObj.json',//组件创建完成之后请求数据的url             或者'data/jsonCustomData.json',
		mtype : "get",//向后台请求数据的ajax的类型。可选post,get
		datatype : "json",//请求数据返回的类型。可选json,xml,txt
		loadComplete: function (data) { console.log("Grid Load Data Complete",data);},//当从服务器返回响应时执行，xhr：XMLHttpRequest 对象
		colNames : [ '序号', '日期', '客户', '金额', '税金','合计', '备注' ],//jqGrid的列显示名字
		colModel : [ //jqGrid每一列的配置信息。包括名字，索引，宽度,对齐方式.....
			{name : 'id',index : 'id',width : 55,sorttype:'integer'},//sorttype用在当datatype为local时，定义搜索列的类型，可选值：int/integer - 对integer排序float/number/currency - 排序数字；date - 排序日期；text - 排序文本
			{name : 'date',index : 'date',width : 90,sortable:false},
			{name : 'client',index : 'client',width : 100,sortable:false},//formatter:对列进行格式化时设置的函数名或者类型
			{name : 'amount',index : 'amount',width : 80,sortable:false},
			{name : 'tax',index : 'tax',width : 80,sortable:false},
			{name : 'total',index : 'total',width : 80,sortable:false},
			{name : 'note',index : 'note',width : 150,sortable:false}
		],
		//userData:"userdata",
		jsonReader : {//Json数据:需要定义jsonReader来跟服务器端返回的数据做对应，其自定义如下值：
			root: "result",//包含实际数据的数组
			page: "currpage",//当前页
			total: "totalpages",//总页数
			records: "totalrecords",//查询出的记录数
			cell: "cell",//当前行的所有单元格
			id: "id",//行id
		},
		height:"auto",//表格高度，可以是数字，像素值或者百分比
		//width:800,  "auto"//如果设置则按此设置为主，如果没有设置则按colModel中定义的宽度计算
		rowNum : 13,//一页显示多少条  在grid上显示记录条数，这个参数是要被传递到后台
		hidegrid:false,//启用或者禁用控制表格显示、隐藏的按钮，只有当caption 属性不为空时起效
		rowList : [ 5, 10, 20],//可供用户选择一页显示多少条
		pager : '#pager',//表格页脚的占位符(一般是div)的id
		sortname : '序号',//初始化的时候排序的字段  默认的排序列。可以是列名称或者是一个数字，这个参数会被提交到后台
		sortorder : "asc",//排序方式,可选desc降序,asc升序
		viewrecords : true,//定义是否要显示总记录数
		caption : "我的第一个jqGrid表格",//表格的标题名字
		viewsortcols:[false,'vertical',true],//定义排序列的外观跟行为。数据格式：[false,'vertical',true].第一个参数是说，是否都要显示排序列的图标，false就是只显示 当前排序列的图标；第二个参数是指图标如何显示，vertical：排序图标垂直放置，horizontal：排序图标水平放置；第三个参数指单击功 能，true：单击列可排序，false：单击图标排序。说明：如果第三个参数为false则第一个参数必须为ture否则不能排序
		onSortCol: function (index, iCol, sortorder)//onSortCol	index,iCol,sortorder	当点击排序列但是数据还未进行变化时触发此事件。index：列索引index；iCol：当前单元格位置索引，从0开始；sortorder：排序状态：desc或者asc
		{
			//列排序事件
			console.log('index=>'+index +", iCol=>"+iCol +",  sortorder=>"+sortorder);
			/*
			 index=>id, iCol=>0,  sortorder=>desc
			 index=>date, iCol=>1,  sortorder=>asc
			 index=>client, iCol=>2,  sortorder=>asc
			 index=>amount, iCol=>3,  sortorder=>asc
			 index=>tax, iCol=>4,  sortorder=>asc
			 index=>total, iCol=>5,  sortorder=>asc
			 */

		},
	});
	/*创建jqGrid的操作按钮容器*/
	/*可以控制界面上增删改查的按钮是否显示*/
	$("#dataTable").jqGrid('navGrid', '#pager', {edit : true,add :true,del : true});
	//$("#dataTable").jqGrid('getGridParam', 'userData')//返回请求的参数信息
}
