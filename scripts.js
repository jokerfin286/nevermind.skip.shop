// scripts.js
window.addEventListener('load', function () {
	const loader = document.getElementById('loader')
	const content = document.getElementById('content')

	loader.classList.add('fade-out')
	setTimeout(() => {
		loader.style.display = 'none'
		content.classList.remove('hidden')
		content.classList.add('fade-in')
	}, 2000) // Время совпадает с анимацией затухания
})

function toggleSidebar() {
	const sidebar = document.getElementById('sidebar')
	const contentDimmed = document.getElementById('content-dimmed')

	if (sidebar.classList.contains('open')) {
		sidebar.classList.remove('open')
		contentDimmed.classList.remove('active')
	} else {
		sidebar.classList.add('open')
		contentDimmed.classList.add('active')
	}
}

function selectItem(selectedItem) {
	const items = document.querySelectorAll('.portfolio .item')
	items.forEach(item => {
		item.classList.remove('active')
	})
	selectedItem.classList.add('active')
}

