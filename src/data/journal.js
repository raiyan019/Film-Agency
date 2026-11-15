/** Journal articles. Newest first is handled by getLatestArticles(). Dates use ISO format. */
export const articles = [
  {
    id: 'neon-hours-one-night',
    slug: 'shooting-neon-hours-in-one-night',
    title: 'Shooting Neon Hours in One Night',
    category: 'Behind the Scenes',
    date: '2026-10-21',
    author: 'Elias Varga',
    readTime: '6 min read',
    excerpt: 'Nine locations, one sunset-to-sunrise window and a lighting plan written on the back of a call sheet.',
    image: '/images/journal/neon-hours-one-night.jpg',
    content: [
      'When Vesper Waves asked for a video that felt like a single endless night, we took it literally. One shoot, one night, nine locations across the city.',
      'The plan only worked because every setup was lit practically: street signs, car headlights, and a handful of tungsten sources hidden in frame. Moving fast meant we never rebuilt a lighting rig.',
      'By sunrise we had every shot on the list and two we hadn’t planned. Both made the cut.',
    ],
  },
  {
    id: 'why-anamorphic',
    slug: 'why-we-still-shoot-anamorphic',
    title: 'Why We Still Shoot Anamorphic',
    category: 'Craft',
    date: '2026-09-30',
    author: 'Elias Varga',
    readTime: '5 min read',
    excerpt: 'Oval bokeh, horizontal flares and a wider frame: the case for a format that refuses to be neutral.',
    image: '/images/journal/why-anamorphic.jpg',
    content: [
      'Anamorphic lenses are slower, heavier and less forgiving. We use them anyway.',
      'The characteristic look is only part of it. The wider aspect ratio changes how we compose people and space, and it gives commercial work an instant sense of scale.',
      'Used with intent, the format is a storytelling tool, not a filter.',
    ],
  },
  {
    id: 'eleven-weeks-salt-road',
    slug: 'eleven-weeks-on-the-salt-road',
    title: 'Eleven Weeks on the Salt Road',
    category: 'Behind the Scenes',
    date: '2026-09-12',
    author: 'Maya Okonkwo',
    readTime: '8 min read',
    excerpt: 'What it takes to follow a caravan route for a documentary, and what the footage taught us about patience.',
    image: '/images/journal/eleven-weeks-salt-road.jpg',
    content: [
      'The Salt Road began as a three-week shoot. It became eleven, because the story kept changing and we kept following it.',
      'A small crew, local fixers and a flexible schedule were the only things that made that possible.',
      'The best scenes in the film are the ones we didn’t plan for.',
    ],
  },
  {
    id: 'second-stage',
    slug: 'frame-opens-a-second-stage',
    title: 'FRAME® Opens a Second Stage',
    category: 'Studio News',
    date: '2026-08-27',
    author: 'Noor Haddad',
    readTime: '3 min read',
    excerpt: 'A 4,000 sq ft sound stage, a cyclorama wall and a new grading suite, all under one roof.',
    image: '/images/journal/second-stage.jpg',
    content: [
      'Demand for in-house production has outgrown our original space, so this autumn we opened a second stage a few blocks away.',
      'It features a full cyclorama, a rigging grid and a dedicated colour suite for client sessions.',
      'Bookings for the new stage are open from January.',
    ],
  },
  {
    id: 'longer-edit',
    slug: 'the-case-for-a-longer-edit',
    title: 'The Case for a Longer Edit',
    category: 'Craft',
    date: '2026-07-15',
    author: 'Tomás Reyes',
    readTime: '5 min read',
    excerpt: 'Why we build edits slowly, and why the extra week almost always pays for itself.',
    image: '/images/journal/longer-edit.jpg',
    content: [
      'Post-production is the first place budgets get squeezed. It is also where films are won.',
      'Giving an edit time to breathe lets the structure reveal itself. Rushed cuts tend to repeat the script rather than improve on it.',
      'We now plan post at the start of every project, not the end.',
    ],
  },
  {
    id: 'brand-films-not-ads',
    slug: 'brand-films-that-dont-feel-like-ads',
    title: 'Brand Films That Don’t Feel Like Ads',
    category: 'Industry',
    date: '2026-06-03',
    author: 'Ingrid Solberg',
    readTime: '7 min read',
    excerpt: 'Audiences scroll past advertising but stay for stories. Here is how we build brand films people choose to watch.',
    image: '/images/journal/brand-films-not-ads.jpg',
    content: [
      'The best brand films start with a human truth, not a product feature.',
      'We lead with character and conflict, and let the brand appear as part of the world rather than the point of it.',
      'It takes more nerve from clients, and it works better every time.',
    ],
  },
]

export const journalCategories = ['All', ...new Set(articles.map((article) => article.category))]

export const getArticleBySlug = (slug) => articles.find((article) => article.slug === slug)

export const getLatestArticles = (count = 3) =>
  [...articles].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, count)

export const formatArticleDate = (isoDate) =>
  new Intl.DateTimeFormat('en-US', { day: 'numeric', month: 'short', year: 'numeric' }).format(new Date(isoDate))
