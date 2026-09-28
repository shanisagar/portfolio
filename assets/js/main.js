(function () {
  "use strict";

  const select = (el, all = false) => all ? [...document.querySelectorAll(el)] : document.querySelector(el)

  const header = select('#header')
  const navToggle = select('.mobile-nav-toggle')
  const backtotop = select('.back-to-top')
  const navLinks = select('#navbar .nav-link', true)

  /**
   * Header background, back-to-top button and active nav link on scroll
   */
  const onScroll = () => {
    const y = window.scrollY
    header.classList.toggle('scrolled', y > 20)
    backtotop.classList.toggle('active', y > 300)

    const position = y + window.innerHeight / 3
    navLinks.forEach(link => {
      const section = select(link.hash)
      if (!section) return
      const inView = position >= section.offsetTop && position < section.offsetTop + section.offsetHeight
      link.classList.toggle('active', inView)
    })
  }
  window.addEventListener('load', onScroll)
  document.addEventListener('scroll', onScroll, { passive: true })

  /**
   * Mobile nav
   */
  const setMobileNav = (open) => {
    document.body.classList.toggle('mobile-nav-active', open)
    const icon = navToggle.querySelector('i')
    icon.classList.toggle('bi-list', !open)
    icon.classList.toggle('bi-x', open)
  }
  navToggle.addEventListener('click', () => {
    setMobileNav(!document.body.classList.contains('mobile-nav-active'))
  })
  select('#navbar a', true).forEach(a => a.addEventListener('click', () => setMobileNav(false)))

  /**
   * Age from birthday (28 June 1995)
   */
  const ageEl = select('#age')
  if (ageEl) {
    const born = new Date(1995, 5, 28)
    const now = new Date()
    let age = now.getFullYear() - born.getFullYear()
    if (now < new Date(now.getFullYear(), born.getMonth(), born.getDate())) age--
    ageEl.textContent = age
  }
  const yearEl = select('#year')
  if (yearEl) yearEl.textContent = new Date().getFullYear()

  /**
   * Hero typing effect
   */
  const typed = select('.typed')
  if (typed && window.Typed) {
    new Typed('.typed', {
      strings: typed.getAttribute('data-typed-items').split(','),
      loop: true,
      typeSpeed: 70,
      backSpeed: 40,
      backDelay: 1800
    })
  }

  /**
   * Stat counters
   */
  const counters = select('.stat .num', true)
  const runCounter = (el) => {
    const target = +el.dataset.count
    const start = performance.now()
    const duration = 1200
    const tick = (t) => {
      const p = Math.min((t - start) / duration, 1)
      el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)))
      if (p < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          runCounter(entry.target)
          io.unobserve(entry.target)
        }
      })
    }, { threshold: 0.5 })
    counters.forEach(c => io.observe(c))
  } else {
    counters.forEach(c => c.textContent = c.dataset.count)
  }

  /**
   * Portfolio isotope and filter
   */
  window.addEventListener('load', () => {
    const container = select('.portfolio-container')
    if (!container) return

    const iso = new Isotope(container, {
      itemSelector: '.portfolio-item',
      layoutMode: 'fitRows'
    })

    const filters = select('#portfolio-flters li', true)
    filters.forEach(filter => {
      filter.addEventListener('click', () => {
        filters.forEach(f => f.classList.remove('filter-active'))
        filter.classList.add('filter-active')
        iso.arrange({ filter: filter.getAttribute('data-filter') })
        iso.once('arrangeComplete', () => AOS.refresh())
      })
    })
  })

  /**
   * Portfolio lightbox
   */
  GLightbox({ selector: '.portfolio-lightbox' })

  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 800,
      easing: 'ease-out-cubic',
      once: true,
      offset: 60
    })
  })

})()
