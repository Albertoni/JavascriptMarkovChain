'use strict';

function randomIntFromInterval(min,max){return Math.floor(Math.random()*(max-min+1)+min);};

var markovGenerator = {
	order: 2,
	table:{},
	load:function(text){
		text = text.toLowerCase();
		//text.replace(/[^a-z ]/, '');

		for (var i = this.order; i < text.length; i++){
			var entry = text.slice(i-this.order, i);
			if(Array.isArray(this.table[entry])){
				this.table[entry].push(text.charAt(i));
			}else{
				this.table[entry] = [text.charAt(i)];
			}
		}
	},
	generate:function(length, start){
		if(length == undefined){
			throw 'tooFewArguments';
		}
		if(start == undefined){
			var possibleKeys = Object.keys(this.table);
			start = possibleKeys[randomIntFromInterval(0, possibleKeys.length)];
		}

		var text = start;
		while(text.length < length){
			var key = text.slice(text.length-this.order, text.length);
			var possibilities = this.table[key];
			var letter = possibilities[randomIntFromInterval(0, possibilities.length-1)];

			text += letter;
		}

		return text;
	}
}