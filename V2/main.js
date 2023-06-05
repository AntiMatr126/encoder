function encode () {
	var inp = document.getElementById('inp').value;
	var type = document.getElementById('type').value;

	document.getElementById('out').innerText = CN[`_${type}`].encode(inp,undefined,true);
}
function decode () {
	var inp = document.getElementById('inp').value;
	var type = document.getElementById('type').value;

	try {
		document.getElementById('out').innerText = CN[`_${type}`].decode(inp);
	} catch (err) {
		inp = CN._1.fix(inp);
		document.getElementById('out').innerText = CN[`_${type}`].decode(inp);
	}
}