import type { Meta, StoryObj } from "@storybook/react-vite"
import * as React from "react"
import { Theme } from "../../src/base"
import { Stepper, Step } from "../../src/blocks/stepper"
import { DemoStepper_Footer } from "../../src/blocks/stepper/demo-stepper-footer"

const meta: Meta<typeof Stepper> = {
  title: "3 Blocks/Stepper",
  component: Stepper,
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <Theme>
        <div style={{ width: "600px", padding: "20px" }}>
          <Story />
        </div>
      </Theme>
    ),
  ],
  argTypes: {
    orientation: {
      control: "select",
      options: ["horizontal", "vertical"],
      description: "Stepper orientation",
    },
    variant: {
      control: "select",
      options: ["circle", "circle-alt", "line"],
      description: "Stepper variant style",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Stepper size",
    },
    state: {
      control: "select",
      options: ["loading", "error"],
      description: "Global stepper state",
    },
    responsive: {
      control: "boolean",
      description: "Enable responsive behavior",
    },
    expandVerticalSteps: {
      control: "boolean",
      description: "Expand all vertical steps",
    },
    scrollTracking: {
      control: "boolean",
      description: "Enable scroll tracking for vertical steps",
    },
    initialStep: {
      control: "number",
      description: "Initial active step (0-based)",
    },
  },
  args: {
    orientation: "horizontal",
    variant: "circle",
    size: "md",
    responsive: true,
    expandVerticalSteps: false,
    scrollTracking: false,
    initialStep: 0,
  },
}

export default meta
type Story = StoryObj<typeof meta>

// Sample step data
const basicSteps = [
  { id: "1", label: "Step 1", description: "First step description" },
  { id: "2", label: "Step 2", description: "Second step description" },
  { id: "3", label: "Step 3", description: "Third step description" },
  { id: "4", label: "Step 4", description: "Fourth step description" },
]

const detailedSteps = [
  {
    id: "account",
    label: "Account Information",
    description: "Enter your personal details",
  },
  {
    id: "verification",
    label: "Verification",
    description: "Verify your email and phone",
  },
  {
    id: "preferences",
    label: "Preferences",
    description: "Set your account preferences",
    optional: true,
  },
  {
    id: "complete",
    label: "Complete",
    description: "Review and finish setup",
  },
]

// Default story
export const Default: Story = {
  args: {
    steps: basicSteps,
  },
  render: (args) => (
    <Stepper {...args}>
      <Step>
        <div style={{ padding: "20px" }}>
          <h3>Step 1 Content</h3>
          <p>This is the content for the first step.</p>
        </div>
      </Step>
      <Step>
        <div style={{ padding: "20px" }}>
          <h3>Step 2 Content</h3>
          <p>This is the content for the second step.</p>
        </div>
      </Step>
      <Step>
        <div style={{ padding: "20px" }}>
          <h3>Step 3 Content</h3>
          <p>This is the content for the third step.</p>
        </div>
      </Step>
      <Step>
        <div style={{ padding: "20px" }}>
          <h3>Step 4 Content</h3>
          <p>This is the content for the fourth step.</p>
        </div>
      </Step>
      <DemoStepper_Footer />
    </Stepper>
  ),
}

// Orientation variants
export const Horizontal: Story = {
  args: {
    orientation: "horizontal",
    steps: basicSteps,
  },
  render: (args) => (
    <Stepper {...args}>
      <Step>
        <div style={{ padding: "20px", textAlign: "center" }}>
          <h3>Horizontal Step 1</h3>
          <p>Content is displayed below the horizontal stepper.</p>
        </div>
      </Step>
      <Step>
        <div style={{ padding: "20px", textAlign: "center" }}>
          <h3>Horizontal Step 2</h3>
          <p>Each step's content replaces the previous one.</p>
        </div>
      </Step>
      <Step>
        <div style={{ padding: "20px", textAlign: "center" }}>
          <h3>Horizontal Step 3</h3>
          <p>Perfect for wizards and multi-step forms.</p>
        </div>
      </Step>
      <Step>
        <div style={{ padding: "20px", textAlign: "center" }}>
          <h3>Horizontal Step 4</h3>
          <p>Final step in the horizontal flow.</p>
        </div>
      </Step>
      <DemoStepper_Footer />
    </Stepper>
  ),
}

