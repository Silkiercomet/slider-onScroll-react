import "./styles.css";
import { useState, useEffect, useCallback } from "react";
const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
export default function App() {
  const [cards, setCards] = useState(0);
  const [triggerBottom, setTriggerBottom] = useState(0);

  const handleScroll = useCallback(() => {
    for (let i = 0; i < cards.length; i++) {
      const boxTop = cards[i].getBoundingClientRect().top;
      if (boxTop < triggerBottom) {
        cards[i].classList.add("show");
      } else {
        cards[i].classList.remove("show");
      }
    }
  }, [cards, triggerBottom]);

  useEffect(() => {
    const x = document.querySelectorAll(".card");
    setCards([...x]);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    setTriggerBottom((window.innerHeight / 5) * 4);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [cards, handleScroll]);

  return (
    <div className="App" onScroll={handleScroll}>
      <h1>Hello CodeSandbox</h1>
      <ul className="card__container">
        {arr.map((a, i) => (
          <li key={i} className="card">
            {a}
          </li>
        ))}
      </ul>
    </div>
  );
}
