const reviewsByCategory = {
  Stationery: [
    {
      name: 'Ananya R.',
      rating: 5,
      date: '2 weeks ago',
      text: 'Exactly what I needed for the semester. The quality is way better than what I expected at this price.',
    },
    {
      name: 'Rohit K.',
      rating: 4,
      date: '1 month ago',
      text: 'Solid everyday use. Delivery reached my hostel in a day, which was a lifesaver before my exam.',
    },
    {
      name: 'Meera S.',
      rating: 5,
      date: '1 month ago',
      text: 'Been using this for a few weeks now and it still looks new. Would definitely order again.',
    },
  ],
  'Tech Accessories': [
    {
      name: 'Aditya V.',
      rating: 5,
      date: '1 week ago',
      text: 'Battery life and build quality are genuinely impressive. Works perfectly with my laptop and phone.',
    },
    {
      name: 'Sneha P.',
      rating: 4,
      date: '3 weeks ago',
      text: 'Great value for a student budget. Took a day to figure out the setup, but it has been flawless since.',
    },
    {
      name: 'Karan M.',
      rating: 5,
      date: '1 month ago',
      text: 'Bought this before a project deadline and it saved me. Compact, reliable and exactly as described.',
    },
  ],
  Books: [
    {
      name: 'Ishita B.',
      rating: 5,
      date: '1 week ago',
      text: 'The explanations are clear and the practice questions are actually helpful for exams. Worth every rupee.',
    },
    {
      name: 'Dev N.',
      rating: 4,
      date: '2 weeks ago',
      text: 'Good print quality and arrived without any damage. The content is aligned with our syllabus.',
    },
    {
      name: 'Priya T.',
      rating: 5,
      date: '1 month ago',
      text: 'This has become my go-to reference. Short, practical and easy to revise from before internals.',
    },
  ],
  'College Merch': [
    {
      name: 'Arjun D.',
      rating: 5,
      date: '5 days ago',
      text: 'Fits perfectly and the material feels premium. Already got compliments from my hostel floor.',
    },
    {
      name: 'Nandini C.',
      rating: 4,
      date: '2 weeks ago',
      text: 'Colour is exactly like the pictures and it survived a full wash without shrinking. Good buy.',
    },
    {
      name: 'Sameer G.',
      rating: 5,
      date: '1 month ago',
      text: 'Perfect campus vibe. Comfortable enough to wear all day and the print quality is clean.',
    },
  ],
}

export function getProductReviews(product) {
  return reviewsByCategory[product.category] || reviewsByCategory.Stationery
}
