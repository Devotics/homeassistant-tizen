import { doExecuteCommand } from '../ws/actions';

export const doGetUser = () => doExecuteCommand({ type: 'auth/current_user' });
