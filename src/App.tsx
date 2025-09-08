import { motion } from 'motion/react';
import './App.css';

function App() {
  const MESSAGE = "We've only spent little time together, but I miss you so much. You've become my favorite thought and I'm always thinking of you.\nI hope you can wait for me.";

  return (
    <>
      <div className="flex-col gap-8 flex items-center justify-center">
        <div className="title">
          <h1>Rak Preme</h1>
        </div>
        <div className="px-64">
          <p>{MESSAGE}</p>
        </div>
        <div className="flex-row gap-4 flex">
          <motion.button>
            <a href="">I will wait.</a>
          </motion.button>
          <motion.button>
            <a href="">I can wait.</a>
          </motion.button>
        </div>
      </div>
    </>
  );
}

export default App;
