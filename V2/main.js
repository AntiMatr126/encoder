function encode () {
	var inp = document.getElementById('inp').value;
	var type = document.getElementById('type').value;

	inp = CN[`_${type}`].encode(inp,undefined,true)
	document.getElementById('out').innerText = inp;

	copyText(inp);
}
function decode () {
	var inp = document.getElementById('inp').value;
	var type = document.getElementById('type').value;

	try {
		inp = CN[`_${type}`].decode(inp)
		document.getElementById('out').innerText = inp;
	} catch (err) {
		inp = CN._1.fix(inp);
		inp = CN[`_${type}`].decode(inp)
		document.getElementById('out').innerText = CN[`_${type}`].decode(inp);
	}
}

var copyText = function (text) {
	navigator.clipboard.writeText(text);
}