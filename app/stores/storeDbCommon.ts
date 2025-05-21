import { defineStore } from 'pinia'
import { ref } from 'vue'
import { openDB } from 'idb'
import type { IDBPDatabase } from 'idb'
import {indexedDbNameCommon, indexedDbVersion} from "../consts/app";

interface CommonDbSchema {
    FeedGenerator: {
        key: string
        value: any
    }
}

export const useDbCommonStore = defineStore('storage:common', () => {
    const db = ref<IDBPDatabase<CommonDbSchema> | null>(null)

    async function openDb() {
        if (db.value) return db.value

        db.value = await openDB<CommonDbSchema>(indexedDbNameCommon, indexedDbVersion, {
            upgrade(db) {
                db.createObjectStore('Profile')
                db.createObjectStore('ProfileFeed')
                db.createObjectStore('ProfilePosts')
                db.createObjectStore('PostsKeyVal')
            },
        })

        return db.value
    }

    return {
        openDb,
    }
})
