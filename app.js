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
$('products').innerHTML=PRODUCTS.map(([s,n,d,u,t],i)=>`<a class="tile prod p${i}" href="${u}" target="_blank" rel="noopener"><img loading="lazy" src="img/products/${s}.webp" alt="Screenshot do ${esc(n)}"><div class="body"><h3>${esc(n)}</h3><p>${esc(t)}</p><span class="mono small">${d} ↗</span></div></a>`).join('');
const j=u=>fetch(u+'?v='+Date.now()).then(r=>r.json());
j('data/blog.json').then(ps=>{$('posts').innerHTML=ps.slice(0,6).map((p,i)=>`<a class="tile post b${i}" href="${esc(p.url)}" target="_blank" rel="noopener">${p.cover?`<img loading="lazy" src="${esc(p.cover)}" alt="">`:''}<div class="body"><span class="date mono">${br(p.date)}</span><h3>${esc(p.title)}</h3>${i<3&&p.excerpt?`<p>${esc(p.excerpt)}</p>`:''}</div></a>`).join('')+`<a class="tile" style="grid-column:1/-1;text-align:center" href="https://felvieira.github.io/blog/">Ver todos os posts ↗</a>`});
j('data/youtube.json').then(vs=>{$('videos').innerHTML=vs.slice(0,5).map((v,i)=>`<a class="tile vid v${i}" href="${esc(v.url)}" target="_blank" rel="noopener"><img loading="lazy" src="${esc(i===0?v.thumb.replace('hqdefault','maxresdefault'):v.thumb)}" onerror="this.onerror=null;this.src='${esc(v.thumb)}'" alt=""><div class="body"><span class="date mono">${br(v.published)}</span><h3>${esc(v.title)}</h3></div></a>`).join('')});
j('data/instagram.json').catch(()=>[]).then(ig=>{
 const cells=ig.length?ig.slice(0,6).map(p=>`<a href="${esc(p.url)}" target="_blank" rel="noopener"><img loading="lazy" src="${esc(p.image)}" alt=""></a>`).join(''):Array.from({length:6},(_,i)=>`<a href="https://www.instagram.com/felvieira.dev/" target="_blank" rel="noopener">${['◎','✦','▶','◆','✺','◐'][i]}</a>`).join('');
 $('insta').innerHTML=`<div><p class="mono label">// instagram</p><h3>@felvieira.dev</h3><p class="muted">Bastidores, IA, dev e os produtos que eu tô construindo.</p><a class="btn" href="https://www.instagram.com/felvieira.dev/" target="_blank" rel="noopener">Seguir no Instagram ↗</a></div><div class="igrid">${cells}</div>`;});
