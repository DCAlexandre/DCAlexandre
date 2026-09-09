import { useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import SendIcon from "@mui/icons-material/Send";
import ChatIcon from "@mui/icons-material/Chat";
import CloseIcon from "@mui/icons-material/Close";
import EmailIcon from "@mui/icons-material/Email";
import useMediaQuery from "@mui/material/useMediaQuery";
import { styled, useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { PATH_PAGE } from "@/routes/paths";
import { trackEvent } from "@/utils/analytics";

// ----------------------------------------------------------------------

const { DEV, VITE_API_ASKALEX } = import.meta.env;
const SELF_HOSTED = DEV;
const MAX_QUESTIONS = SELF_HOSTED ? Infinity : 3;
const STORAGE_KEY = "askalex_questions";

const ChatBubble = styled(IconButton)(({ theme }) => ({
  position: "fixed",
  top: 24,
  right: 24,
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  transition: "background-color 0.2s ease, transform 0.3s ease-in-out",
  "&:hover": {
    backgroundColor: theme.palette.primary.dark,
    transform: "scale(1.1)",
  },
  width: 60,
  height: 60,
  borderRadius: "50%",
  boxShadow: theme.shadows[8],
  border: `1px solid ${theme.palette.primary.main}55`,
  // Halo "sonar" animé via transform/opacity (propriétés composées GPU) plutôt
  // que box-shadow, pour éviter les animations non composées signalées par Lighthouse.
  "&::after": {
    content: '""',
    position: "absolute",
    inset: 0,
    borderRadius: "50%",
    backgroundColor: theme.palette.primary.main,
    zIndex: -1,
    animation: "pulse 2s infinite",
  },
  "@keyframes pulse": {
    "0%": { transform: "scale(1)", opacity: 0.4 },
    "70%": { transform: "scale(1.5)", opacity: 0 },
    "100%": { transform: "scale(1.5)", opacity: 0 },
  },
  [theme.breakpoints.down("md")]: {
    width: 45,
    height: 45,
  },
}));

const ChatContainer = styled(Paper)(({ theme }) => ({
  position: "fixed",
  top: 24,
  right: 100,
  zIndex: 1000,
  width: "400px",
  height: "600px",
  display: "flex",
  flexDirection: "column",
  boxShadow: theme.shadows[8],
  borderRadius: 16,
  border: "1px solid rgba(255,255,255,0.08)",
  [theme.breakpoints.down("md")]: {
    right: 80,
  },
  [theme.breakpoints.down("sm")]: {
    width: "100%",
    height: "100%",
    top: 0,
    right: 0,
    borderRadius: 0,
  },
}));

type MessageBubbleProps = {
  isUser: boolean;
};

const MessageBubble = styled(Box, {
  shouldForwardProp: (prop) => prop !== "isUser",
})<MessageBubbleProps>(({ theme, isUser }) => ({
  maxWidth: "70%",
  padding: theme.spacing(1.5),
  borderRadius: theme.shape.borderRadius,
  marginBottom: theme.spacing(1),
  backgroundColor: isUser ? theme.palette.primary.main : theme.palette.grey[700],
  color: isUser ? theme.palette.primary.contrastText : theme.palette.text.primary,
  alignSelf: isUser ? "flex-end" : "flex-start",
}));

const ContactPrompt = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1),
  padding: theme.spacing(2),
  backgroundColor: theme.palette.grey[800],
  borderRadius: theme.shape.borderRadius,
  marginTop: theme.spacing(2),
  cursor: "pointer",
  transition: "all 0.3s ease",
  "&:hover": {
    backgroundColor: theme.palette.grey[700],
    transform: "scale(1.02)",
  },
}));

// ----------------------------------------------------------------------

/**
 * Gestion du ChatBot permettant de discuter avec Alexandre
 */
