import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { socialLinks } from '@/config/social';
import { trackContactClick, trackSocialClick } from '@/utils/googleAnalytics';

const Footer = () => {
  const handleSocialClick = (platform: string, url: string) => {
    trackSocialClick(platform, url);

    // Also track email as a contact method
    if (platform === 'Email') {
      trackContactClick('email');
    }
  };

  return (
    <footer className="border-t border-gray-300 py-6">
      <div className="flex items-center justify-between space-x-6">
        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
          © {new Date().getFullYear()} Luke&nbsp;Mino-Altherr.
        </div>
        <div className="flex justify-center space-x-3">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
              aria-label={link.label}
              onClick={() => handleSocialClick(link.label, link.href)}
            >
              <FontAwesomeIcon icon={link.icon} size="lg" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
