// BikeServ Platform JavaScript

// Application Data
const appData = {
  "brands": [
    {"id": 1, "name": "Hero", "models": ["Splendor Plus", "Passion Pro", "Xtreme 160R", "Destini 125"]},
    {"id": 2, "name": "Honda", "models": ["Activa 6G", "CB Shine", "CB Hornet", "Dio"]},
    {"id": 3, "name": "TVS", "models": ["Jupiter", "Apache RTR 160", "Ntorq 125", "Star City Plus"]},
    {"id": 4, "name": "Bajaj", "models": ["Pulsar 150", "Avenger Cruise", "CT 100", "Chetak Electric"]},
    {"id": 5, "name": "Royal Enfield", "models": ["Classic 350", "Bullet 350", "Himalayan", "Meteor 350"]},
    {"id": 6, "name": "Yamaha", "models": ["FZ FI", "Ray ZR", "Fascino 125", "MT-15"]}
  ],
  "servicePackages": [
    {
      "id": 1,
      "name": "Basic Service",
      "price": "499-799",
      "duration": "60-90 mins",
      "inclusions": ["General checkup", "Chain lubrication", "Bike wash", "Tyre pressure check", "Light function test"],
      "description": "Essential maintenance for regular upkeep",
      "basePrice": 599
    },
    {
      "id": 2,
      "name": "Standard Service", 
      "price": "1,199-1,799",
      "duration": "90-120 mins",
      "inclusions": ["All Basic Service items", "Engine oil replacement", "Oil filter change", "Air filter cleaning", "Brake adjustment"],
      "description": "Comprehensive service including oil change",
      "basePrice": 1399
    },
    {
      "id": 3,
      "name": "Comprehensive Service",
      "price": "2,499-3,499", 
      "duration": "150-180 mins",
      "inclusions": ["All Standard Service items", "Brake bleed", "Coolant replacement", "Spark plug service", "Engine tuning", "Detailed inspection"],
      "description": "Complete deep service for optimal performance",
      "basePrice": 2999
    }
  ],
  "spareParts": [
    {
      "id": 1,
      "name": "Engine Oil 10W30 1L",
      "brand": "Castrol",
      "price": 450,
      "mrp": 550,
      "category": "Engine",
      "compatible": ["Hero Splendor Plus", "Honda CB Shine", "TVS Star City"],
      "genuine": true,
      "warranty": "6 months"
    },
    {
      "id": 2,
      "name": "Brake Pads Front Set",
      "brand": "TVS",
      "price": 850,
      "mrp": 1000,
      "category": "Brakes", 
      "compatible": ["TVS Apache RTR 160", "TVS Jupiter"],
      "genuine": true,
      "warranty": "3 months"
    },
    {
      "id": 3,
      "name": "Chain Sprocket Kit",
      "brand": "Bajaj Genuine",
      "price": 2200,
      "mrp": 2500,
      "category": "Drive Train",
      "compatible": ["Bajaj Pulsar 150", "Bajaj Avenger"],
      "genuine": true,
      "warranty": "12 months"
    },
    {
      "id": 4,
      "name": "Tubeless Tyre 17 inch",
      "brand": "MRF",
      "price": 3200,
      "mrp": 3600,
      "category": "Tyres",
      "compatible": ["Royal Enfield Classic 350", "Yamaha FZ"],
      "genuine": true,
      "warranty": "24 months"
    }
  ],
  "usedBikes": [
    {
      "id": 1,
      "brand": "Hero",
      "model": "Splendor Plus",
      "year": 2020,
      "price": 45000,
      "odo": 28000,
      "location": "Chennai",
      "owners": 1,
      "certified": true,
      "images": ["hero-splendor-1.jpg"],
      "valuationScore": 8.2
    },
    {
      "id": 2,
      "brand": "Honda", 
      "model": "Activa 6G",
      "year": 2021,
      "price": 65000,
      "odo": 15000,
      "location": "Coimbatore",
      "owners": 1,
      "certified": true,
      "images": ["honda-activa-1.jpg"],
      "valuationScore": 8.8
    },
    {
      "id": 3,
      "brand": "Royal Enfield",
      "model": "Classic 350",
      "year": 2019,
      "price": 125000,
      "odo": 35000,
      "location": "Chennai",
      "owners": 2,
      "certified": false,
      "images": ["re-classic-1.jpg"],
      "valuationScore": 7.5
    }
  ],
  "mechanics": [
    {
      "id": 1,
      "name": "Rajesh Kumar",
      "rating": 4.8,
      "certifications": ["Honda Certified", "TVS Authorized"],
      "experience": "8 years",
      "specialties": ["Engine Repair", "Electrical"],
      "completedJobs": 850
    },
    {
      "id": 2,
      "name": "Suresh M",
      "rating": 4.6,
      "certifications": ["Hero Certified", "Bajaj Authorized"],
      "experience": "6 years", 
      "specialties": ["Brake Service", "Tune-up"],
      "completedJobs": 620
    }
  ],
  "addOns": [
    {
      "id": 1,
      "name": "Premium Engine Oil Upgrade",
      "price": 200,
      "description": "Upgrade to premium synthetic oil"
    },
    {
      "id": 2,
      "name": "Brake Bleed Service",
      "price": 150,
      "description": "Complete brake fluid replacement"
    },
    {
      "id": 3,
      "name": "Chain Cleaning & Lube",
      "price": 100,
      "description": "Deep chain cleaning with premium lubricant"
    },
    {
      "id": 4,
      "name": "Doorstep Pickup & Drop",
      "price": 299,
      "description": "Convenient pickup and delivery service"
    }
  ]
};

