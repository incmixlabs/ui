import { FlowCard as Card, Image } from "@/components/radixui/card/flow-card"
import type React from "react"

export type AuthWrapperProps = {
  image?: string
  step?: number
  title?: string
  subTitle?: string
  children: React.ReactNode
}

export const AuthWrapper: React.FC<AuthWrapperProps> = ({
  image,
  title,
  step = 1,
  subTitle,
  children,
}: AuthWrapperProps) => {
  image = !image ? `step${step}` : image
  return (
    <div className="mx-auto flex flex-col items-center justify-center px-6">
      <a
        href="/"
        className="mb-8 flex items-center justify-center font-semibold text-2xl lg:mb-10 dark:text-white"
      >
        <Image
          imgAlt=""
          imgSrc="/images/logos/app/32x32.svg"
          width={43}
          height={44}
          className="mr-4 h-11"
        />
        <span className="self-center whitespace-nowrap font-semibold text-2xl dark:text-white">
          {title}
        </span>
      </a>
      <Card
        horizontal
        imgSrc={`/images/onboarding/${image}.png`}
        imgAlt=""
        className="w-full md:max-w-screen-lg"
        theme={{
          root: {
            children: "my-auto w-full gap-0 space-y-8 p-6 sm:p-8 lg:p-16",
          },
          img: {
            horizontal: {
              on: "hidden rounded-l-lg md:w-96 md:p-0 lg:block",
            },
          },
        }}
      >
        <h2 className="font-bold text-2xl text-gray-900 lg:text-3xl dark:text-white">
          {subTitle}
        </h2>
        {children}
      </Card>
    </div>
  )
}
