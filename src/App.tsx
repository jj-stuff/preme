import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './App.css';
import catImage from './assets/cat.png'; // Make sure you add cat.png to your src/assets folder!

// Type definition for the anime object from the script
declare const anime: any;

const MESSAGE_PARAGRAPHS = ["We haven't spent much time together yet, but I miss you more than I expected. This is my embarrassing love letter in return to yours.", "You've become my favorite thought, I catch myself thinking of you all the time. When I pass a store, I wonder if there's something in there you'd like. When I eat, I would wonder whether you'd love or hate the taste. And with each day I'll only love you more. I cannot wait to see you again.", "I have to admit, I'm quite romantic. jk haha... maybe not", 'Love you.❤️'];

// --- Love Letter Component ---
const LoveLetter = ({ onButtonClick }) => (
  <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.3 } }} className="flex-col gap-8 flex items-center justify-center">
    <div className="title">
      <h1 className="love-letter-title">Rak Preme</h1>
    </div>
    <div className="px-4 sm:px-8 md:px-16 lg:px-24">
      <div className="love-letter bg-amber-50">
        {MESSAGE_PARAGRAPHS.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
    </div>
    <div className="flex-row gap-4 flex">
      <button className="love-letter-button" onClick={onButtonClick}>
        <a>I will wait.</a>
      </button>
      <button className="love-letter-button" onClick={onButtonClick}>
        <a>I can wait.</a>
      </button>
    </div>
  </motion.div>
);

// --- Countdown Component ---
const CountdownTimer = () => {
  const calculateTimeLeft = () => {
    const difference = +new Date('2025-12-20T00:00:00-05:00') - +new Date();
    let timeLeft = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearTimeout(timer);
  });

  return (
    <div className="countdown-timer">
      <h2>Until We Meet, December 20th</h2>
      <div className="timer">
        {Object.entries(timeLeft).map(([unit, value]) => (
          <div key={unit} className="timer-box">
            <span>{String(value).padStart(2, '0')}</span>
            <span>{unit.charAt(0).toUpperCase() + unit.slice(1)}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- Time Since Component ---
type TimeFormat = 'days' | 'hours' | 'minutes' | 'seconds';

const TimeSince = () => {
  const startDate = useMemo(() => new Date('2025-08-11T00:00:00-04:00'), []);
  const [now, setNow] = useState(new Date());
  const [format, setFormat] = useState<TimeFormat>('days');

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const timeDiff = now.getTime() - startDate.getTime();

  const timeValues = {
    seconds: Math.floor(timeDiff / 1000),
    minutes: Math.floor(timeDiff / (1000 * 60)),
    hours: Math.floor(timeDiff / (1000 * 60 * 60)),
    days: Math.floor(timeDiff / (1000 * 60 * 60 * 24)),
  };

  const displayValue = timeValues[format].toLocaleString();

  return (
    <div className="time-since mt-8">
      <h2>Time Since --</h2>
      <div className="timer-display">
        <div className="timer-box" style={{ minWidth: '200px' }}>
          <span>{displayValue}</span>
          <span>{format.charAt(0).toUpperCase() + format.slice(1)}</span>
        </div>
      </div>
      <div className="time-format-buttons">
        {(Object.keys(timeValues) as TimeFormat[]).map((f) => (
          <button key={f} onClick={() => setFormat(f)} className={format === f ? 'active' : ''}>
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
};

// --- Countdown Page Component ---
const CountdownPage = () => (
  <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="countdown-container">
    <CountdownTimer />
    <TimeSince />
  </motion.div>
);

// --- Main App Component ---
function App() {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showCountdown, setShowCountdown] = useState(false);

  const handleTransition = () => {
    // ✨ CONTROL PANEL APPEARANCE HERE (in milliseconds) ✨
    const PANEL_APPEAR_DELAY = 500; // Panel will now appear after 2 seconds.

    setIsTransitioning(true);

    // --- Start the timer to show the panel ---
    // This is now independent of the animation's duration or delay.
    setTimeout(() => {
      setShowCountdown(true);
    }, PANEL_APPEAR_DELAY);

    const numParticles = 40;
    const particles: HTMLImageElement[] = [];
    const root = document.getElementById('root');

    if (!root) return;

    for (let i = 0; i < numParticles; i++) {
      const particle = document.createElement('img');
      particle.src = catImage;
      particle.className = 'cat-particle';

      particle.style.left = '50%';
      particle.style.top = '50%';
      particle.style.transform = 'translate(-50%, -50%)';

      root.appendChild(particle);
      particles.push(particle);
    }

    const radius = window.innerWidth / 1.5;

    // --- Start the cat animation ---
    anime({
      targets: particles,
      translateX: (el, i) => {
        const angle = (360 / numParticles) * i;
        const angleInRad = angle * (Math.PI / 180);
        return radius * Math.cos(angleInRad);
      },
      translateY: (el, i) => {
        const angle = (360 / numParticles) * i;
        const angleInRad = angle * (Math.PI / 180);
        return radius * Math.sin(angleInRad);
      },
      scale: [0.5, 1.5],
      opacity: [1, 0],
      duration: 3500,
      easing: 'easeOutExpo',
      delay: () => Math.random() * 500,
      // The `complete` callback now ONLY cleans up the particles.
      complete: () => {
        particles.forEach((p) => p.remove());
      },
    });
  };

  return (
    <>
      <AnimatePresence>{!isTransitioning && <LoveLetter onButtonClick={handleTransition} />}</AnimatePresence>

      <AnimatePresence>{showCountdown && <CountdownPage />}</AnimatePresence>
    </>
  );
}

export default App;
