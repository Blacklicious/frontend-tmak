'use client'
import Hero from './Hero';
import Actuality from './Actuality';
import MiningNews from './MiningNews';
import Events from './Events';
import Newsletter from './Newsletter';
import Partenaire from './Partenaire';
import Head from 'next/head';
import Services from './Services';
import Footer from './Footer';

export default function Home() {
  return (
      <div className=" bg-yellow-500 ">
        < Hero />
        < Services />
        < Actuality />
        < MiningNews />
        < Events />
        < Partenaire />
        < Newsletter />
        < Footer />
      </div>
  );
};