// Global State
let currentLanguage = 'en';
let selectedBike = null;
let cart = [];
let currentBooking = {};
let currentStep = 1;

// Utility Functions
function formatCurrency(amount) {
  return `₹${amount.toLocaleString('en-IN')}`;
}

function calculateGST(amount, rate = 18) {
  const gst = Math.round(amount * rate / 100);
  return {
    subtotal: amount,
    gst: gst,
    total: amount + gst
  };
}

function generateOrderId(prefix = 'SRV') {
  const random = Math.random().toString(36).substr(2, 6).toUpperCase();
  return `${prefix}-${random}`;
}

function getCurrentDateTime() {
  const now = new Date();
  const options = {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
    timeZone: 'Asia/Kolkata'
  };
  return now.toLocaleString('en-IN', options) + ' IST';
}

function getMandatoryFooter(totalAmount) {
  return `Developed by SANTHOSH_A\nLive Date & Time: ${getCurrentDateTime()}\nTotal Price in INR: ${formatCurrency(totalAmount)}`;
}

// WhatsApp Message Generation
function generateServiceWhatsAppMessage(booking) {
  const orderId = generateOrderId('SRV');
  const serviceType = booking.serviceType === 'doorstep' ? 'Doorstep Service' : 'Workshop Service';
  const addonsText = booking.addons && booking.addons.length > 0 
    ? booking.addons.map(addon => `• ${addon.name} (+${formatCurrency(addon.price)})`).join('\n')
    : 'None';
  
  const message = `Hi! I want to book ${booking.packageName} for my ${selectedBike?.brand || 'bike'} ${selectedBike?.model || ''}.

📦 Package: ${booking.packageName}
🏠 Service type: ${serviceType}
📍 Address: ${booking.address}
⏰ Preferred slot: ${booking.date} ${booking.time}

Add-ons:
${addonsText}

💰 Total: ${formatCurrency(booking.total)} (incl. GST)
Order ID: #${orderId}

${getMandatoryFooter(booking.total)}`;

  return encodeURIComponent(message);
}

