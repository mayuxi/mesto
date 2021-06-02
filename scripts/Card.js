import { popupModal, modalSrc, modalTitle } from '../utils/constants.js';
import { openPopup } from '../utils/utils.js';

class Card {
  // передаем данные карточки и селектор
  constructor(data, cardSelector) {
    this._name = data.name;
		this._link = data.link;
    this._cardSelector = cardSelector;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.photo-grid__item')
      .cloneNode(true);

    this._element = cardElement;
  }

	_setEventListeners() {
		this._element.querySelector('.photo-grid__pic').addEventListener('click', () => {
			this._handleCardClick();
		});

    this._element.querySelector('.photo-grid__like').addEventListener('click', () => {
			this._handleCardLike();
		});

    this._element.querySelector('.photo-grid__delete').addEventListener('click', () => {
			this._handleCardDelete();
		});
	}

  // Модальное окно для просмотра фотографий
  _handleCardClick() {
    
    openPopup(popupModal);
    modalTitle.textContent = this._name;
    modalSrc.alt = this._name;
    modalSrc.src = this._link;

  }

  // Удаление карточки
  _handleCardDelete() {
    this._element.remove();
  }

  // Лайк карточки
  _handleCardLike() {
    this._element.querySelector('.photo-grid__like').classList.toggle('photo-grid__like_active');
  }

  generateCard() {
    this._getTemplate();
    this._setEventListeners();

    this._element.querySelector('.photo-grid__pic').src = this._link;
    this._element.querySelector('.photo-grid__pic').alt = this._name;
    this._element.querySelector('.photo-grid__title').textContent = this._name;

    return this._element;
  }

}

export default Card;