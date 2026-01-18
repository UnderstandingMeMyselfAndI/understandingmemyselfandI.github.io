import{r as e}from"../mui-icons-n8o26S09.js";import{g as r}from"../gsap-qnFhCEKp.js";
/*!
 * @gsap/react 2.1.2
 * https://gsap.com
 *
 * Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license or for
 * Club GSAP members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/let t="undefined"!=typeof document?e.useLayoutEffect:e.useEffect,n=e=>e&&!Array.isArray(e)&&"object"==typeof e,c=[],s={},o=r;const u=(r,u=c)=>{let f=s;n(r)?(f=r,r=null,u="dependencies"in f?f.dependencies:c):n(u)&&(f=u,u="dependencies"in f?f.dependencies:c),r&&"function"!=typeof r&&console.warn("First parameter must be a function or config object");const{scope:i,revertOnUpdate:d}=f,a=e.useRef(!1),p=e.useRef(o.context(()=>{},i)),l=e.useRef(e=>p.current.add(null,e)),m=u&&u.length&&!d;return m&&t(()=>(a.current=!0,()=>p.current.revert()),c),t(()=>{if(r&&p.current.add(r,i),!m||!a.current)return()=>p.current.revert()},u),{context:p.current,contextSafe:l.current}};u.register=e=>{o=e},u.headless=!0;export{u};
//# sourceMappingURL=react-DeeEW4W4.js.map
