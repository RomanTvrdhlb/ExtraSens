import Swiper from "swiper";
import vars from "../_vars";
import {Navigation, Controller } from "swiper/modules";

const {parentSliders} = vars;

parentSliders &&
  parentSliders.forEach(function (parent) {
    const catalogSlider = parent.querySelector(".catalog-slider"),
      mainSwiper = catalogSlider.querySelector(".catalog-slider__container"),
      subSwiper = catalogSlider.querySelector(".sub-slider__container"),
      mainSliderPrev = catalogSlider.querySelector(".swiper-button-prev"),
      mainSliderNext = catalogSlider.querySelector(".swiper-button-next");

    const subSlider = new Swiper(subSwiper, {
      modules: [Navigation, Controller],
      slidesPerView: 3,
      spaceBetween: 20,
      speed: 1300,
      observer: true,
      observeParents: true,
      slideToClickedSlide: true,
      loop: true,
      loopedSlides: 3,
      centeredSlides:true,

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

    const mainSlider = new Swiper(mainSwiper, {
      modules: [Controller],
      slidesPerView: 1,
      spaceBetween: 20,
      speed: 800,
      observer: true,
      observeParents: true,
      slideToClickedSlide: true,
      centeredSlides:true,
      loop: true,
      loopedSlides: 3,

      breakpoints:{
        320:{
          spaceBetween: 10,
        },
        576:{
          spaceBetween: 20,
        },
      }
    });

    mainSlider.controller.control = subSlider;
    subSlider.controller.control = mainSlider;
  });
 
