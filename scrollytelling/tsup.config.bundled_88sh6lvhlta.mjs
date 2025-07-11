var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// tsup.config.ts
import { defineConfig } from "tsup";
import { ScssModulesPlugin } from "esbuild-scss-modules-plugin";
var fixGsapImportPlugin = {
  name: "fix-gsap-import",
  setup(build) {
    build.onEnd((result) => {
      var _a;
      (_a = result.outputFiles) == null ? void 0 : _a.forEach((file) => __async(this, null, function* () {
        if (file.path.endsWith(".js")) {
          Object.defineProperty(file, "text", {
            value: file.text.replace(
              "gsap/ScrollTrigger",
              "gsap/dist/ScrollTrigger"
            )
          });
        }
      }));
    });
  }
};
var tsup_config_default = defineConfig({
  esbuildPlugins: [fixGsapImportPlugin, ScssModulesPlugin()],
  banner: {
    js: `"use client";`
  },
  entry: {
    index: "./src/index.ts"
  },
  dts: true,
  format: ["cjs", "esm"],
  sourcemap: false,
  minify: false,
  treeshake: true,
  splitting: true,
  injectStyle: true,
  bundle: true
});
export {
  tsup_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidHN1cC5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9faW5qZWN0ZWRfZmlsZW5hbWVfXyA9IFwiL1VzZXJzL3dpc2RvbS9Eb2N1bWVudHMvMjAyNS9DSVAvc2Nyb2xseXRlbGxpbmcvYmFzZW1lbnQtc2Nyb2xseXRlbGxpbmcvc2Nyb2xseXRlbGxpbmcvdHN1cC5jb25maWcudHNcIjtjb25zdCBfX2luamVjdGVkX2Rpcm5hbWVfXyA9IFwiL1VzZXJzL3dpc2RvbS9Eb2N1bWVudHMvMjAyNS9DSVAvc2Nyb2xseXRlbGxpbmcvYmFzZW1lbnQtc2Nyb2xseXRlbGxpbmcvc2Nyb2xseXRlbGxpbmdcIjtjb25zdCBfX2luamVjdGVkX2ltcG9ydF9tZXRhX3VybF9fID0gXCJmaWxlOi8vL1VzZXJzL3dpc2RvbS9Eb2N1bWVudHMvMjAyNS9DSVAvc2Nyb2xseXRlbGxpbmcvYmFzZW1lbnQtc2Nyb2xseXRlbGxpbmcvc2Nyb2xseXRlbGxpbmcvdHN1cC5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tIFwidHN1cFwiO1xuaW1wb3J0IHsgU2Nzc01vZHVsZXNQbHVnaW4gfSBmcm9tIFwiZXNidWlsZC1zY3NzLW1vZHVsZXMtcGx1Z2luXCI7XG5cbmNvbnN0IGZpeEdzYXBJbXBvcnRQbHVnaW4gPSB7XG4gIG5hbWU6IFwiZml4LWdzYXAtaW1wb3J0XCIsXG4gIHNldHVwKGJ1aWxkOiBhbnkpIHtcbiAgICBidWlsZC5vbkVuZCgocmVzdWx0OiBhbnkpID0+IHtcbiAgICAgIHJlc3VsdC5vdXRwdXRGaWxlcz8uZm9yRWFjaChhc3luYyAoZmlsZTogYW55KSA9PiB7XG4gICAgICAgIGlmIChmaWxlLnBhdGguZW5kc1dpdGgoXCIuanNcIikpIHtcbiAgICAgICAgICAvLyBjaGFuZ2UgZ3NhcCBpbXBvcnQgdG8gcG9pbnQgdG8gdGhlIGNqcyBvbmUgaHR0cHM6Ly9ncmVlbnNvY2suY29tL2ZvcnVtcy90b3BpYy8yNjEwNC1udXh0LWdzYXBkcmFnZ2FibGUtY2Fubm90LXVzZS1pbXBvcnQtc3RhdGVtZW50LW91dHNpZGUtYS1tb2R1bGUvXG4gICAgICAgICAgLy8gYW5kIGh0dHBzOi8vZ2l0aHViLmNvbS9iYXNlbWVudHN0dWRpby9zY3JvbGx5dGVsbGluZy9pc3N1ZXMvMzNcbiAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZmlsZSwgXCJ0ZXh0XCIsIHtcbiAgICAgICAgICAgIHZhbHVlOiBmaWxlLnRleHQucmVwbGFjZShcbiAgICAgICAgICAgICAgXCJnc2FwL1Njcm9sbFRyaWdnZXJcIixcbiAgICAgICAgICAgICAgXCJnc2FwL2Rpc3QvU2Nyb2xsVHJpZ2dlclwiXG4gICAgICAgICAgICApLFxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIGVzYnVpbGRQbHVnaW5zOiBbZml4R3NhcEltcG9ydFBsdWdpbiwgU2Nzc01vZHVsZXNQbHVnaW4oKV0sXG4gIGJhbm5lcjoge1xuICAgIGpzOiBgXCJ1c2UgY2xpZW50XCI7YCxcbiAgfSxcbiAgZW50cnk6IHtcbiAgICBpbmRleDogXCIuL3NyYy9pbmRleC50c1wiLFxuICB9LFxuICBkdHM6IHRydWUsXG4gIGZvcm1hdDogW1wiY2pzXCIsIFwiZXNtXCJdLFxuICBzb3VyY2VtYXA6IGZhbHNlLFxuICBtaW5pZnk6IGZhbHNlLFxuICB0cmVlc2hha2U6IHRydWUsXG4gIHNwbGl0dGluZzogdHJ1ZSxcbiAgaW5qZWN0U3R5bGU6IHRydWUsXG4gIGJ1bmRsZTogdHJ1ZSxcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFnWixTQUFTLG9CQUFvQjtBQUM3YSxTQUFTLHlCQUF5QjtBQUVsQyxJQUFNLHNCQUFzQjtBQUFBLEVBQzFCLE1BQU07QUFBQSxFQUNOLE1BQU0sT0FBWTtBQUNoQixVQUFNLE1BQU0sQ0FBQyxXQUFnQjtBQU5qQztBQU9NLG1CQUFPLGdCQUFQLG1CQUFvQixRQUFRLENBQU8sU0FBYztBQUMvQyxZQUFJLEtBQUssS0FBSyxTQUFTLEtBQUssR0FBRztBQUc3QixpQkFBTyxlQUFlLE1BQU0sUUFBUTtBQUFBLFlBQ2xDLE9BQU8sS0FBSyxLQUFLO0FBQUEsY0FDZjtBQUFBLGNBQ0E7QUFBQSxZQUNGO0FBQUEsVUFDRixDQUFDO0FBQUEsUUFDSDtBQUFBLE1BQ0Y7QUFBQSxJQUNGLENBQUM7QUFBQSxFQUNIO0FBQ0Y7QUFFQSxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixnQkFBZ0IsQ0FBQyxxQkFBcUIsa0JBQWtCLENBQUM7QUFBQSxFQUN6RCxRQUFRO0FBQUEsSUFDTixJQUFJO0FBQUEsRUFDTjtBQUFBLEVBQ0EsT0FBTztBQUFBLElBQ0wsT0FBTztBQUFBLEVBQ1Q7QUFBQSxFQUNBLEtBQUs7QUFBQSxFQUNMLFFBQVEsQ0FBQyxPQUFPLEtBQUs7QUFBQSxFQUNyQixXQUFXO0FBQUEsRUFDWCxRQUFRO0FBQUEsRUFDUixXQUFXO0FBQUEsRUFDWCxXQUFXO0FBQUEsRUFDWCxhQUFhO0FBQUEsRUFDYixRQUFRO0FBQ1YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
