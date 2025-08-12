import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{r as u}from"./iframe-DsuaOdjx.js";import{c as q,u as ce,a as W,f as ue,P as xe,T as me}from"./theme-BFbej9HP.js";import{P as B,u as H,h as ge,b as fe,d as ye,e as $,a as U,m as X}from"./high-contrast.prop-DN4VqJ5o.js";import{c as Y,R as ve,I as Re}from"./index-DT1UHsoa.js";import{u as he}from"./index-Bg7roRMb.js";import{u as je}from"./index-CkjKNTH6.js";import{T as n}from"./text-Bwa-Y73d.js";import{F as c}from"./flex-bym-5aeO.js";import"./preload-helper-D9Z9MdNV.js";import"./index-CVlKO6je.js";import"./index-BW54sZL3.js";import"./index-DVM_hVnM.js";import"./index-FlXuF2W-.js";import"./weight.prop-Rt1sSGdE.js";var K="Radio",[be,J]=q(K),[Ie,Ge]=be(K),Q=u.forwardRef((a,d)=>{const{__scopeRadio:t,name:p,checked:s=!1,required:i,disabled:r,value:x="on",onCheck:g,form:f,...R}=a,[v,h]=u.useState(null),m=H(d,b=>h(b)),y=u.useRef(!1),j=v?f||!!v.closest("form"):!0;return e.jsxs(Ie,{scope:t,checked:s,disabled:r,children:[e.jsx(B.button,{type:"button",role:"radio","aria-checked":s,"data-state":ae(s),"data-disabled":r?"":void 0,disabled:r,value:x,...R,ref:m,onClick:W(a.onClick,b=>{s||g?.(),j&&(y.current=b.isPropagationStopped(),y.current||b.stopPropagation())})}),j&&e.jsx(ne,{control:v,bubbles:!y.current,name:p,value:x,checked:s,required:i,disabled:r,form:f,style:{transform:"translateX(-100%)"}})]})});Q.displayName=K;var Z="RadioIndicator",ee=u.forwardRef((a,d)=>{const{__scopeRadio:t,forceMount:p,...s}=a,i=Ge(Z,t);return e.jsx(xe,{present:p||i.checked,children:e.jsx(B.span,{"data-state":ae(i.checked),"data-disabled":i.disabled?"":void 0,...s,ref:d})})});ee.displayName=Z;var ze="RadioBubbleInput",ne=u.forwardRef(({__scopeRadio:a,control:d,checked:t,bubbles:p=!0,...s},i)=>{const r=u.useRef(null),x=H(r,i),g=je(t),f=ue(d);return u.useEffect(()=>{const R=r.current;if(!R)return;const v=window.HTMLInputElement.prototype,m=Object.getOwnPropertyDescriptor(v,"checked").set;if(g!==t&&m){const y=new Event("click",{bubbles:p});m.call(R,t),R.dispatchEvent(y)}},[g,t,p]),e.jsx(B.input,{type:"radio","aria-hidden":!0,defaultChecked:t,...s,tabIndex:-1,ref:x,style:{...s.style,...f,position:"absolute",pointerEvents:"none",opacity:0,margin:0}})});ne.displayName=ze;function ae(a){return a?"checked":"unchecked"}var Te=["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"],A="RadioGroup",[Se,Oe]=q(A,[Y,J]),oe=Y(),te=J(),[Ce,Pe]=Se(A),se=u.forwardRef((a,d)=>{const{__scopeRadioGroup:t,name:p,defaultValue:s,value:i,required:r=!1,disabled:x=!1,orientation:g,dir:f,loop:R=!0,onValueChange:v,...h}=a,m=oe(t),y=ce(f),[j,b]=he({prop:i,defaultProp:s??null,onChange:v,caller:A});return e.jsx(Ce,{scope:t,name:p,required:r,disabled:x,value:j,onValueChange:b,children:e.jsx(ve,{asChild:!0,...m,orientation:g,dir:y,loop:R,children:e.jsx(B.div,{role:"radiogroup","aria-required":r,"aria-orientation":g,"data-disabled":x?"":void 0,dir:y,...h,ref:d})})})});se.displayName=A;var ie="RadioGroupItem",re=u.forwardRef((a,d)=>{const{__scopeRadioGroup:t,disabled:p,...s}=a,i=Pe(ie,t),r=i.disabled||p,x=oe(t),g=te(t),f=u.useRef(null),R=H(d,f),v=i.value===s.value,h=u.useRef(!1);return u.useEffect(()=>{const m=j=>{Te.includes(j.key)&&(h.current=!0)},y=()=>h.current=!1;return document.addEventListener("keydown",m),document.addEventListener("keyup",y),()=>{document.removeEventListener("keydown",m),document.removeEventListener("keyup",y)}},[]),e.jsx(Re,{asChild:!0,...x,focusable:!r,active:v,children:e.jsx(Q,{disabled:r,required:i.required,checked:v,...g,...s,name:i.name,ref:R,onCheck:()=>i.onValueChange(s.value),onKeyDown:W(m=>{m.key==="Enter"&&m.preventDefault()}),onFocus:W(s.onFocus,()=>{h.current&&f.current?.click()})})})});re.displayName=ie;var Fe="RadioGroupIndicator",Ve=u.forwardRef((a,d)=>{const{__scopeRadioGroup:t,...p}=a,s=te(t);return e.jsx(ee,{...s,...p,ref:d})});Ve.displayName=Fe;var we=se,ke=re;const Ne=["1","2","3"],De=["classic","surface","soft"],I={...ye,size:{type:"enum",className:"rt-r-size",values:Ne,default:"2",responsive:!0},variant:{type:"enum",className:"rt-variant",values:De,default:"surface"},...fe,...ge},le="RadioGroup",M={Root:we,createRadioGroupScope:Oe,Item:ke},[_e]=q(le,[M.createRadioGroupScope]),pe=M.createRadioGroupScope(),[Ee,de]=_e(le),l=u.forwardRef(({color:a=I.color.default,highContrast:d=I.highContrast.default,size:t=I.size.default,variant:p=I.variant.default,...s},i)=>{const{__scopeRadioGroup:r,className:x,...g}=$(s,X),f=pe(r);return e.jsx(Ee,{scope:r,color:a,highContrast:d,size:t,variant:p,children:e.jsx(M.Root,{...f,...g,ref:i,className:U("rt-RadioGroupRoot",x)})})});l.displayName="RadioGroup.Root";const o=u.forwardRef((a,d)=>{const{__scopeRadioGroup:t,children:p,className:s,style:i,...r}=a,{size:x}=de("RadioGroupItem",t);return p?e.jsxs(n,{as:"label",size:x,className:U("rt-RadioGroupItem",s),style:i,children:[e.jsx(L,{__scopeRadioGroup:t,...r,ref:d}),p&&e.jsx("span",{className:"rt-RadioGroupItemInner",children:p})]}):e.jsx(L,{__scopeRadioGroup:t,...r,ref:d,className:s,style:i})});o.displayName="RadioGroup.Item";const L=u.forwardRef(({__scopeRadioGroup:a,...d},t)=>{const p=de("RadioGroupItemRadio",a),s=pe(a),{color:i,className:r}=$({...d,...p},I,X);return e.jsx(M.Item,{...s,"data-accent-color":i,...d,asChild:!1,ref:t,className:U("rt-reset","rt-BaseRadioRoot",r)})});L.displayName="RadioGroup.ItemRadio";l.__docgenInfo={description:"",methods:[],displayName:"RadioGroup.Root",props:{__scopeRadioGroup:{required:!1,tsType:{name:"Context.Scope"},description:""},color:{defaultValue:{value:"radioGroupRootPropDefs.color.default",computed:!0},required:!1},highContrast:{defaultValue:{value:"radioGroupRootPropDefs.highContrast.default",computed:!0},required:!1},size:{defaultValue:{value:"radioGroupRootPropDefs.size.default",computed:!0},required:!1},variant:{defaultValue:{value:"radioGroupRootPropDefs.variant.default",computed:!0},required:!1}},composes:["ComponentPropsWithout"]};o.__docgenInfo={description:"",methods:[],displayName:"RadioGroup.Item",props:{__scopeRadioGroup:{required:!1,tsType:{name:"Context.Scope"},description:""}},composes:["ComponentPropsWithout"]};const en={title:"Base/RadioGroup",component:l,parameters:{layout:"centered"},decorators:[a=>e.jsx(me,{children:e.jsx(a,{})})],argTypes:{size:{control:"select",options:["1","2","3"],description:"Radio group size"},variant:{control:"select",options:["classic","surface","soft"],description:"Radio group variant style"},color:{control:"select",options:["gray","gold","bronze","brown","yellow","amber","orange","tomato","red","ruby","crimson","pink","plum","purple","violet","iris","indigo","blue","cyan","teal","jade","green","grass","lime","mint","sky"],description:"Radio group accent color"},highContrast:{control:"boolean",description:"High contrast mode"},disabled:{control:"boolean",description:"Disabled state"},orientation:{control:"select",options:["horizontal","vertical"],description:"Layout orientation"}},args:{size:"2",variant:"surface",orientation:"vertical"}},G={render:a=>e.jsx(l,{...a,defaultValue:"option1",children:e.jsxs(c,{direction:"column",gap:"2",children:[e.jsxs(n,{as:"label",size:"2",style:{display:"flex",alignItems:"center",gap:"8px"},children:[e.jsx(o,{value:"option1"}),"Option 1"]}),e.jsxs(n,{as:"label",size:"2",style:{display:"flex",alignItems:"center",gap:"8px"},children:[e.jsx(o,{value:"option2"}),"Option 2"]}),e.jsxs(n,{as:"label",size:"2",style:{display:"flex",alignItems:"center",gap:"8px"},children:[e.jsx(o,{value:"option3"}),"Option 3"]})]})})},z={render:a=>e.jsx(l,{...a,orientation:"horizontal",defaultValue:"option1",children:e.jsxs(c,{gap:"4",align:"center",children:[e.jsxs(n,{as:"label",size:"2",style:{display:"flex",alignItems:"center",gap:"8px"},children:[e.jsx(o,{value:"option1"}),"Option 1"]}),e.jsxs(n,{as:"label",size:"2",style:{display:"flex",alignItems:"center",gap:"8px"},children:[e.jsx(o,{value:"option2"}),"Option 2"]}),e.jsxs(n,{as:"label",size:"2",style:{display:"flex",alignItems:"center",gap:"8px"},children:[e.jsx(o,{value:"option3"}),"Option 3"]})]})})},T={render:a=>e.jsx(l,{...a,size:"1",defaultValue:"option1",children:e.jsxs(c,{direction:"column",gap:"2",children:[e.jsxs(n,{as:"label",size:"1",style:{display:"flex",alignItems:"center",gap:"6px"},children:[e.jsx(o,{value:"option1"}),"Small Option 1"]}),e.jsxs(n,{as:"label",size:"1",style:{display:"flex",alignItems:"center",gap:"6px"},children:[e.jsx(o,{value:"option2"}),"Small Option 2"]})]})})},S={render:a=>e.jsx(l,{...a,size:"2",defaultValue:"option1",children:e.jsxs(c,{direction:"column",gap:"2",children:[e.jsxs(n,{as:"label",size:"2",style:{display:"flex",alignItems:"center",gap:"8px"},children:[e.jsx(o,{value:"option1"}),"Medium Option 1"]}),e.jsxs(n,{as:"label",size:"2",style:{display:"flex",alignItems:"center",gap:"8px"},children:[e.jsx(o,{value:"option2"}),"Medium Option 2"]})]})})},O={render:a=>e.jsx(l,{...a,size:"3",defaultValue:"option1",children:e.jsxs(c,{direction:"column",gap:"3",children:[e.jsxs(n,{as:"label",size:"3",style:{display:"flex",alignItems:"center",gap:"10px"},children:[e.jsx(o,{value:"option1"}),"Large Option 1"]}),e.jsxs(n,{as:"label",size:"3",style:{display:"flex",alignItems:"center",gap:"10px"},children:[e.jsx(o,{value:"option2"}),"Large Option 2"]})]})})},C={render:a=>e.jsx(l,{...a,variant:"classic",defaultValue:"option1",children:e.jsxs(c,{direction:"column",gap:"2",children:[e.jsxs(n,{as:"label",size:"2",style:{display:"flex",alignItems:"center",gap:"8px"},children:[e.jsx(o,{value:"option1"}),"Classic Option 1"]}),e.jsxs(n,{as:"label",size:"2",style:{display:"flex",alignItems:"center",gap:"8px"},children:[e.jsx(o,{value:"option2"}),"Classic Option 2"]})]})})},P={render:a=>e.jsx(l,{...a,variant:"surface",defaultValue:"option1",children:e.jsxs(c,{direction:"column",gap:"2",children:[e.jsxs(n,{as:"label",size:"2",style:{display:"flex",alignItems:"center",gap:"8px"},children:[e.jsx(o,{value:"option1"}),"Surface Option 1"]}),e.jsxs(n,{as:"label",size:"2",style:{display:"flex",alignItems:"center",gap:"8px"},children:[e.jsx(o,{value:"option2"}),"Surface Option 2"]})]})})},F={render:a=>e.jsx(l,{...a,variant:"soft",defaultValue:"option1",children:e.jsxs(c,{direction:"column",gap:"2",children:[e.jsxs(n,{as:"label",size:"2",style:{display:"flex",alignItems:"center",gap:"8px"},children:[e.jsx(o,{value:"option1"}),"Soft Option 1"]}),e.jsxs(n,{as:"label",size:"2",style:{display:"flex",alignItems:"center",gap:"8px"},children:[e.jsx(o,{value:"option2"}),"Soft Option 2"]})]})})},V={render:a=>e.jsx(l,{...a,color:"blue",defaultValue:"option1",children:e.jsxs(c,{direction:"column",gap:"2",children:[e.jsxs(n,{as:"label",size:"2",style:{display:"flex",alignItems:"center",gap:"8px"},children:[e.jsx(o,{value:"option1"}),"Blue Option 1"]}),e.jsxs(n,{as:"label",size:"2",style:{display:"flex",alignItems:"center",gap:"8px"},children:[e.jsx(o,{value:"option2"}),"Blue Option 2"]})]})})},w={render:a=>e.jsx(l,{...a,color:"green",defaultValue:"option1",children:e.jsxs(c,{direction:"column",gap:"2",children:[e.jsxs(n,{as:"label",size:"2",style:{display:"flex",alignItems:"center",gap:"8px"},children:[e.jsx(o,{value:"option1"}),"Green Option 1"]}),e.jsxs(n,{as:"label",size:"2",style:{display:"flex",alignItems:"center",gap:"8px"},children:[e.jsx(o,{value:"option2"}),"Green Option 2"]})]})})},k={render:a=>e.jsx(l,{...a,disabled:!0,defaultValue:"option1",children:e.jsxs(c,{direction:"column",gap:"2",children:[e.jsxs(n,{as:"label",size:"2",style:{display:"flex",alignItems:"center",gap:"8px",opacity:.6},children:[e.jsx(o,{value:"option1"}),"Disabled Option 1"]}),e.jsxs(n,{as:"label",size:"2",style:{display:"flex",alignItems:"center",gap:"8px",opacity:.6},children:[e.jsx(o,{value:"option2"}),"Disabled Option 2"]})]})})},N={render:a=>e.jsx(l,{...a,highContrast:!0,defaultValue:"option1",children:e.jsxs(c,{direction:"column",gap:"2",children:[e.jsxs(n,{as:"label",size:"2",style:{display:"flex",alignItems:"center",gap:"8px"},children:[e.jsx(o,{value:"option1"}),"High Contrast Option 1"]}),e.jsxs(n,{as:"label",size:"2",style:{display:"flex",alignItems:"center",gap:"8px"},children:[e.jsx(o,{value:"option2"}),"High Contrast Option 2"]})]})})},D={render:()=>e.jsxs(c,{direction:"column",gap:"4",children:[e.jsxs("div",{children:[e.jsx(n,{size:"2",weight:"bold",style:{marginBottom:"8px"},children:"Classic"}),e.jsx(l,{variant:"classic",defaultValue:"classic1",children:e.jsx(c,{direction:"column",gap:"1",children:e.jsxs(n,{as:"label",size:"2",style:{display:"flex",alignItems:"center",gap:"8px"},children:[e.jsx(o,{value:"classic1"}),"Classic Option"]})})})]}),e.jsxs("div",{children:[e.jsx(n,{size:"2",weight:"bold",style:{marginBottom:"8px"},children:"Surface"}),e.jsx(l,{variant:"surface",defaultValue:"surface1",children:e.jsx(c,{direction:"column",gap:"1",children:e.jsxs(n,{as:"label",size:"2",style:{display:"flex",alignItems:"center",gap:"8px"},children:[e.jsx(o,{value:"surface1"}),"Surface Option"]})})})]}),e.jsxs("div",{children:[e.jsx(n,{size:"2",weight:"bold",style:{marginBottom:"8px"},children:"Soft"}),e.jsx(l,{variant:"soft",defaultValue:"soft1",children:e.jsx(c,{direction:"column",gap:"1",children:e.jsxs(n,{as:"label",size:"2",style:{display:"flex",alignItems:"center",gap:"8px"},children:[e.jsx(o,{value:"soft1"}),"Soft Option"]})})})]})]})},_={render:()=>e.jsxs("div",{style:{maxWidth:"400px"},children:[e.jsx(n,{size:"4",weight:"bold",style:{marginBottom:"16px"},children:"Notification Preferences"}),e.jsxs("div",{style:{marginBottom:"24px"},children:[e.jsx(n,{size:"2",weight:"medium",style:{marginBottom:"8px"},children:"Email Notifications"}),e.jsx(l,{defaultValue:"daily",name:"email",children:e.jsxs(c,{direction:"column",gap:"2",children:[e.jsxs(n,{as:"label",size:"2",style:{display:"flex",alignItems:"center",gap:"8px"},children:[e.jsx(o,{value:"immediate"}),"Immediate - Get notified instantly"]}),e.jsxs(n,{as:"label",size:"2",style:{display:"flex",alignItems:"center",gap:"8px"},children:[e.jsx(o,{value:"daily"}),"Daily - Once per day digest"]}),e.jsxs(n,{as:"label",size:"2",style:{display:"flex",alignItems:"center",gap:"8px"},children:[e.jsx(o,{value:"weekly"}),"Weekly - Weekly summary"]}),e.jsxs(n,{as:"label",size:"2",style:{display:"flex",alignItems:"center",gap:"8px"},children:[e.jsx(o,{value:"never"}),"Never - No email notifications"]})]})})]}),e.jsxs("div",{children:[e.jsx(n,{size:"2",weight:"medium",style:{marginBottom:"8px"},children:"Theme Preference"}),e.jsx(l,{defaultValue:"system",name:"theme",color:"purple",children:e.jsxs(c,{direction:"column",gap:"2",children:[e.jsxs(n,{as:"label",size:"2",style:{display:"flex",alignItems:"center",gap:"8px"},children:[e.jsx(o,{value:"light"}),"Light mode"]}),e.jsxs(n,{as:"label",size:"2",style:{display:"flex",alignItems:"center",gap:"8px"},children:[e.jsx(o,{value:"dark"}),"Dark mode"]}),e.jsxs(n,{as:"label",size:"2",style:{display:"flex",alignItems:"center",gap:"8px"},children:[e.jsx(o,{value:"system"}),"System preference"]})]})})]})]})},E={render:()=>e.jsxs("div",{style:{maxWidth:"350px"},children:[e.jsx(n,{size:"3",weight:"bold",style:{marginBottom:"16px"},children:"Payment Method"}),e.jsx(l,{defaultValue:"card",variant:"surface",children:e.jsxs(c,{direction:"column",gap:"2",children:[e.jsx("div",{style:{padding:"12px",border:"1px solid #e1e5e9",borderRadius:"8px",backgroundColor:"#fafbfc"},children:e.jsxs(n,{as:"label",size:"2",style:{display:"flex",alignItems:"center",gap:"10px",cursor:"pointer"},children:[e.jsx(o,{value:"card"}),e.jsxs("div",{children:[e.jsx("div",{style:{fontWeight:"bold"},children:"Credit Card"}),e.jsx("div",{style:{fontSize:"13px",color:"#666",marginTop:"2px"},children:"Visa, Mastercard, American Express"})]})]})}),e.jsx("div",{style:{padding:"12px",border:"1px solid #e1e5e9",borderRadius:"8px"},children:e.jsxs(n,{as:"label",size:"2",style:{display:"flex",alignItems:"center",gap:"10px",cursor:"pointer"},children:[e.jsx(o,{value:"paypal"}),e.jsxs("div",{children:[e.jsx("div",{style:{fontWeight:"bold"},children:"PayPal"}),e.jsx("div",{style:{fontSize:"13px",color:"#666",marginTop:"2px"},children:"Pay with your PayPal account"})]})]})}),e.jsx("div",{style:{padding:"12px",border:"1px solid #e1e5e9",borderRadius:"8px"},children:e.jsxs(n,{as:"label",size:"2",style:{display:"flex",alignItems:"center",gap:"10px",cursor:"pointer"},children:[e.jsx(o,{value:"bank"}),e.jsxs("div",{children:[e.jsx("div",{style:{fontWeight:"bold"},children:"Bank Transfer"}),e.jsx("div",{style:{fontSize:"13px",color:"#666",marginTop:"2px"},children:"Direct bank account transfer"})]})]})})]})})]})};G.parameters={...G.parameters,docs:{...G.parameters?.docs,source:{originalSource:`{
  render: args => <RadioGroup.Root {...args} defaultValue="option1">
      <Flex direction="column" gap="2">
        <Text as="label" size="2" style={{
        display: "flex",
        alignItems: "center",
        gap: "8px"
      }}>
          <RadioGroup.Item value="option1" />
          Option 1
        </Text>
        <Text as="label" size="2" style={{
        display: "flex",
        alignItems: "center",
        gap: "8px"
      }}>
          <RadioGroup.Item value="option2" />
          Option 2
        </Text>
        <Text as="label" size="2" style={{
        display: "flex",
        alignItems: "center",
        gap: "8px"
      }}>
          <RadioGroup.Item value="option3" />
          Option 3
        </Text>
      </Flex>
    </RadioGroup.Root>
}`,...G.parameters?.docs?.source}}};z.parameters={...z.parameters,docs:{...z.parameters?.docs,source:{originalSource:`{
  render: args => <RadioGroup.Root {...args} orientation="horizontal" defaultValue="option1">
      <Flex gap="4" align="center">
        <Text as="label" size="2" style={{
        display: "flex",
        alignItems: "center",
        gap: "8px"
      }}>
          <RadioGroup.Item value="option1" />
          Option 1
        </Text>
        <Text as="label" size="2" style={{
        display: "flex",
        alignItems: "center",
        gap: "8px"
      }}>
          <RadioGroup.Item value="option2" />
          Option 2
        </Text>
        <Text as="label" size="2" style={{
        display: "flex",
        alignItems: "center",
        gap: "8px"
      }}>
          <RadioGroup.Item value="option3" />
          Option 3
        </Text>
      </Flex>
    </RadioGroup.Root>
}`,...z.parameters?.docs?.source}}};T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  render: args => <RadioGroup.Root {...args} size="1" defaultValue="option1">
      <Flex direction="column" gap="2">
        <Text as="label" size="1" style={{
        display: "flex",
        alignItems: "center",
        gap: "6px"
      }}>
          <RadioGroup.Item value="option1" />
          Small Option 1
        </Text>
        <Text as="label" size="1" style={{
        display: "flex",
        alignItems: "center",
        gap: "6px"
      }}>
          <RadioGroup.Item value="option2" />
          Small Option 2
        </Text>
      </Flex>
    </RadioGroup.Root>
}`,...T.parameters?.docs?.source}}};S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  render: args => <RadioGroup.Root {...args} size="2" defaultValue="option1">
      <Flex direction="column" gap="2">
        <Text as="label" size="2" style={{
        display: "flex",
        alignItems: "center",
        gap: "8px"
      }}>
          <RadioGroup.Item value="option1" />
          Medium Option 1
        </Text>
        <Text as="label" size="2" style={{
        display: "flex",
        alignItems: "center",
        gap: "8px"
      }}>
          <RadioGroup.Item value="option2" />
          Medium Option 2
        </Text>
      </Flex>
    </RadioGroup.Root>
}`,...S.parameters?.docs?.source}}};O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
  render: args => <RadioGroup.Root {...args} size="3" defaultValue="option1">
      <Flex direction="column" gap="3">
        <Text as="label" size="3" style={{
        display: "flex",
        alignItems: "center",
        gap: "10px"
      }}>
          <RadioGroup.Item value="option1" />
          Large Option 1
        </Text>
        <Text as="label" size="3" style={{
        display: "flex",
        alignItems: "center",
        gap: "10px"
      }}>
          <RadioGroup.Item value="option2" />
          Large Option 2
        </Text>
      </Flex>
    </RadioGroup.Root>
}`,...O.parameters?.docs?.source}}};C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  render: args => <RadioGroup.Root {...args} variant="classic" defaultValue="option1">
      <Flex direction="column" gap="2">
        <Text as="label" size="2" style={{
        display: "flex",
        alignItems: "center",
        gap: "8px"
      }}>
          <RadioGroup.Item value="option1" />
          Classic Option 1
        </Text>
        <Text as="label" size="2" style={{
        display: "flex",
        alignItems: "center",
        gap: "8px"
      }}>
          <RadioGroup.Item value="option2" />
          Classic Option 2
        </Text>
      </Flex>
    </RadioGroup.Root>
}`,...C.parameters?.docs?.source}}};P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`{
  render: args => <RadioGroup.Root {...args} variant="surface" defaultValue="option1">
      <Flex direction="column" gap="2">
        <Text as="label" size="2" style={{
        display: "flex",
        alignItems: "center",
        gap: "8px"
      }}>
          <RadioGroup.Item value="option1" />
          Surface Option 1
        </Text>
        <Text as="label" size="2" style={{
        display: "flex",
        alignItems: "center",
        gap: "8px"
      }}>
          <RadioGroup.Item value="option2" />
          Surface Option 2
        </Text>
      </Flex>
    </RadioGroup.Root>
}`,...P.parameters?.docs?.source}}};F.parameters={...F.parameters,docs:{...F.parameters?.docs,source:{originalSource:`{
  render: args => <RadioGroup.Root {...args} variant="soft" defaultValue="option1">
      <Flex direction="column" gap="2">
        <Text as="label" size="2" style={{
        display: "flex",
        alignItems: "center",
        gap: "8px"
      }}>
          <RadioGroup.Item value="option1" />
          Soft Option 1
        </Text>
        <Text as="label" size="2" style={{
        display: "flex",
        alignItems: "center",
        gap: "8px"
      }}>
          <RadioGroup.Item value="option2" />
          Soft Option 2
        </Text>
      </Flex>
    </RadioGroup.Root>
}`,...F.parameters?.docs?.source}}};V.parameters={...V.parameters,docs:{...V.parameters?.docs,source:{originalSource:`{
  render: args => <RadioGroup.Root {...args} color="blue" defaultValue="option1">
      <Flex direction="column" gap="2">
        <Text as="label" size="2" style={{
        display: "flex",
        alignItems: "center",
        gap: "8px"
      }}>
          <RadioGroup.Item value="option1" />
          Blue Option 1
        </Text>
        <Text as="label" size="2" style={{
        display: "flex",
        alignItems: "center",
        gap: "8px"
      }}>
          <RadioGroup.Item value="option2" />
          Blue Option 2
        </Text>
      </Flex>
    </RadioGroup.Root>
}`,...V.parameters?.docs?.source}}};w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  render: args => <RadioGroup.Root {...args} color="green" defaultValue="option1">
      <Flex direction="column" gap="2">
        <Text as="label" size="2" style={{
        display: "flex",
        alignItems: "center",
        gap: "8px"
      }}>
          <RadioGroup.Item value="option1" />
          Green Option 1
        </Text>
        <Text as="label" size="2" style={{
        display: "flex",
        alignItems: "center",
        gap: "8px"
      }}>
          <RadioGroup.Item value="option2" />
          Green Option 2
        </Text>
      </Flex>
    </RadioGroup.Root>
}`,...w.parameters?.docs?.source}}};k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  render: args => <RadioGroup.Root {...args} disabled defaultValue="option1">
      <Flex direction="column" gap="2">
        <Text as="label" size="2" style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        opacity: 0.6
      }}>
          <RadioGroup.Item value="option1" />
          Disabled Option 1
        </Text>
        <Text as="label" size="2" style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        opacity: 0.6
      }}>
          <RadioGroup.Item value="option2" />
          Disabled Option 2
        </Text>
      </Flex>
    </RadioGroup.Root>
}`,...k.parameters?.docs?.source}}};N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`{
  render: args => <RadioGroup.Root {...args} highContrast defaultValue="option1">
      <Flex direction="column" gap="2">
        <Text as="label" size="2" style={{
        display: "flex",
        alignItems: "center",
        gap: "8px"
      }}>
          <RadioGroup.Item value="option1" />
          High Contrast Option 1
        </Text>
        <Text as="label" size="2" style={{
        display: "flex",
        alignItems: "center",
        gap: "8px"
      }}>
          <RadioGroup.Item value="option2" />
          High Contrast Option 2
        </Text>
      </Flex>
    </RadioGroup.Root>
}`,...N.parameters?.docs?.source}}};D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  render: () => <Flex direction="column" gap="4">
      <div>
        <Text size="2" weight="bold" style={{
        marginBottom: "8px"
      }}>
          Classic
        </Text>
        <RadioGroup.Root variant="classic" defaultValue="classic1">
          <Flex direction="column" gap="1">
            <Text as="label" size="2" style={{
            display: "flex",
            alignItems: "center",
            gap: "8px"
          }}>
              <RadioGroup.Item value="classic1" />
              Classic Option
            </Text>
          </Flex>
        </RadioGroup.Root>
      </div>
      <div>
        <Text size="2" weight="bold" style={{
        marginBottom: "8px"
      }}>
          Surface
        </Text>
        <RadioGroup.Root variant="surface" defaultValue="surface1">
          <Flex direction="column" gap="1">
            <Text as="label" size="2" style={{
            display: "flex",
            alignItems: "center",
            gap: "8px"
          }}>
              <RadioGroup.Item value="surface1" />
              Surface Option
            </Text>
          </Flex>
        </RadioGroup.Root>
      </div>
      <div>
        <Text size="2" weight="bold" style={{
        marginBottom: "8px"
      }}>
          Soft
        </Text>
        <RadioGroup.Root variant="soft" defaultValue="soft1">
          <Flex direction="column" gap="1">
            <Text as="label" size="2" style={{
            display: "flex",
            alignItems: "center",
            gap: "8px"
          }}>
              <RadioGroup.Item value="soft1" />
              Soft Option
            </Text>
          </Flex>
        </RadioGroup.Root>
      </div>
    </Flex>
}`,...D.parameters?.docs?.source}}};_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    maxWidth: "400px"
  }}>
      <Text size="4" weight="bold" style={{
      marginBottom: "16px"
    }}>
        Notification Preferences
      </Text>

      <div style={{
      marginBottom: "24px"
    }}>
        <Text size="2" weight="medium" style={{
        marginBottom: "8px"
      }}>
          Email Notifications
        </Text>
        <RadioGroup.Root defaultValue="daily" name="email">
          <Flex direction="column" gap="2">
            <Text as="label" size="2" style={{
            display: "flex",
            alignItems: "center",
            gap: "8px"
          }}>
              <RadioGroup.Item value="immediate" />
              Immediate - Get notified instantly
            </Text>
            <Text as="label" size="2" style={{
            display: "flex",
            alignItems: "center",
            gap: "8px"
          }}>
              <RadioGroup.Item value="daily" />
              Daily - Once per day digest
            </Text>
            <Text as="label" size="2" style={{
            display: "flex",
            alignItems: "center",
            gap: "8px"
          }}>
              <RadioGroup.Item value="weekly" />
              Weekly - Weekly summary
            </Text>
            <Text as="label" size="2" style={{
            display: "flex",
            alignItems: "center",
            gap: "8px"
          }}>
              <RadioGroup.Item value="never" />
              Never - No email notifications
            </Text>
          </Flex>
        </RadioGroup.Root>
      </div>

      <div>
        <Text size="2" weight="medium" style={{
        marginBottom: "8px"
      }}>
          Theme Preference
        </Text>
        <RadioGroup.Root defaultValue="system" name="theme" color="purple">
          <Flex direction="column" gap="2">
            <Text as="label" size="2" style={{
            display: "flex",
            alignItems: "center",
            gap: "8px"
          }}>
              <RadioGroup.Item value="light" />
              Light mode
            </Text>
            <Text as="label" size="2" style={{
            display: "flex",
            alignItems: "center",
            gap: "8px"
          }}>
              <RadioGroup.Item value="dark" />
              Dark mode
            </Text>
            <Text as="label" size="2" style={{
            display: "flex",
            alignItems: "center",
            gap: "8px"
          }}>
              <RadioGroup.Item value="system" />
              System preference
            </Text>
          </Flex>
        </RadioGroup.Root>
      </div>
    </div>
}`,..._.parameters?.docs?.source}}};E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    maxWidth: "350px"
  }}>
      <Text size="3" weight="bold" style={{
      marginBottom: "16px"
    }}>
        Payment Method
      </Text>
      <RadioGroup.Root defaultValue="card" variant="surface">
        <Flex direction="column" gap="2">
          <div style={{
          padding: "12px",
          border: "1px solid #e1e5e9",
          borderRadius: "8px",
          backgroundColor: "#fafbfc"
        }}>
            <Text as="label" size="2" style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            cursor: "pointer"
          }}>
              <RadioGroup.Item value="card" />
              <div>
                <div style={{
                fontWeight: "bold"
              }}>Credit Card</div>
                <div style={{
                fontSize: "13px",
                color: "#666",
                marginTop: "2px"
              }}>
                  Visa, Mastercard, American Express
                </div>
              </div>
            </Text>
          </div>

          <div style={{
          padding: "12px",
          border: "1px solid #e1e5e9",
          borderRadius: "8px"
        }}>
            <Text as="label" size="2" style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            cursor: "pointer"
          }}>
              <RadioGroup.Item value="paypal" />
              <div>
                <div style={{
                fontWeight: "bold"
              }}>PayPal</div>
                <div style={{
                fontSize: "13px",
                color: "#666",
                marginTop: "2px"
              }}>
                  Pay with your PayPal account
                </div>
              </div>
            </Text>
          </div>

          <div style={{
          padding: "12px",
          border: "1px solid #e1e5e9",
          borderRadius: "8px"
        }}>
            <Text as="label" size="2" style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            cursor: "pointer"
          }}>
              <RadioGroup.Item value="bank" />
              <div>
                <div style={{
                fontWeight: "bold"
              }}>Bank Transfer</div>
                <div style={{
                fontSize: "13px",
                color: "#666",
                marginTop: "2px"
              }}>
                  Direct bank account transfer
                </div>
              </div>
            </Text>
          </div>
        </Flex>
      </RadioGroup.Root>
    </div>
}`,...E.parameters?.docs?.source}}};const nn=["Default","Horizontal","Size1","Size2","Size3","Classic","Surface","Soft","ColorBlue","ColorGreen","Disabled","HighContrast","AllVariants","FormExample","PaymentMethodExample"];export{D as AllVariants,C as Classic,V as ColorBlue,w as ColorGreen,G as Default,k as Disabled,_ as FormExample,N as HighContrast,z as Horizontal,E as PaymentMethodExample,T as Size1,S as Size2,O as Size3,F as Soft,P as Surface,nn as __namedExportsOrder,en as default};
