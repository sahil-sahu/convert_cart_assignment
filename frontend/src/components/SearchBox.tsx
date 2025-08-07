'use client';

import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { useRef } from "react";

const SearchBox = ({ rules, setRules }: { rules: string[]; setRules: (rules: string[]) => void }) => {
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    
    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        if(formData.get('rules') === null || formData.get('rules') === ''){
            setRules([])
            return;
        }
        const rules = String(formData.get('rules'))?.split('\n').map(rule => rule.trim()) || [];
        setRules(rules);
    };
    
    const handleClearRules = () => {
        setRules([]);
        if (textareaRef.current) {
            textareaRef.current.value = '';
        }
    };
    
    return (
        <div className="w-full">
            <h2 className="text-2xl font-bold mb-4">Define Filter Conditions</h2>
            <form onSubmit={onSubmit}>
                <div>
                    <Label>Enter filter rules (one rule per line)</Label>
                    <Textarea 
                        ref={textareaRef}
                        placeholder="price > 10 \n on_sale = true \n category = Accessories" 
                        name="rules" 
                        className="w-full"
                        minLength={10}
                    />
                    <div>
                        Example: <span className="text-muted-foreground w-lg block">
                        price &gt; 10 <br /> on_sale = true <br /> category = Accessories
                        </span>
                        <span className="text-muted-foreground w-lg block">
                            Avaliable keywords : price, on_sale, category,title,stock_quantity, stock_status
                        </span>
                    </div>
                </div>

                <div className="flex justify-end gap-2"> 
                    <Button type="submit">Apply Rules</Button>
                    <Button type="button" onClick={handleClearRules}>Clear Rules</Button>
                </div>
            </form>
        </div>
    );
};

export default SearchBox;
