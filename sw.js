if(!self.define){let e,i={};const n=(n,s)=>(n=new URL(n+".js",s).href,i[n]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=i,document.head.appendChild(e)}else e=n,importScripts(n),i()})).then((()=>{let e=i[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(s,r)=>{const t=e||("document"in self?document.currentScript.src:"")||location.href;if(i[t])return;let d={};const f=e=>n(e,t),o={module:{uri:t},exports:d,require:f};i[t]=Promise.all(s.map((e=>o[e]||f(e)))).then((e=>(r(...e),d)))}}define(["./workbox-3e911b1d"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/index-BnHHuiP-.css",revision:null},{url:"assets/index-DC4MJL21.js",revision:null},{url:"index.html",revision:"a7499bdbf92f85230152f5ea59eed1e4"},{url:"registerSW.js",revision:"d97fd7fff1ed3bdc19bcd19f47843127"},{url:"pwa-192x192.png",revision:"647a2475e7aa73d818eb0b380edca28d"},{url:"pwa-512x512.png",revision:"945b4e70a7a62b6485ec115e0ad191f7"},{url:"pwa-maskable-192x192.png",revision:"08aeee2f045f67e02f64fd383bf6f842"},{url:"pwa-maskable-512x512.png",revision:"fbe4d1c88fab2f14bc1de14519663e1e"},{url:"manifest.webmanifest",revision:"d8a6c2a8d6f4310aa1698885e080b16e"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
