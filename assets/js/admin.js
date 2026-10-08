/**
 * CARIYA GLOBAL - Admin Portal Controller
 * Manages Courses CRUD, Modals, Filters, Metrics & Auth
 * Focus: Academic Structure, Eligibility & Duration (Fee Structure removed)
 */

document.addEventListener('DOMContentLoaded', function () {
  // Elements
  const loginOverlay = document.getElementById('loginOverlay');
  const loginForm = document.getElementById('loginForm');
  const loginUser = document.getElementById('loginUser');
  const loginPass = document.getElementById('loginPass');
  const loginError = document.getElementById('loginError');
  const logoutBtn = document.getElementById('logoutBtn');

  // Sidebar & Layout
  const adminSidebar = document.getElementById('adminSidebar');
  const sidebarToggle = document.getElementById('sidebarToggle');
  const sidebarOverlay = document.getElementById('sidebarOverlay');
  const sidebarLinks = document.querySelectorAll('.sidebar-link[data-tab]');
  const tabPanes = document.querySelectorAll('.tab-pane');

  // Metrics
  const metricTotalPackages = document.getElementById('metricTotalPackages');
  const metricCategories = document.getElementById('metricCategories');
  const metricEligibility = document.getElementById('metricEligibility');
  const metricDestinations = document.getElementById('metricDestinations');
  const sidebarPkgBadge = document.getElementById('sidebarPkgBadge');

  // Toolbar & Filters
  const searchPackageInput = document.getElementById('searchPackageInput');
  const filterCategorySelect = document.getElementById('filterCategorySelect');
  const sortPackageSelect = document.getElementById('sortPackageSelect');
  const viewModeToggleBtn = document.getElementById('viewModeToggleBtn');
  const exportPackagesBtn = document.getElementById('exportPackagesBtn');
  const importFileInput = document.getElementById('importFileInput');
  const resetPackagesBtn = document.getElementById('resetPackagesBtn');

  // Views Containers
  const packagesTableView = document.getElementById('packagesTableView');
  const packagesTableBody = document.getElementById('packagesTableBody');
  const packagesGridView = document.getElementById('packagesGridView');

  // Modals
  const addPackageModal = document.getElementById('addPackageModal');
  const openAddPackageBtn = document.getElementById('openAddPackageBtn');
  const addPackageForm = document.getElementById('addPackageForm');

  const editPackageModal = document.getElementById('editPackageModal');
  const editPackageForm = document.getElementById('editPackageForm');

  const deletePackageModal = document.getElementById('deletePackageModal');
  const deletePkgTitle = document.getElementById('deletePkgTitle');
  const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');

  let packageToDeleteId = null;
  let currentViewMode = 'table'; // 'table' or 'grid'

  // Data Store Reference
  const store = window.CariyaCoursesStore || window.CariyaPackagesStore;

  // ==========================================================================
  // 1. AUTHENTICATION CONTROLLER
  // ==========================================================================
  function checkAuth() {
    const isAuth = sessionStorage.getItem('cariya_admin_logged_in');
    if (isAuth === 'true') {
      loginOverlay.classList.add('hidden');
    } else {
      loginOverlay.classList.remove('hidden');
    }
  }

  function getStoredAdminPassword() {
    return localStorage.getItem('cariya_admin_password') || 'cariya2026';
  }

  if (loginForm) {
    loginForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const username = loginUser.value.trim();
      const password = loginPass.value.trim();
      const validPass = getStoredAdminPassword();

      if (username.toLowerCase() === 'admin' && password === validPass) {
        sessionStorage.setItem('cariya_admin_logged_in', 'true');
        loginOverlay.classList.add('hidden');
        loginError.style.display = 'none';
        showToast('Welcome to CARIYA Global Admin Portal', 'success');
        renderDashboard();
      } else {
        loginError.textContent = 'Invalid credentials. Please use username: admin, password: ' + validPass;
        loginError.style.display = 'block';
      }
    });
  }

  if (logoutBtn) {
    logoutBtn.addEventListener('click', function () {
      sessionStorage.removeItem('cariya_admin_logged_in');
      loginOverlay.classList.remove('hidden');
      loginUser.value = 'admin';
      loginPass.value = '';
      showToast('Logged out successfully', 'info');
    });
  }

  // ==========================================================================
  // 2. SIDEBAR & TAB NAVIGATION
  // ==========================================================================
  if (sidebarToggle) {
    sidebarToggle.addEventListener('click', function () {
      adminSidebar.classList.toggle('open');
      if (sidebarOverlay) sidebarOverlay.classList.toggle('active');
    });
  }

  if (sidebarOverlay) {
    sidebarOverlay.addEventListener('click', function () {
      adminSidebar.classList.remove('open');
      sidebarOverlay.classList.remove('active');
    });
  }

  sidebarLinks.forEach(link => {
    link.addEventListener('click', function () {
      const targetTab = this.getAttribute('data-tab');

      sidebarLinks.forEach(l => l.classList.remove('active'));
      this.classList.add('active');

      tabPanes.forEach(pane => {
        if (pane.id === targetTab) {
          pane.style.display = 'block';
        } else {
          pane.style.display = 'none';
        }
      });

      // Close mobile sidebar
      if (window.innerWidth <= 992) {
        adminSidebar.classList.remove('open');
        if (sidebarOverlay) sidebarOverlay.classList.remove('active');
      }
    });
  });

  // ==========================================================================
  // 3. TOAST NOTIFICATIONS
  // ==========================================================================
  function showToast(message, type = 'success') {
    const container = document.getElementById('adminToastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;

    let icon = 'fa-circle-check';
    if (type === 'error') icon = 'fa-circle-xmark';
    if (type === 'warning') icon = 'fa-triangle-exclamation';
    if (type === 'info') icon = 'fa-circle-info';

    toast.innerHTML = `
      <i class="fa-solid ${icon}"></i>
      <span>${message}</span>
    `;

    container.appendChild(toast);
    setTimeout(() => toast.classList.add('show'), 20);

    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 350);
    }, 3500);
  }

  // ==========================================================================
  // 4. METRICS & DATA RENDERING
  // ==========================================================================
  function updateMetrics(courses) {
    const total = courses.length;
    if (metricTotalPackages) metricTotalPackages.textContent = total;
    if (sidebarPkgBadge) sidebarPkgBadge.textContent = total;

    // Categories count
    const uniqueCats = new Set(courses.map(p => p.category)).size;
    if (metricCategories) metricCategories.textContent = uniqueCats;

    // Campus Hubs count / Asian Pathways
    if (metricDestinations) {
      metricDestinations.textContent = 'Singapore • Thailand • Malaysia';
    }

    // Eligibility Metric
    if (metricEligibility) {
      metricEligibility.textContent = '10th / 12th Pass';
    }
  }

  function getFilteredAndSortedPackages() {
    let list = store.getAll();

    // Search filter
    const searchTerm = searchPackageInput ? searchPackageInput.value.toLowerCase().trim() : '';
    if (searchTerm) {
      list = list.filter(pkg =>
        pkg.title.toLowerCase().includes(searchTerm) ||
        pkg.destination.toLowerCase().includes(searchTerm) ||
        (pkg.duration && pkg.duration.toLowerCase().includes(searchTerm)) ||
        (pkg.eligibility && pkg.eligibility.toLowerCase().includes(searchTerm)) ||
        (pkg.industry && pkg.industry.toLowerCase().includes(searchTerm)) ||
        (pkg.badge && pkg.badge.toLowerCase().includes(searchTerm)) ||
        (pkg.description && pkg.description.toLowerCase().includes(searchTerm))
      );
    }

    // Category filter
    const category = filterCategorySelect ? filterCategorySelect.value : 'all';
    if (category !== 'all') {
      list = list.filter(pkg => pkg.category === category);
    }

    // Sorting
    const sortVal = sortPackageSelect ? sortPackageSelect.value : 'newest';
    list.sort((a, b) => {
      if (sortVal === 'newest') {
        return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
      }
      if (sortVal === 'duration') {
        return (parseInt(b.duration, 10) || 0) - (parseInt(a.duration, 10) || 0);
      }
      if (sortVal === 'rating') {
        return (Number(b.rating) || 0) - (Number(a.rating) || 0);
      }
      if (sortVal === 'title') {
        return a.title.localeCompare(b.title);
      }
      return 0;
    });

    return list;
  }

  function renderTable(courses) {
    if (!packagesTableBody) return;
    packagesTableBody.innerHTML = '';

    if (courses.length === 0) {
      packagesTableBody.innerHTML = `
        <tr>
          <td colspan="7" style="text-align: center; padding: 48px 20px; color: var(--text-muted);">
            <i class="fa-solid fa-graduation-cap" style="font-size: 2.2rem; color: #CBD5E1; margin-bottom: 12px; display: block;"></i>
            <strong>No matching courses found.</strong>
            <p style="font-size: 0.85rem; margin-top: 4px;">Try clearing filters or click "+ Add New Course".</p>
          </td>
        </tr>
      `;
      return;
    }

    courses.forEach(pkg => {
      const tr = document.createElement('tr');
      const catClass = pkg.category || 'hospitality';

      tr.innerHTML = `
        <td>
          <div class="pkg-cell">
            <img src="${pkg.image || 'assets/images/hero-courses.jpg'}" alt="${pkg.title}" class="pkg-thumb" onerror="this.src='assets/images/hero-courses.jpg'">
            <div class="pkg-title-wrap">
              <strong>${pkg.title}</strong>
              <small><i class="fa-solid fa-location-dot" style="color: var(--red);"></i> ${pkg.destination}</small>
            </div>
          </div>
        </td>
        <td>
          <span class="category-tag ${catClass}">${pkg.industry || pkg.category}</span>
          ${pkg.badge ? `<br><small style="color: var(--amber); font-weight: 700; margin-top: 3px; display: inline-block;"><i class="fa-solid fa-tag"></i> ${pkg.badge}</small>` : ''}
        </td>
        <td>
          <span class="duration-pill">
            <i class="fa-solid fa-clock"></i> ${pkg.duration || '6 Months'}
          </span>
        </td>
        <td>
          <span class="eligibility-pill">
            <i class="fa-solid fa-user-graduate"></i> ${pkg.eligibility || '10th / 12th Pass'}
          </span>
        </td>
        <td>
          <span class="badge" style="background: var(--bg-body); padding: 5px 9px; border-radius: 4px; font-size: 0.8rem; font-weight: 600; color: var(--navy); border: 1px solid var(--border-subtle);">
            ${pkg.mode || 'Offline Class & Labs'}
          </span>
        </td>
        <td>
          <button class="status-badge ${pkg.status === 'active' ? 'active' : 'inactive'}" data-action="toggle-status" data-id="${pkg.id}" title="Click to toggle status" style="border: none; cursor: pointer;">
            ${pkg.status === 'active' ? 'Active' : 'Inactive'}
          </button>
        </td>
        <td>
          <div class="action-buttons">
            <a href="${pkg.pageUrl || 'courses.html'}" target="_blank" class="btn btn-outline btn-icon" title="View Course Page on Website" style="display: inline-flex; align-items: center; justify-content: center; text-decoration: none;">
              <i class="fa-solid fa-arrow-up-right-from-square" style="color: var(--navy);"></i>
            </a>
            <button class="btn btn-outline btn-icon" data-action="duplicate" data-id="${pkg.id}" title="Duplicate Course">
              <i class="fa-solid fa-clone" style="color: var(--blue);"></i>
            </button>
            <button class="btn btn-outline btn-icon" data-action="edit" data-id="${pkg.id}" title="Edit Course Details">
              <i class="fa-solid fa-pen-to-square" style="color: var(--navy);"></i>
            </button>
            <button class="btn btn-outline btn-icon" data-action="delete" data-id="${pkg.id}" title="Delete Course">
              <i class="fa-solid fa-trash" style="color: #EF4444;"></i>
            </button>
          </div>
        </td>
      `;

      packagesTableBody.appendChild(tr);
    });
  }

  function renderGrid(courses) {
    if (!packagesGridView) return;
    packagesGridView.innerHTML = '';

    if (courses.length === 0) {
      packagesGridView.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 48px 20px; color: var(--text-muted);">
          <i class="fa-solid fa-graduation-cap" style="font-size: 2.2rem; color: #CBD5E1; margin-bottom: 12px; display: block;"></i>
          <strong>No matching courses found.</strong>
        </div>
      `;
      return;
    }

    courses.forEach(pkg => {
      const card = document.createElement('div');
      card.className = 'admin-pkg-card';

      card.innerHTML = `
        <div class="admin-pkg-card-media">
          <img src="${pkg.image || 'assets/images/hero-courses.jpg'}" alt="${pkg.title}" onerror="this.src='assets/images/hero-courses.jpg'">
          ${pkg.badge ? `<span class="admin-pkg-card-badge">${pkg.badge}</span>` : ''}
          <div class="admin-pkg-card-status">
            <span class="status-badge ${pkg.status === 'active' ? 'active' : 'inactive'}">
              ${pkg.status === 'active' ? 'Active' : 'Inactive'}
            </span>
          </div>
        </div>
        <div class="admin-pkg-card-body">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 6px;">
            <span class="category-tag ${pkg.category}">${pkg.industry || pkg.category}</span>
            <span class="rating-stars"><i class="fa-solid fa-star"></i> ${Number(pkg.rating || 4.8).toFixed(1)}</span>
          </div>
          <h4>${pkg.title}</h4>
          <p>${pkg.description ? pkg.description.substring(0, 110) + '...' : ''}</p>
          <div class="admin-pkg-card-meta" style="display: flex; flex-direction: column; gap: 6px; align-items: flex-start; margin-top: 10px;">
            <span class="duration-pill"><i class="fa-solid fa-clock"></i> ${pkg.duration || '6 Months'}</span>
            <span class="eligibility-pill"><i class="fa-solid fa-user-graduate"></i> ${pkg.eligibility || '10th / 12th Pass'}</span>
          </div>
        </div>
        <div class="admin-pkg-card-footer" style="display: flex; justify-content: space-between; align-items: center;">
          <small style="color: var(--text-muted); font-weight: 600;"><i class="fa-solid fa-location-dot" style="color: var(--red);"></i> ${pkg.destination}</small>
          <div class="action-buttons">
            <a href="${pkg.pageUrl || 'courses.html'}" target="_blank" class="btn btn-outline btn-sm btn-icon" title="View Course Page on Website" style="display: inline-flex; align-items: center; justify-content: center; text-decoration: none;">
              <i class="fa-solid fa-arrow-up-right-from-square"></i>
            </a>
            <button class="btn btn-outline btn-sm btn-icon" data-action="edit" data-id="${pkg.id}" title="Edit Course">
              <i class="fa-solid fa-pen-to-square"></i>
            </button>
            <button class="btn btn-outline btn-sm btn-icon" data-action="delete" data-id="${pkg.id}" title="Delete Course">
              <i class="fa-solid fa-trash" style="color: #EF4444;"></i>
            </button>
          </div>
        </div>
      `;

      packagesGridView.appendChild(card);
    });
  }

  function renderDashboard() {
    const all = store.getAll();
    updateMetrics(all);

    const filtered = getFilteredAndSortedPackages();
    if (currentViewMode === 'table') {
      if (packagesTableView) packagesTableView.style.display = 'block';
      if (packagesGridView) packagesGridView.style.display = 'none';
      renderTable(filtered);
    } else {
      if (packagesTableView) packagesTableView.style.display = 'none';
      if (packagesGridView) packagesGridView.style.display = 'grid';
      renderGrid(filtered);
    }
  }

  // ==========================================================================
  // 5. TOOLBAR EVENTS
  // ==========================================================================
  if (searchPackageInput) {
    searchPackageInput.addEventListener('input', renderDashboard);
  }

  if (filterCategorySelect) {
    filterCategorySelect.addEventListener('change', renderDashboard);
  }

  if (sortPackageSelect) {
    sortPackageSelect.addEventListener('change', renderDashboard);
  }

  if (viewModeToggleBtn) {
    viewModeToggleBtn.addEventListener('click', function () {
      currentViewMode = currentViewMode === 'table' ? 'grid' : 'table';
      this.innerHTML = currentViewMode === 'table'
        ? '<i class="fa-solid fa-table-cells-large"></i> Grid View'
        : '<i class="fa-solid fa-table-list"></i> Table View';
      renderDashboard();
    });
  }

  // Export JSON
  if (exportPackagesBtn) {
    exportPackagesBtn.addEventListener('click', function () {
      const json = store.exportJSON();
      const blob = new Blob([json], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `cariya-global-courses-${new Date().toISOString().slice(0, 10)}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      showToast('Courses exported successfully', 'success');
    });
  }

  // Import JSON
  if (importFileInput) {
    importFileInput.addEventListener('change', function (e) {
      const file = e.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = function (event) {
        const result = store.importJSON(event.target.result);
        if (result.success) {
          showToast(`Imported ${result.count} courses successfully`, 'success');
          renderDashboard();
        } else {
          showToast(`Import failed: ${result.error}`, 'error');
        }
      };
      reader.readAsText(file);
      e.target.value = '';
    });
  }

  // Reset to Defaults
  if (resetPackagesBtn) {
    resetPackagesBtn.addEventListener('click', function () {
      if (confirm('Reset courses back to the 9 official CARIYA Global website courses? Any custom courses created will be overwritten.')) {
        store.resetToDefaults();
        renderDashboard();
        showToast('Courses catalog reset to official website courses', 'info');
      }
    });
  }

  // ==========================================================================
  // 6. IMAGE PICKER & CUSTOM UPLOAD HELPERS
  // ==========================================================================
  function setupImagePicker(gridId, inputId, previewId, uploadId) {
    const grid = document.getElementById(gridId);
    const input = document.getElementById(inputId);
    const preview = document.getElementById(previewId);
    const upload = document.getElementById(uploadId);

    if (!grid) return;

    grid.innerHTML = '';
    CARIYA_IMAGE_LIBRARY.forEach(item => {
      const div = document.createElement('div');
      div.className = 'image-thumb-option' + (input.value === item.path ? ' selected' : '');
      div.title = item.label;
      div.innerHTML = `<img src="${item.path}" alt="${item.label}">`;

      div.addEventListener('click', function () {
        grid.querySelectorAll('.image-thumb-option').forEach(el => el.classList.remove('selected'));
        div.classList.add('selected');
        input.value = item.path;
        if (preview) preview.src = item.path;
      });

      grid.appendChild(div);
    });

    if (upload) {
      upload.addEventListener('change', function (e) {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = function (event) {
            const dataUrl = event.target.result;
            input.value = dataUrl;
            if (preview) preview.src = dataUrl;
            grid.querySelectorAll('.image-thumb-option').forEach(el => el.classList.remove('selected'));
            showToast('Custom image loaded for course', 'info');
          };
          reader.readAsDataURL(file);
        }
      });
    }

    if (input) {
      input.addEventListener('input', function () {
        if (preview) preview.src = this.value;
      });
    }
  }

  // ==========================================================================
  // 7. ADD COURSE MODAL & FORM
  // ==========================================================================
  if (openAddPackageBtn) {
    openAddPackageBtn.addEventListener('click', function () {
      addPackageForm.reset();
      setupImagePicker('addImageSelectorGrid', 'addPkgImageInput', 'addPkgImagePreview', 'addPkgImageUpload');
      // Set default image
      document.getElementById('addPkgImageInput').value = 'assets/images/hero-courses.jpg';
      document.getElementById('addPkgImagePreview').src = 'assets/images/hero-courses.jpg';
      addPackageModal.classList.add('active');
    });
  }

  if (addPackageForm) {
    addPackageForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const newCourseData = {
        title: document.getElementById('addPkgTitle').value,
        destination: document.getElementById('addPkgLocation').value,
        pageUrl: document.getElementById('addPkgPageUrl') ? document.getElementById('addPkgPageUrl').value : 'courses.html',
        targetAudience: document.getElementById('addPkgTargetAudience') ? document.getElementById('addPkgTargetAudience').value : '',
        category: document.getElementById('addPkgCategory').value,
        industry: document.getElementById('addPkgIndustry').value,
        duration: document.getElementById('addPkgDuration').value,
        eligibility: document.getElementById('addPkgEligibility').value,
        mode: document.getElementById('addPkgMode').value,
        badge: document.getElementById('addPkgBadge').value,
        image: document.getElementById('addPkgImageInput').value,
        description: document.getElementById('addPkgDescription').value,
        features: document.getElementById('addPkgFeatures').value,
        inclusions: document.getElementById('addPkgInclusions').value,
        status: document.getElementById('addPkgStatus').value
      };

      const added = store.add(newCourseData);
      if (added) {
        addPackageModal.classList.remove('active');
        renderDashboard();
        showToast(`Course "${added.title}" added successfully`, 'success');
      } else {
        showToast('Failed to add course', 'error');
      }
    });
  }

  // ==========================================================================
  // 8. EDIT COURSE MODAL & FORM
  // ==========================================================================
  function openEditModal(pkgId) {
    const pkg = store.getById(pkgId);
    if (!pkg) return;

    document.getElementById('editPkgId').value = pkg.id;
    document.getElementById('editPkgTitle').value = pkg.title;
    document.getElementById('editPkgLocation').value = pkg.destination;
    if (document.getElementById('editPkgPageUrl')) document.getElementById('editPkgPageUrl').value = pkg.pageUrl || '';
    if (document.getElementById('editPkgTargetAudience')) document.getElementById('editPkgTargetAudience').value = pkg.targetAudience || '';
    document.getElementById('editPkgCategory').value = pkg.category || 'hospitality';
    document.getElementById('editPkgIndustry').value = pkg.industry || 'Hotel Management';
    document.getElementById('editPkgDuration').value = pkg.duration || '2 / 3 / 6 / 12 Months';
    document.getElementById('editPkgEligibility').value = pkg.eligibility || '10th Pass or 12th Pass';
    document.getElementById('editPkgMode').value = pkg.mode || 'Online · Offline · Hybrid';
    document.getElementById('editPkgBadge').value = pkg.badge || '';
    document.getElementById('editPkgImageInput').value = pkg.image;
    document.getElementById('editPkgImagePreview').src = pkg.image;
    document.getElementById('editPkgDescription').value = pkg.description || '';
    document.getElementById('editPkgFeatures').value = Array.isArray(pkg.features) ? pkg.features.join(', ') : (pkg.features || '');
    document.getElementById('editPkgInclusions').value = Array.isArray(pkg.inclusions) ? pkg.inclusions.join(', ') : (pkg.inclusions || '');
    document.getElementById('editPkgStatus').value = pkg.status || 'active';

    setupImagePicker('editImageSelectorGrid', 'editPkgImageInput', 'editPkgImagePreview', 'editPkgImageUpload');

    editPackageModal.classList.add('active');
  }

  if (editPackageForm) {
    editPackageForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const id = document.getElementById('editPkgId').value;

      const updatedData = {
        title: document.getElementById('editPkgTitle').value,
        destination: document.getElementById('editPkgLocation').value,
        pageUrl: document.getElementById('editPkgPageUrl') ? document.getElementById('editPkgPageUrl').value : '',
        targetAudience: document.getElementById('editPkgTargetAudience') ? document.getElementById('editPkgTargetAudience').value : '',
        category: document.getElementById('editPkgCategory').value,
        industry: document.getElementById('editPkgIndustry').value,
        duration: document.getElementById('editPkgDuration').value,
        eligibility: document.getElementById('editPkgEligibility').value,
        mode: document.getElementById('editPkgMode').value,
        badge: document.getElementById('editPkgBadge').value,
        image: document.getElementById('editPkgImageInput').value,
        description: document.getElementById('editPkgDescription').value,
        features: document.getElementById('editPkgFeatures').value,
        inclusions: document.getElementById('editPkgInclusions').value,
        status: document.getElementById('editPkgStatus').value
      };

      const updated = store.update(id, updatedData);
      if (updated) {
        editPackageModal.classList.remove('active');
        renderDashboard();
        showToast(`Updated "${updated.title}" successfully`, 'success');
      } else {
        showToast('Failed to update course', 'error');
      }
    });
  }

  // ==========================================================================
  // 9. DELETE CONFIRMATION & STATUS TOGGLE
  // ==========================================================================
  function openDeleteModal(pkgId) {
    const pkg = store.getById(pkgId);
    if (!pkg) return;

    packageToDeleteId = pkgId;
    deletePkgTitle.textContent = `"${pkg.title}"`;
    deletePackageModal.classList.add('active');
  }

  if (confirmDeleteBtn) {
    confirmDeleteBtn.addEventListener('click', function () {
      if (!packageToDeleteId) return;

      const pkg = store.getById(packageToDeleteId);
      const success = store.delete(packageToDeleteId);

      if (success) {
        deletePackageModal.classList.remove('active');
        renderDashboard();
        showToast(`Deleted ${pkg ? pkg.title : 'course'} successfully`, 'success');
      } else {
        showToast('Could not delete course', 'error');
      }
      packageToDeleteId = null;
    });
  }

  // Delegated Table & Grid Clicks
  document.addEventListener('click', function (e) {
    const targetBtn = e.target.closest('[data-action]');
    if (!targetBtn) return;

    const action = targetBtn.getAttribute('data-action');
    const id = targetBtn.getAttribute('data-id');

    if (action === 'edit') {
      openEditModal(id);
    } else if (action === 'delete') {
      openDeleteModal(id);
    } else if (action === 'toggle-status') {
      const updated = store.toggleStatus(id);
      if (updated) {
        renderDashboard();
        showToast(`Course status changed to ${updated.status}`, 'info');
      }
    } else if (action === 'duplicate') {
      const orig = store.getById(id);
      if (orig) {
        const copyData = {
          ...orig,
          title: orig.title + ' (Copy)'
        };
        const dup = store.add(copyData);
        if (dup) {
          renderDashboard();
          showToast(`Duplicated course "${dup.title}"`, 'success');
        }
      }
    }
  });

  // Modal Closers
  document.querySelectorAll('.modal-close, .modal-cancel').forEach(btn => {
    btn.addEventListener('click', function () {
      document.querySelectorAll('.modal-overlay').forEach(modal => modal.classList.remove('active'));
      packageToDeleteId = null;
    });
  });

  // Backdrop Click to close
  document.querySelectorAll('.modal-overlay').forEach(modal => {
    modal.addEventListener('click', function (e) {
      if (e.target === this) {
        this.classList.remove('active');
        packageToDeleteId = null;
      }
    });
  });

  // ==========================================================================
  // 10. PORTAL SETTINGS & PASSWORD UPDATE
  // ==========================================================================
  const adminSettingsForm = document.getElementById('adminSettingsForm');
  if (adminSettingsForm) {
    adminSettingsForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const newPass = document.getElementById('settingsNewPass').value.trim();
      const confirmPass = document.getElementById('settingsConfirmPass').value.trim();

      if (!newPass) {
        showToast('Please enter a new password', 'warning');
        return;
      }
      if (newPass !== confirmPass) {
        showToast('Passwords do not match', 'error');
        return;
      }

      localStorage.setItem('cariya_admin_password', newPass);
      document.getElementById('settingsNewPass').value = '';
      document.getElementById('settingsConfirmPass').value = '';
      showToast('Admin password updated successfully', 'success');
    });
  }

  // ==========================================================================
  // 11. INQUIRIES & LEADS MANAGEMENT
  // ==========================================================================
  function initInquiries() {
    const tableBody = document.getElementById('inquiriesTableBody');
    const badge = document.getElementById('sidebarInqBadge');
    const clearBtn = document.getElementById('clearInquiriesBtn');

    const defaultInquiries = [
      {
        timestamp: '07 Oct 2026, 01:15 PM',
        name: 'Amanpreet Singh',
        phone: '+91 98141 55210',
        email: 'aman.hospitality@gmail.com',
        destination: 'Hotel Management Course',
        status: 'Follow Up'
      },
      {
        timestamp: '07 Oct 2026, 11:30 AM',
        name: 'Priya Sharma',
        phone: '+91 98722 41908',
        email: 'priya.sharma99@yahoo.com',
        destination: 'Aviation Management & Airport Operations',
        status: 'Counselling Scheduled'
      },
      {
        timestamp: '06 Oct 2026, 04:45 PM',
        name: 'Rohit Verma',
        phone: '+91 99880 12345',
        email: 'rohit.v.asia@outlook.com',
        destination: 'AI-Powered Tourism Management Course',
        status: 'Application Review'
      }
    ];

    let inquiries = [];
    try {
      const stored = localStorage.getItem(INQUIRIES_KEY);
      inquiries = stored ? JSON.parse(stored) : defaultInquiries;
    } catch (e) {
      inquiries = defaultInquiries;
    }

    if (badge) badge.textContent = inquiries.length;

    if (tableBody) {
      tableBody.innerHTML = '';
      inquiries.forEach((inq) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td><small style="color: var(--text-muted);">${inq.timestamp}</small></td>
          <td><strong>${inq.name}</strong></td>
          <td>
            <a href="https://wa.me/${inq.phone.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(inq.name)},%20regarding%20your%20course%20inquiry%20with%20CARIYA%20Global" target="_blank" style="color: #25D366; font-weight: 700; text-decoration: none;">
              <i class="fa-brands fa-whatsapp"></i> ${inq.phone}
            </a>
          </td>
          <td><a href="mailto:${inq.email}" style="color: var(--blue);">${inq.email}</a></td>
          <td><span class="category-tag hospitality">${inq.destination}</span></td>
          <td>
            <span class="badge" style="background: var(--blue-pale); color: var(--navy); padding: 4px 10px; border-radius: 12px; font-weight: 700; font-size: 0.75rem;">
              ${inq.status}
            </span>
          </td>
        `;
        tableBody.appendChild(tr);
      });
    }

    if (clearBtn) {
      clearBtn.addEventListener('click', function () {
        if (confirm('Clear inquiry logs?')) {
          localStorage.removeItem(INQUIRIES_KEY);
          if (badge) badge.textContent = '0';
          if (tableBody) tableBody.innerHTML = '<tr><td colspan="6" style="text-align:center; padding: 24px;">No inquiries logged.</td></tr>';
          showToast('Inquiry history cleared', 'info');
        }
      });
    }
  }

  // ==========================================================================
  // 12. SUPABASE SETTINGS & CLOUD SYNC CONTROLLER
  // ==========================================================================
  function initSupabaseSettings() {
    const form = document.getElementById('supabaseConfigForm');
    const input = document.getElementById('supabaseProjectUrlInput');
    const testBtn = document.getElementById('supabaseTestBtn');
    const statusBadge = document.getElementById('supabaseStatusBadge');

    function updateSupabaseBadge() {
      if (!statusBadge) return;
      if (window.CariyaSupabase && window.CariyaSupabase.isConfigured()) {
        statusBadge.className = 'status-badge active';
        statusBadge.textContent = 'Cloud Sync Connected';
      } else {
        statusBadge.className = 'status-badge inactive';
        statusBadge.textContent = 'Local Storage Mode';
      }
    }

    if (input && window.CariyaSupabase) {
      input.value = window.CariyaSupabase.getProjectUrl();
      updateSupabaseBadge();
    }

    if (form) {
      form.addEventListener('submit', async function (e) {
        e.preventDefault();
        const url = input.value.trim();
        if (!url) {
          showToast('Please enter your Supabase Project URL', 'warning');
          return;
        }

        if (window.CariyaSupabase) {
          window.CariyaSupabase.setProjectUrl(url);
          updateSupabaseBadge();
          showToast('Testing cloud connection...', 'info');
          const res = await window.CariyaSupabase.testConnection();
          if (res.success) {
            showToast('Connected to Supabase Cloud!', 'success');
          } else {
            showToast(res.message, 'warning');
          }
        }
      });
    }

    if (testBtn) {
      testBtn.addEventListener('click', async function () {
        if (!window.CariyaSupabase) return;
        const res = await window.CariyaSupabase.testConnection();
        if (res.success) {
          showToast('Supabase connection verified!', 'success');
        } else {
          showToast(res.message, 'warning');
        }
        updateSupabaseBadge();
      });
    }
  }

  // ==========================================================================
  // 12. ALL POSTS & ARTICLES CONTROLLER
  // ==========================================================================
  function initPostsManagement() {
    const postsStore = window.CariyaPostsStore;
    if (!postsStore) return;

    // Elements
    const sidebarPostBadge = document.getElementById('sidebarPostBadge');
    const metricTotalPosts = document.getElementById('metricTotalPosts');
    const metricPublishedPosts = document.getElementById('metricPublishedPosts');
    const searchPostInput = document.getElementById('searchPostInput');
    const filterPostCategorySelect = document.getElementById('filterPostCategorySelect');
    const filterPostFeaturedSelect = document.getElementById('filterPostFeaturedSelect');
    const filterPostStatusSelect = document.getElementById('filterPostStatusSelect');
    const resetPostsBtn = document.getElementById('resetPostsBtn');
    const postsTableBody = document.getElementById('postsTableBody');

    const openAddPostBtn = document.getElementById('openAddPostBtn');
    const addPostModal = document.getElementById('addPostModal');
    const addPostForm = document.getElementById('addPostForm');

    const editPostModal = document.getElementById('editPostModal');
    const editPostForm = document.getElementById('editPostForm');

    const deletePostModal = document.getElementById('deletePostModal');
    const deletePostTitle = document.getElementById('deletePostTitle');
    const confirmDeletePostBtn = document.getElementById('confirmDeletePostBtn');

    const previewPostModal = document.getElementById('previewPostModal');
    const previewPostBody = document.getElementById('previewPostBody');

    let postToDeleteId = null;

    function escapeHtml(str) {
      if (!str) return '';
      return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
    }

    function updatePostMetrics(allPosts) {
      const total = allPosts.length;
      const published = allPosts.filter(p => p.status === 'published').length;
      if (sidebarPostBadge) sidebarPostBadge.textContent = total;
      if (metricTotalPosts) metricTotalPosts.textContent = total;
      if (metricPublishedPosts) metricPublishedPosts.textContent = published;
    }

    function getFilteredPosts() {
      let list = postsStore.getAll();
      updatePostMetrics(list);

      const q = searchPostInput ? searchPostInput.value.toLowerCase().trim() : '';
      if (q) {
        list = list.filter(p =>
          (p.title && p.title.toLowerCase().includes(q)) ||
          (p.industry && p.industry.toLowerCase().includes(q)) ||
          (p.author && p.author.toLowerCase().includes(q)) ||
          (p.excerpt && p.excerpt.toLowerCase().includes(q)) ||
          (p.category && p.category.toLowerCase().includes(q))
        );
      }

      const cat = filterPostCategorySelect ? filterPostCategorySelect.value : 'all';
      if (cat !== 'all') {
        list = list.filter(p => p.category === cat);
      }

      const featuredFilter = filterPostFeaturedSelect ? filterPostFeaturedSelect.value : 'all';
      if (featuredFilter === 'featured') {
        list = list.filter(p => p.featuredOnHome);
      } else if (featuredFilter === 'catalog') {
        list = list.filter(p => !p.featuredOnHome);
      }

      const stat = filterPostStatusSelect ? filterPostStatusSelect.value : 'all';
      if (stat !== 'all') {
        list = list.filter(p => p.status === stat);
      }

      return list;
    }

    function renderPostsTable() {
      if (!postsTableBody) return;
      const posts = getFilteredPosts();
      postsTableBody.innerHTML = '';

      if (posts.length === 0) {
        postsTableBody.innerHTML = `
          <tr>
            <td colspan="7" style="text-align: center; padding: 48px 20px; color: var(--text-muted);">
              <i class="fa-solid fa-file-circle-xmark" style="font-size: 2.5rem; color: #CBD5E1; margin-bottom: 12px; display: block;"></i>
              <div style="font-size: 1.05rem; font-weight: 600;">No articles match your criteria</div>
              <p style="font-size: 0.85rem; margin-top: 4px;">Try clearing filters or adding a new article to the catalog.</p>
            </td>
          </tr>
        `;
        return;
      }

      posts.forEach(post => {
        const isPublished = post.status === 'published';
        const isFeatured = Boolean(post.featuredOnHome);
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>
            <div style="display: flex; align-items: center; gap: 14px;">
              <img src="${escapeHtml(post.image || 'assets/images/hero-home.jpg')}" alt="" style="width: 52px; height: 42px; border-radius: 8px; object-fit: cover; border: 1px solid var(--border-subtle); flex-shrink: 0;" onerror="this.src='assets/images/hero-home.jpg'">
              <div>
                <strong style="color: var(--navy); display: block; font-size: 0.95rem; line-height: 1.35;">${escapeHtml(post.title)}</strong>
                <span style="font-size: 0.78rem; color: var(--text-muted); display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical; overflow: hidden; max-width: 340px;">${escapeHtml(post.excerpt || '')}</span>
              </div>
            </div>
          </td>
          <td>
            <span class="badge badge-sector" style="font-size: 0.76rem; background: var(--blue-light); color: var(--navy); padding: 4px 10px; border-radius: 20px; font-weight: 600;">
              ${escapeHtml(post.industry || post.category || 'Insights')}
            </span>
          </td>
          <td>
            <button class="status-pill ${isFeatured ? 'status-active' : 'status-inactive'}" data-post-action="toggle-featured" data-id="${escapeHtml(post.id)}" title="Click to toggle Homepage placement" style="cursor: pointer; border: none; font-size: 0.76rem;">
              <i class="fa-solid ${isFeatured ? 'fa-star' : 'fa-circle-minus'}" style="color: ${isFeatured ? '#F59E0B' : '#94A3B8'};"></i>
              ${isFeatured ? 'Front Page' : 'Catalog'}
            </button>
          </td>
          <td>
            <div style="font-size: 0.85rem; font-weight: 600; color: var(--navy);">${escapeHtml(post.date || 'Recent')}</div>
            <div style="font-size: 0.78rem; color: var(--text-muted);">${escapeHtml(post.readTime || '4 min read')}</div>
          </td>
          <td>
            <span style="font-size: 0.85rem; color: var(--text-main); font-weight: 500;">${escapeHtml(post.author || 'CARIYA Desk')}</span>
          </td>
          <td>
            <button class="status-pill ${isPublished ? 'status-active' : 'status-inactive'}" data-post-action="toggle-status" data-id="${escapeHtml(post.id)}" title="Click to toggle publish status" style="cursor: pointer; border: none; font-size: 0.78rem;">
              <i class="fa-solid ${isPublished ? 'fa-circle-check' : 'fa-circle-pause'}"></i>
              ${isPublished ? 'Published' : 'Draft'}
            </button>
          </td>
          <td style="text-align: right; white-space: nowrap; padding-right: 20px;">
            <div class="action-btn-group" style="display: inline-flex; gap: 6px;">
              <button class="btn btn-outline btn-sm btn-icon" data-post-action="preview" data-id="${escapeHtml(post.id)}" title="Preview Article">
                <i class="fa-solid fa-eye"></i>
              </button>
              <button class="btn btn-outline btn-sm btn-icon" data-post-action="edit" data-id="${escapeHtml(post.id)}" title="Edit Post">
                <i class="fa-solid fa-pen-to-square"></i>
              </button>
              <button class="btn btn-outline btn-sm btn-icon" data-post-action="delete" data-id="${escapeHtml(post.id)}" title="Delete Post" style="color: #DC2626;">
                <i class="fa-solid fa-trash"></i>
              </button>
            </div>
          </td>
        `;
        postsTableBody.appendChild(tr);
      });
    }

    function openAddModal() {
      if (!addPostForm) return;
      addPostForm.reset();
      setupImagePicker('addPostImageSelectorGrid', 'addPostImageInput', 'addPostImagePreview', 'addPostImageUpload');
      const imgInput = document.getElementById('addPostImageInput');
      const imgPrev = document.getElementById('addPostImagePreview');
      if (imgInput) imgInput.value = 'assets/images/hero-courses.jpg';
      if (imgPrev) imgPrev.src = 'assets/images/hero-courses.jpg';
      const dateInput = document.getElementById('addPostDate');
      if (dateInput) {
        dateInput.value = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
      }
      const featuredInput = document.getElementById('addPostFeatured');
      if (featuredInput) featuredInput.value = 'false';
      if (addPostModal) addPostModal.classList.add('active');
    }

    function openEditModal(id) {
      const post = postsStore.getById(id);
      if (!post) {
        showToast('Article not found', 'error');
        return;
      }

      document.getElementById('editPostId').value = post.id;
      document.getElementById('editPostTitle').value = post.title || '';
      document.getElementById('editPostCategory').value = post.category || 'hospitality';
      document.getElementById('editPostIndustry').value = post.industry || 'Industry Insights';
      document.getElementById('editPostAuthor').value = post.author || '';
      document.getElementById('editPostDate').value = post.date || '';
      document.getElementById('editPostReadTime').value = post.readTime || '4 min read';
      document.getElementById('editPostLink').value = post.link || 'insights.html';
      document.getElementById('editPostStatus').value = post.status || 'published';
      document.getElementById('editPostExcerpt').value = post.excerpt || '';
      const contentEl = document.getElementById('editPostContent');
      if (contentEl) contentEl.value = post.content || '';
      const featuredEl = document.getElementById('editPostFeatured');
      if (featuredEl) featuredEl.value = post.featuredOnHome ? 'true' : 'false';

      const imgInput = document.getElementById('editPostImageInput');
      const imgPrev = document.getElementById('editPostImagePreview');
      if (imgInput) imgInput.value = post.image || 'assets/images/hero-courses.jpg';
      if (imgPrev) imgPrev.src = post.image || 'assets/images/hero-courses.jpg';

      setupImagePicker('editPostImageSelectorGrid', 'editPostImageInput', 'editPostImagePreview', 'editPostImageUpload');

      if (editPostModal) editPostModal.classList.add('active');
    }

    function openPreviewModal(id) {
      const post = postsStore.getById(id);
      if (!post || !previewPostBody || !previewPostModal) return;

      previewPostBody.innerHTML = `
        <div style="margin-bottom: 16px; overflow: hidden; border-radius: 10px; max-height: 240px;">
          <img src="${escapeHtml(post.image || 'assets/images/hero-home.jpg')}" alt="" style="width: 100%; height: 240px; object-fit: cover;" onerror="this.src='assets/images/hero-home.jpg'">
        </div>
        <div style="display: flex; gap: 8px; align-items: center; margin-bottom: 12px;">
          <span class="badge" style="background: var(--blue-light); color: var(--navy); font-weight: 600; padding: 4px 10px; border-radius: 20px;">
            ${escapeHtml(post.industry || post.category)}
          </span>
          ${post.featuredOnHome ? '<span class="badge" style="background: #FEF3C7; color: #92400E; font-weight: 600; padding: 4px 10px; border-radius: 20px;">⭐ Featured on Front Page</span>' : ''}
          <span class="badge" style="background: ${post.status === 'published' ? '#D1FAE5' : '#F1F5F9'}; color: ${post.status === 'published' ? '#065F46' : '#64748b'}; font-weight: 600; padding: 4px 10px; border-radius: 20px;">
            ${post.status === 'published' ? 'Published Online' : 'Draft'}
          </span>
        </div>
        <h3 style="font-size: 1.35rem; color: var(--navy); margin-bottom: 10px; line-height: 1.35;">${escapeHtml(post.title)}</h3>
        <div style="display: flex; gap: 14px; font-size: 0.85rem; color: var(--text-muted); margin-bottom: 18px; border-bottom: 1px solid var(--border-subtle); padding-bottom: 12px;">
          <span><i class="fa-solid fa-user-pen" style="margin-right: 4px;"></i> ${escapeHtml(post.author || 'CARIYA Desk')}</span>
          <span><i class="fa-regular fa-calendar" style="margin-right: 4px;"></i> ${escapeHtml(post.date || 'Recent')}</span>
          <span><i class="fa-regular fa-clock" style="margin-right: 4px;"></i> ${escapeHtml(post.readTime || '4 min read')}</span>
        </div>
        <div style="background: #F8FAFC; border-left: 4px solid var(--blue-primary); padding: 12px 16px; border-radius: 6px; margin-bottom: 18px;">
          <strong style="display: block; font-size: 0.85rem; color: var(--navy); margin-bottom: 4px;">Card Summary / Excerpt:</strong>
          <p style="margin: 0; font-size: 0.92rem; color: var(--text-main);">${escapeHtml(post.excerpt || '')}</p>
        </div>
        <div style="font-size: 0.95rem; line-height: 1.7; color: var(--text-main);">
          ${escapeHtml(post.content || post.excerpt || 'Full article content has not been specified yet.')}
        </div>
        <div style="margin-top: 24px; padding-top: 14px; border-top: 1px solid var(--border-subtle); display: flex; justify-content: space-between; align-items: center;">
          <span style="font-size: 0.82rem; color: var(--text-muted);">Target: <code>${escapeHtml(post.link || 'insights.html')}</code></span>
          <a href="${escapeHtml(post.link || 'insights.html')}" target="_blank" class="btn btn-outline btn-sm">
            Open Live Destination &rarr;
          </a>
        </div>
      `;

      previewPostModal.classList.add('active');
    }

    function openDeleteModal(id) {
      const post = postsStore.getById(id);
      if (!post) return;
      postToDeleteId = id;
      if (deletePostTitle) deletePostTitle.textContent = `"${post.title}"`;
      if (deletePostModal) deletePostModal.classList.add('active');
    }

    // Modal Triggers
    if (openAddPostBtn) {
      openAddPostBtn.addEventListener('click', openAddModal);
    }

    if (addPostForm) {
      addPostForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const newPost = {
          title: document.getElementById('addPostTitle').value.trim(),
          category: document.getElementById('addPostCategory').value,
          industry: document.getElementById('addPostIndustry').value.trim(),
          author: document.getElementById('addPostAuthor').value.trim(),
          date: document.getElementById('addPostDate').value.trim(),
          readTime: document.getElementById('addPostReadTime').value.trim(),
          link: document.getElementById('addPostLink').value.trim(),
          status: document.getElementById('addPostStatus').value,
          featuredOnHome: document.getElementById('addPostFeatured') ? (document.getElementById('addPostFeatured').value === 'true') : false,
          image: document.getElementById('addPostImageInput').value.trim(),
          excerpt: document.getElementById('addPostExcerpt').value.trim(),
          content: document.getElementById('addPostContent') ? document.getElementById('addPostContent').value.trim() : ''
        };

        const created = postsStore.add(newPost);
        if (created) {
          if (addPostModal) addPostModal.classList.remove('active');
          renderPostsTable();
          showToast(`Article "${created.title}" added & saved!`, 'success');
        } else {
          showToast('Could not save post', 'error');
        }
      });
    }

    if (editPostForm) {
      editPostForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const id = document.getElementById('editPostId').value;
        const updateData = {
          title: document.getElementById('editPostTitle').value.trim(),
          category: document.getElementById('editPostCategory').value,
          industry: document.getElementById('editPostIndustry').value.trim(),
          author: document.getElementById('editPostAuthor').value.trim(),
          date: document.getElementById('editPostDate').value.trim(),
          readTime: document.getElementById('editPostReadTime').value.trim(),
          link: document.getElementById('editPostLink').value.trim(),
          status: document.getElementById('editPostStatus').value,
          featuredOnHome: document.getElementById('editPostFeatured') ? (document.getElementById('editPostFeatured').value === 'true') : false,
          image: document.getElementById('editPostImageInput').value.trim(),
          excerpt: document.getElementById('editPostExcerpt').value.trim(),
          content: document.getElementById('editPostContent') ? document.getElementById('editPostContent').value.trim() : ''
        };

        const updated = postsStore.update(id, updateData);
        if (updated) {
          if (editPostModal) editPostModal.classList.remove('active');
          renderPostsTable();
          showToast(`Article "${updated.title}" updated successfully`, 'success');
        } else {
          showToast('Could not update post', 'error');
        }
      });
    }

    if (confirmDeletePostBtn) {
      confirmDeletePostBtn.addEventListener('click', function () {
        if (!postToDeleteId) return;
        const post = postsStore.getById(postToDeleteId);
        const ok = postsStore.delete(postToDeleteId);
        if (ok) {
          if (deletePostModal) deletePostModal.classList.remove('active');
          renderPostsTable();
          showToast(`Deleted "${post ? post.title : 'post'}" successfully`, 'success');
        } else {
          showToast('Failed to delete post', 'error');
        }
        postToDeleteId = null;
      });
    }

    if (resetPostsBtn) {
      resetPostsBtn.addEventListener('click', function () {
        if (confirm('Reset all articles back to official CARIYA Global defaults? All custom changes will be restored to defaults.')) {
          postsStore.saveAll(window.DEFAULT_POSTS);
          renderPostsTable();
          showToast('Articles catalog reset to official defaults', 'info');
        }
      });
    }

    // Filter Listeners
    if (searchPostInput) searchPostInput.addEventListener('input', renderPostsTable);
    if (filterPostCategorySelect) filterPostCategorySelect.addEventListener('change', renderPostsTable);
    if (filterPostFeaturedSelect) filterPostFeaturedSelect.addEventListener('change', renderPostsTable);
    if (filterPostStatusSelect) filterPostStatusSelect.addEventListener('change', renderPostsTable);

    // Delegated actions for Posts
    document.addEventListener('click', function (e) {
      const btn = e.target.closest('[data-post-action]');
      if (!btn) return;

      const action = btn.getAttribute('data-post-action');
      const id = btn.getAttribute('data-id');

      if (action === 'preview') {
        openPreviewModal(id);
      } else if (action === 'edit') {
        openEditModal(id);
      } else if (action === 'delete') {
        openDeleteModal(id);
      } else if (action === 'toggle-status') {
        const toggled = postsStore.toggleStatus(id);
        if (toggled) {
          renderPostsTable();
          showToast(`Article status set to ${toggled.status}`, 'info');
        }
      } else if (action === 'toggle-featured') {
        const toggled = postsStore.toggleFeatured(id);
        if (toggled) {
          renderPostsTable();
          showToast(`Article ${toggled.featuredOnHome ? 'featured on Front Page' : 'moved to standard catalog'}`, 'info');
        }
      }
    });

    // Initial render
    renderPostsTable();
  }

  // ==========================================================================
  // INITIALIZE APP
  // ==========================================================================
  checkAuth();
  renderDashboard();
  initInquiries();
  initPostsManagement();
  initSupabaseSettings();
});
