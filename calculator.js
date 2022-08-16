let runningTotal = 0;
let buffer = "0";
let previousOperator = null;

const screen = document.querySelector('.screen');

function buttonClick(value) {
    //debugger;
    if (isNaN(value)) {
        handleSymbol(value) // not a number
    } else{
        handleNumber(value) // a number
    }
    screen.innerText = buffer;
}

function handleSymbol(symbol){
   /* if (symbol === 'C') {
        buffer = "0";
        runningTotal = '0';
    } else if (symbol === '+' || '−' || '−' || '×' || '÷') {
        handleMath(symbol);
    }*/
    switch (symbol) {
        case 'C':
            buffer = "0";
            runningTotal = 0;
            break;
        case '=':
            if (previousOperator === null) {
                // need two numbers to do math
                return;
            }
            flushOperation(parseInt(buffer));
            previousOperator = null;
            buffer = runningTotal;
            runningTotal = 0;
            break;
        case '←':
            if (buffer.length === 1) {
                buffer = '0';
            } else {
                buffer = buffer.substring(0, buffer.length - 1);
            }
            break;
        case '+':
        case '−':
        case '×':
        case '÷':
            handleMath(symbol);
            break;
        }
}

function handleMath(symbol) {
    if (buffer === "0"){
        // do nothing
        return; // because of return,no need for else if
    }

    const intBuffer = parseInt(buffer); // or intBuffer = +buffer

    if (runningTotal === 0) {
        runningTotal = intBuffer;
    } else {
        flushOperation(intBuffer); // when you are running moultiple operation, where you do the math and book keeping
    }
   
    previousOperator = symbol;

    buffer = '0';
}

function flushOperation(intBuffer) {
    // you can use the switch statement here also
    if (previousOperator === '+') {
        runningTotal += intBuffer; 
    } else if (previousOperator === '−') {
        runningTotal -= intBuffer;
    } else if (previousOperator === '×') {
        runningTotal *= intBuffer;
    } else{
        runningTotal /= intBuffer;
    }
    console.log('running total', runningTotal);
}

function handleNumber(numberString){
    if (buffer === '0'){
        buffer = numberString;
    } else{
        buffer += numberString;
    }
}

function init () {
    document.querySelector('.calc-buttons')
    .addEventListener('click', function(event) {
        buttonClick(event.target.innerText)
    })
}

init(); // always call the function in this case, init