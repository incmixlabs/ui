import { Building2 } from "lucide-react"
import type { StepSchema } from "./types"
export const formSchema: { steps: StepSchema<any>[] } = {
  steps: [
    {
      label: "Company Details",
      stepIcon: "Building",
      formSchema: {
        type: "object",
        properties: {
          companyName: {
            type: "string",
            minLength: 3,
            maxLength: 100,
            title: "Company Name",
            description: "The legal name of your company",
          },
        },
        required: ["companyName"],
      },
      fieldConfig: {
        companyName: {
          description: "Company Name",
          inputProps: {
            placeholder: "Enter your company name",
            icon: Building2,
          },
        },
      },
    },
    {
      label: "About You",
      stepIcon: "HelpCircle",
      formSchema: {
        type: "object",
        properties: {
          purpose: {
            type: "string",
            minLength: 1,
          },
          role: {
            type: "string",
            minLength: 1,
          },
        },
        required: ["purpose", "role"],
      },
      fieldConfig: {
        purpose: {
          description: "Hey there, what brings you here today?",
          fieldType: "mcq",
          inputProps: {
            options: [
              { label: "Working", value: "working" },
              { label: "Personal", value: "personal" },
              { label: "School", value: "school" },
              { label: "Nonprofits", value: "nonprofits" },
            ],
            required: true,
            layout: "row",
            optionSize: "md",
          },
        },
        role: {
          description: "What best describes your current role?",
          fieldType: "mcq",
          inputProps: {
            options: [
              { label: "Team member", value: "team_member" },
              { label: "Freelancer", value: "freelancer" },
              { label: "Director", value: "director" },
              { label: "C-Level", value: "c_level" },
              { label: "VP", value: "vp" },
            ],
            required: true,
            layout: "column",
            optionSize: "md",
          },
        },
      },
    },
    {
      label: "Team Size",
      stepIcon: "Users",
      formSchema: {
        type: "object",
        properties: {
          teamSize: {
            type: "string",
            minLength: 1,
          },
          companySize: {
            type: "string",
            minLength: 1,
          },
        },
        required: ["teamSize", "companySize"],
      },
      fieldConfig: {
        teamSize: {
          description: "How many members are there in your team?",
          fieldType: "mcq",
          inputProps: {
            options: [
              { label: "Only me", value: "only_me" },
              { label: "2-5", value: "2-5" },
              { label: "6-10", value: "6-10" },
              { label: "11-15", value: "11-15" },
              { label: "16-25", value: "16-25" },
              { label: "26-50", value: "26-50" },
              { label: "51-100", value: "51-100" },
              { label: "101-500", value: "101-500" },
            ],
            required: true,
            layout: "grid",
            gridCols: 2,
            optionSize: "md",
          },
        },
        companySize: {
          description: "How many people work at your company?",
          fieldType: "mcq",
          inputProps: {
            options: [
              { label: "1-19", value: "1-19" },
              { label: "20-49", value: "20-49" },
              { label: "50-99", value: "50-99" },
              { label: "100-250", value: "100-250" },
              { label: "251-500", value: "251-500" },
              { label: "501-1500", value: "501-1500" },
              { label: "> 1500", value: ">1500" },
            ],
            required: true,
            layout: "grid",
            gridCols: 2,
            optionSize: "md",
          },
        },
      },
    },
    {
      label: "Management Preferences",
      stepIcon: "Settings",
      formSchema: {
        type: "object",
        properties: {
          manageFirst: {
            type: "string",
            minLength: 1,
          },
        },
        required: ["manageFirst"],
      },
      fieldConfig: {
        manageFirst: {
          description: "Select what you'd like to manage first?",
          fieldType: "mcq",
          inputProps: {
            options: [
              { label: "Operations", value: "operations" },
              { label: "Product Management", value: "product_management" },
              { label: "IT", value: "it" },
              { label: "Non Profit", value: "non_profit" },
              { label: "Design & Creative", value: "design_creative" },
              { label: "PMO", value: "pmo" },
              { label: "Education", value: "education" },
              { label: "Software Development", value: "software_development" },
              { label: "Sales & CRM", value: "sales_crm" },
              { label: "Marketing", value: "marketing" },
              { label: "Legal", value: "legal" },
              { label: "HR & Recruiting", value: "hr_recruiting" },
              { label: "Construction", value: "construction" },
              { label: "Finance", value: "finance" },
              { label: "Others", value: "others" },
            ],
            required: true,
            layout: "grid",
            gridCols: 2,
            optionSize: "md",
          },
        },
      },
    },
    {
      label: "Focus Area",
      stepIcon: "Target",
      formSchema: {
        type: "object",
        properties: {
          focusFirst: {
            type: "string",
            minLength: 1,
          },
        },
        required: ["focusFirst"],
      },
      fieldConfig: {
        focusFirst: {
          description: "Select what you'd like to focus on first",
          fieldType: "mcq",
          inputProps: {
            options: [
              { label: "Client Projects", value: "client_projects" },
              { label: "Product Launches", value: "product_launches" },
              { label: "Project Management", value: "project_management" },
              { label: "Media Production", value: "media_production" },
              { label: "Content Calendar", value: "content_calendar" },
              { label: "Creative Requests", value: "creative_requests" },
              { label: "Education", value: "education" },
              { label: "Resource Management", value: "resource_management" },
              { label: "Portfolio Management", value: "portfolio_management" },
              { label: "Goals & Strategy", value: "goals_strategy" },
              { label: "Creative Planning", value: "creative_planning" },
              { label: "Task Management", value: "task_management" },
              { label: "Requests & Approvals", value: "requests_approvals" },
              { label: "Finances", value: "finances" },
            ],
            required: true,
            layout: "grid",
            gridCols: 2,
            optionSize: "md",
          },
        },
      },
    },
    {
      label: "How You Found Us",
      stepIcon: "Search",
      formSchema: {
        type: "object",
        properties: {
          referralSources: {
            type: "array",
            items: {
              type: "string",
            },
            minLength: 1, // Require at least one selection
          },
        },
        required: ["referralSources"],
      },
      fieldConfig: {
        referralSources: {
          description: "One last question, how did you hear about us?",
          fieldType: "multiCheckbox",
          inputProps: {
            options: [
              { label: "Youtube Ad", value: "youtube_ad" },
              { label: "Audio ad (Podcast, Spotify)", value: "audio_ad" },
              { label: "Linkedin", value: "linkedin" },
              { label: "TV / Streaming Service", value: "tv_streaming" },
              { label: "Billboard / Public transit ad", value: "billboard" },
              { label: "Software Review Sites", value: "review_sites" },
              {
                label: "Social Media (Facebook, Instagram, etc)",
                value: "social_media",
              },
              { label: "Friend / Colleague", value: "friend_colleague" },
            ],
            required: true,
            layout: "grid",
            gridCols: 2,
            optionSize: "md",
          },
        },
      },
    },
  ],
}
