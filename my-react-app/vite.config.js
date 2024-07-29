import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  // Add the react plugin automatically to every js file in the project
  plugins: [react()],
  base: '/pages/dist/'
})
