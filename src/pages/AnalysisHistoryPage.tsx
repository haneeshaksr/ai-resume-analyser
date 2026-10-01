import React, { useState, useEffect } from 'react';
import { getAnalysisHistory } from '../services/apiService';
import { AnalysisHistoryItem } from '../types';

interface AnalysisHistoryPageProps {
  onViewAnalysis: (historyItem: AnalysisHistoryItem) => void;
  onNavigate: (page: string) => void;
}

export const AnalysisHistoryPage: React.FC<AnalysisHistoryPageProps> = ({
  onViewAnalysis,
  onNavigate,
}) => {
  const [historyItems, setHistoryItems] = useState<AnalysisHistoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchFilter, setSearchFilter] = useState('');

  useEffect(() => {
    let isMounted = true;
    getAnalysisHistory().then((data) => {
      if (isMounted) {
        setHistoryItems(data);
        setIsLoading(false);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  const filtered = historyItems.filter((item) =>
    item.resumeName.toLowerCase().includes(searchFilter.toLowerCase()) ||
    item.topRole.toLowerCase().includes(searchFilter.toLowerCase())
  );

  return (
    <div className="p-3 p-md-4 p-lg-5">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-4 pb-3 border-bottom">
          <div>
            <div className="d-flex align-items-center gap-2 mb-1">
              <span className="badge bg-primary-subtle text-primary border border-primary-subtle rounded-pill font-monospace" style={{ fontSize: '0.72rem' }}>
                Historical Audit Log
              </span>
            </div>
            <h2 className="fw-bold text-dark mb-0">Analysis History</h2>
            <p className="text-secondary small mb-0 mt-1">
              Archive of uploaded resumes, computed quality scores, and career recommendation benchmarks.
            </p>
          </div>

          <div className="d-flex gap-2">
            <button
              onClick={() => onNavigate('upload')}
              className="btn btn-primary btn-sm rounded-pill px-3 py-2 fw-medium shadow-xs"
            >
              <i className="bi bi-cloud-arrow-up me-1"></i> New Resume Analysis
            </button>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="card p-3 bg-white border rounded-4 shadow-sm mb-4">
          <div className="row g-2 align-items-center">
            <div className="col-md-6">
              <div className="input-group">
                <span className="input-group-text bg-light border-end-0 text-muted">
                  <i className="bi bi-search small"></i>
                </span>
                <input
                  type="text"
                  className="form-control bg-light border-start-0 py-2 small"
                  placeholder="Filter by resume file name or matched role..."
                  value={searchFilter}
                  onChange={(e) => setSearchFilter(e.target.value)}
                />
              </div>
            </div>
            <div className="col-md-6 text-md-end text-muted small">
              Showing <strong>{filtered.length}</strong> historical analysis records
            </div>
          </div>
        </div>

        {/* Analysis History Table */}
        <div className="card bg-white border rounded-4 shadow-sm overflow-hidden">
          {isLoading ? (
            <div className="p-5 text-center">
              <div className="spinner-border text-primary" role="status"></div>
              <p className="text-muted small mt-2">Retrieving historical records from database...</p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="p-5 text-center text-muted">
              <i className="bi bi-inbox fs-2 d-block mb-2"></i>
              <p className="small mb-2">No historical records matching criteria.</p>
              <button
                onClick={() => onNavigate('upload')}
                className="btn btn-sm btn-outline-primary rounded-pill px-3"
              >
                Upload a Resume
              </button>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead className="table-light text-uppercase font-monospace" style={{ fontSize: '0.72rem' }}>
                  <tr>
                    <th scope="col" className="ps-4 py-3">Date</th>
                    <th scope="col" className="py-3">Resume</th>
                    <th scope="col" className="py-3">Score</th>
                    <th scope="col" className="py-3">Top Role</th>
                    <th scope="col" className="text-end pe-4 py-3">Action</th>
                  </tr>
                </thead>
                <tbody className="small">
                  {filtered.map((item) => (
                    <tr key={item.id}>
                      {/* Date */}
                      <td className="ps-4 py-3 text-secondary font-monospace">
                        <i className="bi bi-calendar3 text-muted me-1.5"></i>
                        {item.date}
                      </td>

                      {/* Resume Name */}
                      <td className="py-3">
                        <div className="d-flex align-items-center gap-2">
                          <i className="bi bi-file-earmark-pdf-fill text-danger fs-5"></i>
                          <div>
                            <span className="fw-semibold text-dark d-block">{item.resumeName}</span>
                            <span className="text-muted font-monospace" style={{ fontSize: '0.68rem' }}>{item.fileSize}</span>
                          </div>
                        </div>
                      </td>

                      {/* Score */}
                      <td className="py-3">
                        <span className="badge bg-primary-subtle text-primary border border-primary-subtle font-monospace px-2.5 py-1 rounded-pill fw-bold">
                          {item.score}/100
                        </span>
                      </td>

                      {/* Top Role */}
                      <td className="py-3">
                        <span className="fw-semibold text-dark d-block">{item.topRole}</span>
                        <span className="badge bg-light text-success border border-success-subtle font-monospace" style={{ fontSize: '0.68rem' }}>
                          Primary Fit
                        </span>
                      </td>

                      {/* Action */}
                      <td className="text-end pe-4 py-3">
                        <div className="d-inline-flex gap-2">
                          <button
                            onClick={() => onViewAnalysis(item)}
                            className="btn btn-sm btn-primary rounded-pill px-3 py-1 shadow-xs fw-medium"
                          >
                            <i className="bi bi-eye me-1"></i> View
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
