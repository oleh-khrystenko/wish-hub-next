import { FC } from 'react';

const NotRelevantInfo: FC = () => {
    return (
        <div className="mt-4 bg-rose-500 p-4 text-center text-2xl font-bold text-zinc-800">
            ⚠️ Увага! Інформація на цій сторінці неактуальна та не відповідає
            дійсності. Будь ласка, зверніться до головного сайту або служби
            підтримки для отримання актуальних даних.
            <br />
            <br />
            <div className="h-0.5 w-full bg-zinc-800"></div>
            <br />
            ⚠️ Attention! The information on this page is outdated and does not
            reflect the current reality. Please refer to the main website or
            contact our support team for up-to-date information.
        </div>
    );
};

export default NotRelevantInfo;
