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
import deleteDangerImg from "../assets/images/delete-danger.svg";
import emptyQuestions from "../assets/images/empty-questions.svg";
import answerImg from "../assets/images/answer.svg";
import checkImg from "../assets/images/check.svg";
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
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  async function handleEndRoom() {
    if (!user) {
      return toast.error("You must be logged in");
    }

    await database.ref(`rooms/${roomId}`).update({
      endedAt: new Date(),
    });

    history.push("/");
  }

  function openDeleteModal() {
    setIsDeleteModalOpen(true);
  }

  function handleOpenEndRoomModal() {
    setIsEndRoomModalOpen(true);
  }

  function closeModal() {
    setIsEndRoomModalOpen(false);
    setIsDeleteModalOpen(false);
  }

  async function handleDeleteQuestion(questionId: string) {
    if (!user) {
      return toast.error("You must be logged in");
    }

    await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
    setIsDeleteModalOpen(false);
    return toast.success("Question deleted successfully.");
  }

  async function handleCheckQuestionAsAnswered(questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isAnswered: true,
    });
    toast.success("Question marked as answered.");
  }

  async function handleHighlightQuestion(questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isHighlighted: true,
    });
    toast.success("Question marked as highlight.");
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
                  onClick={() => handleCheckQuestionAsAnswered(question.id)}
                >
                  <img src={checkImg} alt="Marcar pergunta respondida" />
                </button>

                <button
                  type="button"
                  onClick={() => handleHighlightQuestion(question.id)}
                >
                  <img
                    src={answerImg}
                    alt="Marcar pergunta como sendo respondida"
                  />
                </button>

                <button type="button" onClick={openDeleteModal}>
                  <img src={deleteImg} alt="Remover pergunta" />
                </button>

                <Modal isOpen={isDeleteModalOpen} closeModal={closeModal}>
                  <img src={deleteDangerImg} alt="Close room icon" />

                  <h1>Encerrar sala</h1>

                  <p>Tem certeza que você deseja encerrar esta sala?</p>

                  <div>
                    <button onClick={closeModal}>Cancelar</button>
                    <button
                      onClick={() => handleDeleteQuestion(question.id)}
                      className="danger"
                    >
                      Sim, encerrar
                    </button>
                  </div>
                </Modal>
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
