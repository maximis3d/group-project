import { Link, Text, Button, HStack, Stack } from "@chakra-ui/react";
import Image from 'next/image';
import { Field } from "@/components/ui/field";
import { Input } from "@chakra-ui/react";
import { redirect } from 'next/navigation';

async function loginUser(formData) {
  'use server';
  
  const username = formData.get('username');
  const password = formData.get('password');

  try {
    const response = await fetch('http://localhost:3000/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
      credentials: 'include',
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('Login failed:', error);
      throw new Error(`Login failed: ${error}`);
    }

    redirect('/homePage');
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
}

export default function LoginPage() {
  return (
    <Stack spacing={4} direction="column" align="center" mt="20px">
      <HStack spacing={1} className="headerContainer" align="center">
        <Image
          src="/logo.png" 
          alt="MyWellBeing Logo"
          width={50} 
          height={50}
        />
        <h1 style={{ color: "teal", fontWeight: "bold", fontSize:"24px"}}>MyWellBeing</h1>
      </HStack>

      <div className="bodyContainer" style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "flex-start",
        width: "300px",
        height: "100px", 
        textAlign: "center",
        marginTop: "40px"
      }}>
        <h1 style={{ fontWeight: "bold", fontSize:"24px" }}>Log in</h1>

        <form action={loginUser}>
          <Field label="Username" mt="20px" color="grey" >
            <Input 
              name="username"
              placeholder="Enter your username" 
              size="md" 
              type="username"
              errorText="This field might be incorrect"
              required
              
            />
          </Field>

          <Field label="Password" color="grey" mt="20px">
            <Input 
              name="password"
              placeholder="Enter your password" 
              size="md" 
              type="password"
              errorText="This field might be incorrect"
              required
            />
          </Field>

          <div className="bottomContainer" style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-start",
            width: "300px",
            height: "100px", 
            textAlign: "center",
            marginTop: "40px"
          }}>
            <Button 
              type="submit"
              size="lg" 
              variant="solid" 
              colorScheme="teal" 
              width="200px"
            >
              Log in
            </Button>

            <Link href="registerPage" mt="10px">
              <p style={{ fontSize: '12px', textDecoration: 'underline', marginTop: '10px'}}>
                Register for an account
              </p>
            </Link>
          </div>
        </form>
      </div>
    </Stack>
  );
}
