import React from 'react';
import Image from '../../node_modules/next/image';
import Slider from 'react-slick';

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
  '/logos/unicef.png',
  '/logos/banquemond.png',
  // Add more logos here
];

const Partenaire: React.FC = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000, // 5 seconds
  };

  const chunks = [];
  for (let i = 0; i < logos.length; i += 6) {
    chunks.push(logos.slice(i, i + 6));
  }
 
  return (
    <div className="relative overflow-hidden bg-white w-[98vw] h-[60vh] rounded-md m-4 shadow-md">
      <div className='text-3xl md:text-6xl text-black font-semibold flex justify-center m-10 font-oswald '>
        NOS PARTENAIRES
      </div>
      <Slider {...settings}>
        {chunks.map((chunk, index) => (
          <div key={index}>
            <div className="flex justify-around mb-14">
              {chunk.slice(0, 3).map((logo, logoIndex) => (
                <Image 
                    width={150} height={250}  // Adjust as needed
                    key={logoIndex}
                    src={logo}
                    alt={`Partner ${logoIndex + 1}`}
                    className="h-[10vh] md:h-[14vh] w-auto"
                  />
              ))}
            </div>

            <div className="flex justify-around mb-4">
              {chunk.slice(3, 6).map((logo, logoIndex) => (
                <Image 
                    width={150} height={250}  // Adjust as needed
                    key={logoIndex}
                    src={logo}
                    alt={`Partner ${logoIndex + 4}`}  // Adjusted index for alt text
                    className="h-[12vh] md:h-[14vh] w-auto"
                  />
              ))}
            </div>

          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Partenaire;