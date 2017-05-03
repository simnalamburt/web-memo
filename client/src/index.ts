import angular from 'angular'
import 'angular-elastic'
import restangular from 'restangular'
import './ga.js'

// Stylesheets
import 'font-awesome/css/font-awesome.css'
import 'normalize.css'
import './style.css'


// TODO: Update @types/restangular
declare const restangular = 'restangular'


// Type declaration
interface Memo { id: number, content: string }
interface MainController {
  memos: Memo[],
  newContent: string,
  create(): angular.IPromise<void> | undefined,
  update(i: number): Promise<void>,
  delete(i: number): Promise<void>,
}


function MainController(this: MainController, Restangular: restangular.IService) {
  const all = Restangular.all('memos')
  const memos = all.getList().$object
  const select = (i: number) => memos.find((memo: { id: number }) => memo.id === i)

  this.memos = memos

  this.create = () => {
    const content = this.newContent
    if (content == null || content.length === 0) { return }

    return all.post({ content })
      .then((id: number) => {
        this.newContent = ''

        const newMemo: Memo = { id, content }
        const elem = Restangular.restangularizeElement(undefined, newMemo, 'memos')
        memos.unshift(elem)
      })
      .catch(() => { throw Error('unimplemented') })
  }

  this.update = (i: number) => select(i).put()
    .catch(() => { throw Error('unimplemented') })

  this.delete = (i: number) => {
    const memo = select(i)
    return memo.remove()
      .then(() => {
        const index = memos.indexOf(memo)
        if (index !== -1) { memos.splice(index, 1) }
      })
      .catch(() => { throw Error('unimplemented') })
  }
}


angular
  .module('hyeonme', ['monospaced.elastic', restangular])
  .controller('MainController', ['Restangular', MainController])
