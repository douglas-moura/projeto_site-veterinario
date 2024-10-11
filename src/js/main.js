// função para gerar menu e rodapé em cada página
document.addEventListener("DOMContentLoaded", () => {
	// objeto vazio de componentes
	const componentesSite = {}
	// selecionando na página atual o elemento onde serão renderizados os elementos
    componentesSite.menu = document.getElementById("menuSite")
    componentesSite.footer = document.getElementById("rodapeSite")
    // forEach renderizando cada componente dentro do objeto componentesSite
    Object.keys(componentesSite).forEach(key => {
    	// código externo
    	// busca os elementos na pasta layouts em assets
	    fetch("./src/assets/layouts/" + componentesSite[key].id + ".html")
	        .then(response => response.text())
	        .then(data => {
	            // Insere o conteúdo carregado no elemento
	            componentesSite[key].innerHTML = data;
	        })
	        .catch(error => {
	            console.error("Erro ao carregar o conteúdo:", error)
	        })
    })
})

// função para abrir e fechar o menu lateral mobile
// o parâmetro estado é um boolean que varia de acordo com seu objetivo de fechar ou abrir o menu
function abrirMenu(estado) {
	// <aside> com barra branca lateral e pelicula de fundo cinza
	const barraLateral = document.getElementById('menu-mobile-lateral')
	// barra branca dentro do <aside>
	const menuLateral = document.getElementById('navlinks-mobile')
	if (estado) {
		// caso o estado seja true, o <aside> perde a class oculto e a barra branca aparece da esquerda
		barraLateral.classList.remove('oculto')
		menuLateral.classList.remove('-translate-x-full')
		// ativa as funcionalidades drop-down do submenu de serviços
		abrirSubmenuServicos(true)
	} else {
		// caso o estado seja false, a barra branca desaparece pela esquerda e após 600 milisegundos o <aside> ganha a class oculto 
		menuLateral.classList.add('-translate-x-full')
		setTimeout(function() {
			barraLateral.classList.add('oculto')
		}, 600);
		// desativa as funcionalidades drop-down do submenu de serviços
		abrirSubmenuServicos(false)
	}
}

// função para abrir e fechar o submenu de serviços do menu lateral mobile
// parâmetro é instanciado e a função chamada assim que o menu lateral é aberto, porém...
// ...esta função só é executada ao clique no menu drop-down
function abrirSubmenuServicos(estado) {
	document.getElementById('servicos').addEventListener("click", () => {
		// submenu de serviços
		const navServicos = document.getElementById('sub-menu-servicos')
		// box de fundo cinza que comporta o submenu
		const boxServicos = document.getElementById('sub-menu-bloco')
		// altura do submenu aberto (essa variável só serve para agilizar a edição das dimensões do box)
		const alturaBoxServicos = "h-96"
		// se as funcionalidades estiverem ativadas (estado == true) quando o menu for clicado
		if(estado) {
			// box "container" perde a altura 0 e recebe a altura de 96 da variável
			boxServicos.classList.remove('h-0')
			boxServicos.classList.add(alturaBoxServicos)
			// após 200 milisegundos o submenu é "encaixado" no box ao perder o absolute e em seguida fica visível
			setTimeout(function() {
				navServicos.classList.toggle('absolute')
				navServicos.classList.toggle('opacity-0')
			}, 200);
		} else {
			// box "container" perde a altura 96 e recebe a altura de 0 da variável
			boxServicos.classList.add('h-0')
			boxServicos.classList.remove(alturaBoxServicos)
			// o submenu fica invisível
			navServicos.classList.toggle('opacity-0')
			// após 100 milosegundos o submenu é "desencaixado" do box com absolute para permitir que ele seja totalmente retraido
			setTimeout(function() {
				navServicos.classList.toggle('absolute')
			}, 100);
		}
	})
}

// função assincrona para buscar os planos disponíveis no db.json
async function getPlanos() {
	// verifica se o usuário está na página inicial para evitar erros
	if(window.location.pathname == "/index.html")
	try {
		// busca os planos na API do db.json
		const response = await fetch('http://localhost:3000/planos')
		// insere a resposta em formato JSON dentro de planos
		const planos = await response.json()
		// inverte a ordem do Objeto (eu poderia só reeditar o db.json)
		planos.reverse()
		// este forEach percorre todos os planos disponíveis
		Object.keys(planos).forEach(key => {
			// seleciona o elemento DOM na página inicial onde serão renderizadas células da tabela
			const corpoTab = document.getElementById('corpo-tabela')
			// cria um elemento DOM de linha de tabela <tr> para cada plano do forEach e em seguida adiciona a linha criada ao corpo da tabela
			const linhaTab = document.createElement('tr')
			corpoTab.appendChild(linhaTab)
			// este forEach percorre cada benefício do plano atual
			Object.keys(planos[key].adds).forEach(key2 => {
				// para cada benefício é adicionado uma nova célula <td>
				// o operador ternário verifica se o benefício esta incluso no plano atual de acordo com a chave [0] e insere o simbolo e estilo correspondente
				linhaTab.innerHTML += 
					`<td class="tab-conteudo text-center">
						<iconify-icon icon="lucide:${planos[key].adds[key2][0] ? 'check' : 'x'}" class="${planos[key].adds[key2][0] ? 'scale-110' : 'text-gray-300'}"></iconify-icon>
					</td>`
			})
		})
	} catch(error) {
		console.error("Erro ao buscar dados", error)
	}
}

// chamada de funções
// função para listar planos na página Inicial
getPlanos()