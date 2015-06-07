/**
 * getByClass                      通过类名查找元素对象
 * @param {Object} parent          父节点
 * @param {Object} class_name       类名
 * @return {Array} results         返回对象数组
 */
function getByClass (parent, class_name) {
	if (parent.getElementsByClass_name) {                                  
		return parent.getElementsByClassName(class_name);
	} else {                                                          
		var results = new Array();                              //将查找的className分割存入数组classname_array
		var elems = parent.getElementsByTagName('*');					
		for (var i = 0; i < elems.length; i++) { 
			var patten1 = new RegExp('^'+class_name);            //三种情况，类名在最前面，中间，最后面
			var patten2 = new RegExp('\\s'+class_name + '\\s');
			var patten3 = new RegExp('\\s'+class_name + '$');
			if(patten1.test(elems[i].className) || patten2.test(elems[i].className) || patten3.test(elems[i].className)){
				results.push(elems[i]);
			};
		}
		return results;
	}
}
/**
 * addClassName                    添加类名
 * @param {Object} node            节点
 * @param {Object} class_name      类名
 */
function addClassName(node, class_name) {
	node.className = node.className + ' ' + class_name;
}

/**
 * removeClassName                 删除类名
 * @param {Object} node            节点
 * @param {Object} class_name      类名
 */
function removeClassName(node, class_name) {
	var aClass = node.className.split(' ');
	for (var i = 0; i < aClass.length; i++) {
		if(aClass[i] === class_name){
			aClass[i] = '';
		}
	};
	node.className = aClass.join(' ');                      
}
/**
* trim                    消除两边的空白
* @param {String}  string 原字符串
* @return {String}        处理后字符串
*/
function trim(string){                          
	var patten = /\s*(\S*)\s*/;     //正则表达式\s匹配空白字符，\S匹配非空白字符
	string.match(patten);           //()为分组匹配，$1表示第1组匹配到的
	return RegExp['$1'];
}

/*输入年月日转化成时间戳*/
function dateStamp(y,m,d){ 
	var date = new Date(); 
	date.setFullYear(y); 
	date.setMonth(m - 1); 
	date.setDate(d); 
	return Date.parse(date); 
} 

/*时间戳转化成****年**月**日的格式*/
function stampDate(stamp){ 
	var t=new Date(parseInt(stamp)); 
	var year = t.getFullYear();
	var month = (t.getMonth() + 1);
	var day = t.getDate();
	return year + '年' + month + '月' + day + '日';;  
} 

