import type { Meta, StoryObj } from "@storybook/react-vite"
import * as React from "react"
import { AlertDialog } from "./alert-dialog"
import { Button } from "./button"
import { Flex } from "./flex"
import { Text } from "./text"
import { Theme } from "./theme"

const meta: Meta<typeof AlertDialog> = {
  title: "Components/AlertDialog",
  component: AlertDialog.Root,
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
}

export default meta
type Story = StoryObj<typeof meta>

// Default story
export const Default: Story = {
  render: (_args) => (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button color="red">Delete Account</Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content style={{ maxWidth: "450px" }}>
        <AlertDialog.Title>Are you absolutely sure?</AlertDialog.Title>
        <AlertDialog.Description>
          This action cannot be undone. This will permanently delete your
          account and remove your data from our servers.
        </AlertDialog.Description>
        <Flex gap="3" mt="4" justify="end">
          <AlertDialog.Cancel>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Button variant="solid" color="red">
              Yes, delete account
            </Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  ),
}

// Destructive action
export const DestructiveAction: Story = {
  render: (_args) => (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button color="red" variant="solid">
          Delete Project
        </Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content style={{ maxWidth: "450px" }}>
        <AlertDialog.Title>Delete Project</AlertDialog.Title>
        <AlertDialog.Description>
          Are you sure you want to delete this project? This action cannot be
          undone and will permanently remove all project files, settings, and
          associated data.
        </AlertDialog.Description>
        <Flex gap="3" mt="4" justify="end">
          <AlertDialog.Cancel>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Button variant="solid" color="red">
              Delete Project
            </Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  ),
}

// Confirmation dialog
export const Confirmation: Story = {
  render: (_args) => (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button color="blue">Save Changes</Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content style={{ maxWidth: "400px" }}>
        <AlertDialog.Title>Save Changes?</AlertDialog.Title>
        <AlertDialog.Description>
          You have unsaved changes. Do you want to save your changes before
          leaving?
        </AlertDialog.Description>
        <Flex gap="3" mt="4" justify="end">
          <AlertDialog.Cancel>
            <Button variant="soft" color="gray">
              Don't Save
            </Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Button variant="solid" color="blue">
              Save Changes
            </Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  ),
}

// Warning dialog
export const Warning: Story = {
  render: (_args) => (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button color="orange" variant="outline">
          Reset Settings
        </Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content style={{ maxWidth: "450px" }}>
        <AlertDialog.Title>Reset All Settings</AlertDialog.Title>
        <AlertDialog.Description>
          This will reset all your preferences to their default values. Your
          personal data will not be affected, but you'll need to reconfigure
          your settings.
        </AlertDialog.Description>
        <Flex gap="3" mt="4" justify="end">
          <AlertDialog.Cancel>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Button variant="solid" color="orange">
              Reset Settings
            </Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  ),
}

// Info dialog
export const Information: Story = {
  render: (_args) => (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button color="blue" variant="soft">
          Show Info
        </Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content style={{ maxWidth: "400px" }}>
        <AlertDialog.Title>Important Information</AlertDialog.Title>
        <AlertDialog.Description>
          Your subscription will expire in 7 days. To continue using all
          features, please renew your subscription before it expires.
        </AlertDialog.Description>
        <Flex gap="3" mt="4" justify="end">
          <AlertDialog.Cancel>
            <Button variant="soft" color="gray">
              Later
            </Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Button variant="solid" color="blue">
              Renew Now
            </Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  ),
}

// Logout confirmation
export const LogoutConfirmation: Story = {
  render: (_args) => (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button color="gray" variant="outline">
          Logout
        </Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content style={{ maxWidth: "400px" }}>
        <AlertDialog.Title>Logout Confirmation</AlertDialog.Title>
        <AlertDialog.Description>
          Are you sure you want to logout? Any unsaved changes will be lost.
        </AlertDialog.Description>
        <Flex gap="3" mt="4" justify="end">
          <AlertDialog.Cancel>
            <Button variant="soft" color="gray">
              Stay Logged In
            </Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Button variant="solid" color="red">
              Logout
            </Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  ),
}

// File deletion with details
export const FileDeleteWithDetails: Story = {
  render: (_args) => (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button color="red" size="1">
          🗑️ Delete
        </Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content style={{ maxWidth: "500px" }}>
        <AlertDialog.Title>Delete File</AlertDialog.Title>
        <AlertDialog.Description style={{ marginBottom: "16px" }}>
          You are about to permanently delete the following file:
        </AlertDialog.Description>
        <div
          style={{
            padding: "12px",
            backgroundColor: "#f8f9fa",
            borderRadius: "6px",
            border: "1px solid #e1e5e9",
            marginBottom: "16px",
          }}
        >
          <Text size="2" weight="medium">
            📄 project-proposal.pdf
          </Text>
          <Text
            size="1"
            color="gray"
            style={{ marginTop: "4px", display: "block" }}
          >
            Size: 2.4 MB • Modified: 2 hours ago
          </Text>
        </div>
        <Text size="2" color="red">
          This action cannot be undone. The file will be permanently removed
          from your account.
        </Text>
        <Flex gap="3" mt="4" justify="end">
          <AlertDialog.Cancel>
            <Button variant="soft" color="gray">
              Keep File
            </Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Button variant="solid" color="red">
              Delete Forever
            </Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  ),
}

