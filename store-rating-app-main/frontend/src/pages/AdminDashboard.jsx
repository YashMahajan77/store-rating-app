import React from "react";
import {
  Users,
  Store,
  Star,
  UserPlus,
  PlusCircle,
  Search,
  ChevronDown,
  X,
  Mail,
  Lock,
  MapPin,
  Shield,
  Hash,
} from "lucide-react";

function AdminDashboard({
  user,
  dashboard,
  users,
  stores,
  userSearch,
  setUserSearch,
  userSort,
  setUserSort,
  storeSearch,
  setStoreSearch,
  storeSort,
  setStoreSort,
  showAddUser,
  setShowAddUser,
  newUser,
  setNewUser,
  addUser,
  showAddStore,
  setShowAddStore,
  newStore,
  setNewStore,
  addStore,
}) {
  const filteredUsers = (users || [])
    .filter((item) => {
      const search = (userSearch || "").toLowerCase();

      return (
        item.name.toLowerCase().includes(search) ||
        item.email.toLowerCase().includes(search) ||
        (item.address || "").toLowerCase().includes(search) ||
        item.role.toLowerCase().includes(search)
      );
    })
    .sort((a, b) => {
      const [field, direction] = userSort.split("-");

      return (
        String(a[field] || "").localeCompare(String(b[field] || "")) *
        (direction === "asc" ? 1 : -1)
      );
    });

  const filteredStores = (stores || [])
    .filter((store) => {
      const search = (storeSearch || "").toLowerCase();

      return (
        store.name.toLowerCase().includes(search) ||
        (store.email || "").toLowerCase().includes(search) ||
        (store.address || "").toLowerCase().includes(search)
      );
    })
    .sort((a, b) => {
      const direction = storeSort === "name-asc" ? 1 : -1;

      return a.name.localeCompare(b.name) * direction;
    });

  const getRoleClass = (role) => {
    switch (role) {
      case "ADMIN":
        return "role-admin";
      case "STORE_OWNER":
        return "role-store-owner";
      default:
        return "role-user";
    }
  };

  const getInitials = (name) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <div className="dashboard-page">
      <div className="page-header">
        <div>
          <h1>Admin Command Center</h1>
          <p>Welcome back, {user.name} • System Overview & Management</p>
        </div>
      </div>

      {/* KPI Overview Cards */}
      <section className="dashboard-section">
        <div className="section-header">
          <div>
            <h2>Platform Overview</h2>
            <p>Real-time ecosystem metrics</p>
          </div>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon-wrapper stat-icon-users">
              <Users size={26} />
            </div>
            <div className="stat-info">
              <span>Total Users</span>
              <strong>{dashboard?.totalUsers ?? users?.length ?? 0}</strong>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon-wrapper stat-icon-stores">
              <Store size={26} />
            </div>
            <div className="stat-info">
              <span>Total Stores</span>
              <strong>{dashboard?.totalStores ?? stores?.length ?? 0}</strong>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon-wrapper stat-icon-ratings">
              <Star size={26} />
            </div>
            <div className="stat-info">
              <span>Total Ratings</span>
              <strong>{dashboard?.totalRatings ?? 0}</strong>
            </div>
          </div>
        </div>
      </section>

      {/* Users Management */}
      <section className="dashboard-section">
        <div className="section-header">
          <div>
            <h2>Users Management</h2>
            <p>Registered users, administrators, and store owners</p>
          </div>

          <button
            className="primary-button"
            onClick={() => {
              setShowAddUser(!showAddUser);
              setShowAddStore(false);
            }}
          >
            {showAddUser ? (
              <>
                <X size={16} />
                <span>Close Form</span>
              </>
            ) : (
              <>
                <UserPlus size={16} />
                <span>+ Add User</span>
              </>
            )}
          </button>
        </div>

        {showAddUser && (
          <div className="form-card">
            <h3>
              <UserPlus size={20} color="#4f46e5" />
              <span>Create New User</span>
            </h3>

            <form onSubmit={addUser}>
              <div className="form-grid">
                <div>
                  <label>Full Name</label>
                  <input
                    type="text"
                    className="input-no-icon"
                    value={newUser.name}
                    onChange={(e) =>
                      setNewUser({
                        ...newUser,
                        name: e.target.value,
                      })
                    }
                    placeholder="e.g. John Doe"
                    required
                  />
                </div>

                <div>
                  <label>Email Address</label>
                  <input
                    type="email"
                    className="input-no-icon"
                    value={newUser.email}
                    onChange={(e) =>
                      setNewUser({
                        ...newUser,
                        email: e.target.value,
                      })
                    }
                    placeholder="e.g. john@example.com"
                    required
                  />
                </div>

                <div>
                  <label>Password</label>
                  <input
                    type="password"
                    className="input-no-icon"
                    value={newUser.password}
                    onChange={(e) =>
                      setNewUser({
                        ...newUser,
                        password: e.target.value,
                      })
                    }
                    placeholder="Set temporary password"
                    required
                  />
                </div>

                <div>
                  <label>Account Role</label>
                  <select
                    className="input-no-icon"
                    value={newUser.role}
                    onChange={(e) =>
                      setNewUser({
                        ...newUser,
                        role: e.target.value,
                      })
                    }
                  >
                    <option value="USER">USER (Regular Shopper)</option>
                    <option value="STORE_OWNER">STORE_OWNER (Store Manager)</option>
                    <option value="ADMIN">ADMIN (System Administrator)</option>
                  </select>
                </div>

                <div className="full-width">
                  <label>Address</label>
                  <textarea
                    className="input-no-icon"
                    value={newUser.address}
                    onChange={(e) =>
                      setNewUser({
                        ...newUser,
                        address: e.target.value,
                      })
                    }
                    placeholder="Street, City, State, ZIP"
                    rows="3"
                    required
                  />
                </div>
              </div>

              <div className="form-buttons">
                <button
                  type="button"
                  className="secondary-button"
                  onClick={() => setShowAddUser(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="primary-button">
                  <UserPlus size={16} />
                  <span>Create User Account</span>
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="table-controls">
          <div className="search-input-wrapper">
            <Search size={18} className="input-icon" />
            <input
              type="text"
              placeholder="Search users by name, email, or address..."
              value={userSearch}
              onChange={(e) => setUserSearch(e.target.value)}
            />
          </div>

          <div className="sort-select-wrapper">
            <select
              value={userSort}
              onChange={(e) => setUserSort(e.target.value)}
            >
              <option value="name-asc">Sort: Name (A-Z)</option>
              <option value="name-desc">Sort: Name (Z-A)</option>
              <option value="email-asc">Sort: Email (A-Z)</option>
              <option value="email-desc">Sort: Email (Z-A)</option>
              <option value="role-asc">Sort: Role (A-Z)</option>
              <option value="role-desc">Sort: Role (Z-A)</option>
            </select>
            <ChevronDown size={16} className="select-arrow" />
          </div>
        </div>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>User</th>
                <th>Email</th>
                <th>Address</th>
                <th>Role</th>
              </tr>
            </thead>

            <tbody>
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan="4" style={{ textAlign: "center", padding: "36px" }}>
                    <div className="empty-state" style={{ border: "none", padding: 0 }}>
                      <p>No users matching criteria</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredUsers.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <div className="table-user-cell">
                        <div className="table-avatar">
                          {getInitials(item.name)}
                        </div>
                        <span className="table-user-name">{item.name}</span>
                      </div>
                    </td>
                    <td>{item.email}</td>
                    <td>{item.address || "—"}</td>
                    <td>
                      <span className={`role-badge ${getRoleClass(item.role)}`}>
                        {item.role}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* Stores Management */}
      <section className="dashboard-section">
        <div className="section-header">
          <div>
            <h2>Stores Directory</h2>
            <p>Manage store registries and owner allocations</p>
          </div>

          <button
            className="primary-button"
            onClick={() => {
              setShowAddStore(!showAddStore);
              setShowAddUser(false);
            }}
          >
            {showAddStore ? (
              <>
                <X size={16} />
                <span>Close Form</span>
              </>
            ) : (
              <>
                <PlusCircle size={16} />
                <span>+ Add Store</span>
              </>
            )}
          </button>
        </div>

        {showAddStore && (
          <div className="form-card">
            <h3>
              <Store size={20} color="#4f46e5" />
              <span>Register New Store</span>
            </h3>

            <form onSubmit={addStore}>
              <div className="form-grid">
                <div>
                  <label>Store Name</label>
                  <input
                    type="text"
                    className="input-no-icon"
                    value={newStore.name}
                    onChange={(e) =>
                      setNewStore({
                        ...newStore,
                        name: e.target.value,
                      })
                    }
                    placeholder="e.g. Apex Supermarket"
                    required
                  />
                </div>

                <div>
                  <label>Contact Email</label>
                  <input
                    type="email"
                    className="input-no-icon"
                    value={newStore.email}
                    onChange={(e) =>
                      setNewStore({
                        ...newStore,
                        email: e.target.value,
                      })
                    }
                    placeholder="contact@store.com"
                    required
                  />
                </div>

                <div>
                  <label>Store Owner User ID</label>
                  <input
                    type="number"
                    className="input-no-icon"
                    value={newStore.owner_id}
                    onChange={(e) =>
                      setNewStore({
                        ...newStore,
                        owner_id: e.target.value,
                      })
                    }
                    placeholder="e.g. 2"
                    required
                  />
                </div>

                <div className="full-width">
                  <label>Store Location Address</label>
                  <textarea
                    className="input-no-icon"
                    value={newStore.address}
                    onChange={(e) =>
                      setNewStore({
                        ...newStore,
                        address: e.target.value,
                      })
                    }
                    placeholder="Enter store physical address"
                    rows="3"
                    required
                  />
                </div>
              </div>

              <div className="form-buttons">
                <button
                  type="button"
                  className="secondary-button"
                  onClick={() => setShowAddStore(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="primary-button">
                  <Store size={16} />
                  <span>Register Store</span>
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="table-controls">
          <div className="search-input-wrapper">
            <Search size={18} className="input-icon" />
            <input
              type="text"
              placeholder="Search stores by name, email, or address..."
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

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Store</th>
                <th>Email</th>
                <th>Address</th>
                <th>Rating</th>
              </tr>
            </thead>

            <tbody>
              {filteredStores.length === 0 ? (
                <tr>
                  <td colSpan="4" style={{ textAlign: "center", padding: "36px" }}>
                    <div className="empty-state" style={{ border: "none", padding: 0 }}>
                      <p>No stores found</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredStores.map((store) => (
                  <tr key={store.id}>
                    <td>
                      <div className="table-user-cell">
                        <div className="table-avatar" style={{ background: "linear-gradient(135deg, #e0e7ff 0%, #ede9fe 100%)", color: "#4338ca" }}>
                          <Store size={18} />
                        </div>
                        <span className="table-user-name">{store.name}</span>
                      </div>
                    </td>
                    <td>{store.email}</td>
                    <td>{store.address || "—"}</td>
                    <td>
                      <span className="table-rating-pill">
                        <Star size={14} fill="#f59e0b" stroke="#f59e0b" />
                        <span>{Number(store.average_rating || 0).toFixed(1)}</span>
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

export default AdminDashboard;