var V=Object.defineProperty;var B=(i,t,a)=>t in i?V(i,t,{enumerable:!0,configurable:!0,writable:!0,value:a}):i[t]=a;var l=(i,t,a)=>(B(i,typeof t!="symbol"?t+"":t,a),a);import{d as E,e as m,f as P,g as z,o as q,c as F,b as d,q as M,v as b,u as x,s as R,p as L,m as N,_ as U}from"./index-b4b8ccc3.js";const I=i=>(L("data-v-6ebe25c5"),i=i(),N(),i),A={sm:"px-18 py-12",class:"relative z-20 flex flex-col items-center box1 p-4 gap-y-4"},D=I(()=>d("span",null,"点击粒子个数",-1)),H=I(()=>d("span",null,"画布最多粒子个数",-1)),T=["min"],W=E({__name:"index",setup(i){const t=m(),a=P(()=>t.value.getContext("2d")),v=m([]),u=m(10),f=m(200);class X{constructor({x:s,y:n,radius:o,color:h,speedX:p,speedY:c}){l(this,"x");l(this,"y");l(this,"radius");l(this,"color");l(this,"speedX");l(this,"speedY");l(this,"canvasRef");this.x=s,this.y=n,this.radius=o,this.color=h,this.speedX=p,this.speedY=c}draw(){a.value.beginPath(),a.value.arc(this.x,this.y,this.radius,0,Math.PI*2),a.value.closePath(),a.value.fillStyle=this.color,a.value.fill()}update(){this.x+=this.speedX,this.y+=this.speedY,(this.x-this.radius<0||this.x+this.radius>=t.value.width)&&Math.random()>.1&&(this.speedX*=-1),(this.y-this.radius<0||this.y+this.radius>=t.value.height)&&Math.random()>.1&&(this.speedY*=-1)}}function _(){const e=t.value;e.width=window.innerWidth-100,e.height=window.innerHeight-140}function Y(){return"#"+Math.random().toString(16).slice(2,8)}function r(e,s){return Math.floor(Math.random()*(s-e+1)+e)}function C(){for(let e=0;e<10;e++){const s=r(1,5),n=r(s,t.value.width-s),o=r(s,t.value.height-s);y(n,o)}}function w(){requestAnimationFrame(w),a.value.clearRect(0,0,t.value.width,t.value.height),v.value.forEach(e=>{e.draw(),e.update()}),S(f.value)}function y(e,s,n=2){const o=r(1,r(3,7)),h=Y(),p=(Math.random()-.5)*n,c=(Math.random()-.5)*n;v.value.push(new X({x:e,y:s,radius:o,color:h,speedX:p,speedY:c}))}function k(e){const s=e.clientX,n=e.clientY,o=t.value.getBoundingClientRect(),h=s-o.left,p=n-o.top,c=4;for(let g=0;g<u.value;g++)y(h,p,c*c)}function S(e){const s=v.value.filter(n=>n.x>0&&n.x<t.value.width&&n.y>0&&n.y<t.value.height);s.length>e&&v.value.splice(e,s.length-e)}return z(()=>{var e;window.addEventListener("resize",_),(e=t.value)==null||e.addEventListener("click",k),_(),C(),w()}),(e,s)=>(q(),F("div",A,[d("div",null,[D,M(d("input",{class:"px-4 py-3 rounded-md w-80 text-base",type:"text","onUpdate:modelValue":s[0]||(s[0]=n=>R(u)?u.value=n:null),placeholder:"点击粒子个数"},null,512),[[b,x(u)]])]),d("div",null,[H,M(d("input",{class:"px-4 py-3 rounded-md w-80 text-base",type:"text","onUpdate:modelValue":s[1]||(s[1]=n=>R(f)?f.value=n:null),min:x(u)*2,placeholder:"画布最多粒子个数"},null,8,T),[[b,x(f)]])]),d("canvas",{ref_key:"canvasRef",ref:t,width:"700",class:"box rounded-md"},null,512)]))}});const J=U(W,[["__scopeId","data-v-6ebe25c5"]]);export{J as default};