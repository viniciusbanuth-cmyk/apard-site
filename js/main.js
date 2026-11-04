/* ─────────────────────────────────────────────────────────────
   CONFIGURAÇÃO: para mudar preço, telefone ou endereço da plataforma, altere SÓ este bloco.
   (O texto que já está escrito no HTML é o mesmo valor e serve de reserva caso o JavaScript não carregue;
    ao mudar o preço, confira com: grep -rn "49,90" index.html)
   ───────────────────────────────────────────────────────────── */
const APARD = {
  preco: 'R$ 49,90',
  precoValor: '49,90',
  whatsappTexto: '(44) 99122-0816',
  whatsappLink: 'https://wa.me/5544991220816',
  urlAssinar: 'https://apardcapital.com.br/assinar',
  urlEntrar: 'https://apardcapital.com.br/login',
  emailjs: { chavePublica: 'lN_uVmYh0nFq-BEOc', servico: 'service_y9tjj31', modelo: 'template_hlnzx19' },
};

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));

// Preenche valores configuráveis
$$('[data-preco]').forEach((e) => (e.textContent = APARD.preco));
$$('[data-preco-valor]').forEach((e) => (e.textContent = APARD.precoValor));
$$('[data-assinar]').forEach((e) => (e.href = APARD.urlAssinar));
$$('[data-entrar]').forEach((e) => (e.href = APARD.urlEntrar));
$$('[data-wpp-texto]').forEach((e) => (e.textContent = APARD.whatsappTexto));
$$('[data-wpp-link]').forEach((e) => { e.href = APARD.whatsappLink; e.target = '_blank'; e.rel = 'noopener'; });

// Menu: fundo ao rolar e abrir/fechar no celular
const nav = $('#nav');
const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 24);
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });
const burger = $('#burger');
const menu = $('#menu');
const fechar = () => { menu.classList.remove('open'); burger.classList.remove('open'); burger.setAttribute('aria-expanded', 'false'); };
burger.addEventListener('click', () => {
  const aberto = menu.classList.toggle('open');
  burger.classList.toggle('open', aberto);
  burger.setAttribute('aria-expanded', String(aberto));
});
$$('#menu a').forEach((a) => a.addEventListener('click', fechar));

// Animação de entrada
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver((itens) => itens.forEach((i) => { if (i.isIntersecting) { i.target.classList.add('in'); io.unobserve(i.target); } }), { threshold: 0.12 });
  $$('.reveal').forEach((e) => io.observe(e));
} else {
  $$('.reveal').forEach((e) => e.classList.add('in'));
}

// Formulário da consultoria (EmailJS)
const form = $('#contact-form');
if (form) {
  if (window.emailjs) window.emailjs.init(APARD.emailjs.chavePublica);
  form.addEventListener('submit', (ev) => {
    ev.preventDefault();
    const ok = $('#form-ok'); const err = $('#form-err'); const btn = $('#form-btn');
    ok.style.display = 'none'; err.style.display = 'none';
    if (!form.from_name.value.trim() || !form.from_email.value.trim() || !form.phone.value.trim()) {
      err.textContent = 'Preencha nome, WhatsApp e e-mail.'; err.style.display = 'block'; return;
    }
    if (!window.emailjs) { err.textContent = 'Não foi possível enviar agora. Tente pelo WhatsApp ou por e-mail.'; err.style.display = 'block'; return; }
    btn.disabled = true; btn.textContent = 'Enviando...';
    window.emailjs.sendForm(APARD.emailjs.servico, APARD.emailjs.modelo, form)
      .then(() => { ok.style.display = 'block'; btn.style.display = 'none'; form.reset(); })
      .catch((e) => {
        console.error('EmailJS:', e);
        err.textContent = 'Não foi possível enviar. Tente pelo WhatsApp ou por e-mail.'; err.style.display = 'block';
        btn.disabled = false; btn.textContent = 'Enviar mensagem';
      });
  });
}
