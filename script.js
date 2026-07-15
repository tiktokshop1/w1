const products = [
  {id:"kit-vonixx",title:"Kit Completo Vonixx Lavagem Automotiva Limpeza Geral Cera To",image:"images/kit-vonixx.webp",price:"59,90",oldPrice:"220,00",discount:"73% OFF"},
  {id:"fone-cow-v10",title:"Fone De Ouvido Para Capacete Intercomunicador Bluetooth Headset Rgb Sem Fio Música Gps Chamadas Handsfree Alta Potência Cow",image:"images/fone-cow-v10.webp",price:"15,90",oldPrice:"99,99",discount:"84% OFF"},
  {id:"jaqueta-alpinestars",title:"Jaqueta Masculina Alpinestars T Sps V2 Wp Preto Branco",image:"images/jaqueta-alpinestars.jpg",price:"78,90",oldPrice:"499,90",discount:"84% OFF"},
  {id:"balaclava-ninja",title:"Touca Motoqueiro Ninja Balaclava Térmica Proteção Uv50+",image:"images/balaclava.webp",price:"14,78",oldPrice:"79,90",discount:"81% OFF"},
  {id:"viseira-fume",title:"Viseira Fume Capacete Norisk FF802 Razor",image:"images/viseira-norisk.webp",price:"12,88",oldPrice:"89,90",discount:"85% OFF"},
  {id:"tenis-oakley",title:"Tênis Botinha Oakley Granadier Couro Legítimo Confortável",image:"images/tenis-oakley.webp",price:"68,99",oldPrice:"399,90",discount:"82% OFF"},
  {id:"kit-ferramentas-quicko",title:"Kit Ferramentas Quicko 46 Peças Com Soquetes e Chaves Para Carro e Casa",image:"images/kit-ferramentas.jpg",price:"49,90",oldPrice:"249,90",discount:"80% OFF"},
  {id:"narigueira-alta",title:"Narigueira Alta HJC CL-ST Original LS2 Norisk Helt Texx",image:"images/narigueira.webp",price:"19,90",oldPrice:"79,90",discount:"75% OFF"},
];

const CART_KEY = "norisk_cart";
const getCart = () => { try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; } catch { return []; } };
const setCart = (c) => localStorage.setItem(CART_KEY, JSON.stringify(c));
const addToCart = (p, size=0) => {
  const cart = getCart();
  const key = p.id + "::" + size;
  const found = cart.find(i => i.key === key);
  if (found) found.qty += 1;
  else cart.push({key, id:p.id, name:p.title, image:p.image, size, price:p.price, qty:1});
  setCart(cart);
};

const toast = (msg="Adicionado ao carrinho") => {
  const el = document.getElementById("toast");
  el.textContent = msg;
  el.hidden = false;
  clearTimeout(toast._t);
  toast._t = setTimeout(() => el.hidden = true, 1400);
};

const grid = document.getElementById("grid");
products.forEach(p => {
  const card = document.createElement("div");
  card.className = "card";
  card.innerHTML = `
    <div class="thumb"><img src="${p.image}" alt="${p.title}" loading="lazy"/></div>
    <div class="body">
      <div class="name">${p.title}</div>
      <div class="price-row">
        <span class="cur">R$</span><span class="price">${p.price}</span>
        <span class="old">R$${p.oldPrice}</span>
      </div>
      <div class="meta"><span class="free">Frete grátis</span><span class="disc">${p.discount}</span></div>
      <div class="actions">
        <button class="btn btn-buy">Comprar</button>
        <button class="btn btn-add"><span class="ico">🛒</span><span class="lbl">Adicionar</span></button>
      </div>
    </div>`;
  const buy = card.querySelector(".btn-buy");
  const add = card.querySelector(".btn-add");
  buy.addEventListener("click", () => {
    addToCart(p, 0);
    toast("Redirecionando ao checkout...");
  });
  add.addEventListener("click", () => {
    addToCart(p, 0);
    add.classList.add("added");
    add.querySelector(".ico").textContent = "✓";
    add.querySelector(".lbl").textContent = "Adicionado";
    setTimeout(() => {
      add.classList.remove("added");
      add.querySelector(".ico").textContent = "🛒";
      add.querySelector(".lbl").textContent = "Adicionar";
    }, 1400);
    toast();
  });
  grid.appendChild(card);
});
