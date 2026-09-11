import uiAssets from './ui-assets.json';
export { uiAssets };

export const profile = {
  name: '占彦超', englishName: 'ZHAN YANCHAO', email: '438006301@qq.com', phone: '18326677056',
  intro: '拥有 16 年游戏美术经验，专注于视觉表达、游戏体验与 AI 创作。从角色、场景到 UI 与动效，我将创意转化为可落地的完整美术方案，也带领团队一起把想象变成作品。',
};

export const experiences = [
  { date: '2020.09 — 至今', role: '游戏美术主管', company: '合肥乐堂动漫信息技术有限公司', description: '统筹 2D 游戏美术全流程，负责以 UI 为重点的主美工作，推进品质把控、产出验收与人才培养。' },
  { date: '2019.11 — 2020.08', role: 'UI 设计培训讲师', company: '安徽冰人网络科技有限公司', description: '编写游戏 UI、UE 交互与动效课程，负责教学和学员日常管理。' },
  { date: '2019.03 — 2019.10', role: '美术设计师 · 2D / 3D', company: '合肥青衫互娱网络科技有限公司', description: '负责游戏界面、动效与原画设计，把控项目美术进度。' },
  { date: '2018.03 — 2019.03', role: '美术设计师 · 2D / 3D', company: '合肥酷町堂网络科技有限公司', description: '独立完成游戏角色、场景、动画、UI 与特效，参与少儿编程教学游戏开发。' },
  { date: '2011.04 — 2018.03', role: '美术总监', company: '合肥魔力红动漫有限公司', description: '负责团队管理与游戏美术开发，参与《年兽大作战》《快乐酷宝》《蛋蛋小子》《新葫芦兄弟》等项目。' },
  { date: '2009.09 — 2011.04', role: '游戏美术', company: '合肥乐堂动漫信息技术有限公司', description: '参与《海盗王》《苍穹默示录》《三国》的角色、界面、动画与插画设计。' },
];

export const projects = [
  { id: '01', title: '赤暝黑骑', subtitle: '暗黑重甲骑士 · 角色视觉与动态展示', category: 'CHARACTER / MOTION', image: 'knight', layout: 'quad', description: '以暗黑重甲骑士为核心的角色视觉展示。厚重铠甲、鲜明红光与动作残影，共同塑造具有力量感的角色形象。', images: ['knight', 'dragon-warrior', 'necromancer', 'wolf'] },
  { id: '02', title: '冰霜之境', subtitle: '冰晶镰刀战士 · 角色与场景氛围', category: 'CHARACTER / WORLD', image: 'frost', description: '冰晶镰刀战士的角色与场景展示，以冰蓝色调串联武器、材质和环境，构建统一的冰霜视觉语言。', images: ['frost'] },
  { id: '03', title: '朽樱丸', subtitle: '樱花鬼面骷髅 · 角色主题设计', category: 'CHARACTER / MOTION', image: 'sakura', description: '樱花、鬼面与骷髅元素组成的角色主题。通过柔和花瓣与强烈角色轮廓的对照，呈现独特的视觉识别。', images: ['sakura'] },
  { id: '04', title: '异世界生物图鉴', subtitle: '15 款怪物 · 从生物轮廓到场景表现', category: 'CREATURE / COLLECTION', image: 'dragon', layout: 'carousel', description: '一组围绕不同生物特征、装备与元素属性展开的怪物设计，涵盖幼龙、史莱姆、巨像与机械生物等多样形象。', images: ['dragon', 'slime', 'stitch', 'pirate', 'spike', 'mantis', 'crab', 'dwarf', 'lava-stone', 'lava-shark', 'lizard', 'worm', 'ghost', 'frog', 'spider'] },
];

export const strengths = [
  { number: '01', name: '完整的游戏美术视角', english: 'ART DIRECTION', text: '从角色、场景、特效到 UI 与交互，熟悉 2D 游戏制作全流程。围绕产品定位，建立统一且可落地的视觉语言。', tags: ['视觉设计', '游戏 UI', '角色 / 场景'] },
  { number: '02', name: '让 AI 成为创作的一部分', english: 'AI-ASSISTED CREATION', text: '持续探索 AIGC 在美术制作中的应用，将工具能力融入创作流程，连接视觉探索与实际产出。', tags: ['ComfyUI', 'Midjourney', 'GPT / Codex', 'Gemini / 即梦'] },
  { number: '03', name: '从品质标准到最终落地', english: 'PRODUCTION & LEADERSHIP', text: '制定美术品质标准，统筹进度、验收与优化。结合团队培养与跨职能协作，让创意在项目中稳定落地。', tags: ['团队管理', '品质把控', '跨团队协作'] },
];

export const uiProjects = [
  { id: 'UI.01', title: '合成游戏 · UI 设计', subtitle: '8 张界面设计 · 主界面、订单、工坊与养成', category: 'GAME UI / MERGE', image: 'ui-merge-01', layout: 'landscape', description: '围绕合成玩法的界面设计，涵盖主界面、订单、对话、工坊、岛屿购买、好感度、升星与设置。以明亮色彩、圆润图标和清晰的功能分区，呈现轻松的游戏氛围。', images: Object.keys(uiAssets).filter(name => uiAssets[name].group === 'ui-merge') },
  { id: 'UI.02', title: '肉鸽游戏 · UI 设计', subtitle: '23 张界面设计 · 战斗、成长与活动系统', category: 'GAME UI / ROGUELIKE', image: 'ui-rogue-01', layout: 'portrait', description: '围绕肉鸽游戏的竖屏界面设计，涵盖主界面、营地、战斗结算、排行榜、通行证、成长基金与角色活动礼包。以暗色场景承载高辨识度的功能图标与奖励信息。', images: Object.keys(uiAssets).filter(name => uiAssets[name].group === 'ui-rogue') },
];

export const gameVideos = [
  { id: 'V.01', title: '赤暝黑骑', subtitle: '角色活动礼包 · 游戏视频', file: 'knight.mp4', posterFile: 'poster-knight.jpg' },
  { id: 'V.02', title: '冰霜', subtitle: '角色活动礼包 · 游戏视频', file: 'frost.mp4', posterFile: 'poster-frost.jpg' },
  { id: 'V.03', title: '樱花骷髅武士', subtitle: '三段斩击动画 · 游戏视频', file: 'sakura-slash.mp4', posterFile: 'poster-sakura-slash.jpg', layout: 'landscape' },
  { id: 'V.04', title: '美漫卡通新娘', subtitle: '角色动态展示 · 游戏视频', file: 'cartoon-bride.mp4', posterFile: 'poster-cartoon-bride.jpg' },
  { id: 'V.05', title: '朽樱丸', subtitle: '角色活动礼包 · 游戏视频', file: 'sakura-gift.mp4', posterFile: 'poster-sakura-gift.jpg' },
];

export const visualWorkCount = new Set([...projects, ...uiProjects].flatMap(project => project.images)).size;
