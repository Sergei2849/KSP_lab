let bookings = [];

const calculateTotal = () => {
    return bookings.reduce((sum, item) => sum + item.price, 0);
};

const updateBookingDisplay = () => {
    const cartContainer = document.getElementById('cart-items');
    const totalElement = document.getElementById('total-price');
    
    if (!cartContainer) return;
    
    if (bookings.length === 0) {
        cartContainer.innerHTML = '<p>Нет забронированных билетов</p>';
        totalElement.textContent = 'Общая сумма: 0 €';
        return;
    }
    
    cartContainer.innerHTML = '';
    bookings.forEach((item, index) => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <span><strong>${item.name}</strong> - ${item.price} €</span>
            <button class="remove-item" data-index="${index}">Отменить</button>
        `;
        cartContainer.appendChild(cartItem);
    });
    
    const total = calculateTotal();
    totalElement.textContent = `Общая сумма: ${total} €`;
    
    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', (e) => {
            const index = parseInt(e.target.dataset.index);
            bookings.splice(index, 1);
            updateBookingDisplay();
        });
    });
};

const addToBooking = (ticket) => {
    bookings.push({
        name: ticket.name,
        price: ticket.price
    });
    updateBookingDisplay();
    alert(`✅ Билет в ${ticket.name} добавлен в бронирования!`);
};

const handleCheckout = () => {
    if (bookings.length === 0) {
        alert('❌ Нет забронированных билетов! Добавьте города для бронирования.');
        return;
    }
    const total = calculateTotal();
    alert(`✅ Бронирование оформлено! Общая стоимость: ${total} €. Хорошего путешествия!`);
    bookings = [];
    updateBookingDisplay();
};

const filterProducts = (category) => {
    const products = document.querySelectorAll('.product-card');
    products.forEach(product => {
        const productCategory = product.dataset.category;
        if (category === 'all' || productCategory === category) {
            product.style.display = 'block';
        } else {
            product.style.display = 'none';
        }
    });
};

document.addEventListener('DOMContentLoaded', () => {
    const addButtons = document.querySelectorAll('.add-to-cart');
    addButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const productCard = e.target.closest('.product-card');
            const ticket = {
                name: productCard.dataset.name,
                price: parseInt(productCard.dataset.price)
            };
            addToBooking(ticket);
        });
    });
    
    const checkoutBtn = document.getElementById('checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', handleCheckout);
    }
    
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            const category = button.dataset.category;
            filterProducts(category);
        });
    });
});
