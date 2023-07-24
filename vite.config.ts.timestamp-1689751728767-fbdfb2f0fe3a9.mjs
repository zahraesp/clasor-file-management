// vite.config.ts
import { resolve } from "node:path";
import react from "file:///C:/Users/Fanap_Soft_207/Desktop/clasor-file-management/node_modules/@vitejs/plugin-react/dist/index.mjs";
import { defineConfig } from "file:///C:/Users/Fanap_Soft_207/Desktop/clasor-file-management/node_modules/vite/dist/node/index.js";
import dts from "file:///C:/Users/Fanap_Soft_207/Desktop/clasor-file-management/node_modules/vite-plugin-dts/dist/index.mjs";
import EsLint from "file:///C:/Users/Fanap_Soft_207/Desktop/clasor-file-management/node_modules/vite-plugin-linter/dist/index.js";
import tsConfigPaths from "file:///C:/Users/Fanap_Soft_207/Desktop/clasor-file-management/node_modules/vite-tsconfig-paths/dist/index.mjs";

// package.json
var package_default = {
  name: "cls-file-management",
  private: false,
  version: "0.0.9",
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
    next: "^13.4.10",
    "prop-types": "^15.8.1",
    react: "16.8.0 || >=17.x",
    "react-dom": "16.8.0 || >=17.x",
    "react-file-icon": "^1.3.0",
    "react-hook-form": "^7.44.3",
    "react-image-crop": "^10.1.4",
    "react-toastify": "^9.1.3",
    rollup: "^3.25.0",
    "rollup-plugin-babel": "^4.4.0",
    "rollup-plugin-peer-deps-external": "^2.2.4",
    "rollup-plugin-postcss": "^4.0.2",
    "rollup-plugin-terser": "^7.0.2",
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
var __vite_injected_original_dirname = "C:\\Users\\Fanap_Soft_207\\Desktop\\clasor-file-management";
var { EsLinter, linterPlugin } = EsLint;
var vite_config_default = defineConfig((configEnv) => ({
  plugins: [
    react(),
    tsConfigPaths(),
    linterPlugin({
      include: ["./src}/**/*.{ts,tsx}"],
      linters: [new EsLinter({ configEnv })]
    }),
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAicGFja2FnZS5qc29uIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcRmFuYXBfU29mdF8yMDdcXFxcRGVza3RvcFxcXFxjbGFzb3ItZmlsZS1tYW5hZ2VtZW50XCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxGYW5hcF9Tb2Z0XzIwN1xcXFxEZXNrdG9wXFxcXGNsYXNvci1maWxlLW1hbmFnZW1lbnRcXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzL0ZhbmFwX1NvZnRfMjA3L0Rlc2t0b3AvY2xhc29yLWZpbGUtbWFuYWdlbWVudC92aXRlLmNvbmZpZy50c1wiO2ltcG9ydCB7IHJlc29sdmUgfSBmcm9tICdub2RlOnBhdGgnXHJcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCdcclxuaW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcclxuaW1wb3J0IGR0cyBmcm9tICd2aXRlLXBsdWdpbi1kdHMnXHJcbmltcG9ydCBFc0xpbnQgZnJvbSAndml0ZS1wbHVnaW4tbGludGVyJ1xyXG5pbXBvcnQgdHNDb25maWdQYXRocyBmcm9tICd2aXRlLXRzY29uZmlnLXBhdGhzJ1xyXG5pbXBvcnQgdGFpbHdpbmRjc3MgZnJvbSAndGFpbHdpbmRjc3MnO1xyXG5pbXBvcnQgcGFja2FnZUpzb24gZnJvbSAnLi9wYWNrYWdlLmpzb24nXHJcbmltcG9ydCBwbHVnaW4gZnJvbSAnQHZpdGVqcy9wbHVnaW4tcmVhY3QnXHJcbmNvbnN0IHsgRXNMaW50ZXIsIGxpbnRlclBsdWdpbiB9ID0gRXNMaW50XHJcbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXHJcblxyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoKGNvbmZpZ0VudikgPT4gKHtcclxuICBwbHVnaW5zOiBbXHJcbiAgICByZWFjdCgpLFxyXG4gICAgdHNDb25maWdQYXRocygpLFxyXG4gICAgbGludGVyUGx1Z2luKHtcclxuICAgICAgaW5jbHVkZTogWycuL3NyY30vKiovKi57dHMsdHN4fSddLFxyXG4gICAgICBsaW50ZXJzOiBbbmV3IEVzTGludGVyKHsgY29uZmlnRW52IH0pXSxcclxuICAgIH0pLFxyXG4gICAgZHRzKHtcclxuICAgICAgaW5jbHVkZTogWydzcmMvJ10sXHJcbiAgICB9KSxcclxuICBdLFxyXG5cclxuICBidWlsZDoge1xyXG4gICAgbGliOiB7XHJcbiAgICAgIGVudHJ5OiByZXNvbHZlKF9fZGlybmFtZSwgJ3NyYy9pbmRleC50cycpLFxyXG4gICAgICBuYW1lOiAnQ2xhc29yRmlsZU1hbmFnZW1lbnQnLFxyXG4gICAgICBmb3JtYXRzOiBbXCJlc1wiLCBcImNqc1wiXSxcclxuICAgICAgZmlsZU5hbWU6IChmb3JtYXQpID0+IGBpbmRleC4ke2Zvcm1hdH0uanNgLFxyXG4gICAgfSxcclxuICAgIHJvbGx1cE9wdGlvbnM6IHtcclxuICAgICAgZXh0ZXJuYWw6IFsuLi5PYmplY3Qua2V5cyhwYWNrYWdlSnNvbi5wZWVyRGVwZW5kZW5jaWVzKV0sXHJcbiAgICB9LFxyXG4gIH0sXHJcbn0pKSIsICJ7XHJcbiAgXCJuYW1lXCI6IFwiY2xzLWZpbGUtbWFuYWdlbWVudFwiLFxyXG4gIFwicHJpdmF0ZVwiOiBmYWxzZSxcclxuICBcInZlcnNpb25cIjogXCIwLjAuOVwiLFxyXG4gIFwidHlwZVwiOiBcIm1vZHVsZVwiLFxyXG4gIFwic2NyaXB0c1wiOiB7XHJcbiAgICBcImRldlwiOiBcInZpdGVcIixcclxuICAgIFwiYnVpbGRcIjogXCJ0c2MgJiYgdml0ZSBidWlsZFwiLFxyXG4gICAgXCJsaW50XCI6IFwiZXNsaW50IHNyYyAtLWV4dCB0cyx0c3ggLS1yZXBvcnQtdW51c2VkLWRpc2FibGUtZGlyZWN0aXZlcyAtLW1heC13YXJuaW5ncyAwXCIsXHJcbiAgICBcInByZXZpZXdcIjogXCJ2aXRlIHByZXZpZXdcIixcclxuICAgIFwiYnVpbGQ6Y3NzXCI6IFwidGFpbHdpbmRjc3MgLW8gZGlzdC9zdHlsZS5jc3MgLS1taW5pZnlcIlxyXG4gIH0sXHJcbiAgXCJmaWxlc1wiOiBbXHJcbiAgICBcInNyY1wiLFxyXG4gICAgXCJkaXN0XCJcclxuICBdLFxyXG4gIFwiZXhwb3J0c1wiOiB7XHJcbiAgICBcIi5cIjoge1xyXG4gICAgICBcImltcG9ydFwiOiBcIi4vZGlzdC9pbmRleC5lcy5qc1wiLFxyXG4gICAgICBcInJlcXVpcmVcIjogXCIuL2Rpc3QvaW5kZXguY2pzLmpzXCJcclxuICAgIH0sXHJcbiAgICBcIi4vZGlzdC9zdHlsZS5jc3NcIjoge1xyXG4gICAgICBcImltcG9ydFwiOiBcIi4vZGlzdC9zdHlsZS5jc3NcIixcclxuICAgICAgXCJyZXF1aXJlXCI6IFwiLi9kaXN0L3N0eWxlLmNzc1wiXHJcbiAgICB9XHJcbiAgfSxcclxuICBcIm1haW5cIjogXCIuL2Rpc3QvaW5kZXguY2pzLmpzXCIsXHJcbiAgXCJtb2R1bGVcIjogXCIuL2Rpc3QvaW5kZXguZXMuanNcIixcclxuICBcInR5cGluZ3NcIjogXCIuL2Rpc3QvaW5kZXguZC50c1wiLFxyXG4gIFwiZGVwZW5kZW5jaWVzXCI6IHtcclxuICAgIFwiY29tcHJlc3NvcmpzXCI6IFwiXjEuMi4xXCIsXHJcbiAgICBcIm1vbWVudC1qYWxhYWxpXCI6IFwiXjAuMTAuMFwiLFxyXG4gICAgXCJuZXh0XCI6IFwiXjEzLjQuMTBcIixcclxuICAgIFwicHJvcC10eXBlc1wiOiBcIl4xNS44LjFcIixcclxuICAgIFwicmVhY3RcIjogXCIxNi44LjAgfHwgPj0xNy54XCIsXHJcbiAgICBcInJlYWN0LWRvbVwiOiBcIjE2LjguMCB8fCA+PTE3LnhcIixcclxuICAgIFwicmVhY3QtZmlsZS1pY29uXCI6IFwiXjEuMy4wXCIsXHJcbiAgICBcInJlYWN0LWhvb2stZm9ybVwiOiBcIl43LjQ0LjNcIixcclxuICAgIFwicmVhY3QtaW1hZ2UtY3JvcFwiOiBcIl4xMC4xLjRcIixcclxuICAgIFwicmVhY3QtdG9hc3RpZnlcIjogXCJeOS4xLjNcIixcclxuICAgIFwicm9sbHVwXCI6IFwiXjMuMjUuMFwiLFxyXG4gICAgXCJyb2xsdXAtcGx1Z2luLWJhYmVsXCI6IFwiXjQuNC4wXCIsXHJcbiAgICBcInJvbGx1cC1wbHVnaW4tcGVlci1kZXBzLWV4dGVybmFsXCI6IFwiXjIuMi40XCIsXHJcbiAgICBcInJvbGx1cC1wbHVnaW4tcG9zdGNzc1wiOiBcIl40LjAuMlwiLFxyXG4gICAgXCJyb2xsdXAtcGx1Z2luLXRlcnNlclwiOiBcIl43LjAuMlwiLFxyXG4gICAgXCJ0YWlsd2luZGNzcy1ydGxcIjogXCJeMC45LjBcIixcclxuICAgIFwidml0ZS1wbHVnaW4tbGludGVyXCI6IFwiXjIuMC4yXCIsXHJcbiAgICBcInZpdGUtdHNjb25maWctcGF0aHNcIjogXCJeNC4yLjBcIlxyXG4gIH0sXHJcbiAgXCJkZXZEZXBlbmRlbmNpZXNcIjoge1xyXG4gICAgXCJAdHlwZXMvbW9tZW50LWphbGFhbGlcIjogXCJeMC43LjZcIixcclxuICAgIFwiQHR5cGVzL25vZGVcIjogXCJeMjAuMy4wXCIsXHJcbiAgICBcIkB0eXBlcy9yZWFjdFwiOiBcIl4xOC4wLjM3XCIsXHJcbiAgICBcIkB0eXBlcy9yZWFjdC1kb21cIjogXCJeMTguMC4xMVwiLFxyXG4gICAgXCJAdHlwZXMvcmVhY3QtZmlsZS1pY29uXCI6IFwiXjEuMC4xXCIsXHJcbiAgICBcIkB0eXBlc2NyaXB0LWVzbGludC9lc2xpbnQtcGx1Z2luXCI6IFwiXjUuNTkuMFwiLFxyXG4gICAgXCJAdHlwZXNjcmlwdC1lc2xpbnQvcGFyc2VyXCI6IFwiXjUuNTkuMFwiLFxyXG4gICAgXCJAdml0ZWpzL3BsdWdpbi1yZWFjdFwiOiBcIl40LjAuMFwiLFxyXG4gICAgXCJhdXRvcHJlZml4ZXJcIjogXCJeMTAuNC4xNFwiLFxyXG4gICAgXCJkYWlzeXVpXCI6IFwiXjMuMC4yM1wiLFxyXG4gICAgXCJlc2xpbnRcIjogXCJeOC4zOC4wXCIsXHJcbiAgICBcImVzbGludC1wbHVnaW4tcmVhY3QtaG9va3NcIjogXCJeNC42LjBcIixcclxuICAgIFwiZXNsaW50LXBsdWdpbi1yZWFjdC1yZWZyZXNoXCI6IFwiXjAuMy40XCIsXHJcbiAgICBcImVzbGludC1wbHVnaW4tdGFpbHdpbmRjc3NcIjogXCJeMy4xMi4xXCIsXHJcbiAgICBcInBvc3Rjc3NcIjogXCJeOC40LjI0XCIsXHJcbiAgICBcInRhaWx3aW5kY3NzXCI6IFwiXjMuMy4yXCIsXHJcbiAgICBcInR5cGVzY3JpcHRcIjogXCJeNS4wLjJcIixcclxuICAgIFwidml0ZVwiOiBcIl40LjMuOVwiLFxyXG4gICAgXCJ2aXRlLXBsdWdpbi1kdHNcIjogXCJeMi4zLjBcIlxyXG4gIH0sXHJcbiAgXCJwZWVyRGVwZW5kZW5jaWVzXCI6IHtcclxuICAgIFwicmVhY3RcIjogXCIxNi44LjAgfHwgPj0xNy54XCIsXHJcbiAgICBcInJlYWN0LWRvbVwiOiBcIjE2LjguMCB8fCA+PTE3LnhcIlxyXG4gIH0sXHJcbiAgXCJhdXRob3JcIjogXCJ6LmVzbWFlaWxwb3VyXCIsXHJcbiAgXCJsaWNlbnNlXCI6IFwiSVNDXCIsXHJcbiAgXCJkZXNjcmlwdGlvblwiOiBcIlwiXHJcbn1cclxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUE4VixTQUFTLGVBQWU7QUFDdFgsT0FBTyxXQUFXO0FBQ2xCLFNBQVMsb0JBQW9CO0FBQzdCLE9BQU8sU0FBUztBQUNoQixPQUFPLFlBQVk7QUFDbkIsT0FBTyxtQkFBbUI7OztBQ0wxQjtBQUFBLEVBQ0UsTUFBUTtBQUFBLEVBQ1IsU0FBVztBQUFBLEVBQ1gsU0FBVztBQUFBLEVBQ1gsTUFBUTtBQUFBLEVBQ1IsU0FBVztBQUFBLElBQ1QsS0FBTztBQUFBLElBQ1AsT0FBUztBQUFBLElBQ1QsTUFBUTtB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
