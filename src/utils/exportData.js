import FileSaver from "file-saver";
import Papa from "papaparse";
import jsPDF from "jspdf";
import "jspdf-autotable";

/**
 * Exports data as CSV dynamically based on the provided data and filename.
 * @param {Array} data - The array of objects to export.
 * @param {String} filename - The name of the file (without extension).
 */
export const exportToCSV = (data, filename = "exported_data") => {
  if (!data || data.length === 0) {
    alert("No data available to export.");
    return;
  }

  // Convert JSON to CSV format
  const csvData = Papa.unparse(data);

  // Create a Blob and trigger download
  const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
  FileSaver.saveAs(blob, `${filename}_${new Date().toISOString()}.csv`);
};

/**
 * Exports data as a PDF dynamically based on the provided data.
 * @param {Array} data - The array of objects to export.
 * @param {String} filename - The name of the file (without extension).
 */
export const exportToPDF = (data, filename = "exported_data") => {
  if (!data || data.length === 0) {
    alert("No data available to export.");
    return;
  }

  const doc = new jsPDF();
  const headers = Object.keys(data[0]);
  const rows = data.map((item) => headers.map((header) => item[header] || ""));

  doc.text("Exported Data", 14, 15);
  doc.autoTable({
    startY: 20,
    head: [headers],
    body: rows,
  });

  doc.save(`${filename}_${new Date().toISOString()}.pdf`);
};
