import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{H as r}from"./heading-CCvWipbk.js";import{T as Y}from"./theme-BFbej9HP.js";import"./high-contrast.prop-DN4VqJ5o.js";import"./iframe-DsuaOdjx.js";import"./preload-helper-D9Z9MdNV.js";import"./index-CVlKO6je.js";import"./index-BW54sZL3.js";import"./weight.prop-Rt1sSGdE.js";const K={title:"Base/Heading",component:r,parameters:{layout:"centered"},decorators:[a=>e.jsx(Y,{children:e.jsx(a,{})})],argTypes:{as:{control:"select",options:["h1","h2","h3","h4","h5","h6"],description:"HTML heading element to render"},size:{control:"select",options:["1","2","3","4","5","6","7","8","9"],description:"Heading size"},weight:{control:"select",options:["light","regular","medium","bold"],description:"Font weight"},align:{control:"select",options:["left","center","right"],description:"Text alignment"},color:{control:"select",options:["gray","gold","bronze","brown","yellow","amber","orange","tomato","red","ruby","crimson","pink","plum","purple","violet","iris","indigo","blue","cyan","teal","jade","green","grass","lime","mint","sky"],description:"Heading color"},highContrast:{control:"boolean",description:"High contrast mode"},truncate:{control:"boolean",description:"Truncate text with ellipsis"},wrap:{control:"select",options:["wrap","nowrap","pretty","balance"],description:"Text wrapping behavior"},trim:{control:"select",options:["normal","start","end","both"],description:"Leading trim for better text alignment"},children:{control:"text",description:"Heading content"}},args:{children:"The quick brown fox jumps over the lazy dog",as:"h1",size:"6"}},i={args:{children:"This is a default heading"}},n={args:{as:"h1",children:"This is an H1 heading"}},s={args:{as:"h2",children:"This is an H2 heading"}},o={args:{as:"h3",children:"This is an H3 heading"}},t={args:{as:"h4",children:"This is an H4 heading"}},d={args:{as:"h5",children:"This is an H5 heading"}},c={args:{as:"h6",children:"This is an H6 heading"}},l={args:{size:"1",children:"Size 1 heading"}},g={args:{size:"2",children:"Size 2 heading"}},h={args:{size:"3",children:"Size 3 heading"}},p={args:{size:"4",children:"Size 4 heading"}},m={args:{size:"5",children:"Size 5 heading"}},u={args:{size:"6",children:"Size 6 heading"}},z={args:{size:"7",children:"Size 7 heading"}},w={args:{size:"8",children:"Size 8 heading"}},H={args:{size:"9",children:"Size 9 heading"}},S={args:{weight:"light",children:"Light weight heading"}},x={args:{weight:"regular",children:"Regular weight heading"}},y={args:{weight:"medium",children:"Medium weight heading"}},b={args:{weight:"bold",children:"Bold weight heading"}},f={args:{align:"left",children:"Left aligned heading"}},T={args:{align:"center",children:"Center aligned heading"}},j={args:{align:"right",children:"Right aligned heading"}},v={args:{color:"blue",children:"Blue heading"}},C={args:{color:"red",children:"Red heading"}},W={args:{color:"green",children:"Green heading"}},A={args:{color:"purple",children:"Purple heading"}},R={args:{highContrast:!0,children:"High contrast heading",color:"blue"}},k={args:{truncate:!0,children:"This is a very long heading that should be truncated with an ellipsis when it exceeds the container width",style:{width:"300px"}}},D={render:()=>e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:"16px"},children:["1","2","3","4","5","6","7","8","9"].map(a=>e.jsxs(r,{size:a,children:["Size ",a," - The quick brown fox"]},a))})},P={render:()=>e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:"16px"},children:["light","regular","medium","bold"].map(a=>e.jsxs(r,{weight:a,size:"6",children:[a.charAt(0).toUpperCase()+a.slice(1)," weight heading"]},a))})},B={render:()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"12px"},children:[e.jsx(r,{as:"h1",size:"8",children:"Main Page Title (H1)"}),e.jsx(r,{as:"h2",size:"7",children:"Section Title (H2)"}),e.jsx(r,{as:"h3",size:"6",children:"Subsection Title (H3)"}),e.jsx(r,{as:"h4",size:"5",children:"Sub-subsection Title (H4)"}),e.jsx(r,{as:"h5",size:"4",children:"Minor Heading (H5)"}),e.jsx(r,{as:"h6",size:"3",children:"Smallest Heading (H6)"})]})},L={render:()=>e.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(2, 1fr)",gap:"12px"},children:["gray","gold","bronze","brown","yellow","amber","orange","tomato","red","ruby","crimson","pink","plum","purple","violet","iris","indigo","blue","cyan","teal","jade","green","grass","lime","mint","sky"].map(a=>e.jsxs(r,{color:a,size:"4",children:[a," heading"]},a))})},M={render:()=>e.jsxs("div",{style:{width:"300px",display:"flex",flexDirection:"column",gap:"16px"},children:[e.jsxs("div",{children:[e.jsx(r,{size:"3",weight:"medium",color:"gray",children:"Normal wrap:"}),e.jsx(r,{wrap:"wrap",size:"5",children:"This is a long heading that will wrap normally when it reaches the end"})]}),e.jsxs("div",{children:[e.jsx(r,{size:"3",weight:"medium",color:"gray",children:"No wrap:"}),e.jsx(r,{wrap:"nowrap",size:"5",children:"This is a long heading that will not wrap and may overflow"})]}),e.jsxs("div",{children:[e.jsx(r,{size:"3",weight:"medium",color:"gray",children:"Balance wrap:"}),e.jsx(r,{wrap:"balance",size:"5",children:"This is a long heading that will wrap with balanced line lengths"})]})]})},G={render:()=>e.jsxs("div",{style:{maxWidth:"600px",display:"flex",flexDirection:"column",gap:"16px"},children:[e.jsx(r,{as:"h1",size:"8",weight:"bold",color:"blue",children:"Welcome to Our Platform"}),e.jsx(r,{as:"h2",size:"6",weight:"medium",color:"gray",children:"Getting Started Guide"}),e.jsx(r,{as:"h3",size:"5",weight:"medium",children:"Step 1: Create Your Account"}),e.jsx(r,{as:"h4",size:"4",weight:"regular",children:"Fill in your personal information"}),e.jsx(r,{as:"h3",size:"5",weight:"medium",children:"Step 2: Set Up Your Profile"}),e.jsx(r,{as:"h4",size:"4",weight:"regular",children:"Add a profile picture and bio"}),e.jsx(r,{as:"h2",size:"6",weight:"medium",color:"green",align:"center",children:"You're all set! 🎉"})]})};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    children: "This is a default heading"
  }
}`,...i.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    as: "h1",
    children: "This is an H1 heading"
  }
}`,...n.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    as: "h2",
    children: "This is an H2 heading"
  }
}`,...s.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    as: "h3",
    children: "This is an H3 heading"
  }
}`,...o.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    as: "h4",
    children: "This is an H4 heading"
  }
}`,...t.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    as: "h5",
    children: "This is an H5 heading"
  }
}`,...d.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    as: "h6",
    children: "This is an H6 heading"
  }
}`,...c.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    size: "1",
    children: "Size 1 heading"
  }
}`,...l.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: {
    size: "2",
    children: "Size 2 heading"
  }
}`,...g.parameters?.docs?.source}}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  args: {
    size: "3",
    children: "Size 3 heading"
  }
}`,...h.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    size: "4",
    children: "Size 4 heading"
  }
}`,...p.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    size: "5",
    children: "Size 5 heading"
  }
}`,...m.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    size: "6",
    children: "Size 6 heading"
  }
}`,...u.parameters?.docs?.source}}};z.parameters={...z.parameters,docs:{...z.parameters?.docs,source:{originalSource:`{
  args: {
    size: "7",
    children: "Size 7 heading"
  }
}`,...z.parameters?.docs?.source}}};w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  args: {
    size: "8",
    children: "Size 8 heading"
  }
}`,...w.parameters?.docs?.source}}};H.parameters={...H.parameters,docs:{...H.parameters?.docs,source:{originalSource:`{
  args: {
    size: "9",
    children: "Size 9 heading"
  }
}`,...H.parameters?.docs?.source}}};S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  args: {
    weight: "light",
    children: "Light weight heading"
  }
}`,...S.parameters?.docs?.source}}};x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  args: {
    weight: "regular",
    children: "Regular weight heading"
  }
}`,...x.parameters?.docs?.source}}};y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  args: {
    weight: "medium",
    children: "Medium weight heading"
  }
}`,...y.parameters?.docs?.source}}};b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  args: {
    weight: "bold",
    children: "Bold weight heading"
  }
}`,...b.parameters?.docs?.source}}};f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  args: {
    align: "left",
    children: "Left aligned heading"
  }
}`,...f.parameters?.docs?.source}}};T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  args: {
    align: "center",
    children: "Center aligned heading"
  }
}`,...T.parameters?.docs?.source}}};j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  args: {
    align: "right",
    children: "Right aligned heading"
  }
}`,...j.parameters?.docs?.source}}};v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  args: {
    color: "blue",
    children: "Blue heading"
  }
}`,...v.parameters?.docs?.source}}};C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  args: {
    color: "red",
    children: "Red heading"
  }
}`,...C.parameters?.docs?.source}}};W.parameters={...W.parameters,docs:{...W.parameters?.docs,source:{originalSource:`{
  args: {
    color: "green",
    children: "Green heading"
  }
}`,...W.parameters?.docs?.source}}};A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
  args: {
    color: "purple",
    children: "Purple heading"
  }
}`,...A.parameters?.docs?.source}}};R.parameters={...R.parameters,docs:{...R.parameters?.docs,source:{originalSource:`{
  args: {
    highContrast: true,
    children: "High contrast heading",
    color: "blue"
  }
}`,...R.parameters?.docs?.source}}};k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  args: {
    truncate: true,
    children: "This is a very long heading that should be truncated with an ellipsis when it exceeds the container width",
    style: {
      width: "300px"
    }
  }
}`,...k.parameters?.docs?.source}}};D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: "flex",
    flexDirection: "column",
    gap: "16px"
  }}>
      {["1", "2", "3", "4", "5", "6", "7", "8", "9"].map(size => <Heading key={size} size={size as any}>
          Size {size} - The quick brown fox
        </Heading>)}
    </div>
}`,...D.parameters?.docs?.source}}};P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: "flex",
    flexDirection: "column",
    gap: "16px"
  }}>
      {["light", "regular", "medium", "bold"].map(weight => <Heading key={weight} weight={weight as any} size="6">
          {weight.charAt(0).toUpperCase() + weight.slice(1)} weight heading
        </Heading>)}
    </div>
}`,...P.parameters?.docs?.source}}};B.parameters={...B.parameters,docs:{...B.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: "flex",
    flexDirection: "column",
    gap: "12px"
  }}>
      <Heading as="h1" size="8">
        Main Page Title (H1)
      </Heading>
      <Heading as="h2" size="7">
        Section Title (H2)
      </Heading>
      <Heading as="h3" size="6">
        Subsection Title (H3)
      </Heading>
      <Heading as="h4" size="5">
        Sub-subsection Title (H4)
      </Heading>
      <Heading as="h5" size="4">
        Minor Heading (H5)
      </Heading>
      <Heading as="h6" size="3">
        Smallest Heading (H6)
      </Heading>
    </div>
}`,...B.parameters?.docs?.source}}};L.parameters={...L.parameters,docs:{...L.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "12px"
  }}>
      {["gray", "gold", "bronze", "brown", "yellow", "amber", "orange", "tomato", "red", "ruby", "crimson", "pink", "plum", "purple", "violet", "iris", "indigo", "blue", "cyan", "teal", "jade", "green", "grass", "lime", "mint", "sky"].map(color => <Heading key={color} color={color as any} size="4">
          {color} heading
        </Heading>)}
    </div>
}`,...L.parameters?.docs?.source}}};M.parameters={...M.parameters,docs:{...M.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    width: "300px",
    display: "flex",
    flexDirection: "column",
    gap: "16px"
  }}>
      <div>
        <Heading size="3" weight="medium" color="gray">
          Normal wrap:
        </Heading>
        <Heading wrap="wrap" size="5">
          This is a long heading that will wrap normally when it reaches the end
        </Heading>
      </div>
      <div>
        <Heading size="3" weight="medium" color="gray">
          No wrap:
        </Heading>
        <Heading wrap="nowrap" size="5">
          This is a long heading that will not wrap and may overflow
        </Heading>
      </div>
      <div>
        <Heading size="3" weight="medium" color="gray">
          Balance wrap:
        </Heading>
        <Heading wrap="balance" size="5">
          This is a long heading that will wrap with balanced line lengths
        </Heading>
      </div>
    </div>
}`,...M.parameters?.docs?.source}}};G.parameters={...G.parameters,docs:{...G.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    maxWidth: "600px",
    display: "flex",
    flexDirection: "column",
    gap: "16px"
  }}>
      <Heading as="h1" size="8" weight="bold" color="blue">
        Welcome to Our Platform
      </Heading>
      <Heading as="h2" size="6" weight="medium" color="gray">
        Getting Started Guide
      </Heading>
      <Heading as="h3" size="5" weight="medium">
        Step 1: Create Your Account
      </Heading>
      <Heading as="h4" size="4" weight="regular">
        Fill in your personal information
      </Heading>
      <Heading as="h3" size="5" weight="medium">
        Step 2: Set Up Your Profile
      </Heading>
      <Heading as="h4" size="4" weight="regular">
        Add a profile picture and bio
      </Heading>
      <Heading as="h2" size="6" weight="medium" color="green" align="center">
        You're all set! 🎉
      </Heading>
    </div>
}`,...G.parameters?.docs?.source}}};const Q=["Default","H1","H2","H3","H4","H5","H6","Size1","Size2","Size3","Size4","Size5","Size6","Size7","Size8","Size9","WeightLight","WeightRegular","WeightMedium","WeightBold","AlignLeft","AlignCenter","AlignRight","ColorBlue","ColorRed","ColorGreen","ColorPurple","HighContrast","Truncated","AllSizes","AllWeights","SemanticHierarchy","ColorPalette","TextWrapping","RealWorldExample"];export{T as AlignCenter,f as AlignLeft,j as AlignRight,D as AllSizes,P as AllWeights,v as ColorBlue,W as ColorGreen,L as ColorPalette,A as ColorPurple,C as ColorRed,i as Default,n as H1,s as H2,o as H3,t as H4,d as H5,c as H6,R as HighContrast,G as RealWorldExample,B as SemanticHierarchy,l as Size1,g as Size2,h as Size3,p as Size4,m as Size5,u as Size6,z as Size7,w as Size8,H as Size9,M as TextWrapping,k as Truncated,b as WeightBold,S as WeightLight,y as WeightMedium,x as WeightRegular,Q as __namedExportsOrder,K as default};
