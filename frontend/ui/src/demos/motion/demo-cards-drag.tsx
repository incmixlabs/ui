"use client"
import { useRef } from "react"

import {
  DragCard,
  DragCards,
  DragCardsTitle,
} from "@components/card/cards-drag"
import { clx } from "@utils/clx/clx-merge"

export default function DemoCardsDrag() {
  const containerRef = useRef(null)

  const DemoContainer = clx.section(
    "relative grid min-h-screen w-full place-content-center overflow-hidden bg-neutral-950"
  )

  return (
    <DemoContainer>
      <DragCardsTitle>CARDS</DragCardsTitle>

      <DragCards ref={containerRef}>
        {CARDS_DEMO.map((card) => (
          <DragCard
            key={`card_${card.id}`}
            containerRef={containerRef}
            src={card.src}
            alt={card.alt}
            rotate={card.rotate}
            top={card.top}
            left={card.left}
            className={card.className}
          />
        ))}
      </DragCards>
    </DemoContainer>
  )
}

/*´:°•.°+.*•´.*:˚.°*.˚•´.°:°•.°•.*•´.*:˚.°*.˚•´.°:°•.°+.*•´.*:*/
/*                        CONSTANTS                           */
/*.•°:°.´+˚.*°.˚:*.´•*.+°.•°:´*.´•*.•°.•°:°.´:•˚°.*°.˚:*.´+°.•*/

const CARDS_DEMO = [
  {
    id: "card-1",
    src: "https://images.unsplash.com/photo-1635373670332-43ea883bb081?q=80&w=2781&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Example image",
    rotate: "6deg",
    top: "20%",
    left: "25%",
    className: "w-36 md:w-56",
  },
  {
    id: "card-2",
    src: "https://images.unsplash.com/photo-1576174464184-fb78fe882bfd?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Example image",
    rotate: "12deg",
    top: "45%",
    left: "60%",
    className: "w-24 md:w-48",
  },
  {
    id: "card-3",
    src: "https://images.unsplash.com/photo-1503751071777-d2918b21bbd9?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Example image",
    rotate: "-6deg",
    top: "20%",
    left: "40%",
    className: "w-52 md:w-80",
  },
  {
    id: "card-4",
    src: "https://images.unsplash.com/photo-1620428268482-cf1851a36764?q=80&w=2609&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Example image",
    rotate: "8deg",
    top: "50%",
    left: "40%",
    className: "w-48 md:w-72",
  },
  {
    id: "card-5",
    src: "https://images.unsplash.com/photo-1602212096437-d0af1ce0553e?q=80&w=2671&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Example image",
    rotate: "18deg",
    top: "20%",
    left: "65%",
    className: "w-40 md:w-64",
  },
  {
    id: "card-6",
    src: "https://images.unsplash.com/photo-1622313762347-3c09fe5f2719?q=80&w=2640&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Example image",
    rotate: "-3deg",
    top: "35%",
    left: "55%",
    className: "w-24 md:w-48",
  },
] as const
