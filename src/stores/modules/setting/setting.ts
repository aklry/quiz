import { defineStore } from 'pinia'
import type { ISettingState} from './type'
import store from '@/stores'

export const useSettingStoreHooks = defineStore('setting', {
  state: (): ISettingState => ({
    selectedMenu: ['/']
  }),
  actions: {
    setSelectedMenu(menu: string[]) {
      this.selectedMenu = menu
    }
  },
  persist: {
    key: 'setting',
    storage: sessionStorage,
    paths: ['selectedMenu']
  }
})

export function  useSettingStore() {
  return useSettingStoreHooks(store)
}