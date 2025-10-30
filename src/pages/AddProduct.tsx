import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, ChevronRight, CheckCircle, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { ScoreChart } from '@/components/products/ScoreChart';

const steps = ['Basic Info', 'Ingredients', 'Certifications', 'Review'];

export default function AddProduct() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [mockAIResult, setMockAIResult] = useState<any>(null);

  const [formData, setFormData] = useState({
    name: '',
    category: '',
    description: '',
    ingredients: '',
    certifications: '',
  });

  const updateFormData = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    // Simulate AI processing
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Generate mock AI response
    const mockResult = {
      score: Math.floor(Math.random() * 40) + 60, // Random score 60-100
      explanation: `Your product "${formData.name}" has been analyzed. The transparency score is based on the completeness of your ingredient sourcing, certification documentation, and processing details.`,
      suggestions: [
        'Add detailed sourcing information for all ingredients',
        'Include third-party certification IDs',
        'Clarify packaging materials and recyclability',
      ],
      flags: formData.certifications ? [] : [{ text: 'No certifications provided', severity: 'medium' as const }],
    };

    setMockAIResult(mockResult);
    setIsSubmitting(false);
    setIsComplete(true);

    toast.success('Product submitted successfully!');
  };

  const progress = ((currentStep + 1) / steps.length) * 100;

  if (isComplete && mockAIResult) {
    return (
      <div className="max-w-3xl mx-auto space-y-6">
        <Card className="border-score-high">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <CheckCircle className="h-16 w-16 text-score-high" />
            </div>
            <CardTitle className="text-2xl">Product Submitted Successfully!</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex justify-center">
              <ScoreChart score={mockAIResult.score} size="lg" />
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg mb-2">AI Analysis</h3>
                <p className="text-muted-foreground">{mockAIResult.explanation}</p>
              </div>

              {mockAIResult.suggestions.length > 0 && (
                <div>
                  <h3 className="font-semibold text-lg mb-2">Suggestions for Improvement</h3>
                  <ul className="space-y-2">
                    {mockAIResult.suggestions.map((suggestion: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-2">
                        <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-semibold mt-0.5">
                          {idx + 1}
                        </div>
                        <span className="text-foreground">{suggestion}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {mockAIResult.flags.length > 0 && (
                <div>
                  <h3 className="font-semibold text-lg mb-2">Flags</h3>
                  <div className="space-y-2">
                    {mockAIResult.flags.map((flag: any, idx: number) => (
                      <Badge key={idx} variant="outline" className="text-score-medium">
                        {flag.text}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="flex gap-3">
              <Button className="flex-1" onClick={() => navigate('/products')}>
                View All Products
              </Button>
              <Button variant="outline" className="flex-1" onClick={() => window.location.reload()}>
                Add Another Product
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Add New Product</h1>
        <p className="text-muted-foreground mt-1">
          Complete the form to submit your product for transparency analysis
        </p>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Step {currentStep + 1} of {steps.length}</span>
          <span className="font-medium text-foreground">{steps[currentStep]}</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      <div className="flex justify-center gap-2">
        {steps.map((step, idx) => (
          <Badge
            key={step}
            variant={idx === currentStep ? 'default' : idx < currentStep ? 'secondary' : 'outline'}
            className="text-xs"
          >
            {step}
          </Badge>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{steps[currentStep]}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {currentStep === 0 && (
            <>
              <div className="space-y-2">
                <Label htmlFor="name">Product Name *</Label>
                <Input
                  id="name"
                  placeholder="e.g., Organic Herbal Tea"
                  value={formData.name}
                  onChange={(e) => updateFormData('name', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Input
                  id="category"
                  placeholder="e.g., Beverages"
                  value={formData.category}
                  onChange={(e) => updateFormData('category', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Brief description of your product..."
                  rows={4}
                  value={formData.description}
                  onChange={(e) => updateFormData('description', e.target.value)}
                />
              </div>
            </>
          )}

          {currentStep === 1 && (
            <div className="space-y-2">
              <Label htmlFor="ingredients">Ingredients *</Label>
              <Textarea
                id="ingredients"
                placeholder="List all ingredients, one per line..."
                rows={8}
                value={formData.ingredients}
                onChange={(e) => updateFormData('ingredients', e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                Provide detailed information about sourcing and origin if available
              </p>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-2">
              <Label htmlFor="certifications">Certifications</Label>
              <Textarea
                id="certifications"
                placeholder="List certifications, one per line (e.g., USDA Organic, Non-GMO)..."
                rows={6}
                value={formData.certifications}
                onChange={(e) => updateFormData('certifications', e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                Include certification IDs or reference numbers if available
              </p>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-6">
              <div>
                <h4 className="font-semibold mb-2">Basic Information</h4>
                <div className="space-y-1 text-sm">
                  <p><span className="text-muted-foreground">Name:</span> {formData.name || 'Not provided'}</p>
                  <p><span className="text-muted-foreground">Category:</span> {formData.category || 'Not provided'}</p>
                  {formData.description && (
                    <p><span className="text-muted-foreground">Description:</span> {formData.description}</p>
                  )}
                </div>
              </div>

              {formData.ingredients && (
                <div>
                  <h4 className="font-semibold mb-2">Ingredients</h4>
                  <p className="text-sm text-muted-foreground whitespace-pre-line">{formData.ingredients}</p>
                </div>
              )}

              {formData.certifications && (
                <div>
                  <h4 className="font-semibold mb-2">Certifications</h4>
                  <p className="text-sm text-muted-foreground whitespace-pre-line">{formData.certifications}</p>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={prevStep}
          disabled={currentStep === 0}
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Previous
        </Button>

        {currentStep < steps.length - 1 ? (
          <Button onClick={nextStep}>
            Next
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        ) : (
          <Button onClick={handleSubmit} disabled={isSubmitting || !formData.name || !formData.category}>
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Processing...
              </>
            ) : (
              'Submit Product'
            )}
          </Button>
        )}
      </div>
    </div>
  );
}
