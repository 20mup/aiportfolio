
import { tool } from 'ai';
import { z } from 'zod';

export const getCrazy = tool({
  description:
    "Shares Mousa's esports background: League of Legends Masters rank and Queen’s University Esports experience.",
  parameters: z.object({}),
  execute: async () => {
    return `Esports? That’s my playground 🎮

- 🏆 **Rank**: **Masters** (solo queue, NA)
- 🏫 **Team**: **Queen’s University Esports** — **3 seasons** on the League of Legends roster
- 🎯 **Role**: Mid, ADC
- 🧠 **Strengths**: shotcalling, macro, drafts, tilt control
- ❤️ **Champs**: Akali, Katarina, Yone, Zed, Lucian
- ✍️ **What it taught me**: communication under pressure, iteration, reading opponents, and staying calm when everything’s on fire

Got a favorite comp or champ synergy you swear by?`;
  },
});
