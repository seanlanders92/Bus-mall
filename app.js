'use strict';
var indexArray = ['', '', ''];
var imgContainer = document.getElementById('stockImages');
var leftImg = document.getElementById('left');
var centerImg = document.getElementById('center')
var rightImg = document.getElementById('right');

var leftIndex = null;
var centerIndex = null;
var rightIndex = null;
var unorderedList = document.getElementById("data");
var Votes = 0;
var totalRounds = 10;

function Product(name, image) {
    this.name = name;
    this.image = image;
    this.clicked = 0;
    this.views = 0;

    Product.allImages.push(this);
}

function randomImg() {
    var randomNumber = Math.floor(Math.random() * Product.allImages.length);
    return randomNumber;
}

function renderImg() {

    do {
        leftIndex = randomImg();
        centerIndex = randomImg();
        rightIndex = randomImg();

    } while (leftIndex === rightIndex || leftIndex === centerIndex || rightIndex === centerIndex || indexArray.includes(leftIndex) || indexArray.includes(rightIndex) || indexArray.includes(centerIndex));

    Product.allImages[leftIndex].views++;
    Product.allImages[centerIndex].views++;
    Product.allImages[rightIndex].views++;

    leftImg.src = Product.allImages[leftIndex].image;
    centerImg.src = Product.allImages[centerIndex].image;
    rightImg.src = Product.allImages[rightIndex].image;


    indexArray[0] = leftIndex;
    indexArray[1] = centerIndex;
    indexArray[2] = rightIndex;
}

var handleClickOnImg = function (event) {
    var productClicked = event.target.id;

    if (productClicked === 'left' || productClicked === 'right' || productClicked === 'center') {
        Votes++;
        if (productClicked === 'left') {
            Product.allImages[leftIndex].clicked++;

        } else if (productClicked === 'right') {
            Product.allImages[rightIndex].clicked++;
        } else if (productClicked === 'center') {
            Product.allImages[centerIndex].clicked++;
        }

    }
    else {
        alert('you clicked wrong');
    }

    if (Votes === totalRounds) {

        stockImages.removeEventListener('click', handleClickOnImg);

        for (var i = 0; i < Product.allImages.length; i++) {
            var datalist = document.createElement('li');
            var product = Product.allImages[i];
            datalist.textContent = `${product.name} received ${product.clicked} votes with ${product.views} views.`;
            unorderedList.appendChild(datalist);
        }
    } else {
        renderImg();
    }
}

Product.allImages = [];

new Product('Bag', '/img/bag.jpg');
new Product('Banana', '/img/banana.jpg');
new Product('Bathroom', '/img/bathroom.jpg');
new Product('Boots', '/img/boots.jpg');
new Product('Breakfast', '/img/breakfast.jpg');
new Product('Bubblegum', '/img/bubblegum.jpg');
new Product('Chair', '/img/chair.jpg');
new Product('Cthulhu', '/img/cthulhu.jpg');
new Product('Dog-duck', '/img/dog-duck.jpg');
new Product('Dragon', '/img/dragon.jpg');
new Product('Pen', '/img/pen.jpg');
new Product('Pet sweep', '/img/pet-sweep.jpg');
new Product('Scissors', '/img/scissors.jpg');
new Product('Shark', '/img/shark.jpg');
new Product('Sweep', '/img/sweep.png');
new Product('Tauntaun', '/img/tauntaun.jpg');
new Product('Unicorn', '/img/unicorn.jpg');
new Product('Usb', '/img/usb.gif');
new Product('Water-can', '/img/water-can.jpg');
new Product('Wine-glass', '/img/wine-glass.jpg');

stockImages.addEventListener('click', handleClickOnImg)

var button = document.getElementById('draw');
button.addEventListener('click', renderChart);
function renderChart() {
  var labelData = [];
  var clickData = [];
  for (var i = 0; i < Product.allImages.length; i++) {
    labelData.push(Product.allImages[i].name);
    clickData.push(Product.allImages[i].clicks);
  }

  var ctx = document.getElementById('my-chart').getContext('2d');

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labelData,
      datasets: [{
        label: '# of Clicks',
        data: clickData,
        backgroundColor: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
      }, {
        label: '# of Views',
        data: [0, 3, 5, 2, 6, 3, 7, 3, 2],
        backgroundColor: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  })
}
renderImg();
