import {
  removeClassInArray,
  addCustomClass,
  removeCustomClass,
} from "../functions/customFunctions";
import vars from "../_vars";

const areasTab = document.querySelectorAll(".areas-tabs");
const firstCount = document.querySelector("[data-count]");
const count = document.querySelector("[data-count-join]");

// --------------- tabs custom function --------------- //
const tabsFunction = function (
  tabsDataInitArray,
  tabsNavAttr,
  tabsContentAttr,
  active = "active"
) {
  tabsDataInitArray &&
    tabsDataInitArray.forEach((tabParent) => {
      if (tabParent) {
        const tabNav = [...tabParent.querySelectorAll(`[${tabsNavAttr}]`)];
        const tabContent = [
          ...tabParent.querySelectorAll(`[${tabsContentAttr}]`),
        ];

        tabNav.map((nav) => {
          nav.addEventListener("click", (e) => {
            e.preventDefault();
            const activeTabAttr = e.target.getAttribute(`${tabsNavAttr}`);
            removeClassInArray(tabNav, active);
            removeClassInArray(tabContent, active);
            addCustomClass(
              tabParent.querySelector(`[${tabsNavAttr}="${activeTabAttr}"]`),
              active
            );
            addCustomClass(
              tabParent.querySelector(
                `[${tabsContentAttr}="${activeTabAttr}"]`
              ),
              active
            );
          });
        });
      }
    });
};

tabsFunction(
  document.querySelectorAll(".about-tab"),
  "data-tab",
  "data-tab-content"
);

const container = document.getElementById("scroll-container");


function tabsNavInit(){

  if (window.innerWidth >= 576) {
    console.log('123');
    let isMouseDragging = false;
    let isMouseMove = false;

    if (container) {
      let startX;
      let scrollLeft;

      container.addEventListener("mousedown", (e) => {
        isMouseDragging = true;
        startX = e.pageX - container.offsetLeft;
        scrollLeft = container.scrollLeft;
      });

      container.addEventListener("mouseup", () => {
        if (!isMouseMove) {
          const aboutTabElement = document.querySelector(".about-section");
          if (aboutTabElement) {
            aboutTabElement.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }
        }
        isMouseDragging = false;
        isMouseMove = false;
      });

      container.addEventListener("mousemove", (e) => {
        if (!isMouseDragging) return;
        e.preventDefault();
        const x = e.pageX - container.offsetLeft;
        const walk = (x - startX) * 2;
        container.scrollLeft = scrollLeft - walk;
        isMouseMove = true;
      });
    }
  }
}
tabsNavInit();
window.addEventListener('resize', tabsNavInit);