const $=(s,c=document)=>c.querySelector(s), $$=(s,c=document)=>[...c.querySelectorAll(s)];

// Navigation and reveal motion
const nav=$('.nav'), menu=$('.menu'), navlinks=$('.navlinks');
menu.addEventListener('click',()=>{const open=navlinks.classList.toggle('open');menu.setAttribute('aria-expanded',open)});
$$('.navlinks a').forEach(a=>a.addEventListener('click',()=>navlinks.classList.remove('open')));
const revealObs=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')}),{threshold:.12});
$$('.reveal').forEach(el=>revealObs.observe(el));
const sections=$$('main section[id]');
addEventListener('scroll',()=>{
  nav.classList.toggle('scrolled',scrollY>100); $('.back-top').classList.toggle('show',scrollY>700);
  let current='home'; sections.forEach(s=>{if(scrollY>=s.offsetTop-180)current=s.id});
  $$('.navlinks a').forEach(a=>a.classList.toggle('active',a.hash===`#${current}`));
},{passive:true});
$('.back-top').addEventListener('click',()=>scrollTo({top:0,behavior:'smooth'}));

// Countdown lands on the next Sunday at 8 PM PKT.
function nextEvent(){const now=new Date(), target=new Date(now); target.setHours(20,0,0,0); const add=(7-now.getDay())%7;if(add===0&&now>=target)target.setDate(target.getDate()+7);else target.setDate(target.getDate()+add);return target}
const target=nextEvent();
function tick(){let n=Math.max(0,target-Date.now());const d=Math.floor(n/864e5);n%=864e5;const h=Math.floor(n/36e5);n%=36e5;const m=Math.floor(n/6e4);$$('[data-days]').forEach(x=>x.textContent=String(d).padStart(2,'0'));$$('[data-hours]').forEach(x=>x.textContent=String(h).padStart(2,'0'));$$('[data-minutes]').forEach(x=>x.textContent=String(m).padStart(2,'0'))} tick();setInterval(tick,30000);

// Server panel and clipboard
const editions={java:{ip:'play.pgcmc.fun',port:'25568'},bedrock:{ip:'play.pgcmc.fun',port:'1054'}};let edition='java';
$$('[data-edition]').forEach(b=>b.addEventListener('click',()=>{edition=b.dataset.edition;$$('[data-edition]').forEach(x=>x.classList.toggle('active',x===b));$('[data-ip]').textContent=editions[edition].ip;$('[data-port]').textContent=editions[edition].port}));
function toast(msg){const el=$('.toast');el.textContent=msg;el.classList.add('show');clearTimeout(toast.t);toast.t=setTimeout(()=>el.classList.remove('show'),2300)}
$$('[data-copy]').forEach(b=>b.addEventListener('click',async()=>{const value=`${editions[edition].ip}:${editions[edition].port}`;try{await navigator.clipboard.writeText(value);toast(`${edition.toUpperCase()} address copied: ${value}`)}catch{toast(`Server: ${value}`)}}));

// Counters
const countObs=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting||e.target.dataset.done)return;e.target.dataset.done=1;const end=+e.target.dataset.counter,start=performance.now(),dur=1500,prefix=e.target.dataset.prefix||'';function go(t){const p=Math.min(1,(t-start)/dur),v=Math.floor(end*(1-Math.pow(1-p,3)));e.target.textContent=prefix+v.toLocaleString();if(p<1)requestAnimationFrame(go);else e.target.textContent=prefix+end.toLocaleString()};requestAnimationFrame(go)}));$$('[data-counter]').forEach(el=>countObs.observe(el));

// FAQ keeps one item open at a time
$$('.faq details').forEach(d=>d.addEventListener('toggle',()=>{if(d.open)$$('.faq details').forEach(x=>{if(x!==d)x.open=false})}));

