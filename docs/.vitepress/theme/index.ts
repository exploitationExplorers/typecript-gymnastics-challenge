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
import Mouse from './components/Mouse.vue';
import MouseFollower from './components/MouseFollower.vue';
// 不蒜子
import { inBrowser } from 'vitepress' 
import busuanzi from 'busuanzi.pure.js'
import { 
  NolebaseGitChangelogPlugin 
} from '@nolebase/vitepress-plugin-git-changelog/client'

import '@nolebase/vitepress-plugin-git-changelog/client/style.css'
// 彩虹背景动画样式
let homePageStyle: HTMLStyleElement | undefined

export default {
  extends: DefaultTheme,
  setup() {
    const route = useRoute();
    const initZoom = () => {
      // mediumZoom('[data-zoomable]', { background: 'var(--vp-c-bg)' }); // 默认
      mediumZoom('.main img', { background: 'var(--vp-c-bg)' }); // 不显式添加{data-zoomable}的情况下为所有图像启用此功能
    };
    onMounted(() => {
      initZoom();
    });
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
    app.use(NolebaseGitChangelogPlugin)
    app.component('Confetti', Confetti)
    app.component('Mouse', Mouse)  // 鼠标粒子效果
    app.component('MouseFollower', MouseFollower)  // 鼠标跟随效果
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

    // 彩虹背景动画样式
    if (typeof window !== 'undefined') {
      watch(
        () => router.route.data.relativePath,
        () => updateHomePageStyle(location.pathname === '/'),
        { immediate: true },
      )
    }
  }
} satisfies Theme



function updateHomePageStyle(value: boolean) {
  if (value) {
    if (homePageStyle) return

    homePageStyle = document.createElement('style')
    homePageStyle.innerHTML = `
    :root {
      animation: rainbow 12s linear infinite;
    }`
    document.body.appendChild(homePageStyle)
  } else {
    if (!homePageStyle) return

    homePageStyle.remove()
    homePageStyle = undefined
  }
}