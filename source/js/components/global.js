import {
  fadeIn,
  fadeOut,
  toggleCustomClass,
} from "../functions/customFunctions";

const dataHidden = document.querySelectorAll("[data-clip]");
const salesParent = document.querySelector("[data-content-more]");

if (dataHidden) {
  dataHidden.forEach(function (item) {
    const btn = item.querySelector("[data-clip-btn]");
    const box = item.querySelector("[data-clip-item]");

    const computedStyle = window.getComputedStyle(box);
    const originalHeight = parseInt(
      computedStyle.getPropertyValue("max-height")
    );

    btn.addEventListener("click", function (e) {
      e.preventDefault();
      const isOpen = box.getAttribute("data-clip-item") === "true";

      if (!isOpen) {
        box.style.maxHeight = box.scrollHeight + "px";
        toggleCustomClass(btn, "active");
        setTimeout(function () {
          box.style.overflow = "auto";
        }, 450);
      } else {
        box.style.maxHeight = originalHeight + "px";
        toggleCustomClass(btn, "active");
        box.style.overflow = "hidden";
      }

      box.setAttribute("data-clip-item", !isOpen);
    });

    box.style.transition = "max-height 0.4s linear";
  });
}

if (salesParent) {
  const items = salesParent.querySelectorAll(".sales-list__item");
  const showBtn = salesParent.parentNode.querySelector("[data-more]");
  const bg = salesParent.parentNode.querySelector(".sales-section__bg");
  const hideCount = window.innerWidth < 768 ? 2 : 4;

  function updateVisibility() {
    const hideCount = window.innerWidth < 768 ? 2 : 4;
    items.forEach((item, index) => {
      if (index >= hideCount) {
        fadeOut(item, 0);
      } else {
        fadeIn(item, 0, "flex");
      }
    });
  }

  updateVisibility();

  window.addEventListener("resize", updateVisibility);

  showBtn.addEventListener("click", function (e) {
    e.preventDefault();
    items.forEach((item, index) => {
      if (index >= hideCount) {
        fadeIn(item, 200, "flex");
      }
    });
    fadeOut(showBtn, 200);
    fadeOut(bg, 300);
  });
}
