let addToy = false;
let toyCollection;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

function setUpForm(){
  let formToyName = document.getElementById('form-toy-name');
  let formToyImage = document.getElementById('form-toy-image');
  let formSubmit = document.getElementById('form-toy-submit');
  
  formSubmit.addEventListener('click', (event) => {
    let toy = {
      id: toyCollection.length,
      name: formToyName.value,
      image: formToyImage.value,
      likes: 0
    }
    createToyCard(toy);

    toyCollection.push(toy);
  });
}

function getAllToys() {
  fetch("http://localhost:3000/toys")
  .then(response => response.json())
  .then(json => {
    console.log(json);
    toyCollection = json;
    json.forEach(toy => {
      createToyCard(toy);
    });

  })
}

function createToyCard(toy) {
  let toyDiv = document.createElement('div');
  toyDiv.className = 'card';

  let toyName = document.createElement('h2');
  toyName.textContent = toy.name;

  let toyImage = document.createElement('img');
  toyImage.src = toy.image;
  toyImage.className = 'toy-avatar';

  let toyLikes = document.createElement('p');
  toyLikes.textContent = toy.likes;

  let toyLikeButton = document.createElement('button');
  toyLikeButton.className = 'like-btn';
  toyLikeButton.textContent = 'Like ❤️';
  toyLikeButton.id = toy.id;
  toyLikeButton.addEventListener('click', event => {
    console.log('clicked like on ' + toy.name);

    toy.likes = toy.likes + 1;
    toyLikes.textContent = toy.likes;
  });

  toyDiv.appendChild(toyName);
  toyDiv.appendChild(toyImage);
  toyDiv.appendChild(toyLikes);
  toyDiv.appendChild(toyLikeButton);
  // Can also use append(); with appropriate order 
  // toyDiv.append(toyName, toyImage, toyLikes, toyLikeButton);

  let toyCollection = document.getElementById('toy-collection');
  toyCollection.appendChild(toyDiv);
}

getAllToys();
setUpForm();