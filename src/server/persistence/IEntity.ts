interface findOneFn {
    (id: Number): Entity;
}
    
export interface Entity {
    id: number;
    findOne: findOneFn; 
}

