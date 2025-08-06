import{H as e}from"./heading-DVULZe-B.js";import{T as G}from"./theme-D6H7S_T9.js";import"./iframe-BXP7S-hP.js";import"./preload-helper-D9Z9MdNV.js";import"./weight.prop-Rt1sSGdE.js";import"./jsx-runtime-CQTdPr-F.js";import"./index-5QXC4EVg.js";const _={title:"Components/Heading",component:e,parameters:{layout:"centered"},decorators:[r=>React.createElement(G,null,React.createElement(r,null))],argTypes:{as:{control:"select",options:["h1","h2","h3","h4","h5","h6"],description:"HTML heading element to render"},size:{control:"select",options:["1","2","3","4","5","6","7","8","9"],description:"Heading size"},weight:{control:"select",options:["light","regular","medium","bold"],description:"Font weight"},align:{control:"select",options:["left","center","right"],description:"Text alignment"},color:{control:"select",options:["gray","gold","bronze","brown","yellow","amber","orange","tomato","red","ruby","crimson","pink","plum","purple","violet","iris","indigo","blue","cyan","teal","jade","green","grass","lime","mint","sky"],description:"Heading color"},highContrast:{control:"boolean",description:"High contrast mode"},truncate:{control:"boolean",description:"Truncate text with ellipsis"},wrap:{control:"select",options:["wrap","nowrap","pretty","balance"],description:"Text wrapping behavior"},trim:{control:"select",options:["normal","start","end","both"],description:"Leading trim for better text alignment"},children:{control:"text",description:"Heading content"}},args:{children:"The quick brown fox jumps over the lazy dog",as:"h1",size:"6"}},a={args:{children:"This is a default heading"}},i={args:{as:"h1",children:"This is an H1 heading"}},n={args:{as:"h2",children:"This is an H2 heading"}},s={args:{as:"h3",children:"This is an H3 heading"}},t={args:{as:"h4",children:"This is an H4 heading"}},o={args:{as:"h5",children:"This is an H5 heading"}},c={args:{as:"h6",children:"This is an H6 heading"}},l={args:{size:"1",children:"Size 1 heading"}},d={args:{size:"2",children:"Size 2 heading"}},g={args:{size:"3",children:"Size 3 heading"}},h={args:{size:"4",children:"Size 4 heading"}},m={args:{size:"5",children:"Size 5 heading"}},p={args:{size:"6",children:"Size 6 heading"}},u={args:{size:"7",children:"Size 7 heading"}},z={args:{size:"8",children:"Size 8 heading"}},w={args:{size:"9",children:"Size 9 heading"}},H={args:{weight:"light",children:"Light weight heading"}},S={args:{weight:"regular",children:"Regular weight heading"}},y={args:{weight:"medium",children:"Medium weight heading"}},x={args:{weight:"bold",children:"Bold weight heading"}},b={args:{align:"left",children:"Left aligned heading"}},f={args:{align:"center",children:"Center aligned heading"}},R={args:{align:"right",children:"Right aligned heading"}},T={args:{color:"blue",children:"Blue heading"}},v={args:{color:"red",children:"Red heading"}},E={args:{color:"green",children:"Green heading"}},C={args:{color:"purple",children:"Purple heading"}},W={args:{highContrast:!0,children:"High contrast heading",color:"blue"}},A={args:{truncate:!0,children:"This is a very long heading that should be truncated with an ellipsis when it exceeds the container width",style:{width:"300px"}}},k={render:()=>React.createElement("div",{style:{display:"flex",flexDirection:"column",gap:"16px"}},["1","2","3","4","5","6","7","8","9"].map(r=>React.createElement(e,{key:r,size:r},"Size ",r," - The quick brown fox")))},D={render:()=>React.createElement("div",{style:{display:"flex",flexDirection:"column",gap:"16px"}},["light","regular","medium","bold"].map(r=>React.createElement(e,{key:r,weight:r,size:"6"},r.charAt(0).toUpperCase()+r.slice(1)," weight heading")))},P={render:()=>React.createElement("div",{style:{display:"flex",flexDirection:"column",gap:"12px"}},React.createElement(e,{as:"h1",size:"8"},"Main Page Title (H1)"),React.createElement(e,{as:"h2",size:"7"},"Section Title (H2)"),React.createElement(e,{as:"h3",size:"6"},"Subsection Title (H3)"),React.createElement(e,{as:"h4",size:"5"},"Sub-subsection Title (H4)"),React.createElement(e,{as:"h5",size:"4"},"Minor Heading (H5)"),React.createElement(e,{as:"h6",size:"3"},"Smallest Heading (H6)"))},B={render:()=>React.createElement("div",{style:{display:"grid",gridTemplateColumns:"repeat(2, 1fr)",gap:"12px"}},["gray","gold","bronze","brown","yellow","amber","orange","tomato","red","ruby","crimson","pink","plum","purple","violet","iris","indigo","blue","cyan","teal","jade","green","grass","lime","mint","sky"].map(r=>React.createElement(e,{key:r,color:r,size:"4"},r," heading")))},L={render:()=>React.createElement("div",{style:{width:"300px",display:"flex",flexDirection:"column",gap:"16px"}},React.createElement("div",null,React.createElement(e,{size:"3",weight:"medium",color:"gray"},"Normal wrap:"),React.createElement(e,{wrap:"wrap",size:"5"},"This is a long heading that will wrap normally when it reaches the end")),React.createElement("div",null,React.createElement(e,{size:"3",weight:"medium",color:"gray"},"No wrap:"),React.createElement(e,{wrap:"nowrap",size:"5"},"This is a long heading that will not wrap and may overflow")),React.createElement("div",null,React.createElement(e,{size:"3",weight:"medium",color:"gray"},"Balance wrap:"),React.createElement(e,{wrap:"balance",size:"5"},"This is a long heading that will wrap with balanced line lengths")))},M={render:()=>React.createElement("div",{style:{maxWidth:"600px",display:"flex",flexDirection:"column",gap:"16px"}},React.createElement(e,{as:"h1",size:"8",weight:"bold",color:"blue"},"Welcome to Our Platform"),React.createElement(e,{as:"h2",size:"6",weight:"medium",color:"gray"},"Getting Started Guide"),React.createElement(e,{as:"h3",size:"5",weight:"medium"},"Step 1: Create Your Account"),React.createElement(e,{as:"h4",size:"4",weight:"regular"},"Fill in your personal information"),React.createElement(e,{as:"h3",size:"5",weight:"medium"},"Step 2: Set Up Your Profile"),React.createElement(e,{as:"h4",size:"4",weight:"regular"},"Add a profile picture and bio"),React.createElement(e,{as:"h2",size:"6",weight:"medium",color:"green",align:"center"},"You're all set! 🎉"))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    children: 'This is a default heading'
  }
}`,...a.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    as: 'h1',
    children: 'This is an H1 heading'
  }
}`,...i.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    as: 'h2',
    children: 'This is an H2 heading'
  }
}`,...n.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    as: 'h3',
    children: 'This is an H3 heading'
  }
}`,...s.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    as: 'h4',
    children: 'This is an H4 heading'
  }
}`,...t.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    as: 'h5',
    children: 'This is an H5 heading'
  }
}`,...o.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    as: 'h6',
    children: 'This is an H6 heading'
  }
}`,...c.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    size: '1',
    children: 'Size 1 heading'
  }
}`,...l.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    size: '2',
    children: 'Size 2 heading'
  }
}`,...d.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: {
    size: '3',
    children: 'Size 3 heading'
  }
}`,...g.parameters?.docs?.source}}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  args: {
    size: '4',
    children: 'Size 4 heading'
  }
}`,...h.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    size: '5',
    children: 'Size 5 heading'
  }
}`,...m.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    size: '6',
    children: 'Size 6 heading'
  }
}`,...p.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    size: '7',
    children: 'Size 7 heading'
  }
}`,...u.parameters?.docs?.source}}};z.parameters={...z.parameters,docs:{...z.parameters?.docs,source:{originalSource:`{
  args: {
    size: '8',
    children: 'Size 8 heading'
  }
}`,...z.parameters?.docs?.source}}};w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  args: {
    size: '9',
    children: 'Size 9 heading'
  }
}`,...w.parameters?.docs?.source}}};H.parameters={...H.parameters,docs:{...H.parameters?.docs,source:{originalSource:`{
  args: {
    weight: 'light',
    children: 'Light weight heading'
  }
}`,...H.parameters?.docs?.source}}};S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  args: {
    weight: 'regular',
    children: 'Regular weight heading'
  }
}`,...S.parameters?.docs?.source}}};y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  args: {
    weight: 'medium',
    children: 'Medium weight heading'
  }
}`,...y.parameters?.docs?.source}}};x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  args: {
    weight: 'bold',
    children: 'Bold weight heading'
  }
}`,...x.parameters?.docs?.source}}};b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  args: {
    align: 'left',
    children: 'Left aligned heading'
  }
}`,...b.parameters?.docs?.source}}};f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  args: {
    align: 'center',
    children: 'Center aligned heading'
  }
}`,...f.parameters?.docs?.source}}};R.parameters={...R.parameters,docs:{...R.parameters?.docs,source:{originalSource:`{
  args: {
    align: 'right',
    children: 'Right aligned heading'
  }
}`,...R.parameters?.docs?.source}}};T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  args: {
    color: 'blue',
    children: 'Blue heading'
  }
}`,...T.parameters?.docs?.source}}};v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  args: {
    color: 'red',
    children: 'Red heading'
  }
}`,...v.parameters?.docs?.source}}};E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  args: {
    color: 'green',
    children: 'Green heading'
  }
}`,...E.parameters?.docs?.source}}};C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  args: {
    color: 'purple',
    children: 'Purple heading'
  }
}`,...C.parameters?.docs?.source}}};W.parameters={...W.parameters,docs:{...W.parameters?.docs,source:{originalSource:`{
  args: {
    highContrast: true,
    children: 'High contrast heading',
    color: 'blue'
  }
}`,...W.parameters?.docs?.source}}};A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
  args: {
    truncate: true,
    children: 'This is a very long heading that should be truncated with an ellipsis when it exceeds the container width',
    style: {
      width: '300px'
    }
  }
}`,...A.parameters?.docs?.source}}};k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  }}>
      {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map(size => <Heading key={size} size={size as any}>
          Size {size} - The quick brown fox
        </Heading>)}
    </div>
}`,...k.parameters?.docs?.source}}};D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  }}>
      {['light', 'regular', 'medium', 'bold'].map(weight => <Heading key={weight} weight={weight as any} size="6">
          {weight.charAt(0).toUpperCase() + weight.slice(1)} weight heading
        </Heading>)}
    </div>
}`,...D.parameters?.docs?.source}}};P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  }}>
      <Heading as="h1" size="8">Main Page Title (H1)</Heading>
      <Heading as="h2" size="7">Section Title (H2)</Heading>
      <Heading as="h3" size="6">Subsection Title (H3)</Heading>
      <Heading as="h4" size="5">Sub-subsection Title (H4)</Heading>
      <Heading as="h5" size="4">Minor Heading (H5)</Heading>
      <Heading as="h6" size="3">Smallest Heading (H6)</Heading>
    </div>
}`,...P.parameters?.docs?.source}}};B.parameters={...B.parameters,docs:{...B.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '12px'
  }}>
      {['gray', 'gold', 'bronze', 'brown', 'yellow', 'amber', 'orange', 'tomato', 'red', 'ruby', 'crimson', 'pink', 'plum', 'purple', 'violet', 'iris', 'indigo', 'blue', 'cyan', 'teal', 'jade', 'green', 'grass', 'lime', 'mint', 'sky'].map(color => <Heading key={color} color={color as any} size="4">
          {color} heading
        </Heading>)}
    </div>
}`,...B.parameters?.docs?.source}}};L.parameters={...L.parameters,docs:{...L.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    width: '300px',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  }}>
      <div>
        <Heading size="3" weight="medium" color="gray">Normal wrap:</Heading>
        <Heading wrap="wrap" size="5">
          This is a long heading that will wrap normally when it reaches the end
        </Heading>
      </div>
      <div>
        <Heading size="3" weight="medium" color="gray">No wrap:</Heading>
        <Heading wrap="nowrap" size="5">
          This is a long heading that will not wrap and may overflow
        </Heading>
      </div>
      <div>
        <Heading size="3" weight="medium" color="gray">Balance wrap:</Heading>
        <Heading wrap="balance" size="5">
          This is a long heading that will wrap with balanced line lengths
        </Heading>
      </div>
    </div>
}`,...L.parameters?.docs?.source}}};M.parameters={...M.parameters,docs:{...M.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    maxWidth: '600px',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
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
}`,...M.parameters?.docs?.source}}};const I=["Default","H1","H2","H3","H4","H5","H6","Size1","Size2","Size3","Size4","Size5","Size6","Size7","Size8","Size9","WeightLight","WeightRegular","WeightMedium","WeightBold","AlignLeft","AlignCenter","AlignRight","ColorBlue","ColorRed","ColorGreen","ColorPurple","HighContrast","Truncated","AllSizes","AllWeights","SemanticHierarchy","ColorPalette","TextWrapping","RealWorldExample"];export{f as AlignCenter,b as AlignLeft,R as AlignRight,k as AllSizes,D as AllWeights,T as ColorBlue,E as ColorGreen,B as ColorPalette,C as ColorPurple,v as ColorRed,a as Default,i as H1,n as H2,s as H3,t as H4,o as H5,c as H6,W as HighContrast,M as RealWorldExample,P as SemanticHierarchy,l as Size1,d as Size2,g as Size3,h as Size4,m as Size5,p as Size6,u as Size7,z as Size8,w as Size9,L as TextWrapping,A as Truncated,x as WeightBold,H as WeightLight,y as WeightMedium,S as WeightRegular,I as __namedExportsOrder,_ as default};
