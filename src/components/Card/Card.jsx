import './Card.css'

import { useState } from 'react'

import {
  motion,
  useMotionValue,
  useSpring,
  useMotionTemplate
} from 'motion/react'

function Card({ frontImage, hiddenImage, alt = 'Interactive card' }) {
  const [isFlipped, setIsFlipped] = useState(false)

  const mouseX = useMotionValue(50)
  const mouseY = useMotionValue(50)

  const smoothX = useSpring(mouseX, {
    stiffness: 300,
    damping: 30,
    mass: 0.4
  })

  const smoothY = useSpring(mouseY, {
    stiffness: 300,
    damping: 30,
    mass: 0.4
  })

  const revealRadius = useMotionValue(0)

  const smoothRadius = useSpring(revealRadius, {
    stiffness: 260,
    damping: 28,
    mass: 0.5
  })

  const maskImage = useMotionTemplate`
    radial-gradient(
      circle ${smoothRadius}px at ${smoothX}% ${smoothY}%,
      black 0%,
      black 70%,
      transparent 100%
    )
  `

  function handleMouseMove(event) {
    const rect = event.currentTarget.getBoundingClientRect()

    const x = ((event.clientX - rect.left) / rect.width) * 100
    const y = ((event.clientY - rect.top) / rect.height) * 100

    mouseX.set(x)
    mouseY.set(y)
  }

  function handleMouseEnter() {
    revealRadius.set(90)
  }

  function handleMouseLeave() {
    revealRadius.set(0)
  }

  function handleClick() {
    setIsFlipped((current) => !current)
  }

  return (
    <article
      className="card"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      <motion.div
        className="card__scene"
        animate={{
          rotateY: isFlipped ? 180 : 0
        }}
        transition={{
          duration: 0.7,
          ease: [0.22, 1, 0.36, 1]
        }}
      >

        <div className="card__face card__face--front">

          <div className="card__layer">
            <img
              src={frontImage}
              alt={alt}
              className="card__image"
            />
          </div>

          <motion.div
            className="card__layer card__layer--hidden"
            style={{
              maskImage,
              WebkitMaskImage: maskImage
            }}
          >
            <img
              src={hiddenImage}
              alt=""
              className="card__image"
              aria-hidden="true"
            />
          </motion.div>

        </div>


        <div className="card__face card__face--back">

          <div className="card__layer">
            <img
              src={hiddenImage}
              alt={alt}
              className="card__image"
            />
          </div>

          <motion.div
            className="card__layer card__layer--hidden"
            style={{
              maskImage,
              WebkitMaskImage: maskImage
            }}
          >
            <img
              src={frontImage}
              alt=""
              className="card__image"
              aria-hidden="true"
            />
          </motion.div>

        </div>

      </motion.div>
    </article>
  )
}

export default Card