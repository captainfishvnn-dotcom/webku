/**
 * KULINER NUSANTARA - JAVASCRIPT LOGIC
 * Interaktivitas Navigasi, Filter Menu, Modal Pesanan, & Formulir Reservasi
 */

// State Variabel Modal Pesanan
let currentProduct = {
  name: '',
  price: 0,
  qty: 1,
  img: ''
};

// Data Menu Sesuai Persis Nama File Gambar Lokal di Repository Anda
const menuData = [
    {
        id: "tenderloin-steak",
        name: "Teien Special Tenderloin Steak",
        category: "makanan",
        price: 185000,
        img: "Tenderloinsteak.jpg", // Sesuai persis: Tenderloinsteak.jpg
        desc: "Daging sapi tenderloin pilihan dengan tingkat kematangan sempurna, disajikan dengan saus jamur khas Teien Dining.",
        time: 35,
        difficulty: "Sedang",
        servings: 1
    },
    {
        id: "chicken-steak",
        name: "Crispy Teien Chicken Steak",
        category: "makanan",
        price: 75000,
        img: "chiken.jpg", // Sesuai persis: chiken.jpg
        desc: "Filet dada ayam goreng tepung renyah di luar, juicy di dalam, disajikan dengan kentang goreng dan saus blackpepper.",
        time: 25,
        difficulty: "Mudah",
        servings: 1
    },
    {
        id: "signature-steak",
        name: "Teien Signature Steak",
        category: "makanan",
        price: 160000,
        img: "steakenak.jpg", // Sesuai persis: steakenak.jpg
        desc: "Menu andalan Teien Dining dengan racikan bumbu rahasia perpaduan cita rasa oriental dan western yang lezat.",
        time: 30,
        difficulty: "Sedang",
        servings: 1
    },
    {
        id: "us-ribeye-steak",
        name: "US Prime Ribeye Steak",
        category: "makanan",
        price: 210000,
        img: "usribeye.jpg", // Sesuai persis: usribeye.jpg
        desc: "Daging ribeye berkualitas tinggi dengan marbling sempurna yang memberikan kelembutan dan kelezatan di tiap gigitan.",
        time: 40,
        difficulty: "Rumit",
        servings: 1
    },
    {
        id: "creamy-spaghetti",
        name: "Teien Creamy Beef Spaghetti",
        category: "makanan",
        price: 85000,
        img: "spaghetti.jpg", // Sesuai persis: spaghetti.jpg
        desc: "Pasta spaghetti al dente berbalut saus krim keju gurih dengan potongan daging sapi asap dan taburan parsley.",
        time: 20,
        difficulty: "Mudah",
        servings: 1
    },
    {
        id: "es-teh-manis",
        name: "Teien Signature Es Teh Manis",
        category: "minuman",
        price: 12000,
        img: "esteh.jpg", // Sesuai persis: esteh.jpg
        desc: "Teh pilihan beraroma melati segar disajikan dingin dengan es batu yang menyegarkan dahaga.",
        time: 5,
        difficulty: "Mudah",
        servings: 1
    },
    {
        id: "ice-lemon-tea",
        name: "Refreshing Ice Lemon Tea",
        category: "minuman",
        price: 22000,
        img: "icelemon.jpg", // Sesuai persis: icelemon.jpg
        desc: "Kombinasi teh segar dan perasan buah lemon asli pilihan yang kaya vitamin C dan menyegarkan.",
        time: 5,
        difficulty: "Mudah",
        servings: 1
    }
];

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initMenuFilter();
  initReservationForm();
  initScrollSpy();
  renderDynamicMenu();
});

/* ==========================================================================
   0. RENDER MENU OTOMATIS KE HTML
   ========================================================================== */
