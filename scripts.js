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
    getSolution();
}

let displayValue;
let newFlag = false;
let currentValue = "";


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
            
        }
        
        
        displayValue = document.getElementById("value").innerHTML += btn.innerHTML;
        })
    })
}



let operatorArray = [];
let calcArr = [];

function getSolution() { 
    const equals = document.querySelector('#equals');
    equals.addEventListener('click', () => { 

        console.log(displayValue);
        
        calcArr = displayValue.split(/([*/+-])+/);
        
        console.log(calcArr);
        console.log(operatorArray);
        console.log(displayValue);
        let solution = calculate(calcArr);
        document.getElementById("value").innerHTML = solution;
        

        newFlag = true;
        
    })
    
}

function operatorsInArray(arr) {
    let count = 0;
    for (let i=0; i<arr.length; i++){
        if (arr[i] === '*' | arr[i] === '/' | arr[i] === '+' | arr[i] === '-') {
            count++;
        }
    }
    return count;
}

function calculate(calcArr) {
    let subSolution = 0;
    let tempArr = calcArr;
    let a;
    let op;
    let b;
    let idx;
    let operations = operatorsInArray(calcArr);

    for (let i=0; i<operations; i++){
        if (tempArr.includes('*')){
            idx = tempArr.indexOf('*');
        }
        else if (tempArr.includes('/')){
            idx = tempArr.indexOf('/');
        }
        else if (tempArr.includes('+')){
            idx = tempArr.indexOf('+');
        }
        else if (tempArr.includes('-')){
            idx = tempArr.indexOf('-');
        }

            a = tempArr[idx-1];
            op = tempArr[idx];
            b = tempArr[idx+1];

            subSolution = operate(a,op,b);
            
            tempArr.splice(idx-1, 3);
            console.log(tempArr);
            if(tempArr.length !== 0){
                tempArr.splice(idx-1, 0, subSolution);
                
            }
            else return subSolution;
        
        }
    
       
}


function test(numArr){
    
    let solution = calculate(numArr);
    console.log(solution);
}


function clearData(){
    displayValue = "";
    currentValue = "";
}
    






