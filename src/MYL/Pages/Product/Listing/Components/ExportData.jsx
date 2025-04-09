// import html2canvas from "html2canvas";
// import jsPDF from "jspdf";
// import "jspdf-autotable";
// import FileSaver from "file-saver";
// import Papa from "papaparse";

// // Flatten object for PDF export
// const flattenObject = (obj, prefix = "") =>
//   Object.keys(obj).reduce((acc, key) => {
//     const pre = prefix ? `${prefix}_` : "";
//     if (typeof obj[key] === "object" && obj[key] !== null && !Array.isArray(obj[key])) {
//       Object.assign(acc, flattenObject(obj[key], pre + key));
//     } else {
//       acc[pre + key] = obj[key];
//     }
//     return acc;
//   }, {});

// // Different pickers per route
// const csvFieldPickers = {
//   "/collections": (data) =>
//     data.map((item) => ({
//       _id: item._id || "",
//       var_title: item.var_title || "",
//       var_image: item.var_image || item.imgs?.[0] || "",
//       fk_category: item.fk_category || "",
//       fk_subcategory: item.fk_subcategory || "",
//       fk_brand: item.fk_brand || "",
//       fk_tags: Array.isArray(item.fk_tags) ? item.fk_tags.join(", ") : item.fk_tags || "",
//       var_short_description: item.var_short_description || "",
//       var_min_quantity: item.var_min_quantity || "0",
//       var_color_code: item.var_color_code || "",
//       var_offer: item.var_offer || "",
//       var_price: item.var_price || item.price || "0",
//       var_slug: item.var_slug || "",
//       sku_id: item.sku_id || "",
//     })),

//   "/cart": (data) =>
//     data.map((item) => {
//       const rawPrice = item.selling_price || item.var_price || "0";
//       const unitPrice = rawPrice && !isNaN(rawPrice) ? parseFloat(rawPrice) : 0;
//       const quantity = item.cartItem || item.quantity || 1;
//       const totalPrice = unitPrice * quantity;

//       return {
//         product_title: item.title || item.var_title || "N/A",
//         quantity: quantity,
//         unit_price: unitPrice.toFixed(2),
//         total_price: totalPrice.toFixed(2),
//         sku_id: item.sku_id || "N/A",
//         _id: item._id || "N/A",
//         fk_category: item.fk_category || "N/A",
//         var_image: item.var_image || item.imgs?.[0] || "N/A",
//         var_price: unitPrice.toFixed(2),
//       };
//     }),

//   "/history": (data) =>
//   data.map((query) => {
//     const products = query.fk_product_arr || [];

//     const productDetails = products.map((p, i) => {
//       return `#${i + 1} ${p.fk_product_name || "N/A"} (SKU: ${p.sku || "N/A"}, Qty: ${p.quantity || 0}, Price: ${p.price || 0}, Total: ${p.total || 0})`;
//     }).join(" | ");

//     const total_quantity = products.reduce(
//       (acc, p) => acc + (Number(p.quantity || 0)), 0
//     );

//     const total_price = products.reduce(
//       (acc, p) => acc + (parseFloat(p.price || 0) * Number(p.quantity || 0)), 0
//     ).toFixed(2);

//     return {
//       order_id: query._id || "N/A",
//       customer_email: query.register_email || "N/A",
//       message: query.message || "",
//       created_date: new Date(query.dt_createddate).toLocaleString(),
//       status: query.status || "active",
//       total_quantity,
//       total_products: products.length,
//       total_price,
//       var_total_amount: query.var_total_amount || "0",
//       var_payable_amount: query.var_payable_amount || "0",
//       product_summary: productDetails,
//     };
//   }),

//   "/order-detail": (data) =>
//   data.map((item) => {
//     const rawPrice = item.price ? item.price.toString().trim() : "0";
//     const price = rawPrice && !isNaN(rawPrice) ? parseFloat(rawPrice) : 0;
//     const quantity = parseInt(item.quantity || 0);
//     const total_price = (price * quantity).toFixed(2);

//     return {
//       order_id: item.order_id || "N/A",
//       product_name: item.product_name || item.description || "N/A",
//       sku: item.sku || "N/A",
//       quantity: quantity,
//       unit_price: price.toFixed(2),
//       total_price: total_price,
//       status: item.status || "Pending",
//       order_date: item.orderDate || "",
//       image: item.imageUrl || "",
//       created_date: item.createdAt || "",
//     };
//   }),

