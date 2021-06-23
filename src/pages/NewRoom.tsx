import { Link } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";

import { Button } from "../components/Button";
//import { useAuth } from "../hooks/useAuth";

import illustrationImg from "../assets/images/illustration.svg";
import logoImg from "../assets/images/logo.svg";

import styles from "../styles/auth.module.scss";
import { toast } from "react-toastify";

type IFormInput = {
  roomName: string;
};

export function NewRoom() {
  //const { user } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const handleCreateRoom: SubmitHandler<IFormInput> = (data) => {
    console.log(data.roomName);
    toast.error("Missing informationn from Google Account.");
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

          <h2>Criar uma nova sala</h2>

          <form onSubmit={handleSubmit(handleCreateRoom)}>
            <input
              type="text"
              placeholder="Nome da sala"
              {...register("roomName", { required: true })}
            />
            {errors?.roomName && <span></span>}
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
