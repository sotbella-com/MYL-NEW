// work images
import VisionImage from '../../../MYL/assets/Enterprice/VisionImage.png';
import CustomImage from '../../assets/Enterprice/CustomImage.jpeg'

// services images
// import techpack from '../../../MYL/assets/Enterprice/TechPackImage.jpeg'
import techpack from '../../../MYL/assets/Enterprice/techpackfashion.jpg'
import freeconsult from '../../../MYL/assets/Enterprice/freeconsult.jpg'
import design from '../../../MYL/assets/Enterprice/design.jpg'
import production from '../../../MYL/assets/Enterprice/production.jpg'
import embroidery from '../../../MYL/assets/Enterprice/Embroidery.jpg'
import graphic from '../../../MYL/assets/Enterprice/graphic.jpg'
import sourcing from '../../../MYL/assets/Enterprice/sourcing.jpg'
import label from '../../../MYL/assets/Enterprice/LabelImage.jpg'
import photography from '../../../MYL/assets/Enterprice/photography.jpg'
import packaging from '../../../MYL/assets/Enterprice/packaging.jpg'

// process images
// import techpack from '../../../MYL/assets/Enterprice/TechPackImage.jpeg'
// import freeconsult from '../../../MYL/assets/Enterprice/freeconsult.jpg'
// import design from '../../../MYL/assets/Enterprice/design.jpg'
// import production from '../../../MYL/assets/Enterprice/production.jpg'
// import embroidery from '../../../MYL/assets/Enterprice/Embroidery.jpg'
// import graphic from '../../../MYL/assets/Enterprice/graphic.jpg'
// import sourcing from '../../../MYL/assets/Enterprice/sourcing.jpg'
// import label from '../../../MYL/assets/Enterprice/LabelImage.jpg'
// import photography from '../../../MYL/assets/Enterprice/photography.jpg'
// import packaging from '../../../MYL/assets/Enterprice/packaging.jpg'

// work data
export const workSteps = [
    {
      title: "Flat Sketches",
      description:
        "Lorem ipsum dolor sit amet consectetur. Pellentesque viverra odio placerat tempor magna. Ut in ornare sit sed odio.",
      image: VisionImage,
    },
    {
      title: "Computer Aided Designs",
      description:
        "Lorem ipsum dolor sit amet consectetur. Pellentesque viverra odio placerat tempor magna. Ut in ornare sit sed odio.",
      image: CustomImage,
    },
    {
      title: "Color-ways",
      description:
        "Lorem ipsum dolor sit amet consectetur. Pellentesque viverra odio placerat tempor magna. Ut in ornare sit sed odio.",
      image: VisionImage,
    },
    {
      title: "Fabric Placement & Overall Garment Construction",
      description:
        "Lorem ipsum dolor sit amet consectetur. Pellentesque viverra odio placerat tempor magna. Ut in ornare sit sed odio.",
      image: CustomImage,
    },
    {
      title: "Materials List or Bill of Materials",
      description:
        "Lorem ipsum dolor sit amet consectetur. Pellentesque viverra odio placerat tempor magna. Ut in ornare sit sed odio.",
      image: VisionImage,
    },
    {
      title: "Flexible Production",
      description:
        "Lorem ipsum dolor sit amet consectetur. Pellentesque viverra odio placerat tempor magna. Ut in ornare sit sed odio.",
      image: CustomImage,
    },
    {
      title: "Measurements",
      description:
        "Lorem ipsum dolor sit amet consectetur. Pellentesque viverra odio placerat tempor magna. Ut in ornare sit sed odio.",
      image: VisionImage,
    },
  ];