//   "/product-details/id": (data) =>
//   data.map((item) => {
//     const variant = item?.Variant_details || {};
//     const rawPrice = variant.selling_price || item.selling_price || item.var_price || "0";
//     const unitPrice = parseFloat(rawPrice) || 0;
//     const quantity = parseInt(item.var_min_quantity || 50);
//     const totalPrice = unitPrice * quantity;

//     return {
//       _id: item._id || "",
//       var_title: item.var_title || "",
//       sku_id: item.sku_id || "",
//       fk_category: item.fk_category || "",
//       fk_subcategory: item.fk_subcategory || "",
//       fk_brand: item.fk_brand || "",
//       fk_tags: Array.isArray(item.fk_tags) ? item.fk_tags.join(", ") : item.fk_tags || "",
//       var_short_description: item.var_short_description || "",
//       var_min_quantity: quantity,
//       var_color_code: item.var_color_code || "",
//       var_offer: item.var_offer || "",
//       var_price: unitPrice.toFixed(2),
//       var_slug: item.var_slug || "",
//       product_image: item.var_image || item.imgs?.[0] || "",
//       unit_price: unitPrice.toFixed(2),
//       total_price: totalPrice.toFixed(2),
//       stock: variant.var_stock || item.var_stock || "N/A",
//       description: item.txt_description || item.txt_nutrition || "",
//       start_date: item.start_date || "",
//       end_date: item.end_date || "",
//       created_date: item.dt_createddate || "",
//     };
//   }),

// };

// export const exportToCSV = (data, filename = "export", currentRoute = "/") => {
//   if (!data || data.length === 0) {
//     alert("No data to export.");
//     return;
//   }

//   // Match the route key
//   const routeKey = Object.keys(csvFieldPickers).find((route) => currentRoute.includes(route));

//   if (!routeKey) {
//     console.warn("No matching route found for export:", currentRoute);
//   }

//   const selectedFields = routeKey ? csvFieldPickers[routeKey](data) : data;

//   const csv = Papa.unparse(selectedFields);
//   const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
//   FileSaver.saveAs(blob, `${filename}_${new Date().toISOString()}.csv`);
// };

// screenshot for pdf

// export const exportToPDF = (data, filename = "export") => {
//   if (!data || data.length === 0) return alert("No data to export.");

//   const doc = new jsPDF();
//   const flattened = data.map(flattenObject);
//   const headers = Object.keys(flattened[0]);
//   const rows = flattened.map((row) => headers.map((h) => row[h] ?? ""));

//   doc.setFontSize(16);
//   doc.text("Exported Data", 14, 15);
//   doc.autoTable({
//     startY: 20,
//     head: [headers],
//     body: rows,
//     styles: { fontSize: 8, cellPadding: 2 },
//     headStyles: {
//       fillColor: [0, 0, 0],
//       textColor: [255, 255, 255],
//       fontStyle: "bold",
//     },
//     alternateRowStyles: { fillColor: [245, 245, 245] },
//   });

//   doc.save(`${filename}_${new Date().toISOString()}.pdf`);
// };

// export const exportScreenshotPDF = async (elementId, filename = "screenshot_export") => {
//   const input = document.getElementById(elementId);

//   if (!input) {
//     alert("Export area not found.");
//     return;
//   }

//   try {
//     const canvas = await html2canvas(input, {
//       scale: 2,
//       useCORS: true,
//     });
//     const imgData = canvas.toDataURL("image/png");

//     const pdf = new jsPDF({
//       orientation: "portrait",
//       unit: "px",
//       format: [canvas.width, canvas.height],
//     });

//     pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
//     pdf.save(`${filename}_${new Date().toISOString()}.pdf`);
//   } catch (error) {
//     console.error("PDF Export Failed", error);
//     alert("Failed to generate PDF. Try again.");
//   }
// };



import jsPDF from "jspdf";
import "jspdf-autotable";
import Papa from "papaparse";
import FileSaver from "file-saver";

const currencySymbols = {
  USD: "$",
  INR: "Rs.",
  EUR: "EUR",
  GBP: "GBP",
  AUD: "AUD",
};



