const display = document.getElementById("display");
const historyList = document.getElementById("historyList");

function clearDisplay() {
  display.value = "";
}

function appendToDisplay(value) {
  display.value += value;
}

function calculateResult() {
  try {
    const result = eval(display.value);
    const operation = display.value + " = " + result;
    display.value = result;
    saveToHistory(operation);
    clearDisplay();
  } catch (error) {
    display.value = "Error";
    saveToHistory(display.value); // Hata durumunda sadece "Error" kaydedin
  }
}

function squareNumber() {
  if (display.value !== "") {
    const value = parseFloat(display.value);
    const result = Math.pow(value, 2);
    const operation = value + "² = " + result;
    display.value = result;
    saveToHistory(operation);
    clearDisplay();
  }
}

function sqrtNumber() {
  if (display.value !== "") {
    const value = parseFloat(display.value);
    const result = Math.sqrt(value);
    const operation = "√" + value + " = " + result;
    display.value = result;
    saveToHistory(operation);
    clearDisplay();
  }
}

function deleteLast() {
  display.value = display.value.slice(0, -1);
}

function saveToHistory(operation) {
  let history = JSON.parse(localStorage.getItem("calcHistory")) || [];
  history.push(operation);
  localStorage.setItem("calcHistory", JSON.stringify(history));
  updateHistoryList();
}

function updateHistoryList() {
  let history = JSON.parse(localStorage.getItem("calcHistory")) || [];
  historyList.innerHTML = "";
  if (Array.isArray(history)) {
    history.forEach((operation, index) => {
      let li = document.createElement("li");
      li.textContent = operation;

      // Silme butonunu oluştur
      let deleteBtn = document.createElement("span");
      deleteBtn.className = "delete-btn";
      deleteBtn.onclick = () => deleteHistoryItem(index);
      deleteBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x-circle">
          <circle cx="12" cy="12" r="10"/>
          <line x1="15" y1="9" x2="9" y2="15"/>
          <line x1="9" y1="9" x2="15" y2="15"/>
        </svg>
      `;

      li.appendChild(deleteBtn);
      historyList.appendChild(li);
    });
  }
}

function deleteHistoryItem(index) {
  let history = JSON.parse(localStorage.getItem("calcHistory")) || [];
  history.splice(index, 1);
  localStorage.setItem("calcHistory", JSON.stringify(history));
  updateHistoryList();
}

window.onload = function () {
  updateHistoryList();
};
