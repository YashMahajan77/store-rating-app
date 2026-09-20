import React, { useState } from "react";
import { Star, MapPin, Mail, Sparkles } from "lucide-react";

function StoreCard({
  store,
  rating,
  onRatingChange,
  onSubmitRating,
}) {
  const [hoverRating, setHoverRating] = useState(0);

  const currentSelected = Number(rating) || 0;

  const handleStarClick = (starValue) => {
    onRatingChange(store.id, String(starValue));
  };

  const getStoreInitial = (name) => {
    if (!name) return "S";
    return name.charAt(0).toUpperCase();
  };

  const avgRatingFormatted = Number(store.average_rating || 0).toFixed(1);

  return (
    <div className="store-card">
      <div>
        <div className="store-card-header">
          <div className="store-card-title-group">
            <div className="store-icon-avatar">
              {getStoreInitial(store.name)}
            </div>
            <div>
              <h3>{store.name}</h3>
            </div>
          </div>

          <div className="rating-badge">
            <Star size={15} fill="#f59e0b" stroke="#f59e0b" />
            <span>{avgRatingFormatted}</span>
          </div>
        </div>

        <div className="store-details">
          <div className="store-detail-row">
            <MapPin size={16} className="store-detail-icon" />
            <span>{store.address || "Address not provided"}</span>
          </div>

          <div className="store-detail-row">
            <Mail size={16} className="store-detail-icon" />
            <span>{store.email}</span>
          </div>
        </div>
      </div>

      <div className="rating-section">
        <div className="rating-section-header">
          <label>Your Rating</label>
          {store.user_rating && (
            <span className="user-current-badge">
              Rated: {store.user_rating} ⭐
            </span>
          )}
        </div>

        {/* Interactive Star Picker */}
        <div className="interactive-stars">
          {[1, 2, 3, 4, 5].map((star) => {
            const isFilled =
              (hoverRating || currentSelected) >= star;

            return (
              <button
                key={star}
                type="button"
                className={`star-btn ${isFilled ? "active" : ""}`}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                onClick={() => handleStarClick(star)}
                title={`Rate ${star} star${star > 1 ? "s" : ""}`}
              >
                <Star
                  size={24}
                  fill={isFilled ? "#f59e0b" : "transparent"}
                  stroke={isFilled ? "#f59e0b" : "#cbd5e1"}
                />
              </button>
            );
          })}
        </div>

        <div className="rating-controls">
          <button
            type="button"
            className="primary-button"
            onClick={() => onSubmitRating(store.id)}
          >
            <Sparkles size={16} />
            <span>
              {store.user_rating ? "Update Rating" : "Submit Rating"}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default StoreCard;