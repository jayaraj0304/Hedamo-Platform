import { Package, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { mockProducts } from '@/data/mockProducts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScoreChart } from '@/components/products/ScoreChart';
import { ScoreBadge } from '@/components/products/ScoreBadge';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export default function Dashboard() {
  const totalProducts = mockProducts.length;
  const avgScore = Math.round(
    mockProducts.reduce((sum, p) => sum + p.score, 0) / mockProducts.length
  );
  const flaggedProducts = mockProducts.filter((p) => p.status === 'flagged').length;
  const activeProducts = mockProducts.filter((p) => p.status === 'active').length;

  const recentProducts = mockProducts.slice(0, 4);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Welcome back! Here's an overview of your product transparency.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Products"
          value={totalProducts}
          change="+2 this week"
          changeType="positive"
          icon={Package}
        />
        <StatsCard
          title="Average Score"
          value={avgScore}
          change="+5% from last month"
          changeType="positive"
          icon={TrendingUp}
        />
        <StatsCard
          title="Flagged Products"
          value={flaggedProducts}
          change="Needs attention"
          changeType="negative"
          icon={AlertTriangle}
        />
        <StatsCard
          title="Active Products"
          value={activeProducts}
          change="Live on platform"
          changeType="neutral"
          icon={CheckCircle}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Products</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentProducts.map((product) => (
              <Link
                key={product.id}
                to={`/products/${product.id}`}
                className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-accent transition-colors group"
              >
                <div className="flex-1">
                  <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                    {product.name}
                  </h4>
                  <p className="text-sm text-muted-foreground">{product.category}</p>
                </div>
                <div className="flex items-center gap-3">
                  <ScoreChart score={product.score} size="sm" />
                  <ScoreBadge score={product.score} />
                </div>
              </Link>
            ))}
            <Button variant="outline" className="w-full" asChild>
              <Link to="/products">View All Products</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Score Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-foreground">High (75-100)</span>
                  <span className="text-sm text-muted-foreground">
                    {mockProducts.filter((p) => p.score >= 75).length} products
                  </span>
                </div>
                <div className="h-3 rounded-full bg-secondary overflow-hidden">
                  <div
                    className="h-full bg-score-high transition-all"
                    style={{
                      width: `${(mockProducts.filter((p) => p.score >= 75).length / totalProducts) * 100}%`,
                    }}
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-foreground">Medium (50-74)</span>
                  <span className="text-sm text-muted-foreground">
                    {mockProducts.filter((p) => p.score >= 50 && p.score < 75).length} products
                  </span>
                </div>
                <div className="h-3 rounded-full bg-secondary overflow-hidden">
                  <div
                    className="h-full bg-score-medium transition-all"
                    style={{
                      width: `${(mockProducts.filter((p) => p.score >= 50 && p.score < 75).length / totalProducts) * 100}%`,
                    }}
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-foreground">Low (0-49)</span>
                  <span className="text-sm text-muted-foreground">
                    {mockProducts.filter((p) => p.score < 50).length} products
                  </span>
                </div>
                <div className="h-3 rounded-full bg-secondary overflow-hidden">
                  <div
                    className="h-full bg-score-low transition-all"
                    style={{
                      width: `${(mockProducts.filter((p) => p.score < 50).length / totalProducts) * 100}%`,
                    }}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
