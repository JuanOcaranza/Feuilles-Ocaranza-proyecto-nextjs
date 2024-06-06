import NavBar from '@/components/navbar/navbar';


export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className='flex flex-col'>
            <div>
                <NavBar />
            </div>
            <div className='flex-grow'>{children}</div>
        </div>
    );
}