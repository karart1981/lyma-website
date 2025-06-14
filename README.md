
# 📄 Project Documentation: Lyma Shopping Website

## 📌 Project Overview
This project is a **simple shopping website** where users can:
- Browse products across different categories.
- Filter products by category.
- Add products to the shopping cart.
- View and manage the cart items.
- Enjoy a responsive and mobile-friendly layout.

---

## 🚀 Problem-Solution Breakdown

| Problem | Solution Implemented |
|---------|----------------------|
| 1. Displaying and Filtering Products | The project uses a JSON data structure (hardcoded in the JS file) and dynamically renders products based on the selected category. |
| 2. Mobile Responsiveness | A responsive CSS design is implemented using media queries to adjust button sizes and layouts for smaller screens. |
| 3. Mobile Menu Toggle | A JavaScript-based toggle function is used to show/hide the mobile menu for a better user experience on small devices. |
| 4. Shopping Cart Management | Users can add items to the cart, increase/decrease quantities, and remove items. The cart's state is updated live without page reloads. |
| 5. Smooth Page Navigation | The CSS applies `scroll-behavior: smooth` for a smooth scrolling experience when navigating to different sections. |
| 6. Preventing Text Selection | The universal CSS rule `user-select: none` is applied to prevent accidental text selection, improving mobile usability. |

---

## 📂 Project Structure
```
beauty-template/
├── index.html         # Main webpage structure
├── main.js            # Application logic and interactivity
├── style.css          # Styling and responsive design
├── img/               # Project images (background, shopping image, favicon)
└── .git/              # Git version control folder
```

---

## 🛠️ Key Components & Functions

### HTML (`index.html`)
- Sets up the overall layout including:
  - Product categories.
  - Product display area.
  - Shopping cart section.
  - Mobile menu.

### JavaScript (`main.js`)
- **DOM Manipulation**: Uses `document.getElementById` and event listeners to interact with elements.
- **Category Filtering**: Filters products based on selected category.
- **Cart Management**:
  - Add to cart.
  - Increase/decrease item quantity.
  - Remove item from cart.
- **Mobile Menu Toggle**: Implements a responsive hamburger menu.

### CSS (`style.css`)
- **Root Variables**: Defines color and font variables for easy theme control.
- **Global Styles**: Smooth scrolling, disable text selection.
- **Responsive Design**: Media queries adjust button sizes and layouts on mobile devices.
- **Button Styling**: Buttons scale appropriately across devices.

---

## ✅ Summary
This project solves common e-commerce interface problems like:
- Product filtering.
- Mobile navigation.
- Cart management.
- Smooth user interaction.

It is a lightweight, responsive, and easy-to-maintain template that could be extended to include features like:
- Persistent cart (using LocalStorage).
- Product search.
- API-based product fetching.
# 📄 Project Documentation: Beauty Template Shopping Website

## 📌 Project Overview
This project is a **simple shopping website** where users can:
- Browse products across different categories.
- Filter products by category.
- Add products to the shopping cart.
- View and manage the cart items.
- Enjoy a responsive and mobile-friendly layout.

---

## 🚀 Problem-Solution Breakdown

| Problem | Solution Implemented |
|---------|----------------------|
| 1. Displaying and Filtering Products | The project uses a JSON data structure (hardcoded in the JS file) and dynamically renders products based on the selected category. |
| 2. Mobile Responsiveness | A responsive CSS design is implemented using media queries to adjust button sizes and layouts for smaller screens. |
| 3. Mobile Menu Toggle | A JavaScript-based toggle function is used to show/hide the mobile menu for a better user experience on small devices. |
| 4. Shopping Cart Management | Users can add items to the cart, increase/decrease quantities, and remove items. The cart's state is updated live without page reloads. |
| 5. Smooth Page Navigation | The CSS applies `scroll-behavior: smooth` for a smooth scrolling experience when navigating to different sections. |
| 6. Preventing Text Selection | The universal CSS rule `user-select: none` is applied to prevent accidental text selection, improving mobile usability. |

---

## 📂 Project Structure
```
beauty-template/
├── index.html         # Main webpage structure
├── main.js            # Application logic and interactivity
├── style.css          # Styling and responsive design
├── img/               # Project images (background, shopping image, favicon)
└── .git/              # Git version control folder
```

---

## 🛠️ Key Components & Functions

### HTML (`index.html`)
- Sets up the overall layout including:
  - Product categories.
  - Product display area.
  - Shopping cart section.
  - Mobile menu.

### JavaScript (`main.js`)
- **DOM Manipulation**: Uses `document.getElementById` and event listeners to interact with elements.
- **Category Filtering**: Filters products based on selected category.
- **Cart Management**:
  - Add to cart.
  - Increase/decrease item quantity.
  - Remove item from cart.
- **Mobile Menu Toggle**: Implements a responsive hamburger menu.

### CSS (`style.css`)
- **Root Variables**: Defines color and font variables for easy theme control.
- **Global Styles**: Smooth scrolling, disable text selection.
- **Responsive Design**: Media queries adjust button sizes and layouts on mobile devices.
- **Button Styling**: Buttons scale appropriately across devices.

---

## ✅ Summary
This project solves common e-commerce interface problems like:
- Product filtering.
- Mobile navigation.
- Cart management.
- Smooth user interaction.

It is a lightweight, responsive, and easy-to-maintain template that could be extended to include features like:
- Persistent cart (using Seassion storage).
- Product search.
- API-based product fetching.
