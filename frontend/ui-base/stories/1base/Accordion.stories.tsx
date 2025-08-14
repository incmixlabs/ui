import type { Meta, StoryObj } from "@storybook/react-vite"
import { Accordion, Theme } from "../../src/1base"

const meta: Meta<typeof Accordion> = {
  title: "1 Base/Accordion",
  component: Accordion,
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <Theme>
        <Story />
      </Theme>
    ),
  ],
  argTypes: {
    type: {
      control: "select",
      options: ["single", "multiple"],
      description: "Accordion interaction type",
    },
    collapsible: {
      control: "boolean",
      description: "Whether items can be collapsed when type is single",
    },
    disabled: {
      control: "boolean",
      description: "Whether the entire accordion is disabled",
    },
  },
  args: {
    type: "single",
    collapsible: false,
  },
}

export default meta
type Story = StoryObj<typeof meta>

// Default single accordion
export const Default: Story = {
  render: (args) => (
    <Accordion.Root {...args} className="w-full max-w-md">
      <Accordion.Item value="item-1">
        <Accordion.Trigger>Is it accessible?</Accordion.Trigger>
        <Accordion.Content>
          Yes. It adheres to the WAI-ARIA design pattern and uses semantic HTML elements.
        </Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value="item-2">
        <Accordion.Trigger>Is it styled?</Accordion.Trigger>
        <Accordion.Content>
          Yes. It comes with default styles that matches the other components aesthetic.
        </Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value="item-3">
        <Accordion.Trigger>Is it animated?</Accordion.Trigger>
        <Accordion.Content>
          Yes. The accordion content smoothly expands and collapses with CSS animations.
        </Accordion.Content>
      </Accordion.Item>
    </Accordion.Root>
  ),
}

// Single collapsible
export const SingleCollapsible: Story = {
  args: {
    type: "single",
    collapsible: true,
  },
  render: (args) => (
    <Accordion.Root {...args} className="w-full max-w-md">
      <Accordion.Item value="item-1">
        <Accordion.Trigger>Can I close all items?</Accordion.Trigger>
        <Accordion.Content>
          Yes, with collapsible enabled, you can close all accordion items.
        </Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value="item-2">
        <Accordion.Trigger>What about other items?</Accordion.Trigger>
        <Accordion.Content>
          Other items work the same way - you can open and close them independently.
        </Accordion.Content>
      </Accordion.Item>
    </Accordion.Root>
  ),
}

// Multiple accordion
export const Multiple: Story = {
  args: {
    type: "multiple",
  },
  render: (args) => (
    <Accordion.Root {...args} className="w-full max-w-md">
      <Accordion.Item value="item-1">
        <Accordion.Trigger>Can multiple items be open?</Accordion.Trigger>
        <Accordion.Content>
          Yes, when type is set to "multiple", multiple accordion items can be open at the same time.
        </Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value="item-2">
        <Accordion.Trigger>How does it work?</Accordion.Trigger>
        <Accordion.Content>
          Each item maintains its own state and can be opened or closed independently of others.
        </Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value="item-3">
        <Accordion.Trigger>Is this useful?</Accordion.Trigger>
        <Accordion.Content>
          Yes, this is great for FAQ sections or when you want users to compare multiple sections.
        </Accordion.Content>
      </Accordion.Item>
    </Accordion.Root>
  ),
}

// Disabled accordion
export const Disabled: Story = {
  render: (args) => (
    <Accordion.Root {...args} className="w-full max-w-md">
      <Accordion.Item value="item-1" disabled>
        <Accordion.Trigger>This is disabled</Accordion.Trigger>
        <Accordion.Content>
          You won't be able to interact with this accordion when disabled.
        </Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value="item-2" disabled>
        <Accordion.Trigger>All items are disabled</Accordion.Trigger>
        <Accordion.Content>
          When the accordion is disabled, all items become non-interactive.
        </Accordion.Content>
      </Accordion.Item>
    </Accordion.Root>
  ),
}