// Modal form templates and local submission demo
const modal=$('.modal'), body=$('.modal-body');
const data={
  event:{eyebrow:'EVENT REGISTRATION',title:'SECURE YOUR SPOT',desc:'Register for The Last Crafter Standing. Confirmation will be sent through Discord.',role:'Minecraft username',type:'Event'},
  staff:{eyebrow:'PGC APPLICATIONS',title:'JOIN THE STAFF TEAM',desc:'Tell us how you can help make PGC safer, stronger and more fun.',role:'Preferred role',type:'Staff'},
  developer:{eyebrow:'PGC APPLICATIONS',title:'BUILD THE NETWORK',desc:'Show us the technical craft you want to bring to Warrior Network.',role:'Primary skill',type:'Developer'},
  creator:{eyebrow:'CREATOR PROGRAM',title:'CREATE WITH PGC',desc:'Apply for creator support, promotion and exclusive community access.',role:'Channel / platform',type:'Creator'}
};
function openForm(kind){const x=data[kind];body.innerHTML=`<span class="kicker">${x.eyebrow}</span><h2>${x.title}</h2><p>${x.desc}</p><form data-kind="${x.type}"><label>FULL NAME<input name="name" required placeholder="Your name"></label><label>DISCORD USERNAME<input name="discord" required placeholder="username"></label><label>${x.role.toUpperCase()}<input name="role" required placeholder="Tell us here"></label><label>AGE<input name="age" required type="number" min="13" placeholder="13+"></label><label class="full">WHY PGC?<textarea name="message" required placeholder="A short, honest answer works best."></textarea></label><button class="btn btn-blue" type="submit">Submit ${x.type} application →</button></form>`;modal.showModal();$('form',body).addEventListener('submit',submitForm)}
function submitForm(e){e.preventDefault();const form=e.currentTarget,entries=Object.fromEntries(new FormData(form));const saved=JSON.parse(localStorage.getItem('pgc-submissions')||'[]');saved.push({...entries,type:form.dataset.kind,date:new Date().toISOString()});localStorage.setItem('pgc-submissions',JSON.stringify(saved));modal.close();toast('Application received — welcome to the next level!')}
$$('[data-modal]').forEach(b=>b.addEventListener('click',()=>{if(b.dataset.modal==='rules'){body.innerHTML='<span class="kicker">TOURNAMENT FORMAT</span><h2>EVENT RULES</h2><p>1. Minecraft 1.20+ only.<br>2. No hacked clients, macros or exploit abuse.<br>3. Teaming in solo events is prohibited.<br>4. Respect staff decisions and fellow players.<br>5. Join the event voice channel 15 minutes before start.</p><button class="btn btn-blue" data-register>Accept & register →</button>';modal.showModal();$('[data-register]').onclick=()=>openForm('event')}else openForm(b.dataset.modal)}));
$('.modal-close',modal).addEventListener('click',()=>modal.close());modal.addEventListener('click',e=>{if(e.target===modal)modal.close()});

// Gallery filters and lightbox
$$('[data-filter]').forEach(b=>b.addEventListener('click',()=>{$$('[data-filter]').forEach(x=>x.classList.toggle('active',x===b));$$('.gallery-item').forEach(x=>x.hidden=!(b.dataset.filter==='all'||x.dataset.type===b.dataset.filter))}));
const lightbox=$('.lightbox');$$('.gallery-item').forEach(item=>item.addEventListener('click',()=>{$('.lightbox-image',lightbox).style.backgroundPosition=getComputedStyle(item).backgroundPosition;$('.lightbox h3').textContent=$('span',item).textContent.trim();lightbox.showModal()}));$('.modal-close',lightbox).addEventListener('click',()=>lightbox.close());lightbox.addEventListener('click',e=>{if(e.target===lightbox)lightbox.close()});

// Site search
const search=$('.search-overlay'), input=$('#site-search'), results=$('.search-results');
function toggleSearch(open){search.classList.toggle('open',open);search.setAttribute('aria-hidden',!open);if(open)setTimeout(()=>input.focus(),200)}
$('.search-toggle').onclick=()=>toggleSearch(true);$('.search-close').onclick=()=>toggleSearch(false);addEventListener('keydown',e=>{if(e.key==='Escape')toggleSearch(false);if(e.key==='/'&&!/input|textarea/i.test(document.activeElement.tagName)){e.preventDefault();toggleSearch(true)}});
const pages=[['Events','Sunday Tournament, prizes and registration','#event'],['Warrior Lifesteal SMP','Java and Bedrock server details','#server'],['Applications','Staff, developer and creator programs','#applications'],['Gallery','Builds and community moments','#gallery'],['Support','Frequently asked questions','#faq'],['Discord','Join the PGC Discord community','#discord']];
input.addEventListener('input',()=>{const q=input.value.toLowerCase().trim();const found=q?pages.filter(x=>x.join(' ').toLowerCase().includes(q)):[];results.innerHTML=found.length?found.map(x=>`<a href="${x[2]}"><b>${x[0]}</b> — ${x[1]}</a>`).join('<br><br>'):q?'No matches yet. Try “server” or “applications”.':'Press / anywhere to search quickly.';$$('a',results).forEach(a=>a.onclick=()=>toggleSearch(false))});input.dispatchEvent(new Event('input'));

// Lightweight simulated live server variation; ready to swap for a status API.
setInterval(()=>{$$('[data-server-count]').forEach(x=>x.textContent=String(835+Math.floor(Math.random()*25)))},10000);
