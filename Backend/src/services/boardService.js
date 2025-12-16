/* eslint-disable no-useless-catch */
import ApiError from '~/utils/ApiError'
import { slugify } from '~/utils/formatters'

const createNew = async (reqBody) => {
    try {
        // xử lý logic dữ liệu 
        const newBoard ={
            ...reqBody,
            slug: slugify(reqBody.title)
        }
        // trả kết quả về, trong service luôn phải có return
        return newBoard
    } catch (error) {
        throw error
    }
}

export const boardService = {
    createNew
}