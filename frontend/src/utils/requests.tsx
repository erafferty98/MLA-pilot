'use client'

import axios from 'axios'

export const loginRequest = async (data) => {
  try {
    const response = await axios.post('http://localhost:8080/api/auth/login', {
      username: data.username,
      password: data.password,
    })

    if (response.status === 200) {
      return { success: true }
    } else {
      return { success: false, error: 'Invalid credentials' }
    }
  } catch (err) {
    console.log(err)
    return {
      success: false,
      error: "Looks like there's an issue on our end. Please try again.",
    }
  }
}

export const signupRequest = async (data) => {
  try {
    const response = await axios.post('http://localhost:8080/api/auth/signup', {
      username: data.username,
      password: data.password,
    })

    if (response.status === 200) {
      return { success: true }
    } else {
      return { success: false, error: 'Invalid credentials' }
    }
  } catch (err) {
    console.log(err)
    return {
      success: false,
      error: "Looks like there's an issue on our end. Please try again.",
    }
  }
}

export const addExercise = async (data) => {
  try {
    const response = await axios.post('http://localhost:5300/exercises/add', {
      ...data,
    })

    if (response.status === 200) {
      return { success: true }
    } else {
      throw new Error('There was an error adding your exercise')
    }
  } catch (err) {
    console.log(err)
    return {
      success: false,
      error: "There was an error adding your exercise' Please try again.",
    }
  }
}
