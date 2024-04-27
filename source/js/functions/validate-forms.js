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
    addCustomClass(form, 'loader');
    let formData = new FormData(ev.target);
   
    let xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          if (afterSend) {
            afterSend();
            setTimeout(function(){
              addCustomClass(form, 'loaded');
            },1000);
          }
          console.log('status 200');
        }
      }
    }
    
    xhr.open('POST', 'mail.php', true);
    xhr.send(formData);

    ev.target.reset();
  })
};