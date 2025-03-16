export interface ExpertiseType {
        id: number
        title: string
        name: string
        against: string
        case: string
        city: string
        address: string
        questions: string
        types: string
        img?: string
        document?: {
                id: number
                expertiseId: number
                fileUrl: string
                fileName: string
        }
}