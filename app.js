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
setTheme(savedTheme||document.documentElement.dataset.theme||'light');
themeToggle.addEventListener('click',()=>setTheme(document.documentElement.dataset.theme==='dark'?'light':'dark',true));

const PRODUCTS=[
 ['ginga.png','Ginga IDE','gingaide.com.br','https://gingaide.com.br/','IDE agêntica brasileira gratuita conectada ao Oh My Pi.'],
 ['cadeodinheiro.webp','Cadê o Dinheiro','cadeodinheiro.online','https://cadeodinheiro.online/','Orçamento da casa com IA para acompanhar melhor os gastos.'],
 ['visalab.webp','VisaLab','visalab.com.br','https://www.visalab.com.br/','Dossiê de visagismo feito com inteligência artificial.'],
 ['memra.webp','Memra Bíblia','memrabiblia.org','https://memrabiblia.org/landing','Estudo bíblico com lente acadêmica e inteligência artificial.'],
 ['posterflix.webp','PosterFlix','posterflix.net','https://posterflix.net/','Crie pôsteres com seus filmes e séries favoritos usando IA.'],
 ['mentalist.webp','Mentalist AI','mentalistai.com.br','https://mentalistai.com.br/','Seu segundo cérebro autônomo com IA.'],
 ['hygia.webp','Hygia','hygiapp.com.br','https://hygiapp.com.br/','Organize laudos, imagens e resultados de exames com contexto e origem visíveis.'],
 ['thoth.png','Thoth AI','thothai.online','https://thothai.online/','Assistente desktop com módulos de IA para programação, transcrição e tarefas no computador.'],
 ['somai.png','Somai · Lista','shop.felvieira.dev','https://shop.felvieira.dev/','Lista de compras compartilhada com a família, total ao vivo e ajuda de IA.']];
