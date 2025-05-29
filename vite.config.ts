import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";
import { resolve } from "path";
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    dts({
      tsconfigPath: "tsconfig.app.json",
      include: ["src/**/*.ts", "src/**/*.tsx"],
      rollupTypes: true, // 合并为单个文件（如 main.d.ts）
      copyDtsFiles: true,
    }),
  ],

  build: {
    minify: true,
    lib: {
      // 入口文件将包含可以由你的包的用户导入的导出：
      entry: resolve(__dirname, "src/build.ts"),
      name: "draggableModal",
      fileName: (format) => `draggableModal.${format}.js`,
    },
    rollupOptions: {
      input: ["src/build.ts"],
      // 确保外部化处理那些你不想打包进库的依赖
      external: [
        "react",
        "react-dom",
        "antd",
        "@ant-design/pro-components",
        "react/jsx-runtime",
      ],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          react: "React",
          "react-dom": "ReactDOM", // 改为标准命名
          antd: "antd",
          "@ant-design/pro-components": "ProComponents",
          "react/jsx-runtime": "jsxRuntime", // 添加jsx运行时
        },
      },
    },
  },
});
