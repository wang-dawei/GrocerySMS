//module.js
var exports = module.exports = {};

//Makes a new list
exports.newList = function(masterDict,number,listName,lists,code){
	code++;

	lists[code] = [];
	masterDict[number] = [];
	masterDict[number][listName] = code;
};

//Delete lists
exports.clearList = function(masterDict,number,listName,lists){
	var code = masterDict[number][listName];

	delete lists[code];
};

//Checking a list using a code key
exports.checkList = function(masterDict,number,listName,lists){
	var code = masterDict[number][listName];

	return lists[code];
};

//Add an item
exports.addItem = function(masterDict,number,listName,lists,item){
	var code = masterDict[number][listName];

	lists[code].push(item);
};

//Delete an item
exports.delItem = function(masterDict,number,listName,lists,item){
	var code = masterDict[number][listName];

	for(i = 0; i <lists[code].length; i++){
		if(list[code][i] === item){
			lists[code].splice(i,1);
		};
	};
};

//Add Number
exports.addNumber = function(masterDict,origNumber,listName,newNumber,newListName){
	var code = masterDict[number][listName];

	if(masterDict[newNumber] === null){
		masterDict[newNumber] = [];
	}
	else{
		masterDict[newNumber][newListName] = code;
	};
};