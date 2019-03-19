import {observable, action, computed, decorate} from 'mobx'

class card_list {
    listAll = []
    curList = []

    init(data) {
        this.listAll = data
    }

    addList(index) {
        let t = []
        this.curList.push(this.listAll[index])
        for(let i=0;i<this.listAll.length;i++) {
            if(i!==index) {
                t.push(this.listAll[i])
            }
        }
        this.listAll = t
    }

    removeList(index) {
        // console.log('listALl is ', this.listAll)
        // console.log('index is ', index)
        this.listAll.push(this.curList[index])
        let t = []
        for(let i=0;i<this.curList.length;i++) {
            if(i!==index) {
                t.push(this.curList[i])
            }
        }
        this.curList = t
    }

    setCurList(s) {

    }

    get getCurList() {
        return this.curList
    }

    get getAllList() {
        return this.listAll
    }
}

decorate(card_list, {
    listAll: observable,
    curList: observable,

    setList: action,
    init: action,
    addList: action,
    removeList: action,
    getCurList: computed,
    getAllList: computed
});

const cardList = new card_list()
export default cardList