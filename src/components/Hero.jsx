
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";
import VideoPreview from "./VideoPreview";

gsap.registerPlugin(ScrollTrigger);

const TOTAL_VIDEOS = 4;

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [hasClicked, setHasClicked] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadedVideos, setLoadedVideos] = useState(0);

  const nextVdRef = useRef(null);
  const currentVdRef = useRef(null);

  const getVideoSrc = (index) => `/videos/hero-${index}.mp4`;

  const handleVideoLoad = (event) => {
    if (event.currentTarget.dataset.counted === "true") return;

    event.currentTarget.dataset.counted = "true";
    setLoadedVideos((prev) => prev + 1);
  };

  useEffect(() => {
    if (loadedVideos >= 3) {
      setLoading(false);
    }
  }, [loadedVideos]);

  const handleMiniVdClick = () => {
    setHasClicked(true);
    setCurrentIndex((prev) => (prev % TOTAL_VIDEOS) + 1);
  };

  useGSAP(
    () => {
      if (!hasClicked) return;

      const nextVideo = nextVdRef.current;
      const currentVideo = currentVdRef.current;

      if (!nextVideo || !currentVideo) return;

      gsap.set("#next-video", { visibility: "visible" });

      gsap.to("#next-video", {
        transformOrigin: "center center",
        scale: 1,
        width: "100%",
        height: "100%",
        duration: 1,
        ease: "power1.inOut",
        onStart: () => {
          nextVideo.play().catch(() => {});
        },
      });

      gsap.from("#current-video", {
        transformOrigin: "center center",
        scale: 0,
        duration: 1.5,
        ease: "power1.inOut",
      });
    },
    {
      dependencies: [currentIndex, hasClicked],
      revertOnUpdate: true,
    }
  );

  useGSAP(() => {
    gsap.fromTo(
      "#video-frame",
      {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        borderRadius: "0%",
      },
      {
        clipPath: "polygon(14% 0, 72% 0, 88% 90%, 0 95%)",
        borderRadius: "0% 0% 40% 10%",
        ease: "none",
        scrollTrigger: {
          trigger: "#video-frame",
          start: "top top",
          end: "+=500",
          scrub: 1,
        },
      }
    );
  });

  return (
    <section className="relative h-dvh w-screen overflow-x-hidden">
      {loading && (
        <div className="flex-center absolute inset-0 z-[100] h-dvh w-screen bg-violet-50">
          <div className="three-body">
            <div className="three-body__dot" />
            <div className="three-body__dot" />
            <div className="three-body__dot" />
          </div>
        </div>
      )}

      <div
        id="video-frame"
        className="relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-blue-75"
      >
        <div className="absolute inset-0">
          <video
            ref={currentVdRef}
            src={getVideoSrc(currentIndex)}
            autoPlay
            muted
            playsInline
            loop
            preload="auto"
            onLoadedData={handleVideoLoad}
            onError={() => console.error("Failed to load:", getVideoSrc(currentIndex))}
            className="absolute inset-0 size-full object-cover object-center"
          />

          <video
            ref={nextVdRef}
            src={getVideoSrc((currentIndex % TOTAL_VIDEOS) + 1)}
            muted
            playsInline
            loop
            preload="auto"
            onLoadedData={handleVideoLoad}
            onError={() => console.error("Failed to load next video")}
            id="next-video"
            className="absolute-center invisible z-20 size-64 object-cover object-center"
          />

          <div className="absolute-center z-50 size-64 cursor-pointer overflow-hidden rounded-lg">
            <VideoPreview>
              <div
                onClick={handleMiniVdClick}
                className="origin-center scale-50 opacity-0 transition-all duration-500 ease-in hover:scale-100 hover:opacity-100"
              >
                <video
                  src={getVideoSrc((currentIndex % TOTAL_VIDEOS) + 1)}
                  muted
                  playsInline
                  loop
                  autoPlay
                  preload="auto"
                  onLoadedData={handleVideoLoad}
                  className="size-64 scale-150 object-cover object-center"
                />
              </div>
            </VideoPreview>
          </div>
        </div>

        <div className="absolute inset-0 z-40">
          <div className="mt-24 px-5 sm:px-10">
            <h1 className="hero-heading special-font text-blue-100">
              <b>E</b>nzo
            </h1>

            <p className="mb-5 max-w-64 font-robert-regular text-blue-100">
              “No one can give you your freedom. You have to take it with your
              own hands.”
              <br />– Thors.
            </p>
          </div>
        </div>
      </div>

      <h1 className="hero-heading special-font absolute bottom-5 right-5 text-black">
        <b>W</b>in
      </h1>
    </section>
  );
};

export default Hero;
