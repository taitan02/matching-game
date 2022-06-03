import SingleCard from "./SingleCard";
import '../assets/Styles/GamePlay.css';
import { useState, useEffect } from 'react';
import click from '../assets/sound/choice.mp3'
import matched from '../assets/sound/cat-matched.mp3'
import win from '../assets/sound/win.mp3'

const cardImages = [
    { "src": "/photos/buger-cat.png", matched: false },
    { "src": "/photos/milktea-cat.png", matched: false },
    { "src": "/photos/sushi-cat.png", matched: false },
    { "src": "/photos/cat-fish.png", matched: false },
    { "src": "/photos/cream.png", matched: false },
    { "src": "/photos/cat-break.png", matched: false },
]

function GamePlay() {
    const [cards, setCards] = useState([])
    const [turns, setTurns] = useState(0)
    const [choiceOne, setChoiceOne] = useState(null)
    const [choiceTwo, setChoiceTwo] = useState(null)
    const [disable, setDisable] = useState(false)
    const [display, setDisplay] = useState(false)
    const [end, setEnd] = useState(false)

    const shuffleCards = () => {
        const doubleCard = [...cardImages, ...cardImages]
        const shuffled = doubleCard
            .sort(() => Math.random() - 0.5)
            .map((card) => ({
                ...card,
                id: Math.random()
            }))
        setCards(shuffled)
        setChoiceOne(null)
        setChoiceTwo(null)
        setDisplay(true)
        setTurns(0)
        setEnd(false)
    }
    //handle when choice any card
    const handleChoice = (card) => {
        !choiceOne ? setChoiceOne(card) : setChoiceTwo(card)
        const audioClick = new Audio(click)
        audioClick.play()
    }
    //handle comparing between two card
    useEffect(() => {
        if (choiceTwo) {
            if (choiceOne.src === choiceTwo.src) {
                setCards(cards => {
                    return cards.map(card => {
                        if (card.src === choiceOne.src) {
                            const audioMatched = new Audio(matched)
                            audioMatched.play()
                            return {
                                ...card,
                                matched: true
                            }
                        } else return card
                    })
                }
                )
                setChoiceOne(null)
                setChoiceTwo(null)
            } else {
                setDisable(true)
                setTimeout(() => {    //delay to see front-card
                    setChoiceOne(null)
                    setChoiceTwo(null)
                    setDisable(false)
                }, 800)
            }
            setTurns(turns + 1)
        }
    }, [choiceTwo])

    // end game condition
    useEffect(() => {

        if (cards.length !== 0 && !cards.some(card => card.matched === false)) {
            setTimeout(() => {
                setEnd(true)
                const audioWin = new Audio(win)
                audioWin.play()
            }, 1000)
        }
    }, [cards])
    console.log(end)
    return (
        <div className='gamePlay'>
            <div className='game-name'>Matching Game</div>
            <button onClick={shuffleCards}>Game start</button>
            <div className='grid-container'>
                {cards.map((card) => (
                    <SingleCard
                        key={card.id}
                        card={card}
                        handleChoice={handleChoice}
                        flipped={card === choiceOne || card === choiceTwo || card.matched}
                        disable={disable}
                    />
                ))}
            </div>
            {display && <div className='turn'>Your turns is: {turns} turns</div>}
            {end && <div className='win'>YOU WIN </div>}
        </div>
    )
}
export default GamePlay