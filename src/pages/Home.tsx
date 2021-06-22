import { Button } from "../components/Button";

import illustrationImg from "../assets/images/illustration.svg";
import logoImg from "../assets/images/logo.svg";
import googleIconImg from "../assets/images/google-icon.svg";

import styles from "../styles/auth.module.scss";

export function Home() {
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

          <button className={styles.createRoom}>
            <img src={googleIconImg} alt="Logo da Google" />
            Crie sua sala com o Google
          </button>

          <div className={styles.separator}>ou entre em uma sala</div>

          <form>
            <input type="text" placeholder="Digite o código da sala" />
            <Button type="submit">Entrar na sala</Button>
          </form>
        </div>
      </main>
    </section>
  );
}