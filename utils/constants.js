// Находим кнопки
export const addButton = document.querySelector('.profile__add-button');
export const editButton = document.querySelector('.profile__edit');

// Контейнер и шаблон для фото
export const photoContainer = document.querySelector('.photo-grid');
export const photoTemplate = document.querySelector('#photo-grid-template');

// Попапы
export const popupProfile = document.querySelector('.popup_type_profile');
export const popupPhoto = document.querySelector('.popup_type_photo');
export const closeProfileButton = popupProfile.querySelector('.popup__close');
export const closePhotoButton = popupPhoto.querySelector('.popup__close');
export const ESCAPE_KEY = 'Escape';

// Профайл
export const formProfile = document.querySelector('.form_type_profile');
export const nameInput = document.querySelector('.form__input_type_name'); 
export const jobInput = document.querySelector('.form__input_type_job');
export const profileName = document.querySelector('.profile__name');
export const profileJob = document.querySelector('.profile__job'); 

// Фото
export const formPhoto = document.querySelector('.form_type_photo');
export const inputList = Array.from(formPhoto.querySelectorAll('.form__input'));
export const buttonElement = formPhoto.querySelector('.form__submit');
export const photoTitleInput = document.querySelector('.form__input_type_title');
export const photoLinkInput = document.querySelector('.form__input_type_src'); 

export const popupModal = document.querySelector('.popup_type_modal');
export const modalClose = popupModal.querySelector('.popup__close');
export const modalSrc = popupModal.querySelector('.popup__pic');
export const modalTitle = popupModal.querySelector('.popup__pic-caption');

// Конфиг валидации
export const config = {
  //formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit',
  inactiveButtonClass: 'form__submit_disabled',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active'
};

export const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];