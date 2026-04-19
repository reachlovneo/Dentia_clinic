import { useEffect, useMemo, useState } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import {
  ArrowUp,
  Bike,
  Box,
  ChevronDown,
  Clock3,
  Mail,
  MapPin,
  MessageCircle,
  Menu,
  Phone,
  Quote,
  Shield,
  Smile,
  SmilePlus,
  Star,
  Truck,
  Zap,
  WandSparkles,
  X,
} from 'lucide-react'
import './App.css'

const Motion = motion

const images = {
  hero:
    'https://images.unsplash.com/photo-1587854692152-cbe660dbde36?auto=format&fit=crop&w=2400&q=85',
  aboutLeft:
    'https://images.unsplash.com/photo-1631217314831-4cb2763fe14b?auto=format&fit=crop&w=1200&q=85',
  aboutRight:
    'https://images.unsplash.com/photo-1587854692152-cbe660dbde36?auto=format&fit=crop&w=1200&q=85',
  team:
    'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1200&q=85',
}

const navItems = ['Home', 'Delivery', 'Why Us', 'Testimonials', 'Contact']

const deliveryProducts = [
  {
    icon: Zap,
    title: 'Pain Relief Medicines',
    text: 'Fast-acting dental pain relief delivered within 30-60 mins',
  },
  {
    icon: Box,
    title: 'Tooth Care Kits',
    text: 'Complete oral hygiene kits with toothpaste, brush & mouthwash',
  },
  {
    icon: Shield,
    title: 'Post-Treatment Meds',
    text: 'Prescribed medications after root canal, extraction & implants',
  },
  {
    icon: Smile,
    title: 'Emergency Support',
    text: 'Temporary solutions & expert advice for sudden tooth emergencies',
  },
]

const trustPoints = [
  {
    icon: Truck,
    title: '30-60 Min Delivery',
    text: 'Fast home delivery across Bangalore',
  },
  {
    icon: Shield,
    title: 'Certified Dentists',
    text: 'All medicines prescribed by licensed dentists',
  },
  {
    icon: Clock3,
    title: '24/7 Available',
    text: 'Order anytime, emergency support included',
  },
  {
    icon: MapPin,
    title: 'Bangalore Service',
    text: 'Covering all major areas in Bangalore city',
  },
]

const useCases = [
  {
    emoji: '😖',
    title: 'Sudden Tooth Pain',
    desc: 'Get pain relief medicines delivered instantly',
  },
  {
    emoji: '🪥',
    title: 'Post-Treatment Care',
    desc: 'Required medications after dental procedures',
  },
  {
    emoji: '🌙',
    title: 'Night Emergency',
    desc: 'Dental support available when clinics are closed',
  },
  {
    emoji: '🏥',
    title: 'Busy Schedule',
    desc: 'No time to visit clinic? We deliver to you',
  },
]

const testimonials = [
  {
    name: 'Rajesh K.',
    text: 'Got pain relief medicines delivered in 45 mins! Exactly what I needed at midnight.',
  },
  {
    name: 'Priya M.',
    text: 'After my root canal, I needed medications urgently. They arrived in 35 mins with perfect instructions.',
  },
  {
    name: 'Amit P.',
    text: 'Best service! Delivery was fast, medicines were original, and the dentist consultation was helpful.',
  },
  {
    name: 'Neha S.',
    text: 'No more stress during tooth pain emergencies. This service is a lifesaver for busy people like me.',
  },
]

const reveal = {
  hidden: { opacity: 0, y: 34 },
  visible: { opacity: 1, y: 0 },
}

function Logo({ light = false }) {
  return (
    <a className={`logo ${light ? 'logoLight' : ''}`} href="#home" aria-label="Dentia home">
      <span className="logoMark">
        <SmilePlus size={34} strokeWidth={2.3} />
      </span>
      <span>dentia</span>
    </a>
  )
}

function MagneticButton({ children, className = '', href = '#booking' }) {
  return (
    <Motion.a
      href={href}
      className={`btn ${className}`}
      whileHover={{ y: -3, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 420, damping: 24 }}
    >
      {children}
    </Motion.a>
  )
}

