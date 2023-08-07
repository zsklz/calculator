const display = app.querySelector('#display');
const displayableButtons = app.querySelectorAll('.displayable');
displayableButtons.forEach((button) => {
    button.addEventListener('click', (event) => {display.textContent += `${event.target.textContent}`});
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

