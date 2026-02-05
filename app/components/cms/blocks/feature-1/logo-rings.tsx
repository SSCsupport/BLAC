import { cn } from '#app/utils/misc.tsx'

export function LogoRings({ className }: { className?: string }) {
	return (
		<span
			className={cn(
				'border-primary grid size-284 place-content-center rounded-full border-64',
				className,
			)}
		>
			<span className="border-secondary block size-192 rounded-full border-64" />
		</span>
	)
}
