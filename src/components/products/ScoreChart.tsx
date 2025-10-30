import { getScoreColor } from '@/data/mockProducts';
import { cn } from '@/lib/utils';

interface ScoreChartProps {
  score: number;
  size?: 'sm' | 'md' | 'lg';
}

export function ScoreChart({ score, size = 'md' }: ScoreChartProps) {
  const scoreColor = getScoreColor(score);
  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  const sizeClasses = {
    sm: 'h-20 w-20',
    md: 'h-32 w-32',
    lg: 'h-48 w-48',
  };

  const textSizeClasses = {
    sm: 'text-lg',
    md: 'text-3xl',
    lg: 'text-5xl',
  };

  const labelSizeClasses = {
    sm: 'text-[10px]',
    md: 'text-xs',
    lg: 'text-sm',
  };

  return (
    <div className={cn('relative', sizeClasses[size])}>
      <svg className="h-full w-full -rotate-90 transform">
        <circle
          cx="50%"
          cy="50%"
          r="45%"
          fill="none"
          stroke="currentColor"
          strokeWidth="8"
          className="text-secondary"
        />
        <circle
          cx="50%"
          cy="50%"
          r="45%"
          fill="none"
          stroke="currentColor"
          strokeWidth="8"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className={cn(
            'transition-all duration-1000 ease-out',
            scoreColor === 'high' && 'text-score-high',
            scoreColor === 'medium' && 'text-score-medium',
            scoreColor === 'low' && 'text-score-low'
          )}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className={cn('font-bold text-foreground', textSizeClasses[size])}>
          {score}
        </span>
        <span className={cn('text-muted-foreground font-medium', labelSizeClasses[size])}>
          / 100
        </span>
      </div>
    </div>
  );
}
