$.Pgater=(function(){
	//var agent=navigator.userAgent.toLowerCase();
	//var iswx=agent.indexOf('qqbrowser') >= 0;
	//if(iswx){
	//	var File=$("<input type='file' id='csl_gater_file' accept='image/*' capture='camera' >");//��ѡ
	//	//var File=$("<input type='file' id='csl_gater_file' accept='image/*' capture='camera' multiple='multiple'>");//��ѡ
	//}else{
	//	var File=$("<input type='file' id='csl_gater_file' accept='image/*' >");//��ѡ
	//	//var File=$("<input type='file' id='csl_gater_file' accept='image/*' multiple='multiple'>");//��ѡ
	//};
	//File.css('display','none');
	return function(target,file,callBack){
		//console.log(File);
		this.ele = file;
		this.parent=target;
		//this.parent.append(this.ele);
		this.bindClk(this.parent,this.ele[0]);//ѡ��������ɾ��
		this.bindFuc(this.ele,callBack);
	};
})();
$.Pgater.prototype.bindFuc = function (ele, callBack) {
	ele.on("change",function(){
		// console.log(ele[0].files, ele.attr("id"));
		var fileID = ele.attr("id");
		var all=ele[0].files;//��ȡ�����ļ�
		var reader = new FileReader();
		var album=[];
		//console.log(all.length);//�ж��ٸ��ļ�
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
					//callBack(album,img);//��ѡ
					callBack(album);//��ѡ
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
