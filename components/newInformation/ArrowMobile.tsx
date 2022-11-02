import { motion } from "framer-motion"

const ArrowMobile = () => {
  return (
    <div className="relative my-2 h-[5.5rem] lg:hidden">
        <motion.div className="square -top-1"
          transition={{duration:0.5}}
          initial={{left: 0,scale:1.5}}
          whileInView={{left: 128, scale:1, rotate:-12}}
        ></motion.div>
        <motion.div className="square top-1 "
          transition={{duration:0.5}}
          initial={{left: 0,scale:1.5}}
          whileInView={{left: 144, scale:1, rotate:12}}
        ></motion.div>
        <motion.div className="square top-3 "
          transition={{duration:0.5}}
          initial={{left: 0,scale:1.5}}
          whileInView={{left: 160, scale:1, rotate:-12}}
        ></motion.div>
        <motion.div className="square top-5 "
          transition={{duration:0.5}}
          initial={{left: 250,scale:1.5}}
          whileInView={{left: 176, scale:1, rotate:12}}
        ></motion.div>
        <motion.div className="square top-[2.30rem] "
          transition={{duration:0.5}}
          initial={{left: 250,scale:1.5}}
          whileInView={{left: 176, scale:1, rotate:-12}}
        ></motion.div>
        <motion.div className="square top-12 "
          transition={{duration:0.5}}
          initial={{left: 240,scale:1.5}}
          whileInView={{left: 160, scale:1, rotate:12}}
        ></motion.div>
        <motion.div className="square top-16 "
          transition={{duration:0.5}}
          initial={{left: 230,scale:1.5}}
          whileInView={{left: 152, scale:1, rotate:-12}}
        ></motion.div>
        <motion.div className="square left-[9.5rem]"
          transition={{duration:0.5}}
          initial={{bottom:80,scale:1.5}}
          whileInView={{bottom: -9.6, scale:1, rotate:12}}
        ></motion.div>
        <motion.div className="square left-[8.4rem]"
          transition={{duration:0.5}}
          initial={{bottom: 90,scale:1.5}}
          whileInView={{bottom: 0, scale:1, rotate:-12}} 
        ></motion.div>
        <motion.div className="square left-[7.5rem]"
          transition={{duration:0.5}}
          initial={{bottom: 90,scale:1.5}}
          whileInView={{bottom: 12, scale:1, rotate:12}} 
        ></motion.div>
        <motion.div className="square left-[10.5rem]"
          transition={{duration:0.5}}
          initial={{bottom: 90,scale:1.5}}
          whileInView={{bottom: 0, scale:1, rotate:-12}} 
        ></motion.div>
        <motion.div className="square left-[11.5rem]"
          transition={{duration:0.5}}
          initial={{bottom: 90,scale:1.5}}
          whileInView={{bottom: 12, scale:1, rotate:12}} 
        ></motion.div>
      </div>  
  )
}

export default ArrowMobile