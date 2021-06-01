// Находим кнопки
const addButton = document.querySelector('.profile__add-button');
const editButton = document.querySelector('.profile__edit');

// Контейнер и шаблон для фото
const photoContainer = document.querySelector('.photo-grid');
const photoTemplate = document.querySelector('#photo-grid-template');

// Попапы
const popupProfile = document.querySelector('.popup_type_profile');
const popupPhoto = document.querySelector('.popup_type_photo');
const closeProfileButton = popupProfile.querySelector('.popup__close');
const closePhotoButton = popupPhoto.querySelector('.popup__close');

// Профайл
const formProfile = document.querySelector('.form_type_profile');
const nameInput = document.querySelector('.form__input_type_name'); 
const jobInput = document.querySelector('.form__input_type_job');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job'); 

// Фото
const formPhoto = document.querySelector('.form_type_photo');
const inputList = Array.from(formPhoto.querySelectorAll('.form__input'));
const buttonElement = formPhoto.querySelector('.form__submit');
const photoTitleInput = document.querySelector('.form__input_type_title');
const photoLinkInput = document.querySelector('.form__input_type_src'); 

const popupModal = document.querySelector('.popup_type_modal');
const modalClose = popupModal.querySelector('.popup__close');
const modalSrc = popupModal.querySelector('.popup__pic');
const modalTitle = popupModal.querySelector('.popup__pic-caption');

// Конфиг валидации
const config = {
  //formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit',
  inactiveButtonClass: 'form__submit_disabled',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active'
};

const initialCards = [
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