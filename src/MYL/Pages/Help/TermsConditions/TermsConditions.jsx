// import React from 'react'

// const TermsConditions = () => {
//   return (
//     <div className='flex flex-col gap-10 justify-center items-center h-[100vh]'>
//       <h1 className="font-Plus Jakarta Sans text-4xl md:text-5xl lg:text-6xl font-black leading-tight">
//         Terms & Conditions
//         </h1>
//         <p>Coming Soon...</p>
//     </div>
//   )
// }

// export default TermsConditions


import React from "react";

const termsData = [
  {
    id: 1,
    title: "Definitions",
    content: [
      '"Company," "We," "Us," or "Our" refers to Make Your Label.',
      '"You," "Your," or "User" refers to any individual or business accessing or using our services.',
      '"Website" refers to https://makeyourlabel.com/.',
      '"Services" include B2B clothing manufacturing, digital advertising, and lead generation solutions.',
    ],
  },
  {
    id: 2,
    title: "Use of Our Website and Services",
    content: [
      "You must be at least 18 years old to use our website and services.",
      "You agree not to use our website for any unlawful purposes.",
      "No fraudulent activities or misrepresentations are allowed.",
      "We reserve the right to modify or discontinue services anytime.",
    ],
  },
  {
    id: 3,
    title: "Orders, Payments, and Pricing",
    content: [
      "All orders are subject to acceptance.",
      "Prices may change without prior notice.",
      "Payments must follow agreed terms.",
      "We are not liable for third-party payment processor fees.",
    ],
  },
  {
    id: 4,
    title: "Intellectual Property",
    content: [
      "All content belongs to Make Your Label.",
      "Unauthorized use may lead to legal action.",
    ],
  },
  {
    id: 5,
    title: "User-Generated Content",
    content: [
      "We may use your submitted content.",
      "We can remove content that violates our policies.",
    ],
  },
  {
    id: 6,
    title: "Privacy Policy & Data Protection",
    content:
      "By using our website, you agree to our Privacy Policy. We comply with GDPR, CCPA, and other applicable data protection laws. We use Salesforce, CallHippo, and RevenueHero for customer management.",
  },
  {
    id: 7,
    title: "Limitation of Liability",
    content: [
      "We are not responsible for any damages.",
      "We do not guarantee error-free services.",
      "Use our services at your own risk.",
    ],
  },
  {
    id: 8,
    title: "Third-Party Services",
    content:
      "We may link to third-party sites like Google Ads and Meta Ads. We are not responsible for their content or services.",
  },
  {
    id: 9,
    title: "Termination & Suspension",
    content:
      "We can suspend or terminate your access if you violate these terms. Fraudulent activities may lead to legal action.",
  },
  {
    id: 10,
    title: "Governing Law",
    content:
      "These terms are governed by the laws of [Insert Jurisdiction]. Disputes are handled in [Insert Legal Venue].",
  },
  {
    id: 11,
    title: "Changes to These Terms",
    content:
      "We may update these terms from time to time. Continued use of our services means you accept the updates.",
  },
];

const TermsConditions = () => {
  return (
    <section className="w-[90vw] mx-auto my-6 md:my-10 text-black">
      <h1 className="font-jakarta text-4xl md:text-5xl lg:text-6xl font-semibold text-center mb-10">
        Terms and Conditions
      </h1>

      <p className="mb-6 text-sm lg:text-base">
        Welcome to Make Your Label. By accessing our website{" "}
        <a
          href="https://makeyourlabel.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline"
        >
          https://makeyourlabel.com/
        </a>{" "}
        and using our services, you agree to comply with and be bound by the
        following Terms and Conditions. Please read them carefully. If you do
        not agree with these terms, do not use our website or services.
      </p>

      {termsData.map(({ id, title, content }) => (
        <div key={id} className="mt-8">
          <h2 className="font-jakarta text-lg lg:text-2xl font-semibold mb-4">
            {id}. {title}
          </h2>

          {Array.isArray(content) ? (
            <ul className="list-disc pl-6 space-y-2">
              {content.map((item, index) => (
                <li key={index} className="text-sm lg:text-base">
                  {item.includes("https://makeyourlabel.com/") ? (
                    <>
                      "Website" refers to{" "}
                      <a
                        href="https://makeyourlabel.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline"
                      >
                        https://makeyourlabel.com/
                      </a>
                      .
                    </>
                  ) : (
                    item
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p>{content}</p>
          )}
        </div>
      ))}
    </section>
  );
};

export default TermsConditions;
