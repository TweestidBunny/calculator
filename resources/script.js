const numberBtns = document.querySelectorAll('.number');
const operatorBtns = document.querySelectorAll('.operator');
const equalButton = document.querySelector('#equal');
const clearButton = document.querySelector('#clear');
const numDisplay = document.querySelector('#screenNumber');
const opDisplay = document.querySelector('#opSign');
const decimalBtn = document.querySelector('.decimal');

const calculator = {
  total: null,
  operand: ['1', '2'],
  operator: '+',
  math() {
    switch (this.operator) {
      case '+': this.total += +this.operand.join(''); break;
      case '-': this.total -= +this.operand.join(''); break;
      case '*': this.total *= +this.operand.join(''); break;
      case '/': this.total /= +this.operand.join(''); break;
    }
  },
  toScreen() {
    const decimalCheck = this.total.toString().includes('.');
    let content = null;

    if (decimalCheck) {
      let decNumStr = this.total.toString();
      let decInd = decNumStr.indexOf('.');

      if ((decNumStr.length - 1) - decInd > 1) {
        content = this.total.toFixed(2);
      } else if (+this.total.toString()[decInd + 1] > 0) {
        content = this.total.toFixed(1);
      }
    } else {
      content = this.total.toFixed(0);
    }
    numDisplay.textContent = content;

    if (this.operator) {
      opDisplay.textContent = this.operator;
    } else {
      opDisplay.textContent = '';
    }
  },
  emptyOperand() {
    let len = this.operand.length
    for (let i = 0; i < len; i++) {
      this.operand.pop();
    }
  },
  equal() {
    if (calculator.operand.length > 0 && calculator.operator) {
      calculator.math();
      calculator.emptyOperand();

      calculator.operator = null;

      calculator.toScreen();
    }
  },
  opButton(id) {
    if (!calculator.total) {
      calculator.total = +calculator.operand.join('');
    } else if (calculator.total && calculator.operator && calculator.operand.length > 0) {
      calculator.math();
    }

    calculator.emptyOperand();
    calculator.operator = id;
    calculator.toScreen();
  },
  numButton(id) {

    if (calculator.operand.length < 1 && calculator.operator === '/' && +id === 0) {
      alert('CANNOT DIVIDE BY 0!!!');
    } else {
      calculator.operand.push(id);
      numDisplay.textContent = calculator.operand.join('');
    }
  },
  clearBtn() {
    calculator.total = null;
    calculator.operator = null;
    calculator.emptyOperand();

    numDisplay.textContent = 0;
    opDisplay.textContent = '';
  },
  decimalBtn(id) {
    if (!calculator.operand.includes('.')) {
      calculator.operand.push(id);
      numDisplay.textContent = calculator.operand.join('');
    }
  }
}

equalButton.addEventListener('click', calculator.equal);
clearButton.addEventListener('click', calculator.clearBtn);

decimalBtn.addEventListener('click', e => {
  const btnId = e.target.id;
  calculator.decimalBtn(btnId);
});

operatorBtns.forEach(btn => {
  btn.addEventListener('click', e => {
    const btnId = e.target.id;
    calculator.opButton(btnId);
  })
})

numberBtns.forEach(btn => {
  btn.addEventListener('click', e => {
    const btnId = e.target.id;
    calculator.numButton(btnId);
  })
})