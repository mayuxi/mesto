import { 
  initialCards, config,
  photoTitleInput, photoLinkInput, photoContainer, 
  formPhoto, formProfile,
  popupPhoto, popupProfile, popupModal, ESCAPE_KEY,
  profileJob, profileName, jobInput, nameInput,
  editButton, addButton, closePhotoButton, closeProfileButton, modalClose
} from '../utils/constants.js';
import { openPopup, closePopup } from '../utils/utils.js'
import Card from './Card.js';
import FormValidator from './FormValidator.js';

class Section {
  constructor({ items, renderer }, containerSelector) {
    this._renderedItems = items;
    this._renderer = renderer;
    
    this._container = document.querySelector(containerSelector);
  }

  renderItems() {
    this._renderedItems.forEach(item => this._renderer(item))
  }

  addItem(element) {
    this._container.append(element);
  }
}

class Popup {
  constructor( popupSelector ) {
    this._element = document.querySelector(popupSelector);
  }

  open() {
    this._element.classList.add('popup_opened');
  }

  close() {
    this._element.classList.remove('popup_opened');
  }

  _handleEscClose() {
    // проверяем есть ли открытый попап и только тогда закрываем
    if (document.querySelector('.popup_opened') && evt.key === ESCAPE_KEY) { 
      this.close(_activePopup);
    }
  }

  setEventListeners() {
    this._element.querySelector('.popup__close').addEventListener('click', () => { this.close() });

    // добавляем слушатель клика иконке закрытия попапа и по Escape
    document.addEventListener('keydown', this._handleEscClose);
  }
}

class PopupWithImage extends Popup {
  constructor( popupSelector, src, name ) {
    super(popupSelector);
    this._src = src;
    this._name = name;
  }

  open() {
    this._element.classList.add('popup_opened');
    modalTitle.textContent = this._name;
    modalSrc.alt = this._name;
    modalSrc.src = this._link;
  }
}

class PopupWithForm extends Popup {
  constructor( popupSelector, handleFormSubmit ) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;

    this._form = popupSelector.querySelector('.form');
  }

  setEventListeners() {
    this._element.querySelector('.popup__close').addEventListener('click', () => { this.close() });
    // добавляем слушатель клика иконке закрытия попапа и по Escape
    document.addEventListener('keydown', this._handleEscClose);

    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());

      this._form.reset();
    })
  }

  _getInputValues() {
    this._inputList = this._element.querySelectorAll('.form__input');
    
    this._formValues = {};
    this._inputList.forEach(input => this._formValues[input.name] = input.value);
    
    return this._formValues;
  }

  close() {
    this._element.classList.remove('popup_opened');
    this._form.reset();
  }

}

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