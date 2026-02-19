// PatientAnalysis.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { PDFDownloadLink } from "@react-pdf/renderer";
import ReportDocument from "./ReportDocument";
import { FaUserMd, FaArrowLeft, FaDownload, FaFileAlt, FaChartLine, FaHeartbeat } from 'react-icons/fa';

const OncoCodeLogo = () => (
  <svg width="40" height="40" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M45 5C22.9086 5 5 22.9086 5 45V45H45V5Z" stroke="#1E3A8A" strokeWidth="6"/>
    <path d="M55 5H95V45H55V5Z" stroke="#1E3A8A" strokeWidth="6"/>
    <path d="M5 55H45V95H5V55Z" stroke="#1E3A8A" strokeWidth="6"/>
    <path d="M55 95C77.0914 95 95 77.0914 95 55V55H55V95Z" stroke="#1E3A8A" strokeWidth="6"/>
  </svg>
);

const PredictionResultStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

  * {
    box-sizing: border-box;
  }

  body, html, #root {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    background: linear-gradient(135deg, #F8FAFC 0%, #E2E8F0 100%);
    color: #1E293B;
  }

  #patient-analysis-page {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    padding: 20px;
  }

  .analysis-container {
    width: 100%;
    max-width: 1200px;
    background: #FFFFFF;
    border-radius: 16px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1), 0 4px 10px rgba(0, 0, 0, 0.05);
    padding: 40px;
    animation: fadeIn 0.6s ease-out;
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .analysis-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #E2E8F0;
    padding-bottom: 24px;
    margin-bottom: 40px;
  }

  .logo-area {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  .logo-area .company-name {
    font-size: 1.5rem;
    font-weight: 700;
    color: #1E3A8A;
    letter-spacing: -0.025em;
  }

  .logo-area .tagline {
    font-size: 0.875rem;
    color: #64748B;
    margin-top: 2px;
    font-weight: 400;
  }

  .main-nav {
    display: flex;
    gap: 32px;
  }

  .main-nav a {
    text-decoration: none;
    color: #475569;
    font-weight: 500;
    font-size: 0.95rem;
    transition: color 0.2s ease;
    position: relative;
  }

  .main-nav a:hover {
    color: #1E3A8A;
  }

  .main-nav a::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    width: 0;
    height: 2px;
    background: #06B6D4;
    transition: width 0.2s ease;
  }

  .main-nav a:hover::after {
    width: 100%;
  }

  .page-title {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-bottom: 40px;
  }

  .back-btn {
    background: #F1F5F9;
    color: #475569;
    border: none;
    border-radius: 12px;
    padding: 12px 16px;
    cursor: pointer;
    font-size: 0.875rem;
    font-weight: 500;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .back-btn:hover {
    background: #E2E8F0;
    color: #1E3A8A;
  }

  .page-title h1 {
    font-size: 2.5rem;
    font-weight: 700;
    color: #0F172A;
    margin: 0;
    letter-spacing: -0.025em;
  }

  .page-title p {
    font-size: 1.125rem;
    color: #64748B;
    margin: 0;
    font-weight: 400;
  }

  .section-heading {
    font-size: 1.5rem;
    font-weight: 600;
    color: #374151;
    margin-bottom: 24px;
    padding-bottom: 8px;
    border-bottom: 2px solid #E2E8F0;
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .section-icon {
    color: #06B6D4;
    font-size: 1.25rem;
  }

  .patient-summary {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 24px;
    margin-bottom: 48px;
  }

  .summary-card {
    background: linear-gradient(135deg, #F8FAFC 0%, #F1F5F9 100%);
    border: 1px solid #E2E8F0;
    border-radius: 12px;
    padding: 24px;
    transition: all 0.3s ease;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  }

  .summary-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  }

  .summary-label {
    font-size: 0.875rem;
    color: #64748B;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-bottom: 8px;
  }

  .summary-value {
    font-size: 1.25rem;
    font-weight: 600;
    color: #0F172A;
  }

  .predictions-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 24px;
    margin-bottom: 48px;
  }

  .prediction-card {
    background: #FFFFFF;
    border: 1px solid #E2E8F0;
    border-radius: 16px;
    padding: 32px;
    text-align: center;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
  }

  .prediction-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #1E3A8A 0%, #06B6D4 100%);
  }

  .prediction-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.1);
  }

  .prediction-card .title {
    font-size: 1rem;
    font-weight: 600;
    color: #64748B;
    margin-bottom: 16px;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .prediction-card .result {
    font-size: 1.5rem;
    font-weight: 700;
    color: #0F172A;
    margin-bottom: 20px;
    line-height: 1.3;
  }

  .progress-wrapper {
    width: 120px;
    margin: 0 auto;
  }

  .action-buttons {
    display: flex;
    justify-content: center;
    gap: 24px;
    margin-top: 48px;
  }

  .action-btn {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 16px 32px;
    border: none;
    border-radius: 12px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    background: linear-gradient(135deg, #1E3A8A 0%, #0F172A 100%);
    color: white;
    text-decoration: none;
    box-shadow: 0 4px 12px rgba(30, 58, 138, 0.3);
  }

  .action-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(30, 58, 138, 0.4);
  }

  .loading-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 400px;
    gap: 24px;
  }

  .loading-spinner {
    width: 48px;
    height: 48px;
    border: 4px solid #E2E8F0;
    border-top: 4px solid #1E3A8A;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  .loading-text {
    font-size: 1.125rem;
    color: #64748B;
    font-weight: 500;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  @media (max-width: 768px) {
    .analysis-container {
      padding: 24px;
      margin: 0 16px;
    }

    .analysis-header {
      flex-direction: column;
      gap: 20px;
      text-align: center;
    }

    .main-nav {
      gap: 24px;
    }

    .page-title {
      flex-direction: column;
      gap: 16px;
      text-align: center;
    }

    .page-title h1 {
      font-size: 2rem;
    }

    .patient-summary {
      grid-template-columns: 1fr;
    }

    .predictions-grid {
      grid-template-columns: 1fr;
    }

    .action-buttons {
      flex-direction: column;
      align-items: center;
    }
  }
`;

const PatientAnalysis = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [patient, setPatient] = useState(null);
  const [analysis, setAnalysis] = useState(null);

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/patients/single/${id}`);
        if (!res.ok) throw new Error("Failed to fetch patient details");
        const data = await res.json();
        setPatient(data);
      } catch (err) {
        console.error("Error fetching patient:", err);
      }
    };

    const fetchAnalysis = async () => {
      try {
        const res = await fetch(`http://localhost:5001/api/analysis/${id}`);
        if (!res.ok) throw new Error("Failed to fetch analysis");
        const data = await res.json();
        if (data.length > 0) {
          setAnalysis(data[data.length - 1]); // latest
        }
      } catch (err) {
        console.error("Error fetching analysis:", err);
      }
    };

    fetchPatient();
    fetchAnalysis();
  }, [id]);

  if (!patient || !analysis) {
    return (
      <>
        <style>{PredictionResultStyles}</style>
        <div id="patient-analysis-page">
          <div className="analysis-container">
            <div className="loading-state">
              <div className="loading-spinner"></div>
              <div className="loading-text">Loading patient analysis...</div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <style>{PredictionResultStyles}</style>
      <div id="patient-analysis-page">
        <div className="analysis-container">
          <header className="analysis-header">
            <div className="logo-area">
              <OncoCodeLogo />
              <div>
                <div className="company-name">OncoCode</div>
                <div className="tagline">Precision Oncology, Simplified</div>
              </div>
            </div>
            <nav className="main-nav">
              <a href="/dashboard">Dashboard</a>
              <a href="/search_patient">Patients</a>
              <a href="/login">Logout</a>
            </nav>
          </header>

          <main>
            <div className="page-title">
              <button className="back-btn" onClick={() => navigate(`/patient/${id}`)}>
                <FaArrowLeft /> Back to Patient
              </button>
              <div>
                <h1>Analysis Results</h1>
                <p>AI-powered cancer classification and risk assessment</p>
              </div>
            </div>

            {/* Patient Summary */}
            <section>
              <h2 className="section-heading">
                <FaUserMd className="section-icon" />
                Patient Summary
              </h2>
              <div className="patient-summary">
                <div className="summary-card">
                  <div className="summary-label">Full Name</div>
                  <div className="summary-value">{patient.fullName}</div>
                </div>
                <div className="summary-card">
                  <div className="summary-label">Patient ID</div>
                  <div className="summary-value">{patient.patientId}</div>
                </div>
                <div className="summary-card">
                  <div className="summary-label">Age</div>
                  <div className="summary-value">{patient.age} years</div>
                </div>
                <div className="summary-card">
                  <div className="summary-label">Gender</div>
                  <div className="summary-value">{patient.gender}</div>
                </div>
              </div>
            </section>

            {/* Predictions */}
            <section>
              <h2 className="section-heading">
                <FaChartLine className="section-icon" />
                Cancer Predictions
              </h2>
              <div className="predictions-grid">
                <div className="prediction-card">
                  <div className="title">Cancer Type</div>
                  <div className="result">{analysis.CancerType}</div>
                </div>
                <div className="prediction-card">
                  <div className="title">Disease Stage</div>
                  <div className="result">{analysis.Stage}</div>
                </div>
                <div className="prediction-card">
                  <div className="title">Survival Risk</div>
                  <div className="result">
                    {analysis.SurvivalInterpretation}
                    <br />
                    <span style={{ fontSize: '1rem', color: '#64748B' }}>
                      Score: {analysis.SurvivalRiskScore.toFixed(2)}
                    </span>
                  </div>
                  <div className="progress-wrapper">
                    <CircularProgressbar
                      value={analysis.SurvivalRiskScore * 100}
                      text={`${(analysis.SurvivalRiskScore * 100).toFixed(0)}%`}
                      styles={buildStyles({
                        textSize: '16px',
                        pathColor: analysis.SurvivalRiskScore > 0.5 ? '#EF4444' : '#10B981',
                        textColor: '#0F172A',
                        trailColor: '#E2E8F0',
                      })}
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* Actions */}
            <div className="action-buttons">
              <PDFDownloadLink
                document={<ReportDocument patient={patient} results={analysis} />}
                fileName={`OncoCode_Report_${id}.pdf`}
                className="action-btn"
              >
                {({ loading }) => (
                  <>
                    {loading ? (
                      <>
                        <div className="loading-spinner" style={{ width: '20px', height: '20px' }}></div>
                        Generating Report...
                      </>
                    ) : (
                      <>
                        <FaDownload />
                        Download Report
                      </>
                    )}
                  </>
                )}
              </PDFDownloadLink>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default PatientAnalysis;