// Multiple actions
export const MultipleActions: Story = {
  render: (_args) => (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button color="orange">Unsaved Changes</Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content style={{ maxWidth: "450px" }}>
        <AlertDialog.Title>Unsaved Changes</AlertDialog.Title>
        <AlertDialog.Description>
          You have unsaved changes in your document. What would you like to do?
        </AlertDialog.Description>
        <Flex gap="2" mt="4" justify="end" wrap="wrap">
          <AlertDialog.Cancel>
            <Button variant="ghost" color="gray" size="2">
              Cancel
            </Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Button variant="soft" color="red" size="2">
              Discard Changes
            </Button>
          </AlertDialog.Action>
          <AlertDialog.Action>
            <Button variant="solid" color="blue" size="2">
              Save & Continue
            </Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  ),
}

// Custom styled dialog
export const CustomStyled: Story = {
  render: (_args) => (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button color="purple" variant="solid">
          Custom Dialog
        </Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content
        style={{
          maxWidth: "480px",
          padding: "24px",
          borderRadius: "12px",
          border: "2px solid #7c3aed",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "16px" }}>
          <div style={{ fontSize: "48px", marginBottom: "8px" }}>🎉</div>
          <AlertDialog.Title style={{ fontSize: "24px", color: "#7c3aed" }}>
            Congratulations!
          </AlertDialog.Title>
        </div>
        <AlertDialog.Description
          style={{ textAlign: "center", fontSize: "16px", lineHeight: "1.5" }}
        >
          You've successfully completed all tasks in your project! Your team's
          productivity has increased by 40% this month.
        </AlertDialog.Description>
        <Flex gap="3" mt="6" justify="center">
          <AlertDialog.Cancel>
            <Button variant="soft" color="gray">
              Close
            </Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Button variant="solid" color="purple">
              View Report
            </Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  ),
}

// Payment confirmation
export const PaymentConfirmation: Story = {
  render: (_args) => (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button color="green" variant="solid">
          Complete Purchase
        </Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content style={{ maxWidth: "450px" }}>
        <AlertDialog.Title>Confirm Purchase</AlertDialog.Title>
        <AlertDialog.Description style={{ marginBottom: "16px" }}>
          Please confirm your purchase details:
        </AlertDialog.Description>

        <div
          style={{
            padding: "16px",
            backgroundColor: "#f8f9fa",
            borderRadius: "8px",
            marginBottom: "16px",
            border: "1px solid #e1e5e9",
          }}
        >
          <Flex justify="between" style={{ marginBottom: "8px" }}>
            <Text size="2">Pro Plan (Monthly)</Text>
            <Text size="2" weight="medium">
              $29.00
            </Text>
          </Flex>
          <Flex justify="between" style={{ marginBottom: "8px" }}>
            <Text size="2" color="gray">
              Tax
            </Text>
            <Text size="2" color="gray">
              $2.32
            </Text>
          </Flex>
          <div
            style={{
              height: "1px",
              backgroundColor: "#e1e5e9",
              margin: "8px 0",
            }}
          />
          <Flex justify="between">
            <Text size="2" weight="bold">
              Total
            </Text>
            <Text size="2" weight="bold">
              $31.32
            </Text>
          </Flex>
        </div>

        <Text size="2" color="gray">
          Payment will be charged to your default payment method.
        </Text>

        <Flex gap="3" mt="4" justify="end">
          <AlertDialog.Cancel>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Button variant="solid" color="green">
              Complete Purchase
            </Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  ),
}

// Data export confirmation
export const DataExport: Story = {
  render: (_args) => (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button color="blue" variant="outline">
          Export Data
        </Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content style={{ maxWidth: "500px" }}>
        <AlertDialog.Title>Export Your Data</AlertDialog.Title>
        <AlertDialog.Description style={{ marginBottom: "16px" }}>
          We'll prepare a downloadable archive containing all your account data.
          This may take a few minutes depending on the amount of data.
        </AlertDialog.Description>

        <div
          style={{
            padding: "12px",
            backgroundColor: "#eff6ff",
            borderRadius: "6px",
            border: "1px solid #bfdbfe",
            marginBottom: "16px",
          }}
        >
          <Text
            size="2"
            weight="medium"
            color="blue"
            style={{ marginBottom: "4px", display: "block" }}
          >
            📦 Export will include:
          </Text>
          <ul
            style={{
              margin: 0,
              paddingLeft: "16px",
              fontSize: "14px",
              color: "#374151",
            }}
          >
            <li>Profile information and settings</li>
            <li>All your projects and files</li>
            <li>Activity history and logs</li>
            <li>Shared content and collaborations</li>
          </ul>
        </div>

        <Text size="2" color="gray">
          You'll receive an email with the download link when your export is
          ready.
        </Text>

        <Flex gap="3" mt="4" justify="end">
          <AlertDialog.Cancel>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Button variant="solid" color="blue">
              Start Export
            </Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  ),
}
