// Находим кнопки
const addButton = document.querySelector('.profile__add-button');
const closeButton = document.querySelectorAll('.popup__close');
const editButton = document.querySelector('.profile__edit');

// Контейнер и шаблон для фото
const photoContainer = document.querySelector('.photo-grid');
const photoTemplate = document.querySelector('#photo-grid-template');

// Попапы
const popup = document.querySelector('.popup');
const popupProfile = document.querySelector('.popup_type_profile');
const popupPhoto = document.querySelector('.popup_type_photo');

// Профайл
const formProfile = document.querySelector('.form_type_profile');
const nameInput = document.querySelector('.form__input_type_name'); 
const jobInput = document.querySelector('.form__input_type_job');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job'); 

// Фото
const formPhoto = document.querySelector('.form_type_photo');
const photoTitleInput = document.querySelector('.form__input_type_title');
const photoLinkInput = document.querySelector('.form__input_type_src'); 

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

function addPhoto(name, link) {
  function handleDeletePhoto(e) {
    e.target.closest('.photo-grid__item').remove();
  }

  function handleLike(e) {
    e.target.classList.toggle('photo-grid__like_active');
  }

  const newPhoto = photoTemplate.content.querySelector('.photo-grid__item').cloneNode(true);
  const photoSrc = newPhoto.querySelector('.photo-grid__pic');
  const photoTitle = newPhoto.querySelector('.photo-grid__title');
  const deleteButton = newPhoto.querySelector('.photo-grid__delete');
  const likeButton = newPhoto.querySelector('.photo-grid__like');

  photoTitle.textContent = name;
  photoSrc.alt = name;
  photoSrc.src = link;

  function handleModal() {
    const popupModal = document.querySelector('.popup_type_modal');
    const modalClose = popupModal.querySelector('.popup__close');
    const modalSrc = document.createElement('img');
    const modalTitle = document.createElement('h2');

    modalSrc.classList.add('popup__pic');
    modalTitle.classList.add('popup__pic-caption')
    popupModal.querySelector('.popup__container').append(modalSrc, modalTitle);

    popupOpen(popupModal);
    modalTitle.textContent = name;
    modalSrc.alt = name;
    modalSrc.src = link;

    modalClose.addEventListener('click', () => { modalSrc.remove(); modalTitle.remove(); });

    // Если это модальное окно, чистим содержимое при закрытии
    // if (currentPopup.classList.contains('popup_type_modal')) {
    //   console.log(currentPopup.querySelector('.popup__container'));
    //   const modalContainer = currentPopup.querySelector('.popup__container');
    //   modalContainer.getElementsByTagName('img').remove;
    //   modalContainer.getElementsByTagName('h2').remove;
    // }
  }

  deleteButton.addEventListener('click', handleDeletePhoto);
  likeButton.addEventListener('click', handleLike);
  photoSrc.addEventListener('click', handleModal);

  return newPhoto;
}

initialCards.forEach(function(item) {
  const newCard = addPhoto(item['name'], item['link']);
  photoContainer.append(newCard);
});

// Обработчик «отправки» формы
function formSubmitHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

    // Получите значение полей jobInput и nameInput из свойства value
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value; 

    // Форма добавления фото
    if (photoTitleInput.value && photoLinkInput.value) {
      photoContainer.prepend(addPhoto(photoTitleInput.value, photoLinkInput.value));
      // Очищаем поля
      photoTitleInput.value = '';
      photoLinkInput.value = '';
    }

    // Закрываем попап
    popupClose();
}

function popupOpen(popupName) {
  popupName.classList.add('popup_opened');

  if (popupName === popupProfile) {
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
  }
}

function popupClose() {
  let currentPopup = document.querySelector('.popup_opened');
  currentPopup.classList.remove('popup_opened');
}

closeButton.forEach(item => {
  item.addEventListener('click', popupClose);
});

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formProfile.addEventListener('submit', formSubmitHandler);
formPhoto.addEventListener('submit', formSubmitHandler);

editButton.addEventListener('click', () => { popupOpen(popupProfile); });
addButton.addEventListener('click', () => { popupOpen(popupPhoto); });