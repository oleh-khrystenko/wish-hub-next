'use client';

import { FC } from 'react';
import { Tooltip } from 'react-tooltip';
import UseScreenSize from '@/helpers/hooks/UseScreenSize';

interface IProps {
    id: string;
}

const UiTooltip: FC<IProps> = ({ id }) => {
    const { screenWidth } = UseScreenSize();

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
