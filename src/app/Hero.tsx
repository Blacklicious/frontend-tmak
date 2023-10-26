import React from 'react'

const Hero = () => {

  return (
    <div>
      {/* Hero Section */}
      <div className="relative bg-gray-900 text-white h-[75vh] w-[100vw]">
        {/* Video Layer (z-0) */}
        <video controls className="w-full h-full object-cover" autoPlay playsInline muted loop>
          <source src="https://storage.cloud.google.com/nzirani_bucket-1/clients/t-mak/mininghero.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        {/* Black Transparent Layer (z-1) */}
        <div className="absolute inset-0 flex items-center justify-center h-full bg-black opacity-50">
        </div>

        {/* Heading and Paragraph (z-2) */}
        <div className="absolute inset-0 flex items-center justify-center h-full">
					<div className='px-[6vw] md:px-[15vw]'>
						<div className="text-4xl lg:text-7xl font-bold text-center font-oswald ">
            &quot;CRÉER UN HÉRITAGE DURABLE POUR LES GÉNÉRATIONS FUTURES.&quot;
						</div>
						<p className='text-right md:text-md md:px-10'>
								Notre PDG. Nouhoum TRAORÉ
						</p>
					</div>
        </div>
      </div>
    </div>
  )
}

export default Hero