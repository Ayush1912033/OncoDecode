import React, { useState, useRef } from 'react';
import { FaCloudUploadAlt, FaCheckCircle, FaArrowLeft, FaFileCsv } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';

const OncoCodeLogo = () => (
  <svg width="40" height="40" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M45 5C22.9086 5 5 22.9086 5 45V45H45V5Z" stroke="#1E3A8A" strokeWidth="6"/>
    <path d="M55 5H95V45H55V5Z" stroke="#1E3A8A" strokeWidth="6"/>
    <path d="M5 55H45V95H5V55Z" stroke="#1E3A8A" strokeWidth="6"/>
    <path d="M55 95C77.0914 95 95 77.0914 95 55V55H55V95Z" stroke="#1E3A8A" strokeWidth="6"/>
  </svg>
);

const UploadGeneStyles = `
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

  #upload-gene-page {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    padding: 20px;
  }

  .upload-gene-container {
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

  .upload-gene-header {
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

  .dropzone {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 60px 40px;
    border: 2px dashed #CBD5E1;
    border-radius: 16px;
    background: linear-gradient(135deg, #F8FAFC 0%, #F1F5F9 100%);
    color: #64748B;
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
  }

  .dropzone::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(6, 182, 212, 0.05) 0%, rgba(30, 58, 138, 0.05) 100%);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  .dropzone:hover, .dropzone.drag-over {
    border-color: #1E3A8A;
    background: linear-gradient(135deg, #FFFFFF 0%, #F8FAFC 100%);
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(30, 58, 138, 0.15);
  }

  .dropzone:hover::before, .dropzone.drag-over::before {
    opacity: 1;
  }

  .dropzone-icon {
    font-size: 4rem;
    color: #06B6D4;
    margin-bottom: 20px;
    background: linear-gradient(135deg, #06B6D4 0%, #0891B2 100%);
    border-radius: 50%;
    padding: 20px;
    box-shadow: 0 4px 12px rgba(6, 182, 212, 0.3);
  }

  .dropzone p {
    margin: 0 0 8px 0;
    font-size: 1.25rem;
    font-weight: 600;
    color: #0F172A;
  }

  .dropzone span {
    font-size: 0.875rem;
    color: #64748B;
    font-weight: 400;
  }

  .file-requirements {
    margin-top: 16px;
    padding: 12px 20px;
    background: #F1F5F9;
    border-radius: 8px;
    font-size: 0.75rem;
    color: #475569;
    text-align: center;
  }

  .file-status-section {
    margin-top: 40px;
  }

  .file-status-section h2 {
    font-size: 1.25rem;
    font-weight: 600;
    color: #374151;
    margin-bottom: 20px;
    padding-bottom: 8px;
    border-bottom: 2px solid #E2E8F0;
  }

  .file-status {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 24px;
    background: linear-gradient(135deg, #F0FDF4 0%, #DCFCE7 100%);
    border: 1px solid #86EFAC;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(34, 197, 94, 0.1);
  }

  .status-icon {
    font-size: 1.5rem;
    color: #16A34A;
    background: #FFFFFF;
    border-radius: 50%;
    padding: 8px;
  }

  .status-content {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .status-text {
    font-size: 1rem;
    font-weight: 600;
    color: #166534;
  }

  .status-info {
    font-size: 0.875rem;
    color: #4ADE80;
    font-weight: 500;
  }

  .file-details {
    margin-top: 16px;
    padding: 16px;
    background: #FFFFFF;
    border-radius: 8px;
    border: 1px solid #E2E8F0;
  }

  .file-detail-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 0;
    border-bottom: 1px solid #F1F5F9;
  }

  .file-detail-item:last-child {
    border-bottom: none;
  }

  .file-detail-label {
    font-size: 0.875rem;
    color: #64748B;
    font-weight: 500;
  }

  .file-detail-value {
    font-size: 0.875rem;
    color: #0F172A;
    font-weight: 600;
  }

  .proceed-btn {
    display: flex;
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
    margin-top: 40px;
    transition: all 0.3s ease;
    box-shadow: 0 4px 12px rgba(30, 58, 138, 0.3);
    justify-content: center;
  }

  .proceed-btn:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(30, 58, 138, 0.4);
  }

  .proceed-btn:disabled {
    background: #CBD5E1;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
    color: #94A3B8;
  }

  .loading-spinner {
    width: 20px;
    height: 20px;
    border: 2px solid #FFFFFF;
    border-top: 2px solid transparent;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  @media (max-width: 768px) {
    .upload-gene-container {
      padding: 24px;
      margin: 0 16px;
    }

    .upload-gene-header {
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

    .dropzone {
      padding: 40px 20px;
    }

    .dropzone-icon {
      font-size: 3rem;
      padding: 16px;
    }

    .file-status {
      flex-direction: column;
      align-items: flex-start;
      gap: 12px;
    }
  }
`;

