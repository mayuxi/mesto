// import Card from './Card.js'

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

// Подгружаем первые карточки
initialCards.forEach((item) => {
  const card = new Card(item, '#photo-grid-template');

	const cardElement = card.generateCard();

	photoContainer.append(cardElement);
});

// Обработчик формы для добавления фото
function handlePhotoFormSubmit (evt) {
  evt.preventDefault();

  const data = {};
  data.name = photoTitleInput.value;
  data.link = photoLinkInput.value;

  const card = new Card(data, '#photo-grid-template');
	const cardElement = card.generateCard();

  photoContainer.prepend(cardElement);

  // Очищаем поля
  formPhoto.reset();

  // Делаем кнопку неактивной
  toggleButtonState(inputList, buttonElement);

  closePopup(popupPhoto);
}

// Обработчик «отправки» формы
function handleProfileFormSubmit (evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

  // Получите значение полей jobInput и nameInput из свойства value
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value; 

  // Закрываем попап
  closePopup(popupProfile);
}

function editProfile() {
  openPopup(popupProfile);

  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;

  // проверяем валидность полей при открытии 
  checkInputValidity(formProfile, nameInput);
  checkInputValidity(formProfile, jobInput);
}

function openPopup(popupName) {
  popupName.classList.add('popup_opened');

  // добавляем обработчики закрытия по Escape и клику на overlay
  document.addEventListener('keydown', handleHotkey);
  document.addEventListener('mousedown', handleOverlayClick);
}

function closePopup(popupName) {
  popupName.classList.remove('popup_opened');
  
  // удаляем обработчики закрытия по Escape и клику на overlay
  document.removeEventListener('keydown', handleHotkey);
  document.removeEventListener('mousedown', handleOverlayClick);
}

function handleHotkey(evt) {
  // проверяем есть ли открытый попап и только тогда закрываем
  const activePopup = document.querySelector('.popup_opened');
  if (activePopup && evt.key === 'Escape') { 
    closePopup(activePopup);
  }
}

function handleOverlayClick(evt) {
  const activePopup = document.querySelector('.popup_opened');
  
  if (activePopup && evt.target === activePopup ) {
    closePopup(activePopup);
  }
}

// включение валидации вызовом enableValidation
// все настройки передаются при вызове
const config = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit',
  inactiveButtonClass: 'form__submit_disabled',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active'
};

enableValidation(config);

// Вешаем события и обработчики:
formProfile.addEventListener('submit', handleProfileFormSubmit);
formPhoto.addEventListener('submit', handlePhotoFormSubmit);

editButton.addEventListener('click', editProfile);
addButton.addEventListener('click', () => { openPopup(popupPhoto); });
closeProfileButton.addEventListener('click', () => { closePopup(popupProfile) });
closePhotoButton.addEventListener('click', () => { closePopup(popupPhoto) });
modalClose.addEventListener('click', () => { closePopup(popupModal) });