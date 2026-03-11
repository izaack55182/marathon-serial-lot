import { cn } from '@/utils/misc'
import { motion } from "motion/react";
import { Icon } from "@/components/ui/icon";
import { FEATURES, STACK_COMPARISON_STATS } from "../constants";
import { useState, memo } from "react";
import { MorphingText } from "@/components/ui/morphing-text";
import { ACCENT } from "../constants";
// Stats Comparison Card Component
const ComparisonCard = memo(function ComparisonCard() {
    return (
        <div className="w-full bg-card rounded-[32px] border border-border relative overflow-hidden flex flex-col shadow-xl shadow-foreground/5 dark:shadow-none">

            {/* Shimmer line */}
            <div className="absolute top-0 left-[20%] right-[20%] h-px bg-gradient-to-r from-transparent via-border to-transparent" />

            {/* Grid texture */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.025] dark:opacity-[0.015] bg-[linear-gradient(to_right,#80808018_1px,transparent_1px),linear-gradient(to_bottom,#80808018_1px,transparent_1px)] bg-[size:28px_28px]" />

            {/* Header */}
            <div className="relative z-10 flex items-center justify-between px-8 md:px-10 pt-8 pb-6 border-b border-border">
                <div className="flex flex-col gap-1">
                    <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground">
                        Benchmark Real
                    </h4>
                    <p className="text-lg font-black tracking-tight text-foreground">
                        Codenity vs El Resto
                    </p>
                </div>
                <div className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/5">
                    <div className="size-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                    <span className="text-[10px] font-black uppercase tracking-tighter text-emerald-600 dark:text-emerald-400">
                        Auditado
                    </span>
                </div>
            </div>

            {/* Grid of stats — 2×2 with dividers */}
            <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2">
                {STACK_COMPARISON_STATS.map((stat, i) => {
                    const ac = ACCENT[stat.accent as keyof typeof ACCENT];
                    const isRightCol = i % 2 === 1;
                    const isBottomRow = i >= 2;

                    return (
                        <motion.div
                            key={stat.category}
                            initial={{ opacity: 0, y: 14 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{
                                delay: typeof window !== 'undefined' && window.innerWidth < 768 ? 0 : i * 0.08,
                                duration: 0.45,
                                ease: [0.25, 0.46, 0.45, 0.94]
                            }}
                            className={cn(
                                "flex flex-col gap-5 p-8 md:p-10 group/item",
                                isRightCol && "sm:border-l border-border",
                                isBottomRow && "border-t border-border",
                            )}
                        >
                            {/* Category + icon */}
                            <div className="flex items-center justify-between">
                                <div className={cn(
                                    "inline-flex items-center px-2.5 py-0.5 rounded-md text-[9px] font-black uppercase tracking-widest border",
                                    ac.badge
                                )}>
                                    {stat.category}
                                </div>
                                <Icon
                                    name={(stat as any).icon}
                                    className={cn("size-5 transition-transform duration-300 group-hover/item:scale-110", ac.text)}
                                />
                            </div>

                            {/* Value */}
                            <div className="flex flex-col gap-0.5">
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.88 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.08 + 0.1, duration: 0.5, ease: [0.34, 1.2, 0.64, 1] }}
                                    className="text-5xl lg:text-6xl font-black tracking-tighter leading-none text-foreground"
                                >
                                    {stat.value}
                                </motion.div>
                                <div className="text-sm font-bold tracking-tight text-muted-foreground mt-1">
                                    {stat.unit}
                                </div>
                            </div>

                            {/* Competitor bars */}
                            <div className="flex flex-col gap-2">
                                {stat.competitors.map((comp, ci) => (
                                    <div key={comp.name} className="flex items-center gap-2.5">
                                        <span className={cn(
                                            "text-[9px] font-bold uppercase tracking-wide w-14 shrink-0 text-right leading-none",
                                            comp.ours ? ac.text : "text-muted-foreground/35"
                                        )}>
                                            {comp.name}
                                        </span>
                                        <div className="flex-1 h-1.5 rounded-full bg-muted/50 overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                whileInView={{ width: `${comp.pct}%` }}
                                                viewport={{ once: true }}
                                                transition={{
                                                    delay: i * 0.08 + 0.18 + ci * 0.05,
                                                    duration: 0.65,
                                                    ease: [0.25, 0.46, 0.45, 0.94],
                                                }}
                                                className={cn(
                                                    "h-full rounded-full",
                                                    comp.ours ? ac.bar : "bg-muted-foreground/20"
                                                )}
                                            />
                                        </div>
                                        <span className={cn(
                                            "text-[9px] font-bold tabular-nums w-10 shrink-0",
                                            comp.ours ? ac.text : "text-muted-foreground/35"
                                        )}>
                                            {comp.val}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            {/* VS label */}
                            <div className="flex items-center gap-2 overflow-hidden">
                                <span className="h-px w-3 bg-border shrink-0" />
                                <div className="flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-widest whitespace-nowrap overflow-hidden">
                                    {stat.label.includes(" vs ") ? (
                                        <>
                                            <span className="text-foreground font-black">
                                                {stat.label.split(" vs ")[0]}
                                            </span>
                                            <span className="text-muted-foreground/25 lowercase font-medium">vs</span>
                                            <span className="text-muted-foreground/50">
                                                {stat.label.split(" vs ")[1]}
                                            </span>
                                        </>
                                    ) : (
                                        <span className="text-muted-foreground/50">{stat.label}</span>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            {/* Footer */}
            <div className="relative z-10 flex items-center justify-between px-8 md:px-10 py-4 border-t border-border bg-muted/[0.03]">
                <div className="flex items-center gap-3 flex-wrap">
                    {["Edge-Native", "V8 Isolates", "Bun Runtime", "Hono Framework"].map((tool) => (
                        <span key={tool} className="text-[9px] font-black text-foreground/40 uppercase tracking-[0.2em]">
                            {tool}
                        </span>
                    ))}
                </div>
                <span className="text-[9px] font-bold text-muted-foreground/30 uppercase tracking-widest shrink-0">
                    Precision Build · v7.13
                </span>
            </div>

        </div>
    );
});

// ── Main Section ──────────────────────────────────────────────────────────────

export function Features() {
    const [activeIndex, setActiveIndex] = useState(0);

    const techNames = FEATURES.map((f) => f.title);

    const handleIndexChange = (newIndex: number) => {
        setActiveIndex(newIndex);
    };

    const activeFeature = FEATURES[activeIndex];

    return (
        <section id="features" className="w-full px-4 py-12 md:py-24 lg:py-32 bg-background overflow-clip scroll-mt-32">
            <div className="mx-auto max-w-[1400px]">
                {/* Section header */}
                <div className="mb-12 md:mb-20 lg:mb-24 flex flex-col items-center gap-4 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center rounded-full border border-border bg-secondary/50 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur-sm"
                    >
                        Codenity Stack
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-4xl md:text-6xl font-black tracking-tight text-foreground"
                    >
                        Ingeniería de{" "}
                        <span className="italic text-sky-400">
                            Precisión
                        </span>
                        .
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-muted-foreground max-w-2xl mx-auto text-sm md:text-base leading-relaxed"
                    >
                        Codenity elimina el "bloat" innecesario para que tu producto se ejecute con
                        velocidad nativa en el Edge, cautivando a tus usuarios desde el primer milisegundo.
                    </motion.p>
                </div>

                {/* Two Column Layout */}
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 xl:gap-32 items-start">
                    {/* Left: Morphing Text */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="space-y-2 lg:sticky lg:top-32"
                    >
                        <div className="space-y-2">
                            <h3 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight text-foreground">
                                Todo el poder de
                            </h3>
                            <div className="min-h-[80px] md:min-h-[100px] flex items-start">
                                <MorphingText
                                    texts={techNames}
                                    className="!text-4xl md:!text-6xl lg:!text-7xl !h-20 md:!h-10 !leading-none !w-full !text-left !mx-0"
                                    style={{
                                        color:
                                            activeFeature?.hoverColor || "#ec4899",
                                        transition: "color 0.7s ease-in-out",
                                    }}
                                    onIndexChange={handleIndexChange}
                                />
                            </div>
                        </div>

                        <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-lg">
                            Ingeniería de vanguardia para productos que escalan sin fricción.
                            Codenity unifica las herramientas más potentes del ecosistema para
                            que transformes ideas complejas en realidades de alto rendimiento.
                        </p>
                    </motion.div>

                    {/* Right: Stats Comparison Card */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative"
                    >
                        <ComparisonCard />
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
