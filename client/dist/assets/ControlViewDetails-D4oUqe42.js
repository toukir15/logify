import{r as m,a as x,u as h,j as s,M as i,e as j,f as r,p as u}from"./index-Qlug-mrU.js";import{h as a}from"./moment-Cl4UOzQZ.js";const N=()=>{const{controlsData:d}=m.useContext(x),c=window.location.href.split("/")[9],t=window.location.href.split("/")[6],l=window.location.href.split("/")[7],e=d.find(n=>n._id==c),o=h();return s.jsxs("div",{children:[s.jsxs("div",{className:"flex items-center justify-between",children:[s.jsxs("button",{className:"flex w-fit cursor-default",children:[s.jsx(i,{onClick:()=>o(`/projects/logs/control/${t}/${l}`),className:"cursor-pointer",size:28}),s.jsx(i,{onClick:()=>o(`/projects/logs/control/${t}/${l}`),className:"cursor-pointer relative right-4",size:28})]}),s.jsxs("div",{className:"flex gap-10",children:[s.jsx("button",{onClick:()=>o(`/projects/logs/control/${t}/add-control/${l}`),className:"bg-[#F3F4F6] w-12 h-12 rounded-full flex justify-center items-center custom-shadow",children:s.jsx(j,{size:20})}),s.jsx("button",{onClick:()=>o(`/projects/logs/control/${t}/${l}/edit-control/${c}`),className:"bg-[#F3F4F6] w-12 h-12 rounded-full flex justify-center items-center custom-shadow",children:s.jsx(r,{size:20})})]})]}),s.jsxs("div",{className:"mt-10 flex justify-between",children:[s.jsxs("div",{children:[s.jsx("h4",{className:"text-2xl font-medium mb-4",children:"Name"}),s.jsx("p",{children:e.control_name})]}),s.jsxs("div",{children:[s.jsx("h4",{className:"text-2xl font-medium mb-4",children:"Owner"}),s.jsx("p",{children:e.control_owner.value})]}),s.jsxs("div",{children:[s.jsx("h4",{className:"text-2xl font-medium mb-4",children:"Date"}),s.jsx("p",{children:a(e.control_date).format("DD/MM/YYYY")})]}),s.jsxs("div",{children:[s.jsx("h4",{className:"text-2xl font-medium mb-4",children:"Due Date"}),s.jsx("p",{children:a(e.due_date).format("DD/MM/YYYY")})]})]}),s.jsxs("div",{className:"mt-12",children:[s.jsx("h4",{className:"text-3xl  mb-4 font-medium",children:"Tags"}),s.jsx("div",{className:"flex gap-2",children:e.tags.map(n=>s.jsx("p",{className:"bg-[#484747] text-white px-6 py-1 rounded-full text-sm",children:n.value}))})]}),s.jsxs("div",{className:"mt-12",children:[s.jsx("h2",{className:"text-3xl text-[#4E81CD] mb-4 font-medium",children:"Control Status"}),s.jsxs("div",{className:"flex items-center gap-1 mb-4",children:[s.jsx(r,{})," ",s.jsxs("p",{children:[a(e.control_date).format("DD/MM/YYYY")," - ",e.control_status]})," "]})]}),s.jsxs("div",{className:"mt-12",children:[s.jsx("h2",{className:"text-3xl text-[#4E81CD] mb-4 font-medium",children:"Comment"}),u(e.comment)]})]})};export{N as default};