import{B as e}from"./button-1BHGwx6R.js";import{T as w}from"./theme-D6H7S_T9.js";import"./iframe-BXP7S-hP.js";import"./preload-helper-D9Z9MdNV.js";import"./radius.prop-BFb5uVoY.js";import"./flex-CetshBpm.js";import"./slot-BST-kKXi.js";import"./jsx-runtime-CQTdPr-F.js";import"./index-5QXC4EVg.js";const M={title:"Components/Button",component:e,parameters:{layout:"centered"},decorators:[r=>React.createElement(w,null,React.createElement(r,null))],argTypes:{variant:{control:"select",options:["classic","solid","soft","surface","outline","ghost"],description:"Button variant style"},size:{control:"select",options:["1","2","3","4"],description:"Button size"},color:{control:"select",options:["gray","gold","bronze","brown","yellow","amber","orange","tomato","red","ruby","crimson","pink","plum","purple","violet","iris","indigo","blue","cyan","teal","jade","green","grass","lime","mint","sky"],description:"Button accent color"},radius:{control:"select",options:["none","small","medium","large","full"],description:"Button border radius"},loading:{control:"boolean",description:"Loading state with spinner"},disabled:{control:"boolean",description:"Disabled state"},highContrast:{control:"boolean",description:"High contrast mode"},children:{control:"text",description:"Button content"}},args:{children:"Button",variant:"solid",size:"2"}},a={args:{children:"Default Button"}},t={args:{variant:"classic",children:"Classic Button"}},s={args:{variant:"solid",children:"Solid Button"}},o={args:{variant:"soft",children:"Soft Button"}},n={args:{variant:"surface",children:"Surface Button"}},i={args:{variant:"outline",children:"Outline Button"}},c={args:{variant:"ghost",children:"Ghost Button"}},l={args:{size:"1",children:"Size 1"}},d={args:{size:"2",children:"Size 2"}},u={args:{size:"3",children:"Size 3"}},m={args:{size:"4",children:"Size 4"}},p={args:{color:"blue",children:"Blue Button"}},g={args:{color:"red",children:"Red Button"}},S={args:{color:"green",children:"Green Button"}},h={args:{color:"purple",children:"Purple Button"}},B={args:{loading:!0,children:"Loading Button"}},v={args:{disabled:!0,children:"Disabled Button"}},z={args:{highContrast:!0,children:"High Contrast"}},R={args:{radius:"none",children:"No Radius"}},f={args:{radius:"small",children:"Small Radius"}},y={args:{radius:"medium",children:"Medium Radius"}},b={args:{radius:"large",children:"Large Radius"}},C={args:{radius:"full",children:"Full Radius"}},E={render:()=>React.createElement("div",{style:{display:"flex",gap:"8px",flexWrap:"wrap"}},React.createElement(e,{variant:"classic"},"Classic"),React.createElement(e,{variant:"solid"},"Solid"),React.createElement(e,{variant:"soft"},"Soft"),React.createElement(e,{variant:"surface"},"Surface"),React.createElement(e,{variant:"outline"},"Outline"),React.createElement(e,{variant:"ghost"},"Ghost"))},x={render:()=>React.createElement("div",{style:{display:"flex",gap:"8px",alignItems:"center"}},React.createElement(e,{size:"1"},"Size 1"),React.createElement(e,{size:"2"},"Size 2"),React.createElement(e,{size:"3"},"Size 3"),React.createElement(e,{size:"4"},"Size 4"))},D={render:()=>React.createElement("div",{style:{display:"grid",gridTemplateColumns:"repeat(6, 1fr)",gap:"8px"}},["gray","gold","bronze","brown","yellow","amber","orange","tomato","red","ruby","crimson","pink","plum","purple","violet","iris","indigo","blue","cyan","teal","jade","green","grass","lime","mint","sky"].map(r=>React.createElement(e,{key:r,color:r,size:"1"},r)))},G={render:()=>React.createElement("div",{style:{display:"flex",gap:"12px",alignItems:"center"}},React.createElement(e,{variant:"solid",color:"blue"},"Save Changes"),React.createElement(e,{variant:"outline",color:"gray"},"Cancel"),React.createElement(e,{variant:"ghost",color:"red"},"Delete"),React.createElement(e,{variant:"soft",color:"green",loading:!0},"Processing..."))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    children: 'Default Button'
  }
}`,...a.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'classic',
    children: 'Classic Button'
  }
}`,...t.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'solid',
    children: 'Solid Button'
  }
}`,...s.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'soft',
    children: 'Soft Button'
  }
}`,...o.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'surface',
    children: 'Surface Button'
  }
}`,...n.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'outline',
    children: 'Outline Button'
  }
}`,...i.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'ghost',
    children: 'Ghost Button'
  }
}`,...c.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    size: '1',
    children: 'Size 1'
  }
}`,...l.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    size: '2',
    children: 'Size 2'
  }
}`,...d.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    size: '3',
    children: 'Size 3'
  }
}`,...u.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    size: '4',
    children: 'Size 4'
  }
}`,...m.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    color: 'blue',
    children: 'Blue Button'
  }
}`,...p.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: {
    color: 'red',
    children: 'Red Button'
  }
}`,...g.parameters?.docs?.source}}};S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  args: {
    color: 'green',
    children: 'Green Button'
  }
}`,...S.parameters?.docs?.source}}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  args: {
    color: 'purple',
    children: 'Purple Button'
  }
}`,...h.parameters?.docs?.source}}};B.parameters={...B.parameters,docs:{...B.parameters?.docs,source:{originalSource:`{
  args: {
    loading: true,
    children: 'Loading Button'
  }
}`,...B.parameters?.docs?.source}}};v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  args: {
    disabled: true,
    children: 'Disabled Button'
  }
}`,...v.parameters?.docs?.source}}};z.parameters={...z.parameters,docs:{...z.parameters?.docs,source:{originalSource:`{
  args: {
    highContrast: true,
    children: 'High Contrast'
  }
}`,...z.parameters?.docs?.source}}};R.parameters={...R.parameters,docs:{...R.parameters?.docs,source:{originalSource:`{
  args: {
    radius: 'none',
    children: 'No Radius'
  }
}`,...R.parameters?.docs?.source}}};f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  args: {
    radius: 'small',
    children: 'Small Radius'
  }
}`,...f.parameters?.docs?.source}}};y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  args: {
    radius: 'medium',
    children: 'Medium Radius'
  }
}`,...y.parameters?.docs?.source}}};b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  args: {
    radius: 'large',
    children: 'Large Radius'
  }
}`,...b.parameters?.docs?.source}}};C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  args: {
    radius: 'full',
    children: 'Full Radius'
  }
}`,...C.parameters?.docs?.source}}};E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    gap: '8px',
    flexWrap: 'wrap'
  }}>
      <Button variant="classic">Classic</Button>
      <Button variant="solid">Solid</Button>
      <Button variant="soft">Soft</Button>
      <Button variant="surface">Surface</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
    </div>
}`,...E.parameters?.docs?.source}}};x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    gap: '8px',
    alignItems: 'center'
  }}>
      <Button size="1">Size 1</Button>
      <Button size="2">Size 2</Button>
      <Button size="3">Size 3</Button>
      <Button size="4">Size 4</Button>
    </div>
}`,...x.parameters?.docs?.source}}};D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'grid',
    gridTemplateColumns: 'repeat(6, 1fr)',
    gap: '8px'
  }}>
      {['gray', 'gold', 'bronze', 'brown', 'yellow', 'amber', 'orange', 'tomato', 'red', 'ruby', 'crimson', 'pink', 'plum', 'purple', 'violet', 'iris', 'indigo', 'blue', 'cyan', 'teal', 'jade', 'green', 'grass', 'lime', 'mint', 'sky'].map(color => <Button key={color} color={color as any} size="1">
          {color}
        </Button>)}
    </div>
}`,...D.parameters?.docs?.source}}};G.parameters={...G.parameters,docs:{...G.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    gap: '12px',
    alignItems: 'center'
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
}`,...G.parameters?.docs?.source}}};const N=["Default","Classic","Solid","Soft","Surface","Outline","Ghost","Size1","Size2","Size3","Size4","ColorBlue","ColorRed","ColorGreen","ColorPurple","Loading","Disabled","HighContrast","RadiusNone","RadiusSmall","RadiusMedium","RadiusLarge","RadiusFull","AllVariants","AllSizes","ColorPalette","RealWorldExample"];export{x as AllSizes,E as AllVariants,t as Classic,p as ColorBlue,S as ColorGreen,D as ColorPalette,h as ColorPurple,g as ColorRed,a as Default,v as Disabled,c as Ghost,z as HighContrast,B as Loading,i as Outline,C as RadiusFull,b as RadiusLarge,y as RadiusMedium,R as RadiusNone,f as RadiusSmall,G as RealWorldExample,l as Size1,d as Size2,u as Size3,m as Size4,o as Soft,s as Solid,n as Surface,N as __namedExportsOrder,M as default};
