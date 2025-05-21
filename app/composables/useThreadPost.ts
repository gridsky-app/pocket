import { useDbCommonStore } from '../stores/storeDbCommon'
import { ThreadModel } from '@gridsky/core/runtime/models/ThreadModel'

export function useThreadPost(uri: string, index: number) {
    async function getRawThreadFromIndexedDB(uri: string): Promise<ThreadModel> {
        const dbCommonStore = useDbCommonStore()
        const dbInstance = await dbCommonStore.openDb()

        const txFeedGeneratorPopular = dbInstance.transaction('PostsKeyVal', 'readonly')
        const storeFeedGeneratorPopular = txFeedGeneratorPopular.store

        return storeFeedGeneratorPopular.get(uri)
    }

    async function initialize() {
        let rawThread = await getRawThreadFromIndexedDB(uri)

        return new ThreadModel(rawThread, index)
    }

    return {
        initialize
    }
}
