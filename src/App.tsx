import React, { useState, useRef } from "react";
import { toPng } from "html-to-image";
import { ClipboardList, Flag, Download, FlagTriangleRight } from "lucide-react";

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
    reportingDriver: "",
    driversInvolved: "",
    raceInfo: "",
    incidentDescription: "",
    rulingDecision: "",
    explanation: "",
  });

  const reportRef = useRef<HTMLDivElement>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setReport((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleExport = async () => {
    if (reportRef.current) {
      const dataUrl = await toPng(reportRef.current, { quality: 1.0 });
      const link = document.createElement("a");
      link.download = "AIMS-Incident-Report.png";
      link.href = dataUrl;
      link.click();
    }
  };

  return (
    <div className="">
      <div id="body-inner-container">
        <header className="py-8 flex items-center justify-center">
          <div className="flex items-center gap-2">
            <FlagTriangleRight className="h-8 w-8 text-accent" />
            <h1>AIMS Incident Report Generator</h1>
          </div>
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <section className="bg-muted rounded-lg outline outline-2 outline-zinc-600 p-6">
            <div className="flex items-center gap-2">
              <ClipboardList className="h-6 w-6 text-red-600" />
              <h2 className="text-xl font-semibold text-zinc-100 mb-4">
                Report Details
              </h2>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-zinc-100 mb-1">
                  Reporting Driver
                </label>
                <input
                  type="text"
                  name="reportingDriver"
                  value={report.reportingDriver}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 rounded-md"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-100 mb-1">
                  Drivers Involved
                </label>
                <input
                  type="text"
                  name="driversInvolved"
                  value={report.driversInvolved}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 rounded-md"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-100 mb-1">
                  Race Info
                </label>
                <input
                  type="text"
                  name="raceInfo"
                  value={report.raceInfo}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 rounded-md"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-100 mb-1">
                  Incident Description
                </label>
                <textarea
                  name="incidentDescription"
                  value={report.incidentDescription}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-3 py-2 rounded-md"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-100 mb-1">
                  Ruling Decision
                </label>
                <input
                  type="text"
                  name="rulingDecision"
                  value={report.rulingDecision}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 rounded-md"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-100 mb-1">
                  Explanation
                </label>
                <textarea
                  name="explanation"
                  value={report.explanation}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-3 py-2 rounded-md"
                />
              </div>
            </div>
          </section>

          {/* Generated Report */}
          <div>
            <div
              className="bg-zinc-700 rounded-lg border-2 border-zinc-600 p-6 mb-4"
              ref={reportRef}
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <Flag className="h-6 w-6 text-red-600" />
                  <h2 className="text-2xl font-bold text-zinc-100">
                    AIMS Racing Incident Report
                  </h2>
                </div>
                <div className="text-sm text-zinc-300">
                  {new Date().toLocaleDateString()}
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-semibold text-zinc-400">
                    REPORTING DRIVER
                  </h3>
                  <p className="text-zinc-100">
                    {report.reportingDriver || "Not specified"}
                  </p>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-zinc-400">
                    DRIVERS INVOLVED
                  </h3>
                  <p className="text-zinc-100">
                    {report.driversInvolved || "Not specified"}
                  </p>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-zinc-400">
                    RACE INFORMATION
                  </h3>
                  <p className="text-zinc-100">
                    {report.raceInfo || "Not specified"}
                  </p>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-zinc-400">
                    INCIDENT DESCRIPTION
                  </h3>
                  <p className="text-zinc-100 whitespace-pre-line">
                    {report.incidentDescription || "Not specified"}
                  </p>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-zinc-400">
                    RULING DECISION
                  </h3>
                  <p className="text-zinc-100">
                    {report.rulingDecision || "Not specified"}
                  </p>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-zinc-400">
                    EXPLANATION
                  </h3>
                  <p className="text-zinc-100 whitespace-pre-line">
                    {report.explanation || "Not specified"}
                  </p>
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
        </main>
      </div>
    </div>
  );
}

export default App;
