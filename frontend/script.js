const chat=document.getElementById('chat');
const input=document.getElementById('msg');
document.getElementById('send').onclick=()=>{
 const t=input.value.trim();
 if(!t)return;
 add('YOU: '+t,'user');
 input.value='';
 add('D.I.S.C.O: Processing...','ai');
 setTimeout(()=>{
 chat.lastChild.innerText='D.I.S.C.O: Systems online. How may I assist you, Boss?';
 },1000);
};
function add(text,who){
 const d=document.createElement('div');
 d.className='msg '+who;
 d.innerText=text;
 chat.appendChild(d);
 chat.scrollTop=chat.scrollHeight;
}