// ✅ Convert image URL to Base64
const convertImgToBase64 = (url) => {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.onload = () => {
      const canvas = document.createElement("canvas");

      // Increase canvas size for better quality
      const targetWidth = 200;
      const targetHeight = 200;
      canvas.width = targetWidth;
      canvas.height = targetHeight;

      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, targetWidth, targetHeight);

      resolve(canvas.toDataURL("image/jpeg", 1.0)); // Use full JPEG quality
    };
    img.onerror = () => resolve("");
    img.src = url;
  });
};


// Flatten nested objects (for PDF export)
const flattenObject = (obj, prefix = "") =>
  Object.keys(obj).reduce((acc, key) => {
    const pre = prefix ? `${prefix}_` : "";
    if (
      typeof obj[key] === "object" &&
      obj[key] !== null &&
      !Array.isArray(obj[key])
    ) {
      Object.assign(acc, flattenObject(obj[key], pre + key));
    } else {
      acc[pre + key] = obj[key];
    }
    return acc;
  }, {});

// FIELD PICKERS FOR CSV
export const csvFieldPickers = {
  "/collections": (data) =>
    data.map((item) => {
      const variant = item.default_variant || {};
      const rawPrice =
        variant.selling_price || item.var_price || item.price || "0";
      const price = parseFloat(rawPrice) || 0;

      return {
        _id: item._id || "",
        var_title: item.var_title || "",
        var_image: item.var_image || item.imgs?.[0] || "",
        Category: item.category?.var_title || "",
        Subcategory: item.category?.var_slug || "",
        fk_tags: Array.isArray(item.fk_tags)
          ? item.fk_tags.join(", ")
          : item.fk_tags || "",
        var_short_description: item.var_short_description || "",
        var_min_quantity: item.var_min_quantity || "0",
        var_color_code: item.var_color_code || "",
        var_offer: item.var_offer || "",
        var_price: price.toFixed(2),
        var_slug: item.var_slug || "",
        sku_id: item.sku_id || "",
      };
    }),

  "/cart": (data) =>
    data.map((item) => {
      const rawPrice = item.selling_price || item.var_price || "0";
      const unitPrice = rawPrice && !isNaN(rawPrice) ? parseFloat(rawPrice) : 0;
      const quantity = item.cartItem || item.quantity || 1;
      const totalPrice = unitPrice * quantity;

      return {
        _id: item._id || "N/A",
        product_title: item.title || item.var_title || "N/A",
        quantity: quantity,
        unit_price: unitPrice.toFixed(2),
        total_price: totalPrice.toFixed(2),
        sku_id: item.sku_id || "N/A",
        var_image: item.var_image || item.imgs?.[0] || "N/A",
        var_price: unitPrice.toFixed(2),
      };
    }),

  "/product-details/id": (data) =>
    data.map((item) => {
      const variant = item?.Variant_details || {};
      const rawPrice =
        variant.selling_price || item.selling_price || item.var_price || "0";
      const unitPrice = parseFloat(rawPrice) || 0;
      const quantity = parseInt(item.var_min_quantity || 50);
      const totalPrice = unitPrice * quantity;
      const mainCategory =
        Array.isArray(item.category) && item.category.length > 0
          ? item.category[0]
          : {};

      return {
        _id: item._id || "",
        var_title: item.var_title || "",
        sku_id: item.sku_id || "",
        category_title: mainCategory.var_title || "",
        subcategory_slug: mainCategory.var_slug || "",
        var_short_description: item.var_short_description || "",
        var_min_quantity: quantity,
        var_color_code: item.var_color_code || "",
        var_offer: item.var_offer || "",
        var_price: unitPrice.toFixed(2),
        var_slug: item.var_slug || "",
        product_image: item.var_image || item.imgs?.[0] || "",
        unit_price: unitPrice.toFixed(2),
        total_price: totalPrice.toFixed(2),
        description: item.txt_description || item.txt_nutrition || "",
      };
    }),

  "/history": (data) =>
    data.map((query) => {
      const products = query.fk_product_arr || [];

      const productDetails = products
        .map((p, i) => {
          return `#${i + 1} ${p.fk_product_name || "N/A"} (SKU: ${
            p.sku || "N/A"
          }, Qty: ${p.quantity || 0}, Price: ${p.price || 0}, Total: ${
            p.total || 0
          })`;
        })
        .join(" | ");

      const total_quantity = products.reduce(
        (acc, p) => acc + Number(p.quantity || 0),
        0
      );

      const total_price = products
        .reduce(
          (acc, p) => acc + parseFloat(p.price || 0) * Number(p.quantity || 0),
          0
        )
        .toFixed(2);

      return {
        order_id: query._id || "N/A",
        customer_email: query.register_email || "N/A",
        message: query.message || "",
        created_date: new Date(query.dt_createddate).toLocaleString(),
        status: query.status || "active",
        total_quantity,
        total_products: products.length,
        total_price,
        var_total_amount: query.var_total_amount || "0",
        var_payable_amount: query.var_payable_amount || "0",
        product_summary: productDetails,
      };
    }),

  "/order-detail": (data) =>
    data.map((item) => {
      const rawPrice = item.price ? item.price.toString().trim() : "0";
      const price = rawPrice && !isNaN(rawPrice) ? parseFloat(rawPrice) : 0;
      const quantity = parseInt(item.quantity || 0);
      const total_price = (price * quantity).toFixed(2);

      const productName =
        item.fk_product_name ||
        item.product_name ||
        item.title ||
        item.var_title ||
        item.description ||
        "N/A";

      return {
        order_id: item.order_id || item._id || "N/A",
        product_name: productName,
        sku: item.sku || "N/A",
        quantity: quantity,
        unit_price: price.toFixed(2),
        total_price: total_price,
        status: item.status || "Pending",
        order_date: item.orderDate || item.dt_createddate || "",
        image: item.imageUrl || "",
        created_date: item.createdAt || "",
      };
    }),


    "/custom-query-list": (data) =>
  data.map((item, index) => ({
    S_No: String(index + 1).padStart(2, "0"),
    Description: item.description || "N/A",
    File_URL: item.fileUrl || "No Attachment",
    Created_Date: item.created_date || "N/A",
  })),


};

