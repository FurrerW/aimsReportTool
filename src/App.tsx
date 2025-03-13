import React, { useState, useRef } from 'react';
import { toPng } from 'html-to-image';
import { Flag, Download, FlagTriangleRight } from 'lucide-react';

interface IncidentReport {
  reportingDriver: string;
  driversInvolved: string;
  raceInfo: string;
  incidentDescription: string;
  rulingDecision: string;
  explanation: string;
}

function App() {
  const [report, setReport] = useState<IncidentReport>({
    reportingDriver: '',
    driversInvolved: '',
    raceInfo: '',
    incidentDescription: '',
    rulingDecision: '',
    explanation: ''
  });

  const reportRef = useRef<HTMLDivElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setReport(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleExport = async () => {
    if (reportRef.current) {
      const dataUrl = await toPng(reportRef.current, { quality: 1.0 });
      const link = document.createElement('a');
      link.download = 'AIMS-Incident-Report.png';
      link.href = dataUrl;
      link.click();
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-center mb-8 gap-3">
          <FlagTriangleRight className="h-8 w-8 text-red-600" />
          <h1 className="text-3xl font-bold text-gray-800">AIMS Incident Report Generator</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Report Details</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Reporting Driver
                </label>
                <input
                  type="text"
                  name="reportingDriver"
                  value={report.reportingDriver}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Drivers Involved
                </label>
                <input
                  type="text"
                  name="driversInvolved"
                  value={report.driversInvolved}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Race Info
                </label>
                <input
                  type="text"
                  name="raceInfo"
                  value={report.raceInfo}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Incident Description
                </label>
                <textarea
                  name="incidentDescription"
                  value={report.incidentDescription}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Ruling Decision
                </label>
                <input
                  type="text"
                  name="rulingDecision"
                  value={report.rulingDecision}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Explanation
                </label>
                <textarea
                  name="explanation"
                  value={report.explanation}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Generated Report */}
          <div>
            <div className="bg-white rounded-lg shadow-md p-6 mb-4" ref={reportRef}>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <Flag className="h-6 w-6 text-red-600" />
                  <h2 className="text-2xl font-bold">AIMS Racing Incident Report</h2>
                </div>
                <div className="text-sm text-gray-500">
                  {new Date().toLocaleDateString()}
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-semibold text-gray-600">REPORTING DRIVER</h3>
                  <p className="text-gray-800">{report.reportingDriver || 'Not specified'}</p>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-gray-600">DRIVERS INVOLVED</h3>
                  <p className="text-gray-800">{report.driversInvolved || 'Not specified'}</p>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-gray-600">RACE INFORMATION</h3>
                  <p className="text-gray-800">{report.raceInfo || 'Not specified'}</p>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-gray-600">INCIDENT DESCRIPTION</h3>
                  <p className="text-gray-800 whitespace-pre-line">{report.incidentDescription || 'Not specified'}</p>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-gray-600">RULING DECISION</h3>
                  <p className="text-gray-800">{report.rulingDecision || 'Not specified'}</p>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-gray-600">EXPLANATION</h3>
                  <p className="text-gray-800 whitespace-pre-line">{report.explanation || 'Not specified'}</p>
                </div>
              </div>
            </div>

            <button
              onClick={handleExport}
              className="w-full flex items-center justify-center gap-2 bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition-colors"
            >
              <Download className="h-5 w-5" />
              Export as Image
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;