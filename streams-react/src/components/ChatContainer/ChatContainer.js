import {useEffect, useRef, useContext} from "react";
import ChatList from "../ChatList/ChatList";
import styles from "./ChatContainer.module.css";
import {ChatContext} from "../../context/ChatContext";

const ChatContainer = () => {
  const {isChatOpen, setIsChatOpen, setChatDimensions} = useContext(ChatContext);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      const width = containerRef.current.getBoundingClientRect()?.width;
  
      setChatDimensions(dimensions => ({...dimensions, width}));
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [setChatDimensions]);

  const handleClick = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <div ref={containerRef} className={`${styles.container} ${isChatOpen ? styles["container--on"] : ""}`}>
      <button type="button" className={styles.chat__button} onClick={handleClick}>
        <i className={`fas fa-chevron-left ${styles.chevron} ${isChatOpen ? styles["chevron--open"] : styles.hidden}`}></i>
        <i className={`fas fa-chevron-right ${styles.chevron} ${isChatOpen ? styles.hidden : styles["chevron--open"]}`}></i>
      </button>
      <div className={`${styles.chat__container} ${isChatOpen ? "" : styles["chat__container--closed"]}`}>
        <ChatList />
      </div>
    </div>
  );
};

export default ChatContainer;