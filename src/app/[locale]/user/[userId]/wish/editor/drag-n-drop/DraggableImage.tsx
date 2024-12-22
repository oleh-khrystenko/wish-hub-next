import { FC, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { useDrag, useDrop } from 'react-dnd';
import { TCurrentImage } from '@/models/wish';
import UiImage from '@/components/ui/UiImage';
import CrossIcon from '@/components/icons/CrossIcon';

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

    const mainPageT = useTranslations('main-page');

    const [, drag] = useDrag({
        type: 'image',
        item: { index },
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
            className="mobile-xs: relative flex h-12 w-12 cursor-pointer items-center justify-center rounded-md border border-dashed border-zinc-700 dark:border-zinc-300 mobile-xs:h-14 mobile-xs:w-14 mobile-sm:h-16 mobile-sm:w-16 tablet-md:h-20 tablet-md:w-20"
        >
            <UiImage
                src={
                    image instanceof File
                        ? URL.createObjectURL(image)
                        : image.path
                }
                alt={`${mainPageT('picture')}-${index}`}
                priority={true}
                classes="rounded-md"
                brokenTextSize="text-[8px]"
            />

            <button
                type="button"
                className="absolute -right-1.5 -top-1.5 rounded bg-rose-500 p-1"
                onClick={() => removeImage(index)}
            >
                <CrossIcon classes=" h-2 w-2 mobile-sm:w-3 mobile-sm:h-3 stroke-zinc-700 dark:stroke-zinc-800" />
            </button>
        </div>
    );
};

export default DraggableImage;
