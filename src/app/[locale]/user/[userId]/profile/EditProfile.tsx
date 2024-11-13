import { FC, ChangeEvent, useState, useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { SubmitHandler, useForm } from 'react-hook-form';
import dayjs from 'dayjs';
import 'dayjs/locale/uk';
import 'dayjs/locale/ru';
import { TCurrentAvatar, IUser } from '@/models/User';
import { EPrivacy } from '@/models/Settings';
import { IUpdateMyUser } from '@/stores/my-user/types';
import { useMyUserStore } from '@/stores/my-user';
import UseValidations from '@/helpers/hooks/UseValidations';
import { isAfter, isBefore } from '@/helpers/utils/date-validators';
import { ALLOWED_FILE_EXTENSIONS } from '@/helpers/utils/constants';
import AvatarValidation from '@/app/[locale]/user/[userId]/profile/AvatarValidation';
import PrivacyChoices from '@/components/layouts/PrivacyChoices';
import UiInput from '@/components/ui/UiInput';
import UiButton from '@/components/ui/UiButton';
import UiAvatar from '@/components/ui/UiAvatar';
import UiDatePicker from '@/components/ui/UiDatePicker';
import CrossIcon from '@/components/icons/CrossIcon';

interface IProps {
    cancel: () => void;
}

type Inputs = {
    firstName: IUser['firstName'];
    lastName: IUser['lastName'];
    deliveryAddress: IUser['deliveryAddress'];
};

const EditProfile: FC<IProps> = ({ cancel }) => {
    const [avatar, setAvatar] = useState<TCurrentAvatar>('');
    const [showEmail, setShowEmail] = useState<EPrivacy>(EPrivacy.ALL);
    const [showDeliveryAddress, setShowDeliveryAddress] = useState<EPrivacy>(
        EPrivacy.ALL
    );
    const [birthday, setBirthday] = useState<Date | null>(null);
    const [birthdayError, setBirthdayError] = useState<string>('');
    const [showBirthday, setShowBirthday] = useState<EPrivacy>(EPrivacy.ALL);
    const [clickedOnSubmit, setClickedOnSubmit] = useState<boolean>(false);

    const inputRef = useRef<HTMLInputElement>(null);

    const mainPageT = useTranslations('main-page');
    const profilePageT = useTranslations('profile-page');
    const allPagesT = useTranslations('all-pages');

    const {
        register,
        setValue,
        watch,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>();

    const myUser = useMyUserStore((state) => state.myUser);
    const updateMyUser = useMyUserStore((state) => state.updateMyUser);

    const {
        accountFirstNameValidation,
        accountLastNameValidation,
        accountDeliveryAddressValidation,
    } = UseValidations();

    let showAvatar: string | undefined = avatar as string;
    avatar instanceof File && (showAvatar = URL.createObjectURL(avatar));
    avatar === 'delete' && (showAvatar = undefined);

    const handleChangeDate = (value: Date | null) => {
        setBirthdayError('');
        setBirthday(value);
    };

    const handleChangeAvatar = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setAvatar(file);
    };

    const removeAvatar = () => {
        setAvatar('delete');
        inputRef.current && (inputRef.current.value = '');
    };

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        setClickedOnSubmit(true);

        if (!myUser || (birthdayError && birthdayError.length > 0)) return;

        const updateMyUserData: IUpdateMyUser = {
            userId: myUser.id,
            firstName: data.firstName.trim(),
            avatar,
            showEmail,
        };
        if (data.lastName) {
            updateMyUserData.lastName = data.lastName.trim();
        }
        if (data.deliveryAddress) {
            updateMyUserData.deliveryAddress = data.deliveryAddress.trim();
            updateMyUserData.showDeliveryAddress = showDeliveryAddress;
        }
        if (birthday) {
            updateMyUserData.birthday = dayjs(birthday).format();
            updateMyUserData.showBirthday = showBirthday;
        }
        await updateMyUser(
            updateMyUserData,
            allPagesT('my-user-api.update-my-user.error')
        );

        cancel();
    };

    useEffect(() => {
        if (!birthday) return;

        if (isBefore(birthday, -120, 'year')) {
            setBirthdayError(profilePageT('birthday-error.min-date'));
        } else if (isAfter(birthday, 0, 'day')) {
            setBirthdayError(profilePageT('birthday-error.disable-future'));
        } else {
            setBirthdayError('');
        }
    }, [clickedOnSubmit, birthday, birthdayError]);

    useEffect(() => {
        if (!myUser) return;

        setValue('firstName', myUser.firstName);
        myUser.lastName && setValue('lastName', myUser.lastName);
        setAvatar(myUser.avatar || '');
        setShowEmail(myUser.showEmail);
        myUser.deliveryAddress &&
            setValue('deliveryAddress', myUser.deliveryAddress);
        setShowDeliveryAddress(myUser.showDeliveryAddress);
        myUser.birthday && setBirthday(dayjs(myUser.birthday).toDate());
        setShowBirthday(myUser.showBirthday);
    }, [myUser, setValue]);

    return (
        <form
            className="mt-7 flex flex-col gap-6"
            onSubmit={handleSubmit(onSubmit)}
        >
            <UiInput
                {...register('firstName', accountFirstNameValidation)}
                id="firstName"
                name="firstName"
                type="text"
                label={profilePageT('first-name')}
                error={errors?.firstName?.message}
            />

            <UiInput
                {...register('lastName', accountLastNameValidation)}
                id="lastName"
                name="lastName"
                type="text"
                label={profilePageT('last-name')}
                error={errors?.lastName?.message}
            />

            <div className="flex w-full flex-col gap-6 desktop-xs:flex-row desktop-xs:items-center">
                <div className="flex grow flex-col gap-6 tablet-md:flex-row">
                    <div className="flex items-center gap-4 p-0.5 tablet-md:w-40 tablet-md:flex-col tablet-md:items-start tablet-md:gap-2">
                        <div className="relative h-fit w-fit rounded-full border border-dashed border-zinc-500 p-1">
                            <label htmlFor="avatar">
                                <input
                                    className="hidden"
                                    id="avatar"
                                    ref={inputRef}
                                    accept={Object.values(
                                        ALLOWED_FILE_EXTENSIONS
                                    ).join(',')}
                                    type="file"
                                    onChange={handleChangeAvatar}
                                />
                                <UiAvatar
                                    avatar={showAvatar}
                                    alt={`${myUser?.firstName} ${myUser?.lastName}`}
                                    size={144}
                                    sizeTailwind="w-36 min-w-36 h-36 min-h-36"
                                    sizeIcon="w-28 h-28"
                                />
                            </label>

                            {(avatar instanceof File ||
                                (avatar.length > 0 && avatar !== 'delete')) && (
                                <button
                                    className="absolute right-1.5 top-1.5 flex h-8 w-8 items-center justify-center rounded-full bg-rose-500"
                                    type="button"
                                    onClick={removeAvatar}
                                >
                                    <CrossIcon classes="w-5 h-5 stroke-zinc-700" />
                                </button>
                            )}
                        </div>

                        <AvatarValidation avatar={avatar} />
                    </div>

                    <div className="grow rounded-md border border-dashed border-zinc-500 px-5 py-2">
                        <p className="truncate text-base text-zinc-700 dark:text-zinc-400 tablet-md:text-lg">
                            {myUser?.email}
                        </p>

                        {/* Privacy Choices Email */}
                        <PrivacyChoices
                            id="email"
                            bgRadio="after:bg-zinc-200 dark:after:bg-zinc-900"
                            tooltipContent={{
                                all: mainPageT('can-see.email-all-tooltip'),
                                friends: mainPageT(
                                    'can-see.email-friends-tooltip'
                                ),
                                nobody: mainPageT(
                                    'can-see.email-nobody-tooltip'
                                ),
                            }}
                            show={showEmail}
                            onChange={setShowEmail}
                        />
                    </div>
                </div>

                <div className="flex grow flex-col gap-6 rounded-md border border-dashed border-zinc-500 px-5 py-2">
                    <UiDatePicker
                        label={profilePageT('birthday*')}
                        placeholder={profilePageT('when_your_birth')}
                        selectedDate={birthday}
                        selectedDateError={birthdayError}
                        clickedOnSubmit={clickedOnSubmit}
                        changeDate={handleChangeDate}
                    />

                    {/* Privacy Choices Birthday */}
                    {birthday && (
                        <div className="-mt-3">
                            <PrivacyChoices
                                id="birthday"
                                bgRadio="after:bg-zinc-200 dark:after:bg-zinc-900"
                                tooltipContent={{
                                    all: mainPageT(
                                        'can-see.birthday-all-tooltip'
                                    ),
                                    friends: mainPageT(
                                        'can-see.birthday-friends-tooltip'
                                    ),
                                    nobody: mainPageT(
                                        'can-see.birthday-nobody-tooltip'
                                    ),
                                }}
                                show={showBirthday}
                                onChange={setShowBirthday}
                            />
                        </div>
                    )}
                </div>
            </div>

            <div className="rounded-md border border-dashed border-zinc-500 px-5 pb-2 pt-6">
                <UiInput
                    {...register(
                        'deliveryAddress',
                        accountDeliveryAddressValidation
                    )}
                    id="deliveryAddress"
                    name="deliveryAddress"
                    type="text"
                    label={profilePageT('delivery-address')}
                    tooltip={profilePageT('delivery-address-tooltip')}
                    error={errors?.deliveryAddress?.message}
                />

                {/* Privacy Choices Delivery Address */}
                {watch('deliveryAddress') && (
                    <PrivacyChoices
                        id="delivery-address"
                        bgRadio="after:bg-zinc-200 dark:after:bg-zinc-900"
                        tooltipContent={{
                            all: mainPageT(
                                'can-see.delivery-address-all-tooltip'
                            ),
                            friends: mainPageT(
                                'can-see.delivery-address-friends-tooltip'
                            ),
                            nobody: mainPageT(
                                'can-see.delivery-address-nobody-tooltip'
                            ),
                        }}
                        show={showDeliveryAddress}
                        onChange={setShowDeliveryAddress}
                    />
                )}
            </div>

            <div className="ml-auto flex w-fit items-center gap-4">
                <UiButton type="submit" variant="text-attention">
                    {mainPageT('update')}
                </UiButton>

                <UiButton onBtnClick={cancel}>
                    {profilePageT('cancel')}
                </UiButton>
            </div>
        </form>
    );
};

export default EditProfile;
