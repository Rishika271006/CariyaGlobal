/**
 * CARIYA GLOBAL - Courses Data & State Management System
 * Shared data layer between Public Pages and Admin Portal
 * Focus: Academic Structure, Eligibility, Duration & Curriculum (without fee structure)
 * Persisted in browser localStorage (cariya_courses_v3)
 */

const STORAGE_KEY = 'cariya_courses_v5';
const LEGACY_STORAGE_KEY = 'cariya_courses_v4';
const AUTH_KEY = 'cariya_admin_auth_v1';
const INQUIRIES_KEY = 'cariya_inquiries_v1';

// Default Cover Images available in CARIYA Global image directory
const CARIYA_IMAGE_LIBRARY = [
  { path: 'assets/images/hero-aviation-management-course.jpg', label: 'Aviation Management Course' },
  { path: 'assets/images/hero-aviation-courses.jpg', label: 'Aviation Courses' },
  { path: 'assets/images/hero-hotel-management-course.jpg', label: 'Hotel Management Course' },
  { path: 'assets/images/hero-hospitality-management-course.jpg', label: 'Hospitality Management Course' },
  { path: 'assets/images/hero-hospitality-courses.jpg', label: 'Hospitality Courses' },
  { path: 'assets/images/hero-tourism-management-course.jpg', label: 'Tourism Management Course' },
  { path: 'assets/images/hero-tourism-courses.jpg', label: 'Tourism Courses' },
  { path: 'assets/images/hero-travel-management-course.jpg', label: 'Travel Management Course' },
  { path: 'assets/images/hero-travel-courses.jpg', label: 'Travel Courses' },
  { path: 'assets/images/hero-courses.jpg', label: 'All Courses Hub' }
];

