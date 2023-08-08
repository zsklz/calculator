const display = app.querySelector('#display');
const mainDisplay = display.querySelector('#main');
const secondaryDisplay = display.querySelector('#secondary');
const digits = app.querySelectorAll('.btn.digit');
const decimalPoint = app.querySelector('#decimal');
let isDecimal = false;

digits.forEach((button) => {
    button.addEventListener('click', () => {
	// TODO make event listener a separate function
	if (mainDisplay.textContent.length < 16) {
	    mainDisplay.textContent += `${event.target.textContent}`;
	}
    });
});

decimalPoint.addEventListener('click', () => {
    if (mainDisplay.textContent.length < 16 && !isDecimal) {
	isDecimal = true;
	mainDisplay.textContent += `${event.target.textContent}`;
    }
});

const operation = {
    n0: undefined,
    n1: undefined,
    operator: undefined
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

