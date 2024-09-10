//TRATANDO API FAKE --------------------------
const containerVideos = document.querySelector('.container-videos')

//função assíncrona 
async function buscarEMostrarVideos(){
    try{
        //busca na api 
                    //espera executar a busca para prosseguir  
        const busca = await fetch("http://localhost:3000/videos");
        const videos = await busca.json();
    
        videos.forEach((video) => {
            //acrescenta os videos printando no HTML
            containerVideos.innerHTML += `
                <li class="videos-item">
                    <iframe src="${video.url}" title="${video.titulo}" frameborder="0" allowfullscreen></iframe>
                    <div class="titulo-img-video">
                        <img class="img-canal" src="${video.imagem} alt="Logo do Canal">
                        <h3 class="titulo-video">${video.titulo}</h3>
                    </div>
                    <div class="descricao-video">
                        <p>${video.descricao}</p>
                        <p class="categoria-filtro" hidden> ${video.categoria}</p>
                    </div>
                </li>
            `;
        });
    }
    //se tiver erros
    catch(error){
        containerVideos.innerHTML = `<p> Houve um erro : ${error}</p>`
    }
    //independente ele executa
    finally{

    }

}

buscarEMostrarVideos();


//BARRA DE PESQUISA ---------------------------------------

const barraDePesquisa = document.querySelector('.form-pesquisa-input');

barraDePesquisa.addEventListener("input", filtrarPesquisa);

function filtrarPesquisa(){
    const videos = document.querySelectorAll(".videos-item")

    if(barraDePesquisa.value != ""){
        for(let video of videos){
            //titulo do video
            let titulo = video.querySelector(".titulo-video").textContent.toLowerCase();
            //barra de pesquisa
            let valorFiltro = barraDePesquisa.value.toLowerCase();

            //se o video n for oq está sendo procurado ele desaparece
            if(!titulo.includes(valorFiltro)){
                video.style.display = "none";
            } 
            else{
                //exibe os videos
                video.style.display = "block";
            }
        }
    }
    else{
        for(let video of videos){
            //se a barra de pesquisa estiver vazia
            video.style.display = "block";
        }
    }
}


//FILTRANDO CATEGORIAS -----------------------

const botaoCategoria = document.querySelectorAll(".categorias-item");

botaoCategoria.forEach((botao) =>{
    let nomeCategoria = botao.getAttribute("name");
    botao.addEventListener("click", () => filtrarPorCategoria(nomeCategoria));
});

function filtrarPorCategoria (filtro){
    const videos = document.querySelectorAll(".videos-item");

    for(let video of videos){
        let categoria = video.querySelector(".categoria-filtro").textContent.toLowerCase();
        let valorFiltro = filtro.toLowerCase();

        if(!categoria.includes(valorFiltro) && valorFiltro != "tudo"){
            //se nao for da categoria selecionada ou não for "tudo"
            video.style.display = "none";
        }
        else{
            video.style.display = "block";
        }

    }
}

//CARROSSEL 

document.addEventListener('DOMContentLoaded', function() {
    const container = document.querySelector('.categorias-container'); // Mudar para '.categorias-container'
    const slider = document.querySelector('.categorias-slider');

    slider.addEventListener('click', function() {
        container.scrollBy({
            left: container.offsetWidth,
            behavior: 'smooth'
        });
    });
});

//BTN TROCA TEMA

const btnTrocaTema = document.querySelector(".cabecalho-switch-btn");
const root = document.documentElement;
let temaEscuroAtivo = false; // Começa com o tema claro por padrão

btnTrocaTema.addEventListener("click", () => {
    if (!temaEscuroAtivo) {
        // Aplicar tema escuro
        root.style.setProperty('--cor-categorias', 'rgb(61, 61, 61)');
        root.style.setProperty('--cor-fundo', 'black');
        root.style.setProperty('--cor-tema', 'white');
    } else {
        // Aplicar tema claro
        root.style.setProperty('--cor-categorias', 'rgb(231, 231, 231)');
        root.style.setProperty('--cor-fundo', 'white');
        root.style.setProperty('--cor-tema', 'rgb(22, 22, 22)');
    }
    temaEscuroAtivo = !temaEscuroAtivo; // Alterna o estado do tema
});