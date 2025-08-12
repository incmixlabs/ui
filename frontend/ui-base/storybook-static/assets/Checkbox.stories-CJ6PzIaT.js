import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{r as p}from"./iframe-DsuaOdjx.js";import{h as xe,b as ue,P as $,u as Z,e as me,a as ge,m as be}from"./high-contrast.prop-DN4VqJ5o.js";import{c as he,P as ye,a as Y,f as fe,T as ke}from"./theme-BFbej9HP.js";import{u as ee}from"./index-Bg7roRMb.js";import{u as Ce}from"./index-CkjKNTH6.js";import{b as je,a as Ie}from"./icons-Ca5JYYu5.js";import"./avatar-RXesCRZq.js";import"./button-ClCv9eVs.js";import"./card-DfIScEG2.js";import{F as I}from"./flex-bym-5aeO.js";import"./icon-button-QpiRLWqf.js";import"./base-button-Dyf4vkZD.js";import{T as re}from"./text-Bwa-Y73d.js";import"./preload-helper-D9Z9MdNV.js";import"./index-CVlKO6je.js";import"./index-BW54sZL3.js";import"./get-subtree-COcTOnEl.js";import"./radius.prop-BFb5uVoY.js";import"./weight.prop-Rt1sSGdE.js";const Se=["1","2","3"],ve=["classic","surface","soft"],_e={size:{type:"enum",className:"rt-r-size",values:Se,default:"2",responsive:!0},variant:{type:"enum",className:"rt-variant",values:ve,default:"surface"},...ue,...xe};var O="Checkbox",[ze,Qe]=he(O),[Pe,J]=ze(O);function Te(r){const{__scopeCheckbox:c,checked:t,children:d,defaultChecked:a,disabled:s,form:x,name:u,onCheckedChange:l,required:g,value:y="on",internal_do_not_use_render:m}=r,[b,C]=ee({prop:t,defaultProp:a??!1,onChange:l,caller:O}),[f,k]=p.useState(null),[j,o]=p.useState(null),i=p.useRef(!1),K=f?!!x||!!f.closest("form"):!0,X={checked:b,disabled:s,setChecked:C,control:f,setControl:k,name:u,form:x,value:y,hasConsumerStoppedPropagationRef:i,required:g,defaultChecked:h(a)?!1:a,isFormControl:K,bubbleInput:j,setBubbleInput:o};return e.jsx(Pe,{scope:c,...X,children:De(m)?m(X):d})}var ne="CheckboxTrigger",se=p.forwardRef(({__scopeCheckbox:r,onKeyDown:c,onClick:t,...d},a)=>{const{control:s,value:x,disabled:u,checked:l,required:g,setControl:y,setChecked:m,hasConsumerStoppedPropagationRef:b,isFormControl:C,bubbleInput:f}=J(ne,r),k=Z(a,y),j=p.useRef(l);return p.useEffect(()=>{const o=s?.form;if(o){const i=()=>m(j.current);return o.addEventListener("reset",i),()=>o.removeEventListener("reset",i)}},[s,m]),e.jsx($.button,{type:"button",role:"checkbox","aria-checked":h(l)?"mixed":l,"aria-required":g,"data-state":ie(l),"data-disabled":u?"":void 0,disabled:u,value:x,...d,ref:k,onKeyDown:Y(c,o=>{o.key==="Enter"&&o.preventDefault()}),onClick:Y(t,o=>{m(i=>h(i)?!0:!i),f&&C&&(b.current=o.isPropagationStopped(),b.current||o.stopPropagation())})})});se.displayName=ne;var ae=p.forwardRef((r,c)=>{const{__scopeCheckbox:t,name:d,checked:a,defaultChecked:s,required:x,disabled:u,value:l,onCheckedChange:g,form:y,...m}=r;return e.jsx(Te,{__scopeCheckbox:t,checked:a,defaultChecked:s,disabled:u,required:x,onCheckedChange:g,name:d,form:y,value:l,internal_do_not_use_render:({isFormControl:b})=>e.jsxs(e.Fragment,{children:[e.jsx(se,{...m,ref:c,__scopeCheckbox:t}),b&&e.jsx(ce,{__scopeCheckbox:t})]})})});ae.displayName=O;var te="CheckboxIndicator",le=p.forwardRef((r,c)=>{const{__scopeCheckbox:t,forceMount:d,...a}=r,s=J(te,t);return e.jsx(ye,{present:d||h(s.checked)||s.checked===!0,children:e.jsx($.span,{"data-state":ie(s.checked),"data-disabled":s.disabled?"":void 0,...a,ref:c,style:{pointerEvents:"none",...r.style}})})});le.displayName=te;var oe="CheckboxBubbleInput",ce=p.forwardRef(({__scopeCheckbox:r,...c},t)=>{const{control:d,hasConsumerStoppedPropagationRef:a,checked:s,defaultChecked:x,required:u,disabled:l,name:g,value:y,form:m,bubbleInput:b,setBubbleInput:C}=J(oe,r),f=Z(t,C),k=Ce(s),j=fe(d);p.useEffect(()=>{const i=b;if(!i)return;const K=window.HTMLInputElement.prototype,Q=Object.getOwnPropertyDescriptor(K,"checked").set,pe=!a.current;if(k!==s&&Q){const de=new Event("click",{bubbles:pe});i.indeterminate=h(s),Q.call(i,h(s)?!1:s),i.dispatchEvent(de)}},[b,k,s,a]);const o=p.useRef(h(s)?!1:s);return e.jsx($.input,{type:"checkbox","aria-hidden":!0,defaultChecked:x??o.current,required:u,disabled:l,name:g,value:y,form:m,...c,tabIndex:-1,ref:f,style:{...c.style,...j,position:"absolute",pointerEvents:"none",opacity:0,margin:0,transform:"translateX(-100%)"}})});ce.displayName=oe;function De(r){return typeof r=="function"}function h(r){return r==="indeterminate"}function ie(r){return h(r)?"indeterminate":r?"checked":"unchecked"}const n=p.forwardRef((r,c)=>{const{className:t,color:d,checked:a,defaultChecked:s,onCheckedChange:x,...u}=me(r,_e,be),[l,g]=ee({prop:a,defaultProp:s??!1,onChange:x});return e.jsx(ae,{"data-accent-color":d,...u,defaultChecked:s,checked:l,onCheckedChange:g,asChild:!1,ref:c,className:ge("rt-reset","rt-BaseCheckboxRoot","rt-CheckboxRoot",t),children:e.jsx(le,{asChild:!0,className:"rt-BaseCheckboxIndicator rt-CheckboxIndicator",children:l==="indeterminate"?e.jsx(je,{}):e.jsx(Ie,{})})})});n.displayName="Checkbox";n.__docgenInfo={description:"",methods:[],displayName:"Checkbox",composes:["ComponentPropsWithout"]};const Ye={title:"Base/Checkbox",component:n,parameters:{layout:"centered"},decorators:[r=>e.jsx(ke,{children:e.jsx(r,{})})],argTypes:{size:{control:"select",options:["1","2","3"],description:"Checkbox size"},variant:{control:"select",options:["classic","surface","soft"],description:"Checkbox variant style"},color:{control:"select",options:["gray","gold","bronze","brown","yellow","amber","orange","tomato","red","ruby","crimson","pink","plum","purple","violet","iris","indigo","blue","cyan","teal","jade","green","grass","lime","mint","sky"],description:"Checkbox accent color"},highContrast:{control:"boolean",description:"High contrast mode"},disabled:{control:"boolean",description:"Disabled state"},checked:{control:"boolean",description:"Checked state (controlled)"}},args:{size:"2",variant:"surface"}},S={render:r=>e.jsxs("label",{style:{display:"flex",alignItems:"center",gap:"8px",cursor:"pointer"},children:[e.jsx(n,{...r}),"Default Checkbox"]})},v={render:r=>e.jsxs("label",{style:{display:"flex",alignItems:"center",gap:"6px",cursor:"pointer"},children:[e.jsx(n,{size:"1"}),"Size 1 (Small)"]})},_={render:r=>e.jsxs("label",{style:{display:"flex",alignItems:"center",gap:"8px",cursor:"pointer"},children:[e.jsx(n,{size:"2"}),"Size 2 (Default)"]})},z={render:r=>e.jsxs("label",{style:{display:"flex",alignItems:"center",gap:"10px",cursor:"pointer"},children:[e.jsx(n,{size:"3"}),"Size 3 (Large)"]})},P={render:r=>e.jsxs("label",{style:{display:"flex",alignItems:"center",gap:"8px",cursor:"pointer"},children:[e.jsx(n,{variant:"classic"}),"Classic Variant"]})},T={render:r=>e.jsxs("label",{style:{display:"flex",alignItems:"center",gap:"8px",cursor:"pointer"},children:[e.jsx(n,{variant:"surface"}),"Surface Variant"]})},D={render:r=>e.jsxs("label",{style:{display:"flex",alignItems:"center",gap:"8px",cursor:"pointer"},children:[e.jsx(n,{variant:"soft"}),"Soft Variant"]})},E={render:r=>e.jsxs("label",{style:{display:"flex",alignItems:"center",gap:"8px",cursor:"pointer"},children:[e.jsx(n,{checked:!0}),"Checked State"]})},w={render:r=>e.jsxs("label",{style:{display:"flex",alignItems:"center",gap:"8px",cursor:"pointer"},children:[e.jsx(n,{checked:"indeterminate"}),"Indeterminate State"]})},R={render:r=>e.jsxs("label",{style:{display:"flex",alignItems:"center",gap:"8px",opacity:"0.6"},children:[e.jsx(n,{disabled:!0}),"Disabled State"]})},B={render:r=>e.jsxs("label",{style:{display:"flex",alignItems:"center",gap:"8px",opacity:"0.6"},children:[e.jsx(n,{disabled:!0,checked:!0}),"Disabled + Checked"]})},F={render:r=>e.jsxs("label",{style:{display:"flex",alignItems:"center",gap:"8px",cursor:"pointer"},children:[e.jsx(n,{color:"blue",checked:!0}),"Blue Color"]})},N={render:r=>e.jsxs("label",{style:{display:"flex",alignItems:"center",gap:"8px",cursor:"pointer"},children:[e.jsx(n,{color:"red",checked:!0}),"Red Color"]})},A={render:r=>e.jsxs("label",{style:{display:"flex",alignItems:"center",gap:"8px",cursor:"pointer"},children:[e.jsx(n,{color:"green",checked:!0}),"Green Color"]})},L={render:r=>e.jsxs("label",{style:{display:"flex",alignItems:"center",gap:"8px",cursor:"pointer"},children:[e.jsx(n,{color:"purple",checked:!0}),"Purple Color"]})},H={render:r=>e.jsxs("label",{style:{display:"flex",alignItems:"center",gap:"8px",cursor:"pointer"},children:[e.jsx(n,{highContrast:!0,checked:!0}),"High Contrast Mode"]})},M={render:()=>e.jsxs(I,{gap:"4",align:"center",children:[e.jsxs("label",{style:{display:"flex",alignItems:"center",gap:"6px",cursor:"pointer"},children:[e.jsx(n,{size:"1",checked:!0}),"Size 1"]}),e.jsxs("label",{style:{display:"flex",alignItems:"center",gap:"8px",cursor:"pointer"},children:[e.jsx(n,{size:"2",checked:!0}),"Size 2"]}),e.jsxs("label",{style:{display:"flex",alignItems:"center",gap:"10px",cursor:"pointer"},children:[e.jsx(n,{size:"3",checked:!0}),"Size 3"]})]})},V={render:()=>e.jsxs(I,{gap:"4",align:"center",children:[e.jsxs("label",{style:{display:"flex",alignItems:"center",gap:"8px",cursor:"pointer"},children:[e.jsx(n,{variant:"classic",checked:!0}),"Classic"]}),e.jsxs("label",{style:{display:"flex",alignItems:"center",gap:"8px",cursor:"pointer"},children:[e.jsx(n,{variant:"surface",checked:!0}),"Surface"]}),e.jsxs("label",{style:{display:"flex",alignItems:"center",gap:"8px",cursor:"pointer"},children:[e.jsx(n,{variant:"soft",checked:!0}),"Soft"]})]})},W={render:()=>e.jsxs(I,{direction:"column",gap:"2",children:[e.jsxs("label",{style:{display:"flex",alignItems:"center",gap:"8px",cursor:"pointer"},children:[e.jsx(n,{}),"Unchecked"]}),e.jsxs("label",{style:{display:"flex",alignItems:"center",gap:"8px",cursor:"pointer"},children:[e.jsx(n,{checked:!0}),"Checked"]}),e.jsxs("label",{style:{display:"flex",alignItems:"center",gap:"8px",cursor:"pointer"},children:[e.jsx(n,{checked:"indeterminate"}),"Indeterminate"]}),e.jsxs("label",{style:{display:"flex",alignItems:"center",gap:"8px",opacity:"0.6"},children:[e.jsx(n,{disabled:!0}),"Disabled"]}),e.jsxs("label",{style:{display:"flex",alignItems:"center",gap:"8px",opacity:"0.6"},children:[e.jsx(n,{disabled:!0,checked:!0}),"Disabled + Checked"]})]})},G={render:()=>e.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(6, 1fr)",gap:"12px"},children:["gray","gold","bronze","brown","yellow","amber","orange","tomato","red","ruby","crimson","pink","plum","purple","violet","iris","indigo","blue","cyan","teal","jade","green","grass","lime","mint","sky"].map(r=>e.jsxs("label",{style:{display:"flex",alignItems:"center",gap:"6px",cursor:"pointer"},children:[e.jsx(n,{color:r,checked:!0}),r]},r))})},U={render:()=>e.jsxs("div",{style:{maxWidth:"300px"},children:[e.jsx(re,{size:"3",weight:"bold",style:{marginBottom:"12px"},children:"Todo List"}),e.jsxs(I,{direction:"column",gap:"2",children:[e.jsxs("label",{style:{display:"flex",alignItems:"center",gap:"8px",cursor:"pointer"},children:[e.jsx(n,{checked:!0}),"Complete project setup"]}),e.jsxs("label",{style:{display:"flex",alignItems:"center",gap:"8px",cursor:"pointer"},children:[e.jsx(n,{checked:!0}),"Design system components"]}),e.jsxs("label",{style:{display:"flex",alignItems:"center",gap:"8px",cursor:"pointer"},children:[e.jsx(n,{checked:"indeterminate"}),"Write documentation (in progress)"]}),e.jsxs("label",{style:{display:"flex",alignItems:"center",gap:"8px",cursor:"pointer"},children:[e.jsx(n,{}),"Unit testing"]}),e.jsxs("label",{style:{display:"flex",alignItems:"center",gap:"8px",cursor:"pointer"},children:[e.jsx(n,{}),"Deploy to production"]})]})]})},q={render:()=>e.jsxs("div",{style:{maxWidth:"400px"},children:[e.jsx(re,{size:"3",weight:"bold",style:{marginBottom:"16px"},children:"Account Settings"}),e.jsxs(I,{direction:"column",gap:"3",children:[e.jsxs("label",{style:{display:"flex",alignItems:"center",gap:"8px",cursor:"pointer"},children:[e.jsx(n,{color:"blue",checked:!0}),"Enable email notifications"]}),e.jsxs("label",{style:{display:"flex",alignItems:"center",gap:"8px",cursor:"pointer"},children:[e.jsx(n,{color:"green"}),"Subscribe to newsletter"]}),e.jsxs("label",{style:{display:"flex",alignItems:"center",gap:"8px",cursor:"pointer"},children:[e.jsx(n,{color:"purple",checked:!0}),"Two-factor authentication"]}),e.jsxs("label",{style:{display:"flex",alignItems:"center",gap:"8px",cursor:"pointer"},children:[e.jsx(n,{color:"orange"}),"Beta features access"]}),e.jsx("div",{style:{marginTop:"16px",paddingTop:"12px",borderTop:"1px solid #e1e5e9"},children:e.jsxs("label",{style:{display:"flex",alignItems:"flex-start",gap:"8px",cursor:"pointer"},children:[e.jsx(n,{style:{marginTop:"2px"}}),e.jsxs("div",{children:[e.jsx("div",{children:"I agree to the Terms of Service and Privacy Policy"}),e.jsx("div",{style:{fontSize:"13px",color:"#666",marginTop:"2px"},children:"By checking this box, you acknowledge that you have read and agree to our terms."})]})]})})]})]})};S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  render: args => <label style={{
    display: "flex",
    alignItems: "center",
    gap: "8px",
    cursor: "pointer"
  }}>
      <Checkbox {...args} />
      Default Checkbox
    </label>
}`,...S.parameters?.docs?.source}}};v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  render: _args => <label style={{
    display: "flex",
    alignItems: "center",
    gap: "6px",
    cursor: "pointer"
  }}>
      <Checkbox size="1" />
      Size 1 (Small)
    </label>
}`,...v.parameters?.docs?.source}}};_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  render: _args => <label style={{
    display: "flex",
    alignItems: "center",
    gap: "8px",
    cursor: "pointer"
  }}>
      <Checkbox size="2" />
      Size 2 (Default)
    </label>
}`,..._.parameters?.docs?.source}}};z.parameters={...z.parameters,docs:{...z.parameters?.docs,source:{originalSource:`{
  render: _args => <label style={{
    display: "flex",
    alignItems: "center",
    gap: "10px",
    cursor: "pointer"
  }}>
      <Checkbox size="3" />
      Size 3 (Large)
    </label>
}`,...z.parameters?.docs?.source}}};P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`{
  render: _args => <label style={{
    display: "flex",
    alignItems: "center",
    gap: "8px",
    cursor: "pointer"
  }}>
      <Checkbox variant="classic" />
      Classic Variant
    </label>
}`,...P.parameters?.docs?.source}}};T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  render: _args => <label style={{
    display: "flex",
    alignItems: "center",
    gap: "8px",
    cursor: "pointer"
  }}>
      <Checkbox variant="surface" />
      Surface Variant
    </label>
}`,...T.parameters?.docs?.source}}};D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  render: _args => <label style={{
    display: "flex",
    alignItems: "center",
    gap: "8px",
    cursor: "pointer"
  }}>
      <Checkbox variant="soft" />
      Soft Variant
    </label>
}`,...D.parameters?.docs?.source}}};E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  render: _args => <label style={{
    display: "flex",
    alignItems: "center",
    gap: "8px",
    cursor: "pointer"
  }}>
      <Checkbox checked />
      Checked State
    </label>
}`,...E.parameters?.docs?.source}}};w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  render: _args => <label style={{
    display: "flex",
    alignItems: "center",
    gap: "8px",
    cursor: "pointer"
  }}>
      <Checkbox checked="indeterminate" />
      Indeterminate State
    </label>
}`,...w.parameters?.docs?.source}}};R.parameters={...R.parameters,docs:{...R.parameters?.docs,source:{originalSource:`{
  render: _args => <label style={{
    display: "flex",
    alignItems: "center",
    gap: "8px",
    opacity: "0.6"
  }}>
      <Checkbox disabled />
      Disabled State
    </label>
}`,...R.parameters?.docs?.source}}};B.parameters={...B.parameters,docs:{...B.parameters?.docs,source:{originalSource:`{
  render: _args => <label style={{
    display: "flex",
    alignItems: "center",
    gap: "8px",
    opacity: "0.6"
  }}>
      <Checkbox disabled checked />
      Disabled + Checked
    </label>
}`,...B.parameters?.docs?.source}}};F.parameters={...F.parameters,docs:{...F.parameters?.docs,source:{originalSource:`{
  render: _args => <label style={{
    display: "flex",
    alignItems: "center",
    gap: "8px",
    cursor: "pointer"
  }}>
      <Checkbox color="blue" checked />
      Blue Color
    </label>
}`,...F.parameters?.docs?.source}}};N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`{
  render: _args => <label style={{
    display: "flex",
    alignItems: "center",
    gap: "8px",
    cursor: "pointer"
  }}>
      <Checkbox color="red" checked />
      Red Color
    </label>
}`,...N.parameters?.docs?.source}}};A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
  render: _args => <label style={{
    display: "flex",
    alignItems: "center",
    gap: "8px",
    cursor: "pointer"
  }}>
      <Checkbox color="green" checked />
      Green Color
    </label>
}`,...A.parameters?.docs?.source}}};L.parameters={...L.parameters,docs:{...L.parameters?.docs,source:{originalSource:`{
  render: _args => <label style={{
    display: "flex",
    alignItems: "center",
    gap: "8px",
    cursor: "pointer"
  }}>
      <Checkbox color="purple" checked />
      Purple Color
    </label>
}`,...L.parameters?.docs?.source}}};H.parameters={...H.parameters,docs:{...H.parameters?.docs,source:{originalSource:`{
  render: _args => <label style={{
    display: "flex",
    alignItems: "center",
    gap: "8px",
    cursor: "pointer"
  }}>
      <Checkbox highContrast checked />
      High Contrast Mode
    </label>
}`,...H.parameters?.docs?.source}}};M.parameters={...M.parameters,docs:{...M.parameters?.docs,source:{originalSource:`{
  render: () => <Flex gap="4" align="center">
      <label style={{
      display: "flex",
      alignItems: "center",
      gap: "6px",
      cursor: "pointer"
    }}>
        <Checkbox size="1" checked />
        Size 1
      </label>
      <label style={{
      display: "flex",
      alignItems: "center",
      gap: "8px",
      cursor: "pointer"
    }}>
        <Checkbox size="2" checked />
        Size 2
      </label>
      <label style={{
      display: "flex",
      alignItems: "center",
      gap: "10px",
      cursor: "pointer"
    }}>
        <Checkbox size="3" checked />
        Size 3
      </label>
    </Flex>
}`,...M.parameters?.docs?.source}}};V.parameters={...V.parameters,docs:{...V.parameters?.docs,source:{originalSource:`{
  render: () => <Flex gap="4" align="center">
      <label style={{
      display: "flex",
      alignItems: "center",
      gap: "8px",
      cursor: "pointer"
    }}>
        <Checkbox variant="classic" checked />
        Classic
      </label>
      <label style={{
      display: "flex",
      alignItems: "center",
      gap: "8px",
      cursor: "pointer"
    }}>
        <Checkbox variant="surface" checked />
        Surface
      </label>
      <label style={{
      display: "flex",
      alignItems: "center",
      gap: "8px",
      cursor: "pointer"
    }}>
        <Checkbox variant="soft" checked />
        Soft
      </label>
    </Flex>
}`,...V.parameters?.docs?.source}}};W.parameters={...W.parameters,docs:{...W.parameters?.docs,source:{originalSource:`{
  render: () => <Flex direction="column" gap="2">
      <label style={{
      display: "flex",
      alignItems: "center",
      gap: "8px",
      cursor: "pointer"
    }}>
        <Checkbox />
        Unchecked
      </label>
      <label style={{
      display: "flex",
      alignItems: "center",
      gap: "8px",
      cursor: "pointer"
    }}>
        <Checkbox checked />
        Checked
      </label>
      <label style={{
      display: "flex",
      alignItems: "center",
      gap: "8px",
      cursor: "pointer"
    }}>
        <Checkbox checked="indeterminate" />
        Indeterminate
      </label>
      <label style={{
      display: "flex",
      alignItems: "center",
      gap: "8px",
      opacity: "0.6"
    }}>
        <Checkbox disabled />
        Disabled
      </label>
      <label style={{
      display: "flex",
      alignItems: "center",
      gap: "8px",
      opacity: "0.6"
    }}>
        <Checkbox disabled checked />
        Disabled + Checked
      </label>
    </Flex>
}`,...W.parameters?.docs?.source}}};G.parameters={...G.parameters,docs:{...G.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: "grid",
    gridTemplateColumns: "repeat(6, 1fr)",
    gap: "12px"
  }}>
      {["gray", "gold", "bronze", "brown", "yellow", "amber", "orange", "tomato", "red", "ruby", "crimson", "pink", "plum", "purple", "violet", "iris", "indigo", "blue", "cyan", "teal", "jade", "green", "grass", "lime", "mint", "sky"].map(color => <label key={color} style={{
      display: "flex",
      alignItems: "center",
      gap: "6px",
      cursor: "pointer"
    }}>
          <Checkbox color={color as any} checked />
          {color}
        </label>)}
    </div>
}`,...G.parameters?.docs?.source}}};U.parameters={...U.parameters,docs:{...U.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    maxWidth: "300px"
  }}>
      <Text size="3" weight="bold" style={{
      marginBottom: "12px"
    }}>
        Todo List
      </Text>
      <Flex direction="column" gap="2">
        <label style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        cursor: "pointer"
      }}>
          <Checkbox checked />
          Complete project setup
        </label>
        <label style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        cursor: "pointer"
      }}>
          <Checkbox checked />
          Design system components
        </label>
        <label style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        cursor: "pointer"
      }}>
          <Checkbox checked="indeterminate" />
          Write documentation (in progress)
        </label>
        <label style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        cursor: "pointer"
      }}>
          <Checkbox />
          Unit testing
        </label>
        <label style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        cursor: "pointer"
      }}>
          <Checkbox />
          Deploy to production
        </label>
      </Flex>
    </div>
}`,...U.parameters?.docs?.source}}};q.parameters={...q.parameters,docs:{...q.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    maxWidth: "400px"
  }}>
      <Text size="3" weight="bold" style={{
      marginBottom: "16px"
    }}>
        Account Settings
      </Text>

      <Flex direction="column" gap="3">
        <label style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        cursor: "pointer"
      }}>
          <Checkbox color="blue" checked />
          Enable email notifications
        </label>

        <label style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        cursor: "pointer"
      }}>
          <Checkbox color="green" />
          Subscribe to newsletter
        </label>

        <label style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        cursor: "pointer"
      }}>
          <Checkbox color="purple" checked />
          Two-factor authentication
        </label>

        <label style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        cursor: "pointer"
      }}>
          <Checkbox color="orange" />
          Beta features access
        </label>

        <div style={{
        marginTop: "16px",
        paddingTop: "12px",
        borderTop: "1px solid #e1e5e9"
      }}>
          <label style={{
          display: "flex",
          alignItems: "flex-start",
          gap: "8px",
          cursor: "pointer"
        }}>
            <Checkbox style={{
            marginTop: "2px"
          }} />
            <div>
              <div>I agree to the Terms of Service and Privacy Policy</div>
              <div style={{
              fontSize: "13px",
              color: "#666",
              marginTop: "2px"
            }}>
                By checking this box, you acknowledge that you have read and
                agree to our terms.
              </div>
            </div>
          </label>
        </div>
      </Flex>
    </div>
}`,...q.parameters?.docs?.source}}};const Ze=["Default","Size1","Size2","Size3","Classic","Surface","Soft","Checked","Indeterminate","Disabled","DisabledChecked","ColorBlue","ColorRed","ColorGreen","ColorPurple","HighContrast","AllSizes","AllVariants","AllStates","ColorPalette","TaskListExample","FormExample"];export{M as AllSizes,W as AllStates,V as AllVariants,E as Checked,P as Classic,F as ColorBlue,A as ColorGreen,G as ColorPalette,L as ColorPurple,N as ColorRed,S as Default,R as Disabled,B as DisabledChecked,q as FormExample,H as HighContrast,w as Indeterminate,v as Size1,_ as Size2,z as Size3,D as Soft,T as Surface,U as TaskListExample,Ze as __namedExportsOrder,Ye as default};
