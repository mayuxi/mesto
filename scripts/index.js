import { 
  initialCards, config,
  photoTitleInput, photoLinkInput, photoContainer, 
  formPhoto, formProfile,
  popupPhoto, popupProfile, popupModal,
  profileJob, profileName, jobInput, nameInput,
  editButton, addButton, closePhotoButton, closeProfileButton, modalClose
} from '../utils/constants.js';
import { openPopup, closePopup } from '../utils/utils.js'
import Card from './Card.js';
import FormValidator from './FormValidator.js';

// Создаем экземпляр карточки
function createCard(item) {
  const card = new Card(item, '#photo-grid-template');
  return card.generateCard();
}

// Обработчик формы для добавления фото
function handlePhotoFormSubmit (evt) {
  evt.preventDefault();

  const data = {};
  data.name = photoTitleInput.value;
  data.link = photoLinkInput.value;

	const newCard = createCard(data);
  photoContainer.prepend(newCard);

  // Очищаем поля
  formPhoto.reset();

  // Делаем кнопку неактивной
  validatePhoto.toggleButtonState();

  closePopup(popupPhoto);
}

// Подгружаем первые карточки
initialCards.forEach((item) => {
	const cardElement = createCard(item);
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

  // Проверяем валидность полей, если закрыт попап без отправки формы
  validateProfile.hideInputErrors();
}

// включение валидации вызовом enableValidation
// все настройки передаются при вызове
const validateProfile = new FormValidator(config, formProfile);
const validatePhoto = new FormValidator(config, formPhoto);
validateProfile.enableValidation();
validatePhoto.enableValidation();

// Вешаем события и обработчики:
formProfile.addEventListener('submit', handleProfileFormSubmit);
formPhoto.addEventListener('submit', handlePhotoFormSubmit);

editButton.addEventListener('click', editProfile);
addButton.addEventListener('click', () => { openPopup(popupPhoto); });
closeProfileButton.addEventListener('click', () => { closePopup(popupProfile) });
closePhotoButton.addEventListener('click', () => { closePopup(popupPhoto) });
modalClose.addEventListener('click', () => { closePopup(popupModal) });