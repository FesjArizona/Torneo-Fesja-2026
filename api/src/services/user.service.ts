import * as userModel from '../models/user.model';

export const findUsers = async () => {
    return await userModel.findUsers()
};

export const findUser = async (userId: number) => {
    return await userModel.findUser(userId)
}