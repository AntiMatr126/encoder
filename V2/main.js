function encode () {
	var inp = document.getElementById('inp').value;
	var type = document.getElementById('type').value;

	document.getElementById('out').innerText = CN[`_${type}`].encode(inp);
}
function decode () {
	var inp = document.getElementById('inp').value;
	var type = document.getElementById('type').value;

	document.getElementById('out').innerText = CN[`_${type}`].decode(inp);
}