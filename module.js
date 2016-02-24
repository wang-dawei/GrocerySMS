var exports = module.exports{};

//New list
exports.newList = function(masterDict,number,listName,lists,code){
	code++;

	lists[code] = [];
	masterDict[number] = [];
	masterDict[number][listName] = code;
};

//Delete list
exports.clearList = function(masterDict,number,listName,lists){
	var code = masterDict[number][listName]; //Retrieves code


	delete lists[code];
};

//Checks a list
exports.checkList = function(masterDict,number,listName,lists){
	var code = masterDict[number][listName]; //Retrieves code

	return lists[code];
};

//Add Item to list
exports.addItem = function(masterDict,number,listName,lists,item){
	var code = masterDict[number][listName]; //Retrieves code

	lists[code].push(item);
};

//Delete Item from list
exports.delItem = function(masterDict,number,listName,lists,item){
	var code = masterDict[number][listName]; //Retrieves code

	for(i = 0; i < lists[code].length; i++){
		if(lists[code][i] === item){
			lists[code].splice(i,1);
		};
	};
};

exports.addNumber = function(masterDict,origNumber,listName,newNumber,newListName){
	var code = masterDict[origNumber][listName]; //Retrieves code for a specific list to share

	masterDict[newNumber][newListName] = code;
};