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
var totalRounds = 7;

function Storage(name){
  this.name = name;
  this.clicked = 0;
  this.views = 0;
}
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
        updateStorage();
        stockImages.removeEventListener('click', handleClickOnImg);
        alert('Click the button to view your results!')

    } else {
        renderImg();
    }
}
function updateStorage(){
  if(localStorage.length === 0){
   var arrayString = JSON.stringify(Product.allImages);
   localStorage.setItem('productData', arrayString);
  }else{
    var arrayString = JSON.stringify(Storage.allData);
    localStorage.setItem('productData', arrayString);
  }
  
 }

 function getProductData(){

  if(localStorage.length > 0){
  var productData = localStorage.getItem('productData');
  var parsedData = JSON.parse(productData);
  Storage.allData = parsedData;
  } 
}
Storage.allData = [];
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

var button2 = document.getElementById('history');
button2.addEventListener('click', renderHistoricalChart);

function renderHistoricalChart() {
  var labelData = [];
  var clickData = [];
  var viewData = [];
  for (var i = 0; i < Storage.allData.length; i++) {
    labelData.push(Storage.allData[i].name);
    clickData.push(Storage.allData[i].clicked);
    viewData.push(Storage.allData[i].views);
  }

  var ctx = document.getElementById('my-historical-chart').getContext('2d');

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labelData,
      datasets: [{
        label: '# of Clicks',
        data: clickData,
        backgroundColor: 'rgba(255, 145, 0, .5',
        borderskipped: 'left, top, right',
        borderWidth: 3,
      }, {
        label: '# of Views',
        data: viewData,
        backgroundColor: 'rgba(255, 68, 0, .5',
        borderskipped: 'left, top, right',
        borderWidth: 3,
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


var button = document.getElementById('draw');
button.addEventListener('click', renderChart);

function renderChart() {
  var labelData = [];
  var clickData = [];
  var viewData = [];
  for (var i = 0; i < Product.allImages.length; i++) {
    labelData.push(Product.allImages[i].name);
    clickData.push(Product.allImages[i].clicked);
    viewData.push(Product.allImages[i].views);
  }

  var ctx = document.getElementById('my-chart').getContext('2d');

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labelData,
      datasets: [{
        label: '# of Clicks',
        data: clickData,
        backgroundColor: 'rgba(255, 145, 0, .5',
        borderskipped: 'left, top, right',
        borderWidth: 3,
      }, {
        label: '# of Views',
        data: viewData,
        backgroundColor: 'rgba(255, 68, 0, .5',
        borderskipped: 'left, top, right',
        borderWidth: 3,
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
getProductData();
renderImg();
