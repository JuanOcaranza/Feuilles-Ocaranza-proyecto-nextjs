interface PaginationProps {
    totalPages: number;
    currentPage: number;
    onPageChange: (page: number) => void;
}

const Pagination = ({ totalPages, currentPage, onPageChange }: PaginationProps) => {
    return (
        <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 mb-4 z-50">
            <div className="join">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                        key={page}
                        className={`join-item btn btn-square ${currentPage === page ? 'bg-orange-600' : 'bg-white'}`}
                        onClick={() => onPageChange(page)}
                    >
                        {page}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Pagination;
