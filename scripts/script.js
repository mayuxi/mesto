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
  // function handleRemoveTodo(e) {
  //     e.target.closest('.tasks__item').remove();
  // }

  function handleLike(e) {
    e.target.classList.toggle('photo-grid__like_active');
  }

  const newPhoto = photoTemplate.content.querySelector('.photo-grid__item').cloneNode(true);
  const photoSrc = newPhoto.querySelector('.photo-grid__pic');
  const photoTitle = newPhoto.querySelector('.photo-grid__title');
  const likeButton = newPhoto.querySelector('.photo-grid__like');
  //const cardRemoveButton = newTask.querySelector('.tasks__trash');

  photoTitle.textContent = name;
  photoSrc.src = link;

  //cardRemoveButton.addEventListener('click', handleRemoveTodo);
  likeButton.addEventListener('click', handleLike);

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

// function currentPopup() {
//   let x = document.querySelector('.popup_opened');
//   return x;
// }

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
//closeButton.addEventListener('click', popupClose);
editButton.addEventListener('click', () => { popupOpen(popupProfile); });
addButton.addEventListener('click', () => { popupOpen(popupPhoto); });