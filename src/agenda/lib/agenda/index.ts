import { name} from "./name";

export interface IAnimalConfig {
    name?: any;
}

class Animal {
    _name: any;
    name!: typeof name;//se podria considerar metodos de la clase aplicados a los atributos
    

    constructor(
        config: IAnimalConfig = {}

    ) {
        this.name(config.name)
             
        

    }
}
Animal.prototype.name = name;//asignacion de la funcion al atributo.

export { Animal };