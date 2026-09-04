import './Card.css'
import { useState } from 'react'

function Card({ frontImage, hiddenImage, alt = 'Interactive card' }) {
  const [position, setPosition] = useState({ x: 50, y: 50 })

  function handleMouseMove(event) {
    const rect = event.currentTarget.getBoundingClientRect()

    const x = ((event.clientX - rect.left) / rect.width) * 100
    const y = ((event.clientY - rect.top) / rect.height) * 100

    setPosition({ x, y })
  }

  return (
    <article
      className="card"
      onMouseMove={handleMouseMove}
    >
      <div className="card__scene">
        <div className="card__layer card__layer--front">
          <img
            src={frontImage}
            alt={alt}
            className="card__image"
          />
        </div>

        <div
          className="card__layer card__layer--hidden"
          style={{
            '--mouse-x': `${position.x}%`,
            '--mouse-y': `${position.y}%`,
          }}
        >
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