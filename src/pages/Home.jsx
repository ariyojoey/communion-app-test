import { motion } from "framer-motion";
import Hero from "../components/Hero";
import "../styles/home.css";


const Home = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen flex flex-col items-center justify-center text-center p-6"
    >
      <Hero />
    </motion.div>
  );
};

export default Home;
