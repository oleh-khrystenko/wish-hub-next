import { FC, CSSProperties, useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperType } from 'swiper';
import { EffectCube, FreeMode, Navigation, Thumbs } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-cube';
import 'swiper/css/pagination';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import { IWish } from '@/models/Wish';
import { IZoomedImage } from '@/models/Settings';
import UseScreenWidth from '@/helpers/hooks/UseScreenWidth';
import { unencryptedData } from '@/helpers/utils/encryption-data';
import ZoomedImageModal from '@/components/layouts/ZoomedImageModal';

interface IProps {
    wish: IWish;
}

const WishSwiper: FC<IProps> = ({ wish }) => {
    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
    const [imageData, setImageData] = useState<IZoomedImage | null>(null);

    const mainPageT = useTranslations('main-page');

    const screenWidth = UseScreenWidth();

    let slidesPerView = 3;
    screenWidth >= 390 && (slidesPerView = 4);
    screenWidth >= 600 && (slidesPerView = 5);

    const handleShowImage = (src: string | undefined, alt: string) => {
        src ? setImageData({ src, alt }) : setImageData(null);
    };

    return (
        <div className="wish-swiper relative mx-auto mb-2.5 h-[282px] min-h-[282px] w-[282px] min-w-[282px] mobile-xs:h-[322px] mobile-xs:min-h-[322px] mobile-xs:w-[322px] mobile-xs:min-w-[322px] mobile-sm:h-[352px] mobile-sm:min-h-[352px] mobile-sm:w-[352px] mobile-sm:min-w-[352px] mobile-md:h-[374px] mobile-md:min-h-[374px] mobile-md:w-[374px] mobile-md:min-w-[374px] mobile-lg:h-[392px] mobile-lg:min-h-[392px] mobile-lg:w-[392px] mobile-lg:min-w-[392px] mobile-2xl:h-[482px] mobile-2xl:min-h-[482px] mobile-2xl:w-[482px] mobile-2xl:min-w-[482px] tablet-sm:h-[562px] tablet-sm:min-h-[562px] tablet-sm:w-[562px] tablet-sm:min-w-[562px] tablet-md:mb-0 tablet-md:h-[626px] tablet-md:min-h-[626px] tablet-md:w-[626px] tablet-md:min-w-[626px] desktop-xs:col-span-3 desktop-xs:h-[384px] desktop-xs:min-h-[384px] desktop-xs:w-[384px] desktop-xs:min-w-[384px] desktop-xs:pl-8 desktop-sm:mx-0">
            <Swiper
                className="h-full"
                style={
                    { '--swiper-navigation-color': '#67e8f9' } as CSSProperties
                }
                effect={wish.images.length > 1 ? 'cube' : undefined}
                grabCursor={true}
                cubeEffect={{
                    shadow: screenWidth >= 768,
                    slideShadows: false,
                    shadowOffset: 20,
                    shadowScale: 0.94,
                }}
                thumbs={{ swiper: thumbsSwiper }}
                navigation={wish.images.length > 1}
                modules={[EffectCube, FreeMode, Navigation, Thumbs]}
            >
                {wish.images.map((image) => (
                    <SwiperSlide
                        key={image.id}
                        onClick={() =>
                            handleShowImage(
                                unencryptedData(image.path, wish.show),
                                `${mainPageT('picture')}-${image.position}`
                            )
                        }
                    >
                        <Image
                            src={unencryptedData(image.path, wish.show)}
                            alt={`${mainPageT('picture')}-${image.position}`}
                            title={`${mainPageT('picture')}-${image.position}`}
                            priority={true}
                            fill
                            sizes={'100%'}
                            className="rounded-md object-contain"
                        />
                    </SwiperSlide>
                ))}
            </Swiper>

            {wish.images.length > 1 && (
                <Swiper
                    className="wish-swiper-nav mt-4 h-[82px]"
                    style={
                        {
                            '--swiper-navigation-color': '#67e8f9',
                        } as CSSProperties
                    }
                    spaceBetween={8}
                    slidesPerView={slidesPerView}
                    watchSlidesProgress={true}
                    navigation={true}
                    modules={[FreeMode, Navigation, Thumbs]}
                    onSwiper={setThumbsSwiper}
                >
                    {wish.images.map((image) => (
                        <SwiperSlide key={image.id}>
                            <Image
                                src={unencryptedData(image.path, wish.show)}
                                alt={`${mainPageT('picture')}-${image.position}`}
                                title={`${mainPageT('picture')}-${image.position}`}
                                priority={true}
                                fill
                                sizes={'100%'}
                                className="rounded-md object-contain"
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            )}

            {!!imageData && (
                <ZoomedImageModal
                    src={imageData.src}
                    alt={imageData.alt}
                    hide={() => setImageData(null)}
                />
            )}
        </div>
    );
};

export default WishSwiper;
