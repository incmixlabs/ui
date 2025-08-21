import type { Meta, StoryObj } from "@storybook/react-vite"
import * as React from "react"
import { z } from "zod"
import AutoForm, { AutoFormSubmit } from "../../src/3blocks/auto-form"
import { Theme } from "../../src/1base"

const meta: Meta<typeof AutoForm> = {
  title: "3 Blocks/AutoForm",
  component: AutoForm,
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <Theme>
        <div style={{ minWidth: "400px", maxWidth: "600px", padding: "24px" }}>
          <Story />
        </div>
      </Theme>
    ),
  ],
  argTypes: {
    formSchema: {
      control: false,
      description: "Zod schema or JSON schema defining the form structure",
    },
    values: {
      control: false,
      description: "Current form values",
    },
    onValuesChange: {
      control: false,
      description: "Callback when form values change",
    },
    onParsedValuesChange: {
      control: false,
      description: "Callback when parsed values change",
    },
    onSubmit: {
      control: false,
      description: "Callback when form is submitted",
    },
    fieldConfig: {
      control: false,
      description: "Configuration for individual fields",
    },
    className: {
      control: "text",
      description: "Additional CSS classes",
    },
    dependencies: {
      control: false,
      description: "Field dependencies configuration",
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

// Basic form schema
const basicSchema = z.object({
  username: z.string().min(1, "Username is required"),
  email: z.string().email("Invalid email address"),
  age: z.number().min(18, "Must be at least 18 years old"),
  bio: z.string().optional(),
})

export const Basic: Story = {
  render: () => (
    <AutoForm
      formSchema={basicSchema}
      onSubmit={(data) => console.log("Form submitted:", data)}
      onValuesChange={(values) => console.log("Values changed:", values)}
    >
      <AutoFormSubmit>Submit Basic Form</AutoFormSubmit>
    </AutoForm>
  ),
}

// Advanced form with various field types
const advancedSchema = z.object({
  personalInfo: z.object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    dateOfBirth: z.date(),
  }),
  preferences: z.object({
    theme: z.enum(["light", "dark", "auto"]),
    notifications: z.boolean().default(true),
    newsletter: z.boolean().default(false),
  }),
  skills: z.array(z.string()).min(1, "At least one skill is required"),
  experience: z.number().min(0).max(50),
  description: z.string().max(500, "Description too long"),
})

export const Advanced: Story = {
  render: () => (
    <AutoForm
      formSchema={advancedSchema}
      fieldConfig={{
        personalInfo: {
          firstName: {
            description: "Enter your first name",
          },
          lastName: {
            description: "Enter your last name",
          },
          dateOfBirth: {
            description: "Select your date of birth",
          },
        },
        preferences: {
          theme: {
            description: "Choose your preferred theme",
            options: [
              { label: "Light", value: "light" },
              { label: "Dark", value: "dark" },
              { label: "Auto", value: "auto" },
            ],
          },
          notifications: {
            description: "Receive push notifications",
          },
          newsletter: {
            description: "Subscribe to our newsletter",
          },
        },
        skills: {
          description: "Add your technical skills",
        },
        experience: {
          description: "Years of experience",
        },
        description: {
          description: "Tell us about yourself",
          inputProps: {
            placeholder: "Write a brief description...",
          },
        },
      }}
      onSubmit={(data) => console.log("Advanced form submitted:", data)}
    >
      <AutoFormSubmit>Submit Advanced Form</AutoFormSubmit>
    </AutoForm>
  ),
}

// Form with field dependencies
const dependencySchema = z.object({
  hasExperience: z.boolean(),
  experienceYears: z.number().optional(),
  currentlyEmployed: z.boolean(),
  companyName: z.string().optional(),
  position: z.string().optional(),
})

