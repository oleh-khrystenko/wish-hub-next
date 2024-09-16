'use client';

import { FC } from 'react';
import { ToastContainer } from 'react-toastify';

const ReactToastify: FC = () => {
    return (
        <ToastContainer
            bodyClassName={() =>
                'flex items-center text-sm font-bold text-zinc-800 dark:text-zinc-300'
            }
        />
    );
};

export default ReactToastify;
