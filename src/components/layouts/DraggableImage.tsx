import React, { FC, useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import Image from 'next/image';
import CrossIcon from '@/components/icons/CrossIcon';
import { TCurrentImage } from '@/models/Wish';

interface IProps {
    image: TCurrentImage;
    index: number;
    moveImage: (dragIndex: number, hoverIndex: number) => void;
    removeImage: (index: number) => void;
}

const DraggableImage: FC<IProps> = ({
    image,
    index,
    moveImage,
    removeImage,
}) => {
    const ref = useRef<HTMLDivElement | null>(null);

    const [{ isDragging }, drag] = useDrag({
        type: 'image',
        item: { index },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    const [, drop] = useDrop({
        accept: 'image',
        hover: (item: { index: number }) => {
            if (!ref.current) return;

            const dragIndex = item.index;
            const hoverIndex = index;

            if (dragIndex === hoverIndex) return;

            moveImage(dragIndex, hoverIndex);
            item.index = hoverIndex;
        },
    });

    drag(drop(ref));

    return (
        <div
            ref={ref}
            className={`${isDragging ? 'border-red-500' : ''} relative flex h-20 w-20 cursor-pointer items-center justify-center rounded-md border border-dashed border-zinc-700 dark:border-zinc-300`}
        >
            <Image
                src={URL.createObjectURL(image as Blob)}
                alt={`Image-${index}`}
                title={`Image-${index}`}
                priority={true}
                fill
                sizes={'90%'}
                className="rounded-md object-contain"
            />
            <button
                type="button"
                className="absolute -right-1.5 -top-1.5 rounded bg-rose-500 p-1"
                onClick={() => removeImage(index)}
            >
                <CrossIcon classes="w-3 h-3 stroke-zinc-700 dark:stroke-zinc-800" />
            </button>
        </div>
    );
};

export default DraggableImage;
