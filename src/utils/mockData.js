// Realistic initial pet dataset for PawCare
// High quality, direct, stable pet imagery from Unsplash curated for adoption platforms

export const INITIAL_PETS = [
  {
    id: 'pet-1',
    name: 'Cooper',
    species: 'dog',
    breed: 'Golden Retriever',
    ageYears: 2,
    ageMonths: 4,
    gender: 'Male',
    size: 'Large',
    color: 'Golden',
    location: 'Seattle Humane, WA',
    status: 'Available',
    image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Cooper is a gentle, sweet-natured Golden Retriever who loves belly rubs, playing fetch in the park, and greeting everyone with a wagging tail. He is leash-trained, knows basic commands (sit, paw, stay), and gets along wonderfully with children and other dogs.',
    personality: ['Affectionate', 'Playful', 'Energetic', 'Eager to please'],
    healthStatus: 'Fully vaccinated, neutered, microchipped, and flea treated.',
    goodWithKids: true,
    goodWithPets: true,
    adoptionFee: '₹3,500',
    intakeDate: '2024-03-12',
    featured: true
  },
  {
    id: 'pet-2',
    name: 'Mochi',
    species: 'cat',
    breed: 'Calico / Domestic Short Hair',
    ageYears: 1,
    ageMonths: 2,
    gender: 'Female',
    size: 'Small',
    color: 'Tricolor Calico',
    location: 'Austin Pet Haven, TX',
    status: 'Available',
    image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1573865526739-10659fec78a5?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Mochi is a curious calico lady who enjoys sunbathing by the window, watching birds, and curling up beside you while you read or work. She is quiet, respectful, and litter-box trained.',
    personality: ['Calm', 'Independent', 'Cuddly', 'Observant'],
    healthStatus: 'Spayed, up to date on all feline core vaccines, FIV/FeLV negative.',
    goodWithKids: true,
    goodWithPets: false,
    adoptionFee: '₹2,000',
    intakeDate: '2024-04-01',
    featured: true
  },
  {
    id: 'pet-3',
    name: 'Barnaby',
    species: 'dog',
    breed: 'French Bulldog',
    ageYears: 3,
    ageMonths: 0,
    gender: 'Male',
    size: 'Medium',
    color: 'Fawn',
    location: 'San Francisco SPCA, CA',
    status: 'Available',
    image: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Barnaby is a certified couch potato with a hilarious personality. He loves short neighborhood strolls followed by long afternoon naps. Perfect companion for apartment dwellers looking for low-to-medium energy.',
    personality: ['Goofy', 'Affectionate', 'Laid-back', 'Loyal'],
    healthStatus: 'Neutered, microchipped, vaccinated, airway evaluation normal.',
    goodWithKids: true,
    goodWithPets: true,
    adoptionFee: '₹4,500',
    intakeDate: '2024-02-28',
    featured: true
  },
  {
    id: 'pet-4',
    name: 'Oliver',
    species: 'cat',
    breed: 'Tabby',
    ageYears: 0,
    ageMonths: 7,
    gender: 'Male',
    size: 'Small',
    color: 'Orange Striped',
    location: 'Denver Animal Shelter, CO',
    status: 'Pending',
    image: 'https://images.unsplash.com/photo-1543852786-1cf6624b9987?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1543852786-1cf6624b9987?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Oliver is an adventurous orange tabby kitten with boundless energy! He loves chasing laser pointers, climbing cat towers, and purring like a tiny tractor when held.',
    personality: ['High-energy', 'Inquisitive', 'Playful', 'Vocal'],
    healthStatus: 'Neutered, dewormed, up-to-date on kitten vaccination series.',
    goodWithKids: true,
    goodWithPets: true,
    adoptionFee: '₹2,200',
    intakeDate: '2024-05-10',
    featured: false
  },
  {
    id: 'pet-5',
    name: 'Luna',
    species: 'dog',
    breed: 'Siberian Husky',
    ageYears: 2,
    ageMonths: 6,
    gender: 'Female',
    size: 'Large',
    color: 'Black & White',
    location: 'Portland Rescue Org, OR',
    status: 'Available',
    image: 'https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1507146426996-ef05306b995a?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Luna has mesmerizing blue eyes and a heart of gold. She loves hiking, running trails, and talking back with cute husky howls. Requires an active home with a fenced yard.',
    personality: ['Adventurous', 'Talkative', 'Intelligent', 'Athletic'],
    healthStatus: 'Spayed, microchipped, fully vaccinated, clear hip assessment.',
    goodWithKids: true,
    goodWithPets: true,
    adoptionFee: '₹4,000',
    intakeDate: '2024-01-15',
    featured: true
  },
  {
    id: 'pet-6',
    name: 'Clover',
    species: 'other',
    breed: 'Holland Lop Rabbit',
    ageYears: 1,
    ageMonths: 0,
    gender: 'Female',
    size: 'Small',
    color: 'White & Grey',
    location: 'Seattle Humane, WA',
    status: 'Available',
    image: 'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Clover is a floppy-eared Holland Lop bunny who enjoys fresh Timothy hay, romaine lettuce treats, and free-roaming in a bunny-proofed room. Very gentle.',
    personality: ['Gentle', 'Quiet', 'Curious'],
    healthStatus: 'Spayed, health-checked, litter box accustomed.',
    goodWithKids: true,
    goodWithPets: false,
    adoptionFee: '₹1,200',
    intakeDate: '2024-04-18',
    featured: false
  },
  {
    id: 'pet-7',
    name: 'Rocky',
    species: 'dog',
    breed: 'Beagle',
    ageYears: 4,
    ageMonths: 1,
    gender: 'Male',
    size: 'Medium',
    color: 'Tricolor',
    location: 'Austin Pet Haven, TX',
    status: 'Available',
    image: 'https://images.unsplash.com/photo-1505628346881-b72b27e84530?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1505628346881-b72b27e84530?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Rocky is a sweet beagle with a sensitive nose and an even bigger heart. He loves scent games, snuggling under warm blankets, and making friends on every walk.',
    personality: ['Friendly', 'Gentle', 'Food-motivated', 'Sweet'],
    healthStatus: 'Neutered, dental cleaning completed 2024, fully vaccinated.',
    goodWithKids: true,
    goodWithPets: true,
    adoptionFee: '₹2,800',
    intakeDate: '2024-03-01',
    featured: false
  },
  {
    id: 'pet-8',
    name: 'Cleo',
    species: 'cat',
    breed: 'Russian Blue Mix',
    ageYears: 2,
    ageMonths: 8,
    gender: 'Female',
    size: 'Medium',
    color: 'Silver Grey',
    location: 'San Francisco SPCA, CA',
    status: 'Adopted',
    image: 'https://images.unsplash.com/photo-1513360309081-36f20ca480d0?auto=format&fit=crop&w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1513360309081-36f20ca480d0?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Cleo was happily adopted by a wonderful family in May 2024! She loves her new sunspot and feather toys.',
    personality: ['Reserved at first', 'Very loving', 'Graceful'],
    healthStatus: 'Fully healthy, spayed, vaccinated.',
    goodWithKids: true,
    goodWithPets: true,
    adoptionFee: '₹2,000',
    intakeDate: '2024-01-20',
    featured: false
  }
];

