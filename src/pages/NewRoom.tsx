import { Link, useHistory } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { Button } from "../components/Button";
import { useAuth } from "../hooks/useAuth";
import { database } from "../services/firebase";

import illustrationImg from "../assets/images/illustration.svg";
import logoImg from "../assets/images/logo.svg";

import styles from "../styles/auth.module.scss";
import { Helmet } from "react-helmet";

type IFormInput = {
  roomName: string;
};

export function NewRoom() {
  const { user } = useAuth();
  const history = useHistory();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const handleCreateRoom: SubmitHandler<IFormInput> = async ({ roomName }) => {
    if (roomName.trim() === "") {
      return toast.error("A room name is required.");
    }

    const roomRef = database.ref("rooms");

    const firebaseRoom = await roomRef.push({
      title: roomName,
      authorId: user?.id,
    });

    history.push(`/rooms/${firebaseRoom.key}`);
  };

  return (
    <section id={styles.pageAuth}>
      <Helmet>
          <meta charSet="utf-8" />
          <title>Create Room – LetMeAsk</title>
      </Helmet>
      <aside>
        <img
          src={illustrationImg}
          alt="Ilustração simbolizando perguntas e respostas"
        />
        <strong>Crie salas de Q&amp;A ao-vivo</strong>
        <p>Tire as dúvidas da sua audiência em tempo-real</p>
      </aside>

      <main>
        <div className={styles.mainContent}>
          <img src={logoImg} alt="Logo Leatmeask" />

          <h2>Criar uma nova sala</h2>

          <form onSubmit={handleSubmit(handleCreateRoom)}>
            <input
              type="text"
              placeholder="Nome da sala"
              {...register("roomName", { required: true })}
            />
            {errors?.roomName && (
              <span className="error-code">Room name is required</span>
            )}
            <Button type="submit">Criar sala</Button>
          </form>

          <p>
            Quer entrar em uma sala existente? <Link to="/">clique aqui</Link>
          </p>
        </div>
      </main>
    </section>
  );
}
