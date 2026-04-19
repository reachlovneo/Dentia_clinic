import { useEffect, useMemo, useState } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import {
  ArrowUp,
  CalendarDays,
  ChevronDown,
  Clock3,
  Mail,
  MapPin,
  MessageCircle,
  Menu,
  Phone,
  Play,
  Quote,
  ShieldCheck,
  Smile,
  SmilePlus,
  Sparkles,
  Star,
  Stethoscope,
  Video,
  WandSparkles,
  X,
} from 'lucide-react'
import './App.css'

const Motion = motion

const images = {
  hero:
    'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=2400&q=85',
  aboutLeft:
    'https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&w=1200&q=85',
  aboutRight:
    'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&w=1200&q=85',
  video:
    'https://images.unsplash.com/photo-1606265752439-1f18756aa86d?auto=format&fit=crop&w=2400&q=85',
  team:
    'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1200&q=85',
}

const navItems = ['Home', 'Services', 'Dentists', 'Pages', 'Blog', 'Contact']

const services = [
  {
    icon: Stethoscope,
    title: 'General Dentistry',
    text: 'Complete oral care for every smile with cleanings, exams, and prevention.',
  },
  {
    icon: Sparkles,
    title: 'Cosmetic Dentistry',
    text: 'Whitening, veneers, and natural restorations shaped around your face.',
  },
  {
    icon: Smile,
    title: 'Pediatric Dentistry',
    text: 'Gentle, bright visits that help children feel calm, safe, and proud.',
  },
  {
    icon: ShieldCheck,
    title: 'Restorative Dentistry',
    text: 'Repair, implants, crowns, and bite care for comfort that lasts.',
  },
]

const doctors = [
  {
    name: 'Dr. Anika Shah',
    role: 'Smile Design',
    img: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=800&q=85',
  },
  {
    name: 'Dr. Leo Martin',
    role: 'Implant Care',
    img: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=800&q=85',
  },
  {
    name: 'Dr. Mira Chen',
    role: 'Family Dentistry',
    img: 'https://images.unsplash.com/photo-1651008376811-b90baee60c1f?auto=format&fit=crop&w=800&q=85',
  },
]

