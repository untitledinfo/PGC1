// Premium motion and presentation enhancements. All effects respect reduced motion.
(() => {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Repair common UTF-8 mojibake in the supplied source without touching form inputs.
  const fixes = new Map([
    ['â€”','—'],['â€“','–'],['â†’','→'],['â†—','↗'],['â†‘','↑'],['â†“','↓'],
    ['â€¢','•'],['â€¦','…'],['â™¥','♥'],['â™›','♛'],['â˜…','★'],['âœ“','✓'],
    ['â€œ','“'],['â€','”'],['â€™','’'],['Â©','©'],['Ã—','×'],['FarhanÃ©','Farhané'],
    ['ðŸ¥‡','🥇'],['ðŸ¥ˆ','🥈'],['ðŸ¥‰','🥉'],['ðŸ‡µðŸ‡°','🇵🇰']
  ]);
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  const nodes=[]; while(walker.nextNode()) nodes.push(walker.currentNode);
  nodes.forEach(node => {
    if (/^(SCRIPT|STYLE|TEXTAREA)$/.test(node.parentElement?.tagName || '')) return;
    let value=node.nodeValue;
    fixes.forEach((clean,bad)=>{ value=value.split(bad).join(clean); });
    node.nodeValue=value;
  });
  document.querySelectorAll('[placeholder],[title],[aria-label],[alt]').forEach(el => {
    ['placeholder','title','aria-label','alt'].forEach(attr => {
      if(!el.hasAttribute(attr)) return;
      let value=el.getAttribute(attr); fixes.forEach((clean,bad)=>{value=value.split(bad).join(clean)});
      el.setAttribute(attr,value);
    });
  });

  // Stagger the entrance of card collections after their parent reveal completes.
  const groups=document.querySelectorAll('.team-grid,.app-grid,.feature-grid,.quotes,.gallery-grid');
  const staggerObs=new IntersectionObserver(entries=>entries.forEach(entry=>{
    if(!entry.isIntersecting) return;
    [...entry.target.children].forEach((child,i)=>child.style.setProperty('--i',i));
    entry.target.classList.add('reveal-stagger'); staggerObs.unobserve(entry.target);
  }),{threshold:.12});
  groups.forEach(group=>staggerObs.observe(group));

  if(reduced) return;
  // Subtle depth on the hero image follows pointer movement; capped to stay tasteful.
  const hero=document.querySelector('.hero'), bg=document.querySelector('.hero-bg');
  if(hero&&bg&&matchMedia('(pointer:fine)').matches){
    hero.addEventListener('pointermove',event=>{
      const rect=hero.getBoundingClientRect();
      const x=(event.clientX-rect.left)/rect.width-.5, y=(event.clientY-rect.top)/rect.height-.5;
      bg.style.transform=`scale(1.025) translate3d(${x*-10}px,${y*-8}px,0)`;
    },{passive:true});
    hero.addEventListener('pointerleave',()=>{bg.style.transform='scale(1.01)'});
  }
})();
