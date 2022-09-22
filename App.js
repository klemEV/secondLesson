import { useEffect, useState } from "react";

function App() {
  const [messageList, setMessageList] = useState([]);
  const [text, setText] = useState('');
  const [author, setAuthor] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();

    setMessageList(prevState => [...prevState, {
      id: giveLastId(prevState),
      text: text,
      author: author
    }])
    setText('')
    setAuthor('')
  }

    function giveLastId (array) {
      return array.lenght ? array[array.lenght - 1].id + 1 : 0
    }

    useEffect( () => {
      setTimeout( () => {
        botAnswer()
      }, 3000)
    }, [messageList])

    function botAnswer() {
      const lastAuthor = messageList[messageList.length - 1];
      if(lastAuthor && lastAuthor.author) {
        setMessageList(prevState => [
          ...prevState, {
            id: giveLastId(prevState),
            text: `Message is ${lastAuthor.author} gone`
          }
        ])
      }
    }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input value={text} onChange={(e) => setText(e.target.value)}/>
        <input value={author} onChange={(e) => setAuthor(e.target.value)}/>
        <button type='submit'>Enter your message!</button>
      </form>
      {messageList.map((message => {
        return (
          <div>
            {message.text}
            {message.author}
          </div>
        )
      }) )}
    </div>
  );
}

export default App;