export const WithDependencies: Story = {
  render: () => (
    <AutoForm
      formSchema={dependencySchema}
      dependencies={{
        experienceYears: {
          field: "hasExperience",
          type: "hidden",
          condition: { value: false },
        },
        companyName: {
          field: "currentlyEmployed",
          type: "hidden",
          condition: { value: false },
        },
        position: {
          field: "currentlyEmployed",
          type: "hidden",
          condition: { value: false },
        },
      }}
      fieldConfig={{
        hasExperience: {
          description: "Do you have work experience?",
        },
        experienceYears: {
          description: "How many years of experience do you have?",
        },
        currentlyEmployed: {
          description: "Are you currently employed?",
        },
        companyName: {
          description: "What company do you work for?",
        },
        position: {
          description: "What is your position?",
        },
      }}
      onSubmit={(data) => console.log("Dependency form submitted:", data)}
    >
      <AutoFormSubmit>Submit</AutoFormSubmit>
    </AutoForm>
  ),
}

// Multi-choice and selection form
const selectionSchema = z.object({
  favoriteColors: z.array(z.string()).min(1, "Select at least one color"),
  preferredLanguage: z.enum(["javascript", "typescript", "python", "go", "rust"]),
  frameworks: z.array(z.string()).optional(),
  rating: z.number().min(1).max(5),
})

export const WithSelections: Story = {
  render: () => (
    <AutoForm
      formSchema={selectionSchema}
      fieldConfig={{
        favoriteColors: {
          description: "Select your favorite colors",
          inputProps: {
            options: [
              { label: "Red", value: "red", color: "#ef4444" },
              { label: "Blue", value: "blue", color: "#3b82f6" },
              { label: "Green", value: "green", color: "#10b981" },
              { label: "Purple", value: "purple", color: "#8b5cf6" },
              { label: "Orange", value: "orange", color: "#f97316" },
            ],
            layout: "grid" as const,
            gridCols: 3,
          },
        },
        preferredLanguage: {
          description: "Choose your preferred programming language",
          options: [
            { label: "JavaScript", value: "javascript" },
            { label: "TypeScript", value: "typescript" },
            { label: "Python", value: "python" },
            { label: "Go", value: "go" },
            { label: "Rust", value: "rust" },
          ],
        },
        frameworks: {
          description: "Select frameworks you're familiar with",
          inputProps: {
            multipleSelectorOptions: [
              { label: "React", value: "react" },
              { label: "Vue", value: "vue" },
              { label: "Angular", value: "angular" },
              { label: "Svelte", value: "svelte" },
              { label: "Next.js", value: "nextjs" },
            ],
          },
        },
        rating: {
          description: "Rate your overall experience (1-5)",
        },
      }}
      onSubmit={(data) => console.log("Selection form submitted:", data)}
    >
      <AutoFormSubmit>Submit Selections</AutoFormSubmit>
    </AutoForm>
  ),
}

// JSON Schema example
const jsonSchema = {
  type: "object",
  properties: {
    title: {
      type: "string",
      minLength: 1,
    },
    content: {
      type: "string",
      maxLength: 1000,
    },
    published: {
      type: "boolean",
      default: false,
    },
    category: {
      type: "string",
      enum: ["tech", "lifestyle", "business", "other"],
    },
    tags: {
      type: "array",
      items: {
        type: "string",
      },
      minItems: 1,
    },
  },
  required: ["title", "content", "category"],
}

export const JSONSchema: Story = {
  render: () => (
    <AutoForm
      formSchema={jsonSchema}
      fieldConfig={{
        title: {
          description: "Enter the article title",
          inputProps: {
            placeholder: "Amazing article title...",
          },
        },
        content: {
          description: "Write your article content",
          fieldType: "textarea",
          inputProps: {
            placeholder: "Start writing your article...",
          },
        },
        published: {
          description: "Publish this article immediately",
        },
        category: {
          description: "Select article category",
          options: [
            { label: "Technology", value: "tech" },
            { label: "Lifestyle", value: "lifestyle" },
            { label: "Business", value: "business" },
            { label: "Other", value: "other" },
          ],
        },
        tags: {
          description: "Add relevant tags",
        },
      }}
      onSubmit={(data) => console.log("JSON Schema form submitted:", data)}
    >
      <AutoFormSubmit>Publish Article</AutoFormSubmit>
    </AutoForm>
  ),
}

