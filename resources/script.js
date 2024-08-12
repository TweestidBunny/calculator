const numberBtns = document.querySelectorAll('.number');
const operatorBtns = document.querySelectorAll('.operator');
const equalButton = document.querySelector('#equal');

const calculator = {
  total: 6,
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
    const numDisplay = document.querySelector('#screenNumber');
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
  },
  emptyOperand() {
    let len = this.operand.length
    for (let i = 0; i < len; i++) {
      this.operand.pop();
    }
  },
  equal() {
    calculator.math();
    calculator.toScreen();
    calculator.emptyOperand();

    calculator.operator = null;

    console.log(calculator.operand);
  }
  // checkNull() {
  //   return this.total === null && this.operator === null;
  // }
}

// calculator.math()
// console.log(calculator.total);
// calculator.operator = '-';
// calculator.math()
// console.log(calculator.total);
// calculator.operator = '*';
// calculator.math()
// console.log(calculator.total);
// calculator.operator = '/';
// calculator.operand = ['2', '6'];
// calculator.math()
// console.log(calculator.total);

equalButton.addEventListener('click', calculator.equal);

/* 
  User presses number,
  Number is added to the operand array.

  Number is shown on the screen.

  User presses operator button (+, -, *, /).

  Selected operator is shown on the screen.

  Total and operator are checked for null values.
  If total is null, add numbers from operand array
    to total, add selected operator to 
    calculator.operator.
  
  If total is not null, but operator is null,
    overwrite total with new operand value,
    Add selected operator to calculator.operator.
  
  If total is not null, and operator is not null,
    Call math method
 */