export const exportToCSV = (
  data,
  filename,
  currentRoute,
  selectedCurrency = "USD",
  exchangeRates = { USD: 1 }
) => {
  const rate = exchangeRates[selectedCurrency] || 1;

  const routeKey = Object.keys(csvFieldPickers).find((route) =>
    currentRoute.includes(route)
  );
  let selectedFields = routeKey ? csvFieldPickers[routeKey](data) : data;

  selectedFields = selectedFields.map((item) => {
    if ("unit_price" in item)
      item.unit_price = `${(parseFloat(item.unit_price) * rate).toFixed(2)} ${currencySymbols[selectedCurrency] || selectedCurrency}`;
    if ("total_price" in item)
      item.total_price = `${(parseFloat(item.total_price) * rate).toFixed(2)} ${currencySymbols[selectedCurrency] || selectedCurrency}`;
    if ("var_price" in item)
      item.var_price = `${(parseFloat(item.var_price) * rate).toFixed(2)} ${currencySymbols[selectedCurrency] || selectedCurrency}`;
    return item;
  });
  

  const csv = Papa.unparse(selectedFields);
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  FileSaver.saveAs(blob, `${filename}_${new Date().toISOString()}.csv`);
};

// FIELD PICKERS (Used in PDF export)
export const pdfFieldPickers = {
  "/collections": (data) =>
    data.map((item) => {
      const variant = item.default_variant || {};
      const rawPrice =
        variant.selling_price || item.var_price || item.price || "0";
      const price = parseFloat(rawPrice) || 0;

      return {
        Title: item.var_title || "",
        Category: item.category?.var_title || "",
        Subcategory: item.category?.var_slug || "",
        Tags: Array.isArray(item.fk_tags)
          ? item.fk_tags.join(", ")
          : item.fk_tags || "",
        Description: item.var_short_description || "",
        MinQty: item.var_min_quantity || "0",
        Offer: item.var_offer || "N/A",
        Price: price.toFixed(2), // Used in conversion
        Image: item.var_image || item.imgs?.[0] || "",
      };
    }),

  "/cart": (data) =>
    data.map((item) => {
      const unitPrice = parseFloat(item.selling_price || item.var_price || "0");
      const quantity = item.cartItem || item.quantity || 1;
      return {
        _id: item._id || "N/A",
        Product: item.title || item.var_title || "N/A",
        Quantity: quantity,
        "Unit Price": unitPrice.toFixed(2),
        "Total Price": (unitPrice * quantity).toFixed(2),
        SKU: item.sku_id || "N/A",
        Image: item.var_image || item.imgs?.[0] || "",
      };
    }),

  "/product-details/id": (data) =>
    data.map((item) => {
      const variant = item?.Variant_details || {};
      const unitPrice = parseFloat(
        variant.selling_price || item.selling_price || item.var_price || 0
      );
      const quantity = parseInt(item.var_min_quantity || 50);
      const mainCategory =
        Array.isArray(item.category) && item.category.length > 0
          ? item.category[0]
          : {};

      return {
        Title: item.var_title || "",
        SKU: item.sku_id || "",
        Category: mainCategory.var_title || "",
        Subcategory: mainCategory.var_slug || "",
        Min_Qty: quantity,
        "Unit Price": unitPrice.toFixed(2),
        "Total Price": (unitPrice * quantity).toFixed(2),
        Description: item.txt_description || item.txt_nutrition || "",
        // Image: item.var_image || item.imgs?.[0] || "",
        Image: Array.isArray(item.imgs) ? item.imgs.filter(Boolean) : [item.var_image].filter(Boolean),

      };
    }),

  "/history": (data) =>
    data.map((query) => {
      const products = query.fk_product_arr || [];

      const productSummary = products
        .map((p, i) => {
          const name = p.fk_product_name || "N/A";
          const qty = p.quantity || 0;
          const price = parseFloat(p.price || 0).toFixed(2);
          const total = parseFloat(p.total || 0).toFixed(2);
          return `#${
            i + 1
          }\nProduct: ${name}\nQty: ${qty}\nPrice: ${price}\nTotal: ${total}`;
        })
        .join("\n\n"); // Double line-break between products

      return {
        "Order ID": query._id || "N/A",
        Email: query.register_email || "N/A",
        Status: query.status || "active",
        "Created Date": new Date(query.dt_createddate).toLocaleString(),
        "Total Qty": products.reduce(
          (acc, p) => acc + Number(p.quantity || 0),
          0
        ),
        "Total Price": query.var_total_amount || "0",
        Message: query.message || "",
        Summary: productSummary,
      };
    }),

  "/order-detail": (data) =>
    data.map((item) => {
      const productName =
        item.fk_product_name ||
        item.product_name ||
        item.title ||
        item.var_title ||
        item.description ||
        "N/A";

      return {
        order_id: item.order_id || item._id || "N/A",
        Product: productName,
        SKU: item.sku || "N/A",
        Quantity: item.quantity || "0",
        "Unit Price": parseFloat(item.price || 0).toFixed(2),
        "Total Price": ((item.price || 0) * (item.quantity || 1)).toFixed(2),
        Status: item.status || "Pending",
        Date: item.orderDate || item.dt_createddate || "",
        Image: item.imageUrl || "",
      };
    }),

    "/custom-query-list": (data) =>
  data.map((item, index) => ({
    "S.No": String(index + 1).padStart(2, "0"),
    Description: item.description || "N/A",
    "Created Date": item.created_date || "N/A",
    Image: item.fileUrl || "", 
  })),


};

