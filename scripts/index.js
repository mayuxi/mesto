import Card from './Card.js'
import FormValidator from './FormValidator.js'

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
  validation.toggleButtonState(inputList, buttonElement);

  closePopup(popupPhoto);
}

// Подгружаем первые карточки
initialCards.forEach((item) => {
  const card = new Card(item, '#photo-grid-template');

	const cardElement = card.generateCard();

	photoContainer.append(cardElement);
});

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

  // проверяем актуальность валидации полей на случай если были введены
  // неверные данные и закрыт попап (без сабмита)
  validation.checkInputValidity(formProfile, nameInput);
  validation.checkInputValidity(formProfile, jobInput);
}

// включение валидации вызовом enableValidation
// все настройки передаются при вызове
const validation = new FormValidator(config, '.form');
validation.enableValidation('.form');


// Вешаем события и обработчики:
formProfile.addEventListener('submit', handleProfileFormSubmit);
formPhoto.addEventListener('submit', handlePhotoFormSubmit);

editButton.addEventListener('click', editProfile);
addButton.addEventListener('click', () => { openPopup(popupPhoto); });
closeProfileButton.addEventListener('click', () => { closePopup(popupProfile) });
closePhotoButton.addEventListener('click', () => { closePopup(popupPhoto) });
modalClose.addEventListener('click', () => { closePopup(popupModal) });