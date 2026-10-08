/**
 * CARIYA GLOBAL - Supabase Cloud Database Client Integration
 * Domain: cariyaglobal.com
 * Handles real-time cloud database sync for packages, student inquiries, and admin settings.
 */

const CARIYA_SUPABASE_CONFIG = {
  // Supabase Project URL (CARIYA Global project)
  url: window.SUPABASE_URL || localStorage.getItem('cariya_supabase_url') || 'https://flzpejzgletmrbxzovtn.supabase.co',
  // Official Supabase Publishable Key (safe for client-side browser usage)
  publishableKey: 'sb_publishable_T6-c7BdQfJOeNikLlJ0sNg_B1I6ckif'
};

let cariyaSupabaseInstance = null;

function getCariyaSupabaseClient() {
  if (cariyaSupabaseInstance) return cariyaSupabaseInstance;

  const projectUrl = CARIYA_SUPABASE_CONFIG.url || localStorage.getItem('cariya_supabase_url');
  const apiKey = CARIYA_SUPABASE_CONFIG.publishableKey;

  if (projectUrl && apiKey && window.supabase) {
    try {
      cariyaSupabaseInstance = window.supabase.createClient(projectUrl, apiKey);
      return cariyaSupabaseInstance;
    } catch (e) {
      console.warn('CARIYA Global Supabase initialization warning:', e);
    }
  }
  return null;
}

const CariyaSupabase = {
  getClient: getCariyaSupabaseClient,

  // Set or update Supabase Project URL dynamically from Admin Panel
  setProjectUrl(url) {
    if (url) {
      const cleanUrl = url.trim().replace(/\/+$/, '');
      localStorage.setItem('cariya_supabase_url', cleanUrl);
      CARIYA_SUPABASE_CONFIG.url = cleanUrl;
      cariyaSupabaseInstance = null;
      return getCariyaSupabaseClient();
    }
  },

  getProjectUrl() {
    return CARIYA_SUPABASE_CONFIG.url || localStorage.getItem('cariya_supabase_url') || '';
  },

  getPublishableKey() {
    return CARIYA_SUPABASE_CONFIG.publishableKey;
  },

  isConfigured() {
    return Boolean(this.getProjectUrl() && CARIYA_SUPABASE_CONFIG.publishableKey);
  },

  // Test connection to Supabase
  async testConnection() {
    const client = getCariyaSupabaseClient();
    if (!client) {
      return { success: false, message: 'Please enter a valid Supabase Project URL (e.g. https://your-project.supabase.co)' };
    }

    try {
      // Simple ping to verify authentication
      const { data, error } = await client.from('cariya_packages').select('id').limit(1);
      if (error && error.code !== '42P01') { // 42P01 is undefined_table, which still means connection succeeded
        return { success: false, message: error.message };
      }
      return { success: true, message: 'Connected to Supabase successfully!' };
    } catch (err) {
      return { success: false, message: err.message };
    }
  },

  // Save student inquiry to Supabase table `cariya_inquiries`
  async saveInquiry(inquiryData) {
    const client = getCariyaSupabaseClient();
    if (!client) {
      return { success: false, mode: 'local' };
    }

    try {
      const { data, error } = await client
        .from('cariya_inquiries')
        .insert([{
          student_name: inquiryData.name || '',
          phone_number: inquiryData.phone || '',
          email_address: inquiryData.email || '',
          destination_package: inquiryData.destination || '',
          counselling_status: inquiryData.status || 'New Lead',
          created_at: new Date().toISOString()
        }]);

      if (error) throw error;
      return { success: true, data };
    } catch (err) {
      console.warn('Supabase saveInquiry failed, falling back to local store:', err);
      return { success: false, error: err.message };
    }
  },

  // Sync a package to Supabase table `cariya_packages`
  async syncPackage(pkg) {
    const client = getCariyaSupabaseClient();
    if (!client) return { success: false, mode: 'local' };

    try {
      const { data, error } = await client
        .from('cariya_packages')
        .upsert([{
          id: pkg.id,
          title: pkg.title,
          destination: pkg.destination,
          category: pkg.category,
          industry: pkg.industry,
          duration: pkg.duration,
          eligibility: pkg.eligibility,
          page_url: pkg.pageUrl,
          mode: pkg.mode,
          rating: pkg.rating,
          badge: pkg.badge,
          status: pkg.status,
          image: pkg.image,
          description: pkg.description,
          features: pkg.features,
          inclusions: pkg.inclusions,
          updated_at: new Date().toISOString()
        }]);

      if (error) throw error;
      return { success: true, data };
    } catch (err) {
      console.warn('Supabase syncPackage failed:', err);
      return { success: false, error: err.message };
    }
  },

  // Delete package from Supabase
  async deletePackage(pkgId) {
    const client = getCariyaSupabaseClient();
    if (!client) return { success: false, mode: 'local' };

    try {
      const { error } = await client
        .from('cariya_packages')
        .delete()
        .eq('id', pkgId);

      if (error) throw error;
      return { success: true };
    } catch (err) {
      console.warn('Supabase deletePackage failed:', err);
      return { success: false, error: err.message };
    }
  }
};

window.CariyaSupabase = CariyaSupabase;
