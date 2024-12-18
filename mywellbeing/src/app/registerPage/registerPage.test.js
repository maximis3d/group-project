const activityLevels = ["Not Active", "Lightly Active", "Moderately Active", "Very Active"];
const validGender = ["Male", "Female"];

const validateRegisterForm = (formData) => {
  const errors = {};
  const { username, email, password, confirmPassword, age, dob, weight, height, gender, activity } = formData;

  // Username testing
  if (!username) {
    errors.username = "Username is required.";
  }

  // Email testing
  const emailRegex = /.+@.+\..+/;
  if (!email || !emailRegex.test(email)) {
    errors.email = "Please enter a valid email address.";
  }

  // Password testing
  if (password.length < 8) {
    errors.password = "Password must be at least 8 characters long.";
  } else if (!/[^a-zA-Z0-9]/.test(password)) {
    errors.password = "Password must contain at least one special character.";
  }

  // Confirm Password testing
  if (password !== confirmPassword) {
    errors.confirmPassword = "Passwords do not match.";
  }

  // Age testing
  if (!age || isNaN(Number(age)) || Number(age) < 18) {
    errors.age = "Age must be a number and at least 18.";
  }

  // dob testing
  const dobRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dob || !dobRegex.test(dob)) {
    errors.dob = "Please enter a valid date of birth in YYYY-MM-DD format.";
  }

  // Weight testing
  if (!weight || isNaN(Number(weight)) || Number(weight) <= 0) {
    errors.weight = "Weight must be a positive number.";
  }

  // Height testing
  if (!height || isNaN(Number(height)) || Number(height) <= 0) {
    errors.height = "Height must be a positive number.";
  }

  // Gender testing
  if (!validGender.includes(gender)) {
    errors.gender = "Gender must be one of: Male or Female";
  }

  // Activity level testing
  if (!activityLevels.includes(activity)) {
    errors.activity = "Activity level must be one of: Not Active, Lightly Active, Moderately Active, Very Active.";
  }

  return errors;
};

describe("Register Form Validation", () => {
  test("shows errors for empty form", () => {
    const emptyForm = {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      age: "",
      dob: "",
      weight: "",
      height: "",
      gender: "",
      activity: ""
    };

    const errors = validateRegisterForm(emptyForm);
    
    expect(errors.username).toBe("Username is required.");
    expect(errors.email).toBe("Please enter a valid email address.");
    expect(errors.password).toBe("Password must be at least 8 characters long.");
    expect(errors.age).toBe("Age must be a number and at least 18.");
    expect(errors.dob).toBe("Please enter a valid date of birth in YYYY-MM-DD format.");
    expect(errors.weight).toBe("Weight must be a positive number.");
    expect(errors.height).toBe("Height must be a positive number.");
    expect(errors.gender).toBe("Gender must be one of: Male or Female");
    expect(errors.activity).toBe("Activity level must be one of: Not Active, Lightly Active, Moderately Active, Very Active.");
  });

  test("shows error for invalid email format", () => {
    const formWithInvalidEmail = {
      username: "testuser",
      email: "invalidemail",
      password: "Password123!",
      confirmPassword: "Password123!",
      age: "25",
      dob: "1998-01-01",
      weight: "70",
      height: "175",
      gender: "Male",
      activity: "Not Active"
    };

    const errors = validateRegisterForm(formWithInvalidEmail);
    expect(errors.email).toBe("Please enter a valid email address.");
  });

  test("shows error for password mismatch", () => {
    const formWithMismatchedPasswords = {
      username: "testuser",
      email: "test@email.com",
      password: "Password123!",
      confirmPassword: "Password456!",
      age: "25",
      dob: "1998-01-01",
      weight: "70",
      height: "175",
      gender: "Male",
      activity: "Not Active"
    };

    const errors = validateRegisterForm(formWithMismatchedPasswords);
    expect(errors.confirmPassword).toBe("Passwords do not match.");
  });
});
