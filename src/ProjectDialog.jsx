import { ArrowUpRight, X } from 'lucide-react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog';
import { uiAssets } from './content.js';

const asset = name => `/assets/${name}.webp`;

export default function ProjectDialog({ project, onClose }) {
  return (
    <Dialog open onOpenChange={open => { if (!open) onClose(); }}>
      <DialogContent className="project-dialog" showCloseButton={false}>
        <div className="dialog-heading">
          <div>
            <span className="eyebrow">{project.category}</span>
            <DialogTitle>{project.title}</DialogTitle>
          </div>
          <DialogClose className="dialog-close" aria-label="关闭作品详情"><X /></DialogClose>
        </div>
        <DialogDescription className="dialog-description">{project.description}</DialogDescription>
        <div className={`dialog-gallery ${project.layout ? `ui-gallery ui-gallery-${project.layout}` : ''}`}>
          {project.video && (
            <video key={project.video} controls playsInline preload="none" poster={asset(project.image)}>
              <source src={`/assets/${project.video}`} type="video/mp4" />
              你的浏览器暂不支持视频播放。
            </video>
          )}
          {project.images.map((name, index) => uiAssets[name] ? (
            <figure key={name}>
              <a href={asset(name)} target="_blank" rel="noopener noreferrer" aria-label={`查看${uiAssets[name].title}原尺寸图片（新标签页）`}>
                <img src={asset(name)} alt={uiAssets[name].title} loading="lazy" decoding="async" width={uiAssets[name].width} height={uiAssets[name].height} />
              </a>
              <figcaption>
                <span>{String(index + 1).padStart(2, '0')} / {uiAssets[name].title}</span>
                <a href={asset(name)} target="_blank" rel="noopener noreferrer" aria-label={`查看${uiAssets[name].title}原尺寸图片（新标签页）`}>查看原图 <ArrowUpRight size={13} /></a>
              </figcaption>
            </figure>
          ) : (
            <img key={name} src={asset(name)} alt={`${project.title} · 作品 ${index + 1}`} loading="lazy" decoding="async" width="1376" height="768" />
          ))}
        </div>
        <p className="dialog-end">{project.title} / {project.images.length} 件视觉作品{project.video ? ' + 1 支动态展示' : ''}</p>
      </DialogContent>
    </Dialog>
  );
}
