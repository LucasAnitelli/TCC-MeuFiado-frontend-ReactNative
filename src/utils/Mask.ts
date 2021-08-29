const maskContainer = {
  DateMask: (dateValue: string | Date) => {
    let date: Date = new Date(dateValue);
    if (date instanceof Date && !isNaN((date as unknown) as number)) {
      const ano = date.getFullYear();
      const mes = `00${date.getMonth() + 1}`.slice(-2);
      const dia = `00${date.getUTCDate()}`.slice(-2);

      return `${dia}/${mes}/${ano}`;
    } else return '';
  },

  DateFor: (date: string) => {
    if (!date) return '';
    let resultValue = '';
    const dateValue = date.replace(/[\D]/g, '').substring(0, 8);
    for (let i = 0; dateValue.length > i; i++) {
      if (i === 2) {
        resultValue += `/${dateValue[i]}`;
      } else if (i === 4) {
        resultValue += `/${dateValue[i]}`;
      } else {
        resultValue += dateValue[i];
      }
    }
    return resultValue;
  },

  dateConvert: (date: string) => {
    if (!date) return '';
    const [dia, mes, ano] = date.split("/");
    const resultValue = ano + '-' + ("0" + mes).slice(-2) + '-' + ("0" + dia).slice(-2);
    return resultValue;
  },

  MoneyMask: (input: string) => {
    input = input.replace('R$ ', '');
    if (isNaN(parseInt(input))) {
      input = '0';
    }
    let v = input.replace(/\D/g, '');
    v = (parseInt(v) / 100).toFixed(2) + '';
    v = v.replace('.', ',');
    v = v.replace(/(\d)(\d{3})(\d{3}),/g, '$1.$2.$3,');
    v = v.replace(/(\d)(\d{3}),/g, '$1.$2,');
    v = 'R$ '.concat(v);
    return v;
  },
};

export type MaskType =
  | 'date'
  | 'dateFor'
  | 'dateConvert'
  | 'moneymask';

export function useMask(type: MaskType, value: string) {
  switch (type) {
    case 'date':
      return maskContainer.DateMask(value);
    case 'moneymask':
      return maskContainer.MoneyMask(value);
    case 'dateFor':
      return maskContainer.DateFor(value);
    case 'dateConvert':
      return maskContainer.dateConvert(value);
  }
}

const removeMaskContainer = {
  moneyMask: (input: string) => {
    return parseFloat(
      input
        .trim()
        .replace(/^R\$ +|\./g, '')
        .replace(/,/, '.')
    ).toFixed(2)
  }
}

export type MaskTypeRemove =
  | 'removeMoneyMask';

export function removeMask(type: MaskTypeRemove, value: string) {
  switch (type) {
    case 'removeMoneyMask':
      return removeMaskContainer.moneyMask(value);
  }
}