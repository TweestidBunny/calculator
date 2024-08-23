const numberBtns = document.querySelectorAll('.number');
const operatorBtns = document.querySelectorAll('.operator');
const equalButton = document.querySelector('#equal');
const clearButton = document.querySelector('#clear');
const numDisplay = document.querySelector('#screenNumber');
const opDisplay = document.querySelector('#opSign');
const decimalBtn = document.querySelector('.decimal');

const calculator = {
  total: null,
  operand: [],
  operator: null,
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
    if (this.operand.length > 0 && this.operator) {
      this.math();
      this.emptyOperand();

      this.operator = null;

      this.toScreen();
    }
  },
  opButton(id) {
    if (!this.total) {
      this.total = +this.operand.join('');
    } else if (this.total && this.operator && this.operand.length > 0) {
      this.math();
    }

    this.emptyOperand();
    this.operator = id;
    this.toScreen();
  },
  numButton(id) {

    if (this.operand.length < 1 && this.operator === '/' && +id === 0) {
      alert('CANNOT DIVIDE BY 0!!!');
    } else {
      this.operand.push(id);
      numDisplay.textContent = this.operand.join('');
    }
  },
  clearBtn() {
    this.total = null;
    this.operator = null;
    this.emptyOperand();

    numDisplay.textContent = 0;
    opDisplay.textContent = '';
  },
  decimalBtn(id) {
    if (!this.operand.includes('.')) {
      this.operand.push(id);
      numDisplay.textContent = this.operand.join('');
    }
  }
}

equalButton.addEventListener('click', function () {
  calculator.equal();
});

clearButton.addEventListener('click', function () {
  calculator.clearBtn()
});

decimalBtn.addEventListener('click', function (e) {
  const btnId = e.target.id;
  calculator.decimalBtn(btnId);
});

operatorBtns.forEach(btn => {
  btn.addEventListener('click', function (e) {
    const btnId = e.target.id;
    calculator.opButton(btnId);
  })
})

numberBtns.forEach(btn => {
  btn.addEventListener('click', function (e) {
    const btnId = e.target.id;
    calculator.numButton(btnId);
  })
})