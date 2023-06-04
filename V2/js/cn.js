const log = (...dat) => {console.log(...dat)};

const CN = {
	symboles: 'abcdefghijklmnopqrstuvwxyz1234567890.,?!#$@%_ ',
	_1: {
		/*
		structure:
			numericBitBool,
			groupSize,
			message
		
		Example:
			0'4|e'0'u'3'a'0'm'0'm'3'i'3'e'0
			Numberic:
				1'4|1'0'5'3'0'0'3'0'3'3'2'3'1'0
			*/

		encode: function (str = 'Hello World',gSize = 5,numeric = false,includeInfo = true) { //,iterations = 1
			if (true) { //iterations <= 1
				var g = this.func.genPool(gSize);

				str = str.toLowerCase();
				var spl = str.split('');
				var code = [];
				var info = '';
	
				//Code Information
				if (includeInfo) {
					info = `${+numeric}'${gSize}|`;
				}
	
				//Encode actual Message
				for (let i = 0; i < spl.length; i++) {
					var index1;
					var index2;
					for (let i2 = 0; i2 < g.length; i2++) {
						if (g[i2].indexOf(spl[i]) > -1) {
							index1 = i2;
							index2 = g[i2].indexOf(spl[i]);
						}
					}
					if (index1 === undefined) {
						//character is not supported;
						continue;
					}
					if (numeric) {
						code.push(`${index1}'${index2}`)
					} else {
						code.push(`${g[index1][0]}'${index2}`);
					}
				}
				code = code.join("'");

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
		decode: function (cypher = "0'5|f'2'a'4'k'1'k'1'k'4'#'5'u'2'k'4'p'2'k'1'a'3") {
			var dat = cypher.split('|')[0].split("'");
			var c = cypher.split('|')[1].split('');

			var numeric = dat[0] == 1;
			var gSize = dat[1];

			var pool = this.func.genPool(gSize);
			var sCount = 0; //reset when hit 2
			var store = [[],[]];
			var char = [];
			function genChar () {
				var group;
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

				return pool[group][i];
			}
			for (let i = 0; i < c.length; i++) {
				var l = c[i];
				if (l === `'`) {
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
		}
	},
};
// var text = 'This is an Example'
// log(CN._1.encode(text,4))
// log(CN._1.decode(CN._1.encode(text,4)));
// log(CN._1.encode(text,4,true))
// log(CN._1.decode(CN._1.encode(text,4,true)));