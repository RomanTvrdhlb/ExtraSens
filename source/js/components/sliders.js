import Swiper from "swiper";
import vars from "../_vars";
import {Navigation} from "swiper/modules";

const {mainSliders} = vars;

mainSliders &&
mainSliders.forEach(function (slider) {
     
  const mainSwiper = slider.querySelector(".main-slider__container"),
        mainSliderPrev = slider.querySelector(".swiper-button-prev"),
        mainSliderNext = slider.querySelector(".swiper-button-next");

    const mainSlider = new Swiper(mainSwiper, {
      modules: [Navigation],
      slidesPerView: 1,
      spaceBetween: 20,
      speed: 1300,
      observer: true,
      observeParents: true,
      autoHeight: true,

      navigation: {
        nextEl: mainSliderNext && mainSliderNext,
        prevEl: mainSliderPrev && mainSliderPrev,
      },

      breakpoints:{
        320:{
          spaceBetween: 10,
        },
        576:{
          spaceBetween: 20,
        },
      }
    });


  });
 
