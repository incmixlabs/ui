import { AuthWrapper } from "@incmix/ui2/auth-wrapper"
import { Button } from "@incmix/ui2/radixui"
import { Checkbox } from "@incmix/ui2/radixui"
import { Input } from "@incmix/ui2/flow-form/input"
import { Label } from "@incmix/ui2/flow-form/label"

import type { Meta, StoryObj } from "@storybook/react"

const meta: Meta<typeof AuthWrapper> = {
  title: "Molecules/AuthWrapper",
  component: AuthWrapper,
}

export default meta
type Story = StoryObj<typeof AuthWrapper>

export const Default: Story = {
  render: () => {
    return (
      <AuthWrapper subTitle="Create an account" title="Welcome!" image="step1">
        <form className="mt-8 space-y-6">
          <div className="flex flex-col gap-y-2">
            <Label htmlFor="email">Your email</Label>
            <Input
              id="email"
              name="email"
              placeholder="name@company.com"
              type="email"
            />
          </div>
          <div className="flex flex-col gap-y-2">
            <Label htmlFor="password">Your password</Label>
            <Input
              id="password"
              name="password"
              placeholder="••••••••"
              type="password"
            />
          </div>
          <div className="flex flex-col gap-y-2">
            <Label htmlFor="confirmPassword">Confirm password</Label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              placeholder="••••••••"
              type="password"
            />
          </div>
          <div className="flex items-center gap-x-3">
            <Checkbox id="acceptTerms" name="acceptTerms" />
            <Label htmlFor="acceptTerms">
              I accept the&nbsp;
              <a
                href="#"
                className="text-primary-700 hover:underline dark:text-primary-500"
              >
                Terms and Conditions
              </a>
            </Label>
          </div>
          <div className="mb-7">
            <Button size="2" type="submit" className="w-full p-2 sm:w-auto">
              Create account
            </Button>
          </div>
          <p className="font-medium text-gray-500 text-sm dark:text-gray-400">
            Already have an account?&nbsp;
            <a
              href="#"
              className="text-primary-700 hover:underline dark:text-primary-500"
            >
              Login here
            </a>
          </p>
        </form>
      </AuthWrapper>
    )
  },
}
