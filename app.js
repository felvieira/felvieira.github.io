const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const card=(h,t,p,m,img)=>`<a class="card" href="${esc(h)}" target="_blank" rel="noopener">${img?`<img loading="lazy" src="${esc(img)}" alt="">`:''}<h3>${esc(t)}</h3>${p?`<p>${esc(p)}</p>`:''}<span class="mono">${esc(m)}</span></a>`;
document.getElementById('y').textContent=new Date().getFullYear();
const B='https://felvieira.github.io/blog/';
const POSTS=[["2026-10-09-skills-vs-mcp-quando-usar-cada-um","Skills vs MCP: quando usar cada um no seu fluxo com agentes de IA"],["2026-10-07-a-especificacao-e-o-novo-codigo-2026","A especificação é o novo código: como guiar agentes de IA no frontend"],["2026-10-05-o-contexto-e-o-novo-codigo-2026","O contexto é o novo código: por que seus agentes de IA erram"],["2026-10-01-video-ia-apresentador-9-modelos","Coloquei meu rosto em 9 modelos de vídeo com IA e pedi a mesma frase em português"],["2026-10-01-o-custo-real-do-codigo-de-agentes-ia-2026","O custo real do código de agentes de IA: manter pesa mais que escrever"],["2026-09-28-revisao-de-codigo-novo-gargalo-2026","Revisar código virou o novo gargalo: como destravar com agentes de IA"]];
const renderPosts=l=>document.getElementById('posts').innerHTML=l.map(([s,t])=>card(B+'posts/'+s+'.html',t,'',s.slice(0,10).split('-').reverse().join('/'))).join('');
renderPosts(POSTS);
// Blog has no feed: list posts/ via GitHub API, newest 6, title from each post's <title>
fetch('https://api.github.com/repos/felvieira/blog/contents/posts').then(r=>r.ok?r.json():Promise.reject()).then(async fs=>{
 const sl=fs.map(f=>f.name).filter(n=>/^\d{4}-\d\d-\d\d-.*\.html$/.test(n)).sort().reverse().slice(0,6).map(n=>n.replace(/\.html$/,''));
 const out=await Promise.all(sl.map(s=>fetch(B+'posts/'+s+'.html').then(r=>r.text()).then(h=>[s,(h.match(/<title>([^<]*)/)||[,s])[1].split(' — ')[0]]).catch(()=>[s,s])));
 renderPosts(out);}).catch(()=>{});
const VIDS=[["ughy9cWDKKc","VisaLab: seu dossiê de visagismo feito com IA","2026-10-08"],["aRENJgZThKI","Cadê o Dinheiro: organize o orçamento da casa com IA","2026-10-08"],["rrotnm1HwBE","Ginga: seus projetos, nas suas pastas","2026-10-08"],["5XGP6DztGcw","Mentalist AI: seu segundo cérebro autônomo com IA","2026-10-08"],["wLtNKCwLwsk","ThothAI - Responde sua entrevista técnica ao vivo, digita por voz em qualquer app","2026-07-20"],["Twws8AA8Auc","Vibe Coding com Cursor (IA) — Curso Grátis | Debugando e Testando Integração com Stripe #25","2026-02-01"]];
document.getElementById('videos').innerHTML=VIDS.map(([id,t,d])=>card('https://www.youtube.com/watch?v='+id,t,'',d.split('-').reverse().join('/'),`https://i.ytimg.com/vi/${id}/hqdefault.jpg`)).join('');
fetch('https://api.github.com/users/felvieira/repos?sort=pushed&per_page=9&type=owner').then(r=>r.json()).then(rs=>{
 document.getElementById('repos').innerHTML=rs.filter(r=>!r.fork).slice(0,6).map(r=>card(r.html_url,r.name,r.description||'',`★ ${r.stargazers_count}${r.language?' · '+r.language:''} · ${new Date(r.pushed_at).toLocaleDateString('pt-BR')}`)).join('');
}).catch(()=>{document.getElementById('repos').innerHTML=card('https://github.com/felvieira?tab=repositories','Ver todos no GitHub','','github.com/felvieira ↗')});
