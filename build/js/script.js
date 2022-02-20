'use strict';

const pageHeaderMenu = document.querySelector('.page-header__menu');
const headerToggle = document.querySelector('.page-header__toggle');
const navigationElement = document.querySelector('.page-header__navigation');
const pageHeader = document.querySelector('.page-header');
const pageBody = document.querySelector('.page__body');

pageHeaderMenu.classList.remove('page-header__menu_nojs');
pageHeaderMenu.classList.remove('page-header__menu_opened');
navigationElement.classList.remove('page-header__navigation_opened');
navigationElement.classList.add('page-header__navigation_closed');

const screenFreeze = () => {
  pageHeader.classList.toggle('page-header_opened-menu_view');
  pageBody.classList.toggle('scroll-hidden');
}

headerToggle.addEventListener('click', () => {
  pageHeaderMenu.classList.toggle('page-header__menu_opened');
  navigationElement.classList.toggle('page-header__navigation_closed');
  navigationElement.classList.toggle('page-header__navigation_opened');
  screenFreeze();
});

//Filter work realisation
const filterElement = document.querySelector('.filter');
const filterControlButton = document.querySelector('.filter__control-button-wrapper');
const filterPopupElement = document.querySelector('.filter__popup');
const filterPopupCloseButton = document.querySelector('.filter__popup-close-button');

if (filterPopupElement) {
  filterElement.classList.remove('filter_nojs');
  filterPopupElement.classList.remove('filter__popup_nojs');

  filterControlButton.addEventListener('click', () => {
    filterPopupElement.classList.add('filter__popup_opened');
  });

  filterPopupCloseButton.addEventListener('click', () => {
    filterPopupElement.classList.remove('filter__popup_opened');
  })
}

const setupFaqAccordion = () => {
  const accordion = document.querySelector('.faq__list');

  if (!accordion) {
    return;
  }

  const accordionItems = accordion.querySelectorAll('.faq__item')

  const toggleItem = (element) => {
    const button = element.querySelector('.faq__question');
    const answer = element.querySelector('.faq__answer');
    button.classList.toggle('faq__active-btn');
    answer.classList.toggle('faq__answer_show');
  }

  const onItemClick = (item) => {
    toggleItem(item);
  }

  accordion.addEventListener('click', (evt) => {

    if (evt.composedPath().find(item => item.classList && item.classList.contains('faq__item-wrapper'))) {

      const faqItem = evt.composedPath().find(item => item.classList && item.classList.contains('faq__item'));

      if (faqItem) {
        onItemClick(faqItem);
      }
    }
  })

  accordionItems.forEach(item => {
    toggleItem(item)
  })
}

setupFaqAccordion()


const setupFilterFormAccordion = () => {
  const form = document.querySelector('.filter__form');

  if (!form) {
    return;
  }

  const toggleItem = (element) => {
    element.classList.toggle('filter__button_active')
  }

  const onItemClick = (item) => {
    toggleItem(item)
  }

  form.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('filter__button')) {
      onItemClick(evt.target)
    }
  });
}

setupFilterFormAccordion();

const loginPopup = document.querySelector('.modal');
const loginPopupCLoseButton = loginPopup.querySelector('.modal__close-button');
const modalForm = loginPopup.querySelector('.modal__form');
const emailInput = modalForm.querySelector('#email-login');

let isModalOpened = false;

pageHeader.addEventListener('click', (evt) => {
  if (evt.composedPath().find(item => item.classList && item.classList.contains('link-modal'))) {
    evt.preventDefault();
    isModalOpened = true;
    controlPopupLogin();
  }
})

const controlPopupLogin = () => {
  loginPopup.classList.toggle('visually-hidden');
  loginPopup.classList.toggle('modal_opened');
  pageBody.classList.toggle('page__body_locked');
  emailInput.focus();
}

const onKeyPress = (evt) => {
  if (evt.key === 'Escape' || evt.key === 'Esc') {
    if (isModalOpened) {
      evt.preventDefault();
      controlPopupLogin();
    }
  }
}

loginPopupCLoseButton.addEventListener('click', () => {
  isModalOpened = false;
  controlPopupLogin();
});

document.body.addEventListener('click', (evt) => {
  if (evt.target === loginPopup) {
    controlPopupLogin();
  }
})

document.addEventListener('keydown', onKeyPress);

const EMAIL_INPUT_VALUE_STORAGE_KEY = 'loginFormInputValue';

emailInput.value = localStorage.getItem(EMAIL_INPUT_VALUE_STORAGE_KEY);

emailInput.addEventListener('change', (evt) => {
  localStorage.setItem(EMAIL_INPUT_VALUE_STORAGE_KEY, evt.target.value)
})

const swiper = new Swiper('.swiper', {
  direction: 'horizontal',
  loop: false,
  slidesPerView: 4,
  slidesPerGroup: 4,

  pagination: {
    el: '.swiper-pagination',
    bulletClass: 'swiper-pagination__item',
    clickable: true,
    type: 'bullets',
    renderBullet: function (index, className) {
      return '<button class="' + className + '">' + (index + 1) + "</button>";
    },
  },

  navigation: {
    nextEl: '.button-next',
    prevEl: '.button-prev',
  },

  breakpoints: {
    320: {
      pagination: {
        type: 'fraction',
      },
      slidesPerView: 2,
      slidesPerGroup: 2,
    },

    768: {
      pagination: {
        type: 'bullets',
      },
      slidesPerView: 2,
      slidesPerGroup: 2,
    },

    1024: {
      slidesPerView: 4,
      slidesPerGroup: 4,
    },
  },
});
