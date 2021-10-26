import Animal from '../agenda/lib';

export default (valorNombre: string) => {
    return new Animal({
        name: valorNombre,
       
    })
};