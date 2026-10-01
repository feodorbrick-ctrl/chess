import { useRef, useState } from "react";

function App() {
  const connection = useRef(null);
  const channel = useRef(null);

  const [offer, setOffer] = useState("");
  const [answer, setAnswer] = useState("");
  const [message, setMessage] = useState("");
  const [received, setReceived] = useState("");

  // Создание соединения
  function createConnection() {
    const pc = new RTCPeerConnection();

    connection.current = pc;

    // Когда второй человек отправляет данные
    pc.ondatachannel = (event) => {
      channel.current = event.channel;

      channel.current.onmessage = (event) => {
        setReceived(event.data);
      };
    };

    return pc;
  }

  // Человек A
  async function createOffer() {
    const pc = createConnection();

    const dataChannel = pc.createDataChannel("data");

    channel.current = dataChannel;

    dataChannel.onmessage = (event) => {
      setReceived(event.data);
    };

    const offer = await pc.createOffer();

    await pc.setLocalDescription(offer);

    setOffer(JSON.stringify(pc.localDescription));
  }

  // Человек B
  async function createAnswer() {
    const pc = createConnection();

    await pc.setRemoteDescription(
        JSON.parse(offer)
    );

    const answer = await pc.createAnswer();

    await pc.setLocalDescription(answer);

    setAnswer(JSON.stringify(pc.localDescription));
  }

  // Человек A вставляет Answer
  async function acceptAnswer() {
    await connection.current.setRemoteDescription(
        JSON.parse(answer)
    );
  }

  // Отправить данные
  function sendMessage() {
    channel.current.send(message);

    setMessage("");
  }

  return (
      <div>

        <h1>WebRTC Data Exchange</h1>

        <hr />

        <h2>Человек A</h2>

        <button onClick={createOffer}>
          Создать Offer
        </button>

        <textarea
            value={offer}
            readOnly
        />

        <p>
          Скопируй Offer и передай человеку B
        </p>

        <textarea
            placeholder="Вставь Answer сюда"
            value={answer}
            onChange={(event) => {
              setAnswer(event.target.value);
            }}
        />

        <button onClick={acceptAnswer}>
          Принять Answer
        </button>

        <hr />

        <h2>Обмен данными</h2>

        <input
            value={message}
            onChange={(event) => {
              setMessage(event.target.value);
            }}
            placeholder="Данные"
        />

        <button onClick={sendMessage}>
          Отправить
        </button>

        <p>
          Получено: {received}
        </p>

        <hr />

        <h2>Человек B</h2>

        <p>
          Вставь Offer:
        </p>

        <textarea
            value={offer}
            onChange={(event) => {
              setOffer(event.target.value);
            }}
        />

        <button onClick={createAnswer}>
          Создать Answer
        </button>

        <p>
          Передай Answer человеку A
        </p>

      </div>
  );
}

export default App;