'use client';

import { FC } from 'react';
import { Tooltip } from 'react-tooltip';
import UseScreenWidth from '@/helpers/hooks/UseScreenWidth';

interface IProps {
    id: string;
}

const UiTooltip: FC<IProps> = ({ id }) => {
    const { screenWidth } = UseScreenWidth();

    return (
        <Tooltip
            id={id}
            style={{
                backgroundColor: 'second-dark',
                color: 'bg-light',
                width: screenWidth > 411 ? '300px' : '200px',
                fontSize: '14px',
                zIndex: 39,
                whiteSpace: 'normal',
                textWrap: 'balance',
                borderRadius: '6px',
            }}
        />
    );
};

export default UiTooltip;
