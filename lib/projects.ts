export type Project = {
  id: string;
  number: string;
  name: string;
  category: string;
  status: string;
  description: string;
  principle: string;
  stack: string[];
  motif: "mirror" | "grid" | "pace" | "synapse" | "food";
  href: string;
  source: string;
};

const portfolio = "https://koglesh-portfolio.vercel.app";
const github = "https://github.com/kogleshofficial-hub";

export const projects: Project[] = [
  {
    id: "mirror", number: "01", name: "MIRROR", category: "DETERMINISTIC SIMULATION", status: "CORE SYSTEM",
    description: "A decision-simulation engine for testing how constrained resources, queues and changing conditions affect outcomes.",
    principle: "Same supported inputs. Same rules. Repeatable outcomes.",
    stack: ["NEXT.JS", "REACT", "TYPESCRIPT"], motif: "mirror", href: portfolio, source: github
  },
  {
    id: "gridpulse", number: "02", name: "GRIDPULSE", category: "INFRASTRUCTURE INTELLIGENCE", status: "CORE SYSTEM",
    description: "An evidence-first control plane that keeps observed telemetry separate from validation, prediction and explanation.",
    principle: "Evidence first. Inference second. Never fabricate a signal.",
    stack: ["NEXT.JS", "POSTGRESQL", "ZOD", "AZURE"], motif: "grid", href: portfolio + "/projects/gridpulse", source: github
  },
  {
    id: "pace", number: "03", name: "PACE", category: "ACADEMIC WORKLOAD PLANNING", status: "CORE SYSTEM",
    description: "A workload planner that balances deadlines, effort, priority and available time into a practical seven-day plan.",
    principle: "A plan should respond to capacity, not wishful thinking.",
    stack: ["NEXT.JS", "TYPESCRIPT", "APPWRITE"], motif: "pace", href: portfolio, source: github
  },
  {
    id: "synapse", number: "04", name: "SYNAPSE", category: "LOCAL-FIRST PLANNING", status: "PRODUCT BUILD",
    description: "A local-first planner that converts tasks and available time into a clear, deterministic next-action schedule.",
    principle: "Reduce noise. Expose the next useful move.",
    stack: ["REACT", "TYPESCRIPT", "LOCAL STORAGE"], motif: "synapse", href: portfolio, source: github
  },
  {
    id: "foodloop", number: "05", name: "FOODLOOP", category: "SOCIAL-IMPACT MVP", status: "PRODUCT BUILD",
    description: "A food-rescue MVP for structured surplus-food listings, availability and requests. The first version was built on a phone.",
    principle: "Useful software starts with a real-world problem.",
    stack: ["NEXT.JS", "SUPABASE", "POSTGRESQL"], motif: "food", href: portfolio, source: github
  }
];