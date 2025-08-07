import{r as b}from"./iframe-BXP7S-hP.js";import{a as D,e as j,c as P,m as N,T as V}from"./theme-D6H7S_T9.js";import{S as $,l as M}from"./slot-BST-kKXi.js";import{g as J,F as i}from"./flex-CetshBpm.js";import{B as c}from"./box-DFM537Ql.js";import{T as t}from"./text-CQaCKnMS.js";import{C as l}from"./card-CPaoNSZb.js";import{A as L}from"./avatar-CuDZG_1M.js";import{B as T}from"./button-1BHGwx6R.js";import"./preload-helper-D9Z9MdNV.js";import"./jsx-runtime-CQTdPr-F.js";import"./index-5QXC4EVg.js";import"./weight.prop-Rt1sSGdE.js";import"./radius.prop-BFb5uVoY.js";const O=["div","span"],_=["none","inline-grid","grid"],H=["1","2","3","4","5","6","7","8","9"],U=["1","2","3","4","5","6","7","8","9"],W=["row","column","dense","row-dense","column-dense"],Q=["start","center","end","baseline","stretch"],q=["start","center","end","between"],K=["start","center","end","baseline","between","around","evenly","stretch"],X=["start","center","end","baseline","stretch"],A={as:{type:"enum",values:O,default:"div"},...D,display:{type:"enum",className:"rt-r-display",values:_,responsive:!0},areas:{type:"string",className:"rt-r-gta",customProperties:["--grid-template-areas"],responsive:!0},columns:{type:"enum | string",className:"rt-r-gtc",customProperties:["--grid-template-columns"],values:H,parseValue:z,responsive:!0},rows:{type:"enum | string",className:"rt-r-gtr",customProperties:["--grid-template-rows"],values:U,parseValue:z,responsive:!0},flow:{type:"enum",className:"rt-r-gaf",values:W,responsive:!0},align:{type:"enum",className:"rt-r-ai",values:Q,responsive:!0},justify:{type:"enum",className:"rt-r-jc",values:q,parseValue:Y,responsive:!0},alignContent:{type:"enum",className:"rt-r-ac",values:K,parseValue:Z,responsive:!0},justifyItems:{type:"enum",className:"rt-r-ji",values:X,responsive:!0},...J};function z(r){return A.columns.values.includes(r)?r:r?.match(/^\d+$/)?`repeat(${r}, minmax(0, 1fr))`:r}function Y(r){return r==="between"?"space-between":r}function Z(r){switch(r){case"between":return"space-between";case"around":return"space-around";case"evenly":return"space-evenly";default:return r}}const a=b.forwardRef((r,n)=>{const{className:C,asChild:B,as:F="div",...k}=j(r,A,M,N),S=B?$:F;return b.createElement(S,{...k,ref:n,className:P("rt-Grid",C)})});a.displayName="Grid";a.__docgenInfo={description:"",methods:[],displayName:"Grid",composes:["GridOwnProps"]};const ge={title:"Components/Grid",component:a,parameters:{layout:"centered"},decorators:[r=>React.createElement(V,null,React.createElement(r,null))],argTypes:{as:{control:"select",options:["div","span"],description:"HTML element to render"},display:{control:"select",options:["none","inline-grid","grid"],description:"CSS display property"},columns:{control:"select",options:["1","2","3","4","5","6","7","8","9"],description:"Number of columns or custom grid-template-columns"},rows:{control:"select",options:["1","2","3","4","5","6","7","8","9"],description:"Number of rows or custom grid-template-rows"},flow:{control:"select",options:["row","column","dense","row-dense","column-dense"],description:"Grid auto flow direction"},align:{control:"select",options:["start","center","end","baseline","stretch"],description:"Align items (vertical)"},justify:{control:"select",options:["start","center","end","between"],description:"Justify content (horizontal)"},gap:{control:"select",options:["1","2","3","4","5","6","7","8","9"],description:"Gap between grid items"},areas:{control:"text",description:"Grid template areas"}},args:{as:"div",display:"grid",columns:"3",gap:"2"}},e=({children:r,style:n,...C})=>React.createElement(c,{style:{padding:"12px",backgroundColor:"var(--blue-3)",borderRadius:"6px",textAlign:"center",minHeight:"60px",display:"flex",alignItems:"center",justifyContent:"center",...n},...C},React.createElement(t,{size:"2"},r)),s={render:r=>React.createElement(a,{...r},React.createElement(e,null,"1"),React.createElement(e,null,"2"),React.createElement(e,null,"3"),React.createElement(e,null,"4"),React.createElement(e,null,"5"),React.createElement(e,null,"6"))},o={render:()=>React.createElement(a,{columns:"1",gap:"2"},React.createElement(e,null,"Item 1"),React.createElement(e,null,"Item 2"),React.createElement(e,null,"Item 3"))},m={render:()=>React.createElement(a,{columns:"2",gap:"2"},React.createElement(e,null,"Item 1"),React.createElement(e,null,"Item 2"),React.createElement(e,null,"Item 3"),React.createElement(e,null,"Item 4"))},d={render:()=>React.createElement(a,{columns:"3",gap:"2"},React.createElement(e,null,"Item 1"),React.createElement(e,null,"Item 2"),React.createElement(e,null,"Item 3"),React.createElement(e,null,"Item 4"),React.createElement(e,null,"Item 5"),React.createElement(e,null,"Item 6"))},p={render:()=>React.createElement(a,{columns:"4",gap:"2"},React.createElement(e,null,"1"),React.createElement(e,null,"2"),React.createElement(e,null,"3"),React.createElement(e,null,"4"),React.createElement(e,null,"5"),React.createElement(e,null,"6"),React.createElement(e,null,"7"),React.createElement(e,null,"8"))},u={render:()=>React.createElement(a,{columns:"3",rows:"2",gap:"2"},React.createElement(e,null,"1"),React.createElement(e,null,"2"),React.createElement(e,null,"3"),React.createElement(e,null,"4"),React.createElement(e,null,"5"),React.createElement(e,null,"6"))},g={render:()=>React.createElement(i,{direction:"column",gap:"4"},React.createElement("div",null,React.createElement(t,{size:"2",weight:"medium",color:"gray"},"Gap 1:"),React.createElement(a,{columns:"3",gap:"1",style:{marginTop:"8px"}},React.createElement(e,null,"A"),React.createElement(e,null,"B"),React.createElement(e,null,"C"))),React.createElement("div",null,React.createElement(t,{size:"2",weight:"medium",color:"gray"},"Gap 3:"),React.createElement(a,{columns:"3",gap:"3",style:{marginTop:"8px"}},React.createElement(e,null,"A"),React.createElement(e,null,"B"),React.createElement(e,null,"C"))),React.createElement("div",null,React.createElement(t,{size:"2",weight:"medium",color:"gray"},"Gap 6:"),React.createElement(a,{columns:"3",gap:"6",style:{marginTop:"8px"}},React.createElement(e,null,"A"),React.createElement(e,null,"B"),React.createElement(e,null,"C"))))},x={render:()=>React.createElement(a,{columns:"2",rows:"2",flow:"row",gap:"2"},React.createElement(e,null,"1"),React.createElement(e,null,"2"),React.createElement(e,null,"3"),React.createElement(e,null,"4"),React.createElement(e,null,"5"))},G={render:()=>React.createElement(a,{columns:"2",rows:"2",flow:"column",gap:"2"},React.createElement(e,null,"1"),React.createElement(e,null,"2"),React.createElement(e,null,"3"),React.createElement(e,null,"4"),React.createElement(e,null,"5"))},I={render:()=>React.createElement(a,{columns:"3",gap:"2",align:"center",style:{height:"200px",backgroundColor:"var(--gray-2)",padding:"16px",borderRadius:"8px"}},React.createElement(e,{style:{height:"40px"}},"Small"),React.createElement(e,{style:{height:"80px"}},"Large"),React.createElement(e,{style:{height:"60px"}},"Medium"))},R={render:()=>React.createElement(a,{columns:"3",gap:"2",justify:"center",style:{width:"400px",backgroundColor:"var(--gray-2)",padding:"16px",borderRadius:"8px"}},React.createElement(e,{style:{width:"60px"}},"1"),React.createElement(e,{style:{width:"60px"}},"2"),React.createElement(e,{style:{width:"60px"}},"3"))},y={render:()=>React.createElement(a,{areas:'"header header header" "sidebar content content" "footer footer footer"',columns:"200px 1fr 1fr",rows:"60px 1fr 60px",gap:"2",style:{height:"300px",width:"400px"}},React.createElement(c,{style:{gridArea:"header",backgroundColor:"var(--blue-3)",padding:"12px",borderRadius:"6px",display:"flex",alignItems:"center",justifyContent:"center"}},React.createElement(t,{size:"2",weight:"medium"},"Header")),React.createElement(c,{style:{gridArea:"sidebar",backgroundColor:"var(--green-3)",padding:"12px",borderRadius:"6px",display:"flex",alignItems:"center",justifyContent:"center"}},React.createElement(t,{size:"2",weight:"medium"},"Sidebar")),React.createElement(c,{style:{gridArea:"content",backgroundColor:"var(--purple-3)",padding:"12px",borderRadius:"6px",display:"flex",alignItems:"center",justifyContent:"center"}},React.createElement(t,{size:"2",weight:"medium"},"Content")),React.createElement(c,{style:{gridArea:"footer",backgroundColor:"var(--orange-3)",padding:"12px",borderRadius:"6px",display:"flex",alignItems:"center",justifyContent:"center"}},React.createElement(t,{size:"2",weight:"medium"},"Footer")))},E={render:()=>React.createElement(i,{direction:"column",gap:"4"},React.createElement(t,{size:"4",weight:"bold"},"Responsive Grid Layouts"),React.createElement(t,{size:"2",color:"gray"},"These demonstrate different grid layouts for different screen sizes"),React.createElement("div",null,React.createElement(t,{size:"3",weight:"medium",style:{marginBottom:"12px"}},"Mobile (1 column):"),React.createElement(a,{columns:"1",gap:"2",style:{width:"200px"}},React.createElement(e,null,"Item 1"),React.createElement(e,null,"Item 2"),React.createElement(e,null,"Item 3"),React.createElement(e,null,"Item 4"))),React.createElement("div",null,React.createElement(t,{size:"3",weight:"medium",style:{marginBottom:"12px"}},"Tablet (2 columns):"),React.createElement(a,{columns:"2",gap:"2",style:{width:"300px"}},React.createElement(e,null,"Item 1"),React.createElement(e,null,"Item 2"),React.createElement(e,null,"Item 3"),React.createElement(e,null,"Item 4"))),React.createElement("div",null,React.createElement(t,{size:"3",weight:"medium",style:{marginBottom:"12px"}},"Desktop (4 columns):"),React.createElement(a,{columns:"4",gap:"2",style:{width:"500px"}},React.createElement(e,null,"Item 1"),React.createElement(e,null,"Item 2"),React.createElement(e,null,"Item 3"),React.createElement(e,null,"Item 4"))))},h={render:()=>React.createElement(a,{columns:"3",gap:"3",style:{width:"400px"}},Array.from({length:9},(r,n)=>React.createElement(c,{key:n,style:{aspectRatio:"1",backgroundColor:"var(--gray-4)",borderRadius:"8px",display:"flex",alignItems:"center",justifyContent:"center"}},React.createElement(t,{size:"2",color:"gray"},"Image ",n+1))))},w={render:()=>React.createElement(a,{columns:"2",gap:"4",style:{width:"500px"}},[{name:"Product A",price:"$99"},{name:"Product B",price:"$149"},{name:"Product C",price:"$199"},{name:"Product D",price:"$249"}].map((r,n)=>React.createElement(l,{key:n,size:"3"},React.createElement(i,{direction:"column",gap:"3"},React.createElement(c,{style:{height:"120px",backgroundColor:"var(--gray-3)",borderRadius:"6px",display:"flex",alignItems:"center",justifyContent:"center"}},React.createElement(t,{size:"2",color:"gray"},"Image")),React.createElement("div",null,React.createElement(t,{size:"3",weight:"medium"},r.name),React.createElement(t,{size:"4",weight:"bold",color:"blue",style:{marginTop:"4px"}},r.price)),React.createElement(T,{size:"2"},"Add to Cart")))))},v={render:()=>React.createElement(a,{columns:"4",gap:"3",style:{width:"600px"}},React.createElement(l,{size:"2"},React.createElement(i,{direction:"column",gap:"1"},React.createElement(t,{size:"1",color:"gray"},"Users"),React.createElement(t,{size:"4",weight:"bold"},"1,234"))),React.createElement(l,{size:"2"},React.createElement(i,{direction:"column",gap:"1"},React.createElement(t,{size:"1",color:"gray"},"Revenue"),React.createElement(t,{size:"4",weight:"bold"},"$45,678"))),React.createElement(l,{size:"2"},React.createElement(i,{direction:"column",gap:"1"},React.createElement(t,{size:"1",color:"gray"},"Orders"),React.createElement(t,{size:"4",weight:"bold"},"567"))),React.createElement(l,{size:"2"},React.createElement(i,{direction:"column",gap:"1"},React.createElement(t,{size:"1",color:"gray"},"Conversion"),React.createElement(t,{size:"4",weight:"bold"},"3.2%"))),React.createElement(l,{size:"3",style:{gridColumn:"span 3"}},React.createElement(i,{direction:"column",gap:"2"},React.createElement(t,{size:"3",weight:"medium"},"Analytics Chart"),React.createElement(c,{style:{height:"200px",backgroundColor:"var(--gray-2)",borderRadius:"6px",display:"flex",alignItems:"center",justifyContent:"center"}},React.createElement(t,{size:"2",color:"gray"},"Chart Area")))),React.createElement(l,{size:"3"},React.createElement(i,{direction:"column",gap:"2"},React.createElement(t,{size:"3",weight:"medium"},"Recent Activity"),React.createElement(i,{direction:"column",gap:"2"},["User signed up","Order completed","Payment received"].map((r,n)=>React.createElement(i,{key:n,gap:"2",align:"center"},React.createElement("div",{style:{width:"6px",height:"6px",backgroundColor:"var(--green-9)",borderRadius:"50%"}}),React.createElement(t,{size:"2"},r)))))))},f={render:()=>React.createElement(a,{columns:"3",gap:"4",style:{width:"600px"}},[{name:"Alice Johnson",role:"Designer",avatar:"AJ"},{name:"Bob Smith",role:"Developer",avatar:"BS"},{name:"Carol Davis",role:"Manager",avatar:"CD"},{name:"David Wilson",role:"Developer",avatar:"DW"},{name:"Eve Brown",role:"Designer",avatar:"EB"},{name:"Frank Miller",role:"QA Engineer",avatar:"FM"}].map((r,n)=>React.createElement(l,{key:n,size:"3"},React.createElement(i,{direction:"column",gap:"3",align:"center"},React.createElement(L,{fallback:r.avatar,size:"5",color:"blue"}),React.createElement("div",{style:{textAlign:"center"}},React.createElement(t,{size:"3",weight:"medium"},r.name),React.createElement(t,{size:"2",color:"gray",style:{marginTop:"2px"}},r.role)),React.createElement(T,{size:"1",variant:"outline",style:{width:"100%"}},"Contact")))))};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  render: args => <Grid {...args}>
      <GridItem>1</GridItem>
      <GridItem>2</GridItem>
      <GridItem>3</GridItem>
      <GridItem>4</GridItem>
      <GridItem>5</GridItem>
      <GridItem>6</GridItem>
    </Grid>
}`,...s.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: () => <Grid columns="1" gap="2">
      <GridItem>Item 1</GridItem>
      <GridItem>Item 2</GridItem>
      <GridItem>Item 3</GridItem>
    </Grid>
}`,...o.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  render: () => <Grid columns="2" gap="2">
      <GridItem>Item 1</GridItem>
      <GridItem>Item 2</GridItem>
      <GridItem>Item 3</GridItem>
      <GridItem>Item 4</GridItem>
    </Grid>
}`,...m.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  render: () => <Grid columns="3" gap="2">
      <GridItem>Item 1</GridItem>
      <GridItem>Item 2</GridItem>
      <GridItem>Item 3</GridItem>
      <GridItem>Item 4</GridItem>
      <GridItem>Item 5</GridItem>
      <GridItem>Item 6</GridItem>
    </Grid>
}`,...d.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: () => <Grid columns="4" gap="2">
      <GridItem>1</GridItem>
      <GridItem>2</GridItem>
      <GridItem>3</GridItem>
      <GridItem>4</GridItem>
      <GridItem>5</GridItem>
      <GridItem>6</GridItem>
      <GridItem>7</GridItem>
      <GridItem>8</GridItem>
    </Grid>
}`,...p.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  render: () => <Grid columns="3" rows="2" gap="2">
      <GridItem>1</GridItem>
      <GridItem>2</GridItem>
      <GridItem>3</GridItem>
      <GridItem>4</GridItem>
      <GridItem>5</GridItem>
      <GridItem>6</GridItem>
    </Grid>
}`,...u.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  render: () => <Flex direction="column" gap="4">
      <div>
        <Text size="2" weight="medium" color="gray">Gap 1:</Text>
        <Grid columns="3" gap="1" style={{
        marginTop: '8px'
      }}>
          <GridItem>A</GridItem>
          <GridItem>B</GridItem>
          <GridItem>C</GridItem>
        </Grid>
      </div>
      
      <div>
        <Text size="2" weight="medium" color="gray">Gap 3:</Text>
        <Grid columns="3" gap="3" style={{
        marginTop: '8px'
      }}>
          <GridItem>A</GridItem>
          <GridItem>B</GridItem>
          <GridItem>C</GridItem>
        </Grid>
      </div>
      
      <div>
        <Text size="2" weight="medium" color="gray">Gap 6:</Text>
        <Grid columns="3" gap="6" style={{
        marginTop: '8px'
      }}>
          <GridItem>A</GridItem>
          <GridItem>B</GridItem>
          <GridItem>C</GridItem>
        </Grid>
      </div>
    </Flex>
}`,...g.parameters?.docs?.source}}};x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  render: () => <Grid columns="2" rows="2" flow="row" gap="2">
      <GridItem>1</GridItem>
      <GridItem>2</GridItem>
      <GridItem>3</GridItem>
      <GridItem>4</GridItem>
      <GridItem>5</GridItem>
    </Grid>
}`,...x.parameters?.docs?.source}}};G.parameters={...G.parameters,docs:{...G.parameters?.docs,source:{originalSource:`{
  render: () => <Grid columns="2" rows="2" flow="column" gap="2">
      <GridItem>1</GridItem>
      <GridItem>2</GridItem>
      <GridItem>3</GridItem>
      <GridItem>4</GridItem>
      <GridItem>5</GridItem>
    </Grid>
}`,...G.parameters?.docs?.source}}};I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:`{
  render: () => <Grid columns="3" gap="2" align="center" style={{
    height: '200px',
    backgroundColor: 'var(--gray-2)',
    padding: '16px',
    borderRadius: '8px'
  }}>
      <GridItem style={{
      height: '40px'
    }}>Small</GridItem>
      <GridItem style={{
      height: '80px'
    }}>Large</GridItem>
      <GridItem style={{
      height: '60px'
    }}>Medium</GridItem>
    </Grid>
}`,...I.parameters?.docs?.source}}};R.parameters={...R.parameters,docs:{...R.parameters?.docs,source:{originalSource:`{
  render: () => <Grid columns="3" gap="2" justify="center" style={{
    width: '400px',
    backgroundColor: 'var(--gray-2)',
    padding: '16px',
    borderRadius: '8px'
  }}>
      <GridItem style={{
      width: '60px'
    }}>1</GridItem>
      <GridItem style={{
      width: '60px'
    }}>2</GridItem>
      <GridItem style={{
      width: '60px'
    }}>3</GridItem>
    </Grid>
}`,...R.parameters?.docs?.source}}};y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  render: () => <Grid areas='"header header header" "sidebar content content" "footer footer footer"' columns="200px 1fr 1fr" rows="60px 1fr 60px" gap="2" style={{
    height: '300px',
    width: '400px'
  }}>
      <Box style={{
      gridArea: 'header',
      backgroundColor: 'var(--blue-3)',
      padding: '12px',
      borderRadius: '6px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
        <Text size="2" weight="medium">Header</Text>
      </Box>
      <Box style={{
      gridArea: 'sidebar',
      backgroundColor: 'var(--green-3)',
      padding: '12px',
      borderRadius: '6px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
        <Text size="2" weight="medium">Sidebar</Text>
      </Box>
      <Box style={{
      gridArea: 'content',
      backgroundColor: 'var(--purple-3)',
      padding: '12px',
      borderRadius: '6px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
        <Text size="2" weight="medium">Content</Text>
      </Box>
      <Box style={{
      gridArea: 'footer',
      backgroundColor: 'var(--orange-3)',
      padding: '12px',
      borderRadius: '6px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
        <Text size="2" weight="medium">Footer</Text>
      </Box>
    </Grid>
}`,...y.parameters?.docs?.source}}};E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  render: () => <Flex direction="column" gap="4">
      <Text size="4" weight="bold">Responsive Grid Layouts</Text>
      <Text size="2" color="gray">These demonstrate different grid layouts for different screen sizes</Text>
      
      <div>
        <Text size="3" weight="medium" style={{
        marginBottom: '12px'
      }}>Mobile (1 column):</Text>
        <Grid columns="1" gap="2" style={{
        width: '200px'
      }}>
          <GridItem>Item 1</GridItem>
          <GridItem>Item 2</GridItem>
          <GridItem>Item 3</GridItem>
          <GridItem>Item 4</GridItem>
        </Grid>
      </div>

      <div>
        <Text size="3" weight="medium" style={{
        marginBottom: '12px'
      }}>Tablet (2 columns):</Text>
        <Grid columns="2" gap="2" style={{
        width: '300px'
      }}>
          <GridItem>Item 1</GridItem>
          <GridItem>Item 2</GridItem>
          <GridItem>Item 3</GridItem>
          <GridItem>Item 4</GridItem>
        </Grid>
      </div>

      <div>
        <Text size="3" weight="medium" style={{
        marginBottom: '12px'
      }}>Desktop (4 columns):</Text>
        <Grid columns="4" gap="2" style={{
        width: '500px'
      }}>
          <GridItem>Item 1</GridItem>
          <GridItem>Item 2</GridItem>
          <GridItem>Item 3</GridItem>
          <GridItem>Item 4</GridItem>
        </Grid>
      </div>
    </Flex>
}`,...E.parameters?.docs?.source}}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  render: () => <Grid columns="3" gap="3" style={{
    width: '400px'
  }}>
      {Array.from({
      length: 9
    }, (_, i) => <Box key={i} style={{
      aspectRatio: '1',
      backgroundColor: 'var(--gray-4)',
      borderRadius: '8px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
          <Text size="2" color="gray">Image {i + 1}</Text>
        </Box>)}
    </Grid>
}`,...h.parameters?.docs?.source}}};w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  render: () => <Grid columns="2" gap="4" style={{
    width: '500px'
  }}>
      {[{
      name: 'Product A',
      price: '$99'
    }, {
      name: 'Product B',
      price: '$149'
    }, {
      name: 'Product C',
      price: '$199'
    }, {
      name: 'Product D',
      price: '$249'
    }].map((product, index) => <Card key={index} size="3">
          <Flex direction="column" gap="3">
            <Box style={{
          height: '120px',
          backgroundColor: 'var(--gray-3)',
          borderRadius: '6px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
              <Text size="2" color="gray">Image</Text>
            </Box>
            <div>
              <Text size="3" weight="medium">{product.name}</Text>
              <Text size="4" weight="bold" color="blue" style={{
            marginTop: '4px'
          }}>
                {product.price}
              </Text>
            </div>
            <Button size="2">Add to Cart</Button>
          </Flex>
        </Card>)}
    </Grid>
}`,...w.parameters?.docs?.source}}};v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  render: () => <Grid columns="4" gap="3" style={{
    width: '600px'
  }}>
      {/* Stats cards */}
      <Card size="2">
        <Flex direction="column" gap="1">
          <Text size="1" color="gray">Users</Text>
          <Text size="4" weight="bold">1,234</Text>
        </Flex>
      </Card>
      
      <Card size="2">
        <Flex direction="column" gap="1">
          <Text size="1" color="gray">Revenue</Text>
          <Text size="4" weight="bold">$45,678</Text>
        </Flex>
      </Card>
      
      <Card size="2">
        <Flex direction="column" gap="1">
          <Text size="1" color="gray">Orders</Text>
          <Text size="4" weight="bold">567</Text>
        </Flex>
      </Card>
      
      <Card size="2">
        <Flex direction="column" gap="1">
          <Text size="1" color="gray">Conversion</Text>
          <Text size="4" weight="bold">3.2%</Text>
        </Flex>
      </Card>

      {/* Large chart card */}
      <Card size="3" style={{
      gridColumn: 'span 3'
    }}>
        <Flex direction="column" gap="2">
          <Text size="3" weight="medium">Analytics Chart</Text>
          <Box style={{
          height: '200px',
          backgroundColor: 'var(--gray-2)',
          borderRadius: '6px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
            <Text size="2" color="gray">Chart Area</Text>
          </Box>
        </Flex>
      </Card>

      {/* Activity list */}
      <Card size="3">
        <Flex direction="column" gap="2">
          <Text size="3" weight="medium">Recent Activity</Text>
          <Flex direction="column" gap="2">
            {['User signed up', 'Order completed', 'Payment received'].map((activity, index) => <Flex key={index} gap="2" align="center">
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
    </Grid>
}`,...v.parameters?.docs?.source}}};f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  render: () => <Grid columns="3" gap="4" style={{
    width: '600px'
  }}>
      {[{
      name: 'Alice Johnson',
      role: 'Designer',
      avatar: 'AJ'
    }, {
      name: 'Bob Smith',
      role: 'Developer',
      avatar: 'BS'
    }, {
      name: 'Carol Davis',
      role: 'Manager',
      avatar: 'CD'
    }, {
      name: 'David Wilson',
      role: 'Developer',
      avatar: 'DW'
    }, {
      name: 'Eve Brown',
      role: 'Designer',
      avatar: 'EB'
    }, {
      name: 'Frank Miller',
      role: 'QA Engineer',
      avatar: 'FM'
    }].map((member, index) => <Card key={index} size="3">
          <Flex direction="column" gap="3" align="center">
            <Avatar fallback={member.avatar} size="5" color="blue" />
            <div style={{
          textAlign: 'center'
        }}>
              <Text size="3" weight="medium">{member.name}</Text>
              <Text size="2" color="gray" style={{
            marginTop: '2px'
          }}>
                {member.role}
              </Text>
            </div>
            <Button size="1" variant="outline" style={{
          width: '100%'
        }}>
              Contact
            </Button>
          </Flex>
        </Card>)}
    </Grid>
}`,...f.parameters?.docs?.source}}};const xe=["Default","Columns1","Columns2","Columns3","Columns4","Rows2","GapSizes","FlowRow","FlowColumn","AlignCenter","JustifyCenter","GridAreas","ResponsiveGrid","ImageGallery","ProductGrid","DashboardGrid","TeamGrid"];export{I as AlignCenter,o as Columns1,m as Columns2,d as Columns3,p as Columns4,v as DashboardGrid,s as Default,G as FlowColumn,x as FlowRow,g as GapSizes,y as GridAreas,h as ImageGallery,R as JustifyCenter,w as ProductGrid,E as ResponsiveGrid,u as Rows2,f as TeamGrid,xe as __namedExportsOrder,ge as default};
