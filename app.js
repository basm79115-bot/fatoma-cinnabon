/**
 * Fatoma Cinnabon - Web App Logic
 * Currency: Strictly Egyptian Pound (ج.م)
 * Pure custom cinnabon images extracted from logo!
 * Coupon system & End-of-day flash countdown timer
 */

// Global State
const APP_STATE = {
  cart: [],
  currentCategory: 'all',
  appliedCoupon: null,
  activeOrder: {
    id: 'FC-' + Math.floor(1000 + Math.random() * 9000),
    status: 2,
    etaMinutes: 15,
    customerAddress: 'التجمع الخامس - شارع التسعين',
    paymentMethod: 'cash',
    driver: {
      name: 'كابتن أحمد سامي',
      phone: '056465156484',
      rating: '4.9 ⭐ (840+ توصيلة)'
    }
  },
  soundEnabled: true
};

// Menu Items Database - Concise, Clean, EGP Currency, Exact Logo Images!
const MENU_ITEMS = [
  // 1. سينابون كلاسيك
  {
    id: 'cl-1',
    name: 'سينابون كلاسيك رول الأصلية',
    enName: 'Classic Cinnamon Roll',
    category: 'classic',
    categoryName: 'سينابون كلاسيك',
    price: 75,
    calories: '420 سعرة',
    badge: 'الأكثر طلباً 🔥',
    desc: 'عجينة هشة بقرفة ماكارا وصوص الآيسنج الكريمي الأصلي.',
    image: 'roll-classic.png'
  },
  {
    id: 'cl-2',
    name: 'ميني سينابون 4 قطع بالصوصات',
    enName: 'Minibon Pack (4 pcs)',
    category: 'classic',
    categoryName: 'سينابون كلاسيك',
    price: 110,
    calories: '310 سعرة/قطعة',
    badge: 'طازة من الفرن ♨️',
    desc: '4 قطع ميني رول دافئة غرقانة مكس صوصات لذيذة.',
    image: 'roll-mini-4.png'
  },
  {
    id: 'cl-3',
    name: 'بايتس سينابون كلاسيك',
    enName: 'Classic Cinnabon Bites',
    category: 'classic',
    categoryName: 'سينابون كلاسيك',
    price: 85,
    calories: '380 سعرة',
    badge: 'خفيفة ولذيذة 😋',
    desc: 'لقيمات قرفة مكرملة مع علبة صوص كريمي خارجي.',
    image: 'roll-classic.png'
  },

  // 2. سينابون شوكولاته
  {
    id: 'ch-1',
    name: 'سينابون شوكولاتة دبل فودج بلجيكي',
    enName: 'Belgian Double Fudge Chocobon',
    category: 'chocolate',
    categoryName: 'سينابون شوكولاته',
    price: 90,
    calories: '495 سعرة',
    badge: 'شوكولاتة بلجيكية 🍫',
    desc: 'رول القرفة مغطى بشوكولاتة بلجيكية داكنة وحليبية فاخرة.',
    image: 'roll-chocolate.png'
  },

  // 3. سينابون كراميل
  {
    id: 'ca-1',
    name: 'سينابون كراميل بيكان أمريكي مقرمش',
    enName: 'Caramel Pecanbon Roll',
    category: 'caramel',
    categoryName: 'سينابون كراميل',
    price: 95,
    calories: '540 سعرة',
    badge: 'بيكان مقرمش 🌰',
    desc: 'كراميل توفي دافئ مع بيكان أمريكي محمص ومقرمش.',
    image: 'roll-caramel.png'
  },
  {
    id: 'ca-2',
    name: 'سينابون كراميل كلاسيك توفي',
    enName: 'Classic Caramel Toffee Bon',
    category: 'caramel',
    categoryName: 'سينابون كراميل',
    price: 85,
    calories: '480 سعرة',
    badge: 'كراميل ذهبي 🍯',
    desc: 'شلال من صوص التوفي والكراميل الذهبي الدافئ.',
    image: 'roll-caramel.png'
  },

  // 4. عروض عليهم
  {
    id: 'of-1',
    name: 'عرض اليوم الخارق (قبل نهاية اليوم)',
    enName: 'Flash Deal Combo Today',
    category: 'offers',
    categoryName: 'عروض عليهم',
    price: 155,
    calories: 'وجبة متكاملة',
    badge: 'وفر 65 ج.م 🎁',
    desc: '2 رول سينابون كبير بالصوصات + 2 مشروب منعش من اختيارك.',
    image: 'roll-box.png'
  },
  {
    id: 'of-2',
    name: 'بوكس لِمة السينابون بالصوصات',
    enName: 'Fatoma Gathering Box',
    category: 'offers',
    categoryName: 'عروض عليهم',
    price: 260,
    calories: 'تشكيلة للعيلة',
    badge: 'الأوفر للجمعات 🎈',
    desc: 'تشكيلة قطع سينابون غرقانة بالصوصات تكفي كل العيلة.',
    image: 'roll-box.png'
  },

  // 5. مشاريب
  {
    id: 'dr-1',
    name: 'آيس سبانش لاتيه بالقرفة',
    enName: 'Iced Cinnamon Spanish Latte',
    category: 'drinks',
    categoryName: 'مشاريب',
    price: 50,
    calories: '220 سعرة',
    badge: 'الأكثر طلباً ❄️',
    desc: 'إسبريسو دبل شوت مع حليب مكثف ونكهة قرفة مثلجة.',
    image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'dr-2',
    name: 'هوت شوكليت بلجيكي فاخر',
    enName: 'Rich Belgian Hot Chocolate',
    category: 'drinks',
    categoryName: 'مشاريب',
    price: 45,
    calories: '280 سعرة',
    badge: 'دافئ ولذيذ ☕',
    desc: 'شوكولاتة بلجيكية دافئة مع رغوة حليب ناعمة.',
    image: 'https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'dr-3',
    name: 'آيس كراميل ماكياتو',
    enName: 'Iced Caramel Macchiato',
    category: 'drinks',
    categoryName: 'مشاريب',
    price: 48,
    calories: '230 سعرة',
    badge: 'منعش ومركز 🧊',
    desc: 'إسبريسو مثلج مع حليب بارد وكراميل غني.',
    image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'dr-4',
    name: 'كابتشينو برغوة الحليب والقرفة',
    enName: 'Classic Cinnamon Cappuccino',
    category: 'drinks',
    categoryName: 'مشاريب',
    price: 42,
    calories: '150 سعرة',
    badge: 'قهوة طازة ☕',
    desc: 'كابتشينو إيطالي كلاسيكي برشة قرفة ماكارا العطرة.',
    image: 'https://images.unsplash.com/photo-1534778101976-62847782c213?w=600&auto=format&fit=crop&q=80'
  }
];

