import { useEffect } from "react";
import { FaDiscord, FaTwitter, FaYoutube, FaInstagram } from "react-icons/fa";

const socialLinks = [
  { name: "Discord", href: "https://discord.com", icon: <FaDiscord /> },
  { name: "Twitter", href: "https://x.com/dhyan52166984?s=11", icon: <FaTwitter /> },
  { name: "YouTube", href: "http://www.youtube.com/@enzolit567", icon: <FaYoutube /> },
  {
    name: "Instagram",
    href: "https://www.instagram.com/_dh_yan?stkn=ajN2MGhid3Q5czRq&utm_source=qr",
    icon: <FaInstagram />,
  },
];

const ContactPopup = ({ isOpen, onClose }) => {
  // Close on Escape + lock background scroll while open
  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 px-6 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md rounded-lg border border-blue-50/20 bg-black px-8 py-12 text-center text-blue-50"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 flex size-8 items-center justify-center rounded-full border border-blue-50/20 text-lg transition hover:bg-blue-50 hover:text-black"
        >
          ✕
        </button>

        <p className="mb-4 font-general text-[10px] uppercase">Join League of Legends</p>

        <h3 className="special-font mb-8 font-zentry text-4xl font-black uppercase leading-[.9]">
          f<b>i</b>nd us <br /> on s<b>o</b>cials
        </h3>

        <div className="flex items-center justify-center gap-5">
          {socialLinks.map(({ name, href, icon }) => (
            <a
              key={name}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={name}
              title={name}
              className="flex size-14 items-center justify-center rounded-full border border-blue-50/20 text-2xl transition duration-300 hover:-translate-y-1 hover:bg-blue-50 hover:text-black"
            >
              {icon}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContactPopup;