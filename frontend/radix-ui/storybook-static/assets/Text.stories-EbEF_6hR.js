import{T as e}from"./text-CQaCKnMS.js";import{T as B}from"./theme-D6H7S_T9.js";import"./iframe-BXP7S-hP.js";import"./preload-helper-D9Z9MdNV.js";import"./weight.prop-Rt1sSGdE.js";import"./jsx-runtime-CQTdPr-F.js";import"./index-5QXC4EVg.js";const U={title:"Components/Text",component:e,parameters:{layout:"centered"},decorators:[r=>React.createElement(B,null,React.createElement(r,null))],argTypes:{as:{control:"select",options:["span","div","label","p"],description:"HTML element to render"},size:{control:"select",options:["1","2","3","4","5","6","7","8","9"],description:"Text size"},weight:{control:"select",options:["light","regular","medium","bold"],description:"Font weight"},align:{control:"select",options:["left","center","right"],description:"Text alignment"},color:{control:"select",options:["gray","gold","bronze","brown","yellow","amber","orange","tomato","red","ruby","crimson","pink","plum","purple","violet","iris","indigo","blue","cyan","teal","jade","green","grass","lime","mint","sky"],description:"Text color"},highContrast:{control:"boolean",description:"High contrast mode"},truncate:{control:"boolean",description:"Truncate text with ellipsis"},wrap:{control:"select",options:["wrap","nowrap","pretty","balance"],description:"Text wrapping behavior"},trim:{control:"select",options:["normal","start","end","both"],description:"Leading trim for better text alignment"},children:{control:"text",description:"Text content"}},args:{children:"The quick brown fox jumps over the lazy dog",as:"span"}},t={args:{children:"This is default text"}},a={args:{as:"span",children:"This is a span element"}},s={args:{as:"div",children:"This is a div element"}},n={args:{as:"label",children:"This is a label element"}},i={args:{as:"p",children:"This is a paragraph element with more text to demonstrate how it looks when rendered as a paragraph."}},o={args:{size:"1",children:"Size 1 text"}},c={args:{size:"2",children:"Size 2 text"}},l={args:{size:"3",children:"Size 3 text"}},d={args:{size:"4",children:"Size 4 text"}},p={args:{size:"5",children:"Size 5 text"}},m={args:{size:"6",children:"Size 6 text"}},g={args:{size:"7",children:"Size 7 text"}},h={args:{size:"8",children:"Size 8 text"}},u={args:{size:"9",children:"Size 9 text"}},x={args:{weight:"light",children:"Light weight text"}},w={args:{weight:"regular",children:"Regular weight text"}},z={args:{weight:"medium",children:"Medium weight text"}},T={args:{weight:"bold",children:"Bold weight text"}},S={args:{align:"left",children:"Left aligned text",as:"div"}},y={args:{align:"center",children:"Center aligned text",as:"div"}},b={args:{align:"right",children:"Right aligned text",as:"div"}},v={args:{color:"blue",children:"Blue text"}},f={args:{color:"red",children:"Red text"}},R={args:{color:"green",children:"Green text"}},E={args:{color:"purple",children:"Purple text"}},A={args:{highContrast:!0,children:"High contrast text",color:"blue"}},C={args:{truncate:!0,children:"This is a very long text that should be truncated with an ellipsis when it exceeds the container width",style:{width:"200px"}}},k={render:()=>React.createElement("div",{style:{display:"flex",flexDirection:"column",gap:"8px"}},["1","2","3","4","5","6","7","8","9"].map(r=>React.createElement(e,{key:r,size:r},"Size ",r," - The quick brown fox jumps over the lazy dog")))},W={render:()=>React.createElement("div",{style:{display:"flex",flexDirection:"column",gap:"8px"}},["light","regular","medium","bold"].map(r=>React.createElement(e,{key:r,weight:r,size:"4"},r.charAt(0).toUpperCase()+r.slice(1)," weight text")))},D={render:()=>React.createElement("div",{style:{display:"grid",gridTemplateColumns:"repeat(3, 1fr)",gap:"8px"}},["gray","gold","bronze","brown","yellow","amber","orange","tomato","red","ruby","crimson","pink","plum","purple","violet","iris","indigo","blue","cyan","teal","jade","green","grass","lime","mint","sky"].map(r=>React.createElement(e,{key:r,color:r},r," text")))},L={render:()=>React.createElement("div",{style:{width:"300px",display:"flex",flexDirection:"column",gap:"16px"}},React.createElement("div",null,React.createElement(e,{weight:"medium",size:"2"},"Normal wrap:"),React.createElement(e,{wrap:"wrap"},"This is a long sentence that will wrap normally when it reaches the end of the container.")),React.createElement("div",null,React.createElement(e,{weight:"medium",size:"2"},"No wrap:"),React.createElement(e,{wrap:"nowrap"},"This is a long sentence that will not wrap and may overflow the container.")),React.createElement("div",null,React.createElement(e,{weight:"medium",size:"2"},"Pretty wrap:"),React.createElement(e,{wrap:"pretty"},"This is a long sentence that will wrap in a prettier way, avoiding orphans and widows.")),React.createElement("div",null,React.createElement(e,{weight:"medium",size:"2"},"Balance wrap:"),React.createElement(e,{wrap:"balance"},"This is a long sentence that will wrap with balanced line lengths for better visual appearance.")))},P={render:()=>React.createElement("div",{style:{maxWidth:"400px",display:"flex",flexDirection:"column",gap:"12px"}},React.createElement(e,{size:"6",weight:"bold",color:"blue"},"Article Title"),React.createElement(e,{size:"3",color:"gray",weight:"medium"},"Published on March 15, 2024"),React.createElement(e,{size:"4",as:"p"},"This is the first paragraph of an article. It demonstrates how text components can be used to create readable and well-structured content with proper typography."),React.createElement(e,{size:"4",as:"p"},"This is another paragraph that shows how multiple text elements work together to create a cohesive reading experience."),React.createElement(e,{size:"2",color:"gray",align:"right"},"— Author Name"))};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    children: 'This is default text'
  }
}`,...t.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    as: 'span',
    children: 'This is a span element'
  }
}`,...a.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    as: 'div',
    children: 'This is a div element'
  }
}`,...s.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    as: 'label',
    children: 'This is a label element'
  }
}`,...n.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    as: 'p',
    children: 'This is a paragraph element with more text to demonstrate how it looks when rendered as a paragraph.'
  }
}`,...i.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    size: '1',
    children: 'Size 1 text'
  }
}`,...o.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    size: '2',
    children: 'Size 2 text'
  }
}`,...c.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    size: '3',
    children: 'Size 3 text'
  }
}`,...l.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    size: '4',
    children: 'Size 4 text'
  }
}`,...d.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    size: '5',
    children: 'Size 5 text'
  }
}`,...p.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    size: '6',
    children: 'Size 6 text'
  }
}`,...m.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: {
    size: '7',
    children: 'Size 7 text'
  }
}`,...g.parameters?.docs?.source}}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  args: {
    size: '8',
    children: 'Size 8 text'
  }
}`,...h.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    size: '9',
    children: 'Size 9 text'
  }
}`,...u.parameters?.docs?.source}}};x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  args: {
    weight: 'light',
    children: 'Light weight text'
  }
}`,...x.parameters?.docs?.source}}};w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  args: {
    weight: 'regular',
    children: 'Regular weight text'
  }
}`,...w.parameters?.docs?.source}}};z.parameters={...z.parameters,docs:{...z.parameters?.docs,source:{originalSource:`{
  args: {
    weight: 'medium',
    children: 'Medium weight text'
  }
}`,...z.parameters?.docs?.source}}};T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  args: {
    weight: 'bold',
    children: 'Bold weight text'
  }
}`,...T.parameters?.docs?.source}}};S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  args: {
    align: 'left',
    children: 'Left aligned text',
    as: 'div'
  }
}`,...S.parameters?.docs?.source}}};y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  args: {
    align: 'center',
    children: 'Center aligned text',
    as: 'div'
  }
}`,...y.parameters?.docs?.source}}};b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  args: {
    align: 'right',
    children: 'Right aligned text',
    as: 'div'
  }
}`,...b.parameters?.docs?.source}}};v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  args: {
    color: 'blue',
    children: 'Blue text'
  }
}`,...v.parameters?.docs?.source}}};f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  args: {
    color: 'red',
    children: 'Red text'
  }
}`,...f.parameters?.docs?.source}}};R.parameters={...R.parameters,docs:{...R.parameters?.docs,source:{originalSource:`{
  args: {
    color: 'green',
    children: 'Green text'
  }
}`,...R.parameters?.docs?.source}}};E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  args: {
    color: 'purple',
    children: 'Purple text'
  }
}`,...E.parameters?.docs?.source}}};A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
  args: {
    highContrast: true,
    children: 'High contrast text',
    color: 'blue'
  }
}`,...A.parameters?.docs?.source}}};C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  args: {
    truncate: true,
    children: 'This is a very long text that should be truncated with an ellipsis when it exceeds the container width',
    style: {
      width: '200px'
    }
  }
}`,...C.parameters?.docs?.source}}};k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  }}>
      {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map(size => <Text key={size} size={size as any}>
          Size {size} - The quick brown fox jumps over the lazy dog
        </Text>)}
    </div>
}`,...k.parameters?.docs?.source}}};W.parameters={...W.parameters,docs:{...W.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  }}>
      {['light', 'regular', 'medium', 'bold'].map(weight => <Text key={weight} weight={weight as any} size="4">
          {weight.charAt(0).toUpperCase() + weight.slice(1)} weight text
        </Text>)}
    </div>
}`,...W.parameters?.docs?.source}}};D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '8px'
  }}>
      {['gray', 'gold', 'bronze', 'brown', 'yellow', 'amber', 'orange', 'tomato', 'red', 'ruby', 'crimson', 'pink', 'plum', 'purple', 'violet', 'iris', 'indigo', 'blue', 'cyan', 'teal', 'jade', 'green', 'grass', 'lime', 'mint', 'sky'].map(color => <Text key={color} color={color as any}>
          {color} text
        </Text>)}
    </div>
}`,...D.parameters?.docs?.source}}};L.parameters={...L.parameters,docs:{...L.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    width: '300px',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  }}>
      <div>
        <Text weight="medium" size="2">Normal wrap:</Text>
        <Text wrap="wrap">
          This is a long sentence that will wrap normally when it reaches the end of the container.
        </Text>
      </div>
      <div>
        <Text weight="medium" size="2">No wrap:</Text>
        <Text wrap="nowrap">
          This is a long sentence that will not wrap and may overflow the container.
        </Text>
      </div>
      <div>
        <Text weight="medium" size="2">Pretty wrap:</Text>
        <Text wrap="pretty">
          This is a long sentence that will wrap in a prettier way, avoiding orphans and widows.
        </Text>
      </div>
      <div>
        <Text weight="medium" size="2">Balance wrap:</Text>
        <Text wrap="balance">
          This is a long sentence that will wrap with balanced line lengths for better visual appearance.
        </Text>
      </div>
    </div>
}`,...L.parameters?.docs?.source}}};P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    maxWidth: '400px',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  }}>
      <Text size="6" weight="bold" color="blue">
        Article Title
      </Text>
      <Text size="3" color="gray" weight="medium">
        Published on March 15, 2024
      </Text>
      <Text size="4" as="p">
        This is the first paragraph of an article. It demonstrates how text components can be used 
        to create readable and well-structured content with proper typography.
      </Text>
      <Text size="4" as="p">
        This is another paragraph that shows how multiple text elements work together to create 
        a cohesive reading experience.
      </Text>
      <Text size="2" color="gray" align="right">
        — Author Name
      </Text>
    </div>
}`,...P.parameters?.docs?.source}}};const _=["Default","AsSpan","AsDiv","AsLabel","AsParagraph","Size1","Size2","Size3","Size4","Size5","Size6","Size7","Size8","Size9","WeightLight","WeightRegular","WeightMedium","WeightBold","AlignLeft","AlignCenter","AlignRight","ColorBlue","ColorRed","ColorGreen","ColorPurple","HighContrast","Truncated","AllSizes","AllWeights","ColorPalette","TextWrapping","RealWorldExample"];export{y as AlignCenter,S as AlignLeft,b as AlignRight,k as AllSizes,W as AllWeights,s as AsDiv,n as AsLabel,i as AsParagraph,a as AsSpan,v as ColorBlue,R as ColorGreen,D as ColorPalette,E as ColorPurple,f as ColorRed,t as Default,A as HighContrast,P as RealWorldExample,o as Size1,c as Size2,l as Size3,d as Size4,p as Size5,m as Size6,g as Size7,h as Size8,u as Size9,L as TextWrapping,C as Truncated,T as WeightBold,x as WeightLight,z as WeightMedium,w as WeightRegular,_ as __namedExportsOrder,U as default};
