import { Link, Text, Button, HStack, Stack } from "@chakra-ui/react";
import Image from 'next/image';
import { Field } from "@/components/ui/field";
import { Input } from "@chakra-ui/react";

export default function LoginPage() {
  return (
    <Stack 
      spacing={4} 
      direction="column" 
      align="center" 
      mt="20px" 
    >
      {/*****************************************Start of header*****************************************/}
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
        alignItems: "flex-start",  // Aligns items to the right
        justifyContent: "flex-start",
        width: "300px",
        height: "100px", 
        textAlign: "center",      // Ensures text aligns to the right
        marginTop: "40px"
      }}>
        <h1 style={{ fontWeight: "bold", fontSize:"24px" }}>Log in</h1>

        <Field label="Email" mt="20px" color="grey" helperText="We'll never share your email.">
          <Input placeholder="Enter your email" size="md" />
        </Field>

        <Field label="Password" color="grey" mt="20px">
          <Input placeholder="Enter your password" size="md" type="password" />
        </Field>
    {/*****************************************End of Main body section*****************************************/}  

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

        <Link href="/loginLoadingPage">  
        <Button size="lg" variant="solid" colorPalette="teal" width="200px" >Log in</Button>
        </Link>

        <Link href="registerPage" mt="10px">
          <p style={{ fontSize: '12px', textDecoration: 'underline'}}>Register for an account</p>
        </Link>
        
        </div>
        {/*****************************************End of bottom body section*****************************************/}
      </div>
    </Stack>
  );
}
