import { unstable_reactRouterRSC } from '@react-router/dev/vite'
import tailwindcss from '@tailwindcss/vite'
import rsc from '@vitejs/plugin-rsc'
import { defineConfig } from 'vite'
import { denyImports } from 'vite-env-only'
import { iconsSpritesheet } from 'vite-plugin-icons-spritesheet'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
	plugins: [
		unstable_reactRouterRSC(),
		rsc(),
		tailwindcss(),
		tsconfigPaths(),
		iconsSpritesheet({
			inputDir: './other/svg-icons',
			outputDir: './app/components/ui/icons',
			fileName: 'sprite.svg',
			withTypes: true,
			iconNameTransformer: (name) => name,
		}),
		denyImports({
			client: { files: ['**/.server/*', '**/*.server.*'] },
		}),
	],
	ssr: {
		noExternal: ['posthog-js', 'posthog-js/react'],
	},
	build: {
		rollupOptions: {
			external: ['virtual:react-router/server-build'],
		},
	},
})
