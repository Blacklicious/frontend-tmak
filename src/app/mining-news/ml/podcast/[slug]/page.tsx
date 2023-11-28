
import type { Metadata, ResolvingMetadata } from 'next'
import Image from 'next/image';

type Props = {
  params: { slug: string }
  searchParams: { [key: string]: string | string[] | undefined }
}
 
export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  // read route params
  const slug = params.slug
 
  // fetch data
  const podcast = await fetch(`${backendUrl}/posts/api/podcasts/${slug}`).then((res) => res.json())
 
  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || []
 
  return {
    title: podcast.title,
    openGraph: {
      images: [podcast.file, ...previousImages],
    },
  }
}
 

export default async function Page({ params, searchParams }: Props) {
	const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
	// fetch data
	const podcast = await fetch(`${backendUrl}/posts/api/podcasts/${params.slug}`).then((res) => res.json())


	return (
		<>
			<div className='bg-white p-6 rounded-lg text-black'>
				<iframe
          width="560"
          height="315"
          src={`${podcast.link}`}
          title="YouTube video"
          allowFullScreen
        ></iframe>
				<h1 className='text-center w-full font font-bold text-2xl md:text-4xl p-6 mb-6 bg-black ring ring-yellow-500 ring-6 text-white rounded-b-xl'>{podcast.title}</h1>

				<div className='px-4 md:px-[18%]'>
					<div
						className='text-justify'
						style={{ whiteSpace: 'pre-wrap' }}
						dangerouslySetInnerHTML={{ __html: podcast.content }}
					>
					</div>
				</div>
			</div>
		</>
	)
};