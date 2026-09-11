import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { ArrowUpRight, ArrowDown, ArrowUp, Play, Pause, Copy, Check, Plus, Minus, X, Menu, Layers3, Sparkles, Scan, Mail } from 'lucide-react';
import BorderGlow from '@/components/BorderGlow';
import { profile, experiences, projects, strengths, uiProjects, uiAssets, gameVideos, visualWorkCount } from './content.js';
import usePortfolioMotion from './usePortfolioMotion.js';

const asset = (name) => `/assets/${name}.webp`;
const managementAsset = (name) => `/assets/${name}`;
const navItems = [['about', '关于我'], ['expertise', '个人优势'], ['work', '精选作品']];
const ProjectDialog = lazy(() => import('./ProjectDialog.jsx'));
const managementViews = [
  {
    id: 'flow',
    label: '开发流程',
    english: 'DEVELOPMENT FLOW',
    title: '从目标拆解，到版本交付',
    description: '先对齐产品目标与体验重点，再建立美术标准、制作节奏和验收节点，让策划、设计与程序始终在同一套目标下推进。',
    steps: ['需求与目标', '视觉预研', '制作与联调', '验收与复盘'],
    tags: ['目标对齐', '里程碑', '跨团队协作'],
    visuals: ['management-workflow-2.png', 'management-workflow-3.png', 'management-workflow-4.png'],
  },
  {
    id: 'assets',
    label: '资源管理',
    english: 'ASSET MANAGEMENT',
    title: '让每一份资产清晰、可追踪、可复用',
    description: '用统一的命名、目录与版本规则管理设计资产，减少查找和沟通成本，并把可复用成果沉淀为稳定的团队资源。',
    steps: ['规范命名', '分类入库', '版本留档', '复用沉淀'],
    tags: ['资产规范', '版本管理', '组件沉淀'],
    visuals: ['management-ai-library.png', 'management-training.png'],
  },
  {
    id: 'progress',
    label: '进度管理',
    english: 'PROGRESS CONTROL',
    title: '提前看见风险，保持稳定交付',
    description: '围绕关键节点拆解任务、同步依赖与评审状态，在问题影响交付前及时调整优先级，让品质和进度保持平衡。',
    steps: ['任务拆分', '排期同步', '风险预警', '交付验收'],
    tags: ['任务排期', '风险识别', '品质验收'],
    visuals: ['management-feedback.png', 'management-review.png', 'management-assessment.png'],
  },
];
const developmentFlowGroups = [
  {
    id: 'battle',
    label: '主线战斗流程',
    description: '从主界面开始游戏，显示任务目标，进入战斗；获得属性后继续，完成关卡并返回主界面。',
    viewBox: '0 0 1100 850',
    paths: [
      ['M190 180 L258 180', 'primary'], ['M430 180 L498 180', 'primary'], ['M585 327 L585 498', 'primary'],
      ['M500 650 C440 610 440 350 500 250', 'accent'], ['M670 250 C810 290 925 390 925 498', 'primary'],
      ['M840 730 C660 830 260 830 105 330', 'accent'],
    ],
    notes: [['开始游戏', 224, 160], ['关闭目标', 464, 160], ['阶段奖励', 640, 415], ['选择属性后继续', 410, 470], ['完成关卡目标', 815, 330], ['确定并返回', 430, 822]],
    nodes: [
      ['main', 'flow-main.jpg', '主界面', 30, 50, 150, 267, 348, true], ['task', 'flow-task.jpg', '任务目标', 270, 50, 150, 267, 348],
      ['battle', 'flow-battle.jpg', '战斗场景', 510, 50, 150, 267, 348], ['reward', 'flow-reward.jpg', '战斗获得', 510, 510, 150, 267, 808],
      ['success', 'flow-success.jpg', '闯关成功', 850, 510, 150, 267, 808],
    ],
  },
  {
    id: 'navigation',
    label: '底部主导航',
    description: '最新主界面的底部导航分别连接商城、角色、营地和挑战界面。',
    viewBox: '0 0 1000 930',
    paths: [['M425 421 C390 500 190 500 115 600', 'primary'], ['M475 421 C455 505 390 530 370 600', 'primary'], ['M525 421 C545 505 610 530 630 600', 'primary'], ['M575 421 C610 500 810 500 885 600', 'primary']],
    notes: [],
    nodes: [
      ['main', 'flow-main.jpg', '最新主界面', 390, 30, 220, 391, 469, true], ['shop', 'flow-shop.jpg', '商城', 40, 610, 150, 267, 905],
      ['role', 'flow-role.jpg', '角色', 295, 610, 150, 267, 905], ['camp', 'flow-camp.jpg', '营地', 555, 610, 150, 267, 905],
      ['challenge', 'flow-challenge.jpg', '挑战', 810, 610, 150, 267, 905],
    ],
  },
  {
    id: 'operation',
    label: '左侧运营入口',
    description: '主界面左侧按钮分别连接首充、特权、免广告、活动、角色礼包和基金界面。',
    viewBox: '0 0 1000 1040',
    paths: [['M256 340 C315 315 335 175 370 163', 'accent'], ['M256 395 C360 350 470 235 600 170', 'accent'], ['M256 450 C425 410 645 230 830 170', 'accent'], ['M256 510 C315 555 335 805 370 820', 'accent'], ['M256 565 C360 620 470 760 600 820', 'accent'], ['M256 620 C425 670 645 785 830 820', 'accent']],
    notes: [],
    nodes: [
      ['main', 'flow-main.jpg', '主界面左侧按钮', 36, 292, 220, 391, 716, true], ['first', 'flow-first-charge.jpg', '首充', 380, 30, 150, 267, 325],
      ['privilege', 'flow-privilege.jpg', '特权', 610, 30, 150, 267, 325], ['no-ads', 'flow-no-ads.jpg', '免广告', 840, 30, 150, 267, 325],
      ['event', 'flow-event.jpg', '活动', 380, 690, 150, 267, 987], ['character-pack', 'flow-character-pack.jpg', '角色礼包', 610, 690, 150, 267, 987],
      ['fund', 'flow-fund.jpg', '基金', 840, 690, 150, 267, 987],
    ],
  },
  {
    id: 'idle',
    label: '日常与挂机',
    description: '七日赠礼横幅连接赠礼页面，签到按钮连接签到弹窗，左下宝箱连接挂机奖励。',
    viewBox: '0 0 1000 810',
    paths: [['M256 300 C310 245 320 165 380 160', 'primary'], ['M256 385 C390 345 485 370 615 382', 'primary'], ['M256 520 C470 555 650 610 830 620', 'primary']],
    notes: [],
    nodes: [
      ['main', 'flow-main.jpg', '最新主界面', 36, 184, 220, 391, 608, true], ['seven-day', 'flow-seven-day.jpg', '七日赠礼横幅', 390, 30, 150, 267, 325],
      ['sign-in', 'flow-sign-in.jpg', '签到按钮', 625, 250, 150, 267, 545], ['idle-reward', 'flow-idle-reward.jpg', '左下宝箱 → 挂机', 840, 485, 150, 267, 780],
    ],
  },
];

