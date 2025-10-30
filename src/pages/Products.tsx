import { useState } from 'react';
import { mockProducts } from '@/data/mockProducts';
import { Card, CardContent } from '@/components/ui/card';
import { ScoreBadge } from '@/components/products/ScoreBadge';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Products() {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const categories = ['all', ...Array.from(new Set(mockProducts.map((p) => p.category)))];

  const filteredProducts = mockProducts.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;
    const matchesStatus = statusFilter === 'all' || product.status === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Products</h1>
        <p className="text-muted-foreground mt-1">
          Manage and review your product transparency scores
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category === 'all' ? 'All Categories' : category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="flagged">Flagged</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredProducts.map((product) => (
          <Link key={product.id} to={`/products/${product.id}`}>
            <Card className="h-full transition-all hover:shadow-lg hover:scale-[1.02]">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg text-foreground mb-1">
                        {product.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">{product.category}</p>
                    </div>
                    <Badge
                      className={cn(
                        'capitalize',
                        product.status === 'active' && 'bg-score-high-bg text-score-high',
                        product.status === 'pending' && 'bg-score-medium-bg text-score-medium',
                        product.status === 'flagged' && 'bg-score-low-bg text-score-low'
                      )}
                    >
                      {product.status}
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <ScoreBadge score={product.score} />
                    <span className="text-xs text-muted-foreground">
                      Added {new Date(product.dateAdded).toLocaleDateString()}
                    </span>
                  </div>

                  {product.aiResponse.flags.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {product.aiResponse.flags.slice(0, 2).map((flag, idx) => (
                        <Badge
                          key={idx}
                          variant="outline"
                          className={cn(
                            'text-xs',
                            flag.severity === 'high' && 'border-score-low text-score-low',
                            flag.severity === 'medium' && 'border-score-medium text-score-medium',
                            flag.severity === 'low' && 'border-muted-foreground/50'
                          )}
                        >
                          {flag.text}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No products found matching your filters.</p>
        </div>
      )}
    </div>
  );
}
