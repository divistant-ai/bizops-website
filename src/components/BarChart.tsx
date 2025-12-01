'use client';

type BarChartProps = {
  bars?: number;
  minHeight?: number;
  maxHeight?: number;
};

// Deterministic heights using a seeded pattern to avoid hydration mismatch
// Same values will be generated on server and client
function generateDeterministicHeights(bars: number, minHeight: number, maxHeight: number): number[] {
  const heights: number[] = [];
  const range = maxHeight - minHeight;
  
  // Use sine wave pattern with different frequencies for natural variation
  for (let i = 0; i < bars; i++) {
    // Combine multiple sine waves for natural variation
    const wave1 = Math.sin(i * 0.15) * 0.4;
    const wave2 = Math.sin(i * 0.35) * 0.3;
    const wave3 = Math.sin(i * 0.55) * 0.2;
    const wave4 = Math.sin(i * 0.75) * 0.1;
    
    const normalized = (wave1 + wave2 + wave3 + wave4 + 1) / 2; // Normalize to 0-1
    const height = minHeight + normalized * range;
    heights.push(Math.round(height * 100) / 100); // Round to 2 decimals
  }
  
  return heights;
}

export function BarChart({ bars = 40, minHeight = 30, maxHeight = 80 }: BarChartProps) {
  // Use deterministic heights that are the same on server and client
  const heights = generateDeterministicHeights(bars, minHeight, maxHeight);

  return (
    <div className="flex gap-1 items-end h-32">
      {heights.map((height, i) => (
        <div
          key={i}
          className="flex-1 origin-bottom rounded-t-sm bg-blue-500/30 transition-colors hover:bg-blue-500/80"
          style={{ height: `${height}%` }}
        />
      ))}
    </div>
  );
}

