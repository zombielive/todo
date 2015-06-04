
var EventUtil={  //添加事件
	addHandler:function(element,type,handler){
		if(element.addEventListener){
			element.addEventListener(type,handler,false);
		}else if(element.attachEvent){
			element,attachEvent("on"+type,handler);
		}else{
			element["on"+type]=handler;
		}
	},
	getEvent:function(event){
		return event?event : window.event;
	}
};

var list=document.getElementById("detail");

//添加任务
var insertBtn=document.getElementById("insert"),
    addInput=document.getElementById("addInputer");
function insertTask(){  
    if(addInput.value){  //应该要去除前面的空格,有待改进
	   var li=document.createElement("li");
       li.innerHTML="<div class='checkIt'><label><input type='checkbox' />"+addInput.value+"</label></div>"
	                 +"<div class='iconBar'><a class='completeIcon'></a><a class='deleteIcon'></a><a class='editIcon'></a></div>"
	   list.appendChild(li);
	}else{
		return false;
	}
	addInput.value="";
}
EventUtil.addHandler(insertBtn,"click",insertTask);

//全选或全不选
var allChecked=document.getElementById("allChecked"),
    allNoChecked=document.getElementById("allNoChecked"),
	lotBar=document.getElementById("lotBar");
function toggleCheck(){
	var event=EventUtil.getEvent(event),
	    inputs=list.getElementsByTagName("input"),
		len=inputs.length;
	if(event.target.id=="allChecked"){ //全选
		for(var i=0;i<len;i++){
			inputs[i].checked="checked";
			allNoChecked.checked="";
		}
	}
	if(event.target.id=="allNoChecked"){  //全不选
		for(var i=0;i<len;i++){
			inputs[i].checked="";
			allChecked.checked="";
		}
	}
}
EventUtil.addHandler(lotBar,"click",toggleCheck);

//交互的小细节
/*
function xiao(){
   var  checked=list.querySelectorAll("input:checked"),
        input=list.querySelectorAll("input");
   if(input.length==checked.length&&input.length){
	  allChecked.checked="checked";
   }
}
for
*/

//批量完成和删除
var lotBtn=document.getElementById("lotBtn"),
    lotCompleteBtn=document.getElementById("allComplete"),
    lotDeleteBtn=document.getElementById("allDelete"),
	completeTask=document.getElementById("complete");
function deleteLotTask(){
	var event=EventUtil.getEvent(event),
	    checked=list.querySelectorAll("input:checked"),
	    len=checked.length;
	if(event.target.id=="allComplete"){  //批量完成
		for(var i=0;i<len;i++){
			completeTask.appendChild(checked[i].parentNode.parentNode.parentNode);
		}
	}
	if(event.target.id=="allDelete"){  //批量删除
	    for(var i=0;i<len;i++){
		    list.removeChild(checked[i].parentNode.parentNode.parentNode);
	    }
	}
}
EventUtil.addHandler(lotBtn,"click",deleteLotTask);

//单个完成、删除、编辑
function change(){
	var checked=list.querySelectorAll("input:checked"),
	    len=checked.length;
	for(i=0;i<len;i++){
		var checkedParent=checked[i].parentNode.parentNode.parentNode,
		    targetParent=event.target.parentNode.parentNode;
		if(event.target.className=="completeIcon"&&(checkedParent==targetParent)){  //完成
			completeTask.appendChild(checked[i].parentNode.parentNode.parentNode)   
		}else if(event.target.className=="deleteIcon"&&(checkedParent==targetParent)){  //删除
			list.removeChild(checked[i].parentNode.parentNode.parentNode);
		}else if(event.target.className=="editeIcon"&&(checkedParent==targetParent)){  //编辑
			checked[i].parentNode.parentNode.parentNode.innerHTML="<input class='editText' type='text' value='"+checked[i].parentNode.innerText+"'/>";
			var edit=document.getElementsByClassName("editText")[0];/////
			edit.onblur=function(){
				this.outerHTML="<div class='checkIt'><label><input type='checkbox' />"+this.value+"</label></div>"
	                +"<div class='iconBar'><a class='completeIcon'>完成</a><a class='deleteIcon'>删除</a><a class='editeIcon'>编辑</a></div>";
			};
		}
	}
}
EventUtil.addHandler(list,"click",change);

//未完成与已完成间的替换
var toggleBtn=document.getElementById("toggleBtn");
function toggleTask(){	
	var uncompletation=document.getElementById("uncompletation"),
	    event=EventUtil.getEvent(event);
	if(event.target.id=="shiftRight"){
	  completeTask.style.display="block";
	  uncompletation.style.display="none";
	  shiftRight.style.color="#ee4e39";
	  shiftLeft.style.color="#000";
	}
	if(event.target.id=="shiftLeft"){
	  completeTask.style.display="none";
	  uncompletation.style.display="block";
	  shiftRight.style.color="#000";
	  shiftLeft.style.color="#ee4e39";
	}
}
EventUtil.addHandler(toggleBtn,"click",toggleTask);