function SectionLabel({ number, children }) {
  const [english, chinese] = typeof children === 'string' ? children.split(' / ') : [children, null];

  return <div className="section-label">
    <span className="section-index">{number}</span>
    <span className="section-label-copy">
      <span>{english}</span>
      {chinese && <><span className="section-label-divider">/</span><strong>{chinese}</strong></>}
    </span>
  </div>;
}

function DevelopmentFlowGallery() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeGroup = developmentFlowGroups[activeIndex];

  const changeTabFromKeyboard = (event, index) => {
    let nextIndex = index;
    if (event.key === 'ArrowRight') nextIndex = (index + 1) % developmentFlowGroups.length;
    else if (event.key === 'ArrowLeft') nextIndex = (index - 1 + developmentFlowGroups.length) % developmentFlowGroups.length;
    else if (event.key === 'Home') nextIndex = 0;
    else if (event.key === 'End') nextIndex = developmentFlowGroups.length - 1;
    else return;
    event.preventDefault();
    setActiveIndex(nextIndex);
    document.getElementById(`flow-tab-${developmentFlowGroups[nextIndex].id}`)?.focus();
  };

  return <section className="development-flow" aria-labelledby="development-flow-title">
    <div className="flow-heading"><div><span className="eyebrow">GAME 2D ART PIPELINE</span><h5 id="development-flow-title">游戏 2D 美术流程</h5></div><p>{activeGroup.description}</p></div>
    <div className="flow-tabs" role="tablist" aria-label="游戏 2D 美术流程分类">
      {developmentFlowGroups.map((group, index) => <button
        key={group.id}
        type="button"
        id={`flow-tab-${group.id}`}
        role="tab"
        aria-selected={index === activeIndex}
        aria-controls={`flow-panel-${group.id}`}
        tabIndex={index === activeIndex ? 0 : -1}
        className={index === activeIndex ? 'is-active' : ''}
        onClick={() => setActiveIndex(index)}
        onKeyDown={event => changeTabFromKeyboard(event, index)}
      >{group.label}</button>)}
    </div>
    <div key={activeGroup.id} className="flow-panel" id={`flow-panel-${activeGroup.id}`} role="tabpanel" aria-labelledby={`flow-tab-${activeGroup.id}`}>
      <div className="flow-canvas" tabIndex="0" aria-label="流程图区域，窄屏时可横向滚动">
        <svg className="flow-diagram" viewBox={activeGroup.viewBox} role="img" aria-label={`${activeGroup.label}界面跳转关系图`}>
          <defs>
            <marker id={`flow-arrow-primary-${activeGroup.id}`} markerWidth="12" markerHeight="12" refX="10" refY="6" orient="auto"><path className="arrow-primary" d="M0,0 L12,6 L0,12 Z" /></marker>
            <marker id={`flow-arrow-accent-${activeGroup.id}`} markerWidth="12" markerHeight="12" refX="10" refY="6" orient="auto"><path className="arrow-accent" d="M0,0 L12,6 L0,12 Z" /></marker>
            {activeGroup.nodes.map(([key, , , x, y, width, height]) => <clipPath key={key} id={`flow-clip-${activeGroup.id}-${key}`}><rect x={x} y={y} width={width} height={height} rx="12" /></clipPath>)}
          </defs>
          {activeGroup.paths.map(([path, tone], index) => <path key={`${path}-${index}`} className={`diagram-link ${tone}`} d={path} markerEnd={`url(#flow-arrow-${tone}-${activeGroup.id})`} />)}
          {activeGroup.notes.map(([label, x, y]) => <text key={label} className="diagram-note" x={x} y={y}>{label}</text>)}
          {activeGroup.nodes.map(([key, image, label, x, y, width, height, labelY, isMain]) => <g key={key} className={isMain ? 'diagram-node is-main' : 'diagram-node'}>
            <rect className="node-frame" x={x - 6} y={y - 6} width={width + 12} height={height + 12} rx="16" />
            <a href={`/assets/${image}`} target="_blank" rel="noopener noreferrer" aria-label={`查看${label}原图`}>
              <image href={`/assets/${image}`} x={x} y={y} width={width} height={height} preserveAspectRatio="xMidYMid slice" clipPath={`url(#flow-clip-${activeGroup.id}-${key})`} />
            </a>
            <text className="node-label" x={x + width / 2} y={labelY}>{label}</text>
          </g>)}
        </svg>
      </div>
      <div className="flow-legend" aria-label="连线说明"><span><i className="primary" />主要跳转</span><span><i className="accent" />入口与回流</span><em>点击图片可查看大图</em></div>
    </div>
  </section>;
}