function generatePartsWhatsAppMessage() {
  const orderId = generateOrderId('PRT');
  const itemsText = cart.map(item => 
    `🛒 ${item.name} x ${item.quantity} - ${formatCurrency(item.price * item.quantity)}`
  ).join('\n');
  
  const totals = calculateCartTotal();
  
  const message = `Hi! I want to order these parts:

${itemsText}

🏍️ For: ${selectedBike?.brand || 'My bike'} ${selectedBike?.model || ''}
📍 Delivery to: [Please enter your address]

Subtotal: ${formatCurrency(totals.subtotal)}
GST (18%): ${formatCurrency(totals.gst)}
💰 Total: ${formatCurrency(totals.total)}
Order ID: #${orderId}

${getMandatoryFooter(totals.total)}`;

  return encodeURIComponent(message);
}

function generateBikeInquiryMessage(bike) {
  const message = `Hi! I'm interested in this used bike:

🏍️ ${bike.brand} ${bike.model} (${bike.year})
📍 Location: ${bike.location}
💰 Price: ${formatCurrency(bike.price)}
🛣️ Odometer: ${bike.odo.toLocaleString()} km
👤 Owners: ${bike.owners}
${bike.certified ? '✅ Certified' : ''}

Please share more details and arrange a viewing.

Listing ID: #BIKE-${bike.id}`;

  return encodeURIComponent(message);
}

// Cart Functions
function addToCart(part) {
  const existingItem = cart.find(item => item.id === part.id);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...part, quantity: 1 });
  }
  updateCartUI();
}

function removeFromCart(partId) {
  cart = cart.filter(item => item.id !== partId);
  updateCartUI();
}

function updateCartQuantity(partId, quantity) {
  const item = cart.find(item => item.id === partId);
  if (item) {
    if (quantity <= 0) {
      removeFromCart(partId);
    } else {
      item.quantity = quantity;
    }
  }
  updateCartUI();
}

function calculateCartTotal() {
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  return calculateGST(subtotal);
}

function updateCartUI() {
  const cartCount = document.getElementById('cartCount');
  const cartSummary = document.getElementById('cartSummary');
  const cartItems = document.getElementById('cartItems');
  const cartTotal = document.getElementById('cartTotal');
  
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  if (cartCount) cartCount.textContent = totalItems;
  
  if (cart.length === 0) {
    if (cartSummary) cartSummary.style.display = 'none';
    return;
  }
  
  if (cartSummary) cartSummary.style.display = 'block';
  
  // Update cart items
  if (cartItems) {
    cartItems.innerHTML = cart.map(item => `
      <div class="cart-item">
        <div>
          <div>${item.name}</div>
          <div style="font-size: 12px; color: var(--color-text-secondary);">
            ${formatCurrency(item.price)} x ${item.quantity}
          </div>
        </div>
        <div>
          <button onclick="updateCartQuantity(${item.id}, ${item.quantity - 1})" style="background: none; border: none; cursor: pointer;">-</button>
          <span style="margin: 0 8px;">${item.quantity}</span>
          <button onclick="updateCartQuantity(${item.id}, ${item.quantity + 1})" style="background: none; border: none; cursor: pointer;">+</button>
        </div>
      </div>
    `).join('');
  }
  
  // Update totals
  if (cartTotal) {
    const totals = calculateCartTotal();
    cartTotal.innerHTML = `
      <div class="total-line">
        <span>Subtotal:</span>
        <span>${formatCurrency(totals.subtotal)}</span>
      </div>
      <div class="total-line">
        <span>GST (18%):</span>
        <span>${formatCurrency(totals.gst)}</span>
      </div>
      <div class="total-line grand-total">
        <span>Total:</span>
        <span>${formatCurrency(totals.total)}</span>
      </div>
      <div class="mandatory-footer">
        ${getMandatoryFooter(totals.total).replace(/\n/g, '<br>')}
      </div>
    `;
  }
}

// Language Functions
function switchLanguage() {
  currentLanguage = currentLanguage === 'en' ? 'ta' : 'en';
  document.body.setAttribute('data-lang', currentLanguage);
  
  const toggleBtn = document.getElementById('languageToggle');
  if (toggleBtn) {
    toggleBtn.textContent = currentLanguage === 'en' ? 'தமிழ்' : 'English';
  }
}

