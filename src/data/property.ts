export type Media = {
  src: string
  srcSet: string
  alt: string
}

function media(id: string, alt: string): Media {
  const base = `https://images.unsplash.com/${id}?auto=format&fit=crop&q=75`
  return {
    src: `${base}&w=1800`,
    srcSet: `${base}&w=640 640w, ${base}&w=960 960w, ${base}&w=1400 1400w, ${base}&w=1800 1800w, ${base}&w=2400 2400w`,
    alt,
  }
}

export const property = {
  name: 'XYZ',
  retreat: 'XYZ RETREAT',
  villa: 'XYZ VILLA',
  experience: 'XYZ EXPERIENCE',
  locationName: 'XYZ LOCATION',
  tagline: 'A PLACE TO DISAPPEAR',
  phone: '+91 XXXXX XXXXX',
  email: 'hello@xyz.com',
  price: '₹XX,XXX',
  priceNight: '₹XX,XXX / NIGHT',
  coordinates: 'XX.XXXX° N  ·  XX.XXXX° E',

  location: {
    line: 'XYZ · XYZ',
    city: 'XYZ',
    region: 'XYZ',
    address: 'XYZ, XYZ',
  },

  nav: [
    { id: 'stay', label: 'STAY', href: '#stay' },
    { id: 'experience', label: 'EXPERIENCE', href: '#experiences' },
    { id: 'journal', label: 'JOURNAL', href: '#journal' },
    { id: 'contact', label: 'CONTACT', href: '#contact' },
  ],

  hero: {
    kicker: 'XYZ / EXPERIENCE 01',
    headline: ['A PLACE', 'to disappear.'],
    support: 'Slow mornings. Wild landscapes. Nothing else required.',
    cta: 'ENTER XYZ',
    scroll: 'SCROLL',
    image: media(
      'photo-1470770841072-f978cf4d019e',
      'XYZ retreat — a quiet house held between water and mountain',
    ),
  },

  arrival: {
    index: '01 / ARRIVAL',
    headline: ['SOMEWHERE', 'BETWEEN', 'SILENCE & SKY.'],
    body: 'XYZ is designed around the simple luxury of having nowhere else to be.',
    cta: 'DISCOVER',
  },

  typography: {
    lead: ['SLOW', 'DOWN.'],
    words: ['BREATHE.', 'WANDER.', 'REST.', 'RETURN.'],
  },

  visualStory: {
    index: 'XYZ / LOOK',
    opener: ['ROOMS,', 'WEATHER,', 'NOTHING', 'IN BETWEEN.'],
    items: [
      {
        id: 'vs-1',
        num: '01',
        word: 'FORM.',
        note: 'XYZ',
        caption: 'XYZ / 01',
        image: media(
          'photo-1600596542815-ffad4c1539a9',
          'XYZ architecture — a quiet volume set against trees',
        ),
      },
      {
        id: 'vs-2',
        num: '02',
        word: 'WITHIN.',
        note: 'XYZ',
        caption: 'XYZ / 02',
        image: media(
          'photo-1618221195710-dd6b41faaea6',
          'XYZ interior — stone, timber, and morning light',
        ),
      },
      {
        id: 'vs-3',
        num: '03',
        word: 'WEATHER.',
        note: 'XYZ / XYZ',
        caption: 'XYZ / 03',
        image: media(
          'photo-1501785888041-af3ef285b470',
          'XYZ landscape — water and weather with no edge in sight',
        ),
      },
      {
        id: 'vs-4',
        num: '04',
        word: 'WATER.',
        note: 'XYZ',
        caption: 'XYZ / 04',
        image: media(
          'photo-1571003123894-1f0594d2b5d9',
          'XYZ pool — a still plane of water at dusk',
        ),
      },
      {
        id: 'vs-5',
        num: '05',
        word: 'STILLNESS.',
        note: 'XYZ',
        caption: 'XYZ / 05',
        image: media(
          'photo-1540555700478-4be289fbecef',
          'XYZ EXPERIENCE — unhurried hours, no faces required',
        ),
      },
    ],
  },

  stay: {
    index: '02 / THE STAY',
    headline: ['FIND YOUR', 'PLACE HERE.'],
    cta: 'EXPLORE',
    accommodations: [
      {
        id: '01',
        name: 'XYZ VILLA',
        area: 'XYZ SQ.FT.',
        guests: 'X GUESTS',
        bed: 'XYZ BED',
        price: '₹XX,XXX / NIGHT',
        image: media(
          'photo-1613490493576-7fde63acd811',
          'XYZ VILLA — a private pavilion opening to water',
        ),
      },
      {
        id: '02',
        name: 'XYZ SUITE',
        area: 'XYZ SQ.FT.',
        guests: 'X GUESTS',
        bed: 'XYZ BED',
        price: '₹XX,XXX / NIGHT',
        image: media(
          'photo-1590490360182-c33d57733427',
          'XYZ SUITE — linen, shadow, and a long window',
        ),
      },
      {
        id: '03',
        name: 'XYZ RESIDENCE',
        area: 'XYZ SQ.FT.',
        guests: 'X GUESTS',
        bed: 'XYZ BED',
        price: '₹XX,XXX / NIGHT',
        image: media(
          'photo-1600607687920-4e2a09cf159d',
          'XYZ RESIDENCE — rooms arranged around quiet',
        ),
      },
    ],
  },

  experiences: {
    index: '03 / EXPERIENCE',
    headline: ['EXPERIENCES', 'WITHOUT', 'AN ITINERARY.'],
    items: [
      {
        id: '01',
        title: 'XYZ EXPERIENCE',
        note: 'XYZ',
        image: media('photo-1441974231531-c6227db76b6e', 'XYZ EXPERIENCE 01'),
      },
      {
        id: '02',
        title: 'XYZ EXPERIENCE',
        note: 'XYZ',
        image: media('photo-1414235077428-338989a2e8c0', 'XYZ EXPERIENCE 02'),
      },
      {
        id: '03',
        title: 'XYZ EXPERIENCE',
        note: 'XYZ',
        image: media('photo-1544161515-4ab6ce6db874', 'XYZ EXPERIENCE 03'),
      },
      {
        id: '04',
        title: 'XYZ EXPERIENCE',
        note: 'XYZ',
        image: media('photo-1476514525535-07fb3b4ae5f1', 'XYZ EXPERIENCE 04'),
      },
      {
        id: '05',
        title: 'XYZ EXPERIENCE',
        note: 'XYZ',
        image: media('photo-1419242902214-272b3f66ee7a', 'XYZ EXPERIENCE 05'),
      },
    ],
  },

  cinematic: {
    headline: ['NOTHING', 'BUT TIME.'],
    kicker: 'XYZ / XYZ',
    image: media(
      'photo-1470071459604-3b5ec3a7fe05',
      'XYZ landscape held in mist',
    ),
    video:
      'https://videos.pexels.com/video-files/3571264/3571264-uhd_2560_1440_30fps.mp4',
  },

  details: {
    heading: 'THE DETAILS',
    items: [
      'PRIVATE POOL',
      'XYZ DINING',
      'SPA',
      'BREAKFAST',
      'NATURE TRAILS',
      'BONFIRE',
      'PRIVATE TERRACE',
      'WIFI',
    ],
  },

  architecture: {
    index: '04 / ARCHITECTURE',
    headline: ['BUILT FOR', 'THE LANDSCAPE.'],
    image: media(
      'photo-1600607687939-ce8a6c25118c',
      'XYZ architecture — volumes aligned to light and land',
    ),
    labels: [
      { id: 'XYZ / 01', x: 22, y: 38 },
      { id: 'XYZ / 02', x: 68, y: 24 },
      { id: 'XYZ / 03', x: 74, y: 72 },
    ],
  },

  journal: {
    index: '05 / JOURNAL',
    heading: 'FROM XYZ',
    articles: [
      {
        kicker: 'XYZ JOURNAL',
        title: 'XYZ TITLE',
        date: 'XYZ DATE',
        image: media(
          'photo-1540541338287-41700207dee6',
          'XYZ JOURNAL — a long table in open air',
        ),
      },
      {
        kicker: 'XYZ JOURNAL',
        title: 'XYZ TITLE',
        date: 'XYZ DATE',
        image: media(
          'photo-1469474968028-56623f02e42e',
          'XYZ JOURNAL — weather moving across XYZ',
        ),
      },
      {
        kicker: 'XYZ JOURNAL',
        title: 'XYZ TITLE',
        date: 'XYZ DATE',
        image: media(
          'photo-1510798831971-661eb04b3739',
          'XYZ JOURNAL — a quiet structure in XYZ',
        ),
      },
    ],
  },

  testimonials: {
    index: '06 / GUESTS',
    items: [
      {
        quote: 'A place that made time feel different.',
        name: 'GUEST NAME',
        origin: 'XYZ',
      },
      {
        quote: 'I arrived with a list. I left without one.',
        name: 'GUEST NAME',
        origin: 'XYZ',
      },
      {
        quote: 'Nothing to do. Everything to feel.',
        name: 'GUEST NAME',
        origin: 'XYZ',
      },
    ],
  },

  map: {
    index: '07 / LOCATION',
    center: 'XYZ',
    distance: 'XX KM',
    duration: 'XX MIN',
    place: 'XYZ',
    nearby: [
      { label: 'XYZ', x: 22, y: 30 },
      { label: 'XYZ', x: 78, y: 22 },
      { label: 'XYZ', x: 70, y: 74 },
    ],
  },

  finale: {
    headline: ['LEAVE', 'EVERYTHING', 'BEHIND.'],
    kicker: 'XYZ / XYZ',
    cta: 'BEGIN YOUR STAY',
    image: media(
      'photo-1506905925346-21bda4d32df4',
      'XYZ at last light — a dark ridgeline and open sky',
    ),
  },

  booking: {
    heading: 'YOUR STAY.',
    fields: {
      checkIn: { label: 'CHECK-IN', placeholder: 'DD / MM / YYYY' },
      checkOut: { label: 'CHECK-OUT', placeholder: 'DD / MM / YYYY' },
      guests: { label: 'GUESTS', placeholder: 'X GUESTS' },
      stay: { label: 'STAY', placeholder: 'XYZ' },
    },
    cta: 'CHECK AVAILABILITY',
    thanksTitle: 'THANK YOU.',
    thanksBody: 'Your request has been received.',
  },

  footer: {
    note: 'XYZ RETREAT',
    rights: 'XYZ  ·  ALL DETAILS ARE PLACEHOLDER',
  },

  scenes: [
    { id: '01', href: '#hero', label: '01' },
    { id: '02', href: '#arrival', label: '02' },
    { id: '03', href: '#stay', label: '03' },
    { id: '04', href: '#experiences', label: '04' },
    { id: '05', href: '#cinematic', label: '05' },
    { id: '06', href: '#architecture', label: '06' },
    { id: '07', href: '#journal', label: '07' },
    { id: '08', href: '#finale', label: '08' },
  ],
}

export type Property = typeof property
export type Accommodation = (typeof property.stay.accommodations)[number]
export type Experience = (typeof property.experiences.items)[number]
