function encode() {
    let string = prompt("Insert Sentence Here:","Hello World")
    alert(Encode.LtrToNum(string))
}

function decode() {
    let string = prompt('Enter Cypher:','-493 0 119 119 170 -1173 -238 170 221 119 -17');
    alert(Encode.NumToLtr(string))
}

window.onload = () => {
    document.getElementById('encode').style.fontSize = `${window.screen.width/20}px`;
    document.getElementById('decode').style.fontSize = `${window.screen.width/20}px`;
}
