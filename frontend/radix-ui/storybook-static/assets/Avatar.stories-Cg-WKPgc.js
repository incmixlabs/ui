import{A as t}from"./avatar-CuDZG_1M.js";import{F as e}from"./flex-CetshBpm.js";import{T as r}from"./text-CQaCKnMS.js";import{T as B}from"./theme-D6H7S_T9.js";import"./iframe-BXP7S-hP.js";import"./preload-helper-D9Z9MdNV.js";import"./radius.prop-BFb5uVoY.js";import"./jsx-runtime-CQTdPr-F.js";import"./index-5QXC4EVg.js";import"./slot-BST-kKXi.js";import"./weight.prop-Rt1sSGdE.js";const K={title:"Components/Avatar",component:t,parameters:{layout:"centered"},decorators:[a=>React.createElement(B,null,React.createElement(a,null))],argTypes:{size:{control:"select",options:["1","2","3","4","5","6","7","8","9"],description:"Avatar size"},variant:{control:"select",options:["solid","soft"],description:"Avatar variant style"},color:{control:"select",options:["gray","gold","bronze","brown","yellow","amber","orange","tomato","red","ruby","crimson","pink","plum","purple","violet","iris","indigo","blue","cyan","teal","jade","green","grass","lime","mint","sky"],description:"Avatar accent color"},radius:{control:"select",options:["none","small","medium","large","full"],description:"Avatar border radius"},highContrast:{control:"boolean",description:"High contrast mode"},fallback:{control:"text",description:"Fallback content when image fails to load"},src:{control:"text",description:"Image source URL"},alt:{control:"text",description:"Alternative text for the image"}},args:{size:"3",variant:"soft",fallback:"JD"}},o={args:{fallback:"JD"}},l={args:{src:"https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?&w=64&h=64&dpr=2&q=70&crop=focalpoint&fp-x=0.5&fp-y=0.3&fp-z=1&fit=crop",alt:"John Doe",fallback:"JD"}},c={args:{src:"https://broken-image-url.jpg",alt:"Broken image",fallback:"AB"}},s={args:{size:"1",fallback:"XS"}},n={args:{size:"2",fallback:"S"}},i={args:{size:"3",fallback:"M"}},m={args:{size:"4",fallback:"L"}},p={args:{size:"5",fallback:"XL"}},d={args:{size:"6",fallback:"XXL"}},g={args:{size:"7",fallback:"3XL"}},u={args:{size:"8",fallback:"4XL"}},f={args:{size:"9",fallback:"5XL"}},b={args:{variant:"solid",fallback:"S",color:"blue"}},x={args:{variant:"soft",fallback:"S",color:"blue"}},k={args:{color:"blue",fallback:"B"}},z={args:{color:"red",fallback:"R"}},S={args:{color:"green",fallback:"G"}},R={args:{color:"purple",fallback:"P"}},h={args:{radius:"none",fallback:"SQ"}},y={args:{radius:"small",fallback:"SM"}},E={args:{radius:"medium",fallback:"MD"}},v={args:{radius:"large",fallback:"LG"}},T={args:{radius:"full",fallback:"FL"}},F={args:{highContrast:!0,fallback:"HC",color:"blue"}},w={render:()=>React.createElement(e,{align:"center",gap:"3",wrap:"wrap"},["1","2","3","4","5","6","7","8","9"].map(a=>React.createElement(e,{key:a,direction:"column",align:"center",gap:"1"},React.createElement(t,{size:a,fallback:a}),React.createElement(r,{size:"1",color:"gray"},"Size ",a))))},L={render:()=>React.createElement(e,{gap:"4",align:"center"},React.createElement(e,{direction:"column",align:"center",gap:"2"},React.createElement(t,{variant:"solid",color:"blue",fallback:"S"}),React.createElement(r,{size:"2"},"Solid")),React.createElement(e,{direction:"column",align:"center",gap:"2"},React.createElement(t,{variant:"soft",color:"blue",fallback:"S"}),React.createElement(r,{size:"2"},"Soft")))},A={render:()=>React.createElement(e,{gap:"2",wrap:"wrap",style:{maxWidth:"400px"}},["gray","gold","bronze","brown","yellow","amber","orange","tomato","red","ruby","crimson","pink","plum","purple","violet","iris","indigo","blue","cyan","teal","jade","green","grass","lime","mint","sky"].map(a=>React.createElement(e,{key:a,direction:"column",align:"center",gap:"1"},React.createElement(t,{color:a,fallback:a.slice(0,2).toUpperCase(),size:"2"}),React.createElement(r,{size:"1",color:"gray"},a))))},C={render:()=>React.createElement(e,{gap:"4",align:"center"},React.createElement(e,{direction:"column",align:"center",gap:"2"},React.createElement(t,{fallback:"J",size:"4"}),React.createElement(r,{size:"2"},"Single Letter")),React.createElement(e,{direction:"column",align:"center",gap:"2"},React.createElement(t,{fallback:"JD",size:"4"}),React.createElement(r,{size:"2"},"Initials")),React.createElement(e,{direction:"column",align:"center",gap:"2"},React.createElement(t,{fallback:"👤",size:"4"}),React.createElement(r,{size:"2"},"Icon/Emoji")))},D={render:()=>React.createElement(e,{direction:"column",gap:"4"},React.createElement("div",null,React.createElement(r,{size:"3",weight:"medium"},"Loading Image (valid URL):"),React.createElement(e,{gap:"2",align:"center",style:{marginTop:"8px"}},React.createElement(t,{src:"https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?&w=64&h=64&dpr=2&q=70&crop=focalpoint&fp-x=0.5&fp-y=0.3&fp-z=1&fit=crop",alt:"Loading image",fallback:"L",size:"4"}),React.createElement(r,{size:"2",color:"gray"},"Image loads successfully"))),React.createElement("div",null,React.createElement(r,{size:"3",weight:"medium"},"Failed Image (broken URL):"),React.createElement(e,{gap:"2",align:"center",style:{marginTop:"8px"}},React.createElement(t,{src:"https://broken-image-url.jpg",alt:"Broken image",fallback:"F",size:"4",color:"red"}),React.createElement(r,{size:"2",color:"gray"},"Falls back to initials"))))},J={render:()=>React.createElement(e,{direction:"column",gap:"6",style:{maxWidth:"400px"}},React.createElement("div",null,React.createElement(r,{size:"4",weight:"bold"},"User Profile Header"),React.createElement(e,{gap:"3",align:"center",style:{marginTop:"12px",padding:"16px",backgroundColor:"var(--gray-2)",borderRadius:"8px"}},React.createElement(t,{src:"https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?&w=64&h=64&dpr=2&q=70&crop=focalpoint&fp-x=0.5&fp-y=0.3&fp-z=1&fit=crop",fallback:"JD",size:"5",color:"blue"}),React.createElement(e,{direction:"column",gap:"1"},React.createElement(r,{size:"4",weight:"medium"},"John Doe"),React.createElement(r,{size:"2",color:"gray"},"Senior Developer")))),React.createElement("div",null,React.createElement(r,{size:"4",weight:"bold"},"Comment Thread"),React.createElement(e,{direction:"column",gap:"3",style:{marginTop:"12px"}},[{name:"Alice Johnson",initials:"AJ",comment:"Great work on this feature!",color:"green"},{name:"Bob Smith",initials:"BS",comment:"I have some feedback on the implementation.",color:"purple"},{name:"Carol Davis",initials:"CD",comment:"Thanks for the detailed explanation.",color:"orange"}].map((a,I)=>React.createElement(e,{key:I,gap:"3",align:"start",style:{padding:"12px",backgroundColor:"var(--gray-2)",borderRadius:"8px"}},React.createElement(t,{fallback:a.initials,size:"3",color:a.color}),React.createElement(e,{direction:"column",gap:"1",style:{flex:1}},React.createElement(r,{size:"2",weight:"medium"},a.name),React.createElement(r,{size:"2"},a.comment)))))),React.createElement("div",null,React.createElement(r,{size:"4",weight:"bold"},"Team Members"),React.createElement(e,{gap:"2",wrap:"wrap",style:{marginTop:"12px"}},[{initials:"JD",color:"blue"},{initials:"SM",color:"green"},{initials:"AL",color:"purple"},{initials:"MK",color:"orange"},{initials:"TW",color:"red"},{initials:"+3",color:"gray"}].map((a,I)=>React.createElement(t,{key:I,fallback:a.initials,size:"3",color:a.color,variant:a.initials==="+3"?"solid":"soft"})))))};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    fallback: 'JD'
  }
}`,...o.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    src: 'https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?&w=64&h=64&dpr=2&q=70&crop=focalpoint&fp-x=0.5&fp-y=0.3&fp-z=1&fit=crop',
    alt: 'John Doe',
    fallback: 'JD'
  }
}`,...l.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    src: 'https://broken-image-url.jpg',
    alt: 'Broken image',
    fallback: 'AB'
  }
}`,...c.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    size: '1',
    fallback: 'XS'
  }
}`,...s.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    size: '2',
    fallback: 'S'
  }
}`,...n.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    size: '3',
    fallback: 'M'
  }
}`,...i.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    size: '4',
    fallback: 'L'
  }
}`,...m.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    size: '5',
    fallback: 'XL'
  }
}`,...p.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    size: '6',
    fallback: 'XXL'
  }
}`,...d.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: {
    size: '7',
    fallback: '3XL'
  }
}`,...g.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    size: '8',
    fallback: '4XL'
  }
}`,...u.parameters?.docs?.source}}};f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  args: {
    size: '9',
    fallback: '5XL'
  }
}`,...f.parameters?.docs?.source}}};b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'solid',
    fallback: 'S',
    color: 'blue'
  }
}`,...b.parameters?.docs?.source}}};x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'soft',
    fallback: 'S',
    color: 'blue'
  }
}`,...x.parameters?.docs?.source}}};k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  args: {
    color: 'blue',
    fallback: 'B'
  }
}`,...k.parameters?.docs?.source}}};z.parameters={...z.parameters,docs:{...z.parameters?.docs,source:{originalSource:`{
  args: {
    color: 'red',
    fallback: 'R'
  }
}`,...z.parameters?.docs?.source}}};S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  args: {
    color: 'green',
    fallback: 'G'
  }
}`,...S.parameters?.docs?.source}}};R.parameters={...R.parameters,docs:{...R.parameters?.docs,source:{originalSource:`{
  args: {
    color: 'purple',
    fallback: 'P'
  }
}`,...R.parameters?.docs?.source}}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  args: {
    radius: 'none',
    fallback: 'SQ'
  }
}`,...h.parameters?.docs?.source}}};y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  args: {
    radius: 'small',
    fallback: 'SM'
  }
}`,...y.parameters?.docs?.source}}};E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  args: {
    radius: 'medium',
    fallback: 'MD'
  }
}`,...E.parameters?.docs?.source}}};v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  args: {
    radius: 'large',
    fallback: 'LG'
  }
}`,...v.parameters?.docs?.source}}};T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  args: {
    radius: 'full',
    fallback: 'FL'
  }
}`,...T.parameters?.docs?.source}}};F.parameters={...F.parameters,docs:{...F.parameters?.docs,source:{originalSource:`{
  args: {
    highContrast: true,
    fallback: 'HC',
    color: 'blue'
  }
}`,...F.parameters?.docs?.source}}};w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  render: () => <Flex align="center" gap="3" wrap="wrap">
      {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map(size => <Flex key={size} direction="column" align="center" gap="1">
          <Avatar size={size as any} fallback={size} />
          <Text size="1" color="gray">Size {size}</Text>
        </Flex>)}
    </Flex>
}`,...w.parameters?.docs?.source}}};L.parameters={...L.parameters,docs:{...L.parameters?.docs,source:{originalSource:`{
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
}`,...L.parameters?.docs?.source}}};A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
  render: () => <Flex gap="2" wrap="wrap" style={{
    maxWidth: '400px'
  }}>
      {['gray', 'gold', 'bronze', 'brown', 'yellow', 'amber', 'orange', 'tomato', 'red', 'ruby', 'crimson', 'pink', 'plum', 'purple', 'violet', 'iris', 'indigo', 'blue', 'cyan', 'teal', 'jade', 'green', 'grass', 'lime', 'mint', 'sky'].map(color => <Flex key={color} direction="column" align="center" gap="1">
          <Avatar color={color as any} fallback={color.slice(0, 2).toUpperCase()} size="2" />
          <Text size="1" color="gray">{color}</Text>
        </Flex>)}
    </Flex>
}`,...A.parameters?.docs?.source}}};C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
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
}`,...C.parameters?.docs?.source}}};D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  render: () => <Flex direction="column" gap="4">
      <div>
        <Text size="3" weight="medium">Loading Image (valid URL):</Text>
        <Flex gap="2" align="center" style={{
        marginTop: '8px'
      }}>
          <Avatar src="https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?&w=64&h=64&dpr=2&q=70&crop=focalpoint&fp-x=0.5&fp-y=0.3&fp-z=1&fit=crop" alt="Loading image" fallback="L" size="4" />
          <Text size="2" color="gray">Image loads successfully</Text>
        </Flex>
      </div>
      
      <div>
        <Text size="3" weight="medium">Failed Image (broken URL):</Text>
        <Flex gap="2" align="center" style={{
        marginTop: '8px'
      }}>
          <Avatar src="https://broken-image-url.jpg" alt="Broken image" fallback="F" size="4" color="red" />
          <Text size="2" color="gray">Falls back to initials</Text>
        </Flex>
      </div>
    </Flex>
}`,...D.parameters?.docs?.source}}};J.parameters={...J.parameters,docs:{...J.parameters?.docs,source:{originalSource:`{
  render: () => <Flex direction="column" gap="6" style={{
    maxWidth: '400px'
  }}>
      <div>
        <Text size="4" weight="bold">User Profile Header</Text>
        <Flex gap="3" align="center" style={{
        marginTop: '12px',
        padding: '16px',
        backgroundColor: 'var(--gray-2)',
        borderRadius: '8px'
      }}>
          <Avatar src="https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?&w=64&h=64&dpr=2&q=70&crop=focalpoint&fp-x=0.5&fp-y=0.3&fp-z=1&fit=crop" fallback="JD" size="5" color="blue" />
          <Flex direction="column" gap="1">
            <Text size="4" weight="medium">John Doe</Text>
            <Text size="2" color="gray">Senior Developer</Text>
          </Flex>
        </Flex>
      </div>

      <div>
        <Text size="4" weight="bold">Comment Thread</Text>
        <Flex direction="column" gap="3" style={{
        marginTop: '12px'
      }}>
          {[{
          name: 'Alice Johnson',
          initials: 'AJ',
          comment: 'Great work on this feature!',
          color: 'green'
        }, {
          name: 'Bob Smith',
          initials: 'BS',
          comment: 'I have some feedback on the implementation.',
          color: 'purple'
        }, {
          name: 'Carol Davis',
          initials: 'CD',
          comment: 'Thanks for the detailed explanation.',
          color: 'orange'
        }].map((user, index) => <Flex key={index} gap="3" align="start" style={{
          padding: '12px',
          backgroundColor: 'var(--gray-2)',
          borderRadius: '8px'
        }}>
              <Avatar fallback={user.initials} size="3" color={user.color as any} />
              <Flex direction="column" gap="1" style={{
            flex: 1
          }}>
                <Text size="2" weight="medium">{user.name}</Text>
                <Text size="2">{user.comment}</Text>
              </Flex>
            </Flex>)}
        </Flex>
      </div>

      <div>
        <Text size="4" weight="bold">Team Members</Text>
        <Flex gap="2" wrap="wrap" style={{
        marginTop: '12px'
      }}>
          {[{
          initials: 'JD',
          color: 'blue'
        }, {
          initials: 'SM',
          color: 'green'
        }, {
          initials: 'AL',
          color: 'purple'
        }, {
          initials: 'MK',
          color: 'orange'
        }, {
          initials: 'TW',
          color: 'red'
        }, {
          initials: '+3',
          color: 'gray'
        }].map((member, index) => <Avatar key={index} fallback={member.initials} size="3" color={member.color as any} variant={member.initials === '+3' ? 'solid' : 'soft'} />)}
        </Flex>
      </div>
    </Flex>
}`,...J.parameters?.docs?.source}}};const N=["Default","WithImage","FallbackOnly","Size1","Size2","Size3","Size4","Size5","Size6","Size7","Size8","Size9","VariantSolid","VariantSoft","ColorBlue","ColorRed","ColorGreen","ColorPurple","RadiusNone","RadiusSmall","RadiusMedium","RadiusLarge","RadiusFull","HighContrast","AllSizes","AllVariants","ColorPalette","FallbackTypes","LoadingStates","RealWorldExamples"];export{w as AllSizes,L as AllVariants,k as ColorBlue,S as ColorGreen,A as ColorPalette,R as ColorPurple,z as ColorRed,o as Default,c as FallbackOnly,C as FallbackTypes,F as HighContrast,D as LoadingStates,T as RadiusFull,v as RadiusLarge,E as RadiusMedium,h as RadiusNone,y as RadiusSmall,J as RealWorldExamples,s as Size1,n as Size2,i as Size3,m as Size4,p as Size5,d as Size6,g as Size7,u as Size8,f as Size9,x as VariantSoft,b as VariantSolid,l as WithImage,N as __namedExportsOrder,K as default};
