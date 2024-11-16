import React, { useState, useEffect } from "react";
import Image from "next/image";

const TextToSpeech = ({ text }) => {
  const [isPaused, setIsPaused] = useState(false);
  const [isPlay, setIsPlay] = useState(false);
  const [utterance, setUtterance] = useState(null);


  useEffect(() => {
    const synth = window.speechSynthesis;
    const u = new SpeechSynthesisUtterance(text);

    setUtterance(u);

    return () => {
      synth.cancel();
    };
  }, [text]);

  const handlePlay = () => {
    const synth = window.speechSynthesis;
    setIsPlay(true)
    if (isPaused) {
      synth.resume();
    }

    synth.speak(utterance);

    setIsPaused(false);
  };

  const handlePause = () => {
    const synth = window.speechSynthesis;

    synth.pause();

    setIsPaused(true);
  };

  const handleStop = () => {
    const synth = window.speechSynthesis;
    synth.cancel();
    setIsPaused(false);
    setIsPlay(false);
  };

  return (
    <div>
      <div className='flex gap-2 mt-3'>
        <div className='xl:col-span-2 lg:col-span-2 col-span-12'>
          <button
            onClick={handlePlay}
            className="flex 3xl:text-[0.733vw] 2xl:text-[15px] text-[14px] text-[#1B55AF] font-light border border-[#1B55AF] rounded-lg xl:px-[0.700vw] px-[16px]
             xl:py-[0.400vw] py-[10px] justify-between items-center gap-1"
          >  <Image width="20" height="20" className='' src="/images/play.svg" alt="Multi-Step Assignment" /> {isPaused && isPlay ? "Resume" : "Play"}
          </button>
        </div>
        <div className='xl:col-span-2 lg:col-span-2 col-span-12'>
          <button
            onClick={handlePause}
            className="flex 3xl:text-[0.733vw] 2xl:text-[15px] text-[14px] text-[#1B55AF] font-light border border-[#1B55AF] rounded-lg xl:px-[0.700vw] px-[16px]
             xl:py-[0.400vw] py-[10px] justify-between items-center gap-1"
          >  <Image width="20" height="20" className='' src="/images/pause.svg" alt="Multi-Step Assignment" /> Pause
          </button>
        </div>
        <div className='xl:col-span-2 lg:col-span-2 col-span-12'>
          <button
            onClick={handleStop}
            className="flex 3xl:text-[0.733vw] 2xl:text-[15px] text-[14px] text-[#1B55AF] font-light border border-[#1B55AF] rounded-lg xl:px-[0.700vw] px-[16px]
             xl:py-[0.400vw] py-[10px] justify-between items-center gap-1"
          >  <Image width="20" height="20" className='' src="/images/stop.svg" alt="Multi-Step Assignment" /> Stop
          </button>
        </div>
      </div>
    </div>
  );
};

export default TextToSpeech;