let firstNumber = "";
let secondNumber = "";
let currentOperator = null;
let shouldResetScreen = false;

const displayHistory = document.getElementById("displayHistory");
const displayResult = document.getElementById("displayMain");
const numberBtns = document.querySelectorAll("[data-number]");
const operationBtns = document.querySelectorAll("[data-operator]");
const equalsBtn = document.getElementById("equalsBtn");
const clearBtn = document.getElementById("clearBtn");
const deleteBtn = document.getElementById("backspaceBtn");
const decimalBtn = document.getElementById("decimalBtn");
const previousTotals = document.getElementById("previousTotals");

window.addEventListener("keydown", handleKeyboardInput);
clearBtn.addEventListener("click", clear);
deleteBtn.addEventListener("click", deleteNumber);
equalsBtn.addEventListener("click", evaluate);
decimalBtn.addEventListener("click", addDecimal);

numberBtns.forEach((button) =>
  button.addEventListener("click", () => setNumber(button.textContent))
);
operationBtns.forEach((button) =>
  button.addEventListener("click", () => setOperation(button.textContent))
);

function handleKeyboardInput(e) {
  if (e.key >= 0 && e.key <= 9) setNumber(e.key);
  if (e.key === ".") addDecimal();
  if (e.key === "=" || e.key === "Enter") evaluate();
  if (e.key === "Backspace") deleteNumber();
  if (e.key === "Escape") clear();
  if (e.key === "+" || e.key === "-" || e.key === "*" || e.key === "/")
    setOperation(convertOperation(e.key));
}

function convertOperation(keyboardOperator) {
  if (keyboardOperator === "+") return "+";
  if (keyboardOperator === "-") return "-";
  if (keyboardOperator === "*") return "*";
  if (keyboardOperator === "/") return "/";
}

const add = function (a, b) {
  return a + b;
};

const subtract = function (a, b) {
  return a - b;
};

const multiply = function (a, b) {
  return a * b;
};

const divide = function (a, b) {
  return a / b;
};

function setNumber(number) {
  if (displayResult.textContent === "0" || shouldResetScreen) {
    resetScreen();
  }
  displayResult.textContent += number;
  shouldResetScreen = false;
}

function resetScreen() {
  displayResult.textContent = "";
  shouldResetScreen = false;
}

function clear() {
  displayResult.textContent = "0";
  displayHistory.textContent = "";
  firstNumber = "";
  secondNumber = "";
  currentOperator = null;
}

function deleteNumber() {
  displayResult.textContent = displayResult.textContent.toString().slice(0, -1);
}

function addDecimal() {
  if (shouldResetScreen) resetScreen();
  if (displayResult.textContent === "") displayResult.textContent = "0";
  if (displayResult.textContent.includes(".")) return;
  displayResult.textContent += ".";
}

function setOperation(operator) {
  if (currentOperator !== null) evaluate();
  firstNumber = displayResult.textContent;
  currentOperator = operator;
  displayHistory.textContent = `${firstNumber} ${currentOperator}`;
  shouldResetScreen = true;
}

function resultRound(number) {
  return Math.round(number * 1000) / 1000;
}

function calculate(operator, a, b) {
  a = Number(a);
  b = Number(b);
  switch (operator) {
    case "+":
      return add(a, b);
    case "-":
      return subtract(a, b);
    case "*":
      return multiply(a, b);
    case "/":
      return divide(a, b);
    default:
      return null;
  }
}

function evaluate() {
  if (currentOperator === null || shouldResetScreen) return;
  if (currentOperator === "/" && displayResult.textContent === "0") {
    alert("You can't divide by 0!");
    return;
  }
  secondNumber = displayResult.textContent;

  // Calculate the result
  const result = resultRound(
    calculate(currentOperator, firstNumber, secondNumber)
  );

  // Create a new element to hold the operation and result
  const operationText = `${firstNumber} ${currentOperator} ${secondNumber} = ${result}`;
  const operationElement = document.createElement("div");
  //add style to div
  operationElement.classList.add("previousTotals");
  operationElement.textContent = operationText;

  // Append the element to the previousTotals div
  const previousTotals = document.getElementById("previousTotals");
  previousTotals.appendChild(operationElement);

  // Update the display
  displayResult.textContent = result;
  displayHistory.textContent = operationText;

  currentOperator = null;
}
