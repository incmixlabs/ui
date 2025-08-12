import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{r as B}from"./iframe-DsuaOdjx.js";import{S as a}from"./base-button-Dyf4vkZD.js";import"./avatar-RXesCRZq.js";import{B as o}from"./box-CeCqNv3u.js";import"./button-ClCv9eVs.js";import"./card-DfIScEG2.js";import{F as r}from"./flex-bym-5aeO.js";import"./icon-button-QpiRLWqf.js";import{T as n}from"./text-Bwa-Y73d.js";import{T as F}from"./theme-BFbej9HP.js";import{B as t}from"./button-jOk6Qw9K.js";import"./preload-helper-D9Z9MdNV.js";import"./high-contrast.prop-DN4VqJ5o.js";import"./index-CVlKO6je.js";import"./index-BW54sZL3.js";import"./radius.prop-BFb5uVoY.js";import"./get-subtree-COcTOnEl.js";import"./weight.prop-Rt1sSGdE.js";const M={title:"Base/Spinner",component:a,parameters:{layout:"centered"},decorators:[i=>e.jsx(F,{children:e.jsx(i,{})})],argTypes:{size:{control:"select",options:["1","2","3"],description:"Spinner size"},loading:{control:"boolean",description:"Whether the spinner is loading/visible"}},args:{size:"2",loading:!0}},s={args:{}},d={args:{size:"1"}},l={args:{size:"2"}},c={args:{size:"3"}},g={args:{loading:!0}},x={args:{loading:!1}},p={render:()=>e.jsx(r,{align:"center",gap:"4",children:["1","2","3"].map(i=>e.jsxs(r,{direction:"column",align:"center",gap:"2",children:[e.jsx(a,{size:i}),e.jsxs(n,{size:"1",color:"gray",children:["Size ",i]})]},i))})},u={render:()=>e.jsxs(r,{gap:"3",align:"center",children:[e.jsx(t,{loading:!0,size:"1",children:"Small Button"}),e.jsx(t,{loading:!0,size:"2",children:"Medium Button"}),e.jsx(t,{loading:!0,size:"3",children:"Large Button"}),e.jsx(t,{loading:!0,size:"4",children:"Extra Large Button"})]})},m={render:()=>e.jsx(r,{direction:"column",gap:"6",style:{width:"400px"},children:e.jsxs("div",{children:[e.jsx(n,{size:"3",weight:"medium",style:{marginBottom:"12px"},children:"Loading States"}),e.jsxs(r,{direction:"column",gap:"4",children:[e.jsxs(r,{gap:"2",align:"center",children:[e.jsx(a,{size:"1"}),e.jsx(n,{size:"2",children:"Loading content..."})]}),e.jsx(o,{style:{padding:"16px",backgroundColor:"var(--gray-2)",borderRadius:"8px"},children:e.jsxs(r,{direction:"column",gap:"3",align:"center",children:[e.jsx(a,{size:"2"}),e.jsx(n,{size:"2",color:"gray",children:"Loading dashboard data"})]})}),e.jsxs(r,{gap:"2",children:[e.jsx(t,{loading:!0,variant:"solid",children:"Saving..."}),e.jsx(t,{loading:!0,variant:"outline",children:"Processing..."}),e.jsx(t,{loading:!0,variant:"ghost",children:"Loading..."})]})]})]})})},h={render:()=>{const[i,j]=B.useState(!1),b=()=>{j(!0),setTimeout(()=>j(!1),3e3)};return e.jsxs(r,{direction:"column",gap:"4",align:"center",children:[e.jsx(n,{size:"3",weight:"medium",children:"Interactive Loading Demo"}),e.jsx(o,{style:{padding:"32px",backgroundColor:"var(--gray-2)",borderRadius:"8px",minHeight:"120px",display:"flex",alignItems:"center",justifyContent:"center",minWidth:"200px"},children:i?e.jsxs(r,{direction:"column",gap:"2",align:"center",children:[e.jsx(a,{size:"2"}),e.jsx(n,{size:"2",color:"gray",children:"Loading data..."})]}):e.jsx(n,{size:"3",children:"Content loaded!"})}),e.jsx(t,{onClick:b,disabled:i,children:i?"Loading...":"Start Loading"})]})}},y={render:()=>e.jsxs(o,{style:{position:"relative",width:"300px",height:"200px"},children:[e.jsxs(o,{style:{padding:"20px",backgroundColor:"var(--gray-2)",borderRadius:"8px",height:"100%"},children:[e.jsx(n,{size:"3",weight:"medium",style:{marginBottom:"12px"},children:"Card Content"}),e.jsx(n,{size:"2",color:"gray",children:"This is some content that would be shown when not loading."})]}),e.jsx(o,{style:{position:"absolute",top:0,left:0,right:0,bottom:0,backgroundColor:"rgba(255, 255, 255, 0.8)",borderRadius:"8px",display:"flex",alignItems:"center",justifyContent:"center"},children:e.jsxs(r,{direction:"column",gap:"2",align:"center",children:[e.jsx(a,{size:"2"}),e.jsx(n,{size:"2",color:"gray",children:"Loading..."})]})})]})},z={render:()=>e.jsxs(r,{direction:"column",gap:"6",style:{width:"400px"},children:[e.jsx("div",{children:e.jsx(n,{size:"4",weight:"bold",children:"Common Loading Patterns"})}),e.jsxs(o,{style:{padding:"16px",backgroundColor:"var(--blue-2)",borderRadius:"8px"},children:[e.jsx(n,{size:"3",weight:"medium",style:{marginBottom:"12px"},children:"Form Submission"}),e.jsxs(r,{gap:"2",align:"center",children:[e.jsx(t,{loading:!0,size:"2",children:"Save Changes"}),e.jsx(n,{size:"2",color:"gray",children:"Processing your request..."})]})]}),e.jsxs(o,{style:{padding:"16px",backgroundColor:"var(--green-2)",borderRadius:"8px"},children:[e.jsx(n,{size:"3",weight:"medium",style:{marginBottom:"12px"},children:"Data Fetching"}),e.jsxs(r,{direction:"column",gap:"3",children:[e.jsxs(r,{gap:"2",align:"center",children:[e.jsx(a,{size:"1"}),e.jsx(n,{size:"2",children:"Fetching user data..."})]}),e.jsx(o,{style:{height:"40px",backgroundColor:"var(--gray-3)",borderRadius:"4px",opacity:.5}}),e.jsx(o,{style:{height:"40px",backgroundColor:"var(--gray-3)",borderRadius:"4px",opacity:.5}})]})]}),e.jsxs(o,{style:{padding:"16px",backgroundColor:"var(--orange-2)",borderRadius:"8px"},children:[e.jsx(n,{size:"3",weight:"medium",style:{marginBottom:"12px"},children:"File Upload"}),e.jsxs(r,{direction:"column",gap:"2",children:[e.jsxs(r,{gap:"2",align:"center",children:[e.jsx(a,{size:"1"}),e.jsx(n,{size:"2",children:"Uploading document.pdf..."})]}),e.jsx(o,{style:{height:"4px",backgroundColor:"var(--gray-4)",borderRadius:"2px",overflow:"hidden"},children:e.jsx(o,{style:{height:"100%",width:"60%",backgroundColor:"var(--orange-9)",borderRadius:"2px"}})}),e.jsx(n,{size:"1",color:"gray",children:"60% complete"})]})]})]})};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {}
}`,...s.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    size: "1"
  }
}`,...d.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    size: "2"
  }
}`,...l.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    size: "3"
  }
}`,...c.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: {
    loading: true
  }
}`,...g.parameters?.docs?.source}}};x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  args: {
    loading: false
  }
}`,...x.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: () => <Flex align="center" gap="4">
      {["1", "2", "3"].map(size => <Flex key={size} direction="column" align="center" gap="2">
          <Spinner size={size as any} />
          <Text size="1" color="gray">
            Size {size}
          </Text>
        </Flex>)}
    </Flex>
}`,...p.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  render: () => <Flex gap="3" align="center">
      <Button loading size="1">
        Small Button
      </Button>
      <Button loading size="2">
        Medium Button
      </Button>
      <Button loading size="3">
        Large Button
      </Button>
      <Button loading size="4">
        Extra Large Button
      </Button>
    </Flex>
}`,...u.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  render: () => <Flex direction="column" gap="6" style={{
    width: "400px"
  }}>
      <div>
        <Text size="3" weight="medium" style={{
        marginBottom: "12px"
      }}>
          Loading States
        </Text>

        <Flex direction="column" gap="4">
          {/* Inline loading */}
          <Flex gap="2" align="center">
            <Spinner size="1" />
            <Text size="2">Loading content...</Text>
          </Flex>

          {/* Card loading */}
          <Box style={{
          padding: "16px",
          backgroundColor: "var(--gray-2)",
          borderRadius: "8px"
        }}>
            <Flex direction="column" gap="3" align="center">
              <Spinner size="2" />
              <Text size="2" color="gray">
                Loading dashboard data
              </Text>
            </Flex>
          </Box>

          {/* Button states */}
          <Flex gap="2">
            <Button loading variant="solid">
              Saving...
            </Button>
            <Button loading variant="outline">
              Processing...
            </Button>
            <Button loading variant="ghost">
              Loading...
            </Button>
          </Flex>
        </Flex>
      </div>
    </Flex>
}`,...m.parameters?.docs?.source}}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [isLoading, setIsLoading] = React.useState(false);
    const handleLoad = () => {
      setIsLoading(true);
      setTimeout(() => setIsLoading(false), 3000);
    };
    return <Flex direction="column" gap="4" align="center">
        <Text size="3" weight="medium">
          Interactive Loading Demo
        </Text>

        <Box style={{
        padding: "32px",
        backgroundColor: "var(--gray-2)",
        borderRadius: "8px",
        minHeight: "120px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minWidth: "200px"
      }}>
          {isLoading ? <Flex direction="column" gap="2" align="center">
              <Spinner size="2" />
              <Text size="2" color="gray">
                Loading data...
              </Text>
            </Flex> : <Text size="3">Content loaded!</Text>}
        </Box>

        <Button onClick={handleLoad} disabled={isLoading}>
          {isLoading ? "Loading..." : "Start Loading"}
        </Button>
      </Flex>;
  }
}`,...h.parameters?.docs?.source}}};y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  render: () => <Box style={{
    position: "relative",
    width: "300px",
    height: "200px"
  }}>
      {/* Content */}
      <Box style={{
      padding: "20px",
      backgroundColor: "var(--gray-2)",
      borderRadius: "8px",
      height: "100%"
    }}>
        <Text size="3" weight="medium" style={{
        marginBottom: "12px"
      }}>
          Card Content
        </Text>
        <Text size="2" color="gray">
          This is some content that would be shown when not loading.
        </Text>
      </Box>

      {/* Loading overlay */}
      <Box style={{
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(255, 255, 255, 0.8)",
      borderRadius: "8px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }}>
        <Flex direction="column" gap="2" align="center">
          <Spinner size="2" />
          <Text size="2" color="gray">
            Loading...
          </Text>
        </Flex>
      </Box>
    </Box>
}`,...y.parameters?.docs?.source}}};z.parameters={...z.parameters,docs:{...z.parameters?.docs,source:{originalSource:`{
  render: () => <Flex direction="column" gap="6" style={{
    width: "400px"
  }}>
      <div>
        <Text size="4" weight="bold">
          Common Loading Patterns
        </Text>
      </div>

      {/* Form submission */}
      <Box style={{
      padding: "16px",
      backgroundColor: "var(--blue-2)",
      borderRadius: "8px"
    }}>
        <Text size="3" weight="medium" style={{
        marginBottom: "12px"
      }}>
          Form Submission
        </Text>
        <Flex gap="2" align="center">
          <Button loading size="2">
            Save Changes
          </Button>
          <Text size="2" color="gray">
            Processing your request...
          </Text>
        </Flex>
      </Box>

      {/* Data fetching */}
      <Box style={{
      padding: "16px",
      backgroundColor: "var(--green-2)",
      borderRadius: "8px"
    }}>
        <Text size="3" weight="medium" style={{
        marginBottom: "12px"
      }}>
          Data Fetching
        </Text>
        <Flex direction="column" gap="3">
          <Flex gap="2" align="center">
            <Spinner size="1" />
            <Text size="2">Fetching user data...</Text>
          </Flex>
          <Box style={{
          height: "40px",
          backgroundColor: "var(--gray-3)",
          borderRadius: "4px",
          opacity: 0.5
        }} />
          <Box style={{
          height: "40px",
          backgroundColor: "var(--gray-3)",
          borderRadius: "4px",
          opacity: 0.5
        }} />
        </Flex>
      </Box>

      {/* File upload */}
      <Box style={{
      padding: "16px",
      backgroundColor: "var(--orange-2)",
      borderRadius: "8px"
    }}>
        <Text size="3" weight="medium" style={{
        marginBottom: "12px"
      }}>
          File Upload
        </Text>
        <Flex direction="column" gap="2">
          <Flex gap="2" align="center">
            <Spinner size="1" />
            <Text size="2">Uploading document.pdf...</Text>
          </Flex>
          <Box style={{
          height: "4px",
          backgroundColor: "var(--gray-4)",
          borderRadius: "2px",
          overflow: "hidden"
        }}>
            <Box style={{
            height: "100%",
            width: "60%",
            backgroundColor: "var(--orange-9)",
            borderRadius: "2px"
          }} />
          </Box>
          <Text size="1" color="gray">
            60% complete
          </Text>
        </Flex>
      </Box>
    </Flex>
}`,...z.parameters?.docs?.source}}};const _=["Default","Size1","Size2","Size3","LoadingTrue","LoadingFalse","AllSizes","InButtons","InDifferentContexts","ConditionalLoading","LoadingOverlay","RealWorldPatterns"];export{p as AllSizes,h as ConditionalLoading,s as Default,u as InButtons,m as InDifferentContexts,x as LoadingFalse,y as LoadingOverlay,g as LoadingTrue,z as RealWorldPatterns,d as Size1,l as Size2,c as Size3,_ as __namedExportsOrder,M as default};
