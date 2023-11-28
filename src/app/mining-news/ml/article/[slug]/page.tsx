
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
  const article = await fetch(`${backendUrl}/posts/api/articles/${slug}`).then((res) => res.json())
  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || []
 
  return {
    title: article.title,
    openGraph: {
      images: [article.file, ...previousImages],
    },
  }
}
 

export default async function Page({ params, searchParams }: Props) {
	const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
	// fetch data
	const article = await fetch(`${backendUrl}/posts/api/articles/${params.slug}`).then((res) => res.json())


	return (
		<>
			<div className='bg-white p-6 rounded-lg text-black'>
				{article.link && (
					<iframe
						className="w-full object-cover rounded-lg"
						width="560"
						height="615"
						src={`${article.link}`}
						title="YouTube video"
						allowFullScreen
					></iframe>
				)}
				{!article.link && (
					<Image
						className="image ring ring-yellow-500  rounded-t-xl"
						width="560"
						height="315"
						src={`${article.file}`}
						title={`${article.title}`}
						alt={`${article.title}`}
					/>

				)}
				<h1 className='text-center w-full font font-bold text-2xl md:text-4xl p-6 mb-6 bg-black ring ring-yellow-500 ring-6 text-white rounded-b-xl'>{article.title}</h1>

				<div className='px-4 md:px-[18%]'>
					<div
						className='text-justify'
						style={{ whiteSpace: 'pre-wrap' }}
						dangerouslySetInnerHTML={{ __html: article.content }}
					>
					</div>
				</div>
			</div>
		</>
	)
};