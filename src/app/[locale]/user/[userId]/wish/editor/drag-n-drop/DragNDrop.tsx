import { FC, ChangeEvent, useCallback, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useDrop, useDrag } from 'react-dnd';
import { NativeTypes } from 'react-dnd-html5-backend';
import { TCurrentImage } from '@/models/Wish';
import { useMyUserStore } from '@/stores/my-user';
import UseUTMParams from '@/helpers/hooks/UseUTMParams';
import {
    ALLOWED_FILE_EXTENSIONS,
    ALLOWED_MAX_FILE_SIZE_IN_MB,
    MAX_NUMBER_OF_IMAGES_PER_WISH,
} from '@/helpers/utils/constants';
import DraggableImage from '@/app/[locale]/user/[userId]/wish/editor/drag-n-drop/DraggableImage';
import ImagesValidation from '@/app/[locale]/user/[userId]/wish/editor/drag-n-drop/ImagesValidation';
import UiModal from '@/components/ui/modal/UiModal';
import UiButton from '@/components/ui/UiButton';

interface IProps {
    images: TCurrentImage[];
    setImages: (images: TCurrentImage[]) => void;
    removeAllImages: () => void;
}

const DragNDrop: FC<IProps> = ({ images, setImages, removeAllImages }) => {
    const [showAttention, setShowAttention] = useState<boolean>(false);

    const mainPageT = useTranslations('main-page');

    const dropZoneRef = useRef<HTMLDivElement | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const imageListRef = useRef<HTMLDivElement | null>(null);

    const myUser = useMyUserStore((state) => state.myUser);

    const utmParams = UseUTMParams();

    const onDrop = useCallback(
        (acceptedFiles: TCurrentImage[]) => {
            if (myUser) {
                setImages([...images, ...acceptedFiles]);
            } else {
                setShowAttention(true);
            }
        },
        [images, setImages]
    );

    const [, drop] = useDrop({
        accept: [NativeTypes.FILE],
        drop: (item: { files: TCurrentImage[] }) => onDrop(item.files),
    });

    const [, drag] = useDrag({
        type: 'image',
        item: { type: 'image' },
    });

    drop(dropZoneRef);
    drag(imageListRef);

    const handleDropZoneClick = () => {
        if (myUser) {
            fileInputRef.current?.click();
        } else {
            setShowAttention(true);
        }
    };

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
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
        if (updatedImages[index] instanceof File) {
            updatedImages.splice(index, 1);
        } else {
            updatedImages[index] = {
                ...updatedImages[index],
                delete: true,
            };
        }
        setImages(updatedImages);
    };

    return (
        <div className="flex flex-col gap-4">
            <div
                className="mt-6 cursor-pointer rounded-md border-2 border-dashed border-zinc-400 px-4 py-2 dark:border-zinc-700 tablet-md:px-10 tablet-md:py-6"
                ref={dropZoneRef}
                onClick={handleDropZoneClick}
            >
                <p className="dap-4 flex flex-col items-center text-center text-sm text-zinc-800 dark:text-zinc-300 tablet-md:text-base">
                    <span className="font-bold">{mainPageT('drag')}</span>
                    <span className="font-bold">{mainPageT('click')}</span>

                    <span className="mt-6 font-bold">
                        {mainPageT('change')}
                    </span>

                    <span className="mt-6 text-center text-xs font-light tablet-md:text-sm">
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

            <div
                ref={imageListRef}
                className="flex flex-wrap gap-2 mobile-md:gap-3 mobile-lg:gap-4"
            >
                {images.map((image, index) => {
                    if (!(image instanceof File) && image.delete) return null;

                    return (
                        <DraggableImage
                            key={index}
                            image={image}
                            index={index}
                            moveImage={moveImage}
                            removeImage={handleRemoveImage}
                        />
                    );
                })}
            </div>

            <ImagesValidation images={images} />

            {images.length > 0 && (
                <button
                    className="w-fit py-2.5 text-sm font-bold text-rose-500"
                    type="button"
                    onClick={removeAllImages}
                >
                    {mainPageT('delete-all-images')}
                </button>
            )}

            <UiModal show={showAttention} hide={() => setShowAttention(false)}>
                <p className="text-center text-2xl font-bold text-amber-400">
                    ⚠️ {mainPageT('only_registered_users')} ⚠️
                </p>

                <p className="mt-4 text-zinc-700 dark:text-zinc-300">
                    {mainPageT('you_trying_image')}
                    <br />
                    <br />
                    {mainPageT('sign_up_image')}
                </p>

                <div className="mt-6 flex items-center justify-end gap-5">
                    <UiButton
                        variant="outline"
                        onBtnClick={() => setShowAttention(false)}
                    >
                        {mainPageT('i_see')}
                    </UiButton>

                    <UiButton
                        href={`/auth?register${utmParams ? `&${utmParams}` : ''}`}
                    >
                        {mainPageT('sign-up')}
                    </UiButton>
                </div>
            </UiModal>
        </div>
    );
};

export default DragNDrop;
