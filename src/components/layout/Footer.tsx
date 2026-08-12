import { Link } from 'react-router-dom';
import { Facebook, Instagram, Linkedin } from 'lucide-react';

const poppins = { fontFamily: 'Poppins, sans-serif' };

const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <div className="flex items-center gap-2 mb-6">
    <span className="w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
    <span className="text-caption text-white/50 tracking-wide" style={poppins}>
      {children}
    </span>
  </div>
);

const linkClass =
  'text-caption text-white/70 hover:text-white transition-colors duration-300 block';

const explore = [
  { name: 'About Us', url: '/about-us' },
  { name: 'Our Expertise', url: '/our-expertise' },
  { name: 'Our Works', url: '/our-works' },
  { name: 'Contact Us', url: '/contact' }
];

const hours = [
  { days: 'Mon – Fri', time: '9:00 AM – 5:00 PM' },
  { days: 'Saturday', time: '9:30 AM – 2:00 PM' },
  { days: 'Sunday', time: 'Closed' }
];

const socials = [
  { label: 'Facebook', Icon: Facebook },
  { label: 'Instagram', Icon: Instagram },
  { label: 'LinkedIn', Icon: Linkedin }
];

const Footer = () => {
  return (
    <footer className="relative overflow-hidden bg-black text-white">
      {/* Intense Blue Glow Layer with white center from bottom */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_100%,rgba(255,255,255,0.8)_0%,rgba(59,130,246,0.9)_25%,rgba(37,99,235,0.6)_50%,transparent_70%),radial-gradient(ellipse_at_80%_100%,rgba(255,255,255,0.8)_0%,rgba(59,130,246,0.9)_25%,rgba(37,99,235,0.6)_50%,transparent_70%)] blur-2xl"></div>

      {/* Dark Overlay to control intensity */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/80 to-transparent"></div>

      {/* Main Footer Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        {/* Tagline + oversized wordmark */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          <p
            className="lg:col-span-5 text-body-lg leading-snug max-w-sm"
            style={poppins}
          >
            <span className="text-white">Crafted millwork</span>{' '}
            <span className="text-white/40">designed around the way you live</span>
          </p>

          <div className="lg:col-span-7 flex lg:justify-end">
            <Link to="/" aria-label="Coppola Home" className="group">
              {/* A heading tag, not a span: index.css forces every span to
                  Poppins with !important, and headings are the exemption. */}
              <h2 className="font-normal block text-[clamp(3rem,9vw,7.5rem)] leading-[0.85] tracking-[-0.02em] text-white/95 group-hover:text-white transition-colors duration-300 lg:text-right">
                Coppola Home
              </h2>
            </Link>
          </div>
        </div>

        {/* Newsletter + legal */}
        <div className="mt-14 lg:mt-20 grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-5">
            <SectionLabel>Business email.</SectionLabel>
            <form
              className="flex items-center gap-2 p-1.5 rounded-md bg-white/[0.07] border border-white/15 focus-within:border-white/35 transition-colors duration-300 max-w-md"
              onSubmit={(e) => e.preventDefault()}
            >
              <label htmlFor="footer-email" className="sr-only">
                Email address
              </label>
              <input
                id="footer-email"
                type="email"
                placeholder="Email address"
                className="flex-1 bg-transparent text-caption text-white placeholder:text-white/40 px-3 py-2 outline-none"
                style={poppins}
              />
              <button
                type="submit"
                className="text-caption px-5 py-2 rounded bg-white text-black hover:bg-white/85 transition-colors duration-300 whitespace-nowrap"
                style={poppins}
              >
                Subscribe
              </button>
            </form>
          </div>

          <div className="lg:col-span-7 flex lg:justify-end">
            <div className="space-y-3 lg:text-right">
              <a href="#privacy" className={linkClass} style={poppins}>
                Privacy Policy
              </a>
              <a href="#terms" className={linkClass} style={poppins}>
                Terms &amp; Conditions
              </a>
              <a href="#cookies" className={linkClass} style={poppins}>
                Cookie Policy
              </a>
            </div>
          </div>
        </div>

        {/* Explore + showroom */}
        <div className="mt-16 lg:mt-24 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12">
          <div>
            <SectionLabel>explore</SectionLabel>
            <ul className="space-y-3">
              {explore.map((item) => (
                <li key={item.name}>
                  <Link to={item.url} className={linkClass} style={poppins}>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <SectionLabel>Coppola Home Thunder Bay</SectionLabel>
            <address className="not-italic space-y-3">
              <p className="text-caption text-white/70 leading-relaxed" style={poppins}>
                269 Red River Rd, Suite 116 #1040
                <br />
                Thunder Bay ON, P7B 1A9, Canada
              </p>
              <a href="tel:+18073459989" className={linkClass} style={poppins}>
                +1 (807) 345 9989
              </a>
              <a
                href="mailto:info@coppolacontracting.net"
                className={`${linkClass} break-all`}
                style={poppins}
              >
                info@coppolacontracting.net
              </a>
            </address>
          </div>

          <div>
            <SectionLabel>showroom hours</SectionLabel>
            <dl className="space-y-3 max-w-xs">
              {hours.map(({ days, time }) => (
                <div
                  key={days}
                  className="flex items-baseline justify-between gap-4 border-b border-white/10 pb-2"
                >
                  <dt className="text-caption text-white/70" style={poppins}>
                    {days}
                  </dt>
                  <dd className="text-caption text-white/90" style={poppins}>
                    {time}
                  </dd>
                </div>
              ))}
            </dl>
            <p className="mt-4 text-caption text-white/40 italic" style={poppins}>
              *Closed on statutory holidays
            </p>
          </div>
        </div>

        {/* Copyright + socials */}
        <div className="mt-16 lg:mt-20 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-6">
          <p className="text-caption text-white/50" style={poppins}>
            Copyright &amp; design by @CoppolaHome &mdash;{' '}
            {new Date().getFullYear()}
          </p>

          <div className="flex items-center gap-3">
            {socials.map(({ label, Icon }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="w-9 h-9 rounded flex items-center justify-center bg-white/10 hover:bg-white/20 transition-all duration-300 hover:scale-105"
              >
                <Icon className="w-4 h-4 text-white" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
