import type { Meta, StoryObj } from "@storybook/react-vite"
import * as React from "react"
import { Theme } from "../../../src/1base"
import { Onboarding } from "../../../src/3blocks/onboarding"

const meta: Meta<typeof Onboarding> = {
  title: "3 Blocks/Onboarding",
  component: Onboarding,
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <Theme>
        <Story />
      </Theme>
    ),
  ],
  argTypes: {
    onComplete: {
      action: "onComplete",
      description: "Callback function called when onboarding is completed",
    },
    onError: {
      action: "onError", 
      description: "Callback function called when an error occurs",
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

// Mock localStorage for Storybook
const setupMockLocalStorage = (userData?: any) => {
  const mockUserData = userData || {
    userId: "user-123",
    email: "john.doe@example.com",
    firstName: "John",
    lastName: "Doe"
  }
  
  // Store in localStorage for the component to read
  localStorage.setItem("signupUserData", JSON.stringify(mockUserData))
  
  return mockUserData
}

// Default story with mock user data
export const Default: Story = {
  args: {
    onComplete: async (data: any, userData: any) => {
      console.log("Onboarding completed:", { data, userData })
      alert(`Onboarding completed for ${userData.email}`)
    },
    onError: (error: Error) => {
      console.error("Onboarding error:", error)
      alert(`Error: ${error.message}`)
    },
  },
  render: (args) => {
    // Setup mock localStorage data
    React.useEffect(() => {
      setupMockLocalStorage()
    }, [])

    return <Onboarding {...args} />
  },
}

// Story with custom user data
export const WithCustomUserData: Story = {
  args: {
    onComplete: async (data: any, userData: any) => {
      console.log("Onboarding completed:", { data, userData })
      alert(`Welcome to Incmix, ${userData.firstName}!`)
    },
    onError: (error: Error) => {
      console.error("Onboarding error:", error)
    },
  },
  render: (args) => {
    React.useEffect(() => {
      setupMockLocalStorage({
        userId: "user-456",
        email: "jane.smith@company.com",
        firstName: "Jane",
        lastName: "Smith"
      })
    }, [])

    return <Onboarding {...args} />
  },
}

// Story without user data to show loading/error state
export const WithoutUserData: Story = {
  args: {
    onComplete: async (data: any, userData: any) => {
      console.log("Onboarding completed:", { data, userData })
    },
    onError: (error: Error) => {
      console.error("Onboarding error:", error)
      alert(`Error: ${error.message}`)
    },
  },
  render: (args) => {
    React.useEffect(() => {
      // Clear localStorage to simulate missing user data
      localStorage.removeItem("signupUserData")
    }, [])

    return <Onboarding {...args} />
  },
}

// Story with corrupted user data to show error handling
export const WithCorruptedUserData: Story = {
  args: {
    onComplete: async (data: any, userData: any) => {
      console.log("Onboarding completed:", { data, userData })
    },
    onError: (error: Error) => {
      console.error("Onboarding error:", error)
      alert(`Error: ${error.message}`)
    },
  },
  render: (args) => {
    React.useEffect(() => {
      // Set corrupted JSON data
      localStorage.setItem("signupUserData", "invalid-json-data")
    }, [])

    return <Onboarding {...args} />
  },
}

// Story demonstrating successful completion flow
export const CompletionFlow: Story = {
  args: {
    onComplete: async (data: any, userData: any) => {
      console.log("Complete onboarding data:", data)
      console.log("User data:", userData)
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      alert(`🎉 Welcome aboard, ${userData.firstName}! Your onboarding is complete.`)
    },
    onError: (error: Error) => {
      console.error("Onboarding error:", error)
      alert(`❌ Error: ${error.message}`)
    },
  },
  render: (args) => {
    React.useEffect(() => {
      setupMockLocalStorage({
        userId: "demo-user-789",
        email: "demo@incmix.com",
        firstName: "Demo",
        lastName: "User"
      })
    }, [])

    return <Onboarding {...args} />
  },
}

// Story that simulates API error during completion
export const ErrorDuringCompletion: Story = {
  args: {
    onComplete: async (data: any, userData: any) => {
      console.log("Attempting to complete onboarding:", { data, userData })
      
      // Simulate API error
      await new Promise(resolve => setTimeout(resolve, 1000))
      throw new Error("Failed to save onboarding data to server")
    },
    onError: (error: Error) => {
      console.error("Onboarding error:", error)
      alert(`❌ Server Error: ${error.message}`)
    },
  },
  render: (args) => {
    React.useEffect(() => {
      setupMockLocalStorage({
        userId: "error-user-999",
        email: "error@test.com", 
        firstName: "Error",
        lastName: "Test"
      })
    }, [])

    return <Onboarding {...args} />
  },
}