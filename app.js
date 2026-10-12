const esc=s=>String(s??'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const br=d=>d?d.slice(0,10).split('-').reverse().join('/'):'';
const $=id=>document.getElementById(id);
$('y').textContent=new Date().getFullYear();
const PRODUCTS=[
 ['memra','Memra','memrabiblia.org','https://memrabiblia.org/','Leitura e estudo da Bíblia com contexto e IA.'],
 ['cadeodinheiro','Cadê o Dinheiro','cadeodinheiro.online','https://www.cadeodinheiro.online/','Finanças pessoais e orçamento da casa com IA.'],
 ['visalab','VisaLab','visalab.com.br','https://visalab.com.br/','Visagismo e consultoria de imagem com IA.'],
 ['posterflix','Posterflix','posterflix.net','https://posterflix.net/','Sua foto vira pôster de filme e criativos com IA.'],
 ['mentalist','Mentalist AI','mentalistai.com.br','https://mentalistai.com.br/','Segundo cérebro com IA: pense melhor, sem organizar.']];
const tile=(cls,href,img,inner)=>`<a class="tile media ${cls}" href="${esc(href)}" target="_blank" rel="noopener"><img loading="lazy" src="${esc(img)}" alt="" onerror="this.remove()"><div class="body">${inner}</div></a>`;
const PL=['big','wide','wide','sq','sq'];
$('products').innerHTML=PRODUCTS.map(([s,n,d,u,t],i)=>tile(PL[i]+(i>2?' sq':''),u,`img/products/${s}.webp`,`<h3>${esc(n)}</h3><p>${esc(t)}</p><span class="mono small">${d} ↗</span>`)).join('')
 +`<a class="tile oss sq" style="grid-column:span 2" href="https://github.com/felvieira/claude-skills-fv" target="_blank" rel="noopener"><div><p class="mono label">// open source</p><h3>claude-skills-fv</h3><p class="muted small">Skills para agentes de código ↗</p></div></a>`;
const j=u=>fetch(u+'?v='+Date.now()).then(r=>r.json());
const BL=['big','wide','wide','sq','sq','sq'];
j('data/blog.json').then(ps=>{$('posts').innerHTML=ps.slice(0,6).map((p,i)=>tile(BL[i],p.url,p.cover||'',`<span class="date mono">${br(p.date)}</span><h3>${esc(p.title)}</h3>`)).join('')+`<a class="tile more" href="https://felvieira.github.io/blog/">Ver todos os posts ↗</a>`});
const VL=['big','wide','one','one','one'];
j('data/youtube.json').then(vs=>{$('videos').innerHTML=vs.slice(0,5).map((v,i)=>tile(VL[i],v.url,v.thumb,`<span class="date mono">${br(v.published)}</span><h3>${esc(v.title)}</h3>`)).join('')});
