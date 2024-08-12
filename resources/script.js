const calculator = {
  total: 20,
  operand: ['1', '2'],
  operator: '+',
  math() {
    switch (this.operator) {
      case '+': return this.total + +this.operand.join('');
      case '-': return this.total - this.operand.join('');
      case '*': return this.total * this.operand.join('');
      case '/': return this.total / this.operand.join('');
    }
  }
}

console.log(calculator.math());
calculator.operator = '-';
console.log(calculator.math());
calculator.operator = '*';
console.log(calculator.math());
calculator.operator = '/';
console.log(calculator.math());