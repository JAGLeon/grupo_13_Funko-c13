
function qs(element) {
    return document.querySelectorAll(element)
}

let $cartTotal = document.getElementById("totalProducts")
$priceFunko = qs(".subtotal");

let total = 0;

$priceFunko.forEach(productCart => {
    const numPriceFunko = Number(productCart.textContent.replace("Subtotal: $", ""));
    total = total + numPriceFunko;
});

if (total > 0) {
    $cartTotal.innerHTML = `$${total}`;
}

