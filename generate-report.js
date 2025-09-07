const fs = require("fs");
const report = require("multiple-cucumber-html-reporter");

const jsonPath = "cucumber-report/report.json";
const reportDir = "reports";
const reportFile = `${reportDir}/cucumber-report.html`;

// Ensure report directory exists
if (!fs.existsSync(reportDir)) {
  fs.mkdirSync(reportDir, { recursive: true });
}

try {
  if (fs.existsSync(jsonPath)) {
    const raw = fs.readFileSync(jsonPath, "utf8");

    // Validate JSON before passing it to reporter
    let parsed;
    try {
      parsed = JSON.parse(raw);
    } catch (err) {
      console.error("❌ Invalid JSON in cucumber-report/report.json:", err.message);
      process.exit(0); // exit gracefully, don’t fail build
    }

    if (!Array.isArray(parsed)) {
      console.warn("⚠️ JSON is not an array, skipping report generation.");
      process.exit(0);
    }

    report.generate({
      jsonDir: "cucumber-report",
      reportPath: reportDir,
      reportName: "Playwright BDD Test Report",
      pageTitle: "BDD Report",
      metadata: {
        browser: { name: "chromium", version: "latest" },
        platform: { name: "CodeBuild" },
        parallel: "Scenarios",
      },
      customData: {
        title: "Run Info",
        data: [
          { label: "Generated on", value: new Date().toLocaleString() },
          { label: "Environment", value: process.env.ENV || "default" },
        ],
      },
    });

    console.log(`✅ HTML report generated at ${reportFile}`);
  } else {
    console.warn("⚠️ No JSON report found, skipping HTML report generation.");
  }
} catch (error) {
  console.error("❌ Report generation failed:", error.message);
  process.exit(0); // Don’t break the pipeline
}
