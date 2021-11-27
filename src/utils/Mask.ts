import { MONTHS } from "../assets/Constants";

const maskContainer = {
  DateMaskSendBack: (dateValue: string | Date) => {
    let date: Date = new Date(dateValue);
    if (date instanceof Date && !isNaN((date as unknown) as number)) {
      const ano = date.getFullYear();
      const mes = `00${date.getMonth() + 1}`.slice(-2);
      const dia = `00${date.getUTCDate()}`.slice(-2);

      return `${ano}-${mes}-${dia}`;
    } else return '';
  },

  DateMask: (dateValue: string | Date) => {
    let date: Date = new Date(dateValue);
    if (date instanceof Date && !isNaN((date as unknown) as number)) {
      const ano = date.getFullYear();
      const mes = `00${date.getMonth() + 1}`.slice(-2);
      const dia = `00${date.getUTCDate()}`.slice(-2);

      return `${dia}/${mes}/${ano}`;
    } else return '';
  },

  formatDatePicker: (date: string) => {
    if (!date) return '';

    if (date.includes('/')) {
      let dateSplit = date.split('/');
      return dateSplit[1] + ' de ' + MONTHS[parseInt(dateSplit[0]) - 1] + ' de 20' + dateSplit[2];
    } else {
      let dateSplit = date.split('-');
      return dateSplit[2] + ' de ' + MONTHS[parseInt(dateSplit[1]) - 1] + ' de ' + dateSplit[0];
    }
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
  | 'moneymask'
  | 'formatDatePicker'
  | 'DateMaskSendBack';

export function useMask(type: MaskType, value: string) {
  switch (type) {
    case 'date':
      return maskContainer.DateMask(value);
    case 'moneymask':
      return maskContainer.MoneyMask(value);
    case 'formatDatePicker':
      return maskContainer.formatDatePicker(value);
    case 'DateMaskSendBack':
      return maskContainer.DateMaskSendBack(value);
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