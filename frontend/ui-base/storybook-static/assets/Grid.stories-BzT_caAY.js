import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{d as k,e as D,S as P,a as N,m as V}from"./high-contrast.prop-DN4VqJ5o.js";import{r as $}from"./iframe-DsuaOdjx.js";import{g as M,l as E,F as d}from"./flex-bym-5aeO.js";import"./avatar-RXesCRZq.js";import{B as o}from"./box-CeCqNv3u.js";import"./button-ClCv9eVs.js";import"./card-DfIScEG2.js";import"./icon-button-QpiRLWqf.js";import"./base-button-Dyf4vkZD.js";import{T as n}from"./text-Bwa-Y73d.js";import{T as J}from"./theme-BFbej9HP.js";import{A as L}from"./avatar-_BCNlzxm.js";import{B as T}from"./button-jOk6Qw9K.js";import"./index-CVlKO6je.js";import"./index-BW54sZL3.js";import"./preload-helper-D9Z9MdNV.js";import"./get-subtree-COcTOnEl.js";import"./radius.prop-BFb5uVoY.js";import"./weight.prop-Rt1sSGdE.js";import"./createLucideIcon-1puiGGu7.js";const O=["div","span"],_=["none","inline-grid","grid"],H=["1","2","3","4","5","6","7","8","9"],U=["1","2","3","4","5","6","7","8","9"],W=["row","column","dense","row-dense","column-dense"],Q=["start","center","end","baseline","stretch"],q=["start","center","end","between"],K=["start","center","end","baseline","between","around","evenly","stretch"],X=["start","center","end","baseline","stretch"],A={as:{type:"enum",values:O,default:"div"},...k,display:{type:"enum",className:"rt-r-display",values:_,responsive:!0},areas:{type:"string",className:"rt-r-gta",customProperties:["--grid-template-areas"],responsive:!0},columns:{type:"enum | string",className:"rt-r-gtc",customProperties:["--grid-template-columns"],values:H,parseValue:z,responsive:!0},rows:{type:"enum | string",className:"rt-r-gtr",customProperties:["--grid-template-rows"],values:U,parseValue:z,responsive:!0},flow:{type:"enum",className:"rt-r-gaf",values:W,responsive:!0},align:{type:"enum",className:"rt-r-ai",values:Q,responsive:!0},justify:{type:"enum",className:"rt-r-jc",values:q,parseValue:Y,responsive:!0},alignContent:{type:"enum",className:"rt-r-ac",values:K,parseValue:Z,responsive:!0},justifyItems:{type:"enum",className:"rt-r-ji",values:X,responsive:!0},...M};function z(i){return A.columns.values.includes(i)?i:i?.match(/^\d+$/)?`repeat(${i}, minmax(0, 1fr))`:i}function Y(i){return i==="between"?"space-between":i}function Z(i){switch(i){case"between":return"space-between";case"around":return"space-around";case"evenly":return"space-evenly";default:return i}}const t=$.forwardRef((i,s)=>{const{className:b,asChild:B,as:R="div",...F}=D(i,A,E,V),S=B?P:R;return e.jsx(S,{...F,ref:s,className:N("rt-Grid",b)})});t.displayName="Grid";t.__docgenInfo={description:"",methods:[],displayName:"Grid",composes:["GridOwnProps"]};const we={title:"Base/Grid",component:t,parameters:{layout:"centered"},decorators:[i=>e.jsx(J,{children:e.jsx(i,{})})],argTypes:{as:{control:"select",options:["div","span"],description:"HTML element to render"},display:{control:"select",options:["none","inline-grid","grid"],description:"CSS display property"},columns:{control:"select",options:["1","2","3","4","5","6","7","8","9"],description:"Number of columns or custom grid-template-columns"},rows:{control:"select",options:["1","2","3","4","5","6","7","8","9"],description:"Number of rows or custom grid-template-rows"},flow:{control:"select",options:["row","column","dense","row-dense","column-dense"],description:"Grid auto flow direction"},align:{control:"select",options:["start","center","end","baseline","stretch"],description:"Align items (vertical)"},justify:{control:"select",options:["start","center","end","between"],description:"Justify content (horizontal)"},gap:{control:"select",options:["1","2","3","4","5","6","7","8","9"],description:"Gap between grid items"},areas:{control:"text",description:"Grid template areas"}},args:{as:"div",display:"grid",columns:"3",gap:"2"}},r=({children:i,style:s,...b})=>e.jsx(o,{style:{padding:"12px",backgroundColor:"var(--blue-3)",borderRadius:"6px",textAlign:"center",minHeight:"60px",display:"flex",alignItems:"center",justifyContent:"center",...s},...b,children:e.jsx(n,{size:"2",children:i})}),a={render:i=>e.jsxs(t,{...i,children:[e.jsx(r,{children:"1"}),e.jsx(r,{children:"2"}),e.jsx(r,{children:"3"}),e.jsx(r,{children:"4"}),e.jsx(r,{children:"5"}),e.jsx(r,{children:"6"})]})},l={render:()=>e.jsxs(t,{columns:"1",gap:"2",children:[e.jsx(r,{children:"Item 1"}),e.jsx(r,{children:"Item 2"}),e.jsx(r,{children:"Item 3"})]})},c={render:()=>e.jsxs(t,{columns:"2",gap:"2",children:[e.jsx(r,{children:"Item 1"}),e.jsx(r,{children:"Item 2"}),e.jsx(r,{children:"Item 3"}),e.jsx(r,{children:"Item 4"})]})},m={render:()=>e.jsxs(t,{columns:"3",gap:"2",children:[e.jsx(r,{children:"Item 1"}),e.jsx(r,{children:"Item 2"}),e.jsx(r,{children:"Item 3"}),e.jsx(r,{children:"Item 4"}),e.jsx(r,{children:"Item 5"}),e.jsx(r,{children:"Item 6"})]})},p={render:()=>e.jsxs(t,{columns:"4",gap:"2",children:[e.jsx(r,{children:"1"}),e.jsx(r,{children:"2"}),e.jsx(r,{children:"3"}),e.jsx(r,{children:"4"}),e.jsx(r,{children:"5"}),e.jsx(r,{children:"6"}),e.jsx(r,{children:"7"}),e.jsx(r,{children:"8"})]})},x={render:()=>e.jsxs(t,{columns:"3",rows:"2",gap:"2",children:[e.jsx(r,{children:"1"}),e.jsx(r,{children:"2"}),e.jsx(r,{children:"3"}),e.jsx(r,{children:"4"}),e.jsx(r,{children:"5"}),e.jsx(r,{children:"6"})]})},u={render:()=>e.jsxs(d,{direction:"column",gap:"4",children:[e.jsxs("div",{children:[e.jsx(n,{size:"2",weight:"medium",color:"gray",children:"Gap 1:"}),e.jsxs(t,{columns:"3",gap:"1",style:{marginTop:"8px"},children:[e.jsx(r,{children:"A"}),e.jsx(r,{children:"B"}),e.jsx(r,{children:"C"})]})]}),e.jsxs("div",{children:[e.jsx(n,{size:"2",weight:"medium",color:"gray",children:"Gap 3:"}),e.jsxs(t,{columns:"3",gap:"3",style:{marginTop:"8px"},children:[e.jsx(r,{children:"A"}),e.jsx(r,{children:"B"}),e.jsx(r,{children:"C"})]})]}),e.jsxs("div",{children:[e.jsx(n,{size:"2",weight:"medium",color:"gray",children:"Gap 6:"}),e.jsxs(t,{columns:"3",gap:"6",style:{marginTop:"8px"},children:[e.jsx(r,{children:"A"}),e.jsx(r,{children:"B"}),e.jsx(r,{children:"C"})]})]})]})},g={render:()=>e.jsxs(t,{columns:"2",rows:"2",flow:"row",gap:"2",children:[e.jsx(r,{children:"1"}),e.jsx(r,{children:"2"}),e.jsx(r,{children:"3"}),e.jsx(r,{children:"4"}),e.jsx(r,{children:"5"})]})},h={render:()=>e.jsxs(t,{columns:"2",rows:"2",flow:"column",gap:"2",children:[e.jsx(r,{children:"1"}),e.jsx(r,{children:"2"}),e.jsx(r,{children:"3"}),e.jsx(r,{children:"4"}),e.jsx(r,{children:"5"})]})},G={render:()=>e.jsxs(t,{columns:"3",gap:"2",align:"center",style:{height:"200px",backgroundColor:"var(--gray-2)",padding:"16px",borderRadius:"8px"},children:[e.jsx(r,{style:{height:"40px"},children:"Small"}),e.jsx(r,{style:{height:"80px"},children:"Large"}),e.jsx(r,{style:{height:"60px"},children:"Medium"})]})},I={render:()=>e.jsxs(t,{columns:"3",gap:"2",justify:"center",style:{width:"400px",backgroundColor:"var(--gray-2)",padding:"16px",borderRadius:"8px"},children:[e.jsx(r,{style:{width:"60px"},children:"1"}),e.jsx(r,{style:{width:"60px"},children:"2"}),e.jsx(r,{style:{width:"60px"},children:"3"})]})},y={render:()=>e.jsxs(t,{areas:'"header header header" "sidebar content content" "footer footer footer"',columns:"200px 1fr 1fr",rows:"60px 1fr 60px",gap:"2",style:{height:"300px",width:"400px"},children:[e.jsx(o,{style:{gridArea:"header",backgroundColor:"var(--blue-3)",padding:"12px",borderRadius:"6px",display:"flex",alignItems:"center",justifyContent:"center"},children:e.jsx(n,{size:"2",weight:"medium",children:"Header"})}),e.jsx(o,{style:{gridArea:"sidebar",backgroundColor:"var(--green-3)",padding:"12px",borderRadius:"6px",display:"flex",alignItems:"center",justifyContent:"center"},children:e.jsx(n,{size:"2",weight:"medium",children:"Sidebar"})}),e.jsx(o,{style:{gridArea:"content",backgroundColor:"var(--purple-3)",padding:"12px",borderRadius:"6px",display:"flex",alignItems:"center",justifyContent:"center"},children:e.jsx(n,{size:"2",weight:"medium",children:"Content"})}),e.jsx(o,{style:{gridArea:"footer",backgroundColor:"var(--orange-3)",padding:"12px",borderRadius:"6px",display:"flex",alignItems:"center",justifyContent:"center"},children:e.jsx(n,{size:"2",weight:"medium",children:"Footer"})})]})},j={render:()=>e.jsxs(d,{direction:"column",gap:"4",children:[e.jsx(n,{size:"4",weight:"bold",children:"Responsive Grid Layouts"}),e.jsx(n,{size:"2",color:"gray",children:"These demonstrate different grid layouts for different screen sizes"}),e.jsxs("div",{children:[e.jsx(n,{size:"3",weight:"medium",style:{marginBottom:"12px"},children:"Mobile (1 column):"}),e.jsxs(t,{columns:"1",gap:"2",style:{width:"200px"},children:[e.jsx(r,{children:"Item 1"}),e.jsx(r,{children:"Item 2"}),e.jsx(r,{children:"Item 3"}),e.jsx(r,{children:"Item 4"})]})]}),e.jsxs("div",{children:[e.jsx(n,{size:"3",weight:"medium",style:{marginBottom:"12px"},children:"Tablet (2 columns):"}),e.jsxs(t,{columns:"2",gap:"2",style:{width:"300px"},children:[e.jsx(r,{children:"Item 1"}),e.jsx(r,{children:"Item 2"}),e.jsx(r,{children:"Item 3"}),e.jsx(r,{children:"Item 4"})]})]}),e.jsxs("div",{children:[e.jsx(n,{size:"3",weight:"medium",style:{marginBottom:"12px"},children:"Desktop (4 columns):"}),e.jsxs(t,{columns:"4",gap:"2",style:{width:"500px"},children:[e.jsx(r,{children:"Item 1"}),e.jsx(r,{children:"Item 2"}),e.jsx(r,{children:"Item 3"}),e.jsx(r,{children:"Item 4"})]})]})]})},w={render:()=>e.jsx(t,{columns:"3",gap:"3",style:{width:"400px"},children:Array.from({length:9},(i,s)=>e.jsx(o,{style:{aspectRatio:"1",backgroundColor:"var(--gray-4)",borderRadius:"8px",display:"flex",alignItems:"center",justifyContent:"center"},children:e.jsxs(n,{size:"2",color:"gray",children:["Image ",s+1]})},s))})},v={render:()=>e.jsx(t,{columns:"2",gap:"4",style:{width:"500px"},children:[{name:"Product A",price:"$99"},{name:"Product B",price:"$149"},{name:"Product C",price:"$199"},{name:"Product D",price:"$249"}].map((i,s)=>e.jsx(Card,{size:"3",children:e.jsxs(d,{direction:"column",gap:"3",children:[e.jsx(o,{style:{height:"120px",backgroundColor:"var(--gray-3)",borderRadius:"6px",display:"flex",alignItems:"center",justifyContent:"center"},children:e.jsx(n,{size:"2",color:"gray",children:"Image"})}),e.jsxs("div",{children:[e.jsx(n,{size:"3",weight:"medium",children:i.name}),e.jsx(n,{size:"4",weight:"bold",color:"blue",style:{marginTop:"4px"},children:i.price})]}),e.jsx(T,{size:"2",children:"Add to Cart"})]})},s))})},f={render:()=>e.jsxs(t,{columns:"4",gap:"3",style:{width:"600px"},children:[e.jsx(Card,{size:"2",children:e.jsxs(d,{direction:"column",gap:"1",children:[e.jsx(n,{size:"1",color:"gray",children:"Users"}),e.jsx(n,{size:"4",weight:"bold",children:"1,234"})]})}),e.jsx(Card,{size:"2",children:e.jsxs(d,{direction:"column",gap:"1",children:[e.jsx(n,{size:"1",color:"gray",children:"Revenue"}),e.jsx(n,{size:"4",weight:"bold",children:"$45,678"})]})}),e.jsx(Card,{size:"2",children:e.jsxs(d,{direction:"column",gap:"1",children:[e.jsx(n,{size:"1",color:"gray",children:"Orders"}),e.jsx(n,{size:"4",weight:"bold",children:"567"})]})}),e.jsx(Card,{size:"2",children:e.jsxs(d,{direction:"column",gap:"1",children:[e.jsx(n,{size:"1",color:"gray",children:"Conversion"}),e.jsx(n,{size:"4",weight:"bold",children:"3.2%"})]})}),e.jsx(Card,{size:"3",style:{gridColumn:"span 3"},children:e.jsxs(d,{direction:"column",gap:"2",children:[e.jsx(n,{size:"3",weight:"medium",children:"Analytics Chart"}),e.jsx(o,{style:{height:"200px",backgroundColor:"var(--gray-2)",borderRadius:"6px",display:"flex",alignItems:"center",justifyContent:"center"},children:e.jsx(n,{size:"2",color:"gray",children:"Chart Area"})})]})}),e.jsx(Card,{size:"3",children:e.jsxs(d,{direction:"column",gap:"2",children:[e.jsx(n,{size:"3",weight:"medium",children:"Recent Activity"}),e.jsx(d,{direction:"column",gap:"2",children:["User signed up","Order completed","Payment received"].map((i,s)=>e.jsxs(d,{gap:"2",align:"center",children:[e.jsx("div",{style:{width:"6px",height:"6px",backgroundColor:"var(--green-9)",borderRadius:"50%"}}),e.jsx(n,{size:"2",children:i})]},s))})]})})]})},C={render:()=>e.jsx(t,{columns:"3",gap:"4",style:{width:"600px"},children:[{name:"Alice Johnson",role:"Designer",avatar:"AJ"},{name:"Bob Smith",role:"Developer",avatar:"BS"},{name:"Carol Davis",role:"Manager",avatar:"CD"},{name:"David Wilson",role:"Developer",avatar:"DW"},{name:"Eve Brown",role:"Designer",avatar:"EB"},{name:"Frank Miller",role:"QA Engineer",avatar:"FM"}].map((i,s)=>e.jsx(Card,{size:"3",children:e.jsxs(d,{direction:"column",gap:"3",align:"center",children:[e.jsx(L,{fallback:i.avatar,size:"5",color:"blue"}),e.jsxs("div",{style:{textAlign:"center"},children:[e.jsx(n,{size:"3",weight:"medium",children:i.name}),e.jsx(n,{size:"2",color:"gray",style:{marginTop:"2px"},children:i.role})]}),e.jsx(T,{size:"1",variant:"outline",style:{width:"100%"},children:"Contact"})]})},s))})};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  render: args => <Grid {...args}>
      <GridItem>1</GridItem>
      <GridItem>2</GridItem>
      <GridItem>3</GridItem>
      <GridItem>4</GridItem>
      <GridItem>5</GridItem>
      <GridItem>6</GridItem>
    </Grid>
}`,...a.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: () => <Grid columns="1" gap="2">
      <GridItem>Item 1</GridItem>
      <GridItem>Item 2</GridItem>
      <GridItem>Item 3</GridItem>
    </Grid>
}`,...l.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  render: () => <Grid columns="2" gap="2">
      <GridItem>Item 1</GridItem>
      <GridItem>Item 2</GridItem>
      <GridItem>Item 3</GridItem>
      <GridItem>Item 4</GridItem>
    </Grid>
}`,...c.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  render: () => <Grid columns="3" gap="2">
      <GridItem>Item 1</GridItem>
      <GridItem>Item 2</GridItem>
      <GridItem>Item 3</GridItem>
      <GridItem>Item 4</GridItem>
      <GridItem>Item 5</GridItem>
      <GridItem>Item 6</GridItem>
    </Grid>
}`,...m.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
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
}`,...p.parameters?.docs?.source}}};x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  render: () => <Grid columns="3" rows="2" gap="2">
      <GridItem>1</GridItem>
      <GridItem>2</GridItem>
      <GridItem>3</GridItem>
      <GridItem>4</GridItem>
      <GridItem>5</GridItem>
      <GridItem>6</GridItem>
    </Grid>
}`,...x.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  render: () => <Flex direction="column" gap="4">
      <div>
        <Text size="2" weight="medium" color="gray">
          Gap 1:
        </Text>
        <Grid columns="3" gap="1" style={{
        marginTop: "8px"
      }}>
          <GridItem>A</GridItem>
          <GridItem>B</GridItem>
          <GridItem>C</GridItem>
        </Grid>
      </div>

      <div>
        <Text size="2" weight="medium" color="gray">
          Gap 3:
        </Text>
        <Grid columns="3" gap="3" style={{
        marginTop: "8px"
      }}>
          <GridItem>A</GridItem>
          <GridItem>B</GridItem>
          <GridItem>C</GridItem>
        </Grid>
      </div>

      <div>
        <Text size="2" weight="medium" color="gray">
          Gap 6:
        </Text>
        <Grid columns="3" gap="6" style={{
        marginTop: "8px"
      }}>
          <GridItem>A</GridItem>
          <GridItem>B</GridItem>
          <GridItem>C</GridItem>
        </Grid>
      </div>
    </Flex>
}`,...u.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  render: () => <Grid columns="2" rows="2" flow="row" gap="2">
      <GridItem>1</GridItem>
      <GridItem>2</GridItem>
      <GridItem>3</GridItem>
      <GridItem>4</GridItem>
      <GridItem>5</GridItem>
    </Grid>
}`,...g.parameters?.docs?.source}}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  render: () => <Grid columns="2" rows="2" flow="column" gap="2">
      <GridItem>1</GridItem>
      <GridItem>2</GridItem>
      <GridItem>3</GridItem>
      <GridItem>4</GridItem>
      <GridItem>5</GridItem>
    </Grid>
}`,...h.parameters?.docs?.source}}};G.parameters={...G.parameters,docs:{...G.parameters?.docs,source:{originalSource:`{
  render: () => <Grid columns="3" gap="2" align="center" style={{
    height: "200px",
    backgroundColor: "var(--gray-2)",
    padding: "16px",
    borderRadius: "8px"
  }}>
      <GridItem style={{
      height: "40px"
    }}>Small</GridItem>
      <GridItem style={{
      height: "80px"
    }}>Large</GridItem>
      <GridItem style={{
      height: "60px"
    }}>Medium</GridItem>
    </Grid>
}`,...G.parameters?.docs?.source}}};I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:`{
  render: () => <Grid columns="3" gap="2" justify="center" style={{
    width: "400px",
    backgroundColor: "var(--gray-2)",
    padding: "16px",
    borderRadius: "8px"
  }}>
      <GridItem style={{
      width: "60px"
    }}>1</GridItem>
      <GridItem style={{
      width: "60px"
    }}>2</GridItem>
      <GridItem style={{
      width: "60px"
    }}>3</GridItem>
    </Grid>
}`,...I.parameters?.docs?.source}}};y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  render: () => <Grid areas='"header header header" "sidebar content content" "footer footer footer"' columns="200px 1fr 1fr" rows="60px 1fr 60px" gap="2" style={{
    height: "300px",
    width: "400px"
  }}>
      <Box style={{
      gridArea: "header",
      backgroundColor: "var(--blue-3)",
      padding: "12px",
      borderRadius: "6px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }}>
        <Text size="2" weight="medium">
          Header
        </Text>
      </Box>
      <Box style={{
      gridArea: "sidebar",
      backgroundColor: "var(--green-3)",
      padding: "12px",
      borderRadius: "6px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }}>
        <Text size="2" weight="medium">
          Sidebar
        </Text>
      </Box>
      <Box style={{
      gridArea: "content",
      backgroundColor: "var(--purple-3)",
      padding: "12px",
      borderRadius: "6px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }}>
        <Text size="2" weight="medium">
          Content
        </Text>
      </Box>
      <Box style={{
      gridArea: "footer",
      backgroundColor: "var(--orange-3)",
      padding: "12px",
      borderRadius: "6px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }}>
        <Text size="2" weight="medium">
          Footer
        </Text>
      </Box>
    </Grid>
}`,...y.parameters?.docs?.source}}};j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  render: () => <Flex direction="column" gap="4">
      <Text size="4" weight="bold">
        Responsive Grid Layouts
      </Text>
      <Text size="2" color="gray">
        These demonstrate different grid layouts for different screen sizes
      </Text>

      <div>
        <Text size="3" weight="medium" style={{
        marginBottom: "12px"
      }}>
          Mobile (1 column):
        </Text>
        <Grid columns="1" gap="2" style={{
        width: "200px"
      }}>
          <GridItem>Item 1</GridItem>
          <GridItem>Item 2</GridItem>
          <GridItem>Item 3</GridItem>
          <GridItem>Item 4</GridItem>
        </Grid>
      </div>

      <div>
        <Text size="3" weight="medium" style={{
        marginBottom: "12px"
      }}>
          Tablet (2 columns):
        </Text>
        <Grid columns="2" gap="2" style={{
        width: "300px"
      }}>
          <GridItem>Item 1</GridItem>
          <GridItem>Item 2</GridItem>
          <GridItem>Item 3</GridItem>
          <GridItem>Item 4</GridItem>
        </Grid>
      </div>

      <div>
        <Text size="3" weight="medium" style={{
        marginBottom: "12px"
      }}>
          Desktop (4 columns):
        </Text>
        <Grid columns="4" gap="2" style={{
        width: "500px"
      }}>
          <GridItem>Item 1</GridItem>
          <GridItem>Item 2</GridItem>
          <GridItem>Item 3</GridItem>
          <GridItem>Item 4</GridItem>
        </Grid>
      </div>
    </Flex>
}`,...j.parameters?.docs?.source}}};w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  render: () => <Grid columns="3" gap="3" style={{
    width: "400px"
  }}>
      {Array.from({
      length: 9
    }, (_, i) => <Box key={i} style={{
      aspectRatio: "1",
      backgroundColor: "var(--gray-4)",
      borderRadius: "8px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }}>
          <Text size="2" color="gray">
            Image {i + 1}
          </Text>
        </Box>)}
    </Grid>
}`,...w.parameters?.docs?.source}}};v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  render: () => <Grid columns="2" gap="4" style={{
    width: "500px"
  }}>
      {[{
      name: "Product A",
      price: "$99"
    }, {
      name: "Product B",
      price: "$149"
    }, {
      name: "Product C",
      price: "$199"
    }, {
      name: "Product D",
      price: "$249"
    }].map((product, index) => <Card key={index} size="3">
          <Flex direction="column" gap="3">
            <Box style={{
          height: "120px",
          backgroundColor: "var(--gray-3)",
          borderRadius: "6px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}>
              <Text size="2" color="gray">
                Image
              </Text>
            </Box>
            <div>
              <Text size="3" weight="medium">
                {product.name}
              </Text>
              <Text size="4" weight="bold" color="blue" style={{
            marginTop: "4px"
          }}>
                {product.price}
              </Text>
            </div>
            <Button size="2">Add to Cart</Button>
          </Flex>
        </Card>)}
    </Grid>
}`,...v.parameters?.docs?.source}}};f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  render: () => <Grid columns="4" gap="3" style={{
    width: "600px"
  }}>
      {/* Stats cards */}
      <Card size="2">
        <Flex direction="column" gap="1">
          <Text size="1" color="gray">
            Users
          </Text>
          <Text size="4" weight="bold">
            1,234
          </Text>
        </Flex>
      </Card>

      <Card size="2">
        <Flex direction="column" gap="1">
          <Text size="1" color="gray">
            Revenue
          </Text>
          <Text size="4" weight="bold">
            $45,678
          </Text>
        </Flex>
      </Card>

      <Card size="2">
        <Flex direction="column" gap="1">
          <Text size="1" color="gray">
            Orders
          </Text>
          <Text size="4" weight="bold">
            567
          </Text>
        </Flex>
      </Card>

      <Card size="2">
        <Flex direction="column" gap="1">
          <Text size="1" color="gray">
            Conversion
          </Text>
          <Text size="4" weight="bold">
            3.2%
          </Text>
        </Flex>
      </Card>

      {/* Large chart card */}
      <Card size="3" style={{
      gridColumn: "span 3"
    }}>
        <Flex direction="column" gap="2">
          <Text size="3" weight="medium">
            Analytics Chart
          </Text>
          <Box style={{
          height: "200px",
          backgroundColor: "var(--gray-2)",
          borderRadius: "6px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}>
            <Text size="2" color="gray">
              Chart Area
            </Text>
          </Box>
        </Flex>
      </Card>

      {/* Activity list */}
      <Card size="3">
        <Flex direction="column" gap="2">
          <Text size="3" weight="medium">
            Recent Activity
          </Text>
          <Flex direction="column" gap="2">
            {["User signed up", "Order completed", "Payment received"].map((activity, index) => <Flex key={index} gap="2" align="center">
                  <div style={{
              width: "6px",
              height: "6px",
              backgroundColor: "var(--green-9)",
              borderRadius: "50%"
            }} />
                  <Text size="2">{activity}</Text>
                </Flex>)}
          </Flex>
        </Flex>
      </Card>
    </Grid>
}`,...f.parameters?.docs?.source}}};C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  render: () => <Grid columns="3" gap="4" style={{
    width: "600px"
  }}>
      {[{
      name: "Alice Johnson",
      role: "Designer",
      avatar: "AJ"
    }, {
      name: "Bob Smith",
      role: "Developer",
      avatar: "BS"
    }, {
      name: "Carol Davis",
      role: "Manager",
      avatar: "CD"
    }, {
      name: "David Wilson",
      role: "Developer",
      avatar: "DW"
    }, {
      name: "Eve Brown",
      role: "Designer",
      avatar: "EB"
    }, {
      name: "Frank Miller",
      role: "QA Engineer",
      avatar: "FM"
    }].map((member, index) => <Card key={index} size="3">
          <Flex direction="column" gap="3" align="center">
            <Avatar fallback={member.avatar} size="5" color="blue" />
            <div style={{
          textAlign: "center"
        }}>
              <Text size="3" weight="medium">
                {member.name}
              </Text>
              <Text size="2" color="gray" style={{
            marginTop: "2px"
          }}>
                {member.role}
              </Text>
            </div>
            <Button size="1" variant="outline" style={{
          width: "100%"
        }}>
              Contact
            </Button>
          </Flex>
        </Card>)}
    </Grid>
}`,...C.parameters?.docs?.source}}};const ve=["Default","Columns1","Columns2","Columns3","Columns4","Rows2","GapSizes","FlowRow","FlowColumn","AlignCenter","JustifyCenter","GridAreas","ResponsiveGrid","ImageGallery","ProductGrid","DashboardGrid","TeamGrid"];export{G as AlignCenter,l as Columns1,c as Columns2,m as Columns3,p as Columns4,f as DashboardGrid,a as Default,h as FlowColumn,g as FlowRow,u as GapSizes,y as GridAreas,w as ImageGallery,I as JustifyCenter,v as ProductGrid,j as ResponsiveGrid,x as Rows2,C as TeamGrid,ve as __namedExportsOrder,we as default};
