import { Animal } from ".";
/**
 * Set name of queue
 * @name Agenda#name
 * @function
 * @param name name of agenda instance
*/
export const name = function (this: Animal, name: string): Animal{
    this._name = name.toUpperCase();
    console.log(`mayuscula ${name.toUpperCase()}`)
    return this;
};
