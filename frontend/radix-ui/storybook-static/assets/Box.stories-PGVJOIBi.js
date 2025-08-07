import{B as r}from"./box-DFM537Ql.js";import{T as e}from"./text-CQaCKnMS.js";import{T as m}from"./theme-D6H7S_T9.js";import"./iframe-BXP7S-hP.js";import"./preload-helper-D9Z9MdNV.js";import"./slot-BST-kKXi.js";import"./weight.prop-Rt1sSGdE.js";import"./jsx-runtime-CQTdPr-F.js";import"./index-5QXC4EVg.js";const T={title:"Components/Box",component:r,parameters:{layout:"centered"},decorators:[g=>React.createElement(m,null,React.createElement(g,null))],argTypes:{as:{control:"select",options:["div","span"],description:"HTML element to render"},display:{control:"select",options:["none","inline","inline-block","block","contents"],description:"CSS display property"},asChild:{control:"boolean",description:"Merge props with the child element"},style:{control:"object",description:"Custom styles"},children:{control:"text",description:"Box content"}},args:{as:"div",children:"Box content"}},a={args:{children:"This is a default box",style:{padding:"16px",backgroundColor:"var(--gray-3)",borderRadius:"8px"}}},o={args:{as:"div",children:"This is a div box",style:{padding:"16px",backgroundColor:"var(--blue-3)",borderRadius:"8px"}}},t={args:{as:"span",children:"This is a span box",style:{padding:"8px",backgroundColor:"var(--green-3)",borderRadius:"4px"}}},i={args:{display:"block",children:"Block display box",style:{padding:"16px",backgroundColor:"var(--red-3)",borderRadius:"8px",width:"200px"}}},l={args:{display:"inline",children:"Inline display box",style:{padding:"8px",backgroundColor:"var(--purple-3)",borderRadius:"4px"}}},n={args:{display:"inline-block",children:"Inline-block display box",style:{padding:"12px",backgroundColor:"var(--orange-3)",borderRadius:"6px"}}},s={render:()=>React.createElement("div",null,React.createElement(e,null,"You should not see a box below this text:"),React.createElement(r,{display:"none",style:{padding:"16px",backgroundColor:"var(--red-9)"}},"This box is hidden"),React.createElement(e,null,"The box above is hidden with display: none"))},d={render:()=>React.createElement("div",{style:{display:"flex",flexDirection:"column",gap:"16px",width:"400px"}},React.createElement(e,{size:"4",weight:"bold"},"Box Layout Examples"),React.createElement("div",null,React.createElement(e,{size:"2",weight:"medium",color:"gray"},"Block boxes (stack vertically):"),React.createElement(r,{display:"block",style:{padding:"8px",backgroundColor:"var(--blue-3)",marginBottom:"4px"}},"Block Box 1"),React.createElement(r,{display:"block",style:{padding:"8px",backgroundColor:"var(--blue-4)"}},"Block Box 2")),React.createElement("div",null,React.createElement(e,{size:"2",weight:"medium",color:"gray"},"Inline boxes (flow with text):"),React.createElement("div",null,"Here is some text with"," ",React.createElement(r,{display:"inline",style:{padding:"4px",backgroundColor:"var(--green-3)"}},"inline box 1")," ","and"," ",React.createElement(r,{display:"inline",style:{padding:"4px",backgroundColor:"var(--green-4)"}},"inline box 2")," ","in the middle.")),React.createElement("div",null,React.createElement(e,{size:"2",weight:"medium",color:"gray"},"Inline-block boxes (inline but with block properties):"),React.createElement("div",null,React.createElement(r,{display:"inline-block",style:{padding:"12px",backgroundColor:"var(--purple-3)",marginRight:"8px",width:"80px",textAlign:"center"}},"Box 1"),React.createElement(r,{display:"inline-block",style:{padding:"12px",backgroundColor:"var(--purple-4)",width:"80px",textAlign:"center"}},"Box 2"))))},c={render:()=>React.createElement("div",{style:{maxWidth:"400px",display:"flex",flexDirection:"column",gap:"16px"}},React.createElement(e,{size:"4",weight:"bold"},"Semantic Box Usage"),React.createElement(r,{as:"div",style:{padding:"16px",backgroundColor:"var(--blue-2)",borderRadius:"8px",border:"1px solid var(--blue-6)"}},React.createElement(e,{size:"3",weight:"medium",color:"blue"},"Card Container"),React.createElement(e,{size:"2",style:{marginTop:"8px"}},"This box acts as a card container with padding and background styling.")),React.createElement(r,{as:"div",style:{padding:"12px",backgroundColor:"var(--yellow-2)",borderRadius:"4px",borderLeft:"4px solid var(--yellow-9)"}},React.createElement(e,{size:"2",weight:"medium",color:"yellow"},"Warning Notice"),React.createElement(e,{size:"2",style:{marginTop:"4px"}},"This box is styled as a warning message with a left border accent.")),React.createElement(r,{as:"div",style:{display:"flex",padding:"8px",backgroundColor:"var(--gray-2)",borderRadius:"20px"}},React.createElement(r,{as:"span",style:{padding:"4px 12px",backgroundColor:"var(--green-9)",color:"white",borderRadius:"16px",fontSize:"12px"}},"Status: Active")))},p={render:()=>React.createElement("div",{style:{display:"flex",flexDirection:"column",gap:"16px"}},React.createElement(e,{size:"4",weight:"bold"},"Responsive Box Concepts"),React.createElement(e,{size:"2",color:"gray"},"These boxes demonstrate different responsive behaviors. In a real responsive setup, the display properties would change based on viewport size."),React.createElement("div",{style:{display:"flex",gap:"8px",flexWrap:"wrap"}},React.createElement(r,{display:"block",style:{padding:"16px",backgroundColor:"var(--blue-3)",borderRadius:"8px",minWidth:"150px",flex:"1"}},React.createElement(e,{size:"2",weight:"medium"},"Mobile: Block"),React.createElement(e,{size:"1"},"Full width on small screens")),React.createElement(r,{display:"inline-block",style:{padding:"16px",backgroundColor:"var(--green-3)",borderRadius:"8px",minWidth:"150px",flex:"1"}},React.createElement(e,{size:"2",weight:"medium"},"Tablet: Inline-block"),React.createElement(e,{size:"1"},"Side by side on medium screens")),React.createElement(r,{display:"block",style:{padding:"16px",backgroundColor:"var(--purple-3)",borderRadius:"8px",minWidth:"150px",flex:"1"}},React.createElement(e,{size:"2",weight:"medium"},"Desktop: Flex item"),React.createElement(e,{size:"1"},"Flexible layout on large screens"))))},x={render:()=>React.createElement("div",{style:{display:"flex",flexDirection:"column",gap:"16px"}},React.createElement(e,{size:"4",weight:"bold"},"AsChild Usage"),React.createElement("div",null,React.createElement(e,{size:"2",weight:"medium",color:"gray"},"Normal Box:"),React.createElement(r,{style:{padding:"12px",backgroundColor:"var(--blue-3)",borderRadius:"8px"}},React.createElement("button",null,"I'm inside a Box"))),React.createElement("div",null,React.createElement(e,{size:"2",weight:"medium",color:"gray"},"AsChild Box (merges with button):"),React.createElement(r,{asChild:!0,style:{padding:"12px",backgroundColor:"var(--green-3)",borderRadius:"8px",border:"none",cursor:"pointer"}},React.createElement("button",null,"I am the Box (merged props)"))))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    children: 'This is a default box',
    style: {
      padding: '16px',
      backgroundColor: 'var(--gray-3)',
      borderRadius: '8px'
    }
  }
}`,...a.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    as: 'div',
    children: 'This is a div box',
    style: {
      padding: '16px',
      backgroundColor: 'var(--blue-3)',
      borderRadius: '8px'
    }
  }
}`,...o.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    as: 'span',
    children: 'This is a span box',
    style: {
      padding: '8px',
      backgroundColor: 'var(--green-3)',
      borderRadius: '4px'
    }
  }
}`,...t.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    display: 'block',
    children: 'Block display box',
    style: {
      padding: '16px',
      backgroundColor: 'var(--red-3)',
      borderRadius: '8px',
      width: '200px'
    }
  }
}`,...i.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    display: 'inline',
    children: 'Inline display box',
    style: {
      padding: '8px',
      backgroundColor: 'var(--purple-3)',
      borderRadius: '4px'
    }
  }
}`,...l.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    display: 'inline-block',
    children: 'Inline-block display box',
    style: {
      padding: '12px',
      backgroundColor: 'var(--orange-3)',
      borderRadius: '6px'
    }
  }
}`,...n.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  render: () => <div>
      <Text>You should not see a box below this text:</Text>
      <Box display="none" style={{
      padding: '16px',
      backgroundColor: 'var(--red-9)'
    }}>
        This box is hidden
      </Box>
      <Text>The box above is hidden with display: none</Text>
    </div>
}`,...s.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    width: '400px'
  }}>
      <Text size="4" weight="bold">Box Layout Examples</Text>
      
      <div>
        <Text size="2" weight="medium" color="gray">Block boxes (stack vertically):</Text>
        <Box display="block" style={{
        padding: '8px',
        backgroundColor: 'var(--blue-3)',
        marginBottom: '4px'
      }}>
          Block Box 1
        </Box>
        <Box display="block" style={{
        padding: '8px',
        backgroundColor: 'var(--blue-4)'
      }}>
          Block Box 2
        </Box>
      </div>

      <div>
        <Text size="2" weight="medium" color="gray">Inline boxes (flow with text):</Text>
        <div>
          Here is some text with{' '}
          <Box display="inline" style={{
          padding: '4px',
          backgroundColor: 'var(--green-3)'
        }}>
            inline box 1
          </Box>{' '}
          and{' '}
          <Box display="inline" style={{
          padding: '4px',
          backgroundColor: 'var(--green-4)'
        }}>
            inline box 2
          </Box>{' '}
          in the middle.
        </div>
      </div>

      <div>
        <Text size="2" weight="medium" color="gray">Inline-block boxes (inline but with block properties):</Text>
        <div>
          <Box display="inline-block" style={{
          padding: '12px',
          backgroundColor: 'var(--purple-3)',
          marginRight: '8px',
          width: '80px',
          textAlign: 'center'
        }}>
            Box 1
          </Box>
          <Box display="inline-block" style={{
          padding: '12px',
          backgroundColor: 'var(--purple-4)',
          width: '80px',
          textAlign: 'center'
        }}>
            Box 2
          </Box>
        </div>
      </div>
    </div>
}`,...d.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    maxWidth: '400px',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  }}>
      <Text size="4" weight="bold">Semantic Box Usage</Text>
      
      <Box as="div" style={{
      padding: '16px',
      backgroundColor: 'var(--blue-2)',
      borderRadius: '8px',
      border: '1px solid var(--blue-6)'
    }}>
        <Text size="3" weight="medium" color="blue">Card Container</Text>
        <Text size="2" style={{
        marginTop: '8px'
      }}>
          This box acts as a card container with padding and background styling.
        </Text>
      </Box>

      <Box as="div" style={{
      padding: '12px',
      backgroundColor: 'var(--yellow-2)',
      borderRadius: '4px',
      borderLeft: '4px solid var(--yellow-9)'
    }}>
        <Text size="2" weight="medium" color="yellow">
          Warning Notice
        </Text>
        <Text size="2" style={{
        marginTop: '4px'
      }}>
          This box is styled as a warning message with a left border accent.
        </Text>
      </Box>

      <Box as="div" style={{
      display: 'flex',
      padding: '8px',
      backgroundColor: 'var(--gray-2)',
      borderRadius: '20px'
    }}>
        <Box as="span" style={{
        padding: '4px 12px',
        backgroundColor: 'var(--green-9)',
        color: 'white',
        borderRadius: '16px',
        fontSize: '12px'
      }}>
          Status: Active
        </Box>
      </Box>
    </div>
}`,...c.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  }}>
      <Text size="4" weight="bold">Responsive Box Concepts</Text>
      <Text size="2" color="gray">
        These boxes demonstrate different responsive behaviors. In a real responsive setup, 
        the display properties would change based on viewport size.
      </Text>
      
      <div style={{
      display: 'flex',
      gap: '8px',
      flexWrap: 'wrap'
    }}>
        <Box display="block" style={{
        padding: '16px',
        backgroundColor: 'var(--blue-3)',
        borderRadius: '8px',
        minWidth: '150px',
        flex: '1'
      }}>
          <Text size="2" weight="medium">Mobile: Block</Text>
          <Text size="1">Full width on small screens</Text>
        </Box>
        
        <Box display="inline-block" style={{
        padding: '16px',
        backgroundColor: 'var(--green-3)',
        borderRadius: '8px',
        minWidth: '150px',
        flex: '1'
      }}>
          <Text size="2" weight="medium">Tablet: Inline-block</Text>
          <Text size="1">Side by side on medium screens</Text>
        </Box>
        
        <Box display="block" style={{
        padding: '16px',
        backgroundColor: 'var(--purple-3)',
        borderRadius: '8px',
        minWidth: '150px',
        flex: '1'
      }}>
          <Text size="2" weight="medium">Desktop: Flex item</Text>
          <Text size="1">Flexible layout on large screens</Text>
        </Box>
      </div>
    </div>
}`,...p.parameters?.docs?.source}}};x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  }}>
      <Text size="4" weight="bold">AsChild Usage</Text>
      
      <div>
        <Text size="2" weight="medium" color="gray">Normal Box:</Text>
        <Box style={{
        padding: '12px',
        backgroundColor: 'var(--blue-3)',
        borderRadius: '8px'
      }}>
          <button>I'm inside a Box</button>
        </Box>
      </div>

      <div>
        <Text size="2" weight="medium" color="gray">AsChild Box (merges with button):</Text>
        <Box asChild style={{
        padding: '12px',
        backgroundColor: 'var(--green-3)',
        borderRadius: '8px',
        border: 'none',
        cursor: 'pointer'
      }}>
          <button>I am the Box (merged props)</button>
        </Box>
      </div>
    </div>
}`,...x.parameters?.docs?.source}}};const C=["Default","AsDiv","AsSpan","DisplayBlock","DisplayInline","DisplayInlineBlock","DisplayNone","LayoutExamples","SemanticUsage","ResponsiveBoxes","AsChildExample"];export{x as AsChildExample,o as AsDiv,t as AsSpan,a as Default,i as DisplayBlock,l as DisplayInline,n as DisplayInlineBlock,s as DisplayNone,d as LayoutExamples,p as ResponsiveBoxes,c as SemanticUsage,C as __namedExportsOrder,T as default};
