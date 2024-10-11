document.getElementById('btn-login').addEventListener('click', function() {
	window.location.replace('/src/pages/perfil/')
})

function toggleLabel(id) {
	let label = document.querySelector(`label[for='${id}']`)
	label.classList.toggle("label-out")
}