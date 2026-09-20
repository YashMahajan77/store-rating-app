import React from "react";
import { Store, KeyRound, LogOut, ShieldCheck, UserCheck, User } from "lucide-react";

function Navbar({ user, onLogout, onChangePassword }) {
  const getRoleBadge = (role) => {
    switch (role) {
      case "ADMIN":
        return (
          <span className="navbar-role role-admin">
            <ShieldCheck size={13} />
            ADMIN
          </span>
        );
      case "STORE_OWNER":
        return (
          <span className="navbar-role role-store-owner">
            <UserCheck size={13} />
            STORE OWNER
          </span>
        );
      default:
        return (
          <span className="navbar-role role-user">
            <User size={13} />
            USER
          </span>
        );
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
    <nav className="navbar">
      <div className="navbar-brand">
        <div className="brand-icon">
          <Store size={22} />
        </div>
        <div>
          <div className="brand-title">StoreRate</div>
          <div className="brand-subtitle">Platform</div>
        </div>
      </div>

      <div className="navbar-right">
        <div className="user-profile-pill">
          <div className="user-avatar">
            {getInitials(user?.name)}
          </div>
          <span className="navbar-user">
            {user?.name || "User"}
          </span>
          {getRoleBadge(user?.role)}
        </div>

        <button
          className="navbar-button"
          onClick={onChangePassword}
          title="Change Password"
        >
          <KeyRound size={15} />
          <span>Change Password</span>
        </button>

        <button
          className="navbar-button logout-button"
          onClick={onLogout}
          title="Sign Out"
        >
          <LogOut size={15} />
          <span>Logout</span>
        </button>
      </div>
    </nav>
  );
}

export default Navbar;