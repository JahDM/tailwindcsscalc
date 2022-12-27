const add = function (num1, num2) {
  return Number(num1) + Number(num2);
};

const subtract = function (num1, num2) {
  return Number(num1) - Number(num2);
};

const multiply = function (num1, num2) {
  return Number(num1) * Number(num2);
};

const divide = function (num1, num2) {
  if (num2 === 0) {
    alert ('Cannot divide by 0');
  }
  return Number(num1) / Number(num2);
};

const percent = function (num1, num2) {
  return (Number(num1) / 100) * Number(num2);
};

const power = function (num1, num2) {
  return Number(num1) ** Number(num2);
};

const operations = {
  '+': add,
  '-': subtract,
  '*': multiply,
  '/': divide,
  '%': percent,
  '^': power,
};

const operate = function (operator, num1, num2) {
  if (num1 === null || num2 === null || operator === null) {
    alert ('Cannot perform calculation');
  }
  if (isNaN(num1) || isNaN(num2)) {
    alert ('Invalid input');
  }
  const operation = operations[operator];
  if (operation) {
    return operation.call(null, num1, num2);
  }
  alert ('Invalid operator');
};

const display = document.querySelector('.userInterfaceCalc');
const numberButtons = document.querySelectorAll('.number');
let currentNumber = '';
let result = 0;
let operator = null;
let firstNumber = null;
let secondNumber = null;


Array.from(numberButtons).forEach((button) => {
  button.addEventListener('click', () => {
    const value = button.textContent;
    switch (value) {
      case '.':
        if (currentNumber.includes('.')) {
          return;
        }
        currentNumber += '.';
        break;
      case 'C':
        currentNumber = '';
        result = 0;
        operator = null;
        firstNumber = null;
        secondNumber = null;
        break;
      case '+':
      case '-':
      case '*':
      case '/':
      case '%':
      case '^':
        if (currentNumber === '' && result === 0) {
          return;
        }
        if (operator === null) {
          firstNumber = result || Number(currentNumber);
          operator = value;
          currentNumber = '';
        } else {
          secondNumber = Number(currentNumber);
          console.log(`Performing operation: ${operator} ${firstNumber} ${secondNumber}`);
          result = operate(operator, firstNumber, secondNumber);
          console.log(`Result: ${result}`);
          firstNumber = result;
          operator = value;
          secondNumber = null;
          currentNumber = '';
        }
        break;
      case '=':
        if (currentNumber === '' || operator === null) {
          return;
        }
        secondNumber = Number(currentNumber);
        console.log(`Performing operation: ${operator} ${firstNumber} ${secondNumber}`);
        result = operate(operator, firstNumber, secondNumber);
        console.log(`Result: ${result}`);
        operator = null;
        firstNumber = null;
        secondNumber = null;
        currentNumber = '';
        break;
      default:
        currentNumber += value;
        break;
    }
    display.innerHTML = currentNumber || result;
  });
});
