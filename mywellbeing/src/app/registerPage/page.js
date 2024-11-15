import { Link, Button, HStack, Stack } from "@chakra-ui/react";
import Image from 'next/image';
import { Field } from "@/components/ui/field";
import { Input } from "@chakra-ui/react";
import { Flex } from "@chakra-ui/react";
import { Checkbox } from "@/components/ui/checkbox";

import {
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "@/components/ui/select";

const activityLevel = [
  { label: "Not Active (no exercise)", value: "Not Active" },
  { label: "Slightly active (exercise a couple times a week)", value: "Lightly Active" },
  { label: "Active (exercise 5x a week for at least 45 mins)", value: "Moderately Active" },
  { label: "Very active (Vigorous exercise multiple times a week)", value: "Very Active" },
];

const genderOptions = [
  { label: "Male", value: "Male" },
  { label: "Female", value: "Female" },
  { label: "Other", value: "Other" },
];

export default function registerPage() {
  return (
    <Stack 
      spacing={4} 
      direction="column" 
      align="center" 
      mt="20px" 
    >
      {/*****************************************Start of header section*****************************************/}
      <HStack spacing={1} className="headerContainer" align="center">
        <Image
          src="/logo.png" 
          alt="MyWellBeing Logo"
          width={50} 
          height={50}
        />
        <h1 style={{ color: "teal", fontWeight: "bold", fontSize:"24px"}}>MyWellBeing</h1>
      </HStack>
      {/*****************************************End of header section*****************************************/}

      {/*****************************************Start of main body section*****************************************/}       
      <div className="bodyContainer" style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",  
        justifyContent: "flex-start",
        width: "300px",
        marginTop: "40px"
      }}>

        <h1 style={{ fontWeight: "bold", fontSize: "24px", width: "100%" }}>Sign up now</h1> 



          <Field label="Username" color="grey" mt="20px"> 
          <Input placeholder="Enter a username" size="md" />
        </Field>

        <Field label="Email" color="grey" mt="20px"> 
          <Input placeholder="Enter your email" size="md" />
        </Field>


        <Field label="Password" helperText="Use 8 characters or more with a mix of letters, numbers & symbols" color="grey" mt="20px"> 
          <Input placeholder="Enter your password" size="md" type="password" />
        </Field>


        <h1 style={{ fontWeight: "bold", fontSize: "24px", width: "100%", marginTop:"20px" }}>More about you</h1> 

        <Field label="Age" color="grey" mt="20px"> 
          <Input placeholder="Enter your date age" size="md" />
        </Field>

        <Field label="Date of birth" color="grey" mt="20px"> 
          <Input placeholder="Enter your date of birth in YYYY-MM-DD" size="md" />
        </Field>

        <Field label="Weight" color="grey" mt="20px"> 
          <Input placeholder="Enter your weight in KG" size="md" />
        </Field>


        <Field label="Height" color="grey" mt="20px"> 
          <Input placeholder="Enter your height in KG" size="md" />
        </Field>

        <SelectRoot size="md"> {/* You can choose the desired size */}
          <SelectLabel color="grey" mt="20px">Gender</SelectLabel>
          <SelectTrigger>
            <SelectValueText placeholder="Select your gender" color="grey"/>
          </SelectTrigger>
          <SelectContent>
            {genderOptions.map((genderOptions) => (
              <SelectItem item ={genderOptions} key={genderOptions.value} >
                {genderOptions.label }
              </SelectItem >
            ))}
          </SelectContent>
        </SelectRoot>

        <Field label="Calories" color="grey" mt="20px"> 
          <Input placeholder="Whats current calorie intake" size="md" />
        </Field>
        

        <SelectRoot size="md"> {/* You can choose the desired size */}
          <SelectLabel color="grey" mt="20px">Activity Level</SelectLabel>
          <SelectTrigger>
            <SelectValueText placeholder="Select activity level" color="grey"/>
          </SelectTrigger>
          <SelectContent>
            {activityLevel.map((activityLevel) => (
              <SelectItem item={activityLevel} key={activityLevel.value}>
                {activityLevel.label}
              </SelectItem>
            ))}
          </SelectContent>
        </SelectRoot>

        

        <Checkbox mt="20px" style={{ alignItems: 'flex-start' }}>
          <span style={{ fontSize: '12px', color: 'grey' }}>
            By creating an account, I agree to our{" "}
            <Link href="https://google.com" style={{ textDecoration: 'underline', color: 'teal' }}>
              Terms of use and Privacy Policy 
            </Link>
            {" "} and{" "}
            <Link href="https://google.com" style={{ textDecoration: 'underline', color: 'teal' }}>
              Privacy Policy
            </Link>
          </span>
        </Checkbox>

        <Checkbox mt="20px" style={{ alignItems: 'flex-start' }}>
          <span style={{ fontSize: '12px', color: 'grey' }}>
            By creating an account, I am also consenting to receive SMS messages and emails, including product new feature updates, events, and marketing promotions.
          </span>
        </Checkbox>
      </div>
      {/*****************************************End of main body section*****************************************/} 



      {/*****************************************Start of bottom body section*****************************************/} 

      <div className="bottomContainer" style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",  // Aligns items to the right
        justifyContent: "flex-start",
        width: "300px",
        height: "100px", 
        textAlign: "center",      // Ensures text aligns to the right
        marginTop: "40px"
      }}>

        <Button as={Link} href="/loginLoadingPage" size="lg" variant="solid" colorPalette="teal" width="200px">
            Register
        </Button>

        <Link href="loginPage" mt="10px">
          <p style={{ fontSize: '12px', textDecoration: 'underline'}}>Already have an account</p>
        </Link>
        
        </div>
    {/*****************************************End of bottom body section*****************************************/} 
    </Stack>
  );
}
