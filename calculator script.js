let currentInput = "";
let operator = "";
let previousInput = "";

const display = document.getElementById("display");

function updateDisplay(value) {
    display.value = value;
    display.scrollLeft = display.scrollWidth;
}

function clearDisplay() {
    currentInput = "";
    previousInput = "";
    operator = "";
    updateDisplay("0");
}

function handleButtonClick(event) {
    const buttonValue = event.target.textContent;
    processInput(buttonValue);
}

function processInput(input) {
    if ((input >= "0" && input <= "9") || input === ".") {
    currentInput += input;
    } else if (["+", "-", "*", "/"].includes(input)) {
    if (currentInput) {
        previousInput += currentInput + " " + input + " ";
        currentInput = "";
    } else if (previousInput) {
        previousInput = previousInput.slice(0, -3) + " " + input + " ";
    }
    } else if (input === "C") {
    clearDisplay();
    } else if (input === "=") {
    calculate();
    return;
    }

    if (currentInput === "" && previousInput === "") {
    updateDisplay("0");
    } else {
    updateDisplay(previousInput + currentInput);
    }
}

function calculate() {
    let expression = previousInput + currentInput;
    try {
    let result = eval(expression);
    currentInput = result.toString();
    previousInput = "";
    } catch {
    currentInput = "Error";
    }
    operator = "";
    updateDisplay(currentInput);
}

document.querySelectorAll(".calc-btn").forEach((button) => {
    button.addEventListener("click", handleButtonClick);
});

document.getElementById("equals").addEventListener("click", calculate);
document.getElementById("clear").addEventListener("click", clearDisplay);
updateDisplay("0");

document.addEventListener("keydown", (event) => {
    if (
    (event.key >= "0" && event.key <= "9") ||
    [".", "+", "-", "*", "/"].includes(event.key)
    ) {
    processInput(event.key);
    } else if (event.key === "Enter") {
        calculate();
    } else if (event.key === "Backspace") {
    if (currentInput) {
        currentInput = currentInput.slice(0, -1);
    } else if (previousInput) {
        previousInput = previousInput.slice(0, -1);
        if (previousInput.trim() === "") {
        previousInput = "";
        }
    }

    if (currentInput === "" && previousInput === "") {
        updateDisplay("0");
    } else {
        updateDisplay(previousInput + currentInput);
    }
    } else if (event.key.toUpperCase() === "C") {
    clearDisplay();
    } else if (event.key === "ArrowLeft") {
    moveCursor(-1);
    } else if (event.key === "ArrowRight") {
    moveCursor(1);
    }
});

function moveCursor(direction) {
    const value = display.value;
    const start = display.selectionStart;
    const end = display.selectionEnd;

    if (direction < 0 && start > 0) {
    display.setSelectionRange(start - 1, end - 1);
    } else if (direction > 0 && end < value.length) {
    display.setSelectionRange(start + 1, end + 1);
    }
}

display.addEventListener("click", (event) => {
    const rect = display.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const charWidth = display.clientWidth / display.value.length;
    const index = Math.floor(x / charWidth);
    display.setSelectionRange(index, index);
});

updateDisplay("0");

//Prabhu Prasad Das