import { tool } from 'ai';
import { z } from 'zod';

export const getInternship = tool({
  description:
    "Summarizes the internship Mousa is seeking and how to reach him. Use when users ask about internships, availability, or contact.",
  parameters: z.object({}),
  execute: async () => {
    return `Here’s what I’m looking for 👇

- 📅 **Duration**: ~12-month internship starting **September 2025**
- 🌎 **Location**: **Toronto / GTA**, **Ottawa**, **Kingston**, **remote**; open to **US (Detroit/Michigan & elsewhere)** with sponsorship
- 🎯 **Focus**: AI/ML applications, **embedded systems & robotics**, software engineering (backend or full-stack), tooling & agentic workflows
- 🧰 **Stack**: Python, C/C++, TypeScript/JavaScript, React/Next.js, Flask, LangChain, Whisper, FAISS, Streamlit, Git/GitHub, SolidWorks, MATLAB
- 🚀 **Highlights**: 
  - Built **AIVA** (AI Voice Assistant) solo at Systems Limited—demoed to the department & division president; proposed to scale
  - Shipped **NoteBuddy** (voice → structured dental notes) for Creekwood Dental, used in real workflows
  - Led **Jurassic Rescue Robot** under strict hardware constraints (MREN 303), plus multiple embedded/IoT builds
  - 2+ years tutoring university STEM (calc, data structures, architecture) and leadership as a Residence Don

- 🛂 **Work authorization**: Based in **Canada** on a student visa; **may require U.S. visa sponsorship** for roles in the United States

📬 **Contact**
- Email: **mousapir@gmail.com**
- LinkedIn: **https://linkedin.com/in/mousa-pirzada**
- GitHub: **https://github.com/20mup**

If this sounds like a fit, let’s chat!`;
  },
});
