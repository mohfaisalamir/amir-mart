const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const prices = {
  3: { name: 'Pepaya', price: 3000 },
  4: { name: 'Melon', price: 5000 },
  5: { name: 'Semangka', price: 17000 }
};

let cart = {};

let currentDisplayFunc = displayMenu;

function displayMenu() {
  console.log('\nSelamat datang di toko Amir Mart');
  console.log('Ketik:');
  console.log('1. List harga');
  console.log('2. Cek keranjang');
  console.log('(Ketik 0 untuk ke menu awal)');
}

function displayPriceList() {
  console.log('\nHarga Barang di Amir Mart');
  for (const key in prices) {
    console.log(`${key}. ${prices[key].name}: Rp ${prices[key].price}`);
  }
  console.log('Ketik 0 kembali ke menu awal');
  console.log('Ketik 6 selesai dan kembali ke menu keranjang');
}

function displayCart() {
  console.log('\nIsi Keranjang Belanja:');
  for (const key in cart) {
    console.log(`${prices[key].name} ${cart[key]} buah : Rp. ${prices[key].price * cart[key]}`);
  }
  console.log(`Total Rp. ${calculateTotal()}`);
}

function calculateTotal() {
  let total = 0;
  for (const key in cart) {
    total += prices[key].price * cart[key];
  }
  return total;
}

function processInput(input) {
  const options = input.split('');

  switch (options[0]) {
    case '1':
      displayPriceList();
      currentDisplayFunc = displayPriceList;
      break;
    case '2':
      displayCart();
      currentDisplayFunc = displayCart;
      break;
    case '0':
      if (currentDisplayFunc === displayCart) {
        cart = {};
        console.log('Total keranjang direset menjadi 0.');
      }
      currentDisplayFunc = displayMenu;
      displayMenu();
      break;
    case '6':
      displayCart();
      currentDisplayFunc = displayCart;
      break;
    default:
      if (currentDisplayFunc === displayPriceList) {
        if (options[0] === '0') {
          cart = {};
          console.log('Penghitungan dimulai dari 0 lagi.');
        } else {
          addToCart(options.map(Number));
        }
      } else {
        console.log('Input tidak valid. Silakan coba lagi.');
      }
      break;
  }
}

function addToCart(options) {
  if (options.every((item) => prices[item])) {
    options.forEach((item) => {
      if (cart[item]) {
        cart[item]++;
      } else {
        cart[item] = 1;
      }
    });
    displayCart();
    currentDisplayFunc = displayCart;
  } else {
    console.log('Input tidak valid. Silakan coba lagi.');
  }
}

rl.on('line', (input) => {
  processInput(input);
});

displayMenu();
