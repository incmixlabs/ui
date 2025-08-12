import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{r as l}from"./iframe-DsuaOdjx.js";import{S as f}from"./separator-BmwpDelq.js";import"./avatar-RXesCRZq.js";import"./button-ClCv9eVs.js";import"./card-DfIScEG2.js";import{h as pe,w as M,F as h}from"./flex-bym-5aeO.js";import"./icon-button-QpiRLWqf.js";import{g as H,R as de,c as ce,a as b,A as K,P as q,D as xe,C as ue,h as ge,T as J}from"./theme-BFbej9HP.js";import{u as Q,P as $,c as he,d as me,e as ve,a as ye}from"./high-contrast.prop-DN4VqJ5o.js";import{P as fe,h as je,R as Pe,u as Ce,F as be,r as U}from"./require-react-element-BySUkP0S.js";import{u as we}from"./index-FlXuF2W-.js";import{u as Te}from"./index-Bg7roRMb.js";import"./base-button-Dyf4vkZD.js";import{T as a}from"./text-Bwa-Y73d.js";import{B as p}from"./button-jOk6Qw9K.js";import{I as W}from"./icon-button-eAI2XZbo.js";import"./preload-helper-D9Z9MdNV.js";import"./get-subtree-COcTOnEl.js";import"./radius.prop-BFb5uVoY.js";import"./index-CVlKO6je.js";import"./index-BW54sZL3.js";import"./weight.prop-Rt1sSGdE.js";var N="Popover",[Y,xn]=ce(N,[H]),w=H(),[ze,m]=Y(N),G=n=>{const{__scopePopover:t,children:o,open:s,defaultOpen:r,onOpenChange:i,modal:d=!1}=n,c=w(t),v=l.useRef(null),[C,T]=l.useState(!1),[z,y]=Te({prop:s,defaultProp:r??!1,onChange:i,caller:N});return e.jsx(de,{...c,children:e.jsx(ze,{scope:t,contentId:we(),triggerRef:v,open:z,onOpenChange:y,onOpenToggle:l.useCallback(()=>y(E=>!E),[y]),hasCustomAnchor:C,onCustomAnchorAdd:l.useCallback(()=>T(!0),[]),onCustomAnchorRemove:l.useCallback(()=>T(!1),[]),modal:d,children:o})})};G.displayName=N;var V="PopoverAnchor",Z=l.forwardRef((n,t)=>{const{__scopePopover:o,...s}=n,r=m(V,o),i=w(o),{onCustomAnchorAdd:d,onCustomAnchorRemove:c}=r;return l.useEffect(()=>(d(),()=>c()),[d,c]),e.jsx(K,{...i,...s,ref:t})});Z.displayName=V;var X="PopoverTrigger",ee=l.forwardRef((n,t)=>{const{__scopePopover:o,...s}=n,r=m(X,o),i=w(o),d=Q(t,r.triggerRef),c=e.jsx($.button,{type:"button","aria-haspopup":"dialog","aria-expanded":r.open,"aria-controls":r.contentId,"data-state":ie(r.open),...s,ref:d,onClick:b(n.onClick,r.onOpenToggle)});return r.hasCustomAnchor?c:e.jsx(K,{asChild:!0,...i,children:c})});ee.displayName=X;var L="PopoverPortal",[Se,Re]=Y(L,{forceMount:void 0}),ne=n=>{const{__scopePopover:t,forceMount:o,children:s,container:r}=n,i=m(L,t);return e.jsx(Se,{scope:t,forceMount:o,children:e.jsx(q,{present:o||i.open,children:e.jsx(fe,{asChild:!0,container:r,children:s})})})};ne.displayName=L;var j="PopoverContent",te=l.forwardRef((n,t)=>{const o=Re(j,n.__scopePopover),{forceMount:s=o.forceMount,...r}=n,i=m(j,n.__scopePopover);return e.jsx(q,{present:s||i.open,children:i.modal?e.jsx(ke,{...r,ref:t}):e.jsx(Ae,{...r,ref:t})})});te.displayName=j;var Be=he("PopoverContent.RemoveScroll"),ke=l.forwardRef((n,t)=>{const o=m(j,n.__scopePopover),s=l.useRef(null),r=Q(t,s),i=l.useRef(!1);return l.useEffect(()=>{const d=s.current;if(d)return je(d)},[]),e.jsx(Pe,{as:Be,allowPinchZoom:!0,children:e.jsx(oe,{...n,ref:r,trapFocus:o.open,disableOutsidePointerEvents:!0,onCloseAutoFocus:b(n.onCloseAutoFocus,d=>{d.preventDefault(),i.current||o.triggerRef.current?.focus()}),onPointerDownOutside:b(n.onPointerDownOutside,d=>{const c=d.detail.originalEvent,v=c.button===0&&c.ctrlKey===!0,C=c.button===2||v;i.current=C},{checkForDefaultPrevented:!1}),onFocusOutside:b(n.onFocusOutside,d=>d.preventDefault(),{checkForDefaultPrevented:!1})})})}),Ae=l.forwardRef((n,t)=>{const o=m(j,n.__scopePopover),s=l.useRef(!1),r=l.useRef(!1);return e.jsx(oe,{...n,ref:t,trapFocus:!1,disableOutsidePointerEvents:!1,onCloseAutoFocus:i=>{n.onCloseAutoFocus?.(i),i.defaultPrevented||(s.current||o.triggerRef.current?.focus(),i.preventDefault()),s.current=!1,r.current=!1},onInteractOutside:i=>{n.onInteractOutside?.(i),i.defaultPrevented||(s.current=!0,i.detail.originalEvent.type==="pointerdown"&&(r.current=!0));const d=i.target;o.triggerRef.current?.contains(d)&&i.preventDefault(),i.detail.originalEvent.type==="focusin"&&r.current&&i.preventDefault()}})}),oe=l.forwardRef((n,t)=>{const{__scopePopover:o,trapFocus:s,onOpenAutoFocus:r,onCloseAutoFocus:i,disableOutsidePointerEvents:d,onEscapeKeyDown:c,onPointerDownOutside:v,onFocusOutside:C,onInteractOutside:T,...z}=n,y=m(j,o),E=w(o);return Ce(),e.jsx(be,{asChild:!0,loop:!0,trapped:s,onMountAutoFocus:r,onUnmountAutoFocus:i,children:e.jsx(xe,{asChild:!0,disableOutsidePointerEvents:d,onInteractOutside:T,onEscapeKeyDown:c,onPointerDownOutside:v,onFocusOutside:C,onDismiss:()=>y.onOpenChange(!1),children:e.jsx(ue,{"data-state":ie(y.open),role:"dialog",id:y.contentId,...E,...z,ref:t,style:{...z.style,"--radix-popover-content-transform-origin":"var(--radix-popper-transform-origin)","--radix-popover-content-available-width":"var(--radix-popper-available-width)","--radix-popover-content-available-height":"var(--radix-popper-available-height)","--radix-popover-trigger-width":"var(--radix-popper-anchor-width)","--radix-popover-trigger-height":"var(--radix-popper-anchor-height)"}})})})}),re="PopoverClose",se=l.forwardRef((n,t)=>{const{__scopePopover:o,...s}=n,r=m(re,o);return e.jsx($.button,{type:"button",...s,ref:t,onClick:b(n.onClick,()=>r.onOpenChange(!1))})});se.displayName=re;var De="PopoverArrow",_e=l.forwardRef((n,t)=>{const{__scopePopover:o,...s}=n,r=w(o);return e.jsx(ge,{...r,...s,ref:t})});_e.displayName=De;function ie(n){return n?"open":"closed"}var Ie=G,Fe=Z,Oe=ee,Ne=ne,Ee=te,Me=se;const We=["1","2","3","4"],Le={...me,size:{type:"enum",className:"rt-r-size",values:We,default:"2",responsive:!0},width:M.width,minWidth:M.minWidth,maxWidth:{...M.maxWidth,default:"480px"},...pe},P={Anchor:Fe,Close:Me,Root:Ie,Trigger:Oe,Content:Ee,Portal:Ne},x=n=>e.jsx(P.Root,{...n});x.displayName="Popover.Root";const u=l.forwardRef(({children:n,...t},o)=>e.jsx(P.Trigger,{...t,ref:o,asChild:!0,children:U(n)}));u.displayName="Popover.Trigger";const g=l.forwardRef((n,t)=>{const{className:o,forceMount:s,container:r,...i}=ve(n,Le);return e.jsx(P.Portal,{container:r,forceMount:s,children:e.jsx(J,{asChild:!0,children:e.jsx(P.Content,{align:"start",sideOffset:8,collisionPadding:10,...i,ref:t,className:ye("rt-PopperContent","rt-PopoverContent",o)})})})});g.displayName="Popover.Content";const ae=l.forwardRef(({children:n,...t},o)=>e.jsx(P.Close,{...t,ref:o,asChild:!0,children:U(n)}));ae.displayName="Popover.Close";const le=l.forwardRef(({children:n,...t},o)=>e.jsx(P.Anchor,{...t,ref:o}));le.displayName="Popover.Anchor";x.__docgenInfo={description:"",methods:[],displayName:"Popover.Root"};g.__docgenInfo={description:"",methods:[],displayName:"Popover.Content",props:{container:{required:!1,tsType:{name:'ReactComponentPropsWithoutRef["container"]',raw:`React.ComponentPropsWithoutRef<
  typeof PopoverPrimitive.Portal
>["container"]`},description:""}},composes:["ComponentPropsWithout","PopoverContentOwnProps"]};u.__docgenInfo={description:"",methods:[],displayName:"Popover.Trigger",composes:["ComponentPropsWithout"]};ae.__docgenInfo={description:"",methods:[],displayName:"Popover.Close",composes:["ComponentPropsWithout"]};le.__docgenInfo={description:"",methods:[],displayName:"Popover.Anchor"};const un={title:"Base/Popover",component:x,parameters:{layout:"centered"},decorators:[n=>e.jsx(J,{children:e.jsx("div",{style:{padding:"40px"},children:e.jsx(n,{})})})]},S={render:n=>e.jsxs(x,{children:[e.jsx(u,{children:e.jsx(p,{children:"Open Popover"})}),e.jsxs(g,{style:{width:"300px"},children:[e.jsx(a,{size:"3",weight:"medium",style:{marginBottom:"8px",display:"block"},children:"Popover Title"}),e.jsx(a,{size:"2",style:{lineHeight:"1.5"},children:"This is a simple popover with some content. You can put any elements inside the popover content area."})]})]})},R={render:n=>e.jsxs(x,{children:[e.jsx(u,{children:e.jsx(p,{variant:"ghost",style:{padding:"4px"},children:e.jsx("div",{style:{width:"32px",height:"32px",backgroundColor:"#3b82f6",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",color:"white",fontSize:"14px",fontWeight:"bold"},children:"JD"})})}),e.jsxs(g,{style:{width:"280px"},children:[e.jsxs("div",{style:{textAlign:"center",marginBottom:"16px"},children:[e.jsx("div",{style:{width:"60px",height:"60px",backgroundColor:"#3b82f6",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",color:"white",fontSize:"24px",fontWeight:"bold",margin:"0 auto 12px"},children:"JD"}),e.jsx(a,{size:"3",weight:"bold",style:{display:"block"},children:"John Doe"}),e.jsx(a,{size:"2",color:"gray",style:{display:"block"},children:"Senior Developer"}),e.jsx(a,{size:"2",color:"gray",style:{display:"block"},children:"john.doe@company.com"})]}),e.jsx(f,{style:{margin:"12px 0"}}),e.jsxs(h,{direction:"column",gap:"2",children:[e.jsxs(a,{size:"2",style:{display:"flex",justifyContent:"space-between"},children:[e.jsx("span",{children:"Projects:"}),e.jsx("span",{style:{fontWeight:"medium"},children:"12"})]}),e.jsxs(a,{size:"2",style:{display:"flex",justifyContent:"space-between"},children:[e.jsx("span",{children:"Tasks completed:"}),e.jsx("span",{style:{fontWeight:"medium"},children:"89"})]}),e.jsxs(a,{size:"2",style:{display:"flex",justifyContent:"space-between"},children:[e.jsx("span",{children:"Team:"}),e.jsx("span",{style:{fontWeight:"medium"},children:"Frontend"})]})]}),e.jsx(f,{style:{margin:"12px 0"}}),e.jsxs(h,{gap:"2",children:[e.jsx(p,{size:"1",variant:"soft",style:{flex:1},children:"💬 Message"}),e.jsx(p,{size:"1",variant:"outline",style:{flex:1},children:"👁️ View Profile"})]})]})]})},B={render:n=>e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[e.jsx(a,{size:"2",children:"API Key"}),e.jsxs(x,{children:[e.jsx(u,{children:e.jsx(W,{size:"1",variant:"ghost",style:{color:"#6b7280"},children:"❓"})}),e.jsxs(g,{style:{width:"250px"},children:[e.jsx(a,{size:"2",weight:"medium",style:{marginBottom:"8px",display:"block"},children:"What is an API Key?"}),e.jsx(a,{size:"2",style:{lineHeight:"1.5",marginBottom:"12px"},children:"An API key is a unique identifier that authenticates your requests to our service. Keep it secure and don't share it publicly."}),e.jsx(a,{size:"1",color:"blue",style:{cursor:"pointer"},children:"Learn more about API security →"})]})]})]})},k={render:n=>e.jsxs(x,{children:[e.jsx(u,{children:e.jsx(W,{variant:"ghost",children:"⚙️"})}),e.jsxs(g,{style:{width:"240px"},children:[e.jsx(a,{size:"2",weight:"medium",style:{marginBottom:"12px",display:"block"},children:"Quick Settings"}),e.jsxs(h,{direction:"column",gap:"3",children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:[e.jsx(a,{size:"2",children:"Dark Mode"}),e.jsx(p,{size:"1",variant:"soft",children:"Toggle"})]}),e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:[e.jsx(a,{size:"2",children:"Notifications"}),e.jsx(p,{size:"1",variant:"soft",children:"On"})]}),e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:[e.jsx(a,{size:"2",children:"Auto-save"}),e.jsx(p,{size:"1",variant:"outline",children:"Off"})]})]}),e.jsx(f,{style:{margin:"12px 0"}}),e.jsx(p,{size:"2",variant:"outline",style:{width:"100%"},children:"Advanced Settings"})]})]})},A={render:n=>{const[t,o]=l.useState("#3b82f6"),s=["#ef4444","#f97316","#f59e0b","#eab308","#22c55e","#10b981","#06b6d4","#3b82f6","#6366f1","#8b5cf6","#a855f7","#d946ef","#ec4899","#f43f5e","#6b7280","#374151"];return e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[e.jsx(a,{size:"2",children:"Color:"}),e.jsxs(x,{children:[e.jsx(u,{children:e.jsx("button",{style:{width:"32px",height:"32px",borderRadius:"6px",border:"2px solid #e1e5e9",backgroundColor:t,cursor:"pointer"}})}),e.jsxs(g,{style:{width:"200px"},children:[e.jsx(a,{size:"2",weight:"medium",style:{marginBottom:"12px",display:"block"},children:"Choose Color"}),e.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(4, 1fr)",gap:"8px",marginBottom:"12px"},children:s.map(r=>e.jsx("button",{onClick:()=>o(r),style:{width:"32px",height:"32px",borderRadius:"4px",border:t===r?"2px solid #000":"1px solid #e1e5e9",backgroundColor:r,cursor:"pointer"}},r))}),e.jsxs("div",{style:{marginBottom:"8px"},children:[e.jsx(a,{size:"1",color:"gray",style:{display:"block",marginBottom:"4px"},children:"Custom Color"}),e.jsx("input",{type:"color",value:t,onChange:r=>o(r.target.value),style:{width:"100%",height:"32px",border:"none",borderRadius:"4px"}})]}),e.jsxs(a,{size:"1",color:"gray",children:["Selected: ",t]})]})]})]})}},D={render:n=>e.jsxs(x,{children:[e.jsx(u,{children:e.jsx(p,{variant:"outline",children:"📤 Share"})}),e.jsxs(g,{style:{width:"320px"},children:[e.jsx(a,{size:"2",weight:"medium",style:{marginBottom:"12px",display:"block"},children:"Share this project"}),e.jsxs("div",{style:{padding:"8px",backgroundColor:"#f8f9fa",borderRadius:"6px",marginBottom:"12px",display:"flex",gap:"8px"},children:[e.jsx("input",{type:"text",value:"https://app.example.com/projects/abc123",readOnly:!0,style:{flex:1,padding:"4px 8px",border:"none",backgroundColor:"transparent",fontSize:"14px"}}),e.jsx(p,{size:"1",variant:"soft",children:"📋 Copy"})]}),e.jsx(a,{size:"2",weight:"medium",style:{marginBottom:"8px",display:"block"},children:"Share via"}),e.jsxs(h,{gap:"2",style:{marginBottom:"12px"},children:[e.jsx(p,{size:"1",variant:"soft",style:{flex:1},children:"📧 Email"}),e.jsx(p,{size:"1",variant:"soft",style:{flex:1},children:"💬 Slack"}),e.jsx(p,{size:"1",variant:"soft",style:{flex:1},children:"🐦 Twitter"})]}),e.jsx(f,{style:{margin:"12px 0"}}),e.jsxs("div",{children:[e.jsx(a,{size:"2",weight:"medium",style:{marginBottom:"8px",display:"block"},children:"Access Level"}),e.jsxs("select",{style:{width:"100%",padding:"8px",border:"1px solid #e1e5e9",borderRadius:"4px",fontSize:"14px"},children:[e.jsx("option",{children:"Can view"}),e.jsx("option",{children:"Can edit"}),e.jsx("option",{children:"Can admin"})]})]})]})]})},_={render:n=>{const[t,o]=l.useState(new Date);return e.jsxs(x,{children:[e.jsx(u,{children:e.jsxs(p,{variant:"outline",children:["📅 ",t.toLocaleDateString()]})}),e.jsxs(g,{style:{width:"280px"},children:[e.jsx(a,{size:"2",weight:"medium",style:{marginBottom:"12px",display:"block"},children:"Select Date"}),e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"repeat(7, 1fr)",gap:"4px",marginBottom:"12px"},children:[["Su","Mo","Tu","We","Th","Fr","Sa"].map(s=>e.jsx("div",{style:{padding:"8px 4px",textAlign:"center",fontSize:"12px",fontWeight:"bold",color:"#6b7280"},children:s},s)),Array.from({length:35},(s,r)=>{const i=new Date(2024,2,r-5),d=i.toDateString()===t.toDateString(),c=i.toDateString()===new Date().toDateString(),v=i.getMonth()===2;return e.jsx("button",{onClick:()=>o(i),style:{padding:"8px 4px",border:"none",borderRadius:"4px",backgroundColor:d?"#3b82f6":"transparent",color:d?"white":v?"#374151":"#d1d5db",fontSize:"14px",cursor:"pointer",fontWeight:c?"bold":"normal"},children:i.getDate()},r)})]}),e.jsxs(h,{justify:"between",children:[e.jsx(p,{size:"1",variant:"ghost",children:"← Previous"}),e.jsx(a,{size:"2",weight:"medium",children:"March 2024"}),e.jsx(p,{size:"1",variant:"ghost",children:"Next →"})]})]})]})}},I={render:n=>{const[t,o]=l.useState({status:"all",priority:"all",assignee:"all"});return e.jsxs(x,{children:[e.jsx(u,{children:e.jsxs(p,{variant:"outline",children:["🔍 Filters",Object.values(t).some(s=>s!=="all")&&e.jsx("span",{style:{marginLeft:"4px",backgroundColor:"#3b82f6",color:"white",borderRadius:"50%",width:"16px",height:"16px",display:"inline-flex",alignItems:"center",justifyContent:"center",fontSize:"10px"},children:"•"})]})}),e.jsxs(g,{style:{width:"240px"},children:[e.jsx(a,{size:"2",weight:"medium",style:{marginBottom:"12px",display:"block"},children:"Filter Tasks"}),e.jsxs(h,{direction:"column",gap:"3",children:[e.jsxs("div",{children:[e.jsx(a,{size:"2",style:{marginBottom:"4px",display:"block"},children:"Status"}),e.jsxs("select",{value:t.status,onChange:s=>o({...t,status:s.target.value}),style:{width:"100%",padding:"6px",border:"1px solid #e1e5e9",borderRadius:"4px",fontSize:"14px"},children:[e.jsx("option",{value:"all",children:"All"}),e.jsx("option",{value:"todo",children:"To Do"}),e.jsx("option",{value:"progress",children:"In Progress"}),e.jsx("option",{value:"done",children:"Done"})]})]}),e.jsxs("div",{children:[e.jsx(a,{size:"2",style:{marginBottom:"4px",display:"block"},children:"Priority"}),e.jsxs("select",{value:t.priority,onChange:s=>o({...t,priority:s.target.value}),style:{width:"100%",padding:"6px",border:"1px solid #e1e5e9",borderRadius:"4px",fontSize:"14px"},children:[e.jsx("option",{value:"all",children:"All"}),e.jsx("option",{value:"high",children:"High"}),e.jsx("option",{value:"medium",children:"Medium"}),e.jsx("option",{value:"low",children:"Low"})]})]}),e.jsxs("div",{children:[e.jsx(a,{size:"2",style:{marginBottom:"4px",display:"block"},children:"Assignee"}),e.jsxs("select",{value:t.assignee,onChange:s=>o({...t,assignee:s.target.value}),style:{width:"100%",padding:"6px",border:"1px solid #e1e5e9",borderRadius:"4px",fontSize:"14px"},children:[e.jsx("option",{value:"all",children:"All"}),e.jsx("option",{value:"me",children:"Assigned to me"}),e.jsx("option",{value:"unassigned",children:"Unassigned"})]})]})]}),e.jsx(f,{style:{margin:"12px 0"}}),e.jsxs(h,{gap:"2",children:[e.jsx(p,{size:"1",variant:"ghost",onClick:()=>o({status:"all",priority:"all",assignee:"all"}),style:{flex:1},children:"Reset"}),e.jsx(p,{size:"1",variant:"solid",style:{flex:1},children:"Apply"})]})]})]})}},F={render:n=>e.jsxs(x,{children:[e.jsx(u,{children:e.jsx(W,{variant:"solid",style:{borderRadius:"50%"},children:"➕"})}),e.jsxs(g,{style:{width:"200px"},children:[e.jsx(a,{size:"2",weight:"medium",style:{marginBottom:"12px",display:"block"},children:"Quick Actions"}),e.jsxs(h,{direction:"column",gap:"2",children:[e.jsx(p,{variant:"ghost",style:{justifyContent:"flex-start"},children:"📝 New Document"}),e.jsx(p,{variant:"ghost",style:{justifyContent:"flex-start"},children:"📁 New Folder"}),e.jsx(p,{variant:"ghost",style:{justifyContent:"flex-start"},children:"📊 New Project"}),e.jsx(p,{variant:"ghost",style:{justifyContent:"flex-start"},children:"👥 Invite People"})]}),e.jsx(f,{style:{margin:"12px 0"}}),e.jsx(p,{variant:"ghost",style:{justifyContent:"flex-start",width:"100%"},children:"📤 Import Files"})]})]})},O={render:n=>{const[t,o]=l.useState("😀"),s=["😀","😃","😄","😁","😊","😇","🙂","🙃","😉","😌","😍","🥰","😘","😗","😙","😚","😋","😛","😝","😜","🤪","🤨","🧐","🤓","😎","🤩","🥳","😏","😒","😞","😔","😟"];return e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[e.jsx(a,{size:"2",children:"Reaction:"}),e.jsxs(x,{children:[e.jsx(u,{children:e.jsx(p,{variant:"outline",size:"2",children:t})}),e.jsxs(g,{style:{width:"280px"},children:[e.jsx(a,{size:"2",weight:"medium",style:{marginBottom:"12px",display:"block"},children:"Choose Emoji"}),e.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(8, 1fr)",gap:"4px",maxHeight:"200px",overflowY:"auto"},children:s.map(r=>e.jsx("button",{onClick:()=>o(r),style:{width:"32px",height:"32px",border:t===r?"2px solid #3b82f6":"1px solid #e1e5e9",borderRadius:"4px",backgroundColor:t===r?"#eff6ff":"transparent",fontSize:"18px",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"},children:r},r))})]})]})]})}};S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  render: _args => <Popover.Root>
      <Popover.Trigger>
        <Button>Open Popover</Button>
      </Popover.Trigger>

      <Popover.Content style={{
      width: "300px"
    }}>
        <Text size="3" weight="medium" style={{
        marginBottom: "8px",
        display: "block"
      }}>
          Popover Title
        </Text>
        <Text size="2" style={{
        lineHeight: "1.5"
      }}>
          This is a simple popover with some content. You can put any elements
          inside the popover content area.
        </Text>
      </Popover.Content>
    </Popover.Root>
}`,...S.parameters?.docs?.source}}};R.parameters={...R.parameters,docs:{...R.parameters?.docs,source:{originalSource:`{
  render: _args => <Popover.Root>
      <Popover.Trigger>
        <Button variant="ghost" style={{
        padding: "4px"
      }}>
          <div style={{
          width: "32px",
          height: "32px",
          backgroundColor: "#3b82f6",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          fontSize: "14px",
          fontWeight: "bold"
        }}>
            JD
          </div>
        </Button>
      </Popover.Trigger>

      <Popover.Content style={{
      width: "280px"
    }}>
        <div style={{
        textAlign: "center",
        marginBottom: "16px"
      }}>
          <div style={{
          width: "60px",
          height: "60px",
          backgroundColor: "#3b82f6",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          fontSize: "24px",
          fontWeight: "bold",
          margin: "0 auto 12px"
        }}>
            JD
          </div>
          <Text size="3" weight="bold" style={{
          display: "block"
        }}>
            John Doe
          </Text>
          <Text size="2" color="gray" style={{
          display: "block"
        }}>
            Senior Developer
          </Text>
          <Text size="2" color="gray" style={{
          display: "block"
        }}>
            john.doe@company.com
          </Text>
        </div>

        <Separator style={{
        margin: "12px 0"
      }} />

        <Flex direction="column" gap="2">
          <Text size="2" style={{
          display: "flex",
          justifyContent: "space-between"
        }}>
            <span>Projects:</span>
            <span style={{
            fontWeight: "medium"
          }}>12</span>
          </Text>
          <Text size="2" style={{
          display: "flex",
          justifyContent: "space-between"
        }}>
            <span>Tasks completed:</span>
            <span style={{
            fontWeight: "medium"
          }}>89</span>
          </Text>
          <Text size="2" style={{
          display: "flex",
          justifyContent: "space-between"
        }}>
            <span>Team:</span>
            <span style={{
            fontWeight: "medium"
          }}>Frontend</span>
          </Text>
        </Flex>

        <Separator style={{
        margin: "12px 0"
      }} />

        <Flex gap="2">
          <Button size="1" variant="soft" style={{
          flex: 1
        }}>
            💬 Message
          </Button>
          <Button size="1" variant="outline" style={{
          flex: 1
        }}>
            👁️ View Profile
          </Button>
        </Flex>
      </Popover.Content>
    </Popover.Root>
}`,...R.parameters?.docs?.source}}};B.parameters={...B.parameters,docs:{...B.parameters?.docs,source:{originalSource:`{
  render: _args => <div style={{
    display: "flex",
    alignItems: "center",
    gap: "8px"
  }}>
      <Text size="2">API Key</Text>
      <Popover.Root>
        <Popover.Trigger>
          <IconButton size="1" variant="ghost" style={{
          color: "#6b7280"
        }}>
            ❓
          </IconButton>
        </Popover.Trigger>

        <Popover.Content style={{
        width: "250px"
      }}>
          <Text size="2" weight="medium" style={{
          marginBottom: "8px",
          display: "block"
        }}>
            What is an API Key?
          </Text>
          <Text size="2" style={{
          lineHeight: "1.5",
          marginBottom: "12px"
        }}>
            An API key is a unique identifier that authenticates your requests
            to our service. Keep it secure and don't share it publicly.
          </Text>
          <Text size="1" color="blue" style={{
          cursor: "pointer"
        }}>
            Learn more about API security →
          </Text>
        </Popover.Content>
      </Popover.Root>
    </div>
}`,...B.parameters?.docs?.source}}};k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  render: _args => <Popover.Root>
      <Popover.Trigger>
        <IconButton variant="ghost">⚙️</IconButton>
      </Popover.Trigger>

      <Popover.Content style={{
      width: "240px"
    }}>
        <Text size="2" weight="medium" style={{
        marginBottom: "12px",
        display: "block"
      }}>
          Quick Settings
        </Text>

        <Flex direction="column" gap="3">
          <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}>
            <Text size="2">Dark Mode</Text>
            <Button size="1" variant="soft">
              Toggle
            </Button>
          </div>

          <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}>
            <Text size="2">Notifications</Text>
            <Button size="1" variant="soft">
              On
            </Button>
          </div>

          <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}>
            <Text size="2">Auto-save</Text>
            <Button size="1" variant="outline">
              Off
            </Button>
          </div>
        </Flex>

        <Separator style={{
        margin: "12px 0"
      }} />

        <Button size="2" variant="outline" style={{
        width: "100%"
      }}>
          Advanced Settings
        </Button>
      </Popover.Content>
    </Popover.Root>
}`,...k.parameters?.docs?.source}}};A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
  render: _args => {
    const [selectedColor, setSelectedColor] = React.useState("#3b82f6");
    const colors = ["#ef4444", "#f97316", "#f59e0b", "#eab308", "#22c55e", "#10b981", "#06b6d4", "#3b82f6", "#6366f1", "#8b5cf6", "#a855f7", "#d946ef", "#ec4899", "#f43f5e", "#6b7280", "#374151"];
    return <div style={{
      display: "flex",
      alignItems: "center",
      gap: "8px"
    }}>
        <Text size="2">Color:</Text>
        <Popover.Root>
          <Popover.Trigger>
            <button style={{
            width: "32px",
            height: "32px",
            borderRadius: "6px",
            border: "2px solid #e1e5e9",
            backgroundColor: selectedColor,
            cursor: "pointer"
          }} />
          </Popover.Trigger>

          <Popover.Content style={{
          width: "200px"
        }}>
            <Text size="2" weight="medium" style={{
            marginBottom: "12px",
            display: "block"
          }}>
              Choose Color
            </Text>

            <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "8px",
            marginBottom: "12px"
          }}>
              {colors.map(color => <button key={color} onClick={() => setSelectedColor(color)} style={{
              width: "32px",
              height: "32px",
              borderRadius: "4px",
              border: selectedColor === color ? "2px solid #000" : "1px solid #e1e5e9",
              backgroundColor: color,
              cursor: "pointer"
            }} />)}
            </div>

            <div style={{
            marginBottom: "8px"
          }}>
              <Text size="1" color="gray" style={{
              display: "block",
              marginBottom: "4px"
            }}>
                Custom Color
              </Text>
              <input type="color" value={selectedColor} onChange={e => setSelectedColor(e.target.value)} style={{
              width: "100%",
              height: "32px",
              border: "none",
              borderRadius: "4px"
            }} />
            </div>

            <Text size="1" color="gray">
              Selected: {selectedColor}
            </Text>
          </Popover.Content>
        </Popover.Root>
      </div>;
  }
}`,...A.parameters?.docs?.source}}};D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  render: _args => <Popover.Root>
      <Popover.Trigger>
        <Button variant="outline">📤 Share</Button>
      </Popover.Trigger>

      <Popover.Content style={{
      width: "320px"
    }}>
        <Text size="2" weight="medium" style={{
        marginBottom: "12px",
        display: "block"
      }}>
          Share this project
        </Text>

        <div style={{
        padding: "8px",
        backgroundColor: "#f8f9fa",
        borderRadius: "6px",
        marginBottom: "12px",
        display: "flex",
        gap: "8px"
      }}>
          <input type="text" value="https://app.example.com/projects/abc123" readOnly style={{
          flex: 1,
          padding: "4px 8px",
          border: "none",
          backgroundColor: "transparent",
          fontSize: "14px"
        }} />
          <Button size="1" variant="soft">
            📋 Copy
          </Button>
        </div>

        <Text size="2" weight="medium" style={{
        marginBottom: "8px",
        display: "block"
      }}>
          Share via
        </Text>

        <Flex gap="2" style={{
        marginBottom: "12px"
      }}>
          <Button size="1" variant="soft" style={{
          flex: 1
        }}>
            📧 Email
          </Button>
          <Button size="1" variant="soft" style={{
          flex: 1
        }}>
            💬 Slack
          </Button>
          <Button size="1" variant="soft" style={{
          flex: 1
        }}>
            🐦 Twitter
          </Button>
        </Flex>

        <Separator style={{
        margin: "12px 0"
      }} />

        <div>
          <Text size="2" weight="medium" style={{
          marginBottom: "8px",
          display: "block"
        }}>
            Access Level
          </Text>
          <select style={{
          width: "100%",
          padding: "8px",
          border: "1px solid #e1e5e9",
          borderRadius: "4px",
          fontSize: "14px"
        }}>
            <option>Can view</option>
            <option>Can edit</option>
            <option>Can admin</option>
          </select>
        </div>
      </Popover.Content>
    </Popover.Root>
}`,...D.parameters?.docs?.source}}};_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  render: _args => {
    const [selectedDate, setSelectedDate] = React.useState(new Date());
    return <Popover.Root>
        <Popover.Trigger>
          <Button variant="outline">
            📅 {selectedDate.toLocaleDateString()}
          </Button>
        </Popover.Trigger>

        <Popover.Content style={{
        width: "280px"
      }}>
          <Text size="2" weight="medium" style={{
          marginBottom: "12px",
          display: "block"
        }}>
            Select Date
          </Text>

          <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          gap: "4px",
          marginBottom: "12px"
        }}>
            {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map(day => <div key={day} style={{
            padding: "8px 4px",
            textAlign: "center",
            fontSize: "12px",
            fontWeight: "bold",
            color: "#6b7280"
          }}>
                {day}
              </div>)}

            {Array.from({
            length: 35
          }, (_, i) => {
            const date = new Date(2024, 2, i - 5); // March 2024 example
            const isSelected = date.toDateString() === selectedDate.toDateString();
            const isToday = date.toDateString() === new Date().toDateString();
            const isCurrentMonth = date.getMonth() === 2;
            return <button key={i} onClick={() => setSelectedDate(date)} style={{
              padding: "8px 4px",
              border: "none",
              borderRadius: "4px",
              backgroundColor: isSelected ? "#3b82f6" : "transparent",
              color: isSelected ? "white" : isCurrentMonth ? "#374151" : "#d1d5db",
              fontSize: "14px",
              cursor: "pointer",
              fontWeight: isToday ? "bold" : "normal"
            }}>
                  {date.getDate()}
                </button>;
          })}
          </div>

          <Flex justify="between">
            <Button size="1" variant="ghost">
              ← Previous
            </Button>
            <Text size="2" weight="medium">
              March 2024
            </Text>
            <Button size="1" variant="ghost">
              Next →
            </Button>
          </Flex>
        </Popover.Content>
      </Popover.Root>;
  }
}`,..._.parameters?.docs?.source}}};I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:`{
  render: _args => {
    const [filters, setFilters] = React.useState({
      status: "all",
      priority: "all",
      assignee: "all"
    });
    return <Popover.Root>
        <Popover.Trigger>
          <Button variant="outline">
            🔍 Filters
            {Object.values(filters).some(v => v !== "all") && <span style={{
            marginLeft: "4px",
            backgroundColor: "#3b82f6",
            color: "white",
            borderRadius: "50%",
            width: "16px",
            height: "16px",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "10px"
          }}>
                •
              </span>}
          </Button>
        </Popover.Trigger>

        <Popover.Content style={{
        width: "240px"
      }}>
          <Text size="2" weight="medium" style={{
          marginBottom: "12px",
          display: "block"
        }}>
            Filter Tasks
          </Text>

          <Flex direction="column" gap="3">
            <div>
              <Text size="2" style={{
              marginBottom: "4px",
              display: "block"
            }}>
                Status
              </Text>
              <select value={filters.status} onChange={e => setFilters({
              ...filters,
              status: e.target.value
            })} style={{
              width: "100%",
              padding: "6px",
              border: "1px solid #e1e5e9",
              borderRadius: "4px",
              fontSize: "14px"
            }}>
                <option value="all">All</option>
                <option value="todo">To Do</option>
                <option value="progress">In Progress</option>
                <option value="done">Done</option>
              </select>
            </div>

            <div>
              <Text size="2" style={{
              marginBottom: "4px",
              display: "block"
            }}>
                Priority
              </Text>
              <select value={filters.priority} onChange={e => setFilters({
              ...filters,
              priority: e.target.value
            })} style={{
              width: "100%",
              padding: "6px",
              border: "1px solid #e1e5e9",
              borderRadius: "4px",
              fontSize: "14px"
            }}>
                <option value="all">All</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>

            <div>
              <Text size="2" style={{
              marginBottom: "4px",
              display: "block"
            }}>
                Assignee
              </Text>
              <select value={filters.assignee} onChange={e => setFilters({
              ...filters,
              assignee: e.target.value
            })} style={{
              width: "100%",
              padding: "6px",
              border: "1px solid #e1e5e9",
              borderRadius: "4px",
              fontSize: "14px"
            }}>
                <option value="all">All</option>
                <option value="me">Assigned to me</option>
                <option value="unassigned">Unassigned</option>
              </select>
            </div>
          </Flex>

          <Separator style={{
          margin: "12px 0"
        }} />

          <Flex gap="2">
            <Button size="1" variant="ghost" onClick={() => setFilters({
            status: "all",
            priority: "all",
            assignee: "all"
          })} style={{
            flex: 1
          }}>
              Reset
            </Button>
            <Button size="1" variant="solid" style={{
            flex: 1
          }}>
              Apply
            </Button>
          </Flex>
        </Popover.Content>
      </Popover.Root>;
  }
}`,...I.parameters?.docs?.source}}};F.parameters={...F.parameters,docs:{...F.parameters?.docs,source:{originalSource:`{
  render: _args => <Popover.Root>
      <Popover.Trigger>
        <IconButton variant="solid" style={{
        borderRadius: "50%"
      }}>
          ➕
        </IconButton>
      </Popover.Trigger>

      <Popover.Content style={{
      width: "200px"
    }}>
        <Text size="2" weight="medium" style={{
        marginBottom: "12px",
        display: "block"
      }}>
          Quick Actions
        </Text>

        <Flex direction="column" gap="2">
          <Button variant="ghost" style={{
          justifyContent: "flex-start"
        }}>
            📝 New Document
          </Button>
          <Button variant="ghost" style={{
          justifyContent: "flex-start"
        }}>
            📁 New Folder
          </Button>
          <Button variant="ghost" style={{
          justifyContent: "flex-start"
        }}>
            📊 New Project
          </Button>
          <Button variant="ghost" style={{
          justifyContent: "flex-start"
        }}>
            👥 Invite People
          </Button>
        </Flex>

        <Separator style={{
        margin: "12px 0"
      }} />

        <Button variant="ghost" style={{
        justifyContent: "flex-start",
        width: "100%"
      }}>
          📤 Import Files
        </Button>
      </Popover.Content>
    </Popover.Root>
}`,...F.parameters?.docs?.source}}};O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
  render: _args => {
    const [selectedEmoji, setSelectedEmoji] = React.useState("😀");
    const emojis = ["😀", "😃", "😄", "😁", "😊", "😇", "🙂", "🙃", "😉", "😌", "😍", "🥰", "😘", "😗", "😙", "😚", "😋", "😛", "😝", "😜", "🤪", "🤨", "🧐", "🤓", "😎", "🤩", "🥳", "😏", "😒", "😞", "😔", "😟"];
    return <div style={{
      display: "flex",
      alignItems: "center",
      gap: "8px"
    }}>
        <Text size="2">Reaction:</Text>
        <Popover.Root>
          <Popover.Trigger>
            <Button variant="outline" size="2">
              {selectedEmoji}
            </Button>
          </Popover.Trigger>

          <Popover.Content style={{
          width: "280px"
        }}>
            <Text size="2" weight="medium" style={{
            marginBottom: "12px",
            display: "block"
          }}>
              Choose Emoji
            </Text>

            <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(8, 1fr)",
            gap: "4px",
            maxHeight: "200px",
            overflowY: "auto"
          }}>
              {emojis.map(emoji => <button key={emoji} onClick={() => setSelectedEmoji(emoji)} style={{
              width: "32px",
              height: "32px",
              border: selectedEmoji === emoji ? "2px solid #3b82f6" : "1px solid #e1e5e9",
              borderRadius: "4px",
              backgroundColor: selectedEmoji === emoji ? "#eff6ff" : "transparent",
              fontSize: "18px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}>
                  {emoji}
                </button>)}
            </div>
          </Popover.Content>
        </Popover.Root>
      </div>;
  }
}`,...O.parameters?.docs?.source}}};const gn=["Default","UserProfile","HelpTooltip","SettingsPopover","ColorPicker","SharePopover","CalendarPopover","FilterPopover","QuickActions","EmojiPicker"];export{_ as CalendarPopover,A as ColorPicker,S as Default,O as EmojiPicker,I as FilterPopover,B as HelpTooltip,F as QuickActions,k as SettingsPopover,D as SharePopover,R as UserProfile,gn as __namedExportsOrder,un as default};
