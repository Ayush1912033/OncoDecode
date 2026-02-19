import React, { useState, useEffect } from 'react';
import { FaUserMd, FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const OncoCodeLogo = () => (
  <svg width="40" height="40" viewBox="0 0 100 100" fill="none">
    <path d="M45 5C22.9086 5 5 22.9086 5 45H45V5Z" stroke="#1E3A8A" strokeWidth="6"/>
    <path d="M55 5H95V45H55V5Z" stroke="#1E3A8A" strokeWidth="6"/>
    <path d="M5 55H45V95H5V55Z" stroke="#1E3A8A" strokeWidth="6"/>
    <path d="M55 95C77.0914 95 95 77.0914 95 55H55V95Z" stroke="#1E3A8A" strokeWidth="6"/>
  </svg>
);

const SearchPatientStyles = `
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

  #search-patient-page {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    padding: 20px;
  }

  .search-patient-container {
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

  .search-patient-header {
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

  .page-title h1 {
    font-size: 3rem;
    font-weight: 700;
    color: #0F172A;
    margin: 0 0 8px 0;
    letter-spacing: -0.025em;
  }

  .page-title p {
    font-size: 1.125rem;
    color: #64748B;
    margin: 0 0 40px 0;
    font-weight: 400;
  }

  .search-bar-wrapper {
    position: relative;
    margin-bottom: 40px;
  }

  .search-bar-wrapper .search-icon {
    position: absolute;
    left: 20px;
    top: 50%;
    transform: translateY(-50%);
    color: #94A3B8;
    font-size: 1.25rem;
  }

  .search-bar-wrapper input {
    width: 100%;
    padding: 20px 20px 20px 60px;
    border: 2px solid #E2E8F0;
    border-radius: 16px;
    font-size: 1.125rem;
    font-weight: 400;
    background-color: #F8FAFC;
    transition: all 0.3s ease;
    outline: none;
  }

  .search-bar-wrapper input:focus {
    border-color: #1E3A8A;
    box-shadow: 0 0 0 3px rgba(30, 58, 138, 0.1);
    background-color: #FFFFFF;
  }

  .search-bar-wrapper input::placeholder {
    color: #94A3B8;
  }

  .results-heading {
    font-size: 1.25rem;
    font-weight: 600;
    color: #374151;
    margin-bottom: 24px;
  }

  .results-list {
    display: flex;
    flex-direction: column;
    gap: 16px;
    max-height: 500px;
    overflow-y: auto;
  }

  .results-list::-webkit-scrollbar {
    width: 8px;
  }

  .results-list::-webkit-scrollbar-track {
    background: #F1F5F9;
    border-radius: 4px;
  }

  .results-list::-webkit-scrollbar-thumb {
    background: #CBD5E1;
    border-radius: 4px;
  }

  .results-list::-webkit-scrollbar-thumb:hover {
    background: #94A3B8;
  }

  .result-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 24px;
    border-radius: 16px;
    border: 1px solid #E2E8F0;
    background: #FFFFFF;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }

  .result-item:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15), 0 4px 10px rgba(0, 0, 0, 0.1);
    border-color: #1E3A8A;
  }

  .patient-details {
    display: flex;
    align-items: center;
    gap: 20px;
  }

  .patient-avatar {
    font-size: 48px;
    color: #06B6D4;
    background: linear-gradient(135deg, #06B6D4 0%, #0891B2 100%);
    border-radius: 50%;
    padding: 12px;
    box-shadow: 0 4px 6px rgba(6, 182, 212, 0.2);
  }

  .patient-info-left {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .patient-name {
    font-size: 1.25rem;
    font-weight: 700;
    color: #0F172A;
  }

  .patient-subtext {
    font-size: 0.875rem;
    color: #64748B;
    font-weight: 400;
  }

  .patient-info-right {
    text-align: right;
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .patient-id, .patient-age {
    font-size: 0.875rem;
    font-weight: 500;
    color: #475569;
  }

  .patient-id {
    color: #1E3A8A;
    font-weight: 600;
  }

  .skeleton {
    background: linear-gradient(90deg, #F1F5F9 25%, #E2E8F0 50%, #F1F5F9 75%);
    background-size: 200% 100%;
    animation: loading 1.5s infinite;
    border-radius: 8px;
  }

  @keyframes loading {
    0% { background-position: 200% 0; }
    100% { background-position: -200% 0; }
  }

  .skeleton-card {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 24px;
    border-radius: 16px;
    border: 1px solid #E2E8F0;
    background: #FFFFFF;
    margin-bottom: 16px;
  }

  .skeleton-avatar {
    width: 48px;
    height: 48px;
    border-radius: 50%;
  }

  .skeleton-text {
    height: 16px;
    width: 120px;
    margin-bottom: 8px;
  }

  .skeleton-text:last-child {
    width: 80px;
    margin-bottom: 0;
  }

  .empty-state {
    text-align: center;
    padding: 80px 40px;
    color: #64748B;
  }

  .empty-state-icon {
    font-size: 4rem;
    color: #CBD5E1;
    margin-bottom: 24px;
  }

  .empty-state-title {
    font-size: 1.5rem;
    font-weight: 600;
    color: #374151;
    margin-bottom: 8px;
  }

  .empty-state-description {
    font-size: 1rem;
    color: #64748B;
  }

  @media (max-width: 768px) {
    .search-patient-container {
      padding: 24px;
      margin: 0 16px;
    }

    .search-patient-header {
      flex-direction: column;
      gap: 20px;
      text-align: center;
    }

    .main-nav {
      gap: 24px;
    }

    .page-title h1 {
      font-size: 2.25rem;
    }

    .result-item {
      flex-direction: column;
      align-items: flex-start;
      gap: 16px;
    }

    .patient-info-right {
      text-align: left;
      flex-direction: row;
      gap: 16px;
    }
  }

  @media (max-width: 480px) {
    .page-title h1 {
      font-size: 1.875rem;
    }

    .search-bar-wrapper input {
      font-size: 1rem;
      padding: 16px 16px 16px 50px;
    }

    .search-bar-wrapper .search-icon {
      left: 16px;
      font-size: 1.125rem;
    }

    .result-item {
      padding: 20px;
    }

    .patient-avatar {
      font-size: 40px;
      padding: 10px;
    }
  }
`;

const SearchPatient = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [patients, setPatients] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          navigate("/login");
          return;
        }

        const res = await fetch("http://localhost:5000/api/patients/me", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.status === 401) {
          localStorage.removeItem("token");
          navigate("/login");
          return;
        }

        const data = await res.json();

        setPatients(data);           // ✅ important fix
        setFilteredPatients(data);   // ✅ important fix
        setLoading(false);

      } catch (err) {
        console.error("Error fetching patients:", err);
      }
    };

    fetchPatients();
  }, [navigate]);

  useEffect(() => {
    const lowercasedTerm = searchTerm.toLowerCase();

    const results =
      searchTerm === ''
        ? patients
        : patients.filter(
            (p) =>
              (p.fullName && p.fullName.toLowerCase().includes(lowercasedTerm)) ||
              (p.patientId && p.patientId.toLowerCase().includes(lowercasedTerm))
          );

    setFilteredPatients(results);
  }, [searchTerm, patients]);

  return (
    <>
      <style>{SearchPatientStyles}</style>
      <div id="search-patient-page">
        <div className="search-patient-container">
          <header className="search-patient-header">
            <div className="logo-area">
              <OncoCodeLogo />
              <div>
                <div className="company-name">ONCODECODE</div>
                <div className="tagline">Precision Oncology, Simplified</div>
              </div>
            </div>
            <nav className="main-nav">
              <a href="/dashboard">Home</a>
              <a href="#">Settings</a>
              <a href="/login">Logout</a>
            </nav>
          </header>

          <main>
            <div className="page-title">
              <h1>Search Patient</h1>
              <p>Find and select an existing patient profile</p>
            </div>

            <div className="search-bar-wrapper">
              <FaSearch className="search-icon" />
              <input
                type="text"
                placeholder="Search by Patient ID or Name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="results-heading">Search Results</div>
            <div className="results-list">
              {loading ? (
                // Loading skeleton
                Array.from({ length: 5 }).map((_, index) => (
                  <div key={index} className="skeleton-card">
                    <div className="patient-details">
                      <div className="skeleton skeleton-avatar"></div>
                      <div className="patient-info-left">
                        <div className="skeleton skeleton-text"></div>
                        <div className="skeleton skeleton-text"></div>
                      </div>
                    </div>
                    <div className="patient-info-right">
                      <div className="skeleton skeleton-text"></div>
                      <div className="skeleton skeleton-text"></div>
                    </div>
                  </div>
                ))
              ) : filteredPatients.length > 0 ? (
                filteredPatients.map((patient) => (
                  <div
                    key={patient._id}
                    className="result-item"
                    onClick={() => navigate(`/patient/${patient._id}`)}
                  >
                    <div className="patient-details">
                      <FaUserMd className="patient-avatar" />
                      <div className="patient-info-left">
                        <div className="patient-name">{patient.fullName}</div>
                        <div className="patient-subtext">
                          {patient.contactInfo || "No contact info"}
                        </div>
                      </div>
                    </div>
                    <div className="patient-info-right">
                      <div className="patient-id">ID: {patient.patientId}</div>
                      <div className="patient-age">Age: {patient.age || "N/A"}</div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="empty-state">
                  <FaUserMd className="empty-state-icon" />
                  <div className="empty-state-title">No patients found</div>
                  <div className="empty-state-description">
                    Try adjusting your search terms or add a new patient.
                  </div>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default SearchPatient;
