import React from 'react'
import Link from '../../node_modules/next/link';
import Image from '../../node_modules/next/image';

const Events = () => {
  return (
    <div>
        <div className="flex flex-col md:flex-row bg-white text-white shadow-md p-3 md:p-6">
          <div className="md:w-1/2 p-[5vw] text-black">
            <h2 className="text-3xl md:text-6xl font-bold text-center md:text-left font-oswald ">Évènements à venir !!</h2>
            <p className="my-4 text-center md:text-left ">
              Si vous êtes passionné par le monde de la minéralogie et que les événements
              communautaires vous intéressent, nos activités à venir sont faites pour vous. 
              Préparez-vous à rencontrer des professionnels partageant les mêmes centres d&apos;intérêt
               et à élargir votre réseau. La section &apos;ÉVÉNEMENTS À VENIR&apos; de notre site internet
                est votre destination privilégiée pour rester informé sur les dernières actualités et les
               événements les plus marquants dans l&apos;industrie minière. Que ce soit pour des conférences,
                des ateliers, ou des salons professionnels, ne manquez pas l&apos;opportunité de vous impliquer
               et de rester à la pointe du secteur. Consultez cette section régulièrement pour découvrir les 
               événements qui pourraient façonner votre avenir professionnel dans le monde minier.
            </p>
            <Link 
              href="/coming-events" ><button
              rel="noopener noreferrer"
              className="bg-black w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded "
            >
              Découvrez les évènements à venir
            </button></Link>

          </div>
          <div className="md:w-1/2">
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