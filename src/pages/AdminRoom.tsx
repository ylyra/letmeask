import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";

import { Button } from "../components/Button";
import { RoomCode } from "../components/RoomCode";
import { Question } from "../components/Question";
import { useRoom } from "../hooks/useRoom";

import logoImg from "../assets/images/logo.svg";
import styles from "../styles/room.module.scss";

type RoomParams = {
  id: string;
};

export function AdminRoom() {
  const params = useParams<RoomParams>();
  const { questions, title } = useRoom(params.id);

  return (
    <section id={styles.pageRoom}>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Room {title} – LetMeAsk</title>
      </Helmet>
      <header>
        <div className={styles.content}>
          <img src={logoImg} alt="Letmeask" />

          <div>
            <RoomCode code={params.id} />
            <Button isOutlined>Encerrar sala</Button>
          </div>
        </div>
      </header>

      <main>
        <div className={styles.roomTitle}>
          <h1>Sala {title}</h1>
          {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
        </div>

        {questions.map((question) => (
          <Question
            key={question.id}
            content={question.content}
            author={question.author}
          />
        ))}
      </main>
    </section>
  );
}
