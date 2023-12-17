if ('serviceWorker' in navigator) {
    navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => {
            console.log('Service Worker enregistré !', registration.scope);
        })
        .catch((error) => {
            console.error('Service Worker erreur :', error);
        });
}

const content = [
    `<b>Technologies utilisés :<br />
L'utilisation ici est de la propriété
<code>animation-timeline</code>
et de la fonction css
<code>view(axis, start, end)</code>`,
    `<code>animation-timeline</code> définit l'animation sur le scroll, la valeur de cette propriété
peut etre géré par scroll-timeline que l'on appliquera sur l'élement auquel on se réfère pour le scroll
exemple : <br />
<code>
  .container_with_scroll { <br />
  scroll-timeline: --MyScrollerReference<br />
  }<br />
  <br />
  .animate_item{<br />
  animation-timeline: --MyScrollerReference;<br />
  }<br />
</code>
à noter scroll-timeline peut etre sur animate_item, afin qu'il se refère à sa position au scroll.`,
    `Ici nous avons opté pour une autre stratégie la propriété view(), elle permet de définir l'animation sur
la position de l'élement à animer,
3 paramètres : <br />
- l'axe (block/inline, x/y...) <br />
- le "inset-start", définit la fin de l'animation depuis le haut de la page (scroll descandant) <br />
- le "inset-end", définit le début de l'animation depuis le bas de la page <br />`,
];

class scrollContent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.shadowRoot.innerHTML = content[this.cId];
    }

    static get observedAttributes() {
        return ['content'];
    }
    attributeChangedCallback(name, oldVal, newVal) {
        this.cId = newVal;
    }
}

window.customElements.define('scroll-content', scrollContent);

const btn = document.querySelector('.show');
const overlay = document.querySelector('.demonstration');
const close_btn = overlay.querySelector('.close');

const openOverlay = () => {
    overlay.classList.add('open');
};

const closeOverlay = () => {
    overlay.classList.remove('open');
};

btn.addEventListener('click', openOverlay);
close_btn.addEventListener('click', closeOverlay);

const pwaInstallButton = document.querySelector('#pwaInstall');
let installPrompt;

window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault();
    installPrompt = event;
    pwaInstallButton.removeAttribute('hidden');
});

pwaInstallButton.addEventListener('click', async () => {
    console.log(installPrompt);
    // if (!installPrompt) return;
    const result = await installPrompt.prompt();
    console.log('install prompt result :', result);
    installPrompt = null;
    pwaInstallButton.setAttribute('hidden');
});
