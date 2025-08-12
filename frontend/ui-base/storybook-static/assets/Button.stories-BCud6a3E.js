import{j as r}from"./jsx-runtime-D_zvdyIk.js";import{B as e}from"./button-jOk6Qw9K.js";import{T as L}from"./theme-BFbej9HP.js";import"./button-ClCv9eVs.js";import"./high-contrast.prop-DN4VqJ5o.js";import"./iframe-DsuaOdjx.js";import"./preload-helper-D9Z9MdNV.js";import"./index-CVlKO6je.js";import"./index-BW54sZL3.js";import"./base-button-Dyf4vkZD.js";import"./flex-bym-5aeO.js";import"./radius.prop-BFb5uVoY.js";const V={title:"Base/Button",component:e,parameters:{layout:"centered"},decorators:[a=>r.jsx(L,{children:r.jsx(a,{})})],argTypes:{variant:{control:"select",options:["classic","solid","soft","surface","outline","ghost"],description:"Button variant style"},size:{control:"select",options:["1","2","3","4"],description:"Button size"},color:{control:"select",options:["gray","gold","bronze","brown","yellow","amber","orange","tomato","red","ruby","crimson","pink","plum","purple","violet","iris","indigo","blue","cyan","teal","jade","green","grass","lime","mint","sky"],description:"Button accent color"},radius:{control:"select",options:["none","small","medium","large","full"],description:"Button border radius"},loading:{control:"boolean",description:"Loading state with spinner"},disabled:{control:"boolean",description:"Disabled state"},highContrast:{control:"boolean",description:"High contrast mode"},children:{control:"text",description:"Button content"}},args:{children:"Button",variant:"solid",size:"2"}},s={args:{children:"Default Button"}},n={args:{variant:"classic",children:"Classic Button"}},o={args:{variant:"solid",children:"Solid Button"}},t={args:{variant:"soft",children:"Soft Button"}},i={args:{variant:"surface",children:"Surface Button"}},c={args:{variant:"outline",children:"Outline Button"}},l={args:{variant:"ghost",children:"Ghost Button"}},d={args:{size:"1",children:"Size 1"}},u={args:{size:"2",children:"Size 2"}},p={args:{size:"3",children:"Size 3"}},m={args:{size:"4",children:"Size 4"}},g={args:{color:"blue",children:"Blue Button"}},h={args:{color:"red",children:"Red Button"}},S={args:{color:"green",children:"Green Button"}},B={args:{color:"purple",children:"Purple Button"}},v={args:{loading:!0,children:"Loading Button"}},z={args:{disabled:!0,children:"Disabled Button"}},f={args:{highContrast:!0,children:"High Contrast"}},x={args:{radius:"none",children:"No Radius"}},y={args:{radius:"small",children:"Small Radius"}},b={args:{radius:"medium",children:"Medium Radius"}},C={args:{radius:"large",children:"Large Radius"}},R={args:{radius:"full",children:"Full Radius"}},j={render:()=>r.jsxs("div",{style:{display:"flex",gap:"8px",flexWrap:"wrap"},children:[r.jsx(e,{variant:"classic",children:"Classic"}),r.jsx(e,{variant:"solid",children:"Solid"}),r.jsx(e,{variant:"soft",children:"Soft"}),r.jsx(e,{variant:"surface",children:"Surface"}),r.jsx(e,{variant:"outline",children:"Outline"}),r.jsx(e,{variant:"ghost",children:"Ghost"})]})},D={render:()=>r.jsxs("div",{style:{display:"flex",gap:"8px",alignItems:"center"},children:[r.jsx(e,{size:"1",children:"Size 1"}),r.jsx(e,{size:"2",children:"Size 2"}),r.jsx(e,{size:"3",children:"Size 3"}),r.jsx(e,{size:"4",children:"Size 4"})]})},G={render:()=>r.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(6, 1fr)",gap:"8px"},children:["gray","gold","bronze","brown","yellow","amber","orange","tomato","red","ruby","crimson","pink","plum","purple","violet","iris","indigo","blue","cyan","teal","jade","green","grass","lime","mint","sky"].map(a=>r.jsx(e,{color:a,size:"1",children:a},a))})},w={render:()=>r.jsxs("div",{style:{display:"flex",gap:"12px",alignItems:"center"},children:[r.jsx(e,{variant:"solid",color:"blue",children:"Save Changes"}),r.jsx(e,{variant:"outline",color:"gray",children:"Cancel"}),r.jsx(e,{variant:"ghost",color:"red",children:"Delete"}),r.jsx(e,{variant:"soft",color:"green",loading:!0,children:"Processing..."})]})};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    children: "Default Button"
  }
}`,...s.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    variant: "classic",
    children: "Classic Button"
  }
}`,...n.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    variant: "solid",
    children: "Solid Button"
  }
}`,...o.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    variant: "soft",
    children: "Soft Button"
  }
}`,...t.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    variant: "surface",
    children: "Surface Button"
  }
}`,...i.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    variant: "outline",
    children: "Outline Button"
  }
}`,...c.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    variant: "ghost",
    children: "Ghost Button"
  }
}`,...l.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    size: "1",
    children: "Size 1"
  }
}`,...d.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    size: "2",
    children: "Size 2"
  }
}`,...u.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    size: "3",
    children: "Size 3"
  }
}`,...p.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    size: "4",
    children: "Size 4"
  }
}`,...m.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: {
    color: "blue",
    children: "Blue Button"
  }
}`,...g.parameters?.docs?.source}}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  args: {
    color: "red",
    children: "Red Button"
  }
}`,...h.parameters?.docs?.source}}};S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  args: {
    color: "green",
    children: "Green Button"
  }
}`,...S.parameters?.docs?.source}}};B.parameters={...B.parameters,docs:{...B.parameters?.docs,source:{originalSource:`{
  args: {
    color: "purple",
    children: "Purple Button"
  }
}`,...B.parameters?.docs?.source}}};v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  args: {
    loading: true,
    children: "Loading Button"
  }
}`,...v.parameters?.docs?.source}}};z.parameters={...z.parameters,docs:{...z.parameters?.docs,source:{originalSource:`{
  args: {
    disabled: true,
    children: "Disabled Button"
  }
}`,...z.parameters?.docs?.source}}};f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  args: {
    highContrast: true,
    children: "High Contrast"
  }
}`,...f.parameters?.docs?.source}}};x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  args: {
    radius: "none",
    children: "No Radius"
  }
}`,...x.parameters?.docs?.source}}};y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  args: {
    radius: "small",
    children: "Small Radius"
  }
}`,...y.parameters?.docs?.source}}};b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  args: {
    radius: "medium",
    children: "Medium Radius"
  }
}`,...b.parameters?.docs?.source}}};C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  args: {
    radius: "large",
    children: "Large Radius"
  }
}`,...C.parameters?.docs?.source}}};R.parameters={...R.parameters,docs:{...R.parameters?.docs,source:{originalSource:`{
  args: {
    radius: "full",
    children: "Full Radius"
  }
}`,...R.parameters?.docs?.source}}};j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: "flex",
    gap: "8px",
    flexWrap: "wrap"
  }}>
      <Button variant="classic">Classic</Button>
      <Button variant="solid">Solid</Button>
      <Button variant="soft">Soft</Button>
      <Button variant="surface">Surface</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
    </div>
}`,...j.parameters?.docs?.source}}};D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: "flex",
    gap: "8px",
    alignItems: "center"
  }}>
      <Button size="1">Size 1</Button>
      <Button size="2">Size 2</Button>
      <Button size="3">Size 3</Button>
      <Button size="4">Size 4</Button>
    </div>
}`,...D.parameters?.docs?.source}}};G.parameters={...G.parameters,docs:{...G.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: "grid",
    gridTemplateColumns: "repeat(6, 1fr)",
    gap: "8px"
  }}>
      {["gray", "gold", "bronze", "brown", "yellow", "amber", "orange", "tomato", "red", "ruby", "crimson", "pink", "plum", "purple", "violet", "iris", "indigo", "blue", "cyan", "teal", "jade", "green", "grass", "lime", "mint", "sky"].map(color => <Button key={color} color={color as any} size="1">
          {color}
        </Button>)}
    </div>
}`,...G.parameters?.docs?.source}}};w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: "flex",
    gap: "12px",
    alignItems: "center"
  }}>
      <Button variant="solid" color="blue">
        Save Changes
      </Button>
      <Button variant="outline" color="gray">
        Cancel
      </Button>
      <Button variant="ghost" color="red">
        Delete
      </Button>
      <Button variant="soft" color="green" loading>
        Processing...
      </Button>
    </div>
}`,...w.parameters?.docs?.source}}};const _=["Default","Classic","Solid","Soft","Surface","Outline","Ghost","Size1","Size2","Size3","Size4","ColorBlue","ColorRed","ColorGreen","ColorPurple","Loading","Disabled","HighContrast","RadiusNone","RadiusSmall","RadiusMedium","RadiusLarge","RadiusFull","AllVariants","AllSizes","ColorPalette","RealWorldExample"];export{D as AllSizes,j as AllVariants,n as Classic,g as ColorBlue,S as ColorGreen,G as ColorPalette,B as ColorPurple,h as ColorRed,s as Default,z as Disabled,l as Ghost,f as HighContrast,v as Loading,c as Outline,R as RadiusFull,C as RadiusLarge,b as RadiusMedium,x as RadiusNone,y as RadiusSmall,w as RealWorldExample,d as Size1,u as Size2,p as Size3,m as Size4,t as Soft,o as Solid,i as Surface,_ as __namedExportsOrder,V as default};
