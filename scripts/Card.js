class Card {
  constructor(place, showCard, api, userId) {
    this.placeName = place.name;
    this.placeLink = place.link;
    this.cardId = place._id;
    this.owner = place.owner;
    this.showCard = showCard;
    this.api = api;
    this.userId = userId;
  }

//лайк
  like = () => {
    this.placeCardLikeIcon.classList.toggle('place-card__like-icon_liked');
  };

//удаление карточки
  remove = (event) => {
    event.stopPropagation();
    if(confirm('Вы точно хотите удалить эту карточку?')) {
      this.api.removeCard(this.cardId)
      .then(() => {
        this.placeCardLikeIcon.removeEventListener('click', this.like);
        this.placeCardDeleteIcon.removeEventListener('click', this.remove);
        this.placeCardImage.removeEventListener('click', this.openCard);
        this.placeCard.remove();
      })
      .catch(err => {
        console.log(err);
      })
    }
  };

  openCard = () => {
    this.showCard(this.placeLink);
  };
 
//создание карточки
  create = () => {
    //назначим переменные
    this.placeCard = document.createElement('div'); // карточка
    this.placeCardImage = document.createElement('div'); // фото
    this.placeCardDeleteIcon = document.createElement('button'); // кнопка удаления
    this.placeCardDescription = document.createElement('div'); // подпись
    this.placeCardName = document.createElement('h4'); //название
    this.placeCardLikeIcon = document.createElement('button'); // кнопка лайк

    //присвоим атрибуты
    this.placeCard.setAttribute('id', this.id);

    //присвоим классы
    this.placeCard.classList.add('place-card');
    this.placeCardImage.classList.add('place-card__image');
    
    this.placeCardDescription.classList.add('place-card__description');
    this.placeCardName.classList.add('place-card__name');
    this.placeCardLikeIcon.classList.add('place-card__like-icon');

    //собираем блок с фото
    

    //собираем блок с описанием
    this.placeCardDescription.appendChild(this.placeCardName);
    this.placeCardDescription.appendChild(this.placeCardLikeIcon);

    //собираем карточку из блоков фото и описание
    this.placeCard.appendChild(this.placeCardImage);
    this.placeCard.appendChild(this.placeCardDescription);

    //задаём название
      
    this.placeCard.querySelector('.place-card__name').textContent = this.placeName;
    //задаём фон блоку
    this.placeCard.querySelector('.place-card__image').style.backgroundImage = `url(${this.placeLink})`;

    //расставляем иконки удаления
    if (this.owner._id === this.userId) {
      this.placeCardDeleteIcon.classList.add('place-card__delete-icon');
      this.placeCardImage.appendChild(this.placeCardDeleteIcon);
    }

    //вешаем обработчики
    this.setEventListeners();

    //вернуть собранную карточку    
    return this.placeCard;
  };

//слушатели событий  
  setEventListeners = () => {
    this.placeCardLikeIcon.addEventListener('click', this.like);
    this.placeCardImage.addEventListener('click', this.openCard);
    if (this.owner._id === this.userId) {
      this.placeCardDeleteIcon.addEventListener('click', this.remove);
    }
  };
}
