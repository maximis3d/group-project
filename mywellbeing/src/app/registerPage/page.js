import { Link, Button, HStack, Stack } from "@chakra-ui/react";
import Image from 'next/image';
import { Field } from "@/components/ui/field";
import { Input } from "@chakra-ui/react";
import { Flex } from "@chakra-ui/react";
import { Checkbox } from "@/components/ui/checkbox";

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

        <Flex className="inputContainer" gap="4" mt="20px"> 
          <Field label="First name" color="grey">
            <Input placeholder="First name" size="md" width="140px" />
          </Field>

          <Field label="Last name" color="grey">
            <Input placeholder="Last name" size="md" width="140px" />
          </Field>
        </Flex>

        <Field label="Phone number" color="grey" mt="20px"> 
          <Input placeholder="Enter your phone number" size="md" />
        </Field>

        <Field label="Date of birth" color="grey" mt="20px"> 
          <Input placeholder="Enter your date of birth" size="md" />
        </Field>


        <Field label="Email" color="grey" mt="20px"> 
          <Input placeholder="Enter your email" size="md" />
        </Field>

        <Field label="Password" helperText="Use 8 characters or more with a mix of letters, numbers & symbols" color="grey" mt="20px"> 
          <Input placeholder="Enter your password" size="md" type="password" />
        </Field>

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

        <Button as={Link} href="/moreInfoPage" size="lg" variant="solid" colorPalette="teal" width="200px">
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
