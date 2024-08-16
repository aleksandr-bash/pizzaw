document.addEventListener('DOMContentLoaded', () => {
    fetch('https://gist.githubusercontent.com/aleksandr-bash/21d501a85951e3975a7d3ef9a7fc7737/raw/2c308c46c5b9c6a2d5c24753316e45f47b78e60f/pizza_1.json')
        .then(response => response.json())
        .then(data => {
            const sections = data.sections;
            const container = document.getElementById('product-container');

            for (const section of sections) {
                const sectionTitle = document.createElement('h2');
                sectionTitle.textContent = section.name;
                sectionTitle.className = 'section-title';
                container.appendChild(sectionTitle);

                const sectionContainer = document.createElement('div');
                sectionContainer.className = 'section-container';
                container.appendChild(sectionContainer);

                for (const product of section.products) {
                    const card = createCard(product);
                    sectionContainer.appendChild(card);
                }
            }

            updateCartCount();
        })
        .catch(error => console.error('Error loading products:', error));
});


function createCard(product) {
    const card = document.createElement('div');
    card.className = 'card';

    card.innerHTML = `
        <h3>${product.name}</h3>
        <img src="${product.image}" alt="${product.name}" />
        <p class="description">${product.description}</p>
        <div class="pricing">
            <p class="price">${product.price} грн</p>
            <button class="add-to-cart">У кошик</button>
        </div>
    `;

    const addToCartButton = card.querySelector('.add-to-cart');
    addToCartButton.addEventListener('click', () => addToCart(product));

    return card;
}

function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    const existingProduct = cart.find(item => item.id === product.id);

    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        product.quantity = 1;
        cart.push(product);
    }

    localStorage.setItem('cart', JSON.stringify(cart));

    updateCartCount();
}

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCount = cart.reduce((total, product) => total + product.quantity, 0);
    console.log(cart)
    const cartCountElement = document.getElementById('cart-count');
    if (cartCount === 0) {
        cartCountElement.style.display = 'none';
    } else {
        cartCountElement.style.display = 'inline';
        cartCountElement.textContent = cartCount;
    }
}