function ProjectManagement() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeView = managementViews[activeIndex];

  const changeTabFromKeyboard = (event, index) => {
    let nextIndex = index;
    if (event.key === 'ArrowRight') nextIndex = (index + 1) % managementViews.length;
    else if (event.key === 'ArrowLeft') nextIndex = (index - 1 + managementViews.length) % managementViews.length;
    else if (event.key === 'Home') nextIndex = 0;
    else if (event.key === 'End') nextIndex = managementViews.length - 1;
    else return;
    event.preventDefault();
    setActiveIndex(nextIndex);
    document.getElementById(`management-tab-${managementViews[nextIndex].id}`)?.focus();
  };

  return <div className="work-collection management-section" aria-labelledby="management-title">
    <div className="collection-heading"><div><span className="eyebrow">PROJECT MANAGEMENT</span><h3 id="management-title">项目管理</h3></div><span className="collection-total">方法 · 资源 · 节奏</span></div>
    <div className="management-shell">
      <div className="management-tabs" role="tablist" aria-label="项目管理分类">
        {managementViews.map((item, index) => <button
          key={item.id}
          type="button"
          id={`management-tab-${item.id}`}
          className={index === activeIndex ? 'is-active' : ''}
          role="tab"
          aria-selected={index === activeIndex}
          aria-controls={`management-panel-${item.id}`}
          tabIndex={index === activeIndex ? 0 : -1}
          onClick={() => setActiveIndex(index)}
          onKeyDown={event => changeTabFromKeyboard(event, index)}
        ><span>0{index + 1}</span>{item.label}</button>)}
      </div>
      <div key={activeView.id} className="management-panel" id={`management-panel-${activeView.id}`} role="tabpanel" aria-labelledby={`management-tab-${activeView.id}`}>
        <div className="management-copy">
          <span className="management-kicker">{activeView.english}</span>
          <h4>{activeView.title}</h4>
          <p>{activeView.description}</p>
          <div className="management-tags">{activeView.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
        </div>
        <div className="management-visual" aria-label={`${activeView.label}作品图片循环展示`}>
          <div className="management-visual-track">
            {[...activeView.visuals, ...activeView.visuals].map((name, index) => <figure key={`${name}-${index}`} aria-hidden={index >= activeView.visuals.length}>
              <a href={managementAsset(name)} target="_blank" rel="noopener noreferrer" tabIndex={index >= activeView.visuals.length ? -1 : 0} aria-label={`查看${activeView.label}视觉示意 ${index % activeView.visuals.length + 1}大图`}>
                <img src={managementAsset(name)} alt={index < activeView.visuals.length ? `${activeView.label}视觉示意 ${index + 1}` : ''} width="1666" height="900" loading="lazy" decoding="async" />
              </a>
            </figure>)}
          </div>
          <span className="management-visual-label">VISUAL ARCHIVE · {activeView.english}</span>
          <a className="management-visual-action" href={managementAsset(activeView.visuals[0])} target="_blank" rel="noopener noreferrer">查看大图 <ArrowUpRight size={15} /></a>
        </div>
        <ol className="management-flow" aria-label={`${activeView.label}的四个阶段`}>
          {activeView.steps.map((step, index) => <li key={step}><span>0{index + 1}</span><strong>{step}</strong><i aria-hidden="true" /></li>)}
        </ol>
        <span className="management-ghost" aria-hidden="true">/0{activeIndex + 1}</span>
      </div>
    </div>
  </div>;
}

