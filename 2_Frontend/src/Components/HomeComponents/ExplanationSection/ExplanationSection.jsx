import "./explanationSection.css";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
  Image,
  Text,
} from "@chakra-ui/react";
import { EXPLANATION_SECTION_INFO } from "../../../Data/explanationSectionInfo";


const ExplanationSection = () => {
  return (
    <div className="mm-explanation-container">
      <Heading as="h2">How does Magic Menu work?</Heading>
      <div className="mm-explanation-steps">
        {EXPLANATION_SECTION_INFO.map(({ id, title, text, icon }) => (
          <Card key={id}>
            <CardHeader>
              <Heading size="md">{title}</Heading>
            </CardHeader>
            <CardBody>
              <Text>{text}</Text>
            </CardBody>
            <CardFooter>
              <Image src={icon}/>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ExplanationSection;
