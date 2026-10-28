# Changelog

Todas as mudanças relevantes deste projeto são registradas aqui.

O formato segue o [Keep a Changelog](https://keepachangelog.com/pt-BR/1.1.0/) e o projeto usa [Versionamento Semântico](https://semver.org/lang/pt-BR/).

## [Unreleased]

## [1.0.1] - 2026-10-28

### Alterado

- Endereços de SEO e compartilhamento apontam para o GitHub Pages (`viniciusstawicki07.github.io/stawix-dev`): canonical, Open Graph, dados estruturados, `robots.txt` e `sitemap.xml`.
- Página 404 ajustada para funcionar dentro do caminho do repositório.
- README reescrito para quem visita o repositório público, sem instruções internas.

### Corrigido

- A seta do sistema e a gota não aparecem mais juntas no modo imersivo.
  - A gota passa a ser o cursor, com a ponta exatamente no ponto do clique, contorno claro para contraste e as mesmas animações (pulso, aumento sobre links e botões, leve encolhida ao clicar).
  - Ela some quando o mouse sai da janela.
  - Campos de texto mantêm o cursor de digitação normal.

## [1.0.0] - 2026-10-28

### Adicionado

- Site portfólio de página única, em sete cenas: Início, Serviços, Skyle, SimpliFinance, Teklog, Sobre e Contato.
- Modo imersivo sem barra de rolagem.
  - A roda do mouse, o trackpad, as setas do teclado e o gesto de arrastar trocam de cena.
  - Um gesto contínuo troca no máximo uma cena.
- Modo leitura com rolagem normal.
  - É automático em telas de até 1024 px, em telas baixas e quando o sistema pede menos movimento.
  - No computador, também pode ser ativado por um botão.
- Fluidos 3D renderizados em vermelho-vinho, com animação em stop motion e parallax em camadas e pelo mouse.
- Telas reais e anonimizadas do Skyle, do SimpliFinance e do Teklog em molduras 3D.
- Estudos de caso em painel lateral, com galeria e ampliação das telas.
- Formulário de orçamento que monta a mensagem e envia pelo WhatsApp ou por e-mail, sem servidor.
- Endereço próprio para cada cena (`#skyle`, `#contato`…) e suporte ao botão voltar do navegador.
- Tela de carregamento, cursor em gota e reflexo de luz nos cartões de vidro.
- Acessibilidade:
  - cenas fora da tela não recebem foco;
  - a troca de cena é anunciada para leitores de tela;
  - link para pular ao conteúdo;
  - o site funciona sem JavaScript.
- SEO e compartilhamento:
  - metadados e imagem de prévia (Open Graph);
  - dados estruturados de serviço profissional em Lapa – PR e no Brasil;
  - `sitemap.xml`, `robots.txt`, manifesto e página 404.
