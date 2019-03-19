class CardList{
    static all() {
        return fetch('http://localhost:3030/api/cards')
            .then((response) => response.json())
    }
}

export default CardList