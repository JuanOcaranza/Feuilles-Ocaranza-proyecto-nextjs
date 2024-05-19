import NavBar from '@/app/ui/navbar';

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className='flex flex-col'>
            <div>
                <NavBar />
            </div>
            <div className='flex-grow p-6'>{children}</div>
        </div>
    );
}