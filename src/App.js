import './normal.css';
import './App.css';
import { useState } from 'react';
function App() {
  const [input,setInput] = useState("");
  const [chatLog, setChatLog] = useState([{
    user: "gpt",
    message: " Hola soy MUPI-ChatGPT en que puedo ayudarte?"
  },]);

  function clearChats(){
    setChatLog([]);
  }

  async function handleSubmit(e){
    e.preventDefault();
    let chatLogNew = [ ...chatLog, {user: "me" , message: `${input}`}]
    setInput("");
    setChatLog(chatLogNew)
    const messages = chatLogNew.map((message) => message.message).
    join("\n")
    const response = await fetch("http://localhost:3080/", {
      method: "POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        message: messages
   
      })
    });
    const data = await response.json();
    setChatLog([...chatLogNew,{
      user: "gpt", 
      message: `${data.message}`
    }])
    console.log(data.message);
  }
  return (
    <div className="App">
      <aside className="sideMenu">
        <div className="side-menu-button" onClick={clearChats}>
          <span>+</span>
          Nuevo Chat
        </div>
      </aside>
      <section className="chatBox">
        <div className="chat-log">
          {chatLog.map((message,index)=> (
            <ChatMessage key={index} message = {message}/>
          ))
          }

        </div>
        <div className="chat-input-holder">
          <form onSubmit={handleSubmit}>
            <input rows="1" value={input} 
            onChange={(e) => setInput(e.target.value)} className="chat-input-textarea">
            </input>
          </form>
          

        </div>
        
      </section>
      
    </div>
  );
}

const ChatMessage = ({message}) => {
  if(message.user === "gpt"){
    return(
      <div className={`chat-message ${message.user === "chatgpt"}`}>
            <div className="chat-message-center">
              <div className="avatar chatgpt">
                {message.user === "gpt" }
                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAbFBMVEXfBxP////eAADeAAjnU1j1x8rfABDxsrXfAA7419nxsLP1xcfkSU7pdnvpcHX42NrjP0X99PXkREn++fr30dP2y871vb/rgIPnWF3rhYj75OXjOD/97u/+8/ThIirgERvumJzsi4/yqazhFyGXOpA2AAADTElEQVR4nO3dW28aMRCGYdtb6JISAiHHppC0/f//sUGrVbpgYAzr0+h9rnPhT57JjJWuaqy1T88v3zR6eZ18pjP255tzjU7OvfyyZrN1Ri83t+ZVc8DPiDfmfZr7EFE1c6M7oDHvuQ8AAAAAAAAAAAAAAAAAAAAAAEBcre7PO4xpzIdT/f1D08zsd80RGzOzVnPExt1Zqzli42a2c6MzYjPtAyq9xa4HFUf8KlGlEfcDquvFxtzZfapucTfoDymKeFiiyiI2rT+gmojDMaEwYr+qHYuY+3xXO9aDveqHhm9MqCrU/3dRlRHPlWj1EWUBK+7F8z1Y+S36VzVFEaUlWm3E46uakoinVjUVEU+vasci5j51gLAe7FU0NORjYv8WK4kY+kumuoiXlWhFEUMGfZURw8dEZREvGRNVRbymB3tFDw3Jg7fqW7y2B4uPeH0PfkXMncVrjB7sFdmLl65qfgUW6uWrWiURxyzRIiPKV7XV7yojysfE6t7dVhhRPiZWc2cqjBjQg8vdoHML6Y8XMjTkJbpedpNcHrGIW5Tvopt5v6pUVajyEl3Pv3axiiKG9mCvml6Ur2qr5XCbrqQXAwb9fP+5UEWhtvIevD98D1UQsXWP0oBL34Ov+EJt3Q/hAVeeG9wp/BZbN5EGPOjBXkjEpOF25DdovSXaKXhoBNzgiYAF96L8BjdHS7RTaC/KA67PBCw0YkDAkyXaKbBQrx8TQ8VFDAh4tkQ7hRVqQImKbnCnqKExbg/2CirU8cbEUDGFOn4P9gpZ4MZZ1fyK6MWxVjW/AnoxXol2svdijDExlDlinDExlLVQx17V/DJGHONFL5GtUFOUaCfT0EgXMFOhxlrV/DIUauw5uC95xJirml/iXoy7qvkl7cXUJdpJWKjxVzW/ZBFTjomhRIWaZlXzS3KLqVY1vwSv/vRjYij60Ago0SgBo/di2lXNL2ovjvnHl8tFjJhvTAxF68WcY2IoUi9Oxf/KIsaYGJIX6lPAUdzzw0TkMXrAXcRH2WEeFiERxeIlCz9Mk+AwAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAJTo/zj2enWvOmO6G5NyFfs9Zm6mbGL3P+TS0St+7DG2j9/tUZst0/W/gP4azbNnu71/AAAAABJRU5ErkJggg=="
                width= "40px" heigth="20px"/>
              </div>
              <div className="message">
                {message.message}
              </div>
            </div>
            </div>
    )
  }
  else{
    return(
      <div className={`chat-message ${message.user === "gpt"}`}>
            <div className="chat-message-center">
              <div className="avatar">
                {message.user === "gpt" }
                <img src='https://png.pngtree.com/element_origin_min_pic/00/00/06/12575cb97a22f0f.jpg'
                width="40px" height= "40px"/>
              </div>
              <div className="message">
                {message.message}
              </div>
            </div>
            </div>
    )
  }
}

export default App;
