import { validateForms } from '../functions/validate-forms';
import vars from '../_vars';
import { modalClickHandler } from '../components/modals'
import { removeClassInArray, addCustomClass, removeCustomClass } from "../functions/customFunctions";


const rules1 = [
  {
    ruleSelector: '.input-phone',
    tel: true,
    telError: 'Введіть правильний телефон',
    showErrorMessage: false,
    rules: [
      {
        rule: 'required',
        value: true,
        errorMessage: 'Заповніть телефон!',
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
        errorMessage: 'Поле має містити щонайменше 3 символи',
        showErrorMessage: false,
      },
      {
        rule: 'required',
        value: true,
        errorMessage: 'Заповніть ваше ПІБ!',
        showErrorMessage: false,
      }
    ]
  },
  {
    ruleSelector: '.input-mail',
    rules: [
      {
        rule: 'minLength',
        value: 3,
        errorMessage: 'Поле має містити щонайменше 3 символи',
        showErrorMessage: false,
      },
      {
        rule: 'required',
        value: true,
        errorMessage: 'Заповніть вашу Пошту!',
        showErrorMessage: false,
      },
      {
        rule: 'email',
        errorMessage: 'Заповніть вашу Пошту!',
        showErrorMessage: false,
      }
    ]
  },
];

const rules2 = [
  {
    ruleSelector: '.input-name',
    rules: [
      {
        rule: 'minLength',
        value: 3,
        errorMessage: 'Поле має містити щонайменше 3 символи',
        showErrorMessage: false,
      },
      {
        rule: 'required',
        value: true,
        errorMessage: 'Заповніть ваше ПІБ!',
        showErrorMessage: false,
      }
    ]
  }
];

const afterForm = () => {
  window.location.href = 'thank.html';
};

const error = () => {
  console.log('Ошибка отправки')
};

const UTM_PARAMS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];

function getUrlParams() {
  return new URLSearchParams(window.location.search);
}

function saveParamsToCookie(params) {
  params.forEach(param => {
    if (param.value) {
      document.cookie = `${param.name}=${param.value}; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/`;
    }
  });
}

function getParamsFromCookie() {
  const utmParams = {};
  document.cookie.split(';').forEach(cookie => {
    const [name, value] = cookie.trim().split('=');
    if (UTM_PARAMS.includes(name)) {
      utmParams[name] = value;
    }
  });
  return utmParams;
}

function addHiddenInputs(form, params) {
  params.forEach(param => {
    if (param.value) {
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = param.name;
      input.value = param.value;
      form.appendChild(input);
    }
  });
}

function initFormWithUtmParams(form) {
  const utmParams = getParamsFromCookie();
  addHiddenInputs(form, Object.keys(utmParams).map(key => ({ name: key, value: utmParams[key] })));
}

function processForms() {
  const formQuiz = document.querySelector('.form-quiz');
  if (formQuiz) {
    initFormWithUtmParams(formQuiz);
    validateForms(formQuiz, rules1, afterForm, error);
  }

  const formsValidation = document.querySelectorAll('.form-validation');
  formsValidation.forEach(form => {
    if (window.location.pathname === '/') {
      const urlParams = getUrlParams();
      const utmValues = UTM_PARAMS.map(param => ({ name: param, value: urlParams.get(param) })).filter(param => param.value);
      saveParamsToCookie(utmValues);
    }
    initFormWithUtmParams(form);
    validateForms(form, rules2, afterForm, error);
  });
}

processForms();









