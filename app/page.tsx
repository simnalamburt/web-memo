'use client'

import { faPencilAlt } from '@fortawesome/free-solid-svg-icons/faPencilAlt'
import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome'
import Image from 'next/image'
import React from 'react'

function Logo() {
  return (
    <Image id="logo" src="/logo.png" alt="Logo" width={500} height={83.9} />
  )
}

type TextAreaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  borderwidth: number
}
function TextArea(props: TextAreaProps) {
  const ref = React.useRef<HTMLTextAreaElement>(null)

  // biome-ignore lint/correctness/useExhaustiveDependencies: It does depend on props.value
  React.useLayoutEffect(() => {
    if (ref.current != null) {
      ref.current.style.height = 'inherit'
      ref.current.style.height = `${
        ref.current.scrollHeight + props.borderwidth * 2
      }px`
    }
  }, [props.value, props.borderwidth])

  // TODO: 스크롤 막 변함
  return <textarea rows={1} ref={ref} {...props} />
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
    const resp = await fetch('/memos', {
      method: 'POST',
      body: content,
    })
    const key = Number.parseInt(await resp.text())
    dispatch(['POST', key, content])
  }

  const handleChange =
    (key: number) => async (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const content = e.target.value
      dispatch(['PUT', key, content])

      // TODO: Error handling
      // TODO: Too frequent
      await fetch(`/memos/${key}`, {
        method: 'PUT',
        body: content,
      })
    }
  const handleDelete =
    (key: number) => async (_: React.MouseEvent<HTMLAnchorElement>) => {
      dispatch(['DELETE', key])

      // TODO: Error handling
      await fetch(`/memos/${key}`, { method: 'DELETE' })
    }

  return (
    <>
      <Logo />
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
            {/* biome-ignore lint/a11y/useValidAnchor: TODO Use button instead of anchor */}
            <a onClick={handleDelete(key)}>
              <Icon icon={faTimes} />
            </a>
          </div>
        ))}
      </div>
    </>
  )
}

export default function Home() {
  const [memos, setMemos] = React.useState<Memos | null>(null)

  React.useEffect(() => {
    fetch('/memos')
      .then((res) => res.json())
      .then((data) => setMemos(data))
  }, [])

  // TODO: Proper loading screen
  if (!memos) return <Logo />

  return <App initialMemos={memos} />
}
