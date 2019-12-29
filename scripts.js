add = (a,b) => {
    return a+b;
}

substract = (a,b) => {
    return a-b;
}

multiply = (a,b) => {
    return a*b;
}

divide = (a,b) => {
    return a/b;
}

operate = (operator,a,b) => {
    a = parseFloat(a);
    b = parseFloat(b);
    if (operator === '+') return add(a,b); 
    if (operator === '-') return substract(a,b);  
    if (operator === '*') return multiply(a,b);
    if (operator === '/') return divide(a,b);
    else return 'error';
}

window.onload = function(){

    populateDisplay();
    storeInput();
    getSolution();
}

let displayValue;
let operator;
let a;
let b;
let input = [];
let newFlag = false;



function populateDisplay(){
    const buttons = document.querySelectorAll('.key');
    buttons.forEach((btn) => {
        btn.addEventListener('click', () => {
        if (newFlag === true) {
            clearData(); 
            document.getElementById("value").innerHTML = "";
            newFlag = false;
        } 
        displayValue = document.getElementById("value").innerHTML += btn.innerHTML;
        })
    })
}

function storeInput() { // store operator and first number to global variables
    const operators = document.querySelectorAll('#operator');
    operators.forEach((op)=>{
        op.addEventListener('click', () => { 
        operator = op.innerHTML;
        a = displayValue.slice(0,this.length-1);
            console.log(a);
            console.log(operator);
        })
    })
}

function getSolution() { // store second number to global var b
    const equals = document.querySelector('#equals');
    equals.addEventListener('click', () => { 
        console.log(displayValue);
        b = (displayValue.slice(a.length+1)); // a length + operator length(1)
        
        
        let solution = operate(operator,a,b);
        document.getElementById("value").innerHTML = solution;
        console.log(solution);
        newFlag = true;
    })
    
}

function clearData(){
    displayValue = null;
    operator = null;
    a = null;
    b = null;
    solution = null;
}
    






