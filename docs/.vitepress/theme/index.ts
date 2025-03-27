import { h } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import mediumZoom from 'medium-zoom';
import { onMounted, watch, nextTick } from 'vue';
import { useRoute } from 'vitepress';
import 'virtual:group-icons.css' 
import "./style/index.css"; //引入自定义的样式
import { NProgress } from 'nprogress-v2/dist/index.js' // 进度条组件
import 'nprogress-v2/dist/index.css' // 进度条样式
import Confetti from './components/Confetti.vue'
import MyLayout from './components/MyLayout.vue';
// 不蒜子
import { inBrowser } from 'vitepress' 
import busuanzi from 'busuanzi.pure.js'

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
    if (inBrowser) {
      NProgress.configure({ showSpinner: false })
      router.onBeforeRouteChange = () => {
        NProgress.start() // 开始进度条
      }
      router.onAfterRouteChange = () => {
         busuanzi.fetch()
         NProgress.done() // 停止进度条
       }
    }
  }
} satisfies Theme
