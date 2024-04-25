import {
  addClassInArray,
  removeCustomClass,
  fadeOut,
  fadeIn,
  addCustomClass,
} from "../functions/customFunctions";

const sectionParents = document.querySelectorAll("[data-quiz]");
const btnClass = "main-btn--disable";

sectionParents.forEach(function (section) {
  const quizSlides = section.querySelectorAll(".quiz-list__item");
  const quizSlidesLength = quizSlides.length;
  const btnNext = section.querySelector("[data-next]");
  const btnPrev = section.querySelector("[data-prev]");
  const currentNumber = section.querySelector(".quiz-section__current");
  const allNumber = section.querySelector(".quiz-section__all");
  const sendBtn = section.querySelector('.main-btn.hide');

  allNumber.innerText = quizSlidesLength;

function renderQuestions(questionsParent, priceObject) {
  for (const key in priceObject) {
    if (priceObject.hasOwnProperty(key)) {
      const input = `
        <li class="quiz__item">
          <label class="quiz-checkbox">
            <input type="radio" name="question_5" value="${priceObject[key]}" class="quiz-checkbox__field">
            <span class="quiz-checkbox__content">${priceObject[key]}</span>
          </label>
        </li>`;
        
      questionsParent.insertAdjacentHTML('beforeend', input);
    }
  }
}

const parentInputs = document.querySelector('.apart-slide');
const apartItems = parentInputs.querySelectorAll('.custom-checkbox input');
const questionsParent = document.querySelector('[data-apart]');

const priceObjects = {
  apart_1: {
    value1: 'От 80 до 100 тыс. EUR',
    value2: 'От 100 до 300 тыс. EUR',
    value3: 'От 300 до 500 тыс. EUR',
    value4: 'Более 500 тыс. EUR',
  },
  apart_2: {
    value1: 'От 300 до 500 тыс. EUR',
    value2: 'Более 500 тыс. EUR',
  },
  apart_3: {
    value1: 'От 100 до 300 тыс. EUR',
    value2: 'От 300 до 500 тыс. EUR',
    value3: 'Более 500 тыс. EUR',
  },
  apart_4: {
    value1: 'От 100 до 300 тыс. EUR',
    value2: 'От 300 до 500 тыс. EUR',
    value3: 'Более 500 тыс. EUR',
  }
};

function handleInputChange(item) {
  questionsParent.innerHTML = '';
  const priceObject = priceObjects[item.id];
  renderQuestions(questionsParent, priceObject);
}

apartItems.forEach(function(item) {
  item.addEventListener('change', function(e) {
    handleInputChange(item);
  });
});

  function test(btn) {
    const form = btn.closest(".quiz-section__box");
    let formdata = {};

    btn.addEventListener("click", function () {
      for (let i = 0; i < form.elements.length; i++) {
        let input = form.elements[i];

        if (input.name) {
          formdata[input.name] = input.value;

          if (input.name === "Мессенжер для связи") {
            switch (input.value) {
              case "1":
                formdata[input.name] = "Telegram";
                break;

              case "2":
                formdata[input.name] = "Viber";
                break;

              case "3":
                formdata[input.name] = "WhatsApp";
                break;
            }
          }
        }
      }
    });
  }

  btnNext.addEventListener("click", function (e) {
    e.preventDefault();

    if (!quizSlides[quizSlidesLength - 1].classList.contains("active")) {
      showNextSlide(btnNext, currentNumber);
      removeCustomClass(btnPrev, btnClass);
    }

    if (quizSlides[quizSlidesLength - 1].classList.contains("active")) {
      fadeOut(btnNext, 0);
      fadeIn(sendBtn, 0);
    } else {
        fadeIn(btnNext, 0);
        fadeOut(sendBtn, 0);
    }
  });

  btnPrev.addEventListener("click", function (e) {
    e.preventDefault();

    if (!quizSlides[0].classList.contains("active")) {
      showPrevSlide(btnPrev, btnNext, currentNumber);
    }
    if (quizSlides[0].classList.contains("active")) {
      addCustomClass(btnPrev, btnClass);
    }

    if (quizSlides[quizSlidesLength - 1].classList.contains("active")) {
          fadeOut(btnNext, 0);
        fadeIn(sendBtn, 0);
      } else {
        fadeIn(btnNext, 0);
        fadeOut(sendBtn, 0);
      }
  });

  document.addEventListener("DOMContentLoaded", function () {
    addClassInArray([btnNext, btnPrev], btnClass);
  });

    document.body.addEventListener('click', function(e){
      if(e.target.type === 'radio' || e.target.type === 'checkbox'){
        checkState(btnNext);
      }
    })
});

function checkCheckboxes(selector) {
  const checkboxes = selector.querySelectorAll("input");

  for (let checkbox of checkboxes) {
    if (checkbox.checked) {
      return true;
    }
  }
  return false;
}

function checkState(btn) {
  const activeSlide = document.querySelector(".quiz-list__item.active");
  const checkboxes = activeSlide.querySelectorAll("input");
  checkboxes.forEach(function (checkbox) {
    if (checkCheckboxes(activeSlide)) {
      removeCustomClass(btn, btnClass);
    }
    if (!checkCheckboxes(activeSlide)) {
      addCustomClass(btn, btnClass);
    }
  });
}

function showNextSlide(btn, number) {
  const activeSlide = document.querySelector(".quiz-list__item.active");
  const nextSlide = activeSlide.nextElementSibling;

  if (checkCheckboxes(activeSlide)) {
    fadeOut(activeSlide, 0);
    removeCustomClass(activeSlide);
    fadeIn(nextSlide, 600, "flex");
    addCustomClass(nextSlide);
    +number.innerText++;
  }

  if (!checkCheckboxes(nextSlide)) {
    addCustomClass(btn, btnClass);
  }
}

function showPrevSlide(btn, nextBtn, number) {
  const activeSlide = document.querySelector(".quiz-list__item.active");
  const prevSlide = activeSlide.previousElementSibling;
  fadeOut(activeSlide, 0);
  removeCustomClass(activeSlide);
  fadeIn(prevSlide, 600, "flex");
  addCustomClass(prevSlide);
  +number.innerText--;
  removeCustomClass(btn, btnClass);

  if (checkCheckboxes(prevSlide)) {
    removeCustomClass(nextBtn, btnClass);
  }

  const position =
    document.querySelector(".quiz-section").offsetTop -
    document.querySelector("header").offsetHeight;

  window.scrollTo({
    top: position,
    behavior: "smooth",
  });
}
