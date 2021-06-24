import { useState } from "react";
import { Helmet } from "react-helmet";
import { useHistory, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import { Button } from "../components/Button";
import { Modal } from "../components/Modal";
import { RoomCode } from "../components/RoomCode";
import { Question } from "../components/Question";
import { useAuth } from "../hooks/useAuth";
import { useRoom } from "../hooks/useRoom";
import { database } from "../services/firebase";

import logoImg from "../assets/images/logo.svg";
import deleteImg from "../assets/images/delete.svg";
import emptyQuestions from "../assets/images/empty-questions.svg";
import closeImg from "../assets/images/close.svg";
import styles from "../styles/room.module.scss";

type RoomParams = {
  id: string;
};

export function AdminRoom() {
  const { user } = useAuth();
  const history = useHistory();
  const params = useParams<RoomParams>();
  const roomId = params.id;

  const { questions, title } = useRoom(roomId);

  const [isEndRoomModalOpen, setIsEndRoomModalOpen] = useState(false);

  async function handleEndRoom() {
    if (!user) {
      return toast.error("You must be logged in");
    }

    await database.ref(`rooms/${roomId}`).update({
      endedAt: new Date(),
    });

    history.push("/");
  }

  function handleOpenEndRoomModal() {
    setIsEndRoomModalOpen(true);
  }

  function closeModal() {
    setIsEndRoomModalOpen(false);
  }

  async function handleDeleteQuestion(questionId: string) {
    if (!user) {
      return toast.error("You must be logged in");
    }

    await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
    return toast.success("Question deleted successfully.");
  }

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
            <Button isOutlined onClick={handleOpenEndRoomModal}>
              Encerrar sala
            </Button>

            <Modal isOpen={isEndRoomModalOpen} closeModal={closeModal}>
              <img src={closeImg} alt="Close room icon" />

              <h1>Encerrar sala</h1>

              <p>Tem certeza que você deseja encerrar esta sala?</p>

              <div>
                <button onClick={closeModal}>Cancelar</button>
                <button onClick={handleEndRoom} className="danger">
                  Sim, encerrar
                </button>
              </div>
            </Modal>
          </div>
        </div>
      </header>

      <main>
        <div className={styles.roomTitle}>
          <h1>Sala {title}</h1>
          {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
        </div>

        {questions.length > 0 ? (
          <>
            {questions.map((question) => (
              <Question
                key={question.id}
                content={question.content}
                author={question.author}
              >
                <button
                  type="button"
                  onClick={() => handleDeleteQuestion(question.id)}
                >
                  <img src={deleteImg} alt="Remover pergunta" />
                </button>
              </Question>
            ))}
          </>
        ) : (
          <div className={styles.noQuestionsContainer}>
            <img src={emptyQuestions} alt="No Questions" />

            <h2>Nenhuma pergunta por aqui...</h2>
            <p>
              Envie o código desta sala para seus amigos e comece a responder
              perguntas!
            </p>
          </div>
        )}
      </main>
    </section>
  );
}
