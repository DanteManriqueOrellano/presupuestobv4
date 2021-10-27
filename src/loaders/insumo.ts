//se va a instanciar los cruds

import { InsumoCrud } from "../graphql/insumo/services/insumoCrud";

//import { InsumoCrud } from ""

export default (model: any) => {
    return new InsumoCrud(model)

};