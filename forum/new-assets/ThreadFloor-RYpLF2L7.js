import{E as mt,r as u,a0 as pt,j as a,$ as Ue,a3 as xe,ao as gt,c4 as ft,c5 as ht,O as he,c6 as bt,bd as yt,b5 as xt,aj as vt,b7 as wt,c7 as It,c8 as At,c9 as St,ca as kt,cb as Rt,cc as Et,a2 as jt,u as Ct,Z as te,n as ve,M as qt,a5 as Nt,cd as Ge,bZ as Tt,aC as ce,bU as Lt}from"./index-D-fuTvR7.js";import{e as $t,f as Mt,h as $e,m as ue,s as Pt,r as Ft,i as zt,P as Ot,T as Dt,a as _e,b as Be}from"./RichTextEditor.gallery-CFCN-oSc.js";import{b as Ht,a as Ut,r as Gt,t as _t,g as Bt}from"./forumMarkup-D8MAUR8j.js";import{l as Wt}from"./thread-BfnY_6BB.js";import{f as Vt}from"./dataDisplay-CHJBTkUt.js";import{P as de}from"./pencil-BDmm2eK-.js";import{T as Jt}from"./triangle-alert-Bc7802Ww.js";const Kt=[["path",{d:"M20 18v-2a4 4 0 0 0-4-4H4",key:"5vmcpk"}],["path",{d:"m9 17-5-5 5-5",key:"nvlc11"}]],Yt=mt("reply",Kt),Qt={black:0,darkgray:169,darkgrey:169,dimgray:105,dimgrey:105,gainsboro:220,gray:128,grey:128,lightgray:211,lightgrey:211,silver:192,white:255,whitesmoke:245},me="data-capubbs-original-grayscale-color-attr",pe="data-capubbs-original-grayscale-style-color";function Xt(e){const t=String(e??"").trim().toLowerCase().replace(/^['"]|['"]$/g,""),r=t.replace(/\s+/g,""),o=Qt[r];if(typeof o=="number")return{alpha:1,channel:o};const n=r.match(/^#?([0-9a-f]{3}|[0-9a-f]{4}|[0-9a-f]{6}|[0-9a-f]{8})$/);if(n){const m=n[1].length<=4?n[1].split("").map(h=>`${h}${h}`).join(""):n[1],p=Number.parseInt(m.slice(0,2),16),b=Number.parseInt(m.slice(2,4),16),x=Number.parseInt(m.slice(4,6),16),c=m.length===8?Number.parseInt(m.slice(6,8),16)/255:1;return p===b&&b===x?{alpha:c,channel:p}:null}const i=t.match(/^rgba?\(\s*(\d{1,3}(?:\.\d+)?%?)(?:\s*,\s*|\s+)(\d{1,3}(?:\.\d+)?%?)(?:\s*,\s*|\s+)(\d{1,3}(?:\.\d+)?%?)(?:\s*(?:,|\/)\s*([01](?:\.\d+)?|\.\d+|100%|\d{1,3}(?:\.\d+)?%))?\s*\)$/);if(!i)return null;const s=ge(i[1]),l=ge(i[2]),d=ge(i[3]),f=rr(i[4]);return s===null||l===null||d===null||f===null?null:s===l&&l===d?{alpha:f,channel:s}:null}function We(e,t=!0){const r=Xt(e);if(!r)return null;const o=255-r.channel;if(t&&r.alpha<1)return`rgba(${o}, ${o}, ${o}, ${ar(r.alpha)})`;const n=o.toString(16).padStart(2,"0");return`#${n}${n}${n}`}function Zt(e,t){[...e.matches("[color], [style]")?[e]:[],...Array.from(e.querySelectorAll("[color], [style]"))].forEach(o=>{er(o,t),o instanceof HTMLElement&&tr(o,t)})}function er(e,t){const r=e.getAttribute(me);if(t==="light"){if(r===null)return;e.setAttribute("color",r),e.removeAttribute(me);return}const o=r??e.getAttribute("color"),n=We(o,!1);!n||o===null||(r===null&&e.setAttribute(me,o),e.getAttribute("color")!==n&&e.setAttribute("color",n))}function tr(e,t){const r=e.getAttribute(pe);if(t==="light"){if(r===null)return;e.style.setProperty("color",r,e.style.getPropertyPriority("color")),e.removeAttribute(pe);return}const o=r??e.style.getPropertyValue("color"),n=We(o);!n||!o||(r===null&&e.setAttribute(pe,o),e.style.getPropertyValue("color")!==n&&e.style.setProperty("color",n,e.style.getPropertyPriority("color")))}function ge(e){const t=e.endsWith("%"),r=Number(t?e.slice(0,-1):e);return Number.isFinite(r)?t?r>=0&&r<=100?Math.round(r*2.55):null:r>=0&&r<=255?Math.round(r):null:null}function rr(e){if(e===void 0)return 1;const t=e.endsWith("%"),r=Number(t?e.slice(0,-1):e);return Number.isFinite(r)?t?r>=0&&r<=100?r/100:null:r>=0&&r<=1?r:null:null}function ar(e){return Number(e.toFixed(3))}async function nr(e){try{if(navigator.clipboard?.writeText)return await navigator.clipboard.writeText(e),!0}catch{}const t=document.createElement("textarea");t.value=e,t.setAttribute("readonly",""),t.style.position="fixed",t.style.opacity="0",document.body.appendChild(t),t.select();try{return document.execCommand("copy")}finally{t.remove()}}const or=400;function la(e,t){return t?`回复 @${t}：${e}`:e}function sr(e){const t=Array.from(e).length,r=or,o=t>r;return{canSubmit:!!e.trim()&&!o,isOverLimit:o,length:t,limit:r}}function Ve(e,t){e.querySelectorAll(".capubbs-gallery").forEach(r=>{const o=r.querySelector(".capubbs-gallery-stage");if(!o||o.querySelector(".capubbs-gallery-quote"))return;const n=r.ownerDocument.createElement("button");n.type="button",n.className="capubbs-gallery-quote",n.innerHTML='<svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z"/><path d="M5 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z"/></svg><span>引用</span>',n.setAttribute("aria-label","引用图片"),n.addEventListener("click",i=>{i.preventDefault(),i.stopPropagation();const s=Array.from(r.querySelectorAll('[data-capubbs-gallery-slide="true"]')),l=s.findIndex(x=>x.getAttribute("data-capubbs-gallery-active")==="true"),d=l>=0?l:0,f=s[d]?.querySelector("img");if(!f)return;const m=f.getAttribute("data-capubbs-image-resource-src")||f.getAttribute("data-capubbs-gallery-src")||f.getAttribute("src");if(!m)return;let p;try{p=new URL(m,f.baseURI)}catch{return}if(!["http:","https:"].includes(p.protocol))return;const b=r.querySelectorAll('[data-capubbs-gallery-caption="true"]');t({src:p.href,title:r.querySelector(".capubbs-gallery-title")?.textContent?.trim()??"",caption:b[d]?.textContent?.trim()??""})}),o.appendChild(n)})}function ca(e,t,r){let o;try{o=new URL(t.src)}catch{return e}if(!["http:","https:"].includes(o.protocol))return e;const n=[t.title.trim(),t.caption.trim()].filter(Boolean).join("-"),i=n?`【${n}】`:"",s=m=>m.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;"),l=`<p class="capubbs-floor-quote-content"><img src="${s(o.href)}" alt=""></p>${i?`<p class="capubbs-floor-quote-content">${s(i)}</p>`:""}`,d=o.href.replace(/[<>\\]/g,m=>encodeURIComponent(m)),f=i.replace(/([\\`*_{}\[\]()#+.!|>~-])/g,"\\$1");return Ht(e,r,{html:l,markdown:`![](<${d}>)${f?`

${f}`:""}`})}const ir='<svg aria-hidden="true" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 3h6v6"/><path d="m21 3-7 7"/><path d="m3 21 7-7"/><path d="M9 21H3v-6"/></svg>';function lr(e){const t=e.createElement("button");return t.type="button",t.className="forum-table-expand",t.dataset.forumTableExpand="true",t.setAttribute("aria-label","放大表格"),t.title="放大表格",t.innerHTML=ir,t}function cr(e){return e instanceof Element?e.closest('[data-forum-table-expand="true"]')?.closest(".forum-table-viewport")?.querySelector("table.forum-data-table")??null:null}function ur(e){const t=[];return e.querySelectorAll("table").forEach(r=>{if(r.classList.contains("forum-punishment-table")||r.parentElement?.closest("table")||r.querySelector("table")||r.rows.length<2||!Array.from(r.rows).some(s=>s.cells.length>1))return;let o=r.parentElement;if(!o?.classList.contains("forum-table-scroll")){o=r.ownerDocument.createElement("div"),o.className="forum-table-scroll",o.tabIndex=0,r.before(o),o.append(r),r.classList.add("forum-data-table");let s=[],l=null;Array.from(r.rows).forEach((d,f)=>{l!==d.parentElement&&(l=d.parentElement,s=[]);let m=0;Array.from(d.cells).forEach(p=>{for(;(s[m]??0)>0;)m+=1;m===0&&p.colSpan===1&&p.classList.add("forum-table-first-column"),f===0&&!r.tHead&&p.classList.add("forum-table-heading");const b=p.rowSpan===0?r.rows.length:p.rowSpan;for(let c=0;c<p.colSpan;c+=1)s[m+c]=b;m+=p.colSpan;const x=r.ownerDocument.createElement("div");for(x.className="forum-table-cell-content";p.firstChild;)x.append(p.firstChild);p.append(x)}),s=s.map(p=>Math.max(0,p-1))})}const n=o;let i=n.parentElement;i?.classList.contains("forum-table-viewport")||(i=r.ownerDocument.createElement("div"),i.className="forum-table-viewport",n.before(i),i.append(n)),i.querySelector(":scope > .forum-table-expand")||i.append(lr(r.ownerDocument)),t.push(Je(i,n,r))}),()=>t.forEach(r=>r())}function Je(e,t,r){const o=()=>{t.classList.toggle("forum-table-scrolled",t.scrollLeft>0),e.classList.toggle("forum-table-more-right",t.scrollWidth-t.clientWidth-t.scrollLeft>1)};o(),t.addEventListener("scroll",o,{passive:!0});const n=r.ownerDocument.defaultView,i=n?.ResizeObserver?new n.ResizeObserver(o):null;return i?.observe(t),i?.observe(r),n?.addEventListener("resize",o),()=>{t.removeEventListener("scroll",o),i?.disconnect(),n?.removeEventListener("resize",o)}}function dr({html:e,onClose:t}){const r=u.useRef(null),o=u.useRef(null);return u.useEffect(()=>(document.body.classList.add("gallery-dialog-open"),()=>document.body.classList.remove("gallery-dialog-open")),[]),u.useLayoutEffect(()=>{const n=r.current,i=o.current,s=i?.querySelector("table");if(!(!n||!i||!s))return Je(n,i,s)},[e]),pt.createPortal(a.jsx(Ue,{className:"gallery-dialog-backdrop",onClick:t,onDismiss:t,role:"presentation",children:a.jsxs("section",{"aria-labelledby":"forum-table-dialog-title","aria-modal":"true",className:"gallery-dialog forum-table-dialog",onClick:n=>n.stopPropagation(),role:"dialog",children:[a.jsxs("header",{children:[a.jsx("span",{children:a.jsx($t,{size:18})}),a.jsx("h2",{id:"forum-table-dialog-title",children:"表格"}),a.jsx("button",{"aria-label":"关闭表格","data-autofocus":!0,onClick:t,type:"button",children:a.jsx(xe,{size:18})})]}),a.jsx("div",{className:"forum-markup forum-table-dialog-body",children:a.jsx("div",{className:"forum-table-viewport",ref:r,children:a.jsx("div",{className:"forum-table-scroll",dangerouslySetInnerHTML:{__html:e},ref:o,tabIndex:0})})})]})}),document.body)}function Ke(e){const t=e.ownerDocument.defaultView;if(!t)return()=>{};const r=[];return e.querySelectorAll(".forum-punishment-table").forEach(o=>{const n=o.parentElement;if(!n?.classList.contains("forum-punishment-scroll"))return;let i=!1;function s(){if(i||!n)return;const d=n.clientWidth,f=Math.max(o.offsetWidth,o.scrollWidth);if(d<=0||f<=0)return;const m=Math.min(1,d/f),p=`scale(${m})`,b=`${Math.ceil(o.offsetHeight*m)}px`;o.style.transform!==p&&(o.style.transform=p),n.style.height!==b&&(n.style.height=b)}const l=t.ResizeObserver?new t.ResizeObserver(s):null;l?.observe(n),l?.observe(o),t.addEventListener("resize",s),e.ownerDocument.fonts?.ready.then(s),s(),r.push(()=>{i=!0,l?.disconnect(),t.removeEventListener("resize",s)})}),()=>r.forEach(o=>o())}function Ye({className:e="",html:t,onImageOpen:r,onImageQuote:o,variant:n}){const i=u.useRef(null),s=u.useRef(o);s.current=o;const{theme:l}=gt(),[d,f]=u.useState(null),m=u.useMemo(()=>({__html:ft(t)}),[t]);if(u.useLayoutEffect(()=>{const c=i.current;if(c&&n!=="signature")return ur(c)},[t,n]),u.useLayoutEffect(()=>{const c=i.current;if(c&&n!=="signature")return Ke(c)},[t,n]),u.useLayoutEffect(()=>{const c=i.current;c&&(Mt(c),o&&n==="floor"?Ve(c,h=>s.current?.(h)):c.querySelectorAll(".capubbs-gallery-quote").forEach(h=>h.remove()),Zt(c,l))},[t,l,!!o,n]),u.useLayoutEffect(()=>{const c=i.current;if(c)return ht(c)},[t]),u.useEffect(()=>{const c=i.current;if(!c)return;const h=Array.from(c.querySelectorAll("img")),v=w=>{w.dataset.capubbsImageLoaded="true"},I=h.map(w=>{if(w.complete&&w.getAttribute("src"))return v(w),null;const L=()=>v(w);return w.addEventListener("load",L,{once:!0}),w.addEventListener("error",L,{once:!0}),{handleLoad:L,image:w}});return()=>{I.forEach(w=>{w&&(w.image.removeEventListener("load",w.handleLoad),w.image.removeEventListener("error",w.handleLoad))})}},[t]),!t)return null;function p(c,h){if(!r||!(c instanceof Element))return;const v=c.closest("img");if(!(v instanceof HTMLImageElement))return;const I=v.closest(".capubbs-gallery"),w=I?Array.from(I.querySelectorAll('[data-capubbs-gallery-slide="true"] img')):Array.from(h.querySelectorAll("img")).filter(j=>!j.closest(".capubbs-gallery")),L=w.indexOf(v);if(L<0)return;const N=w.map(j=>mr(j,h)),P=w.map((j,$)=>{const q=N[$];return{alt:j.alt.trim(),element:j,src:j.currentSrc||j.getAttribute("src")||j.dataset.capubbsGallerySrc||"",...q?{galleryId:q.galleryId,galleryIndex:q.galleryIndex}:{}}});r(P,L,v,j=>{const $=N[j];$&&Pt($.gallery,$.galleryIndex)})}function b(c){const h=cr(c.target);if(h){c.preventDefault(),c.stopPropagation(),f(h.outerHTML);return}const v=$e(c.target);if(v&&c.target instanceof Element){c.preventDefault(),c.stopPropagation(),ue(c.target,v);return}!r||!(c.target instanceof HTMLImageElement)||(c.preventDefault(),p(c.target,c.currentTarget))}function x(c){const h=$e(c.target);if(h&&["Enter"," "].includes(c.key)&&c.target instanceof Element){c.preventDefault(),ue(c.target,h);return}if(["ArrowLeft","ArrowRight"].includes(c.key)&&c.target instanceof Element&&c.target.closest(".capubbs-gallery")){c.preventDefault(),ue(c.target,c.key==="ArrowLeft"?"prev":"next");return}!r||!(c.target instanceof HTMLImageElement)||!["Enter"," "].includes(c.key)||(c.preventDefault(),p(c.target,c.currentTarget))}return a.jsxs(a.Fragment,{children:[a.jsx("div",{ref:i,className:`forum-markup forum-markup-${n} ${e}`.trim(),"data-forum-markup":n,dangerouslySetInnerHTML:m,onClick:b,onKeyDown:x}),a.jsx(he,{children:d?a.jsx(dr,{html:d,onClose:()=>f(null)}):null})]})}function mr(e,t){const r=e.closest(".capubbs-gallery");if(!r||!t.contains(r))return null;const n=Array.from(t.querySelectorAll(".capubbs-gallery")).indexOf(r),s=Array.from(r.querySelectorAll('[data-capubbs-gallery-slide="true"] img')).indexOf(e);return n>=0&&s>=0?{gallery:r,galleryId:n,galleryIndex:s}:null}function pr(e){if(!/<punishment_record\b/i.test(e))return null;const t=document.createElement("template");t.innerHTML=e;const r=Array.from(t.content.querySelectorAll("punishment_record")).filter(n=>!n.closest("pre, code, textarea"));if(r.length===0)return null;const o=r.map(n=>{const i=n.getAttribute("year")?.trim()??"",s=/^\d{4}$/.test(i)&&Number(i)>1?Number(i):null,l=document.createElement("div");return n.replaceWith(l,...Array.from(n.childNodes)),{placeholder:l,year:s}});return{needsRecords:o.some(({year:n})=>n!==null),render(n,i){return o.forEach(({placeholder:s,year:l})=>{if(l===null||i){s.textContent=l===null?"罚跑记录学年无效":i;return}const d=document.createElement("table"),f=`${l-1}-${l} 学年罚跑记录`;d.className="forum-punishment-table",d.setAttribute("aria-label",f);const m=document.createElement("div");m.className="forum-punishment-title",m.setAttribute("role","heading"),m.setAttribute("aria-level","2"),m.textContent=f;const p=d.createTHead().insertRow();["姓名","ID","原因","长度","职务加罚","开始时间","结束时间","完成情况"].forEach(h=>{const v=document.createElement("th");v.scope="col",v.textContent=h,p.append(v)});const b=d.createTBody(),x=n.filter(h=>{const v=h.startDate.match(/^(\d{4})-(\d{1,2})-/);if(!v)return!1;const I=Number(v[2]);return I>=1&&I<=12&&Number(v[1])+(I>=9?1:0)===l});if(x.forEach(h=>{const v=b.insertRow(),I=h.distance?/公里|km/i.test(h.distance)?h.distance:`${h.distance} km`:"—";[h.name||"—",h.username||"—",h.reason||"—",I,h.addition?"是":"否",Me(h.startDate),Me(h.endDate),h.isComplete?"已完成":"进行中"].forEach(w=>{v.insertCell().textContent=w})}),x.length===0){const h=b.insertRow().insertCell();h.colSpan=8,h.className="forum-punishment-empty",h.textContent="暂无罚跑记录"}const c=document.createElement("div");c.className="forum-punishment-scroll",c.append(d),s.className="forum-punishment-record",s.replaceChildren(m,c)}),t.innerHTML}}}function Me(e){return!e||e==="0000-00-00"?"—":e.replaceAll("-",".")}function gr(e,t){const r=u.useMemo(()=>t?pr(e):null,[t,e]),[o,n]=u.useState(null);return u.useEffect(()=>{if(!r||!r.needsRecords)return;const i=new AbortController;return Vt("punishments",i.signal).then(({punishmentRecords:s})=>{i.signal.aborted||n({prepared:r,html:r.render(s)})}).catch(s=>{i.signal.aborted||n({prepared:r,html:r.render([],s instanceof Error?s.message:"罚跑记录加载失败")})}),()=>i.abort()},[r]),r?r.needsRecords?o?.prepared===r?o.html:"":r.render([]):e}const fr='.forum-markup-floor .capubbs-gallery-quote{position:absolute;display:inline-flex;align-items:center;gap:4px;z-index:5;top:10px;right:10px;padding:4px 8px;border:1px solid rgb(255 255 255 / .25);border-radius:var(--card-radius);background:#00000080;color:#fff;font:inherit;font-size:12px;line-height:1.5;cursor:pointer;opacity:0;pointer-events:none;transition:opacity .15s ease,background .15s ease}.forum-markup-floor .capubbs-gallery-stage:hover .capubbs-gallery-quote,.forum-markup-floor .capubbs-gallery-stage:focus-within .capubbs-gallery-quote{opacity:1;pointer-events:auto}.forum-markup-floor .capubbs-gallery-quote:hover{background:#000000b8}.forum-markup-floor .capubbs-gallery-quote:focus-visible{outline:2px solid #fff;outline-offset:2px}@media(hover:none){.forum-markup-floor .capubbs-gallery-quote{opacity:1;pointer-events:auto}}.forum-markup .forum-punishment-table{display:table;width:-moz-max-content;width:max-content;min-width:100%;max-width:none;border-collapse:separate;border-spacing:0;transform-origin:top left}.forum-markup .forum-punishment-table :is(th,td){border:0;border-right:1px solid var(--line);border-bottom:1px solid var(--line);padding:8px;background:var(--surface);color:var(--text-muted);font:inherit;text-align:center;white-space:nowrap}.forum-markup .forum-punishment-table tbody tr:hover>td{background:var(--brand-faint, color-mix(in srgb, var(--brand) 8%, var(--surface)))}.forum-markup .forum-punishment-table tr>:last-child{border-right:0}.forum-markup .forum-punishment-table tbody tr:last-child>td{border-bottom:0}.forum-markup .forum-punishment-table th{background:var(--surface-soft);color:var(--text-faint);font-weight:780}.forum-markup .forum-punishment-record{box-sizing:border-box;min-width:0;max-width:100%;border:1px solid var(--line)}.forum-markup .forum-punishment-scroll{max-width:100%;overflow:hidden}.forum-markup .forum-punishment-title{padding:12px 14px;border-bottom:1px solid var(--line);background:var(--surface-soft);color:var(--text-strong);font-family:inherit;font-size:var(--ui-font-size-lg, 14px);font-weight:760;line-height:1.5;text-align:center}.forum-markup .forum-punishment-table .forum-punishment-empty{text-align:center}.forum-markup .forum-punishment-empty>.forum-table-cell-content{width:auto;max-width:none}:root{--card-radius: 2px;--surface: #fffefa;--surface-raised: #ffffff;--surface-soft: #f6f8f4;--text: #20231f;--text-strong: #111411;--text-muted: #687068;--text-faint: #6c746c;--line: #e1e6df;--line-strong: #cdd5cc;--brand: #236b4c;--brand-strong: #174f38;--danger: #b8473f}:root.dark{--surface: #171d19;--surface-raised: #1c241f;--surface-soft: #1f2822;--text: #dde5de;--text-strong: #f6faf6;--text-muted: #a0aca2;--text-faint: #849086;--line: #2c362f;--line-strong: #3c493f;--brand: #69b98d;--brand-strong: #8bcca6;--danger: #ef8178}::-moz-selection{background:color-mix(in srgb,var(--brand) 24%,transparent)}::selection{background:color-mix(in srgb,var(--brand) 24%,transparent)}*,:before,:after{box-sizing:border-box;border-width:0;border-style:solid;border-color:currentcolor}blockquote,figure,h1,h2,h3,h4,h5,h6,hr,p,pre{margin:0}a{color:inherit;text-decoration:inherit}button{margin:0;padding:0;background-color:transparent;color:inherit;font:inherit;letter-spacing:inherit;text-transform:none}button:where(:not([style]):not([class])){min-height:32px;border:1px solid var(--line);border-radius:.5px;padding:4px 12px;background-color:var(--surface);color:var(--text-muted);font-size:14px;font-weight:680;line-height:1.5;vertical-align:middle;cursor:pointer;transition:background-color .14s ease,border-color .14s ease,color .14s ease}button:where(:not([style]):not([class]):hover:not(:disabled)){border-color:var(--line-strong);background-color:var(--surface-soft);color:var(--brand-strong)}button:where(:not([style]):not([class]):focus-visible){outline:2px solid var(--brand);outline-offset:2px}button:where(:not([style]):not([class]):disabled){cursor:not-allowed;opacity:.5}img,svg,video,canvas,audio,iframe,embed,object{display:block;vertical-align:middle}.capubbs-html-frame-root iframe{background-color:transparent!important}img,video{max-width:100%;height:auto}table{border-color:inherit;border-collapse:collapse;text-indent:0}.capubbs-activity-signup-canceled,.capubbs-activity-signup-canceled *{color:var(--danger)!important;text-decoration-color:var(--danger)!important;text-decoration-line:line-through!important;text-decoration-thickness:2px!important}.forum-markup>:first-child{margin-top:0}.forum-markup>:last-child{margin-bottom:0}.forum-markup p,.forum-markup div{margin:0}.forum-markup-floor p{margin:0 0 .75em}.forum-markup-floor>div+div{margin-top:.55em}.forum-markup a{color:var(--brand-strong);font-weight:inherit;text-decoration:underline;text-decoration-thickness:1px;text-underline-offset:.16em}.forum-markup .forum-mention{text-decoration:none}.forum-markup blockquote{margin:0 0 0 2em;border:0;padding:0;background:transparent;color:inherit}.forum-markup blockquote.forum-quote,.forum-markup .forum-legacy-quote,.forum-markup blockquote.capubbs-floor-quote{margin:.8em 0;border-left:3px solid color-mix(in srgb,var(--brand) 38%,var(--line));padding:.55em .75em;background:var(--surface-soft);color:var(--text-muted)}.forum-markup .capubbs-floor-quote-jump{margin-left:.75em}.forum-markup .forum-legacy-quote-content{margin:0}.forum-markup h1,.forum-markup h2,.forum-markup h3,.forum-markup h4,.forum-markup h5,.forum-markup h6{margin:.9rem 0 .45rem;color:var(--brand-strong);font-weight:800;line-height:1.35}.forum-markup h1{font-size:1.45rem}.forum-markup h2{font-size:1.25rem}.forum-markup h3{font-size:1.1rem}.forum-markup h4,.forum-markup h5,.forum-markup h6{font-size:1em}.forum-markup ul,.forum-markup ol{margin:.65em 0;padding-left:1.45em}.forum-markup ul{list-style:disc}.forum-markup ol{list-style:decimal}.forum-markup ol.capubbs-ordered-list-alpha{list-style-type:lower-alpha}.forum-markup ol.capubbs-ordered-list-roman{list-style-type:lower-roman}.forum-markup pre{max-width:100%;overflow-x:auto;margin:.75em 0;border-radius:var(--card-radius);padding:.75em;background:#182531;color:#f8fafc;white-space:pre-wrap}.forum-markup code,.forum-markup kbd{border-radius:var(--card-radius);padding:.08em .25em;background:color-mix(in srgb,var(--surface-soft) 75%,var(--line));font-family:SFMono-Regular,Cascadia Code,Consolas,monospace;font-size:.9em}.forum-markup pre code{padding:0;background:transparent;color:inherit}.forum-markup font[size="1"]{font-size:11px}.forum-markup font[size="2"]{font-size:13px}.forum-markup font[size="3"]{font-size:15px}.forum-markup font[size="4"]{font-size:17px}.forum-markup font[size="5"]{font-size:19px}.forum-markup font[size="6"]{font-size:21px}.forum-markup font[size="7"]{font-size:23px}.forum-markup hr{margin:.9em 0;border:0;border-top:1px solid var(--line-strong)}.forum-markup img{display:inline-block;height:auto;max-width:100%;vertical-align:middle}.forum-markup img[data-capubbs-image-width][data-capubbs-image-height]:not([data-capubbs-image-loaded=true]){color:transparent;font-size:0}.forum-markup .capubbs-gallery-slide img:not([data-capubbs-image-loaded=true]){opacity:0}.forum-markup img[data-capubbs-image-width][data-capubbs-image-height]:not([data-capubbs-image-loaded=true]),.forum-markup .capubbs-gallery-slide:has(img:not([data-capubbs-image-loaded=true])){background-color:color-mix(in srgb,var(--surface-soft) 82%,var(--line));background-image:linear-gradient(105deg,transparent 20%,color-mix(in srgb,var(--surface-raised) 70%,transparent) 45%,transparent 70%);background-size:220% 100%;animation:capubbs-image-loading 1.2s ease-in-out infinite}.forum-markup img[role=button]{cursor:zoom-in}.forum-markup img[role=button]:focus-visible{outline:2px solid var(--brand);outline-offset:3px}.forum-markup table{display:block;max-width:100%;overflow-x:auto;border-collapse:collapse}.forum-markup td,.forum-markup th{border:1px solid var(--line);padding:.35em .5em}.forum-markup-signature{color:#999;font-family:monospace;font-size:14px;line-height:1.6;overflow-wrap:anywhere}:root.dark .forum-markup-signature{color:#666}.forum-markup .capubbs-gallery{position:relative;display:block;width:100%;margin:.9rem 0;overflow:hidden;border:1px solid var(--line);border-radius:var(--card-radius);background:transparent;color:var(--text)}.forum-markup .capubbs-gallery:focus-visible{outline:2px solid var(--brand);outline-offset:3px}.forum-markup .capubbs-gallery-header{position:relative;display:flex;min-height:44px;align-items:center;justify-content:space-between;gap:12px;margin:0;padding:9px 12px;border-bottom:1px solid var(--line);background:var(--surface-soft)}.forum-markup .capubbs-gallery-title{width:100%;min-width:0;margin:0;color:var(--text-strong);font-size:.82rem;font-weight:760;line-height:1.4;text-align:center}.forum-markup .capubbs-gallery-stage{position:relative;display:block;margin:0;background:transparent}.forum-markup .capubbs-gallery-slide{display:block;margin:0;background:transparent}.forum-markup .capubbs-gallery-slide[data-capubbs-gallery-active=false]{display:none}.forum-markup .capubbs-gallery-slide>img{display:block;width:100%;height:var(--capubbs-gallery-image-height, clamp(280px, 52vw, 560px));max-width:none;margin:0 auto;border-radius:0;-o-object-fit:contain;object-fit:contain}.forum-markup .capubbs-gallery-caption{display:block;margin:0;color:var(--text-muted);font-size:.78rem;line-height:1.55;text-align:center}.forum-markup .capubbs-gallery-caption[data-capubbs-gallery-active=false]{display:none}.forum-markup .capubbs-gallery-footer{position:relative;display:flex;min-height:44px;align-items:center;justify-content:center;margin:0;padding:9px 12px;border-top:1px solid var(--line);background:var(--surface-soft)}.forum-markup .capubbs-gallery-captions{width:100%;min-width:0;margin:0;padding-inline:48px;text-align:center}.forum-markup .capubbs-gallery-count{position:absolute;top:50%;right:12px;color:var(--text-faint);font-size:.72rem;font-variant-numeric:tabular-nums;font-weight:760;line-height:1.25;transform:translateY(-50%)}.forum-markup .capubbs-gallery-count[data-capubbs-gallery-current]:before{content:attr(data-capubbs-gallery-current) "/" attr(data-capubbs-gallery-total)}.forum-markup .capubbs-gallery-nav{position:absolute;z-index:4;top:50%;display:grid;width:36px;height:48px;place-items:center;padding:0;transform:translateY(-50%);border:1px solid rgb(255 255 255 / .25);border-radius:var(--card-radius);background:#00000080;color:#fff;cursor:pointer;transition:.15s ease}.forum-markup .capubbs-gallery-nav:hover{background:#000000b8}.forum-markup .capubbs-gallery-nav:focus-visible{outline:2px solid #fff;outline-offset:2px}.forum-markup .capubbs-gallery-nav:before{font-family:Arial,sans-serif;font-size:2rem;font-weight:300;line-height:1}.forum-markup .capubbs-gallery-nav-prev:before{content:"‹"}.forum-markup .capubbs-gallery-nav-next:before{content:"›"}.forum-markup .capubbs-gallery-nav-prev{left:10px}.forum-markup .capubbs-gallery-nav-next{right:10px}@keyframes capubbs-image-loading{0%{background-position:120% 0}to{background-position:-80% 0}}@media(max-width:640px){.forum-markup .capubbs-gallery-slide>img{height:var(--capubbs-gallery-image-height, min(72vw, 420px))}.forum-markup .capubbs-gallery-nav{width:32px;height:42px}.forum-markup .capubbs-gallery-nav-prev{left:7px}.forum-markup .capubbs-gallery-nav-next{right:7px}}@media(prefers-reduced-motion:reduce){.forum-markup img[data-capubbs-image-width][data-capubbs-image-height]:not([data-capubbs-image-loaded=true]),.forum-markup .capubbs-gallery-slide:has(img:not([data-capubbs-image-loaded=true])){animation:none}}:is(.forum-markup,.capubbs-editor-prose) .capubbs-gallery[data-capubbs-gallery-tag]>.capubbs-gallery-header[hidden]{display:none}@media(max-width:640px){:is(.forum-markup,.capubbs-editor-prose) .capubbs-gallery[data-capubbs-gallery-tag] .capubbs-gallery-stage,:is(.forum-markup,.capubbs-editor-prose) .capubbs-gallery[data-capubbs-gallery-tag] .capubbs-gallery-slide>img{height:min(var(--capubbs-gallery-image-height, 420px),72vw)}}',hr="/bbs/new-assets/threadHtmlBootstrap-x4mBAuLM.html";function br(e,t){const r=new URL(e);return r.pathname=/Android|iPhone|iPad|iPod|Mobile/i.test(t)?"/m/outchain/player":"/outchain/player",r.href}function we(e,t){try{const r=new URL(e,t);return!(r.hostname==="player.bilibili.com"&&r.pathname==="/player.html"||r.hostname==="music.163.com"&&["/outchain/player","/m/outchain/player"].includes(r.pathname))||!["http:","https:"].includes(r.protocol)||r.username||r.password||r.port?null:(r.protocol="https:",r.href)}catch{return null}}function yr(e,t){const r=new URL(e);return r.hostname==="music.163.com"?(r.searchParams.set("auto","0"),br(r.href,t)):(r.searchParams.set("autoplay","0"),r.href)}function xr(e){if(!e)return{left:0,top:0};const t=window.getComputedStyle(e);return{left:e.offsetLeft+e.clientLeft+(Number.parseFloat(t.paddingLeft)||0),top:e.offsetTop+e.clientTop+(Number.parseFloat(t.paddingTop)||0)}}function vr(e){if(!e||typeof e!="object")return!1;const t=e;return typeof t.id=="string"&&typeof t.src=="string"&&we(t.src,"https://music.163.com")===t.src&&["left","top","width","height"].every(r=>{const o=t[r];return typeof o=="number"&&Number.isFinite(o)&&Math.abs(o)<=1e5})&&t.width>0&&t.height>0}const Pe=64*1024*1024,Fe=6,wr=2,re=new Map,se=new Map,J=new Map,K=new Map;let fe=!1;function be(e){const t=e.priorities.map(r=>r());return t.includes("high")?"high":t.includes("low")?"low":t.includes("deferred")?"deferred":null}function H(){fe||!J.size&&!K.size||(fe=!0,setTimeout(()=>{fe=!1;const e=[];J.forEach((s,l)=>{const d=be(s);if(d===null){J.delete(l),re.delete(l),s.reject(new DOMException("图片所在内容已卸载","AbortError"));return}d!=="deferred"&&e.push({source:l,request:s,priority:d})}),e.sort((s,l)=>+(l.priority==="high")-+(s.priority==="high"));const t=Array.from(K.values(),s=>({download:s,priority:be(s.request)}));t.forEach(({download:s,priority:l})=>{l===null&&s.controller.abort()});const r=t.filter(({download:s})=>s.controller.signal.aborted).length;let o=e.filter(({priority:s})=>s==="high").length-(Fe-K.size+r);const n=t.filter(({download:s,priority:l})=>l!=="high"&&!s.controller.signal.aborted).sort((s,l)=>+(l.priority==="deferred")-+(s.priority==="deferred"));for(const{download:s}of n){if(o<=0)break;o-=1,s.preempted=!0,s.controller.abort()}let i=t.filter(({priority:s})=>s!=="high").length;for(const{source:s,request:l,priority:d}of e){if(K.size>=Fe)break;d==="low"&&i>=wr||(J.delete(s),d==="low"&&(i+=1),Ir(s,l,d))}},0))}function Ir(e,t,r){const o={request:t,controller:new AbortController,preempted:!1};K.set(e,o),Ar(e,r,o.controller.signal).then(n=>{o.controller.signal.throwIfAborted();const i={blob:n,objectUrl:URL.createObjectURL(n),sourceUrl:e};se.set(e,i),t.resolve(i)}).catch(n=>{o.preempted||o.controller.signal.aborted&&be(t)!==null?J.set(e,t):(re.delete(e),t.reject(n))}).finally(()=>{K.delete(e),H()})}function Qe(e){return new URL(e,new URL("/bbs/content/",window.location.origin)).href}function ze(e,t=()=>"high"){const r=Qe(e),o=re.get(r);if(o)return(J.get(r)??K.get(r)?.request)?.priorities.push(t),H(),o;const n=new Promise((i,s)=>{J.set(r,{priorities:[t],reject:s,resolve:i})});return re.set(r,n),H(),n}function Ar(e,t,r){const o=new URL(e);return o.origin!==window.location.origin||!o.pathname.startsWith("/bbs/images/")&&!o.pathname.startsWith("/bbsimg/")?Promise.reject(new Error("仅代理论坛图片目录")):fetch(e,{credentials:"same-origin",referrerPolicy:"no-referrer",priority:t,signal:r}).then(async n=>{if(!n.ok)throw new Error(`图片加载失败：${n.status}`);if(!(n.headers.get("content-type")?.toLowerCase()??"").startsWith("image/"))throw new Error("图片响应类型无效");const s=Number.parseInt(n.headers.get("content-length")??"",10);if(Number.isFinite(s)&&s>Pe)throw new Error("图片大小超出限制");const l=await n.blob();if(l.size>Pe)throw new Error("图片大小超出限制");return l})}function Sr(e){try{return se.get(Qe(e))?.objectUrl}catch{return}}typeof window<"u"&&(window.addEventListener("scroll",H,{passive:!0,capture:!0}),window.addEventListener("resize",H),window.addEventListener("pagehide",e=>{e.persisted||(se.forEach(t=>URL.revokeObjectURL(t.objectUrl)),se.clear(),re.clear())}));function kr(e,t,r){let o="deferred";for(const n of t){const i=n.right>n.left&&n.bottom>n.top&&e.top+n.bottom>Math.max(0,e.top)&&e.top+n.top<Math.min(r.height,e.bottom)&&e.left+n.right>Math.max(0,e.left)&&e.left+n.left<Math.min(r.width,e.right);if(n.gallery){if(!i||n.gallery==="deferred")continue;if(n.gallery==="current")return"high";o="low"}else{if(i)return"high";o="low"}}return o}const Rr=28,Er=64,jr=5e4,Cr=30,Xe=30,E="capubbs-thread-html-frame",Ze=new URL("/bbs/lib/jquery.min.js",window.location.origin).href,qr=Dr(fr),Nr=/\son[a-z][\w:-]*\s*=/i;let oe=null;function Oe({className:e="",floor:t,html:r,isActivitySignupCanceled:o=!1,onImageOpen:n,onImageQuote:i,onIsolatedTextSelection:s,variant:l}){const d=u.useMemo(()=>l==="signature"?Ft(r):r,[r,l]),f=Lr(d,l==="signature"),m=gr(f,l==="floor"),p=Ut(m),b=u.useMemo(()=>p?null:Gt(m,{normalizeLegacyLineBreaks:l==="signature"}),[m,p,l]),x=u.useMemo(()=>_t(m),[m]);return!p&&b!==null?a.jsx(Ye,{className:e,html:b,onImageOpen:n,onImageQuote:i,variant:l}):a.jsx(Tr,{className:e,floor:t,html:x,isActivitySignupCanceled:o,onImageOpen:n,onImageQuote:i,onTextSelection:s,variant:l})}function Tr({className:e,floor:t,html:r,isActivitySignupCanceled:o,onImageOpen:n,onImageQuote:i,onTextSelection:s,variant:l}){const d=u.useRef(null),f=u.useRef(`${l}-${t}-${Math.random().toString(36).slice(2)}`),m=u.useRef(i);m.current=i;const p=l==="floor"&&!!i,b=u.useRef(n);b.current=n;const x=u.useRef(s);x.current=s;const c=l==="signature"?Rr:Er,h=!!n,[v,I]=u.useState(null),[w,L]=u.useState(null),N=Ur(),P=u.useRef(N),X=bt(),j=l==="signature"?14:X,$=u.useMemo(()=>Fr(Pr(r)),[r]),q=$.includes('type="text/capubbs-user-script"')||Nr.test($),Y=u.useMemo(()=>$r({canOpenImages:h,canQuoteImages:p,frameId:f.current,needsJquery:q,html:$,isActivitySignupCanceled:o,isDarkTheme:P.current,fontSize:j,variant:l}),[h,p,$,j,o,q,l]),M=u.useMemo(()=>Math.random().toString(36).slice(2),[Y]),Q=u.useMemo(()=>`${hr}#${new URLSearchParams({frameId:f.current,token:M})}`,[M]),W=u.useCallback(()=>{d.current?.contentWindow?.postMessage({source:E,type:"document-response",frameId:f.current,token:M,html:Y},"*")},[M,Y]),G=u.useCallback(()=>{d.current?.contentWindow?.postMessage({frameId:f.current,source:E,theme:N?"dark":"light",type:"theme"},"*")},[N]),_=u.useCallback((k=d.current?.contentWindow)=>{!q||!k||De().then(z=>{d.current?.contentWindow===k&&k.postMessage({frameId:f.current,jquerySource:z,source:E,type:"jquery-response"},"*")})},[q]),ae=u.useCallback(()=>{W(),G(),_()},[W,_,G]);u.useEffect(()=>{I(null)},[Q]),u.useEffect(()=>{G()},[G]),u.useEffect(()=>{q&&De()},[q]),u.useLayoutEffect(()=>{H()},[v]),u.useLayoutEffect(()=>{let k=!0;const z=new Map;function Z(y){const U=d.current?.contentWindow;if(!(!U||y.source!==U||!Hr(y.data))&&y.data.frameId===f.current){if(y.data.type==="embedded-player-layout"){L({token:M,players:y.data.players});return}if(y.data.type==="document-request"){y.data.token===M&&W();return}if(y.data.type==="jquery-request"){_(U);return}if(y.data.type==="image-resource-layout"){z.has(y.data.requestId)&&(z.set(y.data.requestId,y.data.bounds),H());return}if(y.data.type==="image-resource-request"){const S=U,R=y.data.requestId;z.set(R,y.data.bounds);const T=()=>{const A=d.current;return!k||!A||A.contentWindow!==S?null:kr(A.getBoundingClientRect(),z.get(R)??[],{width:window.innerWidth,height:window.innerHeight})};ze(y.data.url,T).then(A=>{!k||d.current?.contentWindow!==S||S.postMessage({blob:A.blob,priority:T(),frameId:f.current,requestId:y.data.requestId,source:E,type:"image-resource-response"},"*")}).catch(()=>{!k||d.current?.contentWindow!==S||S.postMessage({priority:T(),frameId:f.current,requestId:y.data.requestId,source:E,type:"image-resource-error"},"*")}).finally(()=>z.delete(R));return}if(y.data.type==="anchor"){const S=d.current;if(!S)return;const R=window.getComputedStyle(document.documentElement),T=Number.parseFloat(R.getPropertyValue("--topbar-height"))||0,A=window.scrollY+S.getBoundingClientRect().top;window.scrollTo({left:0,top:Math.max(0,A+y.data.offsetTop-T-16)});return}if(y.data.type==="navigate"){const S=yt(y.data.url,Ie());if(!S)return;window.history.pushState(null,"",S),window.dispatchEvent(new Event(xt));const R=new URL(S,window.location.origin);R.hash?window.requestAnimationFrame(()=>{const T=decodeURIComponent(R.hash.slice(1)),A=vt(`#${T}`);(A?wt(A):document.getElementById(T))?.scrollIntoView({block:"start"})}):window.scrollTo({left:0,top:0});return}if(y.data.type==="image-quote"){m.current?.(y.data.image);return}if(y.data.type==="image-open"){const S=d.current;if(!S)return;const R=Array.from(S.contentDocument?.querySelectorAll("img")??[]),T=y.data.images.map(O=>({...O,element:typeof O.elementIndex=="number"?R[O.elementIndex]:void 0,src:Sr(O.src)??O.src,loadSource:F=>(F.addEventListener("abort",H,{once:!0}),ze(O.src,()=>F.aborted?null:"high").then(V=>V.objectUrl,()=>O.src).finally(()=>F.removeEventListener("abort",H)))})),A=O=>{const F=T[O];!F||typeof F.galleryId!="number"||!Number.isSafeInteger(F.galleryIndex)||S.contentWindow?.postMessage({frameId:f.current,galleryId:F.galleryId,galleryIndex:F.galleryIndex,source:E,type:"gallery-select"},"*")};b.current?.(T,y.data.imageIndex,S,A);return}if(y.data.type==="selection"){y.data.text&&window.getSelection()?.removeAllRanges(),x.current?.(y.data.text);return}I(Math.min(jr,Math.max(c,Math.ceil(y.data.height))))}}return window.addEventListener("message",Z),()=>{k=!1,z.clear(),window.removeEventListener("message",Z),H()}},[M,Q,c,W,_]);const B=xr(d.current);return a.jsxs("div",{className:"thread-html-frame-container",children:[a.jsx("iframe",{ref:d,className:`thread-html-frame thread-html-frame-${l} ${e}`.trim(),referrerPolicy:"no-referrer",sandbox:"allow-scripts allow-downloads",scrolling:"no",src:Q,onLoad:ae,style:{"--thread-html-frame-width-allowance":`${Xe}px`,...v===null?{}:{"--thread-html-frame-height":`${v}px`}},title:l==="signature"?`第 ${t} 楼签名档`:`第 ${t} 楼正文`},M),w?.token===M?w.players.map(k=>a.jsx("iframe",{className:"thread-embedded-player",src:yr(k.src,navigator.userAgent),title:new URL(k.src).hostname==="player.bilibili.com"?"哔哩哔哩播放器":"网易云音乐播放器",allow:"autoplay; fullscreen; picture-in-picture",allowFullScreen:!0,scrolling:"no",style:{left:k.left+B.left,top:k.top+B.top,width:k.width,height:k.height}},`${M}-${k.id}`)):null]})}function Lr(e,t){const[r,o]=u.useState(e);return u.useEffect(()=>{const n=new AbortController,i=t?zt(e):[];if(o(e),i.length===0)return()=>n.abort();const s=Array.from(new Map(i.map(l=>[`${l.bid}:${l.tid}:${l.pid}`,l])).values());return Promise.all(s.map(async l=>{try{const d=await Wt(l,n.signal);return[`${l.bid}:${l.tid}:${l.pid}`,d]}catch(d){if(d instanceof DOMException&&d.name==="AbortError")throw d;return[`${l.bid}:${l.tid}:${l.pid}`,""]}})).then(l=>{if(n.signal.aborted)return;const d=new Map(l);let f=e;i.forEach(m=>{const p=d.get(`${m.bid}:${m.tid}:${m.pid}`);p&&(f=f.replace(m.marker,p))}),o(f)}).catch(()=>{}),()=>n.abort()},[t,e]),r}function $r({canOpenImages:e,canQuoteImages:t,frameId:r,fontSize:o,needsJquery:n,html:i,isActivitySignupCanceled:s,isDarkTheme:l,variant:d}){const f=d==="signature",m=f?"#999999":"rgb(63 63 70)",p=f?"#666666":"rgb(228 228 231)",b=f?"monospace":"'Noto Sans CJK SC','Source Han Sans SC','PingFang SC','Microsoft YaHei',sans-serif",x=f?"padding-top:10px;color:inherit;font-family:inherit;font-size:inherit;":"",c=s?" capubbs-activity-signup-canceled":"";return`<!doctype html>
<html class="${l?"dark":"light"}" style="background:transparent;color-scheme:${l?"dark":"light"}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta name="referrer" content="no-referrer">
  <base href="${Or(Ie())}">
  <meta http-equiv="Content-Security-Policy" content="${zr()}">
  <style>${qr}</style>
  <style>
    html{--capubbs-frame-text-color:${m}}html.dark{--capubbs-frame-text-color:${p}}
    html,body{margin:0;padding:0;min-width:0;min-height:0;overflow:hidden;background:transparent!important;color:var(--capubbs-frame-text-color);font-family:${b};font-size:${o}px;line-height:1.6;overflow-wrap:anywhere;word-break:break-word}
    .capubbs-html-frame-root{display:flow-root;width:calc(100% - ${Xe}px);${x}}.capubbs-html-frame-root iframe{display:inline-block;vertical-align:baseline}
  </style>
  <script>${Mr(r,e,n,t)}<\/script>
</head>
<body><main class="capubbs-html-frame-root forum-markup forum-markup-${d}${c}">${i}</main></body>
</html>`}function Mr(e,t,r,o=!1){return`(function(){
    var frameId=${JSON.stringify(e)};
    var forumOrigin=${JSON.stringify(window.location.origin)};
    var forumBasePath=${JSON.stringify(It)};
    var canOpenImages=${JSON.stringify(t)};
    var canQuoteImages=${JSON.stringify(o)};
    var ensureGalleryQuoteControls=${Ve.toString()};
    var needsJquery=${JSON.stringify(r)};
    var preparePunishmentTableFit=${Ke.toString()};
    var getGalleryImageState=${At.toString()};
    var normalizeEmbeddedPlayerUrl=${we.toString()};
    var playerIds=new WeakMap();
    var nextPlayerId=0;
    var lastPlayerLayout='';
    var jquerySourceUrl=${JSON.stringify(Ze)};
    var forumAppExactPaths=${JSON.stringify(St)};
    var forumAppPathPrefixes=${JSON.stringify(kt)};
    var legacyForumExactPaths=${JSON.stringify(Rt)};
    var legacyForumPathPatterns=${JSON.stringify(Et)}.map(function(pattern){return new RegExp(pattern);});
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
  }());`}function Pr(e){return e.replace(/<script\b([^>]*)>/gi,(t,r)=>`<script${r.replace(/\s+type\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)/gi,"")} type="text/capubbs-user-script">`)}function Fr(e){if(!/<(?:img|iframe)\b/i.test(e))return e;const t=document.createElement("template");return t.innerHTML=e,t.content.querySelectorAll("iframe[src]").forEach(r=>{const o=we(r.getAttribute("src")??"",Ie());o&&(r.dataset.capubbsPlayerSrc=o,r.removeAttribute("src"))}),t.content.querySelectorAll("img[src]").forEach(r=>{const o=r.getAttribute("src")?.trim()??"";!o||/^(?:blob:|data:)/i.test(o)||(r.dataset.capubbsImageResourceSrc=o,r.setAttribute("fetchpriority","low"),r.removeAttribute("src"),r.removeAttribute("srcset"),r.closest("picture")?.querySelectorAll("source[srcset]").forEach(n=>{n.removeAttribute("srcset")}))}),t.innerHTML}function De(){return oe||(oe=fetch(Ze,{credentials:"same-origin"}).then(e=>{if(!e.ok)throw new Error(`Failed to load jQuery: ${e.status}`);return e.text()}).catch(()=>null),oe)}function zr(){return["default-src 'none'","script-src 'unsafe-inline' http: https: data: blob:","style-src 'unsafe-inline' http: https:","img-src http: https: data: blob:","media-src http: https: data: blob:","font-src http: https: data: blob:","frame-src http: https: data: blob:","child-src http: https: data: blob:","connect-src 'none'","object-src 'none'","form-action 'none'","upgrade-insecure-requests"].join("; ")}function Ie(){return new URL("/bbs/content/",window.location.origin).href}function Or(e){return e.replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function Dr(e){return e.replace(/<\/style/gi,"<\\/style")}function Hr(e){if(!e||typeof e!="object")return!1;const t=e;if(t.source!==E||typeof t.frameId!="string")return!1;if(t.type==="image-quote"){const r=t.image;if(!r||typeof r.src!="string"||typeof r.title!="string"||typeof r.caption!="string")return!1;try{return["http:","https:"].includes(new URL(r.src).protocol)}catch{return!1}}return t.type==="embedded-player-layout"?Array.isArray(t.players)&&t.players.every(vr):t.type==="document-request"?typeof t.token=="string":t.type==="anchor"?typeof t.offsetTop=="number"&&Number.isFinite(t.offsetTop)&&t.offsetTop>=0:t.type==="navigate"?typeof t.url=="string":t.type==="jquery-request"?!0:t.type==="image-resource-request"||t.type==="image-resource-layout"?typeof t.requestId=="string"&&t.requestId.length>0&&Array.isArray(t.bounds)&&t.bounds.every(r=>r&&(r.gallery===void 0||["current","adjacent","deferred"].includes(r.gallery))&&["top","bottom","left","right"].every(o=>typeof r[o]=="number"&&Number.isFinite(r[o])))&&(t.type==="image-resource-layout"||"url"in t&&typeof t.url=="string"&&t.url.length>0):t.type==="selection"?typeof t.text=="string":t.type==="image-open"?typeof t.imageIndex=="number"&&Number.isSafeInteger(t.imageIndex)&&Array.isArray(t.images)&&t.images.length>0&&t.imageIndex>=0&&t.imageIndex<t.images.length&&t.images.every(r=>!!r&&typeof r=="object"&&typeof r.alt=="string"&&typeof r.elementIndex=="number"&&Number.isSafeInteger(r.elementIndex)&&r.elementIndex>=0&&typeof r.src=="string"&&r.src.length>0&&(r.galleryId===void 0&&r.galleryIndex===void 0||typeof r.galleryId=="number"&&Number.isSafeInteger(r.galleryId)&&r.galleryId>=0&&typeof r.galleryIndex=="number"&&Number.isSafeInteger(r.galleryIndex)&&r.galleryIndex>=0)):t.type==="resize"&&typeof t.height=="number"&&Number.isFinite(t.height)}function Ur(){const[e,t]=u.useState(()=>document.documentElement.classList.contains("dark"));return u.useEffect(()=>{const r=document.documentElement,o=()=>t(r.classList.contains("dark")),n=new MutationObserver(o);return n.observe(r,{attributeFilter:["class"],attributes:!0}),()=>n.disconnect()},[]),e}function Gr({attachments:e=[],bodyClassName:t="thread-floor-body",bodyFallback:r=null,bodyHtml:o,floor:n,isActivitySignupCanceled:i=!1,onImageOpen:s,onImageQuote:l,onIsolatedTextSelection:d,signatureClassName:f="thread-signature",signatureHtml:m,signatureText:p}){const b=s?(x,c,h,v)=>{const I=x[c];I&&s([I],0,h,v?()=>v(c):void 0)}:void 0;return a.jsxs(a.Fragment,{children:[o?a.jsx(Oe,{className:t,floor:n,html:o,isActivitySignupCanceled:i,onImageOpen:s,onImageQuote:l,onIsolatedTextSelection:d,variant:"floor"}):r,a.jsx(_r,{attachments:e}),m?a.jsx(Oe,{className:f,floor:n,html:m,onImageOpen:b,variant:"signature"}):p?a.jsx("footer",{className:f,children:a.jsx("p",{children:p})}):null]})}function _r({attachments:e}){return e.length===0?null:a.jsxs("section",{"aria-label":"附件",className:"thread-attachments",children:[a.jsxs("header",{className:"thread-attachments-heading",children:[a.jsx(Ot,{"aria-hidden":"true",size:14}),a.jsx("span",{children:"附件"}),a.jsx("small",{children:e.length})]}),a.jsx("ul",{children:e.map(t=>{const r=a.jsxs(a.Fragment,{children:[a.jsx("span",{className:"thread-attachment-name",children:t.name}),a.jsx("small",{children:Br(t)}),t.exists!==!1&&a.jsx(jt,{"aria-hidden":"true",size:15})]});return a.jsx("li",{children:t.exists===!1?a.jsx("div",{"aria-disabled":"true",className:"thread-attachment-link is-unavailable",children:r}):a.jsx("a",{className:"thread-attachment-link",download:t.name,href:t.downloadHref||`/bbs/download/?id=${encodeURIComponent(t.id)}`,children:r})},t.id)})})]})}function Br(e){if(e.exists===!1)return"文件不可用";const t=[Wr(e.size),(e.price??0)>0?"付费附件":"免费"];return e.downloadCount!==void 0&&t.push(`下载 ${e.downloadCount} 次`),t.join(" · ")}function Wr(e){if(e<=0)return"大小未知";if(e<1024)return`${e} B`;const t=["KB","MB","GB","TB"];let r=e,o=-1;do r/=1024,o+=1;while(r>=1024&&o<t.length-1);return`${r.toFixed(r>=10?1:2)} ${t[o]}`}function Vr({author:e,id:t}){const r=e.tags??[],[o,n]=u.useState(!1),i=u.useRef(null),s=u.useRef(null),l=u.useRef(null),d=u.useRef(null),f=r.map(m=>`${m.id}:${m.name}`).join("|");return u.useLayoutEffect(()=>{if(r.length===0){n(!1);return}const m=()=>{const b=i.current,x=s.current,c=l.current,h=d.current;if(!b||!x||!c||!h||b.offsetWidth===0)return;const v=c.getBoundingClientRect().width,I=h.getBoundingClientRect().width,w=Number.parseFloat(getComputedStyle(x).columnGap)||0,L=x.clientWidth-v-w,N=I>L+1;n(P=>P===N?P:N)};m();const p=new ResizeObserver(m);return[i.current,s.current,d.current].forEach(b=>{b&&p.observe(b)}),()=>p.disconnect()},[f,r.length]),a.jsxs("div",{id:t,ref:i,className:"author-hover-card",role:"dialog","aria-label":`${e.name} 的用户摘要`,children:[a.jsxs("div",{className:"author-card-head",children:[a.jsx("img",{src:e.avatar,alt:""}),a.jsxs("div",{className:"author-card-head-copy",children:[a.jsxs("div",{ref:s,className:"author-card-name-line","data-tags-overflow":o?"true":void 0,children:[a.jsx("strong",{ref:l,children:e.name}),a.jsx("div",{className:"author-card-tag-slot",children:a.jsx(ce,{size:"compact",tags:r})})]}),(e.stars>0||e.role)&&a.jsxs("span",{className:"author-card-status",children:["★".repeat(e.stars),e.stars>0&&e.role?" · ":"",e.role]})]})]}),o?a.jsx("div",{className:"author-card-tags-row",children:a.jsx(ce,{size:"compact",tags:r})}):null,e.medals?.length?a.jsx("div",{className:"author-card-medals",children:a.jsx(Be,{medals:e.medals,profileName:e.name,variant:"compact"})}):null,a.jsx("div",{ref:d,className:"author-card-tag-width-measure","aria-hidden":"true",children:a.jsx(ce,{size:"compact",tags:r})}),a.jsxs("dl",{children:[a.jsxs("div",{children:[a.jsx("dt",{children:"主题"}),a.jsx("dd",{children:e.topics})]}),a.jsxs("div",{children:[a.jsx("dt",{children:"回复"}),a.jsx("dd",{children:e.replies})]}),a.jsxs("div",{children:[a.jsx("dt",{children:"签到"}),a.jsx("dd",{children:e.checkins})]})]}),a.jsxs("p",{children:["最近在线：",e.lastSeen]}),a.jsxs("a",{href:te(e.name),children:["查看个人主页 ",a.jsx(Lt,{size:13})]})]})}function Jr({author:e}){const t=e.tags??[],r=_e(t),o=te(e.name);return a.jsxs("aside",{className:"thread-author-profile","aria-label":`${e.name} 的资料`,children:[a.jsx("a",{"aria-label":`查看${e.name}的个人主页`,className:"thread-author-profile-avatar",href:o,children:a.jsx("img",{src:e.avatar,alt:""})}),a.jsx("div",{className:"thread-author-profile-identity",children:a.jsx("a",{href:o,children:e.name})}),(e.stars>0||e.role)&&a.jsxs("div",{className:"thread-author-profile-status",children:[e.stars>0&&a.jsx("span",{"aria-label":`${e.stars} 星`,children:"★".repeat(e.stars)}),e.role&&a.jsx("strong",{children:e.role})]}),a.jsx(Ge,{tags:r}),a.jsx(Be,{medals:e.medals??[],profileName:e.name,variant:"compact"}),a.jsxs("dl",{className:"thread-author-profile-stats",children:[a.jsxs("div",{children:[a.jsx("dt",{children:"主题"}),a.jsx("dd",{children:e.topics})]}),a.jsxs("div",{children:[a.jsx("dt",{children:"回复"}),a.jsx("dd",{children:e.replies})]}),a.jsxs("div",{children:[a.jsx("dt",{children:"签到"}),a.jsx("dd",{children:e.checkins})]})]}),a.jsxs("p",{className:"thread-author-profile-last-seen",children:[a.jsx("span",{children:"最近在线"}),a.jsx("strong",{children:e.lastSeen})]})]})}function ye(e){return e.replace(/^(\d{4})年(\d{2})月(\d{2})日\s+(\d{2})时(\d{2})分(\d{2})秒$/,"$1-$2-$3 $4:$5:$6")}function Kr(e){const t=window.getSelection()?.toString();t&&(e.preventDefault(),e.clipboardData.setData("text/plain",t))}function Yr({articleAfterContent:e,author:t,avatarRail:r,className:o="",content:n,decorationImageSrc:i,editedAt:s,floor:l,floorIndex:d,id:f,inlineAvatar:m=!1,mainAfterContent:p,onCopy:b,publishedAt:x,showAuthorProfile:c}){const h=t.tags??[],v=_e(h);return a.jsxs("article",{className:`forum-card thread-floor${c?" thread-floor-with-author-profile":""}${o?` ${o}`:""}`,"data-floor":l,id:f,onCopy:b,children:[i&&a.jsx("span",{"aria-hidden":"true",className:"thread-floor-decoration",children:a.jsx("img",{alt:"",src:i})}),c?a.jsx(Jr,{author:t}):!m&&r,a.jsxs("div",{className:"thread-floor-main",children:[a.jsxs("header",{className:"thread-floor-header",children:[!c&&m&&r,a.jsxs("div",{className:"thread-floor-author",children:[a.jsx("a",{href:te(t.name),children:t.name}),a.jsx(Ge,{tags:v})]}),a.jsxs("div",{className:"thread-floor-time",children:[a.jsx("time",{children:ye(x)}),s&&a.jsxs(a.Fragment,{children:[a.jsx("span",{children:"·"}),a.jsxs("time",{children:["编辑于 ",ye(s)]})]})]}),d]}),c?a.jsx("div",{className:"thread-floor-content",children:n}):n,p]}),e]})}function Qr({canDelete:e,canEdit:t,canQuote:r,canReply:o,decorative:n=!1,deleting:i=!1,editHref:s="",onDelete:l,onEditSignup:d,onQuote:f,onReply:m}){const p=n?-1:void 0,b=u.useRef(null);return a.jsxs("div",{"aria-hidden":n||void 0,className:`thread-floor-actions${n?" thread-floor-actions-decorative":""}`,children:[r&&a.jsxs("button",{onClick:x=>{const c=b.current?b.current.text:He(x.currentTarget);b.current=null,f?.(c)},onPointerDown:x=>{x.button===0&&(b.current={text:He(x.currentTarget)})},tabIndex:p,type:"button",children:[a.jsx(Tt,{size:15}),"引用"]}),d&&!n&&a.jsxs("button",{onClick:d,type:"button",children:[a.jsx(de,{size:15}),"编辑报名"]}),o&&a.jsxs("button",{onClick:m,tabIndex:p,type:"button",children:[a.jsx(Yt,{size:15}),"回复"]}),t&&(n?a.jsxs("button",{tabIndex:-1,type:"button",children:[a.jsx(de,{size:15}),"编辑"]}):a.jsxs("a",{href:s,children:[a.jsx(de,{size:15}),"编辑"]})),e&&a.jsxs("button",{"aria-busy":i||void 0,className:"floor-action-danger",disabled:!n&&i,onClick:n?void 0:x=>l?.(x.currentTarget),tabIndex:p,type:"button",children:[a.jsx(ve,{size:15}),i?"删除中":"删除"]})]})}function ua({canQuote:e,canReply:t,decorationImageSrc:r,editHref:o,floor:n,isActivityThread:i,isMainPost:s,locked:l,inlineAvatar:d,showAuthorProfile:f,hideSignature:m,onDeleteFloor:p,onDeleteNestedReply:b,onEditSignup:x,onIsolatedTextSelection:c,onQuote:h,onSubmitNestedReply:v,viewer:I}){const[w,L]=u.useState(!1),[N,P]=u.useState(null),[X,j]=u.useState([]),[$,q]=u.useState(""),[Y,M]=u.useState(!1),[Q,W]=u.useState([]),[G,_]=u.useState(""),[ae,B]=u.useState(""),[k,z]=u.useState(null),[Z,y]=u.useState(""),[U,S]=u.useState(!1),[R,T]=u.useState(void 0),A=sr(G),O=Ct(":scope > article"),F=`nested-reply-count-${n.id}`,[V,Ae]=u.useState(null),[ne,Se]=u.useState(!1),ke=u.useRef(null),ee=u.useRef(null),ie=u.useRef(null),Re=u.useRef(null),Ee=u.useRef(null),je=u.useMemo(()=>[...n.nestedReplies??[],...Q].filter(g=>!X.includes(g.id)),[X,n.nestedReplies,Q]),Ce=i&&!s&&/<\s*(?:s|strike)\b/i.test(n.contentHtml??""),qe=`thread-floor-body${Ce?" capubbs-activity-signup-canceled":""}`;u.useEffect(()=>()=>{ee.current!==null&&window.clearTimeout(ee.current)},[]),u.useEffect(()=>{if(!ne)return;function g(C){ke.current?.contains(C.target)||Se(!1)}return document.addEventListener("pointerdown",g),()=>document.removeEventListener("pointerdown",g)},[ne]);async function et(){const g=`${window.location.origin}${window.location.pathname}${window.location.search}#${n.floor}`;await nr(g)&&(L(!0),ee.current!==null&&window.clearTimeout(ee.current),ee.current=window.setTimeout(()=>L(!1),1800))}const Ne=(g,C,D,le)=>{Ee.current=D,Ae({imageIndex:C,images:g,onImageChange:le})};function tt(g){V?.onImageChange?.(g),Ae(null),window.requestAnimationFrame(()=>Ee.current?.focus())}function Te(g=null){T(g),_(""),B(""),y(""),window.requestAnimationFrame(()=>Re.current?.focus())}function Le(){T(void 0),_(""),y("")}async function rt(g){g.preventDefault();const C=G.trim();if(!(!A.canSubmit||!I||!t||U)){S(!0),y("");try{const D=await v(n,R??null,C);W(le=>[...le,{author:I,canDelete:!0,content:C,id:D>0?String(D):`local-${n.id}-${Date.now()}`,publishedAt:ea(new Date),target:R??void 0}]),Le()}catch(D){y(D instanceof Error?D.message:"楼中楼回复发布失败，请稍后重试。")}finally{S(!1)}}}async function at(g){z(g.id),B("");try{await b(n,g),j(C=>[...C,g.id]),W(C=>C.filter(D=>D.id!==g.id)),P(null)}catch(C){B(C instanceof Error?C.message:"楼中楼删除失败，请稍后重试。")}finally{z(null)}}async function nt(){if(!Y){M(!0),q("");try{await p(n)}catch(g){q(g instanceof Error?g.message:"楼层删除失败，请稍后重试。"),M(!1)}}}function ot(){P(null),q(""),B(""),window.requestAnimationFrame(()=>ie.current?.focus())}function st(){if(l||!N)return;const g=N;P(null),g.kind==="floor"?nt():at(g.reply)}const it=a.jsxs("div",{className:`thread-avatar-rail${ne?" thread-avatar-rail-open":""}`,ref:ke,children:[a.jsx("button",{"aria-controls":`author-card-${n.floor}`,"aria-expanded":ne,"aria-label":`查看${n.author.name}的资料卡`,className:"thread-avatar-button",onClick:()=>Se(g=>!g),type:"button",children:a.jsx("img",{src:n.author.avatar,alt:""})}),a.jsx(Vr,{author:n.author,id:`author-card-${n.floor}`})]}),lt=a.jsx(Gr,{attachments:n.attachments,bodyFallback:a.jsx("div",{className:qe,children:n.paragraphs.map(g=>a.jsx("p",{children:g},g))}),bodyClassName:qe,bodyHtml:n.contentHtml,floor:n.floor,isActivitySignupCanceled:Ce,onImageOpen:Ne,onImageQuote:e?g=>h(n,void 0,g):void 0,onIsolatedTextSelection:g=>c(n,g),signatureHtml:m?void 0:n.signatureHtml,signatureText:m?void 0:n.signature}),ct=a.jsxs("button",{"aria-label":`复制第 ${n.floor} 楼链接`,className:"thread-floor-index",onClick:et,title:"复制楼层链接",type:"button",children:["#",n.floor]}),ut=a.jsxs(a.Fragment,{children:[a.jsx(Qr,{canDelete:!l&&(!i||s)&&(n.canDelete??n.isOwn??!1),canEdit:!l&&(!i||s)&&!!n.isOwn,canQuote:e,canReply:t,deleting:Y,editHref:o,onEditSignup:!l&&i&&!s&&n.isOwn?x:void 0,onDelete:g=>{ie.current=g,q(""),P({kind:"floor"})},onQuote:g=>h(n,g),onReply:()=>Te()}),$&&a.jsx("p",{className:"thread-floor-delete-error",role:"alert",children:$}),je.length>0&&a.jsx("section",{className:"nested-replies",ref:O,"aria-label":`${n.floor} 楼的楼中楼回复`,children:je.map(g=>a.jsxs("article",{children:[a.jsx("img",{src:g.author.avatar,alt:""}),a.jsxs("div",{className:"nested-reply-main",children:[a.jsxs("div",{className:"nested-reply-identity",children:[a.jsx("a",{className:"nested-reply-author",href:te(g.author.name),children:g.author.name}),g.target&&a.jsxs("span",{className:"nested-reply-target",children:[" ","回复"," ",a.jsx("a",{className:"nested-reply-author",href:te(g.target),children:g.target})]})]}),g.contentHtml?a.jsx(Ye,{className:"nested-reply-content",html:g.contentHtml,onImageOpen:Ne,variant:"nested"}):a.jsx("p",{children:g.content}),a.jsxs("footer",{className:"nested-reply-footer",children:[a.jsx("time",{children:ye(g.publishedAt)}),t&&a.jsx("button",{onClick:()=>Te(g.author.name),type:"button",children:"回复"}),!l&&g.canDelete&&a.jsxs("button",{className:"nested-reply-delete",disabled:k===g.id,onClick:C=>{ie.current=C.currentTarget,B(""),P({kind:"nested",reply:g})},type:"button",children:[a.jsx(ve,{size:12}),k===g.id?"删除中":"删除"]})]})]})]},g.id))}),ae&&a.jsx("p",{className:"nested-reply-delete-error",role:"alert",children:ae}),R!==void 0&&t&&a.jsxs("form",{className:"nested-reply-composer",onSubmit:rt,children:[a.jsxs("div",{className:"nested-reply-input-field",children:[a.jsx("textarea",{"aria-describedby":F,"aria-invalid":A.isOverLimit||void 0,"aria-label":R?`回复 @${R}`:`回复第 ${n.floor} 楼`,onChange:g=>{_(g.target.value),y("")},placeholder:R?`回复 @${R}`:"写一条楼中楼回复",ref:Re,rows:2,value:G}),a.jsxs("small",{"aria-label":`已输入 ${A.length} 字，最多 ${A.limit} 字`,className:`nested-reply-character-count${A.isOverLimit?" nested-reply-character-count-error":""}`,id:F,children:[A.length," / ",A.limit]})]}),a.jsxs("div",{className:"nested-reply-composer-actions",children:[a.jsx("button",{"aria-label":"取消楼中楼回复",className:"nested-reply-cancel",disabled:U,onClick:Le,type:"button",children:a.jsx(xe,{size:15})}),a.jsxs("button",{className:"nested-reply-submit",disabled:!A.canSubmit||U,type:"submit",children:[a.jsx(qt,{size:14}),U?"发送中":"发送"]})]}),Z&&a.jsx("p",{className:"nested-reply-error",role:"alert",children:Z})]})]}),dt=a.jsxs(a.Fragment,{children:[w&&a.jsxs("div",{"aria-live":"polite",className:"copy-floor-toast",role:"status",children:[a.jsx(Nt,{"aria-hidden":"true",size:15}),"已复制楼层链接"]}),a.jsx(he,{children:V&&a.jsx(Dt,{images:V.images,initialImageIndex:V.imageIndex,onImageChange:V.onImageChange,onClose:tt})}),a.jsx(he,{mobileSize:"compact",children:!l&&N&&a.jsx(Xr,{floor:n,isMainPost:s,onCancel:ot,onConfirm:st,target:N})})]});return a.jsx(Yr,{articleAfterContent:dt,author:n.author,avatarRail:it,content:lt,decorationImageSrc:r,editedAt:n.editedAt,floor:n.floor,floorIndex:ct,id:String(n.floor),inlineAvatar:d,mainAfterContent:ut,onCopy:Kr,publishedAt:n.publishedAt,showAuthorProfile:f})}function He(e){const t=e.closest(".thread-floor")?.querySelector(".thread-floor-body");return Bt(window.getSelection(),t??null)}function Xr({floor:e,isMainPost:t,onCancel:r,onConfirm:o,target:n}){const i=n.kind==="nested"?n.reply:null,s=i?"删除楼中楼回复":t?"删除主楼":"删除回复",l=i?"":t?"删除主楼后，下一楼将顺位成为主楼；如果没有其他回复，整个主题会被删除。":"删除后，该楼内容将移入回收站，后续楼层编号会顺次调整。",d=i?.author.name??e.author.name,f=i?`#${e.floor} · 楼中楼`:`#${e.floor}`,m=Zr(i?.content||e.quoteText||e.paragraphs[0]||"");return u.useEffect(()=>(document.body.classList.add("thread-delete-dialog-open"),()=>document.body.classList.remove("thread-delete-dialog-open")),[]),u.useEffect(()=>{function p(b){b.key==="Escape"&&r()}return document.addEventListener("keydown",p),()=>document.removeEventListener("keydown",p)},[r]),a.jsx(Ue,{className:"thread-delete-dialog-backdrop",onMouseDown:p=>{p.currentTarget===p.target&&r()},role:"presentation",children:a.jsxs("section",{"aria-describedby":l?"thread-delete-dialog-description":void 0,"aria-labelledby":"thread-delete-dialog-title","aria-modal":"true",className:"thread-delete-dialog",role:"dialog",children:[a.jsxs("header",{children:[a.jsx("span",{className:"thread-delete-dialog-icon","aria-hidden":"true",children:a.jsx(Jt,{size:19})}),a.jsx("div",{children:a.jsx("h2",{id:"thread-delete-dialog-title",children:s})}),a.jsx("button",{"aria-label":"关闭删除确认",onClick:r,type:"button",children:a.jsx(xe,{size:18})})]}),a.jsxs("div",{className:"thread-delete-dialog-body",children:[l&&a.jsx("p",{id:"thread-delete-dialog-description",children:l}),a.jsxs("div",{className:"thread-delete-dialog-target",children:[a.jsxs("span",{children:[d," · ",f]}),a.jsx("p",{children:m||"此回复没有可预览的文字内容。"})]})]}),a.jsxs("footer",{children:[a.jsx("button",{autoFocus:!0,className:"thread-delete-dialog-cancel",onClick:r,type:"button",children:"取消"}),a.jsxs("button",{className:"thread-delete-dialog-confirm",onClick:o,type:"button",children:[a.jsx(ve,{size:15}),"确认删除"]})]})]})})}function Zr(e){const t=e.replace(/\s+/g," ").trim();return t.length>100?`${t.slice(0,100).trimEnd()}…`:t}function ea(e){const t=r=>String(r).padStart(2,"0");return`${e.getFullYear()}-${t(e.getMonth()+1)}-${t(e.getDate())} ${t(e.getHours())}:${t(e.getMinutes())}:${t(e.getSeconds())}`}export{Gr as T,ca as a,Yr as b,Qr as c,ua as d,la as f,Xt as p,nr as w};
