import styles from './page.module.css';
import Form from './components/Form';
import Image from 'next/image';

export default function Home() {
    return (
        <main className={styles.main}>
            <Form />
            <Image
                src='/mountainbg.jpg'
                alt='Mountain landscape'
                fill
                style={{ objectFit: 'cover' }}
            />
            <div className={styles.overlay}></div>
        </main>
    );
}
