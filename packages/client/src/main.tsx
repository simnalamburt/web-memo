import React from 'react'
import ReactDOM from 'react-dom/client'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes'
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons/faPencilAlt'

import logo from './img/logo.png'

// Stylesheets
import './index.css'

type TextAreaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  borderwidth: number
}
function TextArea(props: TextAreaProps) {
  const ref = React.useRef<HTMLTextAreaElement>(null)

  React.useLayoutEffect(() => {
    if (ref.current != null) {
      ref.current.style.height = 'inherit'
      ref.current.style.height = `${
        ref.current.scrollHeight + props.borderwidth * 2
      }px`
    }
  }, [props.value])

  // TODO: 스크롤 막 변함
  return <textarea rows={1} ref={ref} {...props}></textarea>
}

type Memo = [key: number, value: string]
type Memos = Memo[]
type Action =
  | [method: 'POST', key: number, content: string]
  | [method: 'PUT', key: number, content: string]
  | [method: 'DELETE', key: number]

function reducer(memos: Memos, action: Action): Memos {
  const [method, key, ..._] = action
  switch (method) {
    case 'POST':
      return [...memos, [key, action[2]]]
    case 'PUT':
      return memos.map(([k, old]) => [k, k === key ? action[2] : old])
    case 'DELETE':
      return memos.filter(([k, _]) => k !== key)
    default:
      throw new Error()
  }
}

type AppProps = {
  initialMemos: Memos
}
function App({ initialMemos }: AppProps) {
  const [input, setInput] = React.useState('')
  const [memos, dispatch] = React.useReducer(reducer, initialMemos)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const content = input
    setInput('')

    // TODO: Error handling
    const resp = await fetch(`//localhost:9494/memos`, {
      method: 'POST',
      body: content,
    })
    const key = parseInt(await resp.text())
    dispatch(['POST', key, content])
  }

  const handleChange =
    (key: number) => async (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const content = e.target.value
      dispatch(['PUT', key, content])

      // TODO: Error handling
      // TODO: Too frequent
      await fetch(`//localhost:9494/memos/${key}`, {
        method: 'PUT',
        body: content,
      })
    }
  const handleDelete =
    (key: number) => async (_: React.MouseEvent<HTMLAnchorElement>) => {
      dispatch(['DELETE', key])

      // TODO: Error handling
      await fetch(`//localhost:9494/memos/${key}`, { method: 'DELETE' })
    }

  return (
    <>
      <img id="logo" src={logo} />
      <form id="write" onSubmit={handleSubmit}>
        <TextArea
          borderwidth={2}
          placeholder="New Memo"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit" disabled={input === ''}>
          <Icon icon={faPencilAlt} size="lg" />
        </button>
      </form>
      <div id="result" className="conainer">
        {memos.map(([key, content]) => (
          <div key={key} className="result-memo">
            <TextArea
              borderwidth={8}
              value={content}
              onChange={handleChange(key)}
            />
            <a onClick={handleDelete(key)}>
              <Icon icon={faTimes} />
            </a>
          </div>
        ))}
      </div>
    </>
  )
}

// TODO: useSWR
fetch('//localhost:9494/memos').then(async (resp) => {
  const memos: Memos = await resp.json()

  const container = document.getElementById('root')
  if (container == null) {
    throw new Error('Could find "#app" element')
  }

  ReactDOM.createRoot(container).render(
    <React.StrictMode>
      <App initialMemos={memos} />
    </React.StrictMode>
  )
})
