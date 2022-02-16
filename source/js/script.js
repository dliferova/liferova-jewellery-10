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

