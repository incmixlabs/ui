"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

import { clx } from "@/lib/utils/clx/clx-merge";

type TODO = any;

const ShuffleGridLayout = clx.div("grid h-[450px] grid-cols-4 grid-rows-4 gap-1");

//
export function ShuffleGrid({ squareData, shuffleDelay }: TODO) {
  const timeoutRef = useRef(null);

  const shuffle = (array: any) => {
    let currentIndex = array.length,
      randomIndex;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  };

  const generateSquares = () => {
    return shuffle(squareData).map((sq: any) => (
      <motion.div
        key={sq.id}
        layout
        transition={{ duration: 1.5, type: "spring" }}
        className="h-full w-full"
        style={{
          backgroundImage: `url(${sq.src})`,
          backgroundSize: "cover",
        }}
      />
    ));
  };

  const [squares, setSquares] = useState(generateSquares());

  useEffect(() => {
    shuffleSquares();

    return () => {
      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current as number);
      }
    };
  }, []);

  const shuffleSquares = () => {
    setSquares(generateSquares());

    // @ts-expect-error -> Do that later (possibly null)
    timeoutRef.current = setTimeout(shuffleSquares, shuffleDelay);
  };

  return <ShuffleGridLayout>{squares.map((sq: any) => sq)}</ShuffleGridLayout>;
}
