/* 未完成列表 todos.list
*  字段：  id            唯一id
		   time          截止时间,使用时间戳存储
		   content       内容
	
	操作：
	todos.add(obj)       添加一条信息，参数为一个对象，例如: {time:"123456",content:"this is what to do"}
	todos.del(id)        删除一条信息，参数为id
	todos.find(id)       查找一条信息，参数为id，返回一个对象
	todos.edit(id,obj)   编辑一条信息，参数为id和一个对象，id为编辑对象的id，obj为需要修改的内容，例如：{time:'213'}，只需要修改的属性
	todos.clear()        清空未完成列表
	todos.lists()        返回根据时间排序的整个未完成列表的对象数组
	todos.done(id)       标记已完成
	todos.delDone(id)    删除已完成列表的一项，参数为id
	todos.doneLists()    返回已完成列表对象数组
*/

var todos = {};

todos.list = localStorage.getItem('list') == undefined ? '' : localStorage.getItem('list');
todos.counts = localStorage.getItem('counts') == undefined ? 0 : parseInt(localStorage.getItem('counts'));
todos.lastId = localStorage.getItem('lastId') == undefined ? 0 : parseInt(localStorage.getItem('lastId'));
todos.doneList = localStorage.getItem('doneList') == undefined ? '' : localStorage.getItem('doneList');


todos.add = function(obj) {
	todos.lastId++;
	localStorage.setItem('lastId',todos.lastId);
	obj.id = todos.lastId;
	var arr = todos.counts === 0 ? [] : JSON.parse(todos.list);
	arr.push(obj);
	todos.list = JSON.stringify(arr);
	todos.counts++;
	localStorage.setItem('list', todos.list);
	localStorage.setItem('counts', todos.counts);
}

todos.clear = function(){
	todos.list = '';
	todos.counts = 0;
	localStorage.removeItem('list');
	localStorage.removeItem('counts');
}

todos.del = function(id){
	var pattern1 = new RegExp(',\{[^{]+"id":' + id + '\}');
	var pattern2 = new RegExp('\{[^{]+"id":' + id + '\},');
	var pattern3 = new RegExp('\{[^{]+"id":' + id + '\}');
	if(pattern1.test(todos.list)){
		todos.list = todos.list.replace(pattern1,'');
		todos.counts--;
		localStorage.setItem('list', todos.list);
		localStorage.setItem('counts', todos.counts);	
	}else if(pattern2.test(todos.list)){
		todos.list = todos.list.replace(pattern2,'');
		todos.counts--;
		localStorage.setItem('list', todos.list);
		localStorage.setItem('counts', todos.counts);	
	}else if(pattern3.test(todos.list)){
		todos.clear();
	}else{
		return;
	}
}

todos.find = function(id){
	var pattern = new RegExp('\{[^{]+"id":' + id + '\}');
	if(pattern.test(todos.list)){
		return JSON.parse(todos.list.match(pattern)[0]);
	}else{
		return;
	};
}

todos.edit = function(id,obj){
	var pattern = new RegExp('\{[^{]+"id":' + id + '\}');
	if(pattern.test(todos.list)){
		var old = JSON.parse(todos.list.match(pattern)[0]);

		for(var i in obj){
			if(i == 'content' || i == 'time'){
				old[i] = obj[i];
			};
		}
		console.log(old);
		old = JSON.stringify(old);
		todos.list = todos.list.replace(pattern,old);
		localStorage.setItem('list', todos.list);
	};
}

todos.done = function(id){
	var target = todos.find(id);
	if(target){
		todos.del(id);
		var arr = localStorage.getItem('doneList') == undefined ? [] : JSON.parse(localStorage.getItem('doneList'));
		arr.push(target);
		todos.doneList = JSON.stringify(arr);
		localStorage.setItem('doneList',todos.doneList);
	}
	
}

todos.lists = function(){
	function compare(propertyName) { 
		return function (object1, object2) { 
					var value1 = parseInt(object1[propertyName]); 
					var value2 = parseInt(object2[propertyName]); 
					if (value2 < value1) { 
						return 1; 
					} else if (value2 > value1) { 
						return -1; 
					} else { 
						return 0; 
					} 
				}; 
	} 
	if(!!todos.list){
		var arrList = JSON.parse(todos.list);
		arrList.sort(compare('time'));
		return arrList;
	}else{
		return [];
	}
};

todos.doneLists = function(){
	if(!!todos.doneList){
		return JSON.parse(todos.doneList);
	}else{
		return [];
	}
}

todos.delDone = function(id){
	var pattern1 = new RegExp(',\{[^{]+"id":' + id + '\}');
	var pattern2 = new RegExp('\{[^{]+"id":' + id + '\},');
	var pattern3 = new RegExp('\{[^{]+"id":' + id + '\}');
	if(pattern1.test(todos.doneList)){
		todos.doneList = todos.doneList.replace(pattern1,'');
		localStorage.setItem('doneList', todos.doneList);	
	}else if(pattern2.test(todos.doneList)){
		todos.doneList = todos.doneList.replace(pattern2,'');
		localStorage.setItem('doneList', todos.doneList);
	}else if(pattern3.test(todos.doneList)){
		todos.doneList = '';
		localStorage.removeItem('doneList');
	}else{
		return;
	}
}
var list1 = {
	content:"meeting",
	time:'123459'
};
var list2 = {
	content:"meeting",
	time:'123458'
};
var list3 = {
	content:"meeting",
	time:'123458'
};
var list4 = {
	content:"meeting",
	time:'123456'
};



