import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
	resolve: {
		extensions: ['.vue', '.js', '.ts', '.jsx', '.tsx'],
	},
	server: {
		proxy: {
			'/api': {
				target: 'http://localhost:8081/',
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/api/, ''),
			},
		},
	},
	plugins: [vue()],
});
