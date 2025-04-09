import Outline from "../../assets/Brands/Brand4.svg"
import Esinama from "../../assets/Brands/Brand3.png"
import Mem from "../../assets/Brands/Brand1.png"
import Yumi from "../../assets/Brands/Brand2.png"
export const pricingPlans = [
  {
    title: "DESIGN & TECH PACK",
    description: 
    // "Ideal for individuals who need quick access to basic features."
    "MINI PACKAGE"
    ,
    price: 450,
    discountedPrice: 339, 
    features: [
      { text: "Apparel / product design + strategy", active: true },
      { text: "Technical drawings", active: true },
      { text: "Materials and trim solutions", active: true },
      { text: "Our industry leading MINI Tech Pack", active: true },
      { text: "Up to 12 colorways / graphics /prints", active: false },
      { text: "Brand & Care label design", active: false },
      { text: "'Print Ready' artwork files", active: false },
      { text: "2 production factory referrals", active: false },
      { text: "Hang tag, folding & packaging design", active: false },
    ],
    isPopular: false
  },
  {
    title: "DESIGN, TECH PACK & SOURCING",
    description: 
    // "Ideal for individuals who who need advanced features and tools for client work."
    "BASIC PACKAGE"
    ,
    price: 1600,
    discountedPrice: 1200, 
    features: [
      { text: "Apparel / product design + strategy", active: true },
      { text: "Technical drawings", active: true },
      { text: "Materials and trim solutions", active: true },
      { text: "Our industry leading MINI Tech Pack", active: true },
      { text: "Up to 12 colorways / graphics /prints", active: true },
      { text: "Brand & Care label design", active: true },
      { text: "'Print Ready' artwork files", active: true },
      { text: "2 production factory referrals", active: true },
      { text: "Hang tag, folding & packaging design", active: false },
    ],
    isPopular: false
  },
  {
    title: "DESIGN, TECH PACK & SOURCING",
    description: 
    // "Ideal for businesses who need personalized services and security for large teams."
    "ADVANCED PACKAGE"
    ,
    price: 2800,
    discountedPrice: 2100, 
    features: [
      { text: "Apparel / product design + strategy", active: true },
      { text: "Technical drawings", active: true },
      { text: "Materials and trim solutions", active: true },
      { text: "Our industry leading MINI Tech Pack", active: true },
      { text: "Up to 12 colorways / graphics /prints", active: true },
      { text: "Brand & Care label design", active: true },
      { text: "'Print Ready' artwork files", active: true },
      { text: "3-5 production factory referrals", active: true },
      { text: "Hang tag, folding & packaging design", active: true },
    ],
    isPopular: false
  }
];

// pricingpage brand logo
export const brandLogos = [
  { src: Outline, alt: "Brand logo 1", className: "w-[135px]" },
  { src: Esinama, alt: "Brand logo 2", className: "w-[163px]" },
  { src: Mem, alt: "Brand logo 3", className: "w-[113px]" },
  { src: Yumi, alt: "Brand logo 4", className: "w-[121px]" },
  { src: Outline, alt: "Brand logo 1", className: "w-[135px]" },
  { src: Esinama, alt: "Brand logo 2", className: "w-[163px]" },
  { src: Mem, alt: "Brand logo 3", className: "w-[113px]" },
  { src: Yumi, alt: "Brand logo 4", className: "w-[121px]" },
];

// compare plans data
export const compareSections = [
  {
    title: "Workspace",
    features: [
      {
        name: "Number of seats",
        values: ["Up to 3", "Unlimited", "Unlimited", "Unlimited"]
      },
      {
        name: "Number of objects",
        values: ["Up to 3", "Up to 8", "Up to 12", "Unlimited"]
      }
    ]
  },
  {
    title: "Automations",
    features: [
      {
        name: "Number of credits",
        values: ["200", "2000", "4000", "5000+"],
        hasTooltip: true
      }
    ]
  },
  {
    title: "Email and Calendar",
    features: [
      {
        name: "Email and calendar sync",
        values: ["1 account per user", "2 account per user", "4 account per user", "10+ account per user"],
        hasTooltip: true
      },
      {
        name: "Email sharing",
        values: ["Individual metadata", "Individual attachments", "Specific contacts", "Specific contacts"],
        hasTooltip: true
      },
      {
        name: "Email sends amount",
        values: ["500 sends per month", "1000 sends per month", "Unlimited", "Unlimited"],
        hasTooltip: true
      },
      {
        name: "Bulk email sending",
        values: ["10 sends at a time", "20 sends at a time", "50 sends at a time", "100 sends at a time"],
        hasTooltip: true
      },
      {
        name: "Remove email watermark",
        values: ["cross", "check", "check", "check"],
        hasTooltip: true
      }
    ]
  },
  {
    title: "Reporting",
    features: [
      {
        name: "Number of reports",
        values: ["3 reports", "20 reports", "100 reports", "Unlimited"],
        hasTooltip: true
      },
      {
        name: "Insight Reports",
        values: ["check", "cross", "check", "check"],
        hasTooltip: true
      },
      {
        name: "Sales Reports",
        values: ["cross", "check", "check", "check"],
        hasTooltip: true
      },
      {
        name: "Activity Reports",
        values: ["cross", "check", "check", "check"],
        hasTooltip: true
      },
      {
        name: "Email Reports",
        values: ["cross", "cross", "check", "check"],
        hasTooltip: true
      }
    ]
  },
  {
    title: "Data Model",
    features: [
      {
        name: "Access permissions",
        values: ["Fully visible", "Private", "Advanced", "Advanced"]
      }
    ]
  },
  {
    title: "Admin",
    features: [
      {
        name: "Payment invoice",
        values: ["cross", "check", "check", "check"],
        hasTooltip: true
      },
      {
        name: "SAML (SSO)",
        values: ["cross", "cross", "check", "check"],
        hasTooltip: true
      }
    ]
  },
  {
    title: "Support",
    features: [
      {
        name: "Help center",
        values: ["check", "check", "check", "check"],
        hasTooltip: true
      },
      {
        name: "Chat and email support",
        values: ["check", "check", "check", "check"],
        hasTooltip: true
      },
      {
        name: "Priority support",
        values: ["cross", "cross", "check", "check"],
        hasTooltip: true
      },
      {
        name: "Migration assistance",
        values: ["cross", "Chat with us", "Chat with us", "Chat with us"],
        hasTooltip: true
      }
    ]
  }
];