function Header() {
  const [open, setOpen] = useState(false)
  const [solid, setSolid] = useState(false)

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleWhatsApp = () => {
    const message = 'Hi! I want dental medicines or home delivery. Please help.'
    window.open(`https://wa.me/919790819757?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer')
  }

  return (
    <Motion.header
      className={`siteHeader ${solid ? 'isSolid' : ''}`}
      initial={{ y: -90, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
    >
      <nav className="navShell" aria-label="Primary navigation">
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <Logo />
          <span style={{ fontSize: '12px', opacity: 0.7, display: 'none' }}>📍 Bangalore</span>
        </div>
        <div className="navLinks">
          {navItems.map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`}>
              {item}
            </a>
          ))}
        </div>
        <div className="navActions">
          <Motion.button
            className="btn"
            onClick={handleWhatsApp}
            whileHover={{ y: -3, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            style={{ display: 'flex', gap: '8px', alignItems: 'center' }}
          >
            <MessageCircle size={18} />
            Order Now
          </Motion.button>
          <Motion.button
            className="iconButton"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((value) => !value)}
            whileTap={{ scale: 0.9 }}
          >
            {open ? <X /> : <Menu />}
          </Motion.button>
        </div>
      </nav>
      <Motion.div
        className="menuPanel"
        initial={false}
        animate={open ? 'open' : 'closed'}
        variants={{
          open: { opacity: 1, y: 0, scale: 1, pointerEvents: 'auto' },
          closed: { opacity: 0, y: -16, scale: 0.97, pointerEvents: 'none' },
        }}
        transition={{ duration: 0.24, ease: 'easeOut' }}
      >
        <div className="menuPanelHeader">
          <span>Menu</span>
          <button type="button" onClick={() => setOpen(false)} aria-label="Close menu">
            <X size={20} />
          </button>
        </div>
        <div className="menuPanelLinks">
          {navItems.map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setOpen(false)}>
              {item}
            </a>
          ))}
        </div>
        <div className="menuPanelFooter">
          <a href="tel:9790819757">
            <Phone size={18} />
            9790819757
          </a>
          <a href="#booking" onClick={() => setOpen(false)}>
            <MessageCircle size={18} />
            Order on WhatsApp
          </a>
        </div>
      </Motion.div>
    </Motion.header>
  )
}

