export interface Product {
  id: string;
  name: string;
  category: string;
  score: number;
  status: 'active' | 'pending' | 'flagged';
  dateAdded: string;
  imageUrl?: string;
  aiResponse: {
    explanation: string;
    suggestions: string[];
    flags: { text: string; severity: 'high' | 'medium' | 'low' }[];
  };
  ingredients?: string[];
  certifications?: string[];
}

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Organic Herbal Tea',
    category: 'Beverages',
    score: 72,
    status: 'active',
    dateAdded: '2025-01-15',
    aiResponse: {
      explanation: 'Moderate transparency. Missing sourcing details for 2 ingredients. Overall good certification documentation.',
      suggestions: [
        'Add sourcing details for green tea leaves.',
        'Include certification ID for "organic" claim.',
        'Clarify packaging recyclability.'
      ],
      flags: [
        { text: 'Incomplete sourcing', severity: 'medium' },
        { text: 'Unverified organic claim', severity: 'medium' }
      ]
    },
    ingredients: ['Green tea leaves', 'Chamomile', 'Peppermint', 'Natural flavors'],
    certifications: ['Organic', 'Fair Trade']
  },
  {
    id: '2',
    name: 'Premium Cold-Pressed Juice',
    category: 'Beverages',
    score: 92,
    status: 'active',
    dateAdded: '2025-01-20',
    aiResponse: {
      explanation: 'Excellent transparency with complete sourcing documentation and verified certifications. Minor improvements possible in packaging details.',
      suggestions: [
        'Add carbon footprint data for logistics.',
        'Include water usage metrics in production.'
      ],
      flags: []
    },
    ingredients: ['Organic apples', 'Organic kale', 'Organic lemon', 'Organic ginger'],
    certifications: ['USDA Organic', 'Non-GMO', 'Carbon Neutral']
  },
  {
    id: '3',
    name: 'Artisan Sourdough Bread',
    category: 'Bakery',
    score: 45,
    status: 'flagged',
    dateAdded: '2025-01-18',
    aiResponse: {
      explanation: 'Low transparency score. Missing critical sourcing information for flour and unclear preservation methods. Several claims lack verification.',
      suggestions: [
        'Provide mill certification for flour sourcing.',
        'Clarify natural preservation methods used.',
        'Add allergen cross-contamination protocols.',
        'Document ingredient storage conditions.'
      ],
      flags: [
        { text: 'Unverified ingredient source', severity: 'high' },
        { text: 'Missing allergen information', severity: 'high' },
        { text: 'Unclear preservation method', severity: 'medium' }
      ]
    },
    ingredients: ['Wheat flour', 'Water', 'Salt', 'Sourdough starter'],
    certifications: []
  },
  {
    id: '4',
    name: 'Plant-Based Protein Powder',
    category: 'Supplements',
    score: 88,
    status: 'active',
    dateAdded: '2025-01-22',
    aiResponse: {
      explanation: 'Strong transparency with detailed ingredient sourcing and third-party testing. Good certification coverage.',
      suggestions: [
        'Include heavy metal test results.',
        'Add supplier audit frequency.'
      ],
      flags: [
        { text: 'Minor label discrepancy', severity: 'low' }
      ]
    },
    ingredients: ['Pea protein', 'Brown rice protein', 'Natural vanilla', 'Stevia'],
    certifications: ['Vegan', 'Non-GMO', 'Gluten-Free']
  },
  {
    id: '5',
    name: 'Raw Honey Collection',
    category: 'Condiments',
    score: 65,
    status: 'pending',
    dateAdded: '2025-01-25',
    aiResponse: {
      explanation: 'Moderate transparency. Good sourcing information but missing some processing details and quality control metrics.',
      suggestions: [
        'Add pollen analysis report.',
        'Clarify filtration process.',
        'Include beekeeper certification status.',
        'Document pesticide testing protocols.'
      ],
      flags: [
        { text: 'Processing details incomplete', severity: 'medium' }
      ]
    },
    ingredients: ['100% raw honey'],
    certifications: ['Raw', 'Unpasteurized']
  },
  {
    id: '6',
    name: 'Grass-Fed Beef Jerky',
    category: 'Snacks',
    score: 78,
    status: 'active',
    dateAdded: '2025-01-12',
    aiResponse: {
      explanation: 'Good transparency with verified sourcing and clear processing methods. Minor gaps in sustainability metrics.',
      suggestions: [
        'Add ranch sustainability practices.',
        'Include animal welfare certification.',
        'Clarify preservative-free claim.'
      ],
      flags: [
        { text: 'Sustainability data incomplete', severity: 'low' }
      ]
    },
    ingredients: ['Grass-fed beef', 'Sea salt', 'Black pepper', 'Garlic powder'],
    certifications: ['Grass-Fed', 'Hormone-Free']
  },
  {
    id: '7',
    name: 'Probiotic Kombucha',
    category: 'Beverages',
    score: 83,
    status: 'active',
    dateAdded: '2025-01-08',
    aiResponse: {
      explanation: 'High transparency with detailed fermentation protocols and strain documentation. Well-documented supply chain.',
      suggestions: [
        'Add live culture count verification.',
        'Include pH stability testing results.'
      ],
      flags: []
    },
    ingredients: ['Filtered water', 'Organic tea', 'Organic cane sugar', 'Live cultures', 'Natural flavors'],
    certifications: ['USDA Organic', 'Non-GMO', 'Vegan']
  },
  {
    id: '8',
    name: 'Ancient Grain Granola',
    category: 'Breakfast',
    score: 58,
    status: 'active',
    dateAdded: '2025-01-19',
    aiResponse: {
      explanation: 'Below average transparency. Missing sourcing details for several ingredients and unclear processing methods.',
      suggestions: [
        'Provide grain origin documentation.',
        'Clarify sweetener sourcing.',
        'Add nutritional testing results.',
        'Document allergen handling procedures.'
      ],
      flags: [
        { text: 'Missing ingredient origins', severity: 'medium' },
        { text: 'Processing method unclear', severity: 'low' }
      ]
    },
    ingredients: ['Quinoa', 'Amaranth', 'Honey', 'Coconut oil', 'Mixed nuts'],
    certifications: ['Gluten-Free']
  }
];

export const getScoreColor = (score: number): 'high' | 'medium' | 'low' => {
  if (score >= 75) return 'high';
  if (score >= 50) return 'medium';
  return 'low';
};

export const getScoreLabel = (score: number): string => {
  if (score >= 75) return 'High';
  if (score >= 50) return 'Medium';
  return 'Low';
};
