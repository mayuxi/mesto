class FormValidator {
  constructor(config, formSelector) {

    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass

    this._formSelector = formSelector;

  }

  _showInputError = (formElement, inputElement, errorMessage) => {
    const _errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  
    inputElement.classList.add(this._inputErrorClass);
    _errorElement.classList.add(this._errorClass);
    _errorElement.textContent = errorMessage;
  };

  _hideInputError = (formElement, inputElement) => {
    
    const _errorElement = formElement.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.remove(this._inputErrorClass);
    _errorElement.classList.remove(this._errorClass);
    _errorElement.textContent = '';
  };

  _hasInvalidInput = (inputList) => {
    return inputList.some((input) => {
      return !input.validity.valid;
    });
  };

  _setEventListeners (formElement) {
    const inputList = Array.from(formElement.querySelectorAll(this._inputSelector));
    const buttonElement = formElement.querySelector(this._submitButtonSelector);
  
    // проверяем состояние кнопки в самом начале
    this.toggleButtonState(inputList, buttonElement);
    
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', function () {
        const validation = new FormValidator(config, '.form');
        
        validation.checkInputValidity(formElement, inputElement);
        validation.toggleButtonState(inputList, buttonElement);
      });
    });
  };

  checkInputValidity = (formElement, inputElement) => {
    if (!inputElement.validity.valid) {
      this._showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(formElement, inputElement);
    }
  };

  toggleButtonState = (inputList, buttonElement ) => {
    
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(this._inactiveButtonClass);
    } else {
      buttonElement.classList.remove(this._inactiveButtonClass);
    }
  };

  enableValidation = ( formSelector ) => {
    const formList = Array.from(document.querySelectorAll(formSelector));
    
    formList.forEach((formElement) => {
      formElement.addEventListener('submit', function (evt) {
        evt.preventDefault();
      });

      this._setEventListeners(formElement);
    });
    
  };

}

// const showInputError = (formElement, inputElement, errorMessage) => {
//   const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
//   const { inputErrorClass, errorClass } = config;

//   inputElement.classList.add(inputErrorClass);
//   errorElement.classList.add(errorClass);
//   errorElement.textContent = errorMessage;
// };

// const hideInputError = (formElement, inputElement) => {
//   const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
//   const { inputErrorClass, errorClass } = config;

//   inputElement.classList.remove(inputErrorClass);
//   errorElement.classList.remove(errorClass);
//   errorElement.textContent = '';
// };

// const checkInputValidity = (formElement, inputElement) => {
//   if (!inputElement.validity.valid) {
//     showInputError(formElement, inputElement, inputElement.validationMessage);
//   } else {
//     hideInputError(formElement, inputElement);
//   }
// };

// const setEventListeners = (formElement, { inputSelector, submitButtonSelector, ...restConfig }) => {
//   const inputList = Array.from(formElement.querySelectorAll(inputSelector));
//   const buttonElement = formElement.querySelector(submitButtonSelector);

//   // проверяем состояние кнопки в самом начале
//   toggleButtonState(inputList, buttonElement);

//   inputList.forEach((inputElement) => {
//     inputElement.addEventListener('input', function () {
//       checkInputValidity(formElement, inputElement);
//       toggleButtonState(inputList, buttonElement);
//     });
//   });
// };

// const toggleButtonState = (inputList, buttonElement ) => {

//   const { inactiveButtonClass } = config;

//   if (hasInvalidInput(inputList)) {
//     buttonElement.classList.add(inactiveButtonClass);
//   } else {
//     buttonElement.classList.remove(inactiveButtonClass);
//   }
// };

// const enableValidation = ({ formSelector, ...restConfig }) => {
//   const formList = Array.from(document.querySelectorAll(formSelector));
  
//   formList.forEach((formElement) => {
//     formElement.addEventListener('submit', function (evt) {
//       evt.preventDefault();
//     });

//     setEventListeners(formElement, restConfig);    
//   });
  
// };