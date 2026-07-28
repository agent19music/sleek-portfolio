export const DATA = {
  name: "Sean Motanya",
  initials: "SM",
  url: "https://sean.uzskicorp.agency",
  location: "Nairobi, KE",
  locationLink: "https://www.google.com/maps/place/nairobi",
  description:
    "Software Engineer. I love building beautiful and efficient things that serve humanity.",
  summary:
    "Cracked, creative full-stack software engineer. High taste in UI/UX. Currently building Uzski Corp, a software development, design and brand consulting company. Welcome to my slice of the internet. I appreciate the visit.",
  skills: [
    "Python",
    "Typescript",
    "Elixir",
    "Kotlin",
    "PHP",
    "Figma",
    "Next.js",
    "Docker",
    "Flask",
    "React Native",
    "Laravel",
  ],
  navbar: [
    { href: "/", icon: null, label: "Home" },
    { href: "/blog", icon: null, label: "Blog" },
  ],
  contact: {
    email: "seanmotanya@gmail.com",
    tel: "+254 745 071 299",
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://github.com/agent19music",
        icon: null,
        navbar: true,
      },
      LinkedIn: {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/sean-motanya/",
        icon: null,
        navbar: true,
      },
      X: {
        name: "X",
        url: "https://x.com/uzski404",
        icon: null,
        navbar: true,
      },
      email: {
        name: "Send Email",
        url: "mailto:seanmotanya@gmail.com",
        icon: null,
        navbar: false,
      },
    },
  },
  work: [
    {
      company: "GS1 Kenya",
      href: "https://gs1kenya.org",
      badges: [] as string[],
      location: "Nairobi, KE",
      title: "Full Stack Software Engineer",
      logoUrl: "https://pub-c6a134c8e1fd4881a475bf80bc0717ba.r2.dev/gs1kenyalogo.jpg",
      start: "Jul 2026",
      end: "present",
      description:
        "Working as a Full Stack Software Engineer at GS1 Kenya, contributing across various systems. Currently building a healthcare sector platform using Elixir.",
    },
    {
      company: "Uzski Corp",
      href: "https://uzskicorp.agency",
      badges: [] as string[],
      location: "Nairobi, KE",
      title: "Founder and CEO | Technical Lead",
      logoUrl: "https://pub-c6a134c8e1fd4881a475bf80bc0717ba.r2.dev/uzski-logo.webp",
      start: "Jan 2026",
      end: "present",
      description:
        "Currently working as Technical Lead at Uzski Corp, a software development, design and brand consulting company. I head product development and specialize in system design, platforms architecture  and end to end project delivery.",
    },
    {
      company: "Daraja Plus",
      href: "https://darajaplus.com",
      badges: [] as string[],
      location: "Hybrid",
      title: "Full Stack Software Engineer ",
      logoUrl:
        "https://pub-c6a134c8e1fd4881a475bf80bc0717ba.r2.dev/darajapluslogo.jpg",
      start: "Jul 2025",
      end: "Dec 2025",
      description:
        "Worked as a Full Stack Software Engineer at Daraja Plus, building web and mobile applications for a variety of clients. I focus on delivering value by designing, implementing and maintaining both frontend and backend solutions tailored to client needs.",
    },
    {
      company: "Lixnet Technologies",
      href: "https://lixnet.net",
      badges: [] as string[],
      location: "Remote",
      title: "Backend Software Engineer",
      logoUrl:
        "https://pub-c6a134c8e1fd4881a475bf80bc0717ba.r2.dev/lixnet%20logo.jpeg",
      start: "May 2025",
      end: "Jul 2025",
      description:
        "Worked as a Backend Software Engineer at Lixnet Technologies, where I was responsible for developing their payroll management system. My role involved designing and implementing robust backend solutions to ensure efficient payroll processing and management for clients.",
    },
  ],
  education: [
    {
      school: "Riara University",
      href: "https://riarauniversity.ac.ke",
      degree: "Bachelor's Degree in Computer Science (BCS)",
      logoUrl: "/rulogo.jpg",
      start: "2021",
      end: "2025",
    },
    {
      school: "Moringa School",
      href: "https://moringaschool.com",
      degree: "Certificate in Software Engineering",
      logoUrl: "/moringalogo.jpeg",
      start: "2023",
      end: "2024",
    },
  ],
  projects: [
    {
      title: "Vitapharm Cosmetics",
      href: "https://github.com/agent19music/vitapharm-client",
      dates: "Apr 2024 - Aug 2024",
      active: true,
      description:
        "Developed a web-based application and an accompanying admin dashboard for Vitapharm Health, a cosmetics company, using React.js and Tailwind CSS. The application features a user-friendly interface for managing product inventory and customer orders.",
      technologies: ["React.js", "MySQL", "Flask"],
      oneLiner: "Beauty products E-commerce platform",
      links: [
        {
          type: "Client repo",
          href: "https://github.com/agent19music/vitapharm-client",
          icon: "github",
        },
      ],
      image: "",
      video:
        "https://pub-c6a134c8e1fd4881a475bf80bc0717ba.r2.dev/vitapharm.mp4",
    },
    {
      title: "Camposocial",
      href: "https://camposocial.app",
      dates: "May 2025 - Present",
      active: true,
      description:
        "A social media platform for university students to connect, discover and join events, buy and sell items within their college community, and find groups that match their interests.",
      technologies: ["Next.js", "PostgreSQL", "Flask", "Socket.io", "Docker"],
      oneLiner: "Social networking platform for university students",
      links: [
        {
          type: "Client repo",
          href: "https://github.com/agent19music/camposocial-client-next",
          icon: "github",
        },
        {
          type: "Server repo",
          href: "https://github.com/agent19music/camposocial-server",
          icon: "github",
        },
        {
          type: "Website",
          href: "https://camposocial.app",
          icon: "globe",
        },
      ],
      image:
        "https://pub-c6a134c8e1fd4881a475bf80bc0717ba.r2.dev/camposocial.webp",
      video: "",
    },
    {
      title: "Uniwell",
      href: "https://uniwell.uzskicorp.agency",
      dates: "May 2025 - Present",
      active: true,
      description:
        "A mental wellness mobile application that provides tools and resources to help students thrive academically and emotionally. ",
      technologies: ["React Native", "Expo", "Supabase"],
      oneLiner: "Mental wellness mobile application for students",
      links: [
        {
          type: "Repo",
          href: "https://github.com/agent19music/uniwell",
          icon: "github",
        },
        {
          type: "Website",
          href: "https://uniwell.uzskicorp.agency",
          icon: "globe",
        },
      ],
      image: "https://pub-c6a134c8e1fd4881a475bf80bc0717ba.r2.dev/new-uniwell.png",
      video: "",
    },
    {
      title: "Uzski Corp",
      href: "https://uzskicorp.agency",
      dates: "Jan 2026 - Present",
      active: true,
      description:
        "A web application for Uzski Corp, a software development, design and brand consulting company. ",
      technologies: ["Next.js", "TypeScript"],
      oneLiner: "Software and design consulting agency's website",
      links: [
        {
          type: "Website",
          href: "https://uzskicorp.agency",
          icon: "globe",
        },
      ],
      image:
        "https://pub-c6a134c8e1fd4881a475bf80bc0717ba.r2.dev/uzski-corp.png",
      video: "",
    },
    {
      title: "Zentiri",
      href: "https://zentiri.app",
      dates: "Feb 2026 - Present",
      active: true,
      description:
        "Zentiri gives founders and HR leaders the tools they need to recruit top talent, automate onboarding workflows, and foster a high-performing culture from day one. ",
      technologies: ["Next.js", "TypeScript", "Supabase"],
      oneLiner: "Hiring and onboarding platform for startups",
      links: [
        {
          type: "Website",
          href: "https://zentiri.app",
          icon: "globe",
        },
      ],
      image: "https://pub-c6a134c8e1fd4881a475bf80bc0717ba.r2.dev/zentiri-landing.png",
      video: "",
    },
  ],
  hackathons: [
    {
      title: "Team1 Kenya Avalanche Mini Hack",
      dates: "2026",
      location: "Nairobi, Kenya",
      description:
        "Won Bounty 6 building Athena, an AI second brain that answers company questions from internal docs with an Avalanche blockchain audit trail.",
      image:
        "https://pub-c6a134c8e1fd4881a475bf80bc0717ba.r2.dev/team1logo.png",
      links: [] as string[],
    },
    {
      title: "Anza Village Design Thinking Hackathon",
      dates: "November 15th - 17th 2024",
      location: "Nairobi, Kenya",
      description:
        "Developed a secure ticket management system that eliminates unauthorized transfers and prevents revenue loss from resale fraud, with an intuitive interface.",
      image:
        "https://pub-c6a134c8e1fd4881a475bf80bc0717ba.r2.dev/logo_anzavillage.png",
      links: [] as string[],
    },
    {
      title: "DeKuT Idea to Business Innovation Weekend",
      dates: "May 23rd - 24th 2025",
      location: "Nyeri, Kenya",
      description:
        "Presented the winning healthcare accessibility app connecting vulnerable patients like the elderly and disabled with providers for timely medical attention.",
      image:
        "https://pub-c6a134c8e1fd4881a475bf80bc0717ba.r2.dev/i2B-LOGO.png",
      links: [] as string[],
    },
    {
      title: "Walumo and Moringa School Hackathon",
      dates: "July 1st - 4th, 2025",
      location: "Nairobi, Kenya",
      description:
        "Developed an AI powered HR management system that streamlines and automates hiring, employee management, and payroll processing for teams.",
      image:
        "https://pub-c6a134c8e1fd4881a475bf80bc0717ba.r2.dev/FB_IMG_1753166941314.jpg",
      links: [] as string[],
    },
  ],
  photos: [
    {
      id: 1,
      src: "https://pub-c6a134c8e1fd4881a475bf80bc0717ba.r2.dev/canva/seanmotanyaatthedubaimiraclegarden.png",
      alt: "Dubai Miracle Garden",
      caption: "Me at the Dubai Miracle Garden, 2024",
    },
    {
      id: 2,
      src: "https://pub-c6a134c8e1fd4881a475bf80bc0717ba.r2.dev/unigradpolaroidnobg.png",
      alt: "University Graduation",
      caption: "Me at my university graduation",
    },
    {
      id: 3,
      src: "https://pub-c6a134c8e1fd4881a475bf80bc0717ba.r2.dev/canva/seanmotanyaatthedubaidesertsafari.png",
      alt: "Dubai Desert Safari",
      caption: "Me at the Dubai Desert Safari, 2024",
    },
    {
      id: 4,
      src: "https://pub-c6a134c8e1fd4881a475bf80bc0717ba.r2.dev/canva/seanmotanyaattheolooluanaturetrail.png",
      alt: "Oloolua Nature Trail",
      caption: "Me at the Oloolua Nature Trail, 2025",
    },
  ],
} as const

