import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{r as v,e as u}from"./iframe-DsuaOdjx.js";import{a as se,c as ie,u as de,T as me}from"./theme-BFbej9HP.js";import{P as W,e as ce,a as J,m as ue}from"./high-contrast.prop-DN4VqJ5o.js";import{c as K,I as ge,R as pe}from"./index-DT1UHsoa.js";import{u as U}from"./index-Bg7roRMb.js";import{r as ve}from"./radius.prop-BFb5uVoY.js";import{F as q}from"./flex-bym-5aeO.js";import{T as a}from"./text-Bwa-Y73d.js";import"./preload-helper-D9Z9MdNV.js";import"./index-CVlKO6je.js";import"./index-BW54sZL3.js";import"./index-DVM_hVnM.js";import"./index-FlXuF2W-.js";import"./weight.prop-Rt1sSGdE.js";var Q="Toggle",X=v.forwardRef((n,o)=>{const{pressed:l,defaultPressed:s,onPressedChange:d,...c}=n,[m,i]=U({prop:l,onChange:d,defaultProp:s??!1,caller:Q});return e.jsx(W.button,{type:"button","aria-pressed":m,"data-state":m?"on":"off","data-disabled":n.disabled?"":void 0,...c,ref:o,onClick:se(n.onClick,()=>{n.disabled||i(!m)})})});X.displayName=Q;var x="ToggleGroup",[Z,Le]=ie(x,[K]),ee=K(),$=u.forwardRef((n,o)=>{const{type:l,...s}=n;if(l==="single"){const d=s;return e.jsx(Se,{...d,ref:o})}if(l==="multiple"){const d=s;return e.jsx(xe,{...d,ref:o})}throw new Error(`Missing prop \`type\` expected on \`${x}\``)});$.displayName=x;var[te,ne]=Z(x),Se=u.forwardRef((n,o)=>{const{value:l,defaultValue:s,onValueChange:d=()=>{},...c}=n,[m,i]=U({prop:l,defaultProp:s??"",onChange:d,caller:x});return e.jsx(te,{scope:n.__scopeToggleGroup,type:"single",value:u.useMemo(()=>m?[m]:[],[m]),onItemActivate:i,onItemDeactivate:u.useCallback(()=>i(""),[i]),children:e.jsx(oe,{...c,ref:o})})}),xe=u.forwardRef((n,o)=>{const{value:l,defaultValue:s,onValueChange:d=()=>{},...c}=n,[m,i]=U({prop:l,defaultProp:s??[],onChange:d,caller:x}),g=u.useCallback(S=>i((p=[])=>[...p,S]),[i]),C=u.useCallback(S=>i((p=[])=>p.filter(ae=>ae!==S)),[i]);return e.jsx(te,{scope:n.__scopeToggleGroup,type:"multiple",value:m,onItemActivate:g,onItemDeactivate:C,children:e.jsx(oe,{...c,ref:o})})});$.displayName=x;var[Ce,he]=Z(x),oe=u.forwardRef((n,o)=>{const{__scopeToggleGroup:l,disabled:s=!1,rovingFocus:d=!0,orientation:c,dir:m,loop:i=!0,...g}=n,C=ee(l),S=de(m),p={role:"group",dir:S,...g};return e.jsx(Ce,{scope:l,rovingFocus:d,disabled:s,children:d?e.jsx(pe,{asChild:!0,...C,orientation:c,dir:S,loop:i,children:e.jsx(W.div,{...p,ref:o})}):e.jsx(W.div,{...p,ref:o})})}),H="ToggleGroupItem",re=u.forwardRef((n,o)=>{const l=ne(H,n.__scopeToggleGroup),s=he(H,n.__scopeToggleGroup),d=ee(n.__scopeToggleGroup),c=l.value.includes(n.value),m=s.disabled||n.disabled,i={...n,pressed:c,disabled:m},g=u.useRef(null);return s.rovingFocus?e.jsx(ge,{asChild:!0,...d,focusable:!m,active:c,ref:g,children:e.jsx(Y,{...i,ref:o})}):e.jsx(Y,{...i,ref:o})});re.displayName=H;var Y=u.forwardRef((n,o)=>{const{__scopeToggleGroup:l,value:s,...d}=n,c=ne(H,l),m={role:"radio","aria-checked":n.pressed,"aria-pressed":void 0},i=c.type==="single"?m:void 0;return e.jsx(X,{...i,...d,ref:o,onPressedChange:g=>{g?c.onItemActivate(s):c.onItemDeactivate(s)}})}),Ie=$,je=re;const fe=["1","2","3"],ye=["surface","classic"],be={disabled:{type:"boolean",className:"disabled",default:!1},size:{type:"enum",className:"rt-r-size",values:fe,default:"2",responsive:!0},variant:{type:"enum",className:"rt-variant",values:ye,default:"surface"},...ve},le={Item:je,Root:Ie},r=v.forwardRef((n,o)=>{const{className:l,children:s,radius:d,value:c,defaultValue:m,onValueChange:i,...g}=ce(n,be,ue),[C,S]=U({prop:c,onChange:i,defaultProp:m??""});return e.jsxs(le.Root,{"data-disabled":n.disabled||void 0,"data-radius":d,ref:o,className:J("rt-SegmentedControlRoot",l),onValueChange:p=>{p&&S(p)},...g,type:"single",value:C,asChild:!1,disabled:!!n.disabled,children:[s,e.jsx("div",{className:"rt-SegmentedControlIndicator"})]})});r.displayName="SegmentedControl.Root";const t=v.forwardRef(({children:n,className:o,...l},s)=>e.jsxs(le.Item,{ref:s,className:J("rt-reset","rt-SegmentedControlItem",o),...l,disabled:!1,asChild:!1,children:[e.jsx("span",{className:"rt-SegmentedControlItemSeparator"}),e.jsxs("span",{className:"rt-SegmentedControlItemLabel",children:[e.jsx("span",{className:"rt-SegmentedControlItemLabelActive",children:n}),e.jsx("span",{className:"rt-SegmentedControlItemLabelInactive","aria-hidden":!0,children:n})]})]}));t.displayName="SegmentedControl.Item";r.__docgenInfo={description:"",methods:[],displayName:"SegmentedControl.Root",props:{value:{required:!1,tsType:{name:"string"},description:""},defaultValue:{required:!1,tsType:{name:"string"},description:""}},composes:["ComponentPropsWithout"]};t.__docgenInfo={description:"",methods:[],displayName:"SegmentedControl.Item",props:{value:{required:!0,tsType:{name:"string"},description:""}},composes:["ComponentPropsWithout"]};const De={title:"Base/SegmentedControl",component:r,parameters:{layout:"centered"},decorators:[n=>e.jsx(me,{children:e.jsx("div",{style:{padding:"20px"},children:e.jsx(n,{})})})],argTypes:{size:{control:"select",options:["1","2","3"],description:"Segmented control size"},variant:{control:"select",options:["classic","surface"],description:"Segmented control variant"},color:{control:"select",options:["gray","gold","bronze","brown","yellow","amber","orange","tomato","red","ruby","crimson","pink","plum","purple","violet","iris","indigo","blue","cyan","teal","jade","green","grass","lime","mint","sky"],description:"Segmented control color"},radius:{control:"select",options:["none","small","medium","large","full"],description:"Border radius"},highContrast:{control:"boolean",description:"High contrast mode"}},args:{size:"2",variant:"surface",defaultValue:"option1"}},h={render:n=>e.jsxs(r,{...n,children:[e.jsx(t,{value:"option1",children:"Option 1"}),e.jsx(t,{value:"option2",children:"Option 2"}),e.jsx(t,{value:"option3",children:"Option 3"})]})},I={render:n=>e.jsxs(r,{size:"1",defaultValue:"small",children:[e.jsx(t,{value:"small",children:"Small"}),e.jsx(t,{value:"medium",children:"Medium"}),e.jsx(t,{value:"large",children:"Large"})]})},j={render:n=>e.jsxs(r,{size:"2",defaultValue:"medium",children:[e.jsx(t,{value:"small",children:"Small"}),e.jsx(t,{value:"medium",children:"Medium"}),e.jsx(t,{value:"large",children:"Large"})]})},f={render:n=>e.jsxs(r,{size:"3",defaultValue:"large",children:[e.jsx(t,{value:"small",children:"Small"}),e.jsx(t,{value:"medium",children:"Medium"}),e.jsx(t,{value:"large",children:"Large"})]})},y={render:n=>e.jsxs(r,{variant:"classic",defaultValue:"classic",children:[e.jsx(t,{value:"classic",children:"Classic"}),e.jsx(t,{value:"modern",children:"Modern"}),e.jsx(t,{value:"minimal",children:"Minimal"})]})},b={render:n=>e.jsxs(r,{variant:"surface",defaultValue:"surface",children:[e.jsx(t,{value:"surface",children:"Surface"}),e.jsx(t,{value:"elevated",children:"Elevated"}),e.jsx(t,{value:"flat",children:"Flat"})]})},T={render:n=>e.jsxs(r,{color:"blue",defaultValue:"option1",children:[e.jsx(t,{value:"option1",children:"Blue Option"}),e.jsx(t,{value:"option2",children:"Another"}),e.jsx(t,{value:"option3",children:"Third"})]})},R={render:n=>e.jsxs(r,{color:"green",defaultValue:"option1",children:[e.jsx(t,{value:"option1",children:"Green Option"}),e.jsx(t,{value:"option2",children:"Another"}),e.jsx(t,{value:"option3",children:"Third"})]})},z={render:n=>e.jsxs(r,{color:"purple",defaultValue:"option1",children:[e.jsx(t,{value:"option1",children:"Purple Option"}),e.jsx(t,{value:"option2",children:"Another"}),e.jsx(t,{value:"option3",children:"Third"})]})},V={render:n=>e.jsxs(r,{color:"red",defaultValue:"option1",children:[e.jsx(t,{value:"option1",children:"Red Option"}),e.jsx(t,{value:"option2",children:"Another"}),e.jsx(t,{value:"option3",children:"Third"})]})},w={render:n=>e.jsxs(r,{radius:"none",defaultValue:"option1",children:[e.jsx(t,{value:"option1",children:"Square"}),e.jsx(t,{value:"option2",children:"Corners"}),e.jsx(t,{value:"option3",children:"Sharp"})]})},k={render:n=>e.jsxs(r,{radius:"small",defaultValue:"option1",children:[e.jsx(t,{value:"option1",children:"Small"}),e.jsx(t,{value:"option2",children:"Radius"}),e.jsx(t,{value:"option3",children:"Rounded"})]})},P={render:n=>e.jsxs(r,{radius:"full",defaultValue:"option1",children:[e.jsx(t,{value:"option1",children:"Fully"}),e.jsx(t,{value:"option2",children:"Rounded"}),e.jsx(t,{value:"option3",children:"Pills"})]})},_={render:n=>e.jsxs(r,{highContrast:!0,defaultValue:"option1",children:[e.jsx(t,{value:"option1",children:"High"}),e.jsx(t,{value:"option2",children:"Contrast"}),e.jsx(t,{value:"option3",children:"Mode"})]})},B={render:()=>e.jsxs(q,{direction:"column",gap:"4",children:[e.jsxs("div",{children:[e.jsx(a,{size:"2",style:{marginBottom:"8px",display:"block"},children:"Size 1"}),e.jsxs(r,{size:"1",defaultValue:"option1",children:[e.jsx(t,{value:"option1",children:"First"}),e.jsx(t,{value:"option2",children:"Second"}),e.jsx(t,{value:"option3",children:"Third"})]})]}),e.jsxs("div",{children:[e.jsx(a,{size:"2",style:{marginBottom:"8px",display:"block"},children:"Size 2"}),e.jsxs(r,{size:"2",defaultValue:"option1",children:[e.jsx(t,{value:"option1",children:"First"}),e.jsx(t,{value:"option2",children:"Second"}),e.jsx(t,{value:"option3",children:"Third"})]})]}),e.jsxs("div",{children:[e.jsx(a,{size:"2",style:{marginBottom:"8px",display:"block"},children:"Size 3"}),e.jsxs(r,{size:"3",defaultValue:"option1",children:[e.jsx(t,{value:"option1",children:"First"}),e.jsx(t,{value:"option2",children:"Second"}),e.jsx(t,{value:"option3",children:"Third"})]})]})]})},A={render:()=>e.jsxs(q,{direction:"column",gap:"4",children:[e.jsxs("div",{children:[e.jsx(a,{size:"2",weight:"medium",style:{marginBottom:"8px",display:"block"},children:"Classic"}),e.jsxs(r,{variant:"classic",defaultValue:"option1",children:[e.jsx(t,{value:"option1",children:"First"}),e.jsx(t,{value:"option2",children:"Second"}),e.jsx(t,{value:"option3",children:"Third"})]})]}),e.jsxs("div",{children:[e.jsx(a,{size:"2",weight:"medium",style:{marginBottom:"8px",display:"block"},children:"Surface"}),e.jsxs(r,{variant:"surface",defaultValue:"option1",children:[e.jsx(t,{value:"option1",children:"First"}),e.jsx(t,{value:"option2",children:"Second"}),e.jsx(t,{value:"option3",children:"Third"})]})]})]})},G={render:()=>{const[n,o]=v.useState("grid");return e.jsxs("div",{children:[e.jsx(a,{size:"3",weight:"bold",style:{marginBottom:"12px",display:"block"},children:"View Options"}),e.jsxs(r,{value:n,onValueChange:o,children:[e.jsx(t,{value:"grid",children:"📋 Grid"}),e.jsx(t,{value:"list",children:"📄 List"}),e.jsx(t,{value:"card",children:"🗃️ Cards"})]}),e.jsx("div",{style:{marginTop:"16px",padding:"16px",border:"1px solid #e1e5e9",borderRadius:"8px",backgroundColor:"#fafbfc"},children:e.jsxs(a,{size:"2",children:["Currently viewing in ",e.jsx("strong",{children:n})," mode"]})})]})}},F={render:()=>{const[n,o]=v.useState("active");return e.jsxs("div",{children:[e.jsx(a,{size:"3",weight:"bold",style:{marginBottom:"12px",display:"block"},children:"Task Status Filter"}),e.jsxs(r,{value:n,onValueChange:o,color:"blue",children:[e.jsx(t,{value:"all",children:"📊 All (24)"}),e.jsx(t,{value:"active",children:"⚡ Active (8)"}),e.jsx(t,{value:"completed",children:"✅ Done (12)"}),e.jsx(t,{value:"pending",children:"⏳ Pending (4)"})]}),e.jsx("div",{style:{marginTop:"16px",padding:"16px",border:"1px solid #e1e5e9",borderRadius:"8px"},children:e.jsxs(a,{size:"2",children:["Showing"," ",e.jsx("strong",{children:n==="all"?"all tasks":`${n} tasks`})]})})]})}},M={render:()=>{const[n,o]=v.useState("week");return e.jsxs("div",{children:[e.jsx(a,{size:"3",weight:"bold",style:{marginBottom:"12px",display:"block"},children:"Analytics Period"}),e.jsxs(r,{value:n,onValueChange:o,size:"1",children:[e.jsx(t,{value:"day",children:"Day"}),e.jsx(t,{value:"week",children:"Week"}),e.jsx(t,{value:"month",children:"Month"}),e.jsx(t,{value:"year",children:"Year"})]}),e.jsxs("div",{style:{marginTop:"16px",padding:"20px",border:"1px solid #e1e5e9",borderRadius:"8px",textAlign:"center"},children:[e.jsx(a,{size:"4",weight:"bold",style:{display:"block",marginBottom:"8px"},children:"1,234"}),e.jsxs(a,{size:"2",color:"gray",children:["Total views this ",n]})]})]})}},N={render:()=>{const[n,o]=v.useState("light");return e.jsxs("div",{children:[e.jsx(a,{size:"3",weight:"bold",style:{marginBottom:"12px",display:"block"},children:"Theme Selection"}),e.jsxs(r,{value:n,onValueChange:o,color:"purple",children:[e.jsx(t,{value:"light",children:"☀️ Light"}),e.jsx(t,{value:"dark",children:"🌙 Dark"}),e.jsx(t,{value:"auto",children:"🔄 Auto"})]}),e.jsx("div",{style:{marginTop:"16px",padding:"16px",border:"1px solid #e1e5e9",borderRadius:"8px",backgroundColor:n==="dark"?"#1f2937":n==="light"?"#ffffff":"#f3f4f6",color:n==="dark"?"#f9fafb":"#111827"},children:e.jsxs(a,{size:"2",children:["Preview of ",e.jsx("strong",{children:n})," theme"]})})]})}},O={render:()=>{const[n,o]=v.useState("medium"),l={low:"green",medium:"yellow",high:"orange",urgent:"red"};return e.jsxs("div",{children:[e.jsx(a,{size:"3",weight:"bold",style:{marginBottom:"12px",display:"block"},children:"Set Priority"}),e.jsxs(r,{value:n,onValueChange:o,color:l[n],children:[e.jsx(t,{value:"low",children:"🟢 Low"}),e.jsx(t,{value:"medium",children:"🟡 Medium"}),e.jsx(t,{value:"high",children:"🟠 High"}),e.jsx(t,{value:"urgent",children:"🔴 Urgent"})]}),e.jsx("div",{style:{marginTop:"16px",padding:"16px",border:"1px solid #e1e5e9",borderRadius:"8px"},children:e.jsxs(a,{size:"2",children:["Task priority set to ",e.jsx("strong",{children:n})]})})]})}},L={render:()=>{const[n,o]=v.useState("overview"),l={overview:"Overview dashboard with key metrics and recent activity.",analytics:"Detailed analytics and performance charts.",users:"User management and access control settings.",settings:"Application configuration and preferences."};return e.jsxs("div",{style:{maxWidth:"500px"},children:[e.jsxs(r,{value:n,onValueChange:o,size:"2",children:[e.jsx(t,{value:"overview",children:"📊 Overview"}),e.jsx(t,{value:"analytics",children:"📈 Analytics"}),e.jsx(t,{value:"users",children:"👥 Users"}),e.jsx(t,{value:"settings",children:"⚙️ Settings"})]}),e.jsxs("div",{style:{marginTop:"20px",padding:"24px",border:"1px solid #e1e5e9",borderRadius:"8px",backgroundColor:"#fafbfc"},children:[e.jsx(a,{size:"3",weight:"bold",style:{marginBottom:"12px",display:"block"},children:n.charAt(0).toUpperCase()+n.slice(1)}),e.jsx(a,{size:"2",style:{lineHeight:"1.5"},children:l[n]})]})]})}},D={render:()=>e.jsxs(q,{direction:"column",gap:"4",children:[e.jsxs("div",{children:[e.jsx(a,{size:"2",style:{marginBottom:"8px",display:"block"},children:"Toggle View"}),e.jsxs(r,{defaultValue:"on",children:[e.jsx(t,{value:"on",children:"✅ On"}),e.jsx(t,{value:"off",children:"❌ Off"})]})]}),e.jsxs("div",{children:[e.jsx(a,{size:"2",style:{marginBottom:"8px",display:"block"},children:"Edit Mode"}),e.jsxs(r,{defaultValue:"view",color:"blue",children:[e.jsx(t,{value:"view",children:"👁️ View"}),e.jsx(t,{value:"edit",children:"✏️ Edit"})]})]}),e.jsxs("div",{children:[e.jsx(a,{size:"2",style:{marginBottom:"8px",display:"block"},children:"Layout"}),e.jsxs(r,{defaultValue:"horizontal",size:"3",children:[e.jsx(t,{value:"horizontal",children:"↔️ Horizontal"}),e.jsx(t,{value:"vertical",children:"↕️ Vertical"})]})]})]})},E={render:()=>e.jsxs("div",{children:[e.jsx(a,{size:"2",style:{marginBottom:"8px",display:"block"},children:"Chart Type"}),e.jsxs(r,{defaultValue:"line",size:"1",children:[e.jsx(t,{value:"line",children:"📈 Line"}),e.jsx(t,{value:"bar",children:"📊 Bar"}),e.jsx(t,{value:"pie",children:"🥧 Pie"}),e.jsx(t,{value:"area",children:"📉 Area"}),e.jsx(t,{value:"scatter",children:"⚪ Scatter"}),e.jsx(t,{value:"bubble",children:"🔵 Bubble"})]})]})};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  render: args => <SegmentedControl.Root {...args}>
      <SegmentedControl.Item value="option1">Option 1</SegmentedControl.Item>
      <SegmentedControl.Item value="option2">Option 2</SegmentedControl.Item>
      <SegmentedControl.Item value="option3">Option 3</SegmentedControl.Item>
    </SegmentedControl.Root>
}`,...h.parameters?.docs?.source}}};I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:`{
  render: _args => <SegmentedControl.Root size="1" defaultValue="small">
      <SegmentedControl.Item value="small">Small</SegmentedControl.Item>
      <SegmentedControl.Item value="medium">Medium</SegmentedControl.Item>
      <SegmentedControl.Item value="large">Large</SegmentedControl.Item>
    </SegmentedControl.Root>
}`,...I.parameters?.docs?.source}}};j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  render: _args => <SegmentedControl.Root size="2" defaultValue="medium">
      <SegmentedControl.Item value="small">Small</SegmentedControl.Item>
      <SegmentedControl.Item value="medium">Medium</SegmentedControl.Item>
      <SegmentedControl.Item value="large">Large</SegmentedControl.Item>
    </SegmentedControl.Root>
}`,...j.parameters?.docs?.source}}};f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  render: _args => <SegmentedControl.Root size="3" defaultValue="large">
      <SegmentedControl.Item value="small">Small</SegmentedControl.Item>
      <SegmentedControl.Item value="medium">Medium</SegmentedControl.Item>
      <SegmentedControl.Item value="large">Large</SegmentedControl.Item>
    </SegmentedControl.Root>
}`,...f.parameters?.docs?.source}}};y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  render: _args => <SegmentedControl.Root variant="classic" defaultValue="classic">
      <SegmentedControl.Item value="classic">Classic</SegmentedControl.Item>
      <SegmentedControl.Item value="modern">Modern</SegmentedControl.Item>
      <SegmentedControl.Item value="minimal">Minimal</SegmentedControl.Item>
    </SegmentedControl.Root>
}`,...y.parameters?.docs?.source}}};b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  render: _args => <SegmentedControl.Root variant="surface" defaultValue="surface">
      <SegmentedControl.Item value="surface">Surface</SegmentedControl.Item>
      <SegmentedControl.Item value="elevated">Elevated</SegmentedControl.Item>
      <SegmentedControl.Item value="flat">Flat</SegmentedControl.Item>
    </SegmentedControl.Root>
}`,...b.parameters?.docs?.source}}};T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  render: _args => <SegmentedControl.Root color="blue" defaultValue="option1">
      <SegmentedControl.Item value="option1">Blue Option</SegmentedControl.Item>
      <SegmentedControl.Item value="option2">Another</SegmentedControl.Item>
      <SegmentedControl.Item value="option3">Third</SegmentedControl.Item>
    </SegmentedControl.Root>
}`,...T.parameters?.docs?.source}}};R.parameters={...R.parameters,docs:{...R.parameters?.docs,source:{originalSource:`{
  render: _args => <SegmentedControl.Root color="green" defaultValue="option1">
      <SegmentedControl.Item value="option1">
        Green Option
      </SegmentedControl.Item>
      <SegmentedControl.Item value="option2">Another</SegmentedControl.Item>
      <SegmentedControl.Item value="option3">Third</SegmentedControl.Item>
    </SegmentedControl.Root>
}`,...R.parameters?.docs?.source}}};z.parameters={...z.parameters,docs:{...z.parameters?.docs,source:{originalSource:`{
  render: _args => <SegmentedControl.Root color="purple" defaultValue="option1">
      <SegmentedControl.Item value="option1">
        Purple Option
      </SegmentedControl.Item>
      <SegmentedControl.Item value="option2">Another</SegmentedControl.Item>
      <SegmentedControl.Item value="option3">Third</SegmentedControl.Item>
    </SegmentedControl.Root>
}`,...z.parameters?.docs?.source}}};V.parameters={...V.parameters,docs:{...V.parameters?.docs,source:{originalSource:`{
  render: _args => <SegmentedControl.Root color="red" defaultValue="option1">
      <SegmentedControl.Item value="option1">Red Option</SegmentedControl.Item>
      <SegmentedControl.Item value="option2">Another</SegmentedControl.Item>
      <SegmentedControl.Item value="option3">Third</SegmentedControl.Item>
    </SegmentedControl.Root>
}`,...V.parameters?.docs?.source}}};w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  render: _args => <SegmentedControl.Root radius="none" defaultValue="option1">
      <SegmentedControl.Item value="option1">Square</SegmentedControl.Item>
      <SegmentedControl.Item value="option2">Corners</SegmentedControl.Item>
      <SegmentedControl.Item value="option3">Sharp</SegmentedControl.Item>
    </SegmentedControl.Root>
}`,...w.parameters?.docs?.source}}};k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  render: _args => <SegmentedControl.Root radius="small" defaultValue="option1">
      <SegmentedControl.Item value="option1">Small</SegmentedControl.Item>
      <SegmentedControl.Item value="option2">Radius</SegmentedControl.Item>
      <SegmentedControl.Item value="option3">Rounded</SegmentedControl.Item>
    </SegmentedControl.Root>
}`,...k.parameters?.docs?.source}}};P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`{
  render: _args => <SegmentedControl.Root radius="full" defaultValue="option1">
      <SegmentedControl.Item value="option1">Fully</SegmentedControl.Item>
      <SegmentedControl.Item value="option2">Rounded</SegmentedControl.Item>
      <SegmentedControl.Item value="option3">Pills</SegmentedControl.Item>
    </SegmentedControl.Root>
}`,...P.parameters?.docs?.source}}};_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  render: _args => <SegmentedControl.Root highContrast defaultValue="option1">
      <SegmentedControl.Item value="option1">High</SegmentedControl.Item>
      <SegmentedControl.Item value="option2">Contrast</SegmentedControl.Item>
      <SegmentedControl.Item value="option3">Mode</SegmentedControl.Item>
    </SegmentedControl.Root>
}`,..._.parameters?.docs?.source}}};B.parameters={...B.parameters,docs:{...B.parameters?.docs,source:{originalSource:`{
  render: () => <Flex direction="column" gap="4">
      <div>
        <Text size="2" style={{
        marginBottom: "8px",
        display: "block"
      }}>
          Size 1
        </Text>
        <SegmentedControl.Root size="1" defaultValue="option1">
          <SegmentedControl.Item value="option1">First</SegmentedControl.Item>
          <SegmentedControl.Item value="option2">Second</SegmentedControl.Item>
          <SegmentedControl.Item value="option3">Third</SegmentedControl.Item>
        </SegmentedControl.Root>
      </div>

      <div>
        <Text size="2" style={{
        marginBottom: "8px",
        display: "block"
      }}>
          Size 2
        </Text>
        <SegmentedControl.Root size="2" defaultValue="option1">
          <SegmentedControl.Item value="option1">First</SegmentedControl.Item>
          <SegmentedControl.Item value="option2">Second</SegmentedControl.Item>
          <SegmentedControl.Item value="option3">Third</SegmentedControl.Item>
        </SegmentedControl.Root>
      </div>

      <div>
        <Text size="2" style={{
        marginBottom: "8px",
        display: "block"
      }}>
          Size 3
        </Text>
        <SegmentedControl.Root size="3" defaultValue="option1">
          <SegmentedControl.Item value="option1">First</SegmentedControl.Item>
          <SegmentedControl.Item value="option2">Second</SegmentedControl.Item>
          <SegmentedControl.Item value="option3">Third</SegmentedControl.Item>
        </SegmentedControl.Root>
      </div>
    </Flex>
}`,...B.parameters?.docs?.source}}};A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
  render: () => <Flex direction="column" gap="4">
      <div>
        <Text size="2" weight="medium" style={{
        marginBottom: "8px",
        display: "block"
      }}>
          Classic
        </Text>
        <SegmentedControl.Root variant="classic" defaultValue="option1">
          <SegmentedControl.Item value="option1">First</SegmentedControl.Item>
          <SegmentedControl.Item value="option2">Second</SegmentedControl.Item>
          <SegmentedControl.Item value="option3">Third</SegmentedControl.Item>
        </SegmentedControl.Root>
      </div>

      <div>
        <Text size="2" weight="medium" style={{
        marginBottom: "8px",
        display: "block"
      }}>
          Surface
        </Text>
        <SegmentedControl.Root variant="surface" defaultValue="option1">
          <SegmentedControl.Item value="option1">First</SegmentedControl.Item>
          <SegmentedControl.Item value="option2">Second</SegmentedControl.Item>
          <SegmentedControl.Item value="option3">Third</SegmentedControl.Item>
        </SegmentedControl.Root>
      </div>
    </Flex>
}`,...A.parameters?.docs?.source}}};G.parameters={...G.parameters,docs:{...G.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [view, setView] = React.useState("grid");
    return <div>
        <Text size="3" weight="bold" style={{
        marginBottom: "12px",
        display: "block"
      }}>
          View Options
        </Text>

        <SegmentedControl.Root value={view} onValueChange={setView}>
          <SegmentedControl.Item value="grid">📋 Grid</SegmentedControl.Item>
          <SegmentedControl.Item value="list">📄 List</SegmentedControl.Item>
          <SegmentedControl.Item value="card">🗃️ Cards</SegmentedControl.Item>
        </SegmentedControl.Root>

        <div style={{
        marginTop: "16px",
        padding: "16px",
        border: "1px solid #e1e5e9",
        borderRadius: "8px",
        backgroundColor: "#fafbfc"
      }}>
          <Text size="2">
            Currently viewing in <strong>{view}</strong> mode
          </Text>
        </div>
      </div>;
  }
}`,...G.parameters?.docs?.source}}};F.parameters={...F.parameters,docs:{...F.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [status, setStatus] = React.useState("active");
    return <div>
        <Text size="3" weight="bold" style={{
        marginBottom: "12px",
        display: "block"
      }}>
          Task Status Filter
        </Text>

        <SegmentedControl.Root value={status} onValueChange={setStatus} color="blue">
          <SegmentedControl.Item value="all">📊 All (24)</SegmentedControl.Item>
          <SegmentedControl.Item value="active">
            ⚡ Active (8)
          </SegmentedControl.Item>
          <SegmentedControl.Item value="completed">
            ✅ Done (12)
          </SegmentedControl.Item>
          <SegmentedControl.Item value="pending">
            ⏳ Pending (4)
          </SegmentedControl.Item>
        </SegmentedControl.Root>

        <div style={{
        marginTop: "16px",
        padding: "16px",
        border: "1px solid #e1e5e9",
        borderRadius: "8px"
      }}>
          <Text size="2">
            Showing{" "}
            <strong>
              {status === "all" ? "all tasks" : \`\${status} tasks\`}
            </strong>
          </Text>
        </div>
      </div>;
  }
}`,...F.parameters?.docs?.source}}};M.parameters={...M.parameters,docs:{...M.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [period, setPeriod] = React.useState("week");
    return <div>
        <Text size="3" weight="bold" style={{
        marginBottom: "12px",
        display: "block"
      }}>
          Analytics Period
        </Text>

        <SegmentedControl.Root value={period} onValueChange={setPeriod} size="1">
          <SegmentedControl.Item value="day">Day</SegmentedControl.Item>
          <SegmentedControl.Item value="week">Week</SegmentedControl.Item>
          <SegmentedControl.Item value="month">Month</SegmentedControl.Item>
          <SegmentedControl.Item value="year">Year</SegmentedControl.Item>
        </SegmentedControl.Root>

        <div style={{
        marginTop: "16px",
        padding: "20px",
        border: "1px solid #e1e5e9",
        borderRadius: "8px",
        textAlign: "center"
      }}>
          <Text size="4" weight="bold" style={{
          display: "block",
          marginBottom: "8px"
        }}>
            1,234
          </Text>
          <Text size="2" color="gray">
            Total views this {period}
          </Text>
        </div>
      </div>;
  }
}`,...M.parameters?.docs?.source}}};N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [theme, setTheme] = React.useState("light");
    return <div>
        <Text size="3" weight="bold" style={{
        marginBottom: "12px",
        display: "block"
      }}>
          Theme Selection
        </Text>

        <SegmentedControl.Root value={theme} onValueChange={setTheme} color="purple">
          <SegmentedControl.Item value="light">☀️ Light</SegmentedControl.Item>
          <SegmentedControl.Item value="dark">🌙 Dark</SegmentedControl.Item>
          <SegmentedControl.Item value="auto">🔄 Auto</SegmentedControl.Item>
        </SegmentedControl.Root>

        <div style={{
        marginTop: "16px",
        padding: "16px",
        border: "1px solid #e1e5e9",
        borderRadius: "8px",
        backgroundColor: theme === "dark" ? "#1f2937" : theme === "light" ? "#ffffff" : "#f3f4f6",
        color: theme === "dark" ? "#f9fafb" : "#111827"
      }}>
          <Text size="2">
            Preview of <strong>{theme}</strong> theme
          </Text>
        </div>
      </div>;
  }
}`,...N.parameters?.docs?.source}}};O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [priority, setPriority] = React.useState("medium");
    const priorityColors = {
      low: "green",
      medium: "yellow",
      high: "orange",
      urgent: "red"
    };
    return <div>
        <Text size="3" weight="bold" style={{
        marginBottom: "12px",
        display: "block"
      }}>
          Set Priority
        </Text>

        <SegmentedControl.Root value={priority} onValueChange={setPriority} color={priorityColors[priority]}>
          <SegmentedControl.Item value="low">🟢 Low</SegmentedControl.Item>
          <SegmentedControl.Item value="medium">
            🟡 Medium
          </SegmentedControl.Item>
          <SegmentedControl.Item value="high">🟠 High</SegmentedControl.Item>
          <SegmentedControl.Item value="urgent">
            🔴 Urgent
          </SegmentedControl.Item>
        </SegmentedControl.Root>

        <div style={{
        marginTop: "16px",
        padding: "16px",
        border: "1px solid #e1e5e9",
        borderRadius: "8px"
      }}>
          <Text size="2">
            Task priority set to <strong>{priority}</strong>
          </Text>
        </div>
      </div>;
  }
}`,...O.parameters?.docs?.source}}};L.parameters={...L.parameters,docs:{...L.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [activeTab, setActiveTab] = React.useState("overview");
    const tabContent = {
      overview: "Overview dashboard with key metrics and recent activity.",
      analytics: "Detailed analytics and performance charts.",
      users: "User management and access control settings.",
      settings: "Application configuration and preferences."
    };
    return <div style={{
      maxWidth: "500px"
    }}>
        <SegmentedControl.Root value={activeTab} onValueChange={setActiveTab} size="2">
          <SegmentedControl.Item value="overview">
            📊 Overview
          </SegmentedControl.Item>
          <SegmentedControl.Item value="analytics">
            📈 Analytics
          </SegmentedControl.Item>
          <SegmentedControl.Item value="users">👥 Users</SegmentedControl.Item>
          <SegmentedControl.Item value="settings">
            ⚙️ Settings
          </SegmentedControl.Item>
        </SegmentedControl.Root>

        <div style={{
        marginTop: "20px",
        padding: "24px",
        border: "1px solid #e1e5e9",
        borderRadius: "8px",
        backgroundColor: "#fafbfc"
      }}>
          <Text size="3" weight="bold" style={{
          marginBottom: "12px",
          display: "block"
        }}>
            {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
          </Text>
          <Text size="2" style={{
          lineHeight: "1.5"
        }}>
            {tabContent[activeTab]}
          </Text>
        </div>
      </div>;
  }
}`,...L.parameters?.docs?.source}}};D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  render: () => <Flex direction="column" gap="4">
      <div>
        <Text size="2" style={{
        marginBottom: "8px",
        display: "block"
      }}>
          Toggle View
        </Text>
        <SegmentedControl.Root defaultValue="on">
          <SegmentedControl.Item value="on">✅ On</SegmentedControl.Item>
          <SegmentedControl.Item value="off">❌ Off</SegmentedControl.Item>
        </SegmentedControl.Root>
      </div>

      <div>
        <Text size="2" style={{
        marginBottom: "8px",
        display: "block"
      }}>
          Edit Mode
        </Text>
        <SegmentedControl.Root defaultValue="view" color="blue">
          <SegmentedControl.Item value="view">👁️ View</SegmentedControl.Item>
          <SegmentedControl.Item value="edit">✏️ Edit</SegmentedControl.Item>
        </SegmentedControl.Root>
      </div>

      <div>
        <Text size="2" style={{
        marginBottom: "8px",
        display: "block"
      }}>
          Layout
        </Text>
        <SegmentedControl.Root defaultValue="horizontal" size="3">
          <SegmentedControl.Item value="horizontal">
            ↔️ Horizontal
          </SegmentedControl.Item>
          <SegmentedControl.Item value="vertical">
            ↕️ Vertical
          </SegmentedControl.Item>
        </SegmentedControl.Root>
      </div>
    </Flex>
}`,...D.parameters?.docs?.source}}};E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  render: () => <div>
      <Text size="2" style={{
      marginBottom: "8px",
      display: "block"
    }}>
        Chart Type
      </Text>
      <SegmentedControl.Root defaultValue="line" size="1">
        <SegmentedControl.Item value="line">📈 Line</SegmentedControl.Item>
        <SegmentedControl.Item value="bar">📊 Bar</SegmentedControl.Item>
        <SegmentedControl.Item value="pie">🥧 Pie</SegmentedControl.Item>
        <SegmentedControl.Item value="area">📉 Area</SegmentedControl.Item>
        <SegmentedControl.Item value="scatter">
          ⚪ Scatter
        </SegmentedControl.Item>
        <SegmentedControl.Item value="bubble">🔵 Bubble</SegmentedControl.Item>
      </SegmentedControl.Root>
    </div>
}`,...E.parameters?.docs?.source}}};const Ee=["Default","Size1","Size2","Size3","Classic","Surface","ColorBlue","ColorGreen","ColorPurple","ColorRed","RadiusNone","RadiusSmall","RadiusFull","HighContrast","AllSizes","AllVariants","ViewSwitcher","StatusFilter","TimePeriodSelector","ThemeSelector","PrioritySelector","TabNavigation","TwoItems","ManyItems"];export{B as AllSizes,A as AllVariants,y as Classic,T as ColorBlue,R as ColorGreen,z as ColorPurple,V as ColorRed,h as Default,_ as HighContrast,E as ManyItems,O as PrioritySelector,P as RadiusFull,w as RadiusNone,k as RadiusSmall,I as Size1,j as Size2,f as Size3,F as StatusFilter,b as Surface,L as TabNavigation,N as ThemeSelector,M as TimePeriodSelector,D as TwoItems,G as ViewSwitcher,Ee as __namedExportsOrder,De as default};
