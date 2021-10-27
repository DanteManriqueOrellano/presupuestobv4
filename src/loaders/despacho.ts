//se va a instanciar los cruds

import { DespachoCrud } from "../graphql/despacho/services/despachocrud"

export default (model: any) => {
    return new DespachoCrud(model)

};