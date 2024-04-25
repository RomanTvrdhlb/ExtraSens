import vars from '../_vars';
import {elementHeight,stickyHeader, elementWidth} from '../functions/customFunctions';
import {removeCustomClass, addCustomClass} from '../functions/customFunctions';

const {header} = vars;

// let lastScroll = 0;

function stickyHeaderFunction(breakpoint,defaultOffset, variableClass, lastScroll = 0){
  let containerWidth = document.documentElement.clientWidth;
  if (containerWidth > `${breakpoint}`) {
    const scrollPosition = () => window.pageYOffset || document.documentElement.scrollTop;
    const containHide = () => header.classList.contains(`${variableClass}`);

    window.addEventListener('scroll', () => {
        if(scrollPosition() > lastScroll && !containHide() && scrollPosition() > defaultOffset) {
            addCustomClass(header, `${variableClass}`)
        }
        else if(scrollPosition() < defaultOffset){
            removeCustomClass(header, `${variableClass}`)
        }

        lastScroll = scrollPosition();
    })
  }
}

stickyHeaderFunction(320, 500, 'sticky');
stickyHeaderFunction(320, 250, 'hide', 500);
elementHeight(header, "header-height");
elementHeight(document.querySelector('[data-label]'), 'label-height');

