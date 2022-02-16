const buttons = document.querySelector(".buttons");
const inputText = document.getElementById("input");
const answer = document.getElementById("answer");
const operators = ["+", "−", "÷", "×"];

for (var i = 0; i < 10; i++) {
  CreateBtn(i, numberOnClick);
}

CreateBtn(".", dotOnClick);
CreateBtn("-|+", negativeOnClick);
operators.forEach((operator) => CreateBtn(operator, operatorOnClick));
CreateBtn("C", clearOnClick);
CreateBtn("ans", answerOnClick);
CreateBtn(`<i class="fa-solid fa-delete-left"></i>`, deleteOnclick);
CreateBtn("=", equalsOnClick);

function CreateBtn(i, BtnOnClick) {
  const btn = document.createElement("button");
  btn.innerHTML = i;
  btn.addEventListener("click", (e) => BtnOnClick(e));
  buttons.append(btn);
}

function numberOnClick(e) {
  inputText.innerHTML += e.target.innerHTML;
}

function operatorOnClick(e) {
  const inputs = inputText.innerHTML;
  if ((isNaN(inputs.slice(-1)) && inputs.slice(-1) != ".") || !inputs) {
    return;
  } else if (
    inputs.slice(-1) == "." &&
    operators.includes(inputs.charAt(inputs.length - 2))
  ) {
    return;
  } else {
    inputText.innerHTML += e.target.innerHTML;
  }
}

function deleteOnclick() {
  const inputs = inputText.innerHTML;
  inputText.innerHTML = inputs.substring(0, inputs.length - 1);
}

function dotOnClick() {
  const userInputs = inputText.innerHTML;
  const numbers = userInputs.split(/[−,+,÷,×]+/);
  if (!numbers.pop().includes(".")) {
    inputText.innerHTML += ".";
  } else {
    return;
  }
}

function negativeOnClick() {
  const inputs = inputText.value;
  const n = inputs.split(/[−,+,÷,×]+/);
  const lastNum = n.pop();
  inputText.innerHTML = inputs.replace(new RegExp(lastNum + "$"), lastNum * -1);
}

function clearOnClick() {
  inputText.innerHTML = "";
  answer.innerHTML = "";
}

function answerOnClick() {
  inputText.innerHTML = answer.innerHTML;
}

function equalsOnClick() {
  const input = inputText.value;
  const n = input.split(/[−,+,÷,×]+/);
  const operator = [];
  Array.from(input).forEach((el) => {
    if (operators.includes(el)) {
      operator.push(el);
    }
  });
  let i1 = 0;
  let i2 = 1;
  while (i1 < operator.length) {
    n.splice(i2, 0, operator[i1]);
    i1++;
    i2 += 2;
  }
  while (
    n.includes("−") ||
    n.includes("×") ||
    n.includes("÷") ||
    n.includes("+")
  ) {
    let num1, num2;
    for (var i = 0; i < n.length; i++) {
      if (n.includes("×") || n.includes("÷")) {
        if (n[i] == "×" || n[i] == "÷") {
          num1 = +n[i - 1];
          num2 = +n[i + 1];
          if (n[i] == "×") {
            n.splice(n.indexOf(n[i - 1]), 3, num1 * num2);
          } else {
            n.splice(n.indexOf(n[i - 1]), 3, num1 / num2);
          }
        }
      } else {
        if (n[i] == "−" || n[i] == "+") {
          num1 = +n[i - 1];
          num2 = +n[i + 1];
          if (n[i] == "−") {
            n.splice(n.indexOf(n[i - 1]), 3, num1 - num2);
          } else {
            n.splice(n.indexOf(n[i - 1]), 3, num1 + num2);
          }
        }
      }
    }
  }
  answer.innerHTML = n[0];
}
