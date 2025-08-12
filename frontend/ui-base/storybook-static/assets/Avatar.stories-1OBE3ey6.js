import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{A as s}from"./avatar-_BCNlzxm.js";import{T as M}from"./theme-BFbej9HP.js";import{F as a}from"./flex-bym-5aeO.js";import{T as n}from"./text-Bwa-Y73d.js";import"./avatar-RXesCRZq.js";import"./iframe-DsuaOdjx.js";import"./preload-helper-D9Z9MdNV.js";import"./high-contrast.prop-DN4VqJ5o.js";import"./index-CVlKO6je.js";import"./index-BW54sZL3.js";import"./get-subtree-COcTOnEl.js";import"./radius.prop-BFb5uVoY.js";import"./createLucideIcon-1puiGGu7.js";import"./weight.prop-Rt1sSGdE.js";const Z={title:"Base/Avatar",component:s,parameters:{layout:"centered"},decorators:[r=>e.jsx(M,{children:e.jsx(r,{})})],argTypes:{size:{control:"select",options:["1","2","3","4","5","6","7","8","9"],description:"Avatar size"},variant:{control:"select",options:["solid","soft"],description:"Avatar variant style"},color:{control:"select",options:["gray","gold","bronze","brown","yellow","amber","orange","tomato","red","ruby","crimson","pink","plum","purple","violet","iris","indigo","blue","cyan","teal","jade","green","grass","lime","mint","sky"],description:"Avatar accent color"},radius:{control:"select",options:["none","small","medium","large","full"],description:"Avatar border radius"},highContrast:{control:"boolean",description:"High contrast mode"},fallback:{control:"text",description:"Fallback content when image fails to load"},src:{control:"text",description:"Image source URL"},alt:{control:"text",description:"Alternative text for the image"}},args:{size:"3",variant:"soft",fallback:"JD"}},o={args:{fallback:"JD"}},l={args:{src:"https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?&w=64&h=64&dpr=2&q=70&crop=focalpoint&fp-x=0.5&fp-y=0.3&fp-z=1&fit=crop",alt:"John Doe",fallback:"JD"}},i={args:{src:"https://broken-image-url.jpg",alt:"Broken image",fallback:"AB"}},c={args:{size:"1",fallback:"XS"}},t={args:{size:"2",fallback:"S"}},p={args:{size:"3",fallback:"M"}},d={args:{size:"4",fallback:"L"}},m={args:{size:"5",fallback:"XL"}},g={args:{size:"6",fallback:"XXL"}},u={args:{size:"7",fallback:"3XL"}},x={args:{size:"8",fallback:"4XL"}},f={args:{size:"9",fallback:"5XL"}},b={args:{variant:"solid",fallback:"S",color:"blue"}},h={args:{variant:"soft",fallback:"S",color:"blue"}},k={args:{color:"blue",fallback:"B"}},z={args:{color:"red",fallback:"R"}},S={args:{color:"green",fallback:"G"}},y={args:{color:"purple",fallback:"P"}},j={args:{radius:"none",fallback:"SQ"}},v={args:{radius:"small",fallback:"SM"}},T={args:{radius:"medium",fallback:"MD"}},F={args:{radius:"large",fallback:"LG"}},w={args:{radius:"full",fallback:"FL"}},L={args:{highContrast:!0,fallback:"HC",color:"blue"}},A={render:()=>e.jsx(a,{align:"center",gap:"3",wrap:"wrap",children:["1","2","3","4","5","6","7","8","9"].map(r=>e.jsxs(a,{direction:"column",align:"center",gap:"1",children:[e.jsx(s,{size:r,fallback:r}),e.jsxs(n,{size:"1",color:"gray",children:["Size ",r]})]},r))})},C={render:()=>e.jsxs(a,{gap:"4",align:"center",children:[e.jsxs(a,{direction:"column",align:"center",gap:"2",children:[e.jsx(s,{variant:"solid",color:"blue",fallback:"S"}),e.jsx(n,{size:"2",children:"Solid"})]}),e.jsxs(a,{direction:"column",align:"center",gap:"2",children:[e.jsx(s,{variant:"soft",color:"blue",fallback:"S"}),e.jsx(n,{size:"2",children:"Soft"})]})]})},R={render:()=>e.jsx(a,{gap:"2",wrap:"wrap",style:{maxWidth:"400px"},children:["gray","gold","bronze","brown","yellow","amber","orange","tomato","red","ruby","crimson","pink","plum","purple","violet","iris","indigo","blue","cyan","teal","jade","green","grass","lime","mint","sky"].map(r=>e.jsxs(a,{direction:"column",align:"center",gap:"1",children:[e.jsx(s,{color:r,fallback:r.slice(0,2).toUpperCase(),size:"2"}),e.jsx(n,{size:"1",color:"gray",children:r})]},r))})},D={render:()=>e.jsxs(a,{gap:"4",align:"center",children:[e.jsxs(a,{direction:"column",align:"center",gap:"2",children:[e.jsx(s,{fallback:"J",size:"4"}),e.jsx(n,{size:"2",children:"Single Letter"})]}),e.jsxs(a,{direction:"column",align:"center",gap:"2",children:[e.jsx(s,{fallback:"JD",size:"4"}),e.jsx(n,{size:"2",children:"Initials"})]}),e.jsxs(a,{direction:"column",align:"center",gap:"2",children:[e.jsx(s,{fallback:"👤",size:"4"}),e.jsx(n,{size:"2",children:"Icon/Emoji"})]})]})},J={render:()=>e.jsxs(a,{direction:"column",gap:"4",children:[e.jsxs("div",{children:[e.jsx(n,{size:"3",weight:"medium",children:"Loading Image (valid URL):"}),e.jsxs(a,{gap:"2",align:"center",style:{marginTop:"8px"},children:[e.jsx(s,{src:"https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?&w=64&h=64&dpr=2&q=70&crop=focalpoint&fp-x=0.5&fp-y=0.3&fp-z=1&fit=crop",alt:"Loading image",fallback:"L",size:"4"}),e.jsx(n,{size:"2",color:"gray",children:"Image loads successfully"})]})]}),e.jsxs("div",{children:[e.jsx(n,{size:"3",weight:"medium",children:"Failed Image (broken URL):"}),e.jsxs(a,{gap:"2",align:"center",style:{marginTop:"8px"},children:[e.jsx(s,{src:"https://broken-image-url.jpg",alt:"Broken image",fallback:"F",size:"4",color:"red"}),e.jsx(n,{size:"2",color:"gray",children:"Falls back to initials"})]})]})]})},B={render:()=>e.jsxs(a,{direction:"column",gap:"6",style:{maxWidth:"400px"},children:[e.jsxs("div",{children:[e.jsx(n,{size:"4",weight:"bold",children:"User Profile Header"}),e.jsxs(a,{gap:"3",align:"center",style:{marginTop:"12px",padding:"16px",backgroundColor:"var(--gray-2)",borderRadius:"8px"},children:[e.jsx(s,{src:"https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?&w=64&h=64&dpr=2&q=70&crop=focalpoint&fp-x=0.5&fp-y=0.3&fp-z=1&fit=crop",fallback:"JD",size:"5",color:"blue"}),e.jsxs(a,{direction:"column",gap:"1",children:[e.jsx(n,{size:"4",weight:"medium",children:"John Doe"}),e.jsx(n,{size:"2",color:"gray",children:"Senior Developer"})]})]})]}),e.jsxs("div",{children:[e.jsx(n,{size:"4",weight:"bold",children:"Comment Thread"}),e.jsx(a,{direction:"column",gap:"3",style:{marginTop:"12px"},children:[{name:"Alice Johnson",initials:"AJ",comment:"Great work on this feature!",color:"green"},{name:"Bob Smith",initials:"BS",comment:"I have some feedback on the implementation.",color:"purple"},{name:"Carol Davis",initials:"CD",comment:"Thanks for the detailed explanation.",color:"orange"}].map((r,I)=>e.jsxs(a,{gap:"3",align:"start",style:{padding:"12px",backgroundColor:"var(--gray-2)",borderRadius:"8px"},children:[e.jsx(s,{fallback:r.initials,size:"3",color:r.color}),e.jsxs(a,{direction:"column",gap:"1",style:{flex:1},children:[e.jsx(n,{size:"2",weight:"medium",children:r.name}),e.jsx(n,{size:"2",children:r.comment})]})]},I))})]}),e.jsxs("div",{children:[e.jsx(n,{size:"4",weight:"bold",children:"Team Members"}),e.jsx(a,{gap:"2",wrap:"wrap",style:{marginTop:"12px"},children:[{initials:"JD",color:"blue"},{initials:"SM",color:"green"},{initials:"AL",color:"purple"},{initials:"MK",color:"orange"},{initials:"TW",color:"red"},{initials:"+3",color:"gray"}].map((r,I)=>e.jsx(s,{fallback:r.initials,size:"3",color:r.color,variant:r.initials==="+3"?"solid":"soft"},I))})]})]})};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    fallback: "JD"
  }
}`,...o.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    src: "https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?&w=64&h=64&dpr=2&q=70&crop=focalpoint&fp-x=0.5&fp-y=0.3&fp-z=1&fit=crop",
    alt: "John Doe",
    fallback: "JD"
  }
}`,...l.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    src: "https://broken-image-url.jpg",
    alt: "Broken image",
    fallback: "AB"
  }
}`,...i.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    size: "1",
    fallback: "XS"
  }
}`,...c.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    size: "2",
    fallback: "S"
  }
}`,...t.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    size: "3",
    fallback: "M"
  }
}`,...p.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    size: "4",
    fallback: "L"
  }
}`,...d.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    size: "5",
    fallback: "XL"
  }
}`,...m.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: {
    size: "6",
    fallback: "XXL"
  }
}`,...g.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    size: "7",
    fallback: "3XL"
  }
}`,...u.parameters?.docs?.source}}};x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  args: {
    size: "8",
    fallback: "4XL"
  }
}`,...x.parameters?.docs?.source}}};f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  args: {
    size: "9",
    fallback: "5XL"
  }
}`,...f.parameters?.docs?.source}}};b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  args: {
    variant: "solid",
    fallback: "S",
    color: "blue"
  }
}`,...b.parameters?.docs?.source}}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  args: {
    variant: "soft",
    fallback: "S",
    color: "blue"
  }
}`,...h.parameters?.docs?.source}}};k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  args: {
    color: "blue",
    fallback: "B"
  }
}`,...k.parameters?.docs?.source}}};z.parameters={...z.parameters,docs:{...z.parameters?.docs,source:{originalSource:`{
  args: {
    color: "red",
    fallback: "R"
  }
}`,...z.parameters?.docs?.source}}};S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  args: {
    color: "green",
    fallback: "G"
  }
}`,...S.parameters?.docs?.source}}};y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  args: {
    color: "purple",
    fallback: "P"
  }
}`,...y.parameters?.docs?.source}}};j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  args: {
    radius: "none",
    fallback: "SQ"
  }
}`,...j.parameters?.docs?.source}}};v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  args: {
    radius: "small",
    fallback: "SM"
  }
}`,...v.parameters?.docs?.source}}};T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  args: {
    radius: "medium",
    fallback: "MD"
  }
}`,...T.parameters?.docs?.source}}};F.parameters={...F.parameters,docs:{...F.parameters?.docs,source:{originalSource:`{
  args: {
    radius: "large",
    fallback: "LG"
  }
}`,...F.parameters?.docs?.source}}};w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  args: {
    radius: "full",
    fallback: "FL"
  }
}`,...w.parameters?.docs?.source}}};L.parameters={...L.parameters,docs:{...L.parameters?.docs,source:{originalSource:`{
  args: {
    highContrast: true,
    fallback: "HC",
    color: "blue"
  }
}`,...L.parameters?.docs?.source}}};A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
  render: () => <Flex align="center" gap="3" wrap="wrap">
      {["1", "2", "3", "4", "5", "6", "7", "8", "9"].map(size => <Flex key={size} direction="column" align="center" gap="1">
          <Avatar size={size as any} fallback={size} />
          <Text size="1" color="gray">
            Size {size}
          </Text>
        </Flex>)}
    </Flex>
}`,...A.parameters?.docs?.source}}};C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  render: () => <Flex gap="4" align="center">
      <Flex direction="column" align="center" gap="2">
        <Avatar variant="solid" color="blue" fallback="S" />
        <Text size="2">Solid</Text>
      </Flex>
      <Flex direction="column" align="center" gap="2">
        <Avatar variant="soft" color="blue" fallback="S" />
        <Text size="2">Soft</Text>
      </Flex>
    </Flex>
}`,...C.parameters?.docs?.source}}};R.parameters={...R.parameters,docs:{...R.parameters?.docs,source:{originalSource:`{
  render: () => <Flex gap="2" wrap="wrap" style={{
    maxWidth: "400px"
  }}>
      {["gray", "gold", "bronze", "brown", "yellow", "amber", "orange", "tomato", "red", "ruby", "crimson", "pink", "plum", "purple", "violet", "iris", "indigo", "blue", "cyan", "teal", "jade", "green", "grass", "lime", "mint", "sky"].map(color => <Flex key={color} direction="column" align="center" gap="1">
          <Avatar color={color as any} fallback={color.slice(0, 2).toUpperCase()} size="2" />
          <Text size="1" color="gray">
            {color}
          </Text>
        </Flex>)}
    </Flex>
}`,...R.parameters?.docs?.source}}};D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  render: () => <Flex gap="4" align="center">
      <Flex direction="column" align="center" gap="2">
        <Avatar fallback="J" size="4" />
        <Text size="2">Single Letter</Text>
      </Flex>
      <Flex direction="column" align="center" gap="2">
        <Avatar fallback="JD" size="4" />
        <Text size="2">Initials</Text>
      </Flex>
      <Flex direction="column" align="center" gap="2">
        <Avatar fallback="👤" size="4" />
        <Text size="2">Icon/Emoji</Text>
      </Flex>
    </Flex>
}`,...D.parameters?.docs?.source}}};J.parameters={...J.parameters,docs:{...J.parameters?.docs,source:{originalSource:`{
  render: () => <Flex direction="column" gap="4">
      <div>
        <Text size="3" weight="medium">
          Loading Image (valid URL):
        </Text>
        <Flex gap="2" align="center" style={{
        marginTop: "8px"
      }}>
          <Avatar src="https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?&w=64&h=64&dpr=2&q=70&crop=focalpoint&fp-x=0.5&fp-y=0.3&fp-z=1&fit=crop" alt="Loading image" fallback="L" size="4" />
          <Text size="2" color="gray">
            Image loads successfully
          </Text>
        </Flex>
      </div>

      <div>
        <Text size="3" weight="medium">
          Failed Image (broken URL):
        </Text>
        <Flex gap="2" align="center" style={{
        marginTop: "8px"
      }}>
          <Avatar src="https://broken-image-url.jpg" alt="Broken image" fallback="F" size="4" color="red" />
          <Text size="2" color="gray">
            Falls back to initials
          </Text>
        </Flex>
      </div>
    </Flex>
}`,...J.parameters?.docs?.source}}};B.parameters={...B.parameters,docs:{...B.parameters?.docs,source:{originalSource:`{
  render: () => <Flex direction="column" gap="6" style={{
    maxWidth: "400px"
  }}>
      <div>
        <Text size="4" weight="bold">
          User Profile Header
        </Text>
        <Flex gap="3" align="center" style={{
        marginTop: "12px",
        padding: "16px",
        backgroundColor: "var(--gray-2)",
        borderRadius: "8px"
      }}>
          <Avatar src="https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?&w=64&h=64&dpr=2&q=70&crop=focalpoint&fp-x=0.5&fp-y=0.3&fp-z=1&fit=crop" fallback="JD" size="5" color="blue" />
          <Flex direction="column" gap="1">
            <Text size="4" weight="medium">
              John Doe
            </Text>
            <Text size="2" color="gray">
              Senior Developer
            </Text>
          </Flex>
        </Flex>
      </div>

      <div>
        <Text size="4" weight="bold">
          Comment Thread
        </Text>
        <Flex direction="column" gap="3" style={{
        marginTop: "12px"
      }}>
          {[{
          name: "Alice Johnson",
          initials: "AJ",
          comment: "Great work on this feature!",
          color: "green"
        }, {
          name: "Bob Smith",
          initials: "BS",
          comment: "I have some feedback on the implementation.",
          color: "purple"
        }, {
          name: "Carol Davis",
          initials: "CD",
          comment: "Thanks for the detailed explanation.",
          color: "orange"
        }].map((user, index) => <Flex key={index} gap="3" align="start" style={{
          padding: "12px",
          backgroundColor: "var(--gray-2)",
          borderRadius: "8px"
        }}>
              <Avatar fallback={user.initials} size="3" color={user.color as any} />
              <Flex direction="column" gap="1" style={{
            flex: 1
          }}>
                <Text size="2" weight="medium">
                  {user.name}
                </Text>
                <Text size="2">{user.comment}</Text>
              </Flex>
            </Flex>)}
        </Flex>
      </div>

      <div>
        <Text size="4" weight="bold">
          Team Members
        </Text>
        <Flex gap="2" wrap="wrap" style={{
        marginTop: "12px"
      }}>
          {[{
          initials: "JD",
          color: "blue"
        }, {
          initials: "SM",
          color: "green"
        }, {
          initials: "AL",
          color: "purple"
        }, {
          initials: "MK",
          color: "orange"
        }, {
          initials: "TW",
          color: "red"
        }, {
          initials: "+3",
          color: "gray"
        }].map((member, index) => <Avatar key={index} fallback={member.initials} size="3" color={member.color as any} variant={member.initials === "+3" ? "solid" : "soft"} />)}
        </Flex>
      </div>
    </Flex>
}`,...B.parameters?.docs?.source}}};const $=["Default","WithImage","FallbackOnly","Size1","Size2","Size3","Size4","Size5","Size6","Size7","Size8","Size9","VariantSolid","VariantSoft","ColorBlue","ColorRed","ColorGreen","ColorPurple","RadiusNone","RadiusSmall","RadiusMedium","RadiusLarge","RadiusFull","HighContrast","AllSizes","AllVariants","ColorPalette","FallbackTypes","LoadingStates","RealWorldExamples"];export{A as AllSizes,C as AllVariants,k as ColorBlue,S as ColorGreen,R as ColorPalette,y as ColorPurple,z as ColorRed,o as Default,i as FallbackOnly,D as FallbackTypes,L as HighContrast,J as LoadingStates,w as RadiusFull,F as RadiusLarge,T as RadiusMedium,j as RadiusNone,v as RadiusSmall,B as RealWorldExamples,c as Size1,t as Size2,p as Size3,d as Size4,m as Size5,g as Size6,u as Size7,x as Size8,f as Size9,h as VariantSoft,b as VariantSolid,l as WithImage,$ as __namedExportsOrder,Z as default};
