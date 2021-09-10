const body = document.querySelector('body');
const obtn = document.querySelector('#open-search-form');
const cbtn = document.querySelector('#close-search-form');
const searchBody = document.querySelector('.search-form');
const cards = document.querySelectorAll('.card')
const items = document.querySelectorAll('.list-group-item')
const linkbtn = document.querySelectorAll('.card-link')
obtn.addEventListener('click', function () {
    searchBody.style.display = 'block';
    body.classList.add('blackify');
    // body.style.backgroundImage = 'rgb(0,0,0,0.4)'
    for (let i = 0; i < cards.length; i++) {
        cards[i].style.backgroundColor = 'rgb(0,0,0,0)';
    }
    for (let i = 0; i < items.length; i++) {
        items[i].style.backgroundColor = 'rgb(0,0,0,0)';
    }
    for (let i = 0; i < linkbtn.length; i++) {
        linkbtn[i].classList.toggle('btn-primary');
    }
})

cbtn.addEventListener('click', function (e) {
    e.preventDefault();
    searchBody.style.display = 'none';
    body.classList.remove('blackify');
    for (let i = 0; i < linkbtn.length; i++) {
        linkbtn[i].classList.toggle('btn-primary');
    }
})