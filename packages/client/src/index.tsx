import React, { useState, useReducer, useRef, useLayoutEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes'
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons/faPencilAlt'

import logo from './img/logo.png'

// Stylesheets
import 'normalize.css'

function TextArea(props) {
  const ref = useRef<HTMLTextAreaElement>(null)

  useLayoutEffect(() => {
    if (ref.current != null) {
      ref.current.style.height = 'inherit'
      ref.current.style.height = `${
        ref.current.scrollHeight + props.borderwidth * 2
      }px`
    }
  }, [props.value])

  return (
    <>
      <textarea rows="1" ref={ref} {...props}></textarea>
    </>
  )
}

type Memo = [key: string, value: string]
type Memos = Memo[]
type Action =
  [method: 'POST', key: string, content: string] |
  [method: 'PUT', key: string, content: string] |
  [method: 'DELETE', key: string]

function reducer(memos: Memos, [method, key, ...rest]: Action) {
  switch (method) {
    case 'POST':
      return [...memos, [key, rest[0]]]
    case 'PUT':
      return memos.map(([k, old]) => [k, k === key ? rest[0] : old])
    case 'DELETE':
      return memos.filter(([k, _]) => k !== key)
    default:
      throw new Error()
  }
}

type AppProps = {
  data: Memos
}
function App({ data }) {
  // TODO: sync with server
  const [input, setInput] = useState('')
  const [memos, dispatch] = useReducer<Memos>(reducer, data)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const content = input
    setInput('')

    // TODO: Error handling
    const resp = await fetch(`//localhost:9494/memos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content }),
    })
    const key = await resp.text()
    dispatch(['POST', key, content])
  }

  const handleChange = (key: string) => async (e: React.FormEvent<HTMLTextAreaElement>) => {
    const content = e.target.value
    dispatch(['PUT', key, content])

    // TODO: Error handling
    // TODO: Too frequent
    await fetch(`//localhost:9494/memos/${key}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content }),
    })
  }
  const handleDelete = (key: string) => async (_) => {
    dispatch(['DELETE', key])

    // TODO: Error handling
    await fetch(`//localhost:9494/memos/${key}`, { method: 'DELETE' })
  }

  return (
    <React.StrictMode>
      <img src={logo} />
      <form id="write" onSubmit={handleSubmit}>
        <TextArea
          borderwidth={2}
          placeholder="New Memo"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit">
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
    </React.StrictMode>
  )
}

// TODO: useSWR
fetch('//localhost:9494/memos').then(async resp => {
  const data = await resp.json()

  const container = document.getElementById('app')
  if (container != null) {
    createRoot(container).render(<App data={data.map(({ id, content }) => [id, content])} />)
  } else {
    console.error('Could find "#app" element')
  }
})

