document.addEventListener('DOMContentLoaded', function() {
  // 1
  const itemsInCart = document.getElementById('items-in-cart');
  const summInCart = document.getElementById('cart-summ');

  // Make some default logic
  itemsInCart.textContent = 0;
  summInCart.textContent = 0;
  // Because it's strange to order 0 quantity
  document.querySelectorAll('.qty__item').forEach(item => item.value = 1);

  // Adding products to cart
  const addToCartButtons = document.querySelectorAll('.product-box__btn');
  addToCartButtons.forEach(button => button.addEventListener('click', (e) => {
    const productMeta = e.target.parentElement;

    const productPrice = productMeta.querySelector('p').textContent.match( /\d+/g );
    const productQuantity = productMeta.querySelector('.qty__item').value;

    itemsInCart.innerHTML = Number(itemsInCart.textContent) + Number(productQuantity);
    summInCart.innerHTML = Number(summInCart.textContent) + Number(productPrice) * productQuantity;
  }));

  // 2
  const categorySelect = document.querySelector('.select-box .select-control');
  const priceSelect = document.querySelector('.price-select-box .select-control');

  const allProducts = document.querySelectorAll('.product-box__item');

  categorySelect.addEventListener('change', function() {
    const choosedCat = this.options['selectedIndex'];

    allProducts.forEach(product => {
      if(product.dataset.cat != choosedCat && choosedCat != 0) {
        product.style.display = 'none';
      } else {
        product.style.display = 'block';
      }
    })
  });

  priceSelect.addEventListener('change', function() {
    const selectedPrice = this.value;

    allProducts.forEach(product => {
      const productPrice = Number(product.querySelector('.product-box__meta p').textContent.match( /\d+/g ));
      if(productPrice >= selectedPrice) {
        product.style.display = 'none';
      } else {
        product.style.display = 'block';
      }
    })
  })

  // 3
  const isEmpty = input => input.value.length === 0 || input.value.trim().length === 0;

  const orderButton = document.querySelector('.btn-check');
  const modal = document.getElementById('modal');
  const closeIcon = document.querySelector('.close');
  const modalForm = document.getElementById('order-form');

  orderButton.addEventListener('click', () => {
    modal.classList.toggle('visible');
  })

  closeIcon.addEventListener('click', () => {
    modal.classList.toggle('visible');
  })

  modalForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('name');
    const email = document.getElementById('email');

    if(!isEmpty(name) && !isEmpty(email)) {
      itemsInCart.textContent = 'XXXX';
      summInCart.textContent = 'XXXX';
      modal.classList.toggle('visible');
      alert('Thanks for the Shopping')
    } else {
      alert('Inputs are empty')
    }

  });
});