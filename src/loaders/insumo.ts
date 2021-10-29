//se va a instanciar los cruds

import { InsumoCrud } from "../graphql/insumo/services/insumoCrud"

export default (model: any) => {
    return new InsumoCrud(model)

};