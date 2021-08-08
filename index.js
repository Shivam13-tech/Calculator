let holdingPreviousValue = 0; //this will save the value you type before clicking for an operation
let initialScreen = "0";    //this will save the value of whats on the screen and what user types
let holdingPreviousOperator = null;  //this will save the operator you selected to perform an operation

let screen = document.querySelector('.screen')


function buttonClick(value) {   //2. The button click function gets the user input and checks // here value is parameter
    if (isNaN(value)) {    //is Nan is a function in javascript that will tell you if a data is number or not so you only deal and 
        handleSymbol(value) // display numbers to the screen when you call it and not the symbols
    } else {
        handleNumber(value)     // now here both symbol and number gets user clicked parameter as argument for the function called
    }
    screen.innerText = initialScreen; // The screen needs to rewritten on any action of number or symbol so update it here instead of repeating
}

function handleSymbol(symbol) {
    if (symbol === "C") {   //4. if user selects symbol clear then we make the initial screen and the real value to be 0 by rewriting above
        initialScreen = '0';
        holdingPreviousValue = 0
        // screen.innerText = initialScreen;
    } else if (symbol === "←") { //5. if user request to backspace then reduce length by 1 string 
        initialScreen = initialScreen.substring(0, initialScreen.length - 1);
    } else if (symbol === "÷" || symbol === "×" || symbol === "−" || symbol === "+") {
        handleMath(symbol) // 6. if user selects any operation we call handle math where the argument is the symbol we get here 
    } else if (symbol === "=") {
        if (holdingPreviousOperator === null) {
            return // exit condition since user has not selected numbers to do maths
        } else {
            operation(parseInt(initialScreen))
            holdingPreviousOperator = null; //making everything null once a single operation is finished no holding back
            initialScreen = holdingPreviousValue;  // provide the user with the answer from operation
            holdingPreviousValue = 0; // going back to zero
        }
    }
}

function handleNumber(numberString) {    //3. if the value of initial screen is 0 then it will just be the default value else 
    if (initialScreen === "0") {          // it will take the value and update the initial value and concatinate those strings so it doesnt replace
        initialScreen = numberString;  // if 0 then just be the same value ie 0 initial
    } else {
        initialScreen += numberString;
    }
    // screen.innerText = initialScreen;  // we use the variable here holding the value of screen
}

function handleMath(symbol) {
    //7.This function takes the user input and conver it into int for operation
    // checks if previous value that was 0 then gives it the value user enters has int to store 
    // else if it has a value then we call the operation function and pass it the user entered number
    //Also we hold the symbol user clicked for operation by providing the symbol to previous operator

    // if (initialScreen === "0") {
    //     return;        // Get out of the function if user does 0 + or other operatio just exit if the value selected is 0
    // }
    const intInitialScreen = parseInt(initialScreen) // converts the user input into number from string
    if (holdingPreviousValue === 0) {
        holdingPreviousValue = intInitialScreen
    } else {
        operation(intInitialScreen)   // operation function that gets the number 
    }
    holdingPreviousOperator = symbol;    // the symbol which is added gets updated in the operator storing variable
    initialScreen = "0" // and the initial screen is again set to 0 
}

function operation(intInitialScreen) {   //8. It gets the value we converted into int has an parameter and now we just check operator and 
    // perform the operation of updating the previous value by the user input 
    if (holdingPreviousOperator === "+") {
        holdingPreviousValue += intInitialScreen
    } else if (holdingPreviousOperator === "−") {
        holdingPreviousValue -= intInitialScreen
    } else if (holdingPreviousOperator === "×") {
        holdingPreviousValue *= intInitialScreen
    } else {
        holdingPreviousValue /= intInitialScreen
    }
}



//1. This function just gets the user input and pass it forward to buttonclick function as argument
function init() {
    document.querySelector('.calc-buttons').addEventListener('click', function (event) {
        buttonClick(event.target.innerText);
    })
}

init()
