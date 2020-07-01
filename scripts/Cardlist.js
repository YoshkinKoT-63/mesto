class CardList {
  constructor(placesList, createCard) {
    this.placesList = placesList;
    this.createCard = createCard;
  }

  addCard = (place) => {
    this.placesList.appendChild(this.createCard(place));
  };

  render(data) {
    data.forEach(place => {
        this.addCard(place)
      });
    };
}