function Hero() {
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 0.32], [0, 150])
  const scale = useTransform(scrollYProgress, [0, 0.32], [1, 1.1])

  const handleWhatsApp = () => {
    const message = 'Hi! I want dental medicines or home delivery. Please help.'
    window.open(`https://wa.me/919790819757?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer')
  }

  return (
    <section className="heroSection" id="home">
      <Motion.img src={images.hero} alt="Dental medicines delivery at home" className="heroImage" style={{ y, scale }} />
      <div className="heroOverlay" />
      <Motion.div
        className="heroContent"
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.12, delayChildren: 0.25 } } }}
      >
        <Motion.div className="trustStrip" variants={reveal}>
          <span>✓ 1000+ Happy Patients</span>
          <span>•</span>
          <span>⭐ 4.8 Rated</span>
          <span>•</span>
          <span>🚚 30-60 Min Delivery</span>
        </Motion.div>
        <Motion.h1 variants={reveal}>
          🦷 Dental Care at Home – Fast, Safe & Trusted
        </Motion.h1>
        <Motion.p variants={reveal}>
          Medicines, Dental Kits & Expert Consultation Delivered to Your Doorstep in Bangalore. No clinic visit needed.
        </Motion.p>
        <Motion.div className="heroButtons" variants={reveal}>
          <Motion.button
            className="btn"
            onClick={handleWhatsApp}
            whileHover={{ y: -3, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <MessageCircle size={20} />
            Order on WhatsApp
          </Motion.button>
          <a className="ghostLink" href="tel:9790819757">
            <Phone size={16} />
            Call Now
          </a>
        </Motion.div>
      </Motion.div>
      <Motion.div
        className="scoreCard"
        initial={{ opacity: 0, x: 70, rotate: 3 }}
        animate={{ opacity: 1, x: 0, rotate: 0 }}
        transition={{ delay: 0.8, duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
      >
        <strong>30-60 mins</strong>
        <span>Fast Delivery</span>
      </Motion.div>
      <Motion.div
        className="heroBadge"
        animate={{ y: [0, -12, 0] }}
        transition={{ repeat: Infinity, duration: 4.6, ease: 'easeInOut' }}
      >
        <Truck />
        Available 24/7
      </Motion.div>
    </section>
  )
}

function About() {
  return (
    <section className="aboutSection section" id="about">
      <Motion.div
        className="aboutImage left"
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.75 }}
      >
        <img src={images.aboutLeft} alt="Dental medicines delivered to your home" />
      </Motion.div>
      <Motion.div
        className="aboutCopy"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.35 }}
        variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
      >
        <Motion.span className="eyebrow" variants={reveal}>Why Dentia Home Delivery?</Motion.span>
        <Motion.h2 variants={reveal}>
          Your Dental Needs Delivered Fast, Prescribed by Certified Dentists
        </Motion.h2>
        <Motion.p variants={reveal}>
          Tooth pain at 2 AM? Post-treatment medicines needed? No time to visit clinic? We get it. Our service brings trusted dental solutions directly to your doorstep in Bangalore with expert guidance from licensed dentists. No hassle, no waiting.
        </Motion.p>
        <Motion.div variants={reveal}>
          <MagneticButton>Order Now on WhatsApp</MagneticButton>
        </Motion.div>
      </Motion.div>
      <Motion.div
        className="aboutImage right"
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.75, delay: 0.1 }}
      >
        <img src={images.aboutRight} alt="Fast delivery of dental medicines" />
      </Motion.div>
    </section>
  )
}

function Services() {
  return (
    <section className="servicesSection section" id="delivery">
      <Motion.div
        className="sectionHeader"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
        variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
      >
        <Motion.span className="eyebrow" variants={reveal}>What We Deliver</Motion.span>
        <Motion.h2 variants={reveal}>🦷 Complete Dental Care – Delivered to Your Door</Motion.h2>
      </Motion.div>
      <div className="serviceGrid">
        {deliveryProducts.map((product, index) => {
          const Icon = product.icon
          return (
            <Motion.article
              className="serviceCard"
              key={product.title}
              initial={{ opacity: 0, y: 46 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.55, delay: index * 0.08 }}
              whileHover={{ y: -12 }}
            >
              <span className="serviceIcon"><Icon size={58} /></span>
              <h3>{product.title}</h3>
              <p>{product.text}</p>
              <Motion.a href="#booking" className="roundLink" whileHover={{ width: 118 }}>
                <span>→</span>
                <em>Order</em>
              </Motion.a>
            </Motion.article>
          )
        })}
      </div>
    </section>
  )
}

function WhyChooseUs() {
  return (
    <section className="videoBand" id="why-us" style={{ background: 'linear-gradient(135deg, #477dd8 0%, #74d8f0 100%)', padding: '80px 40px' }}>
      <Motion.div
        className="sectionHeader"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
        variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
        style={{ textAlign: 'center', color: 'white', marginBottom: '60px' }}
      >
        <Motion.span className="eyebrow" variants={reveal} style={{ color: '#f4f8fc' }}>Why Choose Dentia?</Motion.span>
        <Motion.h2 variants={reveal} style={{ color: 'white' }}>We're Fast, Trusted & Always There When You Need Us</Motion.h2>
      </Motion.div>
      <div className="serviceGrid">
        {trustPoints.map((point, index) => {
          const Icon = point.icon
          return (
            <Motion.article
              key={point.title}
              initial={{ opacity: 0, y: 46 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.55, delay: index * 0.08 }}
              style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)', padding: '30px', borderRadius: '12px', textAlign: 'center', color: 'white' }}
            >
              <Icon size={48} style={{ margin: '0 auto 16px', color: '#f4f8fc' }} />
              <h3 style={{ color: 'white', marginBottom: '8px' }}>{point.title}</h3>
              <p style={{ color: '#f4f8fc', fontSize: '14px' }}>{point.text}</p>
            </Motion.article>
          )
        })}
      </div>
    </section>
  )
}

function WhenYouNeedUs() {
  return (
    <section className="doctorsSection section" id="dentists">
      <div className="splitHeader">
        <div>
          <span className="eyebrow">Use Cases</span>
          <h2>When You Need Us Most</h2>
        </div>
        <p>We're here for every moment when dental care matters most to you.</p>
      </div>
      <div className="doctorGrid">
        {useCases.map((useCase, index) => (
          <Motion.article
            className="doctorCard"
            key={useCase.title}
            initial={{ opacity: 0, y: 34 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ delay: index * 0.1 }}
            style={{ textAlign: 'center', padding: '30px' }}
          >
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>{useCase.emoji}</div>
            <h3>{useCase.title}</h3>
            <p>{useCase.desc}</p>
          </Motion.article>
        ))}
      </div>
    </section>
  )
}

function Testimonials() {
  const doubled = useMemo(() => [...testimonials, ...testimonials], [])
  return (
    <section className="testimonialSection" id="blog">
      <div className="marquee">
        {doubled.map((item, index) => (
          <article className="testimonialCard" key={`${item.name}-${index}`}>
            <Quote size={42} fill="currentColor" />
            <div className="stars" aria-label="5 star rating">
              {Array.from({ length: 5 }).map((_, star) => (
                <Star key={star} size={16} fill="currentColor" />
              ))}
            </div>
            <p>"{item.text}"</p>
            <h3>{item.name}</h3>
            <span>Customer</span>
          </article>
        ))}
      </div>
    </section>
  )
}

function Booking() {
  const handleWhatsAppQuick = () => {
    const message = 'Hi! I want dental medicines and home delivery. Please help with available options.'
    window.open(`https://wa.me/919790819757?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer')
  }

  return (
    <section className="bookingSection section" id="booking">
      <div className="bookingVisual">
        <img src={images.team} alt="Dental medicines ready for delivery" />
        <div className="floatingHours">
          <Truck />
          <div>
            <strong>Service Hours</strong>
            <span>Available 24/7 on WhatsApp</span>
          </div>
        </div>
      </div>
      <Motion.div
        className="bookingPanel"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.65 }}
      >
        <span className="eyebrow">Order Now</span>
        <h2>Get Dental Care at Your Doorstep</h2>
        <p style={{ marginBottom: '24px', fontSize: '15px', color: '#666' }}>
          Skip the visit. Order medicines, kits & emergency supplies directly to your home in Bangalore.
        </p>
        <div style={{ display: 'flex', gap: '12px', flexDirection: 'column' }}>
          <Motion.button
            className="btn"
            onClick={handleWhatsAppQuick}
            whileHover={{ y: -3, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            style={{ width: '100%', justifyContent: 'center' }}
          >
            <MessageCircle size={20} />
            Order on WhatsApp
          </Motion.button>
          <a 
            href="tel:9790819757" 
            className="ghostLink"
            style={{ textAlign: 'center', padding: '12px 24px', display: 'flex', justifyContent: 'center', gap: '8px' }}
          >
            <Phone size={18} />
            Call Us: 9790819757
          </a>
        </div>
        <p style={{ marginTop: '20px', fontSize: '12px', color: '#999', textAlign: 'center' }}>
          Serving Bangalore • 30-60 min delivery • Certified prescriptions
        </p>
      </Motion.div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="footer" id="contact">
      <div className="footerGrid">
        <div>
          <Logo light />
          <p>Dental medicines & care delivered to your home in Bangalore. Fast, safe, and trusted by 1000+ happy customers.</p>
          <div className="socials">
            <a href="#home" aria-label="WhatsApp">💬</a>
            <a href="#home" aria-label="Instagram">📱</a>
            <a href="#home" aria-label="Call">☎️</a>
          </div>
        </div>
        <div>
          <h3>Quick Links</h3>
          {['Home', 'What We Deliver', 'Why Us', 'Order', 'Contact'].map((item) => (
            <a key={item} href="#home">{item}</a>
          ))}
        </div>
        <div>
          <h3>Our Products</h3>
          {deliveryProducts.map((product) => (
            <a key={product.title} href="#delivery">{product.title}</a>
          ))}
        </div>
        <div>
          <h3>Service Area</h3>
          <p className="contactLine"><MapPin size={19} /> Bangalore City & Suburbs</p>
          <p className="contactLine"><Phone size={19} /> 9790819757</p>
          <p className="contactLine"><MessageCircle size={19} /> Order on WhatsApp</p>
          <p style={{ marginTop: '12px', fontSize: '12px', color: '#aaa' }}>⏱️ 30-60 min delivery • 24/7 available</p>
        </div>
      </div>
      <div className="footerBottom">
        <span>Copyright 2026 - Dentia Home Delivery</span>
        <span>Terms & Conditions</span>
        <span>Privacy Policy</span>
      </div>
    </footer>
  )
}

