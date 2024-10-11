document.getElementById('btn-login').addEventListener('click', function() {
	event.preventDefault()
	window.location.replace('/src/pages/minha-conta/')
})

function toggleLabel(id) {
	let label = document.querySelector(`label[for='${id}']`)
	label.classList.toggle("label-out")
}