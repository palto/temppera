type fetchType = typeof fetch

export class TempperaSDK {
    constructor(readonly baseUrl: string, private fetch: fetchType) {
    }
    async getData(): Promise<string> {
        const response = await this.fetch(this.baseUrl)
        return response.text()
    }
}
