export const TECH_STACK = {
  frontend: [
    { icon: 'devicon-react-original colored', label: 'React' },
    { icon: 'devicon-typescript-plain colored', label: 'TypeScript' },
    { icon: 'devicon-nextjs-plain', label: 'Next.js' },
    { icon: 'devicon-tailwindcss-plain colored', label: 'Tailwind' },
  ],
  backend: [
    { icon: 'devicon-nodejs-plain colored', label: 'Node.js' },
    { icon: 'devicon-express-original', label: 'Express' },
    { icon: 'devicon-prisma-original', label: 'Prisma' },
  ],
  database: [
    { icon: 'devicon-postgresql-plain colored', label: 'PostgreSQL' },
    { icon: 'devicon-mongodb-plain colored', label: 'MongoDB' },
  ],
  tools: [
    { icon: 'devicon-git-plain colored', label: 'Git' },
  ],
};

export const PROJECTS = [
  {
    title: "QR Based Attendance System",
    desc: "QR based attendance system",
    image: "/QR Based attendance system.png",
    tech: ["MongoDB", "Express", "React", "Node.js"],
    status: "LIVE",
  },
  {
    title: "Note Box",
    desc: "Note box - A note keeping app",
    image: "/Note keeping webapp.png",
    tech: ["JavaScript", "Firebase"],
    status: "LIVE",
  },
  {
    title: "Medicdiet Clinic",
    desc: "Medicdiet clinic - a dietetic consulatation website",
    image: "/medicdiet clinic.png",
    tech: ["MongoDB", "Express", "React", "Node.js"],
    status: "LIVE",
  },
];

export const LOGS = [
  {
    time: "10:42",
    action: "Deployed Articles Studio to production",
    status: "SUCCESS",
  },
  {
    time: "09:18",
    action: "Integrated Prisma ORM with PostgreSQL",
    status: "SUCCESS",
  },
  {
    time: "Yesterday",
    action: "Refactored dashboard state management",
    status: "UPDATE",
  },
  {
    time: "2 days ago",
    action: "Built authentication flow (JWT)",
    status: "SUCCESS",
  },
  {
    time: "3 days ago",
    action: "Optimized API response time (-32%)",
    status: "PERF",
  },
  {
    time: "Last week",
    action: "Initialized Portfolio Engine project",
    status: "INIT",
  },
];
