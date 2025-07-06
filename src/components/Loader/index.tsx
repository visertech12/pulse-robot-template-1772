
import { Fade } from '@mui/material';
import styles from './style.module.scss';

interface LoaderProps {
    visible: boolean;
}

const Loader = ({ visible }: LoaderProps) => {
    return (
        <div className="app">
            <div className="app_container">
                <Fade in={visible} timeout={400}>
                    <div className={styles.container}>
                        <div className={styles.animation}>Loading...</div>
                    </div>
                </Fade>
            </div>
        </div>
    );
};

export default Loader;