function renderDynamicMenu() {
    const grid = document.getElementById('recipeGrid');
    if (!grid) return;

    grid.innerHTML = menuData.map(item => `
        <div class="menu-card bg-white rounded-2xl overflow-hidden border border-amber-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group" data-category="${item.category}">
            <div class="relative h-48 overflow-hidden bg-slate-100">
                <img src="${item.img}" alt="${item.name}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80';">
                <span class="absolute bottom-3 left-3 bg-slate-900/80 backdrop-blur-md text-white text-[11px] font-medium px-2.5 py-1 rounded-lg">
                    <i class="fa-solid fa-utensils text-amber-400 mr-1"></i>${item.category.toUpperCase()}
                </span>
            </div>
            <div class="p-5 flex-grow flex flex-col justify-between">
                <div>
                    <h3 class="font-bold text-slate-900 text-lg group-hover:text-amber-600 transition-colors line-clamp-1">${item.name}</h3>
                    <p class="text-slate-500 text-xs mt-1.5 line-clamp-2 font-normal">${item.desc}</p>
                </div>
                <div class="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
                    <span class="font-bold text-amber-700 text-base">${formatRupiah(item.price)}</span>
                    <button onclick="openOrderModal('${item.name}', ${item.price}, '${item.img}')" class="bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold px-3.5 py-2 rounded-xl transition-all shadow-sm">
                        Pesan Menu
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

/* ==========================================================================
   1. NAVBAR & MOBILE DRAWER LOGIC
   ========================================================================== */
function initNavbar() {
  const header = document.getElementById('site-header');
  const toggleBtn = document.getElementById('mobile-toggle-btn');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  if (toggleBtn && navMenu) {
    toggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = navMenu.classList.toggle('open');
      const icon = toggleBtn.querySelector('i');
      if (icon) {
        if (isOpen) {
          icon.classList.remove('fa-bars');
          icon.classList.add('fa-xmark');
        } else {
          icon.classList.remove('fa-xmark');
          icon.classList.add('fa-bars');
        }
      }
    });

    document.addEventListener('click', (e) => {
      if (!navMenu.contains(e.target) && !toggleBtn.contains(e.target) && navMenu.classList.contains('open')) {
        navMenu.classList.remove('open');
        const icon = toggleBtn.querySelector('i');
        if (icon) {
          icon.classList.remove('fa-xmark');
          icon.classList.add('fa-bars');
        }
      }
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (navMenu.classList.contains('open')) {
          navMenu.classList.remove('open');
          const icon = toggleBtn.querySelector('i');
          if (icon) {
            icon.classList.remove('fa-xmark');
            icon.classList.add('fa-bars');
          }
        }
      });
    });
  }
}

/* ==========================================================================
   2. SCROLLSPY
   ========================================================================== */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id], header[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let scrollPos = window.scrollY + 120;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  });
}

/* ==========================================================================
   3. FILTER MENU KATEGORI
   ========================================================================== */
function initMenuFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');
      const menuCards = document.querySelectorAll('.menu-card');

      menuCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
          card.style.animation = 'fadeIn 0.4s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   4. MODAL PESAN MENU INTERAKTIF
   ========================================================================== */
function openOrderModal(name, price, img) {
  currentProduct = {
    name: name,
    price: price,
    qty: 1,
    img: img
  };

  const modal = document.getElementById('orderModal');
  const modalName = document.getElementById('modalProductName');
  const modalPrice = document.getElementById('modalProductPrice');
  const modalImg = document.getElementById('modalProductImg');
  const qtyInput = document.getElementById('modalQtyInput');
  const totalPrice = document.getElementById('modalTotalPrice');

  if (modalName) modalName.textContent = name;
  if (modalPrice) modalPrice.textContent = formatRupiah(price);
  if (modalImg) modalImg.src = img;
  if (qtyInput) qtyInput.value = 1;
  if (totalPrice) totalPrice.textContent = formatRupiah(price);

  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeOrderModal() {
  const modal = document.getElementById('orderModal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

window.addEventListener('click', (e) => {
  const modal = document.getElementById('orderModal');
  if (e.target === modal) {
    closeOrderModal();
  }
});

function changeModalQty(change) {
  const qtyInput = document.getElementById('modalQtyInput');
  const totalPrice = document.getElementById('modalTotalPrice');

  let newQty = currentProduct.qty + change;
  if (newQty < 1) newQty = 1;
  if (newQty > 50) newQty = 50;

  currentProduct.qty = newQty;
  if (qtyInput) qtyInput.value = newQty;

  const total = currentProduct.price * newQty;
  if (totalPrice) totalPrice.textContent = formatRupiah(total);
}

function sendOrderViaWhatsApp() {
  const total = currentProduct.price * currentProduct.qty;
  const message = `Halo Teien Dining 庭園 ダイニング, saya ingin memesan:\n` +
                  `- Menu: *${currentProduct.name}*\n` +
                  `- Jumlah: *${currentProduct.qty} porsi*\n` +
                  `- Total: *${formatRupiah(total)}*\n\n` +
                  `Mohon informasikan proses pemesanan & pembayarannya. Terima kasih!`;

  const waUrl = `https://wa.me/6281234567890?text=${encodeURIComponent(message)}`;
  
  closeOrderModal();
  showToast(`Pesanan ${currentProduct.name} sedang dialihkan ke WhatsApp...`);

  setTimeout(() => {
    window.open(waUrl, '_blank');
  }, 600);
}

/* ==========================================================================
   5. FORMULIR RESERVASI MEJA
   ========================================================================== */
function initReservationForm() {
  const form = document.getElementById('reservation-form');

  if (form) {
    const dateInput = document.getElementById('res-date');
    if (dateInput) {
      const today = new Date().toISOString().split('T')[0];
      dateInput.min = today;
      dateInput.value = today;
    }

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('res-name').value.trim();
      const phone = document.getElementById('res-phone').value.trim();
      const date = document.getElementById('res-date').value;
      const time = document.getElementById('res-time').value;
      const guests = document.getElementById('res-guests').value;

      if (!name || !phone || !date || !time || !guests) {
        showToast('Mohon lengkapi seluruh kolom yang wajib diisi (*)!');
        return;
      }

      showToast(`Terima kasih Bapak/Ibu ${name}! Reservasi meja untuk ${guests} orang pada ${date} pukul ${time} WIB berhasil dikirim.`);
      
      form.reset();
      if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.value = today;
      }
    });
  }
}

/* ==========================================================================
   6. HELPER FUNCTIONS
   ========================================================================== */
function formatRupiah(number) {
  return 'Rp ' + Number(number).toLocaleString('id-ID');
}

function showToast(message) {
  const toast = document.getElementById('toastMsg');
  const toastText = document.getElementById('toastText');

  if (toast && toastText) {
    toastText.textContent = message;
    toast.classList.add('show');

    setTimeout(() => {
      toast.classList.remove('show');
    }, 4500);
  }
}
