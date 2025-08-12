import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{h as N,f as I,d as G,e as M,a as Y}from"./high-contrast.prop-DN4VqJ5o.js";import{r as J}from"./iframe-DsuaOdjx.js";import{t as K,a as V,l as O,w as q}from"./weight.prop-Rt1sSGdE.js";import{T as i}from"./text-Bwa-Y73d.js";import"./avatar-RXesCRZq.js";import"./button-ClCv9eVs.js";import"./card-DfIScEG2.js";import{F as s}from"./flex-bym-5aeO.js";import"./icon-button-QpiRLWqf.js";import"./base-button-Dyf4vkZD.js";import{T as Q}from"./theme-BFbej9HP.js";import"./index-CVlKO6je.js";import"./index-BW54sZL3.js";import"./preload-helper-D9Z9MdNV.js";import"./get-subtree-COcTOnEl.js";import"./radius.prop-BFb5uVoY.js";const X=["1","2","3","4","5","6","7","8","9"],Z=["auto","always","hover","none"],$={...G,size:{type:"enum",className:"rt-r-size",values:X,responsive:!0},...q,...O,...V,...K,underline:{type:"enum",className:"rt-underline",values:Z,default:"auto"},...I,...N},r=J.forwardRef((n,E)=>{const{children:A,className:H,color:R,asChild:U,...D}=M(n,$);return e.jsx(i,{...D,"data-accent-color":R,ref:E,asChild:!0,className:Y("rt-reset","rt-Link",H),children:U?A:e.jsx("a",{children:A})})});r.displayName="Link";r.__docgenInfo={description:"",methods:[],displayName:"Link",composes:["ComponentPropsWithout"]};const ke={title:"Base/Link",component:r,parameters:{layout:"centered"},decorators:[n=>e.jsx(Q,{children:e.jsx("div",{style:{padding:"20px"},children:e.jsx(n,{})})})],argTypes:{size:{control:"select",options:["1","2","3","4","5","6","7","8","9"],description:"Link text size"},weight:{control:"select",options:["light","regular","medium","bold"],description:"Link text weight"},color:{control:"select",options:["gray","gold","bronze","brown","yellow","amber","orange","tomato","red","ruby","crimson","pink","plum","purple","violet","iris","indigo","blue","cyan","teal","jade","green","grass","lime","mint","sky"],description:"Link color"},highContrast:{control:"boolean",description:"High contrast mode"},underline:{control:"select",options:["auto","hover","always","never"],description:"Link underline behavior"}},args:{size:"2",children:"Example link",href:"#"}},o={render:n=>e.jsx(r,{...n,children:"Default Link"})},t={render:n=>e.jsx(r,{size:"1",href:"#",children:"Size 1 Link"})},a={render:n=>e.jsx(r,{size:"2",href:"#",children:"Size 2 Link"})},l={render:n=>e.jsx(r,{size:"3",href:"#",children:"Size 3 Link"})},c={render:n=>e.jsx(r,{size:"4",href:"#",children:"Size 4 Link"})},d={render:n=>e.jsx(r,{weight:"light",href:"#",children:"Light Weight Link"})},h={render:n=>e.jsx(r,{weight:"regular",href:"#",children:"Regular Weight Link"})},p={render:n=>e.jsx(r,{weight:"medium",href:"#",children:"Medium Weight Link"})},m={render:n=>e.jsx(r,{weight:"bold",href:"#",children:"Bold Weight Link"})},g={render:n=>e.jsx(r,{color:"blue",href:"#",children:"Blue Link"})},u={render:n=>e.jsx(r,{color:"red",href:"#",children:"Red Link"})},x={render:n=>e.jsx(r,{color:"green",href:"#",children:"Green Link"})},k={render:n=>e.jsx(r,{color:"purple",href:"#",children:"Purple Link"})},L={render:n=>e.jsx(r,{underline:"auto",href:"#",children:"Auto Underline (default)"})},f={render:n=>e.jsx(r,{underline:"hover",href:"#",children:"Hover Underline"})},y={render:n=>e.jsx(r,{underline:"always",href:"#",children:"Always Underlined"})},z={render:n=>e.jsx(r,{underline:"never",href:"#",children:"Never Underlined"})},j={render:n=>e.jsx(r,{highContrast:!0,href:"#",children:"High Contrast Link"})},b={render:()=>e.jsxs(s,{direction:"column",gap:"2",children:[e.jsx(r,{size:"1",href:"#",children:"Size 1"}),e.jsx(r,{size:"2",href:"#",children:"Size 2"}),e.jsx(r,{size:"3",href:"#",children:"Size 3"}),e.jsx(r,{size:"4",href:"#",children:"Size 4"}),e.jsx(r,{size:"5",href:"#",children:"Size 5"}),e.jsx(r,{size:"6",href:"#",children:"Size 6"})]})},w={render:()=>e.jsxs(s,{direction:"column",gap:"2",children:[e.jsx(r,{weight:"light",href:"#",children:"Light Weight"}),e.jsx(r,{weight:"regular",href:"#",children:"Regular Weight"}),e.jsx(r,{weight:"medium",href:"#",children:"Medium Weight"}),e.jsx(r,{weight:"bold",href:"#",children:"Bold Weight"})]})},v={render:()=>e.jsxs(s,{direction:"column",gap:"2",children:[e.jsx(r,{underline:"auto",href:"#",children:"Auto underline"}),e.jsx(r,{underline:"hover",href:"#",children:"Hover underline"}),e.jsx(r,{underline:"always",href:"#",children:"Always underlined"}),e.jsx(r,{underline:"never",href:"#",children:"Never underlined"})]})},S={render:()=>e.jsxs(i,{size:"3",style:{maxWidth:"400px",lineHeight:"1.6"},children:["This is a paragraph of text that contains several"," ",e.jsx(r,{href:"#",children:"inline links"})," to demonstrate how links appear within text content. You can also have"," ",e.jsx(r,{href:"#",color:"red",children:"colored links"})," ","and"," ",e.jsx(r,{href:"#",weight:"bold",children:"bold links"})," ","for emphasis."]})},T={render:()=>e.jsxs("div",{children:[e.jsx(i,{size:"3",weight:"bold",style:{marginBottom:"16px",display:"block"},children:"Navigation Menu"}),e.jsxs(s,{gap:"6",children:[e.jsx(r,{href:"#",size:"2",weight:"medium",children:"Home"}),e.jsx(r,{href:"#",size:"2",weight:"medium",children:"Products"}),e.jsx(r,{href:"#",size:"2",weight:"medium",children:"About"}),e.jsx(r,{href:"#",size:"2",weight:"medium",children:"Contact"})]})]})},B={render:()=>e.jsx("div",{style:{backgroundColor:"#f8f9fa",padding:"24px",borderRadius:"8px",maxWidth:"500px"},children:e.jsxs(s,{direction:"column",gap:"4",children:[e.jsxs("div",{children:[e.jsx(i,{size:"2",weight:"bold",style:{marginBottom:"8px",display:"block"},children:"Company"}),e.jsxs(s,{direction:"column",gap:"1",children:[e.jsx(r,{href:"#",size:"1",color:"gray",children:"About Us"}),e.jsx(r,{href:"#",size:"1",color:"gray",children:"Careers"}),e.jsx(r,{href:"#",size:"1",color:"gray",children:"Press"}),e.jsx(r,{href:"#",size:"1",color:"gray",children:"News"})]})]}),e.jsxs("div",{children:[e.jsx(i,{size:"2",weight:"bold",style:{marginBottom:"8px",display:"block"},children:"Support"}),e.jsxs(s,{direction:"column",gap:"1",children:[e.jsx(r,{href:"#",size:"1",color:"gray",children:"Help Center"}),e.jsx(r,{href:"#",size:"1",color:"gray",children:"Documentation"}),e.jsx(r,{href:"#",size:"1",color:"gray",children:"Contact Support"}),e.jsx(r,{href:"#",size:"1",color:"gray",children:"Status Page"})]})]}),e.jsxs("div",{children:[e.jsx(i,{size:"2",weight:"bold",style:{marginBottom:"8px",display:"block"},children:"Legal"}),e.jsxs(s,{direction:"column",gap:"1",children:[e.jsx(r,{href:"#",size:"1",color:"gray",children:"Privacy Policy"}),e.jsx(r,{href:"#",size:"1",color:"gray",children:"Terms of Service"}),e.jsx(r,{href:"#",size:"1",color:"gray",children:"Cookie Policy"})]})]})]})})},_={render:()=>e.jsxs("div",{children:[e.jsx(i,{size:"3",weight:"bold",style:{marginBottom:"12px",display:"block"},children:"Breadcrumb Navigation"}),e.jsxs(s,{align:"center",gap:"2",children:[e.jsx(r,{href:"#",size:"2",color:"gray",children:"Home"}),e.jsx(i,{size:"2",color:"gray",children:"/"}),e.jsx(r,{href:"#",size:"2",color:"gray",children:"Products"}),e.jsx(i,{size:"2",color:"gray",children:"/"}),e.jsx(r,{href:"#",size:"2",color:"gray",children:"Electronics"}),e.jsx(i,{size:"2",color:"gray",children:"/"}),e.jsx(i,{size:"2",weight:"medium",children:"Laptop"})]})]})},C={render:()=>e.jsxs("div",{children:[e.jsx(i,{size:"3",weight:"bold",style:{marginBottom:"16px",display:"block"},children:"Follow Us"}),e.jsxs(s,{gap:"4",children:[e.jsx(r,{href:"#",color:"blue",weight:"medium",children:"Twitter"}),e.jsx(r,{href:"#",color:"indigo",weight:"medium",children:"Facebook"}),e.jsx(r,{href:"#",color:"purple",weight:"medium",children:"Instagram"}),e.jsx(r,{href:"#",color:"blue",weight:"medium",children:"LinkedIn"}),e.jsx(r,{href:"#",color:"red",weight:"medium",children:"YouTube"})]})]})},F={render:()=>e.jsxs("div",{style:{maxWidth:"400px"},children:[e.jsx(i,{size:"4",weight:"bold",style:{marginBottom:"12px",display:"block"},children:"Get Started Today"}),e.jsx(i,{size:"2",style:{marginBottom:"16px",display:"block",lineHeight:"1.6"},children:"Join thousands of developers who are already building amazing applications with our component library."}),e.jsxs(s,{gap:"4",children:[e.jsx(r,{href:"#",size:"3",weight:"bold",color:"blue",children:"Start Free Trial →"}),e.jsx(r,{href:"#",size:"2",underline:"always",children:"View Documentation"})]})]})},W={render:()=>e.jsxs("div",{children:[e.jsx(i,{size:"3",weight:"bold",style:{marginBottom:"16px",display:"block"},children:"External Resources"}),e.jsxs(s,{direction:"column",gap:"2",children:[e.jsx(r,{href:"https://react.dev",target:"_blank",rel:"noopener noreferrer",children:"React Documentation ↗"}),e.jsx(r,{href:"https://www.typescriptlang.org",target:"_blank",rel:"noopener noreferrer",children:"TypeScript Handbook ↗"}),e.jsx(r,{href:"https://storybook.js.org",target:"_blank",rel:"noopener noreferrer",children:"Storybook Docs ↗"}),e.jsx(r,{href:"https://github.com",target:"_blank",rel:"noopener noreferrer",children:"GitHub Repository ↗"})]})]})},P={render:()=>e.jsxs("div",{style:{maxWidth:"500px"},children:[e.jsx(i,{size:"4",weight:"bold",style:{marginBottom:"16px",display:"block"},children:"Recent Blog Posts"}),e.jsxs(s,{direction:"column",gap:"4",children:[e.jsxs("div",{children:[e.jsx(r,{href:"#",size:"3",weight:"medium",style:{display:"block",marginBottom:"4px"},children:"Building Accessible React Components"}),e.jsx(i,{size:"2",color:"gray",children:"Learn how to create components that work for everyone..."})]}),e.jsxs("div",{children:[e.jsx(r,{href:"#",size:"3",weight:"medium",style:{display:"block",marginBottom:"4px"},children:"Advanced TypeScript Patterns for UI Libraries"}),e.jsx(i,{size:"2",color:"gray",children:"Explore sophisticated type patterns for better developer experience..."})]}),e.jsxs("div",{children:[e.jsx(r,{href:"#",size:"3",weight:"medium",style:{display:"block",marginBottom:"4px"},children:"Design System Best Practices in 2024"}),e.jsx(i,{size:"2",color:"gray",children:"Key principles for creating scalable design systems..."})]})]})]})};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: args => <Link {...args}>Default Link</Link>
}`,...o.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  render: _args => <Link size="1" href="#">
      Size 1 Link
    </Link>
}`,...t.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  render: _args => <Link size="2" href="#">
      Size 2 Link
    </Link>
}`,...a.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: _args => <Link size="3" href="#">
      Size 3 Link
    </Link>
}`,...l.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  render: _args => <Link size="4" href="#">
      Size 4 Link
    </Link>
}`,...c.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  render: _args => <Link weight="light" href="#">
      Light Weight Link
    </Link>
}`,...d.parameters?.docs?.source}}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  render: _args => <Link weight="regular" href="#">
      Regular Weight Link
    </Link>
}`,...h.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: _args => <Link weight="medium" href="#">
      Medium Weight Link
    </Link>
}`,...p.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  render: _args => <Link weight="bold" href="#">
      Bold Weight Link
    </Link>
}`,...m.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  render: _args => <Link color="blue" href="#">
      Blue Link
    </Link>
}`,...g.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  render: _args => <Link color="red" href="#">
      Red Link
    </Link>
}`,...u.parameters?.docs?.source}}};x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  render: _args => <Link color="green" href="#">
      Green Link
    </Link>
}`,...x.parameters?.docs?.source}}};k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  render: _args => <Link color="purple" href="#">
      Purple Link
    </Link>
}`,...k.parameters?.docs?.source}}};L.parameters={...L.parameters,docs:{...L.parameters?.docs,source:{originalSource:`{
  render: _args => <Link underline="auto" href="#">
      Auto Underline (default)
    </Link>
}`,...L.parameters?.docs?.source}}};f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  render: _args => <Link underline="hover" href="#">
      Hover Underline
    </Link>
}`,...f.parameters?.docs?.source}}};y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  render: _args => <Link underline="always" href="#">
      Always Underlined
    </Link>
}`,...y.parameters?.docs?.source}}};z.parameters={...z.parameters,docs:{...z.parameters?.docs,source:{originalSource:`{
  render: _args => <Link underline="never" href="#">
      Never Underlined
    </Link>
}`,...z.parameters?.docs?.source}}};j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  render: _args => <Link highContrast href="#">
      High Contrast Link
    </Link>
}`,...j.parameters?.docs?.source}}};b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  render: () => <Flex direction="column" gap="2">
      <Link size="1" href="#">
        Size 1
      </Link>
      <Link size="2" href="#">
        Size 2
      </Link>
      <Link size="3" href="#">
        Size 3
      </Link>
      <Link size="4" href="#">
        Size 4
      </Link>
      <Link size="5" href="#">
        Size 5
      </Link>
      <Link size="6" href="#">
        Size 6
      </Link>
    </Flex>
}`,...b.parameters?.docs?.source}}};w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  render: () => <Flex direction="column" gap="2">
      <Link weight="light" href="#">
        Light Weight
      </Link>
      <Link weight="regular" href="#">
        Regular Weight
      </Link>
      <Link weight="medium" href="#">
        Medium Weight
      </Link>
      <Link weight="bold" href="#">
        Bold Weight
      </Link>
    </Flex>
}`,...w.parameters?.docs?.source}}};v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  render: () => <Flex direction="column" gap="2">
      <Link underline="auto" href="#">
        Auto underline
      </Link>
      <Link underline="hover" href="#">
        Hover underline
      </Link>
      <Link underline="always" href="#">
        Always underlined
      </Link>
      <Link underline="never" href="#">
        Never underlined
      </Link>
    </Flex>
}`,...v.parameters?.docs?.source}}};S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  render: () => <Text size="3" style={{
    maxWidth: "400px",
    lineHeight: "1.6"
  }}>
      This is a paragraph of text that contains several{" "}
      <Link href="#">inline links</Link> to demonstrate how links appear within
      text content. You can also have{" "}
      <Link href="#" color="red">
        colored links
      </Link>{" "}
      and{" "}
      <Link href="#" weight="bold">
        bold links
      </Link>{" "}
      for emphasis.
    </Text>
}`,...S.parameters?.docs?.source}}};T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  render: () => <div>
      <Text size="3" weight="bold" style={{
      marginBottom: "16px",
      display: "block"
    }}>
        Navigation Menu
      </Text>
      <Flex gap="6">
        <Link href="#" size="2" weight="medium">
          Home
        </Link>
        <Link href="#" size="2" weight="medium">
          Products
        </Link>
        <Link href="#" size="2" weight="medium">
          About
        </Link>
        <Link href="#" size="2" weight="medium">
          Contact
        </Link>
      </Flex>
    </div>
}`,...T.parameters?.docs?.source}}};B.parameters={...B.parameters,docs:{...B.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    backgroundColor: "#f8f9fa",
    padding: "24px",
    borderRadius: "8px",
    maxWidth: "500px"
  }}>
      <Flex direction="column" gap="4">
        <div>
          <Text size="2" weight="bold" style={{
          marginBottom: "8px",
          display: "block"
        }}>
            Company
          </Text>
          <Flex direction="column" gap="1">
            <Link href="#" size="1" color="gray">
              About Us
            </Link>
            <Link href="#" size="1" color="gray">
              Careers
            </Link>
            <Link href="#" size="1" color="gray">
              Press
            </Link>
            <Link href="#" size="1" color="gray">
              News
            </Link>
          </Flex>
        </div>

        <div>
          <Text size="2" weight="bold" style={{
          marginBottom: "8px",
          display: "block"
        }}>
            Support
          </Text>
          <Flex direction="column" gap="1">
            <Link href="#" size="1" color="gray">
              Help Center
            </Link>
            <Link href="#" size="1" color="gray">
              Documentation
            </Link>
            <Link href="#" size="1" color="gray">
              Contact Support
            </Link>
            <Link href="#" size="1" color="gray">
              Status Page
            </Link>
          </Flex>
        </div>

        <div>
          <Text size="2" weight="bold" style={{
          marginBottom: "8px",
          display: "block"
        }}>
            Legal
          </Text>
          <Flex direction="column" gap="1">
            <Link href="#" size="1" color="gray">
              Privacy Policy
            </Link>
            <Link href="#" size="1" color="gray">
              Terms of Service
            </Link>
            <Link href="#" size="1" color="gray">
              Cookie Policy
            </Link>
          </Flex>
        </div>
      </Flex>
    </div>
}`,...B.parameters?.docs?.source}}};_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  render: () => <div>
      <Text size="3" weight="bold" style={{
      marginBottom: "12px",
      display: "block"
    }}>
        Breadcrumb Navigation
      </Text>
      <Flex align="center" gap="2">
        <Link href="#" size="2" color="gray">
          Home
        </Link>
        <Text size="2" color="gray">
          /
        </Text>
        <Link href="#" size="2" color="gray">
          Products
        </Link>
        <Text size="2" color="gray">
          /
        </Text>
        <Link href="#" size="2" color="gray">
          Electronics
        </Link>
        <Text size="2" color="gray">
          /
        </Text>
        <Text size="2" weight="medium">
          Laptop
        </Text>
      </Flex>
    </div>
}`,..._.parameters?.docs?.source}}};C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  render: () => <div>
      <Text size="3" weight="bold" style={{
      marginBottom: "16px",
      display: "block"
    }}>
        Follow Us
      </Text>
      <Flex gap="4">
        <Link href="#" color="blue" weight="medium">
          Twitter
        </Link>
        <Link href="#" color="indigo" weight="medium">
          Facebook
        </Link>
        <Link href="#" color="purple" weight="medium">
          Instagram
        </Link>
        <Link href="#" color="blue" weight="medium">
          LinkedIn
        </Link>
        <Link href="#" color="red" weight="medium">
          YouTube
        </Link>
      </Flex>
    </div>
}`,...C.parameters?.docs?.source}}};F.parameters={...F.parameters,docs:{...F.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    maxWidth: "400px"
  }}>
      <Text size="4" weight="bold" style={{
      marginBottom: "12px",
      display: "block"
    }}>
        Get Started Today
      </Text>
      <Text size="2" style={{
      marginBottom: "16px",
      display: "block",
      lineHeight: "1.6"
    }}>
        Join thousands of developers who are already building amazing
        applications with our component library.
      </Text>
      <Flex gap="4">
        <Link href="#" size="3" weight="bold" color="blue">
          Start Free Trial →
        </Link>
        <Link href="#" size="2" underline="always">
          View Documentation
        </Link>
      </Flex>
    </div>
}`,...F.parameters?.docs?.source}}};W.parameters={...W.parameters,docs:{...W.parameters?.docs,source:{originalSource:`{
  render: () => <div>
      <Text size="3" weight="bold" style={{
      marginBottom: "16px",
      display: "block"
    }}>
        External Resources
      </Text>
      <Flex direction="column" gap="2">
        <Link href="https://react.dev" target="_blank" rel="noopener noreferrer">
          React Documentation ↗
        </Link>
        <Link href="https://www.typescriptlang.org" target="_blank" rel="noopener noreferrer">
          TypeScript Handbook ↗
        </Link>
        <Link href="https://storybook.js.org" target="_blank" rel="noopener noreferrer">
          Storybook Docs ↗
        </Link>
        <Link href="https://github.com" target="_blank" rel="noopener noreferrer">
          GitHub Repository ↗
        </Link>
      </Flex>
    </div>
}`,...W.parameters?.docs?.source}}};P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    maxWidth: "500px"
  }}>
      <Text size="4" weight="bold" style={{
      marginBottom: "16px",
      display: "block"
    }}>
        Recent Blog Posts
      </Text>
      <Flex direction="column" gap="4">
        <div>
          <Link href="#" size="3" weight="medium" style={{
          display: "block",
          marginBottom: "4px"
        }}>
            Building Accessible React Components
          </Link>
          <Text size="2" color="gray">
            Learn how to create components that work for everyone...
          </Text>
        </div>

        <div>
          <Link href="#" size="3" weight="medium" style={{
          display: "block",
          marginBottom: "4px"
        }}>
            Advanced TypeScript Patterns for UI Libraries
          </Link>
          <Text size="2" color="gray">
            Explore sophisticated type patterns for better developer
            experience...
          </Text>
        </div>

        <div>
          <Link href="#" size="3" weight="medium" style={{
          display: "block",
          marginBottom: "4px"
        }}>
            Design System Best Practices in 2024
          </Link>
          <Text size="2" color="gray">
            Key principles for creating scalable design systems...
          </Text>
        </div>
      </Flex>
    </div>
}`,...P.parameters?.docs?.source}}};const Le=["Default","Size1","Size2","Size3","Size4","WeightLight","WeightRegular","WeightMedium","WeightBold","ColorBlue","ColorRed","ColorGreen","ColorPurple","UnderlineAuto","UnderlineHover","UnderlineAlways","UnderlineNever","HighContrast","AllSizes","AllWeights","AllUnderlines","InlineLinks","NavigationExample","FooterLinksExample","BreadcrumbExample","SocialLinksExample","CTALinksExample","ExternalLinksExample","ArticleLinksExample"];export{b as AllSizes,v as AllUnderlines,w as AllWeights,P as ArticleLinksExample,_ as BreadcrumbExample,F as CTALinksExample,g as ColorBlue,x as ColorGreen,k as ColorPurple,u as ColorRed,o as Default,W as ExternalLinksExample,B as FooterLinksExample,j as HighContrast,S as InlineLinks,T as NavigationExample,t as Size1,a as Size2,l as Size3,c as Size4,C as SocialLinksExample,y as UnderlineAlways,L as UnderlineAuto,f as UnderlineHover,z as UnderlineNever,m as WeightBold,d as WeightLight,p as WeightMedium,h as WeightRegular,Le as __namedExportsOrder,ke as default};
