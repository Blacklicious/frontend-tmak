
import Image from 'next/image';

const Services = () => {
  return (
    <div className='bg-white p-2 md:p-4'>
      <div className="  rounded-lg w-[100%] flex flex-col items-center justify-center md:justify-between bg-black border-8 border-yellow-500 p-12 pb-10 px-4">
      <h2 className="  text-5xl md:text-6xl text-center font-bold text-white font-oswald mb-4 w-[100%]">NOS SERVICES </h2>  
      <div className='flex flex-col xl:flex-row items-top md:px-8'>
          <div className="w-[100%] xl:w-[50%] xl:px-4 mb-5 flex flex-col items-center justify-center">
            <div className=" bg-gray-100 font-bold mt-6 rounded-lg border-2 text-black px-3 py-2 text-sm md:text-xl text-center w-[100%]">&laquo; Avec T-MAK, instaurez la confiance de vos partenaires grâce à une communication efficace &raquo;</div>
            <ul className="  flex flex-wrap justify-center text-left p-1">
              <li className='rounded-lg w-[100%] text-black bg-white
               md:w-[48%] mt-6 md:mr-4 border-4 border-gray-300 py-2 px-4'>
                <h3 className=" md:text-lg lg:text-2xl font-bold mb-2"> 🔳 Communication  </h3>
                <p className='text-sm md:text-lg'> Accompagnement dans la stratégie digitale, le branding, l&apos;influence médiatique, communication interne etc.</p>
              </li>
              <li className='rounded-lg w-[100%] text-black bg-white
               md:w-[48%] mt-6  border-4 border-gray-300 py-2 px-4'>
                <h3 className=" md:text-lg lg:text-2xl font-bold mb-2"> 🔳 Relations Publiques & Intermédiation  </h3>
                <p className='text-sm md:text-lg'>Rédaction de communiqués, gestion des médias, lobbying, mise en relations etc.</p>
              </li>
              <li className='rounded-lg w-[100%] text-black bg-white
               md:w-[48%] mt-6 border-4 border-gray-300 py-2 px-4 md:mr-4'>
                <h3 className=" md:text-lg lg:text-2xl font-bold mb-2"> 🔳 Média  </h3>
                <p className='text-sm md:text-lg'>Couverture au quotidien de l&apos;actualité minière, réalisation d&apos;émissions télévisées et magazines dédiés au secteur minier africain.</p>
              </li>
              
              <li className='rounded-lg w-[100%] text-black bg-white
               md:w-[48%] mt-6 border-4 border-gray-300 py-2 px-4'>
                <h3 className=" md:text-lg lg:text-2xl font-bold mb-2"> 🔳 Production Audiovisuelle  </h3>
                <p className='text-sm md:text-lg'>Réalisation de spots publicitaires, vidéos institutionnelles, photos corporatives etc.</p>
              </li>
              <li className='rounded-lg w-[100%] text-black bg-white
               md:w-[48%] mt-6 md:mr-4 border-4 border-gray-300 py-2 px-4 '>
                <h3 className=" md:text-lg lg:text-2xl font-bold mb-2"> 🔳 Événementiel  </h3>
                <p className='text-sm md:text-lg'>Organisation d&apos;ateliers, de salons, de forums et de conférences. Conception et réalisation de stands, etc.</p>
              </li>
              <li className='rounded-lg w-[100%] text-black bg-white
               md:w-[48%] mt-6  border-4 border-gray-300 py-2 px-4'>
                <h3 className=" md:text-lg lg:text-2xl font-bold mb-2"> 🔳 Imprimerie  </h3>
                <p className='text-sm md:text-lg'>Conception et impression de flyers, affiches, kakémono, goodies, bulletins d&apos;informations, fiche infographique, t-shirt & polo, casquettes etc.</p>
              </li>
            </ul>
          </div>
          <div className="w-[100%] xl:w-[50%] xl:h-full bg-yellow-500 mt-6  rounded-lg">
              <Image className='rounded-lg shadow-lg h-[100%]' src="/tmak-casquette.jpeg" alt="Casquette T-MAK" objectFit='contain' width={1000} height={1000}  />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Services;
