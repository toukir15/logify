import{G as c,r as x,j as e}from"./index-C07UJA1Y.js";import{F as p,d as m}from"./index-CBnerLJD.js";import{h as n}from"./moment-Cl4UOzQZ.js";function h(o){return c({tag:"svg",attr:{viewBox:"0 0 512 512"},child:[{tag:"path",attr:{d:"M405 136.798L375.202 107 256 226.202 136.798 107 107 136.798 226.202 256 107 375.202 136.798 405 256 285.798 375.202 405 405 375.202 285.798 256z"},child:[]}]})(o)}const b=({dateData:o})=>{const{date:t,setDate:l,defaultValue:r}=o||{},[d,s]=x.useState(!1),a=n(t).format("DD/MM/YYYY");return e.jsxs("div",{children:[e.jsxs("div",{onClick:()=>s(!0),className:" flex items-center justify-between border border-primary  rounded p-3 bg-white text-primary cursor-pointer",children:[!r&&e.jsx("p",{className:`${!t&&"text-[#929191]"}`,children:t?a:"DD/MM/YY"}),r&&e.jsx("p",{children:t?a:n(r).format("DD/MM/YYYY")}),e.jsx(p,{size:20})]}),d&&e.jsx("div",{"data-aos":"",onClick:()=>{s(!1)},id:"tooltip",className:"w-screen h-screen bg-[#40444E66] absolute top-0 bottom-0 left-0 right-0 z-[100] flex justify-center items-center",children:e.jsx("div",{"data-aos":"zoom-in",onClick:i=>i.stopPropagation(),className:"bg-white p-6 rounded-lg w-[350px] min-h-[470px]",children:e.jsxs("div",{children:[e.jsx("div",{className:"flex justify-end items-center text-primary ",children:e.jsx(h,{onClick:()=>s(!1),className:"cursor-pointer hover:text-primary",size:24})}),e.jsxs("div",{className:"flex justify-center",children:[!r&&e.jsx("p",{className:"border border-[#e9e9e9] py-3 px-6 rounded text-primary mb-2",children:t?a:"DD/MM/YY"}),r&&e.jsx("p",{className:"border border-[#e9e9e9] py-3 px-6 rounded text-primary mb-2",children:t?a:n(r).format("DD/MM/YYYY")})]}),e.jsx("div",{style:{display:"flex",flexFlow:"column nowrap"},children:e.jsx(m.Calendar,{onChange:i=>l(i),date:t})}),e.jsx("div",{className:"flex justify-center",children:e.jsx("button",{onClick:()=>s(!1),type:"button",className:"border border-[#e9e9e9] py-2 px-10 bg-primary text-white rounded-lg",children:"Select"})})]})})})]})};export{b as D};
