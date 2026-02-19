import React, { useState } from 'react';
import { FaEnvelope, FaLock, FaUserMd, FaUser, FaShieldAlt, FaHeartbeat, FaFlask } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Lottie from 'lottie-react';
import DoctorAnimation from './assets/Doctor.json';
import BrandLogo from './assets/Gemini_Generated_Image_g5p0prg5p0prg5p0-removebg-preview.webp';

const OncoCodeLogo = ({ className = '' }) => (
  <img src={BrandLogo} alt="OncoCode logo" className={className} />
);

const LoginStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=Source+Sans+3:wght@400;500;600&display=swap');

  :root {
    --brand-900: #0f2f4f;
    --brand-800: #0f4c81;
    --brand-700: #146c94;
    --accent: #00bcd4;
    --mint: #7dd3c7;
    --ink: #0e1e2c;
    --soft-ink: #4f6478;
    --panel: #ffffff;
    --line: #d7e3ef;
  }

  * { box-sizing: border-box; }

  body, html, #root {
    margin: 0;
    min-height: 100%;
    font-family: 'Source Sans 3', sans-serif;
    color: var(--ink);
    background:
      radial-gradient(circle at 10% 10%, #d9f2ff 0%, transparent 40%),
      radial-gradient(circle at 90% 85%, #d4fff3 0%, transparent 40%),
      linear-gradient(130deg, #edf6ff 0%, #f7fbff 45%, #eef9f8 100%);
  }

  .login-page {
    min-height: 100vh;
    padding: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;
  }

  .login-page::before,
  .login-page::after {
    content: '';
    position: absolute;
    border-radius: 999px;
    filter: blur(1px);
    animation: float 8s ease-in-out infinite;
    z-index: 0;
  }

  .login-page::before {
    width: 220px;
    height: 220px;
    background: rgba(20, 108, 148, 0.14);
    top: 8%;
    left: 4%;
  }

  .login-page::after {
    width: 280px;
    height: 280px;
    background: rgba(0, 188, 212, 0.12);
    bottom: 8%;
    right: 4%;
    animation-delay: 1.6s;
  }

  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-16px); }
  }

  .login-shell {
    width: min(1200px, 100%);
    display: grid;
    grid-template-columns: 1.1fr 0.9fr;
    border-radius: 26px;
    overflow: hidden;
    background: rgba(255, 255, 255, 0.88);
    border: 1px solid rgba(255, 255, 255, 0.7);
    backdrop-filter: blur(12px);
    box-shadow: 0 24px 70px rgba(15, 47, 79, 0.22);
    position: relative;
    z-index: 1;
    animation: shellIn 700ms ease;
  }

  @keyframes shellIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .brand-panel {
    background: linear-gradient(140deg, var(--brand-900) 0%, var(--brand-800) 60%, #1188b8 100%);
    color: #eaf6ff;
    padding: 44px;
    display: flex;
    flex-direction: column;
    gap: 24px;
    position: relative;
    overflow: hidden;
  }

  .brand-panel::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image: radial-gradient(rgba(255,255,255,.14) 1.2px, transparent 1.2px);
    background-size: 18px 18px;
    opacity: 0.24;
    pointer-events: none;
  }

  .brand-head {
    display: flex;
    align-items: center;
    gap: 14px;
    z-index: 2;
  }

  .brand-main-logo {
    width: 78px;
    height: 78px;
    object-fit: contain;
    border-radius: 18px;
    background: rgba(255,255,255,0.1);
    border: 1px solid rgba(255,255,255,0.24);
    box-shadow: 0 8px 24px rgba(0,0,0,0.22);
    animation: logoFloat 3.4s ease-in-out infinite, logoGlow 2.8s ease-in-out infinite;
  }

  @keyframes logoFloat {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-7px); }
  }

  @keyframes logoGlow {
    0%, 100% { box-shadow: 0 8px 24px rgba(0,0,0,0.22); }
    50% { box-shadow: 0 10px 30px rgba(0, 188, 212, 0.35); }
  }

  .brand-title {
    margin: 0;
    font-family: 'Manrope', sans-serif;
    font-size: 2rem;
    font-weight: 800;
    letter-spacing: -0.04em;
  }

  .brand-tag {
    margin: 2px 0 0;
    opacity: 0.88;
  }

  .hero-title {
    margin: 0;
    font-family: 'Manrope', sans-serif;
    font-size: clamp(1.8rem, 3vw, 2.7rem);
    line-height: 1.1;
    max-width: 580px;
    position: relative;
    z-index: 2;
  }

  .hero-sub {
    margin: 0;
    max-width: 540px;
    font-size: 1.05rem;
    opacity: 0.9;
    position: relative;
    z-index: 2;
  }

  .visual-wrap {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
    position: relative;
    z-index: 2;
  }

  .visual-card {
    border-radius: 18px;
    border: 1px solid rgba(255,255,255,0.24);
    background: rgba(255,255,255,0.08);
    backdrop-filter: blur(8px);
    overflow: hidden;
    min-height: 170px;
    padding: 14px;
  }

  .logo-showcase {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 14px;
    height: 100%;
  }

  .logo-emblem {
    width: 120px;
    height: 120px;
    border-radius: 20px;
    background: rgba(255,255,255,0.14);
    border: 1px solid rgba(255,255,255,0.22);
    display: grid;
    place-items: center;
    box-shadow: 0 10px 24px rgba(0, 0, 0, 0.2);
  }

  .logo-emblem-image {
    width: 108px;
    height: 108px;
    object-fit: contain;
    animation: logoSpinTilt 6.5s ease-in-out infinite;
  }

  @keyframes logoSpinTilt {
    0%, 100% { transform: rotate(0deg) scale(1); }
    25% { transform: rotate(-2deg) scale(1.03); }
    75% { transform: rotate(2deg) scale(1.03); }
  }

  .logo-caption {
    margin: 0;
    font-family: 'Manrope', sans-serif;
    font-size: 0.92rem;
    letter-spacing: -0.01em;
    opacity: 0.95;
  }

  .lottie-card {
    display: grid;
    place-items: center;
    padding: 10px;
  }

  .trust-row {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
    z-index: 2;
  }

  .trust-pill {
    border: 1px solid rgba(255,255,255,0.22);
    border-radius: 12px;
    padding: 10px;
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 0.84rem;
    background: rgba(255,255,255,0.08);
  }

  .auth-panel {
    padding: 42px;
    background: linear-gradient(180deg, #ffffff 0%, #f8fbff 100%);
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .auth-head h2 {
    margin: 0;
    font-family: 'Manrope', sans-serif;
    font-size: 2rem;
    letter-spacing: -0.03em;
  }

  .auth-head p {
    margin: 6px 0 28px;
    color: var(--soft-ink);
  }

  .field {
    position: relative;
    margin-bottom: 14px;
  }

  .field svg {
    position: absolute;
    left: 14px;
    top: 50%;
    transform: translateY(-50%);
    color: #7a8fa3;
  }

  .field input {
    width: 100%;
    border: 1.7px solid var(--line);
    background: #fff;
    padding: 14px 14px 14px 44px;
    border-radius: 12px;
    font-size: 1rem;
    font-family: inherit;
    transition: 180ms ease;
  }

  .field input:focus {
    outline: none;
    border-color: var(--brand-700);
    box-shadow: 0 0 0 3px rgba(20,108,148,0.14);
  }

  .primary-btn {
    width: 100%;
    margin-top: 8px;
    border: none;
    background: linear-gradient(130deg, var(--brand-800), var(--brand-700));
    color: white;
    border-radius: 12px;
    padding: 14px;
    font-weight: 700;
    font-size: 1rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    transition: 220ms ease;
    box-shadow: 0 10px 20px rgba(15, 76, 129, 0.25);
  }

  .primary-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 14px 24px rgba(15, 76, 129, 0.3);
  }

  .meta-row {
    margin-top: 18px;
    display: flex;
    justify-content: space-between;
    gap: 10px;
    font-size: 0.9rem;
    color: var(--soft-ink);
  }

  .switch-link {
    color: var(--brand-800);
    font-weight: 700;
    cursor: pointer;
  }

  .switch-link:hover { color: #0a6ea2; }

  @media (max-width: 980px) {
    .login-shell { grid-template-columns: 1fr; }
    .brand-panel { padding: 30px; }
    .auth-panel { padding: 30px; }
  }

  @media (max-width: 620px) {
    .login-page { padding: 12px; }
    .visual-wrap { grid-template-columns: 1fr; }
    .trust-row { grid-template-columns: 1fr; }
    .auth-head h2 { font-size: 1.65rem; }
  }
`;

const AuthPage = () => {
  const navigate = useNavigate();
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = isRegister
        ? 'http://localhost:5000/api/auth/register'
        : 'http://localhost:5000/api/auth/login';

      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        if (data.doctorId) localStorage.setItem('doctorId', data.doctorId);
        if (data.token) localStorage.setItem('token', data.token);
        navigate('/dashboard');
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Auth Error:', error);
      alert('Something went wrong. Try again.');
    }
  };

  return (
    <>
      <style>{LoginStyles}</style>
      <div className="login-page">
        <div className="login-shell">
          <section className="brand-panel">
            <div className="brand-head">
              <OncoCodeLogo className="brand-main-logo" />
              <div>
                <h1 className="brand-title">OncoCode</h1>
                <p className="brand-tag">Precision Oncology, Simplified</p>
              </div>
            </div>

            <h2 className="hero-title">Clinical-grade intelligence for faster oncology decisions.</h2>
            <p className="hero-sub">
              Secure patient workflows, AI-guided reports, and coordinated diagnostics in one professional workspace.
            </p>

            <div className="visual-wrap">
              <div className="visual-card">
                <div className="logo-showcase">
                  <div className="logo-emblem">
                    <OncoCodeLogo className="logo-emblem-image" />
                  </div>
                  <p className="logo-caption">OncoCode Clinical Platform</p>
                </div>
              </div>
              <div className="visual-card lottie-card">
                <Lottie animationData={DoctorAnimation} loop style={{ width: '100%', maxWidth: 180 }} />
              </div>
            </div>

            <div className="trust-row">
              <div className="trust-pill"><FaShieldAlt /> HIPAA-minded</div>
              <div className="trust-pill"><FaHeartbeat /> Risk Tracking</div>
              <div className="trust-pill"><FaFlask /> Gene Analysis</div>
            </div>
          </section>

          <section className="auth-panel">
            <div className="auth-head">
              <h2>{isRegister ? 'Create Doctor Account' : 'Welcome Back, Doctor'}</h2>
              <p>{isRegister ? 'Register to access your clinical dashboard.' : 'Sign in to continue managing patients and reports.'}</p>
            </div>

            <form onSubmit={handleSubmit}>
              {isRegister && (
                <div className="field">
                  <FaUser />
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
              )}

              <div className="field">
                <FaEnvelope />
                <input
                  type="email"
                  placeholder="Hospital Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="field">
                <FaLock />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <button type="submit" className="primary-btn">
                <FaUserMd /> {isRegister ? 'Create Account' : 'Sign In'}
              </button>
            </form>

            <div className="meta-row">
              <span>{isRegister ? 'Already have an account?' : 'Need an account?'}</span>
              <span className="switch-link" onClick={() => setIsRegister(!isRegister)}>
                {isRegister ? 'Sign in here' : 'Register here'}
              </span>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default AuthPage;
