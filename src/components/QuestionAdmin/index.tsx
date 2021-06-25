import { useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import cx from "classnames";

import { Modal } from "../Modal";
import { useAuth } from "../../hooks/useAuth";
import { database } from "../../services/firebase";

import deleteImg from "../../assets/images/delete.svg";
import deleteDangerImg from "../../assets/images/delete-danger.svg";
import answerImg from "../../assets/images/answer.svg";
import checkImg from "../../assets/images/check.svg";

import styles from "./styles.module.scss";

type QuestionProps = {
  id: string;
  content: string;
  author: {
    name: string;
    avatar: string;
  };
  isAnswered?: boolean;
  isHighlighted?: boolean;
};

type RoomParams = {
  id: string;
};

export function Question({
  id,
  content,
  author,
  isAnswered = false,
  isHighlighted = false,
}: QuestionProps) {
  const { user } = useAuth();
  const params = useParams<RoomParams>();
  const roomId = params.id;

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  function openDeleteModal() {
    setIsDeleteModalOpen(true);
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
      isHighlighted: false,
    });
    toast.success("Question marked as answered.");
  }

  async function handleHighlightQuestion(questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isHighlighted: true,
    });
    toast.success("Question marked as highlight.");
  }

  function closeModal() {
    setIsDeleteModalOpen(false);
  }

  return (
    <div
      className={cx(
        styles.question,
        { [`${styles.answered}`]: isAnswered },
        { [`${styles.highlighted}`]: isHighlighted && !isAnswered }
      )}
    >
      <p>{content}</p>

      <footer>
        <div className={styles.userInfo}>
          <img src={author.avatar} alt={author.name} />
          <span>{author.name}</span>
        </div>

        <div>
          {!isAnswered && (
            <>
              <button
                type="button"
                onClick={() => handleCheckQuestionAsAnswered(id)}
              >
                <img src={checkImg} alt="Marcar pergunta respondida" />
              </button>

              <button type="button" onClick={() => handleHighlightQuestion(id)}>
                <img
                  src={answerImg}
                  alt="Marcar pergunta como sendo respondida"
                />
              </button>
            </>
          )}

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
                onClick={() => handleDeleteQuestion(id)}
                className="danger"
              >
                Sim, encerrar
              </button>
            </div>
          </Modal>
        </div>
      </footer>
    </div>
  );
}
