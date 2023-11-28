
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
  const magazine = await fetch(`${backendUrl}/posts/api/magazines/${slug}`).then((res) => res.json())
 
  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || []
 
  return {
    title: magazine.title,
    openGraph: {
      images: [magazine.thumbnail, ...previousImages],
    },
  }
}
 

export default async function Page({ params, searchParams }: Props) {
	const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
	// fetch data
	const magazine = await fetch(`${backendUrl}/posts/api/magazines/${params.slug}`).then((res) => res.json())


	return (
			<div className='bg-white rounded-lg text-black h-[100vh]'>
			<iframe src={"https://docs.google.com/viewer?url=" + encodeURIComponent(magazine.file) + "&embedded=true"} width="100%" height="94%"></iframe>
    
				<h1 className='text-center w-full font font-bold text-2xl md:text-4xl p-6 mb-6 bg-black ring ring-yellow-500 ring-6 text-white rounded-b-xl'>{magazine.title}</h1>

			</div>
	)
};