// Tab Navigation
function switchTab(tabName) {
  console.log('Switching to tab:', tabName);
  
  // Update tab buttons
  document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
  const activeTab = document.querySelector(`[data-tab="${tabName}"]`);
  if (activeTab) activeTab.classList.add('active');
  
  // Update bottom nav
  document.querySelectorAll('.bottom-nav .nav-item').forEach(item => item.classList.remove('active'));
  const bottomNavItem = document.querySelector(`.bottom-nav [data-tab="${tabName}"]`);
  if (bottomNavItem) bottomNavItem.classList.add('active');
  
  // Show/hide sections
  document.querySelectorAll('.section').forEach(section => section.classList.remove('active'));
  const targetSection = document.getElementById(tabName);
  if (targetSection) {
    targetSection.classList.add('active');
    console.log('Switched to section:', tabName);
  } else {
    console.error('Section not found:', tabName);
  }
}

// Service Modal Functions
function openServiceModal(packageId) {
  console.log('Opening service modal for package:', packageId);
  const pkg = appData.servicePackages.find(p => p.id === packageId);
  if (!pkg) {
    console.error('Package not found:', packageId);
    return;
  }
  
  currentBooking = {
    package: pkg,
    packageName: pkg.name,
    basePrice: pkg.basePrice,
    addons: [],
    total: pkg.basePrice
  };
  
  const modalTitle = document.getElementById('modalTitle');
  if (modalTitle) modalTitle.textContent = `Book ${pkg.name}`;
  
  populateAddons();
  showStep(1);
  
  const modal = document.getElementById('serviceModal');
  if (modal) {
    modal.classList.remove('hidden');
    console.log('Service modal opened');
  }
}

function openBikeModal(bikeId) {
  console.log('Opening bike modal for bike:', bikeId);
  const bike = appData.usedBikes.find(b => b.id === bikeId);
  if (!bike) {
    console.error('Bike not found:', bikeId);
    return;
  }
  
  const modalTitle = document.getElementById('bikeModalTitle');
  const modalBody = document.getElementById('bikeModalBody');
  
  if (modalTitle) modalTitle.textContent = `${bike.brand} ${bike.model}`;
  
  if (modalBody) {
    modalBody.innerHTML = `
      <div class="bike-image" style="height: 250px; margin-bottom: 20px;">
        🏍️
        ${bike.certified ? '<div class="certified-badge">Certified</div>' : ''}
      </div>
      <div class="bike-details">
        <h3>${bike.brand} ${bike.model} (${bike.year})</h3>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin: 16px 0;">
          <div><strong>Price:</strong> ${formatCurrency(bike.price)}</div>
          <div><strong>Odometer:</strong> ${bike.odo.toLocaleString()} km</div>
          <div><strong>Owners:</strong> ${bike.owners}</div>
          <div><strong>Location:</strong> ${bike.location}</div>
          <div><strong>Valuation Score:</strong> ${bike.valuationScore}/10</div>
          <div><strong>Status:</strong> ${bike.certified ? 'Certified ✅' : 'Not Certified'}</div>
        </div>
        <div style="background: var(--color-bg-1); padding: 16px; border-radius: 8px; margin: 16px 0;">
          <h4>Inspection Checklist</h4>
          <ul style="margin: 8px 0; padding-left: 20px;">
            <li>Engine condition - Good</li>
            <li>Brake system - Excellent</li>
            <li>Suspension - Good</li>
            <li>Electrical system - Good</li>
            <li>Body & Paint - Fair</li>
          </ul>
        </div>
        ${bike.certified ? '<p style="color: var(--color-success);">✅ This bike has been certified by our inspection team</p>' : ''}
      </div>
    `;
  }
  
  const inquireBtn = document.getElementById('inquireViaWhatsApp');
  if (inquireBtn) {
    inquireBtn.onclick = () => {
      const message = generateBikeInquiryMessage(bike);
      window.open(`https://wa.me/919003356047?text=${message}`, '_blank');
    };
  }
  
  const modal = document.getElementById('bikeModal');
  if (modal) {
    modal.classList.remove('hidden');
    console.log('Bike modal opened');
  }
}

