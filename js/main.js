document.addEventListener('DOMContentLoaded', () => {
    fetch('https://gist.githubusercontent.com/Mark3r1/e9826d3cc348e77ec1b51ebd426738ab/raw/768ba5744cc5a7c170dddf86b5c4328d3cafe4bf/products.json')
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
        <p>${product.description}</p>
        <h3>${product.price}UAH</h3>
    `;

    return card
}