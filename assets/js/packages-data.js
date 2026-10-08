/**
 * CARIYA GLOBAL - Courses Data & State Management System
 * Shared data layer between Public Pages and Admin Portal
 * Focus: Academic Structure, Eligibility, Duration & Curriculum (without fee structure)
 * Persisted in browser localStorage (cariya_courses_v3)
 */

const STORAGE_KEY = 'cariya_courses_v3';
const LEGACY_STORAGE_KEY = 'cariya_packages_v1';
const AUTH_KEY = 'cariya_admin_auth_v1';
const INQUIRIES_KEY = 'cariya_inquiries_v1';

// Default Cover Images available in CARIYA Global image directory
const CARIYA_IMAGE_LIBRARY = [
  { path: 'assets/images/hero-hotel-management-course.jpg', label: 'Hotel Management Course' },
  { path: 'assets/images/hero-hotel-management-course-chandigarh.jpg', label: 'Hotel Management Chandigarh' },
  { path: 'assets/images/hero-hospitality-management-course.jpg', label: 'Hospitality Management Course' },
  { path: 'assets/images/hero-hospitality-courses.jpg', label: 'Hospitality Courses Hub' },
  { path: 'assets/images/hero-hospitality-courses-chandigarh.jpg', label: 'Hospitality Courses Chandigarh' },
  { path: 'assets/images/hero-aviation-management-course.jpg', label: 'Aviation Management Course' },
  { path: 'assets/images/hero-aviation.jpg', label: 'Aviation & Cabin Crew' },
  { path: 'assets/images/hero-aviation-courses-chandigarh.jpg', label: 'Aviation Courses Chandigarh' },
  { path: 'assets/images/hero-tourism-management-course.jpg', label: 'Tourism Management Course' },
  { path: 'assets/images/hero-tourism-courses.jpg', label: 'Tourism Courses & Guiding' },
  { path: 'assets/images/hero-travel-management-course.jpg', label: 'Travel Trade & GDS Operations' },
  { path: 'assets/images/hero-courses.jpg', label: 'All Courses & Programmes' }
];

