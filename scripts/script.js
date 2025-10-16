if (/Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    window.location.href = "warning.html";
}

let cartQuantity = JSON.parse(localStorage.getItem("Cart quantity")) || 0;
let gameInCartData = JSON.parse(localStorage.getItem("Game in cart data")) || [];

const addToCartButtons = document.querySelectorAll(".add-to-cart-button-js");
let selectedButtonIds = JSON.parse(localStorage.getItem("Selected button IDs")) || [];

addToCartButtons.forEach(button => {
    button.addEventListener("click", () => {
        if (button.innerText === "Add to Cart") {
            cartQuantity++;
            gameInCartData.push({imgPath : `${document.querySelector(`#i${button.id}`).src}`, name : `${document.querySelector(`#h${button.id}`).innerText}`, price : `${document.querySelector(`#p${button.id}`).innerText}`});
            selectedButtonIds.push(button.id);
            button.innerText = "Remove";
        } else {
            cartQuantity--;
            gameInCartData = gameInCartData.filter(item => {return item.imgPath !== `${document.querySelector(`#i${button.id}`).src}`});
            selectedButtonIds = selectedButtonIds.filter(id => {return id !== button.id})
            button.innerText = "Add to Cart";
        }
        document.querySelector(".cart-a-tag-js").innerText = `Cart ${cartQuantity}`;

        localStorage.setItem("Cart quantity", JSON.stringify(cartQuantity));
        localStorage.setItem("Game in cart data", JSON.stringify(gameInCartData));
        localStorage.setItem("Selected button IDs", JSON.stringify(selectedButtonIds));
    });
});

function updatePage() {
    const cartTag = document.querySelector(".cart-a-tag-js");
    if (cartTag) {
        cartTag.innerText = `Cart ${cartQuantity}`;
    }

    if (selectedButtonIds[0]) {
        selectedButtonIds.forEach(id => {
            const btn = document.querySelector(`#${id}`);
            if (btn) btn.innerText = "Remove";
        });
    }
}

updatePage();