"use client"
// @ts-ignore
import { motion } from "framer-motion"
// import Image from "next/image"
import { useState } from "react"

import { cn } from "@utils/cn"
import { Card, Container, CardContainer } from "@base"

export type LayoutGridCard = {
  id: number
  content: React.ReactNode
  className?: string
  thumbnail: string
}

export function GridLayoutCard() {


  return (
    <Card.Root>
      <Card.Title>Lorem ipsum</Card.Title>
        <Card.Description>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua.
        </Card.Description>
    </Card.Root>
  )
}

/*´:°•.°+.*•´.*:˚.°*.˚•´.°:°•.°•.*•´.*:˚.°*.˚•´.°:°•.°+.*•´.*:*/
/*                        FUNCTIONS                           */
/*.•°:°.´+˚.*°.˚:*.´•*.+°.•°:´*.´•*.•°.•°:°.´:•˚°.*°.˚:*.´+°.•*/

export function LayoutGrid({ cards }: { cards: LayoutGridCard[] }) {
  const [selected, setSelected] = useState<LayoutGridCard | null>(null)
  const [lastSelected, setLastSelected] = useState<LayoutGridCard | null>(null)

  const handleClick = (card: LayoutGridCard) => {
    setLastSelected(selected)
    setSelected(card)
  }

  const handleOutsideClick = () => {
    setLastSelected(selected)
    setSelected(null)
  }

  return (
    <Container className="mx-auto grid h-full w-full max-w-7xl grid-cols-1 gap-4 md:grid-cols-3">
      {cards.map((card) => (
        <CardContainer key={card.id} className={"max-h-80"}>
          <motion.div
            onClick={() => handleClick(card)}
            className={cn(
              card.className,
              "relative overflow-hidden",
              selected?.id === card.id
                ? "absolute inset-0 z-50 m-auto flex h-1/2 w-full cursor-pointer flex-col flex-wrap items-center justify-center rounded-lg md:w-1/2"
                : lastSelected?.id === card.id
                  ? "z-40 h-full w-full rounded-xl bg-white"
                  : "h-full w-full rounded-xl bg-white"
            )}
            layout
          >
            {selected?.id === card.id && (
              <GridLayoutSelectedCard selected={selected} />
            )}
            <GridLayoutBlurImage card={card} />
          </motion.div>
        </CardContainer>
      ))}

      <motion.div
        onClick={handleOutsideClick}
        className={cn(
          "absolute top-0 left-0 z-10 h-full w-full bg-black opacity-0",
          selected?.id ? "pointer-events-auto" : "pointer-events-none"
        )}
        animate={{ opacity: selected?.id ? 0.3 : 0 }}
      />
    </Container>
  )
}

function GridLayoutBlurImage({ card }: { card: LayoutGridCard }) {
  const [loaded, setLoaded] = useState(false)

  return (
    <img
      src={card.thumbnail}
      height="500"
      width="500"
      onLoad={() => setLoaded(true)}
      className={cn(
        "absolute inset-0 h-full w-full object-cover object-top transition duration-200",
        loaded ? "blur-none" : "blur-md"
      )}
      alt="thumbnail"
    />
  )
}

function GridLayoutSelectedCard({
  selected,
}: { selected: LayoutGridCard | null }) {
  return (
    <div className="relative z-[60] flex h-full w-full flex-col justify-end rounded-lg bg-transparent shadow-2xl">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        className="absolute inset-0 z-10 h-full w-full bg-black opacity-60"
      />
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="relative z-[70] px-8 pb-4"
      >
        {selected?.content}
      </motion.div>
    </div>
  )
}
