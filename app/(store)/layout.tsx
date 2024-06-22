import Footer from '@/components/footer';
import NavBar from '@/components/navbar/navbar';


export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className='flex flex-col h-full'>
            <div>
                <NavBar />
            </div>
            <div className='flex-grow'>{children}</div>
            <div>
                <Footer />
            </div>
        </div>
    );
}