//主程序
window.onload = function(){
	/*处理选择时间开始*/
	var oTaskTime = document.getElementById('taskTime');
	var oTimestamp = document.getElementById('timestamp');
	var now = new Date();
	var year = now.getFullYear();
	var month = (now.getMonth() + 1);
	var day = now.getDate();

	oTimestamp.value = dateStamp(year,month,day);
	oTaskTime.value = year + '年' + month + '月' + day + '日';

	var oYear = document.getElementById('year');
	var oMonth = document.getElementById('month');
	var oDay = document.getElementById('day');

	function appendOption(obj,val){
		var oOption = document.createElement('option');
		oOption.value = val;
		oOption.innerHTML = val;
		obj.appendChild(oOption);
	}
	for(var i=0; i < 6; i++){
		appendOption(oYear,year + i);
	}
	for(var i=0; i < 13; i++){
		if(month <= i) appendOption(oMonth,i);
	}
	for(var i = 0; i < 32; i++) {
		if(day <= i) appendOption(oDay,i);
	}

	var oComfirm = document.getElementById('comfirmTime');
	var oDatebox = getByClass(document,'datebox')[0];
	oComfirm.onclick = function(){
		var index = oYear.selectedIndex ; 
		var y = oYear.options[index].value;
		index = oMonth.selectedIndex ;
		var m = oMonth.options[index].value
		index = oDay.selectedIndex ;
		var d = oDay.options[index].value
		
		oTaskTime.value = y + '年'+ m + '月'+ d + '日';
		oDatebox.style.display = 'none';
		oTimestamp.value = dateStamp(y,m,d);
	}

	document.onclick = function(){
		oDatebox.style.display = 'none';
	}
	oTaskTime.onclick = function(e){
		var ev = window.event || e;
		oDatebox.style.display = 'block';
		ev.stopPropagation();
	}
	oDatebox.onclick = function(){
		var ev = window.event || e;
		ev.stopPropagation();
	}

	/*处理选择时间结束*/
	var oNav = document.getElementsByTagName('nav')[0];
	var oRight = getByClass(oNav,'right')[0];
	var oLeft = getByClass(oNav,'left')[0];
	var oDone = document.getElementById('done');
	var oUndone = document.getElementById('undone');
	var allChecked = document.getElementById("allChecked"),
   		allNoChecked = document.getElementById("allNoChecked");
   	var oDeleteBtn = document.getElementById('allDelete');
   	var oCompleteBtn = document.getElementById('allComplete');

	oRight.onclick = function(){
		addClassName(this,'active');
		removeClassName(oLeft,'active');
		oDone.style.display = 'block';
		oUndone.style.display = 'none';
		allChecked.setAttribute('data-pos','done');
   		allNoChecked.setAttribute('data-pos','done');
   		allChecked.checked = false;
   		allNoChecked.checked = false;
   		var allcheckbox = oDone.getElementsByTagName('input');
		for(var i = 0; i < allcheckbox.length; i++){
			allcheckbox[i].checked = false;
		}
		allComplete.style.display = 'none';
	}

	oLeft.onclick = function(){
		addClassName(this,'active');
		removeClassName(oRight,'active');
		oDone.style.display = 'none';
		oUndone.style.display = 'block';
		allChecked.setAttribute('data-pos','undone');
   		allNoChecked.setAttribute('data-pos','undone');
   		allChecked.checked = false;
   		allNoChecked.checked = false;
   		var allcheckbox = oUndone.getElementsByTagName('input');
		for(var i = 0; i < allcheckbox.length; i++){
			allcheckbox[i].checked = false;
		}

		allComplete.style.display = 'block';
	}


	function insert(list,obj){
		if(obj.id){
			var dataId = obj.id;	
		}else{
			var dataId = todos.lastId + 1;
		}
		var li=document.createElement("li");
		li.setAttribute("data-id",dataId);

	    li.innerHTML="<label class='content'>" + 
                    	 "<input type='checkbox' data-id='" + dataId + "'/>" + obj.content +
           			 "</label>" +
         			 "<div class='time'>" + stampDate(obj.time) +"</div>" + 
          			 "<div class='btns'>" + 
                     	"<a href='javascript:void(0);' class='completeBtn' title='完成'></a>" +
                        "<a href='javascript:void(0);' class='deleteBtn' title='删除'></a>" +
                    "</div>";
        list.appendChild(li);	
	}

	var undoneList=document.getElementById("undone");
	var arr= todos.lists();
	for(var i=0,len=arr.length;i<len;i++){
		insert(undoneList,arr[i]);
	}

	var doneList=document.getElementById("done");
	var arr2= todos.doneLists();
	for(var i=0,len=arr2.length;i<len;i++){
		insert(doneList,arr2[i]);
	}

	function createTask(obj){
		todos.add(obj);
		undoneList.innerHTML = '';
		var arr= todos.lists();
		for(var i=0,len=arr.length;i<len;i++){
			insert(undoneList,arr[i]);
		}
	}

	var oTaskContent = document.getElementById('taskContent');
	var oInsert = document.getElementById('insert');
	function addTask(){
		if(!trim(oTaskContent.value)){
			alert('请填写内容');
			oTaskContent.value = '';
			oTaskContent.focus();
			return false;
		};
		var obj = {};
		obj.content = oTaskContent.value;
		obj.time = oTimestamp.value;
		createTask(obj);
		oTaskContent.value = '';
		oTaskTime.value = year + '年' + month + '月' + day + '日';
	}

	oTaskContent.onkeyup = function(e){
		var ev = window.event || e;
		if(ev.keyCode === 13){
			addTask();
		}
	};
	oInsert.onclick = addTask;

	
	undoneList.onclick = function(e){
		var ev = window.event || e;
		//删除
		if(ev.target.className === 'deleteBtn'){
			ev.target.parentNode.parentNode.remove();
			todos.del(ev.target.parentNode.parentNode.getAttribute('data-id'));
		}else if(ev.target.className === 'completeBtn'){//完成
			ev.target.parentNode.parentNode.remove();
			todos.done(ev.target.parentNode.parentNode.getAttribute('data-id'));
			doneList.innerHTML = '';
			var arr2= todos.doneLists();
			for(var i=0,len=arr2.length;i<len;i++){
				insert(doneList,arr2[i]);
			}
		}else if(ev.target.type = 'checkbox'){
			allNoChecked.checked = false;
			allChecked.checked = false;
		}
	}
	
	doneList.onclick = function(e){
		var ev = window.event || e;
		//删除
		if(ev.target.className === 'deleteBtn'){
			ev.target.parentNode.parentNode.remove();
			todos.delDone(ev.target.parentNode.parentNode.getAttribute('data-id'));
		}else if(ev.target.type = 'checkbox'){
			allNoChecked.checked = false;
			allChecked.checked = false;
		}
	}
	//全选
	
 
   	allChecked.onclick = function(){
   		if(this.getAttribute('data-pos') == 'undone'){
   			var oList = oUndone;
   		}else{
   			var oList = oDone;
   		}
   		oInputs = oList.getElementsByTagName("input");
   		if(this.checked){
   			for(var i = 0; i < oInputs.length; i++){
				oInputs[i].checked = true;
				allNoChecked.checked = false;
			}
   		}else{
   			for(var i = 0; i < oInputs.length; i++){
				oInputs[i].checked = false;
			}
   		};
   	}

   	//全不选
   	allNoChecked.onclick = function(){
   		if(this.getAttribute('data-pos') == 'undone'){
   			var oList = oUndone;
   		}else{
   			var oList = oDone;
   		}
   		oInputs = oList.getElementsByTagName("input");
   		if(this.checked){
   			for(var i = 0; i < oInputs.length; i++){
				oInputs[i].checked = false;
				allChecked.checked = false;
			}
   		}
   	}

   	
   	oDeleteBtn.onclick = function(){
   		if(allNoChecked.getAttribute('data-pos') == 'undone'){
   			var checkeds=oUndone.querySelectorAll("input:checked");
   			for(var i = 0; i < checkeds.length; i++) {
   				checkeds[i].parentNode.parentNode.remove();
				todos.del(checkeds[i].parentNode.parentNode.getAttribute('data-id'));
   			}
   		}else{
   			var checkeds=oDone.querySelectorAll("input:checked");
   			for(var i = 0; i < checkeds.length; i++) {
   				checkeds[i].parentNode.parentNode.remove();
				todos.delDone(checkeds[i].parentNode.parentNode.getAttribute('data-id'));
   			}
   		}
   	}
   	oCompleteBtn.onclick = function(){
   		if(allNoChecked.getAttribute('data-pos') == 'undone'){
   			var checkeds=oUndone.querySelectorAll("input:checked");
   			for(var i = 0; i < checkeds.length; i++) {
   				checkeds[i].parentNode.parentNode.remove();
				todos.done(checkeds[i].parentNode.parentNode.getAttribute('data-id'));
   			}
   			doneList.innerHTML = '';
			var arr2= todos.doneLists();
			for(var i=0,len=arr2.length;i<len;i++){
				insert(doneList,arr2[i]);
			}
   		}
   	}
	
}