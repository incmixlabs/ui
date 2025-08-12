import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{T as r}from"./text-Bwa-Y73d.js";import{T as M}from"./theme-BFbej9HP.js";import"./high-contrast.prop-DN4VqJ5o.js";import"./iframe-DsuaOdjx.js";import"./preload-helper-D9Z9MdNV.js";import"./index-CVlKO6je.js";import"./index-BW54sZL3.js";import"./weight.prop-Rt1sSGdE.js";const O={title:"Base/Text",component:r,parameters:{layout:"centered"},decorators:[t=>e.jsx(M,{children:e.jsx(t,{})})],argTypes:{as:{control:"select",options:["span","div","label","p"],description:"HTML element to render"},size:{control:"select",options:["1","2","3","4","5","6","7","8","9"],description:"Text size"},weight:{control:"select",options:["light","regular","medium","bold"],description:"Font weight"},align:{control:"select",options:["left","center","right"],description:"Text alignment"},color:{control:"select",options:["gray","gold","bronze","brown","yellow","amber","orange","tomato","red","ruby","crimson","pink","plum","purple","violet","iris","indigo","blue","cyan","teal","jade","green","grass","lime","mint","sky"],description:"Text color"},highContrast:{control:"boolean",description:"High contrast mode"},truncate:{control:"boolean",description:"Truncate text with ellipsis"},wrap:{control:"select",options:["wrap","nowrap","pretty","balance"],description:"Text wrapping behavior"},trim:{control:"select",options:["normal","start","end","both"],description:"Leading trim for better text alignment"},children:{control:"text",description:"Text content"}},args:{children:"The quick brown fox jumps over the lazy dog",as:"span"}},a={args:{children:"This is default text"}},s={args:{as:"span",children:"This is a span element"}},n={args:{as:"div",children:"This is a div element"}},i={args:{as:"label",children:"This is a label element"}},o={args:{as:"p",children:"This is a paragraph element with more text to demonstrate how it looks when rendered as a paragraph."}},c={args:{size:"1",children:"Size 1 text"}},l={args:{size:"2",children:"Size 2 text"}},d={args:{size:"3",children:"Size 3 text"}},p={args:{size:"4",children:"Size 4 text"}},h={args:{size:"5",children:"Size 5 text"}},g={args:{size:"6",children:"Size 6 text"}},m={args:{size:"7",children:"Size 7 text"}},u={args:{size:"8",children:"Size 8 text"}},x={args:{size:"9",children:"Size 9 text"}},w={args:{weight:"light",children:"Light weight text"}},z={args:{weight:"regular",children:"Regular weight text"}},T={args:{weight:"medium",children:"Medium weight text"}},S={args:{weight:"bold",children:"Bold weight text"}},y={args:{align:"left",children:"Left aligned text",as:"div"}},b={args:{align:"center",children:"Center aligned text",as:"div"}},v={args:{align:"right",children:"Right aligned text",as:"div"}},f={args:{color:"blue",children:"Blue text"}},j={args:{color:"red",children:"Red text"}},A={args:{color:"green",children:"Green text"}},C={args:{color:"purple",children:"Purple text"}},k={args:{highContrast:!0,children:"High contrast text",color:"blue"}},W={args:{truncate:!0,children:"This is a very long text that should be truncated with an ellipsis when it exceeds the container width",style:{width:"200px"}}},R={render:()=>e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:"8px"},children:["1","2","3","4","5","6","7","8","9"].map(t=>e.jsxs(r,{size:t,children:["Size ",t," - The quick brown fox jumps over the lazy dog"]},t))})},D={render:()=>e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:"8px"},children:["light","regular","medium","bold"].map(t=>e.jsxs(r,{weight:t,size:"4",children:[t.charAt(0).toUpperCase()+t.slice(1)," weight text"]},t))})},L={render:()=>e.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(3, 1fr)",gap:"8px"},children:["gray","gold","bronze","brown","yellow","amber","orange","tomato","red","ruby","crimson","pink","plum","purple","violet","iris","indigo","blue","cyan","teal","jade","green","grass","lime","mint","sky"].map(t=>e.jsxs(r,{color:t,children:[t," text"]},t))})},P={render:()=>e.jsxs("div",{style:{width:"300px",display:"flex",flexDirection:"column",gap:"16px"},children:[e.jsxs("div",{children:[e.jsx(r,{weight:"medium",size:"2",children:"Normal wrap:"}),e.jsx(r,{wrap:"wrap",children:"This is a long sentence that will wrap normally when it reaches the end of the container."})]}),e.jsxs("div",{children:[e.jsx(r,{weight:"medium",size:"2",children:"No wrap:"}),e.jsx(r,{wrap:"nowrap",children:"This is a long sentence that will not wrap and may overflow the container."})]}),e.jsxs("div",{children:[e.jsx(r,{weight:"medium",size:"2",children:"Pretty wrap:"}),e.jsx(r,{wrap:"pretty",children:"This is a long sentence that will wrap in a prettier way, avoiding orphans and widows."})]}),e.jsxs("div",{children:[e.jsx(r,{weight:"medium",size:"2",children:"Balance wrap:"}),e.jsx(r,{wrap:"balance",children:"This is a long sentence that will wrap with balanced line lengths for better visual appearance."})]})]})},B={render:()=>e.jsxs("div",{style:{maxWidth:"400px",display:"flex",flexDirection:"column",gap:"12px"},children:[e.jsx(r,{size:"6",weight:"bold",color:"blue",children:"Article Title"}),e.jsx(r,{size:"3",color:"gray",weight:"medium",children:"Published on March 15, 2024"}),e.jsx(r,{size:"4",as:"p",children:"This is the first paragraph of an article. It demonstrates how text components can be used to create readable and well-structured content with proper typography."}),e.jsx(r,{size:"4",as:"p",children:"This is another paragraph that shows how multiple text elements work together to create a cohesive reading experience."}),e.jsx(r,{size:"2",color:"gray",align:"right",children:"— Author Name"})]})};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    children: "This is default text"
  }
}`,...a.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    as: "span",
    children: "This is a span element"
  }
}`,...s.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    as: "div",
    children: "This is a div element"
  }
}`,...n.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    as: "label",
    children: "This is a label element"
  }
}`,...i.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    as: "p",
    children: "This is a paragraph element with more text to demonstrate how it looks when rendered as a paragraph."
  }
}`,...o.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    size: "1",
    children: "Size 1 text"
  }
}`,...c.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    size: "2",
    children: "Size 2 text"
  }
}`,...l.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    size: "3",
    children: "Size 3 text"
  }
}`,...d.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    size: "4",
    children: "Size 4 text"
  }
}`,...p.parameters?.docs?.source}}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  args: {
    size: "5",
    children: "Size 5 text"
  }
}`,...h.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: {
    size: "6",
    children: "Size 6 text"
  }
}`,...g.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    size: "7",
    children: "Size 7 text"
  }
}`,...m.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    size: "8",
    children: "Size 8 text"
  }
}`,...u.parameters?.docs?.source}}};x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  args: {
    size: "9",
    children: "Size 9 text"
  }
}`,...x.parameters?.docs?.source}}};w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  args: {
    weight: "light",
    children: "Light weight text"
  }
}`,...w.parameters?.docs?.source}}};z.parameters={...z.parameters,docs:{...z.parameters?.docs,source:{originalSource:`{
  args: {
    weight: "regular",
    children: "Regular weight text"
  }
}`,...z.parameters?.docs?.source}}};T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  args: {
    weight: "medium",
    children: "Medium weight text"
  }
}`,...T.parameters?.docs?.source}}};S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  args: {
    weight: "bold",
    children: "Bold weight text"
  }
}`,...S.parameters?.docs?.source}}};y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  args: {
    align: "left",
    children: "Left aligned text",
    as: "div"
  }
}`,...y.parameters?.docs?.source}}};b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  args: {
    align: "center",
    children: "Center aligned text",
    as: "div"
  }
}`,...b.parameters?.docs?.source}}};v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  args: {
    align: "right",
    children: "Right aligned text",
    as: "div"
  }
}`,...v.parameters?.docs?.source}}};f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  args: {
    color: "blue",
    children: "Blue text"
  }
}`,...f.parameters?.docs?.source}}};j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  args: {
    color: "red",
    children: "Red text"
  }
}`,...j.parameters?.docs?.source}}};A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
  args: {
    color: "green",
    children: "Green text"
  }
}`,...A.parameters?.docs?.source}}};C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  args: {
    color: "purple",
    children: "Purple text"
  }
}`,...C.parameters?.docs?.source}}};k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  args: {
    highContrast: true,
    children: "High contrast text",
    color: "blue"
  }
}`,...k.parameters?.docs?.source}}};W.parameters={...W.parameters,docs:{...W.parameters?.docs,source:{originalSource:`{
  args: {
    truncate: true,
    children: "This is a very long text that should be truncated with an ellipsis when it exceeds the container width",
    style: {
      width: "200px"
    }
  }
}`,...W.parameters?.docs?.source}}};R.parameters={...R.parameters,docs:{...R.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: "flex",
    flexDirection: "column",
    gap: "8px"
  }}>
      {["1", "2", "3", "4", "5", "6", "7", "8", "9"].map(size => <Text key={size} size={size as any}>
          Size {size} - The quick brown fox jumps over the lazy dog
        </Text>)}
    </div>
}`,...R.parameters?.docs?.source}}};D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: "flex",
    flexDirection: "column",
    gap: "8px"
  }}>
      {["light", "regular", "medium", "bold"].map(weight => <Text key={weight} weight={weight as any} size="4">
          {weight.charAt(0).toUpperCase() + weight.slice(1)} weight text
        </Text>)}
    </div>
}`,...D.parameters?.docs?.source}}};L.parameters={...L.parameters,docs:{...L.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "8px"
  }}>
      {["gray", "gold", "bronze", "brown", "yellow", "amber", "orange", "tomato", "red", "ruby", "crimson", "pink", "plum", "purple", "violet", "iris", "indigo", "blue", "cyan", "teal", "jade", "green", "grass", "lime", "mint", "sky"].map(color => <Text key={color} color={color as any}>
          {color} text
        </Text>)}
    </div>
}`,...L.parameters?.docs?.source}}};P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    width: "300px",
    display: "flex",
    flexDirection: "column",
    gap: "16px"
  }}>
      <div>
        <Text weight="medium" size="2">
          Normal wrap:
        </Text>
        <Text wrap="wrap">
          This is a long sentence that will wrap normally when it reaches the
          end of the container.
        </Text>
      </div>
      <div>
        <Text weight="medium" size="2">
          No wrap:
        </Text>
        <Text wrap="nowrap">
          This is a long sentence that will not wrap and may overflow the
          container.
        </Text>
      </div>
      <div>
        <Text weight="medium" size="2">
          Pretty wrap:
        </Text>
        <Text wrap="pretty">
          This is a long sentence that will wrap in a prettier way, avoiding
          orphans and widows.
        </Text>
      </div>
      <div>
        <Text weight="medium" size="2">
          Balance wrap:
        </Text>
        <Text wrap="balance">
          This is a long sentence that will wrap with balanced line lengths for
          better visual appearance.
        </Text>
      </div>
    </div>
}`,...P.parameters?.docs?.source}}};B.parameters={...B.parameters,docs:{...B.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    maxWidth: "400px",
    display: "flex",
    flexDirection: "column",
    gap: "12px"
  }}>
      <Text size="6" weight="bold" color="blue">
        Article Title
      </Text>
      <Text size="3" color="gray" weight="medium">
        Published on March 15, 2024
      </Text>
      <Text size="4" as="p">
        This is the first paragraph of an article. It demonstrates how text
        components can be used to create readable and well-structured content
        with proper typography.
      </Text>
      <Text size="4" as="p">
        This is another paragraph that shows how multiple text elements work
        together to create a cohesive reading experience.
      </Text>
      <Text size="2" color="gray" align="right">
        — Author Name
      </Text>
    </div>
}`,...B.parameters?.docs?.source}}};const J=["Default","AsSpan","AsDiv","AsLabel","AsParagraph","Size1","Size2","Size3","Size4","Size5","Size6","Size7","Size8","Size9","WeightLight","WeightRegular","WeightMedium","WeightBold","AlignLeft","AlignCenter","AlignRight","ColorBlue","ColorRed","ColorGreen","ColorPurple","HighContrast","Truncated","AllSizes","AllWeights","ColorPalette","TextWrapping","RealWorldExample"];export{b as AlignCenter,y as AlignLeft,v as AlignRight,R as AllSizes,D as AllWeights,n as AsDiv,i as AsLabel,o as AsParagraph,s as AsSpan,f as ColorBlue,A as ColorGreen,L as ColorPalette,C as ColorPurple,j as ColorRed,a as Default,k as HighContrast,B as RealWorldExample,c as Size1,l as Size2,d as Size3,p as Size4,h as Size5,g as Size6,m as Size7,u as Size8,x as Size9,P as TextWrapping,W as Truncated,S as WeightBold,w as WeightLight,T as WeightMedium,z as WeightRegular,J as __namedExportsOrder,O as default};
