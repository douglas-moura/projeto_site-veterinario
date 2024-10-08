const planosDetalhes = [
	['preG', true, true, true, true, true],
	['preS', true, true, true, true, true],
	['std2', true, true, true, true, true],
	['std1', true, true, true, true, false],
	['basi', true, true, false, false, false],
	['free', true, false, false, false, false]
]

document.addEventListener("DOMContentLoaded", function() {
	const componentesSite = {}
    componentesSite.menu = document.getElementById("menuSite");
    componentesSite.footer = document.getElementById("rodapeSite");
    
    Object.keys(componentesSite).forEach(key => {
	    fetch("/src/assets/layouts/" + componentesSite[key].id + ".html")
	        .then(response => response.text())
	        .then(data => {
	            // Insere o conteúdo carregado no elemento
	            componentesSite[key].innerHTML = data;
	            if(componentesSite[key].id == "menuSite") funcoesMenu()
	        })
	        .catch(error => {
	            console.error("Erro ao carregar o conteúdo:", error);
	        });
    })
});

const menuLateral = (estado) => {
	const areaMenuLateral = document.getElementById('menu-mobile-lateral')
	const linksMenuLateral = document.getElementById('navlinks-mobile')
	if (estado) {
		areaMenuLateral.classList.remove('oculto')
		linksMenuLateral.classList.remove('-translate-x-full')
		linksMenuLateral.classList.remove('opacity-0')
	} else {
		linksMenuLateral.classList.add('-translate-x-full')
		linksMenuLateral.classList.add('opacity-0')
		setTimeout(function() {
			areaMenuLateral.classList.add('oculto')
		}, 600);
	}
}

function funcoesMenu() {
	document.getElementById('btn-menu').addEventListener("click", () => menuLateral(true))
	document.getElementById('btn-fecha-menu').addEventListener("click", () => menuLateral(false))
	document.getElementById('servicos').addEventListener("click", () => {
		const subMenuLinks = document.getElementById('sub-menu-servicos')
		const subMenuContainer = document.getElementById('sub-menu-bloco')
		const alturaDropDown = "h-96"
		if(subMenuContainer.classList.contains('h-0')) {
			subMenuContainer.classList.remove('h-0')
			subMenuContainer.classList.add(alturaDropDown)
			setTimeout(function() {
				subMenuLinks.classList.toggle('absolute')
				subMenuLinks.classList.toggle('opacity-0')
			}, 200);
		} else {
			subMenuContainer.classList.add('h-0')
			subMenuContainer.classList.remove(alturaDropDown)
			subMenuLinks.classList.toggle('opacity-0')
			setTimeout(function() {
				subMenuLinks.classList.toggle('absolute')
			}, 100);
		} 
	})
}

planosDetalhes.forEach((plano) => {
	if(!window.location.href.includes('pages')) {
		const corpoTab = document.getElementById('corpo-tabela')
		const linhaTab = document.createElement('tr')
		corpoTab.appendChild(linhaTab)
		plano.forEach((servico) => {
			if (typeof servico != 'string') {
				linhaTab.innerHTML += 
					`<td class="tab-conteudo text-center">
						<iconify-icon icon="lucide:${servico ? 'check' : 'x'}" class="${servico ? 'scale-110' : 'text-gray-300'}"></iconify-icon>
					</td>`
			}
		})
	}
})

function toggleLabel(id) {
	let label = document.querySelector(`label[for='${id}']`)
	label.classList.toggle("label-out")
}