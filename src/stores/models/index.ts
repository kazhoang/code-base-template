import { UserModel, userModel } from './user.model';

export interface Model {
	userModel: UserModel;
}

export const model: Model = {
	userModel,
};
