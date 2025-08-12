import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{B as r}from"./box-CeCqNv3u.js";import"./avatar-RXesCRZq.js";import"./button-ClCv9eVs.js";import"./card-DfIScEG2.js";import"./icon-button-QpiRLWqf.js";import"./base-button-Dyf4vkZD.js";import{T as n}from"./text-Bwa-Y73d.js";import{T as b}from"./theme-BFbej9HP.js";import"./high-contrast.prop-DN4VqJ5o.js";import"./iframe-DsuaOdjx.js";import"./preload-helper-D9Z9MdNV.js";import"./index-CVlKO6je.js";import"./index-BW54sZL3.js";import"./flex-bym-5aeO.js";import"./get-subtree-COcTOnEl.js";import"./radius.prop-BFb5uVoY.js";import"./weight.prop-Rt1sSGdE.js";const E={title:"Base/Box",component:r,parameters:{layout:"centered"},decorators:[u=>e.jsx(b,{children:e.jsx(u,{})})],argTypes:{as:{control:"select",options:["div","span"],description:"HTML element to render"},display:{control:"select",options:["none","inline","inline-block","block","contents"],description:"CSS display property"},asChild:{control:"boolean",description:"Merge props with the child element"},style:{control:"object",description:"Custom styles"},children:{control:"text",description:"Box content"}},args:{as:"div",children:"Box content"}},i={args:{children:"This is a default box",style:{padding:"16px",backgroundColor:"var(--gray-3)",borderRadius:"8px"}}},o={args:{as:"div",children:"This is a div box",style:{padding:"16px",backgroundColor:"var(--blue-3)",borderRadius:"8px"}}},s={args:{as:"span",children:"This is a span box",style:{padding:"8px",backgroundColor:"var(--green-3)",borderRadius:"4px"}}},d={args:{display:"block",children:"Block display box",style:{padding:"16px",backgroundColor:"var(--red-3)",borderRadius:"8px",width:"200px"}}},a={args:{display:"inline",children:"Inline display box",style:{padding:"8px",backgroundColor:"var(--purple-3)",borderRadius:"4px"}}},l={args:{display:"inline-block",children:"Inline-block display box",style:{padding:"12px",backgroundColor:"var(--orange-3)",borderRadius:"6px"}}},t={render:()=>e.jsxs("div",{children:[e.jsx(n,{children:"You should not see a box below this text:"}),e.jsx(r,{display:"none",style:{padding:"16px",backgroundColor:"var(--red-9)"},children:"This box is hidden"}),e.jsx(n,{children:"The box above is hidden with display: none"})]})},p={render:()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"16px",width:"400px"},children:[e.jsx(n,{size:"4",weight:"bold",children:"Box Layout Examples"}),e.jsxs("div",{children:[e.jsx(n,{size:"2",weight:"medium",color:"gray",children:"Block boxes (stack vertically):"}),e.jsx(r,{display:"block",style:{padding:"8px",backgroundColor:"var(--blue-3)",marginBottom:"4px"},children:"Block Box 1"}),e.jsx(r,{display:"block",style:{padding:"8px",backgroundColor:"var(--blue-4)"},children:"Block Box 2"})]}),e.jsxs("div",{children:[e.jsx(n,{size:"2",weight:"medium",color:"gray",children:"Inline boxes (flow with text):"}),e.jsxs("div",{children:["Here is some text with"," ",e.jsx(r,{display:"inline",style:{padding:"4px",backgroundColor:"var(--green-3)"},children:"inline box 1"})," ","and"," ",e.jsx(r,{display:"inline",style:{padding:"4px",backgroundColor:"var(--green-4)"},children:"inline box 2"})," ","in the middle."]})]}),e.jsxs("div",{children:[e.jsx(n,{size:"2",weight:"medium",color:"gray",children:"Inline-block boxes (inline but with block properties):"}),e.jsxs("div",{children:[e.jsx(r,{display:"inline-block",style:{padding:"12px",backgroundColor:"var(--purple-3)",marginRight:"8px",width:"80px",textAlign:"center"},children:"Box 1"}),e.jsx(r,{display:"inline-block",style:{padding:"12px",backgroundColor:"var(--purple-4)",width:"80px",textAlign:"center"},children:"Box 2"})]})]})]})},x={render:()=>e.jsxs("div",{style:{maxWidth:"400px",display:"flex",flexDirection:"column",gap:"16px"},children:[e.jsx(n,{size:"4",weight:"bold",children:"Semantic Box Usage"}),e.jsxs(r,{as:"div",style:{padding:"16px",backgroundColor:"var(--blue-2)",borderRadius:"8px",border:"1px solid var(--blue-6)"},children:[e.jsx(n,{size:"3",weight:"medium",color:"blue",children:"Card Container"}),e.jsx(n,{size:"2",style:{marginTop:"8px"},children:"This box acts as a card container with padding and background styling."})]}),e.jsxs(r,{as:"div",style:{padding:"12px",backgroundColor:"var(--yellow-2)",borderRadius:"4px",borderLeft:"4px solid var(--yellow-9)"},children:[e.jsx(n,{size:"2",weight:"medium",color:"yellow",children:"Warning Notice"}),e.jsx(n,{size:"2",style:{marginTop:"4px"},children:"This box is styled as a warning message with a left border accent."})]}),e.jsx(r,{as:"div",style:{display:"flex",padding:"8px",backgroundColor:"var(--gray-2)",borderRadius:"20px"},children:e.jsx(r,{as:"span",style:{padding:"4px 12px",backgroundColor:"var(--green-9)",color:"white",borderRadius:"16px",fontSize:"12px"},children:"Status: Active"})})]})},c={render:()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"16px"},children:[e.jsx(n,{size:"4",weight:"bold",children:"Responsive Box Concepts"}),e.jsx(n,{size:"2",color:"gray",children:"These boxes demonstrate different responsive behaviors. In a real responsive setup, the display properties would change based on viewport size."}),e.jsxs("div",{style:{display:"flex",gap:"8px",flexWrap:"wrap"},children:[e.jsxs(r,{display:"block",style:{padding:"16px",backgroundColor:"var(--blue-3)",borderRadius:"8px",minWidth:"150px",flex:"1"},children:[e.jsx(n,{size:"2",weight:"medium",children:"Mobile: Block"}),e.jsx(n,{size:"1",children:"Full width on small screens"})]}),e.jsxs(r,{display:"inline-block",style:{padding:"16px",backgroundColor:"var(--green-3)",borderRadius:"8px",minWidth:"150px",flex:"1"},children:[e.jsx(n,{size:"2",weight:"medium",children:"Tablet: Inline-block"}),e.jsx(n,{size:"1",children:"Side by side on medium screens"})]}),e.jsxs(r,{display:"block",style:{padding:"16px",backgroundColor:"var(--purple-3)",borderRadius:"8px",minWidth:"150px",flex:"1"},children:[e.jsx(n,{size:"2",weight:"medium",children:"Desktop: Flex item"}),e.jsx(n,{size:"1",children:"Flexible layout on large screens"})]})]})]})},g={render:()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"16px"},children:[e.jsx(n,{size:"4",weight:"bold",children:"AsChild Usage"}),e.jsxs("div",{children:[e.jsx(n,{size:"2",weight:"medium",color:"gray",children:"Normal Box:"}),e.jsx(r,{style:{padding:"12px",backgroundColor:"var(--blue-3)",borderRadius:"8px"},children:e.jsx("button",{children:"I'm inside a Box"})})]}),e.jsxs("div",{children:[e.jsx(n,{size:"2",weight:"medium",color:"gray",children:"AsChild Box (merges with button):"}),e.jsx(r,{asChild:!0,style:{padding:"12px",backgroundColor:"var(--green-3)",borderRadius:"8px",border:"none",cursor:"pointer"},children:e.jsx("button",{children:"I am the Box (merged props)"})})]})]})};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    children: "This is a default box",
    style: {
      padding: "16px",
      backgroundColor: "var(--gray-3)",
      borderRadius: "8px"
    }
  }
}`,...i.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    as: "div",
    children: "This is a div box",
    style: {
      padding: "16px",
      backgroundColor: "var(--blue-3)",
      borderRadius: "8px"
    }
  }
}`,...o.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    as: "span",
    children: "This is a span box",
    style: {
      padding: "8px",
      backgroundColor: "var(--green-3)",
      borderRadius: "4px"
    }
  }
}`,...s.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    display: "block",
    children: "Block display box",
    style: {
      padding: "16px",
      backgroundColor: "var(--red-3)",
      borderRadius: "8px",
      width: "200px"
    }
  }
}`,...d.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    display: "inline",
    children: "Inline display box",
    style: {
      padding: "8px",
      backgroundColor: "var(--purple-3)",
      borderRadius: "4px"
    }
  }
}`,...a.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    display: "inline-block",
    children: "Inline-block display box",
    style: {
      padding: "12px",
      backgroundColor: "var(--orange-3)",
      borderRadius: "6px"
    }
  }
}`,...l.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  render: () => <div>
      <Text>You should not see a box below this text:</Text>
      <Box display="none" style={{
      padding: "16px",
      backgroundColor: "var(--red-9)"
    }}>
        This box is hidden
      </Box>
      <Text>The box above is hidden with display: none</Text>
    </div>
}`,...t.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    width: "400px"
  }}>
      <Text size="4" weight="bold">
        Box Layout Examples
      </Text>

      <div>
        <Text size="2" weight="medium" color="gray">
          Block boxes (stack vertically):
        </Text>
        <Box display="block" style={{
        padding: "8px",
        backgroundColor: "var(--blue-3)",
        marginBottom: "4px"
      }}>
          Block Box 1
        </Box>
        <Box display="block" style={{
        padding: "8px",
        backgroundColor: "var(--blue-4)"
      }}>
          Block Box 2
        </Box>
      </div>

      <div>
        <Text size="2" weight="medium" color="gray">
          Inline boxes (flow with text):
        </Text>
        <div>
          Here is some text with{" "}
          <Box display="inline" style={{
          padding: "4px",
          backgroundColor: "var(--green-3)"
        }}>
            inline box 1
          </Box>{" "}
          and{" "}
          <Box display="inline" style={{
          padding: "4px",
          backgroundColor: "var(--green-4)"
        }}>
            inline box 2
          </Box>{" "}
          in the middle.
        </div>
      </div>

      <div>
        <Text size="2" weight="medium" color="gray">
          Inline-block boxes (inline but with block properties):
        </Text>
        <div>
          <Box display="inline-block" style={{
          padding: "12px",
          backgroundColor: "var(--purple-3)",
          marginRight: "8px",
          width: "80px",
          textAlign: "center"
        }}>
            Box 1
          </Box>
          <Box display="inline-block" style={{
          padding: "12px",
          backgroundColor: "var(--purple-4)",
          width: "80px",
          textAlign: "center"
        }}>
            Box 2
          </Box>
        </div>
      </div>
    </div>
}`,...p.parameters?.docs?.source}}};x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    maxWidth: "400px",
    display: "flex",
    flexDirection: "column",
    gap: "16px"
  }}>
      <Text size="4" weight="bold">
        Semantic Box Usage
      </Text>

      <Box as="div" style={{
      padding: "16px",
      backgroundColor: "var(--blue-2)",
      borderRadius: "8px",
      border: "1px solid var(--blue-6)"
    }}>
        <Text size="3" weight="medium" color="blue">
          Card Container
        </Text>
        <Text size="2" style={{
        marginTop: "8px"
      }}>
          This box acts as a card container with padding and background styling.
        </Text>
      </Box>

      <Box as="div" style={{
      padding: "12px",
      backgroundColor: "var(--yellow-2)",
      borderRadius: "4px",
      borderLeft: "4px solid var(--yellow-9)"
    }}>
        <Text size="2" weight="medium" color="yellow">
          Warning Notice
        </Text>
        <Text size="2" style={{
        marginTop: "4px"
      }}>
          This box is styled as a warning message with a left border accent.
        </Text>
      </Box>

      <Box as="div" style={{
      display: "flex",
      padding: "8px",
      backgroundColor: "var(--gray-2)",
      borderRadius: "20px"
    }}>
        <Box as="span" style={{
        padding: "4px 12px",
        backgroundColor: "var(--green-9)",
        color: "white",
        borderRadius: "16px",
        fontSize: "12px"
      }}>
          Status: Active
        </Box>
      </Box>
    </div>
}`,...x.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: "flex",
    flexDirection: "column",
    gap: "16px"
  }}>
      <Text size="4" weight="bold">
        Responsive Box Concepts
      </Text>
      <Text size="2" color="gray">
        These boxes demonstrate different responsive behaviors. In a real
        responsive setup, the display properties would change based on viewport
        size.
      </Text>

      <div style={{
      display: "flex",
      gap: "8px",
      flexWrap: "wrap"
    }}>
        <Box display="block" style={{
        padding: "16px",
        backgroundColor: "var(--blue-3)",
        borderRadius: "8px",
        minWidth: "150px",
        flex: "1"
      }}>
          <Text size="2" weight="medium">
            Mobile: Block
          </Text>
          <Text size="1">Full width on small screens</Text>
        </Box>

        <Box display="inline-block" style={{
        padding: "16px",
        backgroundColor: "var(--green-3)",
        borderRadius: "8px",
        minWidth: "150px",
        flex: "1"
      }}>
          <Text size="2" weight="medium">
            Tablet: Inline-block
          </Text>
          <Text size="1">Side by side on medium screens</Text>
        </Box>

        <Box display="block" style={{
        padding: "16px",
        backgroundColor: "var(--purple-3)",
        borderRadius: "8px",
        minWidth: "150px",
        flex: "1"
      }}>
          <Text size="2" weight="medium">
            Desktop: Flex item
          </Text>
          <Text size="1">Flexible layout on large screens</Text>
        </Box>
      </div>
    </div>
}`,...c.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: "flex",
    flexDirection: "column",
    gap: "16px"
  }}>
      <Text size="4" weight="bold">
        AsChild Usage
      </Text>

      <div>
        <Text size="2" weight="medium" color="gray">
          Normal Box:
        </Text>
        <Box style={{
        padding: "12px",
        backgroundColor: "var(--blue-3)",
        borderRadius: "8px"
      }}>
          <button>I'm inside a Box</button>
        </Box>
      </div>

      <div>
        <Text size="2" weight="medium" color="gray">
          AsChild Box (merges with button):
        </Text>
        <Box asChild style={{
        padding: "12px",
        backgroundColor: "var(--green-3)",
        borderRadius: "8px",
        border: "none",
        cursor: "pointer"
      }}>
          <button>I am the Box (merged props)</button>
        </Box>
      </div>
    </div>
}`,...g.parameters?.docs?.source}}};const L=["Default","AsDiv","AsSpan","DisplayBlock","DisplayInline","DisplayInlineBlock","DisplayNone","LayoutExamples","SemanticUsage","ResponsiveBoxes","AsChildExample"];export{g as AsChildExample,o as AsDiv,s as AsSpan,i as Default,d as DisplayBlock,a as DisplayInline,l as DisplayInlineBlock,t as DisplayNone,p as LayoutExamples,c as ResponsiveBoxes,x as SemanticUsage,L as __namedExportsOrder,E as default};
