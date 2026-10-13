const esc=s=>String(s??'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const br=d=>d?d.slice(0,10).split('-').reverse().join('/'):'';
const $=id=>document.getElementById(id);
$('y').textContent=new Date().getFullYear();
const BOOKING_TYPES=[
 {title:'Orçamento de projeto',description:'Conversa inicial para entender o escopo do seu app, landing page ou aplicativo mobile.',duration:'30 minutos',url:'https://tidycal.com/felvieiradev/30-minute-proposal-36vg48j'},
 {title:'App do zero ao deploy',description:'Planeje a construção de um aplicativo completo, com backend integrado e pronto para lançar.',duration:'1 hora',price:'R$ 100,00',url:'https://tidycal.com/felvieiradev/60-minute-proposal'},
 {title:'Pacote com 4 consultorias',description:'Quatro sessões de acompanhamento para aprofundar seus conhecimentos e avançar no projeto.',duration:'4 sessões de 60 minutos',price:'R$ 200,00',url:'https://tidycal.com/felvieiradev/240-minute-meeting'},
 {title:'Consultoria de desenvolvimento',description:'Tire dúvidas de design, frontend, low-code/no-code e ferramentas como Bolt, V0 e Cursor.',duration:'60 minutos',price:'R$ 250,00',url:'https://tidycal.com/felvieiradev/60-minute-meeting'},
 {title:'Treinamento para equipes',description:'Capacitação em ferramentas de automação, vibe coding e DevOps para sua equipe.',duration:'1 hora',price:'R$ 13.000,00',url:'https://tidycal.com/felvieiradev/pacote-training-groups'},
 {title:'Consultoria especializada em IA',description:'Explore aplicações práticas de inteligência artificial para tirar suas ideias do papel.',duration:'60 minutos',price:'R$ 300,00',url:'https://tidycal.com/felvieiradev/60-minute-meeting-ai'}
];
$('booking-options').innerHTML=BOOKING_TYPES.map((booking,i)=>`<article class="booking-card"><span class="mono booking-index">${String(i+1).padStart(2,'0')}</span><h3>${esc(booking.title)}</h3><p>${esc(booking.description)}</p><div class="booking-meta"><span>${esc(booking.duration)}</span>${booking.price?`<span>${esc(booking.price)}</span>`:''}</div><a class="btn booking-link" href="${esc(booking.url)}" target="_blank" rel="noopener noreferrer">Ver horários <span aria-hidden="true">↗</span></a></article>`).join('');

const themeToggle=$('theme-toggle');
const themeMeta=document.querySelector('meta[name="theme-color"]');
const systemTheme=window.matchMedia('(prefers-color-scheme: dark)');
let savedTheme=null;
try{const preference=localStorage.getItem('felvieira-theme');if(preference==='light'||preference==='dark')savedTheme=preference}catch{}
const setTheme=(theme,persist=false)=>{
 const dark=theme==='dark';
 document.documentElement.dataset.theme=dark?'dark':'light';
 themeToggle.setAttribute('aria-label',`Ativar tema ${dark?'claro':'escuro'}`);
 themeToggle.querySelector('.theme-icon').textContent=dark?'☀':'☾';
 themeToggle.querySelector('.theme-name').textContent=`Tema ${dark?'claro':'escuro'}`;
 themeMeta?.setAttribute('content',dark?'#0b110e':'#f2f0e8');
 if(persist){savedTheme=dark?'dark':'light';try{localStorage.setItem('felvieira-theme',savedTheme)}catch{}}
};
setTheme(savedTheme||document.documentElement.dataset.theme||(systemTheme.matches?'dark':'light'));
themeToggle.addEventListener('click',()=>setTheme(document.documentElement.dataset.theme==='dark'?'light':'dark',true));
if(!savedTheme)systemTheme.addEventListener('change',event=>{if(!savedTheme)setTheme(event.matches?'dark':'light')});

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
j('data/blog.json').then(ps=>{$('posts').innerHTML=ps.slice(0,6).map((p,i)=>tile(BL[i],p.url,p.cover||'',`<span class="date mono">${br(p.date)}</span><h3>${esc(p.title)}</h3>`)).join('')});
const VL=['big','wide','one','one','one'];
j('data/youtube.json').then(vs=>{$('videos').innerHTML=vs.slice(0,5).map((v,i)=>tile(VL[i]+' vid',v.url,v.thumb,`<span class="date mono">${br(v.published)}</span><h3>${esc(v.title)}</h3>`)).join('')});
