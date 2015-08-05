'use strict';

function randomIntFromInterval(min,max){return Math.floor(Math.random()*(max-min+1)+min);};

var markovGenerator = {
	order: 2,
	table:{},
	rigorousMode:false, // Rigorous mode is intended for scientific studies. It will stop when it lacks a key, instead of trying to continue.
	load:function(text){
		//text = text.toLowerCase();
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
			start = this.getRandomKey(); // Random start if none was specified.
		}

		var text = start;
		while(text.length < length){
			var key = text.slice(text.length-this.order, text.length);
			var possibilities = this.table[key];
			
			// If the sample is too small, it'll generate strings it lacks as keys.
			if (possibilities == undefined && !this.rigorousMode){
				possibilities = this.table[this.getRandomKey()];
			}
			
			var letter = possibilities[randomIntFromInterval(0, possibilities.length-1)];

			text += letter;
		}

		return text;
	},
	
	getRandomKey:function(){
		var possibleKeys = Object.keys(this.table);
		return possibleKeys[randomIntFromInterval(0, possibleKeys.length)];
	}
}