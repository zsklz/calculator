const display = app.querySelector('#display');
const mainDisplay = display.querySelector('#main');
const secondaryDisplay = display.querySelector('#secondary');
const digits = app.querySelectorAll('.btn.digit');
const operators = app.querySelectorAll('.btn.operator');
const decimalPoint = app.querySelector('#decimal');
const equal = app.querySelector('#equal');
let isDecimal = false;
// this should be called operationLock to be precise
let operationPending = false;

digits.forEach((button) => {
    button.addEventListener('click', () => {
	// TODO make event listener a separate function
	if (operationPending){
	    mainDisplay.textContent = "";
	    operationPending = false;
	}
	if (mainDisplay.textContent.length < 16) {
	    mainDisplay.textContent += `${event.target.textContent}`;
	}
    });
});

decimalPoint.addEventListener('click', (event) => {
    if (mainDisplay.textContent.length < 16 && !isDecimal) {
	if (operationPending) {
	    mainDisplay.textContent = "";
	    operationPending = false;
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
	    operationPending = true;
	}
    });
});

equal.addEventListener('click', () => {
    if (operation.n0 && operation.operator && mainDisplay.textContent) {
	operation.n1 = Number(mainDisplay.textContent);
	secondaryDisplay.textContent += `${mainDisplay.textContent} =`;
	// TODO fix ans overflow screen for very large numbers/long decimals
	// should be easier to fix with operate() i think
	let ans = operate(operation);
	if (operation.n1 === 0) {
	    mainDisplay.textContent = 'Division by 0 error';
	}
	else if (Number.isInteger(ans)) {
	    if (ans.toString().length > 16)
		mainDisplay.textContent = ans.toExponential();
	    else
		mainDisplay.textContent = ans;
	}
	else {
	    mainDisplay.textContent = ans.toFixed(14);
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