export default function ChatWidget() {
  const theme = useTheme();
  const navigate = useNavigate();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  const [messages, setMessages] = useState([{ from: "bot", text: "Bonjour ! Pose-moi une question sur Alexandre." }]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [questionsCount, setQuestionsCount] = useState(0);
  const refBoxMessages = useRef<HTMLDivElement>(null);

  // ----------------------------------------------------------------------

  // Initialisation du compteur depuis le localStorage
  useEffect(() => {
    const currentMonth = new Date().getMonth();
    const storedData = localStorage.getItem(STORAGE_KEY);

    if (storedData) {
      const { month, count } = JSON.parse(storedData);

      // Si le mois stocké est différent du mois actuel, réinitialiser le compteur
      if (month !== currentMonth) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ month: currentMonth, count: 0 }));
        setQuestionsCount(0);
      } else {
        setQuestionsCount(count);
      }
    } else {
      // Première utilisation
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ month: currentMonth, count: 0 }));
      setQuestionsCount(0);
    }
  }, []);

  // Mise à jour du localStorage quand le compteur change
  useEffect(() => {
    if (questionsCount > 0) {
      const currentMonth = new Date().getMonth();
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ month: currentMonth, count: questionsCount }));
    }

    if (!loading && questionsCount >= MAX_QUESTIONS) {
      setMessages((m) => [
        ...m,
        {
          from: "bot",
          text: "Vous avez atteint la limite de 3 questions gratuites pour ce mois-ci.\nMerci d'avoir utilisé AskAlex AI !",
        },
      ]);
    }
  }, [questionsCount, loading]);

  useEffect(() => {
    if (refBoxMessages.current) {
      refBoxMessages.current.scrollTop = refBoxMessages.current.scrollHeight;
    }
  }, [isOpen, messages]);

  // ----------------------------------------------------------------------

  const handleSend = async () => {
    if (!input || questionsCount >= MAX_QUESTIONS) return;

    const question = input.trim();
    const userMsg = { from: "user", text: question };

    setMessages((m) => [...m, userMsg]);
    setLoading(true);
    setInput("");

    try {
      const res = await fetch(VITE_API_ASKALEX, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question, selfhosted: SELF_HOSTED }),
      });

      if (!res.ok) {
        throw new Error(res.statusText);
      }

      const data = await res.json();
      setMessages((m) => [...m, { from: "bot", text: data.answer }]);
      setQuestionsCount((prev) => prev + 1);
    } catch (e) {
      console.error("Erreur lors de la communication avec le serveur:", e);
      setMessages((m) => [...m, { from: "bot", text: "Erreur côté serveur 😕" }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => e.key === "Enter" && handleSend();

  const handleContactClick = () => {
    trackEvent("chatbot_contact_cta");
    setIsOpen(false);
    navigate(PATH_PAGE.contact);
  };

  // ----------------------------------------------------------------------

  return (
    <>
      <ChatBubble
        sx={{ zIndex: 1000 }}
        aria-label={isOpen ? "Fermer le chat AskAlex AI" : "Ouvrir le chat AskAlex AI"}
        aria-expanded={isOpen}
        onClick={() => {
          if (!isOpen) trackEvent("chatbot_open");
          setIsOpen(!isOpen);
        }}
      >
        <ChatIcon fontSize={isDesktop ? "large" : "medium"} />
      </ChatBubble>

      {isOpen && (
        <ChatContainer>
          <Box
            sx={{
              p: 2,
              borderRadius: { sm: "16px 16px 0 0" },
              bgcolor: "primary.main",
              color: "primary.contrastText",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box>
              <Typography variant="h6" fontWeight={600}>
                AskAlex AI
              </Typography>

              {!SELF_HOSTED && (
                <Typography variant="caption" sx={{ opacity: 0.8 }}>
                  {questionsCount}/{MAX_QUESTIONS} questions restantes
                </Typography>
              )}
            </Box>

            <IconButton
              onClick={() => setIsOpen(false)}
              aria-label="Fermer le chat"
              sx={{
                color: "primary.contrastText",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                },
              }}
            >
              <CloseIcon fontSize="medium" />
            </IconButton>
          </Box>

          <Box
            ref={refBoxMessages}
            sx={{
              flex: 1,
              overflowY: "auto",
              p: 2,
              display: "flex",
              flexDirection: "column",
              gap: 1,
            }}
          >
            {messages.map((m, i) => (
              <MessageBubble key={i} isUser={m.from === "user"}>
                <Typography variant="body1">{m.text}</Typography>
              </MessageBubble>
            ))}

            {loading && (
              <Typography variant="body2" color="text.secondary" sx={{ alignSelf: "center" }}>
                Réflexion...
              </Typography>
            )}

            {!loading && questionsCount >= MAX_QUESTIONS && (
              <ContactPrompt onClick={handleContactClick}>
                <EmailIcon sx={{ color: "primary.light" }} />

                <Box>
                  <Typography variant="subtitle2" sx={{ color: "primary.light" }} fontWeight="bold">
                    Envie d'aller plus loin ?
                  </Typography>

                  <Typography variant="caption" color="text.secondary" fontWeight="bold">
                    Écrivez-moi directement, je réponds moi-même.
                  </Typography>
                </Box>
              </ContactPrompt>
            )}
          </Box>

          <Box sx={{ p: 2, display: "flex", gap: 1 }}>
            <TextField
              fullWidth
              size="small"
              placeholder={questionsCount >= MAX_QUESTIONS ? "Limite mensuelle atteinte" : "Écris ta question..."}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={questionsCount >= MAX_QUESTIONS}
            />

            <IconButton
              color="primary"
              onClick={handleSend}
              aria-label="Envoyer la question"
              disabled={!input.trim() || questionsCount >= MAX_QUESTIONS}
              size="small"
            >
              <SendIcon fontSize="small" />
            </IconButton>
          </Box>
        </ChatContainer>
      )}
    </>
  );
}
