'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LocusSolusOrigin() {
  const [currentProduct, setCurrentProduct] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [hoveredCircle, setHoveredCircle] = useState<number | null>(null);

  const products = [
    {
      id: 1,
      year: '1964',
      title: 'Gae Aulenti',
      subtitle: 'Locus Solus, 1964',
      image: 'http://locus-solus.studiogusto.com/img/sdraio_prendisole.png',
      shadow: 'http://locus-solus.studiogusto.com/img/shadow/sdraio_prendisole.png',
      bgColor: 'transparent',
      h1Color: '#353535',
      circleColor: '#353535',
    },
    {
      id: 2,
      year: '1964',
      title: 'Sdraio prendisole',
      subtitle: 'Locus Solus, Gae Aulenti 1964',
      image: 'http://locus-solus.studiogusto.com/img/sdraio_prendisole.png',
      shadow: 'http://locus-solus.studiogusto.com/img/shadow/sdraio_prendisole.png',
      bgColor: '#FBDA52',
      h1Color: '#5091ad',
      circleColor: '#5091ad',
    },
    {
      id: 3,
      year: '1964',
      title: 'Lume orientabile',
      subtitle: 'Locus Solus, Gae Aulenti 1964',
      image: 'http://locus-solus.studiogusto.com/img/lume_orientabile_gae_aulenti.png',
      shadow: 'http://locus-solus.studiogusto.com/img/shadow/lume_orientabile_gae_aulenti.png',
      bgColor: '#DE6C40',
      h1Color: '#a0da98',
      circleColor: '#a0da98',
    },
    {
      id: 4,
      year: '1964',
      title: 'Tavolo',
      subtitle: 'Locus Solus, Gae Aulenti 1964',
      image: 'http://locus-solus.studiogusto.com/img/tavolo_gae_aulenti.png',
      shadow: 'http://locus-solus.studiogusto.com/img/shadow/tavolo_gae_aulenti.png',
      bgColor: '#54943F',
      h1Color: '#e7b589',
      circleColor: '#e7b589',
    },
    {
      id: 5,
      year: '1964',
      title: 'Divanetto due posti',
      subtitle: 'Locus Solus, Gae Aulenti 1964',
      image: 'http://locus-solus.studiogusto.com/img/divano_gae_aulenti.png',
      shadow: 'http://locus-solus.studiogusto.com/img/shadow/divano_gae_aulenti.png',
      bgColor: '#22548C',
      h1Color: '#e4c883',
      circleColor: '#e4c883',
    },
  ];

  const circles = [
    { id: 1, top: '27%', left: '61%' },
    { id: 2, top: '11%', left: '50%' },
    { id: 3, top: '24%', left: '60%' },
    { id: 4, top: '86%', left: '92%' },
    { id: 5, top: '55%', left: '71%' },
    { id: 6, top: '39%', left: '27%' },
  ];

  const currentColors = products[currentProduct - 1];

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const handleCircleClick = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    const nextProduct = (currentProduct % 5) + 1;
    setCurrentProduct(nextProduct);
    setTimeout(() => setIsTransitioning(false), 800);
  };

  // Split text animation - reanimated on product change
  const splitText = (text: string, key: number) => {
    const words = text.split(' ');
    let charIndex = 0;
    return (
      <>
        {words.map((word, wordIdx) => (
          <div key={`${key}-${wordIdx}`} style={{ display: 'inline-block', overflow: 'hidden' }}>
            {word.split('').map((char, idx) => {
              const currentCharIndex = charIndex++;
              return (
                <motion.span
                  key={`${key}-${wordIdx}-${idx}`}
                  className="stoca"
                  initial={{ y: '100%', opacity: 0 }}
                  animate={{ y: '0%', opacity: 1 }}
                  transition={{
                    delay: 0.7 + currentCharIndex * 0.03,
                    duration: 0.35,
                    ease: [0.33, 1, 0.68, 1],
                  }}
                  style={{
                    display: 'inline-block',
                    margin: '0 8px',
                  }}
                >
                  {char}
                </motion.span>
              );
            })}
            {wordIdx < words.length - 1 && <div style={{ display: 'inline-block', width: '16px' }} />}
          </div>
        ))}
      </>
    );
  };

  return (
    <>
      <style jsx global>{`
        @font-face {
          font-family: 'Cervo-Light';
          src: url('/locus-resources/locus-solus.studiogusto.com/fonts/Cervo-Thin.woff') format('woff');
          font-weight: 100;
        }
        @font-face {
          font-family: 'Cervo-Regular';
          src: url('/locus-resources/locus-solus.studiogusto.com/fonts/Cervo-Regular.woff') format('woff');
          font-weight: 400;
        }
        @font-face {
          font-family: 'Theinhardt';
          src: url('/locus-resources/locus-solus.studiogusto.com/fonts/Theinhardt.woff') format('woff');
          font-weight: 400;
        }

        * {
          box-sizing: border-box;
        }

        html, body {
          margin: 0;
          padding: 0;
          overflow: hidden;
          width: 100%;
          height: 100%;
        }

        [data-page="homepage"] {
          position: relative;
          width: 100%;
          height: 100vh;
          transition: background-color 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }

        [data-page="homepage"] article header h1 {
          font-size: 70px;
          line-height: 1em;
          margin: 0 -8px;
          font-family: 'Cervo-Light', serif;
          font-weight: 100;
          text-transform: uppercase;
          transition: color 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          letter-spacing: -0.02em;
        }

        [data-page="homepage"] article header h1 span.stoca {
          margin: 0 8px;
          display: inline-block;
        }

        [data-page="homepage"] article header h2 {
          font-family: 'Theinhardt', sans-serif;
          font-size: 16px;
          font-weight: 400;
          color: #353535;
          margin: 10px 0 0 0;
          letter-spacing: 0.01em;
        }

        [data-page="homepage"] article header h3 {
          font-family: 'Theinhardt', sans-serif;
          font-size: 14px;
          font-weight: 400;
          color: #353535;
          margin: 0 0 8px 0;
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }

        .container {
          position: relative;
          width: 100%;
          height: 100%;
        }

        .full-height {
          height: 100vh;
        }

        .img_prodotto {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          margin: 0;
          z-index: 1;
          pointer-events: none;
        }

        .img_prodotto img.prod {
          max-width: 50vw;
          max-height: 70vh;
          width: auto;
          height: auto;
          display: block;
          margin: 0 auto;
        }

        .img_prodotto img.shadow {
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          max-width: 50vw;
          max-height: 70vh;
          width: auto;
          height: auto;
          opacity: 0.6;
          filter: blur(8px);
        }

        .container_clock {
          position: absolute;
          max-height: 100%;
          max-width: 100%;
          z-index: 10;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }

        #slider_home article {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          text-align: center;
          z-index: 5;
          pointer-events: none;
        }

        #bg_color {
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          z-index: 0;
        }

        #bg_color .circle {
          position: absolute;
          width: 1px;
          height: 1px;
          transform: translate(-50%, -50%);
          cursor: pointer;
          z-index: 5;
          pointer-events: auto;
        }

        #bg_color .circle img {
          display: block;
          width: 1px;
          height: 1px;
          visibility: hidden;
        }

        #bg_color .circle span {
          position: absolute;
          top: -24px;
          left: -24px;
          width: 48px;
          height: 48px;
          border-radius: 50%;
          border: 1px solid;
          opacity: 0.3;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          pointer-events: none;
        }

        #bg_color .circle:hover span {
          opacity: 1;
          transform: scale(1.2);
        }

        #bg_color .circle:active span {
          transform: scale(0.95);
        }

        @media (max-width: 1200px) {
          [data-page="homepage"] article header h1 {
            font-size: 60px;
          }
        }

        @media (max-width: 992px) {
          [data-page="homepage"] article header h1 {
            font-size: 50px;
          }
        }

        @media (max-width: 768px) {
          [data-page="homepage"] article header h1 {
            font-size: 40px;
          }
        }

        @media (max-width: 544px) {
          [data-page="homepage"] article header h1 {
            font-size: 30px;
          }
        }
      `}</style>

      <motion.div
        id="main"
        data-page="homepage"
        animate={{
          backgroundColor: currentColors.bgColor,
        }}
        transition={{
          duration: 0.5,
          ease: 'easeInOut',
        }}
      >
        <section id="slider_home" className={`prod_${currentProduct}`} data-mobile="hideMobile">
          <section id="bg_color" data-punti="6">
            {circles.map((circle, index) => (
              <motion.div
                key={circle.id}
                id={`circle_${circle.id}`}
                className={`circle prod_${currentProduct}`}
                style={{
                  top: circle.top,
                  left: circle.left,
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                  delay: 0.3 + index * 0.08,
                  duration: 0.4,
                  ease: [0.33, 1, 0.68, 1],
                }}
                onClick={handleCircleClick}
                onMouseEnter={() => setHoveredCircle(circle.id)}
                onMouseLeave={() => setHoveredCircle(null)}
              >
                <img src="http://locus-solus.studiogusto.com/img/square.gif" alt="" />
                <motion.span
                  animate={{
                    borderColor: currentColors.circleColor,
                    scale: hoveredCircle === circle.id ? 1.2 : 1,
                    opacity: hoveredCircle === circle.id ? 1 : 0.3,
                  }}
                  transition={{
                    borderColor: { duration: 0.5 },
                    scale: { duration: 0.3 },
                    opacity: { duration: 0.3 },
                  }}
                ></motion.span>
              </motion.div>
            ))}
          </section>

          <div className="container full-height">
            <AnimatePresence mode="wait">
              <motion.figure
                key={currentProduct}
                className="img_prodotto"
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -20 }}
                transition={{
                  duration: 0.6,
                  ease: [0.33, 1, 0.68, 1],
                }}
              >
                <motion.img
                  className="prod"
                  src={currentColors.image}
                  alt={currentColors.title}
                  data-title-tips={currentColors.title}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                />
                <motion.img
                  className="shadow"
                  src={currentColors.shadow}
                  alt={`${currentColors.title} shadow`}
                  data-title-tips={currentColors.title}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.6 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                />
              </motion.figure>
            </AnimatePresence>

            <div className="container_clock"></div>

            <motion.article
              key={`article-${currentProduct}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <header>
                <motion.h3
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.4 }}
                >
                  {currentColors.year}
                </motion.h3>
                <h1
                  id="title_clock"
                  style={{ color: currentColors.h1Color }}
                >
                  {splitText(currentColors.title, currentProduct)}
                </h1>
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2, duration: 0.4 }}
                >
                  {currentColors.subtitle}
                </motion.h2>
              </header>
            </motion.article>
          </div>
        </section>
      </motion.div>
    </>
  );
}
