import{E as dt,r as d,a0 as mt,j as a,$ as Ue,a3 as xe,ao as pt,c4 as gt,c5 as ft,O as he,c6 as ht,bd as bt,b5 as yt,aj as xt,b7 as vt,c7 as wt,c8 as It,c9 as At,ca as St,cb as kt,cc as Rt,a2 as Et,u as Ct,Z as te,n as ve,M as jt,a5 as qt,cd as Ge,bZ as Nt,aC as ce,bU as Tt}from"./index-91hGweSG.js";import{e as Lt,f as $t,h as $e,m as ue,s as Mt,r as Pt,i as Ft,P as zt,T as Ot,a as _e,b as Be}from"./RichTextEditor.gallery-DDDJ9FAS.js";import{b as Dt,a as Ht,r as Ut,t as Gt,g as _t}from"./forumMarkup-DnAI3b-C.js";import{l as Bt}from"./thread-L5xWzawj.js";import{f as Wt}from"./dataDisplay-CegBnw7r.js";import{P as de}from"./pencil-CtXAPmuA.js";import{T as Vt}from"./triangle-alert-BpJ-DWCc.js";const Jt=[["path",{d:"M20 18v-2a4 4 0 0 0-4-4H4",key:"5vmcpk"}],["path",{d:"m9 17-5-5 5-5",key:"nvlc11"}]],Kt=dt("reply",Jt),Yt={black:0,darkgray:169,darkgrey:169,dimgray:105,dimgrey:105,gainsboro:220,gray:128,grey:128,lightgray:211,lightgrey:211,silver:192,white:255,whitesmoke:245},me="data-capubbs-original-grayscale-color-attr",pe="data-capubbs-original-grayscale-style-color";function Qt(e){const t=String(e??"").trim().toLowerCase().replace(/^['"]|['"]$/g,""),r=t.replace(/\s+/g,""),o=Yt[r];if(typeof o=="number")return{alpha:1,channel:o};const n=r.match(/^#?([0-9a-f]{3}|[0-9a-f]{4}|[0-9a-f]{6}|[0-9a-f]{8})$/);if(n){const m=n[1].length<=4?n[1].split("").map(p=>`${p}${p}`).join(""):n[1],h=Number.parseInt(m.slice(0,2),16),b=Number.parseInt(m.slice(2,4),16),v=Number.parseInt(m.slice(4,6),16),c=m.length===8?Number.parseInt(m.slice(6,8),16)/255:1;return h===b&&b===v?{alpha:c,channel:h}:null}const l=t.match(/^rgba?\(\s*(\d{1,3}(?:\.\d+)?%?)(?:\s*,\s*|\s+)(\d{1,3}(?:\.\d+)?%?)(?:\s*,\s*|\s+)(\d{1,3}(?:\.\d+)?%?)(?:\s*(?:,|\/)\s*([01](?:\.\d+)?|\.\d+|100%|\d{1,3}(?:\.\d+)?%))?\s*\)$/);if(!l)return null;const i=ge(l[1]),s=ge(l[2]),u=ge(l[3]),g=tr(l[4]);return i===null||s===null||u===null||g===null?null:i===s&&s===u?{alpha:g,channel:i}:null}function We(e,t=!0){const r=Qt(e);if(!r)return null;const o=255-r.channel;if(t&&r.alpha<1)return`rgba(${o}, ${o}, ${o}, ${rr(r.alpha)})`;const n=o.toString(16).padStart(2,"0");return`#${n}${n}${n}`}function Xt(e,t){[...e.matches("[color], [style]")?[e]:[],...Array.from(e.querySelectorAll("[color], [style]"))].forEach(o=>{Zt(o,t),o instanceof HTMLElement&&er(o,t)})}function Zt(e,t){const r=e.getAttribute(me);if(t==="light"){if(r===null)return;e.setAttribute("color",r),e.removeAttribute(me);return}const o=r??e.getAttribute("color"),n=We(o,!1);!n||o===null||(r===null&&e.setAttribute(me,o),e.getAttribute("color")!==n&&e.setAttribute("color",n))}function er(e,t){const r=e.getAttribute(pe);if(t==="light"){if(r===null)return;e.style.setProperty("color",r,e.style.getPropertyPriority("color")),e.removeAttribute(pe);return}const o=r??e.style.getPropertyValue("color"),n=We(o);!n||!o||(r===null&&e.setAttribute(pe,o),e.style.getPropertyValue("color")!==n&&e.style.setProperty("color",n,e.style.getPropertyPriority("color")))}function ge(e){const t=e.endsWith("%"),r=Number(t?e.slice(0,-1):e);return Number.isFinite(r)?t?r>=0&&r<=100?Math.round(r*2.55):null:r>=0&&r<=255?Math.round(r):null:null}function tr(e){if(e===void 0)return 1;const t=e.endsWith("%"),r=Number(t?e.slice(0,-1):e);return Number.isFinite(r)?t?r>=0&&r<=100?r/100:null:r>=0&&r<=1?r:null:null}function rr(e){return Number(e.toFixed(3))}async function ar(e){try{if(navigator.clipboard?.writeText)return await navigator.clipboard.writeText(e),!0}catch{}const t=document.createElement("textarea");t.value=e,t.setAttribute("readonly",""),t.style.position="fixed",t.style.opacity="0",document.body.appendChild(t),t.select();try{return document.execCommand("copy")}finally{t.remove()}}const nr=400;function ia(e,t){return t?`回复 @${t}：${e}`:e}function or(e){const t=Array.from(e).length,r=nr,o=t>r;return{canSubmit:!!e.trim()&&!o,isOverLimit:o,length:t,limit:r}}function Ve(e,t){e.querySelectorAll(".capubbs-gallery").forEach(r=>{const o=r.querySelector(".capubbs-gallery-stage");if(!o||o.querySelector(".capubbs-gallery-quote"))return;const n=r.ownerDocument.createElement("button");n.type="button",n.className="capubbs-gallery-quote",n.innerHTML='<svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z"/><path d="M5 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z"/></svg><span>引用</span>',n.setAttribute("aria-label","引用图片"),n.addEventListener("click",l=>{l.preventDefault(),l.stopPropagation();const i=Array.from(r.querySelectorAll('[data-capubbs-gallery-slide="true"]')),s=i.findIndex(v=>v.getAttribute("data-capubbs-gallery-active")==="true"),u=s>=0?s:0,g=i[u]?.querySelector("img");if(!g)return;const m=g.getAttribute("data-capubbs-image-resource-src")||g.getAttribute("data-capubbs-gallery-src")||g.getAttribute("src");if(!m)return;let h;try{h=new URL(m,g.baseURI)}catch{return}if(!["http:","https:"].includes(h.protocol))return;const b=r.querySelectorAll('[data-capubbs-gallery-caption="true"]');t({src:h.href,title:r.querySelector(".capubbs-gallery-title")?.textContent?.trim()??"",caption:b[u]?.textContent?.trim()??""})}),o.appendChild(n)})}function la(e,t,r){let o;try{o=new URL(t.src)}catch{return e}if(!["http:","https:"].includes(o.protocol))return e;const n=[t.title.trim(),t.caption.trim()].filter(Boolean).join("-"),l=n?`【${n}】`:"",i=m=>m.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;"),s=`<p class="capubbs-floor-quote-content"><img src="${i(o.href)}" alt=""></p>${l?`<p class="capubbs-floor-quote-content">${i(l)}</p>`:""}`,u=o.href.replace(/[<>\\]/g,m=>encodeURIComponent(m)),g=l.replace(/([\\`*_{}\[\]()#+.!|>~-])/g,"\\$1");return Dt(e,r,{html:s,markdown:`![](<${u}>)${g?`

${g}`:""}`})}const sr='<svg aria-hidden="true" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 3h6v6"/><path d="m21 3-7 7"/><path d="m3 21 7-7"/><path d="M9 21H3v-6"/></svg>';function ir(e){const t=e.createElement("button");return t.type="button",t.className="forum-table-expand",t.dataset.forumTableExpand="true",t.setAttribute("aria-label","放大表格"),t.title="放大表格",t.innerHTML=sr,t}function lr(e){return e instanceof Element?e.closest('[data-forum-table-expand="true"]')?.closest(".forum-table-viewport")?.querySelector("table.forum-data-table")??null:null}function cr(e){const t=[];return e.querySelectorAll("table").forEach(r=>{if(r.classList.contains("forum-punishment-table")||r.parentElement?.closest("table")||r.querySelector("table")||r.rows.length<2||!Array.from(r.rows).some(m=>m.cells.length>1))return;let o=r.parentElement;if(!o?.classList.contains("forum-table-scroll")){o=r.ownerDocument.createElement("div"),o.className="forum-table-scroll",o.tabIndex=0,r.before(o),o.append(r),r.classList.add("forum-data-table");let m=[],h=null;Array.from(r.rows).forEach((b,v)=>{h!==b.parentElement&&(h=b.parentElement,m=[]);let c=0;Array.from(b.cells).forEach(p=>{for(;(m[c]??0)>0;)c+=1;c===0&&p.colSpan===1&&p.classList.add("forum-table-first-column"),v===0&&!r.tHead&&p.classList.add("forum-table-heading");const x=p.rowSpan===0?r.rows.length:p.rowSpan;for(let w=0;w<p.colSpan;w+=1)m[c+w]=x;c+=p.colSpan;const I=r.ownerDocument.createElement("div");for(I.className="forum-table-cell-content";p.firstChild;)I.append(p.firstChild);p.append(I)}),m=m.map(p=>Math.max(0,p-1))})}const n=o;let l=n.parentElement;l?.classList.contains("forum-table-viewport")||(l=r.ownerDocument.createElement("div"),l.className="forum-table-viewport",n.before(l),l.append(n)),l.querySelector(":scope > .forum-table-expand")||l.append(ir(r.ownerDocument));const i=l,s=()=>{n.classList.toggle("forum-table-scrolled",n.scrollLeft>0),i.classList.toggle("forum-table-more-right",n.scrollWidth-n.clientWidth-n.scrollLeft>1)};s(),n.addEventListener("scroll",s,{passive:!0});const u=r.ownerDocument.defaultView,g=u?.ResizeObserver?new u.ResizeObserver(s):null;g?.observe(n),g?.observe(r),u?.addEventListener("resize",s),t.push(()=>{n.removeEventListener("scroll",s),g?.disconnect(),u?.removeEventListener("resize",s)})}),()=>t.forEach(r=>r())}function ur({html:e,onClose:t}){return d.useEffect(()=>(document.body.classList.add("gallery-dialog-open"),()=>document.body.classList.remove("gallery-dialog-open")),[]),mt.createPortal(a.jsx(Ue,{className:"gallery-dialog-backdrop",onClick:t,onDismiss:t,role:"presentation",children:a.jsxs("section",{"aria-labelledby":"forum-table-dialog-title","aria-modal":"true",className:"gallery-dialog forum-table-dialog",onClick:r=>r.stopPropagation(),role:"dialog",children:[a.jsxs("header",{children:[a.jsx("span",{children:a.jsx(Lt,{size:18})}),a.jsx("h2",{id:"forum-table-dialog-title",children:"表格"}),a.jsx("button",{"aria-label":"关闭表格","data-autofocus":!0,onClick:t,type:"button",children:a.jsx(xe,{size:18})})]}),a.jsx("div",{className:"forum-markup forum-table-dialog-body",dangerouslySetInnerHTML:{__html:e},tabIndex:0})]})}),document.body)}function Je(e){const t=e.ownerDocument.defaultView;if(!t)return()=>{};const r=[];return e.querySelectorAll(".forum-punishment-table").forEach(o=>{const n=o.parentElement;if(!n?.classList.contains("forum-punishment-scroll"))return;let l=!1;function i(){if(l||!n)return;const u=n.clientWidth,g=Math.max(o.offsetWidth,o.scrollWidth);if(u<=0||g<=0)return;const m=Math.min(1,u/g),h=`scale(${m})`,b=`${Math.ceil(o.offsetHeight*m)}px`;o.style.transform!==h&&(o.style.transform=h),n.style.height!==b&&(n.style.height=b)}const s=t.ResizeObserver?new t.ResizeObserver(i):null;s?.observe(n),s?.observe(o),t.addEventListener("resize",i),e.ownerDocument.fonts?.ready.then(i),i(),r.push(()=>{l=!0,s?.disconnect(),t.removeEventListener("resize",i)})}),()=>r.forEach(o=>o())}function Ke({className:e="",html:t,onImageOpen:r,onImageQuote:o,variant:n}){const l=d.useRef(null),i=d.useRef(o);i.current=o;const{theme:s}=pt(),[u,g]=d.useState(null),m=d.useMemo(()=>({__html:gt(t)}),[t]);if(d.useLayoutEffect(()=>{const c=l.current;if(c&&n!=="signature")return cr(c)},[t,n]),d.useLayoutEffect(()=>{const c=l.current;if(c&&n!=="signature")return Je(c)},[t,n]),d.useLayoutEffect(()=>{const c=l.current;c&&($t(c),o&&n==="floor"?Ve(c,p=>i.current?.(p)):c.querySelectorAll(".capubbs-gallery-quote").forEach(p=>p.remove()),Xt(c,s))},[t,s,!!o,n]),d.useLayoutEffect(()=>{const c=l.current;if(c)return ft(c)},[t]),d.useEffect(()=>{const c=l.current;if(!c)return;const p=Array.from(c.querySelectorAll("img")),x=w=>{w.dataset.capubbsImageLoaded="true"},I=p.map(w=>{if(w.complete&&w.getAttribute("src"))return x(w),null;const L=()=>x(w);return w.addEventListener("load",L,{once:!0}),w.addEventListener("error",L,{once:!0}),{handleLoad:L,image:w}});return()=>{I.forEach(w=>{w&&(w.image.removeEventListener("load",w.handleLoad),w.image.removeEventListener("error",w.handleLoad))})}},[t]),!t)return null;function h(c,p){if(!r||!(c instanceof Element))return;const x=c.closest("img");if(!(x instanceof HTMLImageElement))return;const I=x.closest(".capubbs-gallery"),w=I?Array.from(I.querySelectorAll('[data-capubbs-gallery-slide="true"] img')):Array.from(p.querySelectorAll("img")).filter(C=>!C.closest(".capubbs-gallery")),L=w.indexOf(x);if(L<0)return;const N=w.map(C=>dr(C,p)),P=w.map((C,$)=>{const q=N[$];return{alt:C.alt.trim(),element:C,src:C.currentSrc||C.getAttribute("src")||C.dataset.capubbsGallerySrc||"",...q?{galleryId:q.galleryId,galleryIndex:q.galleryIndex}:{}}});r(P,L,x,C=>{const $=N[C];$&&Mt($.gallery,$.galleryIndex)})}function b(c){const p=lr(c.target);if(p){c.preventDefault(),c.stopPropagation(),g(p.outerHTML);return}const x=$e(c.target);if(x&&c.target instanceof Element){c.preventDefault(),c.stopPropagation(),ue(c.target,x);return}!r||!(c.target instanceof HTMLImageElement)||(c.preventDefault(),h(c.target,c.currentTarget))}function v(c){const p=$e(c.target);if(p&&["Enter"," "].includes(c.key)&&c.target instanceof Element){c.preventDefault(),ue(c.target,p);return}if(["ArrowLeft","ArrowRight"].includes(c.key)&&c.target instanceof Element&&c.target.closest(".capubbs-gallery")){c.preventDefault(),ue(c.target,c.key==="ArrowLeft"?"prev":"next");return}!r||!(c.target instanceof HTMLImageElement)||!["Enter"," "].includes(c.key)||(c.preventDefault(),h(c.target,c.currentTarget))}return a.jsxs(a.Fragment,{children:[a.jsx("div",{ref:l,className:`forum-markup forum-markup-${n} ${e}`.trim(),"data-forum-markup":n,dangerouslySetInnerHTML:m,onClick:b,onKeyDown:v}),a.jsx(he,{children:u?a.jsx(ur,{html:u,onClose:()=>g(null)}):null})]})}function dr(e,t){const r=e.closest(".capubbs-gallery");if(!r||!t.contains(r))return null;const n=Array.from(t.querySelectorAll(".capubbs-gallery")).indexOf(r),i=Array.from(r.querySelectorAll('[data-capubbs-gallery-slide="true"] img')).indexOf(e);return n>=0&&i>=0?{gallery:r,galleryId:n,galleryIndex:i}:null}function mr(e){if(!/<punishment_record\b/i.test(e))return null;const t=document.createElement("template");t.innerHTML=e;const r=Array.from(t.content.querySelectorAll("punishment_record")).filter(n=>!n.closest("pre, code, textarea"));if(r.length===0)return null;const o=r.map(n=>{const l=n.getAttribute("year")?.trim()??"",i=/^\d{4}$/.test(l)&&Number(l)>1?Number(l):null,s=document.createElement("div");return n.replaceWith(s,...Array.from(n.childNodes)),{placeholder:s,year:i}});return{needsRecords:o.some(({year:n})=>n!==null),render(n,l){return o.forEach(({placeholder:i,year:s})=>{if(s===null||l){i.textContent=s===null?"罚跑记录学年无效":l;return}const u=document.createElement("table"),g=`${s-1}-${s} 学年罚跑记录`;u.className="forum-punishment-table",u.setAttribute("aria-label",g);const m=document.createElement("div");m.className="forum-punishment-title",m.setAttribute("role","heading"),m.setAttribute("aria-level","2"),m.textContent=g;const h=u.createTHead().insertRow();["姓名","ID","原因","长度","职务加罚","开始时间","结束时间","完成情况"].forEach(p=>{const x=document.createElement("th");x.scope="col",x.textContent=p,h.append(x)});const b=u.createTBody(),v=n.filter(p=>{const x=p.startDate.match(/^(\d{4})-(\d{1,2})-/);if(!x)return!1;const I=Number(x[2]);return I>=1&&I<=12&&Number(x[1])+(I>=9?1:0)===s});if(v.forEach(p=>{const x=b.insertRow(),I=p.distance?/公里|km/i.test(p.distance)?p.distance:`${p.distance} km`:"—";[p.name||"—",p.username||"—",p.reason||"—",I,p.addition?"是":"否",Me(p.startDate),Me(p.endDate),p.isComplete?"已完成":"进行中"].forEach(w=>{x.insertCell().textContent=w})}),v.length===0){const p=b.insertRow().insertCell();p.colSpan=8,p.className="forum-punishment-empty",p.textContent="暂无罚跑记录"}const c=document.createElement("div");c.className="forum-punishment-scroll",c.append(u),i.className="forum-punishment-record",i.replaceChildren(m,c)}),t.innerHTML}}}function Me(e){return!e||e==="0000-00-00"?"—":e.replaceAll("-",".")}function pr(e,t){const r=d.useMemo(()=>t?mr(e):null,[t,e]),[o,n]=d.useState(null);return d.useEffect(()=>{if(!r||!r.needsRecords)return;const l=new AbortController;return Wt("punishments",l.signal).then(({punishmentRecords:i})=>{l.signal.aborted||n({prepared:r,html:r.render(i)})}).catch(i=>{l.signal.aborted||n({prepared:r,html:r.render([],i instanceof Error?i.message:"罚跑记录加载失败")})}),()=>l.abort()},[r]),r?r.needsRecords?o?.prepared===r?o.html:"":r.render([]):e}const gr='.forum-markup-floor .capubbs-gallery-quote{position:absolute;display:inline-flex;align-items:center;gap:4px;z-index:5;top:10px;right:10px;padding:4px 8px;border:1px solid rgb(255 255 255 / .25);border-radius:var(--card-radius);background:#00000080;color:#fff;font:inherit;font-size:12px;line-height:1.5;cursor:pointer;opacity:0;pointer-events:none;transition:opacity .15s ease,background .15s ease}.forum-markup-floor .capubbs-gallery-stage:hover .capubbs-gallery-quote,.forum-markup-floor .capubbs-gallery-stage:focus-within .capubbs-gallery-quote{opacity:1;pointer-events:auto}.forum-markup-floor .capubbs-gallery-quote:hover{background:#000000b8}.forum-markup-floor .capubbs-gallery-quote:focus-visible{outline:2px solid #fff;outline-offset:2px}@media(hover:none){.forum-markup-floor .capubbs-gallery-quote{opacity:1;pointer-events:auto}}.forum-markup .forum-punishment-table{display:table;width:-moz-max-content;width:max-content;min-width:100%;max-width:none;border-collapse:separate;border-spacing:0;transform-origin:top left}.forum-markup .forum-punishment-table :is(th,td){border:0;border-right:1px solid var(--line);border-bottom:1px solid var(--line);padding:8px;background:var(--surface);color:var(--text-muted);font:inherit;text-align:center;white-space:nowrap}.forum-markup .forum-punishment-table tbody tr:hover>td{background:var(--brand-faint, color-mix(in srgb, var(--brand) 8%, var(--surface)))}.forum-markup .forum-punishment-table tr>:last-child{border-right:0}.forum-markup .forum-punishment-table tbody tr:last-child>td{border-bottom:0}.forum-markup .forum-punishment-table th{background:var(--surface-soft);color:var(--text-faint);font-weight:780}.forum-markup .forum-punishment-record{box-sizing:border-box;min-width:0;max-width:100%;border:1px solid var(--line)}.forum-markup .forum-punishment-scroll{max-width:100%;overflow:hidden}.forum-markup .forum-punishment-title{padding:12px 14px;border-bottom:1px solid var(--line);background:var(--surface-soft);color:var(--text-strong);font-family:inherit;font-size:var(--ui-font-size-lg, 14px);font-weight:760;line-height:1.5;text-align:center}.forum-markup .forum-punishment-table .forum-punishment-empty{text-align:center}.forum-markup .forum-punishment-empty>.forum-table-cell-content{width:auto;max-width:none}:root{--card-radius: 2px;--surface: #fffefa;--surface-raised: #ffffff;--surface-soft: #f6f8f4;--text: #20231f;--text-strong: #111411;--text-muted: #687068;--text-faint: #6c746c;--line: #e1e6df;--line-strong: #cdd5cc;--brand: #236b4c;--brand-strong: #174f38;--danger: #b8473f}:root.dark{--surface: #171d19;--surface-raised: #1c241f;--surface-soft: #1f2822;--text: #dde5de;--text-strong: #f6faf6;--text-muted: #a0aca2;--text-faint: #849086;--line: #2c362f;--line-strong: #3c493f;--brand: #69b98d;--brand-strong: #8bcca6;--danger: #ef8178}::-moz-selection{background:color-mix(in srgb,var(--brand) 24%,transparent)}::selection{background:color-mix(in srgb,var(--brand) 24%,transparent)}*,:before,:after{box-sizing:border-box;border-width:0;border-style:solid;border-color:currentcolor}blockquote,figure,h1,h2,h3,h4,h5,h6,hr,p,pre{margin:0}a{color:inherit;text-decoration:inherit}button{margin:0;padding:0;background-color:transparent;color:inherit;font:inherit;letter-spacing:inherit;text-transform:none}button:where(:not([style]):not([class])){min-height:32px;border:1px solid var(--line);border-radius:.5px;padding:4px 12px;background-color:var(--surface);color:var(--text-muted);font-size:14px;font-weight:680;line-height:1.5;vertical-align:middle;cursor:pointer;transition:background-color .14s ease,border-color .14s ease,color .14s ease}button:where(:not([style]):not([class]):hover:not(:disabled)){border-color:var(--line-strong);background-color:var(--surface-soft);color:var(--brand-strong)}button:where(:not([style]):not([class]):focus-visible){outline:2px solid var(--brand);outline-offset:2px}button:where(:not([style]):not([class]):disabled){cursor:not-allowed;opacity:.5}img,svg,video,canvas,audio,iframe,embed,object{display:block;vertical-align:middle}.capubbs-html-frame-root iframe{background-color:transparent!important}img,video{max-width:100%;height:auto}table{border-color:inherit;border-collapse:collapse;text-indent:0}.capubbs-activity-signup-canceled,.capubbs-activity-signup-canceled *{color:var(--danger)!important;text-decoration-color:var(--danger)!important;text-decoration-line:line-through!important;text-decoration-thickness:2px!important}.forum-markup>:first-child{margin-top:0}.forum-markup>:last-child{margin-bottom:0}.forum-markup p,.forum-markup div{margin:0}.forum-markup-floor p{margin:0 0 .75em}.forum-markup-floor>div+div{margin-top:.55em}.forum-markup a{color:var(--brand-strong);font-weight:inherit;text-decoration:underline;text-decoration-thickness:1px;text-underline-offset:.16em}.forum-markup .forum-mention{text-decoration:none}.forum-markup blockquote{margin:0 0 0 2em;border:0;padding:0;background:transparent;color:inherit}.forum-markup blockquote.forum-quote,.forum-markup .forum-legacy-quote,.forum-markup blockquote.capubbs-floor-quote{margin:.8em 0;border-left:3px solid color-mix(in srgb,var(--brand) 38%,var(--line));padding:.55em .75em;background:var(--surface-soft);color:var(--text-muted)}.forum-markup .capubbs-floor-quote-jump{margin-left:.75em}.forum-markup .forum-legacy-quote-content{margin:0}.forum-markup h1,.forum-markup h2,.forum-markup h3,.forum-markup h4,.forum-markup h5,.forum-markup h6{margin:.9rem 0 .45rem;color:var(--brand-strong);font-weight:800;line-height:1.35}.forum-markup h1{font-size:1.45rem}.forum-markup h2{font-size:1.25rem}.forum-markup h3{font-size:1.1rem}.forum-markup h4,.forum-markup h5,.forum-markup h6{font-size:1em}.forum-markup ul,.forum-markup ol{margin:.65em 0;padding-left:1.45em}.forum-markup ul{list-style:disc}.forum-markup ol{list-style:decimal}.forum-markup ol.capubbs-ordered-list-alpha{list-style-type:lower-alpha}.forum-markup ol.capubbs-ordered-list-roman{list-style-type:lower-roman}.forum-markup pre{max-width:100%;overflow-x:auto;margin:.75em 0;border-radius:var(--card-radius);padding:.75em;background:#182531;color:#f8fafc;white-space:pre-wrap}.forum-markup code,.forum-markup kbd{border-radius:var(--card-radius);padding:.08em .25em;background:color-mix(in srgb,var(--surface-soft) 75%,var(--line));font-family:SFMono-Regular,Cascadia Code,Consolas,monospace;font-size:.9em}.forum-markup pre code{padding:0;background:transparent;color:inherit}.forum-markup font[size="1"]{font-size:11px}.forum-markup font[size="2"]{font-size:13px}.forum-markup font[size="3"]{font-size:15px}.forum-markup font[size="4"]{font-size:17px}.forum-markup font[size="5"]{font-size:19px}.forum-markup font[size="6"]{font-size:21px}.forum-markup font[size="7"]{font-size:23px}.forum-markup hr{margin:.9em 0;border:0;border-top:1px solid var(--line-strong)}.forum-markup img{display:inline-block;height:auto;max-width:100%;vertical-align:middle}.forum-markup img[data-capubbs-image-width][data-capubbs-image-height]:not([data-capubbs-image-loaded=true]){color:transparent;font-size:0}.forum-markup .capubbs-gallery-slide img:not([data-capubbs-image-loaded=true]){opacity:0}.forum-markup img[data-capubbs-image-width][data-capubbs-image-height]:not([data-capubbs-image-loaded=true]),.forum-markup .capubbs-gallery-slide:has(img:not([data-capubbs-image-loaded=true])){background-color:color-mix(in srgb,var(--surface-soft) 82%,var(--line));background-image:linear-gradient(105deg,transparent 20%,color-mix(in srgb,var(--surface-raised) 70%,transparent) 45%,transparent 70%);background-size:220% 100%;animation:capubbs-image-loading 1.2s ease-in-out infinite}.forum-markup img[role=button]{cursor:zoom-in}.forum-markup img[role=button]:focus-visible{outline:2px solid var(--brand);outline-offset:3px}.forum-markup table{display:block;max-width:100%;overflow-x:auto;border-collapse:collapse}.forum-markup td,.forum-markup th{border:1px solid var(--line);padding:.35em .5em}.forum-markup-signature{color:#999;font-family:monospace;font-size:14px;line-height:1.6;overflow-wrap:anywhere}:root.dark .forum-markup-signature{color:#666}.forum-markup .capubbs-gallery{position:relative;display:block;width:100%;margin:.9rem 0;overflow:hidden;border:1px solid var(--line);border-radius:var(--card-radius);background:transparent;color:var(--text)}.forum-markup .capubbs-gallery:focus-visible{outline:2px solid var(--brand);outline-offset:3px}.forum-markup .capubbs-gallery-header{position:relative;display:flex;min-height:44px;align-items:center;justify-content:space-between;gap:12px;margin:0;padding:9px 12px;border-bottom:1px solid var(--line);background:var(--surface-soft)}.forum-markup .capubbs-gallery-title{width:100%;min-width:0;margin:0;color:var(--text-strong);font-size:.82rem;font-weight:760;line-height:1.4;text-align:center}.forum-markup .capubbs-gallery-stage{position:relative;display:block;margin:0;background:transparent}.forum-markup .capubbs-gallery-slide{display:block;margin:0;background:transparent}.forum-markup .capubbs-gallery-slide[data-capubbs-gallery-active=false]{display:none}.forum-markup .capubbs-gallery-slide>img{display:block;width:100%;height:var(--capubbs-gallery-image-height, clamp(280px, 52vw, 560px));max-width:none;margin:0 auto;border-radius:0;-o-object-fit:contain;object-fit:contain}.forum-markup .capubbs-gallery-caption{display:block;margin:0;color:var(--text-muted);font-size:.78rem;line-height:1.55;text-align:center}.forum-markup .capubbs-gallery-caption[data-capubbs-gallery-active=false]{display:none}.forum-markup .capubbs-gallery-footer{position:relative;display:flex;min-height:44px;align-items:center;justify-content:center;margin:0;padding:9px 12px;border-top:1px solid var(--line);background:var(--surface-soft)}.forum-markup .capubbs-gallery-captions{width:100%;min-width:0;margin:0;padding-inline:48px;text-align:center}.forum-markup .capubbs-gallery-count{position:absolute;top:50%;right:12px;color:var(--text-faint);font-size:.72rem;font-variant-numeric:tabular-nums;font-weight:760;line-height:1.25;transform:translateY(-50%)}.forum-markup .capubbs-gallery-count[data-capubbs-gallery-current]:before{content:attr(data-capubbs-gallery-current) "/" attr(data-capubbs-gallery-total)}.forum-markup .capubbs-gallery-nav{position:absolute;z-index:4;top:50%;display:grid;width:36px;height:48px;place-items:center;padding:0;transform:translateY(-50%);border:1px solid rgb(255 255 255 / .25);border-radius:var(--card-radius);background:#00000080;color:#fff;cursor:pointer;transition:.15s ease}.forum-markup .capubbs-gallery-nav:hover{background:#000000b8}.forum-markup .capubbs-gallery-nav:focus-visible{outline:2px solid #fff;outline-offset:2px}.forum-markup .capubbs-gallery-nav:before{font-family:Arial,sans-serif;font-size:2rem;font-weight:300;line-height:1}.forum-markup .capubbs-gallery-nav-prev:before{content:"‹"}.forum-markup .capubbs-gallery-nav-next:before{content:"›"}.forum-markup .capubbs-gallery-nav-prev{left:10px}.forum-markup .capubbs-gallery-nav-next{right:10px}@keyframes capubbs-image-loading{0%{background-position:120% 0}to{background-position:-80% 0}}@media(max-width:640px){.forum-markup .capubbs-gallery-slide>img{height:var(--capubbs-gallery-image-height, min(72vw, 420px))}.forum-markup .capubbs-gallery-nav{width:32px;height:42px}.forum-markup .capubbs-gallery-nav-prev{left:7px}.forum-markup .capubbs-gallery-nav-next{right:7px}}@media(prefers-reduced-motion:reduce){.forum-markup img[data-capubbs-image-width][data-capubbs-image-height]:not([data-capubbs-image-loaded=true]),.forum-markup .capubbs-gallery-slide:has(img:not([data-capubbs-image-loaded=true])){animation:none}}:is(.forum-markup,.capubbs-editor-prose) .capubbs-gallery[data-capubbs-gallery-tag]>.capubbs-gallery-header[hidden]{display:none}@media(max-width:640px){:is(.forum-markup,.capubbs-editor-prose) .capubbs-gallery[data-capubbs-gallery-tag] .capubbs-gallery-stage,:is(.forum-markup,.capubbs-editor-prose) .capubbs-gallery[data-capubbs-gallery-tag] .capubbs-gallery-slide>img{height:min(var(--capubbs-gallery-image-height, 420px),72vw)}}',fr="/bbs/new-assets/threadHtmlBootstrap-x4mBAuLM.html";function hr(e,t){const r=new URL(e);return r.pathname=/Android|iPhone|iPad|iPod|Mobile/i.test(t)?"/m/outchain/player":"/outchain/player",r.href}function we(e,t){try{const r=new URL(e,t);return!(r.hostname==="player.bilibili.com"&&r.pathname==="/player.html"||r.hostname==="music.163.com"&&["/outchain/player","/m/outchain/player"].includes(r.pathname))||!["http:","https:"].includes(r.protocol)||r.username||r.password||r.port?null:(r.protocol="https:",r.href)}catch{return null}}function br(e,t){const r=new URL(e);return r.hostname==="music.163.com"?(r.searchParams.set("auto","0"),hr(r.href,t)):(r.searchParams.set("autoplay","0"),r.href)}function yr(e){if(!e)return{left:0,top:0};const t=window.getComputedStyle(e);return{left:e.offsetLeft+e.clientLeft+(Number.parseFloat(t.paddingLeft)||0),top:e.offsetTop+e.clientTop+(Number.parseFloat(t.paddingTop)||0)}}function xr(e){if(!e||typeof e!="object")return!1;const t=e;return typeof t.id=="string"&&typeof t.src=="string"&&we(t.src,"https://music.163.com")===t.src&&["left","top","width","height"].every(r=>{const o=t[r];return typeof o=="number"&&Number.isFinite(o)&&Math.abs(o)<=1e5})&&t.width>0&&t.height>0}const Pe=64*1024*1024,Fe=6,vr=2,re=new Map,se=new Map,J=new Map,K=new Map;let fe=!1;function be(e){const t=e.priorities.map(r=>r());return t.includes("high")?"high":t.includes("low")?"low":t.includes("deferred")?"deferred":null}function H(){fe||!J.size&&!K.size||(fe=!0,setTimeout(()=>{fe=!1;const e=[];J.forEach((i,s)=>{const u=be(i);if(u===null){J.delete(s),re.delete(s),i.reject(new DOMException("图片所在内容已卸载","AbortError"));return}u!=="deferred"&&e.push({source:s,request:i,priority:u})}),e.sort((i,s)=>+(s.priority==="high")-+(i.priority==="high"));const t=Array.from(K.values(),i=>({download:i,priority:be(i.request)}));t.forEach(({download:i,priority:s})=>{s===null&&i.controller.abort()});const r=t.filter(({download:i})=>i.controller.signal.aborted).length;let o=e.filter(({priority:i})=>i==="high").length-(Fe-K.size+r);const n=t.filter(({download:i,priority:s})=>s!=="high"&&!i.controller.signal.aborted).sort((i,s)=>+(s.priority==="deferred")-+(i.priority==="deferred"));for(const{download:i}of n){if(o<=0)break;o-=1,i.preempted=!0,i.controller.abort()}let l=t.filter(({priority:i})=>i!=="high").length;for(const{source:i,request:s,priority:u}of e){if(K.size>=Fe)break;u==="low"&&l>=vr||(J.delete(i),u==="low"&&(l+=1),wr(i,s,u))}},0))}function wr(e,t,r){const o={request:t,controller:new AbortController,preempted:!1};K.set(e,o),Ir(e,r,o.controller.signal).then(n=>{o.controller.signal.throwIfAborted();const l={blob:n,objectUrl:URL.createObjectURL(n),sourceUrl:e};se.set(e,l),t.resolve(l)}).catch(n=>{o.preempted||o.controller.signal.aborted&&be(t)!==null?J.set(e,t):(re.delete(e),t.reject(n))}).finally(()=>{K.delete(e),H()})}function Ye(e){return new URL(e,new URL("/bbs/content/",window.location.origin)).href}function ze(e,t=()=>"high"){const r=Ye(e),o=re.get(r);if(o)return(J.get(r)??K.get(r)?.request)?.priorities.push(t),H(),o;const n=new Promise((l,i)=>{J.set(r,{priorities:[t],reject:i,resolve:l})});return re.set(r,n),H(),n}function Ir(e,t,r){const o=new URL(e);return o.origin!==window.location.origin||!o.pathname.startsWith("/bbs/images/")&&!o.pathname.startsWith("/bbsimg/")?Promise.reject(new Error("仅代理论坛图片目录")):fetch(e,{credentials:"same-origin",referrerPolicy:"no-referrer",priority:t,signal:r}).then(async n=>{if(!n.ok)throw new Error(`图片加载失败：${n.status}`);if(!(n.headers.get("content-type")?.toLowerCase()??"").startsWith("image/"))throw new Error("图片响应类型无效");const i=Number.parseInt(n.headers.get("content-length")??"",10);if(Number.isFinite(i)&&i>Pe)throw new Error("图片大小超出限制");const s=await n.blob();if(s.size>Pe)throw new Error("图片大小超出限制");return s})}function Ar(e){try{return se.get(Ye(e))?.objectUrl}catch{return}}typeof window<"u"&&(window.addEventListener("scroll",H,{passive:!0,capture:!0}),window.addEventListener("resize",H),window.addEventListener("pagehide",e=>{e.persisted||(se.forEach(t=>URL.revokeObjectURL(t.objectUrl)),se.clear(),re.clear())}));function Sr(e,t,r){let o="deferred";for(const n of t){const l=n.right>n.left&&n.bottom>n.top&&e.top+n.bottom>Math.max(0,e.top)&&e.top+n.top<Math.min(r.height,e.bottom)&&e.left+n.right>Math.max(0,e.left)&&e.left+n.left<Math.min(r.width,e.right);if(n.gallery){if(!l||n.gallery==="deferred")continue;if(n.gallery==="current")return"high";o="low"}else{if(l)return"high";o="low"}}return o}const kr=28,Rr=64,Er=5e4,Cr=30,Qe=30,E="capubbs-thread-html-frame",Xe=new URL("/bbs/lib/jquery.min.js",window.location.origin).href,jr=Or(gr),qr=/\son[a-z][\w:-]*\s*=/i;let oe=null;function Oe({className:e="",floor:t,html:r,isActivitySignupCanceled:o=!1,onImageOpen:n,onImageQuote:l,onIsolatedTextSelection:i,variant:s}){const u=d.useMemo(()=>s==="signature"?Pt(r):r,[r,s]),g=Tr(u,s==="signature"),m=pr(g,s==="floor"),h=Ht(m),b=d.useMemo(()=>h?null:Ut(m,{normalizeLegacyLineBreaks:s==="signature"}),[m,h,s]),v=d.useMemo(()=>Gt(m),[m]);return!h&&b!==null?a.jsx(Ke,{className:e,html:b,onImageOpen:n,onImageQuote:l,variant:s}):a.jsx(Nr,{className:e,floor:t,html:v,isActivitySignupCanceled:o,onImageOpen:n,onImageQuote:l,onTextSelection:i,variant:s})}function Nr({className:e,floor:t,html:r,isActivitySignupCanceled:o,onImageOpen:n,onImageQuote:l,onTextSelection:i,variant:s}){const u=d.useRef(null),g=d.useRef(`${s}-${t}-${Math.random().toString(36).slice(2)}`),m=d.useRef(l);m.current=l;const h=s==="floor"&&!!l,b=d.useRef(n);b.current=n;const v=d.useRef(i);v.current=i;const c=s==="signature"?kr:Rr,p=!!n,[x,I]=d.useState(null),[w,L]=d.useState(null),N=Hr(),P=d.useRef(N),X=ht(),C=s==="signature"?14:X,$=d.useMemo(()=>Pr(Mr(r)),[r]),q=$.includes('type="text/capubbs-user-script"')||qr.test($),Y=d.useMemo(()=>Lr({canOpenImages:p,canQuoteImages:h,frameId:g.current,needsJquery:q,html:$,isActivitySignupCanceled:o,isDarkTheme:P.current,fontSize:C,variant:s}),[p,h,$,C,o,q,s]),M=d.useMemo(()=>Math.random().toString(36).slice(2),[Y]),Q=d.useMemo(()=>`${fr}#${new URLSearchParams({frameId:g.current,token:M})}`,[M]),W=d.useCallback(()=>{u.current?.contentWindow?.postMessage({source:E,type:"document-response",frameId:g.current,token:M,html:Y},"*")},[M,Y]),G=d.useCallback(()=>{u.current?.contentWindow?.postMessage({frameId:g.current,source:E,theme:N?"dark":"light",type:"theme"},"*")},[N]),_=d.useCallback((k=u.current?.contentWindow)=>{!q||!k||De().then(z=>{u.current?.contentWindow===k&&k.postMessage({frameId:g.current,jquerySource:z,source:E,type:"jquery-response"},"*")})},[q]),ae=d.useCallback(()=>{W(),G(),_()},[W,_,G]);d.useEffect(()=>{I(null)},[Q]),d.useEffect(()=>{G()},[G]),d.useEffect(()=>{q&&De()},[q]),d.useLayoutEffect(()=>{H()},[x]),d.useLayoutEffect(()=>{let k=!0;const z=new Map;function Z(y){const U=u.current?.contentWindow;if(!(!U||y.source!==U||!Dr(y.data))&&y.data.frameId===g.current){if(y.data.type==="embedded-player-layout"){L({token:M,players:y.data.players});return}if(y.data.type==="document-request"){y.data.token===M&&W();return}if(y.data.type==="jquery-request"){_(U);return}if(y.data.type==="image-resource-layout"){z.has(y.data.requestId)&&(z.set(y.data.requestId,y.data.bounds),H());return}if(y.data.type==="image-resource-request"){const S=U,R=y.data.requestId;z.set(R,y.data.bounds);const T=()=>{const A=u.current;return!k||!A||A.contentWindow!==S?null:Sr(A.getBoundingClientRect(),z.get(R)??[],{width:window.innerWidth,height:window.innerHeight})};ze(y.data.url,T).then(A=>{!k||u.current?.contentWindow!==S||S.postMessage({blob:A.blob,priority:T(),frameId:g.current,requestId:y.data.requestId,source:E,type:"image-resource-response"},"*")}).catch(()=>{!k||u.current?.contentWindow!==S||S.postMessage({priority:T(),frameId:g.current,requestId:y.data.requestId,source:E,type:"image-resource-error"},"*")}).finally(()=>z.delete(R));return}if(y.data.type==="anchor"){const S=u.current;if(!S)return;const R=window.getComputedStyle(document.documentElement),T=Number.parseFloat(R.getPropertyValue("--topbar-height"))||0,A=window.scrollY+S.getBoundingClientRect().top;window.scrollTo({left:0,top:Math.max(0,A+y.data.offsetTop-T-16)});return}if(y.data.type==="navigate"){const S=bt(y.data.url,Ie());if(!S)return;window.history.pushState(null,"",S),window.dispatchEvent(new Event(yt));const R=new URL(S,window.location.origin);R.hash?window.requestAnimationFrame(()=>{const T=decodeURIComponent(R.hash.slice(1)),A=xt(`#${T}`);(A?vt(A):document.getElementById(T))?.scrollIntoView({block:"start"})}):window.scrollTo({left:0,top:0});return}if(y.data.type==="image-quote"){m.current?.(y.data.image);return}if(y.data.type==="image-open"){const S=u.current;if(!S)return;const R=Array.from(S.contentDocument?.querySelectorAll("img")??[]),T=y.data.images.map(O=>({...O,element:typeof O.elementIndex=="number"?R[O.elementIndex]:void 0,src:Ar(O.src)??O.src,loadSource:F=>(F.addEventListener("abort",H,{once:!0}),ze(O.src,()=>F.aborted?null:"high").then(V=>V.objectUrl,()=>O.src).finally(()=>F.removeEventListener("abort",H)))})),A=O=>{const F=T[O];!F||typeof F.galleryId!="number"||!Number.isSafeInteger(F.galleryIndex)||S.contentWindow?.postMessage({frameId:g.current,galleryId:F.galleryId,galleryIndex:F.galleryIndex,source:E,type:"gallery-select"},"*")};b.current?.(T,y.data.imageIndex,S,A);return}if(y.data.type==="selection"){y.data.text&&window.getSelection()?.removeAllRanges(),v.current?.(y.data.text);return}I(Math.min(Er,Math.max(c,Math.ceil(y.data.height))))}}return window.addEventListener("message",Z),()=>{k=!1,z.clear(),window.removeEventListener("message",Z),H()}},[M,Q,c,W,_]);const B=yr(u.current);return a.jsxs("div",{className:"thread-html-frame-container",children:[a.jsx("iframe",{ref:u,className:`thread-html-frame thread-html-frame-${s} ${e}`.trim(),referrerPolicy:"no-referrer",sandbox:"allow-scripts allow-downloads",scrolling:"no",src:Q,onLoad:ae,style:{"--thread-html-frame-width-allowance":`${Qe}px`,...x===null?{}:{"--thread-html-frame-height":`${x}px`}},title:s==="signature"?`第 ${t} 楼签名档`:`第 ${t} 楼正文`},M),w?.token===M?w.players.map(k=>a.jsx("iframe",{className:"thread-embedded-player",src:br(k.src,navigator.userAgent),title:new URL(k.src).hostname==="player.bilibili.com"?"哔哩哔哩播放器":"网易云音乐播放器",allow:"autoplay; fullscreen; picture-in-picture",allowFullScreen:!0,scrolling:"no",style:{left:k.left+B.left,top:k.top+B.top,width:k.width,height:k.height}},`${M}-${k.id}`)):null]})}function Tr(e,t){const[r,o]=d.useState(e);return d.useEffect(()=>{const n=new AbortController,l=t?Ft(e):[];if(o(e),l.length===0)return()=>n.abort();const i=Array.from(new Map(l.map(s=>[`${s.bid}:${s.tid}:${s.pid}`,s])).values());return Promise.all(i.map(async s=>{try{const u=await Bt(s,n.signal);return[`${s.bid}:${s.tid}:${s.pid}`,u]}catch(u){if(u instanceof DOMException&&u.name==="AbortError")throw u;return[`${s.bid}:${s.tid}:${s.pid}`,""]}})).then(s=>{if(n.signal.aborted)return;const u=new Map(s);let g=e;l.forEach(m=>{const h=u.get(`${m.bid}:${m.tid}:${m.pid}`);h&&(g=g.replace(m.marker,h))}),o(g)}).catch(()=>{}),()=>n.abort()},[t,e]),r}function Lr({canOpenImages:e,canQuoteImages:t,frameId:r,fontSize:o,needsJquery:n,html:l,isActivitySignupCanceled:i,isDarkTheme:s,variant:u}){const g=u==="signature",m=g?"#999999":"rgb(63 63 70)",h=g?"#666666":"rgb(228 228 231)",b=g?"monospace":"'Noto Sans CJK SC','Source Han Sans SC','PingFang SC','Microsoft YaHei',sans-serif",v=g?"padding-top:10px;color:inherit;font-family:inherit;font-size:inherit;":"",c=i?" capubbs-activity-signup-canceled":"";return`<!doctype html>
<html class="${s?"dark":"light"}" style="background:transparent;color-scheme:${s?"dark":"light"}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta name="referrer" content="no-referrer">
  <base href="${zr(Ie())}">
  <meta http-equiv="Content-Security-Policy" content="${Fr()}">
  <style>${jr}</style>
  <style>
    html{--capubbs-frame-text-color:${m}}html.dark{--capubbs-frame-text-color:${h}}
    html,body{margin:0;padding:0;min-width:0;min-height:0;overflow:hidden;background:transparent!important;color:var(--capubbs-frame-text-color);font-family:${b};font-size:${o}px;line-height:1.6;overflow-wrap:anywhere;word-break:break-word}
    .capubbs-html-frame-root{display:flow-root;width:calc(100% - ${Qe}px);${v}}.capubbs-html-frame-root iframe{display:inline-block;vertical-align:baseline}
  </style>
  <script>${$r(r,e,n,t)}<\/script>
</head>
<body><main class="capubbs-html-frame-root forum-markup forum-markup-${u}${c}">${l}</main></body>
</html>`}function $r(e,t,r,o=!1){return`(function(){
    var frameId=${JSON.stringify(e)};
    var forumOrigin=${JSON.stringify(window.location.origin)};
    var forumBasePath=${JSON.stringify(wt)};
    var canOpenImages=${JSON.stringify(t)};
    var canQuoteImages=${JSON.stringify(o)};
    var ensureGalleryQuoteControls=${Ve.toString()};
    var needsJquery=${JSON.stringify(r)};
    var preparePunishmentTableFit=${Je.toString()};
    var getGalleryImageState=${It.toString()};
    var normalizeEmbeddedPlayerUrl=${we.toString()};
    var playerIds=new WeakMap();
    var nextPlayerId=0;
    var lastPlayerLayout='';
    var jquerySourceUrl=${JSON.stringify(Xe)};
    var forumAppExactPaths=${JSON.stringify(At)};
    var forumAppPathPrefixes=${JSON.stringify(St)};
    var legacyForumExactPaths=${JSON.stringify(kt)};
    var legacyForumPathPatterns=${JSON.stringify(Rt)}.map(function(pattern){return new RegExp(pattern);});
    var minBottomGuard=${Cr};
    var queued=false;
    var selectionQueued=false;
    var lastSelectionText='';
    var userScriptsExecuted=false;
    var imageResourceRequestIndex=0;
    var imageResourceRequests={};
    var imageResourceRequestIdsBySource={};
    var imageResourceObjectUrls=[];
    var priorityObservedImages=new WeakSet();
    var imagePriorityObserver=window.IntersectionObserver?new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        var priority=entry.isIntersecting?'high':'low';
        if(entry.target.fetchPriority!==priority)entry.target.fetchPriority=priority;
        if(entry.isIntersecting&&entry.target.loading!=='eager')entry.target.loading='eager';
      });
    },{rootMargin:'0px',threshold:0}):null;
    var grayscaleNamedColors={black:0,darkgray:169,darkgrey:169,dimgray:105,dimgrey:105,gainsboro:220,gray:128,grey:128,lightgray:211,lightgrey:211,silver:192,white:255,whitesmoke:245};
    var originalColorAttribute='data-capubbs-original-grayscale-color-attr';
    var originalStyleColorAttribute='data-capubbs-original-grayscale-style-color';
    var syncingGrayscaleTextColors=false;
    function parseGrayscaleTextColor(value){
      var colorText=String(value==null?'':value).trim().toLowerCase().replace(/^['"]|['"]$/g,'');
      var compactColorText=colorText.replace(/\\s+/g,'');
      var namedChannel=grayscaleNamedColors[compactColorText];
      if(typeof namedChannel==='number')return {alpha:1,channel:namedChannel};
      var hexMatch=compactColorText.match(/^#?([0-9a-f]{3}|[0-9a-f]{4}|[0-9a-f]{6}|[0-9a-f]{8})$/);
      if(hexMatch){
        var rawHex=hexMatch[1];
        var hex=rawHex.length<=4?rawHex.split('').map(function(character){return character+character;}).join(''):rawHex;
        var red=parseInt(hex.slice(0,2),16);
        var green=parseInt(hex.slice(2,4),16);
        var blue=parseInt(hex.slice(4,6),16);
        var hexAlpha=hex.length===8?parseInt(hex.slice(6,8),16)/255:1;
        return red===green&&green===blue?{alpha:hexAlpha,channel:red}:null;
      }
      var rgbMatch=colorText.match(/^rgba?\\(\\s*(\\d{1,3}(?:\\.\\d+)?%?)(?:\\s*,\\s*|\\s+)(\\d{1,3}(?:\\.\\d+)?%?)(?:\\s*,\\s*|\\s+)(\\d{1,3}(?:\\.\\d+)?%?)(?:\\s*(?:,|\\/)\\s*([01](?:\\.\\d+)?|\\.\\d+|100%|\\d{1,3}(?:\\.\\d+)?%))?\\s*\\)$/);
      if(!rgbMatch)return null;
      function parseRgbChannel(channelValue){
        var isPercent=channelValue.endsWith('%');
        var channel=Number(isPercent?channelValue.slice(0,-1):channelValue);
        if(!Number.isFinite(channel))return null;
        if(isPercent)return channel>=0&&channel<=100?Math.round(channel*2.55):null;
        return channel>=0&&channel<=255?Math.round(channel):null;
      }
      function parseAlphaChannel(alphaValue){
        if(alphaValue===undefined)return 1;
        var isPercent=alphaValue.endsWith('%');
        var alpha=Number(isPercent?alphaValue.slice(0,-1):alphaValue);
        if(!Number.isFinite(alpha))return null;
        if(isPercent)return alpha>=0&&alpha<=100?alpha/100:null;
        return alpha>=0&&alpha<=1?alpha:null;
      }
      var redChannel=parseRgbChannel(rgbMatch[1]);
      var greenChannel=parseRgbChannel(rgbMatch[2]);
      var blueChannel=parseRgbChannel(rgbMatch[3]);
      var alpha=parseAlphaChannel(rgbMatch[4]);
      if(redChannel===null||greenChannel===null||blueChannel===null||alpha===null)return null;
      return redChannel===greenChannel&&greenChannel===blueChannel?{alpha:alpha,channel:redChannel}:null;
    }
    function invertGrayscaleTextColor(value,allowAlpha){
      var grayscaleColor=parseGrayscaleTextColor(value);
      if(!grayscaleColor)return '';
      var invertedChannel=255-grayscaleColor.channel;
      if(allowAlpha&&grayscaleColor.alpha<1)return 'rgba('+invertedChannel+', '+invertedChannel+', '+invertedChannel+', '+Number(grayscaleColor.alpha.toFixed(3))+')';
      var hex=invertedChannel.toString(16).padStart(2,'0');
      return '#'+hex+hex+hex;
    }
    function syncGrayscaleTextColors(root){
      if(syncingGrayscaleTextColors)return;
      syncingGrayscaleTextColors=true;
      try{
        var dark=document.documentElement.classList.contains('dark');
        var scope=root&&root.querySelectorAll?root:document;
        var elements=Array.prototype.slice.call(scope.querySelectorAll('[color], [style], ['+originalColorAttribute+'], ['+originalStyleColorAttribute+']'));
        if(scope.nodeType===1&&(scope.matches('[color], [style], ['+originalColorAttribute+'], ['+originalStyleColorAttribute+']')))elements.unshift(scope);
        elements.forEach(function(element){
          var originalAttributeColor=element.getAttribute(originalColorAttribute);
          if(!dark&&originalAttributeColor!==null){
            element.setAttribute('color',originalAttributeColor);
            element.removeAttribute(originalColorAttribute);
          }else if(dark){
            var attributeSource=originalAttributeColor!==null?originalAttributeColor:element.getAttribute('color');
            var invertedAttributeColor=invertGrayscaleTextColor(attributeSource,false);
            if(invertedAttributeColor&&attributeSource!==null){
              if(originalAttributeColor===null)element.setAttribute(originalColorAttribute,attributeSource);
              if(element.getAttribute('color')!==invertedAttributeColor)element.setAttribute('color',invertedAttributeColor);
            }
          }
          if(!element.style||!element.style.getPropertyValue)return;
          var originalStyleColor=element.getAttribute(originalStyleColorAttribute);
          if(!dark&&originalStyleColor!==null){
            element.style.setProperty('color',originalStyleColor,element.style.getPropertyPriority('color'));
            element.removeAttribute(originalStyleColorAttribute);
          }else if(dark){
            var styleSource=originalStyleColor!==null?originalStyleColor:element.style.getPropertyValue('color');
            var invertedStyleColor=invertGrayscaleTextColor(styleSource,true);
            if(invertedStyleColor&&styleSource){
              if(originalStyleColor===null)element.setAttribute(originalStyleColorAttribute,styleSource);
              if(element.style.getPropertyValue('color')!==invertedStyleColor)element.style.setProperty('color',invertedStyleColor,element.style.getPropertyPriority('color'));
            }
          }
        });
      }finally{syncingGrayscaleTextColors=false;}
    }
    function getContentHeight(){
      var contentRoot=document.querySelector('.capubbs-html-frame-root');
      if(!contentRoot)return 0;
      var rect=contentRoot.getBoundingClientRect?contentRoot.getBoundingClientRect():null;
      var measured=Math.max(contentRoot.scrollHeight||0,contentRoot.offsetHeight||0,rect?Math.ceil(rect.height):0);
      if(!measured)return 0;
      var style=window.getComputedStyle?window.getComputedStyle(contentRoot):null;
      var fontSize=parseFloat(style&&style.fontSize?style.fontSize:'');
      var guard=Math.max(minBottomGuard,Number.isFinite(fontSize)?Math.ceil(fontSize*0.5):0);
      return measured+guard;
    }
    function sendHeight(){
      queued=false;
      var height=getContentHeight();
      window.parent.postMessage({source:'${E}',type:'resize',frameId:frameId,height:height},'*');
      Object.keys(imageResourceRequests).forEach(function(requestId){reportImageResourceLayout(requestId);});
      reportEmbeddedPlayers();
    }
    function reportEmbeddedPlayers(){
      var players=[];
      Array.prototype.forEach.call(document.querySelectorAll('.capubbs-html-frame-root iframe'),function(player){
        var raw=player.getAttribute('src')||player.getAttribute('data-capubbs-player-src')||'';
        var src=normalizeEmbeddedPlayerUrl(raw,document.baseURI);
        if(!src)return;
        if(player.getAttribute('data-capubbs-player-src')!==src)player.setAttribute('data-capubbs-player-src',src);
        if(player.hasAttribute('src'))player.removeAttribute('src');
        // Closed details can retain descendant geometry despite not painting it.
        // Only the first direct summary remains visible, including its children.
        for(var child=player,parent=player.parentElement;parent;child=parent,parent=parent.parentElement){
          if(parent.tagName!=='DETAILS'||parent.hasAttribute('open'))continue;
          var summary=Array.prototype.find.call(parent.children,function(element){return element.tagName==='SUMMARY';});
          if(child!==summary)return;
        }
        var rect=player.getBoundingClientRect();
        var style=window.getComputedStyle(player);
        if(rect.width<=0||rect.height<=0||style.display==='none'||style.visibility==='hidden')return;
        if(!playerIds.has(player))playerIds.set(player,String(++nextPlayerId));
        players.push({id:playerIds.get(player),src:src,left:rect.left,top:rect.top,width:rect.width,height:rect.height});
      });
      var serialized=JSON.stringify(players);
      if(serialized===lastPlayerLayout)return;
      lastPlayerLayout=serialized;
      window.parent.postMessage({source:'${E}',type:'embedded-player-layout',frameId:frameId,players:players},'*');
    }
    function queueHeight(){
      if(queued)return;
      queued=true;
      window.setTimeout(sendHeight,0);
    }
    function sendSelection(){
      selectionQueued=false;
      var selection=window.getSelection?window.getSelection():null;
      var text=selection?selection.toString().trim():'';
      if(text===lastSelectionText)return;
      lastSelectionText=text;
      window.parent.postMessage({source:'${E}',type:'selection',frameId:frameId,text:text},'*');
    }
    function queueSelection(){
      if(selectionQueued)return;
      selectionQueued=true;
      window.requestAnimationFrame(sendSelection);
    }
    function executeUserScripts(){
      if(userScriptsExecuted)return;
      userScriptsExecuted=true;
      Array.prototype.slice.call(document.querySelectorAll('script[type="text/capubbs-user-script"]')).forEach(function(script){
        var executable=document.createElement('script');
        Array.prototype.forEach.call(script.attributes,function(attribute){
          if(attribute.name!=='type')executable.setAttribute(attribute.name,attribute.value);
        });
        executable.text=script.text||script.textContent||'';
        script.parentNode.replaceChild(executable,script);
      });
    }
    function loadJqueryAndExecuteUserScripts(jquerySource){
      if(userScriptsExecuted)return;
      var jquery=document.createElement('script');
      if(typeof jquerySource==='string'&&jquerySource){
        jquery.text=jquerySource;
        document.head.appendChild(jquery);
        executeUserScripts();
        return;
      }
      jquery.src=jquerySourceUrl;
      jquery.addEventListener('load',executeUserScripts,{once:true});
      jquery.addEventListener('error',executeUserScripts,{once:true});
      document.head.appendChild(jquery);
    }
    function getForumNavigationUrl(target){
      var anchor=target&&target.closest?target.closest('a'):null;
      if(!anchor)return '';
      var href=anchor.getAttribute('href');
      if(!href||href.charAt(0)==='#'||anchor.hasAttribute('download'))return '';
      try{
        var url=new URL(href,document.baseURI);
        var host=url.hostname.toLowerCase();
        var trusted=url.origin===forumOrigin||host==='chexie.net'||host.endsWith('.chexie.net');
        var path=url.pathname.replace(/\\/{2,}/g,'/').replace(/\\/+$/,'')||'/';
        var appPath=path===forumBasePath?'/':path.indexOf(forumBasePath+'/')===0?path.slice(forumBasePath.length):path;
        appPath=appPath.replace(/^\\/(?:bbs-new|capubbs-new)(?=\\/)/,'');
        var appRoute=forumAppExactPaths.indexOf(appPath)>=0||forumAppPathPrefixes.some(function(prefix){return appPath.indexOf(prefix)===0;});
        var legacyRoute=legacyForumExactPaths.indexOf(path)>=0||legacyForumExactPaths.indexOf(appPath)>=0||legacyForumPathPatterns.some(function(pattern){return pattern.test(path)||pattern.test(appPath);});
        return trusted&&(appRoute||legacyRoute)?url.href:'';
      }catch(error){return '';}
    }
    function handleForumNavigationClick(event){
      if(event.defaultPrevented||event.button!==0)return;
      var anchor=event.target&&event.target.closest?event.target.closest('a'):null;
      var href=anchor&&anchor.getAttribute('href');
      if(href&&href.charAt(0)==='#'){
        event.preventDefault();
        var rawId=href.slice(1);
        if(!rawId)return;
        var id=rawId;
        try{id=decodeURIComponent(rawId);}catch(error){}
        var target=document.getElementById(id);
        if(!target){
          var namedTargets=document.getElementsByName(id);
          target=namedTargets&&namedTargets.length?namedTargets[0]:null;
        }
        if(!target)return;
        var targetRect=target.getBoundingClientRect();
        var offsetTop=Math.max(0,Math.round((window.scrollY||0)+targetRect.top));
        window.parent.postMessage({source:'${E}',type:'anchor',frameId:frameId,offsetTop:offsetTop},'*');
        return;
      }
      if(event.altKey||event.ctrlKey||event.metaKey||event.shiftKey)return;
      var url=getForumNavigationUrl(event.target);
      if(!url)return;
      event.preventDefault();
      window.parent.postMessage({source:'${E}',type:'navigate',frameId:frameId,url:url},'*');
    }
    function getTargetImage(target){
      var image=target&&target.closest?target.closest('img'):null;
      return image&&image.tagName==='IMG'?image:null;
    }
    function openImage(image){
      if(!canOpenImages||!image)return;
      var gallery=image.closest?image.closest('.capubbs-gallery'):null;
      var imageElements=gallery
        ?Array.prototype.slice.call(gallery.querySelectorAll('[data-capubbs-gallery-slide="true"] img'))
        :Array.prototype.slice.call(document.querySelectorAll('.capubbs-html-frame-root img')).filter(function(candidate){
          return !candidate.closest||!candidate.closest('.capubbs-gallery');
        });
      var imageIndex=imageElements.indexOf(image);
      if(imageIndex<0)return;
      var allImages=Array.prototype.slice.call(document.querySelectorAll('.capubbs-html-frame-root img'));
      var images=imageElements.map(function(candidate){
        var resourceSource=candidate.getAttribute('data-capubbs-image-resource-src');
        var item={alt:(candidate.alt||'').trim(),elementIndex:allImages.indexOf(candidate),src:resourceSource?new URL(resourceSource,document.baseURI).href:(candidate.currentSrc||candidate.src||'')};
        var gallery=candidate.closest?candidate.closest('.capubbs-gallery'):null;
        if(gallery){
          var galleries=Array.prototype.slice.call(document.querySelectorAll('.capubbs-html-frame-root .capubbs-gallery'));
          var galleryId=galleries.indexOf(gallery);
          var galleryImages=Array.prototype.slice.call(gallery.querySelectorAll('[data-capubbs-gallery-slide="true"] img'));
          var galleryIndex=galleryImages.indexOf(candidate);
          if(galleryId>=0&&galleryIndex>=0){
            item.galleryId=galleryId;
            item.galleryIndex=galleryIndex;
          }
        }
        return item;
      });
      window.parent.postMessage({source:'${E}',type:'image-open',frameId:frameId,images:images,imageIndex:imageIndex},'*');
    }
    function handleImageClick(event){
      if(event.defaultPrevented||event.button!==0||event.altKey||event.ctrlKey||event.metaKey||event.shiftKey)return;
      var image=getTargetImage(event.target);
      if(!image||!canOpenImages)return;
      event.preventDefault();
      openImage(image);
    }
    function handleImageKeyDown(event){
      if(event.defaultPrevented||(event.key!=='Enter'&&event.key!==' '))return;
      var image=getTargetImage(event.target);
      if(!image||!canOpenImages)return;
      event.preventDefault();
      openImage(image);
    }
    function markImageLoaded(image){
      if(image.getAttribute('data-capubbs-image-loaded')!=='true')image.setAttribute('data-capubbs-image-loaded','true');
      queueHeight();
    }
    function observeImageLoad(image){
      if(image.getAttribute('data-capubbs-image-resource-src')&&!image.getAttribute('src'))return;
      if(image.complete){
        markImageLoaded(image);
        return;
      }
      if(image.getAttribute('data-capubbs-image-load-observed')==='true')return;
      image.setAttribute('data-capubbs-image-load-observed','true');
      image.addEventListener('load',function(){markImageLoaded(image)},{once:true});
      image.addEventListener('error',function(){markImageLoaded(image)},{once:true});
    }
    function prepareImages(){
      Array.prototype.forEach.call(document.images,function(image){
        if(imagePriorityObserver&&!priorityObservedImages.has(image)){
          priorityObservedImages.add(image);
          imagePriorityObserver.observe(image);
        }
        observeImageLoad(image);
        var width=parseFloat(image.getAttribute('width')||'');
        var height=parseFloat(image.getAttribute('height')||'');
        if(Number.isFinite(width)&&width>0&&Number.isFinite(height)&&height>0){
          width=Math.round(width);
          height=Math.round(height);
          if(image.getAttribute('data-capubbs-image-width')!==String(width))image.setAttribute('data-capubbs-image-width',String(width));
          if(image.getAttribute('data-capubbs-image-height')!==String(height))image.setAttribute('data-capubbs-image-height',String(height));
          var boundedWidth='min('+width+'px, 100%)';
          var aspectRatio=width+' / '+height;
          if(!image.style.width)image.style.width=boundedWidth;
          if(image.style.height!=='auto')image.style.height='auto';
          if(image.style.aspectRatio!==aspectRatio)image.style.aspectRatio=aspectRatio;
        }
        if(!canOpenImages)return;
        var ariaLabel=image.alt&&image.alt.trim()?'查看大图：'+image.alt.trim():'查看大图';
        if(image.getAttribute('role')!=='button')image.setAttribute('role','button');
        if(image.getAttribute('tabindex')!=='0')image.setAttribute('tabindex','0');
        if(image.getAttribute('aria-label')!==ariaLabel)image.setAttribute('aria-label',ariaLabel);
        if(!image.title)image.title='点击查看大图';
      });
    }
    function getImageResourceBounds(images){
      return images.map(function(image){
        var state=getGalleryImageState(image);
        var bounds=(state?state.gallery:image).getBoundingClientRect();
        var result={top:bounds.top,bottom:bounds.bottom,left:bounds.left,right:bounds.right};
        if(state)result.gallery=state.role;
        return result;
      });
    }
    function reportImageResourceLayout(requestId){
      var request=imageResourceRequests[requestId];
      if(!request)return;
      window.parent.postMessage({source:'${E}',type:'image-resource-layout',frameId:frameId,requestId:requestId,bounds:getImageResourceBounds(request.images)},'*');
    }
    function requestImageResources(){
      Array.prototype.forEach.call(document.querySelectorAll('img[data-capubbs-image-resource-src]'),function(image){
        if(image.getAttribute('src')||image.getAttribute('data-capubbs-image-resource-requested')==='true')return;
        var source=image.getAttribute('data-capubbs-image-resource-src')||'';
        var normalizedSource=new URL(source,document.baseURI).href;
        var existingRequestId=imageResourceRequestIdsBySource[normalizedSource];
        image.setAttribute('data-capubbs-image-resource-requested','true');
        if(existingRequestId&&imageResourceRequests[existingRequestId]){
          imageResourceRequests[existingRequestId].images.push(image);
          reportImageResourceLayout(existingRequestId);
          return;
        }
        var requestId=frameId+'-image-'+(++imageResourceRequestIndex);
        imageResourceRequests[requestId]={images:[image],source:normalizedSource};
        imageResourceRequestIdsBySource[normalizedSource]=requestId;
        window.parent.postMessage({
          source:'${E}',
          type:'image-resource-request',
          frameId:frameId,
          requestId:requestId,
          url:normalizedSource,
          bounds:getImageResourceBounds([image])
        },'*');
      });
    }
    function applyImageResourceResponse(data){
      var request=imageResourceRequests[data.requestId];
      if(!request)return;
      delete imageResourceRequests[data.requestId];
      delete imageResourceRequestIdsBySource[request.source];
      request.images.forEach(function(image){image.fetchPriority=data.priority==='high'?'high':'low';});
      if(data.type==='image-resource-response'&&data.blob instanceof Blob){
        var objectUrl=URL.createObjectURL(data.blob);
        imageResourceObjectUrls.push(objectUrl);
        request.images.forEach(function(image){image.src=objectUrl;observeImageLoad(image);});
        return;
      }
      request.images.forEach(function(image){image.src=request.source;observeImageLoad(image);});
    }
    function revokeImageResourceObjectUrls(){
      imageResourceObjectUrls.forEach(function(objectUrl){URL.revokeObjectURL(objectUrl);});
      imageResourceObjectUrls=[];
    }
    function createGalleryNavigationControl(direction,label){
      var control=document.createElement('span');
      control.className='capubbs-gallery-nav capubbs-gallery-nav-'+direction;
      control.setAttribute('data-capubbs-gallery-action',direction);
      control.setAttribute('aria-label',label);
      control.setAttribute('role','button');
      control.setAttribute('tabindex','0');
      return control;
    }
    function setGalleryAttribute(element,name,value){
      if(element.getAttribute(name)!==value)element.setAttribute(name,value);
    }
    function setGalleryItemActive(item,active){
      setGalleryAttribute(item,'data-capubbs-gallery-active',active?'true':'false');
      setGalleryAttribute(item,'aria-hidden',active?'false':'true');
    }
    function prepareGalleries(){
      if(canQuoteImages)ensureGalleryQuoteControls(document,function(image){
        window.parent.postMessage({source:'${E}',type:'image-quote',frameId:frameId,image:image},'*');
      });
      Array.prototype.forEach.call(document.querySelectorAll('.capubbs-html-frame-root .capubbs-gallery'),function(gallery){
        var stage=gallery.querySelector('.capubbs-gallery-stage');
        var slides=Array.prototype.slice.call(gallery.querySelectorAll('[data-capubbs-gallery-slide="true"]'));
        if(!stage||slides.length===0)return;
        var header=gallery.querySelector('.capubbs-gallery-header');
        if(!header){header=document.createElement('header');header.className='capubbs-gallery-header';gallery.insertBefore(header,stage);}
        if(!header.querySelector('.capubbs-gallery-title')){
          var title=document.createElement('figcaption');title.className='capubbs-gallery-title';header.appendChild(title);
        }
        if(slides.length>1&&!stage.querySelector('[data-capubbs-gallery-action="prev"]'))stage.appendChild(createGalleryNavigationControl('prev','上一张图片'));
        if(slides.length>1&&!stage.querySelector('[data-capubbs-gallery-action="next"]'))stage.appendChild(createGalleryNavigationControl('next','下一张图片'));
        var footer=gallery.querySelector('.capubbs-gallery-footer');
        if(!footer){footer=document.createElement('footer');footer.className='capubbs-gallery-footer';gallery.appendChild(footer);}
        var captionsContainer=footer.querySelector('.capubbs-gallery-captions');
        if(!captionsContainer){captionsContainer=document.createElement('div');captionsContainer.className='capubbs-gallery-captions';footer.insertBefore(captionsContainer,footer.firstChild);}
        var captions=Array.prototype.slice.call(captionsContainer.querySelectorAll('[data-capubbs-gallery-caption="true"]'));
        while(captions.length<slides.length){
          var caption=document.createElement('span');caption.className='capubbs-gallery-caption';caption.setAttribute('data-capubbs-gallery-caption','true');captionsContainer.appendChild(caption);captions.push(caption);
        }
        var count=footer.querySelector('.capubbs-gallery-count');
        if(!count){count=document.createElement('span');count.className='capubbs-gallery-count';footer.appendChild(count);}
        var storedIndex=parseInt(gallery.getAttribute('data-capubbs-gallery-index')||'',10);
        var activeIndex=slides.findIndex(function(slide){return slide.getAttribute('data-capubbs-gallery-active')==='true';});
        var normalizedIndex=activeIndex>=0?activeIndex:(Number.isFinite(storedIndex)&&storedIndex>=0&&storedIndex<slides.length?storedIndex:0);
        setGalleryAttribute(gallery,'data-capubbs-gallery-index',String(normalizedIndex));
        setGalleryAttribute(gallery,'role','region');
        setGalleryAttribute(gallery,'tabindex','0');
        if(!gallery.getAttribute('aria-label'))setGalleryAttribute(gallery,'aria-label','图廊');
        slides.forEach(function(slide,index){setGalleryItemActive(slide,index===normalizedIndex);});
        captions.forEach(function(caption,index){setGalleryItemActive(caption,index===normalizedIndex);});
        setGalleryAttribute(count,'data-capubbs-gallery-current',String(normalizedIndex+1));
        setGalleryAttribute(count,'data-capubbs-gallery-total',String(slides.length));
        setGalleryAttribute(count,'aria-label','第 '+(normalizedIndex+1)+' 张，共 '+slides.length+' 张图片');
      });
    }
    function setGalleryIndex(gallery,nextIndex){
      if(!gallery||!Number.isSafeInteger(nextIndex))return false;
      var slides=Array.prototype.slice.call(gallery.querySelectorAll('[data-capubbs-gallery-slide="true"]'));
      if(slides.length<2||nextIndex<0||nextIndex>=slides.length)return false;
      gallery.setAttribute('data-capubbs-gallery-index',String(nextIndex));
      slides.forEach(function(slide,index){
        var active=index===nextIndex;
        slide.setAttribute('data-capubbs-gallery-active',active?'true':'false');
        slide.setAttribute('aria-hidden',active?'false':'true');
      });
      Array.prototype.forEach.call(gallery.querySelectorAll('[data-capubbs-gallery-caption="true"]'),function(caption,index){
        var active=index===nextIndex;
        caption.setAttribute('data-capubbs-gallery-active',active?'true':'false');
        caption.setAttribute('aria-hidden',active?'false':'true');
      });
      var count=gallery.querySelector('.capubbs-gallery-count');
      if(count){
        count.setAttribute('data-capubbs-gallery-current',String(nextIndex+1));
        count.setAttribute('aria-label','第 '+(nextIndex+1)+' 张，共 '+slides.length+' 张图片');
      }
      queueHeight();
      return true;
    }
    function moveGallery(target,direction){
      var gallery=target&&target.closest?target.closest('.capubbs-gallery'):null;
      if(!gallery)return false;
      var slides=Array.prototype.slice.call(gallery.querySelectorAll('[data-capubbs-gallery-slide="true"]'));
      if(slides.length<2)return false;
      var activeIndex=slides.findIndex(function(slide){return slide.getAttribute('data-capubbs-gallery-active')==='true';});
      var storedIndex=parseInt(gallery.getAttribute('data-capubbs-gallery-index')||'0',10);
      var currentIndex=activeIndex>=0?activeIndex:(Number.isFinite(storedIndex)&&storedIndex>=0&&storedIndex<slides.length?storedIndex:0);
      var nextIndex=(currentIndex+(direction==='next'?1:-1)+slides.length)%slides.length;
      return setGalleryIndex(gallery,nextIndex);
    }
    function syncGalleryIndex(gallery){
      if(!gallery)return false;
      var slides=Array.prototype.slice.call(gallery.querySelectorAll('[data-capubbs-gallery-slide="true"]'));
      var activeIndex=slides.findIndex(function(slide){return slide.getAttribute('data-capubbs-gallery-active')==='true';});
      return activeIndex>=0?setGalleryIndex(gallery,activeIndex):false;
    }
    function handleParentMessage(event){
      var data=event.data;
      if(event.source!==window.parent||!data||data.source!=='${E}'||data.frameId!==frameId)return;
      if(data.type==='jquery-response'){
        loadJqueryAndExecuteUserScripts(data.jquerySource);
        return;
      }
      if(data.type==='image-resource-response'||data.type==='image-resource-error'){
        applyImageResourceResponse(data);
        return;
      }
      if(data.type==='theme'){
        if(data.theme!=='dark'&&data.theme!=='light')return;
        var dark=data.theme==='dark';
        document.documentElement.classList.toggle('dark',dark);
        document.documentElement.classList.toggle('light',!dark);
        document.documentElement.style.colorScheme=data.theme;
        syncGrayscaleTextColors(document.body);
        queueHeight();
        return;
      }
      if(data.type!=='gallery-select')return;
      if(!Number.isSafeInteger(data.galleryId)||!Number.isSafeInteger(data.galleryIndex)||data.galleryId<0||data.galleryIndex<0)return;
      var galleries=Array.prototype.slice.call(document.querySelectorAll('.capubbs-html-frame-root .capubbs-gallery'));
      var gallery=galleries[data.galleryId];
      setGalleryIndex(gallery,data.galleryIndex);
    }
    function handleGalleryClick(event){
      if(event.button!==0)return;
      var actionTarget=event.target&&event.target.closest?event.target.closest('[data-capubbs-gallery-action]'):null;
      var action=actionTarget?actionTarget.getAttribute('data-capubbs-gallery-action'):'';
      if(action!=='prev'&&action!=='next')return;
      if(event.defaultPrevented){
        syncGalleryIndex(actionTarget.closest('.capubbs-gallery'));
        return;
      }
      event.preventDefault();
      event.stopPropagation();
      moveGallery(actionTarget,action);
    }
    function handleGalleryKeyDown(event){
      var actionTarget=event.target&&event.target.closest?event.target.closest('[data-capubbs-gallery-action]'):null;
      var action=actionTarget?actionTarget.getAttribute('data-capubbs-gallery-action'):'';
      if((event.key==='Enter'||event.key===' ')&&(action==='prev'||action==='next')){
        event.preventDefault();
        moveGallery(actionTarget,action);
        return;
      }
      if(event.key!=='ArrowLeft'&&event.key!=='ArrowRight')return;
      var gallery=event.target&&event.target.closest?event.target.closest('.capubbs-gallery'):null;
      if(!gallery)return;
      if(event.defaultPrevented){
        syncGalleryIndex(gallery);
        return;
      }
      event.preventDefault();
      moveGallery(gallery,event.key==='ArrowLeft'?'prev':'next');
    }
    function init(){
      var contentRoot=document.querySelector('.capubbs-html-frame-root');
      if(contentRoot){
        var disposePunishmentTableFit=preparePunishmentTableFit(contentRoot);
        window.addEventListener('unload',disposePunishmentTableFit,{once:true});
      }
      if(window.ResizeObserver&&contentRoot)new ResizeObserver(queueHeight).observe(contentRoot);
      if(window.MutationObserver&&contentRoot)new MutationObserver(function(){queueHeight();requestImageResources();prepareImages();prepareGalleries();syncGrayscaleTextColors(contentRoot);}).observe(contentRoot,{attributes:true,characterData:true,childList:true,subtree:true});
      window.addEventListener('load',queueHeight);
      window.addEventListener('resize',queueHeight);
      document.addEventListener('scroll',queueHeight,true);
      document.addEventListener('toggle',queueHeight,true);
      window.addEventListener('unload',revokeImageResourceObjectUrls);
      document.addEventListener('transitionend',queueHeight);
      document.addEventListener('animationend',queueHeight);
      document.addEventListener('selectionchange',queueSelection);
      document.addEventListener('click',handleGalleryClick);
      document.addEventListener('keydown',handleGalleryKeyDown);
      window.addEventListener('message',handleParentMessage);
      document.addEventListener('click',handleImageClick);
      document.addEventListener('keydown',handleImageKeyDown);
      document.addEventListener('click',handleForumNavigationClick);
      if(document.fonts&&document.fonts.ready)document.fonts.ready.then(queueHeight);
      if(needsJquery)window.parent.postMessage({source:'${E}',type:'jquery-request',frameId:frameId},'*');
      else executeUserScripts();
      prepareImages();
      prepareGalleries();
      requestImageResources();
      syncGrayscaleTextColors(contentRoot);
      queueHeight();
    }
    if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
  }());`}function Mr(e){return e.replace(/<script\b([^>]*)>/gi,(t,r)=>`<script${r.replace(/\s+type\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)/gi,"")} type="text/capubbs-user-script">`)}function Pr(e){if(!/<(?:img|iframe)\b/i.test(e))return e;const t=document.createElement("template");return t.innerHTML=e,t.content.querySelectorAll("iframe[src]").forEach(r=>{const o=we(r.getAttribute("src")??"",Ie());o&&(r.dataset.capubbsPlayerSrc=o,r.removeAttribute("src"))}),t.content.querySelectorAll("img[src]").forEach(r=>{const o=r.getAttribute("src")?.trim()??"";!o||/^(?:blob:|data:)/i.test(o)||(r.dataset.capubbsImageResourceSrc=o,r.setAttribute("fetchpriority","low"),r.removeAttribute("src"),r.removeAttribute("srcset"),r.closest("picture")?.querySelectorAll("source[srcset]").forEach(n=>{n.removeAttribute("srcset")}))}),t.innerHTML}function De(){return oe||(oe=fetch(Xe,{credentials:"same-origin"}).then(e=>{if(!e.ok)throw new Error(`Failed to load jQuery: ${e.status}`);return e.text()}).catch(()=>null),oe)}function Fr(){return["default-src 'none'","script-src 'unsafe-inline' http: https: data: blob:","style-src 'unsafe-inline' http: https:","img-src http: https: data: blob:","media-src http: https: data: blob:","font-src http: https: data: blob:","frame-src http: https: data: blob:","child-src http: https: data: blob:","connect-src 'none'","object-src 'none'","form-action 'none'","upgrade-insecure-requests"].join("; ")}function Ie(){return new URL("/bbs/content/",window.location.origin).href}function zr(e){return e.replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function Or(e){return e.replace(/<\/style/gi,"<\\/style")}function Dr(e){if(!e||typeof e!="object")return!1;const t=e;if(t.source!==E||typeof t.frameId!="string")return!1;if(t.type==="image-quote"){const r=t.image;if(!r||typeof r.src!="string"||typeof r.title!="string"||typeof r.caption!="string")return!1;try{return["http:","https:"].includes(new URL(r.src).protocol)}catch{return!1}}return t.type==="embedded-player-layout"?Array.isArray(t.players)&&t.players.every(xr):t.type==="document-request"?typeof t.token=="string":t.type==="anchor"?typeof t.offsetTop=="number"&&Number.isFinite(t.offsetTop)&&t.offsetTop>=0:t.type==="navigate"?typeof t.url=="string":t.type==="jquery-request"?!0:t.type==="image-resource-request"||t.type==="image-resource-layout"?typeof t.requestId=="string"&&t.requestId.length>0&&Array.isArray(t.bounds)&&t.bounds.every(r=>r&&(r.gallery===void 0||["current","adjacent","deferred"].includes(r.gallery))&&["top","bottom","left","right"].every(o=>typeof r[o]=="number"&&Number.isFinite(r[o])))&&(t.type==="image-resource-layout"||"url"in t&&typeof t.url=="string"&&t.url.length>0):t.type==="selection"?typeof t.text=="string":t.type==="image-open"?typeof t.imageIndex=="number"&&Number.isSafeInteger(t.imageIndex)&&Array.isArray(t.images)&&t.images.length>0&&t.imageIndex>=0&&t.imageIndex<t.images.length&&t.images.every(r=>!!r&&typeof r=="object"&&typeof r.alt=="string"&&typeof r.elementIndex=="number"&&Number.isSafeInteger(r.elementIndex)&&r.elementIndex>=0&&typeof r.src=="string"&&r.src.length>0&&(r.galleryId===void 0&&r.galleryIndex===void 0||typeof r.galleryId=="number"&&Number.isSafeInteger(r.galleryId)&&r.galleryId>=0&&typeof r.galleryIndex=="number"&&Number.isSafeInteger(r.galleryIndex)&&r.galleryIndex>=0)):t.type==="resize"&&typeof t.height=="number"&&Number.isFinite(t.height)}function Hr(){const[e,t]=d.useState(()=>document.documentElement.classList.contains("dark"));return d.useEffect(()=>{const r=document.documentElement,o=()=>t(r.classList.contains("dark")),n=new MutationObserver(o);return n.observe(r,{attributeFilter:["class"],attributes:!0}),()=>n.disconnect()},[]),e}function Ur({attachments:e=[],bodyClassName:t="thread-floor-body",bodyFallback:r=null,bodyHtml:o,floor:n,isActivitySignupCanceled:l=!1,onImageOpen:i,onImageQuote:s,onIsolatedTextSelection:u,signatureClassName:g="thread-signature",signatureHtml:m,signatureText:h}){const b=i?(v,c,p,x)=>{const I=v[c];I&&i([I],0,p,x?()=>x(c):void 0)}:void 0;return a.jsxs(a.Fragment,{children:[o?a.jsx(Oe,{className:t,floor:n,html:o,isActivitySignupCanceled:l,onImageOpen:i,onImageQuote:s,onIsolatedTextSelection:u,variant:"floor"}):r,a.jsx(Gr,{attachments:e}),m?a.jsx(Oe,{className:g,floor:n,html:m,onImageOpen:b,variant:"signature"}):h?a.jsx("footer",{className:g,children:a.jsx("p",{children:h})}):null]})}function Gr({attachments:e}){return e.length===0?null:a.jsxs("section",{"aria-label":"附件",className:"thread-attachments",children:[a.jsxs("header",{className:"thread-attachments-heading",children:[a.jsx(zt,{"aria-hidden":"true",size:14}),a.jsx("span",{children:"附件"}),a.jsx("small",{children:e.length})]}),a.jsx("ul",{children:e.map(t=>{const r=a.jsxs(a.Fragment,{children:[a.jsx("span",{className:"thread-attachment-name",children:t.name}),a.jsx("small",{children:_r(t)}),t.exists!==!1&&a.jsx(Et,{"aria-hidden":"true",size:15})]});return a.jsx("li",{children:t.exists===!1?a.jsx("div",{"aria-disabled":"true",className:"thread-attachment-link is-unavailable",children:r}):a.jsx("a",{className:"thread-attachment-link",download:t.name,href:t.downloadHref||`/bbs/download/?id=${encodeURIComponent(t.id)}`,children:r})},t.id)})})]})}function _r(e){if(e.exists===!1)return"文件不可用";const t=[Br(e.size),(e.price??0)>0?"付费附件":"免费"];return e.downloadCount!==void 0&&t.push(`下载 ${e.downloadCount} 次`),t.join(" · ")}function Br(e){if(e<=0)return"大小未知";if(e<1024)return`${e} B`;const t=["KB","MB","GB","TB"];let r=e,o=-1;do r/=1024,o+=1;while(r>=1024&&o<t.length-1);return`${r.toFixed(r>=10?1:2)} ${t[o]}`}function Wr({author:e,id:t}){const r=e.tags??[],[o,n]=d.useState(!1),l=d.useRef(null),i=d.useRef(null),s=d.useRef(null),u=d.useRef(null),g=r.map(m=>`${m.id}:${m.name}`).join("|");return d.useLayoutEffect(()=>{if(r.length===0){n(!1);return}const m=()=>{const b=l.current,v=i.current,c=s.current,p=u.current;if(!b||!v||!c||!p||b.offsetWidth===0)return;const x=c.getBoundingClientRect().width,I=p.getBoundingClientRect().width,w=Number.parseFloat(getComputedStyle(v).columnGap)||0,L=v.clientWidth-x-w,N=I>L+1;n(P=>P===N?P:N)};m();const h=new ResizeObserver(m);return[l.current,i.current,u.current].forEach(b=>{b&&h.observe(b)}),()=>h.disconnect()},[g,r.length]),a.jsxs("div",{id:t,ref:l,className:"author-hover-card",role:"dialog","aria-label":`${e.name} 的用户摘要`,children:[a.jsxs("div",{className:"author-card-head",children:[a.jsx("img",{src:e.avatar,alt:""}),a.jsxs("div",{className:"author-card-head-copy",children:[a.jsxs("div",{ref:i,className:"author-card-name-line","data-tags-overflow":o?"true":void 0,children:[a.jsx("strong",{ref:s,children:e.name}),a.jsx("div",{className:"author-card-tag-slot",children:a.jsx(ce,{size:"compact",tags:r})})]}),(e.stars>0||e.role)&&a.jsxs("span",{className:"author-card-status",children:["★".repeat(e.stars),e.stars>0&&e.role?" · ":"",e.role]})]})]}),o?a.jsx("div",{className:"author-card-tags-row",children:a.jsx(ce,{size:"compact",tags:r})}):null,e.medals?.length?a.jsx("div",{className:"author-card-medals",children:a.jsx(Be,{medals:e.medals,profileName:e.name,variant:"compact"})}):null,a.jsx("div",{ref:u,className:"author-card-tag-width-measure","aria-hidden":"true",children:a.jsx(ce,{size:"compact",tags:r})}),a.jsxs("dl",{children:[a.jsxs("div",{children:[a.jsx("dt",{children:"主题"}),a.jsx("dd",{children:e.topics})]}),a.jsxs("div",{children:[a.jsx("dt",{children:"回复"}),a.jsx("dd",{children:e.replies})]}),a.jsxs("div",{children:[a.jsx("dt",{children:"签到"}),a.jsx("dd",{children:e.checkins})]})]}),a.jsxs("p",{children:["最近在线：",e.lastSeen]}),a.jsxs("a",{href:te(e.name),children:["查看个人主页 ",a.jsx(Tt,{size:13})]})]})}function Vr({author:e}){const t=e.tags??[],r=_e(t),o=te(e.name);return a.jsxs("aside",{className:"thread-author-profile","aria-label":`${e.name} 的资料`,children:[a.jsx("a",{"aria-label":`查看${e.name}的个人主页`,className:"thread-author-profile-avatar",href:o,children:a.jsx("img",{src:e.avatar,alt:""})}),a.jsx("div",{className:"thread-author-profile-identity",children:a.jsx("a",{href:o,children:e.name})}),(e.stars>0||e.role)&&a.jsxs("div",{className:"thread-author-profile-status",children:[e.stars>0&&a.jsx("span",{"aria-label":`${e.stars} 星`,children:"★".repeat(e.stars)}),e.role&&a.jsx("strong",{children:e.role})]}),a.jsx(Ge,{tags:r}),a.jsx(Be,{medals:e.medals??[],profileName:e.name,variant:"compact"}),a.jsxs("dl",{className:"thread-author-profile-stats",children:[a.jsxs("div",{children:[a.jsx("dt",{children:"主题"}),a.jsx("dd",{children:e.topics})]}),a.jsxs("div",{children:[a.jsx("dt",{children:"回复"}),a.jsx("dd",{children:e.replies})]}),a.jsxs("div",{children:[a.jsx("dt",{children:"签到"}),a.jsx("dd",{children:e.checkins})]})]}),a.jsxs("p",{className:"thread-author-profile-last-seen",children:[a.jsx("span",{children:"最近在线"}),a.jsx("strong",{children:e.lastSeen})]})]})}function ye(e){return e.replace(/^(\d{4})年(\d{2})月(\d{2})日\s+(\d{2})时(\d{2})分(\d{2})秒$/,"$1-$2-$3 $4:$5:$6")}function Jr(e){const t=window.getSelection()?.toString();t&&(e.preventDefault(),e.clipboardData.setData("text/plain",t))}function Kr({articleAfterContent:e,author:t,avatarRail:r,className:o="",content:n,decorationImageSrc:l,editedAt:i,floor:s,floorIndex:u,id:g,inlineAvatar:m=!1,mainAfterContent:h,onCopy:b,publishedAt:v,showAuthorProfile:c}){const p=t.tags??[],x=_e(p);return a.jsxs("article",{className:`forum-card thread-floor${c?" thread-floor-with-author-profile":""}${o?` ${o}`:""}`,"data-floor":s,id:g,onCopy:b,children:[l&&a.jsx("span",{"aria-hidden":"true",className:"thread-floor-decoration",children:a.jsx("img",{alt:"",src:l})}),c?a.jsx(Vr,{author:t}):!m&&r,a.jsxs("div",{className:"thread-floor-main",children:[a.jsxs("header",{className:"thread-floor-header",children:[!c&&m&&r,a.jsxs("div",{className:"thread-floor-author",children:[a.jsx("a",{href:te(t.name),children:t.name}),a.jsx(Ge,{tags:x})]}),a.jsxs("div",{className:"thread-floor-time",children:[a.jsx("time",{children:ye(v)}),i&&a.jsxs(a.Fragment,{children:[a.jsx("span",{children:"·"}),a.jsxs("time",{children:["编辑于 ",ye(i)]})]})]}),u]}),c?a.jsx("div",{className:"thread-floor-content",children:n}):n,h]}),e]})}function Yr({canDelete:e,canEdit:t,canQuote:r,canReply:o,decorative:n=!1,deleting:l=!1,editHref:i="",onDelete:s,onEditSignup:u,onQuote:g,onReply:m}){const h=n?-1:void 0,b=d.useRef(null);return a.jsxs("div",{"aria-hidden":n||void 0,className:`thread-floor-actions${n?" thread-floor-actions-decorative":""}`,children:[r&&a.jsxs("button",{onClick:v=>{const c=b.current?b.current.text:He(v.currentTarget);b.current=null,g?.(c)},onPointerDown:v=>{v.button===0&&(b.current={text:He(v.currentTarget)})},tabIndex:h,type:"button",children:[a.jsx(Nt,{size:15}),"引用"]}),u&&!n&&a.jsxs("button",{onClick:u,type:"button",children:[a.jsx(de,{size:15}),"编辑报名"]}),o&&a.jsxs("button",{onClick:m,tabIndex:h,type:"button",children:[a.jsx(Kt,{size:15}),"回复"]}),t&&(n?a.jsxs("button",{tabIndex:-1,type:"button",children:[a.jsx(de,{size:15}),"编辑"]}):a.jsxs("a",{href:i,children:[a.jsx(de,{size:15}),"编辑"]})),e&&a.jsxs("button",{"aria-busy":l||void 0,className:"floor-action-danger",disabled:!n&&l,onClick:n?void 0:v=>s?.(v.currentTarget),tabIndex:h,type:"button",children:[a.jsx(ve,{size:15}),l?"删除中":"删除"]})]})}function ca({canQuote:e,canReply:t,decorationImageSrc:r,editHref:o,floor:n,isActivityThread:l,isMainPost:i,locked:s,inlineAvatar:u,showAuthorProfile:g,hideSignature:m,onDeleteFloor:h,onDeleteNestedReply:b,onEditSignup:v,onIsolatedTextSelection:c,onQuote:p,onSubmitNestedReply:x,viewer:I}){const[w,L]=d.useState(!1),[N,P]=d.useState(null),[X,C]=d.useState([]),[$,q]=d.useState(""),[Y,M]=d.useState(!1),[Q,W]=d.useState([]),[G,_]=d.useState(""),[ae,B]=d.useState(""),[k,z]=d.useState(null),[Z,y]=d.useState(""),[U,S]=d.useState(!1),[R,T]=d.useState(void 0),A=or(G),O=Ct(":scope > article"),F=`nested-reply-count-${n.id}`,[V,Ae]=d.useState(null),[ne,Se]=d.useState(!1),ke=d.useRef(null),ee=d.useRef(null),ie=d.useRef(null),Re=d.useRef(null),Ee=d.useRef(null),Ce=d.useMemo(()=>[...n.nestedReplies??[],...Q].filter(f=>!X.includes(f.id)),[X,n.nestedReplies,Q]),je=l&&!i&&/<\s*(?:s|strike)\b/i.test(n.contentHtml??""),qe=`thread-floor-body${je?" capubbs-activity-signup-canceled":""}`;d.useEffect(()=>()=>{ee.current!==null&&window.clearTimeout(ee.current)},[]),d.useEffect(()=>{if(!ne)return;function f(j){ke.current?.contains(j.target)||Se(!1)}return document.addEventListener("pointerdown",f),()=>document.removeEventListener("pointerdown",f)},[ne]);async function Ze(){const f=`${window.location.origin}${window.location.pathname}${window.location.search}#${n.floor}`;await ar(f)&&(L(!0),ee.current!==null&&window.clearTimeout(ee.current),ee.current=window.setTimeout(()=>L(!1),1800))}const Ne=(f,j,D,le)=>{Ee.current=D,Ae({imageIndex:j,images:f,onImageChange:le})};function et(f){V?.onImageChange?.(f),Ae(null),window.requestAnimationFrame(()=>Ee.current?.focus())}function Te(f=null){T(f),_(""),B(""),y(""),window.requestAnimationFrame(()=>Re.current?.focus())}function Le(){T(void 0),_(""),y("")}async function tt(f){f.preventDefault();const j=G.trim();if(!(!A.canSubmit||!I||!t||U)){S(!0),y("");try{const D=await x(n,R??null,j);W(le=>[...le,{author:I,canDelete:!0,content:j,id:D>0?String(D):`local-${n.id}-${Date.now()}`,publishedAt:Zr(new Date),target:R??void 0}]),Le()}catch(D){y(D instanceof Error?D.message:"楼中楼回复发布失败，请稍后重试。")}finally{S(!1)}}}async function rt(f){z(f.id),B("");try{await b(n,f),C(j=>[...j,f.id]),W(j=>j.filter(D=>D.id!==f.id)),P(null)}catch(j){B(j instanceof Error?j.message:"楼中楼删除失败，请稍后重试。")}finally{z(null)}}async function at(){if(!Y){M(!0),q("");try{await h(n)}catch(f){q(f instanceof Error?f.message:"楼层删除失败，请稍后重试。"),M(!1)}}}function nt(){P(null),q(""),B(""),window.requestAnimationFrame(()=>ie.current?.focus())}function ot(){if(s||!N)return;const f=N;P(null),f.kind==="floor"?at():rt(f.reply)}const st=a.jsxs("div",{className:`thread-avatar-rail${ne?" thread-avatar-rail-open":""}`,ref:ke,children:[a.jsx("button",{"aria-controls":`author-card-${n.floor}`,"aria-expanded":ne,"aria-label":`查看${n.author.name}的资料卡`,className:"thread-avatar-button",onClick:()=>Se(f=>!f),type:"button",children:a.jsx("img",{src:n.author.avatar,alt:""})}),a.jsx(Wr,{author:n.author,id:`author-card-${n.floor}`})]}),it=a.jsx(Ur,{attachments:n.attachments,bodyFallback:a.jsx("div",{className:qe,children:n.paragraphs.map(f=>a.jsx("p",{children:f},f))}),bodyClassName:qe,bodyHtml:n.contentHtml,floor:n.floor,isActivitySignupCanceled:je,onImageOpen:Ne,onImageQuote:e?f=>p(n,void 0,f):void 0,onIsolatedTextSelection:f=>c(n,f),signatureHtml:m?void 0:n.signatureHtml,signatureText:m?void 0:n.signature}),lt=a.jsxs("button",{"aria-label":`复制第 ${n.floor} 楼链接`,className:"thread-floor-index",onClick:Ze,title:"复制楼层链接",type:"button",children:["#",n.floor]}),ct=a.jsxs(a.Fragment,{children:[a.jsx(Yr,{canDelete:!s&&(!l||i)&&(n.canDelete??n.isOwn??!1),canEdit:!s&&(!l||i)&&!!n.isOwn,canQuote:e,canReply:t,deleting:Y,editHref:o,onEditSignup:!s&&l&&!i&&n.isOwn?v:void 0,onDelete:f=>{ie.current=f,q(""),P({kind:"floor"})},onQuote:f=>p(n,f),onReply:()=>Te()}),$&&a.jsx("p",{className:"thread-floor-delete-error",role:"alert",children:$}),Ce.length>0&&a.jsx("section",{className:"nested-replies",ref:O,"aria-label":`${n.floor} 楼的楼中楼回复`,children:Ce.map(f=>a.jsxs("article",{children:[a.jsx("img",{src:f.author.avatar,alt:""}),a.jsxs("div",{className:"nested-reply-main",children:[a.jsxs("div",{className:"nested-reply-identity",children:[a.jsx("a",{className:"nested-reply-author",href:te(f.author.name),children:f.author.name}),f.target&&a.jsxs("span",{className:"nested-reply-target",children:[" ","回复"," ",a.jsx("a",{className:"nested-reply-author",href:te(f.target),children:f.target})]})]}),f.contentHtml?a.jsx(Ke,{className:"nested-reply-content",html:f.contentHtml,onImageOpen:Ne,variant:"nested"}):a.jsx("p",{children:f.content}),a.jsxs("footer",{className:"nested-reply-footer",children:[a.jsx("time",{children:ye(f.publishedAt)}),t&&a.jsx("button",{onClick:()=>Te(f.author.name),type:"button",children:"回复"}),!s&&f.canDelete&&a.jsxs("button",{className:"nested-reply-delete",disabled:k===f.id,onClick:j=>{ie.current=j.currentTarget,B(""),P({kind:"nested",reply:f})},type:"button",children:[a.jsx(ve,{size:12}),k===f.id?"删除中":"删除"]})]})]})]},f.id))}),ae&&a.jsx("p",{className:"nested-reply-delete-error",role:"alert",children:ae}),R!==void 0&&t&&a.jsxs("form",{className:"nested-reply-composer",onSubmit:tt,children:[a.jsxs("div",{className:"nested-reply-input-field",children:[a.jsx("textarea",{"aria-describedby":F,"aria-invalid":A.isOverLimit||void 0,"aria-label":R?`回复 @${R}`:`回复第 ${n.floor} 楼`,onChange:f=>{_(f.target.value),y("")},placeholder:R?`回复 @${R}`:"写一条楼中楼回复",ref:Re,rows:2,value:G}),a.jsxs("small",{"aria-label":`已输入 ${A.length} 字，最多 ${A.limit} 字`,className:`nested-reply-character-count${A.isOverLimit?" nested-reply-character-count-error":""}`,id:F,children:[A.length," / ",A.limit]})]}),a.jsxs("div",{className:"nested-reply-composer-actions",children:[a.jsx("button",{"aria-label":"取消楼中楼回复",className:"nested-reply-cancel",disabled:U,onClick:Le,type:"button",children:a.jsx(xe,{size:15})}),a.jsxs("button",{className:"nested-reply-submit",disabled:!A.canSubmit||U,type:"submit",children:[a.jsx(jt,{size:14}),U?"发送中":"发送"]})]}),Z&&a.jsx("p",{className:"nested-reply-error",role:"alert",children:Z})]})]}),ut=a.jsxs(a.Fragment,{children:[w&&a.jsxs("div",{"aria-live":"polite",className:"copy-floor-toast",role:"status",children:[a.jsx(qt,{"aria-hidden":"true",size:15}),"已复制楼层链接"]}),a.jsx(he,{children:V&&a.jsx(Ot,{images:V.images,initialImageIndex:V.imageIndex,onImageChange:V.onImageChange,onClose:et})}),a.jsx(he,{mobileSize:"compact",children:!s&&N&&a.jsx(Qr,{floor:n,isMainPost:i,onCancel:nt,onConfirm:ot,target:N})})]});return a.jsx(Kr,{articleAfterContent:ut,author:n.author,avatarRail:st,content:it,decorationImageSrc:r,editedAt:n.editedAt,floor:n.floor,floorIndex:lt,id:String(n.floor),inlineAvatar:u,mainAfterContent:ct,onCopy:Jr,publishedAt:n.publishedAt,showAuthorProfile:g})}function He(e){const t=e.closest(".thread-floor")?.querySelector(".thread-floor-body");return _t(window.getSelection(),t??null)}function Qr({floor:e,isMainPost:t,onCancel:r,onConfirm:o,target:n}){const l=n.kind==="nested"?n.reply:null,i=l?"删除楼中楼回复":t?"删除主楼":"删除回复",s=l?"":t?"删除主楼后，下一楼将顺位成为主楼；如果没有其他回复，整个主题会被删除。":"删除后，该楼内容将移入回收站，后续楼层编号会顺次调整。",u=l?.author.name??e.author.name,g=l?`#${e.floor} · 楼中楼`:`#${e.floor}`,m=Xr(l?.content||e.quoteText||e.paragraphs[0]||"");return d.useEffect(()=>(document.body.classList.add("thread-delete-dialog-open"),()=>document.body.classList.remove("thread-delete-dialog-open")),[]),d.useEffect(()=>{function h(b){b.key==="Escape"&&r()}return document.addEventListener("keydown",h),()=>document.removeEventListener("keydown",h)},[r]),a.jsx(Ue,{className:"thread-delete-dialog-backdrop",onMouseDown:h=>{h.currentTarget===h.target&&r()},role:"presentation",children:a.jsxs("section",{"aria-describedby":s?"thread-delete-dialog-description":void 0,"aria-labelledby":"thread-delete-dialog-title","aria-modal":"true",className:"thread-delete-dialog",role:"dialog",children:[a.jsxs("header",{children:[a.jsx("span",{className:"thread-delete-dialog-icon","aria-hidden":"true",children:a.jsx(Vt,{size:19})}),a.jsx("div",{children:a.jsx("h2",{id:"thread-delete-dialog-title",children:i})}),a.jsx("button",{"aria-label":"关闭删除确认",onClick:r,type:"button",children:a.jsx(xe,{size:18})})]}),a.jsxs("div",{className:"thread-delete-dialog-body",children:[s&&a.jsx("p",{id:"thread-delete-dialog-description",children:s}),a.jsxs("div",{className:"thread-delete-dialog-target",children:[a.jsxs("span",{children:[u," · ",g]}),a.jsx("p",{children:m||"此回复没有可预览的文字内容。"})]})]}),a.jsxs("footer",{children:[a.jsx("button",{autoFocus:!0,className:"thread-delete-dialog-cancel",onClick:r,type:"button",children:"取消"}),a.jsxs("button",{className:"thread-delete-dialog-confirm",onClick:o,type:"button",children:[a.jsx(ve,{size:15}),"确认删除"]})]})]})})}function Xr(e){const t=e.replace(/\s+/g," ").trim();return t.length>100?`${t.slice(0,100).trimEnd()}…`:t}function Zr(e){const t=r=>String(r).padStart(2,"0");return`${e.getFullYear()}-${t(e.getMonth()+1)}-${t(e.getDate())} ${t(e.getHours())}:${t(e.getMinutes())}:${t(e.getSeconds())}`}export{Ur as T,la as a,Kr as b,Yr as c,ca as d,ia as f,Qt as p,ar as w};
