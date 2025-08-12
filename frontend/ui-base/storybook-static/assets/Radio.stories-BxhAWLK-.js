import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{k as W,P,h as B,b as V,e as N,a as O,i as $,m as A}from"./high-contrast.prop-DN4VqJ5o.js";import{r as _}from"./iframe-DsuaOdjx.js";import"./avatar-RXesCRZq.js";import"./button-ClCv9eVs.js";import"./card-DfIScEG2.js";import{F as I}from"./flex-bym-5aeO.js";import"./icon-button-QpiRLWqf.js";import"./base-button-Dyf4vkZD.js";import{T as H}from"./theme-BFbej9HP.js";import"./index-CVlKO6je.js";import"./index-BW54sZL3.js";import"./preload-helper-D9Z9MdNV.js";import"./get-subtree-COcTOnEl.js";import"./radius.prop-BFb5uVoY.js";const D=P;D.dispatchDiscreteCustomEvent=W;D.Root=P;function G(a,R,C={checkForDefaultPrevented:!0}){return function(n){a?.(n),(!C.checkForDefaultPrevented||!n.defaultPrevented)&&R?.(n)}}const L=["1","2","3"],q=["classic","surface","soft"],M={size:{type:"enum",className:"rt-r-size",values:L,default:"2",responsive:!0},variant:{type:"enum",className:"rt-variant",values:q,default:"surface"},...V,...B},r=_.forwardRef((a,R)=>{const C=_.useRef(null),{className:k,color:n,onChange:w,onValueChange:F,...T}=N(a,M,A);return e.jsx("input",{type:"radio","data-accent-color":n,...T,onChange:G(w,E=>F?.(E.currentTarget.value)),ref:$(C,R),className:O("rt-reset","rt-BaseRadioRoot","rt-RadioRoot",k)})});r.displayName="Radio";r.__docgenInfo={description:"",methods:[],displayName:"Radio",props:{value:{required:!0,tsType:{name:"string"},description:""},onValueChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(value: string) => void",signature:{arguments:[{type:{name:"string"},name:"value"}],return:{name:"void"}}},description:""}},composes:["RadioInputProps"]};const ie={title:"Base/Radio",component:r,parameters:{layout:"centered"},decorators:[a=>e.jsx(H,{children:e.jsx(a,{})})],argTypes:{size:{control:"select",options:["1","2","3"],description:"Radio button size"},variant:{control:"select",options:["classic","surface","soft"],description:"Radio button variant style"},color:{control:"select",options:["gray","gold","bronze","brown","yellow","amber","orange","tomato","red","ruby","crimson","pink","plum","purple","violet","iris","indigo","blue","cyan","teal","jade","green","grass","lime","mint","sky"],description:"Radio button accent color"},highContrast:{control:"boolean",description:"High contrast mode"},disabled:{control:"boolean",description:"Disabled state"},checked:{control:"boolean",description:"Checked state (controlled)"}},args:{size:"2",variant:"surface"}},s={render:a=>e.jsxs("label",{style:{display:"flex",alignItems:"center",gap:"8px",cursor:"pointer"},children:[e.jsx(r,{...a,value:"default"}),"Default Radio"]})},l={render:a=>e.jsxs("label",{style:{display:"flex",alignItems:"center",gap:"8px",cursor:"pointer"},children:[e.jsx(r,{size:"1",value:"size1"}),"Size 1 (Small)"]})},o={render:a=>e.jsxs("label",{style:{display:"flex",alignItems:"center",gap:"8px",cursor:"pointer"},children:[e.jsx(r,{size:"2",value:"size2"}),"Size 2 (Default)"]})},t={render:a=>e.jsxs("label",{style:{display:"flex",alignItems:"center",gap:"8px",cursor:"pointer"},children:[e.jsx(r,{size:"3",value:"size3"}),"Size 3 (Large)"]})},i={render:a=>e.jsxs("label",{style:{display:"flex",alignItems:"center",gap:"8px",cursor:"pointer"},children:[e.jsx(r,{variant:"classic",value:"classic"}),"Classic Variant"]})},c={render:a=>e.jsxs("label",{style:{display:"flex",alignItems:"center",gap:"8px",cursor:"pointer"},children:[e.jsx(r,{variant:"surface",value:"surface"}),"Surface Variant"]})},p={render:a=>e.jsxs("label",{style:{display:"flex",alignItems:"center",gap:"8px",cursor:"pointer"},children:[e.jsx(r,{variant:"soft",value:"soft"}),"Soft Variant"]})},d={render:a=>e.jsxs("label",{style:{display:"flex",alignItems:"center",gap:"8px",cursor:"pointer"},children:[e.jsx(r,{checked:!0,value:"checked"}),"Checked State"]})},u={render:a=>e.jsxs("label",{style:{display:"flex",alignItems:"center",gap:"8px",opacity:"0.6"},children:[e.jsx(r,{disabled:!0,value:"disabled"}),"Disabled State"]})},g={render:a=>e.jsxs("label",{style:{display:"flex",alignItems:"center",gap:"8px",opacity:"0.6"},children:[e.jsx(r,{disabled:!0,checked:!0,value:"disabled-checked"}),"Disabled + Checked"]})},m={render:a=>e.jsxs("label",{style:{display:"flex",alignItems:"center",gap:"8px",cursor:"pointer"},children:[e.jsx(r,{color:"blue",checked:!0,value:"color-blue"}),"Blue Color"]})},x={render:a=>e.jsxs("label",{style:{display:"flex",alignItems:"center",gap:"8px",cursor:"pointer"},children:[e.jsx(r,{color:"red",checked:!0,value:"color-red"}),"Red Color"]})},y={render:a=>e.jsxs("label",{style:{display:"flex",alignItems:"center",gap:"8px",cursor:"pointer"},children:[e.jsx(r,{color:"green",checked:!0,value:"color-green"}),"Green Color"]})},b={render:a=>e.jsxs("label",{style:{display:"flex",alignItems:"center",gap:"8px",cursor:"pointer"},children:[e.jsx(r,{color:"purple",checked:!0,value:"color-purple"}),"Purple Color"]})},f={render:a=>e.jsxs("label",{style:{display:"flex",alignItems:"center",gap:"8px",cursor:"pointer"},children:[e.jsx(r,{highContrast:!0,checked:!0,value:"high-contrast"}),"High Contrast Mode"]})},h={render:()=>e.jsxs(I,{gap:"4",align:"center",children:[e.jsxs("label",{style:{display:"flex",alignItems:"center",gap:"6px",cursor:"pointer"},children:[e.jsx(r,{size:"1",checked:!0,value:"size1-showcase"}),"Size 1"]}),e.jsxs("label",{style:{display:"flex",alignItems:"center",gap:"8px",cursor:"pointer"},children:[e.jsx(r,{size:"2",checked:!0,value:"size2-showcase"}),"Size 2"]}),e.jsxs("label",{style:{display:"flex",alignItems:"center",gap:"10px",cursor:"pointer"},children:[e.jsx(r,{size:"3",checked:!0,value:"size3-showcase"}),"Size 3"]})]})},v={render:()=>e.jsxs(I,{gap:"4",align:"center",children:[e.jsxs("label",{style:{display:"flex",alignItems:"center",gap:"8px",cursor:"pointer"},children:[e.jsx(r,{variant:"classic",checked:!0,value:"classic-showcase"}),"Classic"]}),e.jsxs("label",{style:{display:"flex",alignItems:"center",gap:"8px",cursor:"pointer"},children:[e.jsx(r,{variant:"surface",checked:!0,value:"surface-showcase"}),"Surface"]}),e.jsxs("label",{style:{display:"flex",alignItems:"center",gap:"8px",cursor:"pointer"},children:[e.jsx(r,{variant:"soft",checked:!0,value:"soft-showcase"}),"Soft"]})]})},j={render:()=>e.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(6, 1fr)",gap:"12px"},children:["gray","gold","bronze","brown","yellow","amber","orange","tomato","red","ruby","crimson","pink","plum","purple","violet","iris","indigo","blue","cyan","teal","jade","green","grass","lime","mint","sky"].map(a=>e.jsxs("label",{style:{display:"flex",alignItems:"center",gap:"6px",cursor:"pointer"},children:[e.jsx(r,{color:a,checked:!0,value:`color-${a}`}),a]},a))})},S={render:()=>e.jsxs(I,{direction:"column",gap:"2",children:[e.jsxs("label",{style:{display:"flex",alignItems:"center",gap:"8px",cursor:"pointer"},children:[e.jsx(r,{name:"option",value:"option1"}),"Option 1"]}),e.jsxs("label",{style:{display:"flex",alignItems:"center",gap:"8px",cursor:"pointer"},children:[e.jsx(r,{name:"option",value:"option2"}),"Option 2"]}),e.jsxs("label",{style:{display:"flex",alignItems:"center",gap:"8px",cursor:"pointer"},children:[e.jsx(r,{name:"option",value:"option3"}),"Option 3"]})]})},z={render:()=>e.jsxs("div",{style:{maxWidth:"300px"},children:[e.jsx("h3",{style:{marginBottom:"12px",fontSize:"16px",fontWeight:"bold"},children:"Choose your plan"}),e.jsxs(I,{direction:"column",gap:"3",children:[e.jsxs("label",{style:{display:"flex",alignItems:"flex-start",gap:"8px",cursor:"pointer",padding:"8px",borderRadius:"6px",border:"1px solid #e1e5e9"},children:[e.jsx(r,{name:"plan",value:"basic",style:{marginTop:"2px"}}),e.jsxs("div",{children:[e.jsx("div",{style:{fontWeight:"bold"},children:"Basic Plan"}),e.jsx("div",{style:{fontSize:"14px",color:"#666"},children:"$9/month - Essential features"})]})]}),e.jsxs("label",{style:{display:"flex",alignItems:"flex-start",gap:"8px",cursor:"pointer",padding:"8px",borderRadius:"6px",border:"1px solid #e1e5e9"},children:[e.jsx(r,{name:"plan",value:"pro",style:{marginTop:"2px"}}),e.jsxs("div",{children:[e.jsx("div",{style:{fontWeight:"bold"},children:"Pro Plan"}),e.jsx("div",{style:{fontSize:"14px",color:"#666"},children:"$19/month - Advanced features"})]})]}),e.jsxs("label",{style:{display:"flex",alignItems:"flex-start",gap:"8px",cursor:"pointer",padding:"8px",borderRadius:"6px",border:"1px solid #e1e5e9"},children:[e.jsx(r,{name:"plan",value:"enterprise",style:{marginTop:"2px"}}),e.jsxs("div",{children:[e.jsx("div",{style:{fontWeight:"bold"},children:"Enterprise"}),e.jsx("div",{style:{fontSize:"14px",color:"#666"},children:"Contact us - Custom solution"})]})]})]})]})};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  render: args => <label style={{
    display: "flex",
    alignItems: "center",
    gap: "8px",
    cursor: "pointer"
  }}>
      <Radio {...args} value="default" />
      Default Radio
    </label>
}`,...s.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: _args => <label style={{
    display: "flex",
    alignItems: "center",
    gap: "8px",
    cursor: "pointer"
  }}>
      <Radio size="1" value="size1" />
      Size 1 (Small)
    </label>
}`,...l.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: _args => <label style={{
    display: "flex",
    alignItems: "center",
    gap: "8px",
    cursor: "pointer"
  }}>
      <Radio size="2" value="size2" />
      Size 2 (Default)
    </label>
}`,...o.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  render: _args => <label style={{
    display: "flex",
    alignItems: "center",
    gap: "8px",
    cursor: "pointer"
  }}>
      <Radio size="3" value="size3" />
      Size 3 (Large)
    </label>
}`,...t.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  render: _args => <label style={{
    display: "flex",
    alignItems: "center",
    gap: "8px",
    cursor: "pointer"
  }}>
      <Radio variant="classic" value="classic" />
      Classic Variant
    </label>
}`,...i.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  render: _args => <label style={{
    display: "flex",
    alignItems: "center",
    gap: "8px",
    cursor: "pointer"
  }}>
      <Radio variant="surface" value="surface" />
      Surface Variant
    </label>
}`,...c.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: _args => <label style={{
    display: "flex",
    alignItems: "center",
    gap: "8px",
    cursor: "pointer"
  }}>
      <Radio variant="soft" value="soft" />
      Soft Variant
    </label>
}`,...p.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  render: _args => <label style={{
    display: "flex",
    alignItems: "center",
    gap: "8px",
    cursor: "pointer"
  }}>
      <Radio checked value="checked" />
      Checked State
    </label>
}`,...d.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  render: _args => <label style={{
    display: "flex",
    alignItems: "center",
    gap: "8px",
    opacity: "0.6"
  }}>
      <Radio disabled value="disabled" />
      Disabled State
    </label>
}`,...u.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  render: _args => <label style={{
    display: "flex",
    alignItems: "center",
    gap: "8px",
    opacity: "0.6"
  }}>
      <Radio disabled checked value="disabled-checked" />
      Disabled + Checked
    </label>
}`,...g.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  render: _args => <label style={{
    display: "flex",
    alignItems: "center",
    gap: "8px",
    cursor: "pointer"
  }}>
      <Radio color="blue" checked value="color-blue" />
      Blue Color
    </label>
}`,...m.parameters?.docs?.source}}};x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  render: _args => <label style={{
    display: "flex",
    alignItems: "center",
    gap: "8px",
    cursor: "pointer"
  }}>
      <Radio color="red" checked value="color-red" />
      Red Color
    </label>
}`,...x.parameters?.docs?.source}}};y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  render: _args => <label style={{
    display: "flex",
    alignItems: "center",
    gap: "8px",
    cursor: "pointer"
  }}>
      <Radio color="green" checked value="color-green" />
      Green Color
    </label>
}`,...y.parameters?.docs?.source}}};b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  render: _args => <label style={{
    display: "flex",
    alignItems: "center",
    gap: "8px",
    cursor: "pointer"
  }}>
      <Radio color="purple" checked value="color-purple" />
      Purple Color
    </label>
}`,...b.parameters?.docs?.source}}};f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  render: _args => <label style={{
    display: "flex",
    alignItems: "center",
    gap: "8px",
    cursor: "pointer"
  }}>
      <Radio highContrast checked value="high-contrast" />
      High Contrast Mode
    </label>
}`,...f.parameters?.docs?.source}}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  render: () => <Flex gap="4" align="center">
      <label style={{
      display: "flex",
      alignItems: "center",
      gap: "6px",
      cursor: "pointer"
    }}>
        <Radio size="1" checked value="size1-showcase" />
        Size 1
      </label>
      <label style={{
      display: "flex",
      alignItems: "center",
      gap: "8px",
      cursor: "pointer"
    }}>
        <Radio size="2" checked value="size2-showcase" />
        Size 2
      </label>
      <label style={{
      display: "flex",
      alignItems: "center",
      gap: "10px",
      cursor: "pointer"
    }}>
        <Radio size="3" checked value="size3-showcase" />
        Size 3
      </label>
    </Flex>
}`,...h.parameters?.docs?.source}}};v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  render: () => <Flex gap="4" align="center">
      <label style={{
      display: "flex",
      alignItems: "center",
      gap: "8px",
      cursor: "pointer"
    }}>
        <Radio variant="classic" checked value="classic-showcase" />
        Classic
      </label>
      <label style={{
      display: "flex",
      alignItems: "center",
      gap: "8px",
      cursor: "pointer"
    }}>
        <Radio variant="surface" checked value="surface-showcase" />
        Surface
      </label>
      <label style={{
      display: "flex",
      alignItems: "center",
      gap: "8px",
      cursor: "pointer"
    }}>
        <Radio variant="soft" checked value="soft-showcase" />
        Soft
      </label>
    </Flex>
}`,...v.parameters?.docs?.source}}};j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
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
          <Radio color={color as any} checked value={\`color-\${color}\`} />
          {color}
        </label>)}
    </div>
}`,...j.parameters?.docs?.source}}};S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  render: () => <Flex direction="column" gap="2">
      <label style={{
      display: "flex",
      alignItems: "center",
      gap: "8px",
      cursor: "pointer"
    }}>
        <Radio name="option" value="option1" />
        Option 1
      </label>
      <label style={{
      display: "flex",
      alignItems: "center",
      gap: "8px",
      cursor: "pointer"
    }}>
        <Radio name="option" value="option2" />
        Option 2
      </label>
      <label style={{
      display: "flex",
      alignItems: "center",
      gap: "8px",
      cursor: "pointer"
    }}>
        <Radio name="option" value="option3" />
        Option 3
      </label>
    </Flex>
}`,...S.parameters?.docs?.source}}};z.parameters={...z.parameters,docs:{...z.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    maxWidth: "300px"
  }}>
      <h3 style={{
      marginBottom: "12px",
      fontSize: "16px",
      fontWeight: "bold"
    }}>
        Choose your plan
      </h3>
      <Flex direction="column" gap="3">
        <label style={{
        display: "flex",
        alignItems: "flex-start",
        gap: "8px",
        cursor: "pointer",
        padding: "8px",
        borderRadius: "6px",
        border: "1px solid #e1e5e9"
      }}>
          <Radio name="plan" value="basic" style={{
          marginTop: "2px"
        }} />
          <div>
            <div style={{
            fontWeight: "bold"
          }}>Basic Plan</div>
            <div style={{
            fontSize: "14px",
            color: "#666"
          }}>
              $9/month - Essential features
            </div>
          </div>
        </label>
        <label style={{
        display: "flex",
        alignItems: "flex-start",
        gap: "8px",
        cursor: "pointer",
        padding: "8px",
        borderRadius: "6px",
        border: "1px solid #e1e5e9"
      }}>
          <Radio name="plan" value="pro" style={{
          marginTop: "2px"
        }} />
          <div>
            <div style={{
            fontWeight: "bold"
          }}>Pro Plan</div>
            <div style={{
            fontSize: "14px",
            color: "#666"
          }}>
              $19/month - Advanced features
            </div>
          </div>
        </label>
        <label style={{
        display: "flex",
        alignItems: "flex-start",
        gap: "8px",
        cursor: "pointer",
        padding: "8px",
        borderRadius: "6px",
        border: "1px solid #e1e5e9"
      }}>
          <Radio name="plan" value="enterprise" style={{
          marginTop: "2px"
        }} />
          <div>
            <div style={{
            fontWeight: "bold"
          }}>Enterprise</div>
            <div style={{
            fontSize: "14px",
            color: "#666"
          }}>
              Contact us - Custom solution
            </div>
          </div>
        </label>
      </Flex>
    </div>
}`,...z.parameters?.docs?.source}}};const ce=["Default","Size1","Size2","Size3","Classic","Surface","Soft","Checked","Disabled","DisabledChecked","ColorBlue","ColorRed","ColorGreen","ColorPurple","HighContrast","AllSizes","AllVariants","ColorPalette","WithLabels","FormExample"];export{h as AllSizes,v as AllVariants,d as Checked,i as Classic,m as ColorBlue,y as ColorGreen,j as ColorPalette,b as ColorPurple,x as ColorRed,s as Default,u as Disabled,g as DisabledChecked,z as FormExample,f as HighContrast,l as Size1,o as Size2,t as Size3,p as Soft,c as Surface,S as WithLabels,ce as __namedExportsOrder,ie as default};
