import "./App.css"
import InstaLogo from "./images/insta-word-logo.png"
import { TextField, IconButton, InputAdornment, Button } from "@mui/material"
import { Visibility, VisibilityOff } from "@mui/icons-material"
import { useEffect, useRef, useState } from "react"
import { LinearProgress, Stack, Typography } from "@mui/joy"
import { useForm } from "react-hook-form"

function App() {
  console.log("Re-render")
  const [showPassword, setShowPassword] = useState(false)
  const [inputValue, setInputValue] = useState("")
  const [emailValue, setEmailValue] = useState("")
  const [showSuccess, setShowSuccess] = useState(false)
  const timerId = useRef(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "all",
  })

  useEffect(() => {
    if (showSuccess) {
      timerId.current = setTimeout(() => {
        setShowSuccess(false)
      }, 2000)
    }
    return () => {
      clearTimeout(timerId.current)
    }
  }, [showSuccess])

  function handleClick() {
    if (isValid) {
      setShowSuccess(true)
    } else {
      setShowSuccess(false)
    }
  }

  const minLength = 12
  const onSubmit = (data) => {
    console.log(data)
  }
  console.log(errors)
  return (
    <div id="main-container">
      <div>
        <img id="insta-logo" src={InstaLogo} />
      </div>

      <div id="form-container">
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Stack className="stack" spacing={0.5}>
            <TextField
              onInput={(event) => setEmailValue(event.target.value)}
              bgcolor="red"
              size="small"
              className="input"
              id="email"
              placeholder="Email"
              label="Email"
              color="grey"
              variant="outlined"
              {...register("email", { required: "Email required." })}
              error={!!errors?.email}
              helperText={errors?.email?.message}
            />
          </Stack>
          <Stack
            className="stack"
            spacing={0.5}
            sx={{
              "--hue": Math.min(inputValue.length * 10, 120),
            }}
          >
            <TextField
              onInput={(event) => setInputValue(event.target.value)}
              {...register("password", {
                required: "Password required.",
                validate: (value) => {
                  if (
                    value.length < 10 ||
                    !value.match(/[a-z]/) ||
                    !value.match(/[A-Z]/) ||
                    !value.match(/[0-9]/)
                  ) {
                    return "⚠️ Please enter a valid password(Must be 10 or more characters, must contain at least one number and at least one uppercase alphabet)."
                  }
                  // if () {
                  //   return "Must contain one lowercase letter."
                  // }
                  // if () {
                  //   return "Must contain one uppercase letter."
                  // }
                  // if () {
                  //   return "Must contain one number."
                  // }
                },
              })}
              error={!!errors?.password}
              helperText={errors?.password?.message}
              size="small"
              className="input"
              color="grey"
              label="Password"
              id="password"
              placeholder="Password"
              variant="outlined"
              type={showPassword ? "text" : "password"}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end" id="input-adornment">
                    <IconButton
                      onClick={() => setShowPassword((show) => !show)}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <LinearProgress
              determinate
              size="sm"
              value={Math.min((inputValue.length * 100) / minLength, 100)}
              sx={{
                bgcolor: "rgb(250, 250, 250)",
                color: "hsl(var(--hue) 80% 40%)",
              }}
            />
            <Typography
              level="body-xs"
              sx={{ alignSelf: "flex-end", color: "hsl(var(--hue) 80% 30%)" }}
            >
              {inputValue.length < 6 && "Weak"}
              {inputValue.length >= 6 && inputValue.length < 10 && "Strong"}
              {inputValue.length >= 10 && "Very Strong"}
            </Typography>
          </Stack>
          <Button
            onClick={handleClick}
            type="submit"
            id="button"
            variant="contained"
          >
            Log in
          </Button>
        </form>
      </div>
      <div id="success-container">
        {showSuccess && <p style={{ color: "green" }}>Success!</p>}
      </div>
    </div>
  )
}

export default App
