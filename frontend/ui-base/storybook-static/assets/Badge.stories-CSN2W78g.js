import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{h as A,f as k,d as E,e as H,S as W,a as F,m as T}from"./high-contrast.prop-DN4VqJ5o.js";import{r as G}from"./iframe-DsuaOdjx.js";import{r as L}from"./radius.prop-BFb5uVoY.js";import"./avatar-RXesCRZq.js";import"./button-ClCv9eVs.js";import"./card-DfIScEG2.js";import"./icon-button-QpiRLWqf.js";import"./base-button-Dyf4vkZD.js";import{T as M}from"./theme-BFbej9HP.js";import"./index-CVlKO6je.js";import"./index-BW54sZL3.js";import"./preload-helper-D9Z9MdNV.js";import"./get-subtree-COcTOnEl.js";import"./flex-bym-5aeO.js";const _=["1","2","3"],U=["solid","soft","surface","outline"],V={...E,size:{type:"enum",className:"rt-r-size",values:_,default:"1",responsive:!0},variant:{type:"enum",className:"rt-variant",values:U,default:"soft"},...k,...A,...L},r=G.forwardRef((a,b)=>{const{asChild:I,className:P,color:D,radius:w,...N}=H(a,V,T),O=I?W:"span";return e.jsx(O,{"data-accent-color":D,"data-radius":w,...N,ref:b,className:F("rt-reset","rt-Badge",P)})});r.displayName="Badge";r.__docgenInfo={description:"",methods:[],displayName:"Badge",composes:["ComponentPropsWithout"]};const te={title:"Base/Badge",component:r,parameters:{layout:"centered"},decorators:[a=>e.jsx(M,{children:e.jsx(a,{})})],argTypes:{variant:{control:"select",options:["solid","soft","surface","outline"],description:"Badge variant style"},size:{control:"select",options:["1","2","3"],description:"Badge size"},color:{control:"select",options:["gray","gold","bronze","brown","yellow","amber","orange","tomato","red","ruby","crimson","pink","plum","purple","violet","iris","indigo","blue","cyan","teal","jade","green","grass","lime","mint","sky"],description:"Badge accent color"},radius:{control:"select",options:["none","small","medium","large","full"],description:"Badge border radius"},highContrast:{control:"boolean",description:"High contrast mode"},children:{control:"text",description:"Badge content"}},args:{children:"Badge",variant:"soft",size:"1"}},s={args:{children:"Default"}},n={args:{variant:"solid",children:"Solid"}},o={args:{variant:"soft",children:"Soft"}},i={args:{variant:"surface",children:"Surface"}},t={args:{variant:"outline",children:"Outline"}},l={args:{size:"1",children:"Size 1"}},d={args:{size:"2",children:"Size 2"}},c={args:{size:"3",children:"Size 3"}},p={args:{color:"blue",children:"Blue"}},u={args:{color:"red",children:"Red"}},m={args:{color:"green",children:"Green"}},g={args:{color:"purple",children:"Purple"}},h={args:{highContrast:!0,children:"High Contrast"}},f={args:{radius:"none",children:"No Radius"}},x={args:{radius:"small",children:"Small Radius"}},v={args:{radius:"medium",children:"Medium Radius"}},S={args:{radius:"large",children:"Large Radius"}},y={args:{radius:"full",children:"Full Radius"}},B={render:()=>e.jsxs("div",{style:{display:"flex",gap:"8px",flexWrap:"wrap"},children:[e.jsx(r,{variant:"solid",children:"Solid"}),e.jsx(r,{variant:"soft",children:"Soft"}),e.jsx(r,{variant:"surface",children:"Surface"}),e.jsx(r,{variant:"outline",children:"Outline"})]})},z={render:()=>e.jsxs("div",{style:{display:"flex",gap:"8px",alignItems:"center"},children:[e.jsx(r,{size:"1",children:"Size 1"}),e.jsx(r,{size:"2",children:"Size 2"}),e.jsx(r,{size:"3",children:"Size 3"})]})},j={render:()=>e.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(6, 1fr)",gap:"8px"},children:["gray","gold","bronze","brown","yellow","amber","orange","tomato","red","ruby","crimson","pink","plum","purple","violet","iris","indigo","blue","cyan","teal","jade","green","grass","lime","mint","sky"].map(a=>e.jsx(r,{color:a,children:a},a))})},R={render:()=>e.jsxs("div",{style:{display:"flex",gap:"8px",alignItems:"center"},children:[e.jsx(r,{variant:"solid",color:"green",children:"Active"}),e.jsx(r,{variant:"solid",color:"yellow",children:"Warning"}),e.jsx(r,{variant:"solid",color:"red",children:"Error"}),e.jsx(r,{variant:"solid",color:"blue",children:"Info"}),e.jsx(r,{variant:"outline",color:"gray",children:"Inactive"})]})},C={render:()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"12px"},children:[e.jsxs("div",{style:{display:"flex",gap:"8px",alignItems:"center"},children:[e.jsx("span",{children:"User Role:"}),e.jsx(r,{variant:"solid",color:"blue",children:"Admin"})]}),e.jsxs("div",{style:{display:"flex",gap:"8px",alignItems:"center"},children:[e.jsx("span",{children:"Status:"}),e.jsx(r,{variant:"soft",color:"green",children:"Online"})]}),e.jsxs("div",{style:{display:"flex",gap:"8px",alignItems:"center"},children:[e.jsx("span",{children:"Priority:"}),e.jsx(r,{variant:"outline",color:"red",children:"High"})]}),e.jsxs("div",{style:{display:"flex",gap:"8px",alignItems:"center"},children:[e.jsx("span",{children:"Category:"}),e.jsx(r,{variant:"surface",color:"purple",children:"Feature"})]})]})};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    children: "Default"
  }
}`,...s.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    variant: "solid",
    children: "Solid"
  }
}`,...n.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    variant: "soft",
    children: "Soft"
  }
}`,...o.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    variant: "surface",
    children: "Surface"
  }
}`,...i.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    variant: "outline",
    children: "Outline"
  }
}`,...t.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    size: "1",
    children: "Size 1"
  }
}`,...l.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    size: "2",
    children: "Size 2"
  }
}`,...d.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    size: "3",
    children: "Size 3"
  }
}`,...c.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    color: "blue",
    children: "Blue"
  }
}`,...p.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    color: "red",
    children: "Red"
  }
}`,...u.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    color: "green",
    children: "Green"
  }
}`,...m.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: {
    color: "purple",
    children: "Purple"
  }
}`,...g.parameters?.docs?.source}}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  args: {
    highContrast: true,
    children: "High Contrast"
  }
}`,...h.parameters?.docs?.source}}};f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  args: {
    radius: "none",
    children: "No Radius"
  }
}`,...f.parameters?.docs?.source}}};x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  args: {
    radius: "small",
    children: "Small Radius"
  }
}`,...x.parameters?.docs?.source}}};v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  args: {
    radius: "medium",
    children: "Medium Radius"
  }
}`,...v.parameters?.docs?.source}}};S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  args: {
    radius: "large",
    children: "Large Radius"
  }
}`,...S.parameters?.docs?.source}}};y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  args: {
    radius: "full",
    children: "Full Radius"
  }
}`,...y.parameters?.docs?.source}}};B.parameters={...B.parameters,docs:{...B.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: "flex",
    gap: "8px",
    flexWrap: "wrap"
  }}>
      <Badge variant="solid">Solid</Badge>
      <Badge variant="soft">Soft</Badge>
      <Badge variant="surface">Surface</Badge>
      <Badge variant="outline">Outline</Badge>
    </div>
}`,...B.parameters?.docs?.source}}};z.parameters={...z.parameters,docs:{...z.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: "flex",
    gap: "8px",
    alignItems: "center"
  }}>
      <Badge size="1">Size 1</Badge>
      <Badge size="2">Size 2</Badge>
      <Badge size="3">Size 3</Badge>
    </div>
}`,...z.parameters?.docs?.source}}};j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: "grid",
    gridTemplateColumns: "repeat(6, 1fr)",
    gap: "8px"
  }}>
      {["gray", "gold", "bronze", "brown", "yellow", "amber", "orange", "tomato", "red", "ruby", "crimson", "pink", "plum", "purple", "violet", "iris", "indigo", "blue", "cyan", "teal", "jade", "green", "grass", "lime", "mint", "sky"].map(color => <Badge key={color} color={color as any}>
          {color}
        </Badge>)}
    </div>
}`,...j.parameters?.docs?.source}}};R.parameters={...R.parameters,docs:{...R.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: "flex",
    gap: "8px",
    alignItems: "center"
  }}>
      <Badge variant="solid" color="green">
        Active
      </Badge>
      <Badge variant="solid" color="yellow">
        Warning
      </Badge>
      <Badge variant="solid" color="red">
        Error
      </Badge>
      <Badge variant="solid" color="blue">
        Info
      </Badge>
      <Badge variant="outline" color="gray">
        Inactive
      </Badge>
    </div>
}`,...R.parameters?.docs?.source}}};C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: "flex",
    flexDirection: "column",
    gap: "12px"
  }}>
      <div style={{
      display: "flex",
      gap: "8px",
      alignItems: "center"
    }}>
        <span>User Role:</span>
        <Badge variant="solid" color="blue">
          Admin
        </Badge>
      </div>
      <div style={{
      display: "flex",
      gap: "8px",
      alignItems: "center"
    }}>
        <span>Status:</span>
        <Badge variant="soft" color="green">
          Online
        </Badge>
      </div>
      <div style={{
      display: "flex",
      gap: "8px",
      alignItems: "center"
    }}>
        <span>Priority:</span>
        <Badge variant="outline" color="red">
          High
        </Badge>
      </div>
      <div style={{
      display: "flex",
      gap: "8px",
      alignItems: "center"
    }}>
        <span>Category:</span>
        <Badge variant="surface" color="purple">
          Feature
        </Badge>
      </div>
    </div>
}`,...C.parameters?.docs?.source}}};const le=["Default","Solid","Soft","Surface","Outline","Size1","Size2","Size3","ColorBlue","ColorRed","ColorGreen","ColorPurple","HighContrast","RadiusNone","RadiusSmall","RadiusMedium","RadiusLarge","RadiusFull","AllVariants","AllSizes","ColorPalette","StatusIndicators","RealWorldExample"];export{z as AllSizes,B as AllVariants,p as ColorBlue,m as ColorGreen,j as ColorPalette,g as ColorPurple,u as ColorRed,s as Default,h as HighContrast,t as Outline,y as RadiusFull,S as RadiusLarge,v as RadiusMedium,f as RadiusNone,x as RadiusSmall,C as RealWorldExample,l as Size1,d as Size2,c as Size3,o as Soft,n as Solid,R as StatusIndicators,i as Surface,le as __namedExportsOrder,te as default};
