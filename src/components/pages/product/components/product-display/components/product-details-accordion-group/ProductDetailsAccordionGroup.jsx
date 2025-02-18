import { FiMinus, FiPlus } from "react-icons/fi";

import Accordion from "@/components/general/Accordion";
import Specification from "./components/Specification";
import ProductDescription from "./components/ProductDescription";


export default function ProductDetailsAccordionGroup({ className = "", product = null }) {

  const accordionsData = [
    {
      title: "Product Description",
      content: <ProductDescription product={product}/>
    },
    {
      title: "Specifications",
      content: <Specification product={product}/>
    }
  ];
  
  
  return (
    <div className={`wrapper pt-4 pb-5 bg-white ${className}`}>
      <div className="product-details-accordion-group px-[5vw]">
        {accordionsData.map((accordionData, index) =>
          <Accordion
            key={index}
            className="border-primaryFont"
            title={accordionData.title}
            titleClassName="text-sm sm:text-base xl:text-lg"
            contentClassName="content"
            content={accordionData.content}
            divider={{
              upper: {
                className: "border-1 py-2 border-primaryFont",
                isEnabled: true
              },
              bottom: {
                className: "border-1 py-2 border-primaryFont",
                isEnabled: true
              }
            }}
            iconClassName="md:text-lg"
            openIcon={FiPlus}
            closeIcon={FiMinus}
            defaultState={true}
            unmountOnExit={true}
          />
        )}
      </div>
    </div>
  );
}