export const Vertical: Story = {
  args: {
    orientation: "vertical",
    steps: detailedSteps,
  },
  render: (args) => (
    <Stepper {...args}>
      <Step>
        <div style={{ padding: "16px", backgroundColor: "var(--gray-2)", borderRadius: "8px", margin: "8px 0" }}>
          <h4>Account Information</h4>
          <p>Please provide your name, email, and other personal details.</p>
          <div style={{ marginTop: "12px" }}>
            <input placeholder="Full Name" style={{ marginRight: "8px", padding: "4px 8px" }} />
            <input placeholder="Email" style={{ padding: "4px 8px" }} />
          </div>
        </div>
      </Step>
      <Step>
        <div style={{ padding: "16px", backgroundColor: "var(--blue-2)", borderRadius: "8px", margin: "8px 0" }}>
          <h4>Verification</h4>
          <p>We'll send verification codes to your email and phone.</p>
          <button style={{ marginTop: "8px", padding: "6px 12px" }}>Send Verification Code</button>
        </div>
      </Step>
      <Step>
        <div style={{ padding: "16px", backgroundColor: "var(--green-2)", borderRadius: "8px", margin: "8px 0" }}>
          <h4>Preferences (Optional)</h4>
          <p>Customize your experience with these optional settings.</p>
          <label style={{ display: "block", marginTop: "8px" }}>
            <input type="checkbox" /> Enable notifications
          </label>
        </div>
      </Step>
      <Step>
        <div style={{ padding: "16px", backgroundColor: "var(--purple-2)", borderRadius: "8px", margin: "8px 0" }}>
          <h4>Complete Setup</h4>
          <p>Review your information and complete the setup process.</p>
          <button style={{ marginTop: "8px", padding: "6px 12px", backgroundColor: "var(--purple-9)", color: "white", border: "none", borderRadius: "4px" }}>
            Finish Setup
          </button>
        </div>
      </Step>
      <DemoStepper_Footer />
    </Stepper>
  ),
}

// Variant styles
export const CircleVariant: Story = {
  args: {
    variant: "circle",
    steps: basicSteps,
  },
  render: (args) => (
    <Stepper {...args}>
      <Step><div style={{ padding: "20px" }}><h3>Circle Step 1</h3><p>Classic circle variant with numbered steps.</p></div></Step>
      <Step><div style={{ padding: "20px" }}><h3>Circle Step 2</h3><p>Connected with horizontal lines.</p></div></Step>
      <Step><div style={{ padding: "20px" }}><h3>Circle Step 3</h3><p>Clear progress indication.</p></div></Step>
      <Step><div style={{ padding: "20px" }}><h3>Circle Step 4</h3><p>Final circle step.</p></div></Step>
      <DemoStepper_Footer />
    </Stepper>
  ),
}

export const CircleAltVariant: Story = {
  args: {
    variant: "circle-alt",
    steps: basicSteps,
  },
  render: (args) => (
    <Stepper {...args}>
      <Step><div style={{ padding: "20px" }}><h3>Circle Alt Step 1</h3><p>Alternative circle layout with centered labels.</p></div></Step>
      <Step><div style={{ padding: "20px" }}><h3>Circle Alt Step 2</h3><p>Great for compact spaces.</p></div></Step>
      <Step><div style={{ padding: "20px" }}><h3>Circle Alt Step 3</h3><p>Clean and minimal design.</p></div></Step>
      <Step><div style={{ padding: "20px" }}><h3>Circle Alt Step 4</h3><p>Final alternative step.</p></div></Step>
      <DemoStepper_Footer />
    </Stepper>
  ),
}

