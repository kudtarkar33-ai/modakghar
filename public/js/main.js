(function () {
  'use strict';

  const PHONE = '918850391726'; // country code + number, no symbols

  const WHATSAPP_MSG = {
    en: "Hi Modak Ghar! I'd like to place an order.",
    mr: 'नमस्कार मोदक घर! मला ऑर्डर द्यायची आहे.',
  };

  const i18n = {
    en: {
      'nav.about': 'About',
      'nav.gallery': 'Gallery',
      'nav.order': 'Order',
      'nav.enquire': 'Enquire',
      'nav.contact': 'Contact',
      'warning.text': '⚠ All orders & payments are accepted ONLY via WhatsApp or Instagram DM on our official number — beware of fraudulent accounts. For any query, call +91 88503 91726.',
      'hero.eyebrow': 'Handmade in small batches',
      'hero.titleLine1': 'Chocolate modaks,',
      'hero.titleLine2': 'moulded with love.',
      'hero.subtitle': "Rich, hand-set chocolate modaks in classic and festive moulds — made fresh to order by Rasika Patil, for your Ganpati thali and gifting boxes.",
      'hero.ctaWhatsapp': 'Order on WhatsApp',
      'hero.ctaInstagram': 'Order on Instagram',
      'hero.note': 'Festive orders for Ganpati fill up fast — message early to reserve your date.',
      'hero.chip1': 'Dark chocolate',
      'hero.chip2': 'Milk chocolate',
      'hero.chip3': 'Festive assorted boxes',
      'hero.chip4': 'Custom moulds on request',
      'about.eyebrow': 'The maker',
      'about.title': 'Every mould, filled by hand',
      'about.body1': "Modak Ghar started at home, with one steel mould and a love for the smell of tempered chocolate. Today every piece — rose, shell, leaf, or the classic modak point — is still poured, set and packed by hand, in small batches so nothing sits on a shelf too long.",
      'about.body2': "No two trays look exactly alike, and that's the point: this is a person making your sweets, not a factory.",
      'about.founder': 'Founder, Modak Ghar',
      'gallery.eyebrow': 'Fresh from the mould',
      'gallery.title': "A few recent batches",
      'gallery.subtitle': "Photos update often — this is what's actually being made this week.",
      'gallery.empty': 'New photos coming soon.',
      'order.eyebrow': 'How it works',
      'order.title': 'Three steps to your box',
      'order.step1Title': 'Message us',
      'order.step1Body': "Send a WhatsApp message or Instagram DM with the quantity and flavours you'd like.",
      'order.step2Title': 'Confirm & pay',
      'order.step2Body': "We'll confirm price, pack size and pickup/delivery date — payment is taken only inside that same chat.",
      'order.step3Title': 'Unwrap & enjoy',
      'order.step3Body': 'Collect your box, fresh and beautifully packed, on the date you chose.',
      'order.whatsappBtn': 'Chat on WhatsApp — 88503 91726',
      'order.instagramBtn': 'Message on Instagram',
      'order.instagramComingSoon': 'Instagram link coming soon — for now, please order via WhatsApp.',
      'enquire.eyebrow': 'Not sure what to say?',
      'enquire.title': 'Send a quick enquiry',
      'enquire.subtitle': "Fill this in and we'll open WhatsApp with your details ready to send — nothing is sent until you press send there.",
      'enquire.name': 'Your name',
      'enquire.phone': 'Phone number',
      'enquire.occasion': 'Occasion',
      'enquire.occasionGanpati': 'Ganpati',
      'enquire.occasionDiwali': 'Diwali',
      'enquire.occasionWedding': 'Wedding / function',
      'enquire.occasionBirthday': 'Birthday',
      'enquire.occasionOther': 'Other',
      'enquire.quantity': 'Approx. quantity',
      'enquire.quantityPlaceholder': 'e.g. 20 pieces',
      'enquire.date': 'Needed by (date)',
      'enquire.message': 'Anything else? (flavours, packaging, etc.)',
      'enquire.submit': 'Continue on WhatsApp',
      'enquire.note': "We'll never ask you to pay anywhere except inside that WhatsApp chat.",
      'warning.block': 'We only ever ask for orders and payments through <strong>WhatsApp</strong> or <strong>Instagram DM</strong> on our own official contact — never through any other number, link, app or "agent". If anyone else contacts you claiming to be Modak Ghar, please call us directly to confirm.',
      'contact.eyebrow': 'Get in touch',
      'contact.title': "Let's talk modaks",
      'contact.proprietorLabel': 'Proprietor',
      'contact.phoneLabel': 'Phone',
      'contact.whatsappLabel': 'WhatsApp',
      'contact.whatsappValue': 'Chat now',
      'contact.instagramLabel': 'Instagram',
      'contact.instagramPlaceholder': 'Coming soon',
      'footer.rights': '© <span id="year"></span> Modak Ghar. Handcrafted with care by Rasika Patil.',
      'footer.adminLink': 'Admin',
      'admin.loginTitle': 'Admin login',
      'admin.loginHint': "For Modak Ghar's owner only, to manage gallery photos.",
      'admin.username': 'Username',
      'admin.password': 'Password',
      'admin.loginBtn': 'Log in',
      'admin.panelTitle': 'Manage gallery',
      'admin.chooseFile': 'Photo',
      'admin.captionEnLabel': 'Caption (English)',
      'admin.captionMrLabel': 'Caption (Marathi)',
      'admin.uploadBtn': 'Add photo',
      'admin.instagramSettingLabel': 'Instagram profile link',
      'admin.saveSettingsBtn': 'Save link',
      'admin.logoutBtn': 'Log out',
    },
    mr: {
      'nav.about': 'आमच्याबद्दल',
      'nav.gallery': 'गॅलरी',
      'nav.order': 'ऑर्डर',
      'nav.enquire': 'चौकशी',
      'nav.contact': 'संपर्क',
      'warning.text': '⚠ सर्व ऑर्डर व पेमेंट फक्त आमच्या अधिकृत नंबरवर व्हॉट्सअ‍ॅप किंवा इंस्टाग्राम DM द्वारेच स्वीकारले जातात — फसवणुकीपासून सावध रहा. कोणत्याही चौकशीसाठी +91 88503 91726 वर कॉल करा.',
      'hero.eyebrow': 'छोट्या बॅचमध्ये हाताने तयार',
      'hero.titleLine1': 'चॉकलेट मोदक,',
      'hero.titleLine2': 'प्रेमाने साचेबद्ध.',
      'hero.subtitle': 'क्लासिक आणि सणासुदीच्या साच्यांतील दर्जेदार, हाताने बनवलेले चॉकलेट मोदक — रसिका पाटील यांच्याकडून तुमच्या गणपती ताटासाठी आणि गिफ्ट बॉक्ससाठी खास बनवलेले.',
      'hero.ctaWhatsapp': 'व्हॉट्सअ‍ॅपवर ऑर्डर करा',
      'hero.ctaInstagram': 'इंस्टाग्रामवर ऑर्डर करा',
      'hero.note': 'गणपतीसाठीच्या ऑर्डर लवकर भरतात — तुमची तारीख राखीव ठेवण्यासाठी लवकर संपर्क करा.',
      'hero.chip1': 'डार्क चॉकलेट',
      'hero.chip2': 'मिल्क चॉकलेट',
      'hero.chip3': 'सणासुदीचे मिश्र बॉक्स',
      'hero.chip4': 'हवे असल्यास खास साचे',
      'about.eyebrow': 'निर्मात्या',
      'about.title': 'प्रत्येक साचा, हाताने भरलेला',
      'about.body1': 'मोदक घरची सुरुवात घरातूनच झाली — एक स्टील साचा आणि टेम्पर्ड चॉकलेटच्या सुगंधावरील प्रेमातून. आजही गुलाब, शिंपला, पान किंवा क्लासिक मोदकाचं टोक — प्रत्येक तुकडा हाताने ओतला, सेट केला आणि पॅक केला जातो, छोट्या बॅचमध्ये, जेणेकरून काहीही जास्त काळ पडून राहणार नाही.',
      'about.body2': 'दोन ट्रे कधीच सारखे दिसत नाहीत, आणि हाच खरा मुद्दा आहे — ही एक व्यक्ती तुमच्यासाठी गोड बनवत आहे, फॅक्टरी नाही.',
      'about.founder': 'संस्थापक, मोदक घर',
      'gallery.eyebrow': 'साच्यातून ताजे',
      'gallery.title': 'काही अलीकडील बॅचेस',
      'gallery.subtitle': 'फोटो वारंवार अपडेट होतात — हे या आठवड्यात प्रत्यक्ष बनवले जात आहे.',
      'gallery.empty': 'नवीन फोटो लवकरच येतील.',
      'order.eyebrow': 'कसं काम चालतं',
      'order.title': 'तुमच्या बॉक्ससाठी तीन पायऱ्या',
      'order.step1Title': 'आम्हाला संदेश पाठवा',
      'order.step1Body': 'हवं असलेलं प्रमाण आणि फ्लेवर्ससह व्हॉट्सअ‍ॅप संदेश किंवा इंस्टाग्राम DM पाठवा.',
      'order.step2Title': 'खात्री करा आणि पेमेंट करा',
      'order.step2Body': 'आम्ही किंमत, पॅक साईझ आणि पिकअप/डिलिव्हरीची तारीख कन्फर्म करू — पेमेंट फक्त त्याच चॅटमध्ये घेतलं जातं.',
      'order.step3Title': 'उघडा आणि आनंद घ्या',
      'order.step3Body': 'तुम्ही निवडलेल्या तारखेला ताजा, सुंदर पॅक केलेला बॉक्स घ्या.',
      'order.whatsappBtn': 'व्हॉट्सअ‍ॅपवर चॅट करा — 88503 91726',
      'order.instagramBtn': 'इंस्टाग्रामवर संदेश पाठवा',
      'order.instagramComingSoon': 'इंस्टाग्राम लिंक लवकरच येईल — तोपर्यंत कृपया व्हॉट्सअ‍ॅपद्वारे ऑर्डर करा.',
      'enquire.eyebrow': 'काय लिहावं सुचत नाही?',
      'enquire.title': 'चटकन चौकशी पाठवा',
      'enquire.subtitle': 'हे भरा आणि आम्ही तुमची माहिती तयार ठेवून व्हॉट्सअ‍ॅप उघडू — तिथे पाठवेपर्यंत काहीही पाठवलं जात नाही.',
      'enquire.name': 'तुमचं नाव',
      'enquire.phone': 'फोन नंबर',
      'enquire.occasion': 'प्रसंग',
      'enquire.occasionGanpati': 'गणपती',
      'enquire.occasionDiwali': 'दिवाळी',
      'enquire.occasionWedding': 'लग्न / कार्यक्रम',
      'enquire.occasionBirthday': 'वाढदिवस',
      'enquire.occasionOther': 'इतर',
      'enquire.quantity': 'अंदाजे प्रमाण',
      'enquire.quantityPlaceholder': 'उदा. २० नग',
      'enquire.date': 'कधीपर्यंत हवं (तारीख)',
      'enquire.message': 'आणखी काही? (फ्लेवर, पॅकिंग इ.)',
      'enquire.submit': 'व्हॉट्सअ‍ॅपवर पुढे जा',
      'enquire.note': 'त्या व्हॉट्सअ‍ॅप चॅटशिवाय आम्ही कुठेही पेमेंट मागणार नाही.',
      'warning.block': 'आम्ही ऑर्डर आणि पेमेंटसाठी फक्त आमच्या स्वतःच्या अधिकृत <strong>व्हॉट्सअ‍ॅप</strong> किंवा <strong>इंस्टाग्राम DM</strong> वरच विचारणा करतो — इतर कोणत्याही नंबर, लिंक, अ‍ॅप किंवा "एजंट" मार्फत कधीच नाही. जर कोणी स्वतःला मोदक घर म्हणवून संपर्क केला, तर कृपया खात्री करण्यासाठी थेट आम्हाला कॉल करा.',
      'contact.eyebrow': 'संपर्क साधा',
      'contact.title': 'मोदकांबद्दल बोलूया',
      'contact.proprietorLabel': 'मालक',
      'contact.phoneLabel': 'फोन',
      'contact.whatsappLabel': 'व्हॉट्सअ‍ॅप',
      'contact.whatsappValue': 'आता चॅट करा',
      'contact.instagramLabel': 'इंस्टाग्राम',
      'contact.instagramPlaceholder': 'लवकरच',
      'footer.rights': '© <span id="year"></span> मोदक घर. रसिका पाटील यांनी काळजीपूर्वक हाताने तयार केलेले.',
      'footer.adminLink': 'अ‍ॅडमिन',
      'admin.loginTitle': 'अ‍ॅडमिन लॉगिन',
      'admin.loginHint': 'फक्त मोदक घरच्या मालकासाठी, गॅलरी फोटो व्यवस्थापित करण्यासाठी.',
      'admin.username': 'युजरनेम',
      'admin.password': 'पासवर्ड',
      'admin.loginBtn': 'लॉग इन करा',
      'admin.panelTitle': 'गॅलरी व्यवस्थापित करा',
      'admin.chooseFile': 'फोटो',
      'admin.captionEnLabel': 'कॅप्शन (इंग्रजी)',
      'admin.captionMrLabel': 'कॅप्शन (मराठी)',
      'admin.uploadBtn': 'फोटो जोडा',
      'admin.instagramSettingLabel': 'इंस्टाग्राम प्रोफाइल लिंक',
      'admin.saveSettingsBtn': 'लिंक सेव्ह करा',
      'admin.logoutBtn': 'लॉग आउट',
    },
  };

  let currentLang = localStorage.getItem('modakghar_lang') || 'en';
  let instagramUrl = '';
  let adminToken = sessionStorage.getItem('modakghar_admin_token') || null;

  function applyTranslations() {
    document.documentElement.lang = currentLang;
    document.body.classList.toggle('lang-mr', currentLang === 'mr');
    const dict = i18n[currentLang];
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      if (dict[key] !== undefined) {
        if (dict[key].includes('<')) el.innerHTML = dict[key];
        else el.textContent = dict[key];
      }
    });
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
      const key = el.getAttribute('data-i18n-placeholder');
      if (dict[key] !== undefined) el.setAttribute('placeholder', dict[key]);
    });

    updateActionLinks();
  }

  function setLang(lang) {
    currentLang = lang;
    localStorage.setItem('modakghar_lang', lang);
    applyTranslations();
  }

  document.getElementById('langToggle').addEventListener('click', () => {
    setLang(currentLang === 'en' ? 'mr' : 'en');
  });

  function waLink() {
    const text = encodeURIComponent(WHATSAPP_MSG[currentLang] || WHATSAPP_MSG.en);
    return `https://wa.me/${PHONE}?text=${text}`;
  }

  function updateActionLinks() {
    const wa = waLink();
    ['heroWhatsapp', 'orderWhatsapp', 'contactWhatsapp', 'floatingWhatsapp'].forEach((id) => {
      const el = document.getElementById(id);
      if (el) el.href = wa;
    });

    const hasInsta = !!instagramUrl;
    const igEls = ['heroInstagram', 'orderInstagram'];
    igEls.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      if (hasInsta) {
        el.href = instagramUrl;
        el.classList.remove('is-disabled');
        el.removeAttribute('aria-disabled');
      } else {
        el.href = '#contact';
        el.classList.add('is-disabled');
        el.setAttribute('aria-disabled', 'true');
      }
    });

    const soonNote = document.getElementById('instagramSoon');
    if (soonNote) soonNote.style.display = hasInsta ? 'none' : 'block';

    const contactIg = document.getElementById('contactInstagram');
    const contactIgValue = document.getElementById('contactInstagramValue');
    if (contactIg) {
      if (hasInsta) {
        contactIg.href = instagramUrl;
        contactIgValue.textContent = '@modakghar';
        contactIgValue.removeAttribute('data-i18n');
      } else {
        contactIg.href = '#contact';
      }
    }
  }

  // ---------------- Gallery ----------------
  function renderGallery(photos) {
    const grid = document.getElementById('galleryGrid');
    const empty = document.getElementById('galleryEmpty');
    grid.innerHTML = '';

    if (!photos.length) {
      empty.hidden = false;
    } else {
      empty.hidden = true;
      photos.forEach((p) => grid.appendChild(buildGalleryItem(p)));
    }

    if (adminToken) {
      const addCard = document.createElement('div');
      addCard.className = 'gallery__item';
      addCard.innerHTML = `<div class="gallery__add" id="galleryAddTrigger">+</div>`;
      grid.appendChild(addCard);
      document.getElementById('galleryAddTrigger').addEventListener('click', () => {
        document.getElementById('uploadFile').click();
      });
    }
  }

  function buildGalleryItem(p) {
    const item = document.createElement('div');
    item.className = 'gallery__item';
    const caption = currentLang === 'mr' ? p.captionMr : p.captionEn;
    item.innerHTML = `
      ${adminToken ? `<button class="gallery__delete" data-id="${p.id}" title="Delete photo">&times;</button>` : ''}
      <div class="gallery__frame"><img src="/uploads/${p.filename}" style="clip-path:url(#scallop-clip)" alt="${(caption || 'Modak Ghar photo').replace(/"/g, '')}"></div>
      <p class="gallery__caption">${caption || ''}</p>
    `;
    const delBtn = item.querySelector('.gallery__delete');
    if (delBtn) delBtn.addEventListener('click', () => deletePhoto(p.id));
    return item;
  }

  let allPhotos = [];

  async function loadPhotos() {
    try {
      const res = await fetch('/api/photos');
      const data = await res.json();
      allPhotos = data.photos || [];
      renderGallery(allPhotos);
    } catch (e) {
      console.error('Could not load photos', e);
    }
  }

  async function loadSettings() {
    try {
      const res = await fetch('/api/settings');
      const data = await res.json();
      instagramUrl = data.instagramUrl || '';
      updateActionLinks();
      const input = document.getElementById('instagramUrlInput');
      if (input) input.value = instagramUrl;
    } catch (e) {
      console.error('Could not load settings', e);
    }
  }

  // ---------------- Admin modal ----------------
  const modal = document.getElementById('adminModal');
  const loginView = document.getElementById('loginView');
  const panelView = document.getElementById('panelView');

  function openModal() {
    modal.hidden = false;
    if (adminToken) showPanel();
    else showLogin();
  }
  function closeModal() { modal.hidden = true; }

  document.getElementById('adminOpen').addEventListener('click', openModal);
  modal.querySelectorAll('[data-close]').forEach((el) => el.addEventListener('click', closeModal));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !modal.hidden) closeModal(); });

  function showLogin() { loginView.hidden = false; panelView.hidden = true; }
  function showPanel() {
    loginView.hidden = true; panelView.hidden = false;
    renderAdminPhotoList();
    const input = document.getElementById('instagramUrlInput');
    if (input) input.value = instagramUrl;
  }

  document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('loginUsername').value.trim();
    const password = document.getElementById('loginPassword').value;
    const errEl = document.getElementById('loginError');
    errEl.hidden = true;
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (data.ok) {
        adminToken = data.token;
        sessionStorage.setItem('modakghar_admin_token', adminToken);
        document.getElementById('loginForm').reset();
        showPanel();
        renderGallery(allPhotos);
      } else {
        errEl.textContent = data.error || 'Invalid username or password.';
        errEl.hidden = false;
      }
    } catch (err) {
      errEl.textContent = 'Could not reach the server. Is it running?';
      errEl.hidden = false;
    }
  });

  document.getElementById('logoutBtn').addEventListener('click', async () => {
    try {
      await fetch('/api/admin/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: adminToken }),
      });
    } catch (e) { /* ignore */ }
    adminToken = null;
    sessionStorage.removeItem('modakghar_admin_token');
    closeModal();
    renderGallery(allPhotos);
  });

  function fileToDataUrl(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  document.getElementById('uploadForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const fileInput = document.getElementById('uploadFile');
    const msgEl = document.getElementById('adminMsg');
    const file = fileInput.files[0];
    if (!file) return;

    try {
      const dataUrl = await fileToDataUrl(file);
      const res = await fetch('/api/admin/photos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token: adminToken,
          dataUrl,
          captionEn: document.getElementById('captionEn').value.trim(),
          captionMr: document.getElementById('captionMr').value.trim(),
        }),
      });
      const data = await res.json();
      if (data.ok) {
        allPhotos = data.photos;
        renderGallery(allPhotos);
        renderAdminPhotoList();
        document.getElementById('uploadForm').reset();
        showMsg('Photo added.', false);
      } else {
        showMsg(data.error || 'Could not upload photo.', true);
      }
    } catch (err) {
      showMsg('Something went wrong reading that file.', true);
    }
  });

  function showMsg(text, isError) {
    const msgEl = document.getElementById('adminMsg');
    msgEl.textContent = text;
    msgEl.style.color = isError ? '#ff9f9a' : '';
    msgEl.hidden = false;
    setTimeout(() => { msgEl.hidden = true; }, 3500);
  }

  function renderAdminPhotoList() {
    const list = document.getElementById('adminPhotoList');
    list.innerHTML = '';
    allPhotos.forEach((p) => {
      const row = document.createElement('div');
      row.className = 'admin-photo-row';
      row.innerHTML = `
        <img src="/uploads/${p.filename}" alt="">
        <span>${p.captionEn || p.filename}</span>
        <button data-id="${p.id}">Delete</button>
      `;
      row.querySelector('button').addEventListener('click', () => deletePhoto(p.id));
      list.appendChild(row);
    });
  }

  async function deletePhoto(id) {
    if (!confirm('Delete this photo? This cannot be undone.')) return;
    try {
      const res = await fetch('/api/admin/photos/' + encodeURIComponent(id), {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: adminToken }),
      });
      const data = await res.json();
      if (data.ok) {
        allPhotos = data.photos;
        renderGallery(allPhotos);
        renderAdminPhotoList();
      } else {
        alert(data.error || 'Could not delete photo.');
      }
    } catch (e) {
      alert('Could not reach the server.');
    }
  }

  document.getElementById('settingsForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const url = document.getElementById('instagramUrlInput').value.trim();
    try {
      const res = await fetch('/api/admin/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: adminToken, instagramUrl: url }),
      });
      const data = await res.json();
      if (data.ok) {
        instagramUrl = data.settings.instagramUrl;
        updateActionLinks();
        showMsg('Instagram link saved.', false);
      } else {
        showMsg(data.error || 'Could not save link.', true);
      }
    } catch (err) {
      showMsg('Could not reach the server.', true);
    }
  });

  // ---------------- Enquiry form -> WhatsApp ----------------
  const enquireForm = document.getElementById('enquireForm');
  if (enquireForm) {
    enquireForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('enqName').value.trim();
      const phone = document.getElementById('enqPhone').value.trim();
      const occasionEl = document.getElementById('enqOccasion');
      const occasion = occasionEl.options[occasionEl.selectedIndex]?.value || '';
      const qty = document.getElementById('enqQty').value.trim();
      const date = document.getElementById('enqDate').value;
      const msg = document.getElementById('enqMsg').value.trim();

      const lines = currentLang === 'mr'
        ? [
            'नमस्कार मोदक घर!',
            `नाव: ${name}`,
            `फोन: ${phone}`,
            occasion ? `प्रसंग: ${occasion}` : '',
            qty ? `अंदाजे प्रमाण: ${qty}` : '',
            date ? `कधीपर्यंत हवं: ${date}` : '',
            msg ? `टीप: ${msg}` : '',
          ]
        : [
            'Hi Modak Ghar!',
            `Name: ${name}`,
            `Phone: ${phone}`,
            occasion ? `Occasion: ${occasion}` : '',
            qty ? `Approx. quantity: ${qty}` : '',
            date ? `Needed by: ${date}` : '',
            msg ? `Note: ${msg}` : '',
          ];

      const text = encodeURIComponent(lines.filter(Boolean).join('\n'));
      window.open(`https://wa.me/${PHONE}?text=${text}`, '_blank', 'noopener');
    });
  }

  // ---------------- Scroll reveal ----------------
  function setupRevealObserver() {
    const els = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window) || !els.length) {
      els.forEach((el) => el.classList.add('is-visible'));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    els.forEach((el) => observer.observe(el));
  }

  // ---------------- Back to top ----------------
  function setupBackToTop() {
    const btn = document.getElementById('backToTop');
    if (!btn) return;
    window.addEventListener('scroll', () => {
      btn.hidden = window.scrollY < 500;
    });
    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ---------------- Init ----------------
  async function init() {
    if (adminToken) {
      try {
        const res = await fetch('/api/admin/check', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token: adminToken }),
        });
        const data = await res.json();
        if (!data.ok) {
          adminToken = null;
          sessionStorage.removeItem('modakghar_admin_token');
        }
      } catch (e) { /* offline: keep token, next call will fail gracefully */ }
    }
    applyTranslations();
    await Promise.all([loadPhotos(), loadSettings()]);
    renderGallery(allPhotos);
    setupRevealObserver();
    setupBackToTop();
  }

  init();
})();