// Audio chime feedback
function playChime(type = 'success') {
  if (!APP_STATE.soundEnabled) return;
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    if (type === 'success') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(523.25, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(783.99, ctx.currentTime + 0.15);
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
      osc.start();
      osc.stop(ctx.currentTime + 0.4);
    } else if (type === 'click') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(659.25, ctx.currentTime);
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
      osc.start();
      osc.stop(ctx.currentTime + 0.1);
    }
  } catch (e) {}
}

// Initialize Application
document.addEventListener('DOMContentLoaded', () => {
  loadSavedCart();
  renderMenuItems();
  setupEventListeners();
  initDeliveryMap();
  initCountdownTimer();
  updateCartBadge();
});

// Category filtering
function renderMenuItems() {
  const grid = document.getElementById('menuGrid');
  if (!grid) return;

  const filtered = APP_STATE.currentCategory === 'all' 
    ? MENU_ITEMS 
    : MENU_ITEMS.filter(item => item.category === APP_STATE.currentCategory);

  grid.innerHTML = filtered.map(item => `
    <article class="menu-card" data-id="${item.id}">
      <div class="card-image-box">
        <img class="card-img" src="${item.image}" alt="${item.name}" loading="lazy">
        <div class="badge-tag">${item.badge}</div>
      </div>
      <div class="card-body">
        <div class="card-category">${item.categoryName}</div>
        <h3 class="card-title">${item.name}</h3>
        <p class="card-desc">${item.desc}</p>
        <div class="card-footer">
          <div class="price-box">
            <span class="price-current">${item.price} <span class="price-curr">ج.م</span></span>
          </div>
          <button class="btn-add-cart" onclick="quickAddToCart('${item.id}')" title="أضف للسلة">
            +
          </button>
        </div>
      </div>
    </article>
  `).join('');
}

