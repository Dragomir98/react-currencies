var e=Object.defineProperty,t=Object.defineProperties,r=Object.getOwnPropertyDescriptors,a=Object.getOwnPropertySymbols,n=Object.prototype.hasOwnProperty,l=Object.prototype.propertyIsEnumerable,s=(t,r,a)=>r in t?e(t,r,{enumerable:!0,configurable:!0,writable:!0,value:a}):t[r]=a;import{R as o,N as c,L as u,C as i,a as m,S as d,r as p,b as f,c as g,T as y,d as E,e as h,f as b,g as v,h as x,i as N,B as S}from"./vendor.152648a1.js";!function(){const e=document.createElement("link").relList;if(!(e&&e.supports&&e.supports("modulepreload"))){for(const e of document.querySelectorAll('link[rel="modulepreload"]'))t(e);new MutationObserver((e=>{for(const r of e)if("childList"===r.type)for(const e of r.addedNodes)"LINK"===e.tagName&&"modulepreload"===e.rel&&t(e)})).observe(document,{childList:!0,subtree:!0})}function t(e){if(e.ep)return;e.ep=!0;const t=function(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),"use-credentials"===e.crossorigin?t.credentials="include":"anonymous"===e.crossorigin?t.credentials="omit":t.credentials="same-origin",t}(e);fetch(e.href,t)}}();function C(){return o.createElement(c,{mr:5,bg:"dark",variant:"dark",expand:"sm",className:"px-4"},o.createElement(u,{to:"/"},o.createElement(c.Brand,null,"Home")))}function w(e){return o.createElement(o.Fragment,null,o.createElement(C,null),e.children)}const D=({arr:e,option:t,filterStatement:r,groupDescription:a})=>o.createElement(i,{lg:4,md:6,sm:6,xs:12,className:`mx-auto ${e.filter(r).length<1&&"d-none"}`},e.filter(r).length>=1&&o.createElement(m,{className:"my-3 border border-secondary"},o.createElement(m.Header,{className:"text-center bg-secondary text-white"},"Rates ",a),o.createElement(m.Body,{className:"text-center"},o.createElement("div",null,e.filter(r).map((e=>o.createElement("div",{key:e[1]},t,"-",e[0].toUpperCase(),": ",e[1].toFixed(1))))),o.createElement(m.Subtitle,{className:"mt-2 text-center"},"Count: ",e.filter(r).length))));function R({values:e,selectedCurrency:t}){return o.createElement(m,{className:"currency-output mt-3 border border-secondary"},o.createElement(m.Title,{className:"text-center bg-secondary text-white p-2 m-0"},"All rates that include"," ",o.createElement("strong",{className:"fw-bold"},t)),o.createElement(m.Body,{className:"text-center"},e.map((e=>o.createElement("div",{key:Math.random()+e[3]},e[1].toUpperCase(),"-",e[2].toUpperCase(),":"," ",e[0].toFixed(1))))))}function O(){return o.createElement("div",{className:"d-flex justify-content-center mt-5"},o.createElement(d,{animation:"border",role:"status"},o.createElement("span",{className:"visually-hidden"},"Loading...")))}function j(){const[e,c]=p.exports.useState(L[0].value),[u,i]=p.exports.useState([]),[m,d]=p.exports.useState([]),[v,x]=p.exports.useState(!1),[N,S]=p.exports.useState([]),[C,w]=p.exports.useState([]),[j,I]=p.exports.useState([]),[M,P]=p.exports.useState([]),[T,V]=p.exports.useState([]),[$,H]=p.exports.useState([]);p.exports.useEffect((async()=>{if(A("exchangeRates")&&A("requestResults")){const e=A("exchangeRates");for(let t in e){x(!0);const r=e[t];m.push(r)}}else{for(let e in L)for(let t in L)L[e].value!==L[t].value&&u.push(k(1,L[e].value.toLowerCase(),L[t].value.toLowerCase()));for(let t in u){x(!0);try{const e=await f.get(u[t][0]).then((e=>e.data)),r=Object.entries(e)[1];m.push(r)}catch(e){console.log(`Error: ${e}`)}}U("requestResults",u),U("exchangeRates",m)}F(),((e,t)=>{for(let r=0;r<e.length;r+=6){const t=e.slice(r,r+6);N.push(t)}})(m),w(N[0]),x(!1)}),[]);return p.exports.useEffect((async()=>{for(let t in L)e===L[t].value&&w(N[t]);if(A("requestResults")&&A("storageCurrency")){const e=A("storageCurrency");P(e)}else{x(!0);const t=A("requestResults");for(let a in t)t[a][0].includes(e.toLowerCase())&&j.push(t[a]);let r=1;for(let e in j){const t=await f.get(j[e][0]).then((e=>e.data)),a=[Object.values(t)[1]].concat(j[e][1],j[e][2],r);M.push(a),r++}U("storageCurrency",M),x(!1)}if(A("absoluteValues")){const e=A("absoluteValues");V(e)}else{for(let e=0;e<M.length;e++){let t;for(let r=e+1;r<M.length;r++)q(M[e][0].toFixed(1),M[r][0].toFixed(1))<=.5&&(t=M[e]);Boolean(t)&&T.push(M[e])}U("absoluteValues",T),V(T)}H((e=>{return o=((e,t)=>{for(var r in t||(t={}))n.call(t,r)&&s(e,r,t[r]);if(a)for(var r of a(t))l.call(t,r)&&s(e,r,t[r]);return e})({},e),t(o,r({absoluteValues:T}));var o}))}),[e]),o.createElement("div",null,o.createElement(g,{options:L,value:L.find((t=>t.value===e)),onChange:e=>{const t=e.value;c(t),B("storageRates"),B("storageCurrency"),B("absoluteValues"),I([]),P([]),V([])},className:"currency-select"}),o.createElement("div",{className:"rates-output"},v?o.createElement(O,null):o.createElement(y,{defaultActiveKey:"rates1",className:"my-4 justify-content-center"},o.createElement(E,{eventKey:"rates1",title:"Exchange rates for current currency"},o.createElement(h,null,o.createElement(b,null,o.createElement(D,{arr:C,option:e,filterStatement:e=>e[1]<1,groupDescription:"less than 1"}),o.createElement(D,{arr:C,option:e,filterStatement:e=>e[1]>=1&&e[1]<=1.5,groupDescription:"between 1 and 1.5"}),o.createElement(D,{arr:C,option:e,filterStatement:e=>e[1]>1.5,groupDescription:"bigger than 1.5"})))),o.createElement(E,{eventKey:"rates2",title:"All possible rates"},o.createElement(h,null,o.createElement(R,{values:T,selectedCurrency:e}))))))}const L=[{value:"USD",label:"USD"},{value:"EUR",label:"EUR"},{value:"AUD",label:"AUD"},{value:"CAD",label:"CAD"},{value:"CHF",label:"CHF"},{value:"NZD",label:"NZD"},{value:"BGN",label:"BGN"}],U=(e,t)=>localStorage.setItem(e,JSON.stringify(t)),A=e=>JSON.parse(localStorage.getItem(e))||null,B=e=>localStorage.removeItem(e),F=()=>{const e=new Date(Date.now()),t=new Date(e.getFullYear(),e.getMonth(),e.getDate()+1,0,0,0).getTime()-e.getTime();setTimeout((()=>{console.log("The end of the current day has come"),B("requestResults"),B("exchangeRates"),B("storageRates"),B("storageCurrency")}),t)},k=(e,t,r)=>[`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@${e}/latest/currencies/${t}/${r}.json`,t,r],q=(e,t)=>e>t?Math.abs(e-t):Math.abs(t-e);function I(){return o.createElement("div",null,o.createElement("h2",{className:"py-4 text-center"},"Choose a currency to view all conversion rates"),o.createElement(j,null))}function M(){return o.createElement(w,null,o.createElement(v,null,o.createElement(x,{exact:!0,path:"/",component:I})))}N.render(o.createElement(o.StrictMode,null,o.createElement(S,{basename:"/react-currencies/"},o.createElement(M,null))),document.getElementById("root"));