const testimonials = [
  {
    name: 'Edward B.',
    text: 'I never felt more comfortable at a dental office. The team explained everything clearly and I left smiling.',
  },
  {
    name: 'Michael S.',
    text: 'Beautiful clinic, calm staff, and the treatment plan felt completely personal to me.',
  },
  {
    name: 'Robert L.',
    text: 'My family has been coming here for years. The care is consistent, warm, and excellent.',
  },
  {
    name: 'Jasmine K.',
    text: 'The appointment was smooth from check-in to follow-up. I finally enjoy visiting the dentist.',
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

  return (
    <Motion.header
      className={`siteHeader ${solid ? 'isSolid' : ''}`}
      initial={{ y: -90, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
    >
      <nav className="navShell" aria-label="Primary navigation">
        <Logo />
        <div className="navLinks">
          {navItems.map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`}>
              {item}
              {['Home', 'Services', 'Pages'].includes(item) && <ChevronDown size={14} />}
            </a>
          ))}
        </div>
        <div className="navActions">
          <MagneticButton className="navCta">
            <CalendarDays size={19} />
            Book Appointment
          </MagneticButton>
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
          <span>Quick Menu</span>
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
            <CalendarDays size={18} />
            Book a visit
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

  return (
    <section className="heroSection" id="home">
      <Motion.img src={images.hero} alt="A calm dental treatment room" className="heroImage" style={{ y, scale }} />
      <div className="heroOverlay" />
      <Motion.div
        className="heroContent"
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.12, delayChildren: 0.25 } } }}
      >
        <Motion.div className="trustStrip" variants={reveal}>
          <div className="avatarStack">
            {doctors.map((doctor) => (
              <img key={doctor.name} src={doctor.img} alt="" />
            ))}
          </div>
          <span>Trusted by 23k happy patients</span>
        </Motion.div>
        <Motion.h1 variants={reveal}>Unforgettable Dental Care With Expert Precision</Motion.h1>
        <Motion.p variants={reveal}>
          Modern family dentistry with gentle doctors, transparent treatment plans, and a clinic experience designed to feel calm from the first hello.
        </Motion.p>
        <Motion.div className="heroButtons" variants={reveal}>
          <MagneticButton>
            <CalendarDays size={20} />
            Book Appointment
          </MagneticButton>
          <a className="ghostLink" href="#video">
            <span><Play size={16} fill="currentColor" /></span>
            Watch Story
          </a>
        </Motion.div>
      </Motion.div>
      <Motion.div
        className="scoreCard"
        initial={{ opacity: 0, x: 70, rotate: 3 }}
        animate={{ opacity: 1, x: 0, rotate: 0 }}
        transition={{ delay: 0.8, duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
      >
        <strong>98%</strong>
        <span>Trusted Score</span>
      </Motion.div>
      <Motion.div
        className="heroBadge"
        animate={{ y: [0, -12, 0] }}
        transition={{ repeat: Infinity, duration: 4.6, ease: 'easeInOut' }}
      >
        <ShieldCheck />
        Same-day emergency care
      </Motion.div>
    </section>
  )
}

function About() {
  return (
    <section className="aboutSection section" id="pages">
      <Motion.div
        className="aboutImage left"
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.75 }}
      >
        <img src={images.aboutLeft} alt="Dentist checking a patient's smile" />
      </Motion.div>
      <Motion.div
        className="aboutCopy"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.35 }}
        variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
      >
        <Motion.span className="eyebrow" variants={reveal}>About Us</Motion.span>
        <Motion.h2 variants={reveal}>Dedicated Professionals Delivering Personalized Dental Excellence With Gentle Care</Motion.h2>
        <Motion.p variants={reveal}>
          Every visit is planned around comfort, clarity, and long-term oral health. We combine digital diagnostics with a warm chairside approach so treatment feels confident, not clinical.
        </Motion.p>
        <Motion.div variants={reveal}>
          <MagneticButton>Book Appointment</MagneticButton>
        </Motion.div>
      </Motion.div>
      <Motion.div
        className="aboutImage right"
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.75, delay: 0.1 }}
      >
        <img src={images.aboutRight} alt="Patient smiling after treatment" />
      </Motion.div>
    </section>
  )
}

function Services() {
  return (
    <section className="servicesSection section" id="services">
      <Motion.div
        className="sectionHeader"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
        variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
      >
        <Motion.span className="eyebrow" variants={reveal}>Our Services</Motion.span>
        <Motion.h2 variants={reveal}>Personalized dental solutions for patients of all ages</Motion.h2>
      </Motion.div>
      <div className="serviceGrid">
        {services.map((service, index) => {
          const Icon = service.icon
          return (
            <Motion.article
              className="serviceCard"
              key={service.title}
              initial={{ opacity: 0, y: 46 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.55, delay: index * 0.08 }}
              whileHover={{ y: -12 }}
            >
              <span className="serviceIcon"><Icon size={58} /></span>
              <h3>{service.title}</h3>
              <p>{service.text}</p>
              <Motion.a href="#booking" className="roundLink" whileHover={{ width: 118 }}>
                <span>+</span>
                <em>Read</em>
              </Motion.a>
            </Motion.article>
          )
        })}
      </div>
    </section>
  )
}

function VideoBand() {
  return (
    <section className="videoBand" id="video">
      <img src={images.video} alt="Dentist examining a patient" />
      <div className="videoShade" />
      <Motion.button
        className="playButton"
        aria-label="Play clinic story"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
      >
        <Play fill="currentColor" size={38} />
      </Motion.button>
    </section>
  )
}

function Doctors() {
  return (
    <section className="doctorsSection section" id="dentists">
      <div className="splitHeader">
        <div>
          <span className="eyebrow">Dentists</span>
          <h2>Meet the team behind the calmest appointments in town</h2>
        </div>
        <p>Specialists in prevention, smile design, orthodontics, implants, and family care work together under one roof.</p>
      </div>
      <div className="doctorGrid">
        {doctors.map((doctor, index) => (
          <Motion.article
            className="doctorCard"
            key={doctor.name}
            initial={{ opacity: 0, y: 34 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ delay: index * 0.1 }}
          >
            <img src={doctor.img} alt={doctor.name} />
            <div>
              <h3>{doctor.name}</h3>
              <p>{doctor.role}</p>
            </div>
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
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: '',
    date: '',
  })

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((current) => ({ ...current, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const message = [
      'Hello Dentia, I want to book an appointment.',
      `Name: ${formData.name || 'Not provided'}`,
      `Phone: ${formData.phone || 'Not provided'}`,
      `Service: ${formData.service || 'Not selected'}`,
      `Preferred Date: ${formData.date || 'Not selected'}`,
    ].join('\n')

    window.open(`https://wa.me/919790819757?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer')
  }

  return (
    <section className="bookingSection section" id="booking">
      <div className="bookingVisual">
        <img src={images.team} alt="Dental team preparing treatment" />
        <div className="floatingHours">
          <Clock3 />
          <div>
            <strong>Open Today</strong>
            <span>9:00 AM - 7:30 PM</span>
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
        <span className="eyebrow">Book A Visit</span>
        <h2>Start with a gentle consultation</h2>
        <form onSubmit={handleSubmit}>
          <label>
            <span>Name</span>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your name"
            />
          </label>
          <label>
            <span>Phone</span>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="9790819757"
            />
          </label>
          <label>
            <span>Service</span>
            <select name="service" value={formData.service} onChange={handleChange}>
              <option value="" disabled>Choose service</option>
              <option>General Dentistry</option>
              <option>Cosmetic Dentistry</option>
              <option>Dental Implants</option>
              <option>Pediatric Care</option>
            </select>
          </label>
          <label>
            <span>Preferred Date</span>
            <input type="date" name="date" value={formData.date} onChange={handleChange} />
          </label>
          <button type="submit" className="btn formButton">
            <MessageCircle size={19} />
            Send To WhatsApp
          </button>
        </form>
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
          <p>High-quality, personalized dental care for families who want healthy smiles for life.</p>
          <div className="socials">
            <a href="#home" aria-label="Facebook">f</a>
            <a href="#home" aria-label="Instagram"><WandSparkles size={20} /></a>
            <a href="#home" aria-label="Youtube"><Video size={20} /></a>
          </div>
        </div>
        <div>
          <h3>Company</h3>
          {['Home', 'Our Services', 'Gallery', 'About Us', 'Blog', 'Contact'].map((item) => (
            <a key={item} href="#home">{item}</a>
          ))}
        </div>
        <div>
          <h3>Our Services</h3>
          {services.map((service) => (
            <a key={service.title} href="#services">{service.title}</a>
          ))}
        </div>
        <div>
          <h3>Contact Us</h3>
          <p className="contactLine"><MapPin size={19} /> 100 S Main St, New York, NY</p>
          <p className="contactLine"><Phone size={19} /> 9790819757</p>
          <p className="contactLine"><Mail size={19} /> contact@dentiacare.com</p>
        </div>
      </div>
      <div className="footerBottom">
        <span>Copyright 2026 - dentia clinic</span>
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

function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Services />
        <VideoBand />
        <Doctors />
        <Testimonials />
        <Booking />
      </main>
      <Footer />
      <ScrollTop />
    </>
  )
}

export default App

