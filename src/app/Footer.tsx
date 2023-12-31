import React from 'react'
import { FacebookOutlined, LinkedinOutlined, InstagramOutlined, YoutubeOutlined } from '@ant-design/icons';
import Image from 'next/image';

const Footer  = () => {
  return (
    <div className="global-footer bg-gray-800 text-white p-6 w-[100vw]">
			<div className="  py-4 ">
				<div className="flex flex-wrap justify-center">
					<nav role="navigation" aria-labelledby="block-footer-menu" id="block-footer" className="  w-full md:w-3/4">
						<ul className="text-xl grid grid-cols-2 sm:grid-cols-5 social-follow justify-center w-[100%] p-6  border-b-2 border-gray-600">
							<li>
									<a href="https://www.facebook.com/tmakeventmali" target="_blank" rel="noreferrer" className='flex items-center justify-center'>
											<FacebookOutlined className='text-4xl m-3'/> Facebook
									</a>
							</li>
							<li>
									<a href="https://twitter.com/yourcompany" target="_blank" rel="noreferrer" className='flex items-center justify-center m-3' >
											
									<Image src="/logos/twitter-x(1).svg" alt="Twitter" width={50} height={25} style={{fontWeight: 'bold', color: 'white'}} /> Twitter
									</a>
							</li>
							<li>
									<a href="https://www.linkedin.com/company/t-mak/?viewAsMember=true" target="_blank" rel="noreferrer" className='flex items-center justify-center'>
											<LinkedinOutlined className='text-4xl m-3'/> LinkedIn
									</a>
							</li>
							<li>
									<a href="https://www.instagram.com/yourcompany" target="_blank" rel="noreferrer" className='flex items-center justify-center'>
											<InstagramOutlined className='text-4xl m-3'/> Instagram
									</a>
							</li>
							<li>
									<a href="https://www.youtube.com/@t-makmali2915" target="_blank" rel="noreferrer" className='flex items-center justify-center'>
											<YoutubeOutlined className='text-4xl m-3'/> Youtube
									</a>
							</li>
						</ul>
						<ul className="grid grid-cols-3 text-center p-6 text-md ">
							<li>© 2023 T-MAK Corporation</li>
							<li><a href="/privacy-policy">Privacy Policy</a></li>
							<li><a href="/terms-service">Terms of Service</a></li>
						</ul>
					</nav>         
				</div>
			</div>
		</div>
  )  
}

export default Footer;