function ProjectCarousel({ project }) {
  const carouselRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return undefined;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), {
      rootMargin: '180px 0px',
      threshold: 0,
    });
    observer.observe(carousel);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return undefined;
    const nextIndex = (index + 1) % project.images.length;
    const nextImage = new Image();
    nextImage.src = asset(project.images[nextIndex]);
    const timer = window.setTimeout(() => setIndex(nextIndex), 3600);
    return () => window.clearTimeout(timer);
  }, [index, project.images, visible]);

  const name = project.images[index];
  return <div ref={carouselRef} className="project-image-carousel"><img key={name} className="project-carousel-image" src={asset(name)} alt={`${project.title} · 怪物作品 ${index + 1}`} loading="lazy" decoding="async" width="1376" height="768" /></div>;
}

function ProjectCard({ project, onOpen }) {
  return <button className={`project-card project-${project.id}`} onClick={() => onOpen(project)} aria-label={`查看${project.title}作品`}>
    <div className={`project-image ${project.layout === 'quad' ? 'project-image-quad' : ''}`}>{project.layout === 'quad' ? <div className="project-image-grid">{project.images.map((name, index) => <img key={name} src={asset(name)} alt={`${project.title} · 角色作品 ${index + 1}`} loading="lazy" decoding="async" width="1376" height="768" />)}</div> : project.layout === 'carousel' ? <ProjectCarousel project={project} /> : <img src={asset(project.image)} alt={project.subtitle} loading="lazy" decoding="async" width="1376" height="768" />}<span className="image-number">/{project.id}</span><span className="image-action">查看作品 <ArrowUpRight size={20} /></span>{project.video && <span className="motion-badge"><Play size={12} fill="currentColor" /> 动态作品</span>}</div>
    <div className="project-caption"><div><span className="eyebrow">{project.category}</span><h3>{project.title}</h3><p>{project.subtitle}</p></div><ArrowUpRight className="project-arrow" size={29} strokeWidth={1.3} /></div>
  </button>;
}


