// Shared behaviour for secondary pages (news, privacy policy, terms of service).
// A trimmed sibling of app.js: only the bits that don't depend on homepage-only
// markup (hero countdown, modal forms, gallery/lightbox, live server panel).
const $=(s,c=document)=>c.querySelector(s), $$=(s,c=document)=>[...c.querySelectorAll(s)];

const nav=$('.nav'), menu=$('.menu'), navlinks=$('.navlinks');
if(menu&&navlinks){
  menu.addEventListener('click',()=>{const open=navlinks.classList.toggle('open');menu.setAttribute('aria-expanded',open)});
  $$('.navlinks a').forEach(a=>a.addEventListener('click',()=>navlinks.classList.remove('open')));
}

const revealObs=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');revealObs.unobserve(e.target)}}),{threshold:.12});
$$('.reveal').forEach(el=>revealObs.observe(el));

const scrollProgress=document.createElement('div');scrollProgress.className='scroll-progress';document.body.appendChild(scrollProgress);
function updateScrollProgress(){const h=document.documentElement;const max=h.scrollHeight-h.clientHeight;scrollProgress.style.width=(max>0?(h.scrollTop/max)*100:0)+'%'}
addEventListener('scroll',updateScrollProgress,{passive:true});updateScrollProgress();

const reduceMotion=matchMedia('(prefers-reduced-motion: reduce)').matches;
const hasHover=matchMedia('(hover: hover)').matches;

if(!reduceMotion&&hasHover){
  const glow=document.createElement('div');glow.className='cursor-glow';document.body.appendChild(glow);
  let mx=innerWidth/2,my=innerHeight/2,gx=mx,gy=my,active=false;
  addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;if(!active){active=true;glow.classList.add('active')}},{passive:true});
  document.addEventListener('mouseleave',()=>{active=false;glow.classList.remove('active')});
  (function loop(){gx+=(mx-gx)*.14;gy+=(my-gy)*.14;glow.style.transform=`translate(${gx}px,${gy}px) translate(-50%,-50%)`;requestAnimationFrame(loop)})();
}

if(!reduceMotion&&hasHover){
  $$('.news-card,.app-card,.feature-grid>div').forEach(el=>{
    el.classList.add('tilt');
    el.addEventListener('mousemove',e=>{
      const r=el.getBoundingClientRect();
      const px=(e.clientX-r.left)/r.width, py=(e.clientY-r.top)/r.height;
      const rx=(py-.5)*-6, ry=(px-.5)*6;
      el.style.transform=`perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-4px)`;
      el.style.setProperty('--mx',`${px*100}%`);el.style.setProperty('--my',`${py*100}%`);
    },{passive:true});
    el.addEventListener('mouseleave',()=>{el.style.transform=''});
  });
}

$$('img').forEach(img=>{
  if(img.complete&&img.naturalWidth)img.classList.add('is-loaded');
  else img.addEventListener('load',()=>img.classList.add('is-loaded'));
});

if(nav){
  addEventListener('scroll',()=>{
    nav.classList.toggle('scrolled',scrollY>100);
    const backTop=$('.back-top'); if(backTop)backTop.classList.toggle('show',scrollY>700);
  },{passive:true});
}
const backTopBtn=$('.back-top');
if(backTopBtn)backTopBtn.addEventListener('click',()=>scrollTo({top:0,behavior:'smooth'}));
