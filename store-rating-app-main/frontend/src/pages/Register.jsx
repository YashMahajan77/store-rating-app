import React from "react";
import { UserPlus, User, Mail, Lock, MapPin, ArrowLeft } from "lucide-react";

function Register({
  registerData,
  setRegisterData,
  onRegister,
  onBackToLogin,
}) {
  return (
    <div className="auth-page">
      <div className="auth-aura auth-aura-1" />
      <div className="auth-aura auth-aura-2" />

      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-badge-icon">
            <UserPlus size={28} />
          </div>
          <h1>Create Account</h1>
          <p className="auth-subtitle">
            Join StoreRate to rate stores and share feedback
          </p>
        </div>

        <form onSubmit={onRegister} className="auth-form">
          <div className="form-group">
            <label>Full Name</label>
            <div className="input-wrapper">
              <User size={18} className="input-icon" />
              <input
                type="text"
                value={registerData.name}
                onChange={(e) =>
                  setRegisterData({
                    ...registerData,
                    name: e.target.value,
                  })
                }
                placeholder="Enter your full name"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Email Address</label>
            <div className="input-wrapper">
              <Mail size={18} className="input-icon" />
              <input
                type="email"
                value={registerData.email}
                onChange={(e) =>
                  setRegisterData({
                    ...registerData,
                    email: e.target.value,
                  })
                }
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
                value={registerData.password}
                onChange={(e) =>
                  setRegisterData({
                    ...registerData,
                    password: e.target.value,
                  })
                }
                placeholder="Create a strong password"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Address</label>
            <div className="input-wrapper">
              <MapPin size={18} className="input-icon" style={{ top: 16 }} />
              <textarea
                value={registerData.address}
                onChange={(e) =>
                  setRegisterData({
                    ...registerData,
                    address: e.target.value,
                  })
                }
                placeholder="Enter your residential address"
                rows="3"
                required
              />
            </div>
          </div>

          <button type="submit" className="primary-button">
            <UserPlus size={18} />
            <span>Register Account</span>
          </button>
        </form>

        <div className="auth-footer">
          <p>Already have an account?</p>
          <button
            type="button"
            className="link-button"
            onClick={onBackToLogin}
          >
            <ArrowLeft size={14} style={{ display: "inline", verticalAlign: "middle", marginRight: 4 }} />
            <span>Back to Login</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Register;