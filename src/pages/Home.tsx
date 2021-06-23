import { useHistory } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { Button } from "../components/Button";
import { useAuth } from "../hooks/useAuth";
import { database } from "../services/firebase";

import illustrationImg from "../assets/images/illustration.svg";
import logoImg from "../assets/images/logo.svg";
import googleIconImg from "../assets/images/google-icon.svg";

import styles from "../styles/auth.module.scss";

type IFormInput = {
  roomCode: string;
};

export function Home() {
  const { user, signInWithGoogle } = useAuth();
  const history = useHistory();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  async function handleCreateRoom() {
    if (!user) {
      await signInWithGoogle();
    }
    history.replace("/rooms/new");
  }

  const handleJoinRoom: SubmitHandler<IFormInput> = async ({ roomCode }) => {
    if (roomCode.trim() === "") {
      return toast.error("A room code is required.");
    }

    const roomRef = await database.ref(`rooms/${roomCode}`).get();

    if (!roomRef.exists()) {
      return toast.error("The room you are search was not found.");
    }

    history.replace(`/rooms/${roomCode}`);
  };

  return (
    <section id={styles.pageAuth}>
      <aside>
        <img
          src={illustrationImg}
          alt="Ilustração simbolizando perguntas e respostas"
        />
        <strong>Crie salas de Q&amp;A ao-vivo</strong>
        <p>Tire as dúvias da sua audiência em tempo-real</p>
      </aside>

      <main>
        <div className={styles.mainContent}>
          <img src={logoImg} alt="Logo Leatmeask" />

          <button onClick={handleCreateRoom} className={styles.createRoom}>
            <img src={googleIconImg} alt="Logo da Google" />
            Crie sua sala com o Google
          </button>

          <div className={styles.separator}>ou entre em uma sala</div>

          <form onSubmit={handleSubmit(handleJoinRoom)}>
            <input
              type="text"
              placeholder="Digite o código da sala"
              {...register("roomCode", { required: true })}
            />
            {errors?.roomCode && (
              <span className="error-code">Room code is required</span>
            )}

            <Button type="submit" disabled={!!errors?.roomCode}>
              Entrar na sala
            </Button>
          </form>
        </div>
      </main>
    </section>
  );
}
