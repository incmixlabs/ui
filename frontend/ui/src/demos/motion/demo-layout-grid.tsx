"use client"

import { GridLayoutCard, LayoutGrid } from "@components/layout-grid"

export default function LayoutGridDemo() {
  return (
    <div className="h-[700px] w-full">
      <LayoutGrid cards={CARDS} />
    </div>
  )
}

/*´:°•.°+.*•´.*:˚.°*.˚•´.°:°•.°•.*•´.*:˚.°*.˚•´.°:°•.°+.*•´.*:*/
/*                        CONSTANTS                           */
/*.•°:°.´+˚.*°.˚:*.´•*.+°.•°:´*.´•*.•°.•°:°.´:•˚°.*°.˚:*.´+°.•*/

export type LayoutGridCard = (typeof CARDS)[number]

const CARDS = [
  {
    id: 1,
    content: <GridLayoutCard />,
    className: "md:col-span-2",
    thumbnail:
      "https://images.unsplash.com/photo-1566360013955-39bf5da13573?q=80&w=3164&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 2,
    content: <GridLayoutCard />,
    className: "col-span-1",
    thumbnail:
      "https://images.unsplash.com/photo-1499190263783-18a53a561660?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 3,
    content: <GridLayoutCard />,
    className: "col-span-1",
    thumbnail:
      "https://images.unsplash.com/photo-1464423163665-75e82891f301?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 4,
    content: <GridLayoutCard />,
    className: "md:col-span-2",
    thumbnail:
      "https://images.unsplash.com/photo-1524024753536-2478712fa702?q=80&w=2907&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
]
