class AddPlacePopup extends Popup {
  constructor(popup, openButton, popupForm, cardList, addPlaceFormValidator, api) {
    super(popup);
    this.openButton = openButton;//кнопка открытия окна
    this.popupForm = popupForm; // перезаписывается родительский
    this.cardList = cardList;
    this.popupButton = this.popupForm.querySelector('.button');
    this.addPlaceFormValidator = addPlaceFormValidator;
    this.api = api;
  }

  resetForm = () => {
    this.popupForm.reset();
    this.addPlaceFormValidator.setButtonInactive(this.popupButton);
    this.addPlaceFormValidator.resetValidationErrors(this.popupForm);
  };

  submit = (event) => {
    event.preventDefault();
    this.api.uploadCard(this.popupForm.elements.name.value, this.popupForm.elements.link.value)
    .then((res) => {
      this.cardList.addCard(res);
      super.close();
    })
    .catch(err => {
      console.log(err);
    })
  };

  open() {
    this.resetForm();
    super.open();
  };

  setEventListeners = () => {
    super.setEventListeners();
    this.openButton.addEventListener('click', () => {this.open()});//открытие по заданной кнопке
    this.popupForm.addEventListener('submit', this.submit);
  };
}