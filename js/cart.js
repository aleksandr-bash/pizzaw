document.addEventListener('DOMContentLoaded', () => {
    loadCart();
    document.getElementById('order-button').addEventListener('click', handleOrder);
    const logo = document.getElementById('header-logo');
    logo.addEventListener('click', () => {
        window.location.href = 'index.html';
    });
});

function loadCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartContainer = document.getElementById('cart-container');
    cartContainer.innerHTML = '';

    if (cart.length === 0) {
        cartContainer.innerHTML = '<p>Ваш кошик порожній.</p>';
        const cartTotal = document.getElementById('cart-total');
        cartTotal.innerHTML = '';

        const orderForm = document.getElementById('order-form');
        orderForm.classList.add('hidden');
    } else {
        cart.forEach(product => {
            const productElement = createCartItem(product);
            cartContainer.appendChild(productElement);
        });
        updateTotalPrice();
    }
}

function createCartItem(product) {
    const cartItem = document.createElement('div');
    cartItem.className = 'cart-item';

    cartItem.innerHTML = `
        <img src="${product.image}" alt="${product.name}" class="cart-item-image" />
        <div class="cart-item-details">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <p>Ціна: ${product.price} грн</p>
            <p>Кількість: ${product.quantity}</p>
            <button class="remove-from-cart" data-id="${product.id}">Видалити</button>
        </div>
    `;

    cartItem.querySelector('.remove-from-cart').addEventListener('click', () => {
        removeFromCart(product.id);
    });

    return cartItem;
}

function removeFromCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(product => product.id !== productId);

    localStorage.setItem('cart', JSON.stringify(cart));
    loadCart();
}

function updateTotalPrice() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalPrice = cart.reduce((total, product) => total + (product.price * product.quantity), 0);

    document.getElementById('total-price').textContent = totalPrice;
}

function handleOrder() {
    const phoneNumber = document.getElementById('phone-number').value;
    
    if (phoneNumber.trim() === "") {
        alert("Будь ласка, введіть свій номер телефону.");
        return;
    }

    const notification = document.getElementById('notification');
    notification.classList.remove('hidden');

    setTimeout(() => {
        localStorage.removeItem('cart');
        window.location.href = 'index.html';
    }, 3000)
}