// UI Population Functions
function populateBikeSelector() {
  const selector = document.getElementById('bikeSelector');
  if (!selector) return;
  
  const options = ['<option value="">Select your bike</option>'];
  
  appData.brands.forEach(brand => {
    brand.models.forEach(model => {
      options.push(`<option value="${brand.name}-${model}">${brand.name} ${model}</option>`);
    });
  });
  
  selector.innerHTML = options.join('');
  
  selector.addEventListener('change', (e) => {
    if (e.target.value) {
      const [brand, ...modelParts] = e.target.value.split('-');
      const model = modelParts.join('-');
      selectedBike = { brand, model };
      console.log('Selected bike:', selectedBike);
    } else {
      selectedBike = null;
    }
  });
}

function populateServicePackages() {
  const container = document.getElementById('servicePackages');
  if (!container) return;
  
  container.innerHTML = appData.servicePackages.map(pkg => `
    <div class="service-card fade-in">
      <div class="service-card-header">
        <h4 class="service-card-title">${pkg.name}</h4>
        <div class="service-card-price">₹${pkg.price}</div>
        <div class="service-card-duration">${pkg.duration}</div>
      </div>
      <p style="color: var(--color-text-secondary); margin: 12px 0;">${pkg.description}</p>
      <ul class="service-inclusions">
        ${pkg.inclusions.map(item => `<li>${item}</li>`).join('')}
      </ul>
      <button class="btn btn--primary btn--full-width" onclick="openServiceModal(${pkg.id})">
        Book Now
      </button>
    </div>
  `).join('');
  
  console.log('Service packages populated');
}

function populateMechanics() {
  const container = document.getElementById('mechanicsGrid');
  if (!container) return;
  
  container.innerHTML = appData.mechanics.map(mechanic => `
    <div class="mechanic-card fade-in">
      <div class="mechanic-header">
        <div class="mechanic-avatar">👨‍🔧</div>
        <div class="mechanic-info">
          <h4>${mechanic.name}</h4>
          <div class="mechanic-rating">
            <span>⭐ ${mechanic.rating}</span>
            <span>(${mechanic.completedJobs} jobs)</span>
          </div>
        </div>
      </div>
      <div class="mechanic-certifications">
        ${mechanic.certifications.map(cert => `<span class="certification-badge">${cert}</span>`).join('')}
      </div>
      <div style="font-size: 14px; color: var(--color-text-secondary);">
        <div>Experience: ${mechanic.experience}</div>
        <div>Specialties: ${mechanic.specialties.join(', ')}</div>
      </div>
    </div>
  `).join('');
}

