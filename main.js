// script.js
document.addEventListener("DOMContentLoaded", () => {
    const productCatalog = document.getElementById("productCatalog");
    const cartList = document.getElementById("cartList");
    const totalAmount = document.getElementById("totalAmount");
    const clearCartBtn = document.getElementById("clearCart");

    // Productos
    const products = [
        { id: 1, name: "Fz s Fi 150cc", price: 6095000, img: "./img/Fz-s fi.jpeg" },
        { id: 2, name: "Ybr-Z 125cc", price: 4180000, img: "./img/Ybr.jpeg" },
        { id: 3, name: "Xtz-125cc", price: 5979000 , img: "./img/xtz125.jpeg" },
        { id: 4, name: "Fz-25 250cc", price: 7477000, img: "./img/Fz-25.jpeg" }
    ];

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Captura de elementos del modal
    const confirmationModal = document.getElementById("confirmationModal");
    const modalProductList = document.getElementById("modalProductList");
    const addressInput = document.getElementById("address");
    const confirmPurchaseBtn = document.getElementById("confirmPurchase");
    const closeModalBtn = document.getElementById("closeModal");

    // render productos
    const renderProducts = () => {
        products.forEach(product => {
            const productCard = document.createElement("div");
            productCard.classList.add("bg-white", "p-4", "rounded-lg", "shadow", "flex", "flex-col", "items-center", "text-center");
            productCard.innerHTML = `
                <img src="${product.img}" alt="${product.name}" class="w-20 h-20 mb-2 rounded">
                <h3 class="text-lg font-semibold">${product.name}</h3>
                <p class="text-gray-600 mb-2">$${product.price}</p>
                <button onclick="addToCart(${product.id})" class="bg-indigo-500 text-white py-1 px-4 rounded hover:bg-indigo-600">Agregar al Carrito</button>
            `;
            productCatalog.appendChild(productCard);
        });
    };

    // render carrito
    const renderCart = () => {
        cartList.innerHTML = '';
        let total = 0;
        cart.forEach((product, index) => {
            total += product.price;
            const cartItem = document.createElement("div");
            cartItem.classList.add("flex", "justify-between", "items-center", "bg-gray-100", "p-3", "rounded-md", "shadow-sm");
            cartItem.innerHTML = `
                <p class="text-gray-700">${product.name} - $${product.price}</p>
                <button onclick="removeFromCart(${index})" class="text-red-500 font-semibold hover:underline">Eliminar</button>
            `;
            cartList.appendChild(cartItem);
        });
        totalAmount.textContent = `Total: $${total}`;
        localStorage.setItem("cart", JSON.stringify(cart));
    };

    // Agregar producto al carrito
    window.addToCart = (id) => {
        const product = products.find(p => p.id === id);
        if (product) {
            cart.push(product);
            renderCart();
        }
    };

    // Eliminar producto del carrito
    window.removeFromCart = (index) => {
        cart.splice(index, 1);
        renderCart();
    };

    // Vaciar carrito
    clearCartBtn.addEventListener("click", () => {
        cart = [];
        renderCart();
    });

    // Función para mostrar el modal de confirmación de compra
    const showConfirmationModal = () => {
        // Limpiar la lista de productos en el modal
        modalProductList.innerHTML = '';

        // Agregar productos del carrito al modal
        cart.forEach(product => {
            const item = document.createElement("p");
            item.textContent = `${product.name} - $${product.price}`;
            modalProductList.appendChild(item);
        });

        // Mostrar el modal
        confirmationModal.classList.remove("hidden");
    };

    // Cambiar el botón
    clearCartBtn.removeEventListener("click", clearCart);  // Quitar el listener anterior
    clearCartBtn.addEventListener("click", showConfirmationModal);  // Mostrar el modal al hacer clic

    // Cerrar el modal si el usuario cancela
    closeModalBtn.addEventListener("click", () => {
        confirmationModal.classList.add("hidden");
    });

    // Confirmar la compra, vaciar el carrito, y verificar dirección de envío
    confirmPurchaseBtn.addEventListener("click", () => {
        const address = addressInput.value.trim();

        if (address === "") {
            alert("Por favor ingrese su dirección de envío.");
            return;
        }

        alert(`Compra confirmada. Sus productos serán enviados a: ${address}`);
        
        // Vaciar carrito y LocalStorage
        cart = [];
        localStorage.removeItem("cart");
        renderCart();
        
        // Limpiar la dirección y cerrar el modal
        addressInput.value = '';
        confirmationModal.classList.add("hidden");
    });

    // Inicializar
    renderProducts();
    renderCart();
});