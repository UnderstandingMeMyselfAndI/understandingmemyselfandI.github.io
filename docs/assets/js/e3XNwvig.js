import{j as C}from"./CllUaPuz.js";import{H as ae,P as _}from"./CK6vZ6Gn.js";import{b as K,a as Re,g as je,r as P}from"./D_rhCyw0.js";import{S as He,B as Be}from"./Ctc3IiYP.js";const re=e=>{let i;const t=new Set,r=(a,l)=>{const g=typeof a=="function"?a(i):a;if(!Object.is(g,i)){const f=i;i=l??(typeof g!="object"||g===null)?g:Object.assign({},i,g),t.forEach(b=>b(i,f))}},c=()=>i,d={setState:r,getState:c,getInitialState:()=>o,subscribe:a=>(t.add(a),()=>t.delete(a))},o=i=e(r,c,d);return d},ze=(e=>e?re(e):re),qe=e=>e;function Ue(e,i=qe){const t=K.useSyncExternalStore(e.subscribe,K.useCallback(()=>i(e.getState()),[e,i]),K.useCallback(()=>i(e.getInitialState()),[e,i]));return K.useDebugValue(t),t}const se=e=>{const i=ze(e),t=r=>Ue(i,r);return Object.assign(t,i),t},We=(e=>e?se(e):se);function Ce(e,i){let t;try{t=e()}catch{return}return{getItem:c=>{var u;const m=o=>o===null?null:JSON.parse(o,void 0),d=(u=t.getItem(c))!=null?u:null;return d instanceof Promise?d.then(m):m(d)},setItem:(c,u)=>t.setItem(c,JSON.stringify(u,void 0)),removeItem:c=>t.removeItem(c)}}const oe=e=>i=>{try{const t=e(i);return t instanceof Promise?t:{then(r){return oe(r)(t)},catch(r){return this}}}catch(t){return{then(r){return this},catch(r){return oe(r)(t)}}}},Ve=(e,i)=>(t,r,c)=>{let u={storage:Ce(()=>localStorage),partialize:h=>h,version:0,merge:(h,y)=>({...y,...h}),...i},m=!1,d=0;const o=new Set,a=new Set;let l=u.storage;if(!l)return e((...h)=>{console.warn(`[zustand persist middleware] Unable to update item '${u.name}', the given storage is currently unavailable.`),t(...h)},r,c);const g=()=>{const h=u.partialize({...r()});return l.setItem(u.name,{state:h,version:u.version})},f=c.setState;c.setState=(h,y)=>(f(h,y),g());const b=e((...h)=>(t(...h),g()),r,c);c.getInitialState=()=>b;let T;const S=()=>{var h,y;if(!l)return;const w=++d;m=!1,o.forEach(A=>{var n;return A((n=r())!=null?n:b)});const D=((y=u.onRehydrateStorage)==null?void 0:y.call(u,(h=r())!=null?h:b))||void 0;return oe(l.getItem.bind(l))(u.name).then(A=>{if(A)if(typeof A.version=="number"&&A.version!==u.version){if(u.migrate){const n=u.migrate(A.state,A.version);return n instanceof Promise?n.then(s=>[!0,s]):[!0,n]}console.error("State loaded from storage couldn't be migrated since no migrate function was provided")}else return[!1,A.state];return[!1,void 0]}).then(A=>{var n;if(w!==d)return;const[s,p]=A;if(T=u.merge(p,(n=r())!=null?n:b),t(T,!0),s)return g()}).then(()=>{w===d&&(D==null||D(T,void 0),T=r(),m=!0,a.forEach(A=>A(T)))}).catch(A=>{w===d&&(D==null||D(void 0,A))})};return c.persist={setOptions:h=>{u={...u,...h},h.storage&&(l=h.storage)},clearStorage:()=>{l==null||l.removeItem(u.name)},getOptions:()=>u,rehydrate:()=>S(),hasHydrated:()=>m,onHydrate:h=>(o.add(h),()=>{o.delete(h)}),onFinishHydration:h=>(a.add(h),()=>{a.delete(h)})},u.skipHydration||S(),T||b},Ye=Ve;function X(e){return new Promise((i,t)=>{e.oncomplete=e.onsuccess=()=>i(e.result),e.onabort=e.onerror=()=>t(e.error)})}function Xe(e,i){let t;const r=()=>{if(t)return t;const c=indexedDB.open(e);return c.onupgradeneeded=()=>c.result.createObjectStore(i),t=X(c),t.then(u=>{u.onclose=()=>t=void 0},()=>{}),t};return(c,u)=>r().then(m=>u(m.transaction(i,c).objectStore(i)))}let ee;function J(){return ee||(ee=Xe("keyval-store","keyval")),ee}function Ke(e,i=J()){return i("readonly",t=>X(t.get(e)))}function Qe(e,i,t=J()){return t("readwrite",r=>(r.put(i,e),X(r.transaction)))}function Ze(e,i=J()){return i("readwrite",t=>(t.delete(e),X(t.transaction)))}function Je(e=J()){return e("readwrite",i=>(i.clear(),X(i.transaction)))}const $e={getItem:async e=>await Ke(e)||null,setItem:async(e,i)=>{await Qe(e,i)},removeItem:async e=>{await Ze(e)}},F=We(Ye((e,i)=>({wheelHistory:[],rememberWheels:!1,setRememberWheels:t=>e(()=>({rememberWheels:t})),saveWheelEntry:t=>e(r=>({wheelHistory:[...r.wheelHistory,{...t,date:new Date().toISOString()}]})),removeWheelEntry:t=>e(r=>({wheelHistory:r.wheelHistory.filter((c,u)=>u!==t)})),clearWheelHistory:()=>e(()=>({wheelHistory:[]})),lvc:"",setLVC:t=>{e(()=>({lvc:t}))},lastVersionCheck:"",setLastVersionCheck:t=>{e(()=>({lastVersionCheck:t})),e(()=>({lvc:t}))},isModal:!1,setIsModal:t=>e(()=>({isModal:t})),version:"",setVersion:t=>e(()=>({version:t})),nss:!1,setNSS:t=>e(()=>({nss:t})),ins:!0,setIns:t=>e(()=>({ins:t})),isInstallable:!0,setIsInstallable:t=>{e(()=>({isInstallable:t})),e(()=>({ins:t}))},isisn:!1,setIsISN:t=>e(()=>({isisn:t})),isInstalled:!1,setIsInstalled:t=>{e(()=>({isInstalled:t})),e(()=>({isisn:t}))},nu:!1,setNU:t=>e(()=>({nu:t})),needUpdate:!1,setNeedUpdate:t=>{e({needUpdate:t}),e({nu:t})},spv:!1,setSpv:t=>e({spv:t}),vc:0,setVC:t=>{e(()=>({vc:t}))},incVC:()=>{e(t=>({vc:t.vc+1}))},lvd:0,setLVD:t=>{e(()=>({lvd:t}))},fvd:0,setFVD:t=>{e(r=>({fvd:r.vc===1?t:r.fvd}))},vsts:0,incVSTS:()=>{e(t=>({vsts:t.vsts+1}))},p:[],setP:t=>{e(()=>({p:t}))},phrase:"",setPhrase:t=>{e(()=>({phrase:t})),e(()=>({p:t}))},dc:!0,setDc:t=>{e(()=>({dc:t}))},daysCounterEnabled:!0,enableDaysCounter:t=>{e(()=>({daysCounterEnabled:t})),e(()=>({dc:t}))},uc:!0,setUc:t=>{e(()=>({uc:t}))},unitsCalculatorEnabled:!0,enableUnitsCalculator:t=>{e(()=>({unitsCalculatorEnabled:t})),e(()=>({uc:t}))},tls:!0,setTls:t=>{e(()=>({tls:t}))},toolsEnabled:!0,enableTools:t=>{e(()=>({toolsEnabled:t})),e(()=>({tls:t}))},tf:!0,setTf:t=>{e(()=>({tf:t}))},toolboxFilterEnabled:!0,enableToolboxFilter:t=>{e(()=>({toolboxFilterEnabled:t})),e(()=>({tf:t}))},yt:!0,setYt:t=>{e(()=>({yt:t}))},yourToolsEnabled:!0,enableYourTools:t=>{e(()=>({yourToolsEnabled:t})),e(()=>({yt:t}))},pl:!0,setPl:t=>{e(()=>({pl:t}))},PINLockEnabled:!0,enablePINLock:t=>{e(()=>({PINLockEnabled:t})),e(()=>({pl:t}))},qe:!0,setQe:t=>{e(()=>({qe:t}))},quickExitEnabled:!0,enableQuickExit:t=>{e(()=>({quickExitEnabled:t})),e(()=>({qe:t}))},qem:!0,setQem:t=>{e(()=>({qem:t}))},quickExitMessageEnabled:!0,enableQuickExitMessage:t=>{e(()=>({quickExitMessageEnabled:t})),e(()=>({qem:t}))},qeu:"",setQeu:t=>{e(()=>({qeu:t}))},quickExitURL:"https://google.com",setQuickExitURL:t=>{e(()=>({quickExitURL:t})),e(()=>({qeu:t}))},c:!0,setC:t=>{e(()=>({c:t}))},allowCookies:!0,setAllowCookies:t=>{e(()=>({allowCookies:t})),e(()=>({c:t}))},tpc:!0,setTPC:t=>{e(()=>({tpc:t}))},allowThirdPartyCookies:!0,setAllowThirdPartyCookies:t=>{e(()=>({allowThirdPartyCookies:t})),e(()=>({tpc:t}))},userToolIDs:[],setToolIDs:t=>e(()=>({userToolIDs:t})),addTool:t=>e(r=>({userToolIDs:r.userToolIDs.includes(t)?r.userToolIDs:[...r.userToolIDs,t]})),removeTool:t=>e(r=>({userToolIDs:r.userToolIDs.filter(c=>c!==t)})),getActiveToolIDs:()=>i().userToolIDs,toolsInView:!1,setToolsInView:t=>e(()=>({toolsInView:t})),isMobile:!1,setIsMobile:t=>e(()=>({isMobile:t})),message:"",setMessage:t=>e(()=>({message:t})),showSnackbar:!1,setShowSnackbar:t=>e(()=>({showSnackbar:t})),activity:-1,setActivity:t=>{console.trace(`setActivity called with value: ${t}`),e(()=>({activity:t}))},childRoute:[],setChildRoute:t=>e(()=>({childRoute:t})),accData:[],setAccData:t=>e(()=>({accData:t})),showToolsOnly:!1,setShowToolsOnly:t=>e(()=>({showToolsOnly:t})),toggleShowToolsOnly:()=>e(t=>({showToolsOnly:!t.showToolsOnly})),acronymID:-1,setAcronymID:t=>e(()=>({acronymID:t})),scrollStage:0,setScrollStage:t=>e(()=>({scrollStage:t})),showAccCard:!1,setShowAccCard:t=>{e(()=>({showAccCard:t}))},gae:!0,setGAE:t=>e(()=>({gae:t})),clearIDB:async()=>{await Je(),window.location.reload()},exitButtonPosition:{x:60,y:window.innerHeight-60},setExitButtonPosition:t=>e(()=>({exitButtonPosition:t})),ageVerified:!1,setAgeVerified:t=>e(()=>({ageVerified:t})),_hasHydrated:!1,setHasHydrated:t=>e(()=>({_hasHydrated:t}))}),{name:"ummi",storage:Ce(()=>$e),partialize:e=>({ageVerified:e.ageVerified,dc:e.dc,daysCounterEnabled:e.daysCounterEnabled,uc:e.uc,unitsCalculatorEnabled:e.unitsCalculatorEnabled,tf:e.tf,toolboxFilterEnabled:e.toolboxFilterEnabled,yt:e.yt,yourToolsEnabled:e.yourToolsEnabled,pl:e.pl,PINLockEnabled:e.PINLockEnabled,qe:e.qe,quickExitEnabled:e.quickExitEnabled,qem:e.qem,quickExitMessageEnabled:e.quickExitMessageEnabled,c:e.c,allowCookies:e.allowCookies,tpc:e.tpc,allowThirdPartyCookies:e.allowThirdPartyCookies,exitButtonPosition:e.exitButtonPosition,isins:e.isins,isInstallable:e.isInstallable,ins:e.ins,isInstalled:e.isInstalled,tls:e.tls,vc:e.vc,lvd:e.lvd,fvd:e.fvd,nss:e.nss,version:e.version,lvc:e.lvc,lastVersionCheck:e.lastVersionCheck,spv:e.spv,gae:e.gae,wheelHistory:e.wheelHistory,rememberWheels:e.rememberWheels}),onRehydrateStorage:()=>e=>{e.setHasHydrated(!0)}})),xe=e=>e==null||e==="";function Et(e){if(!e)return null;const i=/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/,t=e.match(i);return t&&t[2].length===11?t[2]:null}function It(e,i){i&&typeof i=="string"&&!xe(i.length)&&(document.title=i),history.pushState&&window.history.pushState({page:i},"",e)}function et(){var e;return"ontouchstart"in window||navigator.maxTouchPoints>0||navigator.msMaxTouchPoints>0||((e=window.matchMedia)==null?void 0:e.call(window,"(pointer: coarse)").matches)}function At(){let e=document.querySelectorAll('a[href*="#"]');for(let i=0;i<e.length;i++)e[i].onclick=function(){document.querySelector(this.hash).scrollIntoView({behavior:"smooth",alignToTop:!0,block:"start"})}}function St(e){return!e||xe(e)?void 0:e.replace(/[^\w]/g,"-").replace(/-{2,}/g,"-").trim().toLowerCase()}function Dt(){const e=location.pathname.replace(/^\/+|\/+$/g,"");return e?e.split("/"):[]}const Rt={duration:{hide:{snackbar:2e3}}},tt=[{id:-1,url:"",title:"Home",menu:!1,modal:!1,conditions:[]},{id:0,url:"introduction",title:"Introduction",menu:!1,modal:!1,conditions:[]},{id:1,url:"tools",title:"Tools",menuPosition:1,menu:!0,modal:!0,classes:"",anchorID:"",conditions:[]},{id:2,url:"days-counter",title:"Days Counter",menuPosition:2,menu:!0,modal:!0,classes:"new",anchorID:"",conditions:[{state:"daysCounterEnabled",value:!0}]},{id:3,url:"motivation",title:"Motivation",menuPosition:8,menu:!1,modal:!1,classes:"",anchorID:"",conditions:[]},{id:4,url:"inspiration",title:"Inspiration",menuPosition:6,menu:!1,modal:!1,classes:"",anchorID:"",conditions:[]},{id:5,url:"units-calculator",title:"Units Calculator",menuPosition:3,menu:!0,modal:!0,classes:"",anchorID:"",conditions:[{state:"unitsCalculatorEnabled",value:!0}]},{id:6,url:"wallpaper-gallery",title:"Wallpapers",menuPosition:4,menu:!0,modal:!0,classes:"new",anchorID:"",conditions:[]},{id:7,url:"about",title:"About",menuPosition:7,menu:!1,modal:!1,classes:"",anchorID:"",conditions:[]},{id:8,url:"tour",title:"Tour",menuPosition:6,menu:!1,modal:!1,classes:"",anchorID:"",conditions:[]},{id:9,url:"search",title:"Search",menuPosition:10,menu:!1,modal:!1,classes:"",anchorID:"",conditions:[]},{id:10,url:"privacy-policy",title:"Privacy Policy",menuPosition:16,menu:!0,modal:!0,classes:"",anchorID:"",conditions:[]},{id:11,url:"ccpaprivacy",title:"CCPA Privacy Policy",menuPosition:16,menu:!1,modal:!0,classes:"",anchorID:"",conditions:[]},{id:12,url:"settings",title:"Settings",menuPosition:18,menu:!0,modal:!0,classes:"",anchorID:"",conditions:[]},{id:13,url:"lingo-and-phrases",title:"Lingo & Phrases",menuPosition:2,menu:!0,modal:!1,classes:"new",anchorID:"lingo",conditions:[]},{id:14,url:"share",title:"Share",menuPosition:7,menu:!0,modal:!1,classes:"",anchorID:"share",conditions:[]},{id:15,url:"newsletter",title:"Newsletter",menuPosition:8,menu:!0,modal:!1,classes:"",anchorID:"newsletter",conditions:[]},{id:16,url:"install",title:"Install Ummi",menuPosition:7,menu:!0,modal:!1,classes:"",anchorID:"install",conditions:[{state:"isInstalled",value:!1},{state:"isInstallable",value:!0}]},{id:17,url:"AcronymExlpained",title:"Acronym Exlpained",menuPosition:20,menu:!1,modal:!0,classes:"",anchorID:"",conditions:[]},{id:18,url:"footer",title:"Footer",menuPosition:20,menu:!1,modal:!1,classes:"",anchorID:"footer",conditions:[]},{id:19,url:"header",title:"Header",menuPosition:20,menu:!1,modal:!1,classes:"",anchorID:"header",conditions:[]},{id:20,url:"your-privacy-cta",title:"Your Privacy",menuPosition:20,menu:!1,modal:!1,classes:"",anchorID:"your-privacy-cta",conditions:[]},{id:21,url:"recovery-timeline",title:"Recovery Timeline",menuPosition:3,menu:!0,modal:!0,classes:"new",anchorID:"",conditions:[]},{id:22,url:"wheel-of-life",title:"Wheel of Life",menuPosition:3,menu:!0,modal:!0,classes:"new",anchorID:"",conditions:[]}],Ct=tt.map(e=>({...e,icon:null})),le={app:{appName:"Ummi"},activity:[{name:"introduction",url:"introduction",slug:"introduction",title:"Hey",content:[{title:"",classes:"ummi-blue",content:['<b><span class="ummi">U</span></b>nderstanding <b><span class="ummi">M</span></b>e, <b><span class="ummi">M</span></b>yself, and <b><span class="ummi">I</span></b> <b><u class="yellow-ul ummi">(U.M.M.I)</u></b>, is your <b><u class="yellow">FREE</u> companion app.</b>']},{title:"",content:[`If you're <b>looking</b> for <u class="yellow-ul lrg yellow">information</u> about <b><u class="orange-ul">Alcohol Recovery </u></b> <br /><br /><br /><b><u class="yellow-ul lrg yellow">this app is for you.</u></b>`,`If you're <b>learning</b> <b><u class="orange-ul">recovery tools</u></b> <br />at groups using <br /><u class="blue-ul"><b>ACT, CBT, DBT, REBT,</b> or <b>SMART</b> therapies?</u><br /><br /><br /><b><u class="yellow-ul lrg yellow">this app is for you.</u>.</b>`,'<u class="white-ul"><b><span class="ummi">Ummi</span></b></u> was created because <u class="yellow-ul lrg"><b>the tools are great</b></u>.','But <b class="yellow">remembering</b> them <u><b>can be hard</b></u>','<u class="white-ul"><b><span class="ummi">Ummi</span></b></u> helps you <b><u class="blue-ul">find  tools</u></b> that work <b><u class="yellow">for you,</u></b> and <b><u>your journey</u></b>.','<u class="light-blue">Completely</u> <b><u class="yellow-ul lrg">for free</b></u>']},{title:"FEATURES:",icon:ae,content:['Explanations of <b><u class="yellow-ul">Addiction Recovery</u> <u>tools </u></b>.','<u class="yellow-ul"><b>Scenarios</b></u> describing <u>when tools <b>could be useful</b></u>.','<u><b>Favourites</b></u> to <b>save tools</b> to <b><u class="yellow-ul light-blue">your own toolbox</u></b>.','<u class="yellow-ul"><b>Private Days Counter</b></u> to <u><b>track recovery</b></u>.','<u><b class="yellow">Alcohol Units Calculator</b></u>.','<u class="yellow-ul">Recovery <b>Lingo &amp; Phrases</b> explained.</u>.',`<b class="yellow">Quick Exit button.</b> <b><u class="yellow-ul">Leave fast</u></b> to Google.com<br /><b><u>Just in case it's needed.</b></u>`,'<b>Complete privacy</b> <u>you control</u>. <b class="light-blue">Erase <u class="yellow-ul">all data</u></b>, <b><u >instantly</u>, <u class="yellow-ul yellow">at anytime</u></b>.',""]}],installed:{content:[{title:"Welcome back!",classes:"ummi-blue",content:["How's it going?","Recovery is tough work so if you're working at it, keep holding it down and stacking the wins.",'Struggling?<br /><b>"Play the tape forward"</b><br /> helps some people to get out of a rut. ',`It's in <a href="tools"><b>Lingo & Phrases</b></a><br /> below tools below.`,"Stay strong and<br /> hang on in there.👊🏼"]}]},returning:{content:{title:"Welcome back!",titles:["Welcome back","Hey there","You're back!","Ace to see you","Hello","Welcome","Hey","Hello","Hi, you good?","Good to see you","Great to see you"],classes:"ummi-blue",content:[],contents:["🔎Looking for Recovery tools?👀 <br /><br />👍 You're in the right place.✔<br /><br /> 👊🏾👇Check them out below👇👊","👋It's great to see you again😎🫵","👋You're in good Company😎🫵","👋You're back, that's ace👋 <br />All the solid ones do👊","🫵Hope you're doing🫵<br /> well today<br /> 🏆champ.🏆 <br /><br /> 👇 Check out some 👇<br />🛠️ tools 🛠️<br />and keep up your game💪","🥾Working hard on 🥾<br /> your recovery?🫶🏻<br /><br />🏋️‍♂️Stay strong🏋🏿‍♂️<br /><br /><u>🫵You are worth it💪🏼</u>","👉Pushing through Recovery?<br /><br /> 🤜Keep crushing those🤛 <br />gremlins like a boss.😎","⛐Struggling with<br /> your Recovery?🚘<br /><br />🫸🏻 Keep pushing 🏋️,<br /> the future you🫵<br /> 🤝🏻 will thank you for it.👊","⛐Grafting at your Recovery?🚘<br /><br /> <b>🏋️‍♂️Stay strong🏋🏿‍♂️.<br />👊You've got this.</b> 👊🏿","🏋🏿‍♂️Working your recovery?🏋🏿‍♂️<br /><br />💪 Keep bossing it like<br /> 🏆the champ you are 🏆","😎Bossing your Recovery?🏋🏿‍♂️<br /><br />🏋🏿‍♂️ Stay strong🏋️‍♂️<br /> and<br />🏋🏿‍♂️ keep crushing it👌 ","⛐Keeping it steady⛐<br /> 🚘in recovery?🚘<br /><br /><u>You're back again<br /></u>👊<u> so keep bossing it</u>👊🏾","🫵Working on the better you?🫵<br /><br /> Keep owning it like<br /> the 🏆champ🏆 you are 👌","🏋️‍♂️Working at being<br /> a better you?🫵<br /><br />Keep smashing it<br /> like a ✨ star⭐","🏋️‍♂️Grafting to keep💪 <br />👿the gremlins at bay?☹<br /><br />🢁Keep going🢁.<br /><br />👊🏼 You've got this👌"]}}},{name:"tools",slug:"#recovery-tools",url:"recovery-tools",title:"The Tools",introduction:(et()?"Tap":"Click")+" on a tool to learn more about it",description:['These tools <br /><u class="yellow-ul"><b>might not </b></u>work <br />for<u><b class="yellow"> everbody.</b></u>','They <u>could work</u><br /> for <b><u class="yellow">one person</u></b> <br />and <u class="yellow-ul">not the next</u>.','But they <br /><u><b>have worked</b></u><br /> for <b><u class="yellow-ul">somebody</u></b>.'],content:[],cta:{title:"The Tools",content:["Find tools that are used in Recovery groups and classes.","Save the ones that work for you to your toolbox.","Try them out to see if they work for you."],btn:{label:{unused:"See the tools",used:"See the tools"}}}},{name:"videos",title:"Videos",content:[]},{name:"DaysCounter",title:"Days Counter",slug:"days-counter",url:"days-counter",btnLabel:"Days Counter",content:[],cta:{title:"Days Counter",content:["Track your progress and remind yourself how far you have come.","Click the button below to start counting days."],btn:{label:{unused:"Set Dates",used:"View Dates"}}}},{name:"UnitsCalculator",title:"Units Calculator",slug:"units-calculator",url:"units-calculator",btnLabel:"Units Calculator",content:[],cta:{title:"Units Calculator",content:["Calculate the Alcholic Units for standard measures and custom drink sizes and ABV."],btn:{label:{unused:"Use the Calculator",used:"View your Calculation"}}}},{name:"install",title:"Install",slug:"install",url:"#install",anchorID:"#install",htmlContent:[],cta:{title:"Install Ummi",content:["Install Ummi for quick access"],btn:{label:{unused:"Install ",used:"Install"}},postInstall:{title:"Thanks!",content:["Thanks for installing Ummi. It's now accessible on your device."]}}},{name:"privacy",slug:"privacy",url:"privacy",title:"We respect you<br />and your privacy",content:["Any personal data you provide to us is stored <b><u>only on your device.</u></b>","You can remove the data at anytime.","Any data sent externally of your device is encrypted and anonymised so it cannot be used to identify you. This data is for analytics and is used to improve the app.","<b><u>We will never sell your data.</u></b>"],btnLabel:"",cta:{title:"We respect you<br />and your privacy",content:["You are fully in control<br />of any data you provide whilst using Ummi and it's features.","Some features can be hidden and shown to suit your needs.","Visit Settings to see the features or to remove your data at any time"],btnLabel:"Privacy Policy",label:{unused:"Privacy Policy",used:"Privacy Policy"}}},{name:"wallpapers",title:"Motivational Wallpapers",slug:"wallpapers",url:"wallpapers",anchorID:"",htmlContent:["Download for free"],cta:{btnLabel:"Wallpapers",title:"Motivational Wallpapers",content:['View our <b>gallery of motivational wallpapers</b> and <b class="yellow">download them for free</b> straight to your device.'],btn:{label:{unused:"View wallpapers ",used:"Install"}}}},{name:"yourData",title:"Your Data",content:[],btnLabel:"Manage Your Data",cta:{title:"Manage your data",content:["Any data you provide is stored<br /> only on your device.<br />You can remove the data at anytime.","<b><u>We will never sell your data.</u></b>"]}},{name:"settings",title:"Settings",slug:"settings",url:"settings",id:14,content:[],btnLabel:"Settings",cta:{title:"",content:[""],label:{unused:"Settings",used:""}}},{name:"recovery-timeline",title:"Detox &amp; Recovery Timeline",slug:"recovery-timeline",url:"recovery-timeline",anchorID:"",content:["The timeline provides support information describing the emotional and physical recovery process. ","Everybody is different so not everyone will experience the same symptoms during the process.","<b>Scroll down to explore the timeline</b>"],confirm:{title:"Detox &amp; Recovery Timeline",instruction:'<p>The information provided in the Recovery Timeline is for <u><b>support purposes only</b></u> and should not be considered as <b><u>advice</u></b>. </p><p>If you are seeking <b><u>medical or recovery advice</u></b> please consult a qualified professional such as a <b><u class="yellow-ul">key worker or medical professional</u></b>.</p>',confirmBtnLabel:"I understand <br />let's go",cancelBtnLabel:"Get me <br />out of here"},cta:{title:"Recovery Timeline",content:[""],btn:{label:{unused:"View the Recovery Timeline ",used:"View the Recovery Timeline"}}}}],toolbox:{added:"Added to your toolbox",removed:"Removed from your toolbox"},tools:{list:{unfiltered:"Showing ALL tools",yourToolsFiltered:"Showing YOUR tools"}}},xt={tools:{nodes:[{id:"cG9zdDo0Mg==",databaseId:42,title:"A.B.C.D.E",toolFieldGroup:{description:`<div>
<div>A bad-ass tool for catching those sneaky negative thoughts and turning them around using proven therapy techniques.</div>
<div>It&#8217;s also easy-to-remember &#8211; the first five letters of the alphabet. Get in.</div>
</div>
`,isAcronym:!0,letters:[{letter:"A",meaning:"Activating event or trigger",definition:`<div>
<div>What actually happened?</div>
<div></div>
<div>This is the specific situation or event that got your motor started, revved up and the wheels spinning. Think back to even before the key was in the ignition.</div>
</div>
`},{letter:"B",meaning:"Belief",definition:`<div>
<div>What story are you telling yourself about what happened?</div>
<div></div>
<div>These are your thoughts and interpretations your mind is creating for you. But be sharp enough to spot when your mind is bending the truth. You&#8217;re no fool.</div>
</div>
`},{letter:"C",meaning:"Consequence",definition:`<div>
<div>How did those thoughts make you feel and act?</div>
<div></div>
<div>This is where your emotions and behaviors show up and kick into play. Sometimes it&#8217;s not pretty, so prep yourself, think about it and stay cool.</div>
</div>
`},{letter:"D",meaning:"Dispute",definition:`<div>
<div>It&#8217;s time to get full-on detective with your own thoughts &#8211; are they really true and helpful or pulling a swerve and working against you?</div>
<div></div>
<div>You can spot the blags so don&#8217;t let them fool you.</div>
<div></div>
<div>Take your thoughts to court and give them a grilling.</div>
</div>
`},{letter:"E",meaning:"Effective new belief",definition:`<div>
<div>Push the crap to one side and focus on the true stuff.</div>
<div></div>
<div>With that you can create a healthier, more realistic way of thinking about the situation and not get blind sided by the BS.</div>
</div>
`}],scenariosField:{nodes:[{id:"cG9zdDox"}]},videosField:{nodes:[{id:"cG9zdDoxNDk="}]},podcastsField:null}},{id:"cG9zdDo5Ng==",databaseId:96,title:"B.A.D.S",toolFieldGroup:{description:`<p>B.A.D.S. is a super-quick check-in.</p>
<p>When the urge to use/drink/gamble/scroll hits, pause and ask yourself: “Am I actually <strong>bored</strong>, <strong>anxious</strong>, <strong>depressed</strong>, or <strong>stressed</strong> right now?”</p>
<p>99 % of the time it’s one of those four jerks in disguise.</p>
<p>B.A.D.S. is the buddies with H.A.L.T. so check out that tool if B.A.D.S. isn&#8217;t cutting it.</p>
`,isAcronym:!0,letters:[{letter:"B",meaning:"Bored",definition:`<p>Feeling restless, unstimulated, or “at a loose end.”.</p>
<p>Boredom can be a time when red flags should start to fly &#8211; it&#8217;s prime time for the gremlins to start running through thoughts and trying to control the show.</p>
<p>Change up the situation and get stuck into something else; a book, a movie, some tunes, batch cook for the week. If that&#8217;s not cutting it going for a walk can help. Changing environment can be a power-move.</p>
`},{letter:"A",meaning:"Anxious",definition:`<p>Experiencing worry, nervousness, or fear about the future or current situations.</p>
<p>When people are anxious it&#8217;s prime time for gremlin thoughts to take control of the wheel and change the course away from the one they&#8217;ve set.</p>
<p>Grounding is a boss move using tools like box breathing, the 54321 tool, or the Shapes tool to get in &#8220;<strong>the here and now</strong>&#8221; &#8211; it buys some space to think rather than letting the mind be consumed.</p>
<p>In the here and now, thinking becomes clearer, the good and bad thoughts identified and separated and it&#8217;s less likely wonky decisions are made which cause future drama.</p>
`},{letter:"D",meaning:"Depressed",definition:`<p>Feeling low, hopeless, unmotivated, or emotionally drained.</p>
<p>Everyone gets down at times, it&#8217;s natural. When people are low they can also have their guard down when bad thoughts start knocking.</p>
<p>Calling a friend, doing an online group or in person or get some good vibes from exercise can level up the situation and make a pivot that&#8217;s needed.</p>
<p>If the dark thoughts persist hit up a professional to level up.</p>
`},{letter:"S",meaning:"Stressed",definition:`<p>Feeling overwhelmed by demands, responsibilities, or external pressures.</p>
<p>When people are stressed their mind can step into the gremlins neighbourhood as it&#8217;s overwhelmed by the things making them stressed.</p>
<p>To avoid the drama and confronting the bad thoughts that hang out here, it&#8217;s time to make a boss move and regain control by using meditation, breathing exercises , the TIPP tool,  or the DEADS tool.</p>
<p>These help to regain control and put the thoughts the stressed mind is spinning, into perspective and apply a bit of chill to the situation.</p>
<p>&nbsp;</p>
`}],scenariosField:{nodes:[{id:"cG9zdDox"}]},videosField:null,podcastsField:null}},{id:"cG9zdDo5Nw==",databaseId:97,title:"C.B.A.",toolFieldGroup:{description:`<p><b data-path-to-node="0" data-index-in-node="60">C.B.A.</b> is one of the most powerful tools you can have in your toolkit and it comes from the guys at <a href="https://smartrecovery.org.uk/" target="_blank" rel="noopener">SMART recovery</a> &#8211; so check them out.</p>
<p>It&#8217;s your no-BS pro/con list that cuts straight through the excuses. When you&#8217;re in the heat of a craving, your brain lies to you—it tells you that getting on it is the only thing that matters. <span class="citation-5 citation-end-5">The CBA is the tool you use to pull the receipts and see if that &#8220;deal&#8221; is actually worth it.</span></p>
<p>The CBA is a four-way grid. You don&#8217;t just look at why drugs/alcohol are bad; you look at why you were/are using them in the first place and what you’re actually trading away.</p>
<p>Make a version of each list for you. Don&#8217;t cut anything and be real with yourself.</p>
<p>If you&#8217;re kidding anyone it&#8217;s only yourself.</p>
`,isAcronym:!0,letters:[{letter:"C",meaning:"Cost",definition:`<p><span style="text-decoration: underline;"><strong>List the costs of using:</strong></span></p>
<p>This is the &#8220;downside&#8221;, the stuff that keeps you up at night. What&#8217;s this behavior really costing you? Think along the lines of:</p>
<ul>
<li>
<p data-path-to-node="7,0,0">The money drained from your pockets.</p>
</li>
<li>
<p data-path-to-node="7,0,0">The bridges burned with family and friends.</p>
</li>
<li>
<p data-path-to-node="7,2,0">The health issues, the legal drama, and that soul-crushing &#8220;hangxiety&#8221; the next morning.</p>
</li>
</ul>
<p><strong>The Costs of Abstaining (Staying Clean)</strong></p>
<p>This is the &#8220;growing pains&#8221; section. Quitting isn&#8217;t all sunshine and rainbows at first.</p>
<ul>
<li>
<p data-path-to-node="13,0,0">Dealing with raw emotions without a filter.</p>
</li>
<li>
<p data-path-to-node="13,1,0">Boredom (this is a big one).</p>
</li>
<li>
<p data-path-to-node="13,2,0">Losing &#8220;friends&#8221; who only want to hang out when you’re using.</p>
</li>
</ul>
<p>&nbsp;</p>
`},{letter:"B",meaning:"Benefits",definition:`<p>&nbsp;</p>
<p><span style="text-decoration: underline;"><strong>List the benefits of using:</strong></span></p>
<p>To beat the beast, you have to be honest about why you like it. Get real with yourself. If it didn&#8217;t do something for you, you wouldn&#8217;t do it.</p>
<ul>
<li>
<p data-path-to-node="10,0,0">Does it kill the stress?</p>
</li>
<li>
<p data-path-to-node="10,1,0">Does it make you feel &#8220;normal&#8221; or confident?</p>
</li>
<li>
<p data-path-to-node="10,2,0">Does it help you forget the past for an hour?</p>
</li>
<li>
<p data-path-to-node="10,3,0"><b data-path-to-node="10,3,0" data-index-in-node="0">The Hook:</b> Acknowledge these benefits, but realize they are always temporary.</p>
</li>
</ul>
<p>&nbsp;</p>
<p><strong>The Benefits of Abstaining (Staying Clean)</strong></p>
<p>This is the &#8220;payoff&#8221;—the life you’re actually trying to build.</p>
<ul>
<li>
<p data-path-to-node="16,0,0">Waking up without a cloud over your head.</p>
</li>
<li>
<p data-path-to-node="16,1,0">Having cash in your wallet that stays there.</p>
</li>
<li>
<p data-path-to-node="16,2,0">Gaining back your self-respect and being someone people can actually count on.</p>
</li>
</ul>
`},{letter:"A",meaning:"Analysis",definition:`<p>The magic of the CBA isn&#8217;t just making a list; it’s a comparison of <b>the Short-Term vs. the Long-Term.</b></p>
<p>When thoughts and cravings rock up, your brain gets real sneaky and the &#8220;Benefits of Using&#8221; seem good &#8211; they are <b>immediate and quick</b>, while the &#8220;Costs&#8221; take their time and don&#8217;t show up until later when they really start <strong>messing with your life</strong>.</p>
<p>The CBA tool is like the future you, with all the knowledge and experience of staying clean, splashing your face with icy cold water (see the TIPP tool), sitting you down and making you look at the big picture without the BS.</p>
<p>When you see it in black and white, laid out on paper, you see the <span style="text-decoration: underline;">&#8220;Benefits of Staying Clean&#8221;</span> are <strong>massive and permanent,</strong> while the <span style="text-decoration: underline;">&#8220;Benefits of Using&#8221;</span> are <strong>tiny, and over in a flash </strong>while the &#8220;C<span style="text-decoration: underline;">osts of using&#8221;</span> hang around <strong>like a bad smell</strong> .</p>
<p>Ask yourself &#8220;Why are you working so hard on the new you&#8221; and pull the H.O.V tool out of your box.</p>
<p>It’s about taking the power back from the impulse, acknowledging your the one at the wheel and telling your brain to cut the BS &#8211; it&#8217;s not going to help.</p>
<p><b>Bottom Line:</b> The CBA proves that shaking hands with your brain on a deal to go down the old route is seriously bad business. You’re trading your entire future for a quick win that&#8217;s sending you in a direction you don&#8217;t want to go. You&#8217;re no fool and so give the deal a swerve.</p>
`}],scenariosField:{nodes:[{id:"cG9zdDox"}]},videosField:{nodes:[{id:"cG9zdDoxNDc="},{id:"cG9zdDoxNDg="}]},podcastsField:null}},{id:"cG9zdDo5OA==",databaseId:98,title:"D.E.A.D.S.",toolFieldGroup:{description:`<p dir="auto">The DEADS tool from SMART Recovery is a solid, no-BS strategy for handling those sneaky urges and cravings that pop up when you&#8217;re kicking addictions or bad habits to the curb. It&#8217;s all about outsmarting them instead of letting them run the show — science-backed moves to ride out the storm without giving in.</p>
<p dir="auto">Bottom line? DEADS is your secret weapon to turn urges from bosses into background noise. They get weaker and rarer the more you use this—practice when you&#8217;re calm so it&#8217;s automatic in the heat. If you&#8217;re pushing through recovery, tap into SMART meetings or a pro for extra backup.</p>
<p dir="auto">Like door-to-door salesmen — if you stop answering, they eventually leave.</p>
<p dir="auto">You&#8217;ve got the power; keep at it.</p>
`,isAcronym:!0,letters:[{letter:"D",meaning:"Deny or Delay",definition:`<p dir="auto">Hit the brakes and create a road block. Urges ain&#8217;t forever—they peak and fade if you don&#8217;t feed them attention. Tell yourself, &#8220;Chill for 10-15 minutes,&#8221; and watch them weaken. The more you deny them, the less they bug you over time. It&#8217;s like starving out a pest; eventually, they bounce.</p>
`},{letter:"E",meaning:"Escape",definition:`<p dir="auto">Bounce your scenery quick smart. If you&#8217;re in a spot that&#8217;s triggering you—like a bar, a shop with your vice, or even scrolling past ads — dip and pivot. Change the channel, leave the room, or straight-up walk away. Shifting your scene flips the script and kills the vibe of the urge fast.</p>
`},{letter:"A",meaning:"Avoid / Accept / Attack",definition:`<p dir="auto">Own it without fighting it.</p>
<p dir="auto">Yeah, it&#8217;s annoying and pretty crap right now, but it&#8217;s normal and it won&#8217;t wreck you. Remind yourself, &#8220;This discomfort is temporary—I&#8217;ve got this.&#8221; Accepting it puts it in perspective, turns it into a win, and helps it pass quicker without the drama.</p>
`},{letter:"D",meaning:"Dispute / Distract",definition:`<p dir="auto">Who&#8217;s Boss here? You are. S0 put your brain in it&#8217;s place for all this BS it&#8217;s pushing your way.  Use logic to roast those irrational thoughts, like &#8220;Nope, that &#8216;one won&#8217;t hurt&#8217; it&#8217;s a lie—it&#8217;s always led to places you don&#8217;t want to go back to.&#8221;</p>
<p dir="auto">Pull a combo with tools like ABCDEs or DISARM to build counter-punches that shut down the craving before it builds steam.</p>
`},{letter:"S",meaning:"Substitute",definition:`<p dir="auto">Swap it out with something better. When the urge hits, jump into a distraction that&#8217;s fun or productive — hit the pavement for a walk, blast some music, grab a book, or crush a workout. Make a list of go-tos ahead of time so you&#8217;re ready to pivot quick and make that craving ghost.</p>
`}],scenariosField:{nodes:[{id:"cG9zdDox"}]},videosField:{nodes:[{id:"cG9zdDoxNDY="}]},podcastsField:null}},{id:"cG9zdDoxOTc=",databaseId:197,title:"D.E.A.R. M.A.N.",toolFieldGroup:{description:`<p>Striaght from the D.B.T. toolbox. DEAR MAN is your script for getting what you need from someone without starting a war or folding like a lawn chair.</p>
`,isAcronym:!0,letters:[{letter:"D",meaning:"Describe",definition:`<p>Lay out the facts, just the facts. No drama.</p>
`},{letter:"E",meaning:"Express",definition:`<p>Say how you feel about it. Use &#8220;I&#8221; statements.</p>
`},{letter:"A",meaning:"Assert",definition:`<p>Ask for what you want, straight up. No hints.</p>
`},{letter:"R",meaning:"Reinforce",definition:`<p>Tell them the good that&#8217;ll come if they hear you out.</p>
`},{letter:"M",meaning:"Mindful",definition:`<p>Stay mindful and stick to your point. Don&#8217;t get sidetracked by their noise.</p>
`},{letter:"A",meaning:"Appear Confident",definition:`<p>Fake it &#8217;til you make it. Stand tall, voice steady.</p>
`},{letter:"N",meaning:"Negotiate",definition:`<p>Be willing to bend a little. Find a deal that works.</p>
`}],scenariosField:null,videosField:null,podcastsField:null}},{id:"cG9zdDo5OQ==",databaseId:99,title:"D.I.S.A.R.M.",toolFieldGroup:{description:`<div>
<div>D.I.S.A.R.M. is like your own personal security team. Like the ones in the movies, and that ex World leaders have.</div>
<div></div>
<div>It&#8217;s your mental bodyguard system &#8211; protecting you from the gremlins creating thoughts and images that try to sabotage your progress. Use the D.I.S.A.R.M. team as they&#8217;ve got your back.</div>
</div>
`,isAcronym:!0,letters:[{letter:"D",meaning:"Destructive",definition:`<div>
<div>Notice when your brain is playing up and feeding you garbage thoughts and mental images. It can be a snake at times.</div>
</div>
`},{letter:"I",meaning:"Imagery",definition:`<div>
<div>Catch those vivid mental movies that make you want to use &#8211; they&#8217;re not real predictions. It&#8217;s euphoric recall.</div>
<div></div>
<div>Your brain trying to trick you with the choice good times but forgetting all the crappy bits when it goes horribly wrong.</div>
</div>
`},{letter:"S",meaning:"Self-talk",definition:`<div>
<div>What&#8217;s that inner voice telling you? If it&#8217;s being a jerk, it&#8217;s time to change the conversation and let it know who&#8217;s boss around here.</div>
</div>
`},{letter:"A",meaning:"Awareness",definition:`<div>
<div>You can&#8217;t change what you don&#8217;t notice. So chill and take a moment, have a look around and check-in with yourself. Focus on your breath and have a quick think about it. You&#8217;ve got this.</div>
</div>
`},{letter:"R",meaning:"Refusal",definition:`<div>
<div>Tell those toxic thoughts who&#8217;s in control. It&#8217;s going to be a &#8220;thanks but no thanks&#8221; to them and your not going to engage.</div>
</div>
`},{letter:"M",meaning:"Method",definition:`<div>
<div>Time to get a game plan ready to replace the junk thoughts with something better.</div>
</div>
`}],scenariosField:{nodes:[{id:"cG9zdDox"}]},videosField:{nodes:[{id:"cG9zdDoxMDA="}]},podcastsField:null}},{id:"cG9zdDoxOTk=",databaseId:199,title:"F.A.C.E",toolFieldGroup:{description:`<p>This one&#8217;s a bit less of a rigid acronym of a tool and more of a handy, street-smart map for dealing with life&#8217;s crap without getting owned by it.</p>
<p>It&#8217;s the escape plan. <strong>F.A.C.E </strong>is the antidote to F.E.A.R (so check out the F.E.A.R tool). It&#8217;s about unhooking from your mind, taking the feeling with you, and walking toward what you care about anyway.</p>
<p>Think of <strong>F.A.C.E.</strong> as your playbook for handling emotional hijackings. It’s the opposite of freaking out or shutting down. First, you <strong>F</strong>eel the feeling instead of denying it. You <strong>A</strong>llow it to exist without a war. You <strong>C</strong>ome back to the solid ground of the present moment so you&#8217;re not lost in mental chaos. Finally, you <strong>E</strong>ngage with your life on your terms, taking the feeling <em>with you</em> instead of waiting for it to leave. It’s not about feeling better; it’s about getting better at feeling, so you can live your life full-on, even when it gets messy.</p>
<p>It’s a core process in ACT (Acceptance Commitment Therapy) for building psychological flexibility.</p>
`,isAcronym:!0,letters:[{letter:"F",meaning:" Feelings & Feel Them",definition:`<p>Acknowledge and accept your feelings. Stop running.</p>
<p>Let yourself actually <em>feel</em> the funky stuff—the anxiety in your chest, the sadness, the anger—without trying to fight it, fix it, or numb it out.</p>
<p>It&#8217;s about making space for the feeling to just be there.</p>
<p>It&#8217;s like: Your mind is screaming, &#8220;This anxiety is terrible, make it stop!&#8221; Instead of panicking or reaching for a distraction, you&#8217;d say to yourself: <em>&#8220;Alright, I&#8217;m feeling that tightness. Hello, anxiety. You can sit here, but you don&#8217;t get to drive the car.&#8221;</em></p>
<p>&nbsp;</p>
`},{letter:"A",meaning:"Allow & Accept ",definition:`<p>Drop the Struggle. This is the active choice to stop wrestling. It&#8217;s saying &#8220;yes&#8221; to the presence of the feeling, even though it&#8217;s making you feel sh*tty. You&#8217;re not saying you <em>like</em> it; you&#8217;re just agreeing that it&#8217;s here, and struggling against it is exhausting you.</p>
<p>It’s the difference between <strong>trying to hold a beachball underwater</strong> (exhausting, and it keeps popping up) and <strong>just letting it float beside you in the pool</strong>. You accept it&#8217;s there, but you&#8217;re not wasting energy fighting it.</p>
<p>&nbsp;</p>
`},{letter:"C",meaning:"Connect ",definition:`<p>Connect &amp; Come Back (To the Present Moment). Your mind is probably time-traveling—replaying past failures or freaking out about future disasters that haven&#8217;t happened yet.</p>
<p>This step is about pulling your attention back to the <strong>here and now</strong>. Use your five senses.</p>
<p>When you&#8217;re spiraling about a future presentation. You ground yourself: <em>&#8220;Okay, right now, I&#8217;m just sitting in my chair. I feel the fabric. I hear the clock ticking. I see the light on the wall. I&#8217;m not in the presentation; I&#8217;m right here, right now.&#8221;</em></p>
`},{letter:"E",meaning:"Engage ",definition:`<p>Engage &amp; Energize (Do What Matters). Now, with the feeling allowed and your feet back on the ground, you ask: <em>&#8220;What&#8217;s the next right move that lines up with who I want to be?&#8221;</em> You direct your energy <strong>toward</strong> <strong>your values</strong>, <strong>not away from your discomfort</strong>.</p>
<p>You&#8217;re down and feeling sad so you feel like swerving on plans to meet your friend.</p>
<p>However, you&#8217;ve allowed the sadness (<strong>F</strong> &amp; <strong>A</strong>), grounded yourself (<strong>C</strong>). Now you <strong>E</strong>: <em>&#8220;Being a reliable buddy matters to me. I&#8217;m gonna go, even if I&#8217;m a little quiet. I&#8217;ll take the sadness along for the ride, and try and ditch it on the way, but I&#8217;m still showing up.&#8221;</em></p>
`}],scenariosField:null,videosField:null,podcastsField:null}},{id:"cG9zdDoxOTg=",databaseId:198,title:"F.E.A.R",toolFieldGroup:{description:`<p>A diagnosis of why you&#8217;re stuck. It names the four moves that keep you in a cage.</p>
<p>The F.E.A.R tool is used to describe the problem and it&#8217;s always hanging with F.A.C.E. tool &#8211; The escape plan which helps identify the solution.</p>
`,isAcronym:!0,letters:[{letter:"F",meaning:"Fusion",definition:`<p>Being glued to your thoughts. Believing every worried story your mind tells you.</p>
`},{letter:"E",meaning:"Evaluation",definition:`<p>Judging everything (and yourself) as good/bad.</p>
`},{letter:"A",meaning:"Avoidance",definition:`<p>Running from uncomfortable feelings.</p>
`},{letter:"R",meaning:"Reason-giving",definition:`<p>&#8220;I can&#8217;t do that because&#8230; [insert story here].&#8221;</p>
`}],scenariosField:null,videosField:null,podcastsField:null}},{id:"cG9zdDoxMDk=",databaseId:109,title:"H.A.L.T.",toolFieldGroup:{description:`<div>
<div>H.A.L.T is a must have self-check tool. When these four basic needs are out of whack, your judgment isn&#8217;t on-point, and you&#8217;re an easy target for old habits. 90% of daft decisions start with one of these four gremlins.</div>
<div></div>
<div>Run a self-check with them and fix the basic stuff first — then see if the craving is still there. 9 times out of 10 it will have done one. If not you can often find H.A.L.T. hanging with the jerks of B.A.D.S so check that tool too.</div>
</div>
`,isAcronym:!0,letters:[{letter:"H",meaning:"Hungry",definition:`<div>
<div>When did you last eat?</div>
<div></div>
<div>Your brain needs fuel, and &#8220;hangry&#8221; is a real thing that affects decisions.</div>
<div></div>
<div>Grab something to eat.</div>
</div>
`},{letter:"A",meaning:"Angry",definition:`<div>
<div>Are you pissed off about something?</div>
<div></div>
<div>Anger can be a real dumbass and hijack your judgment if you don&#8217;t deal with it.</div>
<div></div>
<div>Go for a walk or change your environment, it can do wonders to refocus your thoughts.</div>
</div>
`},{letter:"L",meaning:"Lonely",definition:`<div>
<div>Feeling disconnected from people?</div>
<div></div>
<div>It&#8217;s understandable at times but isolation makes everything harder and the cravings monster loves it.</div>
<div></div>
<div>Kick him to the side and call or message a buddy. It&#8217;s not optional. They&#8217;re probably wondering why you haven&#8217;t been in touch lately.</div>
</div>
`},{letter:"T",meaning:"Tired",definition:`<div>
<div>Exhausted? Your willpower runs on empty when you do &#8211; rest isn&#8217;t optional.</div>
<div></div>
<div>Swerve the unnecessary and get yourself some sleep.</div>
</div>
`}],scenariosField:{nodes:[{id:"cG9zdDox"}]},videosField:null,podcastsField:null}},{id:"cG9zdDoxMTA=",databaseId:110,title:"H.O.P.E.",toolFieldGroup:{description:`<div>
<div>Hope isn’t something you wait for—it’s something you build, one tiny helpful action at a time.</div>
</div>
`,isAcronym:!0,letters:[{letter:"H",meaning:"Helping",definition:`<div>
<div>Do something for someone else &#8211; it gets your thinking out of your own head and <span style="text-decoration: underline;">feels amazing.</span></div>
</div>
`},{letter:"O",meaning:"Others",definition:`<div>
<div>Build real connections with people who matter to you &#8211; <strong>isolation is recovery&#8217;s enemy.</strong></div>
</div>
`},{letter:"P",meaning:"Purpose",definition:`<div>
<div>Find your &#8220;why&#8221; &#8211; what makes you want to get up in the morning?</div>
</div>
`},{letter:"E",meaning:"Esteem",definition:`<div>
<div>Do things that make you <strong>proud of yourself &#8211; small wins count too.</strong></div>
</div>
`}],scenariosField:{nodes:[{id:"cG9zdDox"}]},videosField:null,podcastsField:null}},{id:"cG9zdDoxMTE=",databaseId:111,title:"H.O.V.",toolFieldGroup:{description:`<div>
<div>The Hierarchy of Values (H.O.V.) tool is a straight-up game-changer for getting your priorities locked in and staying motivated, especially when you&#8217;re trying to ditch the bad habits, beat addictions, or just level up your life decisions.</div>
<div></div>
<div>It&#8217;s a key move from SMART Recovery — a no-nonsense, science-based program for handling urges and making smarter choices, keeping it all about real talk and zero mystical vibes.</div>
<div></div>
<div>H.O.V &#8211; Think of it as building your personal roadmap. When life&#8217;s pulling you in daft directions, H.O.V. reminds you what&#8217;s really worth working for, so you don&#8217;t waste time on BS that doesn&#8217;t align with your core. No religious angle here — just practical steps to boss up.</div>
</div>
`,isAcronym:!0,letters:[{letter:"H",meaning:"Hierarchy",definition:`<div>
<div>Make a ranked list of what truly matters to you &#8211; what comes first when push comes to shove? Think of your life like a playlist or a top-10 list. The things that really matter at the top, others that matter less are lower down.</div>
</div>
`},{letter:"O",meaning:"Of",definition:`<div>
<div>The connection between your priorities and your deeper values.</div>
<div></div>
<div>This is NOT: What <em><span style="text-decoration: underline;">your</span> </em>family wants, What <span style="text-decoration: underline;"><em>society </em></span>says or What <span style="text-decoration: underline;"><em>other people think</em></span> you should care about.</div>
<div></div>
<div>This is about <em><span style="text-decoration: underline;">your actual choices</span></em>, not your intentions.</div>
</div>
`},{letter:"V",meaning:"Values",definition:`<div>
<div>Values are what you care about enough to act on. Not slogans. Not Instagram quotes. Values show up in what you do when it gets tough.</div>
</div>
`}],scenariosField:{nodes:[{id:"cG9zdDox"}]},videosField:{nodes:[{id:"cG9zdDoxNDQ="}]},podcastsField:null}},{id:"cG9zdDoxMTI=",databaseId:112,title:"I.C.E.",toolFieldGroup:{description:`<div>
<div>Three simple steps to break free from patterns that aren&#8217;t serving you anymore.</div>
<div></div>
<div><span style="text-decoration: underline;">Challenge your thoughts an</span>d <strong>take your thoughts to court.</strong></div>
</div>
`,isAcronym:!0,letters:[{letter:"I",meaning:"Identify",definition:`<div>
<div>Spot the problem patterns &#8211; what thoughts, feelings, or situations keep tripping you up?</div>
</div>
`},{letter:"C",meaning:"Challenge",definition:`<div>
<div>Question everything &#8211; is this thought true? Is this behavior helping or hurting?</div>
</div>
`},{letter:"E",meaning:"Eliminate",definition:`<div>
<div>Replace the junk with something better &#8211; out with the old, in with the helpful.</div>
</div>
`}],scenariosField:{nodes:[{id:"cG9zdDox"}]},videosField:null,podcastsField:null}},{id:"cG9zdDoxOTU=",databaseId:195,title:"I.M.P.R.O.V.E.",toolFieldGroup:{description:`<p>IMPROVE is a straight-up boss move from DBT (that&#8217;s Dialectical Behavior Therapy, basically a toolkit for dealing with heavy emotions without flipping out).</p>
<p>It&#8217;s all about upgrading the moment when life&#8217;s throwing curveballs at you — keeping your head straight and riding out the storm. Think of it like hacking your brain to chill when stuff&#8217;s getting intense.</p>
<p>The whole point? When life&#8217;s comin&#8217; at you hard, IMPROVE helps you survive the storm without crashing and burning. Practice it when you&#8217;re calm so it&#8217;s second nature when the heat&#8217;s on. If you&#8217;re dealing with heavy stuff, link up with a pro therapist to level it up. Stay strong out there.</p>
`,isAcronym:!0,letters:[{letter:"I",meaning:"Improve",definition:`<p>Picture this: Close your eyes and bounce to a chill spot in your mind, like your fave beach or a cozy crib. Make it vivid — smells, sounds, all that. It&#8217;s like teleporting out of the drama for a sec to recharge.</p>
`},{letter:"M",meaning:"Meaning",definition:`<p>Flip the script on the bad stuff. Ask yourself, &#8220;What&#8217;s the silver lining here? What can I learn or how can this make me tougher?&#8221;</p>
<p>It&#8217;s about finding that hidden gem in the mess so it doesn&#8217;t feel pointless.</p>
`},{letter:"P",meaning:"Pause (and Positive Vibes)",definition:`<p>Take a beat to center yourself. This is like hitting pause, breathing deep, and tapping into your inner strength or thinking about something bigger than the drama, like the universe or your crew. Just a quiet moment to regroup and remind yourself you&#8217;re built for this.</p>
`},{letter:"R",meaning:"Relaxation",definition:`<p>Loosen up dude. Do whatever chills you out — deep breaths, stretching, a hot shower, bath or popping on some quality tunes. Tense up your muscles then let them go, or sip some tea and think about your happy place.</p>
<p>It&#8217;s all about dropping that stress from your body so you ain&#8217;t wound up like a spring.</p>
`},{letter:"O",meaning:"One (thing in the moment)",definition:`<p>Lock in on just one thing right now. Don&#8217;t let your brain bounce around like a pinball — focus on breathing, counting steps while you walk, or eating a snack super slow and noticing every bite.</p>
<p>Keeps you grounded in the now instead of spiraling on the what-ifs.</p>
`},{letter:"V",meaning:"Vacation",definition:`<p>Nah, not booking a flight—it&#8217;s a mini-escape in your day.</p>
<p>Step away for a sec: watch a funny video, check the latest memes, or dip into a quick game on your phone. Give yourself permission to zone out for 5-10 minutes without guilt, like hitting the reset button.</p>
`},{letter:"E",meaning:"Encouragment",definition:`<p>Talk to yourself like your own hype man. Drop some positive self-talk on yourself: &#8220;You got this,&#8221; or &#8220;This crap won&#8217;t last forever — I&#8217;m tougher than it.&#8221; Build yourself up with real talk that gets you back up, no cap.</p>
`}],scenariosField:null,videosField:null,podcastsField:null}},{id:"cG9zdDoxMTM=",databaseId:113,title:"L.F.T.",toolFieldGroup:{description:`<div>
<div>Levelling up your toolbox for dealing with life&#8217;s annoying moments without needing to style it out, losing your cool or your progress.</div>
</div>
`,isAcronym:!0,letters:[{letter:"L",meaning:"Low",definition:`<div>
<div>Notice when your patience is running thin &#8211; this is when those crappy decisions happen &#8211; be a buddy to yourself and do a quick self check-in.</div>
</div>
`},{letter:"F",meaning:"Frustration",definition:`<div>
<div>That feeling when things aren&#8217;t going your way &#8211; totally normal, but you&#8217;ve got to get a game plan together to manage it.</div>
</div>
`},{letter:"T",meaning:"Tolerance",definition:`<div>
<div>Build your ability to sit with uncomfortable thoughts and feelings without needing to escape immediately.</div>
<div></div>
<div>You&#8217;re stronger than you think but if sitting with it gets too much, take a swerve and distract yourself for a bit. You&#8217;ll get better over time so don&#8217;t sweat it.</div>
</div>
`}],scenariosField:{nodes:[{id:"cG9zdDox"}]},videosField:null,podcastsField:null}},{id:"cG9zdDoxMTQ=",databaseId:114,title:"P.I.E.",toolFieldGroup:{description:`<div>
<div>Your personal growth tracker &#8211; because recovery is about so much more than just not using.</div>
</div>
`,isAcronym:!0,letters:[{letter:"P",meaning:"Progress",definition:`<div>
<div>Celebrate the wins, big and small &#8211; you&#8217;re moving forward even if it doesn&#8217;t always feel like it.</div>
</div>
`},{letter:"I",meaning:"Insight",definition:`<div>
<div>Those &#8220;aha!&#8221; moments when you finally get why you do what you do.</div>
</div>
`},{letter:"E",meaning:"Empowerment",definition:`<div>
<div>That growing sense that you&#8217;re the one in charge of your life &#8211; and you&#8217;re getting better at it.</div>
</div>
`}],scenariosField:{nodes:[{id:"cG9zdDox"}]},videosField:null,podcastsField:null}},{id:"cG9zdDoxMTU=",databaseId:115,title:"P.P.P.",toolFieldGroup:{description:`<div>
<div>The three P&#8217;s that make the difference between trying recovery and actually succeeding at it.</div>
</div>
`,isAcronym:!0,letters:[{letter:"P",meaning:"Practice",definition:`<div>
<div>Use your recovery tools regularly, not just when things get rough &#8211; like going to the gym for your brain.</div>
</div>
`},{letter:"P",meaning:"Patience",definition:`<div>
<div>This stuff takes time, and that&#8217;s totally normal &#8211; be kind to yourself while you figure it out.</div>
</div>
`},{letter:"P",meaning:"Persistence",definition:`<div>
<div>Keep going even when it sucks, especially when it sucks &#8211; that&#8217;s when the real growth happens.</div>
</div>
`}],scenariosField:{nodes:[{id:"cG9zdDox"}]},videosField:null,podcastsField:null}},{id:"cG9zdDozMzY=",databaseId:336,title:"Play It Forward",toolFieldGroup:{description:`<p>&#8220;Playing the tape forward&#8221; or &#8220;Play the tape forward&#8221; is very similar to &#8220;Rewind the tape&#8221; but from a different perspective.</p>
<p>It&#8217;s a boss visualization technique used to mentally walk through the entire, realistic consequences when when your brain wants to con you and starts spinning BS. It&#8217;s when your brain starts spitting out lies like having &#8220;just one&#8221; drink or picking up &#8220;won&#8217;t become a problem&#8221;, and showing clips highlighting the immediate pleasure it had in the past.</p>
<p>It&#8217;s used to kick ass when thoughts get all glossy and start romanticising with choice clips and the grime left out in the edit.</p>
<p><strong>Play the tape</strong> forward levels you up by kicking your memory into gear, taking control and remember everything, including the dank missing edits, and reminding you of the path that led you to a grimey end result.</p>
<h3>The rub</h3>
<p data-start="145" data-end="207">This tool is about <strong data-start="164" data-end="206">not remembering the story with only the good bits</strong>.</p>
<p data-start="209" data-end="266">When an urge hits, your brain shows you a highlights reel:</p>
<ul data-start="267" data-end="316">
<li data-start="267" data-end="281">
<p data-start="269" data-end="281">the relief</p>
</li>
<li data-start="267" data-end="281">
<p data-start="269" data-end="281">the buzz</p>
</li>
<li data-start="295" data-end="316">
<p data-start="297" data-end="316">the “ahhh, finally”</p>
</li>
</ul>
<p data-start="318" data-end="468"><strong data-start="318" data-end="343">Play the tape forward</strong> means you keep the movie rolling past those part — <strong data-start="394" data-end="426">to the bits you usually skip</strong>: the fallout, the mess, the next morning.</p>
<p data-start="470" data-end="569">It’s not about scaring yourself.s<br data-start="502" data-end="505" />It’s about <strong data-start="516" data-end="547">remembering the whole truth</strong>, not just the advert.</p>
<h3 data-start="613" data-end="643">Making it graft for you</h3>
<p data-start="613" data-end="643">Urges lie by editing the film.</p>
<p data-start="645" data-end="661">They zoom in on:</p>
<ul data-start="662" data-end="731">
<li data-start="662" data-end="688">
<p data-start="664" data-end="688">“This will calm me down”</p>
</li>
<li data-start="689" data-end="712">
<p data-start="691" data-end="712">“Just one won’t hurt”</p>
</li>
<li data-start="713" data-end="731">
<p data-start="715" data-end="731">“I deserve this”</p>
</li>
</ul>
<p data-start="733" data-end="772">Playing the tape forward is you saying:</p>
<blockquote data-start="773" data-end="797">
<p data-start="775" data-end="797">“Okay… and then what?”</p>
</blockquote>
<p data-start="799" data-end="825">You mentally fast-forward:</p>
<ul data-start="826" data-end="899">
<li data-start="826" data-end="838">
<p data-start="828" data-end="838">10 minutes</p>
</li>
<li data-start="839" data-end="848">
<p data-start="841" data-end="848">2 hours</p>
</li>
<li data-start="849" data-end="867">
<p data-start="851" data-end="867">tomorrow morning</p>
</li>
<li data-start="868" data-end="899">
<p data-start="870" data-end="899">next week if this keeps going</p>
</li>
</ul>
<p data-start="901" data-end="964">You already know the ending.<br data-start="929" data-end="932" />You’ve watched this film before.</p>
<h3 data-start="901" data-end="964">Grab control and play the unedited version</h3>
<p data-start="1010" data-end="1046">When you play the tape forward, ask:</p>
<p data-start="1048" data-end="1070"><strong data-start="1052" data-end="1070">1. Right after</strong></p>
<ul data-start="1071" data-end="1175">
<li data-start="1071" data-end="1097">
<p data-start="1073" data-end="1097">Do I really stop at one?</p>
</li>
<li data-start="1098" data-end="1134">
<p data-start="1100" data-end="1134">How do I feel once the buzz drops?</p>
</li>
<li data-start="1135" data-end="1175">
<p data-start="1137" data-end="1175">Am I calmer — or already chasing more?</p>
</li>
</ul>
<p data-start="1177" data-end="1208"><strong data-start="1181" data-end="1208">2. Later that day/night</strong></p>
<ul data-start="1209" data-end="1316">
<li data-start="1209" data-end="1248">
<p data-start="1211" data-end="1248">Am I lying, hiding, cancelling plans?</p>
</li>
<li data-start="1249" data-end="1287">
<p data-start="1251" data-end="1287">Am I broke, angry, numb, or anxious?</p>
</li>
<li data-start="1288" data-end="1316">
<p data-start="1290" data-end="1316">Am I proud of this choice?</p>
</li>
</ul>
<p data-start="1318" data-end="1341"><strong data-start="1322" data-end="1341">3. The next day</strong></p>
<ul data-start="1342" data-end="1437">
<li data-start="1342" data-end="1361">
<p data-start="1344" data-end="1361">How do I wake up?</p>
</li>
<li data-start="1362" data-end="1384">
<p data-start="1364" data-end="1384">What’s my mood like?</p>
</li>
<li data-start="1385" data-end="1437">
<p data-start="1387" data-end="1437">Am I dealing with guilt, shame, or damage control?</p>
</li>
</ul>
<p data-start="1439" data-end="1470"><strong data-start="1443" data-end="1470">4. If I keep doing this</strong></p>
<ul data-start="1471" data-end="1547">
<li data-start="1471" data-end="1503">
<p data-start="1473" data-end="1503">Where does this actually lead?</p>
</li>
<li data-start="1504" data-end="1532">
<p data-start="1506" data-end="1532">Same problems? Worse ones?</p>
</li>
<li data-start="1533" data-end="1547">
<p data-start="1535" data-end="1547">Still stuck?</p>
</li>
</ul>
<p data-start="1549" data-end="1570">No drama. Just facts.</p>
<h3 data-start="1577" data-end="1598"><strong data-start="1580" data-end="1598">Why it&#8217;s got your back</strong></h3>
<p data-start="1600" data-end="1650">Because <strong data-start="1608" data-end="1649">the urge only sells the opening scene</strong>.</p>
<p data-start="1652" data-end="1677">Playing the tape forward:</p>
<ul data-start="1678" data-end="1775">
<li data-start="1678" data-end="1696">
<p data-start="1680" data-end="1696">breaks the spell</p>
</li>
<li data-start="1697" data-end="1720">
<p data-start="1699" data-end="1720">slows the moment down</p>
</li>
<li data-start="1721" data-end="1775">
<p data-start="1723" data-end="1775">reminds you why you wanted change in the first place</p>
</li>
</ul>
<p data-start="1777" data-end="1786">It turns:</p>
<blockquote data-start="1787" data-end="1812">
<p data-start="1789" data-end="1812">“I need this right now”</p>
</blockquote>
<p data-start="1814" data-end="1819">into:</p>
<blockquote data-start="1820" data-end="1879">
<p data-start="1822" data-end="1879">“I know how this ends… and I’m not that into the ending.”</p>
</blockquote>
<h3 data-start="1886" data-end="1921"><strong data-start="1889" data-end="1921">The street-level truth</strong></h3>
<p data-start="1922" data-end="1961">This tool doesn’t make urges and cravings disappear.</p>
<p data-start="1963" data-end="1999">It helps you <strong data-start="1981" data-end="1998">outsmart them</strong>.</p>
<p data-start="2095" data-end="2113">
`,isAcronym:!1,letters:null,scenariosField:null,videosField:null,podcastsField:null}},{id:"cG9zdDoxMTY=",databaseId:116,title:"R.A.I.N.",toolFieldGroup:{description:`<div>The R.A.I.N. mindfulness tool is a chilled superpower, a no-frills way to handle tough emotions, urges, or stress bombs without letting them take over—especially in recovery when cravings or old patterns try to creep back in.</div>
<div>
<p dir="auto">It&#8217;s like a mental reset button, drawn from mindfulness and created by Tara Brach. It turns &#8220;I can’t handle this feeling&#8221; into &#8220;I can be with this feeling until it passes.. &#8220;</p>
<p dir="auto">Use it to pause, process, and move through the mess so you don&#8217;t react on autopilot or slip up. Think of it as your inner coach helping you ride the wave instead of getting drowned by it.</p>
</div>
`,isAcronym:!0,letters:[{letter:"R",meaning:"Recognize",definition:`<div>Spot what&#8217;s up right now. Name what’s happening without any BS: Like &#8220;This is anxiety,&#8221; &#8220;This is shame&#8221;, &#8220;This is a craving.&#8221;, &#8220;I&#8217;m feeling pissed off&#8221; or &#8220;This craving&#8217;s hitting me hard.&#8221;</div>
<div>
<p dir="auto">Just acknowledge it, don&#8217;t judge, just notice so it doesn&#8217;t blindside you.</p>
</div>
<p dir="auto">The point? R.A.I.N. helps you surf through heavy feels or triggers in recovery without crashing—turns reactivity into smart responses, reducing relapse risks and building resilience.</p>
<p dir="auto">Practice it daily on small stuff so it&#8217;s ready when big waves hit. Pair it with tools like TIPP for the body or DEADS for urges. If it&#8217;s overwhelming, link up with a therapist or group for extra backup.</p>
<p dir="auto">Keep breathing easy, &#8211; you&#8217;re built tough.</p>
`},{letter:"A",meaning:"Allow",definition:`<div>Let it be there without fighting or feeding it. It’s already here.</div>
<div></div>
<div>Tell yourself, &#8220;This isn&#8217;t great, but it&#8217;s cool—it&#8217;s just a thing passing through.&#8221;</div>
<div></div>
<div>Don&#8217;t try to shove it down or fix it quick; giving it space stops it from building up like pressure in a bottle.</div>
`},{letter:"I",meaning:"Investigate",definition:`<p dir="auto">Dig a little, and get curious.</p>
<p dir="auto">Ask yourself, &#8220;Where&#8217;s this coming from? What&#8217;s it doing to my body—tight chest, racing thoughts?&#8221;</p>
<p dir="auto">Or, &#8220;What&#8217;s the story my brain&#8217;s spinning?&#8221;</p>
<p dir="auto">Keep it light, like scanning the car park to see where you parked without getting stuck in the loop.</p>
`},{letter:"N",meaning:"Nurture",definition:`<div></div>
<div>Show yourself some real kindness —like you would a good friend or a scared kid.</div>
<div></div>
<div>Talk to yourself like you&#8217;d would your best friend when they need it: &#8220;You got this, it&#8217;s rough but you&#8217;re handling it.&#8221; Or do a quick self-care move—deep breath, stretch, and remind yourself of your wins.</div>
<div></div>
<div>It&#8217;s about building that inner strength so the emotion don&#8217;t own you.</div>
`}],scenariosField:{nodes:[{id:"cG9zdDox"}]},videosField:{nodes:[{id:"cG9zdDoxMzg="},{id:"cG9zdDoxMzk="},{id:"cG9zdDoxNDA="},{id:"cG9zdDoxNDE="},{id:"cG9zdDoxNDI="},{id:"cG9zdDoxNDM="}]},podcastsField:null}},{id:"cG9zdDoxMTc=",databaseId:117,title:"R.A.V.E.",toolFieldGroup:{description:`<div>
<div>Your long-term success strategy &#8211; staying strong and aware without making recovery feel like a prison.</div>
</div>
`,isAcronym:!0,letters:[{letter:"R",meaning:"Recovery",definition:`<div>
<div>Remember this is an ongoing journey, not a destination you arrive at and forget about.</div>
</div>
`},{letter:"A",meaning:"Awareness",definition:`<div>
<div>Stay tuned into your thoughts, feelings, and triggers &#8211; don&#8217;t go on autopilot.</div>
</div>
`},{letter:"V",meaning:"Vigilance",definition:`<div>
<div>Keep your eyes open for warning signs without becoming paranoid about them.</div>
</div>
`},{letter:"E",meaning:"Empowerment",definition:`<div>
<div>Trust yourself to handle whatever comes up &#8211; you&#8217;ve got the tools and the strength. You can do this.</div>
</div>
`}],scenariosField:{nodes:[{id:"cG9zdDox"}]},videosField:null,podcastsField:null}},{id:"cG9zdDozMzc=",databaseId:337,title:"Rewind the Tape",toolFieldGroup:{description:`<p><strong>Rewind the Tape</strong> is about <strong>remembering the mess that made you say “I’m done with this”</strong></p>
<p>When an urge hits, your gremlins grab the wheel and your brain starts chatting rubbish:</p>
<ul>
<li>“It wasn’t that bad”</li>
<li>“There were good times”</li>
<li>“I could control it now”</li>
</ul>
<p>Rewinding the tape is you grabbing back the wheel and saying:</p>
<blockquote>
<p><strong>“Hold up there forgetful — let’s go back to the bit where this all went sideways. The bits you were swerving when recalling all of this.”</strong></p>
</blockquote>
<p>It&#8217;s not the good nights.</p>
<p>It&#8217;s the <strong>long nights, the chaos, the drama, the thought spirals, the stress, the shame, the hate, the financials up the wall, the ‘how the F**k did I end up here?’ times</strong>. This is the master tape, the one you own and the only true one to rewind. Don&#8217;t be blindsided by the clips from the dodgy shoddy copy your gremlins want to sell you. It&#8217;s just a bad edit with all the lows cut out.</p>
<hr />
<h3><strong>Why this tool can be one of the sharpest in the box</strong></h3>
<p>Urges are liars. Smooth ones. Like those salesmen with all the patter but when see what they&#8217;ve got it doesn&#8217;t live up to their hype.</p>
<p>They only talk about:</p>
<ul>
<li>the buzz</li>
<li>the escape</li>
<li>the quick fix</li>
</ul>
<p>They forget to talk about the edits they made :</p>
<ul>
<li>the fallouts</li>
<li>the lies</li>
<li>the drama</li>
<li>the mornings filled with hatred and guilt</li>
<li>empty bank accounts</li>
<li>the &#8220;i can&#8217;t do this anymore&#8221; thoughts</li>
</ul>
<p><strong>Rewind the Tape</strong> drags that truth back into the room and shines a light on all of it so you can see every nook and cranny.</p>
<hr />
<h3><strong>How to actually rewind (real-world version)</strong></h3>
<h3><strong>1. Go back to the breaking point</strong></h3>
<p>Think of:</p>
<ul>
<li>the day you scared yourself</li>
<li>the moment you knew you were losing control</li>
<li>the time you thought “I can’t keep living like this”</li>
</ul>
<p>That wasn’t random.<br />
That was the truth breaking through.</p>
<h3><strong>2. Remember the grind</strong></h3>
<p>Ask yourself:</p>
<ul>
<li>How wrecked was I?</li>
<li>How broken was I?</li>
<li>What lies was I telling?</li>
<li>How anxious or angry was I all the time?</li>
<li>How many people had I pissed off?</li>
<li>Where was that behaviour actually leading me?</li>
</ul>
<p>No sugar-coating. No glossing over the cracks.</p>
<p>If it was messy, call it messy. That&#8217;s the point.</p>
<p>Bank those memories.</p>
<p>Not at the front of your mind but somewhere out of sight, somewhere they won&#8217;t get lost and you can pull them out for a boss move.</p>
<p>Although they&#8217;re not pretty and are a bit tatty from your gremlins handling them.</p>
<p><u>They are the tool</u>. and one that packs some weight.</p>
<p>Remembering what happened when you lost control of the wheel and where you went because you weren&#8217;t in the driving seat should be the reminder why you won&#8217;t be fooled when your mind gets sneaky and tells you BS.</p>
<p>Practice using rewind the tape when then heats not on and you&#8217;ll be able to use it to level up and keep control.</p>
<p>If those thoughts are pushing you about a bit too much, hit up a therapist, a key worker or open up about them in a group.</p>
<h3><strong>3. Remember the promises</strong></h3>
<p>The times you’ve tried to grab back the wheel and tell yourself:</p>
<ul>
<li>“This is the last time”</li>
<li>“I’ll sort it tomorrow”</li>
<li>“I’ve got it under control”</li>
<li>&#8220;I&#8217;m not doing this again&#8221;</li>
</ul>
<p>And then… you didn’t. Your mind has sold you some BS and it all ended up going south. Not because you’re weak — because <strong>your mind doesn’t play fair</strong>.</p>
<h3><strong>4. Look at where your at with life now</strong></h3>
<p>Do a full life-scan and think about your life today and where it&#8217;s headed. Ask:</p>
<ul>
<li>How much better is life?</li>
<li>How much more happiness are you and your circle banking?</li>
<li>How much less drama and chaos bubbles up around you?</li>
<li>How much more trust do you and your crew have in you?</li>
<li>People stopped make a swerve when they see you on the street.</li>
<li>What opportunities and options to make a better life do you have now?</li>
<li>Am I making progress towards the things I value?</li>
</ul>
<p>Life might still be grinding you, it often is but putting in the graft pays off, especially when it&#8217;s on yourself.</p>
<p>Leave the chaos and drama behind, keep focused of the new you, don&#8217;t forget the grimey times and keep alert for when your mind spins you some BS.</p>
<h3><strong>What this tool is NOT</strong></h3>
<ul>
<li>It&#8217; Not self-hate</li>
<li>It&#8217;s Not punishment</li>
<li>It&#8217;s Not living in the past</li>
</ul>
<p>It’s about keeping it real, not forgetting what got you here and <strong>remembering the truth so you don’t walk back into it</strong>.</p>
<p>There are things in life we can not change &#8211; as grimey as it is, accept that, get the engine running and move on. No going 10 rounds with yourself in the ring. That&#8217;s the past, you&#8217;re focused on the future.</p>
<h3><strong>How to tell it to yourself short and sweet?</strong></h3>
<p>When the urge kicks in and your mind tries to pull a fast one with: “You used to have a right laugh, one won’t hurt”</p>
<p>Dig into your tool and pull out &#8220;Rewind the Tape&#8221; and tell yourself :</p>
<p><strong>“Nah, Not for me. I&#8217;ve seen the full version of this one, not just the highlights. I know this story well and where ‘one’ always ends. </strong></p>
<p><strong>I&#8217;ll give it a swerve.</strong></p>
<p><strong>I&#8217;m busy rewriting the ending”</strong></p>
`,isAcronym:!1,letters:null,scenariosField:null,videosField:null,podcastsField:null}},{id:"cG9zdDoxMTk=",databaseId:119,title:"S.M.A.R.T.",toolFieldGroup:{description:`<div>The SMART tool in recovery is the gold standard for setting goals that you&#8217;ll actually achieve —none of that vague &#8220;I&#8217;ll do better&#8221; BS. It&#8217;s a no-nonsense way to map out your wins, whether you&#8217;re kicking addictions, refocusing your relationships with substances, or just getting through daily life in sobriety.</div>
<div>
<p dir="auto">Pulled from SMART Recovery, it&#8217;s science-backed to keep you focused and motivated. Think of it as your GPS for progress: Specific, Measurable, Achievable, Relevant, Time-bound.</p>
</div>
<p dir="auto">SMART turns wishy-washy ideas into actionable plans that boost your confidence and keeps relapse at bay. Write them down, review weekly, and tweak as needed—pair it with tools like DEADS for urges or H.O.V. for motivation. Break down the fluff so you can track real moves and celebrate them.</p>
<p dir="auto">If goals feel overwhelming, chat with a therapist or hit a SMART meeting for extra edge. Stay at it; small steps stack up big.</p>
`,isAcronym:!0,letters:[{letter:"S",meaning:"Specific",definition:`<div>Get crystal clear about what you want.</div>
<div></div>
<div>Don&#8217;t say &#8220;I want to be healthier&#8221;—nail it down like a boss: &#8220;I&#8217;m hitting the gym three times a week for weights and cardio.&#8221;</div>
<div></div>
<div>The clearer the target, the less room for excuses or getting lost in the sauce.</div>
`},{letter:"M",meaning:"Measurable",definition:`<p dir="auto">Make it countable so you know when you&#8217;re crushing it.</p>
<p dir="auto">Track the numbers: &#8220;I&#8217;ll log 10,000 steps a day&#8221; or &#8220;No drinks for 30 days straight.&#8221; It&#8217;s like keeping score in a game —  lets you see the progress and adjust if you&#8217;re off.</p>
`},{letter:"A",meaning:"Achievable",definition:`<div></div>
<div>Keep it real, not some pipe dream. Set yourself up to succeed, not fail &#8211; ambitious is good, impossible is a right let down.</div>
<div>
<p dir="auto">Ask yourself, &#8220;Can I actually pull this off with what I&#8217;ve got?&#8221;, &#8220;What else do I need to smash this and is that easy to get&#8221;. Give the big barriers a swerve and keep it simple.</p>
<p dir="auto">Start small if you&#8217;re fresh in recovery, like &#8220;Call my sponsor twice a week&#8221; instead of overhauling your whole life overnight.</p>
<p dir="auto">Builds wins, big and small, without setting you up to flop.</p>
</div>
`},{letter:"R",meaning:"Relevant",definition:`<div></div>
<div>
<p dir="auto">Tie it to your big picture. Does this goal fit with your values and recovery? If health is top on your H.O.V., then eating clean fits; if it&#8217;s about family, maybe &#8220;Spend quality time with the kids as much as you can.&#8221;</p>
<p dir="auto">Make sure this goal actually matters to your life and recovery &#8211; not just what sounds impressive.</p>
<p dir="auto">Keep yourself locked on what matters, no side quests.</p>
</div>
`},{letter:"T",meaning:"Time-bound",definition:`<p dir="auto">Set a deadline to light a fire under it.</p>
<p dir="auto">&#8220;By the end of the month, I&#8217;ll have my resume updated and three job applications sent.&#8221; Gives you a finish line so it don&#8217;t drag on forever and lose steam.</p>
<p dir="auto">Without a realistic deadline it could become like walking through treacle.</p>
`}],scenariosField:{nodes:[{id:"cG9zdDox"}]},videosField:{nodes:[{id:"cG9zdDoxMzU="},{id:"cG9zdDoxMzY="},{id:"cG9zdDoxMzc="}]},podcastsField:null}},{id:"cG9zdDoxMjA=",databaseId:120,title:"S.T.O.P.",toolFieldGroup:{description:`<div>
<div>The ultimate 10-second emergency brake.</div>
</div>
<div>
<p dir="auto">The STOP skill is a clutch move pulled from recovery toolkits like SMART (it vibes heavy with DBT too)—it&#8217;s all about hitting pause when emotions or urges are cranking up and you&#8217;re about to make a move that you&#8217;ll regret later.</p>
<p dir="auto">Think of it as your mental stop sign to avoid crashing into bad decisions. Use it when stress, cravings, or anger&#8217;s got you heated, or you&#8217;re “about to text your ex.”. It gives you space to respond like a boss instead of reacting on impulse.</p>
<p dir="auto">It keeps small slips from turning into big falls by buying you time to level up. Practice it daily on low-stakes stuff so it&#8217;s locked in when the real heat comes. If cravings or feels are nonstop, tap into SMART meetings, a therapist, or your support crew. Keep it locked, you got this.</p>
</div>
`,isAcronym:!0,letters:[{letter:"S",meaning:"Stop",definition:`<p dir="auto">Freeze right there. Whatever you&#8217;re doing or thinking, hit the pause button, hard. Don&#8217;t move, don&#8217;t speak, just halt the action before you spiral or give in to that urge. It&#8217;s like yelling &#8220;Whoa&#8221; to yourself to break the momentum.</p>
`},{letter:"T",meaning:"Take a breath",definition:`<div>Pull away for a sec. Take a deep breath (or three), step out of the room, or just mentally zoom out. This creates space from the drama, letting your brain cool off so you aren&#8217;t acting off raw emotion.</div>
`},{letter:"O",meaning:"Observe",definition:`<p dir="auto">Scope the scene like a detective. What&#8217;s going on in your body—heart racing, fists clenched? What&#8217;s in your head—thoughts like &#8220;Screw it, I need this&#8221;? And around you—who&#8217;s there, what&#8217;s triggering this? No judging, just straight facts to get the full picture, swerve the BS &#8211; that just distracting not helping.</p>
`},{letter:"P",meaning:"Proceed",definition:`<div>
<div>Now choose your next move mindfully.</div>
<div>
<p dir="auto">Move forward smart. Ask yourself, &#8220;What&#8217;s the path that lines up with my goals?&#8221; Choose the next step that won&#8217;t screw up your recovery or life—maybe call a buddy, use another tool like DEADS, or just take some time for yourself. It&#8217;s about acting with intention, not letting the moment own you. Own it because you&#8217;ve got this.</p>
</div>
</div>
`}],scenariosField:{nodes:[{id:"cG9zdDox"}]},videosField:{nodes:[{id:"cG9zdDoxMzQ="},{id:"cG9zdDoxODY="}]},podcastsField:null}},{id:"cG9zdDoxMjI=",databaseId:122,title:"T.I.P.P.",toolFieldGroup:{description:`<p dir="auto">The TIPP skill from DBT (Dialectical Behavior Therapy) is a quick-hit tactic for when your emotions are spiking hard and you need to dial them down fast—think panic, rage, or that overwhelming emotion that&#8217;s got you ready to snap.</p>
<p dir="auto">It&#8217;s all about hacking your body&#8217;s stress response with simple moves to chill the nervous system and get back in control. No mystical or higher power vibes here—just science-backed ways to reset your vibe when distress is hitting peak levels.</p>
<p dir="auto">Use it in the moment, like an emergency brake, to avoid making rash moves.</p>
`,isAcronym:!0,letters:[{letter:"T",meaning:"Temperature",definition:`<div>Switch up your body&#8217;s temperature quickly to shock the system and snap out of the spiral.</div>
<div>
<p dir="auto">Make sure the water is super cold then splash it on your face, hold ice cubes in your hands, or jump into a cold shower for 30 seconds (eyes closed, hold your breath). It triggers that dive reflex, slowing your heart rate and calming the chaos quick.</p>
</div>
`},{letter:"I",meaning:"Intense exercise",definition:`<div></div>
<div>Get moving hard to burn off that adrenaline.</div>
<div>
<p dir="auto">We&#8217;re talking 30–60 seconds all-out of push-ups, jumping jacks, burpees, a quick sprint around the block, or on the spot —whatever gets your blood pumping. It dumps the stress hormones and leaves you feeling more leveled up.</p>
</div>
`},{letter:"P",meaning:"Paced breathing",definition:`<div>Slow your breaths down on purpose. Try 4-7-8 style: Inhale for 4 counts, hold for 7, exhale for 8. If those numbers don&#8217;t work for you make sure your exhale is longer than the inhale.</div>
<div>
<p dir="auto">Or try deep belly breaths at your own rhythm. Sit or stand up right, shoulders back and breath right into your belly. Focus on the air flowing in and out—it&#8217;s like hitting the chill button on your lungs, reducin&#8217; that fight-or-flight BS.</p>
</div>
`}],scenariosField:{nodes:[{id:"cG9zdDox"}]},videosField:{nodes:[{id:"cG9zdDoxMzA="},{id:"cG9zdDoxMzE="}]},podcastsField:null}},{id:"cG9zdDoxMjM=",databaseId:123,title:"The Six Ps",toolFieldGroup:{description:`<p dir="auto">These Six P&#8217;s are your reminder that winning in recovery starts with being intentional AF. Don&#8217;t wait for life to hit you—hit it first.</p>
<p dir="auto">Jot this down, review it weekly, and pair it with other tools like DEADS or H.O.V. for max impact. If things feel shaky, link up with a pro or support group. You&#8217;re built for this; keep pushing to hit your goals.</p>
`,isAcronym:!0,letters:[{letter:"P",meaning:"Proper",definition:`<div>
<div>Doing things the right way, not cutting corners. It’s about being honest with yourself and making sure what you&#8217;re doing is sensible and realistic. Don&#8217;t overstretch yourself &#8211; the SMART tool can help you with that so check it.</p>
<p dir="auto">In recovery, that could be getting honest with yourself about your triggers, weaknesses, and strengths. Set clear, realistic goals like &#8220;I&#8217;m hitting meetings three times a week&#8221; instead of vague BS.</p>
<p dir="auto">Proper sets the tone so your whole plan don&#8217;t crumble.</p>
</div>
</div>
`},{letter:"P",meaning:"Preparation",definition:`<div>
<div>Getting your game play ready in advance.</p>
<p dir="auto">Stock your toolkit ahead of time: meds if needed, emergency contacts, healthy snacks, apps for tracking moods, or even a sober buddy you can call. Prep for the what-ifs—role-play scenarios in your head or with a therapist so when cravings hit, you&#8217;re not scrambling for answers.</p>
</div>
</div>
`},{letter:"P",meaning:"Planning",definition:`<p dir="auto">Once your prepped, map it out step by step. Write it down: routines, schedules, what you need to get sh*t done, who&#8217;s going to be there, who&#8217;s got your back, who to swerve and what are your backup options.</p>
<p dir="auto">In recovery, plan your days to dodge high-risk spots or times—like swerving the commute past bars or pubs to take the long way round or by scheduling a gym sesh instead. Use tools like calendars or apps to plot meals, sleep, work, and fun that keeps you leveled up.</p>
`},{letter:"P",meaning:"Prevents",definition:`<p dir="auto">This is the payoff—the whole point is stopping trouble before it starts. By nailing the first three P&#8217;s, you&#8217;re blocking slips, relapses, or those bad decisions you&#8217;ve made in the past.</p>
<p dir="auto">It&#8217;s proactive defense: spot patterns early, like stress leading to using, and cut them off with your plan. Practice the Ps and it&#8217;ll become second nature to you.</p>
`},{letter:"P",meaning:"Poor",definition:`<p dir="auto">No half-arsed efforts here. Nope, and it&#8217;s non-negotiable. We&#8217;re talking avoiding the weak, messy outcomes. This means dodging the lows like isolation, health crashes, or losing your progress. Without the quality upfront work, you&#8217;re setting yourself up for potential failure — feeling stuck, guilty, or back at square one. Scrap that, put the effort in and keep smashing it.</p>
`},{letter:"P",meaning:"Performance",definition:`<p dir="auto">Level up your game. When you do, your &#8220;performance&#8221; in life shines: better relationships, getting sh*t done, feeling strong and in control. Plus you start to feel amazing.</p>
<p dir="auto">Recovery isn&#8217;t just surviving—it&#8217;s thriving, and solid P&#8217;s get you there without the drama.</p>
`}],scenariosField:{nodes:[{id:"cG9zdDox"}]},videosField:null,podcastsField:null}}]}},nt=({onClick:e,classes:i="",width:t=30,thickness:r=3})=>C.jsx("button",{className:"close-btn"+(i?" "+i:""),onClick:e,children:C.jsx("div",{className:"close-btn-wrap",children:C.jsxs("div",{className:"close-btn-inner",children:[C.jsx("div",{className:"line"}),C.jsx("div",{className:"line"})]})})});nt.propTypes={classes:_.string,onClick:_.func,width:_.number,thickness:_.number};var q={},H={},Q={},L={},G={},te={},de;function Pe(){return de||(de=1,(function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.Doctype=e.CDATA=e.Tag=e.Style=e.Script=e.Comment=e.Directive=e.Text=e.Root=e.isTag=e.ElementType=void 0;var i;(function(r){r.Root="root",r.Text="text",r.Directive="directive",r.Comment="comment",r.Script="script",r.Style="style",r.Tag="tag",r.CDATA="cdata",r.Doctype="doctype"})(i=e.ElementType||(e.ElementType={}));function t(r){return r.type===i.Tag||r.type===i.Script||r.type===i.Style}e.isTag=t,e.Root=i.Root,e.Text=i.Text,e.Directive=i.Directive,e.Comment=i.Comment,e.Script=i.Script,e.Style=i.Style,e.Tag=i.Tag,e.CDATA=i.CDATA,e.Doctype=i.Doctype})(te)),te}var k={},ue;function ce(){if(ue)return k;ue=1;var e=k&&k.__extends||(function(){var n=function(s,p){return n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(v,I){v.__proto__=I}||function(v,I){for(var x in I)Object.prototype.hasOwnProperty.call(I,x)&&(v[x]=I[x])},n(s,p)};return function(s,p){if(typeof p!="function"&&p!==null)throw new TypeError("Class extends value "+String(p)+" is not a constructor or null");n(s,p);function v(){this.constructor=s}s.prototype=p===null?Object.create(p):(v.prototype=p.prototype,new v)}})(),i=k&&k.__assign||function(){return i=Object.assign||function(n){for(var s,p=1,v=arguments.length;p<v;p++){s=arguments[p];for(var I in s)Object.prototype.hasOwnProperty.call(s,I)&&(n[I]=s[I])}return n},i.apply(this,arguments)};Object.defineProperty(k,"__esModule",{value:!0}),k.cloneNode=k.hasChildren=k.isDocument=k.isDirective=k.isComment=k.isText=k.isCDATA=k.isTag=k.Element=k.Document=k.CDATA=k.NodeWithChildren=k.ProcessingInstruction=k.Comment=k.Text=k.DataNode=k.Node=void 0;var t=Pe(),r=(function(){function n(){this.parent=null,this.prev=null,this.next=null,this.startIndex=null,this.endIndex=null}return Object.defineProperty(n.prototype,"parentNode",{get:function(){return this.parent},set:function(s){this.parent=s},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"previousSibling",{get:function(){return this.prev},set:function(s){this.prev=s},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"nextSibling",{get:function(){return this.next},set:function(s){this.next=s},enumerable:!1,configurable:!0}),n.prototype.cloneNode=function(s){return s===void 0&&(s=!1),D(this,s)},n})();k.Node=r;var c=(function(n){e(s,n);function s(p){var v=n.call(this)||this;return v.data=p,v}return Object.defineProperty(s.prototype,"nodeValue",{get:function(){return this.data},set:function(p){this.data=p},enumerable:!1,configurable:!0}),s})(r);k.DataNode=c;var u=(function(n){e(s,n);function s(){var p=n!==null&&n.apply(this,arguments)||this;return p.type=t.ElementType.Text,p}return Object.defineProperty(s.prototype,"nodeType",{get:function(){return 3},enumerable:!1,configurable:!0}),s})(c);k.Text=u;var m=(function(n){e(s,n);function s(){var p=n!==null&&n.apply(this,arguments)||this;return p.type=t.ElementType.Comment,p}return Object.defineProperty(s.prototype,"nodeType",{get:function(){return 8},enumerable:!1,configurable:!0}),s})(c);k.Comment=m;var d=(function(n){e(s,n);function s(p,v){var I=n.call(this,v)||this;return I.name=p,I.type=t.ElementType.Directive,I}return Object.defineProperty(s.prototype,"nodeType",{get:function(){return 1},enumerable:!1,configurable:!0}),s})(c);k.ProcessingInstruction=d;var o=(function(n){e(s,n);function s(p){var v=n.call(this)||this;return v.children=p,v}return Object.defineProperty(s.prototype,"firstChild",{get:function(){var p;return(p=this.children[0])!==null&&p!==void 0?p:null},enumerable:!1,configurable:!0}),Object.defineProperty(s.prototype,"lastChild",{get:function(){return this.children.length>0?this.children[this.children.length-1]:null},enumerable:!1,configurable:!0}),Object.defineProperty(s.prototype,"childNodes",{get:function(){return this.children},set:function(p){this.children=p},enumerable:!1,configurable:!0}),s})(r);k.NodeWithChildren=o;var a=(function(n){e(s,n);function s(){var p=n!==null&&n.apply(this,arguments)||this;return p.type=t.ElementType.CDATA,p}return Object.defineProperty(s.prototype,"nodeType",{get:function(){return 4},enumerable:!1,configurable:!0}),s})(o);k.CDATA=a;var l=(function(n){e(s,n);function s(){var p=n!==null&&n.apply(this,arguments)||this;return p.type=t.ElementType.Root,p}return Object.defineProperty(s.prototype,"nodeType",{get:function(){return 9},enumerable:!1,configurable:!0}),s})(o);k.Document=l;var g=(function(n){e(s,n);function s(p,v,I,x){I===void 0&&(I=[]),x===void 0&&(x=p==="script"?t.ElementType.Script:p==="style"?t.ElementType.Style:t.ElementType.Tag);var O=n.call(this,I)||this;return O.name=p,O.attribs=v,O.type=x,O}return Object.defineProperty(s.prototype,"nodeType",{get:function(){return 1},enumerable:!1,configurable:!0}),Object.defineProperty(s.prototype,"tagName",{get:function(){return this.name},set:function(p){this.name=p},enumerable:!1,configurable:!0}),Object.defineProperty(s.prototype,"attributes",{get:function(){var p=this;return Object.keys(this.attribs).map(function(v){var I,x;return{name:v,value:p.attribs[v],namespace:(I=p["x-attribsNamespace"])===null||I===void 0?void 0:I[v],prefix:(x=p["x-attribsPrefix"])===null||x===void 0?void 0:x[v]}})},enumerable:!1,configurable:!0}),s})(o);k.Element=g;function f(n){return(0,t.isTag)(n)}k.isTag=f;function b(n){return n.type===t.ElementType.CDATA}k.isCDATA=b;function T(n){return n.type===t.ElementType.Text}k.isText=T;function S(n){return n.type===t.ElementType.Comment}k.isComment=S;function h(n){return n.type===t.ElementType.Directive}k.isDirective=h;function y(n){return n.type===t.ElementType.Root}k.isDocument=y;function w(n){return Object.prototype.hasOwnProperty.call(n,"children")}k.hasChildren=w;function D(n,s){s===void 0&&(s=!1);var p;if(T(n))p=new u(n.data);else if(S(n))p=new m(n.data);else if(f(n)){var v=s?A(n.children):[],I=new g(n.name,i({},n.attribs),v);v.forEach(function($){return $.parent=I}),n.namespace!=null&&(I.namespace=n.namespace),n["x-attribsNamespace"]&&(I["x-attribsNamespace"]=i({},n["x-attribsNamespace"])),n["x-attribsPrefix"]&&(I["x-attribsPrefix"]=i({},n["x-attribsPrefix"])),p=I}else if(b(n)){var v=s?A(n.children):[],x=new a(v);v.forEach(function(R){return R.parent=x}),p=x}else if(y(n)){var v=s?A(n.children):[],O=new l(v);v.forEach(function(R){return R.parent=O}),n["x-mode"]&&(O["x-mode"]=n["x-mode"]),p=O}else if(h(n)){var j=new d(n.name,n.data);n["x-name"]!=null&&(j["x-name"]=n["x-name"],j["x-publicId"]=n["x-publicId"],j["x-systemId"]=n["x-systemId"]),p=j}else throw new Error("Not implemented yet: ".concat(n.type));return p.startIndex=n.startIndex,p.endIndex=n.endIndex,n.sourceCodeLocation!=null&&(p.sourceCodeLocation=n.sourceCodeLocation),p}k.cloneNode=D;function A(n){for(var s=n.map(function(v){return D(v,!0)}),p=1;p<s.length;p++)s[p].prev=s[p-1],s[p-1].next=s[p];return s}return k}var he;function _e(){return he||(he=1,(function(e){var i=G&&G.__createBinding||(Object.create?(function(d,o,a,l){l===void 0&&(l=a);var g=Object.getOwnPropertyDescriptor(o,a);(!g||("get"in g?!o.__esModule:g.writable||g.configurable))&&(g={enumerable:!0,get:function(){return o[a]}}),Object.defineProperty(d,l,g)}):(function(d,o,a,l){l===void 0&&(l=a),d[l]=o[a]})),t=G&&G.__exportStar||function(d,o){for(var a in d)a!=="default"&&!Object.prototype.hasOwnProperty.call(o,a)&&i(o,d,a)};Object.defineProperty(e,"__esModule",{value:!0}),e.DomHandler=void 0;var r=Pe(),c=ce();t(ce(),e);var u={withStartIndices:!1,withEndIndices:!1,xmlMode:!1},m=(function(){function d(o,a,l){this.dom=[],this.root=new c.Document(this.dom),this.done=!1,this.tagStack=[this.root],this.lastNode=null,this.parser=null,typeof a=="function"&&(l=a,a=u),typeof o=="object"&&(a=o,o=void 0),this.callback=o??null,this.options=a??u,this.elementCB=l??null}return d.prototype.onparserinit=function(o){this.parser=o},d.prototype.onreset=function(){this.dom=[],this.root=new c.Document(this.dom),this.done=!1,this.tagStack=[this.root],this.lastNode=null,this.parser=null},d.prototype.onend=function(){this.done||(this.done=!0,this.parser=null,this.handleCallback(null))},d.prototype.onerror=function(o){this.handleCallback(o)},d.prototype.onclosetag=function(){this.lastNode=null;var o=this.tagStack.pop();this.options.withEndIndices&&(o.endIndex=this.parser.endIndex),this.elementCB&&this.elementCB(o)},d.prototype.onopentag=function(o,a){var l=this.options.xmlMode?r.ElementType.Tag:void 0,g=new c.Element(o,a,void 0,l);this.addNode(g),this.tagStack.push(g)},d.prototype.ontext=function(o){var a=this.lastNode;if(a&&a.type===r.ElementType.Text)a.data+=o,this.options.withEndIndices&&(a.endIndex=this.parser.endIndex);else{var l=new c.Text(o);this.addNode(l),this.lastNode=l}},d.prototype.oncomment=function(o){if(this.lastNode&&this.lastNode.type===r.ElementType.Comment){this.lastNode.data+=o;return}var a=new c.Comment(o);this.addNode(a),this.lastNode=a},d.prototype.oncommentend=function(){this.lastNode=null},d.prototype.oncdatastart=function(){var o=new c.Text(""),a=new c.CDATA([o]);this.addNode(a),o.parent=a,this.lastNode=o},d.prototype.oncdataend=function(){this.lastNode=null},d.prototype.onprocessinginstruction=function(o,a){var l=new c.ProcessingInstruction(o,a);this.addNode(l)},d.prototype.handleCallback=function(o){if(typeof this.callback=="function")this.callback(o,this.dom);else if(o)throw o},d.prototype.addNode=function(o){var a=this.tagStack[this.tagStack.length-1],l=a.children[a.children.length-1];this.options.withStartIndices&&(o.startIndex=this.parser.startIndex),this.options.withEndIndices&&(o.endIndex=this.parser.endIndex),a.children.push(o),l&&(o.prev=l,l.next=o),o.parent=a,this.lastNode=null},d})();e.DomHandler=m,e.default=m})(G)),G}var ne={},pe;function it(){return pe||(pe=1,(function(e){Object.defineProperty(e,"__esModule",{value:!0}),e.CARRIAGE_RETURN_PLACEHOLDER_REGEX=e.CARRIAGE_RETURN_PLACEHOLDER=e.CARRIAGE_RETURN_REGEX=e.CARRIAGE_RETURN=e.CASE_SENSITIVE_TAG_NAMES_MAP=e.CASE_SENSITIVE_TAG_NAMES=void 0,e.CASE_SENSITIVE_TAG_NAMES=["animateMotion","animateTransform","clipPath","feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence","foreignObject","linearGradient","radialGradient","textPath"],e.CASE_SENSITIVE_TAG_NAMES_MAP=e.CASE_SENSITIVE_TAG_NAMES.reduce(function(i,t){return i[t.toLowerCase()]=t,i},{}),e.CARRIAGE_RETURN="\r",e.CARRIAGE_RETURN_REGEX=new RegExp(e.CARRIAGE_RETURN,"g"),e.CARRIAGE_RETURN_PLACEHOLDER="__HTML_DOM_PARSER_CARRIAGE_RETURN_PLACEHOLDER_".concat(Date.now(),"__"),e.CARRIAGE_RETURN_PLACEHOLDER_REGEX=new RegExp(e.CARRIAGE_RETURN_PLACEHOLDER,"g")})(ne)),ne}var ge;function Oe(){if(ge)return L;ge=1,Object.defineProperty(L,"__esModule",{value:!0}),L.formatAttributes=r,L.escapeSpecialCharacters=u,L.revertEscapedCharacters=m,L.formatDOM=d;var e=_e(),i=it();function t(o){return i.CASE_SENSITIVE_TAG_NAMES_MAP[o]}function r(o){for(var a={},l=0,g=o.length;l<g;l++){var f=o[l];a[f.name]=f.value}return a}function c(o){o=o.toLowerCase();var a=t(o);return a||o}function u(o){return o.replace(i.CARRIAGE_RETURN_REGEX,i.CARRIAGE_RETURN_PLACEHOLDER)}function m(o){return o.replace(i.CARRIAGE_RETURN_PLACEHOLDER_REGEX,i.CARRIAGE_RETURN)}function d(o,a,l){a===void 0&&(a=null);for(var g=[],f,b=0,T=o.length;b<T;b++){var S=o[b];switch(S.nodeType){case 1:{var h=c(S.nodeName);f=new e.Element(h,r(S.attributes)),f.children=d(h==="template"?S.content.childNodes:S.childNodes,f);break}case 3:f=new e.Text(m(S.nodeValue));break;case 8:f=new e.Comment(S.nodeValue);break;default:continue}var y=g[b-1]||null;y&&(y.next=f),f.parent=a,f.prev=y,f.next=null,g.push(f)}return l&&(f=new e.ProcessingInstruction(l.substring(0,l.indexOf(" ")).toLowerCase(),l),f.next=g[0]||null,f.parent=a,g.unshift(f),g[1]&&(g[1].prev=g[0])),g}return L}var fe;function ot(){if(fe)return Q;fe=1,Object.defineProperty(Q,"__esModule",{value:!0}),Q.default=S;var e=Oe(),i="html",t="head",r="body",c=/<([a-zA-Z]+[0-9]?)/,u=/<head[^]*>/i,m=/<body[^]*>/i,d=function(h,y){throw new Error("This browser does not support `document.implementation.createHTMLDocument`")},o=function(h,y){throw new Error("This browser does not support `DOMParser.prototype.parseFromString`")},a=typeof window=="object"&&window.DOMParser;if(typeof a=="function"){var l=new a,g="text/html";o=function(h,y){return y&&(h="<".concat(y,">").concat(h,"</").concat(y,">")),l.parseFromString(h,g)},d=o}if(typeof document=="object"&&document.implementation){var f=document.implementation.createHTMLDocument();d=function(h,y){if(y){var w=f.documentElement.querySelector(y);return w&&(w.innerHTML=h),f}return f.documentElement.innerHTML=h,f}}var b=typeof document=="object"&&document.createElement("template"),T;b&&b.content&&(T=function(h){return b.innerHTML=h,b.content.childNodes});function S(h){var y,w;h=(0,e.escapeSpecialCharacters)(h);var D=h.match(c),A=D&&D[1]?D[1].toLowerCase():"";switch(A){case i:{var n=o(h);if(!u.test(h)){var s=n.querySelector(t);(y=s==null?void 0:s.parentNode)===null||y===void 0||y.removeChild(s)}if(!m.test(h)){var s=n.querySelector(r);(w=s==null?void 0:s.parentNode)===null||w===void 0||w.removeChild(s)}return n.querySelectorAll(i)}case t:case r:{var p=d(h).querySelectorAll(A);return m.test(h)&&u.test(h)?p[0].parentNode.childNodes:p}default:{if(T)return T(h);var s=d(h,r).querySelector(r);return s.childNodes}}}return Q}var me;function at(){if(me)return H;me=1;var e=H&&H.__importDefault||function(u){return u&&u.__esModule?u:{default:u}};Object.defineProperty(H,"__esModule",{value:!0}),H.default=c;var i=e(ot()),t=Oe(),r=/<(![a-zA-Z\s]+)>/;function c(u){if(typeof u!="string")throw new TypeError("First argument must be a string");if(!u)return[];var m=u.match(r),d=m?m[1]:void 0;return(0,t.formatDOM)((0,i.default)(u),null,d)}return H}var Z={},N={},U={},ye;function rt(){if(ye)return U;ye=1;var e=0;U.SAME=e;var i=1;return U.CAMELCASE=i,U.possibleStandardNames={accept:0,acceptCharset:1,"accept-charset":"acceptCharset",accessKey:1,action:0,allowFullScreen:1,alt:0,as:0,async:0,autoCapitalize:1,autoComplete:1,autoCorrect:1,autoFocus:1,autoPlay:1,autoSave:1,capture:0,cellPadding:1,cellSpacing:1,challenge:0,charSet:1,checked:0,children:0,cite:0,class:"className",classID:1,className:1,cols:0,colSpan:1,content:0,contentEditable:1,contextMenu:1,controls:0,controlsList:1,coords:0,crossOrigin:1,dangerouslySetInnerHTML:1,data:0,dateTime:1,default:0,defaultChecked:1,defaultValue:1,defer:0,dir:0,disabled:0,disablePictureInPicture:1,disableRemotePlayback:1,download:0,draggable:0,encType:1,enterKeyHint:1,for:"htmlFor",form:0,formMethod:1,formAction:1,formEncType:1,formNoValidate:1,formTarget:1,frameBorder:1,headers:0,height:0,hidden:0,high:0,href:0,hrefLang:1,htmlFor:1,httpEquiv:1,"http-equiv":"httpEquiv",icon:0,id:0,innerHTML:1,inputMode:1,integrity:0,is:0,itemID:1,itemProp:1,itemRef:1,itemScope:1,itemType:1,keyParams:1,keyType:1,kind:0,label:0,lang:0,list:0,loop:0,low:0,manifest:0,marginWidth:1,marginHeight:1,max:0,maxLength:1,media:0,mediaGroup:1,method:0,min:0,minLength:1,multiple:0,muted:0,name:0,noModule:1,nonce:0,noValidate:1,open:0,optimum:0,pattern:0,placeholder:0,playsInline:1,poster:0,preload:0,profile:0,radioGroup:1,readOnly:1,referrerPolicy:1,rel:0,required:0,reversed:0,role:0,rows:0,rowSpan:1,sandbox:0,scope:0,scoped:0,scrolling:0,seamless:0,selected:0,shape:0,size:0,sizes:0,span:0,spellCheck:1,src:0,srcDoc:1,srcLang:1,srcSet:1,start:0,step:0,style:0,summary:0,tabIndex:1,target:0,title:0,type:0,useMap:1,value:0,width:0,wmode:0,wrap:0,about:0,accentHeight:1,"accent-height":"accentHeight",accumulate:0,additive:0,alignmentBaseline:1,"alignment-baseline":"alignmentBaseline",allowReorder:1,alphabetic:0,amplitude:0,arabicForm:1,"arabic-form":"arabicForm",ascent:0,attributeName:1,attributeType:1,autoReverse:1,azimuth:0,baseFrequency:1,baselineShift:1,"baseline-shift":"baselineShift",baseProfile:1,bbox:0,begin:0,bias:0,by:0,calcMode:1,capHeight:1,"cap-height":"capHeight",clip:0,clipPath:1,"clip-path":"clipPath",clipPathUnits:1,clipRule:1,"clip-rule":"clipRule",color:0,colorInterpolation:1,"color-interpolation":"colorInterpolation",colorInterpolationFilters:1,"color-interpolation-filters":"colorInterpolationFilters",colorProfile:1,"color-profile":"colorProfile",colorRendering:1,"color-rendering":"colorRendering",contentScriptType:1,contentStyleType:1,cursor:0,cx:0,cy:0,d:0,datatype:0,decelerate:0,descent:0,diffuseConstant:1,direction:0,display:0,divisor:0,dominantBaseline:1,"dominant-baseline":"dominantBaseline",dur:0,dx:0,dy:0,edgeMode:1,elevation:0,enableBackground:1,"enable-background":"enableBackground",end:0,exponent:0,externalResourcesRequired:1,fill:0,fillOpacity:1,"fill-opacity":"fillOpacity",fillRule:1,"fill-rule":"fillRule",filter:0,filterRes:1,filterUnits:1,floodOpacity:1,"flood-opacity":"floodOpacity",floodColor:1,"flood-color":"floodColor",focusable:0,fontFamily:1,"font-family":"fontFamily",fontSize:1,"font-size":"fontSize",fontSizeAdjust:1,"font-size-adjust":"fontSizeAdjust",fontStretch:1,"font-stretch":"fontStretch",fontStyle:1,"font-style":"fontStyle",fontVariant:1,"font-variant":"fontVariant",fontWeight:1,"font-weight":"fontWeight",format:0,from:0,fx:0,fy:0,g1:0,g2:0,glyphName:1,"glyph-name":"glyphName",glyphOrientationHorizontal:1,"glyph-orientation-horizontal":"glyphOrientationHorizontal",glyphOrientationVertical:1,"glyph-orientation-vertical":"glyphOrientationVertical",glyphRef:1,gradientTransform:1,gradientUnits:1,hanging:0,horizAdvX:1,"horiz-adv-x":"horizAdvX",horizOriginX:1,"horiz-origin-x":"horizOriginX",ideographic:0,imageRendering:1,"image-rendering":"imageRendering",in2:0,in:0,inlist:0,intercept:0,k1:0,k2:0,k3:0,k4:0,k:0,kernelMatrix:1,kernelUnitLength:1,kerning:0,keyPoints:1,keySplines:1,keyTimes:1,lengthAdjust:1,letterSpacing:1,"letter-spacing":"letterSpacing",lightingColor:1,"lighting-color":"lightingColor",limitingConeAngle:1,local:0,markerEnd:1,"marker-end":"markerEnd",markerHeight:1,markerMid:1,"marker-mid":"markerMid",markerStart:1,"marker-start":"markerStart",markerUnits:1,markerWidth:1,mask:0,maskContentUnits:1,maskUnits:1,mathematical:0,mode:0,numOctaves:1,offset:0,opacity:0,operator:0,order:0,orient:0,orientation:0,origin:0,overflow:0,overlinePosition:1,"overline-position":"overlinePosition",overlineThickness:1,"overline-thickness":"overlineThickness",paintOrder:1,"paint-order":"paintOrder",panose1:0,"panose-1":"panose1",pathLength:1,patternContentUnits:1,patternTransform:1,patternUnits:1,pointerEvents:1,"pointer-events":"pointerEvents",points:0,pointsAtX:1,pointsAtY:1,pointsAtZ:1,prefix:0,preserveAlpha:1,preserveAspectRatio:1,primitiveUnits:1,property:0,r:0,radius:0,refX:1,refY:1,renderingIntent:1,"rendering-intent":"renderingIntent",repeatCount:1,repeatDur:1,requiredExtensions:1,requiredFeatures:1,resource:0,restart:0,result:0,results:0,rotate:0,rx:0,ry:0,scale:0,security:0,seed:0,shapeRendering:1,"shape-rendering":"shapeRendering",slope:0,spacing:0,specularConstant:1,specularExponent:1,speed:0,spreadMethod:1,startOffset:1,stdDeviation:1,stemh:0,stemv:0,stitchTiles:1,stopColor:1,"stop-color":"stopColor",stopOpacity:1,"stop-opacity":"stopOpacity",strikethroughPosition:1,"strikethrough-position":"strikethroughPosition",strikethroughThickness:1,"strikethrough-thickness":"strikethroughThickness",string:0,stroke:0,strokeDasharray:1,"stroke-dasharray":"strokeDasharray",strokeDashoffset:1,"stroke-dashoffset":"strokeDashoffset",strokeLinecap:1,"stroke-linecap":"strokeLinecap",strokeLinejoin:1,"stroke-linejoin":"strokeLinejoin",strokeMiterlimit:1,"stroke-miterlimit":"strokeMiterlimit",strokeWidth:1,"stroke-width":"strokeWidth",strokeOpacity:1,"stroke-opacity":"strokeOpacity",suppressContentEditableWarning:1,suppressHydrationWarning:1,surfaceScale:1,systemLanguage:1,tableValues:1,targetX:1,targetY:1,textAnchor:1,"text-anchor":"textAnchor",textDecoration:1,"text-decoration":"textDecoration",textLength:1,textRendering:1,"text-rendering":"textRendering",to:0,transform:0,typeof:0,u1:0,u2:0,underlinePosition:1,"underline-position":"underlinePosition",underlineThickness:1,"underline-thickness":"underlineThickness",unicode:0,unicodeBidi:1,"unicode-bidi":"unicodeBidi",unicodeRange:1,"unicode-range":"unicodeRange",unitsPerEm:1,"units-per-em":"unitsPerEm",unselectable:0,vAlphabetic:1,"v-alphabetic":"vAlphabetic",values:0,vectorEffect:1,"vector-effect":"vectorEffect",version:0,vertAdvY:1,"vert-adv-y":"vertAdvY",vertOriginX:1,"vert-origin-x":"vertOriginX",vertOriginY:1,"vert-origin-y":"vertOriginY",vHanging:1,"v-hanging":"vHanging",vIdeographic:1,"v-ideographic":"vIdeographic",viewBox:1,viewTarget:1,visibility:0,vMathematical:1,"v-mathematical":"vMathematical",vocab:0,widths:0,wordSpacing:1,"word-spacing":"wordSpacing",writingMode:1,"writing-mode":"writingMode",x1:0,x2:0,x:0,xChannelSelector:1,xHeight:1,"x-height":"xHeight",xlinkActuate:1,"xlink:actuate":"xlinkActuate",xlinkArcrole:1,"xlink:arcrole":"xlinkArcrole",xlinkHref:1,"xlink:href":"xlinkHref",xlinkRole:1,"xlink:role":"xlinkRole",xlinkShow:1,"xlink:show":"xlinkShow",xlinkTitle:1,"xlink:title":"xlinkTitle",xlinkType:1,"xlink:type":"xlinkType",xmlBase:1,"xml:base":"xmlBase",xmlLang:1,"xml:lang":"xmlLang",xmlns:0,"xml:space":"xmlSpace",xmlnsXlink:1,"xmlns:xlink":"xmlnsXlink",xmlSpace:1,y1:0,y2:0,y:0,yChannelSelector:1,z:0,zoomAndPan:1},U}var ve;function st(){if(ve)return N;ve=1;const e=0,i=1,t=2,r=3,c=4,u=5,m=6;function d(n){return a.hasOwnProperty(n)?a[n]:null}function o(n,s,p,v,I,x,O){this.acceptsBooleans=s===t||s===r||s===c,this.attributeName=v,this.attributeNamespace=I,this.mustUseProperty=p,this.propertyName=n,this.type=s,this.sanitizeURL=x,this.removeEmptyString=O}const a={};["children","dangerouslySetInnerHTML","defaultValue","defaultChecked","innerHTML","suppressContentEditableWarning","suppressHydrationWarning","style"].forEach(n=>{a[n]=new o(n,e,!1,n,null,!1,!1)}),[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(([n,s])=>{a[n]=new o(n,i,!1,s,null,!1,!1)}),["contentEditable","draggable","spellCheck","value"].forEach(n=>{a[n]=new o(n,t,!1,n.toLowerCase(),null,!1,!1)}),["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(n=>{a[n]=new o(n,t,!1,n,null,!1,!1)}),["allowFullScreen","async","autoFocus","autoPlay","controls","default","defer","disabled","disablePictureInPicture","disableRemotePlayback","formNoValidate","hidden","loop","noModule","noValidate","open","playsInline","readOnly","required","reversed","scoped","seamless","itemScope"].forEach(n=>{a[n]=new o(n,r,!1,n.toLowerCase(),null,!1,!1)}),["checked","multiple","muted","selected"].forEach(n=>{a[n]=new o(n,r,!0,n,null,!1,!1)}),["capture","download"].forEach(n=>{a[n]=new o(n,c,!1,n,null,!1,!1)}),["cols","rows","size","span"].forEach(n=>{a[n]=new o(n,m,!1,n,null,!1,!1)}),["rowSpan","start"].forEach(n=>{a[n]=new o(n,u,!1,n.toLowerCase(),null,!1,!1)});const g=/[\-\:]([a-z])/g,f=n=>n[1].toUpperCase();["accent-height","alignment-baseline","arabic-form","baseline-shift","cap-height","clip-path","clip-rule","color-interpolation","color-interpolation-filters","color-profile","color-rendering","dominant-baseline","enable-background","fill-opacity","fill-rule","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","glyph-name","glyph-orientation-horizontal","glyph-orientation-vertical","horiz-adv-x","horiz-origin-x","image-rendering","letter-spacing","lighting-color","marker-end","marker-mid","marker-start","overline-position","overline-thickness","paint-order","panose-1","pointer-events","rendering-intent","shape-rendering","stop-color","stop-opacity","strikethrough-position","strikethrough-thickness","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke-width","text-anchor","text-decoration","text-rendering","underline-position","underline-thickness","unicode-bidi","unicode-range","units-per-em","v-alphabetic","v-hanging","v-ideographic","v-mathematical","vector-effect","vert-adv-y","vert-origin-x","vert-origin-y","word-spacing","writing-mode","xmlns:xlink","x-height"].forEach(n=>{const s=n.replace(g,f);a[s]=new o(s,i,!1,n,null,!1,!1)}),["xlink:actuate","xlink:arcrole","xlink:role","xlink:show","xlink:title","xlink:type"].forEach(n=>{const s=n.replace(g,f);a[s]=new o(s,i,!1,n,"http://www.w3.org/1999/xlink",!1,!1)}),["xml:base","xml:lang","xml:space"].forEach(n=>{const s=n.replace(g,f);a[s]=new o(s,i,!1,n,"http://www.w3.org/XML/1998/namespace",!1,!1)}),["tabIndex","crossOrigin"].forEach(n=>{a[n]=new o(n,i,!1,n.toLowerCase(),null,!1,!1)});const b="xlinkHref";a[b]=new o("xlinkHref",i,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1),["src","href","action","formAction"].forEach(n=>{a[n]=new o(n,i,!1,n.toLowerCase(),null,!0,!0)});const{CAMELCASE:T,SAME:S,possibleStandardNames:h}=rt(),w=":A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD"+"\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040",D=RegExp.prototype.test.bind(new RegExp("^(data|aria)-["+w+"]*$")),A=Object.keys(h).reduce((n,s)=>{const p=h[s];return p===S?n[s]=s:p===T?n[s.toLowerCase()]=s:n[s]=p,n},{});return N.BOOLEAN=r,N.BOOLEANISH_STRING=t,N.NUMERIC=u,N.OVERLOADED_BOOLEAN=c,N.POSITIVE_NUMERIC=m,N.RESERVED=e,N.STRING=i,N.getPropertyInfo=d,N.isCustomAttribute=D,N.possibleStandardNames=A,N}var W={},B={},ie,be;function lt(){if(be)return ie;be=1;var e=/\/\*[^*]*\*+([^/*][^*]*\*+)*\//g,i=/\n/g,t=/^\s*/,r=/^(\*?[-#/*\\\w]+(\[[0-9a-z_-]+\])?)\s*/,c=/^:\s*/,u=/^((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^)]*?\)|[^};])+)/,m=/^[;\s]*/,d=/^\s+|\s+$/g,o=`
`,a="/",l="*",g="",f="comment",b="declaration";function T(h,y){if(typeof h!="string")throw new TypeError("First argument must be a string");if(!h)return[];y=y||{};var w=1,D=1;function A(R){var E=R.match(i);E&&(w+=E.length);var M=R.lastIndexOf(o);D=~M?R.length-M:D+R.length}function n(){var R={line:w,column:D};return function(E){return E.position=new s(R),I(),E}}function s(R){this.start=R,this.end={line:w,column:D},this.source=y.source}s.prototype.content=h;function p(R){var E=new Error(y.source+":"+w+":"+D+": "+R);if(E.reason=R,E.filename=y.source,E.line=w,E.column=D,E.source=h,!y.silent)throw E}function v(R){var E=R.exec(h);if(E){var M=E[0];return A(M),h=h.slice(M.length),E}}function I(){v(t)}function x(R){var E;for(R=R||[];E=O();)E!==!1&&R.push(E);return R}function O(){var R=n();if(!(a!=h.charAt(0)||l!=h.charAt(1))){for(var E=2;g!=h.charAt(E)&&(l!=h.charAt(E)||a!=h.charAt(E+1));)++E;if(E+=2,g===h.charAt(E-1))return p("End of comment missing");var M=h.slice(2,E-2);return D+=2,A(M),h=h.slice(E),D+=2,R({type:f,comment:M})}}function j(){var R=n(),E=v(r);if(E){if(O(),!v(c))return p("property missing ':'");var M=v(u),Ge=R({type:b,property:S(E[0].replace(e,g)),value:M?S(M[0].replace(e,g)):g});return v(m),Ge}}function $(){var R=[];x(R);for(var E;E=j();)E!==!1&&(R.push(E),x(R));return R}return I(),$()}function S(h){return h?h.replace(d,g):g}return ie=T,ie}var we;function dt(){if(we)return B;we=1;var e=B&&B.__importDefault||function(r){return r&&r.__esModule?r:{default:r}};Object.defineProperty(B,"__esModule",{value:!0}),B.default=t;const i=e(lt());function t(r,c){let u=null;if(!r||typeof r!="string")return u;const m=(0,i.default)(r),d=typeof c=="function";return m.forEach(o=>{if(o.type!=="declaration")return;const{property:a,value:l}=o;d?c(a,l,o):l&&(u=u||{},u[a]=l)}),u}return B}var V={},ke;function ut(){if(ke)return V;ke=1,Object.defineProperty(V,"__esModule",{value:!0}),V.camelCase=void 0;var e=/^--[a-zA-Z0-9_-]+$/,i=/-([a-z])/g,t=/^[^-]+$/,r=/^-(webkit|moz|ms|o|khtml)-/,c=/^-(ms)-/,u=function(a){return!a||t.test(a)||e.test(a)},m=function(a,l){return l.toUpperCase()},d=function(a,l){return"".concat(l,"-")},o=function(a,l){return l===void 0&&(l={}),u(a)?a:(a=a.toLowerCase(),l.reactCompat?a=a.replace(c,d):a=a.replace(r,d),a.replace(i,m))};return V.camelCase=o,V}var Y,Te;function ct(){if(Te)return Y;Te=1;var e=Y&&Y.__importDefault||function(c){return c&&c.__esModule?c:{default:c}},i=e(dt()),t=ut();function r(c,u){var m={};return!c||typeof c!="string"||(0,i.default)(c,function(d,o){d&&o&&(m[(0,t.camelCase)(d,u)]=o)}),m}return r.default=r,Y=r,Y}var Ee;function Ne(){return Ee||(Ee=1,(function(e){var i=W&&W.__importDefault||function(l){return l&&l.__esModule?l:{default:l}};Object.defineProperty(e,"__esModule",{value:!0}),e.returnFirstArg=e.canTextBeChildOfNode=e.ELEMENTS_WITH_NO_TEXT_CHILDREN=e.PRESERVE_CUSTOM_ATTRIBUTES=void 0,e.isCustomComponent=u,e.setStyleProp=d;var t=Re(),r=i(ct()),c=new Set(["annotation-xml","color-profile","font-face","font-face-src","font-face-uri","font-face-format","font-face-name","missing-glyph"]);function u(l,g){return l.includes("-")?!c.has(l):!!(g&&typeof g.is=="string")}var m={reactCompat:!0};function d(l,g){if(typeof l=="string"){if(!l.trim()){g.style={};return}try{g.style=(0,r.default)(l,m)}catch{g.style={}}}}e.PRESERVE_CUSTOM_ATTRIBUTES=Number(t.version.split(".")[0])>=16,e.ELEMENTS_WITH_NO_TEXT_CHILDREN=new Set(["tr","tbody","thead","tfoot","colgroup","table","head","html","frameset"]);var o=function(l){return!e.ELEMENTS_WITH_NO_TEXT_CHILDREN.has(l.name)};e.canTextBeChildOfNode=o;var a=function(l){return l};e.returnFirstArg=a})(W)),W}var Ie;function Me(){if(Ie)return Z;Ie=1,Object.defineProperty(Z,"__esModule",{value:!0}),Z.default=u;var e=st(),i=Ne(),t=["checked","value"],r=["input","select","textarea"],c={reset:!0,submit:!0};function u(d,o){d===void 0&&(d={});var a={},l=!!(d.type&&c[d.type]);for(var g in d){var f=d[g];if((0,e.isCustomAttribute)(g)){a[g]=f;continue}var b=g.toLowerCase(),T=m(b);if(T){var S=(0,e.getPropertyInfo)(T);switch(t.includes(T)&&r.includes(o)&&!l&&(T=m("default"+b)),a[T]=f,S&&S.type){case e.BOOLEAN:a[T]=!0;break;case e.OVERLOADED_BOOLEAN:f===""&&(a[T]=!0);break}continue}i.PRESERVE_CUSTOM_ATTRIBUTES&&(a[g]=f)}return(0,i.setStyleProp)(d.style,a),a}function m(d){return e.possibleStandardNames[d]}return Z}var z={},Ae;function ht(){if(Ae)return z;Ae=1;var e=z&&z.__importDefault||function(d){return d&&d.__esModule?d:{default:d}};Object.defineProperty(z,"__esModule",{value:!0}),z.default=u;var i=Re(),t=e(Me()),r=Ne(),c={cloneElement:i.cloneElement,createElement:i.createElement,isValidElement:i.isValidElement};function u(d,o){o===void 0&&(o={});for(var a=[],l=typeof o.replace=="function",g=o.transform||r.returnFirstArg,f=o.library||c,b=f.cloneElement,T=f.createElement,S=f.isValidElement,h=d.length,y=0;y<h;y++){var w=d[y];if(l){var D=o.replace(w,y);if(S(D)){h>1&&(D=b(D,{key:D.key||y})),a.push(g(D,w,y));continue}}if(w.type==="text"){var A=!w.data.trim().length;if(A&&w.parent&&!(0,r.canTextBeChildOfNode)(w.parent)||o.trim&&A)continue;a.push(g(w.data,w,y));continue}var n=w,s={};m(n)?((0,r.setStyleProp)(n.attribs.style,n.attribs),s=n.attribs):n.attribs&&(s=(0,t.default)(n.attribs,n.name));var p=void 0;switch(w.type){case"script":case"style":w.children[0]&&(s.dangerouslySetInnerHTML={__html:w.children[0].data});break;case"tag":w.name==="textarea"&&w.children[0]?s.defaultValue=w.children[0].data:w.children&&w.children.length&&(p=u(w.children,o));break;default:continue}h>1&&(s.key=y),a.push(g(T(w.name,s,p),w,y))}return a.length===1?a[0]:a}function m(d){return r.PRESERVE_CUSTOM_ATTRIBUTES&&d.type==="tag"&&(0,r.isCustomComponent)(d.name,d.attribs)}return z}var Se;function pt(){return Se||(Se=1,(function(e){var i=q&&q.__importDefault||function(o){return o&&o.__esModule?o:{default:o}};Object.defineProperty(e,"__esModule",{value:!0}),e.htmlToDOM=e.domToReact=e.attributesToProps=e.Text=e.ProcessingInstruction=e.Element=e.Comment=void 0,e.default=d;var t=i(at());e.htmlToDOM=t.default;var r=i(Me());e.attributesToProps=r.default;var c=i(ht());e.domToReact=c.default;var u=_e();Object.defineProperty(e,"Comment",{enumerable:!0,get:function(){return u.Comment}}),Object.defineProperty(e,"Element",{enumerable:!0,get:function(){return u.Element}}),Object.defineProperty(e,"ProcessingInstruction",{enumerable:!0,get:function(){return u.ProcessingInstruction}}),Object.defineProperty(e,"Text",{enumerable:!0,get:function(){return u.Text}});var m={lowerCaseAttributeNames:!1};function d(o,a){if(typeof o!="string")throw new TypeError("First argument must be a string");return o?(0,c.default)((0,t.default)(o,(a==null?void 0:a.htmlparser2)||m),a):[]}})(q)),q}var gt=pt();const De=je(gt),ft=De.default||De,mt={minOpacity:.2,minScale:.5,fadeBoundary:.2,centerZoneHeight:.4,transitionSpeed:"0.2s"},yt=(e=mt,i=null)=>{const t=P.useRef([]),r=P.useRef(null),c=P.useRef(!0),u=P.useCallback(()=>{if(!c.current)return;const l=(i==null?void 0:i.current)||window,g=l===window?window.innerHeight:l.clientHeight;t.current.forEach(f=>{if(!(f!=null&&f.element)||!f.isCarouselItem)return;const b=f.element.getBoundingClientRect();let T,S;if(l===window)T=b.top,S=b.height;else{const v=l.getBoundingClientRect();T=b.top-v.top,S=b.height}const h=T+S/2,y=g/2,w=g*e.fadeBoundary,D=g*e.centerZoneHeight,A=y-D/2,n=y+D/2;let s=1,p=1;if(h<A||h>n){let v=0;h<A?v=(A-h)/w:v=(h-n)/w;const I=Math.min(1,Math.max(0,v)),x=I*I;s=1-(1-e.minOpacity)*x,p=1-(1-e.minScale)*x}f.element.style.opacity=s,f.element.style.transform=`scale(${p})`}),r.current=requestAnimationFrame(u)},[e,i]),m=P.useCallback(()=>{c.current||(c.current=!0,r.current=requestAnimationFrame(u))},[u]),d=P.useCallback(()=>{c.current=!1,r.current&&(cancelAnimationFrame(r.current),r.current=null)},[]),o=P.useCallback((l,g,f=!0)=>{t.current[l]={element:g,isCarouselItem:f}},[]),a=P.useCallback(l=>{t.current[l]=null},[]);return P.useEffect(()=>(m(),()=>d()),[m,d]),{start:m,stop:d,registerItem:o,unregisterItem:a}},Fe=({children:e,index:i,registerItem:t,unregisterItem:r,style:c={}})=>{const u=P.useRef(null);return P.useEffect(()=>(u.current&&t(i,u.current,!0),()=>r(i)),[i,t,r]),C.jsx("div",{ref:u,className:"list-item carousel-item-wrapper",style:{width:"100%",transition:"opacity 0.2s, transform 0.2s",transformOrigin:"center center",...c},children:e})};Fe.propTypes={children:_.node,index:_.number.isRequired,registerItem:_.func.isRequired,unregisterItem:_.func.isRequired,style:_.object};const Le=({children:e,registerItem:i,unregisterItem:t,index:r})=>{const c=P.useRef(null);return P.useEffect(()=>(c.current&&i(r,c.current,!1),()=>t(r)),[r,i,t]),C.jsx("div",{ref:c,className:"description-container",children:e})};Le.propTypes={children:_.node,index:_.number.isRequired,registerItem:_.func.isRequired,unregisterItem:_.func.isRequired};const vt=({data:e,filterIDs:i,showFavourites:t,handleClick:r,description:c})=>{const[u]=P.useState(!1),m=P.useRef(null),d={minOpacity:.35,minScale:.35,fadeBoundary:.35,centerZoneHeight:.025,transitionSpeed:"0.25s"},{start:o,stop:a,registerItem:l,unregisterItem:g}=yt(d,m);P.useEffect(()=>(o(),()=>a()),[o,a]);const f=P.useMemo(()=>e.map((b,T)=>{const S=i.has(b.id);return b?C.jsx(Fe,{index:T,registerItem:l,unregisterItem:g,style:{marginBottom:"4px"},children:C.jsx("div",{className:"carousel-item"+(S?" selected":""),onClick:r(b.id),children:C.jsx("div",{className:"AccordionItem inner item",style:{cursor:"pointer"},children:C.jsxs("div",{className:"title","aria-controls":`Accronym-${T}-content`,id:`panel${b==null?void 0:b.id}-header`,children:[t&&C.jsx(ae,{className:"icon"+(S?" active":"")}),C.jsx("div",{className:"letters-cont"+(b.title.length>12?" long":""),children:b.title.split(".").map((h,y)=>h&&C.jsx("div",{className:"letter","data-content":h,children:ft(h)},y))})]})})})},`carousel-item-${b.id??T}`):C.jsx(He,{variant:"rounded",width:"100%",height:200,animation:"wave"},`skeleton-${T}`)}),[e,i,t,r,l,g]);return C.jsxs("div",{className:"AccordionRoot"+(u?" expanded":""),ref:m,style:{height:"100%",overflowY:"auto",position:"relative",WebkitOverflowScrolling:"touch"},children:[C.jsx("div",{style:{paddingTop:"40vh",scrollTop:"40vh"}}),C.jsx("div",{className:"accronym-menu",children:f}),c&&C.jsx(Le,{index:e.length,registerItem:l,unregisterItem:g,children:C.jsx("div",{className:"content",children:c})}),C.jsx("div",{style:{paddingBottom:"20vh"}})]})};vt.propTypes={data:_.array.isRequired,filterIDs:_.object.isRequired,showFavourites:_.bool,handleClick:_.func,description:_.node};function Pt(){const e=F(f=>f.userToolIDs),i=F(f=>f.showAccCard),t=F(f=>f.toolsInView);F(f=>f.activityID);const r=F(f=>f.activity),[c,u]=P.useState(!1),[m,d]=P.useState(!1);P.useEffect(()=>{d(r===-1)},[r]);const o=F(f=>f.toggleShowToolsOnly),a=F(f=>f.showToolsOnly),l=F(f=>f.setMessage);P.useEffect(()=>{u(t)},[t]),P.useEffect(()=>{window.scrollY<600||u(!i)},[i,u]);const g=()=>{if(console.log("handleChange activeIDs.length ",e.length),e.length<1){l("No tools in your toolbox. Favourite a tool first.");return}l(a?le.tools.list.unfiltered:le.tools.list.yourToolsFiltered),setTimeout(()=>{document.getElementById("tools").scrollIntoView({behavior:"smooth",block:"start"})},0),o()};return C.jsx("div",{className:"badge-toolbox"+(m?" open":""),children:C.jsx("div",{className:"badge-cont "+(c?"":" hide"),children:C.jsx(Be,{className:"badge toolbox"+(a?" active":""),badgeContent:e.length,onClick:g,anchorOrigin:{vertical:"top",horizontal:"right"},children:C.jsx(ae,{className:"icon"})})})})}export{Pt as B,nt as C,vt as M,It as a,Ct as b,We as c,xt as d,le as e,Rt as f,Dt as g,Et as h,xe as i,At as j,ft as p,St as s,F as u};
//# sourceMappingURL=e3XNwvig.js.map
