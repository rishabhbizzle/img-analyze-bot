import axios from 'axios'

const API_URL = import.meta.env.VITE_API_BASE_URL

export const analyzeImage = async (formData) => {
  try {
    const response = await fetch(`${API_URL}/analyze`, {
      method: "POST",
      body: formData
    }).then((res) => res.json())
    return response
  } catch (error) {
    console.log(error)
    return null
  }
}

export const getChats = async () => {
  try {
    const response = await fetch(`${API_URL}/chats`).then((res) => res.json())
    return response
  } catch (error) {
    console.log(error)
    return null
  }
}


export const deleteChats = async () => {
  try {
    const response = await fetch(`${API_URL}/cleanChats`,
      {
        method: "DELETE"
      }
    ).then((res) => res.json())
    return response
  } catch (error) {
    console.log(error)
    return null
  }
}