import {observable, action, computed, decorate} from 'mobx'

class card_list {
    listAll = []
    curList = []

    init(data) {
        this.listAll = data
    }

    addList(index) {
        this.curList.push(this.listAll[index])
    }

    removeList(index) {
        // console.log('listALl is ', this.listAll)
        console.log('index is ', index)
        let t = []
        for(let i=0;i<this.curList.length;i++) {
            if(i!==index) {
                t.push(this.curList[i])
            }
        }

        this.curList = JSON.parse(JSON.stringify(t))
    }

    setCurList(s) {

    }

    get getCurList() {
        return this.curList
    }
}

decorate(card_list, {
    listAll: observable,
    curList: observable,

    setList: action,
    init: action,
    addList: action,
    removeList: action,
    getCurList: computed
});

const cardList = new card_list()
export default cardList