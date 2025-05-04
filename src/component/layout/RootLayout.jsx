import { useEffect } from 'react';
import { useBooking } from '../../context/BookingContext';

const RootLayout = ({ children, className = '' }) => {
    const { darkMode } = useBooking();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className={`w-full lg:px-24 md:px-16 sm:px-7 px-4 ${darkMode ? 'dark:text-gray-200' : ''} ${className}`}>
            {children}
        </div>
    )
}

export default RootLayout;
