// Находим кнопки «Закрыть», «Редактировать» и попап 
let closeButton = document.querySelector('.popup__close');
let editButton = document.querySelector('.profile__edit');
// Находим попап
let popup = document.querySelector('.popup');
// Находим форму
let formElement = document.querySelector('.form'); // Воспользуйтесь методом querySelector()
// Находим поля формы в DOM
let nameInput = document.querySelector('.form__input_type_name'); // Воспользуйтесь инструментом .querySelector()
let jobInput = document.querySelector('.form__input_type_job');// Воспользуйтесь инструментом .querySelector()
let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__job'); 

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

    // Получите значение полей jobInput и nameInput из свойства value
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value; 

    // Закрываем попап
    popupClose();
}

function popupOpen() {
  popup.classList.add('popup_opened');

  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

function popupClose() {
  popup.classList.remove('popup_opened');
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);
closeButton.addEventListener('click', popupClose);
editButton.addEventListener('click', popupOpen);

// Закрываем попап по нажатию Escape
document.addEventListener('keydown', function(event) {
  // проверяем открыт ли попап
  if ( popup.classList.contains('popup_opened') ) {
    const key = event.key; // const {key} = event; in ES6+
    if (key === "Escape") {
      popupClose();
    }
  }
});