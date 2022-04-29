import userStore, { IUserStore } from './userStore';

export interface IStore {
  user: IUserStore;
}

export default function createStore(initialValue: any): () => IStore {
  return () => {
    return {
      user: { ...userStore(), ...initialValue?.user } // 这里的...initialValue会对userStore的一些默认key进行覆盖更新
    };
  };
}

 