function populateSpareParts() {
  const container = document.getElementById('partsGrid');
  if (!container) return;
  
  const brandFilter = document.getElementById('brandFilter');
  const categoryFilter = document.getElementById('categoryFilter');
  
  // Populate filters
  const brands = [...new Set(appData.spareParts.map(part => part.brand))];
  if (brandFilter) {
    brandFilter.innerHTML = '<option value="">All Brands</option>' + 
      brands.map(brand => `<option value="${brand}">${brand}</option>`).join('');
  }
  
  function renderParts() {
    const brandFilterValue = brandFilter?.value || '';
    const categoryFilterValue = categoryFilter?.value || '';
    
    let filteredParts = appData.spareParts;
    
    if (brandFilterValue) {
      filteredParts = filteredParts.filter(part => part.brand === brandFilterValue);
    }
    
    if (categoryFilterValue) {
      filteredParts = filteredParts.filter(part => part.category === categoryFilterValue);
    }
    
    container.innerHTML = filteredParts.map(part => {
      const savings = Math.round(((part.mrp - part.price) / part.mrp) * 100);
      const compatible = selectedBike ? 
        part.compatible.some(model => model.includes(selectedBike.brand) && model.includes(selectedBike.model)) : false;
      
      return `
        <div class="part-card fade-in">
          ${part.genuine ? '<div class="genuine-badge">Genuine</div>' : ''}
          <div class="part-header">
            <h4>${part.name}</h4>
            <div class="part-brand">${part.brand}</div>
          </div>
          <div class="part-pricing">
            <span class="part-price">${formatCurrency(part.price)}</span>
            <span class="part-mrp">${formatCurrency(part.mrp)}</span>
            <span class="part-savings">${savings}% OFF</span>
          </div>
          ${compatible ? '<div style="color: var(--color-success); font-size: 12px; font-weight: 500;">✓ Compatible with your bike</div>' : ''}
          <div class="part-compatible">
            Compatible: ${part.compatible.slice(0, 2).join(', ')}${part.compatible.length > 2 ? '...' : ''}
          </div>
          <div style="font-size: 12px; color: var(--color-text-secondary); margin-bottom: 12px;">
            Warranty: ${part.warranty}
          </div>
          <button class="btn btn--primary add-to-cart" onclick="addToCart(${JSON.stringify(part).replace(/"/g, '&quot;')})">
            Add to Cart
          </button>
        </div>
      `;
    }).join('');
  }
  
  renderParts();
  
  // Add filter event listeners
  if (brandFilter) brandFilter.addEventListener('change', renderParts);
  if (categoryFilter) categoryFilter.addEventListener('change', renderParts);
  
  console.log('Spare parts populated');
}

function populateUsedBikes() {
  const container = document.getElementById('usedBikesGrid');
  if (!container) return;
  
  container.innerHTML = appData.usedBikes.map(bike => `
    <div class="used-bike-card fade-in" onclick="openBikeModal(${bike.id})">
      <div class="bike-image">
        🏍️
        ${bike.certified ? '<div class="certified-badge">Certified</div>' : ''}
      </div>
      <div class="bike-details">
        <h4 class="bike-title">${bike.brand} ${bike.model}</h4>
        <div class="bike-info">
          <span>${bike.year}</span>
          <span>${bike.odo.toLocaleString()} km</span>
          <span>${bike.owners} owner${bike.owners > 1 ? 's' : ''}</span>
        </div>
        <div class="bike-info">
          <span>📍 ${bike.location}</span>
          <span class="valuation-score">
            📊 Score: ${bike.valuationScore}/10
          </span>
        </div>
        <div class="bike-price">${formatCurrency(bike.price)}</div>
      </div>
    </div>
  `).join('');
  
  console.log('Used bikes populated');
}

function populateAddons() {
  const container = document.getElementById('addonsList');
  if (!container) return;
  
  container.innerHTML = appData.addOns.map(addon => `
    <div class="addon-item">
      <div class="addon-details">
        <h5 style="margin: 0 0 4px;">${addon.name}</h5>
        <p style="margin: 0; font-size: 14px; color: var(--color-text-secondary);">${addon.description}</p>
      </div>
      <div style="display: flex; align-items: center; gap: 12px;">
        <span class="addon-price">${formatCurrency(addon.price)}</span>
        <input type="checkbox" onchange="toggleAddon(${JSON.stringify(addon).replace(/"/g, '&quot;')}, this.checked)">
      </div>
    </div>
  `).join('');
}

function toggleAddon(addon, checked) {
  if (checked) {
    currentBooking.addons.push(addon);
  } else {
    currentBooking.addons = currentBooking.addons.filter(a => a.id !== addon.id);
  }
  updateBookingTotal();
}

function updateBookingTotal() {
  let total = currentBooking.basePrice;
  
  // Add service type cost
  if (currentBooking.serviceType === 'doorstep') {
    total += 299;
  }
  
  // Add addons
  currentBooking.addons.forEach(addon => {
    total += addon.price;
  });
  
  currentBooking.total = total;
  updateBookingSummary();
}

