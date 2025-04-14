// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Add to Cart functionality
document.querySelectorAll(".wc-cart-btn").forEach(button => {
    button.addEventListener("click", (e) => {
        const productCard = e.target.closest(".wc-product-card");
        const productName = productCard.querySelector(".wc-product-title")?.innerText;
        if (productName) {
            document.getElementById("productName").value = productName;
            document.getElementById("checkoutForm").style.display = "flex"; // Show the checkout form
        }
    });
});

// Buy Now button functionality
document.querySelectorAll(".wc-buy-btn").forEach(button => {
    button.addEventListener("click", (e) => {
        const productCard = e.target.closest(".wc-product-card");
        const productName = productCard.querySelector(".wc-product-title")?.innerText;
        if (productName) {
            document.getElementById("productName").value = productName;
            document.getElementById("checkoutForm").style.display = "flex"; // Show the checkout form
        }
    });
});

// Close form when clicking outside the box
document.getElementById("checkoutForm").addEventListener("click", (e) => {
    if (e.target.id === "checkoutForm") {
        document.getElementById("checkoutForm").style.display = "none";
    }
});

// Form submission handling
document.getElementById("orderForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const submitBtn = e.target.querySelector(".wc-submit-btn");
    submitBtn.disabled = true;
    submitBtn.innerHTML = "Processing...";

    try {
        const response = await fetch("https://formspree.io/f/mblgwqdg", {
            method: "POST",
            body: new FormData(e.target),
            headers: { Accept: "application/json" }
        });

        if (response.ok) {
            alert("Order placed successfully!");
            document.getElementById("checkoutForm").style.display = "none";
            e.target.reset();
        } else {
            const data = await response.json();
            alert(`Error: ${data.error || "Something went wrong."}`);
        }
    } catch (err) {
        alert("Network error. Please try again.");
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = "Place Order";
    }
});
