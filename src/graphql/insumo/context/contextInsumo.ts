import { InsumoCrud } from "../services/insumoCrud";

export interface IcontextInsumo {
    dataSources: {
        insumo: InsumoCrud;//el crud debe tener el mismo nosmbre que el que se encuentra en el datasource de apollo.
    };
}