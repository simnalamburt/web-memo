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

interface MainController {
  memos: any[], // TODO
  new: any, // TODO
  create(): angular.IPromise<any> | undefined, // TODO
  update(i: number): Promise<any>, // TODO
  delete(i: number): Promise<any>, // TODO
}

function MainController(this: MainController, Restangular: restangular.IService) {
  const all = Restangular.all('memos')
  const memos = all.getList().$object
  const select = (i: number) => memos.find((memo: { id: number }) => memo.id === i)

  this.memos = memos

  this.create = () => {
    if (this.new == null || this.new.content == null) { return }

    return all.post(this.new)
      .then((id: number) => {
        this.new.id = id

        const elem = Restangular.restangularizeElement(undefined, this.new, 'memos')
        memos.unshift(elem)

        this.new = {}
        return this.new
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