export const exportToPDF = async (
  data,
  filename,
  currentRoute,
  selectedCurrency = "USD",
  exchangeRates = { USD: 1 }
) => {
  const rate = exchangeRates[selectedCurrency] || 1;

  const routeKey = Object.keys(pdfFieldPickers).find((route) =>
    currentRoute.includes(route)
  );
  let selectedData = routeKey ? pdfFieldPickers[routeKey](data) : data;

  selectedData = selectedData.map((item) => {
    const symbol = currencySymbols[selectedCurrency] || selectedCurrency;
    if ("Unit Price" in item)
      item["Unit Price"] = `${symbol} ${(parseFloat(item["Unit Price"]) * rate).toFixed(2)} `;
    if ("Total Price" in item)
      item["Total Price"] = `${symbol} ${(parseFloat(item["Total Price"]) * rate).toFixed(2)} `;
    if ("Price" in item)
      item["Price"] = `${symbol} ${(parseFloat(item["Price"]) * rate).toFixed(2)} `;
    return item;
  });
  

  const doc = new jsPDF();
  doc.setFontSize(10);
  doc.text("Exported Data", 14, 15);

  const headers = Object.keys(selectedData[0]);

  if (routeKey === "/product-details/id") {
    const productHeaders = headers.filter((h) => h.toLowerCase() !== "image");

    for (const row of selectedData) {
      const rowData = productHeaders.map((key) => row[key] ?? "");
      doc.autoTable({
        startY: doc.lastAutoTable ? doc.lastAutoTable.finalY + 10 : 30,
        head: [productHeaders],
        body: [rowData],
        styles: { fontSize: 8, cellPadding: 2, minCellHeight: 15 },
        headStyles: {
          fillColor: [0, 0, 0],
          textColor: [255, 255, 255],
          fontStyle: "bold",
        },
        alternateRowStyles: { fillColor: [245, 245, 245] },
        margin: { top: 30 },
      });

      const imgY = doc.autoTable.previous.finalY + 5;
      const imgSize = 50;
      const spacing = 10;
      const xStart = 20;
      const imgURLs = Array.isArray(row.Image) ? row.Image : [row.Image];

      for (let i = 0; i < imgURLs.length; i++) {
        const base64Img = await convertImgToBase64(imgURLs[i]);
        const col = i % 3;
        const rowIdx = Math.floor(i / 3);
        const x = xStart + col * (imgSize + spacing);
        const y = imgY + rowIdx * (imgSize + spacing);
        if (base64Img) {
          doc.addImage(base64Img, "JPEG", x, y, imgSize, imgSize);
        }
      }
    }

    doc.save(`${filename}_${new Date().toISOString()}.pdf`);
    return;
  }

  const imageField = headers.find((key) => key.toLowerCase().includes("image"));
  const body = await Promise.all(
    selectedData.map(async (row) => {
      return await Promise.all(
        headers.map(async (key) => {
          if (key === imageField) {
            const base64 = await convertImgToBase64(row[key]);
            return { image: base64 };
          }
          return row[key] ?? "";
        })
      );
    })
  );

  doc.autoTable({
    startY: 20,
    head: [headers],
    body: body,
    styles: { fontSize: 8, cellPadding: 2, minCellHeight: 20 },
    headStyles: {
      fillColor: [0, 0, 0],
      textColor: [255, 255, 255],
      fontStyle: "bold",
    },
    alternateRowStyles: { fillColor: [245, 245, 245] },
    margin: { top: 30 },
    columnStyles: (() => {
      const styles = {};
      headers.forEach((key, index) => {
        if (key.toLowerCase() === "s.no") styles[index] = { cellWidth: 20 };
        if (key.toLowerCase() === "summary") styles[index] = { cellWidth: 40 };
        if (key.toLowerCase() === "email") styles[index] = { cellWidth: 30 };
        if (key.toLowerCase() === "image") styles[index] = { cellWidth: 20 };
        if (key.toLowerCase() === "status") styles[index] = { cellWidth: 13 };
        if (key.toLowerCase() === "total qty") styles[index] = { cellWidth: 12 };
        if (key.toLowerCase() === "created date") styles[index] = { cellWidth: 22 };
        if (key.toLowerCase() === "message") styles[index] = { cellWidth: 20 };
        if (key.toLowerCase() === "subcategory" || key.toLowerCase() === "subcategory_slug") styles[index] = { cellWidth: 25 };
      });
      return styles;
    })(),
    willDrawCell: function (data) {
      const cellData = data.cell.raw;
      if (cellData && typeof cellData === "object" && cellData.image) {
        data.cell.text = "";
      }
    },
    didDrawCell: function (data) {
      const cellData = data.cell.raw;
      if (cellData && typeof cellData === "object" && cellData.image) {
        doc.addImage(cellData.image, "JPEG", data.cell.x + 1, data.cell.y + 1, 16, 16);
      }
    },
    didDrawPage: function (data) {
      doc.setFontSize(12);
      doc.text("Make Your Label", data.settings.margin.left, 10);
      const pageCount = doc.internal.getNumberOfPages();
      doc.text(`Page ${doc.internal.getCurrentPageInfo().pageNumber} of ${pageCount}`, data.settings.margin.left, doc.internal.pageSize.height - 10);
    },
  });

  doc.save(`${filename}_${new Date().toISOString()}.pdf`);
};