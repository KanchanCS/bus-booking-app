import React from "react";
import { motion } from "framer-motion";
import Layout from "../../component/layout/RootLayout";
import Search from "../search/search";
import { useBooking } from "../../context/BookingContext";

const Hero = () => {
  const { darkMode } = useBooking();

  const variants = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <>
      <motion.div
        className={`w-full flex-1 h-screen bg-[url("./assets/herobg.png")] bg-cover bg-no-repeat bg-top relative ${darkMode ? 'brightness-75' : ''}`}
        initial="hidden"
        animate="visible"
        exit="hidden"
        variants={variants}
        transition={{ duration: 0.5, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.5 }}
      >
        <Layout className={`absolute top-0 left-0 w-full h-full ${darkMode ? 'bg-gradient-to-b from-gray-900/70 via-gray-900/30 to-gray-900/0' : 'bg-gradient-to-b from-neutral-50/70 via-netural-50/15 to-neutral-50/0'} flex items-center justify-start text-center flex-col gap-9`}>
          <div className="space-y-2">
            <motion.p
              className={`text-lg ${darkMode ? 'text-gray-300' : 'text-neutral-500'} font-medium text-center pt-16`}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              Get your bus
            </motion.p>
            <motion.h1
              className={`text-4xl md:text-5xl ${darkMode ? 'text-white' : 'text-neutral-800'} font-bold text-center`}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
            >
              Find the best bus for you!
            </motion.h1>
          </div>
          <Search/>
        </Layout>
      </motion.div>
    </>
  );
};

export default Hero;
