import React, { FC, useCallback, useRef } from 'react';
import { useDrop, useDrag } from 'react-dnd';
import { NativeTypes } from 'react-dnd-html5-backend';
import { useTranslations } from 'next-intl';
import { TCurrentImage } from '@/models/Wish';
import {
    ALLOWED_FILE_EXTENSIONS,
    ALLOWED_MAX_FILE_SIZE_IN_MB,
    MAX_NUMBER_OF_IMAGES_PER_WISH,
} from '@/helpers/utils/constants';
import DraggableImage from '@/components/layouts/DraggableImage';
import UiImagesValidation from '@/components/ui/UiImagesValidation';

interface IProps {
    images: TCurrentImage[];
    setImages: (images: TCurrentImage[]) => void;
    removeAllImages: () => void;
}

const DragNDrop: FC<IProps> = ({ images, setImages, removeAllImages }) => {
    const mainPageT = useTranslations('main-page');

    const dropZoneRef = useRef<HTMLDivElement | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const imageListRef = useRef<HTMLDivElement | null>(null);

    const onDrop = useCallback(
        (acceptedFiles: TCurrentImage[]) => {
            setImages([...images, ...acceptedFiles]);
        },
        [images, setImages]
    );

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

    drop(dropZoneRef);
    drag(imageListRef);

    const handleDropZoneClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(event.target.files || []);
        setImages([...images, ...files]);
    };

    const moveImage = (dragIndex: number, hoverIndex: number) => {
        const updatedImages = [...images];
        const [draggedImage] = updatedImages.splice(dragIndex, 1);
        updatedImages.splice(hoverIndex, 0, draggedImage);
        setImages(updatedImages);
    };

    const handleRemoveImage = (index: number) => {
        const updatedImages = [...images];
        updatedImages.splice(index, 1);
        setImages(updatedImages);
    };

    return (
        <div className="flex flex-col gap-4">
            <div
                className={`${isOver && canDrop ? 'highlight' : ''} mt-6 cursor-pointer rounded-md border-2 border-dashed border-zinc-400 px-10 py-6 dark:border-zinc-700`}
                ref={dropZoneRef}
                onClick={handleDropZoneClick}
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

                <input
                    className="hidden"
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    multiple
                    accept={Object.keys(ALLOWED_FILE_EXTENSIONS).join(', ')}
                />
            </div>

            <div ref={imageListRef} className="flex flex-wrap gap-4">
                {images.map((image, index) => (
                    <DraggableImage
                        key={index}
                        image={image}
                        index={index}
                        moveImage={moveImage}
                        removeImage={handleRemoveImage}
                    />
                ))}
            </div>

            <UiImagesValidation images={images} />

            {images.length > 0 && (
                <button
                    className="w-fit py-2.5 text-sm font-bold text-rose-500"
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
