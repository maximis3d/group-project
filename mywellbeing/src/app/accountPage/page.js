import { Link, Text, Button, HStack, Stack } from "@chakra-ui/react";
import Image from 'next/image';
import { Field } from "@/components/ui/field";
import { Input } from "@chakra-ui/react";

export default function AccountPage() {
  return (
    <Stack 
      spacing={4} 
      direction="column" 
      align="center" 
      mt="20px" 
    >
      {/*****************************************Start of header*****************************************/}
      <HStack spacing={4} className="headerContainer" align="center">
        <Link href="/homePage" mt="10px" color="teal">
          <p style={{ fontSize: '18px', padding: '0 8px' }}>Home</p>
        </Link>
        <Link href="/mealPlannerPage" mt="10px" color="teal">
          <p style={{ fontSize: '18px', padding: '0 8px' }}>Meals</p>
        </Link>
        <Link href="/healthPage" mt="10px" color="teal">
          <p style={{ fontSize: '18px', padding: '0 8px' }}>Health</p>
        </Link>
        <Link href="/goalsPage" mt="10px" color="teal">
          <p style={{ fontSize: '18px', padding: '0 8px' }}>Goals</p>
        </Link>
        <Link href="/accountPage" mt="10px" color="teal">
          <p style={{ fontSize: '18px', padding: '0 8px' }}>Account</p>
        </Link>
      </HStack>

      {/* Custom divider */}
      <div style={{ width: "360px", height: "2px", backgroundColor: "teal", margin: "16px 0" }} />
      {/*****************************************End of header section*****************************************/}
  
      {/*****************************************Start of main body section*****************************************/}
      <div className="bodyContainer" style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        width: "300px",
        textAlign: "center", 
        marginTop: "20px"
      }}>
        
        {/* Adding HStack to group Input and Change button side by side */}
        <Field label="Your name" color="grey" mt="20px"> 
          <HStack>
            <Input placeholder="Will C" size="md" width="200px" />
            <Button size="sm" colorPalette="teal">Change</Button>
          </HStack>
        </Field>

        <Field label="Your date of birth" color="grey" mt="20px"> 
          <HStack>
            <Input placeholder="14/08/2005" size="md" width="200px" />
            <Button size="sm" colorPalette="teal">Change</Button>
          </HStack>
        </Field>

        <Field label="Your phone number" color="grey" mt="20px"> 
          <HStack>
            <Input placeholder="07529475558" size="md" width="200px" />
            <Button size="sm" colorPalette="teal">Change</Button>
          </HStack>
        </Field>

        <Field label="Your email" color="grey" mt="20px"> 
          <HStack>
            <Input placeholder="w21813663@northumbria.ac.uk" width="200px" size="md" />
            <Button size="sm" colorPalette="teal">Change</Button>
          </HStack>
        </Field>

        <Field label="Your password" color="grey" mt="20px"> 
          <HStack>
            <Input placeholder="••••••••••••••••" size="md" width="200px" type="password" />
            <Button size="sm" colorPalette="teal">Change</Button>
          </HStack>
        </Field>

        <Field label="Your height" color="grey" mt="20px"> 
          <HStack>
            <Input placeholder="170cm" size="md" width="200px" />
            <Button size="sm" colorPalette="teal">Change</Button>
          </HStack>
        </Field>

        <Field label="Your weight" color="grey" mt="20px" > 
          <HStack>
            <Input placeholder="75kg" size="md" width="200px" />
            <Button size="sm" colorPalette="teal">Change</Button>
          </HStack>
        </Field>

        <Button as={Link} href="/loginPage" size="lg" variant="solid" width="200px" colorPalette="red" mt="20px" mb="20px">
          Log out
        </Button>
      </div>
      {/*****************************************End of main body section*****************************************/}
    </Stack>
  );
}
