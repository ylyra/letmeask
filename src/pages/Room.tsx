import { Helmet } from "react-helmet";
import { SubmitHandler, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

import { Button } from "../components/Button";
import { RoomCode } from "../components/RoomCode";
import { Question } from "../components/Question";
import { useAuth } from "../hooks/useAuth";
import { useRoom } from "../hooks/useRoom";
import { database } from "../services/firebase";

import logoImg from "../assets/images/logo.svg";
import styles from "../styles/room.module.scss";

type RoomParams = {
  id: string;
};

type IFormInput = {
  newQuestion: string;
};

export function Room() {
  const { user } = useAuth();
  const params = useParams<RoomParams>();
  const roomId = params.id;

  const { questions, title } = useRoom(roomId);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IFormInput>();

  const handleSendQuestion: SubmitHandler<IFormInput> = async ({
    newQuestion,
  }) => {
    if (newQuestion.trim() === "") {
      return toast.error("You can't send a empty question.");
    }

    if (!user) {
      return toast.error("You must be logged in");
    }

    const question = {
      content: newQuestion,
      author: {
        name: user.name,
        avatar: user.avatar,
      },
      isHighlighted: false,
      isAnswered: false,
    };

    await database.ref(`rooms/${params.id}/questions`).push(question);
    reset();
  };

  async function handleLikeQuestion(
    questionId: string,
    likeId: string | undefined
  ) {
    if (!user) {
      return toast.error("You must be logged in");
    }

    if (likeId) {
      await database
        .ref(`rooms/${roomId}/questions/${questionId}/likes`)
        .remove();
      return toast.error("Question disliked!");
    } else {
      await database.ref(`rooms/${roomId}/questions/${questionId}/likes`).push({
        authorId: user.id,
      });
      return toast.success("Question liked!");
    }
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

          <RoomCode code={params.id} />
        </div>
      </header>

      <main>
        <div className={styles.roomTitle}>
          <h1>Sala {title}</h1>
          {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
        </div>

        <form onSubmit={handleSubmit(handleSendQuestion)}>
          <textarea
            placeholder="O que você quer perguntar?"
            {...register("newQuestion", { required: true })}
          />
          {errors?.newQuestion && (
            <span className="error-code">Room code is required</span>
          )}

          <div className={styles.formFooter}>
            {user ? (
              <div className={styles.userInfo}>
                <img src={user.avatar} alt={user.name} />

                <span>{user.name}</span>
              </div>
            ) : (
              <span>
                Para enviar uma pergunta, <button>faça seu login</button>.
              </span>
            )}

            <Button type="submit" disabled={!user}>
              Enviar pergunta
            </Button>
          </div>
        </form>

        {questions.map((question) => (
          <Question
            key={question.id}
            content={question.content}
            author={question.author}
          >
            <button
              className={`${styles.likeButton} ${
                question.likeId ? styles.liked : ""
              }`}
              type="button"
              aria-label="Marcar como gostei"
              onClick={() => handleLikeQuestion(question.id, question.likeId)}
            >
              {question.likeCount > 0 && <span>{question.likeCount}</span>}
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7 22H4C3.46957 22 2.96086 21.7893 2.58579 21.4142C2.21071 21.0391 2 20.5304 2 20V13C2 12.4696 2.21071 11.9609 2.58579 11.5858C2.96086 11.2107 3.46957 11 4 11H7M14 9V5C14 4.20435 13.6839 3.44129 13.1213 2.87868C12.5587 2.31607 11.7956 2 11 2L7 11V22H18.28C18.7623 22.0055 19.2304 21.8364 19.5979 21.524C19.9654 21.2116 20.2077 20.7769 20.28 20.3L21.66 11.3C21.7035 11.0134 21.6842 10.7207 21.6033 10.4423C21.5225 10.1638 21.3821 9.90629 21.1919 9.68751C21.0016 9.46873 20.7661 9.29393 20.5016 9.17522C20.2371 9.0565 19.9499 8.99672 19.66 9H14Z"
                  stroke="#737380"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </Question>
        ))}
      </main>
    </section>
  );
}
