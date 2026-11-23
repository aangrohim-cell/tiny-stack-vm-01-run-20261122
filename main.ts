// tiny-stack vm
import{mkdirSync as mk,readdirSync as rd,readFileSync as rf,writeFileSync as wf}from'node:fs';import{join as J}from'node:path';
const I=new Array(256);const s=(o,i,p,u)=>I[o]=[i,p,u];
s(0,0,0,0);s(1,1,0,1);s(2,4,0,1);s(3,0,1,0);s(4,0,1,2);s(5,0,2,2);s(6,0,2,3);s(7,0,3,3);
s(16,0,2,1);s(17,0,2,1);s(18,0,2,1);s(19,0,2,1);s(20,0,2,1);s(21,0,2,1);s(22,0,2,1);s(23,0,1,1);
s(24,0,2,1);s(25,0,2,1);s(26,0,2,1);s(27,0,1,1);s(28,0,2,1);s(29,0,2,1);s(30,0,2,1);
s(32,0,2,1);s(33,0,2,1);s(34,0,2,1);s(48,2,0,0);s(49,2,1,0);s(50,2,1,0);s(51,2,0,0);s(52,0,0,0);
s(64,0,1,1);s(65,0,2,0);s(80,0,1,0);s(81,0,1,0);s(82,0,0,1);s(83,0,1,0);
function run(p:Uint8Array,inp:Uint8Array){const D:number[]=[],C:number[]=[];const M=new Int32Array(256);const out:number[]=[];let pc=0,ip=0,st=0;
const E=(c:number)=>{throw c};const pop=()=>{if(D.length<1)E(2);return D.pop()!};const push=(v:number)=>{if(D.length+1>256)E(3);D.push(v|0)};
try{for(;;){if(st===1e6)E(10);if(pc<0||pc>=p.length)E(9);const op=p[pc],e=I[op];if(!e)E(5);if(pc+e[0]>=p.length)E(9);st++;const nx=pc+1+e[0];if(D.length-e[1]+e[2]>256)E(3);if(D.length<e[1])E(2);pc=nx;
switch(op){
case 0:return{out,code:0};
case 1:push((p[nx-1]<<24)>>24);break;
case 2:push(p[nx-4]|(p[nx-3]<<8)|(p[nx-2]<<16)|(p[nx-1]<<24));break;
case 3:D.pop();break;
case 4:{const a=pop();push(a);push(a);break}
case 5:{const b=pop(),a=pop();push(b);push(a);break}
case 6:{const b=pop(),a=pop();push(a);push(b);push(a);break}
case 7:{const c=pop(),b=pop(),a=pop();push(b);push(c);push(a);break}
case 23:{push(-pop());break}
case 27:{push(~pop());break}
case 16:case 17:case 18:case 19:case 20:case 21:case 22:case 24:case 25:case 26:case 28:case 29:case 30:case 32:case 33:case 34:{
const b=pop(),a=pop();let r=0;
if(op===16)r=(a+b)|0;else if(op===17)r=(a-b)|0;else if(op===18)r=Math.imul(a,b);
else if(op===19){if(b===0)E(4);r=a===-2147483648&&b===-1?a:(a/b)|0}
else if(op===20){if(b===0)E(4);r=b===-1?0:a%b|0}
else if(op===21){if(b===0)E(4);r=Math.floor((a>>>0)/(b>>>0))|0}
else if(op===22){if(b===0)E(4);r=((a>>>0)%(b>>>0))|0}
else if(op===24)r=a&b;else if(op===25)r=a|b;else if(op===26)r=a^b;
else if(op===28)r=a<<(b&31);else if(op===29)r=a>>(b&31);else if(op===30)r=(a>>>(b&31))|0;
else if(op===32)r=a===b?1:0;else if(op===33)r=a<b?1:0;else r=(a>>>0)<(b>>>0)?1:0;
push(r);break}
case 48:case 49:case 50:{let t=true;if(op!==48){const v=pop();t=op===49?v===0:v!==0}if(t)pc=nx+(((p[nx-2]|(p[nx-1]<<8))<<16)>>16);break}
case 51:{if(C.length===64)E(7);C.push(nx);pc=p[nx-2]|(p[nx-1]<<8);break}
case 52:{if(C.length===0)E(8);pc=C.pop()!;break}
case 64:{const a=pop();if(a<0||a>255)E(6);push(M[a]);break}
case 65:{const ad=pop(),v=pop();if(ad<0||ad>255)E(6);M[ad]=v;break}
case 80:{const b=Array.from(String(pop()),c=>c.charCodeAt(0));if(out.length+b.length>65536)E(11);for(const x of b)out.push(x);break}
case 81:{if(out.length+1>65536)E(11);out.push(pop()&255);break}
case 82:push(ip<inp.length?inp[ip++]:-1);break;
case 83:return{out,code:pop()&255};
default:E(5);
}}}catch(e){return{out,code:e as number}}
}
const IN=process.env.MAKEFUN_INPUT_DIR??'/input',OU=process.env.MAKEFUN_OUTPUT_DIR??'/output';
for(const id of rd(IN).sort()){const r=run(new Uint8Array(rf(J(IN,id,'program.bin'))),new Uint8Array(rf(J(IN,id,'input.bin'))));mk(J(OU,id),{recursive:true});wf(J(OU,id,'stdout.bin'),Uint8Array.from(r.out));wf(J(OU,id,'exit.txt'),`${r.code}\n`)}