// Initial Real Courses Catalog for CARIYA Global (Duration & Eligibility focused)
const DEFAULT_COURSES = [
  {
    id: 'course-hotel-mgmt',
    title: 'Hotel Management Course (Front Office, F&B & Housekeeping)',
    destination: 'Chandigarh Hub / Hybrid',
    category: 'hospitality',
    industry: 'Hotel Management',
    duration: '6 Months (2, 3, 6 & 12 Mos)',
    eligibility: '10th or 12th Pass',
    mode: 'Offline Class & Labs',
    rating: 4.92,
    badge: 'AI-Powered Curriculum',
    status: 'active',
    image: 'assets/images/hero-hotel-management-course.jpg',
    description: 'Comprehensive hotel operations diploma covering front office management, guest relations, housekeeping standards, F&B service, and emerging AI tools for personalized hospitality guest experiences.',
    features: ['Front Office & Reservations', 'Housekeeping Presentation Standards', 'F&B Service Fundamentals', 'AI Guest Experience Tools'],
    inclusions: [
      'Practical Lab Simulation & Front Office Software',
      'PMS (Opera / Fidelio) Operations Training',
      'Hospitality Grooming & Communication Clinics',
      'Placement & Internship Fast-Track Referral',
      'Verified CARIYA Global Certificate'
    ],
    createdAt: '2026-03-01T10:00:00Z'
  },
  {
    id: 'course-hospitality-mgmt',
    title: 'Hospitality Management Course (Resort Operations & Leadership)',
    destination: 'Chandigarh Hub / Asia Track',
    category: 'hospitality',
    industry: 'Hospitality Leadership',
    duration: '6 Months (3, 6 & 12 Mos)',
    eligibility: '12th Pass or Equivalent',
    mode: 'Hybrid / International',
    rating: 4.90,
    badge: 'Luxury Resort Pathway',
    status: 'active',
    image: 'assets/images/hero-hospitality-management-course.jpg',
    description: 'Executive management pathway exploring luxury hospitality, resort operations, department budgeting, customer experience strategy, and interdepartmental leadership across Asia.',
    features: ['Luxury Resort Operations', 'Guest Relations Leadership', 'Quality Management', 'Revenue & Yield Basics'],
    inclusions: [
      'Departmental Rotations Simulation',
      'Multicultural Workplace Communication',
      'Executive Hospitality Portfolio Building',
      'Singapore & Thailand International Pathway Guidance',
      'CARIYA Global Professional Diploma'
    ],
    createdAt: '2026-03-05T11:30:00Z'
  },
  {
    id: 'course-aviation-mgmt',
    title: 'Aviation Management & Airport Operations Course',
    destination: 'Chandigarh Hub',
    category: 'aviation',
    industry: 'Aviation & Airport Ops',
    duration: '6 Months (3 & 6 Mos)',
    eligibility: '12th Pass / Graduate',
    mode: 'Offline Class & Labs',
    rating: 4.95,
    badge: 'Airport & Airline Career',
    status: 'active',
    image: 'assets/images/hero-aviation-management-course.jpg',
    description: 'Professional airline and airport ground operations training covering check-in systems (DCS), passenger handling, ramp awareness, aviation safety regulations, and flight dispatch workflows.',
    features: ['Airport Ground Handling', 'Aviation Safety & Security', 'DCS Check-in Systems', 'Boarding & Gate Procedures'],
    inclusions: [
      'Aviation Terminology & Dangerous Goods Awareness',
      'Airline Mock Assessment Interviews',
      'Personality Grooming & Group Discussion Drills',
      'Direct Open-Day Screening Notifications',
      'Industry Accredited Aviation Certificate'
    ],
    createdAt: '2026-03-10T09:15:00Z'
  },
  {
    id: 'course-cabin-crew',
    title: 'Cabin Crew Grooming & In-Flight Service Master Course',
    destination: 'Chandigarh Hub',
    category: 'aviation',
    industry: 'Aviation & Cabin Crew',
    duration: '3 Months Intensive',
    eligibility: '12th Pass (Min 18 Years)',
    mode: 'Offline Intensive',
    rating: 4.94,
    badge: 'High Selection Rate',
    status: 'active',
    image: 'assets/images/hero-aviation.jpg',
    description: 'Intensive grooming, body language, voice modulation, in-flight passenger service etiquette, emergency procedures, and airline mock interview drills designed for domestic and international cabin crew aspirants.',
    features: ['Grooming & Posture Clinics', 'In-Flight Announcement Drills', 'Customer Service & Safety Drills', 'Stress Interview Drills'],
    inclusions: [
      'Professional Studio Grooming Portfolio Shoot',
      'Airline-Specific Screening Simulation Drills',
      'Aviation First Aid & Emergency Protocol Basics',
      'Personalized Video Analysis & Instructor Feedback'
    ],
    createdAt: '2026-03-12T14:20:00Z'
  },
  {
    id: 'course-tourism-mgmt',
    title: 'International Tourism Management & Destination Development Course',
    destination: 'Chandigarh Hub / Online',
    category: 'tourism',
    industry: 'Tourism Management',
    duration: '6 Months (3 & 6 Mos)',
    eligibility: '12th Pass / Any Stream',
    mode: 'Hybrid / International',
    rating: 4.86,
    badge: 'Eco-Tourism & Global Travel',
    status: 'active',
    image: 'assets/images/hero-tourism-management-course.jpg',
    description: 'Executive training in international tourism development, destination marketing, eco-tourism, cultural tour planning, visitor experience strategy, and travel agency alliance building.',
    features: ['Destination Marketing', 'Eco-Tourism Strategy', 'Tour Operating Systems', 'Global Visitor Experience'],
    inclusions: [
      'Case Studies in Asian Tourism Destinations',
      'Field Survey & Tour Packaging Project',
      'Digital Marketing for Tourism Desks',
      'Verified Partner Training Certificate'
    ],
    createdAt: '2026-03-15T08:00:00Z'
  },
  {
    id: 'course-tourism-courses',
    title: 'Tourism Courses & Guiding Operations Foundation',
    destination: 'Chandigarh Hub / Online',
    category: 'tourism',
    industry: 'Tourism Foundations',
    duration: '3 Months Foundation',
    eligibility: '10th or 12th Pass',
    mode: 'Offline / Hybrid',
    rating: 4.84,
    badge: 'Travel Agency & Guiding',
    status: 'active',
    image: 'assets/images/hero-tourism-courses.jpg',
    description: 'Foundation course covering tourist guidance techniques, itinerary planning, customer relations, cultural heritage presentation, and travel documentation across South & Southeast Asia.',
    features: ['Tour Guiding Protocols', 'Cultural Heritage Presentation', 'Visitor Safety & Ethics', 'Asia Tour Itineraries'],
    inclusions: [
      'Practical Guiding Simulation & Commentary Drills',
      'Group Leadership & Client Care Workshops',
      'Asia Destination Knowledge Base',
      'Course Completion Certificate'
    ],
    createdAt: '2026-03-18T10:30:00Z'
  },
  {
    id: 'course-travel-ticketing',
    title: 'Travel Trade Operations & Global GDS Ticketing Course',
    destination: 'Online / Chandigarh Hub',
    category: 'travel',
    industry: 'Travel Trade & GDS',
    duration: '3 Months',
    eligibility: '12th Pass / Basic Computers',
    mode: 'Online Interactive',
    rating: 4.82,
    badge: 'GDS Amadeus / Galileo',
    status: 'active',
    image: 'assets/images/hero-travel-management-course.jpg',
    description: 'Hands-on training on Global Distribution Systems (GDS Amadeus / Galileo), airline reservation codes, international fare calculation, PNR generation, and visa rules for travel professionals.',
    features: ['GDS Reservation Systems', 'Fare Rules & Ticketing Logic', 'Visa Regulation Protocols', 'Domestic & International Itineraries'],
    inclusions: [
      'Live GDS Software Simulation Access',
      'Practical Air Ticketing & Fare Calculation Drills',
      'Commercial Costing Templates & Tools',
      'Executive Travel Consultant Certification'
    ],
    createdAt: '2026-03-20T12:00:00Z'
  },
  {
    id: 'course-travel-management',
    title: 'Corporate Travel Management & MICE Operations Course',
    destination: 'Chandigarh Hub / Hybrid',
    category: 'travel',
    industry: 'Corporate Travel & MICE',
    duration: '6 Months (3 & 6 Mos)',
    eligibility: '12th Pass / Graduate',
    mode: 'Hybrid / International',
    rating: 4.85,
    badge: 'Corporate & MICE Focus',
    status: 'active',
    image: 'assets/images/hero-travel-courses.jpg',
    description: 'Specialized course for managing corporate travel desks, MICE (Meetings, Incentives, Conferences, Exhibitions), corporate negotiation, and luxury inbound/outbound travel logistics.',
    features: ['Corporate Travel Desks', 'MICE Event Management', 'Vendor & Hotel Contracts', 'Corporate Client Account Mgmt'],
    inclusions: [
      '10 Real-world Corporate Proposal Projects',
      'Contract Negotiation Playbooks',
      'Travel ERP & Expense Tools Overview',
      'Advanced Travel Management Diploma'
    ],
    createdAt: '2026-03-22T16:45:00Z'
  },
  {
    id: 'course-hotel-mgmt-chandigarh',
    title: 'Hotel Management Diploma Course in Chandigarh (Sector 34-A)',
    destination: 'Chandigarh Hub (SCO 64-65, Sector 34-A)',
    category: 'hospitality',
    industry: 'Chandigarh Hub Campus',
    duration: '6 Months Campus Track',
    eligibility: '10th or 12th Pass',
    mode: 'Offline Class & Labs',
    rating: 4.93,
    badge: 'Sector 34-A Practical Labs',
    status: 'active',
    image: 'assets/images/hero-hotel-management-course-chandigarh.jpg',
    description: 'Dedicated on-campus diploma at CARIYA Global Chandigarh Hub with physical front office simulation, food & beverage practical lab, guest handling workshops, and local hotel visits.',
    features: ['In-Person Lab Training', 'Sector 34-A Training Hub', '1-on-1 Faculty Mentorship', 'Direct Tricity & Regional Placements'],
    inclusions: [
      'Daily Practical Lab Sessions in Sector 34-A Hub',
      'Uniform & Professional Grooming Kit Included',
      'Local 5-Star Hotel Immersion Visits',
      'Lifetime Alumni Placement Referral Network'
    ],
    createdAt: '2026-03-25T13:10:00Z'
  },
  {
    id: 'course-aviation-chandigarh',
    title: 'Aviation & Airport Operations Diploma in Chandigarh',
    destination: 'Chandigarh Hub (SCO 64-65, Sector 34-A)',
    category: 'aviation',
    industry: 'Chandigarh Hub Campus',
    duration: '6 Months Campus Track',
    eligibility: '12th Pass or Equivalent',
    mode: 'Offline Class & Labs',
    rating: 4.91,
    badge: 'Airport & Airline Hub',
    status: 'active',
    image: 'assets/images/hero-aviation-courses-chandigarh.jpg',
    description: 'Classroom and practical aviation training at CARIYA Global Chandigarh Hub covering airport security, passenger service, check-in software, grooming clinics, and interview assessment rounds.',
    features: ['Direct Airport Orientation', 'Mock Check-in Counters', 'Personality Grooming Classes', 'Aviation English & Communication'],
    inclusions: [
      'Aviation Uniform & Grooming Standards Kit',
      'DCS Simulation Software Training',
      'Airlines Screening Interview Prep',
      'Chandigarh Airport Practical Exposure Visit'
    ],
    createdAt: '2026-03-28T15:30:00Z'
  },
  {
    id: 'course-hospitality-chandigarh',
    title: 'Professional Hospitality & Food Service Course in Chandigarh',
    destination: 'Chandigarh Hub (Sector 34-A)',
    category: 'hospitality',
    industry: 'Chandigarh Hub Campus',
    duration: '3 Months Fast-Track',
    eligibility: '10th Pass or Above',
    mode: 'Offline Class & Labs',
    rating: 4.87,
    badge: 'Fast-Track Certification',
    status: 'active',
    image: 'assets/images/hero-hospitality-courses-chandigarh.jpg',
    description: 'Short-term hands-on certificate course focusing on frontline hospitality service, banquet operations, bar & beverage service basics, guest communication, and dining room management.',
    features: ['F&B Practical Drills', 'Banquet & Event Operations', 'Customer Service Etiquette', 'Fast-Track Completion'],
    inclusions: [
      'Hands-on Table Setting & Service Practice',
      'Food Hygiene & Safety Protocols',
      'Resume Building & Interview Coaching',
      'Industry Recognized Certificate'
    ],
    createdAt: '2026-03-30T10:00:00Z'
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
          return parsed;
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
      destination: courseData.destination.trim(),
      category: courseData.category || 'hospitality',
      industry: courseData.industry || 'Hospitality',
      duration: (courseData.duration || '6 Months').trim(),
      eligibility: (courseData.eligibility || '10th / 12th Pass').trim(),
      mode: courseData.mode || 'Offline Class & Labs',
      rating: Number(courseData.rating) || 4.8,
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
      duration: updateData.duration !== undefined ? updateData.duration.trim() : existing.duration,
      eligibility: updateData.eligibility !== undefined ? updateData.eligibility.trim() : existing.eligibility,
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
    createdAt: '2026-10-02T14:30:00Z'
  }
];

const CariyaPostsStore = {
  getAll: function () {
    try {
      const stored = localStorage.getItem(POSTS_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
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
    return published.slice(0, limit);
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
