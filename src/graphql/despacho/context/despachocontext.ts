import { DespachoCrud } from "../services/despachocrud";

export interface IDespachoContext {
    dataSources: {
        despacho: DespachoCrud;//el crud debe tener el mismo nosmbre que el que se encuentra en el datasource de apollo.
    };
}