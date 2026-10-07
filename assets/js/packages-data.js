/**
 * CARIYA GLOBAL - Packages Data & State Management System
 * Shared data layer between Public Pages and Admin Portal
 * Persisted in browser localStorage (cariya_packages_v1)
 */

const STORAGE_KEY = 'cariya_packages_v1';
const AUTH_KEY = 'cariya_admin_auth_v1';
const INQUIRIES_KEY = 'cariya_inquiries_v1';

// Default Cover Images available in CARIYA Global image directory
const CARIYA_IMAGE_LIBRARY = [
  { path: 'assets/images/hero-internships-singapore.jpg', label: 'Singapore Internships' },
  { path: 'assets/images/hero-internships-malaysia.jpg', label: 'Malaysia Internships' },
  { path: 'assets/images/hero-internships-thailand.jpg', label: 'Thailand Internships' },
  { path: 'assets/images/hero-internships-japan.jpg', label: 'Japan Internships' },
  { path: 'assets/images/hero-internships-south-korea.jpg', label: 'South Korea Internships' },
  { path: 'assets/images/hero-hotel-management-course.jpg', label: 'Hotel Management Course' },
  { path: 'assets/images/hero-aviation-management-course.jpg', label: 'Aviation Management Course' },
  { path: 'assets/images/hero-aviation.jpg', label: 'Aviation & Cabin Crew' },
  { path: 'assets/images/hero-tourism-management-course.jpg', label: 'Tourism Management' },
  { path: 'assets/images/hero-travel-management-course.jpg', label: 'Travel Trade & Tour Operations' },
  { path: 'assets/images/hero-professional-training.jpg', label: 'Professional Skills Training' },
  { path: 'assets/images/hero-study-in-asia.jpg', label: 'Study in Asia Hub' }
];

