import{_ as h,C as i,c as k,o as p,j as a,a2 as r,G as t,a as d,t as g}from"./chunks/framework.DVAAUgfZ.js";const D=JSON.parse('{"title":"实现Flatten","description":"","frontmatter":{"title":"实现Flatten"},"headers":[],"relativePath":"challenges/medium/Flatten.md","filePath":"challenges/medium/Flatten.md"}'),E={name:"challenges/medium/Flatten.md"},o={id:"frontmatter-title",tabindex:"-1"};function F(n,s,y,c,C,m){const l=i("NolebaseGitContributors"),e=i("NolebaseGitChangelog");return p(),k("div",null,[a("h1",o,[d(g(n.$frontmatter.title)+" ",1),s[0]||(s[0]=a("a",{class:"header-anchor",href:"#frontmatter-title","aria-label":'Permalink to "{{ $frontmatter.title }}"'},"​",-1))]),s[1]||(s[1]=r(`<h2 id="🎯-题目描述" tabindex="-1">🎯 题目描述 <a class="header-anchor" href="#🎯-题目描述" aria-label="Permalink to &quot;🎯 题目描述&quot;">​</a></h2><p>在这个挑战中，你需要写一个接受数组的类型，并且返回扁平化的数组类型。</p><p>例如:</p><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">type</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> flatten</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> Flatten</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;[</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">2</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, [</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">3</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">4</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">], [[[</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">5</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">]]]]&gt;; </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// [1, 2, 3, 4, 5]</span></span></code></pre></div><h2 id="🔍-分析" tabindex="-1">🔍 分析 <a class="header-anchor" href="#🔍-分析" aria-label="Permalink to &quot;🔍 分析&quot;">​</a></h2><p>这题又回到了元组，flatten 的逻辑本身也比较简单，就是遍历元组，当元素还是元组时，继续递归处理，直到元素非元组结束。</p><p>元组的遍历方法可以通过匹配推断：<code>A extends [infer F, ...infer R]</code>。</p><h2 id="🛠️-题解" tabindex="-1">🛠️ 题解 <a class="header-anchor" href="#🛠️-题解" aria-label="Permalink to &quot;🛠️ 题解&quot;">​</a></h2><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">type</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> Flatten</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">T</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt; </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  // 遍历获取第一个元素</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  T</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> extends</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> [</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">infer</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> F</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">...infer</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> R</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">]</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    ?</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> // 第一个元素是否时元组</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">      F</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> extends</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> any</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">[]</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">      ?</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> // 是，那么需要递归处理第一个元素，同时拼接上递归处理后的剩余元素</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        [</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">...</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">Flatten</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">F</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;, </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">...</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">Flatten</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">R</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;]</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">      :</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> // 不是，直接返回第一个元素，并拼接上递归处理后的剩余元素</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        [</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">F</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">...</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">Flatten</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">R</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;]</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    :</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> // 遍历结束，返回空元组，这样可以保证拼接结果的正确</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      [];</span></span></code></pre></div><p>这里可以注意下 <code>[...Flatten&lt;F&gt;, ...Flatten&lt;R&gt;]</code>，因为既需要递归第一个元素，也需要递归剩余元素，还是有一定的圈圈绕。</p><p>同时可以留意下最后的 空元组。</p><h2 id="💡-知识点" tabindex="-1">💡 知识点 <a class="header-anchor" href="#💡-知识点" aria-label="Permalink to &quot;💡 知识点&quot;">​</a></h2><ol><li>元组遍历套路： <code>T extends [infer F, ...infer R]</code></li><li>元组遍历边界条件：推断的类型有两个，当入参没有元素时，会走 false 逻辑</li></ol>`,13)),t(l),t(e)])}const u=h(E,[["render",F]]);export{D as __pageData,u as default};
