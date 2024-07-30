import { Heading, Highlight, Image, List, ListIcon, ListItem } from "@chakra-ui/react";
import { CheckCircleIcon } from "@chakra-ui/icons";
import './hero.css'

const Hero = () => {
  return (
    <div className="mm-hero-container">
      <div className="mm-hero-heading">
        <Heading as="h1">
          <Highlight
            query="Without Tedious"
            styles={{ px: "2", py: "1", rounded: "full", bg: "green.100" }}
          >
            Cook Without Tedious Planning
          </Highlight>
        </Heading>

        <List spacing={3}>
          <ListItem>
            <ListIcon as={CheckCircleIcon} color="green.500" />
            Simplify Meal Planning
          </ListItem>
          <ListItem>
            <ListIcon as={CheckCircleIcon} color="green.500" />
            Enjoy and Discover New Recipes
          </ListItem>
          <ListItem>
            <ListIcon as={CheckCircleIcon} color="green.500" />
            Save Time Deciding What to Eat
          </ListItem>
          <ListItem>
            <ListIcon as={CheckCircleIcon} color="green.500" />
            All Your Recipes in One Place
          </ListItem>
        </List>
      </div>
      <div className="mm-hero-picture">
        <Image src="https://images.pexels.com/photos/1640771/pexels-photo-1640771.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt='Cooking ingredients' borderRadius='xl' className="mm-hero-image" />
      </div>
    </div>
  );
};

export default Hero;
