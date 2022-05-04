import { NextPage } from 'next'
import { ChangeEvent } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { textState } from '@/atom'
import { charCountState } from '@/selector'

const CharacterCounter: NextPage = () => {
  return (
    <div>
      <h1>Counter Pate</h1>
      <TextInput />
      <CharacterCount />
    </div>
  )
}

const TextInput = () => {
  const [text, setText] = useRecoilState(textState)

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value)
  }

  return (
    <div>
      <input type='text' value={text} onChange={onChange} />
      <br />
      Echo: {text}
    </div>
  )
}

const CharacterCount = () => {
  const count = useRecoilValue(charCountState)
  return <p>Character Count: {count}</p>
}

export default CharacterCounter
