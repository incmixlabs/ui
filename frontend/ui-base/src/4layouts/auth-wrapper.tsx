import { Button, Flex, iconSize } from "@/base"
import { useAppearanceStore } from "@incmix/store/use-settings-store"
import { MoonIcon, SunIcon } from "lucide-react"
import { useMemo } from "react"
export type AuthWrapperProps = {
  image?: string
  step?: number
  title?: string
  subTitle?: string
  children: React.ReactNode
  showFooterLinks?: boolean
  totalSteps?: number
}

export const AuthWrapper: React.FC<AuthWrapperProps> = ({
  image,
  title,
  step = 1,
  subTitle,
  children,
  showFooterLinks = false,
  totalSteps = 6,
}: AuthWrapperProps) => {
  const { getIsDarkAppearance, toggleAppearance } =
    useAppearanceStore.getState()
  const style = `${iconSize} text-gray-12`
  const isDark = useMemo(() => getIsDarkAppearance(), [getIsDarkAppearance])
  image = !image ? `step${step}` : image

  return (
    <Flex className="relative h-screen w-full">
      <Button
        className="absolute top-4 right-4 ml-auto h-fit"
        variant="soft"
        onClick={toggleAppearance}
      >
        {isDark ? (
          <SunIcon className={style} />
        ) : (
          <MoonIcon className={style} />
        )}
      </Button>
      {/* Left side - Form content */}
      <Flex justify="center" align="center" className="w-full md:w-1/2 ">
        <div className="w-full max-w-xl px-4 py-8 md:px-6">
          {/* Only this div is centered */}
          <div className="mb-8 flex w-full items-center justify-center lg:mb-10">
            <img
              src="/images/logos/app/32x32.svg"
              alt=""
              className="mr-4 h-11 w-11"
            />
            <span className="self-center whitespace-nowrap font-semibold text-2xl text-gray-1">
              {title}
            </span>
          </div>

          {/* Everything below remains left-aligned */}
          <div className="mb-8 w-full">
            <h2 className="font-bold text-2xl text-foreground lg:text-3xl">
              {subTitle}
            </h2>
            <p className="mt-2 text-muted">
              Get started - it's free. No credit card needed
            </p>
          </div>

          <div className="w-full">{children}</div>

          {/* Footer area with progress bar and optional links */}
          <div className="mt-6 w-full">
            {showFooterLinks && (
              <Flex
                justify="center"
                className="mb-4 space-x-4 text-muted text-xs"
              >
                {/* biome-ignore lint/a11y/useValidAnchor: <explanation> */}
                <a href="#" className="hover:underline">
                  Terms of Service
                </a>
                <span>•</span>
                {/* biome-ignore lint/a11y/useValidAnchor: <explanation> */}
                <a href="#" className="hover:underline">
                  Privacy Policy
                </a>
              </Flex>
            )}

            {/* Progress indicator */}
            <div className="mt-2">
              <Flex align="center">
                <span className="text-muted text-sm">
                  {step} of {totalSteps}
                </span>
                <Flex className="ml-2 flex-1 space-x-1">
                  {Array.from({ length: totalSteps }).map((_, i) => (
                    <div
                      key={i}
                      className={`h-1 flex-1 rounded-full ${i < step ? "bg-[var(--blue-9)]" : "bg-muted"}`}
                    />
                  ))}
                </Flex>
              </Flex>
            </div>
          </div>
        </div>
      </Flex>

      {/* Right side - Image */}
      <div className="hidden h-full md:block md:w-1/2">
        <div className="h-full w-full">
          <img
            src={`/images/onboarding/${image}.png`}
            alt=""
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </Flex>
  )
}
