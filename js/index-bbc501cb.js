var d=Object.defineProperty;var v=(a,e,s)=>e in a?d(a,e,{enumerable:!0,configurable:!0,writable:!0,value:s}):a[e]=s;var n=(a,e,s)=>(v(a,typeof e!="symbol"?e+"":e,s),s);import{d as _,e as u,f as x,g as f,o as y,c as m,b as p,_ as g}from"./index-fdae2116.js";const b={sm:"px-18 py-12",class:"relative z-20 flex flex-col items-center box1 p-4 gap-y-4"},w=_({__name:"index",setup(a){class e{constructor(t,i,c,h){n(this,"x");n(this,"y");n(this,"r");n(this,"c");n(this,"vx");n(this,"vy");this.x=t,this.y=i,this.r=c,this.c=h,this.vx=2,this.vy=1}draw(t){t.beginPath(),t.arc(this.x,this.y,this.r,0,Math.PI*2),t.closePath(),t.fillStyle=this.c,t.fill()}move(t,i){this.x+=this.vx,this.y+=this.vy,(this.x-this.r<=0||this.x+this.r>=t)&&(this.vx=-this.vx),(this.y-this.r<=0||this.y+this.r>=i)&&(this.vy=-this.vy)}handleMouseInteraction(t){t.addEventListener("mousemove",i=>{const c=t.getBoundingClientRect(),h=i.clientX-c.left,r=i.clientY-c.top;this.vx=(h-this.x)/50,this.vy=(r-this.y)/50})}}const s=u(),l=x(()=>s.value.getContext("2d"));return f(()=>{const o=s.value;console.log("canvas :>> ",o);const t=new e(110,110,20,"black");t.handleMouseInteraction(o),i();function i(){l.value.clearRect(0,0,o.width,o.height),t.draw(l.value),t.move(o.width,o.height),requestAnimationFrame(i)}}),(o,t)=>(y(),m("div",b,[p("canvas",{ref_key:"canvasRef",ref:s,width:"500",class:"box rounded-md",height:"500"},null,512)]))}});const I=g(w,[["__scopeId","data-v-0a8981fb"]]);export{I as default};