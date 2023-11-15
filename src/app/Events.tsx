import React from 'react'
import Link from '../../node_modules/next/link';
import Image from '../../node_modules/next/image';

const Events = () => {
  return (
    <div className='bg-black p-3'>
        <div className="flex flex-col lg:flex-row bg-white text-white shadow-md p-2 md:p-6 rounded-lg">
          <div className="lg:w-1/2 p-[5vw] text-black flex flex-col items-center justify-center">
            <Link 
              href="/coming-events" ><button
              rel="noopener noreferrer"
              className="bg-black w-[100%] mb-6 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded text-4xl"
            >
              Découvrez les évènements à venir
            </button></Link>
            <div className="text-3xl md:text-5xl font-bold text-center md:text-center justify-center font-oswald  ">T-MAK organise la FOIRE DE LA CAN ⚽ pour la cohésion sociale au Mali.  </div>
            <p className="my-4 text-center md:text-center p-3 mb-8 ">
              Si vous êtes passionné par le monde de la minéralogie et que les événements
              communautaires vous intéressent, nos activités à venir sont faites pour vous. 
              La Foire de la Can est l&apos;événement phare de l&apos;année au Mali, rassemblant 
              des exposants de tout le pays pour célébrer la richesse de la culture malienne. 
              Cette foire nationale, d&apos;envergure internationale, met en valeur l&apos;artisanat, 
              la musique, la cuisine, et bien plus encore, offrant une véritable immersion 
              dans les traditions et la diversité du Mali. Venez découvrir l&apos;âme de cette nation
              à travers des expositions, des spectacles en direct, des dégustations culinaires, 
              et des opportunités uniques de rencontrer des artistes, des entrepreneurs, et des
              artisans locaux. La Foire de la Can est l&apos;occasion parfaite de célébrer la fierté 
              malienne et de créer des liens entre les communautés. Rejoignez-nous pour une expérience 
              inoubliable au cœur du Mali.
            </p>

          </div>
          <div className="lg:w-1/2">
            <Image
              src="/foiredelacan.jpeg"
              alt="Coming Events"
              className="w-full h-full object-cover"
              width={900} height={500}
            />
          </div>
        </div>
    </div>
  )
}

export default Events