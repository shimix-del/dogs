/**
 * KENNEL & CLINIC — KENYA'S PREMIER CANINE REPRODUCTION VET
 * Interactive Motion & Experience Engine (GSAP + ScrollTrigger)
 * Designed for responsive elegance, mobile-first performance, and tactile joy.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isTouchDevice = window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window;

  // ---------------------------------------------------------------------------
  // 1. PRELOADER & HERO REVEAL
  // ---------------------------------------------------------------------------
  const preloader = document.getElementById('preloader');
  const preloaderCounter = document.getElementById('preloaderCounter');
  const preloaderPaws = document.querySelectorAll('.preloader-paw');

  let currentCount = 0;
  const targetCount = 100;
  const duration = prefersReducedMotion ? 100 : 1600; // ms
  const stepTime = Math.max(10, Math.floor(duration / targetCount));

  const counterTimer = setInterval(() => {
    currentCount += 2;
    if (currentCount >= targetCount) {
      currentCount = targetCount;
      clearInterval(counterTimer);
      if (preloaderCounter) preloaderCounter.textContent = '100%';
      finishPreloader();
    } else {
      if (preloaderCounter) {
        preloaderCounter.textContent = `${String(currentCount).padStart(2, '0')}%`;
      }
      // Light up paws progressively
      const pawIndex = Math.floor((currentCount / 100) * preloaderPaws.length);
      preloaderPaws.forEach((paw, idx) => {
        if (idx <= pawIndex) paw.classList.add('active');
      });
    }
  }, stepTime);

  function finishPreloader() {
    setTimeout(() => {
      if (preloader) {
        preloader.classList.add('loaded');
      }
      initHeroAnimations();
      initScrollTriggers();
    }, 280);
  }

  // ---------------------------------------------------------------------------
  // 2. HERO ANIMATIONS
  // ---------------------------------------------------------------------------
  function initHeroAnimations() {
    if (typeof gsap === 'undefined') return;

    const heroTimeline = gsap.timeline({ defaults: { ease: 'power3.out' } });

    heroTimeline
      .from('.hero-badge-tag', {
        y: 20,
        opacity: 0,
        duration: 0.7,
      })
      .from('.hero-title-line', {
        y: 60,
        opacity: 0,
        rotation: 2,
        stagger: 0.15,
        duration: 1,
      }, '-=0.4')
      .from('.hero-subtext', {
        y: 25,
        opacity: 0,
        duration: 0.8,
      }, '-=0.6')
      .from('.hero-cta-group', {
        y: 20,
        opacity: 0,
        duration: 0.7,
      }, '-=0.5')
      .from('.hero-dog-frame', {
        scale: 0.94,
        opacity: 0,
        duration: 1.2,
        ease: 'expo.out'
      }, '-=1')
      .from('.hero-floating-card', {
        scale: 0.8,
        opacity: 0,
        stagger: 0.2,
        duration: 0.8,
        ease: 'back.out(1.7)'
      }, '-=0.6');
  }

  // ---------------------------------------------------------------------------
  // 3. CUSTOM CURSOR (DESKTOP ONLY)
  // ---------------------------------------------------------------------------
  const cursorDot = document.getElementById('cursorDot');
  const cursorRing = document.getElementById('cursorRing');
  const cursorText = document.getElementById('cursorText');

  if (cursorDot && cursorRing && !isTouchDevice && !prefersReducedMotion && typeof gsap !== 'undefined') {
    const setDotX = gsap.quickTo(cursorDot, 'x', { duration: 0.08, ease: 'power2.out' });
    const setDotY = gsap.quickTo(cursorDot, 'y', { duration: 0.08, ease: 'power2.out' });
    const setRingX = gsap.quickTo(cursorRing, 'x', { duration: 0.25, ease: 'power3.out' });
    const setRingY = gsap.quickTo(cursorRing, 'y', { duration: 0.25, ease: 'power3.out' });

    window.addEventListener('mousemove', (e) => {
      setDotX(e.clientX);
      setDotY(e.clientY);
      setRingX(e.clientX);
      setRingY(e.clientY);
    });

    // Hover triggers for custom cursor states
    document.querySelectorAll('a, button, .service-row, .polaroid-card, .accordion-trigger').forEach((el) => {
      el.addEventListener('mouseenter', () => {
        const customType = el.getAttribute('data-cursor');
        if (customType === 'paw') {
          cursorRing.classList.add('is-paw');
          if (cursorText) cursorText.textContent = '🐾';
        } else if (customType === 'view') {
          cursorRing.classList.add('is-hover');
          if (cursorText) cursorText.textContent = 'VIEW';
        } else {
          cursorRing.classList.add('is-hover');
          if (cursorText) cursorText.textContent = '';
        }
      });

      el.addEventListener('mouseleave', () => {
        cursorRing.classList.remove('is-hover', 'is-paw');
        if (cursorText) cursorText.textContent = '';
      });
    });
  }

  // ---------------------------------------------------------------------------
  // 4. MAGNETIC BUTTONS
  // ---------------------------------------------------------------------------
  if (!isTouchDevice && !prefersReducedMotion && typeof gsap !== 'undefined') {
    const magneticBtns = document.querySelectorAll('[data-magnetic="true"]');

    magneticBtns.forEach((btn) => {
      const strength = 28;

      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const distanceX = e.clientX - centerX;
        const distanceY = e.clientY - centerY;

        gsap.to(btn, {
          x: (distanceX / rect.width) * strength,
          y: (distanceY / rect.height) * strength,
          duration: 0.35,
          ease: 'power2.out'
        });
      });

      btn.addEventListener('mouseleave', () => {
        gsap.to(btn, {
          x: 0,
          y: 0,
          duration: 0.6,
          ease: 'elastic.out(1, 0.4)'
        });
      });
    });
  }

  // ---------------------------------------------------------------------------
  // 5. STICKY NAVBAR & MOBILE MENU
  // ---------------------------------------------------------------------------
  const navbar = document.getElementById('navbar');
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }
  }, { passive: true });

  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = mobileDrawer.classList.toggle('is-open');
      mobileToggle.setAttribute('aria-expanded', String(isOpen));
      mobileToggle.innerHTML = isOpen
        ? `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`
        : `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`;
    });

    // Close mobile drawer when clicking any link
    mobileDrawer.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('is-open');
        mobileToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // ---------------------------------------------------------------------------
  // 6. BREEDING JOURNEY HORIZONTAL PINNED SCROLL
  // ---------------------------------------------------------------------------
  function initScrollTriggers() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger);

    const journeySection = document.getElementById('breedingJourney');
    const journeyTrack = document.getElementById('journeyTrack');
    const progressBar = document.getElementById('journeyProgressFill');

    // Only apply horizontal pin if desktop and screen > 900px
    if (journeySection && journeyTrack && window.innerWidth > 900 && !prefersReducedMotion) {
      const getScrollAmount = () => -(journeyTrack.scrollWidth - window.innerWidth + 120);

      const journeyTween = gsap.to(journeyTrack, {
        x: getScrollAmount,
        ease: 'none',
        scrollTrigger: {
          trigger: journeySection,
          pin: true,
          scrub: 1,
          start: 'top top',
          end: () => `+=${journeyTrack.scrollWidth}`,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (progressBar) {
              progressBar.style.width = `${Math.round(self.progress * 100)}%`;
            }
          }
        }
      });
    }

    // -------------------------------------------------------------------------
    // 7. VELOCITY-REACTIVE MARQUEE
    // -------------------------------------------------------------------------
    const marqueeTrack = document.getElementById('marqueeTrack');
    if (marqueeTrack && !prefersReducedMotion) {
      let currentSpeed = 1;
      ScrollTrigger.create({
        onUpdate: (self) => {
          const velocity = Math.abs(self.getVelocity() / 300);
          const newSpeed = Math.min(Math.max(1, velocity), 4.5);
          marqueeTrack.style.animationDuration = `${42 / newSpeed}s`;
        }
      });
    }

    // -------------------------------------------------------------------------
    // 8. SECTION REVEALS & NUMERICAL COUNTERS
    // -------------------------------------------------------------------------
    if (!prefersReducedMotion) {
      gsap.utils.toArray('.reveal-on-scroll').forEach((elem) => {
        gsap.from(elem, {
          scrollTrigger: {
            trigger: elem,
            start: 'top 85%',
            toggleActions: 'play none none none'
          },
          y: 40,
          opacity: 0,
          duration: 0.9,
          ease: 'power3.out'
        });
      });

      // Animated Stat Counters
      document.querySelectorAll('[data-counter-target]').forEach((counterElem) => {
        const targetValue = parseInt(counterElem.getAttribute('data-counter-target'), 10) || 0;
        const suffix = counterElem.getAttribute('data-counter-suffix') || '';

        ScrollTrigger.create({
          trigger: counterElem,
          start: 'top 85%',
          once: true,
          onEnter: () => {
            gsap.to({ val: 0 }, {
              val: targetValue,
              duration: 2,
              ease: 'power2.out',
              onUpdate: function() {
                counterElem.textContent = `${Math.floor(this.targets()[0].val)}${suffix}`;
              }
            });
          }
        });
      });
    }
  }

  // ---------------------------------------------------------------------------
  // 9. SERVICE ROWS CURSOR-FOLLOWING IMAGE PREVIEW
  // ---------------------------------------------------------------------------
  const floatingPreview = document.getElementById('serviceFloatingPreview');
  const floatingImg = document.getElementById('serviceFloatingImg');
  const serviceRows = document.querySelectorAll('.service-row');

  if (floatingPreview && floatingImg && !isTouchDevice && !prefersReducedMotion && typeof gsap !== 'undefined') {
    const setPrevX = gsap.quickTo(floatingPreview, 'x', { duration: 0.35, ease: 'power3.out' });
    const setPrevY = gsap.quickTo(floatingPreview, 'y', { duration: 0.35, ease: 'power3.out' });

    window.addEventListener('mousemove', (e) => {
      // Offset slightly so it floats near cursor
      setPrevX(e.clientX + 30);
      setPrevY(e.clientY - 160);
    });

    serviceRows.forEach((row) => {
      row.addEventListener('mouseenter', () => {
        const imgSrc = row.getAttribute('data-image');
        if (imgSrc) {
          floatingImg.src = imgSrc;
          floatingPreview.classList.add('active');
        }
      });

      row.addEventListener('mouseleave', () => {
        floatingPreview.classList.remove('active');
      });
    });
  }

  // ---------------------------------------------------------------------------
  // 10. ACCORDION (ORIGIN UI-STYLE ACCESSIBLE BEHAVIOR)
  // ---------------------------------------------------------------------------
  const accordionItems = document.querySelectorAll('.accordion-item');

  accordionItems.forEach((item) => {
    const trigger = item.querySelector('.accordion-trigger');
    const content = item.querySelector('.accordion-content');

    if (!trigger || !content) return;

    trigger.addEventListener('click', () => {
      const isCurrentlyOpen = item.classList.contains('is-open');

      // Optional: Close other accordions for clean single-view
      accordionItems.forEach((other) => {
        if (other !== item) {
          other.classList.remove('is-open');
          const otherTrigger = other.querySelector('.accordion-trigger');
          if (otherTrigger) otherTrigger.setAttribute('aria-expanded', 'false');
        }
      });

      if (isCurrentlyOpen) {
        item.classList.remove('is-open');
        trigger.setAttribute('aria-expanded', 'false');
      } else {
        item.classList.add('is-open');
        trigger.setAttribute('aria-expanded', 'true');
      }
    });

    // Keyboard accessibility (Space or Enter handled natively by <button>)
  });

  // ---------------------------------------------------------------------------
  // 11. MULTI-STEP BOOKING ENGINE & WHATSAPP GENERATOR
  // ---------------------------------------------------------------------------
  const stepPanes = document.querySelectorAll('.step-pane');
  const stepIndicators = document.querySelectorAll('.booking-step-indicator');
  const bookingForm = document.getElementById('bookingForm');
  const btnNext = document.getElementById('btnNextStep');
  const btnPrev = document.getElementById('btnPrevStep');
  const btnSubmit = document.getElementById('btnSubmitBooking');
  const successBox = document.getElementById('bookingSuccess');
  const whatsAppActionBtn = document.getElementById('btnWhatsAppAction');

  let currentStep = 1;
  const totalSteps = 4;

  function updateStepUI() {
    // Show/hide step panes
    stepPanes.forEach((pane) => {
      const paneStep = parseInt(pane.getAttribute('data-step'), 10);
      if (paneStep === currentStep) {
        pane.classList.add('active');
      } else {
        pane.classList.remove('active');
      }
    });

    // Update progress markers
    stepIndicators.forEach((indicator, index) => {
      const stepNum = index + 1;
      indicator.classList.remove('active', 'completed');
      if (stepNum === currentStep) {
        indicator.classList.add('active');
      } else if (stepNum < currentStep) {
        indicator.classList.add('completed');
      }
    });

    // Manage buttons
    if (btnPrev) {
      btnPrev.style.display = currentStep > 1 ? 'inline-flex' : 'none';
    }
    if (btnNext) {
      btnNext.style.display = currentStep < totalSteps ? 'inline-flex' : 'none';
    }
    if (btnSubmit) {
      btnSubmit.style.display = currentStep === totalSteps ? 'inline-flex' : 'none';
    }
  }

  function validateCurrentStep() {
    const currentPane = document.querySelector(`.step-pane[data-step="${currentStep}"]`);
    if (!currentPane) return true;

    const requiredFields = currentPane.querySelectorAll('[required]');
    let isValid = true;

    requiredFields.forEach((field) => {
      if (!field.value.trim()) {
        isValid = false;
        field.style.borderColor = 'var(--color-terracotta)';
        field.focus();
      } else {
        field.style.borderColor = 'var(--border-strong)';
      }
    });

    // Step 3 specific: service check
    if (currentStep === 3) {
      const selectedService = document.querySelector('input[name="serviceType"]:checked');
      if (!selectedService) {
        alert('Please select the service required for your dog.');
        return false;
      }
    }

    return isValid;
  }

  if (btnNext) {
    btnNext.addEventListener('click', (e) => {
      e.preventDefault();
      if (validateCurrentStep()) {
        if (currentStep < totalSteps) {
          currentStep++;
          updateStepUI();
        }
      }
    });
  }

  if (btnPrev) {
    btnPrev.addEventListener('click', (e) => {
      e.preventDefault();
      if (currentStep > 1) {
        currentStep--;
        updateStepUI();
      }
    });
  }

  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!validateCurrentStep()) return;

      // Extract form data
      const ownerName = document.getElementById('ownerName')?.value || 'Client';
      const ownerPhone = document.getElementById('ownerPhone')?.value || '';
      const ownerLocation = document.getElementById('ownerLocation')?.value || 'Nairobi';
      const dogName = document.getElementById('dogName')?.value || 'My Dog';
      const dogBreed = document.getElementById('dogBreed')?.value || 'Canine';
      const serviceChosen = document.querySelector('input[name="serviceType"]:checked')?.value || 'Breeding Consult';
      const preferredDate = document.getElementById('preferredDate')?.value || 'Soonest available';
      const notes = document.getElementById('extraNotes')?.value || 'None';

      // Format WhatsApp message
      const waText = `Hello Dr. Nduta (Kennel & Clinic Kenya),%0A%0AI would like to book a breeding consultation:%0A` +
        `• *Owner:* ${encodeURIComponent(ownerName)} (${encodeURIComponent(ownerPhone)}, ${encodeURIComponent(ownerLocation)})%0A` +
        `• *Dog:* ${encodeURIComponent(dogName)} (${encodeURIComponent(dogBreed)})%0A` +
        `• *Service:* ${encodeURIComponent(serviceChosen)}%0A` +
        `• *Preferred Date:* ${encodeURIComponent(preferredDate)}%0A` +
        `• *Notes:* ${encodeURIComponent(notes)}%0A%0APlease confirm availability!`;

      const waUrl = `https://wa.me/254712345678?text=${waText}`;

      // Show success box
      if (bookingForm) bookingForm.style.display = 'none';
      if (successBox) {
        successBox.style.display = 'block';
        const summaryHolder = document.getElementById('bookingSummaryDetails');
        if (summaryHolder) {
          summaryHolder.innerHTML = `<strong>${dogName}</strong> (${dogBreed}) for <em>${serviceChosen}</em> on ${preferredDate}.`;
        }
      }

      if (whatsAppActionBtn) {
        whatsAppActionBtn.href = waUrl;
      }
    });
  }

  // ---------------------------------------------------------------------------
  // 12. EASTER EGGS: LOGO PAW RUNNER & KONAMI CODE
  // ---------------------------------------------------------------------------
  const navBrand = document.getElementById('navBrand');
  const pawRunner = document.getElementById('pawRunnerOverlay');

  if (navBrand && pawRunner) {
    navBrand.addEventListener('click', (e) => {
      // If clicking home link, still trigger playful paw print run
      runPawTrailAnimation();
    });
  }

  function runPawTrailAnimation() {
    if (!pawRunner || typeof gsap === 'undefined') return;

    pawRunner.innerHTML = '';
    pawRunner.style.display = 'block';

    const count = 12;
    for (let i = 0; i < count; i++) {
      const paw = document.createElement('div');
      paw.className = 'paw-stamp-particle';
      paw.innerHTML = `<svg width="32" height="32" viewBox="0 0 24 24" fill="#C8553D"><path d="M12 2c1.1 0 2 .9 2 2 0 1.1-.9 2-2 2s-2-.9-2-2c0-1.1.9-2 2-2zm-5.5 4c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm11 0c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm-10 6.5c.83 0 1.5.67 1.5 1.5 0 .83-.67 1.5-1.5 1.5s-1.5-.67-1.5-1.5c0-.83.67-1.5 1.5-1.5zm9 0c.83 0 1.5.67 1.5 1.5 0 .83-.67 1.5-1.5 1.5s-1.5-.67-1.5-1.5c0-.83.67-1.5 1.5-1.5zm-4.5 1.5c2.5 0 4.5 1.57 4.5 3.5 0 1.3-.9 2.5-2.25 3.1-.65.3-1.45.4-2.25.4s-1.6-.1-2.25-.4c-1.35-.6-2.25-1.8-2.25-3.1 0-1.93 2-3.5 4.5-3.5z"/></svg>`;
      paw.style.position = 'absolute';
      paw.style.left = `${(i / count) * 90 + 5}%`;
      paw.style.top = `${35 + Math.sin(i) * 12}%`;
      paw.style.transform = `rotate(${i % 2 === 0 ? 15 : -15}deg) scale(0)`;
      paw.style.opacity = '0';
      pawRunner.appendChild(paw);

      gsap.to(paw, {
        opacity: 0.9,
        scale: 1.2,
        delay: i * 0.12,
        duration: 0.35,
        ease: 'back.out(2)',
        onComplete: () => {
          gsap.to(paw, {
            opacity: 0,
            scale: 0.8,
            delay: 0.4,
            duration: 0.5,
          });
        }
      });
    }

    setTimeout(() => {
      pawRunner.style.display = 'none';
    }, count * 120 + 1200);
  }

  // ---------------------------------------------------------------------------
  // 13. POLAROID MODAL PREVIEW
  // ---------------------------------------------------------------------------
  const modal = document.getElementById('polaroidModal');
  const modalImg = document.getElementById('modalImage');
  const modalTitle = document.getElementById('modalTitle');
  const modalDesc = document.getElementById('modalDesc');
  const modalClose = document.getElementById('modalClose');

  document.querySelectorAll('.polaroid-card').forEach((card) => {
    card.addEventListener('click', () => {
      const img = card.querySelector('.polaroid-photo');
      const title = card.querySelector('.polaroid-title');
      const meta = card.querySelector('.polaroid-meta');

      if (modal && modalImg && modalTitle && modalDesc && img && title) {
        modalImg.src = img.src;
        modalTitle.textContent = title.textContent;
        modalDesc.textContent = meta ? meta.textContent : '';
        modal.style.display = 'flex';
      }
    });
  });

  if (modalClose && modal) {
    modalClose.addEventListener('click', () => {
      modal.style.display = 'none';
    });
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.style.display = 'none';
    });
  }

  console.log('🐾 Kennel & Clinic (Kenya) initialized with warm craft & care.');
});