export const LineVariant: Story = {
  args: {
    variant: "line",
    orientation: "vertical",
    steps: basicSteps,
  },
  render: (args) => (
    <Stepper {...args}>
      <Step><div style={{ padding: "16px" }}><h4>Line Step 1</h4><p>Minimal line-based design.</p></div></Step>
      <Step><div style={{ padding: "16px" }}><h4>Line Step 2</h4><p>Perfect for simple workflows.</p></div></Step>
      <Step><div style={{ padding: "16px" }}><h4>Line Step 3</h4><p>Clean and space-efficient.</p></div></Step>
      <Step><div style={{ padding: "16px" }}><h4>Line Step 4</h4><p>Final line step.</p></div></Step>
      <DemoStepper_Footer />
    </Stepper>
  ),
}

// Size variants
export const SmallSize: Story = {
  args: {
    size: "sm",
    steps: basicSteps,
  },
  render: (args) => (
    <Stepper {...args}>
      <Step><div style={{ padding: "16px" }}><h4>Small Step 1</h4><p>Compact size for dense interfaces.</p></div></Step>
      <Step><div style={{ padding: "16px" }}><h4>Small Step 2</h4><p>Smaller icons and text.</p></div></Step>
      <Step><div style={{ padding: "16px" }}><h4>Small Step 3</h4><p>Space-efficient design.</p></div></Step>
      <Step><div style={{ padding: "16px" }}><h4>Small Step 4</h4><p>Final small step.</p></div></Step>
      <DemoStepper_Footer />
    </Stepper>
  ),
}

export const LargeSize: Story = {
  args: {
    size: "lg",
    steps: basicSteps,
  },
  render: (args) => (
    <Stepper {...args}>
      <Step><div style={{ padding: "24px" }}><h3>Large Step 1</h3><p>Larger size for prominent workflows.</p></div></Step>
      <Step><div style={{ padding: "24px" }}><h3>Large Step 2</h3><p>Bigger icons and more readable text.</p></div></Step>
      <Step><div style={{ padding: "24px" }}><h3>Large Step 3</h3><p>Great for important processes.</p></div></Step>
      <Step><div style={{ padding: "24px" }}><h3>Large Step 4</h3><p>Final large step.</p></div></Step>
      <DemoStepper_Footer />
    </Stepper>
  ),
}

// State examples
export const LoadingState: Story = {
  args: {
    state: "loading",
    initialStep: 1,
    steps: basicSteps,
  },
  render: (args) => (
    <Stepper {...args}>
      <Step><div style={{ padding: "20px" }}><h3>Completed Step</h3><p>This step is already done.</p></div></Step>
      <Step><div style={{ padding: "20px" }}><h3>Loading Step</h3><p>This step is currently processing...</p></div></Step>
      <Step><div style={{ padding: "20px" }}><h3>Pending Step</h3><p>This step is waiting.</p></div></Step>
      <Step><div style={{ padding: "20px" }}><h3>Final Step</h3><p>This step is not yet reached.</p></div></Step>
      <DemoStepper_Footer />
    </Stepper>
  ),
}

export const ErrorState: Story = {
  args: {
    state: "error",
    initialStep: 1,
    steps: basicSteps,
  },
  render: (args) => (
    <Stepper {...args}>
      <Step><div style={{ padding: "20px" }}><h3>Completed Step</h3><p>This step completed successfully.</p></div></Step>
      <Step><div style={{ padding: "20px", backgroundColor: "var(--red-2)", borderRadius: "8px" }}><h3>Error Step</h3><p>Something went wrong in this step. Please review and try again.</p></div></Step>
      <Step><div style={{ padding: "20px" }}><h3>Pending Step</h3><p>This step is waiting for the error to be resolved.</p></div></Step>
      <Step><div style={{ padding: "20px" }}><h3>Final Step</h3><p>This step is not yet reached.</p></div></Step>
      <DemoStepper_Footer />
    </Stepper>
  ),
}

