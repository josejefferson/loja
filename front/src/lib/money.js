export class Money extends Number {
  constructor(value) {
    value = Math.round(value * 100) / 100
    super(value)
  }

  toString() {
    return 'R$ ' + this.valueOf().toLocaleString('pt-BR', {
      currency: 'BRL',
      minimumFractionDigits: 2
    })
  }

  withSign() {
    return (this.valueOf() === 0 ? '' : (this.valueOf() > 0 ? '+ ' : '- ')) + new Money(Math.abs(this.valueOf())).toString()
  }
}

export function money(value) {
  return new Money(value).toString()
}