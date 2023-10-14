document.addEventListener("DOMContentLoaded", function() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    if (productId) {
        fetch(`https://fakestoreapi.com/products/${productId}`)
            .then(res => res.json())
            .then(data => {
                displayProductDetails(data);
            })
            .catch(error => {
                console.error("Error fetching product:", error);
            });
    } else {
        // Handle the case where no product ID is provided
        alert("Invalid product ID.");
    }
});


function displayProductDetails(product) {
    const productDetailContainer = document.getElementById('product-detail');

    productDetailContainer.innerHTML = `
        <div class="col-md-6">
            <img src="${product.image}" alt="${product.title}" class="img-fluid">
        </div>
        <div class="col-md-6">
            <h2>${product.title}</h2>
            <p>${product.description}</p>
            <p><strong>Price: $${product.price}</strong></p>
            <p><strong>Category: ${product.category}</strong></p>
            <button class="btn btn-primary" onclick="addToCart('${product.title}', ${product.price}, '${product.image}')">Add to Cart</button>
        </div>
    `;
}


function addToCart(productName, productPrice, productImage) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let productIndex = cart.findIndex(item => item.name === productName);

    if (productIndex !== -1) {
        cart[productIndex].quantity += 1;
    } else {
        cart.push({ name: productName, price: productPrice, image: productImage, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
   

    

    window.location.href = "cart.html";
}
