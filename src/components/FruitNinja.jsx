import React, { useState, useEffect, useRef } from 'react';
import './FruitNinja.css';

const fruits = ['🍎', '🍌', '🍉', '🍓', '🍍', '🥝', '🍑', '🍒'];
const SPLASH_DURATION = 300;

const fruitColors = {
  '🍎': '#ff4d4d', // Red Apple
  '🍌': '#ffe135', // Banana
  '🍉': '#ff5c5c', // Watermelon
  '🍓': '#ff3b77', // Strawberry
  '🍍': '#f9d923', // Pineapple
  '🥝': '#7ed957', // Kiwi
  '🍑': '#ffb347', // Peach
  '🍒': '#ff1c1c', // Cherry
};

const FruitNinja = ({ onUnlock }) => {
  const [fruitsInAir, setFruitsInAir] = useState([]);
  const [score, setScore] = useState(0);
  const [knifeTrail, setKnifeTrail] = useState([]);
  const [splashes, setSplashes] = useState([]);
  const [unlocked, setUnlocked] = useState(false);
  const [isSoundOn, setIsSoundOn] = useState(false); // Default to off for sound
  const gameAreaRef = useRef(null);
  const lastPointRef = useRef(null); // To track the last point for better knife detection

  // Sound effect reference
  const knifeCutSoundRef = useRef(null);

  useEffect(() => {
    // Initialize knife cut sound
    knifeCutSoundRef.current = new Audio('/sounds/knife-cut.mp3');
    knifeCutSoundRef.current.volume = 0.3; // Adjust volume as needed
  }, []);

  const handleSoundToggle = () => {
    setIsSoundOn((prev) => !prev);
  };

  useEffect(() => {
    const fruitInterval = setInterval(() => {
      const newFruit = {
        id: Date.now() + Math.random(),
        fruit: fruits[Math.floor(Math.random() * fruits.length)],
        x: Math.random() * window.innerWidth,
        y: window.innerHeight + 50,
        speedX: (Math.random() - 0.5) * 2,
        speedY: -Math.random() * 12 - 10,
        rotation: Math.random() * 360,
        scale: 0.8 + Math.random() * 0.4,
      };
      setFruitsInAir((prev) => [...prev, newFruit]);
    }, 600);

    return () => clearInterval(fruitInterval);
  }, []);

  useEffect(() => {
    const moveInterval = setInterval(() => {
      setFruitsInAir((prevFruits) =>
        prevFruits
          .map((fruit) => ({
            ...fruit,
            x: fruit.x + fruit.speedX,
            y: fruit.y + fruit.speedY,
            speedY: fruit.speedY + 0.3, // Gravity
            rotation: fruit.rotation + 5,
          }))
          .filter((fruit) => fruit.y < window.innerHeight + 200)
      );
    }, 16);

    return () => clearInterval(moveInterval);
  }, []);

  useEffect(() => {
    if (splashes.length > 0) {
      const timer = setTimeout(() => {
        setSplashes((prev) => prev.slice(1));
      }, SPLASH_DURATION);
      return () => clearTimeout(timer);
    }
  }, [splashes]);

  const handleMouseMove = (e) => {
    if (!gameAreaRef.current) return;

    const rect = gameAreaRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Add intermediate points if the movement was large
    const newPoints = [];
    if (lastPointRef.current) {
      const distance = Math.sqrt(
        Math.pow(x - lastPointRef.current.x, 2) + Math.pow(y - lastPointRef.current.y, 2)
      );

      if (distance > 30) {
        const steps = Math.floor(distance / 15);
        for (let i = 1; i <= steps; i++) {
          const ratio = i / steps;
          newPoints.push({
            x: lastPointRef.current.x + (x - lastPointRef.current.x) * ratio,
            y: lastPointRef.current.y + (y - lastPointRef.current.y) * ratio
          });
        }
      }
    }

    lastPointRef.current = { x, y };
    const updatedTrail = [...knifeTrail, ...newPoints, { x, y }].slice(-20);
    setKnifeTrail(updatedTrail);

    setFruitsInAir((prevFruits) => {
      const newFruits = [];
      const cutFruits = [];

      prevFruits.forEach((fruit) => {
        let isCut = false;

        // Check against all points in the trail
        for (let i = 0; i < updatedTrail.length; i++) {
          const point = updatedTrail[i];
          const dx = fruit.x - point.x;
          const dy = fruit.y - point.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          // Increased hit radius and check against fruit size
          if (distance < 40 * fruit.scale) {
            isCut = true;
            break;
          }
        }

        if (isCut) {
          cutFruits.push(fruit);
          if (isSoundOn && knifeCutSoundRef.current) {
            knifeCutSoundRef.current.currentTime = 0;
            knifeCutSoundRef.current.play().catch(e => console.error("Sound error:", e));
          }
        } else {
          newFruits.push(fruit);
        }
      });

      if (cutFruits.length > 0) {
        setScore((prev) => {
          const newScore = prev + cutFruits.length;
          if (newScore >= 50 && !unlocked) {
            setUnlocked(true);
            onUnlock();
          }
          return newScore;
        });

        setSplashes((prev) => [
          ...prev,
          ...cutFruits.map((fruit) => ({
            id: fruit.id + '-splash',
            x: fruit.x,
            y: fruit.y,
            fruit: fruit.fruit,
          })),
        ]);
      }

      return newFruits;
    });
  };

  return (
    <div className="fruit-ninja-container">
      <button
        onClick={handleSoundToggle}
        className="sound-toggle-button"
      >
        {isSoundOn ? '🔊' : '🔇'}
      </button>
      <div
        className="game-container"
        ref={gameAreaRef}
        onMouseMove={handleMouseMove}
        onTouchMove={(e) => {
          e.preventDefault();
          if (e.touches[0]) handleMouseMove(e.touches[0]);
        }}
      >
        {fruitsInAir.map((fruit) => (
          <div
            key={fruit.id}
            className="falling-fruit"
            style={{
              left: `${fruit.x}px`,
              top: `${fruit.y}px`,
              transform: `translate(-50%, -50%) rotate(${fruit.rotation}deg) scale(${fruit.scale})`,
              fontSize: `${fruit.scale * 50}px`,
            }}
          >
            {fruit.fruit}
          </div>
        ))}

        {splashes.map((splash) => (
          <div
            key={splash.id}
            className="splash-effect"
            style={{
              left: `${splash.x}px`,
              top: `${splash.y}px`,
            }}
          >
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="splash-particle"
                style={{
                  backgroundColor: fruitColors[splash.fruit],
                }}
              ></div>
            ))}
          </div>
        ))}

        <svg className="knife-trail-svg">
          {knifeTrail.length > 1 && (
            <polyline
              points={knifeTrail.map((p) => `${p.x},${p.y}`).join(' ')}
              fill="none"
              stroke="white"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeOpacity="0.7"
            />
          )}
        </svg>

        <div className="scoreboard">
          <p>Cut Fruits: {score} / 50</p>
        </div>
      </div>
    </div>
  );
};

export default FruitNinja;
