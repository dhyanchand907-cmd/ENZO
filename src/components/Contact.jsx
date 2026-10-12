import { useState } from "react";
import AnimatedTitle from "./AnimatedTitle";
import Button from "./Button";
import ContactPopup from "./ContactPopup";

const ImageClipBox = ({ src, clipClass }) => (
  <div className={clipClass}>
    <img src={src} />
  </div>
);

const Contact = () => {
  const [open, setOpen] = useState(false);

  return (
    <div id="contact" className="w-screen px-10 my-20 min-h-96">
      <div className="relative py-24 bg-black rounded-lg text-blue-50 sm:overflow-hidden">
        {/* ...image blocks unchanged... */}

        <div className="flex flex-col items-center text-center">
          <p className="mb-10 font-general text-[10px] uppercase">
            Join League of Legends
          </p>

          <AnimatedTitle
            title="let&#39;s b<b>u</b>ild the <br /> new era of <br /> g<b>a</b>ming t<b>o</b>gether."
            className="special-font !md:text-[6.2rem] w-full font-zentry !text-5xl !font-black !leading-[.9]"
          />

          <Button
            title="contact us"
            containerClass="mt-10 cursor-pointer"
            onClick={() => setOpen(true)}
          />
        </div>
      </div>

      <ContactPopup isOpen={open} onClose={() => setOpen(false)} />
    </div>
  );
};

export default Contact;