// Official Courses Catalog for CARIYA Global (Matching Verified Website Pages & Asian Pathways)
const DEFAULT_COURSES = [
  {
    id: 'course-aviation-mgmt',
    title: 'AI-Powered Aviation Management Course',
    pageUrl: 'aviation-management-course.html',
    destination: 'Singapore • Thailand • Malaysia / Hybrid',
    category: 'aviation',
    industry: 'Aviation Management',
    duration: '2 / 3 / 6 / 12 Months',
    eligibility: '10th Pass or 12th Pass',
    mode: 'Online · Offline · Hybrid',
    targetAudience: 'Students after 10th & 12th, Career Starters',
    rating: 4.95,
    badge: 'AI-Powered Training',
    status: 'active',
    image: 'assets/images/hero-aviation-management-course.jpg',
    description: "CARIYA Global's AI-Powered Aviation Management Course develops practical knowledge for the modern aviation industry, including airport operations, airline services, passenger handling, aviation customer service, ground operations, aviation administration and digital aviation technologies.",
    features: [
      'Airport & Aviation Operations',
      'Airline Operations & Services',
      'Passenger Handling & Ground Services',
      'Aviation Customer Service',
      'Aviation Administration & Management',
      'Aviation Marketing & Digital Technologies'
    ],
    inclusions: [
      'Flexible 2, 3, 6 and 12-Month Pathways',
      'Online, Offline and Hybrid Delivery',
      'Singapore, Thailand & Malaysia Study Pathways',
      'AI-Assisted Customer & Operational Workflows',
      'Industry-Recognised CARIYA Certificate / Diploma'
    ],
    createdAt: '2026-03-01T10:00:00Z'
  },
  {
    id: 'course-hotel-mgmt',
    title: 'AI-Powered Hotel Management Course',
    pageUrl: 'hotel-management-course.html',
    destination: 'Singapore • Thailand • Malaysia / Hybrid',
    category: 'hospitality',
    industry: 'Hotel Management',
    duration: '2 / 3 / 6 / 12 Months',
    eligibility: '10th Pass or 12th Pass',
    mode: 'Online · Offline · Hybrid',
    targetAudience: 'Students after 10th & 12th, Career Starters',
    rating: 4.93,
    badge: 'AI-Powered Training',
    status: 'active',
    image: 'assets/images/hero-hotel-management-course.jpg',
    description: "CARIYA Global's AI-powered Hotel Management Course develops practical knowledge of hotel operations, guest services and hospitality management. Combines core professional skills, operational understanding, digital workflows and emerging AI tools.",
    features: [
      'Front Office & Guest Services',
      'Housekeeping Operations',
      'Food & Beverage Operations',
      'Hotel Operations & Administration',
      'Hospitality Communication',
      'AI-Powered Hotel Management'
    ],
    inclusions: [
      'Flexible 2, 3, 6 and 12-Month Pathways',
      'Online, Offline and Hybrid Delivery',
      'Singapore, Thailand & Malaysia Study Pathways',
      'Personalized Guest Experience & AI Tools',
      'Industry-Recognised CARIYA Certificate / Diploma'
    ],
    createdAt: '2026-03-02T10:00:00Z'
  },
  {
    id: 'course-hospitality-mgmt',
    title: 'AI-Powered Hospitality Management Course',
    pageUrl: 'hospitality-management-course.html',
    destination: 'Singapore • Thailand • Malaysia / Hybrid',
    category: 'hospitality',
    industry: 'Hospitality Leadership',
    duration: '2 / 3 / 6 / 12 Months',
    eligibility: '10th Pass or 12th Pass',
    mode: 'Online · Offline · Hybrid',
    targetAudience: 'Students after 10th & 12th, Career Starters',
    rating: 4.91,
    badge: 'AI-Powered Training',
    status: 'active',
    image: 'assets/images/hero-hospitality-management-course.jpg',
    description: 'Executive pathway providing a broader view of hospitality, combining operations, guest experience, service management, professional communication and emerging AI technology awareness for luxury hospitality across Asia.',
    features: [
      'Hospitality Operations Structure',
      'Guest Experience & Customer Service',
      'Front Office & Accommodation',
      'Food & Beverage & Events',
      'Hospitality Sales, Marketing & Digital',
      'Professional Skills & Career Readiness'
    ],
    inclusions: [
      'Flexible 2, 3, 6 and 12-Month Pathways',
      'Online, Offline and Hybrid Delivery',
      'Singapore, Thailand & Malaysia Study Pathways',
      'AI-Assisted Customer-Service Workflows',
      'CARIYA Global Professional Diploma'
    ],
    createdAt: '2026-03-03T10:00:00Z'
  },
  {
    id: 'course-tourism-mgmt',
    title: 'AI-Powered Tourism Management Course',
    pageUrl: 'tourism-management-course.html',
    destination: 'Singapore • Thailand • Malaysia / Hybrid',
    category: 'tourism',
    industry: 'Tourism Management',
    duration: '2 / 3 / 6 / 12 Months',
    eligibility: '10th Pass or 12th Pass',
    mode: 'Online · Offline · Hybrid',
    targetAudience: 'Students after 10th & 12th, Career Starters',
    rating: 4.88,
    badge: 'AI-Powered Training',
    status: 'active',
    image: 'assets/images/hero-tourism-management-course.jpg',
    description: "CARIYA Global's AI-Powered Tourism Management Course develops practical knowledge for the wider tourism and visitor economy: destination management, travel services, tourism marketing, MICE, heritage tourism, and AI-powered destination workflows.",
    features: [
      'Tourism Fundamentals & Operations',
      'Destination Management & Branding',
      'Travel & Tour Operations',
      'Tourism Marketing & Digital Promotion',
      'MICE, Events & Experience Tourism',
      'Heritage, Culture & Sustainable Tourism'
    ],
    inclusions: [
      'Flexible 2, 3, 6 and 12-Month Pathways',
      'Online, Offline and Hybrid Delivery',
      'Singapore, Thailand & Malaysia Study Pathways',
      'AI-Assisted Travel Planning & Itineraries',
      'Industry-Recognised CARIYA Certificate / Diploma'
    ],
    createdAt: '2026-03-04T10:00:00Z'
  },
  {
    id: 'course-travel-mgmt',
    title: 'AI-Powered Travel Management Course',
    pageUrl: 'travel-management-course.html',
    destination: 'Singapore • Thailand • Malaysia / Hybrid',
    category: 'travel',
    industry: 'Travel Management',
    duration: '2 / 3 / 6 / 12 Months',
    eligibility: '10th Pass or 12th Pass',
    mode: 'Online · Offline · Hybrid',
    targetAudience: 'Students after 10th & 12th, Career Starters',
    rating: 4.87,
    badge: 'AI-Powered Training',
    status: 'active',
    image: 'assets/images/hero-travel-management-course.jpg',
    description: "CARIYA Global's Travel Management Course focuses on the operational and commercial side of travel, including itinerary planning, documentation, corporate travel, supplier coordination, tour packaging, customer management and AI-powered travel workflows.",
    features: [
      'Travel Operations & Ticketing',
      'Travel Documentation & Regulations',
      'Corporate Travel & Client Management',
      'Tour Packaging & Itinerary Planning',
      'Travel Sales & Customer Experience',
      'MICE & Corporate Travel Workflows'
    ],
    inclusions: [
      'Flexible 2, 3, 6 and 12-Month Pathways',
      'Online, Offline and Hybrid Delivery',
      'Singapore, Thailand & Malaysia Study Pathways',
      'AI-Assisted Travel Ideation & Workflows',
      'Industry-Recognised CARIYA Certificate / Diploma'
    ],
    createdAt: '2026-03-05T10:00:00Z'
  },
  {
    id: 'course-aviation-pathway',
    title: 'Aviation Courses (Airline Services & Ground Operations Track)',
    pageUrl: 'aviation-courses.html',
    destination: 'Singapore • Thailand • Malaysia / Hybrid',
    category: 'aviation',
    industry: 'Aviation Ground Operations',
    duration: '2 / 3 / 6 / 12 Months',
    eligibility: '10th Pass or 12th Pass',
    mode: 'Online · Offline · Hybrid',
    targetAudience: 'Students after 10th & 12th, Career Starters',
    rating: 4.90,
    badge: 'Core Sector Track',
    status: 'active',
    image: 'assets/images/hero-aviation-courses.jpg',
    description: "Operational ground and passenger service training: terminal management, check-in, gate coordination, ramp awareness, baggage handling, safety compliance, and professional aviation communication across Asia's skies.",
    features: [
      'Airport & Ground Operations',
      'Passenger Services & Check-In',
      'Airline Commercial Basics & Fares',
      'Safety, Security & Compliance',
      'Cargo & Logistics Awareness',
      'Professional Aviation Communication'
    ],
    inclusions: [
      'Flexible 2, 3, 6 and 12-Month Pathways',
      'Online, Offline and Hybrid Delivery',
      'Asia Sky Hub Opportunities (Singapore, Malaysia, Thailand)',
      'Airline Screening & Interview Prep Drills',
      'CARIYA Global Course Certificate'
    ],
    createdAt: '2026-03-06T10:00:00Z'
  },
  {
    id: 'course-hospitality-pathway',
    title: 'Hospitality Courses (Foundations & Luxury Operations Track)',
    pageUrl: 'hospitality-courses.html',
    destination: 'Singapore • Thailand • Malaysia / Hybrid',
    category: 'hospitality',
    industry: 'Hospitality Operations',
    duration: '2 / 3 / 6 / 12 Months',
    eligibility: '10th Pass or 12th Pass',
    mode: 'Online · Offline · Hybrid',
    targetAudience: 'Students after 10th & 12th, Career Starters',
    rating: 4.89,
    badge: 'Core Sector Track',
    status: 'active',
    image: 'assets/images/hero-hospitality-courses.jpg',
    description: 'Broad foundation in hospitality and hotel management for students looking to build practical skills. Combines professional education with AI-driven learning and practical industry training across Asia.',
    features: [
      'Front Office Operations',
      'Guest Experience & Customer Service',
      'Housekeeping Standards',
      'Food & Beverage Operations',
      'Hospitality Technology & Digital Workflows',
      'Professional Communication & Etiquette'
    ],
    inclusions: [
      'Flexible 2, 3, 6 and 12-Month Pathways',
      'Online, Offline and Hybrid Delivery',
      'Singapore, Thailand & Malaysia Pathway Guidance',
      'Hospitality Grooming & Communication Clinics',
      'CARIYA Global Course Certificate'
    ],
    createdAt: '2026-03-07T10:00:00Z'
  },
  {
    id: 'course-tourism-pathway',
    title: 'Tourism Courses (Travel Agency & Destination Operations Track)',
    pageUrl: 'tourism-courses.html',
    destination: 'Singapore • Thailand • Malaysia / Hybrid',
    category: 'tourism',
    industry: 'Tourism Operations',
    duration: '2 / 3 / 6 / 12 Months',
    eligibility: '10th Pass or 12th Pass',
    mode: 'Online · Offline · Hybrid',
    targetAudience: 'Students after 10th & 12th, Career Starters',
    rating: 4.85,
    badge: 'Core Sector Track',
    status: 'active',
    image: 'assets/images/hero-tourism-courses.jpg',
    description: 'Covers destination operations, tour planning, guiding, ground handling for visitors, commercial costing and sustainable tourism practice across Southeast Asia destinations.',
    features: [
      'Destination Knowledge & Seasonality',
      'Tour Operations & Itinerary Scheduling',
      'Visitor Experience & Guiding Ethics',
      'Commercial Costing & Pricing Logic',
      'Sustainable & Responsible Tourism',
      'Digital & Online Marketing Channels'
    ],
    inclusions: [
      'Flexible 2, 3, 6 and 12-Month Pathways',
      'Online, Offline and Hybrid Delivery',
      'Asia Destination Pathways Guidance',
      'Tour Planning & Costing Case Studies',
      'CARIYA Global Course Certificate'
    ],
    createdAt: '2026-03-08T10:00:00Z'
  },
  {
    id: 'course-travel-pathway',
    title: 'Travel Courses (GDS, Ticketing & Tour Planning Track)',
    pageUrl: 'travel-courses.html',
    destination: 'Singapore • Thailand • Malaysia / Hybrid',
    category: 'travel',
    industry: 'Travel Trade & Ticketing',
    duration: '2 / 3 / 6 / 12 Months',
    eligibility: '10th Pass or 12th Pass',
    mode: 'Online · Offline · Hybrid',
    targetAudience: 'Students after 10th & 12th, Career Starters',
    rating: 4.86,
    badge: 'Core Sector Track',
    status: 'active',
    image: 'assets/images/hero-travel-courses.jpg',
    description: 'Focuses on operational precision in the commercial travel trade: booking systems, fare structures, ticketing logic, multi-component itinerary sequencing, client qualification, and travel documentation.',
    features: [
      'Booking & Reservation Systems',
      'Fares, Ticketing Concepts & Reissues',
      'Itinerary & Multi-Component Package Building',
      'Client Servicing & Sales Negotiation',
      'Documentation & Visa Awareness',
      'Travel Business & Distribution Models'
    ],
    inclusions: [
      'Flexible 2, 3, 6 and 12-Month Pathways',
      'Online, Offline and Hybrid Delivery',
      'Singapore, Thailand & Malaysia Travel Pathways',
      'Ticketing & Package Costing Simulation',
      'CARIYA Global Course Certificate'
    ],
    createdAt: '2026-03-09T10:00:00Z'
  }
];

// Alias for backwards compatibility
const DEFAULT_PACKAGES = DEFAULT_COURSES;

// Helper functions for Data Operations
const CariyaCoursesStore = {
  // Get all courses (with automatic localStorage version check)
  getAll: function () {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Verify that stored catalog doesn't contain legacy dummy entries
          const hasLegacyDummy = parsed.some(p => p.id === 'course-cabin-crew' || (p.title && p.title.includes('Sector 34-A')));
          if (!hasLegacyDummy) {
            return parsed;
          }
        }
      }
    } catch (e) {
      console.warn('Error reading courses from localStorage, using defaults:', e);
    }

    // Initialize default courses
    this.saveAll(DEFAULT_COURSES);
    return DEFAULT_COURSES;
  },

  // Save full courses array
  saveAll: function (courses) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(courses));
      localStorage.setItem(LEGACY_STORAGE_KEY, JSON.stringify(courses));
      return true;
    } catch (e) {
      console.error('Failed to save to localStorage:', e);
      return false;
    }
  },

  // Get single course by ID
  getById: function (id) {
    const list = this.getAll();
    return list.find(item => item.id === id) || null;
  },

  // Add new course
  add: function (courseData) {
    const list = this.getAll();
    const id = 'course-' + Date.now().toString(36) + '-' + Math.random().toString(36).substring(2, 6);
    const newCourse = {
      id: id,
      title: courseData.title.trim(),
      pageUrl: courseData.pageUrl ? courseData.pageUrl.trim() : (courseData.url ? courseData.url.trim() : 'courses.html'),
      destination: courseData.destination ? courseData.destination.trim() : 'Singapore • Thailand • Malaysia / Hybrid',
      category: courseData.category || 'hospitality',
      industry: courseData.industry || 'Hospitality',
      duration: (courseData.duration || '2 / 3 / 6 / 12 Months').trim(),
      eligibility: (courseData.eligibility || '10th Pass or 12th Pass').trim(),
      mode: courseData.mode || 'Online · Offline · Hybrid',
      targetAudience: courseData.targetAudience ? courseData.targetAudience.trim() : 'Students after 10th & 12th, Career Starters',
      rating: Number(courseData.rating) || 4.9,
      badge: courseData.badge ? courseData.badge.trim() : '',
      status: courseData.status || 'active',
      image: courseData.image || 'assets/images/hero-courses.jpg',
      description: courseData.description ? courseData.description.trim() : '',
      features: Array.isArray(courseData.features) ? courseData.features : (courseData.features ? courseData.features.split(',').map(s => s.trim()).filter(Boolean) : []),
      inclusions: Array.isArray(courseData.inclusions) ? courseData.inclusions : (courseData.inclusions ? courseData.inclusions.split(',').map(s => s.trim()).filter(Boolean) : []),
      createdAt: new Date().toISOString()
    };
    list.unshift(newCourse);
    this.saveAll(list);

    // Sync to Supabase cloud if configured
    if (typeof window !== 'undefined' && window.CariyaSupabase && window.CariyaSupabase.isConfigured()) {
      window.CariyaSupabase.syncPackage(newCourse).catch(e => console.warn('Supabase auto-sync error:', e));
    }

    return newCourse;
  },

  // Update existing course
  update: function (id, updateData) {
    const list = this.getAll();
    const index = list.findIndex(item => item.id === id);
    if (index === -1) return null;

    const existing = list[index];
    const updated = {
      ...existing,
      ...updateData,
      id: id,
      pageUrl: updateData.pageUrl !== undefined ? updateData.pageUrl.trim() : existing.pageUrl,
      targetAudience: updateData.targetAudience !== undefined ? updateData.targetAudience.trim() : existing.targetAudience,
      destination: updateData.destination !== undefined ? updateData.destination.trim() : existing.destination,
      duration: updateData.duration !== undefined ? updateData.duration.trim() : existing.duration,
      eligibility: updateData.eligibility !== undefined ? updateData.eligibility.trim() : existing.eligibility,
      mode: updateData.mode !== undefined ? updateData.mode : existing.mode,
      rating: Number(updateData.rating !== undefined ? updateData.rating : existing.rating),
      features: Array.isArray(updateData.features) ? updateData.features : (typeof updateData.features === 'string' ? updateData.features.split(',').map(s => s.trim()).filter(Boolean) : existing.features),
      inclusions: Array.isArray(updateData.inclusions) ? updateData.inclusions : (typeof updateData.inclusions === 'string' ? updateData.inclusions.split(',').map(s => s.trim()).filter(Boolean) : existing.inclusions),
      updatedAt: new Date().toISOString()
    };

    list[index] = updated;
    this.saveAll(list);

    // Sync to Supabase cloud if configured
    if (typeof window !== 'undefined' && window.CariyaSupabase && window.CariyaSupabase.isConfigured()) {
      window.CariyaSupabase.syncPackage(updated).catch(e => console.warn('Supabase auto-sync error:', e));
    }

    return updated;
  },

  // Delete course
  delete: function (id) {
    const list = this.getAll();
    const filtered = list.filter(item => item.id !== id);
    if (filtered.length !== list.length) {
      this.saveAll(filtered);

      // Delete from Supabase cloud if configured
      if (typeof window !== 'undefined' && window.CariyaSupabase && window.CariyaSupabase.isConfigured()) {
        window.CariyaSupabase.deletePackage(id).catch(e => console.warn('Supabase auto-delete error:', e));
      }

      return true;
    }
    return false;
  },

  // Toggle active/inactive status
  toggleStatus: function (id) {
    const list = this.getAll();
    const target = list.find(item => item.id === id);
    if (target) {
      target.status = target.status === 'active' ? 'inactive' : 'active';
      this.saveAll(list);

      // Sync updated status to Supabase cloud
      if (typeof window !== 'undefined' && window.CariyaSupabase && window.CariyaSupabase.isConfigured()) {
        window.CariyaSupabase.syncPackage(target).catch(e => console.warn('Supabase auto-sync error:', e));
      }

      return target;
    }
    return null;
  },

  // Reset to initial default courses
  resetToDefaults: function () {
    this.saveAll(DEFAULT_COURSES);
    return DEFAULT_COURSES;
  },

  // Export JSON string for download
  exportJSON: function () {
    const data = this.getAll();
    return JSON.stringify(data, null, 2);
  },

  // Import JSON string
  importJSON: function (jsonStr) {
    try {
      const parsed = JSON.parse(jsonStr);
      if (Array.isArray(parsed) && parsed.length > 0) {
        this.saveAll(parsed);
        return { success: true, count: parsed.length };
      }
      return { success: false, error: 'JSON does not contain a valid array of courses.' };
    } catch (e) {
      return { success: false, error: e.message };
    }
  }
};

