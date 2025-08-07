import { Product } from './product';

const validFields = ["price", "stock_quantity", "on_sale", "stock_status", "category", "tags", "title"] as const;

type ValidField = typeof validFields[number] | "invalid";
/**
 * Interface for parsed rule structure
 */
interface ParsedRule {
  field: "price" | "stock_quantity" | "on_sale" | "stock_status" | "category" | "tags" | "title" | "invalid";
  operator: string;
  value: string;
  valid: boolean;
  asNum?: number;
  isNum: boolean;
}

/**
 * Rule evaluator service for filtering products based on segment rules
 */
class RuleEvaluator {
  
  /**
   * Evaluate multiple rules against a list of products
   * @param products - Array of products to filter
   * @param rules - Array of rule strings to apply
   * @returns Filtered array of products that match all rules
   */
  constructor(){}
  evaluateRules(products: Product[], rules: string[]): Product[] {
    if (!products || products.length === 0) {
      return [];
    }

    if (!rules || rules.length === 0) {
      return products;
    }

    try {
      // Parse all rules
      const parsedRules = rules.map(rule => this.parseRule(rule));
      
      // Filter products that match all rules (AND logic by default)
      return products.filter(product => {
        return parsedRules.every(rule => {
            if(!rule.valid || rule.field === 'invalid') return false;
            
            if(rule.isNum && (rule.field === 'price' || rule.field === 'stock_quantity') && rule.asNum !== undefined){
                if (product[rule.field] == null) return false;
                const value = product[rule.field];
                switch(rule.operator){
                    case '=':
                        return value === rule.asNum;
                    case '!=':
                        return value != rule.asNum;
                    case '>':
                        if(value === null || value === undefined) return false;
                        return value > rule.asNum;
                    case '<':
                        if(value === null || value === undefined) return false;
                        return value < rule.asNum;
                    case '>=':
                        if(value === null || value === undefined) return false;
                        return value >= rule.asNum;
                    case '<=':
                        if(value === null || value === undefined) return false;
                        return value <= rule.asNum;
                    default:
                        return false;    
                }
            }
            // if the rule is not a number generrally string orr boolean
            switch(rule.operator){
                case '=':
                    return String(product[rule.field]) === String(rule.value);
                case '!=':
                    return String(product[rule.field]) !== String(rule.value);
                default:
                    return false;
            }    
            
        });
      });
    } catch (error) {
      console.error('Error evaluating rules:', error);
      return [];
    }
  }

  private parseRule(ruleString: string): ParsedRule {
    const rule = ruleString.trim();
    let [field, operator, value] = rule.split(' ');
    let valid = true;
    let isNum = false;
    
    if (!isNaN(Number(value)) && (field === 'price' || field === 'stock_quantity')) {
      isNum = true;
    }
    //check field here if its ; or not
    const fields = ["price", "stock_quantity", "on_sale", "stock_status", "category", "tags", "title"];
    if(!fields.includes(field)){
      valid = false;
      field = 'invalid';
    }
    return {
      field: fields.includes(field) ? field as ValidField : "invalid",
      operator,
      value,
      valid,
      asNum: Number(value),
      isNum
    };
    }
}

export const ruleEvaluator = new RuleEvaluator();