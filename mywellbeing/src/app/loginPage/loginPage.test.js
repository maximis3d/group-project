// Simple validation function
const validateLoginForm = (email, password) => {
  const errors = {};
  
  if (!email) {
    errors.email = "Email is required";
  }
  
  if (!password) {
    errors.password = "Password is required";
  }
  
  return errors;
};

describe("Login Validation", () => {
  test("shows error messages when fields are empty", () => {
    const errors = validateLoginForm('', '');
    
    expect(errors.email).toBe("Email is required");
    expect(errors.password).toBe("Password is required");
  });
});
