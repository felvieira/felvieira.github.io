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
 {image:'img/products/ginga.png',name:'Ginga IDE',domain:'gingaide.com.br',url:'https://gingaide.com.br/',description:'IDE agêntica brasileira gratuita conectada ao Oh My Pi.'},
 {image:'img/products/cadeodinheiro.webp',name:'Cadê o Dinheiro',domain:'cadeodinheiro.online',url:'https://cadeodinheiro.online/',description:'Orçamento da casa com IA para acompanhar melhor os gastos.'},
 {image:'img/products/visalab.webp',name:'VisaLab',domain:'visalab.com.br',url:'https://www.visalab.com.br/',description:'Dossiê de visagismo feito com inteligência artificial.'},
 {image:'img/products/memra.webp',name:'Memra Bíblia',domain:'memrabiblia.org',url:'https://memrabiblia.org/landing',description:'Estudo bíblico com lente acadêmica e inteligência artificial.'},
 {image:'img/products/posterflix.webp',name:'PosterFlix',domain:'posterflix.net',url:'https://posterflix.net/',description:'Crie pôsteres com seus filmes e séries favoritos usando IA.'},
 {image:'img/products/mentalist.webp',name:'Mentalist AI',domain:'mentalistai.com.br',url:'https://mentalistai.com.br/',description:'Seu segundo cérebro autônomo com IA.'},
 {image:'img/products/hygia.webp',name:'Hygia',domain:'hygiapp.com.br',url:'https://hygiapp.com.br/',description:'Organize laudos, imagens e resultados de exames com contexto e origem visíveis.'},
 {image:'img/products/thoth.png',name:'Thoth AI',domain:'thothai.online',url:'https://thothai.online/',description:'Assistente desktop com módulos de IA para programação, transcrição e tarefas no computador.'},
 {image:'img/products/somai.png',name:'Somai · Lista',domain:'shop.felvieira.dev',url:'https://shop.felvieira.dev/',description:'Lista de compras compartilhada com a família, total ao vivo e ajuda de IA.'},
 {image:'img/free-apps/pinote.webp',name:'Pinote',domain:'pinote.felvieira.dev',url:'https://pinote.felvieira.dev/#download',description:'Post-its nativos para Windows para manter suas ideias à vista.'},
 {image:'img/free-apps/shotforge.webp',name:'ShotForge',domain:'storeshots.felvieira.dev',url:'https://storeshots.felvieira.dev/',description:'Crie screenshots, banners e mockups para as lojas de aplicativos.'},
 {image:'img/products/timemachine.svg',name:'Máquina do Tempo',domain:'timemachine.felvieira.com.br',url:'https://timemachine.felvieira.com.br/',description:'Uma viagem interativa por três épocas da web: MS-DOS, Windows 95 e Windows XP com MSN.'}];
