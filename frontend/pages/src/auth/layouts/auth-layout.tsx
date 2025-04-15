interface AuthLayoutProps {
  children: React.ReactNode
}

export const AuthLayout = ({ children }: AuthLayoutProps) => (
  <div className="flex h-screen w-full">
    {/* Left side - Form content */}
    <div className="flex w-full items-center justify-center bg-white md:w-1/2 dark:bg-gray-900">
      <div className="w-full max-w-md px-6 py-8 md:px-8">
        {/* Logo centered */}
        <div className="mb-8 flex w-full items-center justify-center lg:mb-10">
          <img
            src="/images/logos/app/32x32.svg"
            alt=""
            className="mr-4 h-11 w-11"
          />
          <span className="self-center whitespace-nowrap font-semibold text-2xl text-gray-900 dark:text-white">
            Incmix
          </span>
        </div>
        {/* Form content */}
        {children}
      </div>
    </div>
    {/* Right side - Image */}
    <div className="hidden h-full md:block md:w-1/2">
      <div className="h-full w-full bg-blue-500">
        <img
          src="/images/onboarding/step2.png"
          alt=""
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  </div>
)
