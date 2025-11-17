import { motion } from "framer-motion";

export default function LoadingScreen() {
  return (
    <div className="bg-linear-to-br from-gray-950 to-sky-950 fixed inset-0 flex items-center justify-center backdrop-blur-sm z-50">
      <motion.div
        className="w-14 h-14 border-4 border-white border-t-transparent rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
}