// Initial Core Packages for CARIYA Global
const DEFAULT_PACKAGES = [
  {
    id: 'pkg-sg-hospitality',
    title: 'Singapore International Hospitality Internship Package',
    destination: 'Singapore',
    category: 'internships',
    industry: 'Hospitality',
    duration: '6 Months',
    mode: 'On-site / International',
    price: 145000,
    priceFormatted: '₹1,45,000',
    priceUnit: '/ candidate',
    rating: 4.95,
    badge: 'High Stipend & Placement',
    status: 'active',
    image: 'assets/images/hero-internships-singapore.jpg',
    description: 'Structured 6-month international internship placement in 4-star and 5-star hotels across Singapore with visa guidance, interview prep, and monthly training stipend.',
    features: ['5-Star Hotel Placement', 'Monthly Training Allowance', 'International Work Experience', 'Visa Support'],
    inclusions: [
      'Resume & Video Profile Optimization',
      'Direct Hotel Partner Interviews',
      'Training Work Permit (TWP) Guidance',
      'Pre-departure Briefing & Singapore Airport Welcome',
      'On-ground Mentorship & 24/7 Support'
    ],
    createdAt: '2026-03-01T10:00:00Z'
  },
  {
    id: 'pkg-chd-hotel-mgmt',
    title: 'AI-Powered Hotel Management & Guest Services Diploma',
    destination: 'Chandigarh / Hybrid',
    category: 'hospitality',
    industry: 'Hospitality',
    duration: '3 Months',
    mode: 'Offline / Hybrid',
    price: 45000,
    priceFormatted: '₹45,000',
    priceUnit: '/ student',
    rating: 4.88,
    badge: 'AI Integrated Curriculum',
    status: 'active',
    image: 'assets/images/hero-hotel-management-course.jpg',
    description: 'Modern hotel operations curriculum combining front office management, guest relations, F&B service standards, and emerging AI tools for personalized hospitality.',
    features: ['Front Office & Reservations', 'F&B Service Standards', 'AI Guest Experience Tools', 'Industry Certification'],
    inclusions: [
      'Interactive Classroom & Practical Simulation',
      'PMS & Reservation Software Training',
      'Hospitality Communication & Grooming',
      'Portfolio & CV Building Session',
      'Placement & Internship Fast-Track Referral'
    ],
    createdAt: '2026-03-05T11:30:00Z'
  },
  {
    id: 'pkg-chd-aviation',
    title: 'Aviation Management & Airport Operations Career Package',
    destination: 'Chandigarh Hub',
    category: 'aviation',
    industry: 'Aviation',
    duration: '6 Months',
    mode: 'Offline Class & Labs',
    price: 85000,
    priceFormatted: '₹85,000',
    priceUnit: '/ student',
    rating: 4.92,
    badge: 'Industry Preferred',
    status: 'active',
    image: 'assets/images/hero-aviation-management-course.jpg',
    description: 'Comprehensive airline and airport ground operations training covering check-in systems, passenger handling, safety protocol awareness, and aviation digital workflows.',
    features: ['Airport Ground Handling', 'Aviation Safety & Security', 'Boarding & Gate Procedures', 'Interview Simulation'],
    inclusions: [
      'Aviation Terminology & Dangerous Goods Awareness',
      'DCS & Ticketing Systems Overview',
      'Personality Grooming & Group Discussion Drills',
      'Airline Mock Assessment Interviews',
      'Lifetime Alumni Guidance Network'
    ],
    createdAt: '2026-03-10T09:15:00Z'
  },
  {
    id: 'pkg-th-resort-tourism',
    title: 'Thailand Luxury Resort & Island Tourism Internship Package',
    destination: 'Phuket / Bangkok, Thailand',
    category: 'internships',
    industry: 'Tourism & Hospitality',
    duration: '6 Months',
    mode: 'On-site / International',
    price: 120000,
    priceFormatted: '₹1,20,000',
    priceUnit: '/ candidate',
    rating: 4.85,
    badge: 'Exotic Resort Exposure',
    status: 'active',
    image: 'assets/images/hero-internships-thailand.jpg',
    description: 'Gain hands-on hospitality and eco-tourism experience in premier beach resorts across Phuket and Samui. Includes housing assistance, meals on duty, and certification.',
    features: ['Beach Resort Placement', 'Accommodation & Duty Meals', 'Cultural Immersion', 'Global Certificate'],
    inclusions: [
      'English & Basic Hospitality Thai Orientation',
      'Cross-departmental Resort Rotation',
      'Non-B / ED Visa Documentation Guidance',
      'Certificate of International Internship Completion',
      'Post-Internship Career Recommendation'
    ],
    createdAt: '2026-03-12T14:20:00Z'
  },
  {
    id: 'pkg-my-tourism-ops',
    title: 'Malaysia Travel Trade & Tourism Operations Pathway',
    destination: 'Kuala Lumpur, Malaysia',
    category: 'tourism',
    industry: 'Tourism & Travel',
    duration: '3 Months',
    mode: 'Hybrid / International',
    price: 65000,
    priceFormatted: '₹65,000',
    priceUnit: '/ candidate',
    rating: 4.78,
    badge: 'Fast-Track',
    status: 'active',
    image: 'assets/images/hero-internships-malaysia.jpg',
    description: 'Specialized program for students entering destination management companies, inbound tour operating, and business travel desks across Southeast Asia.',
    features: ['Tour Itinerary Costing', 'Inbound & Outbound Logistics', 'MICE & Event Support', 'Southeast Asia Focus'],
    inclusions: [
      'GDS & Travel Booking Software Foundations',
      'Visa Requirements & Border Protocols Matrix',
      'Case Studies in Asian Tourism Destinations',
      'Verified Partner Training Certificate'
    ],
    createdAt: '2026-03-15T08:00:00Z'
  },
  {
    id: 'pkg-cabin-crew-prep',
    title: 'Cabin Crew Grooming & International Airline Interview Prep',
    destination: 'Chandigarh Hub',
    category: 'aviation',
    industry: 'Aviation',
    duration: '2 Months',
    mode: 'Offline Intensive',
    price: 38000,
    priceFormatted: '₹38,000',
    priceUnit: '/ student',
    rating: 4.90,
    badge: 'High Selection Rate',
    status: 'active',
    image: 'assets/images/hero-aviation.jpg',
    description: 'Intensive grooming, body language, voice modulation, in-flight service etiquette, and mock interview drill course designed for international airline cabin crew aspirants.',
    features: ['Grooming & Posture Clinics', 'In-flight Announcement Practice', 'Group Task Drills', 'Stress Interview Prep'],
    inclusions: [
      'Professional Studio Portfolio Photoshoot',
      'Airline-Specific Screening Simulation',
      'Personalized Feedback & Video Analysis',
      'Direct Open-Day Interview Notifications'
    ],
    createdAt: '2026-03-20T12:00:00Z'
  },
  {
    id: 'pkg-jp-hospitality',
    title: 'Japan Omotenashi Cultural & Hotel Training Program',
    destination: 'Tokyo / Kyoto, Japan',
    category: 'study-asia',
    industry: 'Hospitality & Culture',
    duration: '12 Months',
    mode: 'On-site / International',
    price: 220000,
    priceFormatted: '₹2,20,000',
    priceUnit: '/ candidate',
    rating: 4.96,
    badge: 'Premium Immersion',
    status: 'active',
    image: 'assets/images/hero-internships-japan.jpg',
    description: 'Elite 1-year pathway exploring traditional Omotenashi hospitality excellence, luxury ryokan and five-star hotel service standards in Tokyo and Kyoto.',
    features: ['Omotenashi Service Masterclass', 'Japanese Language Modules', 'Traditional & Modern Hotel Training', 'High Global Prestige'],
    inclusions: [
      'JLPT N5/N4 Preparatory Language Training',
      'Sponsor Institution Matching & Visa Support',
      'Dormitory Accommodation Coordination',
      'Accredited International Completion Diploma'
    ],
    createdAt: '2026-03-22T16:45:00Z'
  },
  {
    id: 'pkg-travel-consultant',
    title: 'Executive Travel Consultant & Package Designing Diploma',
    destination: 'Online / Hybrid',
    category: 'travel',
    industry: 'Travel Trade',
    duration: '3 Months',
    mode: 'Online Interactive',
    price: 42000,
    priceFormatted: '₹42,000',
    priceUnit: '/ student',
    rating: 4.75,
    badge: 'Remote Friendly',
    status: 'active',
    image: 'assets/images/hero-travel-management-course.jpg',
    description: 'Learn the commercial backbone of international travel agencies: assembling complex multi-destination itineraries, quotation costing, supplier negotiation, and client retention.',
    features: ['Custom Package Designing', 'Fare Rules & Ticketing Logic', 'Supplier Contract Negotiation', 'Digital Marketing for Travel'],
    inclusions: [
      'Live Masterclasses with Senior Travel Executives',
      '10 Real-world Itinerary Creation Assignments',
      'Commercial Costing Templates & Tools',
      'Certificate in Travel Trade Operations'
    ],
    createdAt: '2026-03-25T13:10:00Z'
  },
  {
    id: 'pkg-kr-service-excellence',
    title: 'South Korea K-Hospitality & Event Management Pathway',
    destination: 'Seoul, South Korea',
    category: 'study-asia',
    industry: 'Hospitality & Events',
    duration: '6 Months',
    mode: 'On-site / International',
    price: 175000,
    priceFormatted: '₹1,75,000',
    priceUnit: '/ candidate',
    rating: 4.86,
    badge: 'Next-Gen Asia',
    status: 'active',
    image: 'assets/images/hero-internships-south-korea.jpg',
    description: 'Explore the fast-growing hospitality, convention, and entertainment event sector in Seoul. Combines operational service exposure with modern hospitality tech.',
    features: ['Convention & Hotel Exposure', 'Korean Service Culture', 'Smart City Hospitality', 'Seoul Based'],
    inclusions: [
      'Pre-departure Cultural Orientation',
      'International Trainee Visa Documentation Support',
      'Shared Accommodation Guidance in Seoul',
      'CARIYA Global Partner Certification'
    ],
    createdAt: '2026-03-28T15:30:00Z'
  }
];

