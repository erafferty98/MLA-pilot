'use client'

import axios from 'axios'
import moment from 'moment'

export const loginRequest = async (data: authData) => {
  try {
    const response = await axios.post('http://localhost:8080/api/auth/login', {
      username: data.username,
      password: data.password,
    })

    if (response.status === 200) {
      return { success: true }
    } else {
      return {
        success: false,
        error: "Looks like there's an issue on our end. Please try again.",
      }
    }
  } catch (err) {
    if (err.response.status === 401) {
      return { success: false, error: 'Invalid credentials' }
    } else {
      return {
        success: false,
        error: "Looks like there's an issue on our end. Please try again.",
      }
    }
  }
}

export const signupRequest = async (data: authData) => {
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

export const addExercise = async (data: ExerciseFormReqType) => {
  const url = 'http://localhost:5300/exercises/add'
  // const url = 'http://localhost:8080/exercises/add' // stubs
  try {
    const response = await axios.post(url, {
      username: data.username,
      exerciseType: data.exerciseType,
      exerciseSubcategory: data.exerciseSubcategory,
      description: data.exerciseDescription,
      duration: data.exerciseDuration,
      sets: data.sets,
      reps: data.reps,
      weightLifted: data.weightLifted,
      date: data.exerciseDate,
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

export const fetchExercises = async (
  startDate: Date,
  endDate: Date,
  currentUser: string,
) => {
  try {
    const url = `http://localhost:5050/stats/weekly/?user=${currentUser}&start=${moment(
      startDate,
    ).format('YYYY-MM-DD')}&end=${moment(endDate).format('YYYY-MM-DD')}`
    // const url = `http://localhost:8080/stats/weekly/?user=${currentUser}&start=${moment(
    //   // stubs
    //   startDate,
    // ).format('YYYY-MM-DD')}&end=${moment(endDate).format('YYYY-MM-DD')}`
    const response = await axios.get(url)
    if (response.data.stats && Array.isArray(response.data.stats)) {
      return response.data.stats
    } else {
      console.error('Unexpected response structure:', response.data)
      return []
    }
  } catch (error) {
    console.error('Failed to fetch exercises', error)
  }
}

export const fetchStatistics = async (currentUser: string) => {
  try {
    const url = `http://localhost:5050/stats/${currentUser}`
    // const url = `http://localhost:8080/stats/${currentUser}` // stubs
    const response = await axios.get(url)
    if (response.data.stats && Array.isArray(response.data.stats)) {
      return response.data.stats
    } else {
      console.error('Unexpected response structure:', response.data)
      return []
    }
  } catch (error) {
    console.error('Failed to fetch exercises', error)
  }
}
