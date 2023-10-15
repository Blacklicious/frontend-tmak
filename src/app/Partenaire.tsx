import React from 'react';
import Image from '../../node_modules/next/image';

const logos = [
  '/logos/barrick.jpeg', // replace with your logo file names or URLs
  '/logos/chambresdesmines.jpeg',
  '/logos/cnscom.jpeg',
  '/logos/dcs-mali.jpeg',
  '/logos/dngm.jpeg',
  '/logos/gounkoto.jpeg',
  '/logos/gouvml.jpeg',
  '/logos/ims.jpeg',
  '/logos/itie.jpeg',
  '/logos/loulo.jpeg',
  '/logos/pgsm.jpeg',
  '/logos/shantabana.jpeg',
  '/logos/cnscom.jpeg',
  '/logos/somifi.jpeg',
  '/logos/unicef.jpeg',
  '/logos/worldbank.png',
  // Add more logos here
];

const Partenaire: React.FC = () => {
  return (
    <div className="relative overflow-hidden p-6 bg-white mt-4  w-[95vw] rounded-md  ">
      <div className='text-4xl md:text-6xl text-gray-600 font-semibold flex justify-center mb-10 '>
				Nos partenaires
			</div>
      <div className="animate-marquee whitespace-nowrap w-[100vw]">
        {logos.map((logo, index) => (
          <Image 
            width={300} height={500} 
            key={index}
            src={logo}
            alt={`Partner ${index + 1}`}
            className="inline-block h-[12vh] md:h-[14vh] w-auto mx-4"
          />
        ))}
      </div>
      <style jsx>{`
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
        @keyframes marquee {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
      `}</style>
    </div>
  );
};

export default Partenaire;
