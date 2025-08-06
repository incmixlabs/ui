import{r as C}from"./iframe-BXP7S-hP.js";import{h as k,d as A,a as H,e as W,R as F,c as T,m as G,T as L}from"./theme-D6H7S_T9.js";import{r as M}from"./radius.prop-BFb5uVoY.js";import"./preload-helper-D9Z9MdNV.js";import"./jsx-runtime-CQTdPr-F.js";import"./index-5QXC4EVg.js";const _=["1","2","3"],j=["solid","soft","surface","outline"],U={...H,size:{type:"enum",className:"rt-r-size",values:_,default:"1",responsive:!0},variant:{type:"enum",className:"rt-variant",values:j,default:"soft"},...A,...k,...M},e=C.forwardRef((r,b)=>{const{asChild:I,className:P,color:D,radius:w,...N}=W(r,U,G),O=I?F:"span";return C.createElement(O,{"data-accent-color":D,"data-radius":w,...N,ref:b,className:T("rt-reset","rt-Badge",P)})});e.displayName="Badge";e.__docgenInfo={description:"",methods:[],displayName:"Badge",composes:["ComponentPropsWithout"]};const Y={title:"Components/Badge",component:e,parameters:{layout:"centered"},decorators:[r=>React.createElement(L,null,React.createElement(r,null))],argTypes:{variant:{control:"select",options:["solid","soft","surface","outline"],description:"Badge variant style"},size:{control:"select",options:["1","2","3"],description:"Badge size"},color:{control:"select",options:["gray","gold","bronze","brown","yellow","amber","orange","tomato","red","ruby","crimson","pink","plum","purple","violet","iris","indigo","blue","cyan","teal","jade","green","grass","lime","mint","sky"],description:"Badge accent color"},radius:{control:"select",options:["none","small","medium","large","full"],description:"Badge border radius"},highContrast:{control:"boolean",description:"High contrast mode"},children:{control:"text",description:"Badge content"}},args:{children:"Badge",variant:"soft",size:"1"}},a={args:{children:"Default"}},s={args:{variant:"solid",children:"Solid"}},t={args:{variant:"soft",children:"Soft"}},o={args:{variant:"surface",children:"Surface"}},n={args:{variant:"outline",children:"Outline"}},i={args:{size:"1",children:"Size 1"}},l={args:{size:"2",children:"Size 2"}},c={args:{size:"3",children:"Size 3"}},d={args:{color:"blue",children:"Blue"}},p={args:{color:"red",children:"Red"}},m={args:{color:"green",children:"Green"}},u={args:{color:"purple",children:"Purple"}},g={args:{highContrast:!0,children:"High Contrast"}},f={args:{radius:"none",children:"No Radius"}},v={args:{radius:"small",children:"Small Radius"}},y={args:{radius:"medium",children:"Medium Radius"}},S={args:{radius:"large",children:"Large Radius"}},R={args:{radius:"full",children:"Full Radius"}},h={render:()=>React.createElement("div",{style:{display:"flex",gap:"8px",flexWrap:"wrap"}},React.createElement(e,{variant:"solid"},"Solid"),React.createElement(e,{variant:"soft"},"Soft"),React.createElement(e,{variant:"surface"},"Surface"),React.createElement(e,{variant:"outline"},"Outline"))},B={render:()=>React.createElement("div",{style:{display:"flex",gap:"8px",alignItems:"center"}},React.createElement(e,{size:"1"},"Size 1"),React.createElement(e,{size:"2"},"Size 2"),React.createElement(e,{size:"3"},"Size 3"))},x={render:()=>React.createElement("div",{style:{display:"grid",gridTemplateColumns:"repeat(6, 1fr)",gap:"8px"}},["gray","gold","bronze","brown","yellow","amber","orange","tomato","red","ruby","crimson","pink","plum","purple","violet","iris","indigo","blue","cyan","teal","jade","green","grass","lime","mint","sky"].map(r=>React.createElement(e,{key:r,color:r},r)))},z={render:()=>React.createElement("div",{style:{display:"flex",gap:"8px",alignItems:"center"}},React.createElement(e,{variant:"solid",color:"green"},"Active"),React.createElement(e,{variant:"solid",color:"yellow"},"Warning"),React.createElement(e,{variant:"solid",color:"red"},"Error"),React.createElement(e,{variant:"solid",color:"blue"},"Info"),React.createElement(e,{variant:"outline",color:"gray"},"Inactive"))},E={render:()=>React.createElement("div",{style:{display:"flex",flexDirection:"column",gap:"12px"}},React.createElement("div",{style:{display:"flex",gap:"8px",alignItems:"center"}},React.createElement("span",null,"User Role:"),React.createElement(e,{variant:"solid",color:"blue"},"Admin")),React.createElement("div",{style:{display:"flex",gap:"8px",alignItems:"center"}},React.createElement("span",null,"Status:"),React.createElement(e,{variant:"soft",color:"green"},"Online")),React.createElement("div",{style:{display:"flex",gap:"8px",alignItems:"center"}},React.createElement("span",null,"Priority:"),React.createElement(e,{variant:"outline",color:"red"},"High")),React.createElement("div",{style:{display:"flex",gap:"8px",alignItems:"center"}},React.createElement("span",null,"Category:"),React.createElement(e,{variant:"surface",color:"purple"},"Feature")))};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    children: 'Default'
  }
}`,...a.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'solid',
    children: 'Solid'
  }
}`,...s.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'soft',
    children: 'Soft'
  }
}`,...t.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'surface',
    children: 'Surface'
  }
}`,...o.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'outline',
    children: 'Outline'
  }
}`,...n.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    size: '1',
    children: 'Size 1'
  }
}`,...i.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    size: '2',
    children: 'Size 2'
  }
}`,...l.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    size: '3',
    children: 'Size 3'
  }
}`,...c.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    color: 'blue',
    children: 'Blue'
  }
}`,...d.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    color: 'red',
    children: 'Red'
  }
}`,...p.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    color: 'green',
    children: 'Green'
  }
}`,...m.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    color: 'purple',
    children: 'Purple'
  }
}`,...u.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: {
    highContrast: true,
    children: 'High Contrast'
  }
}`,...g.parameters?.docs?.source}}};f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  args: {
    radius: 'none',
    children: 'No Radius'
  }
}`,...f.parameters?.docs?.source}}};v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  args: {
    radius: 'small',
    children: 'Small Radius'
  }
}`,...v.parameters?.docs?.source}}};y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  args: {
    radius: 'medium',
    children: 'Medium Radius'
  }
}`,...y.parameters?.docs?.source}}};S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  args: {
    radius: 'large',
    children: 'Large Radius'
  }
}`,...S.parameters?.docs?.source}}};R.parameters={...R.parameters,docs:{...R.parameters?.docs,source:{originalSource:`{
  args: {
    radius: 'full',
    children: 'Full Radius'
  }
}`,...R.parameters?.docs?.source}}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    gap: '8px',
    flexWrap: 'wrap'
  }}>
      <Badge variant="solid">Solid</Badge>
      <Badge variant="soft">Soft</Badge>
      <Badge variant="surface">Surface</Badge>
      <Badge variant="outline">Outline</Badge>
    </div>
}`,...h.parameters?.docs?.source}}};B.parameters={...B.parameters,docs:{...B.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    gap: '8px',
    alignItems: 'center'
  }}>
      <Badge size="1">Size 1</Badge>
      <Badge size="2">Size 2</Badge>
      <Badge size="3">Size 3</Badge>
    </div>
}`,...B.parameters?.docs?.source}}};x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'grid',
    gridTemplateColumns: 'repeat(6, 1fr)',
    gap: '8px'
  }}>
      {['gray', 'gold', 'bronze', 'brown', 'yellow', 'amber', 'orange', 'tomato', 'red', 'ruby', 'crimson', 'pink', 'plum', 'purple', 'violet', 'iris', 'indigo', 'blue', 'cyan', 'teal', 'jade', 'green', 'grass', 'lime', 'mint', 'sky'].map(color => <Badge key={color} color={color as any}>
          {color}
        </Badge>)}
    </div>
}`,...x.parameters?.docs?.source}}};z.parameters={...z.parameters,docs:{...z.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    gap: '8px',
    alignItems: 'center'
  }}>
      <Badge variant="solid" color="green">Active</Badge>
      <Badge variant="solid" color="yellow">Warning</Badge>
      <Badge variant="solid" color="red">Error</Badge>
      <Badge variant="solid" color="blue">Info</Badge>
      <Badge variant="outline" color="gray">Inactive</Badge>
    </div>
}`,...z.parameters?.docs?.source}}};E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  }}>
      <div style={{
      display: 'flex',
      gap: '8px',
      alignItems: 'center'
    }}>
        <span>User Role:</span>
        <Badge variant="solid" color="blue">Admin</Badge>
      </div>
      <div style={{
      display: 'flex',
      gap: '8px',
      alignItems: 'center'
    }}>
        <span>Status:</span>
        <Badge variant="soft" color="green">Online</Badge>
      </div>
      <div style={{
      display: 'flex',
      gap: '8px',
      alignItems: 'center'
    }}>
        <span>Priority:</span>
        <Badge variant="outline" color="red">High</Badge>
      </div>
      <div style={{
      display: 'flex',
      gap: '8px',
      alignItems: 'center'
    }}>
        <span>Category:</span>
        <Badge variant="surface" color="purple">Feature</Badge>
      </div>
    </div>
}`,...E.parameters?.docs?.source}}};const Z=["Default","Solid","Soft","Surface","Outline","Size1","Size2","Size3","ColorBlue","ColorRed","ColorGreen","ColorPurple","HighContrast","RadiusNone","RadiusSmall","RadiusMedium","RadiusLarge","RadiusFull","AllVariants","AllSizes","ColorPalette","StatusIndicators","RealWorldExample"];export{B as AllSizes,h as AllVariants,d as ColorBlue,m as ColorGreen,x as ColorPalette,u as ColorPurple,p as ColorRed,a as Default,g as HighContrast,n as Outline,R as RadiusFull,S as RadiusLarge,y as RadiusMedium,f as RadiusNone,v as RadiusSmall,E as RealWorldExample,i as Size1,l as Size2,c as Size3,t as Soft,s as Solid,z as StatusIndicators,o as Surface,Z as __namedExportsOrder,Y as default};
