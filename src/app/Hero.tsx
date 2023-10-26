import React from 'react';

const Hero = () => {
    return (
        <div className="relative w-full h-[60vh] bg-gray-900 text-white">

            {/* Video Background Layer
            <div className="flex items-center justify-center absolute w-full h-full overflow-hidden">
                <iframe 
                    className="absolute w-[220vw] sm:w-[100vw] h-[100vh] object-cover"
                    src="https://www.youtube.com/embed/n1q-BhQpKt0?autoplay=1&mute=1&controls=0&loop=1&playlist=n1q-BhQpKt0" 
                    title="YouTube video player" 
                    frameBorder="0"
                    allowFullScreen
                ></iframe>
            </div> */}

            {/* Video Background Layer */}
            <video 
                className="absolute top-0 left-0 w-[220vw] sm:w-[100vw] h-full object-cover"
                autoPlay={true}
                muted={true}
                loop={true}
                playsInline={true}
                src="/mininghero720.mp4" 
            >
                 
                Your browser does not support the video tag.
            </video>

            {/* Black Transparent Layer */}
            <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>

            {/* Heading and Paragraph */}
            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center md:p-[16vw]">
                <div className="px-6 md:px-15 text-center">
                    <div className="text-4xl lg:text-7xl font-bold font-oswald mb-4">
                        "CRÉER UN HÉRITAGE DURABLE POUR LES GÉNÉRATIONS FUTURES."
                    </div>
                    <p className="text-right md:text-md md:px-10">
                        Notre PDG. Nouhoum TRAORÉ
                    </p>
                </div>
            </div>

        </div>
    )
}

export default Hero;
