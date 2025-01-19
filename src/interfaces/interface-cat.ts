interface ICatBreed {
    id: string,
    name: string,
    temperament: string
}

export interface ICat {
    id: string,
    url: string,
    width: number,
    height: number,
    breeds: ICatBreed[]
}
