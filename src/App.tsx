import './App.css';

function App() {
  const MESSAGE = "We haven't spent much time together yet, but I miss you more than I expected. This is my embarrassing love letter in return to yours. \nYou've become my favorite thought, I catch myself thinking of you all the time. When I pass a store, I wonder if there's something in there you'd like. When I eat, I would wonder whether you'd love or hate the taste. And with each day I'll only love you more. I cannot wait to see you again. \nI have to admit, I'm quite romantic. jk lol. \nLove you.❤️";

  return (
    <>
      <div className="flex-col gap-8 flex items-center justify-center">
        <div className="title">
          <h1 className="love-letter-title">Rak Preme</h1>
        </div>
        <div className="px-4 sm:px-8 md:px-16 lg:px-32 xl:px-64">
          <p className="love-letter bg-amber-50">{MESSAGE}</p>
        </div>
        <div className="flex-row gap-4 flex">
          <button className="love-letter-button">
            <a href="">I will wait.</a>
          </button>
          <button className="love-letter-button">
            <a href="">I can wait.</a>
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