// Aliases for compatibility
const CariyaPackagesStore = CariyaCoursesStore;

// ============================================================================
// FRONT PAGE POSTS / INSIGHTS DATA STORE
// ============================================================================
const POSTS_STORAGE_KEY = 'cariya_posts_v1';

const DEFAULT_POSTS = [
  {
    id: 'post-ai-hospitality',
    title: 'The Rise of AI in Modern Hospitality & Hotel Management',
    category: 'hospitality',
    industry: 'Hospitality Tech',
    author: 'CARIYA Editorial Desk',
    date: '08 Oct 2026',
    readTime: '4 min read',
    image: 'assets/images/hero-hotel-management-course.jpg',
    excerpt: 'How artificial intelligence and automated guest experience tools are transforming front-office operations and career skills across premier Asian hotels.',
    content: 'Artificial intelligence is revolutionizing the global hospitality industry. Modern hotels and luxury resorts are integrating AI-powered personalization, automated front desk check-in systems, predictive customer preferences, and dynamic revenue management tools.',
    link: 'insights.html',
    status: 'published',
    featuredOnHome: true,
    createdAt: '2026-10-08T09:00:00Z'
  },
  {
    id: 'post-aviation-screening',
    title: 'Cabin Crew & Airport Operations: What Airlines Look for in 2026',
    category: 'aviation',
    industry: 'Aviation Careers',
    author: 'Aviation Faculty Panel',
    date: '05 Oct 2026',
    readTime: '5 min read',
    image: 'assets/images/hero-aviation-management-course.jpg',
    excerpt: 'From personality grooming to emergency safety drills, explore the key competencies required to clear international airline screening assessments.',
    content: 'Airlines across India, the Middle East, and Southeast Asia are experiencing record passenger volume. Recruitment teams place high value on communication poise, situational awareness, grooming standards, and customer service composure.',
    link: 'aviation-courses.html',
    status: 'published',
    featuredOnHome: true,
    createdAt: '2026-10-05T11:00:00Z'
  },
  {
    id: 'post-asia-internships',
    title: 'Why International Internships Across Asia Accelerate Career Progression',
    category: 'internships',
    industry: 'Global Pathways',
    author: 'International Career Cell',
    date: '02 Oct 2026',
    readTime: '6 min read',
    image: 'assets/images/hero-internships-singapore.jpg',
    excerpt: 'Gaining hands-on rotational training in Singapore, Thailand, and Malaysia equips candidates with real global exposure and high placement velocity.',
    content: 'Employers in tourism and luxury hospitality place immense weight on candidates with international exposure. An overseas internship demonstrates cultural adaptability, language fluency, and familiarity with multinational standard operating procedures.',
    link: 'internships.html',
    status: 'published',
    featuredOnHome: true,
    createdAt: '2026-10-02T14:30:00Z'
  },
  {
    id: 'post-ecotourism-asia',
    title: 'Sustainable Tourism & Ecotourism: High-Growth Career Tracks in Southeast Asia',
    category: 'tourism',
    industry: 'Eco-Tourism',
    author: 'Tourism Faculty Panel',
    date: '28 Sep 2026',
    readTime: '5 min read',
    image: 'assets/images/hero-tourism-management-course.jpg',
    excerpt: 'Explore how green certifications, sustainable resort stewardship, and cultural heritage tours are generating new executive opportunities across Thailand, Bali, and Vietnam.',
    content: 'The global shift toward eco-conscious travel is redefining destination management. Luxury resorts and boutique travel providers now seek professionals skilled in carbon neutrality planning, sustainable supply chain management, and authentic cultural engagement.',
    link: 'tourism-management-course.html',
    status: 'published',
    featuredOnHome: false,
    createdAt: '2026-09-28T10:00:00Z'
  },
  {
    id: 'post-travel-gds-tech',
    title: 'Mastering GDS & Modern Travel Tech: Why Amadeus and Galileo Skills Still Win',
    category: 'travel',
    industry: 'Travel Tech & GDS',
    author: 'Travel Trade Guild',
    date: '24 Sep 2026',
    readTime: '4 min read',
    image: 'assets/images/hero-travel-management-course.jpg',
    excerpt: 'Understand the core architecture of Global Distribution Systems (GDS), IATA billing systems, and New Distribution Capability (NDC) shaping modern ticketing.',
    content: 'Even in an era of direct booking apps, corporate travel management, luxury itinerary planning, and consolidator ticketing rely on Global Distribution Systems like Amadeus and Galileo. Students mastering fare calculation and automated ticketing enjoy immediate career placement.',
    link: 'travel-courses.html',
    status: 'published',
    featuredOnHome: false,
    createdAt: '2026-09-24T08:30:00Z'
  },
  {
    id: 'post-singapore-malaysia-study',
    title: 'Studying in Asia: Comparing Singapore, Malaysia & Thailand for Hospitality Education',
    category: 'study-asia',
    industry: 'Study in Asia',
    author: 'Admissions Advisory Panel',
    date: '18 Sep 2026',
    readTime: '7 min read',
    image: 'assets/images/hero-study-in-singapore.jpg',
    excerpt: 'A realistic breakdown of tuition affordability, living standards, work authorization, and internship pathways across Asia\'s top education destinations.',
    content: 'Choosing where to study hospitality or tourism abroad requires balancing academic credentials with practical training rights. Singapore offers premier luxury brands and cutting-edge operational frameworks; Malaysia offers cost-effective dual qualifications; Thailand provides unparalleled resort hospitality training.',
    link: 'study-in-asia.html',
    status: 'published',
    featuredOnHome: false,
    createdAt: '2026-09-18T12:00:00Z'
  },
  {
    id: 'post-luxury-resort-pms',
    title: 'The Secrets of Hotel Front Office: Opera Cloud & Property Management Systems',
    category: 'hospitality',
    industry: 'Hotel Management',
    author: 'CARIYA Technical Trainer',
    date: '12 Sep 2026',
    readTime: '5 min read',
    image: 'assets/images/hero-hospitality-management-course.jpg',
    excerpt: 'Why practical simulation on PMS software like Opera Cloud gives students an unfair advantage in luxury 5-star hotel interviews.',
    content: 'Front desk managers look for candidates who need zero basic training. By learning reservation check-in workflows, guest profile management, room allocation logic, and cashiering reconciliations before placement, students start with supervisory potential.',
    link: 'hospitality-management-course.html',
    status: 'published',
    featuredOnHome: false,
    createdAt: '2026-09-12T15:00:00Z'
  },
  {
    id: 'post-aviation-ground-vs-cabin',
    title: 'Airport Ground Handling vs. Cabin Crew: Which Aviation Pathway Fits You?',
    category: 'aviation',
    industry: 'Aviation Careers',
    author: 'Aviation Faculty Panel',
    date: '06 Sep 2026',
    readTime: '4 min read',
    image: 'assets/images/hero-aviation-courses.jpg',
    excerpt: 'Compare day-to-day duties, shift timings, physical requirements, and long-term supervisory tracks between flight operations and airport customer services.',
    content: 'While cabin crew roles offer high travel exposure and prestige, airport ground handling operations (ramp management, load dispatch, boarding supervision, VIP concierge) offer predictable rosters and faster promotions into airport duty station managers.',
    link: 'aviation-management-course.html',
    status: 'published',
    featuredOnHome: false,
    createdAt: '2026-09-06T11:20:00Z'
  },
  {
    id: 'post-interview-resume-guide',
    title: 'How to Build an International Hospitality Resume That Clears First-Round Screening',
    category: 'internships',
    industry: 'Career Advice',
    author: 'Career Guidance Cell',
    date: '01 Sep 2026',
    readTime: '6 min read',
    image: 'assets/images/hero-career-opportunities.jpg',
    excerpt: 'Practical resume structuring, professional grooming photography, situational interview tactics, and cultural etiquette for international recruiters.',
    content: 'Overseas hotel HR managers scan hundreds of international internship applications daily. Formatting your practical modules, language capabilities, customer service anecdotes, and certifications in international standard format is essential to securing early interview offers.',
    link: 'career-opportunities.html',
    status: 'published',
    featuredOnHome: false,
    createdAt: '2026-09-01T09:15:00Z'
  }
];

