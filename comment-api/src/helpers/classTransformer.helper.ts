import { TransformFnParams } from 'class-transformer'

export function transformToNumber(params: TransformFnParams) {
    if (!isNaN(Number(params.value))) {
        return Number(params.value)
    }
    return params.value
}

export function transformToDate(params: TransformFnParams) {
    if (!isNaN(Date.parse(params.value))) {
        return new Date(Date.parse(params.value))
    }
    return params.value
} 