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
  const gameAreaRef = useRef(null);

  // Sound effect references
  const knifeCutSound = new Audio('/sounds/knife-cut.mp3');
  const backgroundMusic = new Audio('/sounds/background-music.mp3');

  useEffect(() => {
    // Play background music on loop when the game starts
    backgroundMusic.loop = true;
    backgroundMusic.volume = 0.3; // Adjust volume as needed
    backgroundMusic.play();

    const fruitInterval = setInterval(() => {
      const newFruit = {
        id: Date.now() + Math.random(),
        fruit: fruits[Math.floor(Math.random() * fruits.length)],
        x: window.innerWidth * 0.2 + Math.random() * window.innerWidth * 0.6,
        y: window.innerHeight + 50,
        speedX: (Math.random() - 0.5) * 2,
        speedY: -Math.random() * 12 - 10,  // Higher and slower
        rotation: Math.random() * 360,
        scale: 0.8 + Math.random() * 0.4,
      };
      setFruitsInAir((prev) => [...prev, newFruit]);
    }, 600); // Slow fruit spawning

    return () => {
      clearInterval(fruitInterval);
      backgroundMusic.pause(); // Stop background music when the game ends
    };
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
    const rect = gameAreaRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setKnifeTrail((trail) => {
      const newTrail = [...trail, { x, y }];
      return newTrail.slice(-15);
    });

    setFruitsInAir((prevFruits) => {
      const newFruits = [];
      const cutFruits = [];

      prevFruits.forEach((fruit) => {
        let isCut = false;
        for (let i = 0; i < knifeTrail.length; i++) {
          const point = knifeTrail[i];
          const dx = fruit.x - point.x;
          const dy = fruit.y - point.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < 40) {
            isCut = true;
            break;
          }
        }

        if (isCut) {
          cutFruits.push(fruit);
          knifeCutSound.play(); // Play knife cut sound when a fruit is cut
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
    <div
      className="game-container"
      ref={gameAreaRef}
      onMouseMove={handleMouseMove}
      onTouchMove={(e) => {
        e.preventDefault();
        handleMouseMove(e.touches[0]);
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
          <div
            className="splash-particle"
            style={{
              backgroundColor: fruitColors[splash.fruit],
              borderRadius: '50%',
              width: '20px',
              height: '20px',
            }}
          ></div>
          <div
            className="splash-particle"
            style={{
              backgroundColor: fruitColors[splash.fruit],
              borderRadius: '50%',
              width: '20px',
              height: '20px',
            }}
          ></div>
          <div
            className="splash-particle"
            style={{
              backgroundColor: fruitColors[splash.fruit],
              borderRadius: '50%',
              width: '20px',
              height: '20px',
            }}
          ></div>
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
  );
};

export default FruitNinja;
