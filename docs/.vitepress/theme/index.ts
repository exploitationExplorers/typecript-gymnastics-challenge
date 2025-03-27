import { h } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import mediumZoom from 'medium-zoom';
import { onMounted, watch, nextTick } from 'vue';
import { useRoute } from 'vitepress';
import 'virtual:group-icons.css' 
import "./style/index.css"; //引入自定义的样式
import Confetti from './components/Confetti.vue'
import tags from './components/layoutTag.vue'
import hTag from './components/hTag.vue'
import MyLayout from './components/MyLayout.vue';
import HomeSponsors from './components/HomeSponsors.vue'
export default {
  extends: DefaultTheme,
  setup() {
    const route = useRoute();
    const initZoom = () => {
      mediumZoom(".main img", { background: "var(--vp-c-bg)" }); 
    }
    onMounted(() => {
      initZoom();
    })
    watch(
      () => route.path, 
      () => {
      nextTick(() => {
        initZoom();
      })
    })
  },
  // Layout: () => {
  //   return h(DefaultTheme.Layout, null, {
  //     'doc-before': () => h(hTag),
  //   })
    
  // },
  Layout: MyLayout,
  enhanceApp({ app, router, siteData }) {
    app.component('Confetti', Confetti)
    // ...
  }
} satisfies Theme
