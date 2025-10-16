if (/Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    window.location.href = "warning.html";
}

let cartQuantity = JSON.parse(localStorage.getItem("Cart quantity"));
let gameInCartData = JSON.parse(localStorage.getItem("Game in cart data"));
let selectedButtonIds = JSON.parse(localStorage.getItem("Selected button IDs"));

function updateCartPage() {
    document.querySelector(".checkout-js").innerText = `Checkout (${cartQuantity})items`;

    let index = 0;

    const cartItems = document.querySelector(".cart-items");
    if (cartQuantity) cartItems.innerHTML = "";
    else cartItems.innerHTML = "<h1 class='empty-message'>:( Empty</h1>";

    gameInCartData.forEach(game => {
        cartItems.innerHTML += `<div>
                                    <span class="game">
                                        <img src="${game.imgPath}" id="i${selectedButtonIds[index]}">
                                        <h5>${game.name}</h5>
                                    </span>
                                    <span class="platform-selection">
                                        <p>Choose platform : </p>
                                        <span>
                                            <p><input type="radio" name="gamePlatform${index}" value="pc"> PC </p>
                                            <p><input type="radio" name="gamePlatform${index}" value="ps5"> Play Station 5 </p>
                                            <p><input type="radio" name="gamePlatform${index}" value="xbox"> Xbox </p>
                                        </span>
                                        <button class="delete-button-js" id="${selectedButtonIds[index]}">Delete</button>
                                    </span>
                                </div>`; 
        index++;
    });

    if (document.querySelector(".delete-button-js")) {
        const deleteButtons = document.querySelectorAll(".delete-button-js");

        deleteButtons.forEach((button) => {
            button.addEventListener("click", () => {
                gameInCartData = gameInCartData.filter(item => {return item.imgPath !== `${document.querySelector(`#i${button.id}`).src}`});
                selectedButtonIds = selectedButtonIds.filter(id => {return id !== `${button.id}`});
                cartQuantity--;
                localStorage.setItem("Cart quantity", JSON.stringify(cartQuantity));
                localStorage.setItem("Game in cart data", JSON.stringify(gameInCartData));
                localStorage.setItem("Selected button IDs", JSON.stringify(selectedButtonIds));
                updateCartPage();
            });
        })
    }

    // let priceOfGames = [];
    let priceTotal = 0;

    gameInCartData.forEach(item => {
        // priceOfGames.push(Number(item.price.slice(1)));
        priceTotal += Number(item.price.slice(1));
    })

    document.querySelector(".bill").innerHTML = `
                <h3>Order Summary</h3>
                <span class="line1"><p>Items(${cartQuantity}) : </p><p>$${parseFloat(priceTotal).toFixed(2)}</p></span>
                <span class="line2"><p>Platform fee : </p><p>$0.00</p></span>

                <br>

                <span class="line3"><p>Total before tax : </p><p>$${parseFloat(priceTotal).toFixed(2)}</p></span>
                <span class="line4"><p>Estimated tax(5%) : </p><p>$${parseFloat(priceTotal + (priceTotal * (5 / 100))).toFixed(2)}</p></span>
                
                <br><br>
                
                <span class="line5"><p>Order total : </p><p>$${parseFloat(priceTotal + (priceTotal * (5 / 100))).toFixed(2)}</p></span>
                <button>Place Order</button>`
}

updateCartPage();