// Advanced features
export const ClickableSteps: Story = {
  args: {
    steps: basicSteps,
    onClickStep: (step, setStep) => {
      console.log(`Clicked step ${step}`)
      setStep(step)
    },
  },
  render: (args) => (
    <Stepper {...args}>
      <Step><div style={{ padding: "20px" }}><h3>Clickable Step 1</h3><p>Click any step in the header to navigate directly to it.</p></div></Step>
      <Step><div style={{ padding: "20px" }}><h3>Clickable Step 2</h3><p>This enables non-linear navigation through the stepper.</p></div></Step>
      <Step><div style={{ padding: "20px" }}><h3>Clickable Step 3</h3><p>Perfect for forms where users might need to go back.</p></div></Step>
      <Step><div style={{ padding: "20px" }}><h3>Clickable Step 4</h3><p>Final clickable step.</p></div></Step>
      <DemoStepper_Footer />
    </Stepper>
  ),
}

export const ExpandedVerticalSteps: Story = {
  args: {
    orientation: "vertical",
    expandVerticalSteps: true,
    steps: detailedSteps,
  },
  render: (args) => (
    <Stepper {...args}>
      <Step>
        <div style={{ padding: "16px", backgroundColor: "var(--blue-2)", borderRadius: "8px", margin: "8px 0" }}>
          <h4>Account Information</h4>
          <p>All steps are visible simultaneously when expanded.</p>
          <input placeholder="Username" style={{ padding: "4px 8px", marginTop: "8px" }} />
        </div>
      </Step>
      <Step>
        <div style={{ padding: "16px", backgroundColor: "var(--green-2)", borderRadius: "8px", margin: "8px 0" }}>
          <h4>Verification</h4>
          <p>Users can see all content at once for better overview.</p>
          <button style={{ marginTop: "8px", padding: "6px 12px" }}>Verify Email</button>
        </div>
      </Step>
      <Step>
        <div style={{ padding: "16px", backgroundColor: "var(--yellow-2)", borderRadius: "8px", margin: "8px 0" }}>
          <h4>Preferences</h4>
          <p>This is an optional step that can be skipped.</p>
          <label style={{ display: "block", marginTop: "8px" }}>
            <input type="checkbox" /> Send me updates
          </label>
        </div>
      </Step>
      <Step>
        <div style={{ padding: "16px", backgroundColor: "var(--purple-2)", borderRadius: "8px", margin: "8px 0" }}>
          <h4>Complete</h4>
          <p>Review everything before finishing.</p>
          <button style={{ marginTop: "8px", padding: "6px 12px", backgroundColor: "var(--green-9)", color: "white", border: "none", borderRadius: "4px" }}>
            Complete Setup
          </button>
        </div>
      </Step>
      <DemoStepper_Footer />
    </Stepper>
  ),
}

