//se va a instanciar los cruds

import { UsuarioCrud } from "../graphql/usuario/service/usuarioCrud"

export default (model: any) => {
    return new UsuarioCrud(model)
    
};