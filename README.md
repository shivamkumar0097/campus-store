<div align="center">

# 🎓 Campus Store

**College essentials, one store.**  
A polished, student-first e-commerce experience built with React, Vite and Firebase.

[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vite.dev/)
[![Firebase](https://img.shields.io/badge/Firebase-Auth-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)](https://firebase.google.com/)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES2024-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/docs/Web/JavaScript)
[![ESLint](https://img.shields.io/badge/ESLint-10-4B32C3?style=for-the-badge&logo=eslint&logoColor=white)](https://eslint.org/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen?style=for-the-badge)](https://github.com/shivamkumar0097/campus-store/pulls)

[![GitHub stars](https://img.shields.io/github/stars/shivamkumar0097/campus-store?style=flat-square&logo=github)](https://github.com/shivamkumar0097/campus-store/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/shivamkumar0097/campus-store?style=flat-square&logo=github)](https://github.com/shivamkumar0097/campus-store/network/members)
[![Last commit](https://img.shields.io/github/last-commit/shivamkumar0097/campus-store?style=flat-square&logo=github)](https://github.com/shivamkumar0097/campus-store/commits/main)

</div>

---

## 🛍️ Overview

Campus Store is a single-page storefront for students — stationery, tech accessories, books and college merch in one place. It pairs a dark, high-contrast storefront with a real shopping flow: browse and filter the catalogue, open product pages with reviews and related items, save favourites to a wishlist, manage a cart, apply a student coupon and place an order.

Authentication is handled by Firebase (email/password + Google), while cart and wishlist state is persisted per-user in `localStorage` — so your bag follows your account, not your browser tab.

> 🎟️ Try coupon **`STUDENT15`** at checkout for 15% off.  
> 🚚 Delivery is **free over ₹499**.

---

## 📸 Screenshots

### Home & discovery

| Home hero | Full home page |
| --- | --- |
| ![Home hero](docs/screenshots/01-home-hero.png) | ![Full home page](docs/screenshots/02-home-full.png) |

### Catalogue

| Browse | Search | Category filter |
| --- | --- | --- |
| ![Catalogue](docs/screenshots/03-catalogue.png) | ![Search results](docs/screenshots/04-catalogue-search.png) | ![Category filter](docs/screenshots/05-catalogue-category.png) |

### Product & auth

| Product detail | Sign in / sign up | Signed in |
| --- | --- | --- |
| ![Product detail](docs/screenshots/06-product-detail.png) | ![Auth modal](docs/screenshots/07-auth-modal.png) | ![After sign in](docs/screenshots/09-after-signin.png) |

### Cart, checkout & wishlist

| Cart | Checkout | Coupon applied |
| --- | --- | --- |
| ![Cart](docs/screenshots/10-cart.png) | ![Checkout](docs/screenshots/11-checkout.png) | ![Coupon](docs/screenshots/12-checkout-coupon.png) |

| Delivery details | Wishlist |
| --- | --- |
| ![Checkout filled](docs/screenshots/13-checkout-filled.png) | ![Wishlist](docs/screenshots/14-wishlist.png) |

### Mobile

<p align="center">
  <img src="docs/screenshots/15-mobile-home.png" alt="Mobile home" width="320" />
  <img src="docs/screenshots/16-mobile-catalogue.png" alt="Mobile catalogue" width="320" />
</p>

---

## ✨ Features

- **🗂️ Four curated categories** — Stationery, Tech Accessories, Books and College Merch.
- **🔍 Fast catalogue** — instant search, category chips and sorting by popularity, price and rating.
- **📦 Rich product pages** — gallery-style hero, feature list, ratings, reviews, quantity picker and related products.
- **🔐 Firebase authentication** — email/password and Google sign-in, friendly error messages and a polished auth modal.
- **🛒 Persistent cart & wishlist** — scoped per Firebase user and stored in `localStorage`; guests are prompted to sign in.
- **🧾 Checkout flow** — delivery details, UPI / card / cash-on-delivery options, student coupon and order confirmation.
- **🎉 Toast notifications** — lightweight feedback for add-to-cart, wishlist and auth actions.
- **📱 Fully responsive** — sticky navigation, mobile drawer and layouts tuned for small screens.
- **♿ Accessible by default** — semantic landmarks, labelled controls, focus-visible states and reduced-motion support.

---

## 🏗️ Architecture

```mermaid
flowchart TD
    U([Student]) --> SPA[React SPA]

    subgraph SPA["Campus Store (Vite)"]
        R[Hash Router<br/>/#/products · /#/product/:id]
        P[Pages<br/>Home · Products · ProductDetail<br/>Cart · Checkout · Wishlist]
        C[Context Providers<br/>Auth · Cart · Wishlist · Toast]
        D[Static Catalogue<br/>products.js · reviews.js]
    end

    C -->|cart + wishlist per uid| LS[(localStorage)]
    C -->|sign in / sign up / sign out| FB[Firebase Authentication]
    FB -->|onAuthStateChanged| C
    R --> P
    P --> C
    P --> D
```

### Checkout flow

```mermaid
sequenceDiagram
    autonumber
    actor S as Student
    participant UI as React UI
    participant Cart as CartContext
    participant Auth as AuthContext
    participant FB as Firebase Auth
    participant LS as localStorage

    S->>UI: Add items to cart
    UI->>Cart: addItem(product)
    Cart->>LS: persist cart (uid-scoped)
    S->>UI: Open checkout
    UI->>Auth: require signed-in user
    alt Not signed in
        Auth-->>UI: show auth modal
        S->>FB: sign in (email or Google)
        FB-->>Auth: user session
    end
    S->>UI: Enter delivery details + coupon
    UI->>UI: apply STUDENT15 (−15%)
    S->>UI: Choose payment + place order
    UI->>Cart: clearCart()
    Cart->>LS: clear persisted cart
    UI-->>S: Order confirmation (24–48h delivery)
```

### Route map

| Route | Page | Purpose |
| --- | --- | --- |
| `/#/` | `Home` | Hero, categories, featured products, trust badges |
| `/#/products` | `Products` | Full catalogue with search, filters and sorting |
| `/#/product/:id` | `ProductDetail` | Product info, reviews, quantity, related items |
| `/#/cart` | `Cart` | Cart items, quantity controls, free-delivery progress |
| `/#/checkout` | `Checkout` | Delivery form, coupon, payment and confirmation |
| `/#/wishlist` | `Wishlist` | Saved products |

> Routing is hash-based (`useHashRoute`) so the app can be hosted on any static host without server rewrites.

---

## 🧰 Tech Stack

| Layer | Choice |
| --- | --- |
| UI | React 19 |
| Build tool | Vite 8 |
| Language | JavaScript (ES modules, JSX) |
| Auth | Firebase Authentication (`firebase/auth`) |
| State | React Context + `useReducer`/`useState` |
| Persistence | `localStorage` (per-user keys) |
| Styling | Hand-written CSS with design tokens (`App.css`, `index.css`) |
| Linting | ESLint 10 + React Hooks & Refresh plugins |
| Fonts | Inter + Sora (Google Fonts) |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js 18+** and npm
- A **Firebase project** with **Email/Password** and **Google** sign-in enabled

### 1. Clone and install

```bash
git clone https://github.com/shivamkumar0097/campus-store.git
cd campus-store
npm install
```

### 2. Configure Firebase

Create `.env.local` from the template:

```bash
cp .env.example .env.local
```

Fill in the values from **Firebase Console → Project settings → Your apps → Web app**:

```env
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
```

### 3. Run

```bash
npm run dev
```

Open the printed URL (usually `http://localhost:5173`).

> Without Firebase keys the storefront still renders, but authentication actions will show a setup hint. Add the keys and restart the dev server.

### Available scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite dev server with HMR |
| `npm run build` | Build a production bundle into `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint across the project |

---

## 📁 Project Structure

```text
campus-store/
├── docs/
│   └── screenshots/          # README screenshots
├── public/
│   ├── favicon.svg
│   └── products/             # Product imagery
├── src/
│   ├── components/           # Navbar, Footer, AuthModal, ProductCard, Icons
│   ├── context/              # Auth, Cart, Wishlist and Toast providers
│   ├── data/                 # Catalogue (products.js) and reviews
│   ├── hooks/                # useHashRoute
│   ├── lib/                  # Firebase initialization
│   ├── pages/                # Home, Products, ProductDetail, Cart, Checkout, Wishlist
│   ├── App.jsx               # Providers + route switch
│   ├── App.css               # Component & layout styles
│   ├── index.css             # Design tokens & base styles
│   └── main.jsx              # Entry point
├── .env.example
├── index.html
├── package.json
└── vite.config.js
```

---

## 🧠 Implementation Notes

- **Per-user persistence** — `CartProvider` and `WishlistProvider` are keyed by the Firebase `uid`, so switching accounts swaps the cart/wishlist instantly while guests keep an empty bag.
- **No backend required** — products and reviews are static modules; only auth touches the network. This keeps the demo fast and easy to host on GitHub Pages, Netlify or Vercel.
- **Design system** — spacing, radii, shadows and color tokens live in `index.css`; components compose them in `App.css` with dark-mode-first styling.
- **Error handling** — Firebase error codes are translated into human-readable messages (wrong password, weak password, blocked popup, unauthorized domain, etc.).

---

## 🗺️ Roadmap

- [ ] Persist orders and profile data to Firestore
- [ ] Product search with fuzzy matching and price-range filters
- [ ] Product image galleries and zoom
- [ ] Admin dashboard for catalogue management
- [ ] Deployed live demo link

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repo and create a branch: `git checkout -b feature/my-feature`
2. Make your changes and run `npm run lint`
3. Commit with a clear message and open a pull request

If you find a bug or have an idea, open an [issue](https://github.com/shivamkumar0097/campus-store/issues).

---

<div align="center">

Built for students who’d rather shop between lectures than trek across campus. 🎒

[⬆ Back to top](#-campus-store)

</div>
