add = (a, b) => {
    return a + b;
}

substract = (a, b) => {
    return a - b;
}

multiply = (a, b) => {
    return a * b;
}

divide = (a, b) => {
    if (b === 0) return 'Can\'t divide by 0';
    return a / b;
}

operate = (a, operator, b) => {
    a = parseFloat(a);
    b = parseFloat(b);
    if (operator === '+') return add(a, b);
    if (operator === '-') return substract(a, b);
    if (operator === '*') return multiply(a, b);
    if (operator === '/') return divide(a, b);
    else return 'error';
}

addToDisplay = (key) => {
    displayValue.innerHTML += key;
}


window.onload = function () {

    const buttons = document.querySelectorAll('.key');
    buttons.forEach((btn) => {
        btn.addEventListener('click', storeInput);
    })
    document.addEventListener('keyup', storeInput);
}

// GLOBAL VARIABLES

let displayValue = document.getElementById("value");     // Value displayed on screen
let errorText = document.getElementById('errorText');
let MAX_LENGTH = 21;
let newFlag = false;  // To check if new calculation is started
let ops = ['+', '-', '/', '*'];
let operatorRegex = new RegExp('^(' + ops.map(function (op) { return '\\' + op; }).join('|') + ')$');

// Whenever a key is pressed, display its value on screen

function storeInput(e) {

    const key = e.key;
    if (e.type == 'click') {
        console.log(this.innerHTML);
        if (newFlag === true) { // check flag status to clear existing data if needed
            clearError();

        }
        if (this.id === 'undo') {
            displayValue.innerHTML = displayValue.innerHTML.slice(0, displayValue.innerHTML.length - 1);
            return 0;
        }
        else if (this.id === 'equals') {
            getSolution();
        }
        else if (this.id === 'clear') {
            displayValue.innerHTML = "";
        }

        else { // Save to variable to use in calculation 
            addToDisplay(this.innerHTML);
        }


    }
    if (e.type === 'keyup' && e.key) {
        console.log(key);
        if (newFlag === true) { // check flag status to clear existing data if needed
            clearError();

        }
        else if (operatorRegex.test(key) || /([0-9])/.test(key)) {
            if (key.length > 1) return 0;
            displayValue.innerHTML += key;
        }
        else if (key === 'Backspace') {
            displayValue.innerHTML = displayValue.innerHTML.slice(0, displayValue.innerHTML.length - 1);

        }
        else if (key === 'Enter') {
            getSolution();

        }
        else if (key === 'Delete') {
            displayValue.innerHTML = "";
        }
        else if (key === '.' || key === ',') {
            displayValue.innerHTML += '.';
        }
        else return 0;
    }
    if (isFull(displayValue.innerHTML)) {
        displayValue.innerHTML = displayValue.innerHTML.slice(0, displayValue.innerHTML.length - 1);
        errorText.innerHTML = 'Display full';
        return 0;
    }
}



// Create a an arrray of operators and operands from displayValue -> calculate -> display solution
function getSolution() {
    let calcArr = [];
    let solution;

    calcArr = displayValue.innerHTML.split(/([*/+-])/); // Split operands with operators into an array

    // Regex leaves leaves an empty string if first element is operator
    // in that case we turn it into 0 so we can start with negative numbers
    if (calcArr[0] === '') {
        calcArr[0] = '0';
    }
    if (calcArr.length === 1) return 0;

    solution = calculate(calcArr); // Calculate with array elements

    if (solution === 'Can\'t divide by 0'){
        newFlag = true;
        errorText.innerHTML = 'Can\'t divide by 0';
        return 0;
    }
    if (isNaN(solution)) { // if solution is NaN, user must've entered malformed expression
        newFlag = true;
        errorText.innerHTML = 'Malformed expression';
        return 0;
    }
    displayValue.innerHTML = solution;
    newFlag = true; // set flag after showing solution
}



// Count & return amount of operators in an array
function operatorsInArray(arr) {
    let count = 0;
    for (let i = 0; i < arr.length; i++) {
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
*   Returns:    rouded (if needed to fit the screen) final solution
****************************************************************************************************/
function calculate(calcArr) {
    let subSolution = 0;
    let tempArr = calcArr;
    let a, b, op;
    let idx, tempIdx1, tempIdx2;
    let operations = operatorsInArray(calcArr);

    for (let i = 0; i < operations; i++) {   //Loop as many times as there are operators
        if (tempArr.includes('/')) {     //Check if calculation contains divison
            idx = tempArr.indexOf('/'); //Set idx as the index of first '/'
        }
        else if (tempArr.includes('*')) { // Multiplication next
            idx = tempArr.indexOf('*');
        }
        else if (tempArr.includes('+') || (tempArr.includes('-'))) { // Check + & -
            tempIdx1 = tempArr.indexOf('+'); // Returns -1 if not found
            tempIdx2 = tempArr.indexOf('-');
            if (tempIdx1 === -1) idx = tempIdx2; // If not found -> set  the other one as idx
            else if (tempIdx2 === -1) idx = tempIdx1;
            else idx = Math.min(tempIdx1, tempIdx2); // if both found -> set lowest index as idx
        }                                            // to calculate from left to right

        a = tempArr[idx - 1];     //oprand before operator
        op = tempArr[idx];      //operator idx that will be calculated now
        b = tempArr[idx + 1];     //operand after operator

        subSolution = operate(a, op, b); // operate

        tempArr.splice(idx - 1, 3); // remove the operands/operator just used form the array

        if (tempArr.length !== 0) { // if there are still operations to be done in an array
            tempArr.splice(idx - 1, 0, subSolution); // add subSolution where it was located before operating
            console.log(tempArr);

        }
        else {
            console.log(subSolution);
            tempArr[0] = subSolution;
            return round(subSolution); // if the array is empty, return (rounded solution if too long) solution
        }
    }
}

displayValue.innerHTML = "";
function clearError() {
    
    errorText.innerHTML = "";
    newFlag = false; // reset flag status
}

function round(solution) {
    sSolution = solution.toString();

    if (sSolution.includes('.')) {
        let idx = sSolution.indexOf('.');
        let decimals = sSolution.length - (idx + 1);

        if (decimals > 4) { // if - return shorter solution
            return parseFloat(solution).toFixed(3).replace(/0+$/, ""); // replace trailing zeros

        }
    }
    return solution;
}

function isFull(display) {

    if (errorText.innerHTML === 'Malformed expression' || 'Can\'t divide by 0') {
        // don't clear text
    }
    else errorText.innerHTML = ''; // clear errorText

    if (display.length > MAX_LENGTH) {
        return true;
    }
    else return false;
}

// TODO 


// 3. ability to go back after malformed experssion 