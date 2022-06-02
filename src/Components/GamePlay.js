import SingleCard from "./SingleCard";
import '../assets/Styles/GamePlay.css';
import { useState, useEffect, useLayoutEffect } from 'react';
import click from '../assets/sound/choice.mp3'
import matched from '../assets/sound/matched.mp3'
import win from '../assets/sound/win.mp3'

const cardImages = [
    { "src": "/photos/helmet.png", matched: false },
    { "src": "/photos/potion.png", matched: false },
    { "src": "/photos/ring.png", matched: false },
    { "src": "/photos/shield.png", matched: false },
    { "src": "/photos/sword.png", matched: false },
    { "src": "/photos/scroll.png", matched: false },
]

function GamePlay() {
    const [cards, setCards] = useState([])
    const [turns, setTurns] = useState(0)
    const [choiceOne, setChoiceOne] = useState(null)
    const [choiceTwo, setChoiceTwo] = useState(null)
    const [disable, setDisable] = useState(false)
    const [display, setDisplay] = useState(false)
    const [end, setEnd] = useState(false)

    const audioClick = new Audio(click)
    const audioMatched = new Audio(matched)
    const audioWin = new Audio(win)

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
    const handleChoice = (card) => {
        !choiceOne ? setChoiceOne(card) : setChoiceTwo(card)

        audioClick.play()

    }

    //Xử lý khi chọn thẻ
    useEffect(() => {
        if (choiceTwo) {
            setDisable(true)
            if (choiceOne.src === choiceTwo.src) {
                setCards(cards => {
                    return cards.map(card => {
                        if (card.src === choiceOne.src) {
                            
                            audioMatched.play()
                            return {
                                ...card,
                                matched: true
                            }
                        } else return card
                    })
                }
                )
            }       //Chỗ nãy là else
            setTimeout(() => {
                setChoiceOne(null)
                setChoiceTwo(null)
                setDisable(false)
            }, 1000)
            setTurns(turns + 1)
        }
    }, [choiceTwo])

    // Xét điều kiện game kết thúc
    useEffect(() => {

        if (choiceTwo && !cards.some(card => card.matched === false)) {
            setEnd(true)
            audioWin.play()
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