class UserInfo {
  constructor(userName, userAbout, userAvatar){
    this.userName = userName;
    this.userAbout = userAbout;
    this.userAvatar = userAvatar;
  }

  updateUserInfo(userData) {
    this.userName.textContent = userData.name;
    this.userAbout.textContent= userData.about;
  };

  updateUserAvatar(userData) {
    this.userAvatar.style.backgroundImage = `url(${userData.avatar})`;
    
  }
}