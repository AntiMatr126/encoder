let string = ''
let numbers = ''

let letterArray = []
let numArray = []

let output = ''

let Encode = {}

Encode.LtrToNum = (string) => {
    output = ''

    letterArray = string.split('')
    
    let charCode = null;
    for (let i = 0; letterArray.length > i; i++) {
        charCode = letterArray[i].charCodeAt(0)-97+1 //converts char to number (a is 1, b is 2, etc.)

        numArray.splice(i,1,(charCode-5)*17) //takes charCode and jumbles it up
    }
    output = numArray.join(' ')

    letterArray = []
    numArray = []

    //alert(output)
    return(output)
}

Encode.NumToLtr = (string) => {
    output = ''

    numArray = string.split(' ');

    let numCode = null;

    for (let i = 0; numArray.length > i; i++) {
        numCode = parseInt(numArray[i])

        letterArray.splice(i,1,String.fromCharCode( numCode / 17 + 5 - 1 + 97)) //convert each numCode into a char by undoing process
    }
    output = letterArray.join('')

    letterArray = []
    numArray = []

    //alert(output)
    return(output)
}