import { Link } from 'react-router-dom';
import { Facebook, Instagram, Linkedin } from 'lucide-react';
import { useSiteSettings } from '../../lib/useSiteSettings';

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

const Footer = () => {
  const settings = useSiteSettings();

  const socials = [
    { label: 'Facebook', Icon: Facebook, href: settings.facebook_url },
    { label: 'Instagram', Icon: Instagram, href: settings.instagram_url },
    { label: 'LinkedIn', Icon: Linkedin, href: settings.linkedin_url },
  ].filter((s) => s.href);

  return (
    <footer className="bg-[#0a1128] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        {/* Tagline + wordmark */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 pb-10 border-b border-white/10">
          <Link to="/" aria-label="Coppola Home">
            <h2 className="font-normal text-2xl sm:text-3xl tracking-tight text-white">
              Coppola Home
            </h2>
          </Link>
          <p className="text-caption text-white/50" style={poppins}>
            Crafted millwork, designed around the way you live.
          </p>
        </div>

        {/* Explore + showroom */}
        <div className="mt-10 lg:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12">
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
                {settings.address_line1}
                <br />
                {settings.address_line2}
              </p>
              <a href={`tel:${settings.phone.replace(/[^+\d]/g, '')}`} className={linkClass} style={poppins}>
                {settings.phone}
              </a>
              <a
                href={`mailto:${settings.email}`}
                className={`${linkClass} break-all`}
                style={poppins}
              >
                {settings.email}
              </a>
            </address>
          </div>

          <div>
            <SectionLabel>showroom hours</SectionLabel>
            <dl className="space-y-3 max-w-xs">
              {settings.hours.map(({ days, time }) => (
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
            {settings.hours_note && (
              <p className="mt-4 text-caption text-white/40 italic" style={poppins}>
                {settings.hours_note}
              </p>
            )}
          </div>
        </div>

        {/* Copyright + socials */}
        <div className="mt-12 lg:mt-14 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-6">
          <p className="text-caption text-white/50" style={poppins}>
            Copyright &amp; design by @CoppolaHome &mdash;{' '}
            {new Date().getFullYear()}
          </p>

          {socials.length > 0 && (
            <div className="flex items-center gap-3">
              {socials.map(({ label, Icon, href }) => (
                <a
                  key={label}
                  href={href!}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded flex items-center justify-center bg-white/10 hover:bg-white/20 transition-all duration-300 hover:scale-105"
                >
                  <Icon className="w-4 h-4 text-white" />
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
