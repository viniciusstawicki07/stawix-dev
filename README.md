# stawix.dev

Site portfólio de **Vinicius Muller Stawicki**: desenvolvimento de software, automações, IA, web design e manutenção de computadores. Atendimento em Lapa – PR e remoto para todo o Brasil.

É um site estático, feito com HTML, CSS e JavaScript puros, sem dependências e sem etapa de build. Está pronto para o GitHub Pages.

## Estrutura

```
.
├── index.html              # todo o conteúdo do site, incluindo os estudos de caso
├── 404.html                # página de erro
├── assets/
│   ├── css/estilo.css      # estilos e animações
│   ├── js/app.js           # cenas, parallax, menu, estudos de caso e formulário
│   └── img/
│       ├── fluidos/        # fluidos 3D (sprites de stop motion) e textura de grão
│       ├── marca/          # favicon, ícones e imagem de prévia (og.jpg)
│       └── projetos/       # telas anonimizadas e ícones de cada projeto
├── site.webmanifest
├── robots.txt
├── sitemap.xml
├── .nojekyll               # faz o GitHub Pages servir os arquivos como estão
└── CHANGELOG.md
```

## Rodar localmente

Abra um terminal na pasta do projeto e execute:

```bash
python -m http.server 8000
```

Depois acesse <http://localhost:8000>.

Abrir o `index.html` direto pelo navegador também funciona. Um servidor local deixa o comportamento igual ao publicado.

## Publicar no GitHub Pages

1. Crie um repositório no GitHub, por exemplo `stawix-dev`.
2. Envie os arquivos. Os comandos estão em [Comandos de git](#comandos-de-git).
3. No repositório, vá em **Settings → Pages**.
4. Em **Build and deployment**, escolha **Deploy from a branch**, a branch `main` e a pasta `/ (root)`.
5. Em alguns minutos o site fica disponível em `https://<seu-usuario>.github.io/<repositorio>/`.

Todos os caminhos de arquivos são relativos, então o site funciona tanto num domínio próprio quanto no endereço do GitHub Pages.

### Domínio próprio (stawix.dev)

Quando o domínio estiver registrado:

1. Em **Settings → Pages → Custom domain**, informe `stawix.dev`. O GitHub cria um arquivo `CNAME` no repositório.
2. No painel de DNS do domínio, crie estes registros:
   - registros **A** para `@`: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`;
   - registros **AAAA** para `@`: `2606:50c0:8000::153`, `2606:50c0:8001::153`, `2606:50c0:8002::153`, `2606:50c0:8003::153`;
   - um registro **CNAME** para `www`, apontando para `<seu-usuario>.github.io`.
3. Marque **Enforce HTTPS**. Domínios `.dev` exigem HTTPS, e o GitHub Pages emite o certificado de graça.

> **Enquanto o domínio não existir:**
>
> - Troque `https://stawix.dev/` pelo endereço real nas tags `canonical`, `og:url`, `og:image` e `twitter:image` do `index.html`.
> - Faça a mesma troca no JSON-LD, no `robots.txt` e no `sitemap.xml`.
> - Assim, a prévia ao compartilhar o link já aparece corretamente.

## Como editar

- **Textos:** estão todos no `index.html`, inclusive os estudos de caso, que ficam nas tags `<aside class="caso">`.
- **Contatos:** o número de WhatsApp e o e-mail aparecem no `index.html` e no começo do `assets/js/app.js`, nas constantes `WHATSAPP` e `EMAIL`.
- **Posição dos fluidos em cada cena:** tabelas `A`, `B`, `RIO`, `G1` e `G2` no `assets/js/app.js`. Cada linha é uma cena, no formato `[x, y, rotação, escala]`.
- **Cores:**
  - variáveis no início do `assets/css/estilo.css`;
  - a cor de destaque de cada projeto fica em `--c`, no `<section>` do projeto.
- **Novo projeto:**
  1. Duplique um `<section class="cena">` de projeto e um `<aside class="caso">`.
  2. Adicione um ponto em `<nav class="pontos">` e um item no menu.
  3. Acrescente uma linha em cada tabela de posição no `app.js`.

## Modos de exibição

- **Imersivo:** o padrão em computadores. Uma cena por tela, trocada pela roda do mouse, pelo trackpad, pelas setas, por Page Up/Down, Home/End ou pelos pontos laterais.
- **Leitura:** rolagem normal. Ativa sozinha em telas de até 1024 px, em telas baixas (até 640 px de altura) e quando o sistema pede menos movimento. No computador, também pode ser ligada pelo botão **Modo leitura**, e a escolha fica salva.
- **Sem JavaScript:** o site continua legível como página de rolagem normal.

## Comandos de git

Para a primeira publicação:

```bash
git init
git add .
git commit -m "feat: primeira versão do site stawix.dev (1.0.0)"
git branch -M main
git remote add origin https://github.com/<seu-usuario>/<repositorio>.git
git push -u origin main
git tag -a v1.0.0 -m "stawix.dev 1.0.0"
git push origin v1.0.0
```

A cada nova versão:

1. Atualize o `CHANGELOG.md`.
2. Faça o commit.
3. Crie a tag correspondente (`vX.Y.Z`) e envie com `git push --follow-tags`.

## Créditos

- **Fluidos 3D:** renderizados por código para este site, então não há direitos de terceiros.
- **Telas dos projetos:** usam somente dados fictícios de demonstração.
- **Fontes:** [Inter](https://rsms.me/inter/) e [JetBrains Mono](https://www.jetbrains.com/lp/mono/), via Google Fonts.
