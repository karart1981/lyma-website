// Wait for the entire DOM to load before executing the script
document.addEventListener('DOMContentLoaded', () => {
  // Helper function to get element by ID
  const ID = id => document.getElementById(id);

  // Toggle mobile menu visibility
  document.getElementById('menu-toggle').addEventListener('click', () =>
    document.getElementById('mobile-menu').classList.toggle('hidden')
  );

  // Get references to category selector and main container for product sections
  const sel = ID('category-filter');
  const sectionsContainer = ID('sections-container');

  // Load cart from sessionStorage or initialize it as an empty array
  let cart = JSON.parse(sessionStorage.getItem('cart') || '[]');

  // Save the current cart state to sessionStorage
  const saveCart = () => sessionStorage.setItem('cart', JSON.stringify(cart));

  // Update the cart UI and totals
  const updateCart = () => {
    const cont = ID('cart-container');
    cont.innerHTML = ''; // Clear current cart UI
    let total = 0;

    // Render each item in the cart
    cart.forEach(i => {
      total += i.price * i.quantity;
      const div = document.createElement('div');
      div.className = 'flex justify-between items-center';
      div.innerHTML = `
        <span class="text-sm">${i.title} × ${i.quantity}</span>
        <div class="flex items-center space-x-1">
          <button data-id="${i.id}" class="decrease bg-gray-200 rounded px-1">‑</button>
          <button data-id="${i.id}" class="increase bg-gray-200 rounded px-1">+</button>
          <button data-id="${i.id}" class="remove bg-red-200 rounded px-1">✕</button>
        </div>`;
      cont.appendChild(div);
    });

    // Update cart count and total price
    ID('cart-count').textContent = cart.reduce((sum, i) => sum + i.quantity, 0);
    ID('cart-total').textContent = total.toFixed(2);

    saveCart(); // Save changes
  };

  // Add a product to the cart
  const addToCart = prod => {
    const p = cart.find(i => i.id === prod.id);
    p ? p.quantity++ : cart.push({ ...prod, quantity: 1 });
    updateCart();
    // toggleCart(true); // Disabled to prevent auto-opening the cart
  };

  // Show or hide the cart panel and overlay
  const toggleCart = v => {
    ID('cart-panel').classList.toggle('hidden', !v);
    ID('cart-overlay').classList.toggle('hidden', !v);
  };

  // Cart panel toggle buttons
  ID('cart-toggle').onclick = () => toggleCart(true);
  ID('cart-close').onclick = () => toggleCart(false);
  ID('cart-overlay').onclick = () => toggleCart(false);

  // Handle cart button interactions: increase, decrease, remove
  ID('cart-container').onclick = e => {
    const id = +e.target.dataset.id;
    let item = cart.find(i => i.id === id);
    if (!item) return;

    if (e.target.matches('.increase')) {
      item.quantity++;
    } else if (e.target.matches('.decrease')) {
      if (--item.quantity === 0) cart = cart.filter(i => i.id !== id);
    } else if (e.target.matches('.remove')) {
      cart = cart.filter(i => i.id !== id);
    }

    updateCart();
  };

  // Fetch and display products, optionally filtered by category
  function loadAndRender(category) {
    const url = category ?
      `https://dummyjson.com/products/category/${category}` :
      'https://dummyjson.com/products';

    fetch(url)
      .then(res => res.json())
      .then(data => {
        const prods = data.products;
        
        // Group products by category if no filter is applied
        const grouped = category ? { [category]: prods } :
          prods.reduce((acc, p) => {
            (acc[p.category] ||= []).push(p);
            return acc;
          }, {});

        // Clear previous content
        sectionsContainer.innerHTML = '';

        // Render each product section
        for (const [cat, products] of Object.entries(grouped)) {
          const section = document.createElement('div');
          section.id = `section-${cat}`; // Used for scrolling
          section.innerHTML = `
            <h2 class="text-2xl font-semibold mb-4">${cat[0].toUpperCase() + cat.slice(1)}</h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"></div>`;
          const grid = section.querySelector('div');

          // Render individual product cards
          products.forEach(p => {
            const card = document.createElement('div');
            card.className = 'bg-white shadow rounded flex flex-col overflow-hidden';
            card.innerHTML = `
              <img src="${p.thumbnail}" alt="${p.title}" class="w-full h-40 object-cover">
              <div class="p-4 flex flex-col flex-1">
                <h3 class="font-semibold mb-2">${p.title}</h3>
                <p class="text-lg font-bold mb-4">$${p.price}</p>
                <button data-id="${p.id}" data-title="${p.title}" data-price="${p.price}" class="buy-btn mt-auto bg-[#a5c927] text-white px-3 py-1 rounded">Buy</button>
              </div>`;
            grid.appendChild(card);
          });

          sectionsContainer.appendChild(section);
        }

        // Attach Buy button listeners
        sectionsContainer.querySelectorAll('.buy-btn').forEach(btn => {
          btn.addEventListener('click', e => {
            const el = e.currentTarget;
            const prod = {
              id: +el.dataset.id,
              title: el.dataset.title,
              price: +el.dataset.price,
            };
            addToCart(prod);
          });
        });
      });
  }

  // Add click listeners to navbar category links
  document.querySelectorAll('[data-category]').forEach(link => {
    link.addEventListener('click', e => {
      const category = e.target.dataset.category;

      // Change the dropdown value and trigger filtering
      sel.value = category;
      sel.dispatchEvent(new Event('change'));

      // Wait briefly for rendering, then scroll to section
      setTimeout(() => {
        const section = document.getElementById(`section-${category}`);
        if (section) {
          section.scrollIntoView({ behavior: 'smooth' });
        }
      }, 500);

      // Close mobile menu after selection
      ID('mobile-menu').classList.add('hidden');
    });
  });

  // Load products when category filter is changed
  sel.onchange = e => loadAndRender(e.target.value);

  // Initialize cart and trigger default category rendering
  updateCart();
  sel.dispatchEvent(new Event('change'));
});

