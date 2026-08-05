import { geoApi } from "../http-common";

class FreguesiaService {
    getAll() {
        return geoApi.get('/municipio/leiria/freguesias');
    }
}

export default new FreguesiaService();