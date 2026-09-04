import './Card.css'

function Card({ frontImage, hiddenImage, alt = 'Interactive card' }) {
  return (
    <article className="card">
      <div className="card__scene">

        <div className="card__layer card__layer--front">
          <img
            src={frontImage}
            alt={alt}
            className="card__image"
          />
        </div>

        <div className="card__layer card__layer--hidden">
          <img
            src={hiddenImage}
            alt=""
            className="card__image"
            aria-hidden="true"
          />
        </div>

      </div>
    </article>
  )
}

export default Card