import React, { FC, useCallback, useRef } from 'react';
import { useDrop } from 'react-dnd';
import { NativeTypes } from 'react-dnd-html5-backend';
import { useDrag } from 'react-dnd';
import { useTranslations } from 'next-intl';
import CrossIcon from '@/components/icons/CrossIcon';
import UiImagesValidation from '@/components/ui/UiImagesValidation';
import {
    ALLOWED_FILE_EXTENSIONS,
    ALLOWED_MAX_FILE_SIZE_IN_MB,
    MAX_NUMBER_OF_IMAGES_PER_WISH,
} from '@/helpers/utils/constants';
import { TCurrentImage } from '@/models/Wish';
import Image from 'next/image';

interface IProps {
    images: TCurrentImage[];
    setImages: (images: TCurrentImage[]) => void;
    removeAllImages: () => void;
}

const DragNDrop: FC<IProps> = ({ images, setImages, removeAllImages }) => {
    const mainPageT = useTranslations('main-page');

    const onDrop = useCallback(
        (acceptedFiles: TCurrentImage[]) => {
            setImages([...images, ...acceptedFiles]);
        },
        [images, setImages]
    );

    // Ініціалізація референсів для dropzone та image-list
    const dropZoneRef = useRef<HTMLDivElement | null>(null);
    const imageListRef = useRef<HTMLDivElement | null>(null);

    const [{ isOver, canDrop }, drop] = useDrop({
        accept: [NativeTypes.FILE],
        drop: (item: { files: TCurrentImage[] }) => onDrop(item.files),
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    });

    const [{ isDragging }, drag] = useDrag({
        type: 'image',
        item: { type: 'image' },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    // Об'єднуємо референси drop
    const combinedDropRef = useCallback(
        (node: HTMLDivElement | null) => {
            drop(dropZoneRef.current); // Застосовуємо drop до dropZoneRef
            drop(imageListRef.current); // Застосовуємо drop до imageListRef
            if (node) {
                drop(node); // Додаємо node до drop
            }
        },
        [drop]
    );

    // Об'єднуємо референси drag
    const combinedDragRef = useCallback(
        (node: HTMLDivElement | null) => {
            drag(imageListRef.current); // Застосовуємо drag до imageListRef
            if (node) {
                drag(node); // Додаємо node до drag
            }
        },
        [drag]
    );

    const handleRemoveImage = (index: number) => {
        const updatedImages = [...images];
        updatedImages.splice(index, 1);
        setImages(updatedImages);
    };

    return (
        <div className="flex flex-col gap-4">
            <div
                ref={combinedDropRef} // Використання комбінованого референсу для dropzone
                className={`${isOver && canDrop ? 'highlight' : ''} mt-6 rounded-md border-2 border-dashed border-zinc-300 px-10 py-6 dark:border-zinc-700`}
            >
                <p className="dap-4 flex flex-col items-center text-zinc-800 dark:text-zinc-300">
                    <span className="font-bold">{mainPageT('drag')}</span>
                    <span className="font-bold">{mainPageT('click')}</span>
                    <span className="mt-6 font-bold">
                        {mainPageT('change')}
                    </span>
                    <span className="mt-6 text-center text-sm font-light">
                        {mainPageT('size', {
                            size: ALLOWED_MAX_FILE_SIZE_IN_MB,
                        })}
                        <br />
                        {mainPageT('formats')}{' '}
                        {Object.keys(ALLOWED_FILE_EXTENSIONS).join(', ')}.
                        <br />
                        {mainPageT('count', {
                            count: MAX_NUMBER_OF_IMAGES_PER_WISH,
                        })}
                    </span>
                </p>
            </div>

            <div
                ref={combinedDragRef} // Використання комбінованого референсу для image-list
                className="flex flex-wrap gap-4"
            >
                {images.map((image, index) => (
                    <div
                        key={index}
                        className={`${isDragging ? 'border-red-500' : ''} relative flex h-20 w-20 items-center justify-center rounded-md border border-dashed border-zinc-700 dark:border-zinc-300`}
                    >
                        <Image
                            src={URL.createObjectURL(image as File)}
                            alt={`${mainPageT('picture')}-${index}`}
                            title={`${mainPageT('picture')}-${index}`}
                            priority={true}
                            fill
                            sizes={'100%'}
                            className="rounded-md object-contain"
                        />
                        <button
                            type="button"
                            className="absolute -right-1.5 -top-1.5 rounded bg-rose-500 p-1 font-bold"
                            onClick={() => handleRemoveImage(index)}
                        >
                            <CrossIcon classes="w-3 h-3 stroke-zinc-700 dark:stroke-zinc-800" />
                        </button>
                    </div>
                ))}
            </div>

            <UiImagesValidation images={images} />

            {images.length > 0 && (
                <button
                    className="w-fit py-2.5 text-sm text-rose-500"
                    type="button"
                    onClick={removeAllImages}
                >
                    {mainPageT('delete-all-images')}
                </button>
            )}
        </div>
    );
};

export default DragNDrop;
