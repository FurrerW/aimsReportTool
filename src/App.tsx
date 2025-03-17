import React, { useState, useRef } from "react";
import { toPng } from "html-to-image";
import { ClipboardList, Flag, Download } from "lucide-react";

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
            <Flag className="size-10 text-accent" />
            <h1>AIMS Incident Report Generator</h1>
          </div>
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <section className="bg-muted rounded-lg border border-border p-6 space-y-4">
            <div className="flex items-center gap-2">
              <ClipboardList className="size-8 text-accent" />
              <h2>Report Details</h2>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="reportingDriver" className="required">
                  Reporting Driver
                </label>
                <input
                  id="reportingDriver"
                  minLength={3}
                  name="reportingDriver"
                  onChange={handleInputChange}
                  placeholder="Yuma #42"
                  required
                  type="text"
                  value={report.reportingDriver}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="driversInvolved" className="required">
                  Drivers Involved
                </label>
                <input
                  id="driversInvolved"
                  minLength={3}
                  name="driversInvolved"
                  onChange={handleInputChange}
                  placeholder="Yuma #42, Delpes #NeverForget, and Cpl"
                  required
                  type="text"
                  value={report.driversInvolved}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="raceInfo" className="required">
                  Race Info
                </label>
                <input
                  id="raceInfo"
                  minLength={3}
                  name="raceInfo"
                  onChange={handleInputChange}
                  placeholder="Race name, date, track, etc."
                  required
                  type="text"
                  value={report.raceInfo}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="incidentDescription" className="required">
                  Incident Description
                </label>
                <textarea
                  id="incidentDescription"
                  minLength={12}
                  name="incidentDescription"
                  onChange={handleInputChange}
                  placeholder="It was just an inchident"
                  required
                  rows={4}
                  value={report.incidentDescription}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="rulingDecision" className="required">
                  Ruling Decision
                </label>
                <input
                  id="rulingDecision"
                  minLength={3}
                  name="rulingDecision"
                  onChange={handleInputChange}
                  placeholder="10 points to Gryffindor!"
                  required
                  type="text"
                  value={report.rulingDecision}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="explanation" className="required">
                  Explanation
                </label>
                <textarea
                  id="explanation"
                  minLength={12}
                  name="explanation"
                  onChange={handleInputChange}
                  placeholder="Supreme Leader Tony says so"
                  required
                  rows={4}
                  value={report.explanation}
                />
              </div>
            </div>
          </section>

          {/* Generated Report */}
          <section
            className="bg-muted rounded-lg border border-border p-6"
            ref={reportRef}
          >
            <header className="mb-6 grid gap-2">
              <div className="flex items-center gap-2">
                <Flag className="size-8 text-accent" />
                <h2>AIMS Racing Incident Report</h2>
              </div>
              <p>Report Date: {new Date().toLocaleDateString()}</p>
            </header>

            <section className="space-y-4">
              <div>
                <h3 className="report-label">REPORTING DRIVER</h3>
                <p className="text-foreground">
                  {report.reportingDriver || "Not specified"}
                </p>
              </div>

              <div>
                <h3 className="report-label">DRIVERS INVOLVED</h3>
                <p className="text-foreground">
                  {report.driversInvolved || "Not specified"}
                </p>
              </div>

              <div>
                <h3 className="report-label">RACE INFORMATION</h3>
                <p className="text-foreground">
                  {report.raceInfo || "Not specified"}
                </p>
              </div>

              <div>
                <h3 className="report-label">INCIDENT DESCRIPTION</h3>
                <p className="text-foreground whitespace-pre-line">
                  {report.incidentDescription || "Not specified"}
                </p>
              </div>

              <div>
                <h3 className="report-label">RULING DECISION</h3>
                <p className="text-foreground">
                  {report.rulingDecision || "Not specified"}
                </p>
              </div>

              <div>
                <h3 className="report-label">EXPLANATION</h3>
                <p className="text-foreground whitespace-pre-line">
                  {report.explanation || "Not specified"}
                </p>
              </div>
            </section>
          </section>

          <button
            onClick={handleExport}
            className="w-full flex items-center justify-center gap-2 bg-accent text-accentForeground py-2 px-4 rounded-md hover:bg-accent/80 active:bg-accent/70 transition-colors"
          >
            <Download className="size-5" />
            Export as Image
          </button>
        </main>
      </div>
    </div>
  );
}

export default App;
