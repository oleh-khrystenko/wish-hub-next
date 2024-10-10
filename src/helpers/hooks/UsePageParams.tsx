'use client';

import { useSearchParams } from 'next/navigation';

const UsePageParams = () => {
    const searchParams = useSearchParams();

    const getAllPageParams = (): string => searchParams.toString();

    return { getAllPageParams };
};

export default UsePageParams;
