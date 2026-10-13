# Auditoria do redesign

Data: 13/10/2026
Escopo: página inicial do portfólio, tema claro e escuro.
Referência visual: [Bento Grids — shot enviado pelo usuário](https://bentogrids.com/shots/cm7unekl2000gpwnasov0xgrs)

## Achados

- **Evidência:** as legendas de produtos e posts formavam faixas escuras em toda a largura do card, cobrindo parte importante das imagens.
- **Evidência:** os tons de texto secundário e destaque no tema claro tinham contraste abaixo de 4,5:1 em algumas superfícies. Os valores medidos eram 4,01:1 para `--muted` e 3,72:1 para `--accent-strong` sobre `--surface-soft`.
- **Evidência:** o CTA da consultoria herdava a cor de fundo do botão padrão e perdia destaque sobre o fundo verde.
- **Heurística:** as seis opções de agenda tinham o mesmo peso visual, inclusive a conversa inicial de orçamento.
- **Preferência visual:** a referência usa uma peça dominante, módulos menores e gutters consistentes. A página já tinha mosaicos; o refinamento mantém a identidade própria e a distribuição assimétrica.

## Decisões

- Mantida a paleta floresta, lima e papel, com tokens compartilhados pelos componentes e variantes para os dois temas.
- Escurecidos os textos secundários, acentos e foco no tema claro. As novas combinações medidas alcançam pelo menos 4,91:1 nas superfícies de texto usadas; os principais textos pequenos passam a exceder 4,5:1.
- Trocadas as faixas de legenda por painéis compactos sobre as imagens, com título, descrição e metadados maiores.
- Reorganizada a agenda em quatro colunas: orçamento inicial e construção de app ganham dois espaços; os outros tipos mantêm cards compactos. No breakpoint móvel, todos ficam em uma coluna.
- Adicionados separadores e marcadores numerados às seções, e corrigido o contraste do CTA de consultoria.

## Verificação

- Prévia local em `http://127.0.0.1:4173/`, capturada no desktop nos temas claro e escuro.
- A árvore acessível continuou expondo os seis links de agenda e todas as seções do portfólio; o controle de tema atualizou seu rótulo após a alternância.
- A estrutura responsiva foi revisada no CSS, mas a captura visual foi feita apenas em desktop.
- Não foram alterados JavaScript, conteúdo ou destinos dos links.
