import React from 'react'

const Hero = () => {
  return (
    <div>
      {/* Hero Section */}
      <div className="relative bg-gray-900 text-white h-[75vh] w-[100vw]">
        {/* Video Layer (z-0) */}
        <iframe src="/miningvid.mp4" className="w-full h-full object-cover" allow="autoplay;" >
				</iframe>
        {/* Black Transparent Layer (z-1) */}
        <div className="absolute inset-0 flex items-center justify-center h-full bg-black opacity-70">
        </div>

        {/* Heading and Paragraph (z-2) */}
        <div className="absolute inset-0 flex items-center justify-center h-full">
					<div className='px-[9vw] md:px-[16vw]'>
						<div className="text-3xl md:text-5xl font-bold ">
            &quot;CREER UN HERITAGE DURABLE POUR LES GÉNÉRATIONS FUTURES.&quot;
						</div>
						<p className='flex md:justify-end md:text-lg md:px-10'>
								Notre PDG. Nouhoum TRAORÉ
						</p>
					</div>
        </div>
      </div>
    </div>
  )
}

export default Hero