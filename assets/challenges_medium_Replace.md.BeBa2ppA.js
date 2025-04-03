import{_ as l,C as i,c as p,o as k,j as a,a2 as r,G as e,a as d,t as o}from"./chunks/framework.DVAAUgfZ.js";const u=JSON.parse('{"title":"实现Replace","description":"","frontmatter":{"title":"实现Replace"},"headers":[],"relativePath":"challenges/medium/Replace.md","filePath":"challenges/medium/Replace.md"}'),F={name:"challenges/medium/Replace.md"},g={id:"frontmatter-title",tabindex:"-1"};function c(t,s,y,E,C,m){const n=i("NolebaseGitContributors"),h=i("NolebaseGitChangelog");return k(),p("div",null,[a("h1",g,[d(o(t.$frontmatter.title)+" ",1),s[0]||(s[0]=a("a",{class:"header-anchor",href:"#frontmatter-title","aria-label":'Permalink to "{{ $frontmatter.title }}"'},"​",-1))]),s[1]||(s[1]=r('<h2 id="🎯-题目描述" tabindex="-1">🎯 题目描述 <a class="header-anchor" href="#🎯-题目描述" aria-label="Permalink to &quot;🎯 题目描述&quot;">​</a></h2><p>实现 <code>Replace&lt;S, From, To&gt;</code> 将字符串 <code>S</code> 中的第一个子字符串 <code>From</code> 替换为 <code>To</code> 。</p><p>例如</p><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">type</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> replaced</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> Replace</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;types are fun!&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;fun&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;awesome&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;; </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// 期望是 &#39;types are awesome!&#39;</span></span></code></pre></div><h2 id="🔍-分析" tabindex="-1">🔍 分析 <a class="header-anchor" href="#🔍-分析" aria-label="Permalink to &quot;🔍 分析&quot;">​</a></h2><p>这个题目也是通过匹配推断即可实现，只需要匹配出 <code>${infer F}${From}${infer R}</code>，就返回 <code>${F}${To}${R}</code>，否则返回原字符即可。</p><p>值得一提的是，像这样的匹配，只会匹配 <code>From</code> 出现的第一次，刚好和题目要求吻合，如果需要连续替换，那么可以通过递归嵌套处理剩余字符 <code>R</code> 即可。</p><p>这里需要注意的就是边界条件，当 <code>From</code> 为 空字符串时，此时匹配会始终成立，故需要对该情况做特殊处理。</p><h2 id="🛠️-题解" tabindex="-1">🛠️ 题解 <a class="header-anchor" href="#🛠️-题解" aria-label="Permalink to &quot;🛠️ 题解&quot;">​</a></h2><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">type</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> Replace</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">S</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> extends</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> string</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">From</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> extends</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> string</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">To</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> extends</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> string</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt; </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span></span>\n<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  // 如果 from 是 &#39;&#39;，那么直接返回原字符</span></span>\n<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  From</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> extends</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;&#39;</span></span>\n<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    ?</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> S</span></span>\n<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    :</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> S</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> extends</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> `${</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">infer</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> F</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">}${</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">From</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">}${</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">infer</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> R</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">}`</span></span>\n<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    ?</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> `${</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">F</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">}${</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">To</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">}${</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">R</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">}`</span></span>\n<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    :</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> S</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span></code></pre></div><p>只需要注意边界即可。</p><h2 id="💡-知识点" tabindex="-1">💡 知识点 <a class="header-anchor" href="#💡-知识点" aria-label="Permalink to &quot;💡 知识点&quot;">​</a></h2><ol><li>字符匹配推断：<code>A extends `${infer F}${From}${infer R}` </code></li></ol>',13)),e(n),e(h)])}const b=l(F,[["render",c]]);export{u as __pageData,b as default};
