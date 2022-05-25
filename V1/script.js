let string = ''
let numbers = ''

let letterArray = []
let numArray = []

let output = ''

function LtrToNum() {
    string = prompt("Insert Sentence Here:","Hello World")
    letterArray = string.split('')
    
    for (let i = 0; letterArray.length > i; i++) {
        numArray.splice(i,1,(letterArray[i].charCodeAt(0)-97+1)*47) //converts letter into number by taking letter code and jumbling up
    }
    output = numArray.join(' ')
    
    //alert(output)
    setTimeout(() => {
        alert(output)
        copy(output)
        output = ''
    },50);

    letterArray = []
    numArray = []
}

function NumToLtr() {
    string = prompt('Enter Cypher:','-1128 235 564 564 705 -3008 -423 705 846 564 188');
    numArray = string.split(' ');

    for (let i = 0; numArray.length > i; i++) {
        letterArray.splice(i,1,String.fromCharCode(parseInt(numArray[i])/47+97-1)) //convert each number into a letter by undoing process
    }
    output = letterArray.join('')

    alert(output)

    letterArray = []
    numArray = []
    output = ''
}

function copy(text) {
    let elem = document.createElement('textarea');
    elem.value = text;
    document.body.appendChild(elem);
    elem.select();
    document.execCommand('copy');
    document.body.removeChild(elem);

    elem = null
 }