// Real-world examples
export const OnboardingFlow: Story = {
  args: {
    steps: [
      { id: "welcome", label: "Welcome", description: "Get started" },
      { id: "profile", label: "Profile", description: "Personal info" },
      { id: "team", label: "Team", description: "Invite teammates", optional: true },
      { id: "workspace", label: "Workspace", description: "Setup workspace" },
      { id: "done", label: "Complete", description: "All set!" },
    ],
  },
  render: (args) => (
    <div style={{ maxWidth: "800px" }}>
      <h2 style={{ marginBottom: "24px", textAlign: "center" }}>User Onboarding</h2>
      <Stepper {...args}>
        <Step>
          <div style={{ padding: "32px", textAlign: "center", backgroundColor: "var(--blue-2)", borderRadius: "12px", margin: "20px 0" }}>
            <h3>Welcome to Our Platform! 🎉</h3>
            <p style={{ fontSize: "16px", marginTop: "16px" }}>Let's get you set up in just a few steps. This will only take a couple of minutes.</p>
          </div>
        </Step>
        <Step>
          <div style={{ padding: "32px", backgroundColor: "var(--green-2)", borderRadius: "12px", margin: "20px 0" }}>
            <h3>Create Your Profile</h3>
            <p>Tell us a bit about yourself to personalize your experience.</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginTop: "16px" }}>
              <input placeholder="First Name" style={{ padding: "8px 12px", borderRadius: "4px", border: "1px solid var(--gray-6)" }} />
              <input placeholder="Last Name" style={{ padding: "8px 12px", borderRadius: "4px", border: "1px solid var(--gray-6)" }} />
              <input placeholder="Job Title" style={{ padding: "8px 12px", borderRadius: "4px", border: "1px solid var(--gray-6)", gridColumn: "1 / -1" }} />
            </div>
          </div>
        </Step>
        <Step>
          <div style={{ padding: "32px", backgroundColor: "var(--yellow-2)", borderRadius: "12px", margin: "20px 0" }}>
            <h3>Invite Your Team (Optional)</h3>
            <p>Collaboration is better with teammates. Invite them now or skip this step.</p>
            <div style={{ marginTop: "16px" }}>
              <input placeholder="teammate@company.com" style={{ padding: "8px 12px", borderRadius: "4px", border: "1px solid var(--gray-6)", width: "250px", marginRight: "8px" }} />
              <button style={{ padding: "8px 16px", backgroundColor: "var(--blue-9)", color: "white", border: "none", borderRadius: "4px" }}>
                Send Invite
              </button>
            </div>
          </div>
        </Step>
        <Step>
          <div style={{ padding: "32px", backgroundColor: "var(--purple-2)", borderRadius: "12px", margin: "20px 0" }}>
            <h3>Setup Your Workspace</h3>
            <p>Choose how you want to organize your work.</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "12px", marginTop: "16px" }}>
              <label style={{ padding: "16px", border: "2px solid var(--gray-6)", borderRadius: "8px", cursor: "pointer", display: "flex", alignItems: "center" }}>
                <input type="radio" name="workspace" style={{ marginRight: "8px" }} />
                <div>
                  <div style={{ fontWeight: "bold" }}>Team Workspace</div>
                  <div style={{ fontSize: "14px", color: "var(--gray-11)" }}>Collaborate with others</div>
                </div>
              </label>
              <label style={{ padding: "16px", border: "2px solid var(--gray-6)", borderRadius: "8px", cursor: "pointer", display: "flex", alignItems: "center" }}>
                <input type="radio" name="workspace" style={{ marginRight: "8px" }} />
                <div>
                  <div style={{ fontWeight: "bold" }}>Personal Workspace</div>
                  <div style={{ fontSize: "14px", color: "var(--gray-11)" }}>Work independently</div>
                </div>
              </label>
            </div>
          </div>
        </Step>
        <Step>
          <div style={{ padding: "32px", textAlign: "center", backgroundColor: "var(--green-2)", borderRadius: "12px", margin: "20px 0" }}>
            <h3>You're All Set! ✅</h3>
            <p style={{ fontSize: "16px", marginTop: "16px" }}>Your account is ready to go. You can always change these settings later in your profile.</p>
            <button style={{
              marginTop: "20px",
              padding: "12px 24px",
              backgroundColor: "var(--green-9)",
              color: "white",
              border: "none",
              borderRadius: "6px",
              fontSize: "16px",
              fontWeight: "bold"
            }}>
              Get Started
            </button>
          </div>
        </Step>
        <DemoStepper_Footer />
      </Stepper>
    </div>
  ),
}