// Category Nav click handlers
function setupEventListeners() {
  const catButtons = document.querySelectorAll('.cat-btn');
  catButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      catButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      APP_STATE.currentCategory = btn.dataset.category;
      playChime('click');
      renderMenuItems();
    });
  });

  const cartNavBtn = document.getElementById('cartNavBtn');
  const closeCartBtn = document.getElementById('closeCartBtn');

  if (cartNavBtn) {
    cartNavBtn.addEventListener('click', () => {
      openCartModal();
    });
  }

  if (closeCartBtn) {
    closeCartBtn.addEventListener('click', () => {
      closeModal('cartModal');
    });
  }

  const closeCheckoutBtn = document.getElementById('closeCheckoutBtn');
  if (closeCheckoutBtn) {
    closeCheckoutBtn.addEventListener('click', () => {
      closeModal('checkoutModal');
    });
  }
}

// End-of-Day Countdown Timer Logic
function initCountdownTimer() {
  const timerElem = document.getElementById('countdownTimer');
  if (!timerElem) return;

  function update() {
    const now = new Date();
    const midnight = new Date();
    midnight.setHours(23, 59, 59, 999);

    const diff = midnight - now;
    if (diff <= 0) {
      timerElem.innerText = "00:00:00";
      return;
    }

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    const pad = (n) => String(n).padStart(2, '0');
    timerElem.innerText = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
  }

  update();
  setInterval(update, 1000);
}

// Quick Add To Cart
function quickAddToCart(itemId) {
  const item = MENU_ITEMS.find(i => i.id === itemId);
  if (!item) return;

  const existing = APP_STATE.cart.find(c => c.id === itemId);
  if (existing) {
    existing.qty += 1;
  } else {
    APP_STATE.cart.push({
      ...item,
      qty: 1
    });
  }

  saveCart();
  updateCartBadge();
  playChime('success');
  showToast(`تمت إضافة "${item.name}" إلى السلة 🧁`);
}

function updateCartBadge() {
  const badge = document.getElementById('cartCountBadge');
  const totalItems = APP_STATE.cart.reduce((sum, item) => sum + item.qty, 0);
  if (badge) {
    badge.innerText = totalItems;
    badge.style.display = totalItems > 0 ? 'inline-block' : 'none';
  }
}

function openCartModal() {
  renderCartContents();
  openModal('cartModal');
}

