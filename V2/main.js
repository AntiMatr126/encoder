const funcVars = {
	_1: [undefined,true]
}
function encode () {
	var inp = document.getElementById('inp').value;
	if (!inp) return;
	var type = document.getElementById('type').value;

	var vars = (typeof funcVars[`_${type}`] == 'undefined') ? undefined : [...funcVars[`_${type}`]]
	inp = CN[`_${type}`].encode(inp,vars)
	document.getElementById('out').innerText = inp;

	copyText(inp);
}
function decode () {
	var inp = document.getElementById('inp').value;
	if (!inp) return;
	var type = document.getElementById('type').value;

	var cn = CN[`_${type}`];

	switch(type) {
		case '1':
			try {
				inp = cn.decode(inp)
			} catch (err) {
				inp = cn.fix(inp);
				inp = cn.decode(inp)
				inp = cn.decode(inp);
			}
			break;
		default:
			inp = cn.decode(inp);
	}
	
	document.getElementById('out').innerText = inp;

}

var copyText = text => {
	navigator.clipboard.writeText(text);
	
	document.getElementById('copied').style.display = 'inline-block';
	setTimeout(() => {
		document.getElementById('copied').style.display = 'none'
	},1900)
}


window.addEventListener('load', () => {
	document.getElementById('out').addEventListener('click', function () {
		var val = this.innerText;
		if (val != 'OUTPUT') {
			copyText(val);
		}
	})

	var btns = [...document.getElementsByTagName('button')];
	btns.forEach(e => {
		e.addEventListener('mousedown',function () {
			this.style.backgroundColor = 'var(--btnDown)';
		});
		e.addEventListener('mouseup', function () {
			setTimeout(() => {
				this.style.backgroundColor = 'var(--btnUp)';
			},25)
		})
	});
})