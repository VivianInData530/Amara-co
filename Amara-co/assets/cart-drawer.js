function openCartDrawer() {
  const drawer = document.getElementById('cart-drawer');
  if (!drawer) return;
  drawer.hidden = false;
  requestAnimationFrame(function () {
    drawer.classList.add('active');
  });
  document.body.style.overflow = 'hidden';
}

function closeCartDrawer() {
  const drawer = document.getElementById('cart-drawer');
  if (!drawer) return;
  drawer.classList.remove('active');
  setTimeout(function () {
    drawer.hidden = true;
    document.body.style.overflow = '';
  }, 300);
}

function updateCartDisplay(cart) {
  const badge = document.querySelector('[data-cart-count]');
  if (badge) badge.textContent = cart.item_count;
}

async function refreshCart() {
  const response = await fetch('/cart.js');
  if (!response.ok) throw new Error('Could not load cart.');
  return await response.json();
}

async function removeItem(key) {
  try {
    const response = await fetch('/cart/change.js', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ line: key, quantity: 0 })
    });
    if (!response.ok) throw new Error('Could not remove item.');
    window.location.reload();
  } catch (error) {
    console.error('Remove item error:', error);
  }
}

async function updateQuantity(key, newQty) {
  if (newQty < 1) {
    await removeItem(key);
    return;
  }
  try {
    const response = await fetch('/cart/change.js', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ line: key, quantity: newQty })
    });
    if (!response.ok) throw new Error('Could not update quantity.');
    window.location.reload();
  } catch (error) {
    console.error('Quantity update error:', error);
  }
}

document.addEventListener('DOMContentLoaded', function () {
  const forms = document.querySelectorAll('form[data-add-to-cart-form]');
  forms.forEach(function (form) {
    form.addEventListener('submit', async function (event) {
      event.preventDefault();
      const submitButton = form.querySelector('button[type="submit"]');
      if (submitButton) submitButton.disabled = true;

      try {
        const formData = new FormData(form);
        const response = await fetch('/cart/add.js', {
          method: 'POST',
          headers: { Accept: 'application/json' },
          body: formData
        });
        if (!response.ok) {
          const errorData = await response.json().catch(function () { return null; });
          throw new Error(errorData && errorData.description ? errorData.description : 'Unable to add this product to your cart.');
        }
        const cart = await refreshCart();
        updateCartDisplay(cart);
        window.location.reload();
      } catch (error) {
        console.error('Add to cart error:', error);
        alert(error.message);
      } finally {
        if (submitButton) submitButton.disabled = false;
      }
    });
  });
});