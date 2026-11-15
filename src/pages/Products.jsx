import { useMemo, useState } from 'react'
import { categories, products } from '../data/products'
import ProductCard from '../components/ProductCard'
import { CloseIcon, SearchIcon, SparkIcon } from '../components/Icons'

const sortOptions = [
  { value: 'popular', label: 'Most popular' },
  { value: 'price-low', label: 'Price: low to high' },
  { value: 'price-high', label: 'Price: high to low' },
  { value: 'rating', label: 'Top rated' },
]

export default function Products({ params }) {
  const activeCategory = params.get('category') || 'All'
  const [query, setQuery] = useState('')
  const [sort, setSort] = useState('popular')

  const categoryNames = ['All', ...categories.map((category) => category.name)]

  const filtered = useMemo(() => {
    const search = query.trim().toLowerCase()
    let list = products.filter((product) => {
      const matchesCategory =
        activeCategory === 'All' || product.category === activeCategory
      const matchesSearch =
        !search ||
        product.name.toLowerCase().includes(search) ||
        product.category.toLowerCase().includes(search)
      return matchesCategory && matchesSearch
    })

    list = [...list]
    if (sort === 'price-low') list.sort((a, b) => a.price - b.price)
    if (sort === 'price-high') list.sort((a, b) => b.price - a.price)
    if (sort === 'rating') list.sort((a, b) => b.rating - a.rating)
    return list
  }, [activeCategory, query, sort])

  return (
    <div className="page">
      <div className="container">
        <header className="page-head">
          <div>
            <span className="section-eyebrow">
              <SparkIcon width="14" height="14" />
              Campus catalogue
            </span>
            <h1>Shop all essentials</h1>
            <p className="page-sub">
              {products.length} hand-picked products across four categories.
              Student-approved, budget-friendly.
            </p>
          </div>
          <div className="page-head-stat">
            <strong>{filtered.length}</strong>
            <span>products showing</span>
          </div>
        </header>

        <div className="shop-toolbar">
          <div className="search-field">
            <SearchIcon width="18" height="18" />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search notebooks, earbuds, books..."
              aria-label="Search products"
            />
            {query && (
              <button
                type="button"
                className="search-clear"
                onClick={() => setQuery('')}
                aria-label="Clear search"
              >
                <CloseIcon width="15" height="15" />
              </button>
            )}
          </div>

          <div className="sort-field">
            <label htmlFor="sort">Sort by</label>
            <select
              id="sort"
              value={sort}
              onChange={(event) => setSort(event.target.value)}
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="category-tabs" role="tablist" aria-label="Categories">
          {categoryNames.map((name) => {
            const isActive = activeCategory === name
            const href =
              name === 'All'
                ? '#/products'
                : `#/products?category=${encodeURIComponent(name)}`
            return (
              <a
                key={name}
                href={href}
                className={`category-tab ${isActive ? 'active' : ''}`}
                role="tab"
                aria-selected={isActive}
              >
                {name}
              </a>
            )
          })}
        </div>

        {filtered.length > 0 ? (
          <div className="product-grid product-grid-shop">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <span className="empty-emoji" aria-hidden="true">
              🔍
            </span>
            <h2>No products found</h2>
            <p>
              Nothing matched “{query}” in this category. Try a different search
              or browse all products.
            </p>
            <a className="btn btn-primary" href="#/products">
              Browse all products
            </a>
          </div>
        )}
      </div>
    </div>
  )
}
