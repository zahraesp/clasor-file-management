// vite.config.ts
import { resolve } from "node:path";
import react from "file:///D:/projects/clasor-file-management/node_modules/@vitejs/plugin-react/dist/index.mjs";
import { defineConfig } from "file:///D:/projects/clasor-file-management/node_modules/vite/dist/node/index.js";
import dts from "file:///D:/projects/clasor-file-management/node_modules/vite-plugin-dts/dist/index.mjs";
import tsConfigPaths from "file:///D:/projects/clasor-file-management/node_modules/vite-tsconfig-paths/dist/index.mjs";

// package.json
var package_default = {
  name: "cls-file-management",
  private: false,
  version: "0.4.1",
  type: "module",
  scripts: {
    dev: "vite",
    build: "tsc && vite build",
    lint: "eslint src --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    preview: "vite preview",
    "build:css": "tailwindcss -o dist/style.css --minify"
  },
  files: [
    "src",
    "dist"
  ],
  exports: {
    ".": {
      import: "./dist/index.es.js",
      require: "./dist/index.cjs.js"
    },
    "./dist/style.css": {
      import: "./dist/style.css",
      require: "./dist/style.css"
    }
  },
  main: "./dist/index.cjs.js",
  module: "./dist/index.es.js",
  typings: "./dist/index.d.ts",
  dependencies: {
    compressorjs: "^1.2.1",
    "moment-jalaali": "^0.10.0",
    "prop-types": "^15.8.1",
    react: "16.8.0 || >=17.x",
    "react-dom": "16.8.0 || >=17.x",
    "react-file-icon": "^1.3.0",
    "react-hook-form": "^7.44.3",
    "react-image-crop": "^10.1.4",
    "react-intersection-observer": "^9.5.2",
    "react-toastify": "^9.1.3",
    rollup: "^3.25.0",
    "rollup-plugin-babel": "^4.4.0",
    "rollup-plugin-peer-deps-external": "^2.2.4",
    "rollup-plugin-postcss": "^4.0.2",
    "rollup-plugin-terser": "^7.0.2",
    "shepherd.js": "^13.0.1",
    "tailwindcss-rtl": "^0.9.0",
    "vite-plugin-linter": "^2.0.2",
    "vite-tsconfig-paths": "^4.2.0"
  },
  devDependencies: {
    "@types/moment-jalaali": "^0.7.6",
    "@types/node": "^20.3.0",
    "@types/react": "^18.0.37",
    "@types/react-dom": "^18.0.11",
    "@types/react-file-icon": "^1.0.1",
    "@typescript-eslint/eslint-plugin": "^5.59.0",
    "@typescript-eslint/parser": "^5.59.0",
    "@vitejs/plugin-react": "^4.0.0",
    autoprefixer: "^10.4.14",
    daisyui: "^3.0.23",
    eslint: "^8.38.0",
    "eslint-plugin-react-hooks": "^4.6.0",
    "eslint-plugin-react-refresh": "^0.3.4",
    "eslint-plugin-tailwindcss": "^3.12.1",
    postcss: "^8.4.24",
    tailwindcss: "^3.3.2",
    typescript: "^5.0.2",
    vite: "^4.3.9",
    "vite-plugin-dts": "^2.3.0"
  },
  peerDependencies: {
    react: "16.8.0 || >=17.x",
    "react-dom": "16.8.0 || >=17.x"
  },
  author: "z.esmaeilpour",
  license: "ISC",
  description: ""
};

