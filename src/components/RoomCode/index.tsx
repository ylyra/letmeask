import { toast } from "react-toastify";
import copyImg from "../../assets/images/copy.svg";
import styles from "./styles.module.scss";

type RoomCodeProps = {
  code: string;
};

export function RoomCode({ code }: RoomCodeProps) {
  function copyRoomCodeToClipboard() {
    navigator.clipboard.writeText(code);
    toast.success("Room code copied to clipboard!");
  }

  return (
    <button className={styles.roomCode} onClick={copyRoomCodeToClipboard}>
      <div>
        <img src={copyImg} alt="Copy room code" />
      </div>

      <span>Sala #{code}</span>
    </button>
  );
}
