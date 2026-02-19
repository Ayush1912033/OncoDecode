import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaUserMd, FaBirthdayCake, FaVenusMars, FaFileDownload, FaUpload, FaIdCard, FaArrowLeft } from 'react-icons/fa';

const OncoCodeLogo = () => (
  <svg width="40" height="40" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M45 5C22.9086 5 5 22.9086 5 45V45H45V5Z" stroke="#1E3A8A" strokeWidth="6"/>
    <path d="M55 5H95V45H55V5Z" stroke="#1E3A8A" strokeWidth="6"/>
    <path d="M5 55H45V95H5V55Z" stroke="#1E3A8A" strokeWidth="6"/>
    <path d="M55 95C77.0914 95 95 77.0914 95 55V55H55V95Z" stroke="#1E3A8A" strokeWidth="6"/>
  </svg>
);

const PatientDetailsStyles = `
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

  #patient-details-page {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    padding: 20px;
  }

  .patient-details-container {
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

  .patient-details-header {
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

  .section-heading {
    font-size: 1.25rem;
    font-weight: 600;
    color: #374151;
    margin-bottom: 24px;
    padding-bottom: 8px;
    border-bottom: 2px solid #E2E8F0;
  }

  .patient-summary {
    background: #F8FAFC;
    border: 1px solid #E2E8F0;
    border-radius: 16px;
    padding: 32px;
    margin-bottom: 40px;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 24px;
  }

  .summary-item {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 16px;
    background: #FFFFFF;
    border-radius: 12px;
    border: 1px solid #E2E8F0;
    transition: all 0.3s ease;
  }

  .summary-item:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  }

  .summary-item .icon {
    color: #06B6D4;
    font-size: 1.5rem;
    background: linear-gradient(135deg, #06B6D4 0%, #0891B2 100%);
    border-radius: 50%;
    padding: 12px;
    box-shadow: 0 2px 6px rgba(6, 182, 212, 0.2);
  }

  .summary-item .content {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .summary-item .label {
    font-size: 0.875rem;
    color: #64748B;
    font-weight: 500;
  }

  .summary-item .value {
    font-size: 1.125rem;
    font-weight: 600;
    color: #0F172A;
  }

  .reports-list {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .report-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 24px;
    border-radius: 16px;
    border: 1px solid #E2E8F0;
    background: #FFFFFF;
    transition: all 0.3s ease;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }

  .report-item:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
    border-color: #1E3A8A;
  }

  .report-info {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .report-info .title {
    font-size: 1.125rem;
    font-weight: 600;
    color: #0F172A;
  }

  .report-info .date {
    font-size: 0.875rem;
    color: #64748B;
  }

  .download-btn {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 12px 20px;
    border: 2px solid #E2E8F0;
    background: #FFFFFF;
    color: #475569;
    border-radius: 12px;
    cursor: pointer;
    font-weight: 500;
    text-decoration: none;
    transition: all 0.3s ease;
    font-size: 0.875rem;
  }

  .download-btn:hover {
    background: #1E3A8A;
    border-color: #1E3A8A;
    color: #FFFFFF;
    transform: translateY(-1px);
  }

  .page-actions {
    margin-top: 40px;
    text-align: center;
  }

  .upload-btn {
    display: inline-flex;
    align-items: center;
    gap: 12px;
    padding: 16px 32px;
    border: none;
    border-radius: 12px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    background: linear-gradient(135deg, #1E3A8A 0%, #0F172A 100%);
    color: white;
    transition: all 0.3s ease;
    box-shadow: 0 4px 12px rgba(30, 58, 138, 0.3);
  }

  .upload-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(30, 58, 138, 0.4);
  }

  .no-reports {
    text-align: center;
    padding: 40px;
    color: #64748B;
    font-size: 1rem;
  }

  @media (max-width: 768px) {
    .patient-details-container {
      padding: 24px;
      margin: 0 16px;
    }

    .patient-details-header {
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
      padding: 24px;
    }

    .summary-item {
      padding: 16px;
    }

    .report-item {
      flex-direction: column;
      align-items: flex-start;
      gap: 16px;
    }

    .download-btn {
      width: 100%;
      justify-content: center;
    }
  }
`;

const PatientDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [patient, setPatient] = useState(null);

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/patients/single/${id}`);
        if (!res.ok) {
          console.error("Failed to fetch patient:", res.status);
          return;
        }
        const data = await res.json();
        setPatient(data);
      } catch (error) {
        console.error("Error fetching patient:", error);
      }
    };
    fetchPatient();
  }, [id]);

  if (!patient) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #F8FAFC 0%, #E2E8F0 100%)',
        fontFamily: "'Inter', sans-serif"
      }}>
        <div style={{ textAlign: 'center', color: '#64748B' }}>
          <div style={{
            width: '40px',
            height: '40px',
            border: '4px solid #E2E8F0',
            borderTop: '4px solid #1E3A8A',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 16px'
          }}></div>
          <p>Loading patient details...</p>
          <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
        </div>
      </div>
    );
  }

  return (
    <>
      <style>{PatientDetailsStyles}</style>
      <div id="patient-details-page">
        <div className="patient-details-container">
          <header className="patient-details-header">
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
              <button className="back-btn" onClick={() => navigate('/search_patient')}>
                <FaArrowLeft /> Back to Patients
              </button>
              <h1>Patient Details</h1>
            </div>

            <section>
              <h2 className="section-heading">Patient Summary</h2>
              <div className="patient-summary">
                <div className="summary-item">
                  <FaUserMd className="icon"/>
                  <div className="content">
                    <div className="label">Patient Name</div>
                    <div className="value">{patient.fullName}</div>
                  </div>
                </div>
                <div className="summary-item">
                  <FaIdCard className="icon"/>
                  <div className="content">
                    <div className="label">Patient ID</div>
                    <div className="value">{patient.patientId}</div>
                  </div>
                </div>
                <div className="summary-item">
                  <FaBirthdayCake className="icon"/>
                  <div className="content">
                    <div className="label">Age</div>
                    <div className="value">{patient.age}</div>
                  </div>
                </div>
                <div className="summary-item">
                  <FaVenusMars className="icon"/>
                  <div className="content">
                    <div className="label">Gender</div>
                    <div className="value">{patient.gender}</div>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="section-heading">Previous Reports</h2>
              <div className="reports-list">
                {patient.reports && patient.reports.length > 0 ? patient.reports.map((report, i) => (
                  <div className="report-item" key={i}>
                    <div className="report-info">
                      <div className="title">{report.title}</div>
                      <div className="date">Date: {report.date}</div>
                    </div>
                    <a href={report.url} className="download-btn" download>
                      <FaFileDownload /> Download
                    </a>
                  </div>
                )) : (
                  <div className="no-reports">
                    <FaFileDownload style={{ fontSize: '3rem', color: '#CBD5E1', marginBottom: '16px' }} />
                    <p>No reports found for this patient.</p>
                  </div>
                )}
              </div>
            </section>

            <div className="page-actions">
              <button
                className="upload-btn"
                onClick={() => navigate(`/upload_gene/${patient._id}`)}
              >
                <FaUpload /> Upload New Gene Data
              </button>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default PatientDetails;