// Helper functions for Data Operations
const CariyaPackagesStore = {
  // Get all packages
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
      console.warn('Error reading from localStorage, using defaults:', e);
    }
    // Initialize default if not present
    this.saveAll(DEFAULT_PACKAGES);
    return DEFAULT_PACKAGES;
  },

  // Save full packages array
  saveAll: function (packages) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(packages));
      return true;
    } catch (e) {
      console.error('Failed to save to localStorage:', e);
      return false;
    }
  },

  // Get single package by ID
  getById: function (id) {
    const list = this.getAll();
    return list.find(item => item.id === id) || null;
  },

  // Add new package
  add: function (pkgData) {
    const list = this.getAll();
    const id = 'pkg-' + Date.now().toString(36) + '-' + Math.random().toString(36).substring(2, 6);
    const newPkg = {
      id: id,
      title: pkgData.title.trim(),
      destination: pkgData.destination.trim(),
      category: pkgData.category || 'hospitality',
      industry: pkgData.industry || 'Hospitality',
      duration: pkgData.duration.trim(),
      mode: pkgData.mode || 'Offline / Hybrid',
      price: Number(pkgData.price) || 0,
      priceFormatted: '₹' + Number(pkgData.price || 0).toLocaleString('en-IN'),
      priceUnit: pkgData.priceUnit || '/ candidate',
      rating: Number(pkgData.rating) || 4.8,
      badge: pkgData.badge ? pkgData.badge.trim() : '',
      status: pkgData.status || 'active',
      image: pkgData.image || 'assets/images/hero-home.jpg',
      description: pkgData.description ? pkgData.description.trim() : '',
      features: Array.isArray(pkgData.features) ? pkgData.features : (pkgData.features ? pkgData.features.split(',').map(s => s.trim()).filter(Boolean) : []),
      inclusions: Array.isArray(pkgData.inclusions) ? pkgData.inclusions : (pkgData.inclusions ? pkgData.inclusions.split(',').map(s => s.trim()).filter(Boolean) : []),
      createdAt: new Date().toISOString()
    };
    list.unshift(newPkg);
    this.saveAll(list);
    return newPkg;
  },

  // Update existing package
  update: function (id, updateData) {
    const list = this.getAll();
    const index = list.findIndex(item => item.id === id);
    if (index === -1) return null;

    const existing = list[index];
    const updated = {
      ...existing,
      ...updateData,
      id: id,
      price: Number(updateData.price !== undefined ? updateData.price : existing.price),
      priceFormatted: '₹' + Number(updateData.price !== undefined ? updateData.price : existing.price).toLocaleString('en-IN'),
      rating: Number(updateData.rating !== undefined ? updateData.rating : existing.rating),
      features: Array.isArray(updateData.features) ? updateData.features : (typeof updateData.features === 'string' ? updateData.features.split(',').map(s => s.trim()).filter(Boolean) : existing.features),
      inclusions: Array.isArray(updateData.inclusions) ? updateData.inclusions : (typeof updateData.inclusions === 'string' ? updateData.inclusions.split(',').map(s => s.trim()).filter(Boolean) : existing.inclusions),
      updatedAt: new Date().toISOString()
    };

    list[index] = updated;
    this.saveAll(list);
    return updated;
  },

  // Delete package
  delete: function (id) {
    const list = this.getAll();
    const filtered = list.filter(item => item.id !== id);
    if (filtered.length !== list.length) {
      this.saveAll(filtered);
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
      return target;
    }
    return null;
  },

  // Reset to initial default packages
  resetToDefaults: function () {
    this.saveAll(DEFAULT_PACKAGES);
    return DEFAULT_PACKAGES;
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
      return { success: false, error: 'JSON does not contain a valid array of packages.' };
    } catch (e) {
      return { success: false, error: e.message };
    }
  }
};

// Export to window
if (typeof window !== 'undefined') {
  window.CariyaPackagesStore = CariyaPackagesStore;
  window.DEFAULT_PACKAGES = DEFAULT_PACKAGES;
  window.CARIYA_IMAGE_LIBRARY = CARIYA_IMAGE_LIBRARY;
}