const CariyaPostsStore = {
  getAll: function () {
    try {
      const stored = localStorage.getItem(POSTS_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Merge any new default posts seamlessly so admin accesses all posts
          const existingIds = new Set(parsed.map(p => p.id));
          let merged = [...parsed];
          let updated = false;
          DEFAULT_POSTS.forEach(def => {
            if (!existingIds.has(def.id)) {
              merged.push(def);
              updated = true;
            }
          });
          if (updated) {
            this.saveAll(merged);
          }
          return merged;
        }
      }
    } catch (e) {
      console.warn('Error reading posts from localStorage:', e);
    }
    this.saveAll(DEFAULT_POSTS);
    return DEFAULT_POSTS;
  },

  saveAll: function (posts) {
    try {
      localStorage.setItem(POSTS_STORAGE_KEY, JSON.stringify(posts));
      return true;
    } catch (e) {
      console.error('Failed to save posts to localStorage:', e);
      return false;
    }
  },

  getById: function (id) {
    const list = this.getAll();
    return list.find(item => item.id === id) || null;
  },

  getTopPublished: function (limit = 3) {
    const list = this.getAll();
    const published = list.filter(item => item.status === 'published');
    const featured = published.filter(item => item.featuredOnHome);
    const nonFeatured = published.filter(item => !item.featuredOnHome);
    const ordered = [...featured, ...nonFeatured];
    return ordered.slice(0, limit);
  },

  getPublished: function () {
    const list = this.getAll();
    return list.filter(item => item.status === 'published');
  },

  add: function (postData) {
    const list = this.getAll();
    const id = 'post-' + Date.now().toString(36) + '-' + Math.random().toString(36).substring(2, 6);
    const newPost = {
      id: id,
      title: postData.title.trim(),
      category: postData.category || 'hospitality',
      industry: postData.industry || 'Industry Insights',
      author: postData.author ? postData.author.trim() : 'CARIYA Editorial Desk',
      date: postData.date ? postData.date.trim() : new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      readTime: postData.readTime ? postData.readTime.trim() : '4 min read',
      image: postData.image || 'assets/images/hero-home.jpg',
      excerpt: postData.excerpt ? postData.excerpt.trim() : '',
      content: postData.content ? postData.content.trim() : '',
      link: postData.link ? postData.link.trim() : 'insights.html',
      status: postData.status || 'published',
      featuredOnHome: Boolean(postData.featuredOnHome),
      createdAt: new Date().toISOString()
    };
    list.unshift(newPost);
    this.saveAll(list);
    return newPost;
  },

  update: function (id, updateData) {
    const list = this.getAll();
    const index = list.findIndex(item => item.id === id);
    if (index === -1) return null;

    const existing = list[index];
    const updated = {
      ...existing,
      ...updateData,
      featuredOnHome: updateData.featuredOnHome !== undefined ? Boolean(updateData.featuredOnHome) : existing.featuredOnHome,
      id: id,
      updatedAt: new Date().toISOString()
    };
    list[index] = updated;
    this.saveAll(list);
    return updated;
  },

  delete: function (id) {
    const list = this.getAll();
    const filtered = list.filter(item => item.id !== id);
    if (filtered.length !== list.length) {
      this.saveAll(filtered);
      return true;
    }
    return false;
  },

  toggleStatus: function (id) {
    const list = this.getAll();
    const target = list.find(item => item.id === id);
    if (target) {
      target.status = target.status === 'published' ? 'draft' : 'published';
      this.saveAll(list);
      return target;
    }
    return null;
  },

  toggleFeatured: function (id) {
    const list = this.getAll();
    const target = list.find(item => item.id === id);
    if (target) {
      target.featuredOnHome = !target.featuredOnHome;
      this.saveAll(list);
      return target;
    }
    return null;
  }
};

// Export to window
if (typeof window !== 'undefined') {
  window.CariyaCoursesStore = CariyaCoursesStore;
  window.CariyaPackagesStore = CariyaCoursesStore;
  window.DEFAULT_COURSES = DEFAULT_COURSES;
  window.DEFAULT_PACKAGES = DEFAULT_COURSES;
  window.CARIYA_IMAGE_LIBRARY = CARIYA_IMAGE_LIBRARY;
  window.CariyaPostsStore = CariyaPostsStore;
  window.DEFAULT_POSTS = DEFAULT_POSTS;
}
