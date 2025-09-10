import { tool } from 'ai';
import { z } from 'zod';

export const getPresentation = tool({
  description:
    'This tool returns a concise personal introduction of Mousa Pirzada. It is used to answer the question "Who are you?" or "Tell me about yourself".',
  parameters: z.object({}),
  execute: async () => {
    return {
      presentation:
        "I'm Mousa Pirzada, a Mechatronics & Robotics Engineering student at Queen’s University. I specialize in AI applications, embedded systems, and robotics. I’ve built projects like AIVA (an AI Voice Assistant), NoteBuddy (voice-to-notes app for dentists), and the Jurassic Rescue Robot. I'm passionate about creating AI-driven tools, real-world robotics, and solving problems with tech.",
    };
  },
});
