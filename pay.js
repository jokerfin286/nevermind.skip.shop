document.getElementById('order-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const fullName = document.getElementById('full-name').value;
    const address = document.getElementById('address').value;
    const phone = document.getElementById('phone').value;
    const paymentMethod = document.getElementById('payment-method').value;

    // You can now send this data to your server or save it to LocalStorage
    const orderDetails = {
        fullName,
        address,
        phone,
        paymentMethod,
        cart: JSON.parse(localStorage.getItem('cart'))
    };

    console.log(orderDetails);

    // For demo, we will just alert the user and clear the cart
    alert('Ваш заказ оформлен!');
    localStorage.removeItem('cart');
    window.location.href = 'Index.html'; // Redirect to home or any other page
});