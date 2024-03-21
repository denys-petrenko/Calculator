let numbers = document.querySelectorAll(".number");
let operators = document.querySelectorAll(".operator");
let output = document.querySelector(".output");
let outputHistory = document.querySelector(".outputHistory");
let equals = document.querySelector("#equals");
let clear = document.querySelector("#clear");

let digits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", ".", "%"];
let signs = ["+", "-", "*", "/", "C"];

let firstNumber = "";
let secondNumber = "";
let operator = "";
let result = "";
outputHistory.textContent = "";
output.textContent = "0";

numbers.forEach(item => item.addEventListener("click", createNumber));

function createNumber(e) {
    let key = e.target.textContent;
    if (digits.includes(key)) {
        if (secondNumber === "" && operator === "" && outputHistory.textContent === "") {
            if (key === ".") {
            if(!firstNumber.includes(".")) {
                firstNumber += firstNumber === "" ? "0." : key;
            }
            }
             else {
            firstNumber += key;
        }
            output.textContent = firstNumber;
        }
        if (firstNumber != "" && operator != "" && outputHistory.textContent === "") {
            if (key === ".") {
                if(!secondNumber.includes(".")) {
                    secondNumber += secondNumber === "" ? "0." : key;
                }
                }
                 else {
                secondNumber += key;
            }
            output.textContent = firstNumber + " " + operator + " " + secondNumber;
        }
        if (firstNumber != "" && operator != "=" && outputHistory.textContent != "") {
            if (key === ".") {
                if(!secondNumber.includes(".")) {
                    secondNumber += secondNumber === "" ? "0." : key;
                }
                }
                 else {
                secondNumber += key;
            }
            output.textContent = secondNumber;
        }
    }
    if (key === "%") {
        calculatePercent();
    }
};

operators.forEach(item => item.addEventListener("click", createOperator));

function createOperator(e) {
    let key = e.target.textContent;
    if (signs.includes(key)) {
        if (key === "C") {
            firstNumber = "";
            secondNumber = "";
            operator = "";
            output.textContent = "0";
            outputHistory.textContent = "";
        }
        if (firstNumber != "" && operator === "" && outputHistory.textContent === "") {
            operator = "";
            operator += key;
            output.textContent = firstNumber + " " + operator;
        }
        if (firstNumber != "" && operator === "" && outputHistory.textContent != "") {
            firstNumber = outputHistory.textContent;
            operator = "";
            operator += key;
            output.textContent = secondNumber;
            outputHistory.textContent = result + " " + operator;
        }
        if (firstNumber != "" && operator != "" && secondNumber === "") {
            operator = "";
            operator += key;
            output.textContent = secondNumber;
            outputHistory.textContent = firstNumber + " " + operator;
        }
        if (firstNumber != "" && operator != "" && secondNumber != "") {
            output.textContent = calculate();
            operator = "";
            secondNumber = "";
            output.textContent = "";
            firstNumber = result;
            operator = key;
            outputHistory.textContent = firstNumber + " " + operator;
        }
        if (key === "-" && firstNumber === "") {
            firstNumber += key;
            output.textContent = firstNumber;
        }
    }
    if (key === "=") {
        output.textContent = calculate();
        operator = "";
        secondNumber = "";
        output.textContent = "";
        outputHistory.textContent = result;
    }
};

document.addEventListener("keydown", (e) => {
    let key = e.key;
    if (digits.includes(key)) {
        if (secondNumber === "" && operator === "" && outputHistory.textContent === "") {
            if (key === ".") {
            if(!firstNumber.includes(".")) {
                firstNumber += firstNumber === "" ? "0." : key;
            }
            }
             else {
            firstNumber += key;
        }
            output.textContent = firstNumber;
        }
        if (firstNumber != "" && operator != "" && outputHistory.textContent === "") {
            if (key === ".") {
                if(!secondNumber.includes(".")) {
                    secondNumber += secondNumber === "" ? "0." : key;
                }
                }
                 else {
                secondNumber += key;
            }
            output.textContent = firstNumber + " " + operator + " " + secondNumber;
        }
        if (firstNumber != "" && operator != "=" && outputHistory.textContent != "") {
            if (key === ".") {
                if(!secondNumber.includes(".")) {
                    secondNumber += secondNumber === "" ? "0." : key;
                }
                }
                 else {
                secondNumber += key;
            }
            output.textContent = secondNumber;
        }
    }
    if (key === "%") {
        calculatePercent();
    }
    if (signs.includes(key)) {
        if (firstNumber != "" && operator === "" && outputHistory.textContent === "") {
            operator = "";
            operator += key;
            output.textContent = firstNumber + " " + operator;
        }
        if (firstNumber != "" && operator === "" && outputHistory.textContent != "") {
            firstNumber = outputHistory.textContent;
            operator = "";
            operator += key;
            output.textContent = secondNumber;
            outputHistory.textContent = result + " " + operator;
        }
        if (firstNumber != "" && operator != "" && secondNumber === "") {
            operator = "";
            operator += key;
            output.textContent = secondNumber;
            outputHistory.textContent = firstNumber + " " + operator;
        }
        if (firstNumber != "" && operator != "" && secondNumber != "") {
            output.textContent = calculate();
            operator = "";
            secondNumber = "";
            output.textContent = "";
            firstNumber = result;
            operator = key;
            outputHistory.textContent = firstNumber + " " + operator;
        }
        if (key === "-" && firstNumber === "") {
            firstNumber += key;
            output.textContent = firstNumber;
        }
    }
    if (key === "Enter") {
        output.textContent = calculate();
        operator = "";
        secondNumber = "";
        output.textContent = "";
        outputHistory.textContent = result;
    }
});

function calculate() {
    switch (operator) {
        case '+':
            return result = (+firstNumber) + (+secondNumber);
        case '-':
            return result = firstNumber - secondNumber;
        case '*':
            return result = firstNumber * secondNumber;
        case '/':
            return secondNumber != 0 ? result = firstNumber / secondNumber : result = "Error";
    }
};

function calculatePercent() {
    if (secondNumber === "") {
        let arr = firstNumber.split("");
        arr.splice(-1);
        firstNumber = arr.join("");
        outputHistory.textContent = firstNumber / 100;
        output.textContent = "";
    } else if (secondNumber != "") {
        let percent = getPercent();
        secondNumber = percent;
        output.textContent = percent;
    }
};

function getPercent() {
    let arr = secondNumber.split("");
    arr.splice(-1);
    secondNumber = arr.join("");
    switch (operator) {
        case '+':
        case '-':
            return firstNumber * secondNumber / 100;
        case '/':
        case '*':
            return secondNumber / 100;
    }
};