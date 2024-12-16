"use client";
import { useState } from 'react';
import { Link, Button, HStack, Stack } from '@chakra-ui/react';
import Image from 'next/image';
import { Field } from '@/components/ui/field';
import { Input } from '@chakra-ui/react';
import { Checkbox } from '@/components/ui/checkbox';
import { handleFormSubmission } from '../../scripts/formHandler'; // Import the reusable function

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [formErrors, setFormErrors] = useState({});

  const activityLevels = ["Not Active", "Lightly Active", "Moderately Active", "Very Active"];
  const validGender = ["Male", "Female"];

  const validateForm = () => {
    const errors = {};

    // Validate username
    const username = document.getElementsByName('username')[0].value;
    if (!username) {
      errors.username = "Username is required.";
    }

    // Validate email
    const email = document.getElementsByName('email')[0].value;
    const emailRegex = /.+@.+\..+/;
    if (!email || !emailRegex.test(email)) {
      errors.email = "Please enter a valid email address.";
    }

    // Validate password
    if (password.length < 8) {
      errors.password = "Password must be at least 8 characters long.";
    } else if (!/[^a-zA-Z0-9]/.test(password)) {
      errors.password = "Password must contain at least one special character.";
    }

    // Confirm Password check
    if (password !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match.";
    }

    // Validate age
    const age = document.getElementsByName('age')[0].value;
    if (!age || isNaN(Number(age)) || Number(age) < 18) {
      errors.age = "Age must be a number and at least 18.";
    }

    // Validate date of birth
    const dob = document.getElementsByName('dob')[0].value;
    const dobRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dob || !dobRegex.test(dob)) {
      errors.dob = "Please enter a valid date of birth in YYYY-MM-DD format.";
    }

    // Validate weight
    const weight = document.getElementsByName('weight')[0].value;
    if (!weight || isNaN(Number(weight)) || Number(weight) <= 0) {
      errors.weight = "Weight must be a positive number.";
    }

    // Validate height
    const height = document.getElementsByName('height')[0].value;
    if (!height || isNaN(Number(height)) || Number(height) <= 0) {
      errors.height = "Height must be a positive number.";
    }

    // Validate gender
    const gender = document.getElementsByName('gender')[0].value;
    if (!validGender.includes(gender)) {
      errors.gender = "Gender must be one of: Male or Female";
    }

    // Validate activity level
    const activity = document.getElementsByName('activity')[0].value;
    if (!activityLevels.includes(activity)) {
      errors.activity = "Activity level must be one of: Not Active, Lightly Active, Moderately Active, Very Active.";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (confirmPassword && e.target.value !== confirmPassword) {
      setPasswordError("Passwords do not match.");
    } else {
      setPasswordError('');
    }
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    if (password && e.target.value !== password) {
      setPasswordError("Passwords do not match.");
    } else {
      setPasswordError('');
    }
  };

  return (
    <Stack spacing={4} direction="column" align="center" mt="20px">
      <HStack spacing={1} className="headerContainer" align="center">
        <Image src="/logo.png" alt="MyWellBeing Logo" width={50} height={50} />
        <h1 style={{ color: 'teal', fontWeight: 'bold', fontSize: '24px' }}>MyWellBeing</h1>
      </HStack>

      <div className="bodyContainer" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', width: '300px', marginTop: '40px' }}>
        <h1 style={{ fontWeight: 'bold', fontSize: '24px', width: '100%', textAlign:"center" } }>Sign up now</h1>

        <form
          onSubmit={async (e) => {
            e.preventDefault();
            setLoading(true);
            setErrorMessage(null);

            if (!validateForm()) {
              setLoading(false);
              return; // Stop form submission if validation fails
            }

            const formData = new FormData(e.target);
            const fetchEndpoint = 'http://localhost:5000/register';
            const redirectUrl = '/loginLoadingPage';

            try {
              await handleFormSubmission(formData, fetchEndpoint, redirectUrl);
            } catch (error) {
              setErrorMessage('Registration failed. Please try again later.');
            } finally {
              setLoading(false);
            }
          }}
        >
          <Field label="Username" color="grey" mt="20px">
            <Input name="username" placeholder="Enter a username" size="md" />
            {formErrors.username && <p style={{ color: 'red', fontSize: '12px' }}>{formErrors.username}</p>}
          </Field>

          <Field label="Email" color="grey" mt="20px">
            <Input name="email" placeholder="Enter your email" size="md" />
            {formErrors.email && <p style={{ color: 'red', fontSize: '12px' }}>{formErrors.email}</p>}
          </Field>

          <Field label="Password" helperText="Use 8 characters or more with a mix of letters, numbers & symbols" color="grey" mt="20px">
            <Input
              name="password"
              placeholder="Enter your password"
              size="md"
              type="password"
              value={password}
              onChange={handlePasswordChange}
            />
            {formErrors.password && <p style={{ color: 'red', fontSize: '12px' }}>{formErrors.password}</p>}
          </Field>

          <Field label="Confirm Password" color="grey" mt="20px">
            <Input
              name="confirmPassword"
              placeholder="Confirm your password"
              size="md"
              type="password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
            />
            {formErrors.confirmPassword && <p style={{ color: 'red', fontSize: '12px' }}>{formErrors.confirmPassword}</p>}
          </Field>

          {passwordError && <p style={{ color: 'red', fontSize: '12px' }}>{passwordError}</p>}  {/* Global password mismatch error */}

          <Field label="Age" color="grey" mt="20px">
            <Input name="age" placeholder="Enter your age" size="md" />
            {formErrors.age && <p style={{ color: 'red', fontSize: '12px' }}>{formErrors.age}</p>}
          </Field>

          <Field label="Date of birth" color="grey" mt="20px">
            <Input name="dob" placeholder="Enter your date of birth in YYYY-MM-DD" size="md" />
            {formErrors.dob && <p style={{ color: 'red', fontSize: '12px' }}>{formErrors.dob}</p>}
          </Field>

          <Field label="Weight" color="grey" mt="20px">
            <Input name="weight" placeholder="Enter your weight in KG" size="md" />
            {formErrors.weight && <p style={{ color: 'red', fontSize: '12px' }}>{formErrors.weight}</p>}
          </Field>

          <Field label="Height" color="grey" mt="20px">
            <Input name="height" placeholder="Enter your height in CM" size="md" />
            {formErrors.height && <p style={{ color: 'red', fontSize: '12px' }}>{formErrors.height}</p>}
          </Field>

          <Field label="Gender" color="grey" mt="20px">
            <Input name="gender" placeholder="Enter your gender" size="md" />
            {formErrors.gender && <p style={{ color: 'red', fontSize: '12px' }}>{formErrors.gender}</p>}
          </Field>

          <Field label="Activity level" color="grey" mt="20px" helperText="Enter your activity level (Not Active, Lightly Active, Moderately Active, Very Active)">
            <Input name="activity" placeholder="Enter your activity level" size="md" />
            {formErrors.activity && <p style={{ color: 'red', fontSize: '12px' }}>{formErrors.activity}</p>}
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

          <Button type="submit" size="lg" variant="solid" colorScheme="teal" width="200px" mt="40px" isLoading={loading} loadingText="Registering...">
            Register
          </Button>
        </form>

        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      </div>

      <div className="bottomContainer" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', width: '300px', height: '100px', textAlign: 'center', marginTop: '40px' }}>
        <Link href="loginPage" mt="10px">
          <p style={{ fontSize: '12px', textDecoration: 'underline' }}>Already have an account?</p>
        </Link>
      </div>
    </Stack>
  );
}
