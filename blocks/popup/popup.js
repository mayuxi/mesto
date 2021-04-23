// Находим кнопки «Закрыть», «Редактировать» и попап 
let closeButton = document.querySelector('.popup__close');
let editButton = document.querySelector('.profile__edit');
let popup = document.querySelector('.popup');

// Переключатель попапа
function popupToggle() {
  popup.classList.toggle('popup_opened');
}
// Вешаем функцию на кнопки
closeButton.addEventListener('click', popupToggle);
editButton.addEventListener('click', popupToggle);

// Закрываем попап по нажатию Escape
document.addEventListener('keydown', function(event) {
  // проверяем открыт ли попап
  if ( popup.classList.contains('popup_opened') ) {
    const key = event.key; // const {key} = event; in ES6+
    if (key === "Escape") {
      popupToggle();
    }
  }
});

// Находим форму в DOM
let formElement = document.querySelector('.popup__container'); // Воспользуйтесь методом querySelector()
// Находим поля формы в DOM
let nameInput = document.querySelector('.popup__input_type_name'); // Воспользуйтесь инструментом .querySelector()
let jobInput = document.querySelector('.popup__input_type_job');// Воспользуйтесь инструментом .querySelector()

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

    // Получите значение полей jobInput и nameInput из свойства value
    let name = nameInput.value;
    let job = jobInput.value;

    // Выберите элементы, куда должны быть вставлены значения полей
    let profileName = document.querySelector('.profile__name');
    let profileJob = document.querySelector('.profile__job'); 

    // Вставьте новые значения с помощью textContent
    profileName.textContent = name;
    profileJob.textContent = job;

    // Закрываем попап
    popupToggle();

}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);