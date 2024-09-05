const containerVideos = document.querySelector('.container-videos')

//busca na api
const api = fetch("http://localhost:3000/videos")
//then é quando acaba de executar a função de cima executa a 
//função de baixo passando as info como atributo para a 
//proxima funçã
              //.json() transforma a resposta em json
.then(res => res.json())
.then((videos) => {
    videos.forEach((video) => {
        //acrescenta os videos printando no HTML
        containerVideos.innerHTML += `
            <li class="videos-item">
                <iframe src="${video.url}" title="${video.titulo}" frameborder="0" allowfullscreen></iframe>
            </li>
        `;
    });
});

