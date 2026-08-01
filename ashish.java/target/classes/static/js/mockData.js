const INITIAL_EVENTS = [
  {
    id: 1,
    title: "Global Tech & AI Summit 2026",
    category: "Conference",
    status: "upcoming",
    date: "2026-09-15",
    time: "09:00 AM - 05:00 PM",
    venue: "Convention Center, Hall A",
    location: "San Francisco, CA",
    price: 199,
    capacity: 500,
    bookedSeats: 342,
    description: "Join industry pioneers, AI researchers, and engineering leaders to explore neural architectures and scalable AI infrastructure.",
    coverUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80",
    speakers: [
      { name: "Dr. Elena Rostova", title: "Chief AI Scientist at NeuralCorp" },
      { name: "Marcus Vance", title: "VP Engineering at CloudScale" }
    ],
    agenda: [
      { time: "09:00 AM", title: "Keynote: Next-Gen Autonomous AI Agents" },
      { time: "11:30 AM", title: "Panel: Scaling Deep Learning in Production" }
    ]
  },
  {
    id: 2,
    title: "Neon Wave Music & Arts Festival",
    category: "Concert",
    status: "upcoming",
    date: "2026-10-02",
    time: "06:00 PM - 01:00 AM",
    venue: "Skyline Arena Park",
    location: "Austin, TX",
    price: 85,
    capacity: 2500,
    bookedSeats: 1890,
    description: "An immersive evening of synthwave, electronic music, live light displays, and interactive digital art installations.",
    coverUrl: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=800&q=80",
    speakers: [
      { name: "SynthLord Live", title: "Electronic Artist" }
    ],
    agenda: [
      { time: "06:00 PM", title: "Doors Open & Ambient Soundscapes" },
      { time: "08:30 PM", title: "Main Stage Performance" }
    ]
  },
  {
    id: 3,
    title: "Full-Stack Web Performance Workshop",
    category: "Workshop",
    status: "upcoming",
    date: "2026-08-20",
    time: "10:00 AM - 03:00 PM",
    venue: "Innovation Hub, Room 304",
    location: "New York, NY",
    price: 49,
    capacity: 60,
    bookedSeats: 55,
    description: "Hands-on masterclass focusing on Core Web Vitals optimization, bundle size reduction, and browser DevTools auditing.",
    coverUrl: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=800&q=80",
    speakers: [
      { name: "Sarah Jenkins", title: "Web Performance Architect" }
    ],
    agenda: [
      { time: "10:00 AM", title: "Profiling LCP, INP & CLS" }
    ]
  },
  {
    id: 4,
    title: "Venture Pitch Night & Founder Mixer",
    category: "Meetup",
    status: "upcoming",
    date: "2026-08-28",
    time: "05:30 PM - 09:00 PM",
    venue: "Catalyst Co-Working Lounge",
    location: "Seattle, WA",
    price: 0,
    capacity: 120,
    bookedSeats: 110,
    description: "Connect with angel investors, VC partners, and early-stage founders. Watch 8 high-growth startups pitch live for seed funding.",
    coverUrl: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=800&q=80",
    speakers: [
      { name: "David Chen", title: "Partner at Apex Ventures" }
    ],
    agenda: [
      { time: "05:30 PM", title: "Networking & Drinks" }
    ]
  }
];
