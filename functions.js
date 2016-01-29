//Checking a list using a code key
var checkList = function(code,number){
	for(i = 0; i < key[code][0].length; i++){
		if(key[code][0][i] === number){
			return key[code][1];
		};
	};
};

//Add an item
var addItem = function(code,number,item){
	for(i = 0; i < key[code][0].length; i++){
		if(key[code][0][i] === number){
			//Check if item is repeated and lower case them
			key[code][1].push(item);
		};
	};
};

//Delete an item
var deleteItem = function(code,number,item){
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
var clearList = function(code,number){
	for(i = 0; i < key[code][0].length; i++){
		if(key[code][0][i] === number){
			delete key[code];
		};
	};
};

//Add Number
var addNumber = function(code,number,newNum){
	for(i = 0; i < key[code][0].length; i++){
		if(key[code][0][i] === number){
			key[code][0].push(newNum);
		};
	};
};

//Remove Number
var delNumber = function(code,number,delNum){
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