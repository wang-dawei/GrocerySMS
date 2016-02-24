//module.js
var exports = module.exports = {};

//Checking a list using a code key
exports.checkList = function(key,code,number){
	for(i = 0; i < key[code][0].length; i++){
		if(key[code][0][i] === number){
			return key[code][1];
		};
	};
};

//Add an item
exports.addItem = function(key,code,number,item){
	for(i = 0; i < key[code][0].length; i++){
		if(key[code][0][i] === number){
			//Check if item is repeated and lower case them
			key[code][1].push(item);
		};
	};
};

//Delete an item
exports.deleteItem = function(key,code,number,item){
	for(i = 0; i < key[code][0].length; i++){
		if(key[code][0][i] === number){
			for(j = 0; j < key[code][1].length; j++){
				if(key[code][1][j] == item){
					key[code][1].splice(j,1);
				};
			};
		};
	};
};

//Clear list
exports.clearList = function(key,code,number){
	for(i = 0; i < key[code][0].length; i++){
		if(key[code][0][i] === number){
			delete key[code];
			return 'Deleted';
		};
	};
};

//Add list
exports.addList = function(key,code,number){
	for(i = 0; i < key[code][0].length; i++){
		if(key[code][0].length === 0){
			key[code][0] = number;
			return 'Success';
		}
		else{
			return 'Code taken, try again';
		};
	};
};

//Add Number
exports.addNumber = function(key,code,number,newNum){
	for(i = 0; i < key[code][0].length; i++){
		if(key[code][0][i] === number){
			key[code][0].push(newNum);
		};
	};
};

//Remove Number
exports.delNumber = function(key,code,number,delNum){
	for(i = 0; i < key[code][0].length; i++){
		if(key[code][0][i] === number){
			for(j = 0; j < key[code][0]; j++){
				if(key[code][0][j] == delNum){
					key[code][0].splice(j,1);
				}
			};
		};
	};
};