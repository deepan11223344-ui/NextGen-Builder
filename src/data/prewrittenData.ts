import { ResumeData } from '../types/resume';

export const prewrittenRoles = [
  {
    category: "Software Engineer",
    skills: ["React", "TypeScript", "Node.js", "Python", "SQL", "Git", "REST APIs", "AWS", "Docker", "Agile"],
    bullets: [
      "Developed and maintained scalable web applications utilizing React and TypeScript, improving page load speeds by 35%.",
      "Collaborated with cross-functional teams to design, build, and deploy 10+ robust features per quarter.",
      "Optimized legacy backend logic in Node.js, successfully reducing API response latencies by 45%.",
      "Implemented test-driven development (TDD) principles, increasing unit test coverage from 60% to 92%."
    ]
  },
  {
    category: "Marketing Specialist",
    skills: ["SEO", "Google Analytics", "Content Strategy", "Email Marketing", "PPC", "Social Media", "Copywriting"],
    bullets: [
      "Orchestrated multi-channel marketing campaigns that generated over $250k in pipeline revenue within 6 months.",
      "Boosted organic website traffic by 120% through aggressive SEO improvements and localized content mapping.",
      "Managed an advertising budget of $15k/month, driving a 4.2x ROI on Google Ads and paid social channels.",
      "Crafted automated drip email flows, lifting subscriber open rates by 18% and click-through rates by 9%."
    ]
  },
  {
    category: "Product Manager",
    skills: ["Product Roadmap", "User Research", "Scrum", "Jira", "A/B Testing", "Figma", "Data Analytics"],
    bullets: [
      "Owned full product lifecycle from discovery to launch for a mobile app serving 50k+ active users.",
      "Defined product strategy and prioritized feature backlogs using data-driven customer feedback loops.",
      "Facilitated daily standups, sprint planning, and retrospectives within an Agile framework.",
      "Collaborated with engineering and design leads to deliver core products 2 weeks ahead of schedule."
    ]
  },
  {
    category: "Customer Support",
    skills: ["Zendesk", "Intercom", "Troubleshooting", "CRM", "Empathy", "Ticketing System", "Active Listening"],
    bullets: [
      "Resolved an average of 60+ customer inquiries daily with a 98.4% Customer Satisfaction (CSAT) score.",
      "Authoring 35+ comprehensive internal and client-facing knowledge base articles to minimize ticket volume.",
      "Cross-trained 5 new support hires on CRM software, company protocols, and tier-1 escalation strategies.",
      "Liaised between engineering and clientele to escalate complex, game-breaking bugs effectively."
    ]
  }
];

export const atsBuzzwords = [
  "Spearheaded", "Engineered", "Optimized", "Maximized", "Generated", "Coached", "Developed",
  "Implemented", "Launched", "Collaborated", "Reduced", "Increased", "Negotiated", "Streamlined"
];

export const initialResumeData: ResumeData = {
  personalInfo: {
    fullName: "John Doe",
    email: "john.doe@example.com",
    phone: "(555) 123-4567",
    location: "New York, NY",
    website: "https://johndoe.dev",
    linkedin: "linkedin.com/in/johndoe",
    jobTitle: "Software Engineer",
    summary: "Passionate and results-driven Software Engineer with 4+ years of experience developing highly performant web architectures. Adept at full-stack optimization, agile collaboration, and modern framework architecture."
  },
  experience: [
    {
      id: "exp-1",
      company: "Tech Global Solutions",
      position: "Frontend Developer",
      startDate: "2023-01",
      endDate: "",
      current: true,
      description: "Spearheaded the design of an interactive client dashboard using React. Collaborated closely with backend engineers to consume microservices. Optimized client-side queries, dropping render overhead by 22%."
    },
    {
      id: "exp-2",
      company: "Innovate AI",
      position: "Junior Developer",
      startDate: "2021-06",
      endDate: "2022-12",
      current: false,
      description: "Maintained robust codebases in JavaScript and Python. Crafted responsive UI panels using Tailwind CSS. Authored documentation modules for automated testing pipelines."
    }
  ],
  education: [
    {
      id: "edu-1",
      school: "University of Technology",
      degree: "Bachelor of Science",
      field: "Computer Science",
      startDate: "2017-09",
      endDate: "2021-05",
      gpa: "3.8"
    }
  ],
  skills: [
    { id: "s-1", name: "JavaScript", level: "Expert" },
    { id: "s-2", name: "React", level: "Expert" },
    { id: "s-3", name: "CSS/Tailwind", level: "Expert" },
    { id: "s-4", name: "Node.js", level: "Intermediate" },
    { id: "s-5", name: "Problem Solving", level: "Expert" }
  ],
  projects: [
    {
      id: "p-1",
      name: "E-Commerce Micro-Engine",
      description: "Fully decoupled inventory interface capable of listing 10,000 SKUs seamlessly.",
      technologies: "React, GraphQL, Tailwind",
      link: "https://github.com/example/ecommerce"
    }
  ],
  certifications: [
    {
      id: "c-1",
      name: "AWS Certified Solutions Architect",
      issuer: "Amazon Web Services",
      date: "2023-08"
    }
  ]
};
