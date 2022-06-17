export interface HashTag {
    name: string
}

export interface Note {
    id: string
    content: string
    tags: HashTag[]
}
