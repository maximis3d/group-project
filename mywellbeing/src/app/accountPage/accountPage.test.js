const validateAccountForm = (formData) => {
  const errors = {};
  const validActivityLevels = ["Not Active", "Lightly Active", "Moderately Active", "Very Active"];

//Username testing
  if (!formData.username) {
    errors.username = "Username is required.";
  }

//Email testing
  const emailRegex = /.+@.+\..+/;
  if (!formData.email || !emailRegex.test(formData.email)) {
    errors.email = "Please enter a valid email address.";
  }

//Password testing
  if (formData.password) {
    if (formData.password.length < 8) {
      errors.password = "Password must be at least 8 characters.";
    }
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match.";
    }
  }

//Age testing
  if (!formData.age || isNaN(Number(formData.age)) || Number(formData.age) < 18) {
    errors.age = "Age must be a number and at least 18.";
  }

  // Validate date of birth
  const dobRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!formData.dob || !dobRegex.test(formData.dob)) {
    errors.dob = "Please enter a valid date of birth in YYYY-MM-DD format.";
  }

  // weight testing
  if (!formData.weight || isNaN(Number(formData.weight)) || Number(formData.weight) <= 0) {
    errors.weight = "Weight must be a positive number.";
  }

  //  height testing
  if (!formData.height || isNaN(Number(formData.height)) || Number(formData.height) <= 0) {
    errors.height = "Height must be a positive number.";
  }

  //  activity level testing
  if (!validActivityLevels.includes(formData.activity)) {
    errors.activity = "Activity level must be one of: Not Active, Lightly Active, Moderately Active, Very Active.";
  }

  return errors;
};

describe("Account Page Validation", () => {
  test("shows errors for empty form", () => {
    const emptyForm = {
      username: "",
      email: "",
      dob: "",
      weight: "",
      height: "",
      age: "",
      activity: "",
    };

    const errors = validateAccountForm(emptyForm);
    
    expect(errors.username).toBe("Username is required.");
    expect(errors.email).toBe("Please enter a valid email address.");
    expect(errors.age).toBe("Age must be a number and at least 18.");
    expect(errors.dob).toBe("Please enter a valid date of birth in YYYY-MM-DD format.");
    expect(errors.weight).toBe("Weight must be a positive number.");
    expect(errors.height).toBe("Height must be a positive number.");
    expect(errors.activity).toBe("Activity level must be one of: Not Active, Lightly Active, Moderately Active, Very Active.");
  });

  test("validates password only when provided", () => {
    const formWithPassword = {
      username: "testuser",
      email: "test@email.com",
      dob: "1990-01-01",
      weight: "70",
      height: "175",
      age: "25",
      activity: "Not Active",
      password: "short",
      confirmPassword: "different"
    };

    const errors = validateAccountForm(formWithPassword);
    
    expect(errors.password).toBe("Password must be at least 8 characters.");
    expect(errors.confirmPassword).toBe("Passwords do not match.");
  });

  test("accepts valid form data", () => {
    const validForm = {
      username: "testuser",
      email: "test@email.com",
      dob: "1990-01-01",
      weight: "70",
      height: "175",
      age: "25",
      activity: "Not Active"
    };

    const errors = validateAccountForm(validForm);
    
    expect(Object.keys(errors).length).toBe(0);
  });
});
