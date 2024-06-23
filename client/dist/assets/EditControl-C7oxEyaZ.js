import{r as s,a as B,u as I,j as e,c as v,b as M}from"./index-C07UJA1Y.js";import{J,u as O}from"./useJoditConfig-Bj6tcPm_.js";import{S as T}from"./index-CzlzJ9GH.js";import{B as C,H as D}from"./react-tooltip.min-D1sjDDzu.js";import{C as k}from"./index-CBnerLJD.js";import{D as y}from"./Date-DlkuwKcp.js";import{C as H,a as U}from"./CustomOption-CgQ-oymv.js";import{c as z}from"./useSelectCustomStyle-DUjELx1G.js";import"./moment-Cl4UOzQZ.js";const Y=()=>{const{projectsData:_,controlsDataRefeatch:S,controlsData:F}=s.useContext(B),u=s.useRef(null),p=s.useRef(null),x=s.useRef(null),[a,R]=s.useState(null),[f,V]=s.useState(null),h=I(),n=window.location.href.split("/")[9],c=window.location.href.split("/")[6],l=window.location.href.split("/")[7],i=_.find(o=>o._id==l),t=F.find(o=>o._id==n),$=o=>{o.preventDefault();const r=o.target.controlName.value,j=u.current.value,w=p.current.props.value,d=x.current.props.value,g=o.target.controlStatus.value,b=a||t.control_date,N=a?f:t.due_date;if(console.log(d),!r||!j||!d.length||!w||!g||!b||!N){v("Some data is messing!","warning");return}const E={control_name:r,control_date:b,control_status:g,comment:j,due_date:N,control_owner:w,tags:d,project_id:l,status:c};M.patch(`/controls_api/update_control?control_id=${n}`,E).then(m=>{m.status==200&&(S(),console.log({openClosedStatus:c,projectID:l}),h(`/projects/logs/control/${c}/${l}`),v("Update Control Successfully","success"))}).catch(m=>console.log(m))};return e.jsx("div",{className:"w-full py-10",children:e.jsxs("form",{onSubmit:$,className:"flex w-[60%] mx-auto flex-col",children:[e.jsxs("div",{className:"flex w-full items-center mb-6",children:[e.jsxs("div",{className:"w-[30%]  flex items-center gap-2",children:[e.jsx("label",{htmlFor:"",children:"Control Name"}),e.jsx("div",{"data-tooltip-id":"control-name",className:"bg-[#aaaaaa] hover:bg-[#4B5563] rounded-full text-white mt-1 cursor-pointer",children:e.jsx(C,{})}),e.jsx(D,{id:"control-name",content:"High level description an action or control, for example 'Engage architect for Project X. ",style:{width:"350px"},place:"right"})]}),e.jsx("input",{defaultValue:t.control_name,placeholder:"Enter control name",name:"controlName",id:"controlName",className:"border-primary border w-[70%] p-3 rounded outline-none",type:"text"})]}),e.jsxs("div",{className:"flex w-full items-center mb-6",children:[e.jsx("label",{className:"w-[30%]",htmlFor:"",children:"Control Date"}),e.jsx("div",{className:"w-[70%]",children:e.jsx(y,{dateData:{date:a,setDate:R,defaultValue:t.control_date}})})]}),e.jsxs("div",{className:"flex w-full items-center mb-6",children:[e.jsxs("div",{className:"w-[30%]  flex items-center gap-2",children:[e.jsx("label",{htmlFor:"",children:"Control Status"}),e.jsx("div",{"data-tooltip-id":"control-status",className:"bg-[#aaaaaa] hover:bg-[#4B5563] rounded-full text-white mt-1 cursor-pointer",children:e.jsx(C,{})}),e.jsx(D,{id:"control-status",content:"This is an ongoing log on the status of this task, for example every time during a meeting or new milestone there's a progress update you can log the status of this control'",style:{width:"350px"},place:"right"})]}),e.jsx("textarea",{defaultValue:t.control_status,className:"border-primary border w-[70%] p-3 rounded outline-none",name:"controlStatus",id:"controlStatus",cols:"10",rows:"4",placeholder:"Write project status"})]}),e.jsxs("div",{className:"flex w-full items-center mb-6",children:[e.jsx("label",{className:"w-[30%]",htmlFor:"",children:"Comment"}),e.jsx("div",{className:"w-[70%] border border-primary rounded",children:e.jsx(J,{ref:u,value:t.comment,config:O,tabIndex:1})})]}),e.jsxs("div",{className:"flex w-full items-center mb-6",children:[e.jsx("label",{className:"w-[30%]",htmlFor:"",children:"Due Date"}),e.jsx("div",{className:"w-[70%]",children:e.jsx(y,{dateData:{date:f,setDate:V,defaultValue:t.due_date}})})]}),e.jsxs("div",{className:"flex w-full items-center mb-6",children:[e.jsx("label",{className:"w-[30%]",htmlFor:"",children:"Control Owner"}),e.jsx(T,{defaultValue:t.control_owner,ref:p,className:"w-[70%] z-[50]",options:i==null?void 0:i.project_owner,isClearable:!0,components:{CustomMultiValue:H,CustomOption:U},isMulti:!0,styles:{control:(o,r)=>({...o,borderColor:(r.isFocused,"#4256D0"),padding:"6px"})}})]}),e.jsxs("div",{className:"flex w-full items-center mb-6",children:[e.jsx("label",{className:"w-[30%]",htmlFor:"",children:"Tags"}),e.jsx(k,{defaultValue:t.tags,placeholder:"Tags",ref:x,className:"w-[70%]",isMulti:!0,isClearable:!1,styles:z})]}),e.jsxs("div",{className:"flex w-full items-center mb-6",children:[e.jsx("label",{className:"w-[30%]",htmlFor:""}),e.jsxs("div",{className:"w-[70%] flex gap-8",children:[e.jsx("button",{className:"bg-primary py-3 w-full text-white rounded-lg",children:"Update Control"}),e.jsx("button",{type:"button",onClick:()=>h(`/projects/logs/control/open/${l}/view-control/${n}`),className:"border border-primary text-primary py-3 w-full rounded-lg",children:"Cancel"})]})]})]})})};export{Y as default};