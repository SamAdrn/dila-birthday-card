import { motion } from 'framer-motion';

function App() {
    return (
        <>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}></motion.div>
        </>
    );
}

export default App;
