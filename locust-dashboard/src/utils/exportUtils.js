import * as htmlToImage from "html-to-image";
import jsPDF from "jspdf";
import * as XLSX from "xlsx";

export const exportAsPDF = async (elementId, fileName = "export.pdf") => {
  const element = document.getElementById(elementId);
  const image = await htmlToImage.toPng(element);
  const pdf = new jsPDF("p", "mm", "a4");
  pdf.addImage(image, "PNG", 10, 10, 190, 270);
  pdf.save(fileName);
};

export const exportAsExcel = (jsonData, fileName = "export.xlsx") => {
  const worksheet = XLSX.utils.json_to_sheet(jsonData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
  XLSX.writeFile(workbook, fileName);
};

export const exportAsCSV = (jsonData, fileName = "export.csv") => {
  const worksheet = XLSX.utils.json_to_sheet(jsonData);
  const csv = XLSX.utils.sheet_to_csv(worksheet);
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.setAttribute("download", fileName);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const exportAsJSON = (jsonData, fileName = "export.json") => {
  const blob = new Blob([JSON.stringify(jsonData, null, 2)], { type: "application/json" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.setAttribute("download", fileName);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
