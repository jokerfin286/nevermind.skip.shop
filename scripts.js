window.addEventListener('load', function () {
	const loader = document.getElementById('loader')
	const content = document.getElementById('content')

	loader.classList.add('fade-out')
	setTimeout(() => {
		loader.style.display = 'none'
		content.classList.remove('hidden')
		content.classList.add('fade-in')
	}, 2000)

	displayCart() // Обновляем корзину при загрузке страницы

	// Initialize search and sort functionality
	initializeSearchAndSort()
})

function selectItem(selectedItem) {
	const items = document.querySelectorAll('.portfolio .item')
	items.forEach(item => {
		item.classList.remove('active')
	})
	selectedItem.classList.add('active')
}

function toggleSidebar() {
	var sidebar = document.getElementById('sidebar')
	var contentDimmed = document.getElementById('content-dimmed')
	if (sidebar.classList.contains('open')) {
		sidebar.classList.remove('open')
		contentDimmed.classList.remove('active')
	} else {
		sidebar.classList.add('open')
		contentDimmed.classList.add('active')
	}
}

function toggleCartSidebar() {
	var cartSidebar = document.getElementById('cart-sidebar')
	var cartContentDimmed = document.getElementById('cart-content-dimmed')
	if (cartSidebar.classList.contains('open')) {
		cartSidebar.classList.remove('open')
		cartContentDimmed.classList.remove('active')
	} else {
		cartSidebar.classList.add('open')
		cartContentDimmed.classList.add('active')
	}
}

function displayCart() {
	const cartItemsContainer = document.getElementById('cart-items')
	const cartTotalContainer = document.getElementById('total-price')
	cartItemsContainer.innerHTML = ''

	let cart = localStorage.getItem('cart')
	if (cart) {
		cart = JSON.parse(cart)
		let total = 0
		cart.forEach((item, index) => {
			const itemTotal = parseFloat(item.unitPrice) * item.quantity
			total += itemTotal
			cartItemsContainer.innerHTML += `
                <div class="cart-item">
                    <img src="${item.image}" alt="${
				item.name
			}" class="cart-item-image">
                    <div class="cart-item-details">
                        <h4 class="cart-item-name">${item.name}</h4>
                        <p class="cart-item-size">Размер: ${item.size}</p>
                    </div>
                    <div class="cart-item-actions">
                        <div class="cart-item-quantity">
                            <button class="quantity-btn" onclick="changeQuantity(${index}, -1)">-</button>
                            <input type="text" value="${
															item.quantity
														}" readonly>
                            <button class="quantity-btn" onclick="changeQuantity(${index}, 1)">+</button>
                        </div>
                        <div class="cart-item-price">
                            ${(item.unitPrice * item.quantity).toFixed(2)} BYN
                        </div>
                        <button class="quantity-btn cart-item-remove" onclick="removeFromCart(${index})">×</button>
                    </div>
                </div>
            `
		})
		cartTotalContainer.innerHTML = `${total.toFixed(2)} BYN`
	} else {
		cartItemsContainer.innerHTML = '<p>Ваша корзина пуста</p>'
		cartTotalContainer.innerHTML = '0.00 BYN'
	}
}

function changeQuantity(index, delta) {
	let cart = localStorage.getItem('cart')
	if (cart) {
		cart = JSON.parse(cart)
		let item = cart[index]
		let currentQuantity = parseInt(item.quantity)
		let newQuantity = currentQuantity + delta
		if (newQuantity > 0) {
			item.quantity = newQuantity
			item.price = (parseFloat(item.unitPrice) * newQuantity).toFixed(2)
			cart[index] = item
			localStorage.setItem('cart', JSON.stringify(cart))
			displayCart()
		}
	}
}

function removeFromCart(index) {
	let cart = localStorage.getItem('cart')
	if (cart) {
		cart = JSON.parse(cart)
		cart.splice(index, 1)
		localStorage.setItem('cart', JSON.stringify(cart))
		displayCart()
	}
}

function initializeSearchAndSort() {
	const searchInput = document.getElementById('search-input')
	const sortSelect = document.getElementById('sort-select')
	const productsContainer = document.getElementById('products')
	const products = Array.from(
		productsContainer.getElementsByClassName('product')
	)

	searchInput.addEventListener('input', filterProducts)
	sortSelect.addEventListener('change', sortProducts)

	function filterProducts() {
		const query = searchInput.value.toLowerCase()
		products.forEach(product => {
			const name = product.getAttribute('data-name').toLowerCase()
			if (name.includes(query)) {
				product.style.display = 'block'
			} else {
				product.style.display = 'none'
			}
		})
	}

	function sortProducts() {
		const criteria = sortSelect.value
		let sortedProducts

		if (criteria === 'price-asc') {
			sortedProducts = products.sort(
				(a, b) => a.getAttribute('data-price') - b.getAttribute('data-price')
			)
		} else if (criteria === 'price-desc') {
			sortedProducts = products.sort(
				(a, b) => b.getAttribute('data-price') - a.getAttribute('data-price')
			)
		} else if (criteria === 'name-asc') {
			sortedProducts = products.sort((a, b) =>
				a.getAttribute('data-name').localeCompare(b.getAttribute('data-name'))
			)
		} else if (criteria === 'name-desc') {
			sortedProducts = products.sort((a, b) =>
				b.getAttribute('data-name').localeCompare(a.getAttribute('data-name'))
			)
		} else if (criteria === 'newest') {
			sortedProducts = products.sort(
				(a, b) =>
					new Date(b.getAttribute('data-date')) -
					new Date(a.getAttribute('data-date'))
			)
		} else if (criteria === 'oldest') {
			sortedProducts = products.sort(
				(a, b) =>
					new Date(a.getAttribute('data-date')) -
					new Date(b.getAttribute('data-date'))
			)
		} else {
			sortedProducts = products
		}

		productsContainer.innerHTML = ''
		sortedProducts.forEach(product => productsContainer.appendChild(product))
	}
}
