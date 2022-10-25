import { defineStore } from 'pinia';

 const Test = defineStore({
    id: 'Test',
    state: () => ({
        test: '仓库测试值',
    }),

    getters: {
        getTest(): string {
            return this.test;
        }
    },
    actions: {
        changeVal() {
            this.test = '改变值为：14';
        }
    }
})

export default Test