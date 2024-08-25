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
import UseScreenWidth from '@/helpers/hooks/UseScreenWidth';
import { unencryptedData } from '@/helpers/utils/encryption-data';

interface IProps {
    wish: IWish;
}

const WishSwiper: FC<IProps> = ({ wish }) => {
    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

    const mainPageT = useTranslations('main-page');

    const screenWidth = UseScreenWidth();

    let slidesPerView = 3;
    screenWidth >= 390 && (slidesPerView = 4);
    screenWidth >= 600 && (slidesPerView = 5);

    return (
        <div className="wish-swiper relative mx-auto mb-2.5 h-60 min-h-60 w-[276px] min-w-[276px] px-4 mobile-xs:h-[280px] mobile-xs:min-h-[280px] mobile-xs:w-[280px] mobile-xs:min-w-[280px] mobile-sm:h-[310px] mobile-sm:min-h-[310px] mobile-sm:w-[310px] mobile-sm:min-w-[310px] mobile-md:h-[332px] mobile-md:min-h-[332px] mobile-md:w-[332px] mobile-md:min-w-[332px] mobile-lg:h-[350px] mobile-lg:min-h-[350px] mobile-lg:w-[350px] mobile-lg:min-w-[350px] mobile-2xl:h-[440px] mobile-2xl:min-h-[440px] mobile-2xl:w-[440px] mobile-2xl:min-w-[440px] tablet-sm:h-[520px] tablet-sm:min-h-[520px] tablet-sm:w-[520px] tablet-sm:min-w-[520px] tablet-md:mb-0 tablet-md:h-[345px] tablet-md:min-h-[345px] tablet-md:w-[345px] tablet-md:min-w-[345px] tablet-md:px-5 tablet-lg:px-8 desktop-xs:col-span-3 desktop-sm:mx-0">
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
        </div>
    );
};

export default WishSwiper;
