import{G as m,u as B,r as x,a as H,j as t,L as _,F as M,b as Y}from"./index-C07UJA1Y.js";import{h as d}from"./moment-Cl4UOzQZ.js";import{S as p}from"./sweetalert2.all-RknQfh7f.js";import{P as F}from"./Pagination-C5cXu75M.js";function k(s){return m({tag:"svg",attr:{viewBox:"0 0 24 24"},child:[{tag:"path",attr:{d:"M17 6H22V8H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V8H2V6H7V3C7 2.44772 7.44772 2 8 2H16C16.5523 2 17 2.44772 17 3V6ZM18 8H6V20H18V8ZM9 11H11V17H9V11ZM13 11H15V17H13V11ZM9 4V6H15V4H9Z"},child:[]}]})(s)}function I(s){return m({tag:"svg",attr:{viewBox:"0 0 24 24"},child:[{tag:"path",attr:{d:"m16 2.012 3 3L16.713 7.3l-3-3zM4 14v3h3l8.299-8.287-3-3zm0 6h16v2H4z"},child:[]}]})(s)}const S=()=>{var i,c;const s=B(),{projectsData:a,projectsDataRefetch:h,projectDataIsLoading:j,setProjectID:u,initialFetch:g,setInitialFetch:f,setUserInitialFetch:y}=x.useContext(H);if(j)return t.jsx(_,{});const[l,N]=x.useState(1),b=Math==null?void 0:Math.ceil((a==null?void 0:a.length)/7),C=[...(i=Array(b))==null?void 0:i.keys()],o=7*l,v=(e,r)=>{e.stopPropagation(),p.fire({title:"Are you sure?",text:"You won't be able to revert this!",icon:"warning",showCancelButton:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",confirmButtonText:"Delete"}).then(n=>{n.isConfirmed&&Y.delete(`/projects_api/delete_projects?id=${r}`).then(V=>{V.data.result.deletedCount&&p.fire({title:"Deleted!",text:"Your file has been deleted.",icon:"success"}),h()})})},P=(e,r)=>{e.stopPropagation(),s(`/projects/edit-project/${r}`)},w=(e,r)=>{e.stopPropagation(),s(`/projects/view-project/${r}`)};return t.jsxs("div",{className:"py-4 md:py-10 px-4 md:px-20",children:[t.jsx("div",{className:"flex justify-end",children:t.jsx("button",{onClick:()=>{y(),s("/projects/add-project")},className:"bg-primary text-sm md:text-[16px] rounded-lg text-white py-3 px-4 mb-4 md:mb-8",children:"Add Projects"})}),t.jsxs("div",{className:"overflow-x-scroll md:overflow-x-hidden text-sm md:text-[16px]",children:[t.jsxs("table",{className:"w-full",children:[a.length>0&&t.jsxs("thead",{children:[t.jsx("th",{className:"text-start pt-4 pb-8 px-3 text-gray font-normal",children:"Project Name"}),t.jsx("th",{className:"text-start pt-4 pb-8 px-3 text-gray font-normal",children:"Image"}),t.jsx("th",{className:"text-start pt-4 pb-8 px-3 text-gray font-normal",children:"ID Number"}),t.jsx("th",{className:"text-start pt-4 pb-8 px-3 text-gray font-normal",children:"Client"}),t.jsx("th",{className:"text-start pt-4 pb-8 px-3 text-gray font-normal",children:"Project Value"}),t.jsx("th",{className:"text-start pt-4 pb-8 px-3 text-gray font-normal",children:"Start Date"}),t.jsx("th",{className:"text-start pt-4 pb-8 px-3 text-gray font-normal",children:"End Date"}),t.jsx("th",{className:"text-start pt-4 pb-8 px-3 text-gray font-normal",children:"Action"})]}),t.jsx("tbody",{children:(c=a.slice(o-7,o))==null?void 0:c.map((e,r)=>t.jsxs("tr",{onClick:()=>{f(!g),u(e._id),s(`/projects/logs/control/open/${e._id}`)},className:"bg-white border-b-[20px] border-light-gray cursor-pointer",children:[t.jsxs("td",{className:"py-5 px-4 text-start",children:[" ",e.project_name]}),t.jsxs("td",{className:"py-5 px-4 text-start",children:[t.jsx("img",{className:"h-10 w-10",src:`https://logify-task.onrender.com/public/uploads/${e.add_image}`,alt:""})," "]}),t.jsx("td",{className:"py-5 px-4 text-start",children:e.ID_number}),t.jsx("td",{className:"py-5 px-4 text-start",children:e.client}),t.jsx("td",{className:"py-5 px-4 text-start",children:e.project_value}),t.jsx("td",{className:"py-5 px-4 text-start",children:t.jsx("p",{className:"bg-[#BBF7D0] w-fit px-3 py-[1px] text-[#158F9C] rounded-full",children:d(e.start_date).format("DD/MM/YYYY")})}),t.jsx("td",{className:"py-5 px-4 text-start",children:t.jsx("p",{className:"bg-[#BBF7D0] w-fit px-3 py-[1px] text-[#158F9C] rounded-full",children:d(e.end_date).format("DD/MM/YYYY")})}),t.jsx("td",{className:"py-5 px-4 text-start",children:t.jsxs("div",{className:"flex gap-3",children:[t.jsx("button",{type:"button",children:t.jsx(M,{onClick:n=>{w(n,e._id)},size:18})}),t.jsx("button",{children:t.jsx(I,{onClick:n=>{P(n,e._id)},className:"text-primary",size:22})}),t.jsx("button",{children:t.jsx(k,{onClick:n=>v(n,e._id),className:"text-[#ef2828e5]",size:18})})]})})]},r))})]}),a<=0&&t.jsx("div",{className:"text-center text-2xl font-medium text-gray mt-10",children:"No project here"})]}),a.length>7&&t.jsx("div",{children:t.jsx(F,{paginationData:{totalButtonArray:C,currentPage:l,setCurrentPage:N}})})]})};export{S as default};
