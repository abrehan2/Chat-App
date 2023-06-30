import { useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  Container,
  HStack,
  Input,
  VStack,
} from "@chakra-ui/react";
import Message from "./components/Message";
import {
  onAuthStateChanged,
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  addDoc,
  collection,
  serverTimestamp,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";
import { app } from "./config/Firebase";
import { toast } from "react-toastify";

// TAKING AUTH -
const auth = getAuth(app);
const db = getFirestore(app);

// LOGIN HANDLER -
const loginHandler = (e) => {
  e.preventDefault();
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider);
};

// LOGOUT HANDLER -
const logoutHandler = (e) => {
  e.preventDefault();
  signOut(auth);
};

const App = () => {
  const [user, setUser] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const divForScroll = useRef(null);

  useEffect(() => {
    const q = query(collection(db, "Messages"), orderBy("createdAt", "asc"));
    const unsub = onAuthStateChanged(auth, (data) => {
      setUser(data);
    });

    const unSubMessage = onSnapshot(q, (snap) => {
      setMessages(
        snap.docs.map((item) => {
          const id = item.id;
          return { id, ...item.data() };
        })
      );
    });

    return () => {
      unsub();
      unSubMessage();
    };
  }, []);

  // SUBMIT HANDLER -
  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      setMessage("");
      await addDoc(collection(db, "Messages"), {
        text: message,
        userId: user.uid,
        uri: user.photoURL,
        createdAt: serverTimestamp(),
      });

      divForScroll.current.scrollIntoView({ behavior: "smooth" });
    } catch (err) {
      toast.error(err);
    }
  };

  return (
    <>
      <Box bg={"blue.300"}>
        {user ? (
          <Container h={"100vh"} bg={"white"}>
            <VStack h={"full"} padding={"4"}>
              <Button
                w={"full"}
                bg={"red.500"}
                colorScheme={"white"}
                borderRadius={"none"}
                onClick={logoutHandler}
              >
                Logout
              </Button>

              <VStack
                h={"full"}
                w={"full"}
                overflowY={"auto"}
                css={{
                  "&::-webkit-scrollbar": {
                    display: "none",
                  },
                }}
              >
                {messages.map((item) => (
                  <Message
                    text={item.text}
                    uri={item.uri}
                    user={item.userId === user.id ? "me" : "other"}
                    key={item.id}
                  />
                ))}
                <div ref={divForScroll}></div>
              </VStack>

              {/* FORM */}
              <form style={{ width: "100%" }} onSubmit={submitHandler}>
                <HStack>
                  <Input
                    bg={"white"}
                    placeholder="Type here"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                  <Button type="submit" colorScheme={"blue"}>
                    Send
                  </Button>
                </HStack>
              </form>
            </VStack>
          </Container>
        ) : (
          <VStack h={"100vh"} justifyContent={"center"}>
            <Button
              variant={"outline"}
              colorScheme={"white"}
              bg={"white"}
              onClick={loginHandler}
              size={"lg"}
            >
              Sign In with Google
            </Button>
          </VStack>
        )}
      </Box>
    </>
  );
};

export default App;
