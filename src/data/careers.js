/** Careers page content. Open positions apply via email (mailto). Swap for an ATS link by replacing `applyHref`. */
export const careersContent = {
  applyEmail: 'careers@frame-studio.example',

  header: {
    eyebrow: 'Careers',
    lines: ['Join the', 'crew.'],
    intro: 'We are always looking for curious, generous people who care deeply about the craft of filmmaking.',
  },

  culture: {
    eyebrow: 'Culture',
    lines: ['How we', 'work.'],
    text: 'We keep teams small and ownership high. You will work next to directors, editors and producers who share their craft openly, and you will be trusted with real responsibility early.',
    image: '/images/about/culture.jpg',
    imageAlt: 'Crew members laughing between takes on a night shoot',
    values: [
      { title: 'Craft', text: 'We obsess over details nobody asked us to.' },
      { title: 'Candour', text: 'Honest feedback, delivered kindly and early.' },
      { title: 'Curiosity', text: 'Every project is a chance to learn something new.' },
    ],
  },

  benefits: [
    { title: 'Health & wellbeing', text: 'Comprehensive medical, dental and vision, plus a monthly wellness stipend.' },
    { title: 'Time off', text: '25 days of paid leave, studio closure between Christmas and New Year, and recovery days after long shoots.' },
    { title: 'Learning budget', text: 'An annual budget for courses, festivals, books and equipment rentals for personal projects.' },
    { title: 'Gear access', text: 'Book studio cameras, lenses and edit suites for your own films outside project time.' },
    { title: 'Flexible work', text: 'Hybrid schedules for office-based roles, with core collaboration days on set or in studio.' },
    { title: 'Profit share', text: 'Every permanent team member shares in the studio’s annual profit.' },
  ],

  positions: [
    {
      id: 'producer',
      title: 'Line Producer',
      department: 'Production',
      location: 'Los Angeles, CA',
      type: 'Full-time',
      description: 'Run the budget, schedule and logistics of commercial and branded shoots from greenlight to wrap.',
      responsibilities: ['Build and manage production budgets', 'Crew, cast and locations', 'Lead on-set operations', 'Coordinate with post-production'],
    },
    {
      id: 'editor',
      title: 'Offline Editor',
      department: 'Post-production',
      location: 'Los Angeles, CA',
      type: 'Full-time',
      description: 'Shape documentary and commercial edits with directors, from first assembly to picture lock.',
      responsibilities: ['Cut long-form and short-form projects', 'Collaborate closely with directors', 'Manage project organisation in Premiere/Resolve', 'Hand off to colour and sound'],
    },
    {
      id: 'dp-assistant',
      title: '1st Assistant Camera',
      department: 'Camera',
      location: 'Los Angeles, CA / Travel',
      type: 'Freelance',
      description: 'Support our directors of photography on shoots, with a focus on focus pulling and camera prep.',
      responsibilities: ['Prep and maintain camera packages', 'Pull focus on commercial and narrative work', 'Manage camera reports and media', 'Travel for select shoots'],
    },
    {
      id: 'designer',
      title: 'Motion Designer',
      department: 'Creative',
      location: 'Hybrid',
      type: 'Full-time',
      description: 'Create titles, graphics and visual effects that extend the look of our films and campaigns.',
      responsibilities: ['Design titles, lower-thirds and graphics', 'Build motion systems for campaigns', 'Light compositing and clean-up', 'Work with editors and colourists'],
    },
    {
      id: 'intern',
      title: 'Production Intern',
      department: 'Production',
      location: 'Los Angeles, CA',
      type: 'Internship',
      description: 'A paid, three-month introduction to professional production, rotating across departments.',
      responsibilities: ['Assist producers and coordinators', 'Shadow shoots and edit sessions', 'Support studio operations', 'Work on a small personal project'],
    },
  ],

  openApplication: {
    lines: ['Don’t see', 'your role?'],
    text: 'We hire for talent first. Send us your reel, portfolio or a short note about what you would like to make.',
  },
}
