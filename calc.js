const display = app.querySelector('#display');
const mainDisplay = display.querySelector('#main');
const secondaryDisplay = display.querySelector('#secondary');
const digits = app.querySelectorAll('.btn.digit');
const operators = app.querySelectorAll('.btn.operator');
const decimalPoint = app.querySelector('#decimal');
const equal = app.querySelector('#equal');
const ac = app.querySelector('#ac');
const del = app.querySelector('#del');
let decimalLock = false;
let operationLock = false;
let equalLock = false;
let divByZeroLock = false;

digits.forEach((button) => {
    button.addEventListener('click', () => {
	if (divByZeroLock) {
	    allClear();
	}
	if (operationLock) {
	    mainDisplay.textContent = "";
	    operationLock = false;
	}
	if (mainDisplay.textContent.length < 16) {
	    mainDisplay.textContent += `${event.target.textContent}`;
	}
    });
});

decimalPoint.addEventListener('click', (event) => {
    if (mainDisplay.textContent.length < 16 && !decimalLock) {
	if (operationLock) {
	    mainDisplay.textContent = "";
	    operationLock = false;
	}
	decimalLock = true;
	mainDisplay.textContent += `${event.target.textContent}`;
    }
});

operators.forEach((operator) => {
    operator.addEventListener('click', (event) => {
	if (divByZeroLock) return;
	if (mainDisplay.textContent) {
	    operation.n0 = Number(mainDisplay.textContent);
	    operation.operator = event.target.textContent;
	    mainDisplay.textContent = "";
	    secondaryDisplay.textContent = `${operation.n0} ${operation.operator} `;
	    equalLock = false;
	    decimalLock = false;
	    operationLock = true;

	}
	else if (operation.operator) {
	    operation.operator = event.target.textContent;
	    secondaryDisplay.textContent = `${operation.n0} ${operation.operator} `;
	}
    });
});

equal.addEventListener('click', () => {
    if (operation.operator && !equalLock) {
	equalLock = true;
	if (!mainDisplay.textContent) {
	    if (operation.operator === '*' || operation.operator === '/')
		operation.n1 = 1;
	    else operation.n1 = 0;
	}
	else operation.n1 = Number(mainDisplay.textContent);
	secondaryDisplay.textContent += `${operation.n1} =`;
	let ans = operate(operation);
	if (operation.n1 === 0 && operation.operator === '/') {
	    mainDisplay.textContent = 'Division by 0 error';
	    divByZeroLock = true;
	}
	else if (Number.isInteger(ans)) {
	    mainDisplay.textContent = ans;
	}
	else {
	    mainDisplay.textContent = ans.toFixed(4);
	    decimalLock = true;
	}
    }
});

function allClear() {
    operation.n0 = null;
    operation.n1 = null;
    operation.operator = null;
    mainDisplay.textContent = "";
    secondaryDisplay.textContent = "";
    decimalLock = false;
    operationLock = false;
    equalLock = false;
    divByZeroLock = false;
}

ac.addEventListener('click', allClear);

del.addEventListener('click', () => {
    if (!divByZeroLock) {
	let newContent = mainDisplay.textContent.slice(0, -1);
	mainDisplay.textContent = newContent;
	if (!mainDisplay.textContent.includes('.'))
	    decimalLock = false;
    }
});

const operation = {
    n0: null,
    n1: null,
    operator: null
}

function operate(operation) {
    switch (operation.operator) {
    case '+':
	return operation.n0 + operation.n1;
	break;
    case '-':
	return operation.n0 - operation.n1;
	break;
    case '*':
	return operation.n0 * operation.n1;
	break;
    case '/':
	return operation.n0 / operation.n1;
	break;
    default:
	return undefined;
    }
}