function updateBookingSummary() {
  const summary = document.getElementById('summaryContent');
  if (!summary) return;
  
  const totals = calculateGST(currentBooking.total);
  
  summary.innerHTML = `
    <div style="margin-bottom: 16px;">
      <strong>${currentBooking.packageName}</strong><br>
      <span style="color: var(--color-text-secondary);">${currentBooking.package.description}</span>
    </div>
    
    <div style="border-bottom: 1px solid var(--color-border); padding-bottom: 12px; margin-bottom: 12px;">
      <div style="display: flex; justify-content: space-between; margin: 4px 0;">
        <span>Base Service:</span>
        <span>${formatCurrency(currentBooking.basePrice)}</span>
      </div>
      ${currentBooking.serviceType === 'doorstep' ? 
        '<div style="display: flex; justify-content: space-between; margin: 4px 0;"><span>Doorstep Service:</span><span>₹299</span></div>' : ''}
      ${currentBooking.addons.map(addon => 
        `<div style="display: flex; justify-content: space-between; margin: 4px 0;"><span>${addon.name}:</span><span>${formatCurrency(addon.price)}</span></div>`
      ).join('')}
    </div>
    
    <div style="margin-bottom: 16px;">
      <div style="display: flex; justify-content: space-between; margin: 4px 0;">
        <span>Subtotal:</span>
        <span>${formatCurrency(totals.subtotal)}</span>
      </div>
      <div style="display: flex; justify-content: space-between; margin: 4px 0;">
        <span>GST (18%):</span>
        <span>${formatCurrency(totals.gst)}</span>
      </div>
      <div style="display: flex; justify-content: space-between; margin: 8px 0; font-weight: bold; font-size: 18px; color: var(--color-primary);">
        <span>Total:</span>
        <span>${formatCurrency(totals.total)}</span>
      </div>
    </div>
    
    <div class="mandatory-footer">
      ${getMandatoryFooter(totals.total).replace(/\n/g, '<br>')}
    </div>
  `;
}

function showStep(step) {
  currentStep = step;
  
  // Hide all steps
  document.querySelectorAll('.booking-step').forEach(s => s.classList.remove('active'));
  
  // Show current step
  const currentStepEl = document.getElementById(`step${step}`);
  if (currentStepEl) currentStepEl.classList.add('active');
  
  // Update buttons
  const prevBtn = document.getElementById('prevStep');
  const nextBtn = document.getElementById('nextStep');
  const bookBtn = document.getElementById('bookViaWhatsApp');
  
  if (prevBtn) prevBtn.style.display = step > 1 ? 'block' : 'none';
  
  if (step < 3) {
    if (nextBtn) {
      nextBtn.style.display = 'block';
      nextBtn.classList.remove('hidden');
    }
    if (bookBtn) bookBtn.classList.add('hidden');
  } else {
    if (nextBtn) nextBtn.classList.add('hidden');
    if (bookBtn) bookBtn.classList.remove('hidden');
    updateBookingSummary();
  }
}

function populateUI() {
  populateBikeSelector();
  populateServicePackages();
  populateMechanics();
  populateSpareParts();
  populateUsedBikes();
}

