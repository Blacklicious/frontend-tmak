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
  '/logos/somifi.jpeg',
  '/logos/unicef.png',
  '/logos/banquemond.png',
  // Add more logos here
];

const Partenaire: React.FC = () => {
  return (
    <div className="relative overflow-hidden bg-white w-[98vw] h-full rounded-md m-4 shadow-md">
      <div className='text-3xl md:text-6xl text-black font-semibold flex justify-center m-10 font-oswald'>
        NOS PARTENAIRES
      </div>

      <div className="overflow-x-scroll whitespace-nowrap">
        <div className="flex justify-start mb-4">
          {logos.slice(0, Math.ceil(logos.length / 2)).map((logo, logoIndex) => (
            <Image 
              width={150} height={250}
              key={logoIndex}
              src={logo}
              alt={`Partner ${logoIndex + 1}`}
              className="h-[10vh] w-auto mx-6"
            />
          ))}
        </div>
        <div className="flex justify-start">
          {logos.slice(Math.ceil(logos.length / 2)).map((logo, logoIndex) => (
            <Image 
              width={150} height={250}
              key={logoIndex}
              src={logo}
              alt={`Partner ${logoIndex + 1}`}
              className="h-[10vh] w-auto m-6"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Partenaire;