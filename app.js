'use strict';

var imgContainer = document.getElementById('stockImages');
var leftImg = document.getElementById('left');
var centerImg = document.getElementById('center')
var rightImg = document.getElementById('right');

var leftIndex = null;
var centerIndex = null;
var rightIndex = null;

var Votes = 0;
var totalRounds = 10;

function Product(name, image){
  this.name = name;
  this.image = image;
  this.clicked = 0;
  this.views = 0;

  Product.allImages.push(this);
}

function randomImg(){
  var randomNumber = Math.floor(Math.random() * Product.allImages.length);
  return randomNumber;
}

function renderImg(){
 
  do {
    leftIndex = randomImg();
    centerIndex = randomImg();
    rightIndex = randomImg();
  } while(leftIndex === rightIndex || leftIndex === centerIndex || rightIndex === centerIndex);

  Product.allImages[leftIndex].views++;
  Product.allImages[centerIndex].views++;
  Product.allImages[rightIndex].views++;

  leftImg.src = Product.allImages[leftIndex].image;
  centerImg.src = Product.allImages[centerIndex].image;
  rightImg.src = Product.allImages[rightIndex].image;
}

var handleClickOnImg = function(event){
  var productClicked = event.target.id;

  if(productClicked === 'left' || productClicked === 'right' || productClicked ==='center'){
    Votes++;
    if(productClicked === 'left'){
      Product.allImages[leftIndex].clicked++;
  
    } else if(productClicked === 'right'){
       Goat.allImages[rightIndex].clicked++;
      } else if(productClicked === 'center'){
          Product.allImages[centerIndex].clicked++;
      }
  
  }
  else{
    alert('you clicked wrong');
  }

  if(Votes === totalRounds ){

    stockImages.removeEventListener('click', handleClickOnImg);
    alert('thank you for your votes');

    for(var i = 0; i < Product.allImages.length; i++){
      var product = Product.allImages[i];
      console.log(`${product.name} received ${product.clicked} votes with ${product.views} views.`);
    }
  }else{
    renderImg();
  }
}

Product.allImages = [];

new Product('bag', '/img/bag.jpg');
new Product('banana', '/img/banana.jpg');
new Product('bathroom', '/img/bathroom.jpg');
new Product('boots', '/img/boots.jpg');
new Product('breakfast', '/img/breakfast.jpg');
new Product('bubblegum', '/img/bubblegum.jpg');
new Product('chair', '/img/chair.jpg');
new Product('cthulhu', '/img/cthulhu.jpg');
new Product('dog-duck', '/img/dog-duck.jpg');
new Product('dragon', '/img/dragon.jpg');
new Product('pen', '/img/pen.jpg');
new Product('pet-sweeps', '/img/pet-sweeps.jpg');
new Product('scissors', '/img/scissors.jpg');
new Product('shark', '/img/shark.jpg');
new Product('sweep', '/img/sweep.jpg');
new Product('tauntaun', '/img/tauntaun.jpg');
new Product('unicorn', '/img/bag.jpg');
new Product('usb', '/img/usb.jpg');
new Product('water-can', '/img/water-can.jpg');
new Product('wine-glass', '/img/wine-glass.jpg');

renderImg();

stockImages.addEventListener('click', handleClickOnImg)