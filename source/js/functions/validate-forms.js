import JustValidate from 'just-validate';
import Inputmask from "inputmask";
import { addCustomClass, removeCustomClass } from './customFunctions';
import {initTelInput} from '../components/initTel';

function getCountryCode(form){
  return fetch('https://ipinfo.io/json?token=34a8b1f1b9f907')
  .then(response => response.json())
  .then(data => {
    initTelInput(data.country, form);

     return data.country;
  })
}

export const validateForms = (selector, rules, afterSend) => {
  let form = selector;

  const telSelector = form?.querySelector('input[type="tel"]');

  if (!form) {
    console.error('Нет такого селектора!');
    return false;
  }

  if (!rules) {
    console.error('Вы не передали правила валидации!');
    return false;
  }

  if (telSelector) {
    getCountryCode(form);
  }

  let validation = new JustValidate(selector, {validateBeforeSubmitting: true});

  for (let item of rules) {
    validation
      .addField(item.ruleSelector, item.rules);
  }

  validation.onSuccess((ev) => {
    addCustomClass(form, 'loader');
    let formData = new FormData(ev.target);
    if (formData.has('mess')) {
      let messengerValue = formData.get('mess');
      switch (messengerValue) {
          case "1":
              formData.set('mess', 'WhatsApp');
              break;
          case "2":
              formData.set('mess', 'Telegram');
              break;
          case "3":
              formData.set('mess', 'Viber');
              break;
      }
  }

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