// Global function assignments for onclick handlers
window.openServiceModal = openServiceModal;
window.openBikeModal = openBikeModal;
window.addToCart = addToCart;
window.updateCartQuantity = updateCartQuantity;
window.toggleAddon = toggleAddon;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
  console.log('BikeServ platform initializing...');
  
  // Set initial language
  document.body.setAttribute('data-lang', currentLanguage);
  
  // Populate UI
  populateUI();
  
  // Event Listeners
  const languageToggle = document.getElementById('languageToggle');
  if (languageToggle) {
    languageToggle.addEventListener('click', switchLanguage);
  }
  
  // Tab navigation
  document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', (e) => {
      e.preventDefault();
      switchTab(e.target.dataset.tab);
    });
  });
  
  document.querySelectorAll('.bottom-nav [data-tab]').forEach(tab => {
    tab.addEventListener('click', (e) => {
      e.preventDefault();
      switchTab(e.currentTarget.dataset.tab);
    });
  });
  
  // Modal close buttons
  const closeServiceModal = document.getElementById('closeServiceModal');
  if (closeServiceModal) {
    closeServiceModal.addEventListener('click', () => {
      document.getElementById('serviceModal').classList.add('hidden');
    });
  }
  
  const closeBikeModal = document.getElementById('closeBikeModal');
  if (closeBikeModal) {
    closeBikeModal.addEventListener('click', () => {
      document.getElementById('bikeModal').classList.add('hidden');
    });
  }
  
  // Service booking flow
  const nextStep = document.getElementById('nextStep');
  if (nextStep) {
    nextStep.addEventListener('click', () => {
      if (currentStep === 1) {
        // Validate service type selection
        const serviceType = document.querySelector('input[name="serviceType"]:checked');
        if (!serviceType) {
          alert('Please select a service type');
          return;
        }
        currentBooking.serviceType = serviceType.value;
        updateBookingTotal();
        showStep(2);
      } else if (currentStep === 2) {
        showStep(3);
      }
    });
  }
  
  const prevStep = document.getElementById('prevStep');
  if (prevStep) {
    prevStep.addEventListener('click', () => {
      if (currentStep > 1) {
        showStep(currentStep - 1);
      }
    });
  }
  
  const bookViaWhatsApp = document.getElementById('bookViaWhatsApp');
  if (bookViaWhatsApp) {
    bookViaWhatsApp.addEventListener('click', () => {
      // Validate required fields
      const address = document.getElementById('serviceAddress')?.value;
      const date = document.getElementById('serviceDate')?.value;
      const time = document.getElementById('serviceTime')?.value;
      
      if (!address || !date || !time) {
        alert('Please fill in all required fields');
        return;
      }
      
      if (!selectedBike) {
        alert('Please select your bike first');
        return;
      }
      
      currentBooking.address = address;
      currentBooking.date = date;
      currentBooking.time = time;
      
      const totals = calculateGST(currentBooking.total);
      currentBooking.total = totals.total;
      
      const message = generateServiceWhatsAppMessage(currentBooking);
      window.open(`https://wa.me/919003356047?text=${message}`, '_blank');

      // Close modal
      document.getElementById('serviceModal').classList.add('hidden');
    });
  }
  
  // Parts WhatsApp order
  const orderViaWhatsApp = document.getElementById('orderViaWhatsApp');
  if (orderViaWhatsApp) {
    orderViaWhatsApp.addEventListener('click', () => {
      if (cart.length === 0) {
        alert('Your cart is empty');
        return;
      }
      
      const message = generatePartsWhatsAppMessage();
      window.open(`https://wa.me/919003356047?text=${message}`, '_blank');
    });
  }
  
  // Cart navigation
  const cartNav = document.getElementById('cartNav');
  if (cartNav) {
    cartNav.addEventListener('click', () => {
      if (cart.length > 0) {
        switchTab('parts');
        const cartSummary = document.getElementById('cartSummary');
        if (cartSummary) {
          cartSummary.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  }
  
  // Search functionality
  const searchNav = document.getElementById('searchNav');
  if (searchNav) {
    searchNav.addEventListener('click', () => {
      const searchInput = document.getElementById('searchInput');
      if (searchInput) searchInput.focus();
    });
  }
  
  // Close modals when clicking outside
  document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.add('hidden');
      }
    });
  });
  
  // Set minimum date for service booking
  const serviceDate = document.getElementById('serviceDate');
  if (serviceDate) {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    serviceDate.min = tomorrow.toISOString().split('T')[0];
  }
  
  console.log('BikeServ platform initialized successfully!');
});