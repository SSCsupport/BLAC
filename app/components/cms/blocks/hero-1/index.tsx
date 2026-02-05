import { Container } from '#app/components/container.tsx'
import { cn } from '#app/utils/misc'
import { ParallaxHeading, ParallaxImage } from './parallax'

export const images = [
	{
		id: 1,
		src: '/images/hero/image-1.png',
		alt: '',
		width: 600,
		height: 500,
		scrollSpeed: -0.45,
		gridArea: cn(
			'hidden',
			'lg:col-start-1 lg:col-end-5 lg:row-start-10 lg:row-end-13 lg:-my-8 lg:-mr-8 lg:ml-4 lg:block lg:translate-y-2/3',
			'xl:mr-12',
		),
	},
	{
		id: 2,
		src: '/images/hero/image-1.png',
		alt: '',
		width: 450,
		height: 300,
		scrollSpeed: -0.25,
		gridArea: cn(
			'max-lg:min-w-88',
			'col-start-2 col-end-10 row-start-9 row-end-13 max-lg:translate-y-5/4',
			'lg:col-start-1 lg:col-end-5 lg:row-start-8 lg:row-end-11 lg:-my-4 lg:block',
			'xl:mr-12',
		),
	},
	{
		id: 3,
		src: '/images/hero/image-3.png',
		alt: '',
		width: 500,
		height: 350,
		scrollSpeed: -0.05,
		gridArea: cn(
			'max-lg:min-w-88',
			'col-start-5 col-end-13 row-start-6 row-end-9 max-lg:-mb-4 max-lg:-translate-x-4 max-lg:translate-y-12',
			'lg:col-start-9 lg:col-end-13 lg:row-start-7 lg:row-end-11 lg:mr-4',
		),
	},
	{
		id: 4,
		src: '/images/hero/image-3.png',
		alt: '',
		width: 450,
		height: 300,
		scrollSpeed: -0.35,
		gridArea: cn(
			'hidden',
			'',
			'xl:col-start-3 xl:col-end-7 xl:row-start-3 xl:row-end-7 xl:mx-8 xl:mt-4 xl:-mr-4 xl:block',
		),
	},
	{
		id: 5,
		src: '/images/hero/image-2.png',
		alt: '',
		width: 700,
		height: 450,
		scrollSpeed: -0.2,
		gridArea: cn(
			'z-20',
			'col-start-1 col-end-12 row-start-9 row-end-13 translate-y-8 max-lg:min-w-88',
			'lg:col-start-3 lg:col-end-11 lg:row-start-4 lg:row-end-10 lg:mt-16 lg:-translate-y-8',
			'xl:col-start-4 xl:col-end-10 xl:row-start-5 xl:row-end-10 xl:m-0',
		),
	},
	{
		id: 6,
		src: '/images/hero/image-4.png',
		alt: '',
		width: 550,
		height: 300,
		scrollSpeed: -0.15,
		gridArea: cn(
			'hidden lg:block',
			'lg:col-start-4 lg:col-end-10 lg:row-start-9 lg:row-end-13 lg:translate-y-16',
			'xl:mt-8 xl:ml-16 xl:-translate-x-16',
		),
	},
	{
		id: 7,
		src: '/images/hero/image-5.png',
		alt: '',
		width: 650,
		height: 400,
		scrollSpeed: 0.1,
		gridArea: cn(
			'max-lg:min-w-88',
			'col-start-5 col-end-13 row-start-3 row-end-6 max-lg:mt-2 max-lg:-mb-12 max-lg:-ml-12 max-lg:translate-y-8',
			'lg:col-start-8 lg:col-end-13 lg:row-start-1 lg:row-end-6 lg:mb-8',
		),
	},
]

export function HeroOne({
	headline,
	placholders,
	className,
}: {
	headline: string
	placholders?: { [K in `hero-image-${number}`]?: string }
	className?: string
}) {
	return (
		<div
			className={cn(
				'relative flex h-[calc(100svh-var(--header-height))] max-h-[1200px] flex-col justify-start pt-12 lg:pt-20',
				className,
			)}
		>
			<Container className="relative isolate min-h-0 flex-1 overflow-hidden max-sm:px-0">
				<div
					className={cn(
						'grid size-full gap-2 lg:gap-4',
						'grid-cols-12 grid-rows-12',
					)}
				>
					<ParallaxHeading
						headline={headline}
						className={cn(
							'relative z-100 self-start',
							'col-start-1 col-end-13 row-start-1 row-end-4 lg:col-end-7',
						)}
					/>

					{images?.map((image) => (
						<ParallaxImage
							key={image.id}
							image={image}
							placeholder={placholders?.[`hero-image-${image.id}`]}
						/>
					))}
				</div>
			</Container>
		</div>
	)
}