// FAQ Example
export const FAQExample: Story = {
  render: () => (
    <Accordion.Root type="single" collapsible className="w-full max-w-2xl">
      <Accordion.Item value="faq-1">
        <Accordion.Trigger>What is your return policy?</Accordion.Trigger>
        <Accordion.Content>
          We offer a 30-day return policy for all unused items in their original packaging.
          Items must be returned within 30 days of purchase with proof of purchase.
          Refunds will be processed within 5-7 business days after we receive your return.
        </Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value="faq-2">
        <Accordion.Trigger>How long does shipping take?</Accordion.Trigger>
        <Accordion.Content>
          Standard shipping typically takes 3-5 business days within the continental US.
          Express shipping is available for 1-2 business days. International shipping
          may take 7-14 business days depending on the destination country.
        </Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value="faq-3">
        <Accordion.Trigger>Do you offer customer support?</Accordion.Trigger>
        <Accordion.Content>
          Yes! Our customer support team is available Monday through Friday, 9 AM to 6 PM EST.
          You can reach us via email at support@example.com, phone at (555) 123-4567,
          or through our live chat feature on the website.
        </Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value="faq-4">
        <Accordion.Trigger>What payment methods do you accept?</Accordion.Trigger>
        <Accordion.Content>
          We accept all major credit cards (Visa, MasterCard, American Express, Discover),
          PayPal, Apple Pay, Google Pay, and bank transfers. All payments are processed
          securely using industry-standard encryption.
        </Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value="faq-5">
        <Accordion.Trigger>Can I track my order?</Accordion.Trigger>
        <Accordion.Content>
          Absolutely! Once your order ships, you'll receive an email with tracking information.
          You can also log into your account on our website to view order status and
          tracking details for all your purchases.
        </Accordion.Content>
      </Accordion.Item>
    </Accordion.Root>
  ),
}

// Settings Panel Example
export const SettingsExample: Story = {
  render: () => (
    <Accordion.Root type="multiple" className="w-full max-w-2xl">
      <Accordion.Item value="general">
        <Accordion.Trigger>General Settings</Accordion.Trigger>
        <Accordion.Content>
          <div className="space-y-4 pt-2">
            <div>
              <label className="text-sm font-medium">Display Name</label>
              <input
                type="text"
                placeholder="Enter your display name"
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value="privacy">
        <Accordion.Trigger>Privacy Settings</Accordion.Trigger>
        <Accordion.Content>
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <span className="text-sm">Profile Visibility</span>
              <input type="checkbox" className="rounded" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Email Notifications</span>
              <input type="checkbox" className="rounded" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Data Collection</span>
              <input type="checkbox" className="rounded" />
            </div>
          </div>
        </Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value="notifications">
        <Accordion.Trigger>Notification Preferences</Accordion.Trigger>
        <Accordion.Content>
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <span className="text-sm">Push Notifications</span>
              <input type="checkbox" className="rounded" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">SMS Alerts</span>
              <input type="checkbox" className="rounded" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Marketing Emails</span>
              <input type="checkbox" className="rounded" />
            </div>
          </div>
        </Accordion.Content>
      </Accordion.Item>
    </Accordion.Root>
  ),
}

// Long Content Example
export const LongContent: Story = {
  render: () => (
    <Accordion.Root type="single" collapsible className="w-full max-w-2xl">
      <Accordion.Item value="terms">
        <Accordion.Trigger>Terms and Conditions</Accordion.Trigger>
        <Accordion.Content>
          <div className="space-y-4 text-sm">
            <p>
              <strong>1. Acceptance of Terms</strong><br />
              By accessing and using this website, you accept and agree to be bound by the terms
              and provision of this agreement. If you do not agree to abide by the above, please
              do not use this service.
            </p>
            <p>
              <strong>2. Use License</strong><br />
              Permission is granted to temporarily download one copy of the materials on our website
              for personal, non-commercial transitory viewing only. This is the grant of a license,
              not a transfer of title, and under this license you may not modify or copy the materials.
            </p>
            <p>
              <strong>3. Disclaimer</strong><br />
              The materials on our website are provided on an 'as is' basis. We make no warranties,
              expressed or implied, and hereby disclaim and negate all other warranties including
              without limitation, implied warranties or conditions of merchantability, fitness for
              a particular purpose, or non-infringement of intellectual property or other violation of rights.
            </p>
            <p>
              <strong>4. Limitations</strong><br />
              In no event shall our company or its suppliers be liable for any damages (including,
              without limitation, damages for loss of data or profit, or due to business interruption)
              arising out of the use or inability to use the materials on our website.
            </p>
          </div>
        </Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value="privacy">
        <Accordion.Trigger>Privacy Policy</Accordion.Trigger>
        <Accordion.Content>
          <div className="space-y-4 text-sm">
            <p>
              <strong>Information We Collect</strong><br />
              We collect information you provide directly to us, such as when you create an account,
              make a purchase, or contact us for support. This may include your name, email address,
              postal address, phone number, and payment information.
            </p>
            <p>
              <strong>How We Use Your Information</strong><br />
              We use the information we collect to provide, maintain, and improve our services,
              process transactions, send you technical notices and support messages, and communicate
              with you about products, services, and promotional offers.
            </p>
            <p>
              <strong>Information Sharing</strong><br />
              We do not sell, trade, or otherwise transfer your personal information to third parties
              without your consent, except as described in this policy. We may share your information
              with trusted third parties who assist us in operating our website and conducting business.
            </p>
          </div>
        </Accordion.Content>
      </Accordion.Item>
    </Accordion.Root>
  ),
}
