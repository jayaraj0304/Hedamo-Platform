import { useParams, Link } from 'react-router-dom';
import { mockProducts } from '@/data/mockProducts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScoreChart } from '@/components/products/ScoreChart';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ChevronLeft, Lightbulb, AlertTriangle, Award, Package } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function ProductDetail() {
  const { id } = useParams();
  const product = mockProducts.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <h2 className="text-2xl font-bold text-foreground mb-2">Product Not Found</h2>
        <p className="text-muted-foreground mb-4">The product you're looking for doesn't exist.</p>
        <Button asChild>
          <Link to="/products">Back to Products</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link to="/products">
            <ChevronLeft className="h-5 w-5" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-foreground">{product.name}</h1>
          <p className="text-muted-foreground mt-1">{product.category}</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Transparency Score</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center space-y-4">
            <ScoreChart score={product.score} size="lg" />
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-2">Added on</p>
              <p className="font-medium text-foreground">
                {new Date(product.dateAdded).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            </div>
            <Badge
              className={cn(
                'capitalize text-sm py-1 px-3',
                product.status === 'active' && 'bg-score-high-bg text-score-high',
                product.status === 'pending' && 'bg-score-medium-bg text-score-medium',
                product.status === 'flagged' && 'bg-score-low-bg text-score-low'
              )}
            >
              {product.status}
            </Badge>
          </CardContent>
        </Card>

        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-primary" />
                AI Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-foreground leading-relaxed">{product.aiResponse.explanation}</p>
            </CardContent>
          </Card>

          {product.aiResponse.suggestions.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="h-5 w-5 text-score-medium" />
                  Improvement Suggestions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {product.aiResponse.suggestions.map((suggestion, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-semibold mt-0.5">
                        {idx + 1}
                      </div>
                      <p className="text-foreground flex-1 leading-relaxed">{suggestion}</p>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {product.aiResponse.flags.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-score-low" />
                  Risk Flags
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {product.aiResponse.flags.map((flag, idx) => (
                    <div
                      key={idx}
                      className={cn(
                        'flex items-center gap-3 p-3 rounded-lg border',
                        flag.severity === 'high' && 'bg-score-low-bg border-score-low/20',
                        flag.severity === 'medium' && 'bg-score-medium-bg border-score-medium/20',
                        flag.severity === 'low' && 'bg-secondary border-border'
                      )}
                    >
                      <AlertTriangle
                        className={cn(
                          'h-5 w-5 shrink-0',
                          flag.severity === 'high' && 'text-score-low',
                          flag.severity === 'medium' && 'text-score-medium',
                          flag.severity === 'low' && 'text-muted-foreground'
                        )}
                      />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-foreground">{flag.text}</p>
                        <p className="text-xs text-muted-foreground capitalize mt-0.5">
                          {flag.severity} severity
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {product.ingredients && product.ingredients.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5 text-primary" />
                Ingredients
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {product.ingredients.map((ingredient, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                    <span className="text-foreground">{ingredient}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}

        {product.certifications && product.certifications.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5 text-primary" />
                Certifications
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {product.certifications.map((cert, idx) => (
                  <Badge key={idx} variant="secondary" className="text-sm">
                    {cert}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
