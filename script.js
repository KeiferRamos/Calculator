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
CreateBtn(`<i class="fas fa-arrow-left"></i>`, deleteOnclick);
CreateBtn("=", equalsOnClick);

function CreateBtn(i, BtnOnClick) {
  const btn = document.createElement("button");
  btn.innerHTML = i;
  if (btn.innerHTML == `<i class="fas fa-arrow-left"></i>`) {
    btn.style.color = "red";
  } else if (btn.innerHTML == "=") {
    btn.style.background = "#1a2130";
    btn.style.color = "#fff";
  } else {
    btn.style.background = "#071114";
    btn.style.color = "#fff";
  }
  btn.addEventListener("click", (e) => BtnOnClick(e));
  buttons.append(btn);
}

function numberOnClick(e) {
  inputText.innerHTML += e.target.innerHTML;
}

function operatorOnClick(e) {
  const inputs = inputText.innerHTML;
  const lastChar = Array.from(inputs).pop();
  if (!inputs || (inputs.slice(-1) == "." && isNaN(inputs.slice(-2)))) {
    return;
  } else if (
    inputs.slice(-1) == "." &&
    operators.includes(inputs.charAt(inputs.length - 2))
  ) {
    return;
  } else if (operators.includes(lastChar)) {
    inputText.innerHTML =
      inputs.substring(0, inputs.length - 1) + e.target.innerHTML;
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
  if (answer.innerHTML == "Error") {
    inputText.innerHTML = 0;
  } else {
    inputText.innerHTML = answer.innerHTML;
  }
}

function equalsOnClick() {
  if (operators.includes(Array.from(inputText.innerHTML).pop())) {
    return;
  } else {
    const input = inputText.value;
    let n = input.split(/[−,+,÷,×]+/);
    const operator = [];
    Array.from(input).forEach((el) => {
      if (operators.includes(el)) {
        operator.push(el);
      }
    });
    let i1 = 0;
    let i2 = 1;
    let notDone = false;
    while (i1 < operator.length) {
      n.splice(i2, 0, operator[i1]);
      i1++;
      i2 += 2;
    }
    n = n.map((el) => {
      return { count: el, id: Math.random() };
    });
    console.log(n[n.length - 1]);
    if (operators.includes(n[n.length - 1])) {
      return;
    }
    while (!notDone) {
      if (!n.some((el) => operator.includes(el.count))) {
        notDone = true;
      }
      let num1, num2;
      for (var i = 0; i < n.length; i++) {
        if (n.some((el) => el.count == "×" || el.count == "÷")) {
          if (n[i].count == "×" || n[i].count == "÷") {
            num1 = n[i - 1].count;
            num2 = n[i + 1].count;
            if (n[i].count === "×") {
              n.splice(n.indexOf(n[i - 1]), 3, {
                count: num1 * num2,
                id: Math.random(),
              });
              break;
            } else {
              n.splice(n.indexOf(n[i - 1]), 3, {
                count: num1 / num2,
                id: Math.random(),
              });
              break;
            }
          }
        } else {
          if (n[i].count == "−" || n[i].count == "+") {
            num1 = +n[i - 1].count;
            num2 = +n[i + 1].count;
            if (n[i].count == "+") {
              n.splice(n.indexOf(n[i - 1]), 3, {
                count: num1 + num2,
                id: Math.random(),
              });
              break;
            } else if (n[i].count == "−") {
              n.splice(n.indexOf(n[i - 1]), 3, {
                count: num1 - num2,
                id: Math.random(),
              });
              console.log([...n]);
              break;
            }
          }
        }
      }
    }
    if (n[0].count == "Infinity" || isNaN(n[0].count)) {
      answer.innerHTML = "Error";
    } else if (`${n[0].count}`.includes(".") && `${n[0].count}`.length > 5) {
      answer.innerHTML = +n[0].count.toFixed(1);
    } else {
      answer.innerHTML = n[0].count;
    }
  }
}
