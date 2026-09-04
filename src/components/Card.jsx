import './Card.css'

function Card({ frontImage, hiddenImage, alt = 'Interactive card'}){
    return(
        <article className="card">
            <div className="card_scene">

                <div 
                    className="card__layer card__layer--front">
                    <img src={frontImage} alt={alt} />
                </div>
                <div className='card__layer card__layer--hidden'>
                    <img src={hiddenImage} 
                    alt="" 
                    aria-hidden="true" 
                    />
                </div>
            </div>
        </article>
    )
}

export default Card