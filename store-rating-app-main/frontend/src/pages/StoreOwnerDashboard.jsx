import React from "react";
import { Store, Star, Users, MessageSquare, Info } from "lucide-react";

function StoreOwnerDashboard({ user, ownerDashboard }) {
  const getInitials = (name) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  const avgRating = Number(ownerDashboard?.average_rating || 0).toFixed(1);
  const totalReviews = ownerDashboard?.ratings?.length || 0;

  return (
    <div className="dashboard-page">
      <div className="page-header">
        <div>
          <h1>Store Owner Dashboard</h1>
          <p>Welcome back, {user?.name} • Monitor customer ratings and performance</p>
        </div>
      </div>

      {!ownerDashboard ? (
        <div className="empty-state">
          <div className="empty-state-icon">
            <Info size={24} />
          </div>
          <p>Store information is currently not available.</p>
        </div>
      ) : (
        <>
          {/* Store Overview Hero Banner */}
          <section className="dashboard-section">
            <div className="section-header">
              <div>
                <h2>Your Store Overview</h2>
                <p>Performance summary and overall customer satisfaction</p>
              </div>
            </div>

            <div className="owner-hero-card">
              <div className="owner-hero-info">
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                  <Store size={26} color="#4f46e5" />
                  <h3>{ownerDashboard.store?.name}</h3>
                </div>
                <p>{ownerDashboard.store?.address || "Address registered"}</p>
                <p style={{ marginTop: 4, color: "#64748b" }}>
                  Contact: {ownerDashboard.store?.email}
                </p>
              </div>

              <div className="owner-rating-showcase">
                <span>Overall Rating</span>
                <div className="owner-rating-score">
                  <Star size={34} fill="#f59e0b" stroke="#f59e0b" />
                  <span>{avgRating}</span>
                </div>
                <p style={{ fontSize: 13, color: "#64748b", marginTop: 4 }}>
                  Based on {totalReviews} customer {totalReviews === 1 ? "review" : "reviews"}
                </p>
              </div>
            </div>
          </section>

          {/* Customer Reviews Table */}
          <section className="dashboard-section">
            <div className="section-header">
              <div>
                <h2>Customer Ratings & Feedback</h2>
                <p>List of all users who submitted ratings for your store</p>
              </div>
            </div>

            {(!ownerDashboard.ratings || ownerDashboard.ratings.length === 0) ? (
              <div className="empty-state">
                <div className="empty-state-icon">
                  <MessageSquare size={24} />
                </div>
                <p>No ratings submitted for your store yet.</p>
              </div>
            ) : (
              <div className="table-container">
                <table>
                  <thead>
                    <tr>
                      <th>Customer</th>
                      <th>Email</th>
                      <th>Submitted Rating</th>
                    </tr>
                  </thead>

                  <tbody>
                    {ownerDashboard.ratings.map((item, idx) => (
                      <tr key={item.email || idx}>
                        <td>
                          <div className="table-user-cell">
                            <div className="table-avatar">
                              {getInitials(item.name)}
                            </div>
                            <span className="table-user-name">{item.name}</span>
                          </div>
                        </td>

                        <td>{item.email}</td>

                        <td>
                          <span className="table-rating-pill">
                            <Star size={14} fill="#f59e0b" stroke="#f59e0b" />
                            <span>{item.rating} Stars</span>
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        </>
      )}
    </div>
  );
}

export default StoreOwnerDashboard;