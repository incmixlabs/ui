import { useEditingStore, useThemeStore } from "@incmix/store"
import { Button, Separator, iconSize } from "@incmix/ui"
import { MoonIcon, SunIcon } from "lucide-react"
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
  const { theme, toggleTheme } = useThemeStore()
  const style = `${iconSize} text-gray-12`

  image = !image ? `step${step}` : image

  return (
    <div className="flex h-screen w-full relative">
       <Button
              className="ml-auto h-fit absolute top-4 right-4"
              variant="soft"
              onClick={toggleTheme}
            >
              {theme === "dark" ? (
                <SunIcon className={style} />
              ) : (
                <MoonIcon className={style} />
              )}
            </Button>
      {/* Left side - Form content */}
      <div className="flex w-full md:w-1/2 items-center justify-center bg-background ">
        <div className="w-full max-w-xl px-4 py-8 md:px-6">
          {/* Only this div is centered */}
          <div className="mb-8 flex items-center justify-center w-full lg:mb-10">
            <img
              src="/images/logos/app/32x32.svg"
              alt=""
              className="mr-4 h-11 w-11"
            />
            <span className="self-center whitespace-nowrap text-2xl font-semibold text-gray-1">
             {title}
            </span>
          </div>

          {/* Everything below remains left-aligned */}
          <div className="mb-8 w-full">
            <h2 className="text-2xl font-bold text-foreground  lg:text-3xl">
              {subTitle}
            </h2>
            <p className="mt-2 text-muted">Get started - it's free. No credit card needed</p>
          </div>

          <div className="w-full">
            {children}
          </div>

          {/* Footer area with progress bar and optional links */}
          <div className="mt-6 w-full">
            {showFooterLinks && (
              <div className="mb-4 flex justify-center space-x-4 text-xs text-muted">
                <a href="#" className="hover:underline">Terms of Service</a>
                <span>•</span>
                <a href="#" className="hover:underline">Privacy Policy</a>
              </div>
            )}

            {/* Progress indicator */}
            <div className="mt-2">
              <div className="flex items-center">
                <span className="text-sm text-muted">{step} of {totalSteps}</span>
                <div className="ml-2 flex-1 space-x-1 flex">
                  {Array.from({ length: totalSteps }).map((_, i) => (
                    <div
                      key={i}
                      className={`h-1 flex-1 rounded-full ${i < step ? "bg-[var(--blue-9)]" : "bg-muted"}`}
                    ></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Image */}
      <div className="hidden md:block md:w-1/2 h-full">
        <div className="h-full w-full bg-[var(--blue-9)]">
          <img
            src={`/images/onboarding/${image}.png`}
            alt=""
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </div>
  )
}
