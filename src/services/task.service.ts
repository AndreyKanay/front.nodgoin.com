import BaseService from "./base.service.ts";
import {userState} from "../state/UserState.ts";

class TaskService extends BaseService {
    async getTasks() {
        const tasks = await this.axios.get(`/v1/earn?user_id${userState.user_id}`);
        return tasks.data;
    }
    async completeTask(task_id: string) {
        await this.axios.post('/v1/earn', {
            user_id: userState.user_id,
            task_id: task_id
        })
    }
}

const taskService = new TaskService();

export default taskService;