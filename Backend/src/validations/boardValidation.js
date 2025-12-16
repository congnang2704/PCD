import Joi from 'joi';

import { StatusCodes } from 'http-status-codes';
import ApiError from '~/utils/ApiError';

const createNew = async (req, res, next) => {
    const correctCondition = Joi.object({
        title: Joi.string().required().min(3).max(50).trim().strict({
            'any.required': 'Trường tiêu đề là bắt buộc',
            'string.empty': 'Tiêu đề không được để trống',
            'string.min': 'Tiêu đề phải có ít nhất 3 ký tự',
            'string.max': 'Tiêu đề không được vượt quá 50 ký tự',
            'string.trim': 'Tiêu đề không được chứa khoảng trắng đầu/cuối',
        }),
        description: Joi.string().required().min(3).max(256).trim().strict()
    })

    try {

        // set abortEarly: false ddeer trường hợp có nhiều lỗi validation
        await correctCondition.validateAsync(req.body, { abortEarly: false })
        //Validate dữ liệu xong hết hợp lệ thì cho resquest thì đi tiếp sang controller
        next()
    } catch (error) {
        next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(error).message))

        // res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
        //     error: new Error(error).message
        // })
    }

}

export const boardValidation ={
    createNew
}
// export default boardValidation