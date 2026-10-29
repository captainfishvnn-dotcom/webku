// Data Menu Makanan & Minuman
// Gambar diambil dari file lokal yang ada di repository GitHub Anda
const menuData = [
    { id: 1, name: "Tenderloin Steak", price: 75000, category: "makanan", image: "Tenderloinsteak.jpg" },
    { id: 2, name: "Ayam Goreng / Chicken", price: 30000, category: "makanan", image: "chiken.jpg" },
    { id: 3, name: "Es Teh Manis", price: 5000, category: "minuman", image: "esteh.jpg" },
    { id: 4, name: "Ice Lemon Tea", price: 10000, category: "minuman", image: "icelemon.jpg" },
    { id: 5, name: "Spaghetti Bolognese", price: 35000, category: "makanan", image: "spaghetti.jpg" },
    { id: 6, name: "Steak Enak Special", price: 80000, category: "makanan", image: "steakenak.jpg" },
    { id: 7, name: "US Ribeye Steak", price: 95000, category: "makanan", image: "usribeye.jpg" }
];

let cart = [];

// Fungsi Menampilkan Menu Ke Halaman
function renderMenu(filter = 'all') {
    const menuGrid = document.getElementById('menu-grid');
    menuGrid.innerHTML = '';

    const filteredMenu = filter === 'all' 
        ? menuData 
        : menuData.filter(item => item.category === filter);

    filteredMenu.forEach(item => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
            <img src="${item.image}" alt="${item.name}" onerror="this.onerror=null; this.src='https://via.placeholder.com/300x200?text=Gambar+Tidak+Ditemukan';">
            <div class="card-body">
                <h3 class="card-title">${item.name}</h3>
                <p class="card-price">Rp ${item.price.toLocaleString('id-ID')}</p>
                <button class="btn-add" onclick="addToCart(${item.id})">
                    <i class="fa-solid fa-cart-plus"></i> Tambah ke Keranjang
                </button>
            </div>
        `;
        menuGrid.appendChild(card);
    });
}

// Fungsi Filter Menu
function filterMenu(category) {
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    renderMenu(category);
}

// Fungsi Tambah ke Keranjang
function addToCart(id) {
    const item = menuData.find(m => m.id === id);
    const cartItem = cart.find(c => c.id === id);

    if (cartItem) {
        cartItem.quantity += 1;
    } else {
        cart.push({ ...item, quantity: 1 });
    }

    updateCartUI();
}

// Update Tampilan Keranjang
function updateCartUI() {
    const cartCount = document.getElementById('cart-count');
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');

    // Total Item
    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalCount;

    // Render List Keranjang
    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="empty-cart-msg">Keranjang Anda masih kosong.</p>';
        cartTotal.textContent = 'Rp 0';
        return;
    }

    cartItems.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        total += item.price * item.quantity;
        const div = document.createElement('div');
        div.classList.add('cart-item');
        div.innerHTML = `
            <div>
                <strong>${item.name}</strong><br>
                <small>Rp ${item.price.toLocaleString('id-ID')} x ${item.quantity}</small>
            </div>
            <div>
                <strong>Rp ${(item.price * item.quantity).toLocaleString('id-ID')}</strong>
            </div>
        `;
        cartItems.appendChild(div);
    });

    cartTotal.textContent = `Rp ${total.toLocaleString('id-ID')}`;
}

// Toggle Modal Keranjang
function toggleCart() {
    const modal = document.getElementById('cart-modal');
    modal.style.display = modal.style.display === 'flex' ? 'none' : 'flex';
}

// Checkout
function checkout() {
    if (cart.length === 0) {
        alert("Keranjang Anda masih kosong!");
        return;
    }
    alert("Terima kasih! Pesanan Anda sedang diproses.");
    cart = [];
    updateCartUI();
    toggleCart();
}

// Inisialisasi awal saat halaman dimuat
document.addEventListener('DOMContentLoaded', () => {
    renderMenu();
});
