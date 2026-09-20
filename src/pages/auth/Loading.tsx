import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FoldText from "../../components/ui/FoldText";

function Loading() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/login");
    }, 1800);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center px-6 relative overflow-hidden select-none">
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-blue-600/10 blur-[120px] pointer-events-none" />

      {/* Minimal Container */}
      <div className="relative z-10 text-center flex flex-col items-center justify-center">
        {/* Sleek Minimal Brand Icon */}


        {/* Unfolding Brand Text using React Bits FoldText */}
        <FoldText
          text="InternTrack"
          splitBy="char"
          hinge="top"
          trigger="mount"
          duration={0.75}
          stagger={0.04}
          ease="power3.out"
          fontSize="clamp(2.5rem, 6vw, 4.2rem)"
          fontWeight={800}
          color="#ffffff"
        />

        {/* Minimal Subtitle */}
        <p className="mt-3 text-xs font-semibold tracking-widest text-slate-400 uppercase">
          Internship Activity Monitoring System
        </p>

        {/* Minimal Progress Line Accent */}
        <div className="mt-10 h-0.5 w-36 rounded-full bg-slate-800/80 overflow-hidden relative">
          <div className="absolute inset-y-0 left-0 w-full bg-gradient-to-r from-blue-600 to-indigo-500 rounded-full animate-[pulse_1.5s_ease-in-out_infinite]" />
        </div>

        <p className="mt-4 text-[11px] font-medium text-slate-400 tracking-wide">
          Initializing Workspace...
        </p>
      </div>
    </div>
  );
}

export default Loading;