function UIProjectCard({ project, onOpen }) {
  const previews = project.images.slice(0, project.layout === 'portrait' ? 3 : 1);
  return <button className="ui-project-card" onClick={() => onOpen(project)} aria-label={`查看${project.title}，共 ${project.images.length} 张设计稿`}>
    <div className={`ui-cover ui-cover-${project.layout}`}>
      <div className="ui-preview-images">{previews.map(name => <img key={name} src={asset(name)} alt={uiAssets[name].title} width={uiAssets[name].width} height={uiAssets[name].height} loading="lazy" decoding="async" />)}</div>
      <span className="ui-count">{project.images.length} 张设计稿 <ArrowUpRight size={15} /></span>
    </div>
    <div className="project-caption"><div><span className="eyebrow">{project.category}</span><h3>{project.title}</h3><p>{project.subtitle}</p></div><ArrowUpRight className="project-arrow" size={27} strokeWidth={1.3} /></div>
  </button>;
}

function GameVideoCard({ item }) {
  return <article className={`game-video-card video-${item.layout ?? 'portrait'}`}>
    <video controls playsInline preload="none" poster={`/assets/${item.posterFile}`} aria-label={`${item.title}角色活动礼包视频`} onPlay={event => {
      document.querySelectorAll('.game-video-card video').forEach(video => { if (video !== event.currentTarget) video.pause(); });
    }}><source src={`/assets/${item.file}`} type="video/mp4" />你的浏览器暂不支持视频播放。<a href={`/assets/${item.file}`}>打开视频文件</a></video>
    <div className="video-caption"><span className="eyebrow">{item.id} / GAME MOTION</span><h4>{item.title}</h4><p>{item.subtitle}</p></div>
  </article>;
}

