import { Router } from 'express';
import { z } from 'zod';
import { productService } from '../services/product';
import { ruleEvaluator } from '../services/ruleEvaluator';

const router = Router();

// Schema for request validation
const evaluateSegmentSchema = z.object({
  rules: z.array(z.string())
});

// POST /segments/evaluate - Evaluate segment rules
router.post('/evaluate', async (req, res) => {
  try {
    // Validate request body
    const { rules } = evaluateSegmentSchema.parse(req.body);

    console.log('Evaluating rules:', rules);

    // Fetch all products from product service
    const products = await productService.getAllProducts();
    
    if (!products || products.length === 0) {
      return res.json({
        success: true,
        data: [],
        message: 'No products found',
        rules_applied: rules
      });
    }

    // Evaluate rules against products
    const matchingProducts = ruleEvaluator.evaluateRules(products, rules);

    res.json({
      success: true,
      data: matchingProducts,
      count: products.length,
      rules_applied: rules
    });

  } catch (error) {
    console.error('Error evaluating segment:', error);
    
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        error: 'Invalid request format',
        details: error.errors
      });
    }

    res.status(500).json({
      success: false,
      error: 'Failed to evaluate segment rules'
    });
  }
});

export { router as segmentRoutes };
