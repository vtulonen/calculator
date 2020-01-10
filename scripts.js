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

addToScreen = (str) => {
    document.getElementById("value").innerHTML = str;
}

window.onload = function(){

    populateDisplay();
    getSolution();
    clearBtn();
}

// GLOBAL VARIABLES

let displayValue = document.getElementById("value");     // Value displayed on screen

let newFlag = false;  // To check if new calculation is started
let ops = ['+','-','/','*'];
let operatorRegex = new RegExp('^(' + ops.map(function(op) { return '\\' + op;}).join('|') + ')$');

// Whenever a key is pressed, display its value on screen
function populateDisplay(){
    const buttons = document.querySelectorAll('.key');
    buttons.forEach((btn) => {
        btn.addEventListener('click', () => {
        if (newFlag === true) { // check flag status to clear existing data if needed
            clearData(); 
        }
        if (btn.id === 'undo'){
            displayValue.innerHTML = displayValue.innerHTML.slice(0, displayValue.innerHTML.length-1);
           return 0;
        } 
        // Save to variable to use in calculation 
        displayValue.innerHTML += btn.innerHTML;
        })
    })
}




// Create a an arrray of operators and operands from displayValue -> calculate -> display solution
function getSolution() { 
    let calcArr = [];
    let solution;
    const equals = document.querySelector('#equals');
    equals.addEventListener('click', () => { 
        
        calcArr = displayValue.innerHTML.split(/([*/+-])/); // Split operands with operators into an array
        
        console.log(calcArr);
        
        console.log(displayValue.innerHTML);
        
        // Regex leaves leaves an empty string if first element is operator
        // in that case we turn it into 0 so we can start with negative numbers
        if ( calcArr[0] === '') { 
            calcArr[0] = '0';
            console.log(calcArr);
        }
        
        solution = calculate(calcArr); // Calculate with array elements
        if (isNaN(solution)) { // if solution is NaN, user must've entered malformed expression
            newFlag = true;
            return document.getElementById("value").innerHTML = 'Malformed expression';
        }
        document.getElementById("value").innerHTML = solution;
        newFlag = true; // set flag after showing solution
        
    })  
}




// Count & return amount of operators in an array
function operatorsInArray(arr) {
    let count = 0;
    for (let i=0; i<arr.length; i++){
        if (arr[i] === '*' || arr[i] === '/' || arr[i] === '+' || arr[i] === '-') {
            count++;
        }
    }
    return count;
}


/***************************************************************************************************
*   Function:   Calculate using formula DMAS - Division Multiplication Addition Substraction                                                  
*   Parameter:  An array containing the calculation, each operand and operator on their own index
*               example : calcArr = ['75', '+', '25']
*   Returns:    final solution
****************************************************************************************************/
function calculate(calcArr) {
    let subSolution = 0;
    let tempArr = calcArr;
    let a, b, op;
    let idx, tempIdx1, tempIdx2;
    let operations = operatorsInArray(calcArr);

    for (let i=0; i<operations; i++){   //Loop as many times as there are operators
        if (tempArr.includes('/')){     //Check if calculation contains divison
            idx = tempArr.indexOf('/'); //Set idx as the index of first '/'
        }
        else if (tempArr.includes('*')) { // Multiplication next
            idx = tempArr.indexOf('*');
        }
        else if (tempArr.includes('+') || (tempArr.includes('-'))){ // Check + & -
            tempIdx1 = tempArr.indexOf('+'); // Returns -1 if not found
            tempIdx2 = tempArr.indexOf('-');
            if (tempIdx1 === -1) idx = tempIdx2; // If not found -> set  the other one as idx
            else if (tempIdx2 === -1) idx = tempIdx1;
            else idx = Math.min(tempIdx1, tempIdx2); // if both found -> set lowest index as idx
        }                                            // to calculate from left to right
    
            a = tempArr[idx-1];     //oprand before operator
            op = tempArr[idx];      //operator idx that will be calculated now
            b = tempArr[idx+1];     //operand after operator

            subSolution = operate(a,op,b); // operate
            
            tempArr.splice(idx-1, 3); // remove the operands/operator just used form the array
            
            if(tempArr.length !== 0){ // if there are still operations to be done in an array
                tempArr.splice(idx-1, 0, subSolution); // add subSolution where it was located before operating
                console.log(tempArr);
                
            }
            else {
                console.log(subSolution); 
                return round(subSolution); // if the array is empty, return (rounded if needed) solution
            }
        }
    
       
}


function test(numArr){
    
    let solution = calculate(numArr);
    console.log(solution);
}


function clearData(){
    displayValue.innerHTML = "";
    document.getElementById("value").innerHTML = "";
    newFlag = false; // reset flag status
}


function clearBtn() {
    const cls = document.querySelector('#clear');
    cls.addEventListener('click', () => {
        clearData();
    })
}

function round(solution) {
    sSolution = solution.toString();

    if (sSolution.includes('.')){
        let idx = sSolution.indexOf('.');
        let decimals = sSolution.length - (idx+1); 
        
        if (decimals > 4) { // if - return shorter solution
            return parseFloat(solution).toFixed(3).replace(/0+$/, ""); // replace trailing zeros
            
        }
    }
    return solution;
}





