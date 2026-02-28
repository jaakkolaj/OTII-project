"use client";

type ScoreRingProps = {
  score: number;
  label?: string;
};

const clampScore = (score: number) => Math.max(0, Math.min(100, score));

export function ScoreRing({ score, label = "AI fit" }: ScoreRingProps) {
  const clamped = clampScore(score);
  const angle = clamped * 3.6;
  const color =
    clamped >= 80
      ? "var(--chart-2)"
      : clamped >= 60
        ? "var(--chart-4)"
        : "var(--chart-5)";

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative h-24 w-24">
        <div
          className="h-24 w-24 rounded-full"
          style={{
            background: `conic-gradient(${color} ${angle}deg, var(--muted) 0deg)`,
          }}
        />
        <div className="absolute inset-3 flex items-center justify-center rounded-full bg-card text-sm font-semibold">
          {clamped}%
        </div>
      </div>
      <span className="text-xs text-muted-foreground">{label}</span>
    </div>
  );
}
