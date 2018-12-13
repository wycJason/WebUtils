$.Pgater=(function(){
	//var agent=navigator.userAgent.toLowerCase();
	//var iswx=agent.indexOf('qqbrowser') >= 0;
	//if(iswx){
	//	var File=$("<input type='file' id='csl_gater_file' accept='image/*' capture='camera' >");//单选
	//	//var File=$("<input type='file' id='csl_gater_file' accept='image/*' capture='camera' multiple='multiple'>");//多选
	//}else{
	//	var File=$("<input type='file' id='csl_gater_file' accept='image/*' >");//单选
	//	//var File=$("<input type='file' id='csl_gater_file' accept='image/*' multiple='multiple'>");//多选
	//};
	//File.css('display','none');
	return function(target,file,callBack){
		//console.log(File);
		this.ele = file;
		this.parent=target;
		//this.parent.append(this.ele);
		this.bindClk(this.parent,this.ele[0]);//选择器不能删除
		this.bindFuc(this.ele,callBack);
	};
})();
$.Pgater.prototype.bindFuc = function (ele, callBack) {
	ele.on("change",function(){
		// console.log(ele[0].files, ele.attr("id"));
		var fileID = ele.attr("id");
		var all=ele[0].files;//获取所有文件
		var reader = new FileReader();
		var album=[];
		//console.log(all.length);//有多少个文件
		var length=all.length;
		var i=0;
		var recur=function(){
			//console.log(all[i]);
			reader.readAsDataURL(all[i]);
			var One=all[i];
			reader.onload=function(e){
				//alert(One);
				//console.log(One);
				One.data = this.result;
				One.fileID = fileID;
				album.push(One);
				i++;
				if(i<length){
					recur();
				}else{
					ele.value = '';
					//alert(i);
					//callBack(album,img);//多选
					callBack(album);//单选
				};
			};
		};
		recur();
	});
};
$.Pgater.prototype.bindClk=function(ele,tar){
	ele.on('click',function(){
		tar.click();
	});
};
