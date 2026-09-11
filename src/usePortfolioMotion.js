import { useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function usePortfolioMotion() {
  useLayoutEffect(() => {
    const root = document.getElementById('root');
    if (!root) return undefined;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return undefined;

    const context = gsap.context(() => {
      const intro = gsap.timeline({
        defaults: { ease: 'power4.out' },
      });

      gsap.set('.site-header', { yPercent: -110, autoAlpha: 0 });
      gsap.set('.hero-video', { scale: 1.12, filter: 'saturate(.35) brightness(.72)' });
      gsap.set('.hero-topline', { x: -54, autoAlpha: 0 });
      gsap.set('.hero-name-solid', {
        clipPath: 'inset(0 100% 0 0)',
        x: -70,
        scaleX: 0.68,
        transformOrigin: 'left center',
      });
      gsap.set('.hero-name-outline', {
        clipPath: 'inset(0 100% 0 0)',
        x: 80,
        scaleX: 1.18,
        transformOrigin: 'left center',
      });
      gsap.set('.hero-name-meta', { clipPath: 'inset(0 100% 0 0)', y: 34 });
      gsap.set('.hero-tagline', { y: 26, autoAlpha: 0 });
      gsap.set('.hero-foot', { y: 28, autoAlpha: 0 });

      intro
        .to('.hero-video', {
          scale: 1,
          filter: 'saturate(.65) brightness(1)',
          duration: 2.6,
          ease: 'power3.out',
        }, 0)
        .to('.site-header', { yPercent: 0, autoAlpha: 1, duration: 1.05 }, 0.12)
        .to('.hero-topline', { x: 0, autoAlpha: 1, duration: 1 }, 0.32)
        .to('.hero-name-solid', {
          clipPath: 'inset(0 0% 0 0)',
          x: 0,
          scaleX: 1,
          duration: 1.55,
          onComplete: () => gsap.set('.hero-name-solid', { clearProps: 'clipPath' }),
        }, 0.42)
        .to('.hero-name-outline', {
          clipPath: 'inset(0 0% 0 0)',
          x: 0,
          scaleX: 1,
          duration: 1.65,
          onComplete: () => gsap.set('.hero-name-outline', { clearProps: 'clipPath' }),
        }, 0.65)
        .to('.hero-name-meta', {
          clipPath: 'inset(0 0% 0 0)',
          y: 0,
          duration: 1.25,
          onComplete: () => gsap.set('.hero-name-meta', { clearProps: 'clipPath' }),
        }, 1.08)
        .to('.hero-tagline', { y: 0, autoAlpha: 1, duration: 1.05 }, 1.38)
        .to('.hero-foot', { y: 0, autoAlpha: 1, duration: 1 }, 1.55);

      gsap.utils.toArray('main > section:not(.hero), .about, .work, .expertise, .contact').forEach(section => {
        const label = section.querySelector('.section-label');
        const heading = section.querySelector('.about-copy h2, .section-heading h2, .contact-main h2');

        if (label) {
          gsap.from(label, {
            x: -100,
            autoAlpha: 0,
            letterSpacing: '0.5em',
            duration: 1.25,
            ease: 'power4.out',
            scrollTrigger: { trigger: label, start: 'top 88%', once: true },
          });
        }

        if (heading) {
          gsap.from(heading, {
            yPercent: 60,
            scaleX: 0.78,
            skewY: 3,
            clipPath: 'inset(0 0 100% 0)',
            transformOrigin: 'left bottom',
            duration: 1.55,
            ease: 'power4.out',
            scrollTrigger: { trigger: heading, start: 'top 87%', once: true },
            onComplete: () => gsap.set(heading, { clearProps: 'clipPath' }),
          });
        }
      });

      const cardSelector = [
        '.portrait-block',
        '.about-copy',
        '.experience',
        '.ui-project-card',
        '.management-shell',
        '.game-video-card',
        '.project-card',
        '.strength-glow',
      ].join(',');
      const cards = gsap.utils.toArray(cardSelector);
      gsap.set(cards, { y: 76, autoAlpha: 0, scale: 0.965, willChange: 'transform, opacity' });
      ScrollTrigger.batch(cards, {
        start: 'top 90%',
        once: true,
        interval: 0.14,
        batchMax: 4,
        onEnter: batch => gsap.to(batch, {
          y: 0,
          autoAlpha: 1,
          scale: 1,
          duration: 1.25,
          stagger: 0.16,
          ease: 'power4.out',
          overwrite: true,
          onComplete: () => gsap.set(batch, { clearProps: 'willChange' }),
        }),
      });

      const revealSelector = '.portrait-frame, .ui-cover, .project-image';
      const reveals = gsap.utils.toArray(revealSelector);
      gsap.set(reveals, { clipPath: 'inset(0 0 100% 0)', willChange: 'clip-path' });
      ScrollTrigger.batch(reveals, {
        start: 'top 88%',
        once: true,
        interval: 0.12,
        batchMax: 3,
        onEnter: batch => {
          gsap.to(batch, {
            clipPath: 'inset(0 0 0% 0)',
            duration: 1.45,
            stagger: 0.14,
            ease: 'power4.inOut',
            onComplete: () => gsap.set(batch, { clearProps: 'clipPath,willChange' }),
          });
          batch.forEach((frame, index) => {
            const images = frame.querySelector('.project-image-carousel') ? [] : frame.querySelectorAll('img');
            if (images.length) {
              gsap.from(images, {
                scale: 1.1,
                willChange: 'transform',
                duration: 1.8,
                delay: index * 0.1,
                ease: 'power3.out',
                onComplete: () => gsap.set(images, { clearProps: 'willChange' }),
              });
            }
          });
        },
      });

      if (!window.matchMedia('(max-width: 760px)').matches) {
        gsap.utils.toArray('.portrait-frame > img, .project-image:not(.project-image-quad) > img').forEach(image => {
          gsap.fromTo(image, { yPercent: -4 }, {
            yPercent: 6,
            ease: 'none',
            scrollTrigger: {
              trigger: image.parentElement,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.9,
            },
          });
        });
      }
    }, root);

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener('load', refresh, { once: true });
    const refreshTimer = window.setTimeout(refresh, 300);

    return () => {
      window.removeEventListener('load', refresh);
      window.clearTimeout(refreshTimer);
      context.revert();
    };
  }, []);
}