// vite.config.ts
var __vite_injected_original_dirname = "D:\\projects\\clasor-file-management";
var vite_config_default = defineConfig((configEnv) => ({
  plugins: [
    react(),
    tsConfigPaths(),
    // linterPlugin({
    //   include: ['./src}/**/*.{ts,tsx}'],
    //   linters: [new EsLinter({ configEnv })],
    // }),
    dts({
      include: ["src/"]
    })
  ],
  build: {
    lib: {
      entry: resolve(__vite_injected_original_dirname, "src/index.ts"),
      name: "ClasorFileManagement",
      formats: ["es", "cjs"],
      fileName: (format) => `index.${format}.js`
    },
    rollupOptions: {
      external: [...Object.keys(package_default.peerDependencies)]
    }
  }
}));
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAicGFja2FnZS5qc29uIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRDpcXFxccHJvamVjdHNcXFxcY2xhc29yLWZpbGUtbWFuYWdlbWVudFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxccHJvamVjdHNcXFxcY2xhc29yLWZpbGUtbWFuYWdlbWVudFxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovcHJvamVjdHMvY2xhc29yLWZpbGUtbWFuYWdlbWVudC92aXRlLmNvbmZpZy50c1wiO2ltcG9ydCB7IHJlc29sdmUgfSBmcm9tICdub2RlOnBhdGgnXG5pbXBvcnQgcmVhY3QgZnJvbSAnQHZpdGVqcy9wbHVnaW4tcmVhY3QnXG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJ1xuaW1wb3J0IGR0cyBmcm9tICd2aXRlLXBsdWdpbi1kdHMnXG4vLyBpbXBvcnQgRXNMaW50IGZyb20gJ3ZpdGUtcGx1Z2luLWxpbnRlcidcbmltcG9ydCB0c0NvbmZpZ1BhdGhzIGZyb20gJ3ZpdGUtdHNjb25maWctcGF0aHMnXG5pbXBvcnQgdGFpbHdpbmRjc3MgZnJvbSAndGFpbHdpbmRjc3MnO1xuaW1wb3J0IHBhY2thZ2VKc29uIGZyb20gJy4vcGFja2FnZS5qc29uJ1xuaW1wb3J0IHBsdWdpbiBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCdcbi8vIGNvbnN0IHsgRXNMaW50ZXIsIGxpbnRlclBsdWdpbiB9ID0gRXNMaW50XG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoKGNvbmZpZ0VudikgPT4gKHtcbiAgcGx1Z2luczogW1xuICAgIHJlYWN0KCksXG4gICAgdHNDb25maWdQYXRocygpLFxuICAgIC8vIGxpbnRlclBsdWdpbih7XG4gICAgLy8gICBpbmNsdWRlOiBbJy4vc3JjfS8qKi8qLnt0cyx0c3h9J10sXG4gICAgLy8gICBsaW50ZXJzOiBbbmV3IEVzTGludGVyKHsgY29uZmlnRW52IH0pXSxcbiAgICAvLyB9KSxcbiAgICBkdHMoe1xuICAgICAgaW5jbHVkZTogWydzcmMvJ10sXG4gICAgfSksXG4gIF0sXG5cbiAgYnVpbGQ6IHtcbiAgICBsaWI6IHtcbiAgICAgIGVudHJ5OiByZXNvbHZlKF9fZGlybmFtZSwgJ3NyYy9pbmRleC50cycpLFxuICAgICAgbmFtZTogJ0NsYXNvckZpbGVNYW5hZ2VtZW50JyxcbiAgICAgIGZvcm1hdHM6IFtcImVzXCIsIFwiY2pzXCJdLFxuICAgICAgZmlsZU5hbWU6IChmb3JtYXQpID0+IGBpbmRleC4ke2Zvcm1hdH0uanNgLFxuICAgIH0sXG4gICAgcm9sbHVwT3B0aW9uczoge1xuICAgICAgZXh0ZXJuYWw6IFsuLi5PYmplY3Qua2V5cyhwYWNrYWdlSnNvbi5wZWVyRGVwZW5kZW5jaWVzKV0sXG4gICAgfSxcbiAgfSxcbn0pKSIsICJ7XHJcbiAgXCJuYW1lXCI6IFwiY2xzLWZpbGUtbWFuYWdlbWVudFwiLFxyXG4gIFwicHJpdmF0ZVwiOiBmYWxzZSxcclxuICBcInZlcnNpb25cIjogXCIwLjQuMVwiLFxyXG4gIFwidHlwZVwiOiBcIm1vZHVsZVwiLFxyXG4gIFwic2NyaXB0c1wiOiB7XHJcbiAgICBcImRldlwiOiBcInZpdGVcIixcclxuICAgIFwiYnVpbGRcIjogXCJ0c2MgJiYgdml0ZSBidWlsZFwiLFxyXG4gICAgXCJsaW50XCI6IFwiZXNsaW50IHNyYyAtLWV4dCB0cyx0c3ggLS1yZXBvcnQtdW51c2VkLWRpc2FibGUtZGlyZWN0aXZlcyAtLW1heC13YXJuaW5ncyAwXCIsXHJcbiAgICBcInByZXZpZXdcIjogXCJ2aXRlIHByZXZpZXdcIixcclxuICAgIFwiYnVpbGQ6Y3NzXCI6IFwidGFpbHdpbmRjc3MgLW8gZGlzdC9zdHlsZS5jc3MgLS1taW5pZnlcIlxyXG4gIH0sXHJcbiAgXCJmaWxlc1wiOiBbXHJcbiAgICBcInNyY1wiLFxyXG4gICAgXCJkaXN0XCJcclxuICBdLFxyXG4gIFwiZXhwb3J0c1wiOiB7XHJcbiAgICBcIi5cIjoge1xyXG4gICAgICBcImltcG9ydFwiOiBcIi4vZGlzdC9pbmRleC5lcy5qc1wiLFxyXG4gICAgICBcInJlcXVpcmVcIjogXCIuL2Rpc3QvaW5kZXguY2pzLmpzXCJcclxuICAgIH0sXHJcbiAgICBcIi4vZGlzdC9zdHlsZS5jc3NcIjoge1xyXG4gICAgICBcImltcG9ydFwiOiBcIi4vZGlzdC9zdHlsZS5jc3NcIixcclxuICAgICAgXCJyZXF1aXJlXCI6IFwiLi9kaXN0L3N0eWxlLmNzc1wiXHJcbiAgICB9XHJcbiAgfSxcclxuICBcIm1haW5cIjogXCIuL2Rpc3QvaW5kZXguY2pzLmpzXCIsXHJcbiAgXCJtb2R1bGVcIjogXCIuL2Rpc3QvaW5kZXguZXMuanNcIixcclxuICBcInR5cGluZ3NcIjogXCIuL2Rpc3QvaW5kZXguZC50c1wiLFxyXG4gIFwiZGVwZW5kZW5jaWVzXCI6IHtcclxuICAgIFwiY29tcHJlc3NvcmpzXCI6IFwiXjEuMi4xXCIsXHJcbiAgICBcIm1vbWVudC1qYWxhYWxpXCI6IFwiXjAuMTAuMFwiLFxyXG4gICAgXCJwcm9wLXR5cGVzXCI6IFwiXjE1LjguMVwiLFxyXG4gICAgXCJyZWFjdFwiOiBcIjE2LjguMCB8fCA+PTE3LnhcIixcclxuICAgIFwicmVhY3QtZG9tXCI6IFwiMTYuOC4wIHx8ID49MTcueFwiLFxyXG4gICAgXCJyZWFjdC1maWxlLWljb25cIjogXCJeMS4zLjBcIixcclxuICAgIFwicmVhY3QtaG9vay1mb3JtXCI6IFwiXjcuNDQuM1wiLFxyXG4gICAgXCJyZWFjdC1pbWFnZS1jcm9wXCI6IFwiXjEwLjEuNFwiLFxyXG4gICAgXCJyZWFjdC1pbnRlcnNlY3Rpb24tb2JzZXJ2ZXJcIjogXCJeOS41LjJcIixcclxuICAgIFwicmVhY3QtdG9hc3RpZnlcIjogXCJeOS4xLjNcIixcclxuICAgIFwicm9sbHVwXCI6IFwiXjMuMjUuMFwiLFxyXG4gICAgXCJyb2xsdXAtcGx1Z2luLWJhYmVsXCI6IFwiXjQuNC4wXCIsXHJcbiAgICBcInJvbGx1cC1wbHVnaW4tcGVlci1kZXBzLWV4dGVybmFsXCI6IFwiXjIuMi40XCIsXHJcbiAgICBcInJvbGx1cC1wbHVnaW4tcG9zdGNzc1wiOiBcIl40LjAuMlwiLFxyXG4gICAgXCJyb2xsdXAtcGx1Z2luLXRlcnNlclwiOiBcIl43LjAuMlwiLFxyXG4gICAgXCJzaGVwaGVyZC5qc1wiOiBcIl4xMy4wLjFcIixcclxuICAgIFwidGFpbHdpbmRjc3MtcnRsXCI6IFwiXjAuOS4wXCIsXHJcbiAgICBcInZpdGUtcGx1Z2luLWxpbnRlclwiOiBcIl4yLjAuMlwiLFxyXG4gICAgXCJ2aXRlLXRzY29uZmlnLXBhdGhzXCI6IFwiXjQuMi4wXCJcclxuICB9LFxyXG4gIFwiZGV2RGVwZW5kZW5jaWVzXCI6IHtcclxuICAgIFwiQHR5cGVzL21vbWVudC1qYWxhYWxpXCI6IFwiXjAuNy42XCIsXHJcbiAgICBcIkB0eXBlcy9ub2RlXCI6IFwiXjIwLjMuMFwiLFxyXG4gICAgXCJAdHlwZXMvcmVhY3RcIjogXCJeMTguMC4zN1wiLFxyXG4gICAgXCJAdHlwZXMvcmVhY3QtZG9tXCI6IFwiXjE4LjAuMTFcIixcclxuICAgIFwiQHR5cGVzL3JlYWN0LWZpbGUtaWNvblwiOiBcIl4xLjAuMVwiLFxyXG4gICAgXCJAdHlwZXNjcmlwdC1lc2xpbnQvZXNsaW50LXBsdWdpblwiOiBcIl41LjU5LjBcIixcclxuICAgIFwiQHR5cGVzY3JpcHQtZXNsaW50L3BhcnNlclwiOiBcIl41LjU5LjBcIixcclxuICAgIFwiQHZpdGVqcy9wbHVnaW4tcmVhY3RcIjogXCJeNC4wLjBcIixcclxuICAgIFwiYXV0b3ByZWZpeGVyXCI6IFwiXjEwLjQuMTRcIixcclxuICAgIFwiZGFpc3l1aVwiOiBcIl4zLjAuMjNcIixcclxuICAgIFwiZXNsaW50XCI6IFwiXjguMzguMFwiLFxyXG4gICAgXCJlc2xpbnQtcGx1Z2luLXJlYWN0LWhvb2tzXCI6IFwiXjQuNi4wXCIsXHJcbiAgICBcImVzbGludC1wbHVnaW4tcmVhY3QtcmVmcmVzaFwiOiBcIl4wLjMuNFwiLFxyXG4gICAgXCJlc2xpbnQtcGx1Z2luLXRhaWx3aW5kY3NzXCI6IFwiXjMuMTIuMVwiLFxyXG4gICAgXCJwb3N0Y3NzXCI6IFwiXjguNC4yNFwiLFxyXG4gICAgXCJ0YWlsd2luZGNzc1wiOiBcIl4zLjMuMlwiLFxyXG4gICAgXCJ0eXBlc2NyaXB0XCI6IFwiXjUuMC4yXCIsXHJcbiAgICBcInZpdGVcIjogXCJeNC4zLjlcIixcclxuICAgIFwidml0ZS1wbHVnaW4tZHRzXCI6IFwiXjIuMy4wXCJcclxuICB9LFxyXG4gIFwicGVlckRlcGVuZGVuY2llc1wiOiB7XHJcbiAgICBcInJlYWN0XCI6IFwiMTYuOC4wIHx8ID49MTcueFwiLFxyXG4gICAgXCJyZWFjdC1kb21cIjogXCIxNi44LjAgfHwgPj0xNy54XCJcclxuICB9LFxyXG4gIFwiYXV0aG9yXCI6IFwiei5lc21hZWlscG91clwiLFxyXG4gIFwibGljZW5zZVwiOiBcIklTQ1wiLFxyXG4gIFwiZGVzY3JpcHRpb25cIjogXCJcIlxyXG59XHJcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBOFIsU0FBUyxlQUFlO0FBQ3RULE9BQU8sV0FBVztBQUNsQixTQUFTLG9CQUFvQjtBQUM3QixPQUFPLFNBQVM7QUFFaEIsT0FBTyxtQkFBbUI7OztBQ0wxQjtBQUFBLEVBQ0UsTUFBUTtBQUFBLEVBQ1IsU0FBVztBQUFBLEVBQ1gsU0FBVztBQUFBLEVBQ1gsTUFBUTtBQUFBLEVBQ1IsU0FBVztBQUFBLElBQ1QsS0FBTztBQUFBLElBQ1AsT0FBUztBQUFBLElBQ1QsTUFBUTtBQUFBLElBQ1IsU0FBVztBQUFBLElBQ1gsYUFBYTtBQUFBLEVBQ2Y7QUFBQSxFQUNBLE9BQVM7QUFBQSxJQUNQO0FBQUEsSUFDQTtBQUFBLEVBQ0Y7QUFBQSxFQUNBLFNBQVc7QUFBQSxJQUNULEtBQUs7QUFBQSxNQUNILFFBQVU7QUFBQSxNQUNWLFNBQVc7QUFBQSxJQUNiO0FBQUEsSUFDQSxvQkFBb0I7QUFBQSxNQUNsQixRQUFVO0FBQUEsTUFDVixTQUFXO0FBQUEsSUFDYjtBQUFBLEVBQ0Y7QUFBQSxFQUNBLE1BQVE7QUFBQSxFQUNSLFFBQVU7QUFBQSxFQUNWLFNBQVc7QUFBQSxFQUNYLGNBQWdCO0FBQUEsSUFDZCxjQUFnQjtBQUFBLElBQ2hCLGtCQUFrQjtBQUFBLElBQ2xCLGNBQWM7QUFBQSxJQUNkLE9BQVM7QUFBQSxJQUNULGFBQWE7QUFBQSxJQUNiLG1CQUFtQjtBQUFBLElBQ25CLG1CQUFtQjtBQUFBLElBQ25CLG9CQUFvQjtBQUFBLElBQ3BCLCtCQUErQjtBQUFBLElBQy9CLGtCQUFrQjtBQUFBLElBQ2xCLFFBQVU7QUFBQSxJQUNWLHVCQUF1QjtBQUFBLElBQ3ZCLG9DQUFvQztBQUFBLElBQ3BDLHlCQUF5QjtBQUFBLElBQ3pCLHdCQUF3QjtBQUFBLElBQ3hCLGVBQWU7QUFBQSxJQUNmLG1CQUFtQjtBQUFBLElBQ25CLHNCQUFzQjtBQUFBLElBQ3RCLHVCQUF1QjtBQUFBLEVBQ3pCO0FBQUEsRUFDQSxpQkFBbUI7QUFBQSxJQUNqQix5QkFBeUI7QUFBQSxJQUN6QixlQUFlO0FBQUEsSUFDZixnQkFBZ0I7QUFBQSxJQUNoQixvQkFBb0I7QUFBQSxJQUNwQiwwQkFBMEI7QUFBQSxJQUMxQixvQ0FBb0M7QUFBQSxJQUNwQyw2QkFBNkI7QUFBQSxJQUM3Qix3QkFBd0I7QUFBQSxJQUN4QixjQUFnQjtBQUFBLElBQ2hCLFNBQVc7QUFBQSxJQUNYLFFBQVU7QUFBQSxJQUNWLDZCQUE2QjtBQUFBLElBQzdCLCtCQUErQjtBQUFBLElBQy9CLDZCQUE2QjtBQUFBLElBQzdCLFNBQVc7QUFBQSxJQUNYLGFBQWU7QUFBQSxJQUNmLFlBQWM7QUFBQSxJQUNkLE1BQVE7QUFBQSxJQUNSLG1CQUFtQjtBQUFBLEVBQ3JCO0FBQUEsRUFDQSxrQkFBb0I7QUFBQSxJQUNsQixPQUFTO0FBQUEsSUFDVCxhQUFhO0FBQUEsRUFDZjtBQUFBLEVBQ0EsUUFBVTtBQUFBLEVBQ1YsU0FBVztBQUFBLEVBQ1gsYUFBZTtBQUNqQjs7O0FEOUVBLElBQU0sbUNBQW1DO0FBWXpDLElBQU8sc0JBQVEsYUFBYSxDQUFDLGVBQWU7QUFBQSxFQUMxQyxTQUFTO0FBQUEsSUFDUCxNQUFNO0FBQUEsSUFDTixjQUFjO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxJQUtkLElBQUk7QUFBQSxNQUNGLFNBQVMsQ0FBQyxNQUFNO0FBQUEsSUFDbEIsQ0FBQztBQUFBLEVBQ0g7QUFBQSxFQUVBLE9BQU87QUFBQSxJQUNMLEtBQUs7QUFBQSxNQUNILE9BQU8sUUFBUSxrQ0FBVyxjQUFjO0FBQUEsTUFDeEMsTUFBTTtBQUFBLE1BQ04sU0FBUyxDQUFDLE1BQU0sS0FBSztBQUFBLE1BQ3JCLFVBQVUsQ0FBQyxXQUFXLFNBQVMsTUFBTTtBQUFBLElBQ3ZDO0FBQUEsSUFDQSxlQUFlO0FBQUEsTUFDYixVQUFVLENBQUMsR0FBRyxPQUFPLEtBQUssZ0JBQVksZ0JBQWdCLENBQUM7QUFBQSxJQUN6RDtBQUFBLEVBQ0Y7QUFDRixFQUFFOyIsCiAgIm5hbWVzIjogW10KfQo=
