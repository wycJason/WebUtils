$.Pgater=(function(){
	var agent=navigator.userAgent.toLowerCase();
	var iswx=agent.indexOf('qqbrowser') >= 0;
	if(iswx){
		var File=$("<input type='file' id='csl_gater_file' accept='image/*' capture='camera' multiple='multiple'>");
	}else{
		var File=$("<input type='file' id='csl_gater_file' accept='image/*' multiple='multiple'>");
	};
	File.css('display','none');
	return function(target,callBack){
		console.log(File);
		this.ele=File;
		this.parent=target;
		this.parent.append(this.ele);
		this.bindClk(this.parent,this.ele[0]);//(按钮,文件选择器)
		this.bindFuc(this.ele,callBack);//文件选择器,回调函数返回前端callBack
	};
})();
$.Pgater.prototype.bindFuc=function(ele,callBack){//文件选择器,回调函数callBack(album)
	ele.on("change",function(){
		console.log(ele[0].files);
		var all=ele[0].files;//所有文件：为数组
		var reader = new FileReader();
		var album=[];//相册
		console.log(all.length);
		var length=all.length;//总文件数
		var i=0;
		var recur=function(){
			console.log(all[i]);//每一个文件
			reader.readAsDataURL(all[i]);
			var One=all[i];//每一个文件
			reader.onload=function(e){
				//alert(One);
				console.log(One);
				One.data=this.result;
				album.push(One);//每一个文件放入相册中
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
