
document.addEventListener("DOMContentLoaded", function () {

    // Highlight the current page in navbar
    const currentPage = window.location.pathname.split("/").pop() || "index.html";

    document.querySelectorAll(".navbar .nav-link").forEach(function (link) {
        const linkPage = link.getAttribute("href");

        if (linkPage === currentPage) {
            link.classList.add("active");
            link.setAttribute("aria-current", "page");
        } else {
            link.classList.remove("active");
            link.removeAttribute("aria-current");
        }
    });

    // Shopping cart
    let cart = [];

    const cartCount = document.getElementById("cartCount");
    const cartItems = document.getElementById("cartItems");
    const cartTotal = document.getElementById("cartTotal");

    function updateCart() {
        if (!cartCount || !cartItems || !cartTotal) return;

        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        const totalPrice = cart.reduce(
            (sum, item) => sum + item.price * item.quantity, 0
        );

        cartCount.textContent = totalItems;
        cartTotal.textContent = totalPrice.toLocaleString("en-PK");

        if (cart.length === 0) {
            cartItems.innerHTML = '<p class="text-secondary">Your cart is empty.</p>';
            return;
        }

        cartItems.innerHTML = cart.map((item, index) => `
            <div class="cart-line">
                <div>
                    <strong>${item.name}</strong>
                    <div class="small text-secondary">
                        Rs. ${item.price.toLocaleString("en-PK")} × ${item.quantity}
                    </div>
                </div>
                <div class="d-flex align-items-center gap-2">
                    <strong>Rs. ${(item.price * item.quantity).toLocaleString("en-PK")}</strong>
                    <button class="btn btn-sm btn-outline-danger remove-cart"
                            data-index="${index}" aria-label="Remove ${item.name}">
                        ×
                    </button>
                </div>
            </div>
        `).join("");
    }

    document.querySelectorAll(".add-cart").forEach(function (button) {
        button.addEventListener("click", function () {
            const name = button.dataset.name;
            const price = Number(button.dataset.price);

            const existingItem = cart.find(item => item.name === name);

            if (existingItem) {
                existingItem.quantity++;
            } else {
                cart.push({ name: name, price: price, quantity: 1 });
            }

            updateCart();

            const originalText = button.textContent;
            button.textContent = "Added ✓";
            button.disabled = true;

            setTimeout(function () {
                button.textContent = originalText;
                button.disabled = false;
            }, 800);
        });
    });

    if (cartItems) {
        cartItems.addEventListener("click", function (event) {
            const button = event.target.closest(".remove-cart");

            if (button) {
                cart.splice(Number(button.dataset.index), 1);
                updateCart();
            }
        });
    }

    const checkoutBtn = document.getElementById("checkoutBtn");

    if (checkoutBtn) {
        checkoutBtn.addEventListener("click", function () {
            if (cart.length === 0) {
                alert("Your cart is empty. Please add a product first.");
                return;
            }

            alert(
                "Your demo order contains " +
                cart.reduce((sum, item) => sum + item.quantity, 0) +
                " item(s), worth Rs. " +
                cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
                    .toLocaleString("en-PK") +
                ". No real order has been submitted."
            );
        });
    }

    // Contact form
    const contactForm = document.getElementById("contactForm");

    if (contactForm) {
        contactForm.addEventListener("submit", function (event) {
            event.preventDefault();

            if (!contactForm.checkValidity()) {
                contactForm.reportValidity();
                return;
            }

            const feedback = document.getElementById("contactFeedback");

            feedback.className = "mt-3 alert alert-success";
            feedback.textContent =
                "Thank you for your message! This demo form does not send emails.";

            contactForm.reset();
        });
    }

    // Donation form
    const donationForm = document.getElementById("donationForm");

    if (donationForm) {
        donationForm.addEventListener("submit", function (event) {
            event.preventDefault();

            if (!donationForm.checkValidity()) {
                donationForm.reportValidity();
                return;
            }

            const name = document.getElementById("donorName").value.trim();
            const amount = Number(
                document.getElementById("donationAmount").value
            );

            const feedback = document.getElementById("donationFeedback");

            feedback.className = "mt-3 alert alert-success";
            feedback.textContent =
                "Thank you, " + name + "! You selected Rs. " +
                amount.toLocaleString("en-PK") +
                ". This is a demo only; no payment was processed.";

            donationForm.reset();
        });
    }

});
