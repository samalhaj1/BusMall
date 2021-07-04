
'use strict';
let totalClicks = 0;
let clicksAllow = 25;
let allProducts = [];
let imageArray = [];
let numberOfImages = 6;
let imageOne = document.querySelector('section img:first-child');
let imageTwo = document.querySelector('section img:nth-child(2)');
let imageThree = document.querySelector('section img:nth-child(3)');


// add a event listener
let myImageBox = document.querySelector('section');

// Build a Constructor

function Products(name, fileExtension = 'jpg') {
  this.name = name;
  this.src = `img/${name}.${fileExtension}`;
  this.views = 0;
  this.clicks = 0;
  allProducts.push(this);
}

let retrievedImages = localStorage.getItem('images');
if (retrievedImages) {
  let parsedImages = JSON.parse(retrievedImages);
  allProducts = parsedImages;
} else {
  new Products('bag');
  new Products('banana');
  new Products('bathroom');
  new Products('boots');
  new Products('breakfast');
  new Products('bubblegum');
  new Products('chair');
  new Products('cthulhu');
  new Products('dog-duck');
  new Products('dragon');
  new Products('pen');
  new Products('pet-sweep');
  new Products('scissors');
  new Products('shark');
  new Products('sweep', 'png');
  new Products('tauntaun');
  new Products('unicorn');
  new Products('usb', 'gif');
  new Products('water-can');
  new Products('wine-glass');
}
//  Build random function for images

function getRandomImages() {
  return Math.floor(Math.random() * allProducts.length);
}

function renderImages() {
  while (imageArray.length < numberOfImages) {
    let randomImages = getRandomImages();
    while (!imageArray.includes(randomImages)) {
      imageArray.unshift(randomImages);
    }
  }
  let firstImageIndex = imageArray.pop();
  let secondImageIndex = imageArray.pop();
  let thirdImageIndex = imageArray.pop();


  imageOne.src = allProducts[firstImageIndex].src;
  imageOne.title = allProducts[firstImageIndex].name;
  allProducts[firstImageIndex].views++;

  imageTwo.src = allProducts[secondImageIndex].src;
  imageTwo.title = allProducts[secondImageIndex].name;
  allProducts[secondImageIndex].views++;

  imageThree.src = allProducts[thirdImageIndex].src;
  imageThree.title = allProducts[thirdImageIndex].name;
  allProducts[thirdImageIndex].views++;

}

function handleClick(event) {
  totalClicks++;
  let imageClick = event.target.title;

  for (let i = 0; i < allProducts.length; i++)
    if (imageClick === allProducts[i].name) {
      allProducts[i].clicks++;
    }

  renderImages();
  if (totalClicks === clicksAllow) {
    myImageBox.removeEventListener('click', handleClick);
    renderChart();
    let stringifyImages = JSON.stringify(allProducts);
    localStorage.setItem('images', stringifyImages);
  }
}

renderImages();

function renderChart() {
  let productName = [];
  let productViews = [];
  let productClicks = [];

  for (let i = 0; i < allProducts.length; i++) {
    productName.push(allProducts[i].name);
    productViews.push(allProducts[i].views);
    productClicks.push(allProducts[i].clicks);
  }}
