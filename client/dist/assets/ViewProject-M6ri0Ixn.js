import{r as j,a as p,u,j as e,M as d,e as f,f as N}from"./index-Qlug-mrU.js";import{h as x}from"./moment-Cl4UOzQZ.js";const g=()=>{var l,c,a,r,n,m;const{projectsData:o}=j.useContext(p),h=window.location.href.split("/")[5],s=o.find(i=>i._id==h),t=u();return e.jsxs("div",{className:"py-10 px-20",children:[e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsxs("button",{className:"flex w-fit cursor-default",children:[e.jsx(d,{onClick:()=>t("/projects"),className:"cursor-pointer",size:28}),e.jsx(d,{onClick:()=>t("/projects"),className:"cursor-pointer relative right-4",size:28})]}),e.jsxs("div",{className:"flex gap-10",children:[e.jsx("button",{className:"bg-[#F3F4F6] w-12 h-12 rounded-full flex justify-center items-center custom-shadow",children:e.jsx(f,{size:20})}),e.jsx("button",{className:"bg-[#F3F4F6] w-12 h-12 rounded-full flex justify-center items-center custom-shadow",children:e.jsx(N,{size:20})})]})]}),e.jsxs("div",{className:"mt-10 flex justify-between",children:[e.jsxs("div",{className:"flex items-center gap-4",children:[e.jsx("div",{className:"border border-primary w-[70px] h-[70px] flex justify-center items-center",children:e.jsx("img",{className:"w-14 h-14 object-fill",src:`https://logify-task.onrender.com/public/uploads/${s==null?void 0:s.add_image}`,alt:""})}),e.jsxs("div",{children:[e.jsx("h4",{className:"text-2xl font-medium mb-4",children:"Project Name"}),e.jsx("p",{children:s.project_name})]})]}),e.jsxs("div",{children:[e.jsx("h4",{className:"text-2xl font-medium mb-4",children:"ID Number"}),e.jsx("p",{children:s.ID_number})]}),e.jsxs("div",{children:[e.jsx("h4",{className:"text-2xl font-medium mb-4",children:"Start Date"}),e.jsx("p",{children:x(s.start_date).format("DD/MM/YYYY")})]}),e.jsxs("div",{children:[e.jsx("h4",{className:"text-2xl font-medium mb-4",children:"End Date"}),e.jsx("p",{children:x(s.end_date).format("DD/MM/YYYY")})]})]}),e.jsxs("div",{className:"mt-12",children:[e.jsx("h2",{className:"text-3xl mb-4 font-medium",children:"Client"}),e.jsx("p",{children:s.client})]}),e.jsxs("div",{className:"mt-12",children:[e.jsx("h2",{className:"text-3xl mb-4 font-medium",children:"Project Value"}),e.jsx("p",{children:s.project_value})]}),e.jsxs("div",{className:"mt-12",children:[e.jsx("h2",{className:"text-3xl mb-4 font-medium",children:"Project Owner"}),e.jsx("p",{children:(l=s.project_owner)==null?void 0:l.map(i=>e.jsxs("p",{children:[i.value,!s.project_owner.length&&", "," "]}))})]}),e.jsxs("div",{className:"mt-12",children:[e.jsx("h2",{className:"text-3xl mb-4 font-medium",children:"Risk Consequences"}),e.jsx("p",{children:(c=s.risk_consequences)==null?void 0:c.map(i=>e.jsxs("p",{children:[i.value,!s.risk_consequences.length&&", "," "]}))})]}),e.jsxs("div",{className:"mt-12",children:[e.jsx("h2",{className:"text-3xl mb-4 font-medium",children:"Risk Consequences Impacts"}),e.jsx("p",{children:(a=s.risk_consequences_impact)==null?void 0:a.map(i=>e.jsxs("p",{children:[i.value,!s.risk_consequences_impact.length&&", "," "]}))})]}),e.jsxs("div",{className:"mt-12",children:[e.jsx("h2",{className:"text-3xl mb-4 font-medium",children:"Risk Categories"}),e.jsx("p",{children:(r=s.risk_categories)==null?void 0:r.map(i=>e.jsxs("p",{children:[i.value,!s.risk_categories.length&&", "," "]}))})]}),e.jsxs("div",{className:"mt-12",children:[e.jsx("h2",{className:"text-3xl mb-4 font-medium",children:"Likelihood"}),e.jsx("p",{children:(n=s.likelihood)==null?void 0:n.map(i=>e.jsxs("p",{children:[i.value,!s.likelihood.length&&", "," "]}))})]}),e.jsxs("div",{className:"mt-12",children:[e.jsx("h2",{className:"text-3xl mb-4 font-medium",children:"Risk Rating"}),e.jsx("p",{children:(m=s.risk_ratting)==null?void 0:m.map(i=>e.jsxs("p",{children:[i.value,!s.risk_ratting.length&&", "," "]}))})]}),e.jsxs("div",{className:"mt-12",children:[e.jsx("h2",{className:"text-3xl mb-4 font-medium",children:"Risk Matrix Template"}),e.jsx("div",{className:"w-[512px] h-[512px] border border-primary flex justify-center items-center",children:e.jsx("img",{src:`https://logify-task.onrender.com/public/uploads/${s.add_image}`,className:"w-[500px] h-[500px] object-fill rounded",alt:""})})]})]})};export{g as default};