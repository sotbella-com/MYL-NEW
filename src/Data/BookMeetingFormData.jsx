export const formFields = [
    { id: "firstName", label: "First Name*", type: "text", required: true },
    { id: "lastName", label: "Last Name*", type: "text", required: true },
    { id: "email", label: "Email*", type: "email", required: true },
  ];

  export const moreFields = [
    { id: "company", label: "Company", type: "text" },
    { id: "garmentTypes", label: "Garment Types", type: "text" },
  ]
  
  export const dropdownFields = [
    { id: "numberOfStyles", label: "Number of Styles", options: ["1-5", "5-10", "10+"] },
    { id: "estimatedOrderQuantity", label: "Estimated Order Quantity", options: ["100-500", "500-1000", "1000+"] },
    { id: "designRequirement", label: "Design Requirement", options: ["Own Design", "Need Design Support"] },
    { id: "productionTimeline", label: "Production Timeline", options: ["2 Weeks", "4 Weeks", "8+ Weeks"] },
    { id: "budgetRange", label: "Budget Range", options: ["$1000-10k", "$10k-50k", "$50k-100k", "$100k+"] },
  ];
  

  export const countryToCode = {
    Armenia: "+374",
    Australia: "+61",
    Bahrain: "+973",
    Canada: "+1",
    Denmark: "+45",
    France: "+33",
    Georgia: "+995",
    Germany: "+49",
    India: "+91",
    Italy: "+39",
    Luxembourg: "+352",
    Netherlands: "+31",
    Norway: "+47",
    Poland: "+48",
    "Saudi Arabia": "+966",
    Sweden: "+46",
    Turkey: "+90",
    "United Arab Emirates": "+971",
    "United Kingdom": "+44",
    "United States": "+1",
  };
  