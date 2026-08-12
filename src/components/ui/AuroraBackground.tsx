/**
 * Ambient showroom background: cool porcelain base, drifting oxford/sapphire
 * light blobs, a faint grid, and a soft vignette. Decorative only.
 */
export function AuroraBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-porcelain-50 dark:bg-[#05070d]">
      {/* grid */}
      <div className="absolute inset-0 bg-grid opacity-50 [mask-image:radial-gradient(ellipse_at_center,black_25%,transparent_70%)]" />

      {/* cool drifting blobs */}
      <div className="absolute -left-40 -top-40 h-[36rem] w-[36rem] transform-gpu rounded-full bg-true-blue/[0.07] blur-[130px] animate-aurora dark:bg-true-blue/25" />
      <div
        className="absolute -right-40 top-1/3 h-[32rem] w-[32rem] transform-gpu rounded-full bg-sapphire/[0.06] blur-[130px] animate-aurora dark:bg-sapphire/25"
        style={{ animationDelay: '-8s' }}
      />
      <div
        className="absolute bottom-0 left-1/4 h-[30rem] w-[30rem] transform-gpu rounded-full bg-cool-gray/[0.14] blur-[130px] animate-aurora dark:bg-brand-accent/12"
        style={{ animationDelay: '-16s' }}
      />

      {/* top glow */}
      <div className="absolute left-1/2 top-0 h-[24rem] w-[52rem] -translate-x-1/2 rounded-full bg-brand-accent/[0.05] blur-[110px] dark:bg-brand-accent/10" />

      {/* vignette */}
      <div className="absolute inset-0 bg-radial-fade from-transparent via-transparent to-porcelain-200/50 dark:to-black/70" />
    </div>
  );
}

export default AuroraBackground;