export const SUCCESS_STORIES = [
  {
    id: 1,
    petName: 'Bella (formerly Daisy)',
    adopter: 'Sarah & Mark Chen',
    location: 'Seattle, WA',
    story: 'Adopting Bella through PawCare was the best decision we ever made. The application was seamless, and the shelter walked us through every step. Bella has brought so much joy and laughter into our home!',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
    petImage: 'https://images.unsplash.com/photo-1534361960057-19889db9621e?auto=format&fit=crop&w=400&q=80',
    date: 'Adopted 3 months ago'
  },
  {
    id: 2,
    petName: 'Milo',
    adopter: 'David Rodriguez',
    location: 'Austin, TX',
    story: 'As a remote software developer, having Milo by my side during work hours has changed my life. PawCare made finding a cat that matched my quiet apartment lifestyle so easy.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    petImage: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?auto=format&fit=crop&w=400&q=80',
    date: 'Adopted 6 months ago'
  },
  {
    id: 3,
    petName: 'Ziggy',
    adopter: 'Elena & Lucas Moreau',
    location: 'Denver, CO',
    story: 'Ziggy had been in the shelter for 7 months before we saw his profile on PawCare. Today he is our trail-running partner and cuddle champion. Thank you PawCare for connecting us!',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    petImage: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=400&q=80',
    date: 'Adopted 1 year ago'
  }
];

export const FAQS = [
  {
    question: 'How does the adoption process work on PawCare?',
    answer: 'Browse our available pets, filter by your preferences, and click "Adopt Now" on any pet profile to submit an application. Our partner shelter team reviews your application within 24-48 hours and contacts you for a virtual or in-person meet & greet!'
  },
  {
    question: 'What are the adoption fees and what do they cover?',
    answer: 'Adoption fees typically range from ₹1,200 to ₹4,500 depending on species and age. Every adoption fee directly covers spay/neuter surgery, up-to-date core vaccinations, microchip registration, deworming, and health checks.'
  },
  {
    question: 'Can I adopt if I live in an apartment or rent my home?',
    answer: 'Yes! Many dogs, cats, and rabbits thrive in apartments. We ask for landlord approval or pet policy verification as part of your living situation details to ensure a stable forever home.'
  },
  {
    question: 'How do I know if a pet is good with kids or other pets?',
    answer: 'Every pet profile includes behavioral tags ("Good with Kids", "Good with Pets") based on temperament testing by trained shelter staff. You can also discuss specific household compatibility during your meet & greet.'
  },
  {
    question: 'How can I become a shelter administrator on PawCare?',
    answer: 'Registered animal rescue organizations and municipal shelters can register for an admin account or request shelter access. Admins can list pets, upload photos, and manage applicant approvals through the Admin Dashboard.'
  }
];

