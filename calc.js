const display = app.querySelector('#display');
const mainDisplay = display.querySelector('#main');
const secondaryDisplay = display.querySelector('#secondary');
const digits = app.querySelectorAll('.btn.digit');
const operators = app.querySelectorAll('.btn.operator');
const decimalPoint = app.querySelector('#decimal');
const equal = app.querySelector('#equal');
let isDecimal = false;
// this should be called operationLock to be precise
let operationLock = false;

digits.forEach((button) => {
    button.addEventListener('click', () => {
	// TODO make event listener a separate function
	if (operationLock){
	    mainDisplay.textContent = "";
	    operationLock = false;
	}
	if (mainDisplay.textContent.length < 16) {
	    mainDisplay.textContent += `${event.target.textContent}`;
	}
    });
});

decimalPoint.addEventListener('click', (event) => {
    if (mainDisplay.textContent.length < 16 && !isDecimal) {
	if (operationLock) {
	    mainDisplay.textContent = "";
	    operationLock = false;
	}
	isDecimal = true;
	mainDisplay.textContent += `${event.target.textContent}`;
    }
});

operators.forEach((operator) => {
    operator.addEventListener('click', (event) => {
	if (mainDisplay.textContent) {
	    secondaryDisplay.textContent = `${mainDisplay.textContent} ${event.target.textContent} `;
	    operation.n0 = Number(mainDisplay.textContent);
	    operation.operator = event.target.textContent;
	    isDecimal = false;
	    operationLock = true;
	}
    });
});

equal.addEventListener('click', () => {
    if (operation.n0 && operation.operator && mainDisplay.textContent) {
	operation.n1 = Number(mainDisplay.textContent);
	secondaryDisplay.textContent += `${mainDisplay.textContent} =`;
	let ans = operate(operation);
	if (operation.n1 === 0) {
	    mainDisplay.textContent = 'Division by 0 error';
	}
	else if (Number.isInteger(ans)) {
	    mainDisplay.textContent = ans;
	}
	else {
	    mainDisplay.textContent = ans.toFixed(4);
	    isDecimal = true;
	}
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

