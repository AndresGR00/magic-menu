import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Heading,
} from "@chakra-ui/react";
import { FAQS_INFO } from "../../../Data/faqsInfo";
import "./FAQs.css";

const FAQs = () => {
  return (
    <>
      <Heading>FAQs</Heading>
      <div className="mm-faqs-container">
        <Accordion allowToggle>
          {FAQS_INFO.map(({id, question, answer}) => (
            <AccordionItem key={id}>
            <h2>
              <AccordionButton _expanded={{ bg: "green.600", color: "white" }}>
                <Box as="span" flex="1" textAlign="left">
                {question}
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4} bgColor="gray.100">
            {answer}
            </AccordionPanel>
          </AccordionItem>
          ))}
        </Accordion>
      </div>
    </>
  );
};

export default FAQs;
