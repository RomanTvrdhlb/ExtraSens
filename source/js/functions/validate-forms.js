import JustValidate from 'just-validate';
import { addCustomClass, removeCustomClass } from './customFunctions';

export const validateForms = (selector, rules, afterSend) => {
  let form = selector;

  if (!form) {
    console.error('Нет такого селектора!');
    return false;
  }

  if (!rules) {
    console.error('Вы не передали правила валидации!');
    return false;
  }

  let validation = new JustValidate(selector);

  for (let item of rules) {
    validation
      .addField(item.ruleSelector, item.rules);
  }

  validation.onSuccess((ev) => {
    afterSend()
  })
};