import React from 'react'
import Link from 'next/link';

const Events = () => {
  return (
    <div>
        <div className="flex flex-col md:flex-row bg-white text-white mb-4 md:mb-[05vh] shadow-md p-3 md:p-6">
          <div className="md:w-1/2 p-[5vw] text-black">
            <span className="block text-lg">Join Our Events</span>
            <h2 className="text-4xl font-bold">Évènements a venir !!</h2>
            <p className="my-4 ">
              "Si vous êtes passionné par le monde de la minéralogie et que les événements communautaires vous intéressent, nos activités à venir sont faites pour vous. Préparez-vous à rencontrer des professionnels partageant les mêmes centres d'intérêt et à élargir votre réseau. La section 'ÉVÉNEMENTS À VENIR' de notre site internet est votre destination privilégiée pour rester informé sur les dernières actualités et les événements les plus marquants dans l'industrie minière. Que ce soit pour des conférences, des ateliers, ou des salons professionnels, ne manquez pas l'opportunité de vous impliquer et de rester à la pointe du secteur. Consultez cette section régulièrement pour découvrir les événements qui pourraient façonner votre avenir professionnel dans le monde minier."
            </p>
            <Link 
              href="/coming-events" ><button
              rel="noopener noreferrer"
              className="bg-black w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Decouvrez les évènements a venir
            </button></Link>

          </div>
          <div className="md:w-1/2">
            <img
              src="https://smartcompany.africa/wp-content/uploads/2022/04/Indaba.jpg"
              alt="Coming Events"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
    </div>
  )
}

export default Events