const UploadGene = () => {
  const { id } = useParams();   // 👈 patientId from URL
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  const handleFile = (selectedFile) => {
    if (selectedFile && selectedFile.type === 'text/csv' && selectedFile.size <= 100 * 1024 * 1024) {
      setFile(selectedFile);
    } else {
      setFile(null);
      alert('Invalid file. Please upload a .csv file under 100MB.');
    }
  };

  const handleFileSelect = (e) => handleFile(e.target.files[0]);

  const handleUpload = async () => {
    if (!file) return;

    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("patientId", id);  // ✅ Send patientId to backend

    try {
      const res = await fetch("http://localhost:5001/predict", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      console.log("✅ Predictions:", data);

      if (!res.ok) throw new Error(data.error || "Prediction failed");

      // ✅ Redirect to prediction results with patientId
      navigate(`/prediction_result/${id}`);
    } catch (err) {
      console.error("Upload Error:", err);
      alert("Upload failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <>
      <style>{UploadGeneStyles}</style>
      <div id="upload-gene-page">
        <div className="upload-gene-container">
          <header className="upload-gene-header">
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
                <h1>Upload Gene Data</h1>
                <p>Upload gene expression data for AI-powered cancer classification</p>
              </div>
            </div>

            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileSelect}
              style={{ display: 'none' }}
              accept=".csv"
            />
            <div
              className={`dropzone ${isDragOver ? 'drag-over' : ''}`}
              onClick={() => fileInputRef.current.click()}
              onDrop={(e) => {
                e.preventDefault();
                setIsDragOver(false);
                handleFile(e.dataTransfer.files[0]);
              }}
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragOver(true);
              }}
              onDragLeave={(e) => {
                e.preventDefault();
                setIsDragOver(false);
              }}
            >
              <FaCloudUploadAlt className="dropzone-icon" />
              <p>Drag & drop your CSV file here</p>
              <span>or click to browse your files</span>
              <div className="file-requirements">
                Supported format: CSV files up to 100MB
              </div>
            </div>

            {file && (
              <div className="file-status-section">
                <h2>File Status</h2>
                <div className="file-status">
                  <FaCheckCircle className="status-icon" />
                  <div className="status-content">
                    <div className="status-text">File Successfully Uploaded</div>
                    <div className="status-info">Ready for analysis</div>
                  </div>
                </div>
                <div className="file-details">
                  <div className="file-detail-item">
                    <span className="file-detail-label">File Name:</span>
                    <span className="file-detail-value">{file.name}</span>
                  </div>
                  <div className="file-detail-item">
                    <span className="file-detail-label">File Size:</span>
                    <span className="file-detail-value">{formatFileSize(file.size)}</span>
                  </div>
                  <div className="file-detail-item">
                    <span className="file-detail-label">File Type:</span>
                    <span className="file-detail-value">{file.type || 'text/csv'}</span>
                  </div>
                </div>
              </div>
            )}

            <button
              className="proceed-btn"
              disabled={!file || loading}
              onClick={handleUpload}
            >
              {loading ? (
                <>
                  <div className="loading-spinner"></div>
                  Processing Gene Data...
                </>
              ) : (
                <>
                  <FaFileCsv />
                  Start Classification
                </>
              )}
            </button>
          </main>
        </div>
      </div>
    </>
  );
};

export default UploadGene;