export const CheckoutFlow: Story = {
  args: {
    orientation: "horizontal",
    variant: "circle",
    steps: [
      { id: "cart", label: "Cart", description: "Review items" },
      { id: "shipping", label: "Shipping", description: "Delivery details" },
      { id: "payment", label: "Payment", description: "Billing info" },
      { id: "confirmation", label: "Complete", description: "Order summary" },
    ],
  },
  render: (args) => (
    <div style={{ maxWidth: "900px" }}>
      <h2 style={{ marginBottom: "24px", textAlign: "center" }}>Checkout Process</h2>
      <Stepper {...args}>
        <Step>
          <div style={{ padding: "24px", backgroundColor: "var(--gray-2)", borderRadius: "8px", margin: "20px 0" }}>
            <h3>Shopping Cart</h3>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px", backgroundColor: "white", borderRadius: "6px", margin: "12px 0" }}>
              <div>
                <div style={{ fontWeight: "bold" }}>Premium Headphones</div>
                <div style={{ color: "var(--gray-11)", fontSize: "14px" }}>Wireless, Noise Cancelling</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div>$299.99</div>
                <div style={{ fontSize: "14px", color: "var(--gray-11)" }}>Qty: 1</div>
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px", backgroundColor: "white", borderRadius: "6px" }}>
              <div>
                <div style={{ fontWeight: "bold" }}>USB-C Cable</div>
                <div style={{ color: "var(--gray-11)", fontSize: "14px" }}>3 feet, Fast Charging</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div>$19.99</div>
                <div style={{ fontSize: "14px", color: "var(--gray-11)" }}>Qty: 2</div>
              </div>
            </div>
            <div style={{ marginTop: "16px", padding: "12px", backgroundColor: "var(--blue-3)", borderRadius: "6px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontWeight: "bold", fontSize: "18px" }}>
                <span>Total: $339.97</span>
              </div>
            </div>
          </div>
        </Step>
        <Step>
          <div style={{ padding: "24px", backgroundColor: "var(--blue-2)", borderRadius: "8px", margin: "20px 0" }}>
            <h3>Shipping Information</h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginTop: "16px" }}>
              <input placeholder="First Name" style={{ padding: "10px", borderRadius: "4px", border: "1px solid var(--gray-6)" }} />
              <input placeholder="Last Name" style={{ padding: "10px", borderRadius: "4px", border: "1px solid var(--gray-6)" }} />
              <input placeholder="Street Address" style={{ padding: "10px", borderRadius: "4px", border: "1px solid var(--gray-6)", gridColumn: "1 / -1" }} />
              <input placeholder="City" style={{ padding: "10px", borderRadius: "4px", border: "1px solid var(--gray-6)" }} />
              <input placeholder="ZIP Code" style={{ padding: "10px", borderRadius: "4px", border: "1px solid var(--gray-6)" }} />
            </div>
            <div style={{ marginTop: "16px" }}>
              <h4>Shipping Method</h4>
              <div style={{ marginTop: "8px" }}>
                <label style={{ display: "block", padding: "8px", backgroundColor: "white", borderRadius: "4px", marginBottom: "8px", cursor: "pointer" }}>
                  <input type="radio" name="shipping" style={{ marginRight: "8px" }} defaultChecked />
                  Standard Shipping (5-7 days) - FREE
                </label>
                <label style={{ display: "block", padding: "8px", backgroundColor: "white", borderRadius: "4px", cursor: "pointer" }}>
                  <input type="radio" name="shipping" style={{ marginRight: "8px" }} />
                  Express Shipping (2-3 days) - $9.99
                </label>
              </div>
            </div>
          </div>
        </Step>
        <Step>
          <div style={{ padding: "24px", backgroundColor: "var(--green-2)", borderRadius: "8px", margin: "20px 0" }}>
            <h3>Payment Information</h3>
            <div style={{ marginTop: "16px" }}>
              <div style={{ marginBottom: "16px" }}>
                <label style={{ display: "block", marginBottom: "4px", fontWeight: "bold" }}>Card Number</label>
                <input placeholder="1234 5678 9012 3456" style={{ width: "100%", padding: "10px", borderRadius: "4px", border: "1px solid var(--gray-6)" }} />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px" }}>
                <div>
                  <label style={{ display: "block", marginBottom: "4px", fontWeight: "bold" }}>Expiry</label>
                  <input placeholder="MM/YY" style={{ width: "100%", padding: "10px", borderRadius: "4px", border: "1px solid var(--gray-6)" }} />
                </div>
                <div>
                  <label style={{ display: "block", marginBottom: "4px", fontWeight: "bold" }}>CVC</label>
                  <input placeholder="123" style={{ width: "100%", padding: "10px", borderRadius: "4px", border: "1px solid var(--gray-6)" }} />
                </div>
                <div>
                  <label style={{ display: "block", marginBottom: "4px", fontWeight: "bold" }}>ZIP</label>
                  <input placeholder="12345" style={{ width: "100%", padding: "10px", borderRadius: "4px", border: "1px solid var(--gray-6)" }} />
                </div>
              </div>
            </div>
            <div style={{ marginTop: "16px", padding: "12px", backgroundColor: "var(--yellow-3)", borderRadius: "6px", fontSize: "14px" }}>
              🔒 Your payment information is secure and encrypted
            </div>
          </div>
        </Step>
        <Step>
          <div style={{ padding: "24px", textAlign: "center", backgroundColor: "var(--green-2)", borderRadius: "8px", margin: "20px 0" }}>
            <h3>Order Complete! 🎉</h3>
            <div style={{ backgroundColor: "white", borderRadius: "8px", padding: "20px", margin: "20px 0", textAlign: "left" }}>
              <h4>Order Summary</h4>
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: "12px" }}>
                <span>Subtotal:</span>
                <span>$339.97</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span>Shipping:</span>
                <span>FREE</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span>Tax:</span>
                <span>$27.20</span>
              </div>
              <hr style={{ margin: "12px 0" }} />
              <div style={{ display: "flex", justifyContent: "space-between", fontWeight: "bold", fontSize: "18px" }}>
                <span>Total:</span>
                <span>$367.17</span>
              </div>
            </div>
            <p>Your order #12345 has been confirmed and will be shipped to your address.</p>
            <button style={{
              marginTop: "16px",
              padding: "12px 24px",
              backgroundColor: "var(--green-9)",
              color: "white",
              border: "none",
              borderRadius: "6px",
              fontWeight: "bold"
            }}>
              Continue Shopping
            </button>
          </div>
        </Step>
        <DemoStepper_Footer />
      </Stepper>
    </div>
  ),
}

