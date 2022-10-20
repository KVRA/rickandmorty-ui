import Image from 'next/image';
import * as React from 'react';

import { getCharacters } from '@/lib/repositories/rickyandmortyapi';
import { ApiResponseCharacters, Character } from '@/lib/types/rickyandmortyapi';

import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';
import CharacterModal from '@/components/ui/CharacterModal';

/**
 * SVGR Support
 * Caveat: No React Props Type.
 *
 * You can override the next-env if the type is important to you
 * @see https://stackoverflow.com/questions/68103844/how-to-override-next-js-svg-module-declaration
 */

// !STARTERCONF -> Select !STARTERCONF and CMD + SHIFT + F
// Before you begin editing, follow all comments with `STARTERCONF`,
// to customize the default configuration.

export default function HomePage({
  characters: characters,
}: {
  characters: ApiResponseCharacters;
}) {
  return (
    <Layout>
      {/* <Seo templateTitle='Home' /> */}
      <Seo />

      <main>
        <section className='bg-white'>
          <h1 className='my-12 text-center font-light uppercase'>Characters</h1>
          <div className='flex flex-wrap '>
            {characters.results.map((character) => (
              <CharacterModal character={character} key={character.id}>
                <div className='m-2'>
                  <CharacterCard character={character} />
                </div>
              </CharacterModal>
            ))}
          </div>
        </section>
      </main>
    </Layout>
  );
}
export function CharacterCard({ character }: { character: Character }) {
  return (
    <div
      key={character.id}
      className='flex min-h-[18em] w-44 flex-col items-center rounded-xl bg-gradient-to-b from-[#232526] to-[#414345] px-2 py-2'
    >
      <div className='relative h-36 w-36'>
        <Image
          src={character.image}
          alt='Picture of the author'
          layout='fill' // required
          objectFit='cover'
          className='rounded-full'
        />
      </div>
      <h2 className='pt-2 text-center text-xl font-semibold uppercase text-white'>
        {character.name}
      </h2>
      <p className='text-center  text-sm text-muted'>
        {character.location.name}
      </p>
    </div>
  );
}

// server side props
export async function getServerSideProps() {
  // fetch data from an API
  const apiresponse = await getCharacters();
  // Pass data to the page via props
  return { props: { characters: apiresponse.data } };
}
