document.addEventListener('DOMContentLoaded', () => {
    fetch('https://gist.githubusercontent.com/aleksandr-bash/ceff1b99c4dd6edfbd7841c1d1f4289d/raw/1dc0d0e85209cc5aa1d6ee1906ee11a17f528b07/pizza.json')
        .then(response => response.json())
        .then(data => {
            const products = data.products;
            const container = document.getElementById('product-container');

            for(const product of products) {
                const card = createCard(product)

                container.appendChild(card);
            }
        })
        .catch(error => console.error('Error loading products:', error));
});


function createCard(product) {
    const card = document.createElement('div');
    card.className = 'card';

    card.innerHTML = `      
        <h2>${product.name} </h2>
        <img src="${product.image}"/>
        <p class="description">${product.description}</p>
        <div class="pricing">
            <h3>${product.price}UAH</h3>
            <button class="add-to-cart">Add to Cart</button>
        </div>
    `;

    return card
}