import{C as r}from"./card-CPaoNSZb.js";import{T as a}from"./text-CQaCKnMS.js";import{H as n}from"./heading-DVULZe-B.js";import{B as i}from"./button-1BHGwx6R.js";import{A as C}from"./avatar-CuDZG_1M.js";import{F as e}from"./flex-CetshBpm.js";import{T as F}from"./theme-D6H7S_T9.js";import"./iframe-BXP7S-hP.js";import"./preload-helper-D9Z9MdNV.js";import"./weight.prop-Rt1sSGdE.js";import"./radius.prop-BFb5uVoY.js";import"./jsx-runtime-CQTdPr-F.js";import"./index-5QXC4EVg.js";import"./slot-BST-kKXi.js";const M={title:"Components/Card",component:r,parameters:{layout:"centered"},decorators:[t=>React.createElement(F,null,React.createElement(t,null))],argTypes:{size:{control:"select",options:["1","2","3","4","5"],description:"Card size (affects padding)"},variant:{control:"select",options:["surface","classic","ghost"],description:"Card variant style"},asChild:{control:"boolean",description:"Merge props with the child element"},children:{control:"text",description:"Card content"}},args:{size:"1",variant:"surface",children:"Card content goes here"}},c={args:{children:"This is a default card with some content inside.",style:{width:"300px"}}},o={args:{size:"1",children:"Size 1 card - minimal padding",style:{width:"250px"}}},l={args:{size:"2",children:"Size 2 card - small padding",style:{width:"250px"}}},d={args:{size:"3",children:"Size 3 card - medium padding",style:{width:"250px"}}},p={args:{size:"4",children:"Size 4 card - large padding",style:{width:"250px"}}},m={args:{size:"5",children:"Size 5 card - extra large padding",style:{width:"250px"}}},g={args:{variant:"surface",children:"Surface variant card",style:{width:"250px"}}},u={args:{variant:"classic",children:"Classic variant card",style:{width:"250px"}}},x={args:{variant:"ghost",children:"Ghost variant card (minimal styling)",style:{width:"250px"}}},h={render:()=>React.createElement(e,{gap:"3",wrap:"wrap"},["1","2","3","4","5"].map(t=>React.createElement(r,{key:t,size:t,style:{width:"120px"}},React.createElement(a,{size:"2",align:"center"},"Size ",t))))},z={render:()=>React.createElement(e,{gap:"4",wrap:"wrap"},["surface","classic","ghost"].map(t=>React.createElement(r,{key:t,variant:t,style:{width:"150px"}},React.createElement(a,{size:"2",weight:"medium",align:"center"},t.charAt(0).toUpperCase()+t.slice(1)," variant"))))},y={render:()=>React.createElement(r,{size:"3",style:{width:"300px"}},React.createElement(n,{size:"4",style:{marginBottom:"8px"}},"Card Title"),React.createElement(a,{size:"2",color:"gray"},"This is a simple card with a title and some descriptive text content."))},v={render:()=>React.createElement(r,{size:"3",style:{width:"300px"}},React.createElement(e,{direction:"column",gap:"3"},React.createElement("div",null,React.createElement(n,{size:"4",style:{marginBottom:"8px"}},"Settings"),React.createElement(a,{size:"2",color:"gray"},"Manage your account settings and preferences.")),React.createElement(e,{gap:"2",justify:"end"},React.createElement(i,{variant:"outline",size:"1"},"Cancel"),React.createElement(i,{size:"1"},"Save"))))},R={render:()=>React.createElement(r,{size:"4",style:{width:"350px"}},React.createElement(e,{direction:"column",gap:"3"},React.createElement(e,{gap:"3",align:"center"},React.createElement(C,{src:"https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?&w=64&h=64&dpr=2&q=70&crop=focalpoint&fp-x=0.5&fp-y=0.3&fp-z=1&fit=crop",fallback:"JD",size:"5"}),React.createElement(e,{direction:"column",gap:"1"},React.createElement(n,{size:"4"},"John Doe"),React.createElement(a,{size:"2",color:"gray"},"Senior Developer"))),React.createElement(a,{size:"2"},"Passionate about creating great user experiences and building scalable applications."),React.createElement(e,{gap:"2"},React.createElement(i,{variant:"outline",size:"1",style:{flex:1}},"Message"),React.createElement(i,{size:"1",style:{flex:1}},"Follow"))))},w={render:()=>React.createElement(r,{size:"3",style:{width:"280px"}},React.createElement(e,{direction:"column",gap:"3"},React.createElement("div",{style:{height:"120px",backgroundColor:"var(--gray-3)",borderRadius:"6px",display:"flex",alignItems:"center",justifyContent:"center"}},React.createElement(a,{size:"2",color:"gray"},"Product Image")),React.createElement("div",null,React.createElement(n,{size:"3",style:{marginBottom:"4px"}},"Wireless Headphones"),React.createElement(a,{size:"2",color:"gray",style:{marginBottom:"8px"}},"High-quality sound with noise cancellation"),React.createElement(e,{justify:"between",align:"center"},React.createElement(a,{size:"4",weight:"bold",color:"blue"},"$199"),React.createElement(i,{size:"1"},"Add to Cart")))))},E={render:()=>React.createElement(e,{gap:"3",wrap:"wrap"},[{title:"Total Users",value:"12,345",change:"+12%",color:"green"},{title:"Revenue",value:"$45,678",change:"+8%",color:"blue"},{title:"Orders",value:"1,234",change:"-3%",color:"red"}].map((t,s)=>React.createElement(r,{key:s,size:"3",style:{minWidth:"160px"}},React.createElement(e,{direction:"column",gap:"2"},React.createElement(a,{size:"2",color:"gray"},t.title),React.createElement(n,{size:"5"},t.value),React.createElement(a,{size:"1",color:t.color},t.change," from last month")))))},f={render:()=>React.createElement(r,{size:"3",style:{width:"320px"}},React.createElement(e,{gap:"3",align:"start"},React.createElement("div",{style:{width:"8px",height:"8px",backgroundColor:"var(--blue-9)",borderRadius:"50%",marginTop:"6px",flexShrink:0}}),React.createElement(e,{direction:"column",gap:"2",style:{flex:1}},React.createElement(e,{justify:"between",align:"start"},React.createElement(a,{size:"2",weight:"medium"},"New message received"),React.createElement(a,{size:"1",color:"gray"},"2m ago")),React.createElement(a,{size:"2",color:"gray"},"You have a new message from Sarah. Click to view the conversation."),React.createElement(e,{gap:"2",justify:"end"},React.createElement(i,{variant:"ghost",size:"1"},"Dismiss"),React.createElement(i,{variant:"outline",size:"1"},"View")))))},S={render:()=>React.createElement(e,{direction:"column",gap:"4",style:{width:"600px"}},React.createElement(n,{size:"6"},"Dashboard"),React.createElement(e,{gap:"3",wrap:"wrap"},[{title:"Active Users",value:"2,543",icon:"👥"},{title:"Total Sales",value:"$12,345",icon:"💰"},{title:"Conversion Rate",value:"3.2%",icon:"📈"},{title:"Support Tickets",value:"23",icon:"🎫"}].map((t,s)=>React.createElement(r,{key:s,size:"2",style:{flex:1,minWidth:"140px"}},React.createElement(e,{gap:"2",align:"center"},React.createElement(a,{size:"4"},t.icon),React.createElement(e,{direction:"column",gap:"1"},React.createElement(a,{size:"1",color:"gray"},t.title),React.createElement(a,{size:"3",weight:"bold"},t.value)))))),React.createElement(e,{gap:"4",align:"start"},React.createElement(r,{size:"3",style:{flex:2}},React.createElement(e,{direction:"column",gap:"3"},React.createElement(n,{size:"4"},"Recent Activity"),React.createElement(e,{direction:"column",gap:"2"},["User John signed up","Order #1234 completed","Payment received from client","New support ticket created"].map((t,s)=>React.createElement(e,{key:s,gap:"2",align:"center"},React.createElement("div",{style:{width:"6px",height:"6px",backgroundColor:"var(--green-9)",borderRadius:"50%"}}),React.createElement(a,{size:"2"},t)))))),React.createElement(r,{size:"3",style:{flex:1}},React.createElement(e,{direction:"column",gap:"3"},React.createElement(n,{size:"4"},"Quick Actions"),React.createElement(e,{direction:"column",gap:"2"},React.createElement(i,{size:"2",variant:"outline"},"Add User"),React.createElement(i,{size:"2",variant:"outline"},"Create Order"),React.createElement(i,{size:"2",variant:"outline"},"View Reports"),React.createElement(i,{size:"2"},"Settings"))))))};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    children: 'This is a default card with some content inside.',
    style: {
      width: '300px'
    }
  }
}`,...c.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    size: '1',
    children: 'Size 1 card - minimal padding',
    style: {
      width: '250px'
    }
  }
}`,...o.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    size: '2',
    children: 'Size 2 card - small padding',
    style: {
      width: '250px'
    }
  }
}`,...l.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    size: '3',
    children: 'Size 3 card - medium padding',
    style: {
      width: '250px'
    }
  }
}`,...d.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    size: '4',
    children: 'Size 4 card - large padding',
    style: {
      width: '250px'
    }
  }
}`,...p.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    size: '5',
    children: 'Size 5 card - extra large padding',
    style: {
      width: '250px'
    }
  }
}`,...m.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'surface',
    children: 'Surface variant card',
    style: {
      width: '250px'
    }
  }
}`,...g.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'classic',
    children: 'Classic variant card',
    style: {
      width: '250px'
    }
  }
}`,...u.parameters?.docs?.source}}};x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'ghost',
    children: 'Ghost variant card (minimal styling)',
    style: {
      width: '250px'
    }
  }
}`,...x.parameters?.docs?.source}}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  render: () => <Flex gap="3" wrap="wrap">
      {['1', '2', '3', '4', '5'].map(size => <Card key={size} size={size as any} style={{
      width: '120px'
    }}>
          <Text size="2" align="center">Size {size}</Text>
        </Card>)}
    </Flex>
}`,...h.parameters?.docs?.source}}};z.parameters={...z.parameters,docs:{...z.parameters?.docs,source:{originalSource:`{
  render: () => <Flex gap="4" wrap="wrap">
      {['surface', 'classic', 'ghost'].map(variant => <Card key={variant} variant={variant as any} style={{
      width: '150px'
    }}>
          <Text size="2" weight="medium" align="center">
            {variant.charAt(0).toUpperCase() + variant.slice(1)} variant
          </Text>
        </Card>)}
    </Flex>
}`,...z.parameters?.docs?.source}}};y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  render: () => <Card size="3" style={{
    width: '300px'
  }}>
      <Heading size="4" style={{
      marginBottom: '8px'
    }}>
        Card Title
      </Heading>
      <Text size="2" color="gray">
        This is a simple card with a title and some descriptive text content.
      </Text>
    </Card>
}`,...y.parameters?.docs?.source}}};v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  render: () => <Card size="3" style={{
    width: '300px'
  }}>
      <Flex direction="column" gap="3">
        <div>
          <Heading size="4" style={{
          marginBottom: '8px'
        }}>
            Settings
          </Heading>
          <Text size="2" color="gray">
            Manage your account settings and preferences.
          </Text>
        </div>
        <Flex gap="2" justify="end">
          <Button variant="outline" size="1">Cancel</Button>
          <Button size="1">Save</Button>
        </Flex>
      </Flex>
    </Card>
}`,...v.parameters?.docs?.source}}};R.parameters={...R.parameters,docs:{...R.parameters?.docs,source:{originalSource:`{
  render: () => <Card size="4" style={{
    width: '350px'
  }}>
      <Flex direction="column" gap="3">
        <Flex gap="3" align="center">
          <Avatar src="https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?&w=64&h=64&dpr=2&q=70&crop=focalpoint&fp-x=0.5&fp-y=0.3&fp-z=1&fit=crop" fallback="JD" size="5" />
          <Flex direction="column" gap="1">
            <Heading size="4">John Doe</Heading>
            <Text size="2" color="gray">Senior Developer</Text>
          </Flex>
        </Flex>
        <Text size="2">
          Passionate about creating great user experiences and building scalable applications.
        </Text>
        <Flex gap="2">
          <Button variant="outline" size="1" style={{
          flex: 1
        }}>Message</Button>
          <Button size="1" style={{
          flex: 1
        }}>Follow</Button>
        </Flex>
      </Flex>
    </Card>
}`,...R.parameters?.docs?.source}}};w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  render: () => <Card size="3" style={{
    width: '280px'
  }}>
      <Flex direction="column" gap="3">
        <div style={{
        height: '120px',
        backgroundColor: 'var(--gray-3)',
        borderRadius: '6px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
          <Text size="2" color="gray">Product Image</Text>
        </div>
        <div>
          <Heading size="3" style={{
          marginBottom: '4px'
        }}>
            Wireless Headphones
          </Heading>
          <Text size="2" color="gray" style={{
          marginBottom: '8px'
        }}>
            High-quality sound with noise cancellation
          </Text>
          <Flex justify="between" align="center">
            <Text size="4" weight="bold" color="blue">$199</Text>
            <Button size="1">Add to Cart</Button>
          </Flex>
        </div>
      </Flex>
    </Card>
}`,...w.parameters?.docs?.source}}};E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  render: () => <Flex gap="3" wrap="wrap">
      {[{
      title: 'Total Users',
      value: '12,345',
      change: '+12%',
      color: 'green'
    }, {
      title: 'Revenue',
      value: '$45,678',
      change: '+8%',
      color: 'blue'
    }, {
      title: 'Orders',
      value: '1,234',
      change: '-3%',
      color: 'red'
    }].map((stat, index) => <Card key={index} size="3" style={{
      minWidth: '160px'
    }}>
          <Flex direction="column" gap="2">
            <Text size="2" color="gray">{stat.title}</Text>
            <Heading size="5">{stat.value}</Heading>
            <Text size="1" color={stat.color as any}>
              {stat.change} from last month
            </Text>
          </Flex>
        </Card>)}
    </Flex>
}`,...E.parameters?.docs?.source}}};f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  render: () => <Card size="3" style={{
    width: '320px'
  }}>
      <Flex gap="3" align="start">
        <div style={{
        width: '8px',
        height: '8px',
        backgroundColor: 'var(--blue-9)',
        borderRadius: '50%',
        marginTop: '6px',
        flexShrink: 0
      }} />
        <Flex direction="column" gap="2" style={{
        flex: 1
      }}>
          <Flex justify="between" align="start">
            <Text size="2" weight="medium">New message received</Text>
            <Text size="1" color="gray">2m ago</Text>
          </Flex>
          <Text size="2" color="gray">
            You have a new message from Sarah. Click to view the conversation.
          </Text>
          <Flex gap="2" justify="end">
            <Button variant="ghost" size="1">Dismiss</Button>
            <Button variant="outline" size="1">View</Button>
          </Flex>
        </Flex>
      </Flex>
    </Card>
}`,...f.parameters?.docs?.source}}};S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  render: () => <Flex direction="column" gap="4" style={{
    width: '600px'
  }}>
      <Heading size="6">Dashboard</Heading>
      
      {/* Stats Row */}
      <Flex gap="3" wrap="wrap">
        {[{
        title: 'Active Users',
        value: '2,543',
        icon: '👥'
      }, {
        title: 'Total Sales',
        value: '$12,345',
        icon: '💰'
      }, {
        title: 'Conversion Rate',
        value: '3.2%',
        icon: '📈'
      }, {
        title: 'Support Tickets',
        value: '23',
        icon: '🎫'
      }].map((stat, index) => <Card key={index} size="2" style={{
        flex: 1,
        minWidth: '140px'
      }}>
            <Flex gap="2" align="center">
              <Text size="4">{stat.icon}</Text>
              <Flex direction="column" gap="1">
                <Text size="1" color="gray">{stat.title}</Text>
                <Text size="3" weight="bold">{stat.value}</Text>
              </Flex>
            </Flex>
          </Card>)}
      </Flex>

      {/* Main Content Row */}
      <Flex gap="4" align="start">
        <Card size="3" style={{
        flex: 2
      }}>
          <Flex direction="column" gap="3">
            <Heading size="4">Recent Activity</Heading>
            <Flex direction="column" gap="2">
              {['User John signed up', 'Order #1234 completed', 'Payment received from client', 'New support ticket created'].map((activity, index) => <Flex key={index} gap="2" align="center">
                  <div style={{
                width: '6px',
                height: '6px',
                backgroundColor: 'var(--green-9)',
                borderRadius: '50%'
              }} />
                  <Text size="2">{activity}</Text>
                </Flex>)}
            </Flex>
          </Flex>
        </Card>

        <Card size="3" style={{
        flex: 1
      }}>
          <Flex direction="column" gap="3">
            <Heading size="4">Quick Actions</Heading>
            <Flex direction="column" gap="2">
              <Button size="2" variant="outline">Add User</Button>
              <Button size="2" variant="outline">Create Order</Button>
              <Button size="2" variant="outline">View Reports</Button>
              <Button size="2">Settings</Button>
            </Flex>
          </Flex>
        </Card>
      </Flex>
    </Flex>
}`,...S.parameters?.docs?.source}}};const N=["Default","Size1","Size2","Size3","Size4","Size5","VariantSurface","VariantClassic","VariantGhost","AllSizes","AllVariants","SimpleContent","WithActions","UserProfile","ProductCard","StatsCard","NotificationCard","DashboardLayout"];export{h as AllSizes,z as AllVariants,S as DashboardLayout,c as Default,f as NotificationCard,w as ProductCard,y as SimpleContent,o as Size1,l as Size2,d as Size3,p as Size4,m as Size5,E as StatsCard,R as UserProfile,u as VariantClassic,x as VariantGhost,g as VariantSurface,v as WithActions,N as __namedExportsOrder,M as default};
