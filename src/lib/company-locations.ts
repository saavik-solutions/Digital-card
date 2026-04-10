export type CardData = {
  slug: string;
  name: string;
  title: string;
  company: string;
  phone: string;
  email: string;
  website: string;
  location: string;
  socials: {
    instagram: string;
    linkedin: string;
    facebook: string;
    whatsapp: string;
  };
  assets: {
    profileImage: string;
    logo: string;
    backgroundVideo: string;
  };
  ventures: {
    name: string;
    url: string;
    logo: string;
  }[];
};

export const cards: Record<string, CardData> = {
  "kona-heena": {
    slug: "kona-heena",
    name: "Kona Heena",
    title: "Regional Head",
    company: "EAOverseas",
    phone: "+919398831437",
    email: "heena@eaoverseas.com",
    website: "https://eaoverseas.com",
    location: "Hyderabad, India",
    socials: {
      instagram: "https://instagram.com/eaoverseas",
      linkedin: "https://linkedin.com/company/eaoverseas",
      facebook: "https://www.facebook.com/share/19j6E52wzQ/?mibextid=wwXIfr",
      whatsapp: "https://wa.me/919398831437",
    },
    assets: {
      profileImage: "https://cdn0030.qrcodechimp.com/qr/PROD/6828db8fd44a5352325c9c9d/fm/rectangle_11696.png",
      logo: "https://cdn0030.qrcodechimp.com/qr/PROD/6828db8fd44a5352325c9c9d/fm/owl.png",
      backgroundVideo: "https://cdn0070.qrcodechimp.com/images/digitalCard/bg_video/video_5.mp4",
    },
    ventures: [
      {
        name: "EAOverseas",
        url: "https://eaoverseas.com",
        logo: "https://cdn0030.qrcodechimp.com/qr/PROD/6828db8fd44a5352325c9c9d/fm/owl.png"
      },
      {
        name: "SaaVik Solutions",
        url: "https://saaviksolutions.com",
        logo: "https://cdn0030.qrcodechimp.com/qr/PROD/6828db8fd44a5352325c9c9d/fm/logo_1.jpg?v=1766380728389"
      }
    ]
  },
  "bhargava-raj": {
    slug: "bhargava-raj",
    name: "Bhargava Raj Valaboju",
    title: "Founder & MD",
    company: "SaaVik Solutions Inc",
    phone: "+919701563362",
    email: "bhargava@saaviksolutions.com",
    website: "https://saaviksolutions.com",
    location: "Hyderabad, India",
    socials: {
      instagram: "https://instagram.com/saavik_solutions",
      linkedin: "https://www.linkedin.com/in/bhargava-raj-valaboju-a17086192/",
      facebook: "https://facebook.com/saaviksolutions",
      whatsapp: "https://wa.me/919701563362",
    },
    assets: {
      profileImage: "https://cdn0030.qrcodechimp.com/qr/PROD/6828db8fd44a5352325c9ccd/fm/rectangle_11696.png",
      logo: "https://saaviksolutions.com/wp-content/uploads/2021/04/saavik-logo.png", // Extracted logo if available, or fallback
      backgroundVideo: "https://cdn0070.qrcodechimp.com/images/digitalCard/bg_video/video_4.mp4", // Different video for variety
    },
    ventures: [
      {
        name: "SaaVik Solutions",
        url: "https://saaviksolutions.com",
        logo: "https://cdn0030.qrcodechimp.com/qr/PROD/6828db8fd44a5352325c9c9d/fm/logo_1.jpg?v=1766380728389"
      },
      {
        name: "Digizinc",
        url: "https://digizinc.com",
        logo: "https://saaviksolutions.com/wp-content/uploads/2021/04/digizinc-logo.png" // Fallback logo
      }
    ]
  }
};