// Controlled form example
export const Controlled: Story = {
  render: () => {
    const [values, setValues] = React.useState({
      name: "John Doe",
      email: "john@example.com",
    })

    const controlledSchema = z.object({
      name: z.string().min(1, "Name is required"),
      email: z.string().email("Invalid email"),
      phone: z.string().optional(),
    })

    return (
      <div>
        <div style={{ marginBottom: "20px", padding: "10px", background: "#f5f5f5", borderRadius: "4px" }}>
          <strong>Current Values:</strong>
          <pre style={{ margin: "8px 0 0 0", fontSize: "12px" }}>
            {JSON.stringify(values, null, 2)}
          </pre>
        </div>
        <AutoForm
          formSchema={controlledSchema}
          values={values}
          onValuesChange={setValues}
          onSubmit={(data) => console.log("Controlled form submitted:", data)}
        >
          <AutoFormSubmit>Update Profile</AutoFormSubmit>
        </AutoForm>
      </div>
    )
  },
}

// Showcase all field types
const showcaseSchema = z.object({
  textInput: z.string().min(1, "Required"),
  numberInput: z.number().min(0),
  textareaInput: z.string().max(200).optional(),
  checkboxInput: z.boolean().default(false),
  switchInput: z.boolean().default(true),
  selectInput: z.enum(["option1", "option2", "option3"]),
  radioInput: z.enum(["radio1", "radio2", "radio3"]),
  multiSelectInput: z.array(z.string()).optional(),
})

// Simple test schema to isolate the issue
const simpleTestSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
})

export const SimpleTest: Story = {
  render: () => (
    <AutoForm
      formSchema={simpleTestSchema}
      onSubmit={(data) => console.log("Simple form submitted:", data)}
    >
      <AutoFormSubmit>Submit</AutoFormSubmit>
    </AutoForm>
  ),
}

export const FieldShowcase: Story = {
  render: () => (
    <AutoForm
      formSchema={showcaseSchema}
      fieldConfig={{
        textInput: {
          description: "Standard text input",
          inputProps: { placeholder: "Enter text..." },
        },
        numberInput: {
          description: "Number input with validation",
        },
        textareaInput: {
          description: "Multi-line text area",
          fieldType: "textarea",
          inputProps: { placeholder: "Enter multiple lines..." },
        },
        checkboxInput: {
          description: "Boolean checkbox",
        },
        switchInput: {
          description: "Switch toggle",
          fieldType: "switch",
        },
        selectInput: {
          description: "Dropdown select",
          options: [
            { label: "First Option", value: "option1" },
            { label: "Second Option", value: "option2" },
            { label: "Third Option", value: "option3" },
          ],
        },
        radioInput: {
          description: "Radio button group",
          fieldType: "radio",
          options: [
            { label: "Radio 1", value: "radio1" },
            { label: "Radio 2", value: "radio2" },
            { label: "Radio 3", value: "radio3" },
          ]
        },
        multiSelectInput: {
          description: "Multi-select dropdown",
          fieldType: "multipleSelector",
          inputProps: {
            multipleSelectorOptions: [
              { label: "Tag 1", value: "tag1" },
              { label: "Tag 2", value: "tag2" },
              { label: "Tag 3", value: "tag3" },
              { label: "Tag 4", value: "tag4" },
            ],
          },
        },
      }}
      onSubmit={(data) => console.log("Showcase form submitted:", data)}
    >
      <AutoFormSubmit>Submit Showcase</AutoFormSubmit>
    </AutoForm>
  ),
}
