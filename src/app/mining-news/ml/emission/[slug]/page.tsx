
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
  const video = await fetch(`${backendUrl}/posts/api/videos/${slug}`).then((res) => res.json())
 
  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || []
 
  return {
    title: video.title,
    openGraph: {
      images: [video.thumbnail, ...previousImages],
    },
  }
}
 

export default async function Page({ params, searchParams }: Props) {
	const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
	// fetch data
	const video = await fetch(`${backendUrl}/posts/api/videos/${params.slug}`).then((res) => res.json())


	return (
			<div className='bg-white text-black flex flex-col h-[94vh]'>
        {video.link && (
          <iframe
            className="w-full h-full object-cover "
            width="560"
            height="615"
            src={`${video.link}`}
            title="YouTube video"
            allowFullScreen
          ></iframe>
        )}
        {!video.link && (
          <iframe
            className="w-full object-cover"
            width="560"
            height="615"
            src={`${video.file}`}
            title={`${video.title}`}
          />
        )}
				<h1 className='text-center w-full font font-bold text-2xl md:text-4xl p-6 mb-6 bg-black ring ring-yellow-500 ring-6 text-white '>{video.title}</h1>
			</div>
	)
};