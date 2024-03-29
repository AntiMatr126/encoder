const log = (...dat) => {console.log(...dat)};
const CN = {
	symboles: `abcdefghijklmnopqrstuvwxyz1234567890., ?!#$@%_'-+=/*():;`,
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
					info = `${+numeric}${this.chars.spacer}${gSize}${this.chars.groupSpace}`;
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
						toPush.push(this.chars.upperCase);
					}
					if (numeric) {
						toPush.push(`${index1}${this.chars.spacer}${index2}`)
					} else {
						toPush.push(`${g[index1][0]}${this.chars.spacer}${index2}`);
					}
					code.push(toPush.join(''));
				}
				code = code.join(this.chars.spacer);

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
			var dat = cypher.split(this.chars.groupSpace)[0].split(this.chars.spacer);
			var c = cypher.split(this.chars.groupSpace)[1].split('');

			var numeric = dat[0] == 1;
			var gSize = dat[1];

			var pool = this.func.genPool(gSize);
			var sCount = 0; //reset when hit 2
			var store = [[],[]];
			var char = [];
			function genChar () {
				var group;
				var upperCase = false;
				if (store[0][0] === CN._1.chars.upperCase) {
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
				if (l === this.chars.spacer) {
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
		fix: function (cd) {
			cd = cd.split(this.chars.upperCase);
			cd[0] = cd[0].split(' ');
			cd[1] = cd[1].split(' ');
			cd[0] = cd[0].join(this.chars.spacer);
			cd[1] = cd[1].join(this.chars.spacer);

			return cd.join('');
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
		chars: {
			spacer: '​', //'​' U + 200B
			groupSpace: ' ', //' ' U + 2008,
			upperCase: '᠎', //'᠎' U + 180E
		},
	},
	_2: {
		encode: function (str) {
			str = `${str}`.split('');
			var codes = [];
			str.forEach((v,i) => {codes.push([v.charCodeAt(0),i % 10])})

			codes.forEach((v,i) => { //replace numbers that match the spacer
				var c = `${v[0]}`.split('');
				c.forEach((num,ind) => {
					if (num == v[1]) {c[ind] = 'x'};
				})
				codes[i] = [c.join(''),v[1]].join('');
			})

			codes = codes.join('').reverse();

			return codes;
		},
		decode: function (code) {
			code = code.split('').reverse();
			var chars = [];

			var currentChar = [];
			var currentIndex = 0;
			for (let i = 0; i < code.length; i++) {
				var c = code[i];
				if (c == currentIndex) {
					currentIndex++;
					currentIndex%=10;

					chars.push(currentChar);
					currentChar = [];
					continue
				}
				if (c === 'x') {
					c = currentIndex;
				}
				currentChar.push(c);
			}

			chars.forEach((v,i) => {
				v = v.join('');
				chars[i] = String.fromCharCode(v);
			})
			return chars.join('');
		}
	}
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
String.prototype.reverse = function () {return this.split('').reverse().join('')};