"use client";

import { Stack, HStack, Link, } from "@chakra-ui/react"

import { useState } from 'react';

import { Center } from "@chakra-ui/react";

import { Button, Card, Image, Text } from "@chakra-ui/react"

import { Heading } from "@chakra-ui/react"

import { List } from "@chakra-ui/react"

import { Tabs } from "@chakra-ui/react"

{/*icons*/ }
import { GiHotMeal } from "react-icons/gi";
import { VscRemove } from "react-icons/vsc"  // Add this import for remove icon






import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
  DialogActionTrigger
} from "@/components/ui/dialog"

import { Icon } from "@chakra-ui/react"
import { VscAdd } from "react-icons/vsc"
import { GiBiceps } from "react-icons/gi";
import { IoBody } from "react-icons/io5";
import { IconButton } from "@chakra-ui/react"




function Home() {
  const [favorites, setFavorites] = useState({
    oatSmoothie: false,
    bulkingBurrito: false,
    pestoPasta: false,
    grilledChicken: false,
    bakedSalmon: false,
    cauliflowerRice: false,
  });


  const addToFavorites = (mealId) => {
    setFavorites(prev => ({
      ...prev,
      [mealId]: true
    }));
  };

  const removeFromFavorites = (mealId) => {
    setFavorites(prev => ({
      ...prev,
      [mealId]: false
    }));
  };

  return (
    <div>
      <Center>
        <Stack gap="4">

          <HStack spacing={4} className="headerContainer" align="center">
            <Link href="/homePage" mt="10px" color="teal">
              <p style={{ fontSize: '20px', padding: '0 15px' }}>Home</p>
            </Link>
            <Link href="/mealPlannerPage" mt="10px" color="teal">
              <p style={{ fontSize: '20px', padding: '0 15px' }}>Meals</p>
            </Link>
            <Link href="/healthPage" mt="10px" color="teal">
              <p style={{ fontSize: '20px', padding: '0 15px' }}>Health</p>
            </Link>
            <Link href="/accountPage" mt="10px" color="teal">
              <p style={{ fontSize: '20px', padding: '0 15px' }}>Account</p>
            </Link>
          </HStack>

          <div style={{ width: "400px", height: "2px", backgroundColor: "teal", margin: "3px 0" }} />

          {/*tabs*/}
          <Tabs.Root defaultValue="Bulking" size="lg">
            <Tabs.List>
              <Tabs.Trigger value="Bulking">
                <GiBiceps color="teal" />
                Bulking
              </Tabs.Trigger>
              <Tabs.Trigger value="Cutting">
                <IoBody color="teal" />
                Cutting
              </Tabs.Trigger>
              <Tabs.Trigger value="Favourite">
                <GiHotMeal color="teal" />
                Favourite
              </Tabs.Trigger>
            </Tabs.List>
            {/*end of tabs*/}




            {/*favourite*/}
            <Tabs.Content value="Favourite">
              {/* OatsSmoothie favourite */}
              {favorites.oatSmoothie && (

                <Card.Root maxW="sm" overflow="hidden" gap="4">
                  <Image
                    height="300px"
                    src="https://www.togethertoeat.com/wp-content/uploads/2023/08/Oat-Smoothie-Bowl-strawberry-and-raspberry-smoothie-bowl-2.jpg?ezimgfmt=ngcb5/notWebP"
                    alt="Green double couch with wooden legs"
                  />
                  <Card.Body gap="2">
                    <Card.Title>Oats and Protein Smoothie Bowl</Card.Title>
                    <Card.Description>
                      A creamy blend of rolled oats, protein powder, Greek yogurt, and fresh fruits like bananas, strawberries, and blueberries, topped with granola and a drizzle of honey for a nutritious and energizing breakfast or post-workout meal
                    </Card.Description>
                    <Text textStyle="2xl" fontWeight="medium" letterSpacing="tight" mt="2">
                      550 k/cal  30g protein
                    </Text>
                  </Card.Body>
                  <Card.Footer gap="2">
                    <DialogRoot>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm">
                          View
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Oats and Protein Smoothie Bowl</DialogTitle>
                        </DialogHeader>
                        <DialogBody>
                          <Image
                            height="300px"
                            width="500px"
                            src="https://www.togethertoeat.com/wp-content/uploads/2023/08/Oat-Smoothie-Bowl-strawberry-and-raspberry-smoothie-bowl-2.jpg?ezimgfmt=ngcb5/notWebP"
                            alt="Green double couch with wooden legs"
                            paddingBottom="30px"
                          />
                          <p>
                            The Oat and Protein Smoothie Bowl is a creamy, nutrient-packed breakfast that combines rolled oats, protein powder, Greek yogurt, and a medley of fresh fruits like bananas, strawberries, and blueberries. Topped with additional fruit, granola, and a drizzle of honey, this bowl offers a perfect balance of protein, healthy fats, and complex carbohydrates. It’s not only delicious and visually appealing but also a great way to kickstart your day or replenish after a workout. Enjoy it with a spoon for a satisfying and energizing meal!
                          </p>
                          <Heading paddingTop="20px">Ingrediants</Heading>
                          <List.Root>
                            <List.Item>
                              1/2 cup rolled oats
                            </List.Item>
                            <List.Item>
                              1 scoop vanilla protein powder (or any flavor you prefer)
                            </List.Item>
                            <List.Item>
                              1/2 cup Greek yogurt (plain or vanilla, for added protein and creaminess)
                            </List.Item>
                            <List.Item>
                              1/2 cup almond milk (or milk of choice; add more for a thinner consistency)
                            </List.Item>
                            <List.Item>
                              1/2 banana (sliced; save the other half for topping)
                            </List.Item>
                            <List.Item>
                              1/2 cup strawberries (fresh or frozen)
                            </List.Item>
                            <List.Item>
                              1/4 cup blueberries (fresh or frozen)
                            </List.Item>
                            <List.Item>
                              1 tablespoon almond butter (or any nut butter you like, for healthy fats)
                            </List.Item>

                          </List.Root>

                          <Heading paddingTop="20px">Instructions</Heading>
                          <List.Root as="ol">
                            <List.Item>
                              Blend the Smoothie Base: In a blender, add oats, protein powder, Greek yogurt, almond milk, half a banana, 1/2 cup strawberries, and 1/4 cup blueberries. Blend until smooth and creamy.
                            </List.Item>
                            <List.Item>
                              Adjust Consistency: Check the texture and adjust by adding more milk if needed to get the desired thickness. It should be thick enough to eat with a spoon.
                            </List.Item>
                            <List.Item>
                              Serve and Top: Pour the smoothie base into a bowl. Top with sliced banana, strawberries, blueberries, granola, chia seeds, and a drizzle of honey or agave syrup, if desired.
                            </List.Item>
                            <List.Item>
                              Enjoy! This smoothie bowl is best enjoyed fresh.
                            </List.Item>
                          </List.Root>

                        </DialogBody>
                        <DialogFooter>
                          <DialogActionTrigger asChild>
                            <Button variant="outline">Cancel</Button>
                          </DialogActionTrigger>
                          <Button>Save</Button>
                        </DialogFooter>
                        <DialogCloseTrigger />
                      </DialogContent>
                    </DialogRoot>


                    <Icon fontSize="2xl" color="pink.700">
                      <IconButton
                        variant="ghost"
                        _hover={{ boxShadow: 'none', bg: 'transparent' }}
                        onClick={() => removeFromFavorites('oatSmoothie')}
                        aria-label="Remove from favorites"
                      >
                        <VscRemove />
                      </IconButton>
                    </Icon>

                  </Card.Footer>
                </Card.Root>
              )}
              {/* burrito favourite */}
              {favorites.bulkingBurrito && (
                <Card.Root maxW="sm" overflow="hidden" gap="4">
                  {/* fav Burrito card content */}
                  <Image
                    height="300px"

                    src="https://www.tamingtwins.com/wp-content/uploads/2023/05/image-46.jpeg"
                    alt="Green double couch with wooden legs"
                  />
                  <Card.Body gap="2">
                    <Card.Title>Bulking Burrito</Card.Title>
                    <Card.Description>
                      Bulking beef burrito is a protein-rich, hearty meal packed with seasoned beef, rice, beans, and cheese for maximum energy and muscle fuel.
                    </Card.Description>
                    <Text textStyle="2xl" fontWeight="medium" letterSpacing="tight" mt="2">
                      810 k/cal  55g protein
                    </Text>
                  </Card.Body>
                  <Card.Footer gap="2">
                    <DialogRoot>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm">
                          View
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Bulking Burito</DialogTitle>
                        </DialogHeader>
                        <DialogBody>
                          <Image
                            height="300px"
                            width="500px"
                            src="https://www.tamingtwins.com/wp-content/uploads/2023/05/image-46.jpeg"
                            alt="Green double couch with wooden legs"
                            paddingBottom="30px"
                          />
                          <p>
                            A bulking beef burrito is a hearty, protein-packed meal, perfect for building muscle and fueling workouts. Filled with seasoned ground beef, black beans, rice, shredded cheese, and a touch of guacamole or sour cream, its wrapped in a warm flour tortilla for a satisfying, nutrient-dense bite. Ideal for high-calorie diets, this burrito provides a balanced mix of proteins, carbs, and healthy fats to support muscle growth and recovery.
                          </p>
                          <Heading paddingTop="20px">Recipe</Heading>
                          <List.Root>
                            <List.Item>
                              6 oz (170g) lean ground beef (93% lean) — 280 calories, 33g protein
                            </List.Item>
                            <List.Item>
                              ½ cup cooked black beans — 100 calories, 7g protein
                            </List.Item>
                            <List.Item>
                              ¼ cup shredded cheddar cheese — 110 calories, 7g protein
                            </List.Item>
                            <List.Item>
                              2 tbsp Greek yogurt (instead of sour cream) — 20 calories, 3g protein
                            </List.Item>
                            <List.Item>
                              1 large whole wheat tortilla (around 10 inches) — 130 calories, 4g protein
                            </List.Item>
                            <List.Item>
                              ¼ avocado, sliced — 60 calories, 1g protein
                            </List.Item>
                            <List.Item>
                              Taco seasoning (to taste)
                            </List.Item>

                          </List.Root>

                          <Heading paddingTop="20px">Instructions</Heading>
                          <List.Root as="ol">
                            <List.Item>
                              Cook the ground beef in a skillet over medium heat, adding taco seasoning to taste.
                            </List.Item>
                            <List.Item>
                              Warm the tortilla in a skillet or microwave.
                            </List.Item>
                            <List.Item>
                              Layer the burrito by adding cooked beef, black beans, rice, shredded cheese, Greek yogurt, and avocado slices.
                            </List.Item>
                            <List.Item>
                              Roll up the burrito, folding in the sides, and enjoy!
                            </List.Item>
                            <Heading paddingTop="20px">Summary</Heading>

                          </List.Root>
                          <List.Root>
                            <List.Item>
                              Calories: ~810
                            </List.Item>
                            <List.Item>
                              Protein: ~55g
                            </List.Item>
                            <List.Item>
                              Carbohydrates: ~69g
                            </List.Item>
                            <List.Item>
                              Fat: ~39g
                            </List.Item>
                          </List.Root>
                        </DialogBody>
                        <DialogFooter>
                          <DialogActionTrigger asChild>
                            <Button variant="outline">Cancel</Button>
                          </DialogActionTrigger>
                          <Button>Save</Button>
                        </DialogFooter>
                        <DialogCloseTrigger />
                      </DialogContent>
                    </DialogRoot>

                    <IconButton
                      variant="ghost"
                      _hover={{ boxShadow: 'none', bg: 'transparent' }}
                      onClick={() => removeFromFavorites('bulkingBurrito')}
                      aria-label="Remove from favorites"
                    >
                      <VscRemove />
                    </IconButton>
                  </Card.Footer>
                </Card.Root>
              )}
              {/* pesto favourite */}
              {favorites.pestoPasta && (
                <Card.Root maxW="sm" overflow="hidden" gap="4">
                  {/* fav pesto card content */}
                  <Image
                    height="300px"

                    src="https://www.nextinlime.com/wp-content/uploads/2023/11/ground-beef-pesto-pasta.jpeg"
                    alt="Green double couch with wooden legs"
                  />
                  <Card.Body gap="2">
                    <Card.Title>Pasta with Ground Beef and Spinach Pesto
                    </Card.Title>
                    <Card.Description>
                      Pasta with Ground Beef and Spinach Pesto is a hearty dish that combines al dente whole wheat pasta with savory ground beef and a vibrant spinach pesto, creating a deliciously satisfying and nutritious meal.
                    </Card.Description>
                    <Text textStyle="2xl" fontWeight="medium" letterSpacing="tight" mt="2">
                      650 k/cal  35 protein
                    </Text>
                  </Card.Body>
                  <Card.Footer gap="2">
                    <DialogRoot>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm">
                          View
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Pasta with Ground Beef and Spinach Pesto</DialogTitle>
                        </DialogHeader>
                        <DialogBody>
                          <Image
                            height="300px"
                            width="500px"
                            src="https://www.nextinlime.com/wp-content/uploads/2023/11/ground-beef-pesto-pasta.jpeg"
                            alt="Green double couch with wooden legs"
                            paddingBottom="30px"
                          />
                          <p>

                            Pasta with Ground Beef and Spinach Pesto is a deliciously hearty meal that marries the rich flavors of savory ground beef with the freshness of a vibrant spinach pesto. The dish starts with al dente whole wheat pasta, providing a nutritious base, while the homemade pesto blends fresh spinach, basil, garlic, and Parmesan for a creamy, aromatic sauce. This comforting combination is not only satisfying but also packed with protein and essential nutrients, making it an ideal option for a post-workout meal or a cozy dinner. With the added texture from the ground beef and the option to garnish with cherry tomatoes and extra cheese, this dish offers a delightful balance of flavors and textures that is sure to please any palate.
                          </p>
                          <Heading paddingTop="20px">Recipe</Heading>
                          <List.Root>
                            <List.Item>
                              12 oz (340 g) whole wheat pasta (or pasta of your choice)
                            </List.Item>
                            <List.Item>
                              1 lb (450 g) ground beef (lean or extra lean)
                            </List.Item>
                            <List.Item>
                              2 cups fresh spinach (packed)
                            </List.Item>
                            <List.Item>
                              1/2 cup fresh basil leaves
                            </List.Item>
                            <List.Item>
                              1/4 cup grated Parmesan cheese
                            </List.Item>
                            <List.Item>
                              1/4 cup walnuts or pine nuts (optional)
                            </List.Item>
                            <List.Item>
                              2 cloves garlic (minced)
                            </List.Item>
                            <List.Item>
                              1/4 cup olive oil
                            </List.Item>
                            <List.Item>
                              Salt and pepper (to taste)
                            </List.Item>
                            <List.Item>
                              1/2 teaspoon red pepper flakes (optional, for a kick)
                            </List.Item>
                            <List.Item>
                              Cherry tomatoes (for garnish, optional)
                            </List.Item>

                          </List.Root>

                          <Heading paddingTop="20px">Instructions</Heading>
                          <List.Root as="ol">
                            <List.Item>
                              Cook the Pasta:

                              In a large pot, bring salted water to a boil. Add the pasta and cook according to package instructions until al dente. Reserve about 1 cup of pasta water, then drain the pasta and set aside.          </List.Item>
                            <List.Item>
                              Make the Spinach Pesto:
                              In a food processor, combine fresh spinach, basil, Parmesan cheese, walnuts (or pine nuts), minced garlic, salt, and pepper. Pulse until finely chopped.
                              While the processor is running, gradually drizzle in the olive oil until the mixture is smooth and creamy. Adjust seasoning as needed.          </List.Item>
                            <List.Item>
                              Cook the Ground Beef:

                              In a large skillet over medium heat, add the ground beef. Cook until browned and fully cooked, about 6–8 minutes. Break it up into small pieces with a spatula. Season with salt, pepper, and red pepper flakes (if using).          </List.Item>
                            <List.Item>
                              Combine Ingredients:

                              Once the beef is cooked, add the cooked pasta to the skillet along with the spinach pesto. Toss everything together, adding reserved pasta water a little at a time to achieve your desired sauce consistency.          </List.Item>
                            <List.Item>
                              Serve:

                              Divide the pasta into bowls, garnish with additional Parmesan cheese and cherry tomatoes if desired, and enjoy!
                            </List.Item>
                          </List.Root>

                          <Heading paddingTop="20px">Summary</Heading>

                          <List.Root>
                            <List.Item>
                              Calories: 600–700 (depending on the specific ingredients used)
                            </List.Item>
                            <List.Item>
                              Protein: 30–35g
                            </List.Item>
                            <List.Item>
                              Carbs: 60–70g
                            </List.Item>
                            <List.Item>
                              Fats: 25–30g
                            </List.Item>
                          </List.Root>

                        </DialogBody>
                        <DialogFooter>
                          <DialogActionTrigger asChild>
                            <Button variant="outline">Cancel</Button>
                          </DialogActionTrigger>
                          <Button>Save</Button>
                        </DialogFooter>
                        <DialogCloseTrigger />
                      </DialogContent>
                    </DialogRoot>

                    {/* add to pesto pasta to favourite */}
                    <IconButton
                      variant="ghost"
                      _hover={{ boxShadow: 'none', bg: 'transparent' }}
                      onClick={() => removeFromFavorites('pestoPasta')}
                      aria-label="Remove from favorites"
                    >
                      <VscRemove />
                    </IconButton>
                    {/* end of add to pesto pasta to favourite */}
                  </Card.Footer>

                </Card.Root>
              )}
              {favorites.grilledChicken && (
                <Card.Root maxW="sm" overflow="hidden" gap="4">
                  {/* fav grilled card content */}
                  <Image
                    height="300px"
                    src="https://www.spendwithpennies.com/wp-content/uploads/2023/06/Grilled-Chicken-Caesar-Salad-SpendWithPennies-4.jpg"
                    alt="Green double couch with wooden legs"
                  />
                  <Card.Body gap="2">
                    <Card.Title>Grilled Chicken Salad</Card.Title>
                    <Card.Description>
                      The Grilled Chicken Salad is a colorful and nutritious dish featuring marinated grilled chicken breast served over a bed of mixed greens, cherry tomatoes, cucumber, bell peppers, and red onion, all topped with a light olive oil and balsamic vinaigrette, making it a satisfying meal perfect for a healthy diet.

                    </Card.Description>
                    <Text textStyle="2xl" fontWeight="medium" letterSpacing="tight" mt="2">
                      350 k/cal  35g protein
                    </Text>
                  </Card.Body>
                  <Card.Footer gap="2">
                    <DialogRoot>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm">
                          View
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Grilled Chicken Salad</DialogTitle>
                        </DialogHeader>
                        <DialogBody>
                          <Image
                            height="300px"
                            width="500px"
                            src="https://www.spendwithpennies.com/wp-content/uploads/2023/06/Grilled-Chicken-Caesar-Salad-SpendWithPennies-4.jpg"
                            alt="Green double couch with wooden legs"
                            paddingBottom="30px"
                          />
                          <p>
                            The Grilled Chicken Salad is a vibrant and nutritious meal featuring juicy, marinated grilled chicken breast served atop a bed of mixed greens. This refreshing salad includes crisp cherry tomatoes, crunchy cucumber, colorful bell peppers, and red onion, all drizzled with a light, tangy dressing made from olive oil and balsamic vinegar. Optional avocado adds creaminess and healthy fats. Packed with protein, vitamins, and fiber, this salad is not only satisfying but also ideal for those looking to maintain a healthy diet or cut calories. Enjoy it as a hearty lunch or a light dinner!
                          </p>
                          <Heading paddingTop="20px">Ingrediants</Heading>
                          <List.Root>
                            <List.Item>
                              4 oz (113g) grilled chicken breast
                            </List.Item>
                            <List.Item>
                              1.5 cups mixed greens
                            </List.Item>
                            <List.Item>
                              1/4 cup cherry tomatoes
                            </List.Item>
                            <List.Item>
                              1/4 cucumber
                            </List.Item>
                            <List.Item>
                              1/4 bell pepper
                            </List.Item>
                            <List.Item>
                              1/8 red onion
                            </List.Item>
                            <List.Item>
                              1/4 avocado
                            </List.Item>
                            <List.Item>
                              1 tablespoon olive oil (for dressing)
                            </List.Item>
                            <List.Item>
                              1/2 tablespoon balsamic vinegar (for dressing)
                            </List.Item>
                            <List.Item>
                              1/4 teaspoon Dijon mustard (for dressing)
                            </List.Item>

                          </List.Root>

                          <Heading paddingTop="20px">Instructions</Heading>
                          <List.Root as="ol">
                            <List.Item>
                              Marinate the Chicken:

                              In a bowl, mix together the olive oil, balsamic vinegar, garlic powder, dried herbs, salt, and pepper.
                              Place the chicken breasts in the marinade, ensuring they are well-coated. Let them marinate for at least 30 minutes (or up to 2 hours) in the refrigerator.</List.Item>
                            <List.Item>
                              Grill the Chicken:

                              Preheat the grill to medium-high heat.
                              Remove the chicken from the marinade and discard the marinade.
                              Grill the chicken for about 6-7 minutes on each side, or until the internal temperature reaches 165°F (75°C). Once done, remove from the grill and let it rest for a few minutes.</List.Item>
                            <List.Item>
                              Prepare the Salad:

                              While the chicken is resting, assemble the salad. In a large bowl, combine the mixed greens, cherry tomatoes, cucumber, bell pepper, and red onion.
                              If using, add the avocado slices.          </List.Item>
                            <List.Item>
                              Slice the Chicken:

                              After resting, slice the grilled chicken into strips and add it to the salad.
                            </List.Item>
                            <List.Item>
                              Make the Dressing:

                              In a small bowl, whisk together the olive oil, balsamic vinegar, Dijon mustard, honey (if using), salt, and pepper until well combined.
                            </List.Item>
                            <List.Item>
                              Serve:

                              Drizzle the dressing over the salad and toss gently to combine.
                              Serve immediately, and enjoy your delicious grilled chicken salad!
                            </List.Item>
                          </List.Root>

                          <Heading paddingTop="20px">Summary</Heading>

                          <List.Root>
                            <List.Item>
                              Calories: 600–700 (depending on the specific ingredients used)
                            </List.Item>
                            <List.Item>
                              Protein: 30–35g
                            </List.Item>
                            <List.Item>
                              Carbs: 60–70g
                            </List.Item>
                            <List.Item>
                              Fats: 25–30g
                            </List.Item>
                          </List.Root>

                        </DialogBody>
                        <DialogFooter>
                          <DialogActionTrigger asChild>
                            <Button variant="outline">Cancel</Button>
                          </DialogActionTrigger>
                          <Button>Save</Button>
                        </DialogFooter>
                        <DialogCloseTrigger />
                      </DialogContent>
                    </DialogRoot>
                    {/*remove  grilled chicken from  favourite*/}
                    <IconButton
                      variant="ghost"
                      _hover={{ boxShadow: 'none', bg: 'transparent' }}
                      onClick={() => removeFromFavorites('grilledChicken')}
                      aria-label="Remove from favorites"
                    >
                      <VscRemove />
                    </IconButton>
                    {/*end remove grilled chicken from  favourite*/}
                  </Card.Footer>
                </Card.Root>
              )}
              {favorites.bakedSalmon && (
                <Card.Root maxW="sm" overflow="hidden" gap="4">
                  {/* fav baked card content */}
                  <Image
                    height="300px"

                    src="https://cdn-uploads.mealime.com/uploads/recipe/thumbnail/307/presentation_0ed152c0-47ef-4536-81b4-02dc6f31f876.jpg"
                    alt="Green double couch with wooden legs"
                  />
                  <Card.Body gap="2">
                    <Card.Title>Baked Salmon with Asparagus</Card.Title>
                    <Card.Description>
                      Baked Salmon with Asparagus is a flavorful, healthy dish featuring tender lemon-garlic salmon and roasted asparagus, perfect for a light and nutritious meal.
                    </Card.Description>
                    <Text textStyle="2xl" fontWeight="medium" letterSpacing="tight" mt="2">
                      350 k/cal  30g protein
                    </Text>
                  </Card.Body>
                  <Card.Footer gap="2">
                    <DialogRoot>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm">
                          View
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Baked Salmon with Asparagus</DialogTitle>
                        </DialogHeader>
                        <DialogBody>
                          <Image
                            height="300px"
                            width="500px"
                            src="https://cdn-uploads.mealime.com/uploads/recipe/thumbnail/307/presentation_0ed152c0-47ef-4536-81b4-02dc6f31f876.jpg"
                            alt="Green double couch with wooden legs"
                            paddingBottom="30px"
                          />
                          <p>
                            Baked Salmon with Asparagus is a light yet satisfying dish featuring tender, lemon-garlic seasoned salmon fillets baked alongside crisp asparagus spears. Drizzled with olive oil and topped with fresh herbs, this nutritious meal is rich in protein, omega-3s, and essential vitamins, making it a perfect choice for a balanced and flavorful dinner.

                          </p>
                          <Heading paddingTop="20px">Ingrediants</Heading>
                          <List.Root>
                            <List.Item>
                              4 salmon fillets (about 4-6 oz each)
                            </List.Item>
                            <List.Item>
                              1 bunch of asparagus, trimmed
                            </List.Item>
                            <List.Item>
                              2 tablespoons olive oil
                            </List.Item>
                            <List.Item>
                              2 cloves garlic, minced
                            </List.Item>
                            <List.Item>
                              1 lemon (half for juice, half sliced for garnish)
                            </List.Item>
                            <List.Item>
                              Salt and pepper, to taste
                            </List.Item>
                            <List.Item>
                              Fresh herbs (optional): dill, parsley, or thyme
                            </List.Item>

                          </List.Root>

                          <Heading paddingTop="20px">Instructions</Heading>
                          <List.Root as="ol">
                            <List.Item>
                              Preheat the Oven:

                              Preheat your oven to 400°F (200°C). Line a baking sheet with parchment paper or lightly grease it.          </List.Item>
                            <List.Item>
                              Prepare the Asparagus:

                              Place the trimmed asparagus on the baking sheet. Drizzle with 1 tablespoon of olive oil, season with salt and pepper, and toss to coat. Push the asparagus to one side to make space for the salmon.          </List.Item>
                            <List.Item>
                              Season the Salmon:

                              Place the salmon fillets on the baking sheet beside the asparagus. Drizzle the remaining olive oil over the salmon fillets, then sprinkle with minced garlic, salt, and pepper. Squeeze fresh lemon juice over the salmon, and top each fillet with a lemon slice for added flavor.
                            </List.Item>
                            <List.Item>
                              Bake:

                              Bake in the preheated oven for 12-15 minutes, or until the salmon flakes easily with a fork and is cooked through (internal temperature should reach 145°F / 63°C).
                            </List.Item>
                            <List.Item>
                              Garnish and Serve:

                              Remove from the oven and sprinkle fresh herbs over the salmon, if desired. Serve immediately with the roasted asparagus and lemon wedges on the side.
                            </List.Item>
                            <Heading paddingTop="20px">Summary</Heading>

                          </List.Root>
                          <List.Root>
                            <List.Item>
                              Calories: ~300-350 kcal

                            </List.Item>
                            <List.Item>
                              Protein: ~30 g
                            </List.Item>
                            <List.Item>
                              Carbohydrates: ~5-6 g
                            </List.Item>
                            <List.Item>
                              Fat: ~20g
                            </List.Item>
                          </List.Root>
                        </DialogBody>
                        <DialogFooter>
                          <DialogActionTrigger asChild>
                            <Button variant="outline">Cancel</Button>
                          </DialogActionTrigger>
                          <Button>Save</Button>
                        </DialogFooter>
                        <DialogCloseTrigger />
                      </DialogContent>
                    </DialogRoot>
                    {/*remove from baked salmon to favourite*/}
                    <IconButton
                      variant="ghost"
                      _hover={{ boxShadow: 'none', bg: 'transparent' }}
                      onClick={() => removeFromFavorites('bakedSalmon')}
                      aria-label="Remove from favorites"
                    >
                      <VscRemove />
                    </IconButton>
                    {/*end of remove from baked salmon to favourite*/}
                  </Card.Footer>
                </Card.Root>
              )}
              {favorites.cauliflowerRice && (
                <Card.Root maxW="sm" overflow="hidden" gap="4">

                </Card.Root>
              )}


            </Tabs.Content>


            {/* end of Favourite */}

            {/* Bulking */}
            {/*oats smoothie Card */}
            <Tabs.Content value="Bulking">
              <Card.Root maxW="sm" overflow="hidden" gap="4">
                <Image
                  height="300px"
                  src="https://www.togethertoeat.com/wp-content/uploads/2023/08/Oat-Smoothie-Bowl-strawberry-and-raspberry-smoothie-bowl-2.jpg?ezimgfmt=ngcb5/notWebP"
                  alt="Green double couch with wooden legs"
                />
                <Card.Body gap="2">
                  <Card.Title>Oats and Protein Smoothie Bowl</Card.Title>
                  <Card.Description>
                    A creamy blend of rolled oats, protein powder, Greek yogurt, and fresh fruits like bananas, strawberries, and blueberries, topped with granola and a drizzle of honey for a nutritious and energizing breakfast or post-workout meal
                  </Card.Description>
                  <Text textStyle="2xl" fontWeight="medium" letterSpacing="tight" mt="2">
                    550 k/cal  30g protein
                  </Text>
                </Card.Body>
                <Card.Footer gap="2">
                  <DialogRoot>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Oats and Protein Smoothie Bowl</DialogTitle>
                      </DialogHeader>
                      <DialogBody>
                        <Image
                          height="300px"
                          width="500px"
                          src="https://www.togethertoeat.com/wp-content/uploads/2023/08/Oat-Smoothie-Bowl-strawberry-and-raspberry-smoothie-bowl-2.jpg?ezimgfmt=ngcb5/notWebP"
                          alt="Green double couch with wooden legs"
                          paddingBottom="30px"
                        />
                        <p>
                          The Oat and Protein Smoothie Bowl is a creamy, nutrient-packed breakfast that combines rolled oats, protein powder, Greek yogurt, and a medley of fresh fruits like bananas, strawberries, and blueberries. Topped with additional fruit, granola, and a drizzle of honey, this bowl offers a perfect balance of protein, healthy fats, and complex carbohydrates. It’s not only delicious and visually appealing but also a great way to kickstart your day or replenish after a workout. Enjoy it with a spoon for a satisfying and energizing meal!
                        </p>
                        <Heading paddingTop="20px">Ingrediants</Heading>
                        <List.Root>
                          <List.Item>
                            1/2 cup rolled oats
                          </List.Item>
                          <List.Item>
                            1 scoop vanilla protein powder (or any flavor you prefer)
                          </List.Item>
                          <List.Item>
                            1/2 cup Greek yogurt (plain or vanilla, for added protein and creaminess)
                          </List.Item>
                          <List.Item>
                            1/2 cup almond milk (or milk of choice; add more for a thinner consistency)
                          </List.Item>
                          <List.Item>
                            1/2 banana (sliced; save the other half for topping)
                          </List.Item>
                          <List.Item>
                            1/2 cup strawberries (fresh or frozen)
                          </List.Item>
                          <List.Item>
                            1/4 cup blueberries (fresh or frozen)
                          </List.Item>
                          <List.Item>
                            1 tablespoon almond butter (or any nut butter you like, for healthy fats)
                          </List.Item>

                        </List.Root>

                        <Heading paddingTop="20px">Instructions</Heading>
                        <List.Root as="ol">
                          <List.Item>
                            Blend the Smoothie Base: In a blender, add oats, protein powder, Greek yogurt, almond milk, half a banana, 1/2 cup strawberries, and 1/4 cup blueberries. Blend until smooth and creamy.
                          </List.Item>
                          <List.Item>
                            Adjust Consistency: Check the texture and adjust by adding more milk if needed to get the desired thickness. It should be thick enough to eat with a spoon.
                          </List.Item>
                          <List.Item>
                            Serve and Top: Pour the smoothie base into a bowl. Top with sliced banana, strawberries, blueberries, granola, chia seeds, and a drizzle of honey or agave syrup, if desired.
                          </List.Item>
                          <List.Item>
                            Enjoy! This smoothie bowl is best enjoyed fresh.
                          </List.Item>
                        </List.Root>

                      </DialogBody>
                      <DialogFooter>
                        <DialogActionTrigger asChild>
                          <Button variant="outline">Cancel</Button>
                        </DialogActionTrigger>
                        <Button>Save</Button>
                      </DialogFooter>
                      <DialogCloseTrigger />
                    </DialogContent>
                  </DialogRoot>

                  {/* add to OatsSmoothie to favourite */}
                  <IconButton
                    variant="ghost"
                    _hover={{ boxShadow: 'none', bg: 'transparent' }}
                    onClick={() => addToFavorites('oatSmoothie')}
                  >
                    <VscAdd />
                  </IconButton>
                  {/* end of add to OatsSmoothie to favourite */}


                </Card.Footer>
              </Card.Root>

              {/*bulking burrito Card */}
              <Card.Root maxW="sm" overflow="hidden">
                <Image
                  height="300px"

                  src="https://www.tamingtwins.com/wp-content/uploads/2023/05/image-46.jpeg"
                  alt="Green double couch with wooden legs"
                />
                <Card.Body gap="2">
                  <Card.Title>Bulking Burrito</Card.Title>
                  <Card.Description>
                    Bulking beef burrito is a protein-rich, hearty meal packed with seasoned beef, rice, beans, and cheese for maximum energy and muscle fuel.
                  </Card.Description>
                  <Text textStyle="2xl" fontWeight="medium" letterSpacing="tight" mt="2">
                    810 k/cal  55g protein
                  </Text>
                </Card.Body>
                <Card.Footer gap="2">
                  <DialogRoot>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Bulking Burito</DialogTitle>
                      </DialogHeader>
                      <DialogBody>
                        <Image
                          height="300px"
                          width="500px"
                          src="https://www.tamingtwins.com/wp-content/uploads/2023/05/image-46.jpeg"
                          alt="Green double couch with wooden legs"
                          paddingBottom="30px"
                        />
                        <p>
                          A bulking beef burrito is a hearty, protein-packed meal, perfect for building muscle and fueling workouts. Filled with seasoned ground beef, black beans, rice, shredded cheese, and a touch of guacamole or sour cream, its wrapped in a warm flour tortilla for a satisfying, nutrient-dense bite. Ideal for high-calorie diets, this burrito provides a balanced mix of proteins, carbs, and healthy fats to support muscle growth and recovery.
                        </p>
                        <Heading paddingTop="20px">Recipe</Heading>
                        <List.Root>
                          <List.Item>
                            6 oz (170g) lean ground beef (93% lean) — 280 calories, 33g protein
                          </List.Item>
                          <List.Item>
                            ½ cup cooked black beans — 100 calories, 7g protein
                          </List.Item>
                          <List.Item>
                            ¼ cup shredded cheddar cheese — 110 calories, 7g protein
                          </List.Item>
                          <List.Item>
                            2 tbsp Greek yogurt (instead of sour cream) — 20 calories, 3g protein
                          </List.Item>
                          <List.Item>
                            1 large whole wheat tortilla (around 10 inches) — 130 calories, 4g protein
                          </List.Item>
                          <List.Item>
                            ¼ avocado, sliced — 60 calories, 1g protein
                          </List.Item>
                          <List.Item>
                            Taco seasoning (to taste)
                          </List.Item>

                        </List.Root>

                        <Heading paddingTop="20px">Instructions</Heading>
                        <List.Root as="ol">
                          <List.Item>
                            Cook the ground beef in a skillet over medium heat, adding taco seasoning to taste.
                          </List.Item>
                          <List.Item>
                            Warm the tortilla in a skillet or microwave.
                          </List.Item>
                          <List.Item>
                            Layer the burrito by adding cooked beef, black beans, rice, shredded cheese, Greek yogurt, and avocado slices.
                          </List.Item>
                          <List.Item>
                            Roll up the burrito, folding in the sides, and enjoy!
                          </List.Item>
                          <Heading paddingTop="20px">Summary</Heading>

                        </List.Root>
                        <List.Root>
                          <List.Item>
                            Calories: ~810
                          </List.Item>
                          <List.Item>
                            Protein: ~55g
                          </List.Item>
                          <List.Item>
                            Carbohydrates: ~69g
                          </List.Item>
                          <List.Item>
                            Fat: ~39g
                          </List.Item>
                        </List.Root>
                      </DialogBody>
                      <DialogFooter>
                        <DialogActionTrigger asChild>
                          <Button variant="outline">Cancel</Button>
                        </DialogActionTrigger>
                        <Button>Save</Button>
                      </DialogFooter>
                      <DialogCloseTrigger />
                    </DialogContent>
                  </DialogRoot>

                  {/* add to burrito to favourite */}
                  <IconButton
                    variant="ghost"
                    _hover={{ boxShadow: 'none', bg: 'transparent' }}
                    onClick={() => addToFavorites('bulkingBurrito')}
                  >
                    <VscAdd />
                  </IconButton>
                  {/* end of add to burrito to favourite */}

                </Card.Footer>
              </Card.Root>

              {/*pesto pasta Card */}

              <Card.Root maxW="sm" overflow="hidden">
                <Image
                  height="300px"

                  src="https://www.nextinlime.com/wp-content/uploads/2023/11/ground-beef-pesto-pasta.jpeg"
                  alt="Green double couch with wooden legs"
                />
                <Card.Body gap="2">
                  <Card.Title>Pasta with Ground Beef and Spinach Pesto
                  </Card.Title>
                  <Card.Description>
                    Pasta with Ground Beef and Spinach Pesto is a hearty dish that combines al dente whole wheat pasta with savory ground beef and a vibrant spinach pesto, creating a deliciously satisfying and nutritious meal.
                  </Card.Description>
                  <Text textStyle="2xl" fontWeight="medium" letterSpacing="tight" mt="2">
                    650 k/cal  35 protein
                  </Text>
                </Card.Body>
                <Card.Footer gap="2">
                  <DialogRoot>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Pasta with Ground Beef and Spinach Pesto</DialogTitle>
                      </DialogHeader>
                      <DialogBody>
                        <Image
                          height="300px"
                          width="500px"
                          src="https://www.nextinlime.com/wp-content/uploads/2023/11/ground-beef-pesto-pasta.jpeg"
                          alt="Green double couch with wooden legs"
                          paddingBottom="30px"
                        />
                        <p>

                          Pasta with Ground Beef and Spinach Pesto is a deliciously hearty meal that marries the rich flavors of savory ground beef with the freshness of a vibrant spinach pesto. The dish starts with al dente whole wheat pasta, providing a nutritious base, while the homemade pesto blends fresh spinach, basil, garlic, and Parmesan for a creamy, aromatic sauce. This comforting combination is not only satisfying but also packed with protein and essential nutrients, making it an ideal option for a post-workout meal or a cozy dinner. With the added texture from the ground beef and the option to garnish with cherry tomatoes and extra cheese, this dish offers a delightful balance of flavors and textures that is sure to please any palate.
                        </p>
                        <Heading paddingTop="20px">Recipe</Heading>
                        <List.Root>
                          <List.Item>
                            12 oz (340 g) whole wheat pasta (or pasta of your choice)
                          </List.Item>
                          <List.Item>
                            1 lb (450 g) ground beef (lean or extra lean)
                          </List.Item>
                          <List.Item>
                            2 cups fresh spinach (packed)
                          </List.Item>
                          <List.Item>
                            1/2 cup fresh basil leaves
                          </List.Item>
                          <List.Item>
                            1/4 cup grated Parmesan cheese
                          </List.Item>
                          <List.Item>
                            1/4 cup walnuts or pine nuts (optional)
                          </List.Item>
                          <List.Item>
                            2 cloves garlic (minced)
                          </List.Item>
                          <List.Item>
                            1/4 cup olive oil
                          </List.Item>
                          <List.Item>
                            Salt and pepper (to taste)
                          </List.Item>
                          <List.Item>
                            1/2 teaspoon red pepper flakes (optional, for a kick)
                          </List.Item>
                          <List.Item>
                            Cherry tomatoes (for garnish, optional)
                          </List.Item>

                        </List.Root>

                        <Heading paddingTop="20px">Instructions</Heading>
                        <List.Root as="ol">
                          <List.Item>
                            Cook the Pasta:

                            In a large pot, bring salted water to a boil. Add the pasta and cook according to package instructions until al dente. Reserve about 1 cup of pasta water, then drain the pasta and set aside.          </List.Item>
                          <List.Item>
                            Make the Spinach Pesto:
                            In a food processor, combine fresh spinach, basil, Parmesan cheese, walnuts (or pine nuts), minced garlic, salt, and pepper. Pulse until finely chopped.
                            While the processor is running, gradually drizzle in the olive oil until the mixture is smooth and creamy. Adjust seasoning as needed.          </List.Item>
                          <List.Item>
                            Cook the Ground Beef:

                            In a large skillet over medium heat, add the ground beef. Cook until browned and fully cooked, about 6–8 minutes. Break it up into small pieces with a spatula. Season with salt, pepper, and red pepper flakes (if using).          </List.Item>
                          <List.Item>
                            Combine Ingredients:

                            Once the beef is cooked, add the cooked pasta to the skillet along with the spinach pesto. Toss everything together, adding reserved pasta water a little at a time to achieve your desired sauce consistency.          </List.Item>
                          <List.Item>
                            Serve:

                            Divide the pasta into bowls, garnish with additional Parmesan cheese and cherry tomatoes if desired, and enjoy!
                          </List.Item>
                        </List.Root>

                        <Heading paddingTop="20px">Summary</Heading>

                        <List.Root>
                          <List.Item>
                            Calories: 600–700 (depending on the specific ingredients used)
                          </List.Item>
                          <List.Item>
                            Protein: 30–35g
                          </List.Item>
                          <List.Item>
                            Carbs: 60–70g
                          </List.Item>
                          <List.Item>
                            Fats: 25–30g
                          </List.Item>
                        </List.Root>

                      </DialogBody>
                      <DialogFooter>
                        <DialogActionTrigger asChild>
                          <Button variant="outline">Cancel</Button>
                        </DialogActionTrigger>
                        <Button>Save</Button>
                      </DialogFooter>
                      <DialogCloseTrigger />
                    </DialogContent>
                  </DialogRoot>

                  {/* add to pesto pasta to favourite */}
                  <IconButton
                    variant="ghost"
                    _hover={{ boxShadow: 'none', bg: 'transparent' }}
                    onClick={() => addToFavorites('pestoPasta')}
                  >
                    <VscAdd />
                  </IconButton>
                  {/* end of add to pesto pasta to favourite */}
                </Card.Footer>
              </Card.Root>
            </Tabs.Content>
            {/*cutting section*/}
            <Tabs.Content value="Cutting">
              {/*grilled chicken card */}

              <Card.Root maxW="sm" overflow="hidden" gap="4">
                <Image
                  height="300px"
                  src="https://www.spendwithpennies.com/wp-content/uploads/2023/06/Grilled-Chicken-Caesar-Salad-SpendWithPennies-4.jpg"
                  alt="Green double couch with wooden legs"
                />
                <Card.Body gap="2">
                  <Card.Title>Grilled Chicken Salad</Card.Title>
                  <Card.Description>
                    The Grilled Chicken Salad is a colorful and nutritious dish featuring marinated grilled chicken breast served over a bed of mixed greens, cherry tomatoes, cucumber, bell peppers, and red onion, all topped with a light olive oil and balsamic vinaigrette, making it a satisfying meal perfect for a healthy diet.

                  </Card.Description>
                  <Text textStyle="2xl" fontWeight="medium" letterSpacing="tight" mt="2">
                    350 k/cal  35g protein
                  </Text>
                </Card.Body>
                <Card.Footer gap="2">
                  <DialogRoot>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Grilled Chicken Salad</DialogTitle>
                      </DialogHeader>
                      <DialogBody>
                        <Image
                          height="300px"
                          width="500px"
                          src="https://www.spendwithpennies.com/wp-content/uploads/2023/06/Grilled-Chicken-Caesar-Salad-SpendWithPennies-4.jpg"
                          alt="Green double couch with wooden legs"
                          paddingBottom="30px"
                        />
                        <p>
                          The Grilled Chicken Salad is a vibrant and nutritious meal featuring juicy, marinated grilled chicken breast served atop a bed of mixed greens. This refreshing salad includes crisp cherry tomatoes, crunchy cucumber, colorful bell peppers, and red onion, all drizzled with a light, tangy dressing made from olive oil and balsamic vinegar. Optional avocado adds creaminess and healthy fats. Packed with protein, vitamins, and fiber, this salad is not only satisfying but also ideal for those looking to maintain a healthy diet or cut calories. Enjoy it as a hearty lunch or a light dinner!
                        </p>
                        <Heading paddingTop="20px">Ingrediants</Heading>
                        <List.Root>
                          <List.Item>
                            4 oz (113g) grilled chicken breast
                          </List.Item>
                          <List.Item>
                            1.5 cups mixed greens
                          </List.Item>
                          <List.Item>
                            1/4 cup cherry tomatoes
                          </List.Item>
                          <List.Item>
                            1/4 cucumber
                          </List.Item>
                          <List.Item>
                            1/4 bell pepper
                          </List.Item>
                          <List.Item>
                            1/8 red onion
                          </List.Item>
                          <List.Item>
                            1/4 avocado
                          </List.Item>
                          <List.Item>
                            1 tablespoon olive oil (for dressing)
                          </List.Item>
                          <List.Item>
                            1/2 tablespoon balsamic vinegar (for dressing)
                          </List.Item>
                          <List.Item>
                            1/4 teaspoon Dijon mustard (for dressing)
                          </List.Item>

                        </List.Root>

                        <Heading paddingTop="20px">Instructions</Heading>
                        <List.Root as="ol">
                          <List.Item>
                            Marinate the Chicken:

                            In a bowl, mix together the olive oil, balsamic vinegar, garlic powder, dried herbs, salt, and pepper.
                            Place the chicken breasts in the marinade, ensuring they are well-coated. Let them marinate for at least 30 minutes (or up to 2 hours) in the refrigerator.</List.Item>
                          <List.Item>
                            Grill the Chicken:

                            Preheat the grill to medium-high heat.
                            Remove the chicken from the marinade and discard the marinade.
                            Grill the chicken for about 6-7 minutes on each side, or until the internal temperature reaches 165°F (75°C). Once done, remove from the grill and let it rest for a few minutes.</List.Item>
                          <List.Item>
                            Prepare the Salad:

                            While the chicken is resting, assemble the salad. In a large bowl, combine the mixed greens, cherry tomatoes, cucumber, bell pepper, and red onion.
                            If using, add the avocado slices.          </List.Item>
                          <List.Item>
                            Slice the Chicken:

                            After resting, slice the grilled chicken into strips and add it to the salad.
                          </List.Item>
                          <List.Item>
                            Make the Dressing:

                            In a small bowl, whisk together the olive oil, balsamic vinegar, Dijon mustard, honey (if using), salt, and pepper until well combined.
                          </List.Item>
                          <List.Item>
                            Serve:

                            Drizzle the dressing over the salad and toss gently to combine.
                            Serve immediately, and enjoy your delicious grilled chicken salad!
                          </List.Item>
                        </List.Root>

                        <Heading paddingTop="20px">Summary</Heading>

                        <List.Root>
                          <List.Item>
                            Calories: 600–700 (depending on the specific ingredients used)
                          </List.Item>
                          <List.Item>
                            Protein: 30–35g
                          </List.Item>
                          <List.Item>
                            Carbs: 60–70g
                          </List.Item>
                          <List.Item>
                            Fats: 25–30g
                          </List.Item>
                        </List.Root>

                      </DialogBody>
                      <DialogFooter>
                        <DialogActionTrigger asChild>
                          <Button variant="outline">Cancel</Button>
                        </DialogActionTrigger>
                        <Button>Save</Button>
                      </DialogFooter>
                      <DialogCloseTrigger />
                    </DialogContent>
                  </DialogRoot>
                  {/*add  grilled chicken to favourite*/}
                  <IconButton
                    variant="ghost"
                    _hover={{ boxShadow: 'none', bg: 'transparent' }}
                    onClick={() => addToFavorites('grilledChicken')}
                  >
                    <VscAdd />
                  </IconButton>
                  {/*end of add to grilled chicken to favourite*/}
                </Card.Footer>
              </Card.Root>

              {/*baked salmon Card */}
              <Card.Root maxW="sm" overflow="hidden">
                <Image
                  height="300px"

                  src="https://cdn-uploads.mealime.com/uploads/recipe/thumbnail/307/presentation_0ed152c0-47ef-4536-81b4-02dc6f31f876.jpg"
                  alt="Green double couch with wooden legs"
                />
                <Card.Body gap="2">
                  <Card.Title>Baked Salmon with Asparagus</Card.Title>
                  <Card.Description>
                    Baked Salmon with Asparagus is a flavorful, healthy dish featuring tender lemon-garlic salmon and roasted asparagus, perfect for a light and nutritious meal.
                  </Card.Description>
                  <Text textStyle="2xl" fontWeight="medium" letterSpacing="tight" mt="2">
                    350 k/cal  30g protein
                  </Text>
                </Card.Body>
                <Card.Footer gap="2">
                  <DialogRoot>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Baked Salmon with Asparagus</DialogTitle>
                      </DialogHeader>
                      <DialogBody>
                        <Image
                          height="300px"
                          width="500px"
                          src="https://cdn-uploads.mealime.com/uploads/recipe/thumbnail/307/presentation_0ed152c0-47ef-4536-81b4-02dc6f31f876.jpg"
                          alt="Green double couch with wooden legs"
                          paddingBottom="30px"
                        />
                        <p>
                          Baked Salmon with Asparagus is a light yet satisfying dish featuring tender, lemon-garlic seasoned salmon fillets baked alongside crisp asparagus spears. Drizzled with olive oil and topped with fresh herbs, this nutritious meal is rich in protein, omega-3s, and essential vitamins, making it a perfect choice for a balanced and flavorful dinner.

                        </p>
                        <Heading paddingTop="20px">Ingrediants</Heading>
                        <List.Root>
                          <List.Item>
                            4 salmon fillets (about 4-6 oz each)
                          </List.Item>
                          <List.Item>
                            1 bunch of asparagus, trimmed
                          </List.Item>
                          <List.Item>
                            2 tablespoons olive oil
                          </List.Item>
                          <List.Item>
                            2 cloves garlic, minced
                          </List.Item>
                          <List.Item>
                            1 lemon (half for juice, half sliced for garnish)
                          </List.Item>
                          <List.Item>
                            Salt and pepper, to taste
                          </List.Item>
                          <List.Item>
                            Fresh herbs (optional): dill, parsley, or thyme
                          </List.Item>

                        </List.Root>

                        <Heading paddingTop="20px">Instructions</Heading>
                        <List.Root as="ol">
                          <List.Item>
                            Preheat the Oven:

                            Preheat your oven to 400°F (200°C). Line a baking sheet with parchment paper or lightly grease it.          </List.Item>
                          <List.Item>
                            Prepare the Asparagus:

                            Place the trimmed asparagus on the baking sheet. Drizzle with 1 tablespoon of olive oil, season with salt and pepper, and toss to coat. Push the asparagus to one side to make space for the salmon.          </List.Item>
                          <List.Item>
                            Season the Salmon:

                            Place the salmon fillets on the baking sheet beside the asparagus. Drizzle the remaining olive oil over the salmon fillets, then sprinkle with minced garlic, salt, and pepper. Squeeze fresh lemon juice over the salmon, and top each fillet with a lemon slice for added flavor.
                          </List.Item>
                          <List.Item>
                            Bake:

                            Bake in the preheated oven for 12-15 minutes, or until the salmon flakes easily with a fork and is cooked through (internal temperature should reach 145°F / 63°C).
                          </List.Item>
                          <List.Item>
                            Garnish and Serve:

                            Remove from the oven and sprinkle fresh herbs over the salmon, if desired. Serve immediately with the roasted asparagus and lemon wedges on the side.
                          </List.Item>
                          <Heading paddingTop="20px">Summary</Heading>

                        </List.Root>
                        <List.Root>
                          <List.Item>
                            Calories: ~300-350 kcal

                          </List.Item>
                          <List.Item>
                            Protein: ~30 g
                          </List.Item>
                          <List.Item>
                            Carbohydrates: ~5-6 g
                          </List.Item>
                          <List.Item>
                            Fat: ~20g
                          </List.Item>
                        </List.Root>
                      </DialogBody>
                      <DialogFooter>
                        <DialogActionTrigger asChild>
                          <Button variant="outline">Cancel</Button>
                        </DialogActionTrigger>
                        <Button>Save</Button>
                      </DialogFooter>
                      <DialogCloseTrigger />
                    </DialogContent>
                  </DialogRoot>
                  {/*add baked salmon to favourite*/}
                  <IconButton
                    variant="ghost"
                    _hover={{ boxShadow: 'none', bg: 'transparent' }}
                    onClick={() => addToFavorites('bakedSalmon')}
                  >
                    <VscAdd />
                  </IconButton>
                  {/*add baked salmon to favourite*/}
                </Card.Footer>
              </Card.Root>

              {/*cauliflower rice bowl Card */}

              <Card.Root maxW="sm" overflow="hidden">
                <Image
                  height="300px"

                  src="https://www.southernliving.com/thmb/6MD2TeeV410mp_LuyXuzFCRVeTI=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/27162_FGFsuperbowl_0359_4x3-2000-0d9e3c72fed441849ad7773bc9909306.jpg"
                  alt="Green double couch with wooden legs"
                />
                <Card.Body gap="2">
                  <Card.Title>Cauliflower Rice Bowl
                  </Card.Title>
                  <Card.Description>
                    The Cauliflower Rice Bowl is a nutritious, low-carb dish with tender cauliflower rice, sautéed vegetables, your choice of protein, and creamy avocado, all topped with a light sesame-soy sauce for a flavorful, satisfying meal.

                  </Card.Description>
                  <Text textStyle="2xl" fontWeight="medium" letterSpacing="tight" mt="2">
                    350 k/cal  30 protein
                  </Text>
                </Card.Body>
                <Card.Footer gap="2">
                  <DialogRoot>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Cauliflower Rice Bowl</DialogTitle>
                      </DialogHeader>
                      <DialogBody>
                        <Image
                          height="300px"
                          width="500px"
                          src="https://www.southernliving.com/thmb/6MD2TeeV410mp_LuyXuzFCRVeTI=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/27162_FGFsuperbowl_0359_4x3-2000-0d9e3c72fed441849ad7773bc9909306.jpg"
                          alt="Green double couch with wooden legs"
                          paddingBottom="30px"
                        />
                        <p>
                          The Cauliflower Rice Bowl is a light, nutrient-packed dish featuring tender cauliflower rice
                          topped with sautéed vegetables like bell peppers, broccoli, and carrots, and your choice of
                          protein, such as grilled chicken or tofu. Finished with fresh avocado slices and a flavorful
                          sesame-soy drizzle, this bowl offers a satisfying, low-carb meal thats rich in fiber,
                          vitamins, and protein.
                        </p>


                        <Heading paddingTop="20px">Recipe</Heading>
                        <List.Root>
                          <List.Item>
                            1 medium head of cauliflower, riced (about 4 cups, or use pre-riced cauliflower)
                          </List.Item>
                          <List.Item>
                            1 tablespoon olive oil or coconut oil
                          </List.Item>
                          <List.Item>
                            1 bell pepper, diced
                          </List.Item>
                          <List.Item>
                            1/2 cup cherry tomatoes, halved
                          </List.Item>
                          <List.Item>
                            1/2 cup broccoli florets
                          </List.Item>
                          <List.Item>
                            1/2 cup shredded carrots
                          </List.Item>
                          <List.Item>
                            1 avocado, sliced
                          </List.Item>
                          <List.Item>
                            Salt and pepper, to taste
                          </List.Item>
                          <List.Item>
                            1 cup grilled chicken breast, sliced (or substitute with 1 cup cooked shrimp or 1 cup cubed, cooked tofu)
                          </List.Item>
                          <List.Item>
                            2 tablespoons soy sauce or coconut aminos (optional)
                          </List.Item>
                          <List.Item>
                            1 teaspoon sesame oil (optional)
                          </List.Item>
                          <List.Item>
                            1 teaspoon lime juice (optional)
                          </List.Item>

                        </List.Root>

                        <Heading paddingTop="20px">Instructions</Heading>
                        <List.Root as="ol">
                          <List.Item>
                            Prepare the Cauliflower Rice:

                            If using a fresh cauliflower head, cut it into florets and pulse in a food processor until it resembles rice grains.
                            Heat olive oil or coconut oil in a large skillet over medium heat. Add the cauliflower rice and cook for 5-7 minutes until softened. Season with salt and pepper.
                          </List.Item>
                          <List.Item>
                            Cook the Vegetables:

                            In the same skillet, sauté the bell pepper, broccoli, and shredded carrots until tender-crisp, about 5 minutes.</List.Item>
                          <List.Item>
                            Prepare the Sauce (Optional):

                            In a small bowl, whisk together soy sauce, sesame oil, lime juice, honey (if using), and grated ginger. </List.Item>
                          <List.Item>
                            Assemble the Bowl:

                            Divide the cauliflower rice into bowls. Top with the cooked vegetables, protein of choice, cherry tomatoes, and avocado slices.
                            Drizzle the sauce over the top, or serve it on the side. </List.Item>
                          <List.Item>
                            Serve:

                            Enjoy warm or at room temperature as a nutritious, low-carb, and satisfying meal.
                          </List.Item>
                        </List.Root>

                        <Heading paddingTop="20px">Summary</Heading>

                        <List.Root>
                          <List.Item>
                            Calories: 300-350 kcal
                          </List.Item>
                          <List.Item>
                            Protein: 25-30 g
                          </List.Item>
                          <List.Item>
                            Carbs: 12-15 g
                          </List.Item>
                          <List.Item>
                            Fats: 15-18 g
                          </List.Item>
                        </List.Root>

                      </DialogBody>
                      <DialogFooter>
                        <DialogActionTrigger asChild>
                          <Button variant="outline">Cancel</Button>
                        </DialogActionTrigger>
                        <Button>Save</Button>
                      </DialogFooter>
                      <DialogCloseTrigger />
                    </DialogContent>
                  </DialogRoot>

                  <Icon fontSize="2xl" color="pink.700">
                    <VscAdd />
                  </Icon>
                </Card.Footer>
              </Card.Root>
            </Tabs.Content>
            <Tabs.Content value="tasks">
              Manage your tasks for freelancers
            </Tabs.Content>
          </Tabs.Root>




        </Stack>


      </Center>

    </div>
  );
}



export default Home;