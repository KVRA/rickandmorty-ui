import { Dialog, Transition } from '@headlessui/react';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { Fragment, useEffect, useState } from 'react';

import { Character } from '@/lib/types/rickyandmortyapi';

import { CharacterCard } from '@/pages';

export default function CharacterModal({
  children,
  character,
}: {
  children: React.ReactNode;
  character: Character;
}) {
  const [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const [charactersUrlFromSamePlanet, setCharactersSamePlanet] = useState<
    string[]
  >([]);

  useEffect(() => {
    if (isOpen) {
      fetch(character.location.url)
        .then((response) => response.json())
        .then((data) => setCharactersSamePlanet(data.residents));
    }
  }, [character, isOpen]);

  return (
    <>
      <button type='button' onClick={openModal} className=''>
        {children}
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as='div' className='relative z-10' onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='fixed inset-0 bg-black bg-opacity-25' />
          </Transition.Child>

          <div className='fixed inset-0 overflow-y-auto'>
            <div className='flex min-h-full items-center justify-center p-4 text-center'>
              <Transition.Child
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0 scale-95'
                enterTo='opacity-100 scale-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100 scale-100'
                leaveTo='opacity-0 scale-95'
              >
                <Dialog.Panel className='w-full max-w-md transform overflow-hidden rounded-2xl bg-black p-6 text-left align-middle shadow-xl transition-all'>
                  <div className='relative mx-auto h-52 w-52'>
                    <Image
                      src={character.image}
                      alt='Picture of the author'
                      layout='fill' // required
                      objectFit='cover'
                      className='rounded-xl text-center'
                    />
                  </div>
                  <h2 className='pt-2 text-center text-xl font-semibold uppercase text-white'>
                    {character.name}
                  </h2>
                  <hr className='my-4 border-white'></hr>
                  <p className='text-center  text-sm text-muted'>
                    {character.location.name}
                  </p>
                  <p className='mt-4 text-left text-sm text-muted'>
                    Personages que tambien estan en {character.location.name}:
                  </p>
                  <div className='mx-auto flex flex-wrap justify-between'>
                    {charactersUrlFromSamePlanet.map((character) => (
                      <CharacterCardByUrl url={character} key={character} />
                    ))}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

function CharacterCardByUrl({ url }: { url: string }) {
  function getCharacterByUrl(url: string) {
    return fetch(url).then((response) => response.json());
  }
  function getCharacterByQuery({
    queryKey,
  }: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    queryKey: any;
  }): Promise<Character> {
    return getCharacterByUrl(queryKey[1]);
  }

  // TODO: do a react-query for 'getCharactersByLocale' that will parse all characters ids and request all of them in on request
  const query = useQuery(['character', url], getCharacterByQuery, {
    enabled: !!url,
    staleTime: Infinity,
  });

  return query.isFetched && query.data ? (
    <div className='m-2'>
      <CharacterCard character={query.data} />
    </div>
  ) : (
    <div className='m-2 min-h-[18em] w-44 animate-pulse rounded bg-slate-300'></div>
  );
}
