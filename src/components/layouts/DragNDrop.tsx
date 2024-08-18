import React, { FC, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import {
    DragDropContext,
    Draggable,
    Droppable,
    DropResult,
} from 'react-beautiful-dnd';
import { TCurrentImage, IImage } from '@/models/Wish';
import {
    ALLOWED_FILE_EXTENSIONS,
    ALLOWED_MAX_FILE_SIZE_IN_MB,
    MAX_NUMBER_OF_IMAGES_PER_WISH,
} from '@/helpers/utils/constants';
import { useTranslations } from 'next-intl';
import CrossIcon from '@/components/icons/CrossIcon';
import UiImagesValidation from '@/components/ui/UiImagesValidation';

interface IProps {
    images: TCurrentImage[];
    setImages: (images: TCurrentImage[]) => void;
    removeAllImages: () => void;
}

const acceptTypes: { [key: string]: string[] } = {};
Object.keys(ALLOWED_FILE_EXTENSIONS).forEach((ext) => {
    const mimeType = ALLOWED_FILE_EXTENSIONS[ext];
    if (!acceptTypes[mimeType]) {
        acceptTypes[mimeType] = [];
    }
    acceptTypes[mimeType].push(`.${ext}`);
});

const DragNDrop: FC<IProps> = ({ images, setImages, removeAllImages }) => {
    const mainPageT = useTranslations('main-page');

    const onDrop = useCallback(
        (acceptedImages: File[]) => {
            setImages([...images, ...acceptedImages]);
        },
        [images, setImages]
    );

    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    const handleDragEnd = (result: DropResult) => {
        if (!result.destination) {
            return;
        }

        const updatedImages = [...images];
        const [removed] = updatedImages.splice(result.source.index, 1);
        updatedImages.splice(result.destination.index, 0, removed);

        setImages(updatedImages);
    };

    const showImage = (image: TCurrentImage) => {
        if (image instanceof File) {
            return URL.createObjectURL(image);
        }

        return image.delete ? '' : image.path;
    };

    const removeImage = (image: TCurrentImage, idx: number) => () => {
        const newImages = [...images];
        if (newImages[idx] instanceof File) {
            newImages.splice(newImages.indexOf(image), 1);
        } else {
            const updatedImage = { ...(newImages[idx] as IImage) };
            updatedImage.delete = true;
            newImages[idx] = updatedImage;
        }
        setImages(newImages);
    };

    return (
        <div className="drag-n-drop">
            <div {...getRootProps({ className: 'dropzone' })}>
                <input {...getInputProps()} />
                <p className="text">
                    <span className="mouse">{mainPageT('drag')}</span>
                    <span className="touch">{mainPageT('click')}</span>
                    <br />
                    <br />
                    {mainPageT('change')}
                    <br />
                    <br />
                    <span className="rules">
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

            <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="wish-image-list" direction="horizontal">
                    {(provided) => (
                        <ul
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                        >
                            {images.map((image, idx) => {
                                if (!(image instanceof File) && image.delete)
                                    return null;

                                return (
                                    <Draggable
                                        key={`wish-image-${idx}`}
                                        draggableId={`wish-image-${idx}`}
                                        index={idx}
                                    >
                                        {(provided) => (
                                            <li
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                className="item"
                                            >
                                                <img
                                                    src={showImage(image)}
                                                    alt={`${mainPageT('picture')}-${idx}`}
                                                    title={`${mainPageT('picture')}-${idx}`}
                                                    loading="lazy"
                                                />
                                                <button
                                                    className="remove"
                                                    type="button"
                                                    onClick={removeImage(
                                                        image,
                                                        idx
                                                    )}
                                                >
                                                    <CrossIcon />
                                                </button>
                                            </li>
                                        )}
                                    </Draggable>
                                );
                            })}
                            {provided.placeholder}
                        </ul>
                    )}
                </Droppable>
            </DragDropContext>

            <UiImagesValidation images={images} />

            {images.length > 0 && (
                <button
                    className="remove-all"
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