const tile=(cls,href,img,inner)=>`<a class="tile media ${cls}" href="${esc(href)}" target="_blank" rel="noopener"><img loading="lazy" src="${esc(img)}" alt="" onerror="this.remove()"><div class="body">${inner}</div></a>`;
const PL=['big','wide','wide','sq','sq','sq','sq','sq','sq'];
$('products').innerHTML=PRODUCTS.map(([image,name,domain,url,description],i)=>tile(PL[i],url,`img/products/${image}`,`<h3>${esc(name)}</h3><p>${esc(description)}</p><span class="mono small">${esc(domain)} ↗</span>`)).join('');
const OPEN_SOURCE_PROJECTS=[
 {name:'Dev Agent KIT',description:'Ecossistema para planejar, revisar, testar e entregar software com agentes de desenvolvimento.',meta:'Claude Code · Cursor · Gemini CLI · MCP',url:'https://github.com/felvieira/claude-skills-fv',action:'Ver repositório',badge:'REPOSITÓRIO',featured:true},
 {name:'Myndo PWA',description:'Template offline-first com sincronização em nuvem, autenticação e armazenamento local.',meta:'React · TypeScript · Supabase · Dexie',url:'https://github.com/felvieira/todo-list-offlinefirst',action:'Ver repositório',badge:'REPOSITÓRIO'},
 {name:'Clockify Automator',description:'Lançamento de horas em lote no Clockify para vários dias.',meta:'React · TypeScript · ShadCN',url:'https://github.com/felvieira/time-tracker-automator-bot',action:'Ver repositório',badge:'REPOSITÓRIO'},
 {name:'Bot Kanbanize Node',description:'Bot do Telegram integrado ao Kanbanize para criar tarefas.',meta:'Node.js · Telegram API',url:'https://github.com/felvieira/bot-kanbanize-node',action:'Ver repositório',badge:'REPOSITÓRIO'},
 {name:'SVG to React Component',description:'Converte arquivos SVG em componentes React e otimiza o resultado.',meta:'React · SVGO',url:'https://github.com/felvieira/svg-to-react-component',action:'Ver repositório',badge:'REPOSITÓRIO'},
 {name:'Regressive Test JS',description:'Testes de regressão visual com comparação de pixels.',meta:'Node.js · Puppeteer · Pixelmatch',url:'https://github.com/felvieira/regressive-test-js-library',action:'Ver repositório',badge:'REPOSITÓRIO'},
 {name:'Speech to Calc',description:'Calculadora por comandos de voz, sem frameworks.',meta:'JavaScript · Web Speech API',url:'https://speech-to-calc.netlify.app/',action:'Abrir demonstração',badge:'DEMO OPEN SOURCE'},
 {name:'Mais projetos no GitHub',description:'Explore o perfil completo, outros repositórios e contribuições.',meta:'github.com/felvieira',url:'https://github.com/felvieira',action:'Ver perfil',badge:'PERFIL GITHUB',profile:true}
];
const FREE_APPS=[
 {name:'NodeProcessor',description:'Organize processos de Node, Python, Docker e agentes de IA por projeto, com portas, comandos e uso de memória à vista.',meta:'Windows · código aberto · v0.2.0',url:'https://nodeprocessor.felvieira.com.br/#download',action:'Baixar para Windows',badge:'APP GRATUITO'},
 {name:'Pinote',description:'Um post-it nativo para Windows: deixe suas ideias à vista e salve tudo localmente.',meta:'Windows · sem conta · local-first',url:'https://pinote.felvieira.dev/#download',action:'Baixar para Windows',badge:'APP GRATUITO'},
 {name:'ShotForge',description:'Transforma prints de apps em screenshots, banners e mockups para Google Play e App Store.',meta:'Web · sem instalação · gratuito',url:'https://storeshots.felvieira.dev/',action:'Abrir ShotForge',badge:'APP GRATUITO'}
];
const FREE_EXTENSIONS=[
 {name:'MIRROR',description:'Acompanhe tempo, visualizações e interações em redes sociais, com os dados mantidos no navegador.',meta:'Chrome · análise local · gratuito',url:'https://mirror.felvieira.com.br/',action:'Conhecer extensão',badge:'EXTENSÃO GRATUITA'},
 {name:'TeamScript',description:'Extensão gratuita para navegador. Acesse a página do projeto para conhecer os detalhes.',meta:'Extensão de navegador · gratuita',url:'https://teamscript.felvieira.com.br/',action:'Conhecer extensão',badge:'EXTENSÃO GRATUITA'},
 {name:'LinkVault',description:'Extensão gratuita para navegador. Acesse a página do projeto para conhecer os detalhes.',meta:'Extensão de navegador · gratuita',url:'https://linkvault.felvieira.com.br/',action:'Conhecer extensão',badge:'EXTENSÃO GRATUITA'}
];
const renderLinkCards=(containerId,projects)=>{
 $(containerId).innerHTML=projects.map((project,i)=>`<a class="tile link-card${project.featured?' link-card--featured':''}${project.profile?' link-card--profile':''}" href="${esc(project.url)}" target="_blank" rel="noopener noreferrer"><span class="link-card__top"><span class="mono link-card__number">${String(i+1).padStart(2,'0')}</span><span class="mono link-card__kind">${esc(project.badge)}</span></span><h3>${esc(project.name)}</h3><p>${esc(project.description)}</p><span class="mono link-card__meta">${esc(project.meta)}</span><span class="link-card__link">${esc(project.action)} <span aria-hidden="true">↗</span></span></a>`).join('');
};
renderLinkCards('opensource',OPEN_SOURCE_PROJECTS);
renderLinkCards('free-apps',FREE_APPS);
renderLinkCards('free-extensions',FREE_EXTENSIONS);
const j=u=>fetch(u+'?v='+Date.now()).then(r=>r.json());
const BL=['big','wide','wide','sq','sq','sq'];
j('data/blog.json').then(ps=>{$('posts').innerHTML=ps.slice(0,6).map((p,i)=>tile(BL[i],p.url,p.cover||'',`<span class="date mono">${br(p.date)}</span><h3>${esc(p.title)}</h3>`)).join('')});
const VL=['big','wide','one','one','one'];
j('data/youtube.json').then(vs=>{$('videos').innerHTML=vs.slice(0,5).map((v,i)=>tile(VL[i]+' vid',v.url,v.thumb,`<span class="date mono">${br(v.published)}</span><h3>${esc(v.title)}</h3>`)).join('')});
