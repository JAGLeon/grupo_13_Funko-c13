
function qs(element) {
    return document.querySelectorAll(element)
}

let $cartTotal = document.getElementById("totalProducts")
$priceFunko = qs(".subtotal");

console.log($cartTotal + " soy la eti totla");
let total = 0;

$priceFunko.forEach(productCart => {
    const numPriceFunko = Number(productCart.textContent.replace("Subtotal: $", ""));
    total = total + numPriceFunko;
    console.log(total + " total en numero");
});

if (total > 0) {
    $cartTotal.innerHTML = `$${total}`;
}

console.log($cartTotal + " soy el cart total");
