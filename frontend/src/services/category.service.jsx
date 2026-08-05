import { muralisApi } from "../http-common";

class CategoryDataService {
    getAll() {
        return muralisApi.get('/categories');
    }
}

export default new CategoryDataService();