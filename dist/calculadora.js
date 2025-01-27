let currentInput = '';
let previousInput = '';
let operation = '';
let history = JSON.parse(localStorage.getItem('calculations')) || [];


function addNumber(number) {
    currentInput += number;
    updateDisplay();
}


function setOperation(op) {
    if (currentInput === '') return; 
    if (previousInput !== '') {
        calculateResult(); 
    }
    operation = op; 
    previousInput = currentInput; 
    currentInput = ''; 
}

function calculateResult() {
    let result;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);
    if (isNaN(prev) || isNaN(current)) return; 

    switch (operation) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            result = prev / current;
            break;
        default:
            return;
    }


    const calculation = `${previousInput} ${operation} ${current} = ${result}`;
    history.push(calculation);
    localStorage.setItem('calculations', JSON.stringify(history));

    currentInput = result;
    operation = '';
    previousInput = ''; 
    updateDisplay();
    updateHistory(); 
}

function clearDisplay() {
    currentInput = '';
    previousInput = '';
    operation = '';
    updateDisplay();
}

function updateDisplay() {
    document.getElementById('display').innerText = currentInput || '0'; // Mostrar 0 si no hay entrada
}

function updateHistory() {
    const historyList = document.getElementById('historyList');
    historyList.innerHTML = '';
    history.forEach((calc, index) => {
        const li = document.createElement('li');
        li.innerText = calc;
        li.appendChild(createDeleteButton(index));
        historyList.appendChild(li);
    });
}

function createDeleteButton(index) {
    const button = document.createElement('button');
    button.innerText = 'Borrar';
    button.className = 'btn btn-danger btn-sm ml-2';
    button.onclick = () => deleteCalculation(index);
    return button;
}

function deleteCalculation(index) {
    history.splice(index, 1);
    localStorage.setItem('calculations', JSON.stringify(history));
    updateHistory();
}

function clearHistory() {
    history = [];
    localStorage.removeItem('calculations');
    updateHistory();
}

function generateReceipt() {
    const receiptWindow = window.open('', '_blank');
    receiptWindow.document.write('<h1>Comprobante de Cálculos</h1>');
    history.forEach(calc => {
        receiptWindow.document.write(`<p>${calc}</p>`);
    });
    receiptWindow.document.close();
}

document.addEventListener('DOMContentLoaded', updateHistory);