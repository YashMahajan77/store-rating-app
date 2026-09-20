import React from "react";
import { Store, Mail, Lock, LogIn, ArrowRight } from "lucide-react";

function Login({
  email,
  password,
  setEmail,
  setPassword,
  onLogin,
  onRegister,
}) {
  return (
    <div className="auth-page">
      <div className="auth-aura auth-aura-1" />
      <div className="auth-aura auth-aura-2" />

      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-badge-icon">
            <Store size={28} />
          </div>
          <h1>StoreRate</h1>
          <p className="auth-subtitle">
            Sign in to rate and discover great stores
          </p>
        </div>

        <form onSubmit={onLogin} className="auth-form">
          <div className="form-group">
            <label>Email Address</label>
            <div className="input-wrapper">
              <Mail size={18} className="input-icon" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Password</label>
            <div className="input-wrapper">
              <Lock size={18} className="input-icon" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
            </div>
          </div>

          <button type="submit" className="primary-button">
            <LogIn size={18} />
            <span>Sign In</span>
          </button>
        </form>

        <div className="auth-footer">
          <p>Don't have an account?</p>
          <button
            type="button"
            className="link-button"
            onClick={onRegister}
          >
            <span>Create Account</span>
            <ArrowRight size={14} style={{ display: "inline", verticalAlign: "middle", marginLeft: 4 }} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;