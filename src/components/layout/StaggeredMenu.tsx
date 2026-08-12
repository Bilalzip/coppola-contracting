import React, { useCallback, useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Instagram, Facebook, Linkedin, ArrowUpRight } from 'lucide-react';

export interface StaggeredMenuItem {
  label: string;
  ariaLabel: string;
  link: string;
  subItems?: { label: string; ariaLabel: string; link: string; }[];
}
export interface StaggeredMenuSocialItem {
  label: string;
  link: string;
}
export interface StaggeredMenuButtonItem {
  label: string;
  ariaLabel: string;
  link: string;
}
export interface StaggeredMenuProps {
  position?: 'left' | 'right';
  colors?: string[];
  items?: StaggeredMenuItem[];
  buttonItems?: StaggeredMenuButtonItem[];
  socialItems?: StaggeredMenuSocialItem[];
  displaySocials?: boolean;
  displayItemNumbering?: boolean;
  className?: string;
  logoUrl?: string;
  menuButtonColor?: string;
  openMenuButtonColor?: string;
  accentColor?: string;
  isFixed: boolean;
  changeMenuColorOnOpen?: boolean;
  closeOnClickAway?: boolean;
  onMenuOpen?: () => void;
  onMenuClose?: () => void;
}

export const StaggeredMenu: React.FC<StaggeredMenuProps> = ({
  position = 'right',
  colors = ['#B19EEF', '#5227FF'],
  items = [],
  buttonItems = [],
  socialItems = [],
  displaySocials = true,
  displayItemNumbering = true,
  className,
  logoUrl = '/images/logo-svg/14-expandable.svg',
  menuButtonColor = '#fff',
  openMenuButtonColor = '#fff',
  changeMenuColorOnOpen = true,
  accentColor = '#5227FF',
  isFixed = false,
  closeOnClickAway = true,
  onMenuOpen,
  onMenuClose
}: StaggeredMenuProps) => {
  const [open, setOpen] = useState(false);
  const openRef = useRef(false);
  const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set());

  const panelRef = useRef<HTMLDivElement | null>(null);

  const plusHRef = useRef<HTMLSpanElement | null>(null);
  const plusVRef = useRef<HTMLSpanElement | null>(null);
  const iconRef = useRef<HTMLSpanElement | null>(null);

  const textInnerRef = useRef<HTMLSpanElement | null>(null);
  const textWrapRef = useRef<HTMLSpanElement | null>(null);
  const [textLines, setTextLines] = useState<string[]>(['Menu', 'Close']);

  const openTlRef = useRef<gsap.core.Timeline | null>(null);
  const closeTweenRef = useRef<gsap.core.Tween | null>(null);
  const spinTweenRef = useRef<gsap.core.Timeline | null>(null);
  const textCycleAnimRef = useRef<gsap.core.Tween | null>(null);
  const colorTweenRef = useRef<gsap.core.Tween | null>(null);

  const toggleBtnRef = useRef<HTMLButtonElement | null>(null);
  const busyRef = useRef(false);

  const itemEntranceTweenRef = useRef<gsap.core.Tween | null>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const panel = panelRef.current;

      const plusH = plusHRef.current;
      const plusV = plusVRef.current;
      const icon = iconRef.current;
      const textInner = textInnerRef.current;

      if (!panel || !plusH || !plusV || !icon || !textInner) return;

      const offscreen = position === 'left' ? -100 : 100;
      gsap.set(panel, { xPercent: offscreen });

      gsap.set(plusH, { transformOrigin: '50% 50%', rotate: 0 });
      gsap.set(plusV, { transformOrigin: '50% 50%', rotate: 90 });
      gsap.set(icon, { rotate: 0, transformOrigin: '50% 50%' });

      gsap.set(textInner, { yPercent: 0 });

      if (toggleBtnRef.current) {
        const isDark = document.documentElement.classList.contains('dark');
        const buttonColor = isDark ? '#F9FAFB' : menuButtonColor;
        gsap.set(toggleBtnRef.current, { color: buttonColor });
      }
    });
    return () => ctx.revert();
  }, [menuButtonColor, position]);

  const buildOpenTimeline = useCallback(() => {
    const panel = panelRef.current;
    if (!panel) return null;

    openTlRef.current?.kill();
    if (closeTweenRef.current) {
      closeTweenRef.current.kill();
      closeTweenRef.current = null;
    }
    itemEntranceTweenRef.current?.kill();

    const itemEls = Array.from(panel.querySelectorAll('.sm-panel-itemLabel')) as HTMLElement[];
    const numberEls = Array.from(
      panel.querySelectorAll('.sm-panel-list[data-numbering] .sm-panel-item')
    ) as HTMLElement[];
    const socialTitle = panel.querySelector('.sm-socials-title') as HTMLElement | null;
    const socialLinks = Array.from(panel.querySelectorAll('.sm-socials-link')) as HTMLElement[];

    const panelStart = Number(gsap.getProperty(panel, 'xPercent'));

    if (itemEls.length) gsap.set(itemEls, { yPercent: 140, rotate: 10 });
    if (numberEls.length) gsap.set(numberEls, { ['--sm-num-opacity' as any]: 0 });
    if (socialTitle) gsap.set(socialTitle, { opacity: 0 });
    if (socialLinks.length) gsap.set(socialLinks, { y: 25, opacity: 0 });

    const tl = gsap.timeline({ paused: true });

    const panelInsertTime = 0;
    const panelDuration = 0.5;

    tl.fromTo(
      panel,
      { xPercent: panelStart },
      { xPercent: 0, duration: panelDuration, ease: 'power4.out' },
      panelInsertTime
    );

    if (itemEls.length) {
      const itemsStartRatio = 0.15;
      const itemsStart = panelInsertTime + panelDuration * itemsStartRatio;

      tl.to(
        itemEls,
        { yPercent: 0, rotate: 0, duration: 1, ease: 'power4.out', stagger: { each: 0.1, from: 'start' } },
        itemsStart
      );

      if (numberEls.length) {
        tl.to(
          numberEls,
          { duration: 0.6, ease: 'power2.out', ['--sm-num-opacity' as any]: 1, stagger: { each: 0.08, from: 'start' } },
          itemsStart + 0.1
        );
      }
    }

    if (socialTitle || socialLinks.length) {
      const socialsStart = panelInsertTime + panelDuration * 0.4;

      if (socialTitle) tl.to(socialTitle, { opacity: 1, duration: 0.5, ease: 'power2.out' }, socialsStart);
      if (socialLinks.length) {
        tl.to(
          socialLinks,
          {
            y: 0,
            opacity: 1,
            duration: 0.55,
            ease: 'power3.out',
            stagger: { each: 0.08, from: 'start' },
            onComplete: () => {
              gsap.set(socialLinks, { clearProps: 'opacity' });
            }
          },
          socialsStart + 0.04
        );
      }
    }

    openTlRef.current = tl;
    return tl;
  }, [position]);

  const playOpen = useCallback(() => {
    if (busyRef.current) return;
    busyRef.current = true;
    const tl = buildOpenTimeline();
    if (tl) {
      tl.eventCallback('onComplete', () => {
        busyRef.current = false;
      });
      tl.play(0);
    } else {
      busyRef.current = false;
    }
  }, [buildOpenTimeline]);

  const playClose = useCallback(() => {
    if (busyRef.current) return;
    busyRef.current = true;

    openTlRef.current?.kill();
    openTlRef.current = null;
    itemEntranceTweenRef.current?.kill();

    const panel = panelRef.current;
    if (!panel) {
      busyRef.current = false;
      return;
    }

    closeTweenRef.current?.kill();

    const offscreen = position === 'left' ? -100 : 100;

    closeTweenRef.current = gsap.to(panel, {
      xPercent: offscreen,
      duration: 0.32,
      ease: 'power3.in',
      overwrite: 'auto',
      onComplete: () => {
        const itemEls = Array.from(panel.querySelectorAll('.sm-panel-itemLabel')) as HTMLElement[];
        if (itemEls.length) gsap.set(itemEls, { yPercent: 140, rotate: 10 });

        const numberEls = Array.from(
          panel.querySelectorAll('.sm-panel-list[data-numbering] .sm-panel-item')
        ) as HTMLElement[];
        if (numberEls.length) gsap.set(numberEls, { ['--sm-num-opacity' as any]: 0 });

        const socialTitle = panel.querySelector('.sm-socials-title') as HTMLElement | null;
        const socialLinks = Array.from(panel.querySelectorAll('.sm-socials-link')) as HTMLElement[];
        if (socialTitle) gsap.set(socialTitle, { opacity: 0 });
        if (socialLinks.length) gsap.set(socialLinks, { y: 25, opacity: 0 });

        busyRef.current = false;
      }
    });
  }, [position]);

  const animateIcon = useCallback((opening: boolean) => {
    const icon = iconRef.current;
    const h = plusHRef.current;
    const v = plusVRef.current;
    if (!icon || !h || !v) return;

    spinTweenRef.current?.kill();

    if (opening) {
      gsap.set(icon, { rotate: 0, transformOrigin: '50% 50%' });
      spinTweenRef.current = gsap
        .timeline({ defaults: { ease: 'power4.out' } })
        .to(h, { rotate: 45, duration: 0.5 }, 0)
        .to(v, { rotate: -45, duration: 0.5 }, 0);
    } else {
      spinTweenRef.current = gsap
        .timeline({ defaults: { ease: 'power3.inOut' } })
        .to(h, { rotate: 0, duration: 0.35 }, 0)
        .to(v, { rotate: 90, duration: 0.35 }, 0)
        .to(icon, { rotate: 0, duration: 0.001 }, 0);
    }
  }, []);

  const animateColor = useCallback(
    (opening: boolean) => {
      const btn = toggleBtnRef.current;
      if (!btn) return;
      colorTweenRef.current?.kill();

      const isDark = document.documentElement.classList.contains('dark');

      if (changeMenuColorOnOpen) {
        const targetColor = opening
          ? (isDark ? '#F9FAFB' : openMenuButtonColor)
          : (isDark ? '#F9FAFB' : menuButtonColor);
        colorTweenRef.current = gsap.to(btn, { color: targetColor, delay: 0.18, duration: 0.3, ease: 'power2.out' });
      } else {
        const buttonColor = isDark ? '#F9FAFB' : menuButtonColor;
        gsap.set(btn, { color: buttonColor });
      }
    },
    [openMenuButtonColor, menuButtonColor, changeMenuColorOnOpen]
  );

  React.useEffect(() => {
    if (toggleBtnRef.current) {
      const isDark = document.documentElement.classList.contains('dark');

      if (changeMenuColorOnOpen) {
        const targetColor = openRef.current
          ? (isDark ? '#F9FAFB' : openMenuButtonColor)
          : (isDark ? '#F9FAFB' : menuButtonColor);
        gsap.set(toggleBtnRef.current, { color: targetColor });
      } else {
        const buttonColor = isDark ? '#F9FAFB' : menuButtonColor;
        gsap.set(toggleBtnRef.current, { color: buttonColor });
      }
    }
  }, [changeMenuColorOnOpen, menuButtonColor, openMenuButtonColor]);

  const animateText = useCallback((opening: boolean) => {
    const inner = textInnerRef.current;
    if (!inner) return;

    textCycleAnimRef.current?.kill();

    const currentLabel = opening ? 'Menu' : 'Close';
    const targetLabel = opening ? 'Close' : 'Menu';
    const cycles = 3;

    const seq: string[] = [currentLabel];
    let last = currentLabel;
    for (let i = 0; i < cycles; i++) {
      last = last === 'Menu' ? 'Close' : 'Menu';
      seq.push(last);
    }
    if (last !== targetLabel) seq.push(targetLabel);
    seq.push(targetLabel);

    setTextLines(seq);
    gsap.set(inner, { yPercent: 0 });

    const lineCount = seq.length;
    const finalShift = ((lineCount - 1) / lineCount) * 100;

    textCycleAnimRef.current = gsap.to(inner, {
      yPercent: -finalShift,
      duration: 0.5 + lineCount * 0.07,
      ease: 'power4.out'
    });
  }, []);

  const toggleMenu = useCallback(() => {
    if (busyRef.current) return;

    const target = !openRef.current;
    openRef.current = target;
    setOpen(target);

    if (target) {
      onMenuOpen?.();
      playOpen();
    } else {
      onMenuClose?.();
      playClose();
    }

    animateIcon(target);
    animateColor(target);
    animateText(target);
  }, [playOpen, playClose, animateIcon, animateColor, animateText, onMenuOpen, onMenuClose]);

  const closeMenu = useCallback(() => {
    if (busyRef.current || !openRef.current) return;

    openRef.current = false;
    setOpen(false);
    onMenuClose?.();
    playClose();
    animateIcon(false);
    animateColor(false);
    animateText(false);
  }, [playClose, animateIcon, animateColor, animateText, onMenuClose]);

  React.useEffect(() => {
    if (!closeOnClickAway || !open) return;

    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
        closeMenu();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [closeOnClickAway, open, closeMenu]);

  return (
    <div
      className={`sm-scope z-[9999] ${isFixed ? `fixed top-0 left-0 w-screen h-screen overflow-hidden ${open ? 'pointer-events-auto' : 'pointer-events-none'}` : 'w-full h-full'}`}
    >
      <div
        className={(className ? className + ' ' : '') + 'staggered-menu-wrapper relative w-full h-full z-[9999]'}
        style={accentColor ? ({ ['--sm-accent' as any]: accentColor } as React.CSSProperties) : undefined}
        data-position={position}
        data-open={open || undefined}
      >

        <header
          className="staggered-menu-header relative w-full flex items-center justify-between p-3 sm:p-6 lg:p-8 bg-transparent z-[10000] pointer-events-auto"
          aria-label="Main navigation header"
        >
          <div
            className={`sm-logo flex items-center select-none transition-opacity duration-300 ${open ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
            aria-label="Logo"
          >
            <a href="/">
              <img
                src={logoUrl}
                alt="Logo"
                className="sm-logo-img block h-12 w-auto sm:h-16 md:h-20 lg:h-24 xl:h-28 object-contain transition-all duration-300"
                draggable={false}
              />
            </a>
          </div>

          <button
            ref={toggleBtnRef}
            className={`sm-toggle relative inline-flex items-center gap-[0.3rem] bg-transparent border-0 cursor-pointer font-medium leading-none overflow-visible text-base sm:text-lg ${
              open ? 'text-black' : 'text-[#2C3539] dark:text-[#F9FAFB]'
            }`}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="staggered-menu-panel"
            onClick={toggleMenu}
            type="button"
          >
            <span
              ref={textWrapRef}
              className="sm-toggle-textWrap relative inline-block h-[1em] overflow-hidden whitespace-nowrap w-[var(--sm-toggle-width,auto)] min-w-[var(--sm-toggle-width,auto)]"
              aria-hidden="true"
            >
              <span ref={textInnerRef} className="sm-toggle-textInner flex flex-col leading-none">
                {textLines.map((l, i) => (
                  <span className="sm-toggle-line block h-[1em] leading-none" key={i}>
                    {l}
                  </span>
                ))}
              </span>
            </span>

            <span
              ref={iconRef}
              className="sm-icon relative w-[14px] h-[14px] shrink-0 inline-flex items-center justify-center [will-change:transform]"
              aria-hidden="true"
            >
              <span
                ref={plusHRef}
                className="sm-icon-line absolute left-1/2 top-1/2 w-full h-[2px] bg-current rounded-[2px] -translate-x-1/2 -translate-y-1/2 [will-change:transform]"
              />
              <span
                ref={plusVRef}
                className="sm-icon-line sm-icon-line-v absolute left-1/2 top-1/2 w-full h-[2px] bg-current rounded-[2px] -translate-x-1/2 -translate-y-1/2 [will-change:transform]"
              />
            </span>
          </button>
        </header>

        <aside
          id="staggered-menu-panel"
          ref={panelRef}
          className="staggered-menu-panel fixed top-0 right-0 h-full bg-white dark:bg-[#0a0a0a] flex flex-col p-[6em_2em_2em_2em] overflow-y-auto z-[9996] backdrop-blur-[12px] pointer-events-auto"
          style={{ WebkitBackdropFilter: 'blur(12px)' }}
          aria-hidden={!open}
        >
          <div className="sm-panel-inner flex-1 flex flex-col min-h-full">
            <ul
              className="sm-panel-list list-none m-0 p-0 flex flex-col gap-3"
              role="list"
              data-numbering={displayItemNumbering || undefined}
            >
              {items && items.length ? (
                items.map((it, idx) => {
                  const hasSubItems = it.subItems && it.subItems.length > 0;
                  const isExpanded = expandedItems.has(idx);

                  return (
                    <li className="sm-panel-itemWrap relative overflow-visible leading-none" key={it.label + idx}>
                      {hasSubItems ? (
                        <div className="flex flex-col w-full">
                          <button
                            className="sm-panel-item relative text-black dark:text-white font-normal text-[1.5rem] sm:text-[1.8rem] md:text-[2rem] cursor-pointer leading-tight tracking-normal uppercase transition-[background,color] duration-150 ease-linear flex items-center gap-2 w-full no-underline text-left py-1"
                            aria-label={it.ariaLabel}
                            data-index={idx + 1}
                            onClick={() => {
                              const newExpanded = new Set(expandedItems);
                              if (isExpanded) {
                                newExpanded.delete(idx);
                              } else {
                                newExpanded.add(idx);
                              }
                              setExpandedItems(newExpanded);
                            }}
                          >
                            <span className="sm-panel-itemLabel inline-block [transform-origin:50%_100%] will-change-transform">
                              {it.label}
                            </span>
                            <ArrowUpRight
                              className={`w-5 h-5 flex-shrink-0 transition-transform duration-300 ${isExpanded ? 'rotate-90' : ''}`}
                              strokeWidth={1.5}
                            />
                          </button>

                          {isExpanded && it.subItems && (
                            <ul className="pl-8 mt-3 flex flex-col gap-2">
                              {it.subItems.map((subItem, subIdx) => (
                                <li key={subItem.label + subIdx} className="overflow-hidden">
                                  <a
                                    href={subItem.link}
                                    aria-label={subItem.ariaLabel}
                                    onClick={(e) => {
                                      if (subItem.link === '#') e.preventDefault();
                                      closeMenu();
                                    }}
                                    className="text-black dark:text-white font-medium text-[1.1rem] sm:text-[1.2rem] cursor-pointer leading-tight tracking-normal transition-[color] duration-150 ease-linear inline-block no-underline hover:opacity-70"
                                  >
                                    {subItem.label}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      ) : (
                        <a
                          className="sm-panel-item relative text-black dark:text-white font-normal text-[1.5rem] sm:text-[1.8rem] md:text-[2rem] cursor-pointer leading-tight tracking-normal uppercase transition-[background,color] duration-150 ease-linear inline-block no-underline py-1"
                          href={it.link}
                          aria-label={it.ariaLabel}
                          data-index={idx + 1}
                          onClick={(e) => {
                            if (it.link === '#') e.preventDefault();
                            closeMenu();
                          }}
                        >
                          <span className="sm-panel-itemLabel inline-block [transform-origin:50%_100%] will-change-transform">
                            {it.label}
                          </span>
                        </a>
                      )}
                    </li>
                  );
                })
              ) : (
                <li className="sm-panel-itemWrap relative overflow-hidden leading-none" aria-hidden="true">
                  <span className="sm-panel-item relative text-black dark:text-white font-semibold text-[4rem] cursor-pointer leading-none tracking-[-2px] uppercase transition-[background,color] duration-150 ease-linear inline-block no-underline pr-[1.4em]">
                    <span className="sm-panel-itemLabel inline-block [transform-origin:50%_100%] will-change-transform">
                      No items
                    </span>
                  </span>
                </li>
              )}
            </ul>

            <div className="flex-grow"></div>

            {buttonItems && buttonItems.length > 0 && (
              <div className="sm-buttons pt-8 flex flex-col gap-3 w-full">
                {buttonItems.map((btn, btnIdx) => (
                  <a
                    key={btn.label + btnIdx}
                    href={btn.link}
                    aria-label={btn.ariaLabel}
                    onClick={(e) => {
                      if (btn.link === '#') e.preventDefault();
                      closeMenu();
                    }}
                    className="sm-button-item block text-center px-8 py-3.5 bg-[#1a1a2e] dark:bg-[#1a1a2e] text-white font-semibold text-base rounded-xl hover:bg-[#16213e] dark:hover:bg-[#16213e] transition-colors duration-300 no-underline"
                  >
                    {btn.label}
                  </a>
                ))}
              </div>
            )}

            {displaySocials && socialItems && socialItems.length > 0 && (
              <div className="sm-socials pt-6 pb-4 flex flex-col gap-4 border-t border-[#E5E3DF] dark:border-[#2C3539]" aria-label="Social links">
                <h3 className="sm-socials-title m-0 text-sm font-light tracking-wide uppercase text-[#5D6D74] dark:text-[#D1D5DB] pt-4">Follow us</h3>
                <ul
                  className="sm-socials-list list-none m-0 p-0 flex flex-row items-center gap-4 flex-wrap"
                  role="list"
                >
                  {socialItems.map((s, i) => {
                    const Icon = s.label === 'Instagram' ? Instagram : s.label === 'Facebook' ? Facebook : s.label === 'LinkedIn' ? Linkedin : null;
                    return Icon ? (
                      <li key={s.label + i} className="sm-socials-item">
                        <a
                          href={s.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="sm-socials-link text-[#2C3539] dark:text-[#F9FAFB] hover:text-[#5D6D74] dark:hover:text-[#D1D5DB] no-underline relative inline-block transition-colors duration-300 ease-linear"
                          aria-label={s.label}
                        >
                          <Icon className="w-4 h-4" strokeWidth={1.5} />
                        </a>
                      </li>
                    ) : null;
                  })}
                </ul>
              </div>
            )}
          </div>
        </aside>
      </div>

      <style>{`
.sm-scope .staggered-menu-wrapper { position: relative; width: 100%; height: 100%; z-index: 9999; }
.sm-scope .staggered-menu-header { position: relative; width: 100%; display: flex; align-items: center; justify-content: space-between; padding: 0.75rem 1.5rem; background: transparent; pointer-events: auto; z-index: 10000; }
.sm-scope .sm-logo { display: flex; align-items: center; user-select: none; }
.sm-scope .sm-logo-img { display: block; height: 3rem; width: auto; object-fit: contain; }
.sm-scope .sm-toggle { position: relative; display: inline-flex; align-items: center; gap: 0.3rem; background: transparent; border: none; cursor: pointer; font-weight: 500; line-height: 1; overflow: visible; }
.sm-scope .sm-toggle:focus-visible { outline: 2px solid #ffffffaa; outline-offset: 4px; border-radius: 4px; }
.sm-scope .sm-toggle-textWrap { position: relative; margin-right: 0.5em; display: inline-block; height: 1em; overflow: hidden; white-space: nowrap; width: var(--sm-toggle-width, auto); min-width: var(--sm-toggle-width, auto); }
.sm-scope .sm-toggle-textInner { display: flex; flex-direction: column; line-height: 1; }
.sm-scope .sm-toggle-line { display: block; height: 1em; line-height: 1; }
.sm-scope .sm-icon { position: relative; width: 14px; height: 14px; flex: 0 0 14px; display: inline-flex; align-items: center; justify-content: center; will-change: transform; }
.sm-scope .sm-panel-itemWrap { position: relative; overflow: hidden; line-height: 1; }
.sm-scope .sm-icon-line { position: absolute; left: 50%; top: 50%; width: 100%; height: 2px; background: currentColor; border-radius: 2px; transform: translate(-50%, -50%); will-change: transform; }
.sm-scope .staggered-menu-panel { position: fixed; top: 0; right: 0; width: clamp(320px, 85vw, 480px); height: 100%; backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); display: flex; flex-direction: column; padding: 6em 2em 2em 2em; overflow-y: auto; z-index: 9996; pointer-events: auto; }
.sm-scope [data-position='left'] .staggered-menu-panel { right: auto; left: 0; }
.sm-scope .sm-panel-inner { flex: 1; display: flex; flex-direction: column; gap: 1.25rem; }
.sm-scope .sm-socials { margin-top: auto; padding-top: 2rem; display: flex; flex-direction: column; gap: 0.75rem; }
.sm-scope .sm-socials-title { margin: 0; font-size: 1rem; font-weight: 500; }
.sm-scope .sm-socials-list { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: row; align-items: center; gap: 1rem; flex-wrap: wrap; }
.sm-scope .sm-socials-list .sm-socials-link { opacity: 1; transition: opacity 0.3s ease; }
.sm-scope .sm-socials-list:hover .sm-socials-link:not(:hover) { opacity: 0.35; }
.sm-scope .sm-socials-list:focus-within .sm-socials-link:not(:focus-visible) { opacity: 0.35; }
.sm-scope .sm-socials-list .sm-socials-link:hover,
.sm-scope .sm-socials-list .sm-socials-link:focus-visible { opacity: 1; }
.sm-scope .sm-socials-link:focus-visible { outline: 2px solid var(--sm-accent, #2C3539); outline-offset: 3px; }
.sm-scope .sm-socials-link { font-size: 1.2rem; font-weight: 500; text-decoration: none; position: relative; padding: 2px 0; display: inline-block; transition: color 0.3s ease, opacity 0.3s ease; }
.sm-scope .sm-socials-link:hover { color: var(--sm-accent, #2C3539); }
.sm-scope .sm-panel-list { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 0.5rem; }
.sm-scope .sm-panel-item { position: relative; font-weight: 600; cursor: pointer; line-height: 1; letter-spacing: -2px; text-transform: uppercase; transition: color 0.25s; text-decoration: none; padding-right: 0; }
.sm-scope a.sm-panel-item { display: inline-block; }
.sm-scope button.sm-panel-item { display: flex !important; align-items: center; gap: 0.5rem; }
.sm-scope .sm-panel-itemLabel { display: inline-block; will-change: transform; transform-origin: 50% 100%; }
.sm-scope .sm-panel-item:hover { color: var(--sm-accent, #2C3539); }
.sm-scope .sm-panel-list[data-numbering] { counter-reset: smItem; }
.sm-scope .sm-panel-list[data-numbering] .sm-panel-item::after { counter-increment: smItem; content: counter(smItem, decimal-leading-zero); position: absolute; top: 0.1em; right: 0; font-size: 18px; font-weight: 400; color: var(--sm-accent, #2C3539); letter-spacing: 0; pointer-events: none; user-select: none; opacity: var(--sm-num-opacity, 0); }
@media (max-width: 1024px) { .sm-scope .staggered-menu-panel { width: 100%; left: 0; right: 0; } }
@media (max-width: 640px) { .sm-scope .staggered-menu-panel { width: 100%; left: 0; right: 0; } .sm-scope .sm-logo-img { height: 3rem; } }
      `}</style>
    </div>
  );
};

export default StaggeredMenu;

