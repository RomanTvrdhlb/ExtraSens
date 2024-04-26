import { validateForms } from '../functions/validate-forms';
import vars from '../_vars';
import { modalClickHandler } from '../components/modals'
import { removeClassInArray, addCustomClass, removeCustomClass } from "../functions/customFunctions";


const rules1 = [
  {
    ruleSelector: '.input-phone',
    tel: true,
    telError: 'Введите правильный номер телефона',
    showErrorMessage: false,
    rules: [
      {
        rule: 'number',
        errorMessage: 'Введите правильный номер телефона',
        showErrorMessage: true,
      },
      {
        rule: 'required',
        value: true,
        errorMessage: 'Заполните свой телефон!',
        showErrorMessage: false,
      },
      {
        rule: 'minLength',
        value: 10,
        errorMessage: 'Поле может содержать минимум 10 символов',
        showErrorMessage: false,
      },
      {
        rule: 'maxLength',
        value: 13,
        errorMessage: 'Поле может содержать максимум 13 символов',
        showErrorMessage: false,
      },
    ]
  },
  {
    ruleSelector: '.input-name',
    rules: [
      {
        rule: 'minLength',
        value: 3,
        errorMessage: 'Поле может содержать минимум 3 символа',
        showErrorMessage: false,
      },
      {
        rule: 'required',
        value: true,
        errorMessage: 'Введите свое полное имя!',
        showErrorMessage: false,
      }
    ]
  },
  {
    ruleSelector: '.input-mess',
    rules: [
      {
        rule: 'minLength',
        value: 3,
        errorMessage: 'Поле может содержать минимум 3 символа',
        showErrorMessage: false,
      },
      {
        rule: 'required',
        value: true,
        errorMessage: 'Опишите свою проблему!',
        showErrorMessage: false,
      }
    ]
  },
];

const afterForm = () => {
  // modalClickHandler('success');
};

const error = () => {
  console.log('Ошибка отправки')
};

if(document.querySelector('.main-form')){
  validateForms(document.querySelector('.main-form'), rules1, afterForm, error);
}


  



















