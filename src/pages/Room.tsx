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
  const { questions, title } = useRoom(params.id)
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
          />
        ))}
      </main>
    </section>
  );
}
