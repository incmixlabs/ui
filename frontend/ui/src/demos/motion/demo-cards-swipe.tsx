"use client"
import { motion } from "framer-motion"
import { useState } from "react"

import { CardSwipe, CardsSwipeContainer } from "../../components/card/cards-swipe"

export default function DemoCardsSwipe() {
  const [cards, setCards] = useState(DEMO_CARDS)

  const sendToBack = (id: number) => {
    setCards((prev) => {
      const newCards = [...prev]
      const index = newCards.findIndex((card) => card.id === id)
      const [card] = newCards.splice(index, 1)
      newCards.unshift(card)
      return newCards
    })
  }

  return (
    <CardsSwipeContainer style={{ perspective: 600 }}>
      {cards.map((card, index) => {
        return (
          <CardSwipe key={card.id} onSendToBack={() => sendToBack(card.id)}>
            <motion.div
              className="h-full w-full rounded-lg"
              animate={{
                rotateZ: (cards.length - index - 1) * 4,
                scale: 1 + index * 0.06 - cards.length * 0.06,
                transformOrigin: "90% 90%",
              }}
              initial={false}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
            >
              <img
                src={card.img}
                alt="card"
                className="pointer-events-none h-full w-full rounded-lg object-cover"
              />
            </motion.div>
          </CardSwipe>
        )
      })}
    </CardsSwipeContainer>
  )
}

/*´:°•.°+.*•´.*:˚.°*.˚•´.°:°•.°•.*•´.*:˚.°*.˚•´.°:°•.°+.*•´.*:*/
/*                        CONSTANTS                           */
/*.•°:°.´+˚.*°.˚:*.´•*.+°.•°:´*.´•*.•°.•°:°.´:•˚°.*°.˚:*.´+°.•*/

const DEMO_CARDS = [
  {
    id: 1,
    z: 4,
    img: "https://i.pinimg.com/736x/d7/bd/94/d7bd94a0231456ac7f6885de1eccd943.jpg",
  },
  {
    id: 2,
    z: 3,
    img: "https://i.pinimg.com/236x/fd/5d/14/fd5d146cf06e32d30139e4e3f37c993c.jpg",
  },
  {
    id: 3,
    z: 2,
    img: "https://i.pinimg.com/564x/c6/f8/e9/c6f8e988912e469686c431cc680ef49e.jpg",
  },
  {
    id: 4,
    z: 1,
    img: "https://i.pinimg.com/564x/1a/d6/b1/1ad6b124fee1e478689a9fda0c74e92f.jpg",
  },
  {
    id: 5,
    z: 0,
    img: "https://i.pinimg.com/236x/bf/1d/d9/bf1dd9251d0e7f1936bdb9d95a480295.jpg",
  },
]
