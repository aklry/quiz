import { defineStore } from 'pinia'
import type { ISettingState} from './type'
import store from '@/stores'

export const useSettingStoreHooks = defineStore('setting', {
  state: (): ISettingState => ({
    selectedMenu: ['/home']
  }),
  actions: {
    setSelectedMenu(menu: string[]) {
      this.selectedMenu = menu
    }
  },
  persist: {
    key: 'setting',
    storage: localStorage,
    paths: ['selectedMenu']
  }
})

export function  useSettingStore() {
  return useSettingStoreHooks(store)
}