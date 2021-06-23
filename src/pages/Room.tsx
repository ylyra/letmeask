import { useParams } from "react-router-dom";

import { Button } from "../components/Button";
import { RoomCode } from "../components/RoomCode";

import logoImg from "../assets/images/logo.svg";
import styles from "../styles/room.module.scss";

type RoomParams = {
  id: string;
};

export function Room() {
  const params = useParams<RoomParams>();

  return (
    <section id={styles.pageRoom}>
      <header>
        <div className={styles.content}>
          <img src={logoImg} alt="Letmeask" />

          <RoomCode code={params.id} />
        </div>
      </header>

      <main>
        <div className={styles.roomTitle}>
          <h1>Sala React</h1>
          <span>0 perguntas</span>
        </div>

        <form>
          <textarea placeholder="O que você quer perguntar?" />

          <div className={styles.formFooter}>
            <span>
              Para enviar uma pergunta, <button>faça seu login</button>.
            </span>

            <Button type="submit">Enviar pergunta</Button>
          </div>
        </form>
      </main>
    </section>
  );
}
