import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{r as l}from"./iframe-DsuaOdjx.js";import{c as se,a as re,f as te,T as ae}from"./theme-BFbej9HP.js";import{u as X,P as $,h as ie,b as le,e as ce,a as U,m as oe}from"./high-contrast.prop-DN4VqJ5o.js";import{u as de}from"./index-Bg7roRMb.js";import{u as pe}from"./index-CkjKNTH6.js";import{r as ue}from"./radius.prop-BFb5uVoY.js";import"./avatar-RXesCRZq.js";import"./button-ClCv9eVs.js";import"./card-DfIScEG2.js";import{F as o}from"./flex-bym-5aeO.js";import"./icon-button-QpiRLWqf.js";import"./base-button-Dyf4vkZD.js";import{T as r}from"./text-Bwa-Y73d.js";import"./preload-helper-D9Z9MdNV.js";import"./index-CVlKO6je.js";import"./index-BW54sZL3.js";import"./get-subtree-COcTOnEl.js";import"./weight.prop-Rt1sSGdE.js";var V="Switch",[xe,Me]=se(V),[me,ge]=xe(V),J=l.forwardRef((s,c)=>{const{__scopeSwitch:t,name:i,checked:a,defaultChecked:u,required:x,disabled:d,value:m="on",onCheckedChange:H,form:p,...M}=s,[g,h]=l.useState(null),G=X(c,f=>h(f)),L=l.useRef(!1),W=g?p||!!g.closest("form"):!0,[y,ee]=de({prop:a,defaultProp:u??!1,onChange:H,caller:V});return e.jsxs(me,{scope:t,checked:y,disabled:d,children:[e.jsx($.button,{type:"button",role:"switch","aria-checked":y,"aria-required":x,"data-state":Z(y),"data-disabled":d?"":void 0,disabled:d,value:m,...M,ref:G,onClick:re(s.onClick,f=>{ee(ne=>!ne),W&&(L.current=f.isPropagationStopped(),L.current||f.stopPropagation())})}),W&&e.jsx(Y,{control:g,bubbles:!L.current,name:i,value:m,checked:y,required:x,disabled:d,form:p,style:{transform:"translateX(-100%)"}})]})});J.displayName=V;var K="SwitchThumb",Q=l.forwardRef((s,c)=>{const{__scopeSwitch:t,...i}=s,a=ge(K,t);return e.jsx($.span,{"data-state":Z(a.checked),"data-disabled":a.disabled?"":void 0,...i,ref:c})});Q.displayName=K;var he="SwitchBubbleInput",Y=l.forwardRef(({__scopeSwitch:s,control:c,checked:t,bubbles:i=!0,...a},u)=>{const x=l.useRef(null),d=X(x,u),m=pe(t),H=te(c);return l.useEffect(()=>{const p=x.current;if(!p)return;const M=window.HTMLInputElement.prototype,h=Object.getOwnPropertyDescriptor(M,"checked").set;if(m!==t&&h){const G=new Event("click",{bubbles:i});h.call(p,t),p.dispatchEvent(G)}},[m,t,i]),e.jsx("input",{type:"checkbox","aria-hidden":!0,defaultChecked:t,...a,tabIndex:-1,ref:d,style:{...a.style,...H,position:"absolute",pointerEvents:"none",opacity:0,margin:0}})});Y.displayName=he;function Z(s){return s?"checked":"unchecked"}var ye=J,fe=Q;const be=["1","2","3"],Se=["classic","surface","soft"],je={size:{type:"enum",className:"rt-r-size",values:be,default:"2",responsive:!0},variant:{type:"enum",className:"rt-variant",values:Se,default:"surface"},...le,...ie,...ue},q={Root:ye,Thumb:fe},n=l.forwardRef((s,c)=>{const{className:t,color:i,radius:a,...u}=ce(s,je,oe);return e.jsx(q.Root,{"data-accent-color":i,"data-radius":a,...u,asChild:!1,ref:c,className:U("rt-reset","rt-SwitchRoot",t),children:e.jsx(q.Thumb,{className:U("rt-SwitchThumb",{"rt-high-contrast":s.highContrast})})})});n.displayName="Switch";n.__docgenInfo={description:"",methods:[],displayName:"Switch",composes:["ComponentPropsWithout"]};const Ge={title:"Base/Switch",component:n,parameters:{layout:"centered"},decorators:[s=>e.jsx(ae,{children:e.jsx(s,{})})],argTypes:{size:{control:"select",options:["1","2","3"],description:"Switch size"},variant:{control:"select",options:["classic","surface","soft"],description:"Switch variant style"},color:{control:"select",options:["gray","gold","bronze","brown","yellow","amber","orange","tomato","red","ruby","crimson","pink","plum","purple","violet","iris","indigo","blue","cyan","teal","jade","green","grass","lime","mint","sky"],description:"Switch accent color"},highContrast:{control:"boolean",description:"High contrast mode"},disabled:{control:"boolean",description:"Disabled state"},checked:{control:"boolean",description:"Checked state (controlled)"}},args:{size:"2",variant:"surface"}},b={render:s=>e.jsxs("label",{style:{display:"flex",alignItems:"center",gap:"8px",cursor:"pointer"},children:[e.jsx(n,{...s}),"Default Switch"]})},S={render:s=>e.jsxs("label",{style:{display:"flex",alignItems:"center",gap:"6px",cursor:"pointer"},children:[e.jsx(n,{size:"1"}),"Size 1 (Small)"]})},j={render:s=>e.jsxs("label",{style:{display:"flex",alignItems:"center",gap:"8px",cursor:"pointer"},children:[e.jsx(n,{size:"2"}),"Size 2 (Default)"]})},w={render:s=>e.jsxs("label",{style:{display:"flex",alignItems:"center",gap:"10px",cursor:"pointer"},children:[e.jsx(n,{size:"3"}),"Size 3 (Large)"]})},v={render:s=>e.jsxs("label",{style:{display:"flex",alignItems:"center",gap:"8px",cursor:"pointer"},children:[e.jsx(n,{variant:"classic"}),"Classic Variant"]})},z={render:s=>e.jsxs("label",{style:{display:"flex",alignItems:"center",gap:"8px",cursor:"pointer"},children:[e.jsx(n,{variant:"surface"}),"Surface Variant"]})},C={render:s=>e.jsxs("label",{style:{display:"flex",alignItems:"center",gap:"8px",cursor:"pointer"},children:[e.jsx(n,{variant:"soft"}),"Soft Variant"]})},I={render:s=>e.jsxs("label",{style:{display:"flex",alignItems:"center",gap:"8px",cursor:"pointer"},children:[e.jsx(n,{checked:!0}),"Checked State"]})},k={render:s=>e.jsxs("label",{style:{display:"flex",alignItems:"center",gap:"8px",opacity:"0.6"},children:[e.jsx(n,{disabled:!0}),"Disabled State"]})},T={render:s=>e.jsxs("label",{style:{display:"flex",alignItems:"center",gap:"8px",opacity:"0.6"},children:[e.jsx(n,{disabled:!0,checked:!0}),"Disabled + Checked"]})},_={render:s=>e.jsxs("label",{style:{display:"flex",alignItems:"center",gap:"8px",cursor:"pointer"},children:[e.jsx(n,{color:"blue",checked:!0}),"Blue Color"]})},P={render:s=>e.jsxs("label",{style:{display:"flex",alignItems:"center",gap:"8px",cursor:"pointer"},children:[e.jsx(n,{color:"red",checked:!0}),"Red Color"]})},D={render:s=>e.jsxs("label",{style:{display:"flex",alignItems:"center",gap:"8px",cursor:"pointer"},children:[e.jsx(n,{color:"green",checked:!0}),"Green Color"]})},B={render:s=>e.jsxs("label",{style:{display:"flex",alignItems:"center",gap:"8px",cursor:"pointer"},children:[e.jsx(n,{color:"purple",checked:!0}),"Purple Color"]})},F={render:s=>e.jsxs("label",{style:{display:"flex",alignItems:"center",gap:"8px",cursor:"pointer"},children:[e.jsx(n,{highContrast:!0,checked:!0}),"High Contrast Mode"]})},N={render:()=>e.jsxs(o,{gap:"4",align:"center",children:[e.jsxs("label",{style:{display:"flex",alignItems:"center",gap:"6px",cursor:"pointer"},children:[e.jsx(n,{size:"1",checked:!0}),"Size 1"]}),e.jsxs("label",{style:{display:"flex",alignItems:"center",gap:"8px",cursor:"pointer"},children:[e.jsx(n,{size:"2",checked:!0}),"Size 2"]}),e.jsxs("label",{style:{display:"flex",alignItems:"center",gap:"10px",cursor:"pointer"},children:[e.jsx(n,{size:"3",checked:!0}),"Size 3"]})]})},R={render:()=>e.jsxs(o,{gap:"4",align:"center",children:[e.jsxs("label",{style:{display:"flex",alignItems:"center",gap:"8px",cursor:"pointer"},children:[e.jsx(n,{variant:"classic",checked:!0}),"Classic"]}),e.jsxs("label",{style:{display:"flex",alignItems:"center",gap:"8px",cursor:"pointer"},children:[e.jsx(n,{variant:"surface",checked:!0}),"Surface"]}),e.jsxs("label",{style:{display:"flex",alignItems:"center",gap:"8px",cursor:"pointer"},children:[e.jsx(n,{variant:"soft",checked:!0}),"Soft"]})]})},A={render:()=>e.jsxs(o,{direction:"column",gap:"2",children:[e.jsxs("label",{style:{display:"flex",alignItems:"center",gap:"8px",cursor:"pointer"},children:[e.jsx(n,{}),"Off"]}),e.jsxs("label",{style:{display:"flex",alignItems:"center",gap:"8px",cursor:"pointer"},children:[e.jsx(n,{checked:!0}),"On"]}),e.jsxs("label",{style:{display:"flex",alignItems:"center",gap:"8px",opacity:"0.6"},children:[e.jsx(n,{disabled:!0}),"Disabled Off"]}),e.jsxs("label",{style:{display:"flex",alignItems:"center",gap:"8px",opacity:"0.6"},children:[e.jsx(n,{disabled:!0,checked:!0}),"Disabled On"]})]})},E={render:()=>e.jsxs("div",{style:{maxWidth:"350px"},children:[e.jsx(r,{size:"3",weight:"bold",style:{marginBottom:"16px"},children:"Notification Settings"}),e.jsxs(o,{direction:"column",gap:"3",children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between"},children:[e.jsxs("div",{children:[e.jsx(r,{size:"2",weight:"medium",children:"Email Notifications"}),e.jsx(r,{size:"1",color:"gray",children:"Receive updates via email"})]}),e.jsx(n,{color:"blue",checked:!0})]}),e.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between"},children:[e.jsxs("div",{children:[e.jsx(r,{size:"2",weight:"medium",children:"Push Notifications"}),e.jsx(r,{size:"1",color:"gray",children:"Get notified on your device"})]}),e.jsx(n,{color:"green"})]}),e.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between"},children:[e.jsxs("div",{children:[e.jsx(r,{size:"2",weight:"medium",children:"Dark Mode"}),e.jsx(r,{size:"1",color:"gray",children:"Switch to dark theme"})]}),e.jsx(n,{color:"purple",checked:!0})]}),e.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between"},children:[e.jsxs("div",{children:[e.jsx(r,{size:"2",weight:"medium",children:"Auto-save"}),e.jsx(r,{size:"1",color:"gray",children:"Automatically save your work"})]}),e.jsx(n,{color:"orange",checked:!0})]}),e.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",opacity:"0.6"},children:[e.jsxs("div",{children:[e.jsx(r,{size:"2",weight:"medium",children:"Beta Features"}),e.jsx(r,{size:"1",color:"gray",children:"Access experimental features (unavailable)"})]}),e.jsx(n,{disabled:!0})]})]})]})},O={render:()=>e.jsxs("div",{style:{maxWidth:"400px"},children:[e.jsx(r,{size:"3",weight:"bold",style:{marginBottom:"16px"},children:"Privacy & Security"}),e.jsxs(o,{direction:"column",gap:"4",children:[e.jsxs("div",{children:[e.jsx(r,{size:"2",weight:"medium",style:{marginBottom:"8px"},children:"Account Visibility"}),e.jsxs(o,{direction:"column",gap:"2",children:[e.jsxs("label",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",cursor:"pointer"},children:[e.jsx(r,{size:"2",children:"Public profile"}),e.jsx(n,{size:"1",color:"blue"})]}),e.jsxs("label",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",cursor:"pointer"},children:[e.jsx(r,{size:"2",children:"Show activity status"}),e.jsx(n,{size:"1",color:"green",checked:!0})]}),e.jsxs("label",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",cursor:"pointer"},children:[e.jsx(r,{size:"2",children:"Allow search by email"}),e.jsx(n,{size:"1",color:"orange"})]})]})]}),e.jsxs("div",{children:[e.jsx(r,{size:"2",weight:"medium",style:{marginBottom:"8px"},children:"Security Features"}),e.jsxs(o,{direction:"column",gap:"2",children:[e.jsxs("label",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",cursor:"pointer"},children:[e.jsx(r,{size:"2",children:"Two-factor authentication"}),e.jsx(n,{color:"red",checked:!0})]}),e.jsxs("label",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",cursor:"pointer"},children:[e.jsx(r,{size:"2",children:"Login notifications"}),e.jsx(n,{color:"purple",checked:!0})]}),e.jsxs("label",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",cursor:"pointer"},children:[e.jsx(r,{size:"2",children:"Session timeout"}),e.jsx(n,{color:"cyan"})]})]})]})]})]})};b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  render: args => <label style={{
    display: "flex",
    alignItems: "center",
    gap: "8px",
    cursor: "pointer"
  }}>
      <Switch {...args} />
      Default Switch
    </label>
}`,...b.parameters?.docs?.source}}};S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  render: _args => <label style={{
    display: "flex",
    alignItems: "center",
    gap: "6px",
    cursor: "pointer"
  }}>
      <Switch size="1" />
      Size 1 (Small)
    </label>
}`,...S.parameters?.docs?.source}}};j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  render: _args => <label style={{
    display: "flex",
    alignItems: "center",
    gap: "8px",
    cursor: "pointer"
  }}>
      <Switch size="2" />
      Size 2 (Default)
    </label>
}`,...j.parameters?.docs?.source}}};w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  render: _args => <label style={{
    display: "flex",
    alignItems: "center",
    gap: "10px",
    cursor: "pointer"
  }}>
      <Switch size="3" />
      Size 3 (Large)
    </label>
}`,...w.parameters?.docs?.source}}};v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  render: _args => <label style={{
    display: "flex",
    alignItems: "center",
    gap: "8px",
    cursor: "pointer"
  }}>
      <Switch variant="classic" />
      Classic Variant
    </label>
}`,...v.parameters?.docs?.source}}};z.parameters={...z.parameters,docs:{...z.parameters?.docs,source:{originalSource:`{
  render: _args => <label style={{
    display: "flex",
    alignItems: "center",
    gap: "8px",
    cursor: "pointer"
  }}>
      <Switch variant="surface" />
      Surface Variant
    </label>
}`,...z.parameters?.docs?.source}}};C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  render: _args => <label style={{
    display: "flex",
    alignItems: "center",
    gap: "8px",
    cursor: "pointer"
  }}>
      <Switch variant="soft" />
      Soft Variant
    </label>
}`,...C.parameters?.docs?.source}}};I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:`{
  render: _args => <label style={{
    display: "flex",
    alignItems: "center",
    gap: "8px",
    cursor: "pointer"
  }}>
      <Switch checked />
      Checked State
    </label>
}`,...I.parameters?.docs?.source}}};k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  render: _args => <label style={{
    display: "flex",
    alignItems: "center",
    gap: "8px",
    opacity: "0.6"
  }}>
      <Switch disabled />
      Disabled State
    </label>
}`,...k.parameters?.docs?.source}}};T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  render: _args => <label style={{
    display: "flex",
    alignItems: "center",
    gap: "8px",
    opacity: "0.6"
  }}>
      <Switch disabled checked />
      Disabled + Checked
    </label>
}`,...T.parameters?.docs?.source}}};_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  render: _args => <label style={{
    display: "flex",
    alignItems: "center",
    gap: "8px",
    cursor: "pointer"
  }}>
      <Switch color="blue" checked />
      Blue Color
    </label>
}`,..._.parameters?.docs?.source}}};P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`{
  render: _args => <label style={{
    display: "flex",
    alignItems: "center",
    gap: "8px",
    cursor: "pointer"
  }}>
      <Switch color="red" checked />
      Red Color
    </label>
}`,...P.parameters?.docs?.source}}};D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  render: _args => <label style={{
    display: "flex",
    alignItems: "center",
    gap: "8px",
    cursor: "pointer"
  }}>
      <Switch color="green" checked />
      Green Color
    </label>
}`,...D.parameters?.docs?.source}}};B.parameters={...B.parameters,docs:{...B.parameters?.docs,source:{originalSource:`{
  render: _args => <label style={{
    display: "flex",
    alignItems: "center",
    gap: "8px",
    cursor: "pointer"
  }}>
      <Switch color="purple" checked />
      Purple Color
    </label>
}`,...B.parameters?.docs?.source}}};F.parameters={...F.parameters,docs:{...F.parameters?.docs,source:{originalSource:`{
  render: _args => <label style={{
    display: "flex",
    alignItems: "center",
    gap: "8px",
    cursor: "pointer"
  }}>
      <Switch highContrast checked />
      High Contrast Mode
    </label>
}`,...F.parameters?.docs?.source}}};N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`{
  render: () => <Flex gap="4" align="center">
      <label style={{
      display: "flex",
      alignItems: "center",
      gap: "6px",
      cursor: "pointer"
    }}>
        <Switch size="1" checked />
        Size 1
      </label>
      <label style={{
      display: "flex",
      alignItems: "center",
      gap: "8px",
      cursor: "pointer"
    }}>
        <Switch size="2" checked />
        Size 2
      </label>
      <label style={{
      display: "flex",
      alignItems: "center",
      gap: "10px",
      cursor: "pointer"
    }}>
        <Switch size="3" checked />
        Size 3
      </label>
    </Flex>
}`,...N.parameters?.docs?.source}}};R.parameters={...R.parameters,docs:{...R.parameters?.docs,source:{originalSource:`{
  render: () => <Flex gap="4" align="center">
      <label style={{
      display: "flex",
      alignItems: "center",
      gap: "8px",
      cursor: "pointer"
    }}>
        <Switch variant="classic" checked />
        Classic
      </label>
      <label style={{
      display: "flex",
      alignItems: "center",
      gap: "8px",
      cursor: "pointer"
    }}>
        <Switch variant="surface" checked />
        Surface
      </label>
      <label style={{
      display: "flex",
      alignItems: "center",
      gap: "8px",
      cursor: "pointer"
    }}>
        <Switch variant="soft" checked />
        Soft
      </label>
    </Flex>
}`,...R.parameters?.docs?.source}}};A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
  render: () => <Flex direction="column" gap="2">
      <label style={{
      display: "flex",
      alignItems: "center",
      gap: "8px",
      cursor: "pointer"
    }}>
        <Switch />
        Off
      </label>
      <label style={{
      display: "flex",
      alignItems: "center",
      gap: "8px",
      cursor: "pointer"
    }}>
        <Switch checked />
        On
      </label>
      <label style={{
      display: "flex",
      alignItems: "center",
      gap: "8px",
      opacity: "0.6"
    }}>
        <Switch disabled />
        Disabled Off
      </label>
      <label style={{
      display: "flex",
      alignItems: "center",
      gap: "8px",
      opacity: "0.6"
    }}>
        <Switch disabled checked />
        Disabled On
      </label>
    </Flex>
}`,...A.parameters?.docs?.source}}};E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    maxWidth: "350px"
  }}>
      <Text size="3" weight="bold" style={{
      marginBottom: "16px"
    }}>
        Notification Settings
      </Text>

      <Flex direction="column" gap="3">
        <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
      }}>
          <div>
            <Text size="2" weight="medium">
              Email Notifications
            </Text>
            <Text size="1" color="gray">
              Receive updates via email
            </Text>
          </div>
          <Switch color="blue" checked />
        </div>

        <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
      }}>
          <div>
            <Text size="2" weight="medium">
              Push Notifications
            </Text>
            <Text size="1" color="gray">
              Get notified on your device
            </Text>
          </div>
          <Switch color="green" />
        </div>

        <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
      }}>
          <div>
            <Text size="2" weight="medium">
              Dark Mode
            </Text>
            <Text size="1" color="gray">
              Switch to dark theme
            </Text>
          </div>
          <Switch color="purple" checked />
        </div>

        <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
      }}>
          <div>
            <Text size="2" weight="medium">
              Auto-save
            </Text>
            <Text size="1" color="gray">
              Automatically save your work
            </Text>
          </div>
          <Switch color="orange" checked />
        </div>

        <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        opacity: "0.6"
      }}>
          <div>
            <Text size="2" weight="medium">
              Beta Features
            </Text>
            <Text size="1" color="gray">
              Access experimental features (unavailable)
            </Text>
          </div>
          <Switch disabled />
        </div>
      </Flex>
    </div>
}`,...E.parameters?.docs?.source}}};O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    maxWidth: "400px"
  }}>
      <Text size="3" weight="bold" style={{
      marginBottom: "16px"
    }}>
        Privacy & Security
      </Text>

      <Flex direction="column" gap="4">
        <div>
          <Text size="2" weight="medium" style={{
          marginBottom: "8px"
        }}>
            Account Visibility
          </Text>
          <Flex direction="column" gap="2">
            <label style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            cursor: "pointer"
          }}>
              <Text size="2">Public profile</Text>
              <Switch size="1" color="blue" />
            </label>
            <label style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            cursor: "pointer"
          }}>
              <Text size="2">Show activity status</Text>
              <Switch size="1" color="green" checked />
            </label>
            <label style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            cursor: "pointer"
          }}>
              <Text size="2">Allow search by email</Text>
              <Switch size="1" color="orange" />
            </label>
          </Flex>
        </div>

        <div>
          <Text size="2" weight="medium" style={{
          marginBottom: "8px"
        }}>
            Security Features
          </Text>
          <Flex direction="column" gap="2">
            <label style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            cursor: "pointer"
          }}>
              <Text size="2">Two-factor authentication</Text>
              <Switch color="red" checked />
            </label>
            <label style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            cursor: "pointer"
          }}>
              <Text size="2">Login notifications</Text>
              <Switch color="purple" checked />
            </label>
            <label style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            cursor: "pointer"
          }}>
              <Text size="2">Session timeout</Text>
              <Switch color="cyan" />
            </label>
          </Flex>
        </div>
      </Flex>
    </div>
}`,...O.parameters?.docs?.source}}};const Le=["Default","Size1","Size2","Size3","Classic","Surface","Soft","Checked","Disabled","DisabledChecked","ColorBlue","ColorRed","ColorGreen","ColorPurple","HighContrast","AllSizes","AllVariants","AllStates","SettingsExample","PrivacyExample"];export{N as AllSizes,A as AllStates,R as AllVariants,I as Checked,v as Classic,_ as ColorBlue,D as ColorGreen,B as ColorPurple,P as ColorRed,b as Default,k as Disabled,T as DisabledChecked,F as HighContrast,O as PrivacyExample,E as SettingsExample,S as Size1,j as Size2,w as Size3,C as Soft,z as Surface,Le as __namedExportsOrder,Ge as default};
