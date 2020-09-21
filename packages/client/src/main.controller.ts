import angular from 'angular'
import restangular from 'restangular'

// Type declaration
interface Memo {
  id: number
  content: string
}
interface MainController {
  memos: Memo[]
  newContent: string
  create(): angular.IPromise<void> | undefined
  update(i: number): Promise<void>
  delete(i: number): Promise<void>
}

export default function MainController(
  this: MainController,
  Restangular: restangular.IService
) {
  const all = Restangular.allUrl('memos', 'http://localhost:9494/')
  const memos = all.getList().$object
  const select = (i: number) => memos.find((memo) => memo.id === i)

  this.memos = memos

  this.create = () => {
    const content = this.newContent
    if (content == null || content.length === 0) {
      return
    }

    return all
      .post({ content })
      .then((id) => {
        this.newContent = ''

        const newMemo: Memo = { id, content }
        const elem = Restangular.restangularizeElement(
          undefined,
          newMemo,
          'memos'
        )
        memos.unshift(elem)
      })
      .catch(() => {
        throw Error('unimplemented')
      })
  }

  this.update = (i) =>
    select(i)
      .put()
      .catch(() => {
        throw Error('unimplemented')
      })

  this.delete = (i) => {
    const memo = select(i)
    return memo
      .remove()
      .then(() => {
        const index = memos.indexOf(memo)
        if (index !== -1) {
          memos.splice(index, 1)
        }
      })
      .catch(() => {
        throw Error('unimplemented')
      })
  }
}
