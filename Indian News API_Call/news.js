





const API_KEY = "d414836fe53f4d46a60d56cccdd4c0dd";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener('load',() => fetchNews("India"));

function reload(){
    window.location.reload();
}

async function fetchNews(query){
 const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
 const data = await res.json();
 bindData(data.articles);
}

function bindData(articles){
    const cardContainer = document.getElementById('card-container');
    const cardTemplate = document.getElementById('template-news-card');

    cardContainer.innerHTML= "";

    articles.forEach(articles => {
        if(!articles.urlToImage) return;
        const cardClone = cardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone.articles);
        cardContainer.appendChild(cardClone);
    });
}


function fillDataInCard(cardClone,articles){
    const newsImg = cardClone.querySelector('#news-img');
    const newsTitle = cardClone.querySelector('#news-title');
    const newsSource = cardClone.querySelector('#news-source');
    const newsDesc = cardClone.querySelector('#news-dsce');


    newsImg.src = articles.urlToImage;
    newsTitle.innerHTML = articles.title;
    newsDesc.innerHTML = articles.description;

    const date = new Date(articles.publishedAt).toLocaleString("en-US",{
        timeZone:"Asia/Jakarta"

    });

    newsSource.innerHTML = `${articles.source.name} .${date}`;
    
}

let curSelecredNav = null;
function onNavItemClick(id){
    fetchNews(id);
    const navItem =document.getElementById(id);
    curSelecredNav?.classList.remove('active');
    curSelecredNav = navItem;
    curSelecredNav.classList.add('active');
}


const searchButton = document.getElementById('search-butoon');
const searchText = document.getElementById('serch-text');

searchButton.addEventListener('click', () => {
    const query = searchText.value;
    if(!query) return;
    fetchNews(query);
    curSelecredNav?.classList.remove('active');
    curSelecredNav = null;

});

