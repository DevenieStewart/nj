document.addEventListener('DOMContentLoaded', () => {
    const panelInput = document.getElementById('panel-input');
    const historyList = document.getElementById('history-list');
    let currentInput = '';
    let history = [];

    const updateHistory = (expression, result) => {
        history.push(`${expression} = ${result}`);
        if (history.length > 5) history.shift(); // Keep only the last 5 entries
        renderHistory();
    };

    const renderHistory = () => {
        historyList.innerHTML = history.map(item => `<li>${item}</li>`).join('');
    };

    const handleSpecialCharacters = (input) => {
        // Handle sqrt, pow, and exp functions
        input = input.replace(/sqrt\(([^)]+)\)/g, 'Math.sqrt($1)');
        input = input.replace(/(\d+)\^2/g, 'Math.pow($1, 2)');
        input = input.replace(/e\^([^\)]+)/g, 'Math.exp($1)');
        return input;
    };

    window.btnNbrClicked = (event) => {
        const button = event.target;
        const value = button.textContent;
        currentInput += value;
        panelInput.value = currentInput;
    };

    window.btnOpClicked = (event) => {
        const button = event.target;
        const value = button.textContent;
        if (value === '×') {
            currentInput += ' * ';
        } else if (value === '÷') {
            currentInput += ' / ';
        } else {
            currentInput += ` ${value} `;
        }
        panelInput.value = currentInput;
    };

    window.btnPercentClicked = () => {
        currentInput += ' /100';
        panelInput.value = currentInput;
    };

    window.btnEqualClicked = () => {
        try {
            let formattedInput = handleSpecialCharacters(currentInput);
            const result = eval(formattedInput); // Note: eval is dangerous in real-world apps
            panelInput.value = result;
            updateHistory(currentInput, result);
            currentInput = result.toString();
        } catch {
            panelInput.value = 'Error';
            currentInput = '';
        }
    };

    window.btnClearClicked = () => {
        currentInput = '';
        panelInput.value = '';
    };

    window.btnHistClicked = () => {
        const historyDiv = document.getElementById('history');
        historyDiv.style.display = historyDiv.style.display === 'block' ? 'none' : 'block';
    };

    window.btnDeleteClicked = () => {
        currentInput = currentInput.slice(0, -1);
        panelInput.value = currentInput;
    };
});
