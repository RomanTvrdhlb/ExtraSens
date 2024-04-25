import intlTelInput from "intl-tel-input";
import {
  addCustomClass,
  removeCustomClass,
} from "../functions/customFunctions";

export const initTelInput = (code, form) => {
  const inputs = form.querySelectorAll(".input-phone");

  if (inputs) {
    inputs.forEach((item) => {
      var iti = intlTelInput(item, {
        countrySearch: false,
        autoPlaceholder: "aggressive",
        initialCountry: code !== null ? code : "UA",
        utilsScript:
          "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
        separateDialCode: true,
        nationalMode: false,
      });

      let itemText = item.parentNode.querySelector(".iti__a11y-text");
      let hiddenInput = item.parentNode.querySelector('input[name="phone"]');
      let codeText = item.parentNode.querySelector("#code");

      function validateIti(item) {
        if (iti.isValidNumberPrecise()) {
          removeCustomClass(item, "just-validate-error-field");
          removeCustomClass(item.parentNode, "just-validate-error-field");
          form.querySelector('.main-btn.submit').style.pointerEvents = 'initial';
         
        } else {
          addCustomClass(item.parentNode, "just-validate-error-field");
          form.querySelector('.main-btn.submit').style.pointerEvents = 'none';
        
        }
      }

      function createInput() {
        hiddenInput = document.createElement("input");
        hiddenInput.type = "hidden";
        hiddenInput.name = "phone";
        item.closest(".main-form").insertBefore(hiddenInput, item.closest(".main-form").firstChild);
      }

      function createText() {
        codeText = document.createElement("span");
        codeText.setAttribute("code", "");
        item.insertAdjacentElement("afterend", codeText);
      }

      function replaceInputValue(item) {
        item.placeholder = "(__) ___ __ __";

        if (!hiddenInput) {
          createInput();
          createText();
        }
        hiddenInput.value = itemText.innerText.replace(/[^0-9\+]/g, "") + iti.telInput.value;
        codeText.innerText = itemText.innerText.replace(/[^0-9\+]/g, "");
      }

      item.addEventListener("input", function () {
        replaceInputValue(item);
        validateIti(item);
      });

      iti.promise.then(function () {
        replaceInputValue(item);
      });

      item.addEventListener("click", function () {
        replaceInputValue(item);
        validateIti(item);
      });

      if (form.classList.contains('form-quiz')) {
        form.querySelector('.hide').addEventListener('click', function(){
          validateIti(item);
        })
      } else {
        form.querySelector('.main-btn').addEventListener('click', function(){
          validateIti(item);
        })
      }
    });
  }
};
