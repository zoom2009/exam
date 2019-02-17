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
        let temp = []
        console.log('sss')
        for(let i=0;i<this.curList.length;i++) {
            if(i===index) {
                console.log('found')
            }else {
                console.log('is push', i)
                temp.push(this.curList[i])
            }
        }
        this.setList(temp)
    }


    get getCurList() {
        return this.curList
    }
}

decorate(card_list, {
    listAll: observable,
    curList: observable,

    init: action,
    addList: action,
    removeList: action,
    getCurList: computed
});

const cardList = new card_list()
export default cardList