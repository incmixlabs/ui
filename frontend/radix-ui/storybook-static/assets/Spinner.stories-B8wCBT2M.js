import{S as i,B as n}from"./button-1BHGwx6R.js";import{T as t}from"./text-CQaCKnMS.js";import{F as r}from"./flex-CetshBpm.js";import{B as a}from"./box-DFM537Ql.js";import{T as B}from"./theme-D6H7S_T9.js";import{r as e}from"./iframe-BXP7S-hP.js";import"./radius.prop-BFb5uVoY.js";import"./weight.prop-Rt1sSGdE.js";import"./slot-BST-kKXi.js";import"./jsx-runtime-CQTdPr-F.js";import"./index-5QXC4EVg.js";import"./preload-helper-D9Z9MdNV.js";const P={title:"Components/Spinner",component:i,parameters:{layout:"centered"},decorators:[o=>e.createElement(B,null,e.createElement(o,null))],argTypes:{size:{control:"select",options:["1","2","3"],description:"Spinner size"},loading:{control:"boolean",description:"Whether the spinner is loading/visible"}},args:{size:"2",loading:!0}},s={args:{}},l={args:{size:"1"}},d={args:{size:"2"}},c={args:{size:"3"}},g={args:{loading:!0}},m={args:{loading:!1}},p={render:()=>e.createElement(r,{align:"center",gap:"4"},["1","2","3"].map(o=>e.createElement(r,{key:o,direction:"column",align:"center",gap:"2"},e.createElement(i,{size:o}),e.createElement(t,{size:"1",color:"gray"},"Size ",o))))},u={render:()=>e.createElement(r,{gap:"3",align:"center"},e.createElement(n,{loading:!0,size:"1"},"Small Button"),e.createElement(n,{loading:!0,size:"2"},"Medium Button"),e.createElement(n,{loading:!0,size:"3"},"Large Button"),e.createElement(n,{loading:!0,size:"4"},"Extra Large Button"))},x={render:()=>e.createElement(r,{direction:"column",gap:"6",style:{width:"400px"}},e.createElement("div",null,e.createElement(t,{size:"3",weight:"medium",style:{marginBottom:"12px"}},"Loading States"),e.createElement(r,{direction:"column",gap:"4"},e.createElement(r,{gap:"2",align:"center"},e.createElement(i,{size:"1"}),e.createElement(t,{size:"2"},"Loading content...")),e.createElement(a,{style:{padding:"16px",backgroundColor:"var(--gray-2)",borderRadius:"8px"}},e.createElement(r,{direction:"column",gap:"3",align:"center"},e.createElement(i,{size:"2"}),e.createElement(t,{size:"2",color:"gray"},"Loading dashboard data"))),e.createElement(r,{gap:"2"},e.createElement(n,{loading:!0,variant:"solid"},"Saving..."),e.createElement(n,{loading:!0,variant:"outline"},"Processing..."),e.createElement(n,{loading:!0,variant:"ghost"},"Loading...")))))},y={render:()=>{const[o,E]=e.useState(!1),b=()=>{E(!0),setTimeout(()=>E(!1),3e3)};return e.createElement(r,{direction:"column",gap:"4",align:"center"},e.createElement(t,{size:"3",weight:"medium"},"Interactive Loading Demo"),e.createElement(a,{style:{padding:"32px",backgroundColor:"var(--gray-2)",borderRadius:"8px",minHeight:"120px",display:"flex",alignItems:"center",justifyContent:"center",minWidth:"200px"}},o?e.createElement(r,{direction:"column",gap:"2",align:"center"},e.createElement(i,{size:"2"}),e.createElement(t,{size:"2",color:"gray"},"Loading data...")):e.createElement(t,{size:"3"},"Content loaded!")),e.createElement(n,{onClick:b,disabled:o},o?"Loading...":"Start Loading"))}},h={render:()=>e.createElement(a,{style:{position:"relative",width:"300px",height:"200px"}},e.createElement(a,{style:{padding:"20px",backgroundColor:"var(--gray-2)",borderRadius:"8px",height:"100%"}},e.createElement(t,{size:"3",weight:"medium",style:{marginBottom:"12px"}},"Card Content"),e.createElement(t,{size:"2",color:"gray"},"This is some content that would be shown when not loading.")),e.createElement(a,{style:{position:"absolute",top:0,left:0,right:0,bottom:0,backgroundColor:"rgba(255, 255, 255, 0.8)",borderRadius:"8px",display:"flex",alignItems:"center",justifyContent:"center"}},e.createElement(r,{direction:"column",gap:"2",align:"center"},e.createElement(i,{size:"2"}),e.createElement(t,{size:"2",color:"gray"},"Loading..."))))},z={render:()=>e.createElement(r,{direction:"column",gap:"6",style:{width:"400px"}},e.createElement("div",null,e.createElement(t,{size:"4",weight:"bold"},"Common Loading Patterns")),e.createElement(a,{style:{padding:"16px",backgroundColor:"var(--blue-2)",borderRadius:"8px"}},e.createElement(t,{size:"3",weight:"medium",style:{marginBottom:"12px"}},"Form Submission"),e.createElement(r,{gap:"2",align:"center"},e.createElement(n,{loading:!0,size:"2"},"Save Changes"),e.createElement(t,{size:"2",color:"gray"},"Processing your request..."))),e.createElement(a,{style:{padding:"16px",backgroundColor:"var(--green-2)",borderRadius:"8px"}},e.createElement(t,{size:"3",weight:"medium",style:{marginBottom:"12px"}},"Data Fetching"),e.createElement(r,{direction:"column",gap:"3"},e.createElement(r,{gap:"2",align:"center"},e.createElement(i,{size:"1"}),e.createElement(t,{size:"2"},"Fetching user data...")),e.createElement(a,{style:{height:"40px",backgroundColor:"var(--gray-3)",borderRadius:"4px",opacity:.5}}),e.createElement(a,{style:{height:"40px",backgroundColor:"var(--gray-3)",borderRadius:"4px",opacity:.5}}))),e.createElement(a,{style:{padding:"16px",backgroundColor:"var(--orange-2)",borderRadius:"8px"}},e.createElement(t,{size:"3",weight:"medium",style:{marginBottom:"12px"}},"File Upload"),e.createElement(r,{direction:"column",gap:"2"},e.createElement(r,{gap:"2",align:"center"},e.createElement(i,{size:"1"}),e.createElement(t,{size:"2"},"Uploading document.pdf...")),e.createElement(a,{style:{height:"4px",backgroundColor:"var(--gray-4)",borderRadius:"2px",overflow:"hidden"}},e.createElement(a,{style:{height:"100%",width:"60%",backgroundColor:"var(--orange-9)",borderRadius:"2px"}})),e.createElement(t,{size:"1",color:"gray"},"60% complete"))))};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {}
}`,...s.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    size: '1'
  }
}`,...l.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    size: '2'
  }
}`,...d.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    size: '3'
  }
}`,...c.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: {
    loading: true
  }
}`,...g.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    loading: false
  }
}`,...m.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: () => <Flex align="center" gap="4">
      {['1', '2', '3'].map(size => <Flex key={size} direction="column" align="center" gap="2">
          <Spinner size={size as any} />
          <Text size="1" color="gray">Size {size}</Text>
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
}`,...u.parameters?.docs?.source}}};x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  render: () => <Flex direction="column" gap="6" style={{
    width: '400px'
  }}>
      <div>
        <Text size="3" weight="medium" style={{
        marginBottom: '12px'
      }}>Loading States</Text>
        
        <Flex direction="column" gap="4">
          {/* Inline loading */}
          <Flex gap="2" align="center">
            <Spinner size="1" />
            <Text size="2">Loading content...</Text>
          </Flex>

          {/* Card loading */}
          <Box style={{
          padding: '16px',
          backgroundColor: 'var(--gray-2)',
          borderRadius: '8px'
        }}>
            <Flex direction="column" gap="3" align="center">
              <Spinner size="2" />
              <Text size="2" color="gray">Loading dashboard data</Text>
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
}`,...x.parameters?.docs?.source}}};y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
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
        padding: '32px',
        backgroundColor: 'var(--gray-2)',
        borderRadius: '8px',
        minHeight: '120px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: '200px'
      }}>
          {isLoading ? <Flex direction="column" gap="2" align="center">
              <Spinner size="2" />
              <Text size="2" color="gray">Loading data...</Text>
            </Flex> : <Text size="3">Content loaded!</Text>}
        </Box>

        <Button onClick={handleLoad} disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Start Loading'}
        </Button>
      </Flex>;
  }
}`,...y.parameters?.docs?.source}}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  render: () => <Box style={{
    position: 'relative',
    width: '300px',
    height: '200px'
  }}>
      {/* Content */}
      <Box style={{
      padding: '20px',
      backgroundColor: 'var(--gray-2)',
      borderRadius: '8px',
      height: '100%'
    }}>
        <Text size="3" weight="medium" style={{
        marginBottom: '12px'
      }}>
          Card Content
        </Text>
        <Text size="2" color="gray">
          This is some content that would be shown when not loading.
        </Text>
      </Box>

      {/* Loading overlay */}
      <Box style={{
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      borderRadius: '8px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
        <Flex direction="column" gap="2" align="center">
          <Spinner size="2" />
          <Text size="2" color="gray">Loading...</Text>
        </Flex>
      </Box>
    </Box>
}`,...h.parameters?.docs?.source}}};z.parameters={...z.parameters,docs:{...z.parameters?.docs,source:{originalSource:`{
  render: () => <Flex direction="column" gap="6" style={{
    width: '400px'
  }}>
      <div>
        <Text size="4" weight="bold">Common Loading Patterns</Text>
      </div>

      {/* Form submission */}
      <Box style={{
      padding: '16px',
      backgroundColor: 'var(--blue-2)',
      borderRadius: '8px'
    }}>
        <Text size="3" weight="medium" style={{
        marginBottom: '12px'
      }}>
          Form Submission
        </Text>
        <Flex gap="2" align="center">
          <Button loading size="2">
            Save Changes
          </Button>
          <Text size="2" color="gray">Processing your request...</Text>
        </Flex>
      </Box>

      {/* Data fetching */}
      <Box style={{
      padding: '16px',
      backgroundColor: 'var(--green-2)',
      borderRadius: '8px'
    }}>
        <Text size="3" weight="medium" style={{
        marginBottom: '12px'
      }}>
          Data Fetching
        </Text>
        <Flex direction="column" gap="3">
          <Flex gap="2" align="center">
            <Spinner size="1" />
            <Text size="2">Fetching user data...</Text>
          </Flex>
          <Box style={{
          height: '40px',
          backgroundColor: 'var(--gray-3)',
          borderRadius: '4px',
          opacity: 0.5
        }} />
          <Box style={{
          height: '40px',
          backgroundColor: 'var(--gray-3)',
          borderRadius: '4px',
          opacity: 0.5
        }} />
        </Flex>
      </Box>

      {/* File upload */}
      <Box style={{
      padding: '16px',
      backgroundColor: 'var(--orange-2)',
      borderRadius: '8px'
    }}>
        <Text size="3" weight="medium" style={{
        marginBottom: '12px'
      }}>
          File Upload
        </Text>
        <Flex direction="column" gap="2">
          <Flex gap="2" align="center">
            <Spinner size="1" />
            <Text size="2">Uploading document.pdf...</Text>
          </Flex>
          <Box style={{
          height: '4px',
          backgroundColor: 'var(--gray-4)',
          borderRadius: '2px',
          overflow: 'hidden'
        }}>
            <Box style={{
            height: '100%',
            width: '60%',
            backgroundColor: 'var(--orange-9)',
            borderRadius: '2px'
          }} />
          </Box>
          <Text size="1" color="gray">60% complete</Text>
        </Flex>
      </Box>
    </Flex>
}`,...z.parameters?.docs?.source}}};const W=["Default","Size1","Size2","Size3","LoadingTrue","LoadingFalse","AllSizes","InButtons","InDifferentContexts","ConditionalLoading","LoadingOverlay","RealWorldPatterns"];export{p as AllSizes,y as ConditionalLoading,s as Default,u as InButtons,x as InDifferentContexts,m as LoadingFalse,h as LoadingOverlay,g as LoadingTrue,z as RealWorldPatterns,l as Size1,d as Size2,c as Size3,W as __namedExportsOrder,P as default};
