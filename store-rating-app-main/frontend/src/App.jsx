import { useEffect, useState } from "react";

import Navbar from "./components/Navbar";
import Message from "./components/Message";
import ChangePassword from "./components/ChangePassword";

import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminDashboard from "./pages/AdminDashboard";
import UserDashboard from "./pages/UserDashboard";
import StoreOwnerDashboard from "./pages/StoreOwnerDashboard";

function App() {
  // ==================================================
  // AUTH
  // ==================================================

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const [showRegister, setShowRegister] =
    useState(false);

  const [registerData, setRegisterData] =
    useState({
      name: "",
      email: "",
      password: "",
      address: "",
    });

  const [message, setMessage] = useState("");

  // Auto-dismiss message after 4 seconds
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => {
      setMessage("");
    }, 4000);
    return () => clearTimeout(timer);
  }, [message]);

  // ==================================================
  // DATA
  // ==================================================

  const [dashboard, setDashboard] = useState(null);
  const [users, setUsers] = useState([]);
  const [stores, setStores] = useState([]);

  const [ownerDashboard, setOwnerDashboard] =
    useState(null);

  // ==================================================
  // ADMIN - ADD USER
  // ==================================================

  const [showAddUser, setShowAddUser] =
    useState(false);

  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    role: "USER",
  });

  // ==================================================
  // ADMIN - ADD STORE
  // ==================================================

  const [showAddStore, setShowAddStore] =
    useState(false);

  const [newStore, setNewStore] = useState({
    name: "",
    email: "",
    address: "",
    owner_id: "",
  });

  // ==================================================
  // SEARCH / SORT
  // ==================================================

  const [userSearch, setUserSearch] =
    useState("");

  const [storeSearch, setStoreSearch] =
    useState("");

  const [userSort, setUserSort] =
    useState("name-asc");

  const [storeSort, setStoreSort] =
    useState("name-asc");

  // ==================================================
  // USER RATINGS
  // ==================================================

  const [ratings, setRatings] = useState({});

  // ==================================================
  // CHANGE PASSWORD
  // ==================================================

  const [showChangePassword, setShowChangePassword] =
    useState(false);

  const [passwordData, setPasswordData] =
    useState({
      currentPassword: "",
      newPassword: "",
    });

  // ==================================================
  // LOGIN
  // ==================================================

  const login = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setMessage(
          data.message || "Login failed"
        );
        return;
      }

      localStorage.setItem(
        "token",
        data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );

      setUser(data.user);

      setEmail("");
      setPassword("");
      setMessage("");
      setShowRegister(false);
    } catch (error) {
      console.error(error);

      setMessage(
        "Unable to connect to server"
      );
    }
  };

  // ==================================================
  // LOGOUT
  // ==================================================

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setUser(null);

    setDashboard(null);
    setUsers([]);
    setStores([]);
    setOwnerDashboard(null);

    setMessage("");
  };

  // ==================================================
  // LOAD DATA
  // ==================================================

  useEffect(() => {
    if (!user) {
      return;
    }

    const token =
      localStorage.getItem("token");

    const loadData = async () => {
      try {
        // ----------------------------------------------
        // ADMIN
        // ----------------------------------------------

        if (user.role === "ADMIN") {
          const dashboardResponse =
            await fetch(
              "http://localhost:5000/api/users/dashboard",
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );

          const dashboardData =
            await dashboardResponse.json();

          if (dashboardResponse.ok) {
            setDashboard(dashboardData);
          }

          const usersResponse =
            await fetch(
              "http://localhost:5000/api/users",
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );

          const usersData =
            await usersResponse.json();

          if (usersResponse.ok) {
            setUsers(
              usersData.users || []
            );
          }
        }

        // ----------------------------------------------
        // STORE OWNER
        // ----------------------------------------------

        if (user.role === "STORE_OWNER") {
          const ownerResponse =
            await fetch(
              "http://localhost:5000/api/store-owner/dashboard",
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );

          const ownerData =
            await ownerResponse.json();

          if (ownerResponse.ok) {
            setOwnerDashboard(
              ownerData
            );
          } else {
            setMessage(
              ownerData.message ||
                "Unable to load dashboard"
            );
          }
        }

        // ----------------------------------------------
        // STORES
        // ----------------------------------------------

        const storesResponse =
          await fetch(
            "http://localhost:5000/api/stores"
          );

        const storesData =
          await storesResponse.json();

        if (storesResponse.ok) {
          setStores(
            storesData.stores || []
          );
        }
      } catch (error) {
        console.error(error);

        setMessage(
          "Unable to load data"
        );
      }
    };

    loadData();
  }, [user]);

  // ==================================================
  // REGISTER
  // ==================================================

  const register = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: registerData.name,
            email: registerData.email,
            password: registerData.password,
            address: registerData.address,
          }),
        }
      );

      const data =
        await response.json();

      if (!response.ok) {
        setMessage(
          data.message ||
            "Registration failed"
        );
        return;
      }

      setMessage(
        "Registration successful. Please login."
      );

      setRegisterData({
        name: "",
        email: "",
        password: "",
        address: "",
      });

      setShowRegister(false);
    } catch (error) {
      console.error(error);

      setMessage(
        "Unable to register"
      );
    }
  };

  // ==================================================
  // ADD USER
  // ==================================================

  const addUser = async (e) => {
    e.preventDefault();

    try {
      const token =
        localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:5000/api/users",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(newUser),
        }
      );

      const data =
        await response.json();

      if (!response.ok) {
        setMessage(
          data.message ||
            "Unable to create user"
        );
        return;
      }

      setMessage(
        "User created successfully"
      );

      setShowAddUser(false);

      setNewUser({
        name: "",
        email: "",
        password: "",
        address: "",
        role: "USER",
      });

      // Refresh users
      const usersResponse =
        await fetch(
          "http://localhost:5000/api/users",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

      const usersData =
        await usersResponse.json();

      if (usersResponse.ok) {
        setUsers(
          usersData.users || []
        );
      }

      // Refresh dashboard
      const dashboardResponse =
        await fetch(
          "http://localhost:5000/api/users/dashboard",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

      const dashboardData =
        await dashboardResponse.json();

      if (dashboardResponse.ok) {
        setDashboard(
          dashboardData
        );
      }
    } catch (error) {
      console.error(error);

      setMessage(
        "Unable to create user"
      );
    }
  };

  // ==================================================
  // ADD STORE
  // ==================================================

  const addStore = async (e) => {
    e.preventDefault();

    try {
      const token =
        localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:5000/api/stores",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            ...newStore,
            owner_id: Number(
              newStore.owner_id
            ),
          }),
        }
      );

      const data =
        await response.json();

      if (!response.ok) {
        setMessage(
          data.message ||
            "Unable to create store"
        );
        return;
      }

      setMessage(
        "Store created successfully"
      );

      setShowAddStore(false);

      setNewStore({
        name: "",
        email: "",
        address: "",
        owner_id: "",
      });

      // Refresh stores
      const storesResponse =
        await fetch(
          "http://localhost:5000/api/stores"
        );

      const storesData =
        await storesResponse.json();

      if (storesResponse.ok) {
        setStores(
          storesData.stores || []
        );
      }

      // Refresh dashboard
      const dashboardResponse =
        await fetch(
          "http://localhost:5000/api/users/dashboard",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

      const dashboardData =
        await dashboardResponse.json();

      if (dashboardResponse.ok) {
        setDashboard(
          dashboardData
        );
      }
    } catch (error) {
      console.error(error);

      setMessage(
        "Unable to create store"
      );
    }
  };

  // ==================================================
  // CHANGE PASSWORD
  // ==================================================

  const changePassword = async (e) => {
    e.preventDefault();

    try {
      const token =
        localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:5000/api/auth/change-password",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(
            passwordData
          ),
        }
      );

      const data =
        await response.json();

      if (!response.ok) {
        setMessage(
          data.message ||
            "Unable to change password"
        );
        return;
      }

      setMessage(
        "Password changed successfully"
      );

      setPasswordData({
        currentPassword: "",
        newPassword: "",
      });

      setShowChangePassword(false);
    } catch (error) {
      console.error(error);

      setMessage(
        "Unable to change password"
      );
    }
  };

  // ==================================================
  // RATING
  // ==================================================

  const submitRating = async (storeId) => {
    const rating =
      ratings[storeId];

    if (!rating) {
      setMessage(
        "Please select a rating"
      );
      return;
    }

    try {
      const token =
        localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:5000/api/ratings",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            store_id: storeId,
            rating: Number(rating),
          }),
        }
      );

      const data =
        await response.json();

      if (!response.ok) {
        setMessage(
          data.message ||
            "Unable to submit rating"
        );
        return;
      }

      setMessage(
        data.message ||
          "Rating submitted successfully"
      );

      // Refresh store ratings
      const storesResponse =
        await fetch(
          "http://localhost:5000/api/stores"
        );

      const storesData =
        await storesResponse.json();

      if (storesResponse.ok) {
        setStores(
          storesData.stores || []
        );
      }
    } catch (error) {
      console.error(error);

      setMessage(
        "Unable to submit rating"
      );
    }
  };

  // ==================================================
  // LOGIN / REGISTER SCREEN
  // ==================================================

  if (!user) {
    return (
      <>
        {!showRegister ? (
          <Login
            email={email}
            password={password}
            setEmail={setEmail}
            setPassword={setPassword}
            onLogin={login}
            onRegister={() => {
              setShowRegister(true);
              setMessage("");
            }}
          />
        ) : (
          <Register
            registerData={registerData}
            setRegisterData={
              setRegisterData
            }
            onRegister={register}
            onBackToLogin={() => {
              setShowRegister(false);
              setMessage("");
            }}
          />
        )}

        <Message message={message} onClose={() => setMessage("")} />
      </>
    );
  }

  // ==================================================
  // MAIN APP
  // ==================================================

  return (
    <div className="app">
      <Navbar
        user={user}
        onLogout={logout}
        onChangePassword={() =>
          setShowChangePassword(
            !showChangePassword
          )
        }
      />

      {showChangePassword && (
        <ChangePassword
          passwordData={passwordData}
          setPasswordData={
            setPasswordData
          }
          onSubmit={changePassword}
          onClose={() =>
            setShowChangePassword(false)
          }
        />
      )}

      <Message message={message} onClose={() => setMessage("")} />

      {/* ADMIN */}
      {user.role === "ADMIN" && (
        <AdminDashboard
          user={user}
          dashboard={dashboard}
          users={users}
          stores={stores}
          userSearch={userSearch}
          setUserSearch={setUserSearch}
          userSort={userSort}
          setUserSort={setUserSort}
          storeSearch={storeSearch}
          setStoreSearch={setStoreSearch}
          storeSort={storeSort}
          setStoreSort={setStoreSort}
          showAddUser={showAddUser}
          setShowAddUser={
            setShowAddUser
          }
          newUser={newUser}
          setNewUser={setNewUser}
          addUser={addUser}
          showAddStore={showAddStore}
          setShowAddStore={
            setShowAddStore
          }
          newStore={newStore}
          setNewStore={setNewStore}
          addStore={addStore}
        />
      )}

      {/* NORMAL USER */}
      {user.role === "USER" && (
        <UserDashboard
          user={user}
          stores={stores}
          storeSearch={storeSearch}
          setStoreSearch={setStoreSearch}
          storeSort={storeSort}
          setStoreSort={storeSort}
          ratings={ratings}
          onRatingChange={(
            storeId,
            value
          ) => {
            setRatings({
              ...ratings,
              [storeId]: value,
            });
          }}
          onSubmitRating={
            submitRating
          }
        />
      )}

      {/* STORE OWNER */}
      {user.role === "STORE_OWNER" && (
        <StoreOwnerDashboard
          user={user}
          ownerDashboard={
            ownerDashboard
          }
        />
      )}
    </div>
  );
}

export default App;