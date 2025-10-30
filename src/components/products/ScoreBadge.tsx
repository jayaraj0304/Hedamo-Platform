import { Badge } from '@/components/ui/badge';
import { getScoreColor, getScoreLabel } from '@/data/mockProducts';
import { cn } from '@/lib/utils';

interface ScoreBadgeProps {
  score: number;
}

export function ScoreBadge({ score }: ScoreBadgeProps) {
  const scoreColor = getScoreColor(score);
  const scoreLabel = getScoreLabel(score);

  return (
    <Badge
      className={cn(
        'font-semibold',
        scoreColor === 'high' && 'bg-score-high-bg text-score-high border-score-high/20',
        scoreColor === 'medium' && 'bg-score-medium-bg text-score-medium border-score-medium/20',
        scoreColor === 'low' && 'bg-score-low-bg text-score-low border-score-low/20'
      )}
    >
      {score} - {scoreLabel}
    </Badge>
  );
}
