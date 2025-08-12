import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{B as s}from"./button-jOk6Qw9K.js";import{h as Ne,w as G,F as g}from"./flex-bym-5aeO.js";import{r as a}from"./iframe-DsuaOdjx.js";import{c as Q,i as Ee,a as R,P as U,D as Fe,T as X}from"./theme-BFbej9HP.js";import{u as _,P as B,c as Ie,l as We,d as Oe,e as J,a as ze}from"./high-contrast.prop-DN4VqJ5o.js";import{u as H}from"./index-FlXuF2W-.js";import{u as Me}from"./index-Bg7roRMb.js";import{P as $e,R as ke,h as Le,u as Ye,F as Ge,r as V}from"./require-react-element-BySUkP0S.js";import{H as He}from"./heading-CCvWipbk.js";import{T as x}from"./text-Bwa-Y73d.js";import"./avatar-RXesCRZq.js";import"./button-ClCv9eVs.js";import"./card-DfIScEG2.js";import"./icon-button-QpiRLWqf.js";import"./base-button-Dyf4vkZD.js";import"./preload-helper-D9Z9MdNV.js";import"./index-CVlKO6je.js";import"./index-BW54sZL3.js";import"./weight.prop-Rt1sSGdE.js";import"./get-subtree-COcTOnEl.js";import"./radius.prop-BFb5uVoY.js";var L="Dialog",[ee,te]=Q(L),[Ue,v]=ee(L),oe=t=>{const{__scopeDialog:o,children:r,open:n,defaultOpen:l,onOpenChange:i,modal:c=!0}=t,d=a.useRef(null),j=a.useRef(null),[y,Y]=Me({prop:n,defaultProp:l??!1,onChange:i,caller:L});return e.jsx(Ue,{scope:o,triggerRef:d,contentRef:j,contentId:H(),titleId:H(),descriptionId:H(),open:y,onOpenChange:Y,onOpenToggle:a.useCallback(()=>Y(Se=>!Se),[Y]),modal:c,children:r})};oe.displayName=L;var re="DialogTrigger",ne=a.forwardRef((t,o)=>{const{__scopeDialog:r,...n}=t,l=v(re,r),i=_(o,l.triggerRef);return e.jsx(B.button,{type:"button","aria-haspopup":"dialog","aria-expanded":l.open,"aria-controls":l.contentId,"data-state":Z(l.open),...n,ref:i,onClick:R(t.onClick,l.onOpenToggle)})});ne.displayName=re;var q="DialogPortal",[Ve,le]=ee(q,{forceMount:void 0}),ie=t=>{const{__scopeDialog:o,forceMount:r,children:n,container:l}=t,i=v(q,o);return e.jsx(Ve,{scope:o,forceMount:r,children:a.Children.map(n,c=>e.jsx(U,{present:r||i.open,children:e.jsx($e,{asChild:!0,container:l,children:c})}))})};ie.displayName=q;var k="DialogOverlay",ae=a.forwardRef((t,o)=>{const r=le(k,t.__scopeDialog),{forceMount:n=r.forceMount,...l}=t,i=v(k,t.__scopeDialog);return i.modal?e.jsx(U,{present:n||i.open,children:e.jsx(Ke,{...l,ref:o})}):null});ae.displayName=k;var qe=Ie("DialogOverlay.RemoveScroll"),Ke=a.forwardRef((t,o)=>{const{__scopeDialog:r,...n}=t,l=v(k,r);return e.jsx(ke,{as:qe,allowPinchZoom:!0,shards:[l.contentRef],children:e.jsx(B.div,{"data-state":Z(l.open),...n,ref:o,style:{pointerEvents:"auto",...n.style}})})}),b="DialogContent",se=a.forwardRef((t,o)=>{const r=le(b,t.__scopeDialog),{forceMount:n=r.forceMount,...l}=t,i=v(b,t.__scopeDialog);return e.jsx(U,{present:n||i.open,children:i.modal?e.jsx(Ze,{...l,ref:o}):e.jsx(Je,{...l,ref:o})})});se.displayName=b;var Ze=a.forwardRef((t,o)=>{const r=v(b,t.__scopeDialog),n=a.useRef(null),l=_(o,r.contentRef,n);return a.useEffect(()=>{const i=n.current;if(i)return Le(i)},[]),e.jsx(ce,{...t,ref:l,trapFocus:r.open,disableOutsidePointerEvents:!0,onCloseAutoFocus:R(t.onCloseAutoFocus,i=>{i.preventDefault(),r.triggerRef.current?.focus()}),onPointerDownOutside:R(t.onPointerDownOutside,i=>{const c=i.detail.originalEvent,d=c.button===0&&c.ctrlKey===!0;(c.button===2||d)&&i.preventDefault()}),onFocusOutside:R(t.onFocusOutside,i=>i.preventDefault())})}),Je=a.forwardRef((t,o)=>{const r=v(b,t.__scopeDialog),n=a.useRef(!1),l=a.useRef(!1);return e.jsx(ce,{...t,ref:o,trapFocus:!1,disableOutsidePointerEvents:!1,onCloseAutoFocus:i=>{t.onCloseAutoFocus?.(i),i.defaultPrevented||(n.current||r.triggerRef.current?.focus(),i.preventDefault()),n.current=!1,l.current=!1},onInteractOutside:i=>{t.onInteractOutside?.(i),i.defaultPrevented||(n.current=!0,i.detail.originalEvent.type==="pointerdown"&&(l.current=!0));const c=i.target;r.triggerRef.current?.contains(c)&&i.preventDefault(),i.detail.originalEvent.type==="focusin"&&l.current&&i.preventDefault()}})}),ce=a.forwardRef((t,o)=>{const{__scopeDialog:r,trapFocus:n,onOpenAutoFocus:l,onCloseAutoFocus:i,...c}=t,d=v(b,r),j=a.useRef(null),y=_(o,j);return Ye(),e.jsxs(e.Fragment,{children:[e.jsx(Ge,{asChild:!0,loop:!0,trapped:n,onMountAutoFocus:l,onUnmountAutoFocus:i,children:e.jsx(Fe,{role:"dialog",id:d.contentId,"aria-describedby":d.descriptionId,"aria-labelledby":d.titleId,"data-state":Z(d.open),...c,ref:y,onDismiss:()=>d.onOpenChange(!1)})}),e.jsxs(e.Fragment,{children:[e.jsx(Xe,{titleId:d.titleId}),e.jsx(tt,{contentRef:j,descriptionId:d.descriptionId})]})]})}),K="DialogTitle",de=a.forwardRef((t,o)=>{const{__scopeDialog:r,...n}=t,l=v(K,r);return e.jsx(B.h2,{id:l.titleId,...n,ref:o})});de.displayName=K;var ge="DialogDescription",ue=a.forwardRef((t,o)=>{const{__scopeDialog:r,...n}=t,l=v(ge,r);return e.jsx(B.p,{id:l.descriptionId,...n,ref:o})});ue.displayName=ge;var pe="DialogClose",xe=a.forwardRef((t,o)=>{const{__scopeDialog:r,...n}=t,l=v(pe,r);return e.jsx(B.button,{type:"button",...n,ref:o,onClick:R(t.onClick,()=>l.onOpenChange(!1))})});xe.displayName=pe;function Z(t){return t?"open":"closed"}var me="DialogTitleWarning",[Qe,he]=Ee(me,{contentName:b,titleName:K,docsSlug:"dialog"}),Xe=({titleId:t})=>{const o=he(me),r=`\`${o.contentName}\` requires a \`${o.titleName}\` for the component to be accessible for screen reader users.

If you want to hide the \`${o.titleName}\`, you can wrap it with our VisuallyHidden component.

For more information, see https://radix-ui.com/primitives/docs/components/${o.docsSlug}`;return a.useEffect(()=>{t&&(document.getElementById(t)||console.error(r))},[r,t]),null},et="DialogDescriptionWarning",tt=({contentRef:t,descriptionId:o})=>{const n=`Warning: Missing \`Description\` or \`aria-describedby={undefined}\` for {${he(et).contentName}}.`;return a.useEffect(()=>{const l=t.current?.getAttribute("aria-describedby");o&&l&&(document.getElementById(o)||console.warn(n))},[n,t,o]),null},ot=oe,rt=ne,nt=ie,lt=ae,it=se,at=de,st=ue,De=xe,fe="AlertDialog",[ct,Jt]=Q(fe,[te]),T=te(),Ae=t=>{const{__scopeAlertDialog:o,...r}=t,n=T(o);return e.jsx(ot,{...n,...r,modal:!0})};Ae.displayName=fe;var dt="AlertDialogTrigger",ye=a.forwardRef((t,o)=>{const{__scopeAlertDialog:r,...n}=t,l=T(r);return e.jsx(rt,{...l,...n,ref:o})});ye.displayName=dt;var gt="AlertDialogPortal",ve=t=>{const{__scopeAlertDialog:o,...r}=t,n=T(o);return e.jsx(nt,{...n,...r})};ve.displayName=gt;var ut="AlertDialogOverlay",je=a.forwardRef((t,o)=>{const{__scopeAlertDialog:r,...n}=t,l=T(r);return e.jsx(lt,{...l,...n,ref:o})});je.displayName=ut;var w="AlertDialogContent",[pt,xt]=ct(w),mt=We("AlertDialogContent"),Ce=a.forwardRef((t,o)=>{const{__scopeAlertDialog:r,children:n,...l}=t,i=T(r),c=a.useRef(null),d=_(o,c),j=a.useRef(null);return e.jsx(Qe,{contentName:w,titleName:Te,docsSlug:"alert-dialog",children:e.jsx(pt,{scope:r,cancelRef:j,children:e.jsxs(it,{role:"alertdialog",...i,...l,ref:d,onOpenAutoFocus:R(l.onOpenAutoFocus,y=>{y.preventDefault(),j.current?.focus({preventScroll:!0})}),onPointerDownOutside:y=>y.preventDefault(),onInteractOutside:y=>y.preventDefault(),children:[e.jsx(mt,{children:n}),e.jsx(Dt,{contentRef:c})]})})})});Ce.displayName=w;var Te="AlertDialogTitle",be=a.forwardRef((t,o)=>{const{__scopeAlertDialog:r,...n}=t,l=T(r);return e.jsx(at,{...l,...n,ref:o})});be.displayName=Te;var Re="AlertDialogDescription",we=a.forwardRef((t,o)=>{const{__scopeAlertDialog:r,...n}=t,l=T(r);return e.jsx(st,{...l,...n,ref:o})});we.displayName=Re;var ht="AlertDialogAction",_e=a.forwardRef((t,o)=>{const{__scopeAlertDialog:r,...n}=t,l=T(r);return e.jsx(De,{...l,...n,ref:o})});_e.displayName=ht;var Be="AlertDialogCancel",Pe=a.forwardRef((t,o)=>{const{__scopeAlertDialog:r,...n}=t,{cancelRef:l}=xt(Be,r),i=T(r),c=_(o,l);return e.jsx(De,{...i,...n,ref:c})});Pe.displayName=Be;var Dt=({contentRef:t})=>{const o=`\`${w}\` requires a description for the component to be accessible for screen reader users.

You can add a description to the \`${w}\` by passing a \`${Re}\` component as a child, which also benefits sighted users by adding visible context to the dialog.

Alternatively, you can use your own component as a description by assigning it an \`id\` and passing the same value to the \`aria-describedby\` prop in \`${w}\`. If the description is confusing or duplicative for sighted users, you can use the \`@radix-ui/react-visually-hidden\` primitive as a wrapper around your description component.

For more information, see https://radix-ui.com/primitives/docs/components/alert-dialog`;return a.useEffect(()=>{document.getElementById(t.current?.getAttribute("aria-describedby"))||console.warn(o)},[o,t]),null},ft=Ae,At=ye,yt=ve,vt=je,jt=Ce,Ct=_e,Tt=Pe,bt=be,Rt=we;const wt=["1","2","3","4"],_t={...Oe,align:{type:"enum",className:"rt-r-align",values:["start","center"],default:"center"},size:{type:"enum",className:"rt-r-size",values:wt,default:"3",responsive:!0},width:G.width,minWidth:G.minWidth,maxWidth:{...G.maxWidth,default:"600px"},...Ne},C={Root:ft,Trigger:At,Content:jt,Title:bt,Description:Rt,Action:Ct,Cancel:Tt,Overlay:vt,Portal:yt},p=t=>e.jsx(C.Root,{...t});p.displayName="AlertDialog.Root";const m=a.forwardRef(({children:t,...o},r)=>e.jsx(C.Trigger,{...o,ref:r,asChild:!0,children:V(t)}));m.displayName="AlertDialog.Trigger";const h=a.forwardRef(({align:t,...o},r)=>{const{align:n,...l}=_t,{className:i}=J({align:t},{align:n}),{className:c,forceMount:d,container:j,...y}=J(o,l);return e.jsx(C.Portal,{container:j,forceMount:d,children:e.jsx(X,{asChild:!0,children:e.jsx(C.Overlay,{className:"rt-BaseDialogOverlay rt-AlertDialogOverlay",children:e.jsx("div",{className:"rt-BaseDialogScroll rt-AlertDialogScroll",children:e.jsx("div",{className:`rt-BaseDialogScrollPadding rt-AlertDialogScrollPadding ${i}`,children:e.jsx(C.Content,{...y,ref:r,className:ze("rt-BaseDialogContent","rt-AlertDialogContent",c)})})})})})})});h.displayName="AlertDialog.Content";const D=a.forwardRef((t,o)=>e.jsx(C.Title,{asChild:!0,children:e.jsx(He,{size:"5",mb:"3",trim:"start",...t,asChild:!1,ref:o})}));D.displayName="AlertDialog.Title";const f=a.forwardRef((t,o)=>e.jsx(C.Description,{asChild:!0,children:e.jsx(x,{as:"p",size:"3",...t,asChild:!1,ref:o})}));f.displayName="AlertDialog.Description";const u=a.forwardRef(({children:t,...o},r)=>e.jsx(C.Action,{...o,ref:r,asChild:!0,children:V(t)}));u.displayName="AlertDialog.Action";const A=a.forwardRef(({children:t,...o},r)=>e.jsx(C.Cancel,{...o,ref:r,asChild:!0,children:V(t)}));A.displayName="AlertDialog.Cancel";p.__docgenInfo={description:"",methods:[],displayName:"AlertDialog.Root"};m.__docgenInfo={description:"",methods:[],displayName:"AlertDialog.Trigger",composes:["ComponentPropsWithout"]};h.__docgenInfo={description:"",methods:[],displayName:"AlertDialog.Content",props:{container:{required:!1,tsType:{name:'ReactComponentPropsWithoutRef["container"]',raw:`React.ComponentPropsWithoutRef<
  typeof AlertDialogPrimitive.Portal
>["container"]`},description:""}},composes:["ComponentPropsWithout","AlertDialogContentOwnProps"]};D.__docgenInfo={description:"",methods:[],displayName:"AlertDialog.Title"};f.__docgenInfo={description:"",methods:[],displayName:"AlertDialog.Description"};u.__docgenInfo={description:"",methods:[],displayName:"AlertDialog.Action",composes:["ComponentPropsWithout"]};A.__docgenInfo={description:"",methods:[],displayName:"AlertDialog.Cancel",composes:["ComponentPropsWithout"]};const Qt={title:"Base/AlertDialog",component:p,parameters:{layout:"centered"},decorators:[t=>e.jsx(X,{children:e.jsx(t,{})})]},P={render:t=>e.jsxs(p,{children:[e.jsx(m,{children:e.jsx(s,{color:"red",children:"Delete Account"})}),e.jsxs(h,{style:{maxWidth:"450px"},children:[e.jsx(D,{children:"Are you absolutely sure?"}),e.jsx(f,{children:"This action cannot be undone. This will permanently delete your account and remove your data from our servers."}),e.jsxs(g,{gap:"3",mt:"4",justify:"end",children:[e.jsx(A,{children:e.jsx(s,{variant:"soft",color:"gray",children:"Cancel"})}),e.jsx(u,{children:e.jsx(s,{variant:"solid",color:"red",children:"Yes, delete account"})})]})]})]})},S={render:t=>e.jsxs(p,{children:[e.jsx(m,{children:e.jsx(s,{color:"red",variant:"solid",children:"Delete Project"})}),e.jsxs(h,{style:{maxWidth:"450px"},children:[e.jsx(D,{children:"Delete Project"}),e.jsx(f,{children:"Are you sure you want to delete this project? This action cannot be undone and will permanently remove all project files, settings, and associated data."}),e.jsxs(g,{gap:"3",mt:"4",justify:"end",children:[e.jsx(A,{children:e.jsx(s,{variant:"soft",color:"gray",children:"Cancel"})}),e.jsx(u,{children:e.jsx(s,{variant:"solid",color:"red",children:"Delete Project"})})]})]})]})},N={render:t=>e.jsxs(p,{children:[e.jsx(m,{children:e.jsx(s,{color:"blue",children:"Save Changes"})}),e.jsxs(h,{style:{maxWidth:"400px"},children:[e.jsx(D,{children:"Save Changes?"}),e.jsx(f,{children:"You have unsaved changes. Do you want to save your changes before leaving?"}),e.jsxs(g,{gap:"3",mt:"4",justify:"end",children:[e.jsx(A,{children:e.jsx(s,{variant:"soft",color:"gray",children:"Don't Save"})}),e.jsx(u,{children:e.jsx(s,{variant:"solid",color:"blue",children:"Save Changes"})})]})]})]})},E={render:t=>e.jsxs(p,{children:[e.jsx(m,{children:e.jsx(s,{color:"orange",variant:"outline",children:"Reset Settings"})}),e.jsxs(h,{style:{maxWidth:"450px"},children:[e.jsx(D,{children:"Reset All Settings"}),e.jsx(f,{children:"This will reset all your preferences to their default values. Your personal data will not be affected, but you'll need to reconfigure your settings."}),e.jsxs(g,{gap:"3",mt:"4",justify:"end",children:[e.jsx(A,{children:e.jsx(s,{variant:"soft",color:"gray",children:"Cancel"})}),e.jsx(u,{children:e.jsx(s,{variant:"solid",color:"orange",children:"Reset Settings"})})]})]})]})},F={render:t=>e.jsxs(p,{children:[e.jsx(m,{children:e.jsx(s,{color:"blue",variant:"soft",children:"Show Info"})}),e.jsxs(h,{style:{maxWidth:"400px"},children:[e.jsx(D,{children:"Important Information"}),e.jsx(f,{children:"Your subscription will expire in 7 days. To continue using all features, please renew your subscription before it expires."}),e.jsxs(g,{gap:"3",mt:"4",justify:"end",children:[e.jsx(A,{children:e.jsx(s,{variant:"soft",color:"gray",children:"Later"})}),e.jsx(u,{children:e.jsx(s,{variant:"solid",color:"blue",children:"Renew Now"})})]})]})]})},I={render:t=>e.jsxs(p,{children:[e.jsx(m,{children:e.jsx(s,{color:"gray",variant:"outline",children:"Logout"})}),e.jsxs(h,{style:{maxWidth:"400px"},children:[e.jsx(D,{children:"Logout Confirmation"}),e.jsx(f,{children:"Are you sure you want to logout? Any unsaved changes will be lost."}),e.jsxs(g,{gap:"3",mt:"4",justify:"end",children:[e.jsx(A,{children:e.jsx(s,{variant:"soft",color:"gray",children:"Stay Logged In"})}),e.jsx(u,{children:e.jsx(s,{variant:"solid",color:"red",children:"Logout"})})]})]})]})},W={render:t=>e.jsxs(p,{children:[e.jsx(m,{children:e.jsx(s,{color:"red",size:"1",children:"🗑️ Delete"})}),e.jsxs(h,{style:{maxWidth:"500px"},children:[e.jsx(D,{children:"Delete File"}),e.jsx(f,{style:{marginBottom:"16px"},children:"You are about to permanently delete the following file:"}),e.jsxs("div",{style:{padding:"12px",backgroundColor:"#f8f9fa",borderRadius:"6px",border:"1px solid #e1e5e9",marginBottom:"16px"},children:[e.jsx(x,{size:"2",weight:"medium",children:"📄 project-proposal.pdf"}),e.jsx(x,{size:"1",color:"gray",style:{marginTop:"4px",display:"block"},children:"Size: 2.4 MB • Modified: 2 hours ago"})]}),e.jsx(x,{size:"2",color:"red",children:"This action cannot be undone. The file will be permanently removed from your account."}),e.jsxs(g,{gap:"3",mt:"4",justify:"end",children:[e.jsx(A,{children:e.jsx(s,{variant:"soft",color:"gray",children:"Keep File"})}),e.jsx(u,{children:e.jsx(s,{variant:"solid",color:"red",children:"Delete Forever"})})]})]})]})},O={render:t=>e.jsxs(p,{children:[e.jsx(m,{children:e.jsx(s,{color:"orange",children:"Unsaved Changes"})}),e.jsxs(h,{style:{maxWidth:"450px"},children:[e.jsx(D,{children:"Unsaved Changes"}),e.jsx(f,{children:"You have unsaved changes in your document. What would you like to do?"}),e.jsxs(g,{gap:"2",mt:"4",justify:"end",wrap:"wrap",children:[e.jsx(A,{children:e.jsx(s,{variant:"ghost",color:"gray",size:"2",children:"Cancel"})}),e.jsx(u,{children:e.jsx(s,{variant:"soft",color:"red",size:"2",children:"Discard Changes"})}),e.jsx(u,{children:e.jsx(s,{variant:"solid",color:"blue",size:"2",children:"Save & Continue"})})]})]})]})},z={render:t=>e.jsxs(p,{children:[e.jsx(m,{children:e.jsx(s,{color:"purple",variant:"solid",children:"Custom Dialog"})}),e.jsxs(h,{style:{maxWidth:"480px",padding:"24px",borderRadius:"12px",border:"2px solid #7c3aed"},children:[e.jsxs("div",{style:{textAlign:"center",marginBottom:"16px"},children:[e.jsx("div",{style:{fontSize:"48px",marginBottom:"8px"},children:"🎉"}),e.jsx(D,{style:{fontSize:"24px",color:"#7c3aed"},children:"Congratulations!"})]}),e.jsx(f,{style:{textAlign:"center",fontSize:"16px",lineHeight:"1.5"},children:"You've successfully completed all tasks in your project! Your team's productivity has increased by 40% this month."}),e.jsxs(g,{gap:"3",mt:"6",justify:"center",children:[e.jsx(A,{children:e.jsx(s,{variant:"soft",color:"gray",children:"Close"})}),e.jsx(u,{children:e.jsx(s,{variant:"solid",color:"purple",children:"View Report"})})]})]})]})},M={render:t=>e.jsxs(p,{children:[e.jsx(m,{children:e.jsx(s,{color:"green",variant:"solid",children:"Complete Purchase"})}),e.jsxs(h,{style:{maxWidth:"450px"},children:[e.jsx(D,{children:"Confirm Purchase"}),e.jsx(f,{style:{marginBottom:"16px"},children:"Please confirm your purchase details:"}),e.jsxs("div",{style:{padding:"16px",backgroundColor:"#f8f9fa",borderRadius:"8px",marginBottom:"16px",border:"1px solid #e1e5e9"},children:[e.jsxs(g,{justify:"between",style:{marginBottom:"8px"},children:[e.jsx(x,{size:"2",children:"Pro Plan (Monthly)"}),e.jsx(x,{size:"2",weight:"medium",children:"$29.00"})]}),e.jsxs(g,{justify:"between",style:{marginBottom:"8px"},children:[e.jsx(x,{size:"2",color:"gray",children:"Tax"}),e.jsx(x,{size:"2",color:"gray",children:"$2.32"})]}),e.jsx("div",{style:{height:"1px",backgroundColor:"#e1e5e9",margin:"8px 0"}}),e.jsxs(g,{justify:"between",children:[e.jsx(x,{size:"2",weight:"bold",children:"Total"}),e.jsx(x,{size:"2",weight:"bold",children:"$31.32"})]})]}),e.jsx(x,{size:"2",color:"gray",children:"Payment will be charged to your default payment method."}),e.jsxs(g,{gap:"3",mt:"4",justify:"end",children:[e.jsx(A,{children:e.jsx(s,{variant:"soft",color:"gray",children:"Cancel"})}),e.jsx(u,{children:e.jsx(s,{variant:"solid",color:"green",children:"Complete Purchase"})})]})]})]})},$={render:t=>e.jsxs(p,{children:[e.jsx(m,{children:e.jsx(s,{color:"blue",variant:"outline",children:"Export Data"})}),e.jsxs(h,{style:{maxWidth:"500px"},children:[e.jsx(D,{children:"Export Your Data"}),e.jsx(f,{style:{marginBottom:"16px"},children:"We'll prepare a downloadable archive containing all your account data. This may take a few minutes depending on the amount of data."}),e.jsxs("div",{style:{padding:"12px",backgroundColor:"#eff6ff",borderRadius:"6px",border:"1px solid #bfdbfe",marginBottom:"16px"},children:[e.jsx(x,{size:"2",weight:"medium",color:"blue",style:{marginBottom:"4px",display:"block"},children:"📦 Export will include:"}),e.jsxs("ul",{style:{margin:0,paddingLeft:"16px",fontSize:"14px",color:"#374151"},children:[e.jsx("li",{children:"Profile information and settings"}),e.jsx("li",{children:"All your projects and files"}),e.jsx("li",{children:"Activity history and logs"}),e.jsx("li",{children:"Shared content and collaborations"})]})]}),e.jsx(x,{size:"2",color:"gray",children:"You'll receive an email with the download link when your export is ready."}),e.jsxs(g,{gap:"3",mt:"4",justify:"end",children:[e.jsx(A,{children:e.jsx(s,{variant:"soft",color:"gray",children:"Cancel"})}),e.jsx(u,{children:e.jsx(s,{variant:"solid",color:"blue",children:"Start Export"})})]})]})]})};P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`{
  render: _args => <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button color="red">Delete Account</Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content style={{
      maxWidth: "450px"
    }}>
        <AlertDialog.Title>Are you absolutely sure?</AlertDialog.Title>
        <AlertDialog.Description>
          This action cannot be undone. This will permanently delete your
          account and remove your data from our servers.
        </AlertDialog.Description>
        <Flex gap="3" mt="4" justify="end">
          <AlertDialog.Cancel>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Button variant="solid" color="red">
              Yes, delete account
            </Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
}`,...P.parameters?.docs?.source}}};S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  render: _args => <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button color="red" variant="solid">
          Delete Project
        </Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content style={{
      maxWidth: "450px"
    }}>
        <AlertDialog.Title>Delete Project</AlertDialog.Title>
        <AlertDialog.Description>
          Are you sure you want to delete this project? This action cannot be
          undone and will permanently remove all project files, settings, and
          associated data.
        </AlertDialog.Description>
        <Flex gap="3" mt="4" justify="end">
          <AlertDialog.Cancel>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Button variant="solid" color="red">
              Delete Project
            </Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
}`,...S.parameters?.docs?.source}}};N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`{
  render: _args => <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button color="blue">Save Changes</Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content style={{
      maxWidth: "400px"
    }}>
        <AlertDialog.Title>Save Changes?</AlertDialog.Title>
        <AlertDialog.Description>
          You have unsaved changes. Do you want to save your changes before
          leaving?
        </AlertDialog.Description>
        <Flex gap="3" mt="4" justify="end">
          <AlertDialog.Cancel>
            <Button variant="soft" color="gray">
              Don't Save
            </Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Button variant="solid" color="blue">
              Save Changes
            </Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
}`,...N.parameters?.docs?.source}}};E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  render: _args => <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button color="orange" variant="outline">
          Reset Settings
        </Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content style={{
      maxWidth: "450px"
    }}>
        <AlertDialog.Title>Reset All Settings</AlertDialog.Title>
        <AlertDialog.Description>
          This will reset all your preferences to their default values. Your
          personal data will not be affected, but you'll need to reconfigure
          your settings.
        </AlertDialog.Description>
        <Flex gap="3" mt="4" justify="end">
          <AlertDialog.Cancel>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Button variant="solid" color="orange">
              Reset Settings
            </Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
}`,...E.parameters?.docs?.source}}};F.parameters={...F.parameters,docs:{...F.parameters?.docs,source:{originalSource:`{
  render: _args => <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button color="blue" variant="soft">
          Show Info
        </Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content style={{
      maxWidth: "400px"
    }}>
        <AlertDialog.Title>Important Information</AlertDialog.Title>
        <AlertDialog.Description>
          Your subscription will expire in 7 days. To continue using all
          features, please renew your subscription before it expires.
        </AlertDialog.Description>
        <Flex gap="3" mt="4" justify="end">
          <AlertDialog.Cancel>
            <Button variant="soft" color="gray">
              Later
            </Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Button variant="solid" color="blue">
              Renew Now
            </Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
}`,...F.parameters?.docs?.source}}};I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:`{
  render: _args => <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button color="gray" variant="outline">
          Logout
        </Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content style={{
      maxWidth: "400px"
    }}>
        <AlertDialog.Title>Logout Confirmation</AlertDialog.Title>
        <AlertDialog.Description>
          Are you sure you want to logout? Any unsaved changes will be lost.
        </AlertDialog.Description>
        <Flex gap="3" mt="4" justify="end">
          <AlertDialog.Cancel>
            <Button variant="soft" color="gray">
              Stay Logged In
            </Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Button variant="solid" color="red">
              Logout
            </Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
}`,...I.parameters?.docs?.source}}};W.parameters={...W.parameters,docs:{...W.parameters?.docs,source:{originalSource:`{
  render: _args => <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button color="red" size="1">
          🗑️ Delete
        </Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content style={{
      maxWidth: "500px"
    }}>
        <AlertDialog.Title>Delete File</AlertDialog.Title>
        <AlertDialog.Description style={{
        marginBottom: "16px"
      }}>
          You are about to permanently delete the following file:
        </AlertDialog.Description>
        <div style={{
        padding: "12px",
        backgroundColor: "#f8f9fa",
        borderRadius: "6px",
        border: "1px solid #e1e5e9",
        marginBottom: "16px"
      }}>
          <Text size="2" weight="medium">
            📄 project-proposal.pdf
          </Text>
          <Text size="1" color="gray" style={{
          marginTop: "4px",
          display: "block"
        }}>
            Size: 2.4 MB • Modified: 2 hours ago
          </Text>
        </div>
        <Text size="2" color="red">
          This action cannot be undone. The file will be permanently removed
          from your account.
        </Text>
        <Flex gap="3" mt="4" justify="end">
          <AlertDialog.Cancel>
            <Button variant="soft" color="gray">
              Keep File
            </Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Button variant="solid" color="red">
              Delete Forever
            </Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
}`,...W.parameters?.docs?.source}}};O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
  render: _args => <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button color="orange">Unsaved Changes</Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content style={{
      maxWidth: "450px"
    }}>
        <AlertDialog.Title>Unsaved Changes</AlertDialog.Title>
        <AlertDialog.Description>
          You have unsaved changes in your document. What would you like to do?
        </AlertDialog.Description>
        <Flex gap="2" mt="4" justify="end" wrap="wrap">
          <AlertDialog.Cancel>
            <Button variant="ghost" color="gray" size="2">
              Cancel
            </Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Button variant="soft" color="red" size="2">
              Discard Changes
            </Button>
          </AlertDialog.Action>
          <AlertDialog.Action>
            <Button variant="solid" color="blue" size="2">
              Save & Continue
            </Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
}`,...O.parameters?.docs?.source}}};z.parameters={...z.parameters,docs:{...z.parameters?.docs,source:{originalSource:`{
  render: _args => <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button color="purple" variant="solid">
          Custom Dialog
        </Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content style={{
      maxWidth: "480px",
      padding: "24px",
      borderRadius: "12px",
      border: "2px solid #7c3aed"
    }}>
        <div style={{
        textAlign: "center",
        marginBottom: "16px"
      }}>
          <div style={{
          fontSize: "48px",
          marginBottom: "8px"
        }}>🎉</div>
          <AlertDialog.Title style={{
          fontSize: "24px",
          color: "#7c3aed"
        }}>
            Congratulations!
          </AlertDialog.Title>
        </div>
        <AlertDialog.Description style={{
        textAlign: "center",
        fontSize: "16px",
        lineHeight: "1.5"
      }}>
          You've successfully completed all tasks in your project! Your team's
          productivity has increased by 40% this month.
        </AlertDialog.Description>
        <Flex gap="3" mt="6" justify="center">
          <AlertDialog.Cancel>
            <Button variant="soft" color="gray">
              Close
            </Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Button variant="solid" color="purple">
              View Report
            </Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
}`,...z.parameters?.docs?.source}}};M.parameters={...M.parameters,docs:{...M.parameters?.docs,source:{originalSource:`{
  render: _args => <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button color="green" variant="solid">
          Complete Purchase
        </Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content style={{
      maxWidth: "450px"
    }}>
        <AlertDialog.Title>Confirm Purchase</AlertDialog.Title>
        <AlertDialog.Description style={{
        marginBottom: "16px"
      }}>
          Please confirm your purchase details:
        </AlertDialog.Description>

        <div style={{
        padding: "16px",
        backgroundColor: "#f8f9fa",
        borderRadius: "8px",
        marginBottom: "16px",
        border: "1px solid #e1e5e9"
      }}>
          <Flex justify="between" style={{
          marginBottom: "8px"
        }}>
            <Text size="2">Pro Plan (Monthly)</Text>
            <Text size="2" weight="medium">
              $29.00
            </Text>
          </Flex>
          <Flex justify="between" style={{
          marginBottom: "8px"
        }}>
            <Text size="2" color="gray">
              Tax
            </Text>
            <Text size="2" color="gray">
              $2.32
            </Text>
          </Flex>
          <div style={{
          height: "1px",
          backgroundColor: "#e1e5e9",
          margin: "8px 0"
        }} />
          <Flex justify="between">
            <Text size="2" weight="bold">
              Total
            </Text>
            <Text size="2" weight="bold">
              $31.32
            </Text>
          </Flex>
        </div>

        <Text size="2" color="gray">
          Payment will be charged to your default payment method.
        </Text>

        <Flex gap="3" mt="4" justify="end">
          <AlertDialog.Cancel>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Button variant="solid" color="green">
              Complete Purchase
            </Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
}`,...M.parameters?.docs?.source}}};$.parameters={...$.parameters,docs:{...$.parameters?.docs,source:{originalSource:`{
  render: _args => <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button color="blue" variant="outline">
          Export Data
        </Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content style={{
      maxWidth: "500px"
    }}>
        <AlertDialog.Title>Export Your Data</AlertDialog.Title>
        <AlertDialog.Description style={{
        marginBottom: "16px"
      }}>
          We'll prepare a downloadable archive containing all your account data.
          This may take a few minutes depending on the amount of data.
        </AlertDialog.Description>

        <div style={{
        padding: "12px",
        backgroundColor: "#eff6ff",
        borderRadius: "6px",
        border: "1px solid #bfdbfe",
        marginBottom: "16px"
      }}>
          <Text size="2" weight="medium" color="blue" style={{
          marginBottom: "4px",
          display: "block"
        }}>
            📦 Export will include:
          </Text>
          <ul style={{
          margin: 0,
          paddingLeft: "16px",
          fontSize: "14px",
          color: "#374151"
        }}>
            <li>Profile information and settings</li>
            <li>All your projects and files</li>
            <li>Activity history and logs</li>
            <li>Shared content and collaborations</li>
          </ul>
        </div>

        <Text size="2" color="gray">
          You'll receive an email with the download link when your export is
          ready.
        </Text>

        <Flex gap="3" mt="4" justify="end">
          <AlertDialog.Cancel>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Button variant="solid" color="blue">
              Start Export
            </Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
}`,...$.parameters?.docs?.source}}};const Xt=["Default","DestructiveAction","Confirmation","Warning","Information","LogoutConfirmation","FileDeleteWithDetails","MultipleActions","CustomStyled","PaymentConfirmation","DataExport"];export{N as Confirmation,z as CustomStyled,$ as DataExport,P as Default,S as DestructiveAction,W as FileDeleteWithDetails,F as Information,I as LogoutConfirmation,O as MultipleActions,M as PaymentConfirmation,E as Warning,Xt as __namedExportsOrder,Qt as default};
