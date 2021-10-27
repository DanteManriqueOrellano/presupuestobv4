import { Container, Token } from "typedi"

import { Collection, getRepository, IEntity, EntityConstructorOrPath, PartialBy, BaseFirestoreRepository } from "fireorm";
import { DataSource } from 'apollo-datasource'
import { DataSources } from 'apollo-server-core/dist/graphqlOptions'
import { RESTDataSource } from "apollo-datasource-rest";


export interface Context {
    dataSources: {
        basecrud: BaseCrud;//el crud debe tener el mismo nosmbre que el que se encuentra en el datasource de apollo.
    };
}
export type createInput<T> = {
    dataObj: T 
}

interface IDatabase {
    create<T>(input: createInput<T>, id?: string): Promise<any>;
    deleteById(id: string): Promise<string>;
    listAll(): Promise<any[]>;
    update<T>(input: createInput<T>, id?: any): Promise<IEntity>
}

export class BaseCrud extends RESTDataSource implements IDatabase {
    modelo: EntityConstructorOrPath<IEntity>
    repository: BaseFirestoreRepository<IEntity>

    constructor(model: any) {
        super();
        this.modelo = model
        this.repository = getRepository(this.modelo)
    }

    async create<T>(input: createInput<T>, id?: string): Promise<any> {

        const insumoRepository = getRepository(this.modelo);
        
        return await this.repository.create(input.dataObj);

    }
    async deleteById(id: string): Promise<string> {
        this.repository.delete(id)
        return "Eliminado Exitosamente"
    }

    async listAll(): Promise<any[]> {
        return this.repository.find()
    }

    async update<T>(input: createInput<T>, id?: any): Promise<any> {

        let uninsumo: any = await this.repository.findById(id);
        uninsumo = input.dataObj;
        
        return this.repository.update(uninsumo);
    }
}
/*
export class TodoDataSource1 extends RESTDataSource {
    _crud: TodoDataSource

    constructor() {
        super()

        this._crud = new TodoDataSource()
    }

    crud(): TodoDataSource {
        return this._crud
    }

}

export const instancecrud = new TodoDataSource1()





class myFirestoreDatabase implements IDatabase {

    async create<T>(input: createInput<T>, id?: string): Promise<any> {

        const insumoRepository = getRepository(input.modelo);

        //const unobjetoinstanciado  = Container.get(input.instanciaDImodelo)

        return await insumoRepository.create(input.obj);

    }

}


class myFirebaseDataSource extends DataSource {
    firestore: myFirestoreDatabase

    constructor() {
        super()
        
        this.firestore = new myFirestoreDatabase()
    }

    db(): myFirestoreDatabase {
        return this.firestore
    }
}
interface IDataSources {
    firebase: myFirebaseDataSource
}





const firestoreDataSourceInstance = new myFirebaseDataSource()

// Another way to get db instance outside of Context
export const firestoreInstance = firestoreDataSourceInstance.db()

export const dataSources: DataSources<IDataSources> = {
    firebase: firestoreDataSourceInstance,
}

export interface IContext {
    dataSources: IDataSources
}
*/