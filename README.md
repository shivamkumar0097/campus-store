<div align="center">

# ⚡ Campus Store

**Everything campus. One shop.**

[![Live Site](https://img.shields.io/badge/Live%20Site-campus--storee.netlify.app-00c7b8?style=flat-square&logo=netlify&logoColor=white)](https://campus-storee.netlify.app)
[![Netlify Status](https://img.shields.io/badge/Netlify-Deploy%20%23prod-00c7b8?style=flat-square&logo=netlify&logoColor=white)](https://app.netlify.com/projects/campus-storee)
[![React](https://img.shields.io/badge/React-19-61dafb?style=flat-square&logo=react&logoColor=black)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-8-646cff?style=flat-square&logo=vite&logoColor=white)](https://vite.dev)
[![Firebase](https://img.shields.io/badge/Firebase-Auth-ffca28?style=flat-square&logo=firebase&logoColor=black)](https://firebase.google.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-c8f75c?style=flat-square)](LICENSE)

A student-first e-commerce storefront — stationery, tech, textbooks and college merch,
curated for campus life.

[🚀 Live Demo](https://campus-storee.netlify.app) · [🐛 Report Issue](https://github.com/shivamkumar0097/campus-store/issues) · [💬 Discussions](https://github.com/shivamkumar0097/campus-store/discussions)

</div>

---

## 📸 Screenshots

### Landing page

![Home page](docs/screenshots/01-home-hero.png)

### Product catalogue — search, filter & sort

![Catalogue](docs/screenshots/03-catalogue.png)

### Product detail with reviews

![Product detail](docs/screenshots/06-product-detail.png)

### Cart & checkout

| Cart | Checkout |
|:--:|:--:|
| ![Cart](docs/screenshots/10-cart.png) | ![Checkout](docs/screenshots/13-checkout-filled.png) |

### Authentication & wishlist

| Sign in | Wishlist |
|:--:|:--:|
| ![Auth modal](docs/screenshots/07-auth-modal.png) | ![Wishlist](docs/screenshots/14-wishlist.png) |

### Mobile

| Home | Catalogue |
|:--:|:--:|
| ![Mobile home](docs/screenshots/15-mobile-home.png) | ![Mobile catalogue](docs/screenshots/16-mobile-catalogue.png) |

---

## ✨ Features

| | Feature | Details |
|---|---|---|
| 🛍️ | **Catalogue** | 20 products across 4 categories — Stationery, Tech Accessories, Books, College Merch |
| 🔍 | **Live search** | Instant filter on product or category, with clear button |
| ↕️ | **Sorting** | Most popular · Price low→high · Price high→low · Top rated |
| 🗂️ | **Category tabs** | Deep-linkable via `?category=`, shareable URLs |
| 🛒 | **Cart** | Quantity stepper, remove, live subtotal + shipping logic |
| 🎁 | **Free delivery meter** | Progress bar nudging "add ₹X more for free campus delivery" (₹499+) |
| 💖 | **Wishlist** | Save any product in one tap, persisted per account |
| 🔐 | **Auth** | Email/password + Google login (Firebase Auth) |
| 🧾 | **Checkout** | Shipping details, UPI/Card/COD, coupon `STUDENT15` (15% off), order confirmation |
| 🔔 | **Toasts** | Custom toast system, `aria-live="polite"", auto-dismiss 2.6s |
| 📱 | **Responsive** | Mobile drawer nav, fluid grids, 16px fields (no iOS zoom) |
| ♿ | **Accessible** | Focus outlines, `prefers-reduced-motion`, ARIA roles on tabs/dialogs/toggles |
| 🌗 | **Dark theme** | Lime `#c8f75c` on `#08080c`, violet secondary, per-category accent tints |
| 🧭 | **Hash routing** | Zero-config static deploy — no server rewrite rules needed |

---

## 🛠️ Tech Stack

```
Frontend   React 19.3 · React DOM 19.3
Build      Vite 8.3 · @vitejs/plugin-react 6.1
Auth       Firebase 13.3 (Authentication only)
Routing    Custom hash router (no react-router)
State      React Context + useReducer-style providers
Styling    Hand-written CSS (custom properties, no framework)
Linting    ESLint 10 (flat config) + react-hooks + react-refresh
```

**Deliberately zero:** no UI library, no CSS framework, no state library, no router library,
no backend of its own. Everything is hand-rolled to keep the bundle at **~118 kB gzipped**.

---

## 🏗️ Architecture

```mermaid
graph TD
    subgraph Browser["Browser"]
        subgraph Entry["Entry"]
            MAIN["main.jsx<br/>StrictMode · pinch-zoom guard"]
            APP["App.jsx<br/>hash router · page switch"]
        end

        subgraph Providers["Context Providers"]
            TOAST["ToastProvider<br/>toast queue · 2600ms"]
            AUTH["AuthProvider<br/>firebase auth · user state"]
            SHOP["ShopProviders<br/>key = account uid"]
            CART["CartProvider<br/>items · subtotal · shipping"]
            WISH["WishlistProvider<br/>saved ids"]
        end

        subgraph Views["Views"]
            NAV["Navbar<br/>nav · search · cart · user menu"]
            HOME["Home"]
            PROD["Products<br/>search · sort · tabs"]
            DETAIL["ProductDetail<br/>qty · reviews · related"]
            CARTP["Cart"]
            CHECK["Checkout<br/>details · payment · coupon"]
            WISHP["Wishlist"]
            FOOT["Footer"]
            MODAL["AuthModal<br/>google + email"]
        end

        subgraph Data["Data & Services"]
            ROUTE["hooks/useHashRoute"]
            FB["lib/firebase<br/>initializeApp · getAuth"]
            PRODS["data/products<br/>20 items"]
            REVS["data/reviews"]
            LS[("localStorage<br/>campus-store-cart:uid<br/>campus-store-wishlist:uid")]
        end
    end

    MAIN --> APP
    APP --> TOAST --> AUTH --> SHOP
    SHOP --> CART --> WISH
    APP --> NAV & HOME & PROD & DETAIL & CARTP & CHECK & WISHP & FOOT
    APP --> MODAL
    APP --> ROUTE
    AUTH --> FB
    HOME & PROD & DETAIL & CARTP --> PRODS
    DETAIL --> REVS
    CART & WISH --> LS
    NAV -.->|requires auth| MODAL
```

### Account-scoped providers

The cart and wishlist providers are mounted with a **React `key` derived from the signed-in
UID**. Changing accounts remounts both providers, so state re-hydrates from the new
user's storage bucket — carts never leak between accounts.

```mermaid
sequenceDiagram
    participant U as Student
    participant N as Navbar / ProductCard
    participant A as AuthContext
    participant C as CartContext
    participant L as localStorage

    U->>N: Click "Add to cart"
    N->>A: requireAuth()
    alt Not signed in
        A-->>N: throw → open AuthModal
        U->>A: Sign in (email / Google)
        A-->>N: user { uid }
    end
    N->>C: addItem(product)
    C->>C: setItems(items + qty)
    C->>L: write campus-store-cart:uid
    C-->>N: count, subtotal, shipping
```

### Shopping flow

```mermaid
flowchart LR
    HOME["#/<br/>Landing"] --> SHOP["#/products<br/>Browse · search · sort"]
    SHOP --> DETAIL["#/product/:id<br/>Details · reviews"]
    DETAIL --> CART["#/cart<br/>Qty · totals"]
    DETAIL --> WISH["#/wishlist<br/>Save for later"]
    SHOP --> WISH
    CART --> CHECKOUT["#/checkout<br/>Details · payment · coupon"]
    CHECKOUT -->|Place order| DONE["Confirmation<br/>CS-XXXXXX · 24-48h"]
    CHECKOUT -->|Back| CART
    DONE --> HOME
    WISH --> DETAIL

    GUARD{"Signed in?"}
    CART -.-> GUARD
    CHECKOUT -.-> GUARD
    GUARD -->|No| MODAL["AuthModal"]
    MODAL -->|Success| GUARD
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js **18+**
- A free [Firebase](https://console.firebase.google.com) project (only for sign-in)

### 1. Clone & install

```bash
git clone https://github.com/shivamkumar0097/campus-store.git
cd campus-store
npm install
```

### 2. Configure Firebase

```bash
cp .env.example .env.local
```

Firebase Console → **Project settings** → **Your apps** → **Web app** → *SDK setup and
configuration* → paste the values into `.env.local`:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

> **Tip:** the app works **without** Firebase — the catalogue, search, filters and product
> pages all function. Only sign-in, cart, wishlist and checkout are gated. The auth modal
> shows a *"Firebase setup needed"* banner when keys are missing.

### 3. Enable sign-in providers

In Firebase Console → **Authentication** → **Sign-in method**:

- ✅ **Email/Password**
- ✅ **Google** (add your deployment domain to *Authorized domains*)

### 4. Run it

```bash
npm run dev      # http://localhost:5173
npm run build    # production build → dist/
npm run preview  # preview the production build
npm run lint     # eslint
```

---

## 📁 Project Structure

```
campus-store/
├── public/
│   ├── favicon.svg
│   └── products/              # 20 product photos
├── src/
│   ├── components/
│   │   ├── AuthModal.jsx      # Split-panel sign in / sign up
│   │   ├── Footer.jsx
│   │   ├── Icons.jsx          # Inline SVG icon set
│   │   ├── Navbar.jsx
│   │   └── ProductCard.jsx
│   ├── context/
│   │   ├── AuthContext.jsx    # Firebase auth + friendly errors
│   │   ├── CartContext.jsx    # Items, totals, localStorage
│   │   ├── ToastContext.jsx   # Toast queue
│   │   └── WishlistContext.jsx
│   ├── data/
│   │   ├── products.js        # Catalogue seed
│   │   └── reviews.js         # Reviews per category
│   ├── hooks/
│   │   └── useHashRoute.js    # ~20-line hash router
│   ├── lib/
│   │   └── firebase.js        # init + graceful fallback
│   ├── pages/
│   │   ├── Cart.jsx
│   │   ├── Checkout.jsx
│   │   ├── Home.jsx
│   │   ├── ProductDetail.jsx
│   │   ├── Products.jsx
│   │   └── Wishlist.jsx
│   ├── App.css
│   ├── App.jsx
│   ├── index.css              # Design tokens
│   └── main.jsx
├── docs/screenshots/          # README assets
├── .env.example
└── vite.config.js
```

---

## 💡 Implementation Notes

**Persistence** — Cart and wishlist live in `localStorage`, keyed by the Firebase UID
(`campus-store-cart:<uid>`). Reads are `try/catch`-guarded and fall back to `[]` on
corrupt data. Nothing is written for signed-out users.

**Shipping rules** — flat ₹49, free when the cart is empty or subtotal ≥ ₹499.
`STUDENT15` applies a 15% discount to the subtotal, before shipping.

**Checkout** — a client-side simulation. No payment gateway is integrated; placing an
order generates a `CS-XXXXXX` reference, clears the cart and shows a confirmation screen.

**Hash routing** — all routes are `#/…`, so the built `dist/` folder can be dropped onto
GitHub Pages, Netlify or S3 with **no** SPA rewrite rule.

**Accessibility** — `role="tablist"` category tabs, `aria-pressed` toggles, `aria-modal`
auth dialog with Escape-to-close, `aria-live="polite"` toasts, visible focus rings, and a
global `prefers-reduced-motion` override.

**Responsive** — breakpoints at 1080px (grid columns), 900px (stacked layouts), 780px
(single-column auth modal), 680px and 420px (tightened spacing).

---

## 🚢 Deployment

### Netlify (live)

The site is deployed at **[campus-storee.netlify.app](https://campus-storee.netlify.app)**.

```bash
npm run build
netlify deploy --dir=dist --prod
```

### GitHub Pages

```bash
npm run build
# push dist/ to the gh-pages branch
```

### Environment variables

Set the six `VITE_FIREBASE_*` variables in your host's dashboard — the build inlines
them into the bundle.

---

## 📄 License

Released under the [MIT License](LICENSE).

<div align="center">
  <sub>Built with ⚡ by <a href="https://github.com/shivamkumar0097">Shivam Kumar</a> for students.</sub>
</div>
