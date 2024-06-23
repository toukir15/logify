import{r as c,R as o}from"./index-C07UJA1Y.js";function h(e,a){a===void 0&&(a={});var r=a.insertAt;if(!(!e||typeof document>"u")){var s=document.head||document.getElementsByTagName("head")[0],n=document.createElement("style");n.type="text/css",r==="top"&&s.firstChild?s.insertBefore(n,s.firstChild):s.appendChild(n),n.styleSheet?n.styleSheet.cssText=e:n.appendChild(document.createTextNode(e))}}var y=`.styles-module_wrapper__1I_qj {
  z-index: 1;
  display: flex;
  align-items: center;
  position: fixed;
  padding: 0px 60px 0px 60px;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: black;
  box-sizing: border-box;
}

.styles-module_content__2jwZj {
  margin: auto;
  padding: 0;
  width: 90%;
  height: 100%;
  max-height: 100%;
  text-align: center;
}

.styles-module_slide__1zrfk {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.styles-module_image__2hdkJ {
  max-height: 100%;
  max-width: 100%;
  user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
}

.styles-module_close__2I1sI {
  color: white;
  position: absolute;
  top: 15px;
  right: 15px;
  font-size: 40px;
  font-weight: bold;
  opacity: 0.2;
  cursor: pointer;
}

.styles-module_close__2I1sI:hover {
  opacity: 1;
}

.styles-module_navigation__1pqAE {
  height: 80%;
  color: white;
  cursor: pointer;
  position: absolute;
  font-size: 60px;
  line-height: 60px;
  font-weight: bold;
  display: flex;
  align-items: center;
  opacity: 0.2;
  padding: 0 15px;
  user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
}

.styles-module_navigation__1pqAE:hover {
  opacity: 1;
}

@media (hover: none) {
  .styles-module_navigation__1pqAE:hover {
    opacity: 0.2;
  }
}

.styles-module_prev__KqFRp {
  left: 0;
}

.styles-module_next__1uQwZ {
  right: 0;
}

@media (max-width: 900px) {
  .styles-module_wrapper__1I_qj {
    padding: 0;
  }
}
`,i={wrapper:"styles-module_wrapper__1I_qj",content:"styles-module_content__2jwZj",slide:"styles-module_slide__1zrfk",image:"styles-module_image__2hdkJ",close:"styles-module_close__2I1sI",navigation:"styles-module_navigation__1pqAE",prev:"styles-module_prev__KqFRp",next:"styles-module_next__1uQwZ"};h(y);const p=e=>{var a;const[r,s]=c.useState((a=e.currentIndex)!==null&&a!==void 0?a:0),n=c.useCallback(t=>{let l=(r+t)%e.src.length;l<0&&(l=e.src.length-1),s(l)},[r]),_=c.useCallback(t=>{var l;if(!t.target||!e.closeOnClickOutside)return;const u=t.target.id==="ReactSimpleImageViewer",g=t.target.classList.contains("react-simple-image-viewer__slide");(u||g)&&(t.stopPropagation(),(l=e.onClose)===null||l===void 0||l.call(e))},[e.onClose]),d=c.useCallback(t=>{var l;t.key==="Escape"&&((l=e.onClose)===null||l===void 0||l.call(e)),["ArrowLeft","h"].includes(t.key)&&n(-1),["ArrowRight","l"].includes(t.key)&&n(1)},[e.onClose,n]),m=c.useCallback(t=>{t.wheelDeltaY>0?n(-1):n(1)},[n]);return c.useEffect(()=>(document.addEventListener("keydown",d),e.disableScroll||document.addEventListener("wheel",m),()=>{document.removeEventListener("keydown",d),e.disableScroll||document.removeEventListener("wheel",m)}),[d,m]),o.createElement("div",{id:"ReactSimpleImageViewer",className:`${i.wrapper} react-simple-image-viewer__modal`,onKeyDown:d,onClick:_,style:e.backgroundStyle},o.createElement("span",{className:`${i.close} react-simple-image-viewer__close`,onClick:()=>{var t;return(t=e.onClose)===null||t===void 0?void 0:t.call(e)}},e.closeComponent||"×"),e.src.length>1&&o.createElement("span",{className:`${i.navigation} ${i.prev} react-simple-image-viewer__previous`,onClick:()=>n(-1)},e.leftArrowComponent||"❮"),e.src.length>1&&o.createElement("span",{className:`${i.navigation} ${i.next} react-simple-image-viewer__next`,onClick:()=>n(1)},e.rightArrowComponent||"❯"),o.createElement("div",{className:`${i.content} react-simple-image-viewer__modal-content`,onClick:_},o.createElement("div",{className:`${i.slide} react-simple-image-viewer__slide`},o.createElement("img",{className:i.image,src:e.src[r],alt:""}))))};export{p as R};
