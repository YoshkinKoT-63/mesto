'use strict';
//-------------------------------------------------------------------------------------------------------
//переменные
const placesList = document.querySelector('.places-list'); //контейнер с карточками
const popupAddPlace = document.querySelector('.popup_type_add-place'); // всплывающее окно добавления карточки
const popupEditProfile = document.querySelector('.popup_type_edit-info'); // всплывающее окно редактирования профиля
const popupImage = document.querySelector('.popup_type_image'); //всплывающее окно с изображением
const addPlaceButton = document.querySelector('.user-info__button'); //кнопка "+" добавления карточки
const editInfoButton = document.querySelector('.user-info__edit-button'); //кнопка "Edit"
const userName = document.querySelector('.user-info__name');//имя пользователя
const userAbout = document.querySelector('.user-info__job');//род деятельности пользователя
const userAvatar = document.querySelector('.user-info__photo');// фото/аватар пользователя
const addPlacePopupButton = document.querySelector('.popup__button_add-place'); //кнопка "+" формы ввода
const popupForm = document.forms.new;//форма ввода новой карточки
const formProfile = document.forms.profile;//форма редактирования профиля
let userId = null;


//-------------------------------------------------------------------------------------------------------
//Объекты
const api = new Api(config);
const userInfo = new UserInfo(userName, userAbout, userAvatar);
const editProfileFormValidator = new FormValidator(formProfile, errorMessages);
const addPlaceFormValidator = new FormValidator(popupForm, errorMessages);
const cardList = new CardList(placesList, createCard);
const addPlacePopup = new AddPlacePopup (popupAddPlace, addPlaceButton, popupForm, cardList, addPlaceFormValidator, api);
const editProfilePopup = new UserInfoPopup(popupEditProfile, editInfoButton, formProfile, userInfo, editProfileFormValidator, api);
const imagePopupClass = new ImagePopup(popupImage);

//--------------------------------------------------------------------------------------------------------
//Функции

// добавление карты
function createCard(place) {
  const newCard = new Card(place, showCard, api, userId);
  return newCard.create();
} 

function showCard(url) {
  imagePopupClass.showImage(url);
} 

//--------------------------------------------------------------------------------------------------------
//Обработчики событий
addPlacePopup.setEventListeners();
editProfilePopup.setEventListeners();
imagePopupClass.setEventListeners();
editProfileFormValidator.setEventListeners();
addPlaceFormValidator.setEventListeners();

//--------------------------------------------------------------------------------------------------------
//вызов функций
Promise.all([
  api.getUserInfo(),
  api.getCards()
  ])
.then(values => {
  const [userData, cards] = values;
  userId = userData._id;
  userInfo.updateUserInfo(userData);
  userInfo.updateUserAvatar(userData);
  cardList.render(cards);
})
.catch((err) => {
  console.log(err);
})


/*
  Хорошая работа, класс Api создан, данные с сервера приходят и отправляются. Отлично, что сделана часть дополнительного
  задания. Но к организации обмена с сервером есть несколько замечаний:

  Надо исправить:
  - + для загрузки начальных данных использовать Promise.all и передавать уже готовые данные в методы updateUserInfo и render
  - + все изменения на странице должны происходить, только после того, как
  сервер ответил подтверждением - в том чесле закрытие попапа
  - + в ответ на отправку данных профиля сервер возвращает обновленные данные
    Нужно использовать их, а не делать запрос ещё раз

  Можно лучше: 
  - + проверка ответа сервера и преобразование из json
    дублируется во всех методах класса Api, лучше вынести в отдельный метод

*/

/*
  Отлично, все замечания исправлены

  Для закрепления полученных знаний советую сделать и оставшуюся часть дополнительного задания.
  
  Если у Вас будет свободное время так же попробуйте освоить работу с сервером
  применив async/await для работы с асинхронными запросами.
  https://learn.javascript.ru/async-await
  https://habr.com/ru/company/ruvds/blog/414373/
  https://www.youtube.com/watch?v=SHiUyM_fFME
  Это часто используется в реальной работе

  Успехов в дальнейшем обучении!
*/
