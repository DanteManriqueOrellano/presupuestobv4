import { UsuarioCrud } from "../service/usuarioCrud";

export interface IcontextUsuario {
    dataSources: {
        usuario: UsuarioCrud;//el crud debe tener el mismo nosmbre que el que se encuentra en el datasource de apollo.
    };
}