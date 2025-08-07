import{F as t}from"./flex-CetshBpm.js";import{B as C}from"./box-DFM537Ql.js";import{T as r}from"./text-CQaCKnMS.js";import{B as a}from"./button-1BHGwx6R.js";import{T as z}from"./theme-D6H7S_T9.js";import"./iframe-BXP7S-hP.js";import"./preload-helper-D9Z9MdNV.js";import"./slot-BST-kKXi.js";import"./weight.prop-Rt1sSGdE.js";import"./radius.prop-BFb5uVoY.js";import"./jsx-runtime-CQTdPr-F.js";import"./index-5QXC4EVg.js";const J={title:"Components/Flex",component:t,parameters:{layout:"centered"},decorators:[l=>React.createElement(z,null,React.createElement(l,null))],argTypes:{as:{control:"select",options:["div","span"],description:"HTML element to render"},display:{control:"select",options:["none","inline-flex","flex"],description:"CSS display property"},direction:{control:"select",options:["row","column","row-reverse","column-reverse"],description:"Flex direction"},align:{control:"select",options:["start","center","end","baseline","stretch"],description:"Align items (cross-axis)"},justify:{control:"select",options:["start","center","end","between"],description:"Justify content (main-axis)"},wrap:{control:"select",options:["nowrap","wrap","wrap-reverse"],description:"Flex wrap behavior"},gap:{control:"select",options:["1","2","3","4","5","6","7","8","9"],description:"Gap between items"},asChild:{control:"boolean",description:"Merge props with the child element"}},args:{as:"div",display:"flex",gap:"2"}},e=({children:l,...n})=>React.createElement(C,{style:{padding:"12px",backgroundColor:"var(--blue-3)",borderRadius:"6px",minWidth:"60px",textAlign:"center",...n.style},...n},React.createElement(r,{size:"2"},l)),i={render:l=>React.createElement(t,{...l},React.createElement(e,null,"Item 1"),React.createElement(e,null,"Item 2"),React.createElement(e,null,"Item 3"))},o={render:()=>React.createElement(t,{direction:"row",gap:"3"},React.createElement(e,null,"First"),React.createElement(e,null,"Second"),React.createElement(e,null,"Third"))},c={render:()=>React.createElement(t,{direction:"column",gap:"3"},React.createElement(e,null,"First"),React.createElement(e,null,"Second"),React.createElement(e,null,"Third"))},s={render:()=>React.createElement(t,{direction:"row-reverse",gap:"3"},React.createElement(e,null,"First"),React.createElement(e,null,"Second"),React.createElement(e,null,"Third"))},m={render:()=>React.createElement(t,{direction:"column-reverse",gap:"3"},React.createElement(e,null,"First"),React.createElement(e,null,"Second"),React.createElement(e,null,"Third"))},d={render:()=>React.createElement(t,{align:"start",gap:"2",style:{height:"100px",backgroundColor:"var(--gray-2)",padding:"8px",borderRadius:"8px"}},React.createElement(e,{style:{height:"40px"}},"Small"),React.createElement(e,{style:{height:"60px"}},"Medium"),React.createElement(e,{style:{height:"30px"}},"Tiny"))},p={render:()=>React.createElement(t,{align:"center",gap:"2",style:{height:"100px",backgroundColor:"var(--gray-2)",padding:"8px",borderRadius:"8px"}},React.createElement(e,{style:{height:"40px"}},"Small"),React.createElement(e,{style:{height:"60px"}},"Medium"),React.createElement(e,{style:{height:"30px"}},"Tiny"))},x={render:()=>React.createElement(t,{align:"end",gap:"2",style:{height:"100px",backgroundColor:"var(--gray-2)",padding:"8px",borderRadius:"8px"}},React.createElement(e,{style:{height:"40px"}},"Small"),React.createElement(e,{style:{height:"60px"}},"Medium"),React.createElement(e,{style:{height:"30px"}},"Tiny"))},g={render:()=>React.createElement(t,{align:"stretch",gap:"2",style:{height:"100px",backgroundColor:"var(--gray-2)",padding:"8px",borderRadius:"8px"}},React.createElement(e,null,"Stretched"),React.createElement(e,null,"Items"),React.createElement(e,null,"All Same Height"))},u={render:()=>React.createElement(t,{align:"baseline",gap:"2",style:{height:"100px",backgroundColor:"var(--gray-2)",padding:"8px",borderRadius:"8px"}},React.createElement(e,{style:{fontSize:"12px",padding:"8px"}},"Small text"),React.createElement(e,{style:{fontSize:"20px",padding:"16px"}},"Large text"),React.createElement(e,{style:{fontSize:"14px",padding:"10px"}},"Medium text"))},F={render:()=>React.createElement(t,{justify:"start",gap:"2",style:{width:"300px",backgroundColor:"var(--gray-2)",padding:"8px",borderRadius:"8px"}},React.createElement(e,null,"One"),React.createElement(e,null,"Two"))},y={render:()=>React.createElement(t,{justify:"center",gap:"2",style:{width:"300px",backgroundColor:"var(--gray-2)",padding:"8px",borderRadius:"8px"}},React.createElement(e,null,"One"),React.createElement(e,null,"Two"))},R={render:()=>React.createElement(t,{justify:"end",gap:"2",style:{width:"300px",backgroundColor:"var(--gray-2)",padding:"8px",borderRadius:"8px"}},React.createElement(e,null,"One"),React.createElement(e,null,"Two"))},h={render:()=>React.createElement(t,{justify:"between",gap:"2",style:{width:"300px",backgroundColor:"var(--gray-2)",padding:"8px",borderRadius:"8px"}},React.createElement(e,null,"One"),React.createElement(e,null,"Two"),React.createElement(e,null,"Three"))},I={render:()=>React.createElement(t,{wrap:"nowrap",gap:"2",style:{width:"200px",backgroundColor:"var(--gray-2)",padding:"8px",borderRadius:"8px"}},React.createElement(e,{style:{minWidth:"80px"}},"Item 1"),React.createElement(e,{style:{minWidth:"80px"}},"Item 2"),React.createElement(e,{style:{minWidth:"80px"}},"Item 3"),React.createElement(e,{style:{minWidth:"80px"}},"Item 4"))},E={render:()=>React.createElement(t,{wrap:"wrap",gap:"2",style:{width:"200px",backgroundColor:"var(--gray-2)",padding:"8px",borderRadius:"8px"}},React.createElement(e,{style:{minWidth:"80px"}},"Item 1"),React.createElement(e,{style:{minWidth:"80px"}},"Item 2"),React.createElement(e,{style:{minWidth:"80px"}},"Item 3"),React.createElement(e,{style:{minWidth:"80px"}},"Item 4"))},b={render:()=>React.createElement(t,{wrap:"wrap-reverse",gap:"2",style:{width:"200px",backgroundColor:"var(--gray-2)",padding:"8px",borderRadius:"8px"}},React.createElement(e,{style:{minWidth:"80px"}},"Item 1"),React.createElement(e,{style:{minWidth:"80px"}},"Item 2"),React.createElement(e,{style:{minWidth:"80px"}},"Item 3"),React.createElement(e,{style:{minWidth:"80px"}},"Item 4"))},w={render:()=>React.createElement(t,{direction:"column",gap:"4"},React.createElement("div",null,React.createElement(r,{size:"2",weight:"medium",color:"gray"},"Gap 1:"),React.createElement(t,{gap:"1",style:{marginTop:"4px"}},React.createElement(e,null,"A"),React.createElement(e,null,"B"),React.createElement(e,null,"C"))),React.createElement("div",null,React.createElement(r,{size:"2",weight:"medium",color:"gray"},"Gap 3:"),React.createElement(t,{gap:"3",style:{marginTop:"4px"}},React.createElement(e,null,"A"),React.createElement(e,null,"B"),React.createElement(e,null,"C"))),React.createElement("div",null,React.createElement(r,{size:"2",weight:"medium",color:"gray"},"Gap 6:"),React.createElement(t,{gap:"6",style:{marginTop:"4px"}},React.createElement(e,null,"A"),React.createElement(e,null,"B"),React.createElement(e,null,"C"))))},v={render:()=>React.createElement(t,{direction:"column",gap:"6",style:{width:"400px"}},React.createElement("div",null,React.createElement(r,{size:"3",weight:"bold"},"Header Layout"),React.createElement(t,{justify:"between",align:"center",gap:"3",style:{padding:"12px",backgroundColor:"var(--blue-2)",borderRadius:"8px",marginTop:"8px"}},React.createElement(r,{size:"4",weight:"medium"},"Logo"),React.createElement(t,{gap:"2"},React.createElement(a,{size:"1",variant:"ghost"},"Home"),React.createElement(a,{size:"1",variant:"ghost"},"About"),React.createElement(a,{size:"1",variant:"ghost"},"Contact")),React.createElement(a,{size:"1"},"Sign In"))),React.createElement("div",null,React.createElement(r,{size:"3",weight:"bold"},"Card Layout"),React.createElement(t,{direction:"column",gap:"3",style:{padding:"16px",backgroundColor:"var(--gray-2)",borderRadius:"8px",marginTop:"8px"}},React.createElement(r,{size:"4",weight:"medium"},"Card Title"),React.createElement(r,{size:"2"},"Card description content goes here."),React.createElement(t,{justify:"end",gap:"2"},React.createElement(a,{size:"1",variant:"outline"},"Cancel"),React.createElement(a,{size:"1"},"Save")))),React.createElement("div",null,React.createElement(r,{size:"3",weight:"bold"},"Form Row"),React.createElement(t,{align:"center",gap:"3",style:{padding:"12px",backgroundColor:"var(--green-2)",borderRadius:"8px",marginTop:"8px"}},React.createElement(C,{style:{minWidth:"80px"}},React.createElement(r,{size:"2",weight:"medium"},"Label:")),React.createElement(C,{style:{flex:1,padding:"8px",backgroundColor:"white",borderRadius:"4px"}},React.createElement(r,{size:"2",color:"gray"},"Input field")),React.createElement(a,{size:"1"},"Submit"))))},T={render:()=>React.createElement(t,{direction:"column",gap:"4",style:{maxWidth:"500px"}},React.createElement(r,{size:"5",weight:"bold"},"Dashboard Layout"),React.createElement(t,{justify:"between",align:"center",style:{padding:"12px 16px",backgroundColor:"var(--blue-9)",borderRadius:"8px"}},React.createElement(r,{size:"3",weight:"medium",style:{color:"white"}},"Dashboard"),React.createElement(t,{gap:"2"},React.createElement(a,{size:"1",variant:"ghost",style:{color:"white"}},"Profile"),React.createElement(a,{size:"1",variant:"ghost",style:{color:"white"}},"Settings"))),React.createElement(t,{gap:"3",wrap:"wrap"},["Users","Orders","Revenue"].map((l,n)=>React.createElement(t,{key:l,direction:"column",gap:"1",style:{padding:"16px",backgroundColor:"var(--gray-2)",borderRadius:"8px",flex:"1",minWidth:"120px"}},React.createElement(r,{size:"1",weight:"medium",color:"gray"},l),React.createElement(r,{size:"4",weight:"bold"},1e3+n*500)))),React.createElement(t,{gap:"4",wrap:"wrap",align:"start"},React.createElement(t,{direction:"column",gap:"2",style:{flex:"2",minWidth:"200px"}},React.createElement(r,{size:"3",weight:"medium"},"Recent Activity"),React.createElement(t,{direction:"column",gap:"2"},["New user registered","Order completed","Payment received"].map((l,n)=>React.createElement(t,{key:n,align:"center",gap:"2",style:{padding:"8px 12px",backgroundColor:"var(--gray-2)",borderRadius:"6px"}},React.createElement(C,{style:{width:"8px",height:"8px",backgroundColor:n===0?"var(--green-9)":"var(--blue-9)",borderRadius:"50%"}}),React.createElement(r,{size:"2"},l))))),React.createElement(t,{direction:"column",gap:"2",style:{flex:"1",minWidth:"150px"}},React.createElement(r,{size:"3",weight:"medium"},"Quick Actions"),React.createElement(t,{direction:"column",gap:"2"},React.createElement(a,{size:"2",variant:"outline"},"Add User"),React.createElement(a,{size:"2",variant:"outline"},"Create Order"),React.createElement(a,{size:"2",variant:"outline"},"View Reports")))))};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  render: args => <Flex {...args}>
      <FlexItem>Item 1</FlexItem>
      <FlexItem>Item 2</FlexItem>
      <FlexItem>Item 3</FlexItem>
    </Flex>
}`,...i.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: () => <Flex direction="row" gap="3">
      <FlexItem>First</FlexItem>
      <FlexItem>Second</FlexItem>
      <FlexItem>Third</FlexItem>
    </Flex>
}`,...o.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  render: () => <Flex direction="column" gap="3">
      <FlexItem>First</FlexItem>
      <FlexItem>Second</FlexItem>
      <FlexItem>Third</FlexItem>
    </Flex>
}`,...c.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  render: () => <Flex direction="row-reverse" gap="3">
      <FlexItem>First</FlexItem>
      <FlexItem>Second</FlexItem>
      <FlexItem>Third</FlexItem>
    </Flex>
}`,...s.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  render: () => <Flex direction="column-reverse" gap="3">
      <FlexItem>First</FlexItem>
      <FlexItem>Second</FlexItem>
      <FlexItem>Third</FlexItem>
    </Flex>
}`,...m.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  render: () => <Flex align="start" gap="2" style={{
    height: '100px',
    backgroundColor: 'var(--gray-2)',
    padding: '8px',
    borderRadius: '8px'
  }}>
      <FlexItem style={{
      height: '40px'
    }}>Small</FlexItem>
      <FlexItem style={{
      height: '60px'
    }}>Medium</FlexItem>
      <FlexItem style={{
      height: '30px'
    }}>Tiny</FlexItem>
    </Flex>
}`,...d.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: () => <Flex align="center" gap="2" style={{
    height: '100px',
    backgroundColor: 'var(--gray-2)',
    padding: '8px',
    borderRadius: '8px'
  }}>
      <FlexItem style={{
      height: '40px'
    }}>Small</FlexItem>
      <FlexItem style={{
      height: '60px'
    }}>Medium</FlexItem>
      <FlexItem style={{
      height: '30px'
    }}>Tiny</FlexItem>
    </Flex>
}`,...p.parameters?.docs?.source}}};x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  render: () => <Flex align="end" gap="2" style={{
    height: '100px',
    backgroundColor: 'var(--gray-2)',
    padding: '8px',
    borderRadius: '8px'
  }}>
      <FlexItem style={{
      height: '40px'
    }}>Small</FlexItem>
      <FlexItem style={{
      height: '60px'
    }}>Medium</FlexItem>
      <FlexItem style={{
      height: '30px'
    }}>Tiny</FlexItem>
    </Flex>
}`,...x.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  render: () => <Flex align="stretch" gap="2" style={{
    height: '100px',
    backgroundColor: 'var(--gray-2)',
    padding: '8px',
    borderRadius: '8px'
  }}>
      <FlexItem>Stretched</FlexItem>
      <FlexItem>Items</FlexItem>
      <FlexItem>All Same Height</FlexItem>
    </Flex>
}`,...g.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  render: () => <Flex align="baseline" gap="2" style={{
    height: '100px',
    backgroundColor: 'var(--gray-2)',
    padding: '8px',
    borderRadius: '8px'
  }}>
      <FlexItem style={{
      fontSize: '12px',
      padding: '8px'
    }}>Small text</FlexItem>
      <FlexItem style={{
      fontSize: '20px',
      padding: '16px'
    }}>Large text</FlexItem>
      <FlexItem style={{
      fontSize: '14px',
      padding: '10px'
    }}>Medium text</FlexItem>
    </Flex>
}`,...u.parameters?.docs?.source}}};F.parameters={...F.parameters,docs:{...F.parameters?.docs,source:{originalSource:`{
  render: () => <Flex justify="start" gap="2" style={{
    width: '300px',
    backgroundColor: 'var(--gray-2)',
    padding: '8px',
    borderRadius: '8px'
  }}>
      <FlexItem>One</FlexItem>
      <FlexItem>Two</FlexItem>
    </Flex>
}`,...F.parameters?.docs?.source}}};y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  render: () => <Flex justify="center" gap="2" style={{
    width: '300px',
    backgroundColor: 'var(--gray-2)',
    padding: '8px',
    borderRadius: '8px'
  }}>
      <FlexItem>One</FlexItem>
      <FlexItem>Two</FlexItem>
    </Flex>
}`,...y.parameters?.docs?.source}}};R.parameters={...R.parameters,docs:{...R.parameters?.docs,source:{originalSource:`{
  render: () => <Flex justify="end" gap="2" style={{
    width: '300px',
    backgroundColor: 'var(--gray-2)',
    padding: '8px',
    borderRadius: '8px'
  }}>
      <FlexItem>One</FlexItem>
      <FlexItem>Two</FlexItem>
    </Flex>
}`,...R.parameters?.docs?.source}}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  render: () => <Flex justify="between" gap="2" style={{
    width: '300px',
    backgroundColor: 'var(--gray-2)',
    padding: '8px',
    borderRadius: '8px'
  }}>
      <FlexItem>One</FlexItem>
      <FlexItem>Two</FlexItem>
      <FlexItem>Three</FlexItem>
    </Flex>
}`,...h.parameters?.docs?.source}}};I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:`{
  render: () => <Flex wrap="nowrap" gap="2" style={{
    width: '200px',
    backgroundColor: 'var(--gray-2)',
    padding: '8px',
    borderRadius: '8px'
  }}>
      <FlexItem style={{
      minWidth: '80px'
    }}>Item 1</FlexItem>
      <FlexItem style={{
      minWidth: '80px'
    }}>Item 2</FlexItem>
      <FlexItem style={{
      minWidth: '80px'
    }}>Item 3</FlexItem>
      <FlexItem style={{
      minWidth: '80px'
    }}>Item 4</FlexItem>
    </Flex>
}`,...I.parameters?.docs?.source}}};E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  render: () => <Flex wrap="wrap" gap="2" style={{
    width: '200px',
    backgroundColor: 'var(--gray-2)',
    padding: '8px',
    borderRadius: '8px'
  }}>
      <FlexItem style={{
      minWidth: '80px'
    }}>Item 1</FlexItem>
      <FlexItem style={{
      minWidth: '80px'
    }}>Item 2</FlexItem>
      <FlexItem style={{
      minWidth: '80px'
    }}>Item 3</FlexItem>
      <FlexItem style={{
      minWidth: '80px'
    }}>Item 4</FlexItem>
    </Flex>
}`,...E.parameters?.docs?.source}}};b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  render: () => <Flex wrap="wrap-reverse" gap="2" style={{
    width: '200px',
    backgroundColor: 'var(--gray-2)',
    padding: '8px',
    borderRadius: '8px'
  }}>
      <FlexItem style={{
      minWidth: '80px'
    }}>Item 1</FlexItem>
      <FlexItem style={{
      minWidth: '80px'
    }}>Item 2</FlexItem>
      <FlexItem style={{
      minWidth: '80px'
    }}>Item 3</FlexItem>
      <FlexItem style={{
      minWidth: '80px'
    }}>Item 4</FlexItem>
    </Flex>
}`,...b.parameters?.docs?.source}}};w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  render: () => <Flex direction="column" gap="4">
      <div>
        <Text size="2" weight="medium" color="gray">Gap 1:</Text>
        <Flex gap="1" style={{
        marginTop: '4px'
      }}>
          <FlexItem>A</FlexItem>
          <FlexItem>B</FlexItem>
          <FlexItem>C</FlexItem>
        </Flex>
      </div>
      
      <div>
        <Text size="2" weight="medium" color="gray">Gap 3:</Text>
        <Flex gap="3" style={{
        marginTop: '4px'
      }}>
          <FlexItem>A</FlexItem>
          <FlexItem>B</FlexItem>
          <FlexItem>C</FlexItem>
        </Flex>
      </div>
      
      <div>
        <Text size="2" weight="medium" color="gray">Gap 6:</Text>
        <Flex gap="6" style={{
        marginTop: '4px'
      }}>
          <FlexItem>A</FlexItem>
          <FlexItem>B</FlexItem>
          <FlexItem>C</FlexItem>
        </Flex>
      </div>
    </Flex>
}`,...w.parameters?.docs?.source}}};v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  render: () => <Flex direction="column" gap="6" style={{
    width: '400px'
  }}>
      <div>
        <Text size="3" weight="bold">Header Layout</Text>
        <Flex justify="between" align="center" gap="3" style={{
        padding: '12px',
        backgroundColor: 'var(--blue-2)',
        borderRadius: '8px',
        marginTop: '8px'
      }}>
          <Text size="4" weight="medium">Logo</Text>
          <Flex gap="2">
            <Button size="1" variant="ghost">Home</Button>
            <Button size="1" variant="ghost">About</Button>
            <Button size="1" variant="ghost">Contact</Button>
          </Flex>
          <Button size="1">Sign In</Button>
        </Flex>
      </div>

      <div>
        <Text size="3" weight="bold">Card Layout</Text>
        <Flex direction="column" gap="3" style={{
        padding: '16px',
        backgroundColor: 'var(--gray-2)',
        borderRadius: '8px',
        marginTop: '8px'
      }}>
          <Text size="4" weight="medium">Card Title</Text>
          <Text size="2">Card description content goes here.</Text>
          <Flex justify="end" gap="2">
            <Button size="1" variant="outline">Cancel</Button>
            <Button size="1">Save</Button>
          </Flex>
        </Flex>
      </div>

      <div>
        <Text size="3" weight="bold">Form Row</Text>
        <Flex align="center" gap="3" style={{
        padding: '12px',
        backgroundColor: 'var(--green-2)',
        borderRadius: '8px',
        marginTop: '8px'
      }}>
          <Box style={{
          minWidth: '80px'
        }}>
            <Text size="2" weight="medium">Label:</Text>
          </Box>
          <Box style={{
          flex: 1,
          padding: '8px',
          backgroundColor: 'white',
          borderRadius: '4px'
        }}>
            <Text size="2" color="gray">Input field</Text>
          </Box>
          <Button size="1">Submit</Button>
        </Flex>
      </div>
    </Flex>
}`,...v.parameters?.docs?.source}}};T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  render: () => <Flex direction="column" gap="4" style={{
    maxWidth: '500px'
  }}>
      <Text size="5" weight="bold">Dashboard Layout</Text>
      
      {/* Navigation */}
      <Flex justify="between" align="center" style={{
      padding: '12px 16px',
      backgroundColor: 'var(--blue-9)',
      borderRadius: '8px'
    }}>
        <Text size="3" weight="medium" style={{
        color: 'white'
      }}>Dashboard</Text>
        <Flex gap="2">
          <Button size="1" variant="ghost" style={{
          color: 'white'
        }}>Profile</Button>
          <Button size="1" variant="ghost" style={{
          color: 'white'
        }}>Settings</Button>
        </Flex>
      </Flex>

      {/* Stats Cards */}
      <Flex gap="3" wrap="wrap">
        {['Users', 'Orders', 'Revenue'].map((stat, index) => <Flex key={stat} direction="column" gap="1" style={{
        padding: '16px',
        backgroundColor: 'var(--gray-2)',
        borderRadius: '8px',
        flex: '1',
        minWidth: '120px'
      }}>
            <Text size="1" weight="medium" color="gray">{stat}</Text>
            <Text size="4" weight="bold">{1000 + index * 500}</Text>
          </Flex>)}
      </Flex>

      {/* Content Area */}
      <Flex gap="4" wrap="wrap" align="start">
        <Flex direction="column" gap="2" style={{
        flex: '2',
        minWidth: '200px'
      }}>
          <Text size="3" weight="medium">Recent Activity</Text>
          <Flex direction="column" gap="2">
            {['New user registered', 'Order completed', 'Payment received'].map((activity, index) => <Flex key={index} align="center" gap="2" style={{
            padding: '8px 12px',
            backgroundColor: 'var(--gray-2)',
            borderRadius: '6px'
          }}>
                <Box style={{
              width: '8px',
              height: '8px',
              backgroundColor: index === 0 ? 'var(--green-9)' : 'var(--blue-9)',
              borderRadius: '50%'
            }} />
                <Text size="2">{activity}</Text>
              </Flex>)}
          </Flex>
        </Flex>

        <Flex direction="column" gap="2" style={{
        flex: '1',
        minWidth: '150px'
      }}>
          <Text size="3" weight="medium">Quick Actions</Text>
          <Flex direction="column" gap="2">
            <Button size="2" variant="outline">Add User</Button>
            <Button size="2" variant="outline">Create Order</Button>
            <Button size="2" variant="outline">View Reports</Button>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
}`,...T.parameters?.docs?.source}}};const H=["Default","DirectionRow","DirectionColumn","DirectionRowReverse","DirectionColumnReverse","AlignStart","AlignCenter","AlignEnd","AlignStretch","AlignBaseline","JustifyStart","JustifyCenter","JustifyEnd","JustifyBetween","WrapNowrap","WrapWrap","WrapReverse","GapSizes","LayoutExamples","RealWorldUsage"];export{u as AlignBaseline,p as AlignCenter,x as AlignEnd,d as AlignStart,g as AlignStretch,i as Default,c as DirectionColumn,m as DirectionColumnReverse,o as DirectionRow,s as DirectionRowReverse,w as GapSizes,h as JustifyBetween,y as JustifyCenter,R as JustifyEnd,F as JustifyStart,v as LayoutExamples,T as RealWorldUsage,I as WrapNowrap,b as WrapReverse,E as WrapWrap,H as __namedExportsOrder,J as default};