// services data
  export const servicesData = [
      {
        title: "Tech Packs",
        description:
          "We start by working closely with your brand to understand your unique vision, style, and goals. Our design team transforms these ideas into tangible concepts and designs.",
        image: techpack,
        route:"/techpack",
      },
      {
        title: "Free Consultation",
        description:
          "We offer free consultation and tell you what we know about the production, costs, leadtime, delivery, etc. With the knowledge, you can know better if you are ready to start your clothing, how much money you need, what you need to do next.",
        image: freeconsult,
        route:"/consultation",
      },
      {
        title: "Design & Tech Pack Creation",
        description:
          "Our professional design team, lead by, can help you create unique fashionable clothing, and make detailed tech packs. This step can drastically shorten the development time and avoid many mistakes along the production process.",
        image: design,
        route:"/design",
      },
      {
          title: "Production",
          description:
            "From a paper pattern to the finished products, we have a team made of the highly experienced workforce, manufacturing is what they specialize in.",
          image: production,
          route:"/production",
        },
        {
          title: "Embroidery & Printing",
          description:
            "We make custom printing and embroidery for your garments. We offer hot transfer printing, screen printing, digital printing.",
          image: embroidery,
          route:"/embroidery",
        },
        {
          title: "Graphic Design",
          description:
            "Either you need a logo or an artwork for printing or embroidery, we can help to create something true creative. You will get the sourcing files so you can use the final works anywhere you want.",
          image: graphic,
          route:"/graphic-design",
        },
        {
          title: "Sourcing",
          description:
            "We have a sourcing team to source the fabrics, buttons, zippers, and trims for you, they use their professionalism to make things easier for you. We will recommend the latest or most popular fabrics to our customers so they can create something which can sell well.",
          image: sourcing,
          route:"/sourcing",
        },
        {
          title: "Labels & Tags",
          description:
            "We can provide custom labels and tags so you can further customize your products.",
          image: label,
          route:"/labels",
        },
        {
          title: "Photography",
          description:
            "We provide premium and basic photography services. Help you deal with shooting issues at an affordable price.",
          image: photography,
          route:"/photography",
        },
        {
          title: "Packaging",
          description:
            "We provide packaging for your products which includes plastic bags and carton boxes. Special packaging is also available.",
          image: packaging,
          route:"/packaging",
        },
    ];

// process data
    export const processSteps = [
        {
          title: "Consultation",
          description: "We understand your vision and goals and brand identity.",
          active: true
        },
        {
          title: "Design & TechPacks",
          description: "Our designers create production-ready designs & tech packs.",
          active: false
        },
        {
          title: "Sampling",
          description: "Refine your products with precision-crafted prototypes.",
          active: false
        },
        {
          title: "Flexible Production",
          description: "Choose low MOQ or scale to high-volume production.",
          active: false
        },
        {
          title: "Branding & Delivery",
          description: "Custom labels, packaging & logistics handled seamlessly.",
          active: false
        }
      ];
    
      export const sections = [
        {
          content: "At Make Your Label, we believe that every great project starts with a meaningful conversation. Our consultation process is designed to understand your vision, requirements, and goals so that we can deliver tailored solutions that meet your needs.",
          image: techpack,
        },
        {
          content: "Our team of experts collaborates with you to turn your ideas into reality, ensuring every detail is carefully crafted to perfection.",
          image: freeconsult,
        },
        {
          content: "We offer a wide range of services, from design to production, so you can focus on growing your brand while we take care of the rest.",
          image: design,
        },
        {
          content: "Your success is our success, and we are committed to providing exceptional quality and personalized service every step of the way.",
          image: label,
        },
        {
          content: "Join the hundreds of brands that trust us as their co-founder and let's bring your dream project to life.",
          image: production,
        }
      ];
    
      export const whyTechPackData = {
        title: "Why You Need a Tech Pack?",
        highlights: [
          {
            strongText: "Ensures Accuracy –",
            description: "Eliminates miscommunication and errors in production.",
          },
          {
            strongText: "Saves Time & Cost –",
            description: "Reduces sampling rounds and production delays.",
          },
          {
            strongText: "Quality Control –",
            description: "Standardizes manufacturing for consistent product quality.",
          },
          {
            strongText: "Essential for Bulk Orders –",
            description: "A must-have for scaling your production efficiently.",
          },
        ],
      };
      