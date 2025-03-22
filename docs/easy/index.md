<script>
// 根据浏览器语言自动跳转
const userLang = navigator.language || navigator.userLanguage;
const isZh = userLang.startsWith('zh');

// 中英文内容对象
const content = {
  zh: {
    title: '入门挑战',
    intro: '欢迎来到入门挑战部分。这些挑战旨在帮助你理解TypeScript类型系统的基本概念。',
    availableChallenges: '可用挑战',
    challengeList: [
      { text: '实现 Pick', link: './implement-pick' },
      { text: '实现 Readonly', link: './implement-readonly' },
      { text: '元组转对象', link: './tuple-to-object' },
      { text: '第一个元素', link: './first' },
      { text: '获取元组长度', link: './length-of-tuple' },
    ],
    gettingStarted: '开始',
    gettingStartedText: '每个挑战页面包括：',
    steps: [
      '对挑战的清晰描述',
      '展示类型如何工作的示例代码',
      '解决方案的分步指南',
      '完整的实现'
    ],
    chooseChallenge: '从上面的列表中选择任何挑战开始吧！'
  },
  en: {
    title: 'Easy Challenges',
    intro: 'Welcome to the Easy Challenges section. These challenges are designed to help you understand the basic concepts of TypeScript\'s type system.',
    availableChallenges: 'Available Challenges',
    challengeList: [
      { text: 'Implement Pick', link: './implement-pick' },
      { text: 'Implement Readonly', link: './implement-readonly' },
      { text: 'Tuple to Object', link: './tuple-to-object' },
      { text: 'First', link: './first' },
      { text: 'Length of Tuple', link: './length-of-tuple' },
    ],
    gettingStarted: 'Getting Started',
    gettingStartedText: 'Each challenge page includes:',
    steps: [
      'A clear description of the challenge',
      'Example code showing how the type should work',
      'A step-by-step guide to the solution',
      'The complete implementation'
    ],
    chooseChallenge: 'Choose any challenge from the list above to get started!'
  }
};

// 根据语言选择内容
const lang = isZh ? 'zh' : 'en';
const c = content[lang];

// 动态渲染页面内容
document.addEventListener('DOMContentLoaded', () => {
  document.title = c.title;
  document.getElementById('title').innerText = c.title;
  document.getElementById('intro').innerText = c.intro;
  document.getElementById('available-challenges').innerText = c.availableChallenges;

  // 渲染挑战列表
  const challengeList = document.getElementById('challenge-list');
  c.challengeList.forEach(challenge => {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = challenge.link;
    a.innerText = challenge.text;
    li.appendChild(a);
    challengeList.appendChild(li);
  });

  document.getElementById('getting-started').innerText = c.gettingStarted;
  document.getElementById('getting-started-text').innerText = c.gettingStartedText;

  // 渲染步骤列表
  const stepsList = document.getElementById('steps-list');
  c.steps.forEach(step => {
    const li = document.createElement('li');
    li.innerText = step;
    stepsList.appendChild(li);
  });

  document.getElementById('choose-challenge').innerText = c.chooseChallenge;
});
</script>

<h1 id="title">Easy Challenges</h1>

<p id="intro">Welcome to the Easy Challenges section. These challenges are designed to help you understand the basic concepts of TypeScript's type system.</p>

<h2 id="available-challenges">Available Challenges</h2>

<ul id="challenge-list">
</ul>

<h2 id="getting-started">Getting Started</h2>

<p id="getting-started-text">Each challenge page includes:</p>

<ol id="steps-list">
</ol>

<p id="choose-challenge">Choose any challenge from the list above to get started!</p>
