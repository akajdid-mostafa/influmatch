import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Slide {
  id: number;
  image: string;
  title: string;
  description: string;
}

const slides: Slide[] = [
  {
    id: 1,
    image: '/images/auth/slide1.webp', // Placeholder, you'll add these
    title: 'Connectez-vous avec les meilleures marques',
    description: 'Découvrez des opportunités uniques et développez votre carrière.',
  },
  {
    id: 2,
    image: '/images/auth/slide2.webp', // Placeholder
    title: "Trouvez l'influenceur parfait pour votre campagne",
    description: 'Atteignez votre audience cible avec des collaborations authentiques.',
  },
  {
    id: 3,
    image: '/images/auth/slide3.webp', // Placeholder
    title: 'Gérez vos campagnes de A à Z',
    description: 'Des outils intuitifs pour un suivi efficace et des résultats mesurables.',
  },
];

const AuthImageSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 5000); // Change slide every 5 seconds
    return () => clearInterval(interval);
  }, []);

  const currentSlide = slides[currentIndex];

  return (
    <div className="relative w-full h-full overflow-hidden rounded-l-3xl">
      <AnimatePresence initial={false}>
        <motion.img
          key={currentSlide.id}
          src={currentSlide.image}
          alt={currentSlide.title}
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 1, ease: "easeInOut" }}
        />
      </AnimatePresence>

      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex flex-col justify-end p-10 text-white">
        <AnimatePresence initial={false}>
          <motion.h2
            key={currentSlide.id + '-title'}
            className="text-4xl font-extrabold mb-4 text-shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {currentSlide.title}
          </motion.h2>
        </AnimatePresence>
        <AnimatePresence initial={false}>
          <motion.p
            key={currentSlide.id + '-description'}
            className="text-lg opacity-90"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          >
            {currentSlide.description}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AuthImageSlider;