const tile=(cls,href,img,inner)=>`<a class="tile media ${cls}" href="${esc(href)}" target="_blank" rel="noopener"><img loading="lazy" src="${esc(img)}" alt="" onerror="this.remove()"><div class="body">${inner}</div></a>`;
const PL=['big','wide','wide','sq','sq','sq','sq','sq','sq','sq','sq','sq'];
$('products').innerHTML=PRODUCTS.map(({image,name,domain,url,description},i)=>tile(PL[i],url,image,`<h3>${esc(name)}</h3><p>${esc(description)}</p><span class="mono small">${esc(domain)} ↗</span>`)).join('');
const OPEN_SOURCE_PROJECTS=[
 {name:'Dev Agent KIT',description:'Ecossistema para planejar, revisar, testar e entregar software com agentes de desenvolvimento.',meta:'Claude Code · Cursor · Gemini CLI · MCP',image:'img/open-source/dev-agent-kit.webp',imageAlt:'Diagrama do Dev Team Kit conectando especialistas de IA e engenharia',url:'https://github.com/felvieira/claude-skills-fv',action:'Ver repositório',badge:'REPOSITÓRIO',featured:true},
 {name:'Myndo PWA',description:'Template offline-first com sincronização em nuvem, autenticação e armazenamento local.',meta:'React · TypeScript · Supabase · Dexie',image:'img/open-source/myndo.svg',imageAlt:'Ilustração da interface de tarefas do Myndo PWA',url:'https://github.com/felvieira/todo-list-offlinefirst',action:'Ver repositório',badge:'REPOSITÓRIO'},
 {name:'Clockify Automator',description:'Lance horas em lote no Clockify para vários dias sem preencher cada entrada manualmente.',meta:'React · TypeScript · ShadCN',image:'img/open-source/clockify-automator.webp',imageAlt:'Tela do Clockify Automator com formulário de lançamento em lote',url:'https://github.com/felvieira/time-tracker-automator-bot',action:'Ver repositório',badge:'REPOSITÓRIO'},
 {name:'Bot Kanbanize Node',description:'Registre horas e acompanhe cartões do Kanbanize direto por uma conversa no Telegram.',meta:'Node.js · Telegram API',image:'img/open-source/bot-kanbanize.webp',imageAlt:'Conversa com o bot de horas e cartões do Kanbanize no Telegram',url:'https://github.com/felvieira/bot-kanbanize-node',action:'Ver repositório',badge:'REPOSITÓRIO'},
 {name:'SVG to React Component',description:'Converta arquivos SVG em componentes React otimizados com SVGO.',meta:'React · SVGO',image:'img/open-source/svg-to-react.svg',imageAlt:'Ilustração da conversão de um arquivo SVG em componente React',url:'https://github.com/felvieira/svg-to-react-component',action:'Ver repositório',badge:'REPOSITÓRIO'},
 {name:'Regressive Test JS',description:'Compare páginas de referência e teste para encontrar diferenças visuais pixel a pixel.',meta:'Node.js · Puppeteer · Pixelmatch',image:'img/open-source/regressive-test.webp',imageAlt:'Comparação visual entre duas capturas de página no Regressive Test JS',url:'https://github.com/felvieira/regressive-test-js-library',action:'Ver repositório',badge:'REPOSITÓRIO'},
 {name:'Speech to Calc',description:'Faça contas falando as operações em voz alta, sem frameworks.',meta:'JavaScript · Web Speech API',image:'img/open-source/speech-to-calc.svg',imageAlt:'Ilustração de uma calculadora que transforma voz em operação matemática',url:'https://speech-to-calc.netlify.app/',action:'Abrir demonstração',badge:'DEMO OPEN SOURCE'},
 {name:'Mais projetos no GitHub',description:'Explore outros repositórios, contribuições e projetos open source.',meta:'github.com/felvieira',image:'img/open-source/github-profile.webp',imageAlt:'Foto de perfil de Felipe Vieira no GitHub',url:'https://github.com/felvieira',action:'Ver perfil',badge:'PERFIL GITHUB',profile:true}
];
const FREE_APPS=[
 {name:'NodeProcessor',description:'Organize processos por pasta e acompanhe memória, CPU, portas e instâncias duplicadas em uma só tela.',meta:'Windows · grátis · monitoramento local',image:'img/free-apps/nodeprocessor.webp',imageAlt:'Captura do NodeProcessor agrupando processos por pasta e destacando duplicados',url:'https://nodeprocessor.felvieira.com.br/#download',action:'Baixar para Windows',badge:'APP GRATUITO'},
 {name:'Pinote',description:'Post-its nativos para Windows: mantenha suas ideias à vista e salvas localmente.',meta:'Windows · sem conta · grátis',image:'img/free-apps/pinote.webp',imageAlt:'Mesa de trabalho com post-its do Pinote no monitor',url:'https://pinote.felvieira.dev/#download',action:'Baixar para Windows',badge:'APP GRATUITO'},
 {name:'ShotForge',description:'Crie screenshots, banners e mockups para as páginas dos seus apps nas lojas.',meta:'Web · sem instalação · grátis',image:'img/free-apps/shotforge.webp',imageAlt:'Prévia do ShotForge criando imagens de divulgação para lojas de aplicativos',url:'https://storeshots.felvieira.dev/',action:'Abrir ShotForge',badge:'APP GRATUITO'}
];
const FREE_EXTENSIONS=[
 {name:'MIRROR',description:'Entenda seus hábitos digitais com insights sobre redes sociais e compras, mantendo seu histórico no navegador.',meta:'Chrome · histórico local · grátis',image:'img/free-extensions/mirror.webp',imageAlt:'Painel do MIRROR com indicadores e insights demonstrativos de uso digital',url:'https://mirror.felvieira.com.br/',action:'Conhecer extensão',badge:'EXTENSÃO GRATUITA'},
 {name:'TeamScript',description:'Exporte transcrições já exibidas no Microsoft Teams para TXT, Markdown, SRT ou JSON. IA é opcional.',meta:'Chrome · Microsoft Teams · grátis',image:'img/free-extensions/teamscript.webp',imageAlt:'Captura fictícia do Teams com o painel TeamScript para exportar transcrições',url:'https://teamscript.felvieira.com.br/',action:'Conhecer extensão',badge:'EXTENSÃO GRATUITA'},
 {name:'LinkVault',description:'Guarde links, contatos e textos úteis no navegador; encontre pela busca e copie com um clique, sem conta.',meta:'Chrome · armazenamento local · grátis',image:'img/free-extensions/linkvault.webp',imageAlt:'Demonstração do LinkVault no Chrome ao buscar um item salvo',url:'https://linkvault.felvieira.com.br/',action:'Conhecer extensão',badge:'EXTENSÃO GRATUITA'}
];
const renderLinkCards=(containerId,projects)=>{
 $(containerId).innerHTML=projects.map((project,i)=>`<a class="tile link-card${project.featured?' link-card--featured':''}${project.profile?' link-card--profile':''}" href="${esc(project.url)}" target="_blank" rel="noopener noreferrer"><img loading="lazy" decoding="async" src="${esc(project.image)}" alt="${esc(project.imageAlt)}" onerror="this.remove()"><div class="link-card__body"><span class="link-card__top"><span class="mono link-card__number">${String(i+1).padStart(2,'0')}</span><span class="mono link-card__kind">${esc(project.badge)}</span></span><h3>${esc(project.name)}</h3><p>${esc(project.description)}</p><span class="mono link-card__meta">${esc(project.meta)}</span><span class="link-card__link">${esc(project.action)} <span aria-hidden="true">↗</span></span></div></a>`).join('');
};
renderLinkCards('opensource',OPEN_SOURCE_PROJECTS);
renderLinkCards('free-apps',FREE_APPS);
renderLinkCards('free-extensions',FREE_EXTENSIONS);
const j=u=>fetch(u+'?v='+Date.now()).then(r=>r.json());
const BL=['big','wide','wide','sq','sq','sq'];
j('data/blog.json').then(ps=>{$('posts').innerHTML=ps.slice(0,6).map((p,i)=>tile(BL[i],p.url,p.cover||'',`<span class="date mono">${br(p.date)}</span><h3>${esc(p.title)}</h3>`)).join('')});
const VL=['big','wide','one','one','one'];
j('data/youtube.json').then(vs=>{$('videos').innerHTML=vs.slice(0,5).map((v,i)=>tile(VL[i]+' vid',v.url,v.thumb,`<span class="date mono">${br(v.published)}</span><h3>${esc(v.title)}</h3>`)).join('')});
