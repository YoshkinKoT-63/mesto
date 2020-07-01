class UserInfoPopup extends Popup {
  constructor(popup, openButton, popupForm, userInfo, editProfileFormValidator, api) {
    super(popup);
    this.openButton = openButton;
    this.popupForm = popupForm;
    this.popupButton = this.popupForm.querySelector('.button');
    this.userInfo = userInfo;
    this.editProfileFormValidator = editProfileFormValidator;
    this.api = api;
  }

  resetForm = () => {
    this.editProfileFormValidator.setButtonActive(this.popupButton);
    this.editProfileFormValidator.resetValidationErrors(this.popupForm);
    this.popupForm.elements.infoName.value = this.userInfo.userName.textContent;
    this.popupForm.elements.infoAbout.value = this.userInfo.userAbout.textContent;
  };

  submit = (event) => {
    event.preventDefault();
    this.api.setUserInfo(this.popupForm.elements.infoName.value, this.popupForm.elements.infoAbout.value)
    .then((userData) => {
      this.userInfo.updateUserInfo(userData);
      super.close();
    })
    .catch(err => {
      alert(err);
    });
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