// components/Carousel.tsx
import Image from "next/image";
import { useEffect, useState } from "react";

interface CarouselProps {
  images: string[]; // Définit le type des images comme un tableau de chaînes
}

const Carousel: React.FC<CarouselProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change toutes les 3 secondes

    return () => clearInterval(interval); // Nettoie l'intervalle quand le composant est démonté
  }, [images.length]);

  return (
    <div className="relative w-full overflow-hidden">
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((src, index) => (
          <Image
            height={700}
            width={200}
            key={index}
            src={src}
            alt={`Slide ${index}`}
            className="flex-shrink-0  w-[700px] h-[700px] rounded-md"
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
