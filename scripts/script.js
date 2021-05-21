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

// Добавление фото/мест
function addPhoto(name, link) {
  const newPhoto = photoTemplate.content.querySelector('.photo-grid__item').cloneNode(true);
  const photoSrc = newPhoto.querySelector('.photo-grid__pic');
  const photoTitle = newPhoto.querySelector('.photo-grid__title');
  const deleteButton = newPhoto.querySelector('.photo-grid__delete');
  const likeButton = newPhoto.querySelector('.photo-grid__like');

  photoTitle.textContent = name;
  photoSrc.alt = name;
  photoSrc.src = link;

  deleteButton.addEventListener('click', handleDeletePhoto);
  likeButton.addEventListener('click', handleLike);
  photoSrc.addEventListener('click', () => { handleModal(name, link) });

  return newPhoto;
}

// Подгружаем первые карточки (из initial-cards.js)
initialCards.forEach(function(item) {
  const newCard = addPhoto(item['name'], item['link']);
  photoContainer.append(newCard);
});

// Удаление фото
function handleDeletePhoto(e) {
  e.target.closest('.photo-grid__item').remove();
}

// Обработчик лайков
function handleLike(e) {
  e.target.classList.toggle('photo-grid__like_active');
}

// Модальное окно для просмотра фотографий
function handleModal(name, link) {
  openPopup(popupModal);
  modalTitle.textContent = name;
  modalSrc.alt = name;
  modalSrc.src = link;
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

// Форма для фото
function handlePhotoFormSubmit (evt) {
  evt.preventDefault();
  photoContainer.prepend(addPhoto(photoTitleInput.value, photoLinkInput.value));

  // Очищаем поля
  formPhoto.reset();

  // Делаем кнопку неактивной
  toggleButtonState(inputList, buttonElement);

  closePopup(popupPhoto);
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

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formProfile.addEventListener('submit', handleProfileFormSubmit);
formPhoto.addEventListener('submit', handlePhotoFormSubmit);

editButton.addEventListener('click', editProfile);
addButton.addEventListener('click', () => { openPopup(popupPhoto); });
closeProfileButton.addEventListener('click', () => { closePopup(popupProfile) });
closePhotoButton.addEventListener('click', () => { closePopup(popupPhoto) });
modalClose.addEventListener('click', () => { closePopup(popupModal) });