// components/PDFExport.js
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { Button } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";

const selectedFields = ["users", "rps", "failures", "duration", "status"];

const PDFExport = ({ metrics, theme = "light" }) => {
  const exportPDF = async () => {
    const doc = new jsPDF("p", "pt", "a4");
    
    // Add logo/header
    const headerImage = new Image();
    headerImage.src = "/logo.png"; // Replace with your local logo file or public URL
    await new Promise((resolve) => {
      headerImage.onload = () => {
        doc.addImage(headerImage, "PNG", 40, 30, 100, 40);
        resolve();
      };
    });

    doc.setFontSize(16);
    doc.setTextColor(theme === "dark" ? "#FFFFFF" : "#000000");
    doc.text("Performance Report", 40, 90);

    doc.setFontSize(12);
    let y = 130;
    selectedFields.forEach((key) => {
      const label = key.charAt(0).toUpperCase() + key.slice(1);
      const value = metrics[key] ?? "N/A";
      doc.text(`${label}: ${value}`, 40, y);
      y += 30;
    });

    // Footer
    doc.setFontSize(10);
    doc.text(`Generated on: ${new Date().toLocaleString()}`, 40, y + 20);

    // Background color (optional)
    if (theme === "dark") {
      doc.setFillColor("#1e1e1e");
      doc.rect(0, 0, doc.internal.pageSize.getWidth(), doc.internal.pageSize.getHeight(), "F");
      doc.setTextColor("#FFFFFF");
    }

    doc.save("Locust_Report.pdf");
  };

  return (
    <Button
      variant="contained"
      color="primary"
      startIcon={<DownloadIcon />}
      onClick={exportPDF}
      sx={{ mt: 2 }}
    >
      Export PDF
    </Button>
  );
};

export default PDFExport;
