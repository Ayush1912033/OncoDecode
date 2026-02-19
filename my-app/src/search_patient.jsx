import React, { useState, useEffect } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const OncoCodeLogo = () => (
  <svg width="40" height="40" viewBox="0 0 100 100" fill="none">
    <path d="M45 5C22.9086 5 5 22.9086 5 45H45V5Z" stroke="#333" strokeWidth="6"/>
    <path d="M55 5H95V45H55V5Z" stroke="#333" strokeWidth="6"/>
    <path d="M5 55H45V95H5V55Z" stroke="#333" strokeWidth="6"/>
    <path d="M55 95C77.0914 95 95 77.0914 95 55H55V95Z" stroke="#333" strokeWidth="6"/>
  </svg>
);

const SearchPatientStyles = `
  body, html, #root { margin: 0; padding: 0; width: 100%; height: 100%; font-family: 'Segoe UI', sans-serif; }
  #search-patient-page { display: flex; justify-content: center; align-items: center; min-height: 100vh; background-color: #f4f7fa; padding: 20px; box-sizing: border-box; }
  .search-patient-container { width: 100%; max-width: 1100px; background: #fff; border-radius: 20px; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05); padding: 30px 40px; }
  .search-patient-header { display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #eee; padding-bottom: 20px; margin-bottom: 30px; }
  .logo-area { display: flex; align-items: center; gap: 15px; }
  .logo-area .company-name { font-size: 1.2rem; font-weight: 600; color: #333; }
  .logo-area .tagline { font-size: 0.8rem; color: #888; margin-top: 2px; }
  .main-nav a { text-decoration: none; color: #555; margin-left: 30px; font-weight: 500; }
  .page-title h1 { font-size: 2.5rem; color: #222; margin: 0; }
  .page-title p { font-size: 1rem; color: #777; margin: 5px 0 30px 0; }
  .search-bar-wrapper { position: relative; margin-bottom: 30px; }
  .search-bar-wrapper input { width: 100%; padding: 18px 20px 18px 60px; border: 1px solid #ddd; border-radius: 12px; font-size: 1.1rem; box-sizing: border-box; background-color: #f9f9f9; }
  .search-bar-wrapper input:focus { outline: none; border-color: #3b82f6; box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2); background-color: #fff; }
  .results-heading { font-size: 1.1rem; color: #666; margin-bottom: 20px; font-weight: 500; }
  .results-list { display: flex; flex-direction: column; gap: 10px; max-height: 300px; overflow-y: auto; }
  .result-item { display: flex; justify-content: space-between; align-items: center; padding: 15px; border-radius: 10px; border: 1px solid #f0f0f0; cursor: pointer; transition: all 0.2s ease; }
  .result-item:hover { background-color: #eef5ff; border-color: #3b82f6; }
  .patient-details { display: flex; align-items: center; gap: 15px; }
  .patient-avatar { font-size: 36px; color: #ccc; }
  .patient-name { font-weight: 600; color: #444; }
  .patient-subtext { font-size: 0.9rem; color: #888; }
  .patient-info { text-align: right; color: #555; font-weight: 500; font-size: 0.9rem; line-height: 1.4; }
  .no-results { text-align: center; color: #888; padding: 40px; }
`;

const SearchPatient = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [patients, setPatients] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState([]);

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
              <input
                type="text"
                placeholder="Search by Patient ID or Name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="results-heading">Search Results</div>
            <div className="results-list">
              {filteredPatients.length > 0 ? (
                filteredPatients.map((patient) => (
                  <div
                    key={patient._id}
                    className="result-item"
                    onClick={() => navigate(`/patient/${patient._id}`)}
                  >
                    <div className="patient-details">
                      <FaUserCircle className="patient-avatar" />
                      <div>
                        <div className="patient-name">{patient.fullName}</div>
                        <div className="patient-subtext">
                          {patient.contactInfo || "No contact info"}
                        </div>
                      </div>
                    </div>
                    <div className="patient-info">
                      <div>{patient.patientId}</div>
                      <div>Age: {patient.age || "N/A"}</div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="no-results">No patients found.</p>
              )}
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default SearchPatient;
