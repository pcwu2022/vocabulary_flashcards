export type UserData = {
    learning1: Array<string>,
    learning2: Array<string>,
    learning3: Array<string>,
    learning4: Array<string>,
    learning5: Array<string>,
    learnt: Array<string>,
    known: Array<string>,
    discarded: Array<string>,
    level: number,
    count: number
}

export enum UserDataIndex {
    learning1 = "l1",
    learning2 = "l2",
    learning3 = "l3",
    learning4 = "l4",
    learning5 = "l5",
    learnt = "lt",
    known = "kn",
    discarded = "dc"
}

export type Meanings = {
    partOfSpeech: string,
    definitions: Array<string>
};

export type DictionaryData = Array<Meanings>;

export type ContextData = {

}