export default function App() {
  usePortfolioMotion();
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [project, setProject] = useState(null);
  const [expanded, setExpanded] = useState(false);
  const [copied, setCopied] = useState(false);
  const [copyFailed, setCopyFailed] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [headerFloating, setHeaderFloating] = useState(false);
  const [heroVideoEnabled, setHeroVideoEnabled] = useState(false);
  const copyTimer = useRef(null);

  useEffect(() => {
    const sections = [...document.querySelectorAll('main > section[id]')];
    const sectionObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        entry.target.classList.toggle('is-in-view', entry.isIntersecting);
        if (entry.isIntersecting) setActiveSection(entry.target.id);
      });
    }, { rootMargin: '-20% 0px -55% 0px', threshold: 0 });
    sections.forEach(section => sectionObserver.observe(section));

    const hero = document.getElementById('home');
    const headerObserver = new IntersectionObserver(([entry]) => {
      setHeaderFloating(!entry.isIntersecting && entry.boundingClientRect.bottom <= 76);
    }, { rootMargin: '-76px 0px 0px 0px', threshold: 0 });
    if (hero) headerObserver.observe(hero);

    return () => {
      sectionObserver.disconnect();
      headerObserver.disconnect();
      clearTimeout(copyTimer.current);
    };
  }, []);

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const smallScreen = window.matchMedia('(max-width: 760px)');
    const connection = navigator.connection;
    let idleId;
    let timerId;
    let idleReady = false;
    let heroVisible = false;

    const canUseMotionVideo = () => {
      const constrainedNetwork = connection?.saveData || ['slow-2g', '2g'].includes(connection?.effectiveType);
      return !reducedMotion.matches && !smallScreen.matches && !constrainedNetwork;
    };
    const maybeEnableVideo = () => {
      if (!canUseMotionVideo()) {
        setHeroVideoEnabled(false);
        return;
      }
      if (idleReady && heroVisible) setHeroVideoEnabled(true);
    };

    const cancelScheduledLoad = () => {
      if (idleId && 'cancelIdleCallback' in window) window.cancelIdleCallback(idleId);
      clearTimeout(timerId);
    };
    const scheduleVideo = () => {
      cancelScheduledLoad();
      idleReady = false;
      if (!canUseMotionVideo()) {
        setHeroVideoEnabled(false);
        return;
      }
      const enable = () => { idleReady = true; maybeEnableVideo(); };
      if ('requestIdleCallback' in window) idleId = window.requestIdleCallback(enable, { timeout: 1600 });
      else timerId = window.setTimeout(enable, 900);
    };

    const hero = document.getElementById('home');
    const heroObserver = new IntersectionObserver(([entry]) => {
      heroVisible = entry.isIntersecting;
      maybeEnableVideo();
    }, { rootMargin: '180px 0px', threshold: 0 });
    if (hero) heroObserver.observe(hero);
    scheduleVideo();
    reducedMotion.addEventListener('change', scheduleVideo);
    smallScreen.addEventListener('change', scheduleVideo);
    connection?.addEventListener?.('change', scheduleVideo);
    return () => {
      cancelScheduledLoad();
      reducedMotion.removeEventListener('change', scheduleVideo);
      smallScreen.removeEventListener('change', scheduleVideo);
      connection?.removeEventListener?.('change', scheduleVideo);
      heroObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !heroVideoEnabled) {
      video?.pause();
      return undefined;
    }

    video.load();
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) video.play().catch(() => {});
      else video.pause();
    }, { threshold: 0.05 });
    observer.observe(video);
    return () => observer.disconnect();
  }, [heroVideoEnabled]);

  async function toggleVideo() {
    if (!heroVideoEnabled) {
      setHeroVideoEnabled(true);
      return;
    }
    if (!videoRef.current.paused) videoRef.current.pause();
    else await videoRef.current.play().catch(() => {});
  }

  async function copyEmail() {
    try { await navigator.clipboard.writeText(profile.email); setCopied(true); setCopyFailed(false); clearTimeout(copyTimer.current); copyTimer.current = setTimeout(() => setCopied(false), 2400); }
    catch { setCopyFailed(true); }
  }

  return <>
    <a href="#about" className="skip-link">跳转至主要内容</a>
    <header className={`site-header ${headerFloating ? 'is-floating' : ''}`}><div className="header-inner shell">
      <a href="#home" className="brand" aria-label="占彦超，回到首页">ZHAN<span className="brand-dot">®</span><span className="brand-divider" /><span className="brand-cn">占彦超</span></a>
      <nav className={menuOpen ? 'navigation is-open' : 'navigation'} aria-label="主导航">{navItems.map(([id, label]) => <a key={id} href={`#${id}`} className={activeSection === id ? 'active' : ''} onClick={() => setMenuOpen(false)}>{label}</a>)}</nav>
      <a href="#contact" className="header-contact">聊聊合作 <ArrowUpRight size={17} /></a>
      <button className="menu-toggle" aria-label={menuOpen ? '关闭导航' : '打开导航'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
    </div></header>

    <main>
      <section className="hero" id="home" aria-labelledby="hero-title">
        <video ref={videoRef} className="hero-video" muted loop playsInline preload="none" poster={asset('knight')} onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} aria-hidden="true">{heroVideoEnabled && <source src="/assets/city.mp4" type="video/mp4" />}</video>
        <div className="hero-shade" />
        <div className="hero-content hero-nameplate shell">
          <div className="hero-topline"><span className="status-dot" /> VISUAL · AI · GAME DESIGN</div>
          <h1 id="hero-title" aria-label="ZHAN YAN CHAO，占彦超">
            <span className="hero-name-solid">ZHAN</span>
            <span className="hero-name-outline">YAN CHAO</span>
          </h1>
          <div className="hero-name-meta">
            <strong>占彦超</strong>
            <span>视觉设计师 / AI 设计师 / 游戏设计师</span>
            <a href="#work">查看作品 <ArrowUpRight size={17} /></a>
          </div>
          <p className="hero-tagline">以设计构建体验，以 AI 拓展想象</p>
        </div>
        <div className="hero-foot shell"><a href="#about" className="scroll-link"><ArrowDown size={16} /> SCROLL TO EXPLORE</a><span className="hero-credit">SHOWREEL · 城市开场动画</span><button className="video-control" onClick={toggleVideo} aria-label={playing ? '暂停背景视频' : '播放背景视频'}>{playing ? <Pause size={13} /> : <Play size={13} />}<span>{playing ? 'PAUSE' : 'PLAY'}</span></button></div>
      </section>

      <section className="about section-pad shell" id="about" aria-labelledby="about-title">
        <SectionLabel number="01">ABOUT ME / 关于我</SectionLabel>
        <div className="about-grid">
          <div className="portrait-block"><div className="portrait-frame"><img src={asset('wolf')} alt="占彦超创作的狼头兜帽骷髅角色" loading="lazy" decoding="async" width="1376" height="768" /><span className="portrait-corner">Z / Y / C</span><div className="portrait-caption"><span>THE MIND BEHIND THE WORLDS</span><strong>让每个世界<br />拥有自己的性格。</strong></div></div><p className="art-caption">人物配图 / 个人角色设计作品</p></div>
          <div className="about-copy"><span className="eyebrow">DESIGNER. CREATOR. EXPLORER.</span><h2 id="about-title">你好，我是占彦超<span className="accent">。</span></h2><p className="intro">{profile.intro}</p><p className="about-note">目前任职于合肥乐堂动漫 · 游戏美术主管<br />安徽建筑大学 · 动画设计本科</p><div className="contact-inline"><a href={`mailto:${profile.email}`}><Mail size={17} />{profile.email}</a><a href={`tel:${profile.phone}`}>{profile.phone} <ArrowUpRight size={16} /></a></div>
            <div className="stats"><div><strong>16<span>年</span></strong><p>游戏美术经验</p></div><div><strong>{visualWorkCount}<span>件</span></strong><p>本次收录视觉作品</p></div><div><strong>{String(gameVideos.length + 1).padStart(2, '0')}<span>支</span></strong><p>本次收录动态作品</p></div></div>
          </div>
        </div>
        <div className="experience-header"><h3>经历，是创作的底色。</h3><span className="eyebrow">EXPERIENCE / 2009 — NOW</span></div>
        <div className="timeline">{(expanded ? experiences : experiences.slice(0, 2)).map((item, i) => <article className="experience" key={item.date}><span className={`timeline-dot ${i === 0 ? 'current' : ''}`} /><span className="experience-date">{item.date}</span><div className="experience-role"><h4>{item.role}</h4><p>{item.company}</p></div><p className="experience-description">{item.description}</p></article>)}</div>
        <button className="text-button experience-expand" onClick={() => setExpanded(!expanded)} aria-expanded={expanded}>{expanded ? '收起早期经历' : '查看完整经历'}{expanded ? <Minus size={17} /> : <Plus size={17} />}</button>
      </section>

      <section className="expertise section-pad shell" id="expertise" aria-labelledby="expertise-title"><SectionLabel number="02">MY EXPERTISE / 个人优势</SectionLabel><div className="section-heading"><h2 id="expertise-title">不只创造画面，<br /><span className="muted">更让创意走向完成。</span></h2><p className="section-aside">审美判断 × 技术探索 × 团队协作</p></div><div className="strength-grid">{strengths.map((item, i) => { const Icon = [Layers3, Sparkles, Scan][i]; return <BorderGlow key={item.number} className="strength-glow sweep-active continuous-glow" edgeSensitivity={25} glowColor="207 62 75" backgroundColor="#111419" borderRadius={18} glowRadius={26} glowIntensity={0.55} coneSpread={22} animated={false} colors={['#ffcf2b', '#6f9fdf', '#55b7bb']} fillOpacity={0.16}><article className="strength"><div className="strength-top"><Icon size={32} strokeWidth={1.2} /><span>/{item.number}</span></div><span className="eyebrow">{item.english}</span><h3>{item.name}</h3><p>{item.text}</p><div className="tags">{item.tags.map(tag => <span key={tag}>{tag}</span>)}</div></article></BorderGlow>; })}</div></section>

      <section className="work section-pad" id="work" aria-labelledby="work-title"><div className="shell">
        <SectionLabel number="03">SELECTED WORK / 精选作品</SectionLabel>
        <div className="section-heading"><h2 id="work-title">把想象，<br /><span className="muted">变成看得见的世界。</span></h2><div className="section-aside"><span className="eyebrow">ART, IN EVERY FRAME.</span><p>游戏 UI、角色、场景与动态表达。<br />每一帧，都是对另一种可能的探索。</p></div></div>
        <ProjectManagement />
        <div className="work-collection" aria-labelledby="ui-work-title"><div className="collection-heading"><div><span className="eyebrow">INTERFACE & EXPERIENCE</span><h3 id="ui-work-title">游戏 UI 设计</h3></div><span className="collection-total">02 个系列 / 31 张设计稿</span></div><div className="ui-project-grid">{uiProjects.map(item => <UIProjectCard key={item.id} project={item} onOpen={setProject} />)}</div></div>
        <div className="work-collection" aria-labelledby="video-work-title"><div className="collection-heading"><div><span className="eyebrow">GAME MOTION</span><h3 id="video-work-title">游戏视频</h3></div><span className="collection-total">{String(gameVideos.length).padStart(2, '0')} 支游戏视频</span></div><div className="game-video-grid">{gameVideos.map(item => <GameVideoCard key={item.id} item={item} />)}</div></div>
        <div className="work-collection" aria-labelledby="art-work-title"><div className="collection-heading"><div><span className="eyebrow">CHARACTER & WORLD</span><h3 id="art-work-title">角色与世界观</h3></div><span className="collection-total">21 件视觉作品</span></div><div className="project-grid">{projects.map(item => <ProjectCard key={item.id} project={item} onOpen={setProject} />)}</div></div>
        <div className="work-end"><span className="status-dot" /><p>持续创作，持续探索。</p><span>MORE WORLDS IN THE MAKING</span></div>
      </div></section>

      <section className="contact" id="contact" aria-labelledby="contact-title"><div className="shell contact-inner"><SectionLabel number="04">LET’S CONNECT / 联系我</SectionLabel><div className="contact-main"><p className="eyebrow">下一个好作品，始于一次对话。</p><h2 id="contact-title">一起，创造<br /><span>新的可能</span><a href={`mailto:${profile.email}`} aria-label="发送邮件讨论合作" className="contact-orb"><ArrowUpRight strokeWidth={1} /></a></h2><div className="contact-details"><div><span className="eyebrow">SAY HELLO</span><div className="email-row"><a href={`mailto:${profile.email}`} className="email-link">{profile.email}</a><button className="copy-button" onClick={copyEmail} aria-label={copied ? '邮箱已复制' : '复制邮箱'}>{copied ? <Check size={20} /> : <Copy size={20} />}</button></div><span className="copy-status" role="status">{copied ? '邮箱已复制' : copyFailed ? '请选中邮箱地址，手动复制' : ''}</span></div><div className="contact-phone"><span className="eyebrow">CALL ME</span><a href={`tel:${profile.phone}`}>183 2667 7056 <ArrowUpRight size={20} /></a></div></div></div><footer><a href="#home" className="brand">ZHAN<span className="brand-dot">®</span></a><p>© {new Date().getFullYear()} 占彦超 · 个人作品集</p><a href="#home" className="back-top">回到顶部 <ArrowUp size={16} /></a></footer></div></section>
    </main>

    {project && <Suspense fallback={<div className="project-dialog-loading" role="status">正在载入作品…</div>}><ProjectDialog project={project} onClose={() => setProject(null)} /></Suspense>}
  </>;
}
