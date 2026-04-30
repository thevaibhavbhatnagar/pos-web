import React, { useState, ReactNode } from "react";
import { ChevronDown } from "lucide-react";

export type AccordionItem = {
  id: string | number;
  question: string;
  answer: ReactNode;
};

type Props = {
  items: AccordionItem[];
  emptyState?: ReactNode; // Pass a custom JSX div for empty
  className?: string;
};

const Accordion: React.FC<Props> = ({ items, emptyState, className }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  if (!items || items.length === 0) {
    return <div className={className}>{emptyState}</div>;
  }

  return (
    <div className={`flex flex-col gap-3 ${className}`}>
      {items.map((item, index) => (
        <div
          key={item.id}
          className="border border-gray-200 rounded-lg bg-white shadow-sm overflow-hidden"
        >
          <button
            type="button"
            onClick={() => toggleAccordion(index)}
            className="w-full flex justify-between items-center px-4 py-3 text-left font-medium text-grey-800 hover:bg-gray-50 focus:outline-none"
          >
            <span>{item.question}</span>
            <ChevronDown
              className={`h-5 w-5 transition-transform duration-300 ${openIndex === index ? "rotate-180" : "rotate-0"
                }`}
            />
          </button>

          <div
            className={`transition-all duration-300 overflow-hidden ${openIndex === index ? "max-h-[400px] p-4" : "max-h-0 p-0"
              }`}
          >
            <div className="text-grey-600 text-sm">{item.answer}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Accordion;
