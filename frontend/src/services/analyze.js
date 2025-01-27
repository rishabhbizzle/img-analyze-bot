import axios from 'axios'

const API_URL = import.meta.env.VITE_API_BASE_URL

export const analyzeImage = async (formData) => {
  try {
    const response = await axios.post(`${API_URL}/analyze`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return response.data
  } catch (error) {
    console.log(error)
    return null
  }
}

export const getChats = async () => {
  try {
    const response = await axios.get(`${API_URL}/chats`)
    return response?.data
  } catch (error) {
    console.log(error)
    return null
  }
}


export const deleteChats = async () => {
  try {
    const response = await axios.delete(`${API_URL}/cleanChats`)
    return response?.data
  } catch (error) {
    console.log(error)
    return null
  }
}