"use client"

import { Stack, Box } from "@chakra-ui/react"
import { Button } from "@/components/ui/button"
import { Field } from "@/components/ui/field"
import { Slider } from "@/components/ui/slider"
import { Controller, useForm } from "react-hook-form"
import { CiFaceSmile, CiFaceMeh, CiFaceFrown } from "react-icons/ci"

const MoodSlider = ({ onMoodSubmit }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { value: [40] },
  })

  const onSubmit = handleSubmit((data) => {
    console.log(data)
    onMoodSubmit(data.value[0])
  })

  // Function to determine which face to show
  const getFaceIcon = (value) => {
    if (value >= 70) {
      return <CiFaceSmile size={50} color="green" />
    } else if (value >= 40) {
      return <CiFaceMeh size={50} color="orange" />
    } else {
      return <CiFaceFrown size={50} color="red" />
    }
  }

  return (
    <Box width="100%" maxWidth="400px">
      <form onSubmit={onSubmit}>
        <Stack align="center" gap="6" w="100%" p="6">
          <Controller
            name="value"
            control={control}
            render={({ field }) => (
              <Field
                label={
                  <Stack 
                    align="center" 
                    spacing={2} 
                    width="100%" 
                    display="flex"
                    justifyContent="center"
                  >
                    <Box 
                      display="flex" 
                      justifyContent="center" 
                      alignItems="center"
                      width="100%"
                      marginX="auto"
                    >
                      {getFaceIcon(field.value[0])}
                    </Box>
                    <Box textAlign="center" width="100%">Slider: {field.value[0]}</Box>
                  </Stack>
                }
                invalid={!!errors.value?.length}
                errorText={errors.value?.[0]?.message}
                width="100%"
                style={{ 
                  minWidth: '300px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center'
                }}
              >
                <Slider
                  width="full"
                  onFocusChange={({ focusedIndex }) => {
                    if (focusedIndex !== -1) return
                    field.onBlur()
                  }}
                  name={field.name}
                  value={field.value}
                  onValueChange={({ value }) => {
                    field.onChange(value)
                  }}
                  style={{ 
                    width: '100%',
                    minWidth: '300px',
                    height: '20px'
                  }}
                />
              </Field>
            )}
          />

          <Button size="sm" type="submit">
            Submit
          </Button>
        </Stack>
      </form>
    </Box>
  )
}

export default MoodSlider
