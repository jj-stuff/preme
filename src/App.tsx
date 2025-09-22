import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './App.css';
import catImage from './assets/cat.png';

// External anime.js library declaration
declare const anime: any;

// Constants
const MESSAGE_PARAGRAPHS = ["We haven't spent much time together yet, but I miss you more than I expected. This is my embarrassing love letter in return to yours.", "You've become my favorite thought, I catch myself thinking of you all the time. When I pass a store, I wonder if there's something in there you'd like. When I eat, I would wonder whether you'd love or hate the taste. And with each day I'll only love you more. I cannot wait to see you again.", "I have to admit, I'm quite romantic. jk haha... maybe not", 'Love you.❤️'];

const MEET_DATE = '2025-12-20T00:00:00-05:00';
const START_DATE = '2025-08-11T00:00:00-04:00';
const ANIMATION_DURATION = 3500;
const PANEL_APPEAR_DELAY = 500;
const PARTICLE_COUNT = 40;

// Types
type TimeFormat = 'days' | 'hours' | 'minutes' | 'seconds';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface LoveLetterProps {
  onButtonClick: () => void;
}

/**
 * Love Letter Component - Initial view with romantic message
 */
const LoveLetter: React.FC<LoveLetterProps> = ({ onButtonClick }) => (
  <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.3 } }} className="love-letter-wrapper">
    {/* Title */}
    <div className="title">
      <h1 className="love-letter-title">Rak Preme</h1>
    </div>

    {/* Letter Content */}
    <div className="love-letter-container">
      <div className="love-letter bg-amber-50 mb-2">
        {MESSAGE_PARAGRAPHS.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
    </div>

    {/* Action Buttons */}
    <div className="button-container">
      <button className="love-letter-button" onClick={onButtonClick}>
        Preme Rak Jdai
      </button>
      <button className="love-letter-button" onClick={onButtonClick}>
        Preme Love Jdai
      </button>
    </div>
  </motion.div>
);

/**
 * Countdown Timer Component - Shows time until meeting date
 */
const CountdownTimer: React.FC = () => {
  const calculateTimeLeft = (): TimeLeft => {
    const difference = +new Date(MEET_DATE) - +new Date();

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

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
            <span className="timer-value">{String(value).padStart(2, '0')}</span>
            <span className="timer-label">{unit.charAt(0).toUpperCase() + unit.slice(1)}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

/**
 * Time Since Component - Shows elapsed time since start date
 */
const TimeSince: React.FC = () => {
  const startDate = useMemo(() => new Date(START_DATE), []);
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
    <div className="time-since">
      <h2>Time Since We Met</h2>
      <div className="timer-display">
        <div className="timer-box large">
          <span className="timer-value">{displayValue}</span>
          <span className="timer-label">{format.charAt(0).toUpperCase() + format.slice(1)}</span>
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

/**
 * Countdown Page Component - Combined countdown and time since display
 */
const CountdownPage: React.FC = () => (
  <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="countdown-container">
    <CountdownTimer />
    <TimeSince />
  </motion.div>
);

/**
 * Creates and animates cat particles during transition
 */
const createCatAnimation = (): void => {
  const particles: HTMLImageElement[] = [];
  const root = document.getElementById('root');

  if (!root) return;

  // Create particle elements
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const particle = document.createElement('img');
    particle.src = catImage;
    particle.className = 'cat-particle';
    particle.style.left = '50%';
    particle.style.top = '50%';
    particle.style.transform = 'translate(-50%, -50%)';

    root.appendChild(particle);
    particles.push(particle);
  }

  // Calculate radius based on viewport size (responsive)
  const radius = Math.min(window.innerWidth, window.innerHeight) / 2;

  // Animate particles in a circular pattern
  anime({
    targets: particles,
    translateX: (_el: any, i: number) => {
      const angle = (360 / PARTICLE_COUNT) * i;
      const angleInRad = angle * (Math.PI / 180);
      return radius * Math.cos(angleInRad);
    },
    translateY: (_el: any, i: number) => {
      const angle = (360 / PARTICLE_COUNT) * i;
      const angleInRad = angle * (Math.PI / 180);
      return radius * Math.sin(angleInRad);
    },
    scale: [0.5, 1.5],
    opacity: [1, 0],
    duration: ANIMATION_DURATION,
    easing: 'easeOutExpo',
    delay: () => Math.random() * 500,
    complete: () => {
      // Clean up particles after animation
      particles.forEach((p) => p.remove());
    },
  });
};

/**
 * Main App Component
 */
function App() {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showCountdown, setShowCountdown] = useState(false);

  const handleTransition = () => {
    setIsTransitioning(true);

    // Start cat animation
    createCatAnimation();

    // Show countdown after delay
    setTimeout(() => {
      setShowCountdown(true);
    }, PANEL_APPEAR_DELAY);
  };

  return (
    <>
      <AnimatePresence>{!isTransitioning && <LoveLetter onButtonClick={handleTransition} />}</AnimatePresence>

      <AnimatePresence>{showCountdown && <CountdownPage />}</AnimatePresence>
    </>
  );
}

export default App;
