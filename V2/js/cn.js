const log = (...dat) => {console.log(...dat)};

const CN = {
	symboles: 'abcdefghijklmnopqrstuvwxyz1234567890.,?!#$@%_\'-+=/*() ',
	_1: {
		encode: function (str = 'Hello World',gSize = Math.floor(Math.sqrt(CN.symboles.length)),numeric = false,includeInfo = true) { //,iterations = 1
			if (true) { //iterations <= 1
				var g = this.func.genPool(gSize);

				// str = str.toLowerCase();
				var spl = str.split('');
				var code = [];
				var info = '';
	
				//Code Information
				if (includeInfo) {
					info = `${+numeric}${this.vars.spacer}${gSize}${this.vars.groupSpace}`;
				}
	
				//Encode actual Message
				for (let i = 0; i < spl.length; i++) {
					var index1;
					var index2;
					for (let i2 = 0; i2 < g.length; i2++) {
						if (g[i2].indexOf(spl[i].toLowerCase()) > -1) {
							index1 = i2;
							index2 = g[i2].indexOf(spl[i].toLowerCase());
						}
					}
					if (index1 === undefined) {
						//character is not supported;
						continue;
					}
					var toPush = [];
					if (spl[i].isCaseSensitive() && spl[i].isUpperCase()) {
						toPush.push(this.vars.upperCase);
					}
					if (numeric) {
						toPush.push(`${index1}${this.vars.spacer}${index2}`)
					} else {
						toPush.push(`${g[index1][0]}${this.vars.spacer}${index2}`);
					}
					code.push(toPush.join(''));
				}
				code = code.join(this.vars.spacer);

				return [info,code].join('');
			} 
			// else {
			// 	var s = str;
			// 	for (let i = 0; i < iterations; i++) {
			// 		s = this.encode(s,gSize,1,numeric,false);
			// 	}
			// 	if (includeInfo) {
			// 		return [+numeric,gSize,iterations,s].join('.');
			// 	} else {
			// 		return s;
			// 	}
			// }
		},
		decode: function (cypher = this.encode('Hello World')) {
			var dat = cypher.split(this.vars.groupSpace)[0].split(this.vars.spacer);
			var c = cypher.split(this.vars.groupSpace)[1].split('');

			var numeric = dat[0] == 1;
			var gSize = dat[1];

			var pool = this.func.genPool(gSize);
			var sCount = 0; //reset when hit 2
			var store = [[],[]];
			var char = [];
			function genChar () {
				var group;
				var upperCase = false;
				if (store[0][0] === CN._1.vars.upperCase) {
					upperCase = true;
					store[0].shift();
				}
				if (numeric) {
					group = parseInt(store[0].join(''));
				} else {
					var l = store[0].join('');
					for (let i = 0; i < pool.length; i++) {
						if (l === pool[i][0]) {
							group = i;
						}
					}
				}

				var i = parseInt(store[1].join(''));

				var ret = pool[group][i];
				if (upperCase) {
					ret = ret.toUpperCase();
				}

				return ret;
			}
			for (let i = 0; i < c.length; i++) {
				var l = c[i];
				if (l === this.vars.spacer) {
					sCount++;
					if (sCount >= 2) {
						char.push(genChar());				

						//Reset variables
						sCount = 0;
						store = [[],[]];
					}
					continue;
				}
				store[sCount].push(l);

				if (i >= c.length - 1) {
					char.push(genChar());	
				}
			}
			return char.join('');
		},

		func: {
			genPool: function (gS) {
				var abc = CN.symboles.split('');
				var a2 = [...abc];
				
				var groups = [];
				for (let i = 0; i < Math.floor(a2.length / gS); i++) {
					groups.push(abc.splice(0,gS));
					if (i === Math.floor(a2.length / gS) - 1) {
						groups[i].push(...abc);
					}
				}

				return groups;
			}
		},
		vars: {
			spacer: '​', //'​' U + 200B
			groupSpace: ' ', //' ' U + 2008,
			upperCase: '᠎', //'᠎' U + 180E
		},
	},
};

String.prototype.isCaseSensitive = function () {
	return !(this[0].toLowerCase() === this[0].toUpperCase());
}
String.prototype.isUpperCase = function () { //Undefined, or boolean
	if (!this[0].isCaseSensitive()) {
		return undefined;
	}

	return this[0] === this[0].toUpperCase();
}
String.prototype.isLowerCase = function () {return !this.isUpperCase()};