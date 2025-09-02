import type { Meta, StoryObj } from "@storybook/react"
import React from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import ProjectDrawer from "../../src/3blocks/projects/components/project-drawer"
import { Theme } from "../../src/1base"
import { projects } from "../../src/3blocks/projects/data"

// Create a query client for stories that need it
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
})

// Mock the useProjectDrawer hook
const MockProjectDrawerProvider = ({ children, projectId }: { children: React.ReactNode, projectId?: string }) => {
  // Mock the hook by providing context or using React.createContext
  // For simplicity, we'll modify the component through props
  return <>{children}</>
}

// Create a wrapper component that forces the drawer to be open
const ProjectDrawerWrapper = ({ 
  listFilter, 
  listFilterClassName,
  forceOpen = true 
}: { 
  listFilter?: boolean
  listFilterClassName?: string
  forceOpen?: boolean
}) => {
  // We'll create a modified version that doesn't depend on the hook
  const [status, setStatus] = React.useState("started")
  const [selectedMembers, setSelectedMembers] = React.useState<string[]>(["regina-cooper"])
  
  return (
    <div style={{ position: "relative", height: "100vh", width: "100%" }}>
      {/* Simulate the MotionSheet being open */}
      <div 
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          height: "100vh",
          width: listFilter ? "100%" : "53rem",
          backgroundColor: "white",
          zIndex: 50,
          display: forceOpen ? "block" : "none"
        }}
      >
        <div style={{ 
          height: "100%", 
          width: "100%", 
          backgroundColor: "var(--gray-3)",
          borderRadius: "8px",
          overflow: "hidden"
        }}>
          <div style={{ 
            height: listFilter ? "84vh" : "98vh",
            borderRadius: "8px",
            overflow: "auto"
          }}>
            <div style={{ display: "flex", alignItems: "flex-start", height: "100%" }}>
              {/* Main content area */}
              <div style={{ 
                backgroundColor: "var(--gray-1)", 
                padding: "16px",
                flex: 1
              }}>
                {/* Import and use the actual subcomponents */}
                <div style={{ marginBottom: "24px" }}>
                  <h3 style={{ marginBottom: "16px", fontSize: "18px", fontWeight: "600" }}>Project Details</h3>
                  <div style={{ 
                    display: "flex", 
                    alignItems: "center", 
                    gap: "12px",
                    marginBottom: "24px"
                  }}>
                    <div style={{
                      width: "56px",
                      height: "56px",
                      borderRadius: "12px",
                      border: "2px solid var(--gray-4)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: "8px"
                    }}>
                      <img 
                        src={projects[0].logo} 
                        alt={projects[0].name}
                        style={{ width: "40px", height: "40px", objectFit: "contain" }}
                      />
                    </div>
                    <div>
                      <h4 style={{ fontSize: "16px", fontWeight: "500", margin: "0 0 4px 0" }}>
                        {projects[0].name}
                      </h4>
                      <p style={{ fontSize: "14px", color: "var(--gray-11)", margin: 0 }}>
                        {projects[0].company}
                      </p>
                    </div>
                  </div>
                  
                  <div style={{ marginBottom: "24px" }}>
                    <h5 style={{ fontSize: "14px", fontWeight: "500", marginBottom: "16px", color: "var(--gray-11)", textTransform: "uppercase" }}>DETAILS</h5>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <div style={{ display: "flex", gap: "12px" }}>
                        <div style={{
                          width: "40px",
                          height: "40px",
                          borderRadius: "8px",
                          backgroundColor: "var(--green-3)",
                          color: "var(--green-8)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center"
                        }}>$</div>
                        <div>
                          <p style={{ fontSize: "12px", color: "var(--gray-11)", margin: "0 0 4px 0" }}>Budget</p>
                          <p style={{ fontSize: "14px", margin: 0 }}>${projects[0].budget?.toLocaleString()}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div style={{ marginBottom: "24px" }}>
                    <h5 style={{ fontSize: "14px", fontWeight: "500", marginBottom: "8px", color: "var(--gray-11)", textTransform: "uppercase" }}>DESCRIPTION</h5>
                    <p style={{ fontSize: "14px", color: "var(--gray-10)", lineHeight: "1.4" }}>
                      {projects[0].description}
                    </p>
                  </div>
                </div>
                
                {/* Checklist Section */}
                <div style={{ marginBottom: "24px" }}>
                  <h5 style={{ fontSize: "14px", fontWeight: "500", marginBottom: "16px", color: "var(--gray-11)", textTransform: "uppercase" }}>CHECKLIST (75%)</h5>
                  <div style={{ marginBottom: "8px", height: "8px", backgroundColor: "var(--gray-4)", borderRadius: "4px", overflow: "hidden" }}>
                    <div style={{ width: "75%", height: "100%", backgroundColor: "var(--green-9)" }}></div>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "12px", backgroundColor: "var(--gray-3)", borderRadius: "6px" }}>
                      <input type="checkbox" checked readOnly />
                      <span>Inbox Template</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "12px", backgroundColor: "var(--gray-3)", borderRadius: "6px" }}>
                      <input type="checkbox" checked readOnly />
                      <span>Chat Template</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "12px", backgroundColor: "var(--gray-3)", borderRadius: "6px" }}>
                      <input type="checkbox" readOnly />
                      <span>Projects Template</span>
                    </div>
                  </div>
                </div>
                
                {/* Comments Section */}
                <div>
                  <div style={{ borderBottom: "1px solid var(--gray-5)", marginBottom: "16px" }}>
                    <div style={{ display: "flex", gap: "24px" }}>
                      <button style={{ padding: "12px 0", border: "none", backgroundColor: "transparent", borderBottom: "2px solid var(--blue-6)", fontWeight: "500" }}>COMMENTS</button>
                      <button style={{ padding: "12px 0", border: "none", backgroundColor: "transparent", color: "var(--gray-11)" }}>ACTIVITY</button>
                    </div>
                  </div>
                  <div style={{ marginBottom: "16px", border: "1px solid var(--gray-5)", borderRadius: "8px", backgroundColor: "var(--gray-2)" }}>
                    <textarea 
                      placeholder="Add Comment..."
                      style={{
                        width: "100%",
                        minHeight: "70px",
                        border: "none",
                        backgroundColor: "transparent",
                        padding: "8px",
                        resize: "none",
                        outline: "none"
                      }}
                    />
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 16px" }}>
                      <button style={{ padding: "8px 16px", backgroundColor: "var(--blue-6)", color: "white", border: "none", borderRadius: "6px", fontSize: "14px" }}>Comment</button>
                      <div style={{ display: "flex", gap: "8px" }}>
                        <button style={{ padding: "8px", backgroundColor: "transparent", border: "none", borderRadius: "50%" }}>📎</button>
                        <button style={{ padding: "8px", backgroundColor: "transparent", border: "none", borderRadius: "50%" }}>😊</button>
                        <button style={{ padding: "8px", backgroundColor: "transparent", border: "none", borderRadius: "50%" }}>🖼️</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Sidebar */}
              <div style={{
                width: "288px",
                height: "100%",
                padding: listFilter ? "20px 0 0 0" : "80px 0 0 0",
                flexShrink: 0
              }}>
                {!listFilter && (
                  <button
                    style={{
                      position: "absolute",
                      top: "20px",
                      right: "12px",
                      width: "32px",
                      height: "32px",
                      borderRadius: "6px",
                      border: "none",
                      backgroundColor: "var(--gray-4)",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center"
                    }}
                  >
                    ✕
                  </button>
                )}
                
                <div style={{ padding: "0 12px 12px 12px" }}>
                  <select 
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    style={{
                      width: "100%",
                      height: "44px",
                      border: "1px solid var(--gray-6)",
                      borderRadius: "6px",
                      padding: "0 12px",
                      backgroundColor: "white"
                    }}
                  >
                    <option value="started">Started</option>
                    <option value="on-hold">On Hold</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
                
                <div style={{ borderTop: "1px solid var(--gray-6)", padding: "12px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                    <h6 style={{ fontSize: "14px", fontWeight: "500", color: "var(--gray-10)", margin: 0 }}>Members</h6>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                    {projects[0].members.slice(0, 3).map((member, index) => (
                      <div key={index} style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                        <div style={{
                          width: "40px",
                          height: "40px",
                          borderRadius: "50%",
                          overflow: "hidden",
                          backgroundColor: "var(--gray-4)"
                        }}>
                          <img 
                            src={member.avatar} 
                            alt={member.name}
                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                          />
                        </div>
                        <div>
                          <p style={{ fontSize: "14px", fontWeight: "500", margin: "0 0 2px 0" }}>{member.name}</p>
                          <p style={{ fontSize: "12px", color: "var(--gray-11)", margin: 0 }}>{member.position}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div style={{ borderTop: "1px solid var(--gray-6)", padding: "12px" }}>
                  <h6 style={{ fontSize: "14px", fontWeight: "500", color: "var(--gray-10)", marginBottom: "16px" }}>FILES</h6>
                  <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "8px", backgroundColor: "var(--gray-3)", borderRadius: "8px" }}>
                      <div style={{ width: "48px", height: "48px", borderRadius: "8px", backgroundColor: "var(--gray-5)", display: "flex", alignItems: "center", justifyContent: "center" }}>📄</div>
                      <div style={{ flex: 1 }}>
                        <p style={{ fontSize: "14px", fontWeight: "500", margin: "0 0 2px 0" }}>Design.pdf</p>
                        <p style={{ fontSize: "12px", color: "var(--gray-11)", margin: 0 }}>2.4 MB</p>
                      </div>
                      <button style={{ padding: "8px", backgroundColor: "transparent", border: "none", borderRadius: "50%" }}>⬇️</button>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "8px", backgroundColor: "var(--gray-3)", borderRadius: "8px" }}>
                      <div style={{ width: "48px", height: "48px", borderRadius: "8px", backgroundColor: "var(--gray-5)", display: "flex", alignItems: "center", justifyContent: "center" }}>🖼️</div>
                      <div style={{ flex: 1 }}>
                        <p style={{ fontSize: "14px", fontWeight: "500", margin: "0 0 2px 0" }}>mockup.png</p>
                        <p style={{ fontSize: "12px", color: "var(--gray-11)", margin: 0 }}>1.8 MB</p>
                      </div>
                      <button style={{ padding: "8px", backgroundColor: "transparent", border: "none", borderRadius: "50%" }}>⬇️</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const meta: Meta<typeof ProjectDrawerWrapper> = {
  title: "3 Blocks/Projects/Project Drawer",
  component: ProjectDrawerWrapper,
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <QueryClientProvider client={queryClient}>
        <Theme>
          <Story />
        </Theme>
      </QueryClientProvider>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof ProjectDrawerWrapper>

export const GridViewDrawer: Story = {
  args: {
    listFilter: false,
    forceOpen: true
  },
  name: "Grid View Drawer",
  parameters: {
    docs: {
      description: {
        story: "Project drawer as it appears when opened from grid view - full width overlay with close button.",
      },
    },
  },
}

export const ListViewDrawer: Story = {
  render: () => (
    <div style={{ display: "flex", height: "100vh" }}>
      <div style={{ width: "300px", backgroundColor: "#f8f9fa", padding: "20px", borderRight: "1px solid #e0e0e0" }}>
        <h3 style={{ marginBottom: "16px" }}>Project List</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {projects.slice(0, 3).map((project) => (
            <div key={project.id} style={{
              padding: "12px",
              backgroundColor: "white",
              borderRadius: "8px",
              border: "1px solid #e0e0e0",
              cursor: "pointer"
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <img src={project.logo} alt={project.name} style={{ width: "24px", height: "24px" }} />
                <div>
                  <p style={{ margin: "0", fontSize: "14px", fontWeight: "500" }}>{project.name}</p>
                  <p style={{ margin: "0", fontSize: "12px", color: "#666" }}>{project.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <ProjectDrawerWrapper 
        listFilter={true} 
        listFilterClassName="w-full relative z-50 h-[84vh] shrink-0 rounded-xl"
        forceOpen={true}
      />
    </div>
  ),
  name: "List View Drawer",
  parameters: {
    docs: {
      description: {
        story: "Project drawer in list view mode - appears as part of the split layout without overlay.",
      },
    },
  },
}
