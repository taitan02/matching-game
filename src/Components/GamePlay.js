import SingleCard from "./SingleCard";
import '../assets/Styles/GamePlay.css';
import { useState, useEffect } from 'react';

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
    const [turns,setTurns]=useState(0)
    const [choiceOne, setChoiceOne] = useState(null)
    const [choiceTwo, setChoiceTwo] = useState(null)
    const [disable, setDisable] = useState(false)
    const [display,setDisplay]=useState(false)

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
    }
    const handleChoice = (card) => {
        !choiceOne ? setChoiceOne(card) : setChoiceTwo(card)

    }
    useEffect(() => {
        if (choiceTwo) {
            setDisable(true)
            if (choiceOne.src === choiceTwo.src) {
                setCards(cards => {
                    return cards.map(card => {
                        if (card.src === choiceOne.src) {
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
                
            }, 1000)
            setTimeout(()=>{
                setDisable(false)
            },1200)
            setTurns(turns+1)
        }
    }, [choiceTwo])
    console.log(cards)
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
        </div>
    )
}
export default GamePlay