function renderCartContents() {
  const listContainer = document.getElementById('cartItemsList');
  const summaryBox = document.getElementById('cartSummaryContent');
  if (!listContainer) return;

  if (APP_STATE.cart.length === 0) {
    listContainer.innerHTML = `
      <div style="text-align: center; padding: 2.5rem 1rem;">
        <span style="font-size: 3rem;">🛒</span>
        <h4 style="margin: 0.8rem 0 0.4rem; font-weight: 900; color: #be185d;">السلة فارغة حالياً</h4>
        <p style="color: #64748b; font-size: 0.9rem;">اختر أشهى قطع السينابون من المنيو بالأسفل!</p>
      </div>
    `;
    if (summaryBox) summaryBox.innerHTML = '';
    return;
  }

  listContainer.innerHTML = APP_STATE.cart.map((item, index) => `
    <div style="display: flex; align-items: center; justify-content: space-between; padding: 0.8rem; border-radius: 12px; background: #f0f9ff; border: 1.5px solid #bae6fd; margin-bottom: 0.6rem;">
      <div>
        <h4 style="font-size: 0.95rem; font-weight: 800; color: #0c4a6e;">${item.name}</h4>
        <p style="font-size: 0.82rem; color: #0284c7; font-weight: 700;">${item.price} × ${item.qty} = <strong>${item.price * item.qty} ج.م</strong></p>
      </div>
      <div style="display: flex; align-items: center; gap: 0.5rem;">
        <button style="width:28px;height:28px;border-radius:50%;border:1px solid #7dd3fc;background:white;font-weight:900;color:#0284c7;cursor:pointer;" onclick="changeQty(${index}, -1)">-</button>
        <span style="font-weight: 900; color: #0284c7;">${item.qty}</span>
        <button style="width:28px;height:28px;border-radius:50%;border:1px solid #7dd3fc;background:white;font-weight:900;color:#0284c7;cursor:pointer;" onclick="changeQty(${index}, 1)">+</button>
      </div>
    </div>
  `).join('');

  const subtotal = APP_STATE.cart.reduce((acc, it) => acc + (it.price * it.qty), 0);
  const deliveryFee = 20; // 20 EGP delivery fee
  
  // Coupon calculation
  let discount = 0;
  if (APP_STATE.appliedCoupon) {
    discount = Math.round(subtotal * APP_STATE.appliedCoupon.rate);
  }

  const total = Math.max(0, subtotal - discount + deliveryFee);

  if (summaryBox) {
    summaryBox.innerHTML = `
      <!-- Coupon input inside cart -->
      <div style="margin: 0.8rem 0; padding: 0.75rem; background: #e0f2fe; border-radius: 10px; border: 1.5px dashed #7dd3fc;">
        <label style="display:block; font-size: 0.82rem; font-weight: 800; color: #0369a1; margin-bottom: 0.35rem;">معاك كوبون خصم؟</label>
        <div style="display: flex; gap: 0.4rem;">
          <input type="text" id="couponCodeInput" placeholder="أدخل الكوبون (مثال: FATOMA20)" value="${APP_STATE.appliedCoupon ? APP_STATE.appliedCoupon.code : ''}" style="flex-grow:1; padding: 0.5rem; border: 1.5px solid #bae6fd; border-radius: 6px; font-weight: 800; text-transform: uppercase;">
          <button onclick="applyCoupon()" style="background: #be185d; color: white; border: none; padding: 0.5rem 1rem; border-radius: 6px; font-weight: 800; cursor: pointer;">تطبيق</button>
        </div>
        ${APP_STATE.appliedCoupon ? `<p style="font-size:0.78rem; color:#10b981; font-weight:800; margin-top:0.3rem;">✅ تم تطبيق الكوبون بنجاح (خصم ${APP_STATE.appliedCoupon.rate * 100}%)</p>` : ''}
      </div>

      <div style="display: flex; justify-content: space-between; margin-bottom: 0.4rem; color: #475569; font-weight: 700;">
        <span>مجموع المنتجات:</span>
        <span>${subtotal} ج.م</span>
      </div>
      ${discount > 0 ? `
      <div style="display: flex; justify-content: space-between; margin-bottom: 0.4rem; color: #10b981; font-weight: 800;">
        <span>الخصم المطبق:</span>
        <span>-${discount} ج.م</span>
      </div>
      ` : ''}
      <div style="display: flex; justify-content: space-between; margin-bottom: 0.4rem; color: #475569; font-weight: 700;">
        <span>رسوم التوصيل السريع:</span>
        <span>${deliveryFee} ج.م</span>
      </div>
      <div style="display: flex; justify-content: space-between; border-top: 1.5px solid #bae6fd; padding-top: 0.6rem; margin-top: 0.6rem; font-size: 1.25rem; font-weight: 900; color: #be185d;">
        <span>الإجمالي النهائي:</span>
        <span>${total} ج.م</span>
      </div>
      <button class="btn-primary-grad" style="width: 100%; justify-content: center; margin-top: 1rem;" onclick="goToCheckout()">
        متابعة إتمام الطلب والدفع 💳
      </button>
    `;
  }
}

// Coupon Applier
function applyCoupon() {
  const input = document.getElementById('couponCodeInput');
  if (!input) return;

  const code = input.value.trim().toUpperCase();
  if (code === 'FATOMA20') {
    APP_STATE.appliedCoupon = { code: 'FATOMA20', rate: 0.20 };
    playChime('success');
    showToast('🎉 مبروك! حصلت على خصم 20% بكوبون FATOMA20');
  } else if (code === 'FATOMA10' || code === 'CINNABON10') {
    APP_STATE.appliedCoupon = { code: code, rate: 0.10 };
    playChime('success');
    showToast('🎉 تم تطبيق خصم 10% بنجاح!');
  } else if (code === 'TODAY') {
    APP_STATE.appliedCoupon = { code: 'TODAY', rate: 0.15 };
    playChime('success');
    showToast('🎉 تم تطبيق خصم 15% لعرض اليوم!');
  } else {
    alert('كود الكوبون غير صحيح. جرب استخدام كود: FATOMA20');
    return;
  }

  renderCartContents();
}

