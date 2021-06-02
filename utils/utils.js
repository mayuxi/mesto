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
  document.removeEventListener('click', handleOverlayClick);
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

export { openPopup, closePopup, handleHotkey, handleOverlayClick };