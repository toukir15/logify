import{r as p,A as N,u as g,j as e,c,b}from"./index-C07UJA1Y.js";const v=()=>{const{user:r,userDataRefetch:u}=p.useContext(N),[m,f]=p.useState({}),x=g(),w=a=>{var l,t,i;if(((i=(t=(l=a.target)==null?void 0:l.files[0])==null?void 0:t.type)==null?void 0:i.split("/")[0])=="image"){const d=new FileReader;d.onload=o=>{f({placeholder:o.target.result,file:a.target.files[0]})},d.readAsDataURL(a.target.files[0])}},h=a=>{a.preventDefault();const l=a.target.firstName.value,t=a.target.lastName.value,i=a.target.newPassword.value,d=a.target.confirmPassword.value,o=a.target.emailAddress.value;if(a.target.newPassword.value!==a.target.confirmPassword.value){c("Password doesn't match!","warning");return}if(!l||!t||!i||!d||!o){c("Some data is missing!","warning");return}const s=new FormData;s.append("file",a.target.profileImage.files[0]),s.append("first_name",a.target.firstName.value),s.append("last_name",a.target.lastName.value),s.append("password",a.target.newPassword.value),s.append("email",a.target.emailAddress.value),b.post("/users_api/update_user",s,{headers:{"Content-Type":"multipart/form-data"}}).then(n=>{n.status==200&&(u(),x("/projects"),c("Update Profile Successfully","success"))}).catch(n=>console.log(n))};return e.jsx("div",{className:"w-full py-20",children:e.jsxs("form",{onSubmit:h,method:"post",className:"flex w-[50%] mx-auto flex-col",children:[e.jsxs("div",{className:"flex w-full items-center mb-6",children:[e.jsx("label",{className:"w-[30%]",htmlFor:"firstName",children:"First Name"}),e.jsx("input",{defaultValue:r.first_name,placeholder:"First name",name:"firstName",id:"firstName",className:"border-primary border w-[70%] p-3 rounded",type:"text"})]}),e.jsxs("div",{className:"flex w-full items-center mb-6",children:[e.jsx("label",{className:"w-[30%]",htmlFor:"lastName",children:"Last Name"}),e.jsx("input",{defaultValue:r.last_name,placeholder:"Last name",name:"lastName",id:"lastName",className:"border-primary border w-[70%] p-3 rounded",type:"text"})]}),e.jsxs("div",{className:"flex w-full items-center mb-6",children:[e.jsx("label",{className:"w-[30%]",htmlFor:"newPassword",children:"New Password"}),e.jsx("input",{name:"newPassword",id:"newPassword",className:"border-primary border w-[70%] p-3 rounded",placeholder:"********",type:"password"})]}),e.jsxs("div",{className:"flex w-full items-center mb-6",children:[e.jsx("label",{className:"w-[30%]",htmlFor:"confirmPassword",children:"Confirm Password"}),e.jsx("input",{name:"confirmPassword",id:"confirmPassword",className:"border-primary border w-[70%] p-3 rounded",type:"password",placeholder:"********"})]}),e.jsxs("div",{className:"flex w-full items-center mb-6",children:[e.jsx("label",{className:"w-[30%]",htmlFor:"emailAddress",children:"Email Address"}),e.jsx("input",{value:r.email,name:"emailAddress",id:"emailAddress",className:"border-primary border w-[70%] p-3 rounded",placeholder:"Email address",type:"text"})]}),e.jsx("div",{className:"flex w-full items-center mb-6",children:e.jsxs("div",{className:"flex w-full items-center mb-6",children:[e.jsx("label",{className:"w-[30%]",htmlFor:"profileImage"}),e.jsx("input",{onChange:a=>w(a),type:"file",id:"profileImage",className:"hidden"}),e.jsx("label",{type:"button",htmlFor:"profileImage",className:"py-2 px-5 rounded-full text-white text-sm bg-primary cursor-pointer",children:"Upload File"}),m.placeholder&&e.jsx("div",{className:"border p-2 ml-2 border-[#4E81CD]",children:e.jsx("img",{className:"h-[30px]",src:m.placeholder,alt:""})}),!m.placeholder&&r.profile_image&&e.jsx("div",{className:"border p-2 ml-2 border-[#4E81CD]",children:e.jsx("img",{className:"h-[30px]",src:`https://logify-task.onrender.com/public/uploads/${r.profile_image}`,alt:""})})]})}),e.jsxs("div",{className:"flex w-full items-center mb-6",children:[e.jsx("label",{className:"w-[30%]"}),e.jsxs("div",{className:"w-[70%] flex gap-4 items-center mt-6",children:[e.jsx("button",{className:"bg-primary py-3 px-4 w-full rounded-lg text-white",children:"Save"}),e.jsx("button",{className:"border border-primary text-primary py-3 px-4 w-full rounded-lg",children:"Cancel"})]})]})]})})};export{v as default};