function changeQty(index, delta) {
  if (APP_STATE.cart[index]) {
    APP_STATE.cart[index].qty += delta;
    if (APP_STATE.cart[index].qty <= 0) {
      APP_STATE.cart.splice(index, 1);
    }
  }
  saveCart();
  updateCartBadge();
  renderCartContents();
  playChime('click');
}

function goToCheckout() {
  closeModal('cartModal');
  const subtotal = APP_STATE.cart.reduce((acc, it) => acc + (it.price * it.qty), 0);
  let discount = 0;
  if (APP_STATE.appliedCoupon) {
    discount = Math.round(subtotal * APP_STATE.appliedCoupon.rate);
  }
  const total = Math.max(0, subtotal - discount + 20);
  
  const checkoutTotalDisplay = document.getElementById('checkoutTotalDisplay');
  if (checkoutTotalDisplay) {
    checkoutTotalDisplay.innerText = total + ' ج.م';
  }
  openModal('checkoutModal');
}

// Process Checkout & Start Live Delivery Tracking
function handleCheckoutSubmit(e) {
  e.preventDefault();
  const name = document.getElementById('custName').value.trim();
  const phone = document.getElementById('custPhone').value.trim();
  const address = document.getElementById('custAddress').value.trim();
  const selectedPayment = document.querySelector('input[name="paymentMethod"]:checked')?.value || 'cash';

  if (!name || !phone || !address) {
    alert('يرجى كتابة الاسم ورقم الهاتف وعنوان التوصيل بدقة.');
    return;
  }

  const orderNum = 'FC-' + Math.floor(1000 + Math.random() * 9000);
  APP_STATE.activeOrder.id = orderNum;
  APP_STATE.activeOrder.customerAddress = address;
  APP_STATE.activeOrder.paymentMethod = selectedPayment;
  APP_STATE.activeOrder.status = 1;

  APP_STATE.cart = [];
  APP_STATE.appliedCoupon = null;
  saveCart();
  updateCartBadge();

  closeModal('checkoutModal');
  playChime('success');

  document.getElementById('displayOrderId').innerText = orderNum;
  document.getElementById('displayCustomerAddress').innerText = address;
  document.getElementById('displayEta').innerText = '15 - 20 دقيقة';

  const trackSec = document.getElementById('trackingSection');
  trackSec.scrollIntoView({ behavior: 'smooth' });

  showToast(`🎉 تم تأكيد طلبك بنجاح! رقم طلبك: ${orderNum}`);
  startDriverSimulation();
}

function saveCart() {
  try {
    localStorage.setItem('fatoma_cart', JSON.stringify(APP_STATE.cart));
  } catch (e) {}
}

function loadSavedCart() {
  try {
    const saved = localStorage.getItem('fatoma_cart');
    if (saved) {
      APP_STATE.cart = JSON.parse(saved);
    }
  } catch (e) {}
}

function openModal(modalId) {
  const el = document.getElementById(modalId);
  if (el) el.classList.add('active');
}

function closeModal(modalId) {
  const el = document.getElementById(modalId);
  if (el) el.classList.remove('active');
}

function showToast(message) {
  let toast = document.getElementById('toastNotification');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toastNotification';
    toast.style.cssText = `
      position: fixed;
      bottom: 20px;
      right: 20px;
      background: linear-gradient(135deg, #be185d, #0284c7);
      color: white;
      padding: 0.95rem 1.6rem;
      border-radius: 999px;
      font-weight: 800;
      font-size: 0.95rem;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.4);
      z-index: 9999;
      transform: translateY(100px);
      transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
      display: flex;
      align-items: center;
      gap: 0.6rem;
      direction: rtl;
    `;
    document.body.appendChild(toast);
  }
  toast.innerText = message;
  toast.style.transform = 'translateY(0)';
  setTimeout(() => {
    toast.style.transform = 'translateY(120px)';
  }, 3500);
}

