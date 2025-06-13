document.addEventListener('DOMContentLoaded', () => {
      const ID = id => document.getElementById(id);

      document.getElementById('menu-toggle').addEventListener('click', () =>
        document.getElementById('mobile-menu').classList.toggle('hidden')
      );

      const sel = ID('category-filter');
      const sectionsContainer = ID('sections-container');

      let cart = JSON.parse(sessionStorage.getItem('cart') || '[]');

      const saveCart = () => sessionStorage.setItem('cart', JSON.stringify(cart));

      const updateCart = () => {
        const cont = ID('cart-container');
        cont.innerHTML = '';
        let total = 0;
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
        ID('cart-count').textContent = cart.reduce((sum, i) => sum + i.quantity, 0);
        ID('cart-total').textContent = total.toFixed(2);
        saveCart();
      };

      const addToCart = prod => {
        const p = cart.find(i => i.id === prod.id);
        p ? p.quantity++ : cart.push({ ...prod, quantity: 1 });
        updateCart();
        toggleCart(true);
      };

      const toggleCart = v => {
        ID('cart-panel').classList.toggle('hidden', !v);
        ID('cart-overlay').classList.toggle('hidden', !v);
      };

      ID('cart-toggle').onclick = () => toggleCart(true);
      ID('cart-close').onclick = () => toggleCart(false);
      ID('cart-overlay').onclick = () => toggleCart(false);

      ID('cart-container').onclick = e => {
        const id = +e.target.dataset.id;
        let item = cart.find(i => i.id === id);
        if (!item) return;
        if (e.target.matches('.increase')) item.quantity++;
        else if (e.target.matches('.decrease')) {
          if (--item.quantity === 0) cart = cart.filter(i => i.id !== id);
        } else if (e.target.matches('.remove')) {
          cart = cart.filter(i => i.id !== id);
        }
        updateCart();
      };

      function loadAndRender(category) {
        const url = category ?
          `https://dummyjson.com/products/category/${category}` :
          'https://dummyjson.com/products';

        fetch(url)
          .then(res => res.json())
          .then(data => {
            const prods = category ? data.products : data.products;
            const grouped = category ? { [category]: prods } :
              prods.reduce((acc, p) => {
                (acc[p.category] ||= []).push(p);
                return acc;
              }, {});

            sectionsContainer.innerHTML = '';
            for (const [cat, products] of Object.entries(grouped)) {
              const section = document.createElement('div');
              section.innerHTML = `
                <h2 class="text-2xl font-semibold mb-4">${cat[0].toUpperCase() + cat.slice(1)}</h2>
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"></div>`;
              const grid = section.querySelector('div');
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

            // Attach Buy button events
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

      // Attach navbar category filters
      document.querySelectorAll('[data-category]').forEach(link => {
        link.addEventListener('click', e => {
          const category = e.target.dataset.category;
          sel.value = category;
          sel.dispatchEvent(new Event('change'));
          ID('mobile-menu').classList.add('hidden');
        });
      });

      sel.onchange = e => loadAndRender(e.target.value);

      updateCart();
      sel.dispatchEvent(new Event('change'));
});