function ScrollTop() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 24 })

  return (
    <>
      <Motion.div className="progressBar" style={{ scaleX }} />
      <Motion.button
        className="scrollTop"
        aria-label="Scroll to top"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        whileHover={{ y: -4 }}
        whileTap={{ scale: 0.94 }}
      >
        <ArrowUp size={21} />
      </Motion.button>
    </>
  )
}

function FloatingButtons() {
  const handleWhatsApp = () => {
    const message = 'Hi! I want dental medicines or home delivery. Please help.'
    window.open(`https://wa.me/919790819757?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer')
  }

  return (
    <div style={{
      position: 'fixed',
      bottom: '30px',
      right: '30px',
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
      zIndex: 999,
    }}>
      <Motion.button
        onClick={handleWhatsApp}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        style={{
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          background: '#25D366',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 20px rgba(37, 211, 102, 0.4)',
          color: 'white',
          fontSize: '28px',
        }}
        title="Order on WhatsApp"
      >
        💬
      </Motion.button>
      <Motion.a
        href="tel:9790819757"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        style={{
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          background: '#477dd8',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 20px rgba(71, 125, 216, 0.4)',
          color: 'white',
          fontSize: '24px',
          textDecoration: 'none',
        }}
        title="Call Us"
      >
        ☎️
      </Motion.a>
    </div>
  )
}

function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Services />
        <WhyChooseUs />
        <WhenYouNeedUs />
        <Testimonials />
        <Booking />
      </main>
      <Footer />
      <ScrollTop />
      <FloatingButtons />
    </>
  )
}

export default App

