import React, { useState, useRef } from 'react';
import { uploadResume, analyzeResume } from '../services/apiService';
import { SAMPLE_RESUMES } from '../data/mockData';
import { ResumeAnalysisResult } from '../types';

interface ResumeUploadPageProps {
  onAnalysisComplete: (result: ResumeAnalysisResult) => void;
  onNavigate: (page: string) => void;
  currentAnalysis: ResumeAnalysisResult | null;
}

export const ResumeUploadPage: React.FC<ResumeUploadPageProps> = ({
  onAnalysisComplete,
  onNavigate,
  currentAnalysis,
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileDetails, setFileDetails] = useState<{
    fileName: string;
    fileSize: string;
    status: string;
    rawText?: string;
  } | null>(
    currentAnalysis
      ? {
          fileName: currentAnalysis.fileName,
          fileSize: currentAnalysis.fileSize,
          status: 'Previously Analyzed',
        }
      : null
  );

  const [isDragOver, setIsDragOver] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisStep, setAnalysisStep] = useState<string>('');
  const [analysisSuccessMsg, setAnalysisSuccessMsg] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileProcess = async (file: File) => {
    setErrorMessage(null);
    setAnalysisSuccessMsg(null);

    const validExtensions = ['.pdf', '.docx', '.doc', '.txt'];
    const hasValidExt = validExtensions.some((ext) => file.name.toLowerCase().endsWith(ext));

    if (!hasValidExt) {
      setErrorMessage('Unsupported file format. Please upload a PDF or DOCX resume.');
      return;
    }

    try {
      setIsUploading(true);
      setUploadProgress(0);
      const res = await uploadResume(file, (progress) => {
        setUploadProgress(progress);
      });
      setIsUploading(false);

      setSelectedFile(file);
      setFileDetails({
        fileName: res.fileName,
        fileSize: res.fileSize,
        status: 'Ready for Analysis',
        rawText: res.extractedText,
      });
    } catch (err: any) {
      setIsUploading(false);
      setErrorMessage(err.message || 'Error processing uploaded file. Please try again.');
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileProcess(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFileProcess(e.target.files[0]);
    }
  };

  // Sample Resume Quick Preset Selector
  const handleSelectSamplePreset = (sampleId: string) => {
    setErrorMessage(null);
    setAnalysisSuccessMsg(null);
    const sample = SAMPLE_RESUMES.find((s) => s.id === sampleId);
    if (!sample) return;

    setSelectedFile(null);
    setFileDetails({
      fileName: sample.fileName,
      fileSize: sample.fileSize,
      status: 'Ready for Analysis (Sample Preset)',
      rawText: sample.content,
    });
  };

  const handleStartAnalysis = async () => {
    if (!fileDetails) {
      setErrorMessage('Please select or upload a resume file first.');
      return;
    }

    setErrorMessage(null);
    setAnalysisSuccessMsg(null);
    setIsAnalyzing(true);

    try {
      const result = await analyzeResume(
        {
          fileName: fileDetails.fileName,
          fileSize: fileDetails.fileSize,
          rawText: fileDetails.rawText,
        },
        (step) => setAnalysisStep(step)
      );

      setIsAnalyzing(false);
      setAnalysisSuccessMsg('Resume analysis completed successfully.');
      onAnalysisComplete(result);
    } catch (err: any) {
      setIsAnalyzing(false);
      setErrorMessage(err.message || 'An unexpected error occurred during resume analysis.');
    }
  };

  return (
    <div className="p-3 p-md-4 p-lg-5">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-4">
          <span className="badge bg-primary-subtle text-primary border border-primary-subtle rounded-pill px-3 py-1 font-monospace mb-2">
            NLP Ingestion Pipeline
          </span>
          <h2 className="fw-bold text-dark mb-1">Resume Analyzer & Ingestion</h2>
          <p className="text-secondary small">
            Upload your technical resume to parse skills, compute an explainable quality score, and generate target role roadmaps.
          </p>
        </div>

        {/* Error Notification */}
        {errorMessage && (
          <div className="alert alert-danger py-3 px-4 rounded-3 mb-4 shadow-xs d-flex align-items-center gap-3">
            <i className="bi bi-exclamation-triangle-fill fs-5 text-danger flex-shrink-0"></i>
            <div className="flex-grow-1 small">{errorMessage}</div>
            <button
              className="btn-close small"
              onClick={() => setErrorMessage(null)}
            ></button>
          </div>
        )}

        {/* Success Notification */}
        {analysisSuccessMsg && (
          <div className="alert alert-success py-3 px-4 rounded-3 mb-4 shadow-xs d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center gap-2 small">
              <i className="bi bi-check-circle-fill fs-5 text-success"></i>
              <span className="fw-semibold">{analysisSuccessMsg}</span>
            </div>
            <div className="d-flex gap-2">
              <button
                onClick={() => onNavigate('analysis')}
                className="btn btn-sm btn-success rounded-pill px-3"
              >
                View Skills & Details
              </button>
              <button
                onClick={() => onNavigate('job-recommendations')}
                className="btn btn-sm btn-outline-success rounded-pill px-3"
              >
                View Job Roles
              </button>
            </div>
          </div>
        )}

        {/* Upload Card */}
        <div className="card p-4 p-md-5 bg-white border rounded-4 shadow-sm mb-4">
          {/* Hidden native input */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleInputChange}
            accept=".pdf,.docx,.doc,.txt"
            style={{ display: 'none' }}
          />

          {/* Drag & Drop Visual Zone */}
          <div
            className={`upload-drop-zone ${isDragOver ? 'drag-active' : ''}`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onClick={() => fileInputRef.current?.click()}
          >
            <div
              className="d-flex align-items-center justify-content-center bg-primary-subtle text-primary rounded-circle mx-auto mb-3"
              style={{ width: '70px', height: '70px' }}
            >
              <i className="bi bi-cloud-arrow-up-fill fs-2"></i>
            </div>
            <h4 className="fw-bold text-dark mb-1">Upload Your Resume</h4>
            <p className="text-secondary small mb-3">
              Drag and drop your file here, or click to browse
            </p>
            <span className="badge bg-light text-muted border px-3 py-1.5 rounded-pill font-monospace small mb-3">
              Supported formats: PDF, DOCX
            </span>
            <div>
              <button
                type="button"
                className="btn btn-primary px-4 py-2 rounded-pill fw-semibold shadow-xs"
                onClick={(e) => {
                  e.stopPropagation();
                  fileInputRef.current?.click();
                }}
              >
                <i className="bi bi-folder2-open me-2"></i>
                Choose Resume
              </button>
            </div>
          </div>

          {/* Upload Progress Indicator */}
          {isUploading && (
            <div className="mt-3">
              <div className="d-flex justify-content-between small text-muted mb-1">
                <span>Uploading file...</span>
                <span>{uploadProgress}%</span>
              </div>
              <div className="progress">
                <div
                  className="progress-bar progress-bar-striped progress-bar-animated bg-primary"
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
            </div>
          )}

          {/* Sample Preset Resumes for Easy Evaluation */}
          <div className="mt-4 pt-3 border-top">
            <div className="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-2">
              <span className="small fw-semibold text-dark">
                <i className="bi bi-magic text-warning me-1.5"></i> Or select a pre-calibrated sample resume for instant demonstration:
              </span>
              <span className="badge bg-light text-secondary border font-monospace" style={{ fontSize: '0.68rem' }}>
                1-Click Presets
              </span>
            </div>
            <div className="row g-2">
              {SAMPLE_RESUMES.map((sample) => (
                <div className="col-md-4" key={sample.id}>
                  <button
                    type="button"
                    onClick={() => handleSelectSamplePreset(sample.id)}
                    className="btn btn-outline-light text-start p-2.5 rounded-3 border w-100 h-100 d-flex flex-column justify-content-between text-dark card-lift"
                  >
                    <div>
                      <div className="d-flex align-items-center gap-1.5 mb-1">
                        <i className="bi bi-file-earmark-code text-primary"></i>
                        <span className="fw-semibold small text-truncate">{sample.targetRole}</span>
                      </div>
                      <p className="text-muted small mb-0" style={{ fontSize: '0.72rem' }}>
                        {sample.description}
                      </p>
                    </div>
                    <span className="badge bg-primary-subtle text-primary border border-primary-subtle mt-2 font-monospace align-self-start" style={{ fontSize: '0.65rem' }}>
                      Load {sample.fileSize}
                    </span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Selected File Details & Analyze Action */}
        {fileDetails && (
          <div className="card p-4 bg-white border rounded-4 shadow-sm mb-4">
            <h5 className="fw-bold text-dark mb-3">Resume Information Ready</h5>
            <div className="row g-3 align-items-center">
              <div className="col-md-4">
                <span className="text-muted small d-block">File Name:</span>
                <span className="fw-semibold text-dark small text-truncate d-block font-monospace">
                  <i className="bi bi-file-earmark-text text-primary me-1"></i>
                  {fileDetails.fileName}
                </span>
              </div>
              <div className="col-md-3">
                <span className="text-muted small d-block">File Size:</span>
                <span className="fw-semibold text-dark small">{fileDetails.fileSize}</span>
              </div>
              <div className="col-md-5">
                <span className="text-muted small d-block">Upload Status:</span>
                <span className="badge bg-success-subtle text-success border border-success-subtle px-2.5 py-1 rounded-pill small">
                  <i className="bi bi-check2-circle me-1"></i> {fileDetails.status}
                </span>
              </div>
            </div>

            {/* Analysis Loading Animation */}
            {isAnalyzing && (
              <div className="mt-4 p-3 bg-light rounded-3 border">
                <div className="d-flex align-items-center gap-3 mb-2">
                  <div className="spinner-border text-primary spinner-border-sm" role="status">
                    <span className="visually-hidden">Analyzing...</span>
                  </div>
                  <span className="fw-bold text-dark small">Analyzing your resume...</span>
                </div>
                <div className="progress mb-2" style={{ height: '6px' }}>
                  <div className="progress-bar progress-bar-striped progress-bar-animated bg-primary w-100"></div>
                </div>
                <div className="text-muted font-monospace small" style={{ fontSize: '0.78rem' }}>
                  <i className="bi bi-gear-fill me-1 text-primary"></i> Current step: {analysisStep}
                </div>
              </div>
            )}

            {/* Analyze Action Button */}
            {!isAnalyzing && (
              <div className="mt-4 d-flex justify-content-end gap-2 border-top pt-3">
                <button
                  onClick={() => {
                    setSelectedFile(null);
                    setFileDetails(null);
                    setAnalysisSuccessMsg(null);
                  }}
                  className="btn btn-outline-secondary rounded-pill px-3 py-2 small"
                >
                  Clear File
                </button>
                <button
                  onClick={handleStartAnalysis}
                  className="btn btn-primary rounded-pill px-4 py-2 fw-semibold shadow-xs d-flex align-items-center gap-2"
                >
                  <i className="bi bi-lightning-charge-fill"></i>
                  <span>Analyze Resume</span>
                </button>
              </div>
            )}
          </div>
        )}

        {/* Backend Endpoint Specification Info Box */}
        <div className="p-3 bg-light rounded-3 border text-secondary small">
          <div className="d-flex align-items-center gap-2 mb-1">
            <i className="bi bi-info-circle-fill text-primary"></i>
            <span className="fw-bold text-dark">ASP.NET Core & FastAPI API Integration Protocol:</span>
          </div>
          <p className="mb-0 text-muted" style={{ fontSize: '0.8rem' }}>
            Uploading dispatches a <code className="text-primary">multipart/form-data</code> POST payload to <code className="text-dark">/api/resume/upload</code> on ASP.NET Core, which triggers asynchronous NLP entity extraction on the Python FastAPI service (<code className="text-dark">/api/ai/extract-skills</code>) before storing JSON metadata into MongoDB.
          </p>
        </div>
      </div>
    </div>
  );
};
