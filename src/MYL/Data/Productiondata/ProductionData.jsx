// work images
import VisionImage from '../../../MYL/assets/Enterprice/VisionImage.png';

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

// steps images
import fabric from '../../../MYL/assets/Production/fabric.webp'
import pattern from '../../../MYL/assets/Production/pattern.jpg'
import sample from '../../../MYL/assets/Production/sample.jpg'
import sewing from '../../../MYL/assets/Production/sewing.jpg'
import printing from '../../../MYL/assets/Production/printing.jpeg'
import finishing from '../../../MYL/assets/Production/finishing.jpeg'
import branding from '../../../MYL/assets/Production/brand.jpg'
import inspection from '../../../MYL/assets/Production/inspection.webp'


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
      image: VisionImage,
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
      image: VisionImage,
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
      image: VisionImage,
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
          title: "Fabric & Material Sourcing ",
          description: "We source premium fabrics, trims, buttons, and zippers tailored to your design needs. Eco-friendly and sustainable options are available.",
          active: true
        },
        {
          title: "Pattern Development & Cutting ",
          description: "Expert pattern makers create precise digital or manual patterns for flawless fit.High-accuracy fabric cutting minimizes waste while maintaining precision.",
          active: false
        },
        {
          title: "Prototype & Sample Approval ",
          description: "We create pre-production samples to ensure the perfect fit, fabric, and design execution.Necessary adjustments are made before mass production begins.",
          active: false
        },
        {
          title: "Sewing & Garment Assembly ",
          description: "Skilled artisans and automated stitching machines ensure durability and consistency.Quality checks at every stage to eliminate errors.",
          active: false
        },
        {
          title: "Printing & Embroidery (If Required) ",
          description: "Custom screen printing, digital printing, embroidery, or heat transfer applications. ",
          active: false
        },
        {
          title: "Finishing & Quality Control ",
          description: "Every garment undergoes a multi-step quality check, ensuring flawless stitching, fabric integrity, and perfect finishing.",
          active: false
        },
        {
          title: "Branding & Packaging ",
          description: "Custom labels, woven tags, and branded packaging are added for a premium retail-ready experience.",
          active: false
        },
        {
          title: "Final Inspection & Shipping ",
          description: "Ready-to-sell garments are packed and shipped globally with a streamlined supply chain. ",
          active: false
        }
      ];
    
      export const sections = [
        {
          content: "We source premium fabrics, trims, buttons, and zippers tailored to your design needs. Eco-friendly and sustainable options are available.",
          image: fabric,
        },
        {
          content: "Expert pattern makers create precise digital or manual patterns for flawless fit.High-accuracy fabric cutting minimizes waste while maintaining precision.",
          image: pattern,
        },
        {
          content: "We create pre-production samples to ensure the perfect fit, fabric, and design execution.Necessary adjustments are made before mass production begins.",
          image: sample,
        },
        {
          content: "Skilled artisans and automated stitching machines ensure durability and consistency.Quality checks at every stage to eliminate errors.",
          image: sewing,
        },
        {
          content: "Custom screen printing, digital printing, embroidery, or heat transfer applications. ",
          image: printing,
        },
        {
          content: "Every garment undergoes a multi-step quality check, ensuring flawless stitching, fabric integrity, and perfect finishing.",
          image: finishing,
        },
        {
          content: "Custom labels, woven tags, and branded packaging are added for a premium retail-ready experience.",
          image: branding,
        },
        {
          content: "Ready-to-sell garments are packed and shipped globally with a streamlined supply chain.",
          image: inspection,
        }
      ];
    