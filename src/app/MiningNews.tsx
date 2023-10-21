import React from 'react'
import Link from '../../node_modules/next/link';
import { Card } from '../../node_modules/antd';
import Image from '../../node_modules/next/image';

const { Meta } = Card;

const MiningNews = () => {
  return (
    <div>
        {/* Minings News Section */}
        <div className="w-full  flex flex-col justify-center items-center p-4  bg-white text-black">
          <h1 className="text-5xl font-bold m-5 ">MINING NEWS</h1>
          <p className="text-lg mb-5 px-[12vw] ">
            Vous êtes en quête des informations les plus fiables et actuelles sur le secteur minier en Afrique ?
             Chez T-MAK Corporation, nous sommes la référence en matière de couverture d&apos;actualités minières
             sur l&apos;ensemble du continent africain.</p>
          <div className="flex flex-wrap justify-center space-x-2 md:space-x-5 ">
          <Link href="/mining-news/mali" >
            <Card
              hoverable
              style={{ width: 300 }}
              cover={<Image width={300} height={500} alt="Mali News" src="/mining news button/mali minings news.PNG" className='bg-black/90 p-8' />}
            >
              <Meta title="MALI MINING NEWS" description="" />
            </Card></Link>
            <Card
              hoverable
              style={{ width: 300 }}
              cover={<Image width={300} height={500} src="/mining news button/CI mining news.PNG" alt="Cote Ivoire Mining News"  className='bg-black/90 p-8'/>}
            >
              <Meta title="COTE D'IVOIRE MINING NEWS" description="" />
            </Card>
            <Card
              hoverable
              style={{ width: 300 }}
              cover={<Image width={300} height={500} src="/mining news button/guineaminingnews.PNG" alt="Guinea Mining News"  className='bg-black/90 p-8'/>}
            >
              <Meta title="GUINÉE MINING NEWS" description="" />
            </Card>
            <Card
              hoverable
              style={{ width: 300 }}
              cover={<Image width={300} height={500} src="/mining news button/bkminingnews.PNG" alt="Burkina Faso Mining News"  className='bg-black/90 p-8'/>}
            >
              <Meta title="BURKINA MINING NEWS" description="" />
            </Card>
          </div>
        </div>
    </div>
  )
}

export default MiningNews