// Leaflet Delivery Map
let deliveryMap = null;
let driverMarker = null;
let bakeryMarker = null;
let customerMarker = null;
let routePolyline = null;
let simulationInterval = null;

const ROUTE_POINTS = [
  [30.0131, 31.4289], // New Cairo Bakery Hub (Tagamoa)
  [30.0150, 31.4310],
  [30.0180, 31.4350],
  [30.0210, 31.4400],
  [30.0245, 31.4450],
  [30.0270, 31.4500]
];

function initDeliveryMap() {
  const mapElement = document.getElementById('deliveryMap');
  if (!mapElement || typeof L === 'undefined') return;

  deliveryMap = L.map('deliveryMap', {
    zoomControl: false,
    attributionControl: false
  }).setView([30.020, 31.440], 14);

  L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
    maxZoom: 19
  }).addTo(deliveryMap);

  const createIcon = (html, className) => L.divIcon({
    html: `<div class="${className}" style="font-size: 26px; filter: drop-shadow(0 4px 8px rgba(0,0,0,0.3)); text-align: center;">${html}</div>`,
    className: 'custom-leaflet-icon',
    iconSize: [36, 36],
    iconAnchor: [18, 18]
  });

  bakeryMarker = L.marker(ROUTE_POINTS[0], {
    icon: createIcon('<img src="logo.jpg" style="width: 40px; height: 40px; border-radius: 50%; border: 2.5px solid #be185d; object-fit: cover;">', 'marker-bakery')
  }).addTo(deliveryMap);
  bakeryMarker.bindPopup('<strong>مخبز Fatoma Cinnabon</strong><br>فرع التجمع الخامس ♨️');

  customerMarker = L.marker(ROUTE_POINTS[ROUTE_POINTS.length - 1], {
    icon: createIcon('📍', 'marker-dest')
  }).addTo(deliveryMap);

  driverMarker = L.marker(ROUTE_POINTS[2], {
    icon: createIcon('🛵', 'marker-driver')
  }).addTo(deliveryMap);

  routePolyline = L.polyline(ROUTE_POINTS, {
    color: '#0284c7',
    weight: 5,
    opacity: 0.9,
    dashArray: '8, 8',
    lineCap: 'round'
  }).addTo(deliveryMap);

  deliveryMap.fitBounds(routePolyline.getBounds(), { padding: [40, 40] });
}

function startDriverSimulation() {
  if (!driverMarker || !deliveryMap) return;

  if (simulationInterval) clearInterval(simulationInterval);
  let currentStepIndex = 0;
  const totalSteps = ROUTE_POINTS.length;

  updateStepperStatus(1);

  setTimeout(() => {
    updateStepperStatus(2);
    showToast('🛵 انطلق المندوب أحمد وهو في طريقه إليك الآن!');

    simulationInterval = setInterval(() => {
      currentStepIndex++;

      if (currentStepIndex < totalSteps) {
        const nextCoord = ROUTE_POINTS[currentStepIndex];
        driverMarker.setLatLng(nextCoord);
        deliveryMap.panTo(nextCoord, { animate: true, duration: 1 });

        const remainingMinutes = Math.max(3, 18 - (currentStepIndex * 3));
        const etaElement = document.getElementById('displayEta');
        if (etaElement) {
          etaElement.innerText = `${remainingMinutes} دقيقة`;
        }
      } else {
        clearInterval(simulationInterval);
        updateStepperStatus(3);
        playChime('success');
        showToast('🎉 وصل المندوب إلى موقعك! بالهنا والشفا!');
        const etaElement = document.getElementById('displayEta');
        if (etaElement) {
          etaElement.innerText = 'تم التوصيل بنجاح ✅';
        }
      }
    }, 3000);
  }, 2000);
}

function updateStepperStatus(activeIndex) {
  const steps = document.querySelectorAll('.step-item');
  steps.forEach((step, idx) => {
    step.classList.remove('active', 'completed');
    if (idx < activeIndex) {
      step.classList.add('completed');
    } else if (idx === activeIndex) {
      step.classList.add('active');
    }
  });
}

function restartSimulation() {
  if (driverMarker) {
    driverMarker.setLatLng(ROUTE_POINTS[0]);
    startDriverSimulation();
  }
}
