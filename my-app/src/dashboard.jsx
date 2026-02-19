import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FaSearch,
  FaPlus,
  FaUserMd,
  FaChartLine,
  FaMicroscope,
  FaClock,
  FaArrowRight,
} from 'react-icons/fa';
import Lottie from 'lottie-react';
import DoctorAnimation from './assets/Doctor.json';
import HeroImage from './assets/Gemini_Generated_Image_g5p0prg5p0prg5p0-removebg-preview.webp';

const OncoCodeLogo = () => (
  <svg width="40" height="40" viewBox="0 0 100 100" fill="none" aria-hidden="true">
    <path d="M45 5C22.9086 5 5 22.9086 5 45H45V5Z" stroke="#0f4c81" strokeWidth="6" />
    <path d="M55 5H95V45H55V5Z" stroke="#0f4c81" strokeWidth="6" />
    <path d="M5 55H45V95H5V55Z" stroke="#0f4c81" strokeWidth="6" />
    <path d="M55 95C77.0914 95 95 77.0914 95 55H55V95Z" stroke="#0f4c81" strokeWidth="6" />
  </svg>
);

const DashboardStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=Source+Sans+3:wght@400;500;600&display=swap');

  :root {
    --brand-900: #0f2f4f;
    --brand-800: #0f4c81;
    --brand-700: #146c94;
    --aqua: #00bcd4;
    --mint: #73d7c4;
    --ink: #0e1e2c;
    --soft-ink: #5a6f83;
    --surface: #f5f9fd;
    --line: #d7e3ef;
  }

  * { box-sizing: border-box; }

  body, html, #root {
    margin: 0;
    min-height: 100%;
    font-family: 'Source Sans 3', sans-serif;
    color: var(--ink);
    background: linear-gradient(160deg, #edf6ff 0%, #f9fcff 45%, #eefbf8 100%);
  }

  #dashboard-page { min-height: 100vh; }

  .topbar {
    position: sticky;
    top: 0;
    z-index: 50;
    background: rgba(255,255,255,0.86);
    backdrop-filter: blur(12px);
    border-bottom: 1px solid rgba(15, 76, 129, 0.12);
  }

  .topbar-inner {
    width: min(1180px, 100% - 32px);
    margin: 0 auto;
    min-height: 72px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .brand {
    display: flex;
    align-items: center;
    gap: 12px;
    text-decoration: none;
  }

  .brand strong {
    font-family: 'Manrope', sans-serif;
    font-size: 1.35rem;
    letter-spacing: -0.03em;
    color: var(--brand-800);
  }

  .nav-links {
    display: flex;
    gap: 20px;
    align-items: center;
  }

  .nav-links a {
    color: #344c63;
    text-decoration: none;
    font-weight: 600;
    position: relative;
  }

  .nav-links a::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -6px;
    width: 0;
    height: 2px;
    background: var(--aqua);
    transition: width 180ms ease;
  }

  .nav-links a:hover::after { width: 100%; }

  .hero {
    width: min(1180px, 100% - 32px);
    margin: 24px auto 0;
    border-radius: 26px;
    overflow: hidden;
    display: grid;
    grid-template-columns: 1fr 1fr;
    background: linear-gradient(135deg, var(--brand-900) 0%, var(--brand-800) 56%, #1188b8 100%);
    color: #e8f6ff;
    box-shadow: 0 26px 64px rgba(15, 47, 79, 0.28);
    position: relative;
  }

  .hero::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image: radial-gradient(rgba(255,255,255,.15) 1.2px, transparent 1.2px);
    background-size: 18px 18px;
    opacity: 0.2;
  }

  .hero-left,
  .hero-right {
    position: relative;
    z-index: 2;
    padding: 38px;
  }

  .hero-title {
    margin: 0 0 8px;
    font-family: 'Manrope', sans-serif;
    font-size: clamp(2rem, 3.3vw, 3rem);
    line-height: 1.06;
    letter-spacing: -0.04em;
  }

  .hero-sub {
    margin: 0;
    font-size: 1.05rem;
    max-width: 500px;
    opacity: 0.9;
  }

  .hero-actions {
    margin-top: 24px;
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
  }

  .hero-btn {
    border: none;
    border-radius: 12px;
    padding: 12px 18px;
    font-weight: 700;
    font-size: 0.95rem;
    cursor: pointer;
    transition: transform 180ms ease, box-shadow 180ms ease;
    display: inline-flex;
    align-items: center;
    gap: 8px;
  }

  .hero-btn.primary {
    background: #ffffff;
    color: var(--brand-800);
    box-shadow: 0 8px 22px rgba(255,255,255,0.26);
  }

  .hero-btn.secondary {
    background: rgba(255,255,255,0.12);
    color: #eff9ff;
    border: 1px solid rgba(255,255,255,0.25);
  }

  .hero-btn:hover {
    transform: translateY(-2px);
  }

  .hero-media {
    border: 1px solid rgba(255,255,255,0.22);
    border-radius: 18px;
    background: rgba(255,255,255,0.08);
    backdrop-filter: blur(8px);
    padding: 10px;
    display: grid;
    grid-template-columns: 1fr 180px;
    gap: 10px;
  }

  .hero-media img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 12px;
    animation: bob 7s ease-in-out infinite;
  }

  .hero-lottie {
    border-radius: 12px;
    background: rgba(255,255,255,0.1);
    display: grid;
    place-items: center;
  }

  @keyframes bob {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-8px); }
  }

  .main-wrap {
    width: min(1180px, 100% - 32px);
    margin: 26px auto 34px;
    display: grid;
    gap: 24px;
  }

  .kpi-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 16px;
  }

  .kpi-card {
    background: #fff;
    border: 1px solid var(--line);
    border-radius: 16px;
    padding: 18px;
    box-shadow: 0 10px 22px rgba(14, 30, 44, 0.05);
    animation: fadeRise 480ms ease both;
  }

  .kpi-card:nth-child(2) { animation-delay: 120ms; }
  .kpi-card:nth-child(3) { animation-delay: 240ms; }

  @keyframes fadeRise {
    from { transform: translateY(14px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }

  .kpi-title {
    font-size: 0.9rem;
    color: var(--soft-ink);
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .kpi-value {
    margin-top: 6px;
    font-family: 'Manrope', sans-serif;
    font-size: 2rem;
    font-weight: 800;
    color: var(--brand-900);
    letter-spacing: -0.04em;
  }

  .kpi-note {
    color: #3f5e74;
    font-size: 0.9rem;
  }

  .section-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
  }

  .panel {
    background: #fff;
    border: 1px solid var(--line);
    border-radius: 16px;
    padding: 18px;
    box-shadow: 0 10px 22px rgba(14, 30, 44, 0.05);
  }

  .panel-head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
  }

  .panel-head h3 {
    margin: 0;
    font-family: 'Manrope', sans-serif;
    font-size: 1.2rem;
    letter-spacing: -0.02em;
  }

  .panel-list {
    display: grid;
    gap: 10px;
  }

  .item-row {
    border: 1px solid #e6edf5;
    border-radius: 12px;
    padding: 12px;
    background: #f9fcff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
    transition: 180ms ease;
  }

  .item-row:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 18px rgba(14, 30, 44, 0.08);
  }

  .item-main {
    display: flex;
    gap: 10px;
    align-items: center;
    min-width: 0;
  }

  .item-icon {
    color: #fff;
    background: linear-gradient(140deg, var(--brand-800), #0c6f94);
    width: 36px;
    height: 36px;
    border-radius: 10px;
    display: grid;
    place-items: center;
    flex-shrink: 0;
  }

  .item-text strong {
    display: block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 210px;
  }

  .item-text span,
  .item-meta {
    color: var(--soft-ink);
    font-size: 0.86rem;
  }

  .quick-actions {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 12px;
  }

  .quick-card {
    border-radius: 14px;
    border: 1px solid #dbe7f3;
    background: linear-gradient(180deg, #ffffff 0%, #f6fbff 100%);
    padding: 16px;
    cursor: pointer;
    transition: 180ms ease;
  }

  .quick-card:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 18px rgba(14, 30, 44, 0.08);
  }

  .quick-card h4 {
    margin: 0 0 4px;
    font-family: 'Manrope', sans-serif;
    color: var(--brand-900);
  }

  .quick-card p {
    margin: 0;
    color: var(--soft-ink);
    font-size: 0.92rem;
  }

  @media (max-width: 1024px) {
    .hero { grid-template-columns: 1fr; }
    .section-grid { grid-template-columns: 1fr; }
  }

  @media (max-width: 760px) {
    .topbar-inner { min-height: 64px; }
    .nav-links { gap: 14px; font-size: 0.9rem; }
    .hero-left, .hero-right { padding: 24px; }
    .hero-media { grid-template-columns: 1fr; }
    .hero-lottie { min-height: 120px; }
    .kpi-grid { grid-template-columns: 1fr; }
    .quick-actions { grid-template-columns: 1fr; }
  }
`;

const Dashboard = () => {
  const navigate = useNavigate();
  const doctorId = localStorage.getItem('doctorId');
  const token = localStorage.getItem('token');

  const [totalPatients, setTotalPatients] = useState(0);
  const [pendingClassification, setPendingClassification] = useState(0);
  const [recentReports, setRecentReports] = useState([]);
  const [recentPatients, setRecentPatients] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const patientRes = await fetch(`http://localhost:5000/api/patients/${doctorId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const patients = await patientRes.json();
        setTotalPatients(patients.length);

        const analysisRes = await fetch(`http://localhost:5000/api/analysis/all?doctorId=${doctorId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const analyses = await analysisRes.json();

        if (!Array.isArray(analyses)) {
          setPendingClassification(patients.length);
          setRecentReports([]);
          return;
        }

        const analyzedPatientIds = new Set(analyses.map((a) => a.patientId));
        const pending = patients.filter((p) => !analyzedPatientIds.has(p._id));
        setPendingClassification(pending.length);
        setRecentReports(analyses.slice(-5).reverse());
        setRecentPatients(patients.slice(0, 5));
      } catch (err) {
        console.error('Dashboard fetch error:', err);
      }
    };

    if (doctorId) fetchData();
  }, [doctorId, token]);

  return (
    <>
      <style>{DashboardStyles}</style>
      <div id="dashboard-page">
        <header className="topbar">
          <div className="topbar-inner">
            <Link className="brand" to="/dashboard">
              <OncoCodeLogo />
              <strong>OncoCode</strong>
            </Link>
            <nav className="nav-links">
              <Link to="/dashboard">Dashboard</Link>
              <Link to="/search_patient">Patients</Link>
              <Link to="/add_patient">New Case</Link>
              <Link to="/login">Logout</Link>
            </nav>
          </div>
        </header>

        <section className="hero">
          <div className="hero-left">
            <h1 className="hero-title">Clinical Intelligence Center</h1>
            <p className="hero-sub">
              Coordinate records, upload gene data, and review AI-based oncology insights from a single professional dashboard.
            </p>
            <div className="hero-actions">
              <button className="hero-btn primary" onClick={() => navigate('/search_patient')}>
                <FaSearch /> Search Patients
              </button>
              <button className="hero-btn secondary" onClick={() => navigate('/add_patient')}>
                <FaPlus /> Add New Patient
              </button>
            </div>
          </div>

          <div className="hero-right">
            <div className="hero-media">
              <img src={HeroImage} alt="Medical analytics dashboard visual" />
              <div className="hero-lottie">
                <Lottie animationData={DoctorAnimation} loop style={{ width: '100%', maxWidth: 150 }} />
              </div>
            </div>
          </div>
        </section>

        <main className="main-wrap">
          <section className="kpi-grid">
            <article className="kpi-card">
              <div className="kpi-title"><FaUserMd /> Total Patients</div>
              <div className="kpi-value">{totalPatients}</div>
              <div className="kpi-note">Active records under your profile</div>
            </article>
            <article className="kpi-card">
              <div className="kpi-title"><FaClock /> Pending Classifications</div>
              <div className="kpi-value">{pendingClassification}</div>
              <div className="kpi-note">Awaiting gene upload or model output</div>
            </article>
            <article className="kpi-card">
              <div className="kpi-title"><FaChartLine /> Reports Generated</div>
              <div className="kpi-value">{recentReports.length}</div>
              <div className="kpi-note">Recent clinical outputs available</div>
            </article>
          </section>

          <section className="quick-actions">
            <button className="quick-card" onClick={() => navigate('/search_patient')}>
              <h4>Patient Directory</h4>
              <p>Find records quickly and open details instantly.</p>
            </button>
            <button className="quick-card" onClick={() => navigate('/add_patient')}>
              <h4>Register New Case</h4>
              <p>Create structured patient entries with complete history.</p>
            </button>
          </section>

          <section className="section-grid">
            <article className="panel">
              <div className="panel-head">
                <h3>Recent Reports</h3>
                <FaMicroscope color="#146c94" />
              </div>

              <div className="panel-list">
                {recentReports.length > 0 ? (
                  recentReports.map((r, i) => (
                    <div key={i} className="item-row">
                      <div className="item-main">
                        <span className="item-icon"><FaUserMd /></span>
                        <div className="item-text">
                          <strong>{r.CancerType}</strong>
                          <span>Patient ID: {r.patientId}</span>
                        </div>
                      </div>
                      <div className="item-meta">
                        {r.Stage} <FaArrowRight />
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="item-meta">No recent reports.</p>
                )}
              </div>
            </article>

            <article className="panel">
              <div className="panel-head">
                <h3>Recent Patients</h3>
                <FaUserMd color="#146c94" />
              </div>

              <div className="panel-list">
                {recentPatients.length > 0 ? (
                  recentPatients.map((p) => (
                    <div key={p._id} className="item-row" onClick={() => navigate(`/patient/${p._id}`)}>
                      <div className="item-main">
                        <span className="item-icon"><FaUserMd /></span>
                        <div className="item-text">
                          <strong>{p.fullName}</strong>
                          <span>{p.patientId}</span>
                        </div>
                      </div>
                      <div className="item-meta">Age {p.age || 'N/A'}</div>
                    </div>
                  ))
                ) : (
                  <p className="item-meta">No recent patients.</p>
                )}
              </div>
            </article>
          </section>
        </main>
      </div>
    </>
  );
};

export default Dashboard;