import { createAsyncThunk } from '@reduxjs/toolkit'
import {
  loginAPI
} from '~/apis'

export const login = createAsyncThunk('/user/login', async (data) => {
  return await loginAPI(data)
})