// Responsive demonstration
export const ResponsiveExample: Story = {
  args: {
    responsive: true,
    mobileBreakpoint: "768px",
    steps: basicSteps,
  },
  render: (args) => (
    <div>
      <div style={{ marginBottom: "16px", padding: "12px", backgroundColor: "var(--yellow-2)", borderRadius: "6px" }}>
        <strong>Responsive Behavior:</strong> This stepper will switch to vertical layout on screens smaller than 768px.
        Try resizing your browser window to see the effect.
      </div>
      <Stepper {...args}>
        <Step>
          <div style={{ padding: "20px" }}>
            <h3>Responsive Step 1</h3>
            <p>This stepper adapts to different screen sizes automatically.</p>
            <p>On mobile devices, it switches to a vertical layout for better usability.</p>
          </div>
        </Step>
        <Step>
          <div style={{ padding: "20px" }}>
            <h3>Responsive Step 2</h3>
            <p>The responsive behavior ensures optimal user experience across all devices.</p>
            <p>Desktop users see the horizontal layout, while mobile users get the vertical layout.</p>
          </div>
        </Step>
        <Step>
          <div style={{ padding: "20px" }}>
            <h3>Responsive Step 3</h3>
            <p>This flexibility makes the stepper suitable for any application.</p>
            <p>No need to create separate components for different screen sizes.</p>
          </div>
        </Step>
        <Step>
          <div style={{ padding: "20px" }}>
            <h3>Responsive Step 4</h3>
            <p>The final step in our responsive demonstration.</p>
            <p>The stepper maintains its functionality across all breakpoints.</p>
          </div>
        </Step>
        <DemoStepper_Footer />
      </Stepper>
    </div>
  ),
}
