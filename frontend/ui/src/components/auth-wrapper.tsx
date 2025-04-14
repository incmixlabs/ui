import type React from "react"

export type AuthWrapperProps = {
  image?: string
  step?: number
  title?: string
  subTitle?: string
  children: React.ReactNode
  showFooterLinks?: boolean
}

export const AuthWrapper: React.FC<AuthWrapperProps> = ({
  image,
  title,
  step = 1,
  subTitle,
  children,
  showFooterLinks = false,
}: AuthWrapperProps) => {
  image = !image ? `step${step}` : image

  return (
    <div className="flex h-screen w-full">
      {/* Left side - Form content */}
      <div className="flex w-full md:w-1/2 items-center justify-center bg-white dark:bg-gray-900">
        <div className="w-full max-w-md px-6 py-8 md:px-8">
          {/* Only this div is centered */}
          <div className="mb-8 flex items-center justify-center w-full lg:mb-10">
            <img
              src="/images/logos/app/32x32.svg"
              alt=""
              className="mr-4 h-11 w-11"
            />
            <span className="self-center whitespace-nowrap text-2xl font-semibold text-gray-900 dark:text-white">
              {title}
            </span>
          </div>

          {/* Everything below remains left-aligned */}
          <div className="mb-8 w-full">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white lg:text-3xl">
              {subTitle}
            </h2>
            <p className="mt-2 text-gray-500 dark:text-gray-400">Get started - it's free. No credit card needed</p>
          </div>

          <div className="w-full">
            {children}
          </div>

          {/* Footer area with progress bar and optional links */}
          <div className="mt-16 w-full">
            {showFooterLinks && (
              <div className="mb-8 flex justify-center space-x-4 text-xs text-gray-500 dark:text-gray-400">
                <a href="#" className="hover:underline">Terms of Service</a>
                <span>•</span>
                <a href="#" className="hover:underline">Privacy Policy</a>
              </div>
            )}

            {/* Progress indicator */}
            <div className="mt-4">
              <div className="flex items-center">
                <span className="text-sm text-gray-500 dark:text-gray-400">{step} of 7</span>
                <div className="ml-2 flex-1 space-x-1 flex">
                  {Array.from({ length: 7 }).map((_, i) => (
                    <div
                      key={i}
                      className={`h-1 flex-1 rounded-full ${i < step ? "bg-blue-500" : "bg-gray-200 dark:bg-gray-700"}`}
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
        <div className="h-full w-full bg-blue-500">
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