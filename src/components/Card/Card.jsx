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

  const tiltX = useMotionValue(0)
    
  const tiltY = useMotionValue(0)

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

  const smoothTiltX = useSpring(tiltX, {
    stiffness: 220,
    damping: 24,
    mass: 0.5
    })

    const smoothTiltY = useSpring(tiltY, {
    stiffness: 220,
    damping: 24,
    mass: 0.5
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
      black 78%,
      transparent 100%
    )
  `

  function handleMouseMove(event) {
    const rect = event.currentTarget.getBoundingClientRect()

    const x = ((event.clientX - rect.left) / rect.width) * 100
    const y = ((event.clientY - rect.top) / rect.height) * 100

    mouseX.set(x)
    mouseY.set(y)
    
    const rotateY= (x - 50) * 0.45
    const rotateX=(50-y) * 0.45

    tiltX.set(rotateX)
    tiltY.set(rotateY)
  }

  function handleMouseEnter() {    
    const rect = event.currentTarget.getBoundingClientRect()

    const x = ((event.clientX - rect.left) / rect.width) * 100
    const y = ((event.clientY - rect.top) / rect.height) * 100

    mouseX.set(x)
    mouseY.set(y)

    revealRadius.set(90)
  }

  function handleMouseLeave() {
    revealRadius.set(0)
    tiltX.set(0)
    tiltY.set(0)
  }

  function handleClick() {
    setIsFlipped((current) => !current)
  }

  return (
    <motion.article
      className="card"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      style={{
        rotateX: smoothTiltX,
        rotateY: smoothTiltY
      }}
    >
      <motion.div
        className="card__scene"
        animate={{
          rotateY: isFlipped ? 180 : 0,
          scale: isFlipped ? 1.02 : 1
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
    </motion.article>
  )
}

export default Card