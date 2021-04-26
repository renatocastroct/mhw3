function add_elements(type) {
    var blocco = [];
    if (type == 'memo') {
        for (let i in memo) {
            var new_div = document.createElement('div');
            new_div.classList.add('div_element');
            let new_h2 = document.createElement('h2');
            new_h2.textContent = memo[i].titolo;
            let new_h3 = document.createElement('h3');
            new_h3.textContent = 'more';
            let new_h4 = document.createElement('h4');
            new_h4.classList.add('off');
            new_h4.textContent = memo[i].descrizione;
            let new_img = document.createElement('img');
            new_img.classList.add('element');
            new_img.src = memo[i].immagine;
            new_div.appendChild(new_h2);
            new_div.appendChild(new_img);
            new_div.appendChild(new_h4);
            new_div.appendChild(new_h3);
            new_div.dataset.index = i;
            blocco[i] = new_div;

            var new_bookmark = document.createElement('div');
            new_bookmark.classList.add('off');
            var new_b_image = document.createElement('img');
            new_b_image.src = memo[i].immagine;
            new_b_image.classList.add('bookmark_img');
            var new_b_div = document.createElement('div');
            var b_img_remove = document.createElement('img');
            b_img_remove.src = 'remove.png';
            b_img_remove.classList.add('remove');
            var new_b_h2 = document.createElement('h2');
            new_b_h2.textContent = memo[i].titolo;
            new_b_div.appendChild(b_img_remove);
            new_b_div.appendChild(new_b_h2);
            new_bookmark.appendChild(new_b_div);
            new_bookmark.appendChild(new_b_image);
            new_bookmark.dataset.index = i;
            new_bookmark.dataset.parent = 'memo';
            document.querySelector('.bookmarks').appendChild(new_bookmark);
        }
    }
    else {
        for (let i in cards) {
            var new_div = document.createElement('div');
            new_div.classList.add('div_element');
            let new_h2 = document.createElement('h2');
            new_h2.textContent = cards[i].titolo;
            let new_h3 = document.createElement('h3');
            new_h3.textContent = 'more';
            let new_h4 = document.createElement('h4');
            new_h4.classList.add('off');
            new_h4.textContent = cards[i].descrizione;
            let new_img = document.createElement('img');
            new_img.classList.add('element');
            new_img.src = cards[i].immagine;
            new_div.appendChild(new_h2);
            new_div.appendChild(new_img);
            new_div.appendChild(new_h4);
            new_div.appendChild(new_h3);
            new_div.dataset.index=i;
            blocco[i] = new_div;

            var new_bookmark = document.createElement('div');
            new_bookmark.classList.add('off');
            var new_b_image = document.createElement('img');
            new_b_image.src = cards[i].immagine;
            new_b_image.classList.add('bookmark_img');
            var new_b_div = document.createElement('div');
            var b_img_remove = document.createElement('img');
            b_img_remove.src = 'remove.png';
            b_img_remove.classList.add('remove');
            var new_b_h2 = document.createElement('h2');
            new_b_h2.textContent = cards[i].titolo;
            new_b_div.appendChild(b_img_remove);
            new_b_div.appendChild(new_b_h2);
            new_bookmark.appendChild(new_b_div);
            new_bookmark.appendChild(new_b_image);
            new_bookmark.dataset.index = i;
            new_bookmark.dataset.parent = 'cards';
            document.querySelector('.bookmarks').appendChild(new_bookmark);
        }
    }
    return blocco;
}

let blocchi = document.querySelectorAll('.elements');
for (i=0; i<blocchi.length; i++) {
    if (blocchi[i].dataset.parent == 'memo') {
        let block = add_elements('memo');
        for (let n in block) {
            blocchi[i].appendChild(block[n]);
        }
    }
    else {
        let block = add_elements('cards');
        for (let n in block) {
            blocchi[i].appendChild(block[n]);
        }
    }
}





function descr(event) {
    var desc = event.currentTarget.parentNode.querySelector('h4');
    if (event.currentTarget.textContent == 'more') {
        event.currentTarget.textContent = "less";
        desc.classList.remove('off');
    }
    else {
        event.currentTarget.textContent = "more";
        desc.classList.add('off');
    }
}

const mores = document.querySelectorAll('.blocks h3');
for (let more of mores) {
    more.addEventListener('click', descr);
}





function ricerca(event) {
    var elementi = document.querySelectorAll('.elements div');
    for (let elemento of elementi) {
        elemento.classList.remove('off');
        elemento.classList.add('div_element');
    }
    var titoli = document.querySelectorAll('.blocks h2');
    var descrizioni = document.querySelectorAll('.blocks h4');
    console.log(descrizioni);
    var text = event.currentTarget.value.toLowerCase();
    var i = 0;
    for (let titolo of titoli) {
        if (titolo.textContent.toLowerCase().indexOf(text) == -1) {
            if (descrizioni[i].textContent.toLowerCase().indexOf(text) == -1) {
                descrizioni[i].parentNode.classList.remove('div_element');
                descrizioni[i].parentNode.classList.add('off');
            }
        }
        i++;
    }
}

var search = document.querySelector('#search');
search.addEventListener('input', ricerca);





function carica(event) {
    var indice = event.currentTarget.parentNode.dataset.index;
    var parente = event.currentTarget.parentNode.parentNode.dataset.parent;
    var bookmarks = document.querySelectorAll('#main div.off');
    for (let bookmark of bookmarks) {
        if ((bookmark.dataset.index == indice) && (bookmark.dataset.parent == parente)) {
            bookmark.classList.remove('off');
            bookmark.classList.add('bookmark');
        }
    }
}

var selection = document.querySelectorAll('.element');
for (let selected of selection) {
   selected.addEventListener('click', carica);
}





function elimina(event) {
    var bookmark_deload = event.currentTarget.parentNode.parentNode;
    bookmark_deload.classList.remove('bookmark');
    bookmark_deload.classList.add('off');

}

var remove = document.querySelectorAll('.remove');
for (let x of remove) {
    x.addEventListener('click', elimina);
}



var collection_url;
const images_key = 'H3YENZHRhLfsH81aIcKx0svavL9iPVO6uJY7A2E0hso';
fetch('https://api.unsplash.com/users/renatoct/collections', {
    headers: {
        'Authorization': 'Client-ID ' + images_key
    }
}).then(onResponse).then(onCollection);

function onCollection(json) {
    var collections_data = json;
    for (let collection of collections_data) {
        if (collection.title == 'electronics') {
            collection_url = collection.links.photos;
            fetch(collection_url, {
                headers: {
                    'Authorization': 'Client-ID ' + images_key
                }
            }).then(onResponse).then(onHomePage);        
        }
    }
}

function onHomePage(json) {
    var images_data = json;
    var header = document.querySelector('header');
    var n = Math.round(Math.random()*images_data.length);
    header.style.backgroundImage = "url('" + images_data[n].urls.full + "')";
}

function onResponse(response) {
    return response.json();
}