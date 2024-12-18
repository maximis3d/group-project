import { User } from "@/models/user"; // Import User model

// Server action to handle registration
export async function registerUser(formData) {
  const { username, email, password, age, dob, weight, height, gender, calories, activity } = formData;

  try {
    const user = new User({
      username,
      email,
      password,
      age,
      dob,
      weight,
      height,
      gender,
      calories,
      activity,
    });

    await user.save();
    return { message: "Registration successful" };
  } catch (error) {
    console.error("Error during registration:", error);
    throw new Error("Registration failed: " + error.message);
  }
}