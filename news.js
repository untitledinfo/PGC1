// News page: reads posts/index.json for the list of markdown files, fetches
// each one, parses a small "Key: value" frontmatter header (ending in a lone
// "---" line) for title/date/excerpt, and renders either a grid of cards or
// a single rendered article depending on the ?post= query param.
const $=(s,c=document)=>c.querySelector(s), $$=(s,c=document)=>[...c.querySelectorAll(s)];

function parsePost(raw){
  const parts=raw.split(/\r?\n---\r?\n/);
  const meta={};
  let body=raw;
  if(parts.length>1){
    parts[0].split(/\r?\n/).forEach(line=>{
      const m=line.match(/^([A-Za-z]+):\s*(.*)$/);
      if(m)meta[m[1].toLowerCase()]=m[2].trim();
    });
    body=parts.slice(1).join('\n---\n');
  }
  return {meta,body};
}

function formatDate(str){
  const d=new Date(str+'T00:00:00');
  if(isNaN(d))return str;
  return d.toLocaleDateString('en-US',{year:'numeric',month:'long',day:'numeric'});
}

async function loadManifest(){
  const res=await fetch('posts/index.json');
  if(!res.ok)throw new Error('manifest fetch failed');
  return res.json();
}

async function loadPost(file){
  const res=await fetch(`posts/${file}`);
  if(!res.ok)throw new Error(`post fetch failed: ${file}`);
  return parsePost(await res.text());
}

async function renderList(){
  const grid=$('#newsGrid');
  try{
    const manifest=await loadManifest();
    const posts=await Promise.all(manifest.map(async p=>({...p,...(await loadPost(p.file))})));
    posts.sort((a,b)=>new Date(b.meta.date||0)-new Date(a.meta.date||0));
    if(!posts.length){grid.innerHTML='<p class="news-empty">No posts yet — check back soon.</p>';return}
    grid.innerHTML=posts.map(p=>`
      <a class="news-card reveal visible" href="news.html?post=${encodeURIComponent(p.slug)}">
        <span class="news-date">${formatDate(p.meta.date||'')}</span>
        <h3>${(p.meta.title||'Untitled').replace(/</g,'&lt;')}</h3>
        <p>${(p.meta.excerpt||'').replace(/</g,'&lt;')}</p>
        <span class="text-link">Read more →</span>
      </a>`).join('');
  }catch(err){
    grid.innerHTML='<p class="news-empty">Couldn\u2019t load news right now — please try again shortly.</p>';
  }
}

async function renderArticle(slug){
  const wrap=$('#newsArticle');
  try{
    const manifest=await loadManifest();
    const entry=manifest.find(p=>p.slug===slug);
    if(!entry)throw new Error('unknown post');
    const {meta,body}=await loadPost(entry.file);
    document.title=`${meta.title||'News'} — Pakistan Gamers Community`;
    const html=(window.marked?marked.parse(body):`<pre>${body.replace(/</g,'&lt;')}</pre>`);
    wrap.innerHTML=`
      <a class="text-link back-link" href="news.html">← All news</a>
      <span class="news-date">${formatDate(meta.date||'')}</span>
      <h1>${(meta.title||'Untitled').replace(/</g,'&lt;')}</h1>
      <div class="markdown-body">${html}</div>`;
  }catch(err){
    wrap.innerHTML='<a class="text-link back-link" href="news.html">← All news</a><p class="news-empty">That post couldn\u2019t be found.</p>';
  }
}

const params=new URLSearchParams(location.search);
const slug=params.get('post');
if(slug){
  $('#newsListView').hidden=true;
  $('#newsArticleView').hidden=false;
  renderArticle(slug);
}else{
  $('#newsListView').hidden=false;
  $('#newsArticleView').hidden=true;
  renderList();
}
