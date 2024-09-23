const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');
let currentInput = '';
let operator = '';
let firstOperand = null;

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.getAttribute('data-value');
        
        if (value === 'C') {
            clearDisplay();
        } else if (value === '=') {
            calculate();
        } else {
            handleInput(value);
        }
    });
});

function handleInput(value) {
    if (['+', '-', '*', '/'].includes(value)) {
        if (currentInput) {
            firstOperand = parseFloat(currentInput);
            operator = value;
            currentInput = '';
        }
    } else {
        currentInput += value;
        display.value = currentInput;
    }
}

function calculate() {
    if (firstOperand !== null && operator && currentInput) {
        const secondOperand = parseFloat(currentInput);
        let result;

        switch (operator) {
            case '+':
                result = firstOperand + secondOperand;
                break;
            case '-':
                result = firstOperand - secondOperand;
                break;
            case '*':
                result = firstOperand * secondOperand;
                break;
            case '/':
                result = firstOperand / secondOperand;
                break;
        }

        display.value = result;
        currentInput = '';
        firstOperand = null;
        operator = '';
    }
}

function clearDisplay() {
    currentInput = '';
    firstOperand = null;
    operator = '';
    display.value = '';
}
