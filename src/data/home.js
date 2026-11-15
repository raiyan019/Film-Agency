/** Homepage copy and media paths. Edit freely; components read everything from here. */
export const homeContent = {
  hero: {
    lines: ['We make', 'Moving', 'Pictures.'],
    descriptor:
      'An independent film production studio crafting commercials, documentaries and music videos with a cinematic eye.',
    video: '/videos/hero.mp4', // replace with your own looping clip (MP4, ~10–20s, under 8 MB)
    poster: '/images/hero-poster.jpg',
  },

  intro: {
    eyebrow: 'The studio',
    lines: ['Stories deserve', 'to be seen.'],
    body: [
      'FRAME® is a Los Angeles film production studio built by directors, cinematographers and editors who believe a good story needs a great frame around it.',
      'From a thirty-second spot to a feature-length documentary, we write, shoot and finish every project in-house, so the idea you pitch is the film you see.',
    ],
    cta: { label: 'About the studio', to: '/about' },
    image: '/images/studio.jpg',
    imageAlt: 'Crew setting up a camera on a dolly inside the FRAME studio',
    stats: [
      { value: '140+', label: 'Films produced' },
      { value: '23', label: 'Festival awards' },
      { value: '12', label: 'Countries shot in' },
    ],
  },

  works: {
    eyebrow: 'Selected work',
    title: 'Selected Works',
    cta: { label: 'All work', to: '/work' },
  },

  services: {
    eyebrow: 'What we do',
    title: 'Services',
  },

  showreel: {
    title: 'Showreel 2026',
    duration: '02:14',
    video: '/videos/showreel.mp4', // replace with your reel
    poster: '/images/showreel-poster.jpg',
  },

  process: {
    eyebrow: 'How we work',
    title: 'Production Process',
    steps: [
      {
        number: '01',
        title: 'Discover',
        description:
          'We start by listening. Goals, audience, tone, references and constraints are mapped before a single frame is imagined.',
      },
      {
        number: '02',
        title: 'Develop',
        description:
          'Treatments, scripts, storyboards and look-books turn the idea into a plan, with budget and schedule locked alongside it.',
      },
      {
        number: '03',
        title: 'Produce',
        description:
          'Cast, crew, locations and cameras come together. Our producers protect the vision on set while keeping the day on time.',
      },
      {
        number: '04',
        title: 'Deliver',
        description:
          'Edit, grade, sound and finishing in-house, then mastered for cinema, broadcast and every screen your audience uses.',
      },
    ],
  },

  team: {
    eyebrow: 'The people',
    title: 'Creative Team',
    cta: { label: 'Meet the team', to: '/team' },
  },

  journal: {
    eyebrow: 'Journal',
    title: 'From the Journal',
    cta: { label: 'All articles', to: '/journal' },
  },

  cta: {
    lines: ['Have a story', 'worth telling?'],
    button: { label: 'Start a conversation', to: '/contact' },
  },
}
