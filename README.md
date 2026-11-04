# Site APARD

Landing page estática (HTML, CSS e JS), publicada na Vercel (projeto `apard-site`).

- `index.html`: conteúdo
- `css/style.css`: visual
- `js/main.js`: **bloco APARD no topo** com preço, telefone e endereços (alterar só ali) e o envio do formulário (EmailJS)
- `img/`: foto do Marcos e favicon

Ao mudar o preço, confira também o texto escrito no HTML: `grep -rn "49,90" index.html`.
O preço de venda real vive na plataforma (`lib/planos/valores.ts`); este site só o exibe.
