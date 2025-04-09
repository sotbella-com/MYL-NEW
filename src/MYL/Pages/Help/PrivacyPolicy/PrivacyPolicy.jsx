// import React from 'react'

// const PrivacyPolicy = () => {
//   return (
//     <div className='flex flex-col gap-10 justify-center items-center h-[100vh]'>
//       <h1 className="font-Plus Jakarta Sans text-4xl md:text-5xl lg:text-6xl font-black leading-tight">
//         Privacy Policy
//         </h1>
//         <p>Coming Soon...</p>
//     </div>
//   )
// }

// export default PrivacyPolicy

import React from "react";

const privacyPolicyData = [
  {
    title: "1. Information We Collect",
    sections: [
      {
        subTitle: "A. Information You Provide Directly",
        content: [
          "Personal Identification Data – Name, email address, phone number, company name, and other identifying details.",
          "Business Information – Details about your company, business needs, and project requirements.",
          "Billing and Payment Information – If applicable, we collect payment details securely for transactions.",
          "Customer Support Data – Any information shared during customer inquiries, feedback, or issue resolution.",
        ],
      },
      {
        subTitle: "B. Information Collected Automatically",
        content: [
          "Device and Usage Information – IP address, browser type, operating system, and browsing behavior.",
          "Cookies & Tracking Technologies – We use cookies, web beacons, and pixels to track user behavior and improve user experience.",
          "Location Data – We may collect location details if enabled by your device settings.",
        ],
      },
      {
        subTitle: "C. Information from Third Parties",
        content: [
          "Advertising Platforms (Google Ads & Meta Ads) – Tracking ad performance, conversion metrics, and audience engagement.",
          "CRM (Salesforce) – Managing customer interactions, leads, and communications.",
          "Call Tracking (CallHippo) – Recording and analyzing customer inquiries for quality assurance.",
          "Appointment Scheduling (RevenueHero) – Managing meetings and customer service bookings.",
        ],
      },
    ],
  },
  {
    title: "2. How We Use Your Information",
    content: [
      "Providing Services – Managing inquiries, fulfilling requests, and ensuring smooth business transactions.",
      "Marketing & Advertising – Delivering targeted advertisements, remarketing, and improving ad relevance.",
      "Website Optimization – Enhancing user experience through analytics and behavioral tracking.",
      "Customer Support – Responding to queries, troubleshooting issues, and offering personalized assistance.",
      "Legal Compliance – Ensuring compliance with local regulations, fraud prevention, and data security.",
      "We DO NOT sell, rent, or share your personal data with third parties for their marketing purposes.",
    ],
  },
  {
    title: "3. How We Share Your Information",
    sections: [
      {
        subTitle: "A. Advertising & Marketing Partners",
        content: [
          "Google Ads & Meta Ads – For targeted advertising, remarketing, and measuring ad performance.",
          "Third-Party Tracking Tools – Used for tracking user engagement and optimizing ad campaigns.",
        ],
      },
      {
        subTitle: "B. Service Providers & Business Tools",
        content: [
          "Salesforce (CRM) – Storing customer details and communication history.",
          "CallHippo (VoIP Services) – Managing customer calls and inquiries.",
          "RevenueHero (Meeting Scheduler) – Scheduling appointments and business interactions.",
        ],
      },
      {
        subTitle: "C. Legal & Compliance",
        content: [
          "We may disclose data when required by law, in response to legal processes, or to protect our business interests.",
        ],
      },
    ],
  },
  {
    title: "4. Data Retention & Security",
    sections: [
      {
        subTitle: "A. How Long We Retain Data",
        content: [
          "We retain personal data for as long as necessary to fulfill business and legal obligations.",
          "Users can request data deletion, subject to applicable legal requirements.",
        ],
      },
      {
        subTitle: "B. Security Measures",
        content: [
          "We use encryption, secure servers, and access control policies to safeguard your data.",
        ],
      },
    ],
  },
  {
    title: "5. Cookies & Tracking Technologies",
    sections: [
      {
        subTitle: "A. Types of Cookies We Use",
        content: [
          "Essential Cookies – Necessary for basic website functionality.",
          "Analytics Cookies – Collect insights on user behavior.",
          "Marketing Cookies – Used for ad targeting and remarketing.",
        ],
      },
      {
        subTitle: "B. Managing Cookies",
        content: [
          "Users can modify cookie preferences through browser settings. Opting out may limit website functionality.",
        ],
      },
    ],
  },
  {
    title: "6. Your Privacy Rights",
    content: [
      "Right to Access – Request copies of your personal data.",
      "Right to Rectification – Correct inaccurate data.",
      "Right to Erasure – Request deletion of personal data.",
      "Right to Object – Opt out of certain data processing activities.",
      "Right to Data Portability – Request a copy of data for transfer.",
      "To exercise any of these rights, contact us at https://makeyourlabel.com/.",
    ],
  },
  {
    title: "7. Third-Party Services & Links",
    content: [
      "Our website may contain links to third-party websites. We are not responsible for their privacy practices. Users should review external privacy policies before engaging with third-party services.",
    ],
  },
  {
    title: "8. Children's Privacy",
    content: [
      "Our website and services are not intended for children under the age of 18. We do not knowingly collect or store personal data from minors.",
    ],
  },
  {
    title: "9. Changes to This Privacy Policy",
    content: [
      "We reserve the right to update this policy periodically. Changes will be posted on this page, and significant updates may be communicated through email or website notifications.",
    ],
  },
];

const PrivacyPolicy = () => {
  return (
    <section className="w-[90vw] mx-auto my-6 md:my-10 text-black">
      <h1 className="font-jakarta text-4xl md:text-5xl lg:text-6xl font-semibold text-center mb-10">
        Privacy Policy
      </h1>
      <p className="mb-6 text-sm lg:text-base">
        At Make Your Label, we are committed to protecting your privacy and ensuring transparency about how we collect, use, and secure your personal data. By accessing or using our website{" "}
        <a
          href="https://makeyourlabel.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline"
        >
          https://makeyourlabel.com/
        </a>
        , you acknowledge that you have read and understood this Privacy Policy.
      </p>

      {privacyPolicyData.map(({ title, content, sections }, index) => (
        <div key={index} className="mt-8">
          <h2 className="font-jakarta text-lg lg:text-2xl font-semibold mb-4">{title}</h2>
          {content && (
            <ul className="list-disc pl-6 space-y-2">
              {content.map((item, idx) => (
                <li key={idx} className="text-sm lg:text-base">{item}</li>
              ))}
            </ul>
          )}
          {sections &&
            sections.map(({ subTitle, content }, secIdx) => (
              <div key={secIdx} className="mt-4">
                <h3 className="font-jakarta text-lg lg:text-xl font-medium mb-2">{subTitle}</h3>
                <ul className="list-disc pl-6 space-y-2">
                  {content.map((item, itemIdx) => (
                    <li key={itemIdx} className="text-sm lg:text-base">{item}</li>
                  ))}
                </ul>
              </div>
            ))}
        </div>
      ))}
    </section>
  );
};

export default PrivacyPolicy;
