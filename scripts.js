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
    if (b === 0) return 'Can\'t divide by 0';
    return a/b;
}

operate = (a,operator,b) => {
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
   //storeInput();
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

/*

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

class Calculation {
    a;
    op;
    b;
}
*/

let operatorArray = [];
let calcArr = [];

function getSolution() { // store second number to global var b
    const equals = document.querySelector('#equals');
    equals.addEventListener('click', () => { 

        console.log(displayValue);
        operatorArray = displayValue.split(/[0-9]+/);
        operatorArray.shift();
        operatorArray.pop();


        calcArr = displayValue.split(/([*/+-])+/);
        
        console.log(calcArr);
        console.log(operatorArray);
        console.log(displayValue);
        let solution = calculate(calcArr, operatorArray);
        document.getElementById("value").innerHTML = solution;
        

        newFlag = true;
        
    })
    
}

function calculate(calcArr, opArr) {
    let subSolution = 0;
    let solution = 0;
    let tempArr = calcArr;

    

    for (let i=0; i<opArr.length; i++){
        let a = tempArr[0];
        let op = tempArr[1];
        let b = tempArr[2];

        subSolution = operate(a,op,b);
        tempArr = tempArr.slice(3);
        
        if(tempArr.length !== 0){
            tempArr.unshift(subSolution);
        }

        else return subSolution;
    }
}

function checkPresedence(calcArr) {

}





function clearData(){
    displayValue = "";
    operator = null;
    a = null;
    b = null;
    solution = "";
    currentValue = "";
}
    






