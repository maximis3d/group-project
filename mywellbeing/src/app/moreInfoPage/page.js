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
    { label: "Slightly active (exercise a couple times a week)", value: "Slightly active" },
    { label: "Active (exercise 5x a week for at least 45 mins)", value: "Active" },
    { label: "Very active (Vigorous exercise multiple times a week)", value: "Very active" },
  ];
  
  const genderOptions = [
      { label: "Male", value: "Male" },
      { label: "Female", value: "Female" },
    ];
  
    const goalOptions = [
      { label: "Lose 0.5kg a week", value: "Lose 0.5kg a week" },
      { label: "Lose 1kg a week", value: "Lose 1kg a week" },
      { label: "Maintain weight", value: "Maintain weight" },
      { label: "Gain 0.5kg a week", value: "Gain 0.5kg a week" },
      { label: "Gain 1kg a week", value: "Gain 1kg a week" },
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

    <h1 style={{ fontWeight: "bold", fontSize: "24px", width: "100%" }}>More about you</h1> {/* Aligning to the left */}

        <Flex className="inputContainer" gap="4" mt="20px"> 
          <Field label="Height(cm)" color="grey">
            <Input placeholder="Enter your height" size="md" width="140px" />
          </Field>

          <Field label="Weight(kg)" color="grey">
            <Input placeholder="Enter your weight" size="md" width="140px" />
          </Field>
        </Flex>







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


        <h1 style={{ fontWeight: "bold", fontSize: "24px", width: "100%", marginTop: "20px" }}>Choose a goal</h1> {/* Aligning to the left */}


        <SelectRoot size="md"> {/* You can choose the desired size */}
          <SelectLabel color="grey" mt="10px">Goals</SelectLabel>
          <SelectTrigger>
            <SelectValueText placeholder="Select your goal" color="grey"/>
          </SelectTrigger>
          <SelectContent>
            {goalOptions.map((goalOptions) => (
              <SelectItem item ={goalOptions} key={goalOptions.value} >
                {goalOptions.label }
              </SelectItem >
            ))}
          </SelectContent>
        </SelectRoot>

      </div>
      {/*****************************************End of main body section*****************************************/} 



      {/*****************************************Start of bottom body section*****************************************/} 

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

        <Button as={Link} href="/loginLoadingPage" size="lg" variant="solid" colorPalette="teal" width="200px">
            Next
        </Button>

        <Link href="loginPage" mt="10px">
          <p style={{ fontSize: '12px', textDecoration: 'underline'}}>Already have an account</p>
        </Link>
        
        </div>
    {/*****************************************End of bottom body section*****************************************/} 
    </Stack>
  );
}
