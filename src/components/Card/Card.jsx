import { circle, radialGradient } from 'motion/react-client'
import './Card.css'
import {
  motion,
  useMotionValue,
  useSpring,
  useMotionTemplate
} from 'motion/react'

function Card({ frontImage, hiddenImage, alt = 'Interactive card' }) {
  const mouseX = useMotionValue(50)
  const mouseY = useMotionValue(50)

  const smoothX = useSpring(mouseX, {
    stiffness: 300, damping: 30, mass: 0.4
  })

    const smoothY = useSpring(mouseY, {
    stiffness: 300, damping: 30, mass: 0.4
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

  function handlerMouseEnter() {
    revealRadius.set(90)

  }

  function handlerMouseLeave() {
    revealRadius.set(0)
  }

  return (
    <article
      className="card"
      onMouseMove={handleMouseMove}
      onMouseEnter={handlerMouseEnter}
      onMouseLeave={handlerMouseLeave}
    >
      <div className="card__scene">
        <div className="card__layer card__layer--front">
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
    </article>
  )
}

export default Card