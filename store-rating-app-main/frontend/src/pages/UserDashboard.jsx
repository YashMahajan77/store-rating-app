import React from "react";
import { Search, ChevronDown, Store as StoreIcon, Frown } from "lucide-react";
import StoreCard from "../components/StoreCard";

function UserDashboard({
  user,
  stores,
  storeSearch,
  setStoreSearch,
  storeSort,
  setStoreSort,
  ratings,
  onRatingChange,
  onSubmitRating,
}) {
  const filteredStores = (stores || [])
    .filter((store) => {
      const search = (storeSearch || "").toLowerCase();

      return (
        store.name.toLowerCase().includes(search) ||
        (store.address || "").toLowerCase().includes(search) ||
        (store.email || "").toLowerCase().includes(search)
      );
    })
    .sort((a, b) => {
      const direction = storeSort === "name-asc" ? 1 : -1;
      return a.name.localeCompare(b.name) * direction;
    });

  return (
    <div className="dashboard-page">
      <div className="page-header">
        <div>
          <h1>Explore & Rate Stores</h1>
          <p>
            Welcome back, {user?.name} • Share your authentic shopping feedback
          </p>
        </div>
      </div>

      <section className="dashboard-section">
        <div className="section-header">
          <div>
            <h2>Registered Stores</h2>
            <p>Select stars to rate or update your rating for any store</p>
          </div>
        </div>

        <div className="table-controls">
          <div className="search-input-wrapper">
            <Search size={18} className="input-icon" />
            <input
              type="text"
              placeholder="Search by store name, address, or email..."
              value={storeSearch}
              onChange={(e) => setStoreSearch(e.target.value)}
            />
          </div>

          <div className="sort-select-wrapper">
            <select
              value={storeSort}
              onChange={(e) => setStoreSort(e.target.value)}
            >
              <option value="name-asc">Sort: Name (A-Z)</option>
              <option value="name-desc">Sort: Name (Z-A)</option>
            </select>
            <ChevronDown size={16} className="select-arrow" />
          </div>
        </div>

        {filteredStores.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">
              <Frown size={24} />
            </div>
            <p>No stores found matching your search.</p>
          </div>
        ) : (
          <div className="store-grid">
            {filteredStores.map((store) => (
              <StoreCard
                key={store.id}
                store={store}
                rating={ratings[store.id]}
                onRatingChange={onRatingChange}
                onSubmitRating={onSubmitRating}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default UserDashboard;