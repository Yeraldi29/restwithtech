import { motion } from "framer-motion"

const ArrowDesktop = () => {
  return (
    <div className="relative mt-2 h-[5.5rem] hidden lg:block">
    <motion.div className=" square "
    transition={{duration:0.5, delay:2}}
    initial={{bottom: 60,scale:1.5}}
    animate={{bottom: 0, scale:1, rotate:-12}}
    ></motion.div>
    <motion.div className=" square left-4"
     transition={{duration:0.5, delay:2}}
     initial={{bottom: -20,scale:1.5}}
     animate={{bottom: 12, scale:1, rotate:12}}
    ></motion.div>
    <motion.div className=" square left-8"
     transition={{duration:0.5, delay:2}}
     initial={{bottom: 60,scale:1.5}}
     animate={{bottom: 20, scale:1, rotate:-12}}
    ></motion.div>
    <motion.div className=" square left-12"
     transition={{duration:0.5, delay:2}}
     initial={{bottom: -30,scale:1.5}}
     animate={{bottom: 12, scale:1, rotate:12}}
    ></motion.div>
    <motion.div className=" square left-16"
     transition={{duration:0.5, delay:2}}
     initial={{bottom: 60,scale:1.5}}
     animate={{bottom: 4, scale:1, rotate:-12}}
    ></motion.div>
    <motion.div className=" square left-20"
    transition={{duration:0.5, delay:2}}
    initial={{bottom: -25,scale:1.5}}
    animate={{bottom: 12, scale:1, rotate:12}}
    ></motion.div>
    <motion.div className=" square left-24"
     transition={{duration:0.5, delay:2}}
     initial={{bottom: 50,scale:1.5}}
     animate={{bottom: 20, scale:1, rotate:-12}}
    ></motion.div>
    <motion.div className=" square  bottom-3"
     transition={{duration:0.5, delay:2}}
     initial={{left:0,scale:1.5}}
     animate={{left:112, scale:1, rotate:12}}
    ></motion.div>
    <motion.div className=" square bottom-5"
    transition={{duration:0.5, delay:2}}
    initial={{left:10,scale:1.5}}
    animate={{left:128, scale:1, rotate:-12}}
    ></motion.div>
    <motion.div className=" square bottom-7  "
    transition={{duration:0.5, delay:2}}
    initial={{left:20,scale:1.5}}
    animate={{left:144, scale:1, rotate:12}}
    ></motion.div>
    <motion.div className=" square bottom-6 "
   transition={{duration:0.5, delay:2}}
   initial={{left:50,scale:1.5}}
   animate={{left:160, scale:1, rotate:-12}}
    ></motion.div>
    <motion.div className=" square  left-44"
    transition={{duration:0.5, delay:2}}
    initial={{bottom: 60,scale:1.5}}
    animate={{bottom: 12, scale:1, rotate:12}}
    ></motion.div>
    <motion.div className=" square  left-48"
    transition={{duration:0.5, delay:2}}
    initial={{bottom: 50,scale:1.5}}
    animate={{bottom: 4, scale:1, rotate:-12}}
    ></motion.div>
    <motion.div className=" square  left-52"
    transition={{duration:0.5, delay:2}}
    initial={{bottom: 40,scale:1.5}}
    animate={{bottom: 12, scale:1, rotate:12}}
    ></motion.div>
    <motion.div className=" square left-56"
    transition={{duration:0.5, delay:2}}
    initial={{bottom: 20,scale:1.5}}
    animate={{bottom: 4, scale:1, rotate:-12}}
    ></motion.div>
    <motion.div className=" square left-60"
    transition={{duration:0.5, delay:2}}
    initial={{bottom: -20,scale:1.5}}
    animate={{bottom: 12, scale:1, rotate:12}}
    ></motion.div>
    <motion.div className=" square left-64"
   transition={{duration:0.5, delay:2}}
   initial={{bottom: 0,scale:1.5}}
   animate={{bottom: 20, scale:1, rotate:-12}}
    ></motion.div>
    <motion.div className=" square bottom-9"
    transition={{duration:0.5, delay:2}}
    initial={{left:310,scale:1.5}}
    animate={{left:256, scale:1, rotate:12}}
    ></motion.div>
    <motion.div className=" square left-64"
    transition={{duration:0.5, delay:2}}
    initial={{bottom: 20,scale:1.5}}
    animate={{bottom: 52.8, scale:1, rotate:-12}}
    ></motion.div>
    <motion.div className=" square left-64 "
    transition={{duration:0.5, delay:2}}
    initial={{bottom: 50,scale:1.5}}
    animate={{bottom: 72, scale:1, rotate:12}}
    ></motion.div>
    <motion.div className=" square "
    transition={{duration:0.5, delay:2}}
    initial={{left:100,bottom:75,scale:1.5}}
    animate={{left:240,bottom:64, scale:1, rotate:-12}}
    ></motion.div>
    <motion.div className=" square bottom-16"
    transition={{duration:0.5, delay:2}}
    initial={{left:340,scale:1.5}}
    animate={{left:272, scale:1, rotate:12}}
    ></motion.div>
    <motion.div className=" square left-[17.8rem] "
    transition={{duration:0.5, delay:2}}
    initial={{bottom: 60,scale:1.5}}
    animate={{bottom: 49.6, scale:1, rotate:-12}}
    ></motion.div>
    <motion.div className=" square left-[14.3rem] "
    transition={{duration:0.5, delay:2}}
    initial={{bottom: 60,scale:1.5}}
    animate={{bottom: 49.6, scale:1, rotate:12}}
    ></motion.div>
  </div>
  )
}

export default ArrowDesktop