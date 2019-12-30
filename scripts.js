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
let tempValue;
let operator;
let a;
let b;

let newFlag = false;
let currentValue = "";


let allCalculations = [];




function populateDisplay(){
    const buttons = document.querySelectorAll('.key');
    buttons.forEach((btn) => {
        btn.addEventListener('click', () => {
        if (newFlag === true) {
            clearData(); 
            document.getElementById("value").innerHTML = "";
            newFlag = false;
        } 
        
        if (btn.id !== 'operator'){
            currentValue += btn.innerHTML;
            //console.log(currentValue);
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
        a = currentValue;
            console.log(a);
           console.log(operator);
           currentValue = "";
        })
    })
}

function getSolution() { // store second number to global var b
    const equals = document.querySelector('#equals');
    equals.addEventListener('click', () => { 
        
        b = currentValue; // a length + operator length(1)
        console.log(a,operator,b);
        let calculation = new Array(a,operator,b);
        allCalculations.push(calculation);
        console.log(allCalculations);
        let solution = operate(operator,a,b);
        document.getElementById("value").innerHTML = solution;
        console.log(solution);
        newFlag = true;
        
    })
    
}

function clearData(){
    displayValue = "";
    operator = null;
    a = null;
    b = null;
    solution = "";
    currentValue = "";
}
    






