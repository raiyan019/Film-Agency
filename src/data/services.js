/** Studio services. `slug` doubles as the anchor id on /services (e.g. /services#documentary). */
export const services = [
  {
    id: 'film-production',
    slug: 'film-production',
    number: '01',
    title: 'Film Production',
    summary: 'Short films and features, from first draft to final master.',
    description:
      'Full-service production for narrative films: development, casting, crewing, shooting and delivery, run by producers who have carried independent films through festivals and distribution.',
    deliverables: ['Development & scripting', 'Casting & crewing', 'Principal photography', 'Festival & distribution delivery'],
    image: '/images/services/film-production.jpg',
  },
  {
    id: 'commercial-films',
    slug: 'commercial-films',
    number: '02',
    title: 'Commercial Films',
    summary: 'Campaign films that look like cinema and perform like advertising.',
    description:
      'Concept-to-screen advertising for brands and agencies: broadcast spots, digital campaigns and social cut-downs with the production value of a short film.',
    deliverables: ['Concept & treatment', 'Directing & cinematography', 'Campaign cut-downs', 'Broadcast & social masters'],
    image: '/images/services/commercial-films.jpg',
  },
  {
    id: 'documentary',
    slug: 'documentary',
    number: '03',
    title: 'Documentary',
    summary: 'Real stories, patiently told and beautifully shot.',
    description:
      'Feature and short documentaries built on trust and access. We embed with people and places for as long as the story needs, then shape the footage with an editor’s discipline.',
    deliverables: ['Research & access', 'Verité & interview shooting', 'Archive licensing', 'Story editing'],
    image: '/images/services/documentary.jpg',
  },
  {
    id: 'music-videos',
    slug: 'music-videos',
    number: '04',
    title: 'Music Videos',
    summary: 'Visual worlds for artists, labels and live tours.',
    description:
      'Performance, narrative and experimental music videos, plus visuals for live shows. Fast-moving shoots, bold looks and edits that move with the track.',
    deliverables: ['Video treatments', 'Performance & narrative shoots', 'Visual effects', 'Tour & live visuals'],
    image: '/images/services/music-videos.jpg',
  },
  {
    id: 'creative-direction',
    slug: 'creative-direction',
    number: '05',
    title: 'Creative Direction',
    summary: 'The big idea, the visual language and the story that holds it together.',
    description:
      'Strategy-led creative direction for brand films and campaigns: positioning, narrative, look-development and art direction, from pitch decks to on-set supervision.',
    deliverables: ['Brand storytelling', 'Look development', 'Storyboards & pre-vis', 'On-set creative supervision'],
    image: '/images/services/creative-direction.jpg',
  },
  {
    id: 'post-production',
    slug: 'post-production',
    number: '06',
    title: 'Post-production',
    summary: 'Editing, colour, sound and finishing under one roof.',
    description:
      'An in-house post team handling offline and online editing, colour grading, motion graphics, sound design, mixing and mastering for every platform.',
    deliverables: ['Editorial', 'Colour grading', 'Motion graphics & VFX', 'Sound design & mix'],
    image: '/images/services/post-production.jpg',
  },
]

export const getServiceBySlug = (slug) => services.find((service) => service.slug === slug)
