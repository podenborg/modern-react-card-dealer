import React, { Component } from 'react';
import axios from 'axios';
import './CardDealer.css';
import Card from './Card';

const API_BASE_URL = "https://deckofcardsapi.com/api/deck/";

class CardDealer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            deck_id: null,
            drawnCards: []
        }
        this.getCard = this.getCard.bind(this);
    }
    async componentDidMount() {
        try {
            const response = await axios.get(`${API_BASE_URL}new/shuffle/`);
            const deck_id = response.data.deck_id;
            this.setState(() => { return { deck_id }});
        }
        catch (error) {
            console.log(error);
        }
    }
    async getCard() {
        let cardURL = `${API_BASE_URL}${this.state.deck_id}/draw/`;
        try {
            const res = await axios.get(cardURL);
            const card = res.data.cards[0];
            this.setState(st => {
                return { 
                    drawnCards: [...st.drawnCards, card]
                }
            });
        }
        catch(error) {
            console.log(error);
        }
    }
    render() {
        const drawnCards = this.state.drawnCards.map(card => 
            <Card 
                imgSrc={card.image} 
                alt={`${card.value} of ${card.suit}`} 
            />
        )
        return (
            <div className='CardDealer'>
                <div>
                    <h1 className="CardDealer-title">CARD DEALER</h1>
                    <h3 className="CardDealer-title subtitle">A LITTLE DEMO MADE WITH REACT</h3>
                    <button className="CardDealer-btn" onClick={this.getCard}>DEAL ME A CARD</button>
                </div>
                <div className='CardDealer-cardarea'>
                    {drawnCards}
                </div>
            </div>
        );
    }
}

export default CardDealer;