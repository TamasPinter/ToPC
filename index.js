let firstNumber = "";
let secondNumber = "";
let currentOperator = null;
let shouldResetScreen = false;

const displayHistory = document.getElementById("displayHistory");
const displayResult = document.getElementById("displayMain");
const numberBtns = document.querySelectorAll("[number]");
const operationBtns = document.querySelectorAll("[operation]");
const equalsBtn = document.getElementById("equalsBtn");
const clearBtn = document.getElementById("clearBtn");
const deleteBtn = document.getElementById("backspaceBtn");
const decimalBtn = document.getElementById("decimalBtn");

window.addEventListener("keydown", handleKeyboardInput);
clearBtn.addEventListener("click", clear);
deleteBtn.addEventListener("click", deleteNumber);
equalsBtn.addEventListener("click", calculate);
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
  if (e.key === "=" || e.key === "Enter") calculate();
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
  if (displayResult.textContent === "0" || shouldResetScreen);
  shouldResetScreen();
  displayResult.textContent += number;
}

function reetScreen() {
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
