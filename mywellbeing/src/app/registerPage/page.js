"use client"
import { useState } from 'react';
import { Link, Button, HStack, Stack } from '@chakra-ui/react';
import Image from 'next/image';
import { Field } from '@/components/ui/field';
import { Input } from '@chakra-ui/react';
import { Checkbox } from '@/components/ui/checkbox';

async function registerUser(formData) {

  try {
    const formObject = Object.fromEntries(formData); // Convert FormData to an object
    console.log('Form data:', formObject);

    const response = await fetch('http://localhost:5000/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',  // Important to set the Content-Type to application/json
      },
      body: JSON.stringify(formObject)  // Stringify the object into raw JSON
    });

    // Check if the response is ok
    if (!response.ok) {
      const errorData = await response.text();  // Get the raw response text if not ok
      throw new Error(errorData || 'Registration failed');
    }

    // Assuming successful response, parse the JSON
    const responseData = await response.json();
    console.log('Response data:', responseData);

    // After successful registration, redirect to login page
    window.location.href = '/loginLoadingPage';

  } catch (error) {
    console.error('Error:', error.message);  // Log error
    alert(error.message); // Show error message to the user
  }

}


export default function RegisterPage() {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  return (
    <Stack spacing={4} direction="column" align="center" mt="20px">
      {/*****************************************Start of header section*****************************************/}
      <HStack spacing={1} className="headerContainer" align="center">
        <Image
          src="/logo.png"
          alt="MyWellBeing Logo"
          width={50}
          height={50}
        />
        <h1 style={{ color: 'teal', fontWeight: 'bold', fontSize: '24px' }}>
          MyWellBeing
        </h1>
      </HStack>
      {/*****************************************End of header section*****************************************/}

      {/*****************************************Start of main body section*****************************************/}
      <div
        className="bodyContainer"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-start',
          width: '300px',
          marginTop: '40px',
        }}
      >
        <h1 style={{ fontWeight: 'bold', fontSize: '24px', width: '100%' }}>
          Sign up now
        </h1>

        <form
          onSubmit={async (e) => {
            e.preventDefault();
            setLoading(true);
            setErrorMessage(null);

            const formData = new FormData(e.target);
            try {
              await registerUser(formData);
            } catch (error) {
              setErrorMessage('Registration failed. Please try again later.');
            } finally {
              setLoading(false);
            }
          }}
        >
          <Field label="Username" color="grey" mt="20px">
            <Input name="username" placeholder="Enter a username" size="md" />
          </Field>

          <Field label="Email" color="grey" mt="20px">
            <Input name="email" placeholder="Enter your email" size="md" />
          </Field>

          <Field
            label="Password"
            helperText="Use 8 characters or more with a mix of letters, numbers & symbols"
            color="grey"
            mt="20px"
          >
            <Input name="password" placeholder="Enter your password" size="md" type="password" />
          </Field>

          <h1 style={{ fontWeight: 'bold', fontSize: '24px', width: '100%', marginTop: '20px' }}>
            More about you
          </h1>

          <Field label="Age" color="grey" mt="20px">
            <Input name="age" placeholder="Enter your age" size="md" />
          </Field>

          <Field label="Date of birth" color="grey" mt="20px">
            <Input name="dob" placeholder="Enter your date of birth in YYYY-MM-DD" size="md" />
          </Field>

          <Field label="Weight" color="grey" mt="20px">
            <Input name="weight" placeholder="Enter your weight in KG" size="md" />
          </Field>

          <Field label="Height" color="grey" mt="20px">
            <Input name="height" placeholder="Enter your height in CM" size="md" />
          </Field>

          <Field label="Gender" color="grey" mt="20px">
            <Input name="gender" placeholder="Enter your gender" size="md" />
          </Field>

          <Field label="Calories" color="grey" mt="20px">
            <Input name="calories" placeholder="What’s your current calorie intake?" size="md" />
          </Field>

          <Field
            label="Activity level"
            color="grey"
            mt="20px"
            helperText="Enter your activity level (Not Active, Lightly Active, Moderately Active, Very Active)"
          >
            <Input name="activity" placeholder="Enter your activity level" size="md" />
          </Field>

          <Checkbox mt="20px" style={{ alignItems: 'flex-start' }}>
            <span style={{ fontSize: '12px', color: 'grey' }}>
              By creating an account, I agree to our{' '}
              <Link href="https://google.com" style={{ textDecoration: 'underline', color: 'teal' }}>
                Terms of use and Privacy Policy
              </Link>{' '}
              and{' '}
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

          <Button
            type="submit"
            size="lg"
            variant="solid"
            colorPalette="teal"
            width="200px"
            mt="40px"
            isLoading={loading}
            loadingText="Registering..."
          >
            Register
          </Button>
        </form>

        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      </div>
      {/*****************************************End of main body section*****************************************/}

      {/*****************************************Start of bottom body section*****************************************/}
      <div
        className="bottomContainer"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-start',
          width: '300px',
          height: '100px',
          textAlign: 'center',
          marginTop: '40px',
        }}
      >
        <Link href="loginPage" mt="10px">
          <p style={{ fontSize: '12px', textDecoration: 'underline' }}>
            Already have an account?
          </p>
        </Link>
      </div>
      {/*****************************************End of bottom body section*****************************************/}
    </Stack>
  );
}
