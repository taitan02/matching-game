import '../assets/Styles/SingleCard.css'

function SingleCard({ card, handleChoice, flipped,disable }) {

    const handleClick = () => {
        !disable && handleChoice(card)
    }
    return (
        <div className='card'>
            <div className={flipped ? 'flipped' : ''}>
                <img src={process.env.PUBLIC_URL+card.src} alt='front-card' className='front-card' />
                <img
                    className='back-card'
                    src={process.env.PUBLIC_URL+'/photos/cover.png'}
                    alt='back-card'
                    onClick={handleClick}
                />
            </div>
        </div>
    )
}
export default SingleCard